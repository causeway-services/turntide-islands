import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { receivePreparedPublicAssets } from '../scripts/public-asset-transaction.mjs';

const marker = '<!-- GENERATED: original Turntide standing pathways; do not edit this derived page -->';
async function fixture(t, { previous = true, page = marker + '\nprior' } = {}) {
  const root = await mkdtemp(path.join(tmpdir(), 'turntide-transaction-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const pub = path.join(root, 'public');
  const doc = path.join(root, 'content', 'participation-pathways.md');
  await mkdir(path.dirname(doc), { recursive: true });
  if (previous) { await mkdir(pub); await writeFile(path.join(pub, 'old.dat'), 'PRIOR'); }
  if (page !== null) await writeFile(doc, page);
  return { root, pub, doc, page, opts: {
    publicDirectory: pub, generatedPage: doc, expectedPage: page,
    nextPage: marker + '\nnew', generatorMarker: marker,
    prepare: async stage => writeFile(path.join(stage, 'new.dat'), 'NEW'),
  } };
}
async function assertClean(f) {
  assert.equal((await readdir(f.root)).filter(x =>
    x.includes('-stage-') || x.endsWith('.derive.lock')).length, 0);
  assert.equal((await readdir(path.dirname(f.doc))).filter(x => x.includes('.stage-')).length, 0);
}
const optional = async file => {
  try { return await readFile(file, 'utf8'); }
  catch (e) { if (e.code === 'ENOENT') return null; throw e; }
};

test('successful complete promotion replaces only derived assets and generated page', async t => {
  const f = await fixture(t);
  assert.deepEqual(await receivePreparedPublicAssets(f.opts), { assets: 'promoted', page: 'replaced' });
  assert.equal(await optional(path.join(f.pub, 'old.dat')), null);
  assert.equal(await optional(path.join(f.pub, 'new.dat')), 'NEW');
  assert.equal(await optional(f.doc), marker + '\nnew');
  await assertClean(f);
});

test('missing original source during preparation leaves previous public and page intact', async t => {
  const f = await fixture(t);
  await assert.rejects(receivePreparedPublicAssets({ ...f.opts, prepare: async stage => {
    await writeFile(path.join(stage, 'partial.dat'), 'PARTIAL');
    throw new Error('missing source');
  } }), /missing source/);
  assert.equal(await optional(path.join(f.pub, 'old.dat')), 'PRIOR');
  assert.equal(await optional(f.doc), f.page);
  await assertClean(f);
});

test('source changes during preparation refuse without touching previous publications', async t => {
  const f = await fixture(t);
  await assert.rejects(receivePreparedPublicAssets({
    ...f.opts, verifySource: async () => { throw new Error('source digest moved'); },
  }), /source digest moved/);
  assert.equal(await optional(path.join(f.pub, 'old.dat')), 'PRIOR');
  assert.equal(await optional(f.doc), f.page);
  await assertClean(f);
});

test('a failed page promotion restores old assets and old page', async t => {
  const f = await fixture(t);
  await assert.rejects(receivePreparedPublicAssets({
    ...f.opts, renamePath: async (from, to) => {
      if (to === f.doc) throw Object.assign(new Error('failed generated page'), { code: 'EACCES' });
      return rename(from, to);
    },
  }), /failed generated page/);
  assert.equal(await optional(path.join(f.pub, 'old.dat')), 'PRIOR');
  assert.equal(await optional(path.join(f.pub, 'new.dat')), null);
  assert.equal(await optional(f.doc), f.page);
  await assertClean(f);
});

test('the actual filesystem exclusion refuses overlapping derivations', async t => {
  const f = await fixture(t);
  const nested = { ...f.opts };
  const o = { ...f.opts, prepare: async stage => {
    await assert.rejects(receivePreparedPublicAssets(nested), e => e.code === 'EEXIST');
    await writeFile(path.join(stage, 'new.dat'), 'NEW');
  } };
  await receivePreparedPublicAssets(o);
  assert.equal(await optional(path.join(f.pub, 'new.dat')), 'NEW');
  await assertClean(f);
});

test('an independently edited civic page prevents overwrite, including during preparation', async t => {
  const f = await fixture(t);
  await assert.rejects(receivePreparedPublicAssets({ ...f.opts, prepare: async stage => {
    await writeFile(path.join(stage, 'new.dat'), 'NEW');
    await writeFile(f.doc, 'independent edited page');
  } }), /changed concurrently/);
  assert.equal(await optional(path.join(f.pub, 'old.dat')), 'PRIOR');
  assert.equal(await optional(f.doc), 'independent edited page');
  await assertClean(f);
});

test('first installation without old tree or generated page is received', async t => {
  const f = await fixture(t, { previous: false, page: null });
  await receivePreparedPublicAssets(f.opts);
  assert.equal(await optional(path.join(f.pub, 'new.dat')), 'NEW');
  assert.equal(await optional(f.doc), marker + '\nnew');
  await assertClean(f);
});

test('independently authored page refuses before preparing any replacement', async t => {
  const f = await fixture(t, { page: 'human source' });
  let prepared = false;
  await assert.rejects(receivePreparedPublicAssets({
    ...f.opts, prepare: async () => { prepared = true; },
  }), /independently authored/);
  assert.equal(prepared, false);
  assert.equal(await optional(path.join(f.pub, 'old.dat')), 'PRIOR');
  await assertClean(f);
});
