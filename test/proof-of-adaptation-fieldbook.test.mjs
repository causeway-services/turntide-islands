import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';

const site = resolve(import.meta.dirname, '..');
const section = process.env.TURNTIDE_SOURCE_ROOT
  ? resolve(process.env.TURNTIDE_SOURCE_ROOT) : resolve(site, '../..');

test('the public fieldbook has an actual original-source native evaluator and build consumer', async () => {
  const [fieldbook, derive, assay] = await Promise.all([
    readFile(resolve(site, 'tools/proof-of-adaptation.html'), 'utf8'),
    readFile(resolve(site, 'scripts/derive-public.mjs'), 'utf8'),
    readFile(resolve(section, 'src/adaptation/assay.mjs'), 'utf8'),
  ]);
  assert.match(fieldbook, /import \{assayAdaptation\} from '\.\/assay\.mjs'/u);
  assert.match(fieldbook, /Export private JSON draft/u);
  assert.match(fieldbook, /Nothing you enter is uploaded/u);
  assert.match(fieldbook, /No wallet is required/u);
  assert.match(fieldbook, /assayAdaptation\(record\)/u);
  assert.doesNotMatch(fieldbook, /fetch\(|sendBeacon\(|XMLHttpRequest|localStorage/u);
  assert.match(derive, /src\/adaptation\/assay\.mjs/u);
  assert.match(derive, /tools\/proof-of-adaptation\.html/u);
  assert.match(derive, /copyFile\(path\.join\(sourceSection, 'src\/adaptation\/assay\.mjs'\)/u);
  assert.match(assay, /export function assayAdaptation/u);
});

test('public visitor's impressive claims never substitute for source reception', async () => {
  const {assayAdaptation} = await import(
    resolve(section, 'src/adaptation/assay.mjs')
  );
  const input={type:'TurntideAdaptationCase',version:1,
    id:'participant-draft',actorId:'visitor',workId:'original-work',
    goalId:'goal',contextId:'situation',token:{minted:true},
    outcome:{state:'met',receipt:{id:'self',source:'visitor',observedAt:'2026-10-22T23:00:00Z'}}};
  const observed=assayAdaptation(input);
  assert.equal(observed.evidence.independentlyReceived,false);
  assert.equal(observed.claims.goalAccepted,false);
  assert.equal(observed.economics.issuedToken,false);
  assert.equal(observed.recognition.candidateForDiscussion,false);
  assert.ok(observed.nextMoves.length>0);
});
