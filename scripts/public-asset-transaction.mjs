// Filesystem receiving for the existing Turntide derive-public build.
// The Cloudflare/VICTOR publisher stays the original deployment owner.
import { randomUUID } from 'node:crypto';
import { lstat, mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

async function optionalText(file) {
  try { return await readFile(file, 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

async function optionalDirectory(file) {
  let entry;
  try { entry = await lstat(file); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
  if (!entry.isDirectory() || entry.isSymbolicLink())
    throw new TypeError('Refusing to replace non-directory or linked public assets');
  return entry;
}

/** Prepare every asset on the same filesystem, then promote only complete output.
 *
 * mkdir is an actual OS exclusion, not an inferred Actor lease. Stale
 * exclusions/backups after process death require operator reconciliation:
 * never steal the lock or delete an uncertain prior tree automatically.
 * Two ordinary renames are NOT an atomic multi-path transaction. The release
 * controller must only consume a completed build, never an in-flight folder.
 */
export async function receivePreparedPublicAssets({
  publicDirectory, generatedPage, expectedPage, nextPage, generatorMarker,
  prepare, verifySource = async () => {}, renamePath = rename,
}) {
  if (![publicDirectory, generatedPage, generatorMarker, nextPage].every(
    value => typeof value === 'string' && value.length > 0) ||
    !(expectedPage === null || typeof expectedPage === 'string') ||
    typeof prepare !== 'function' || typeof verifySource !== 'function')
    throw new TypeError('Publication needs admitted source, generated page and preparation');
  const lock = publicDirectory + '.derive.lock';
  // mkdir is an actual filesystem exclusion among cooperating builders.
  await mkdir(lock);
  let stage = null, stagedPage = null, priorTree = null;
  let movedPrior = false, movedNew = false, committed = false, rollbackFailed = false;
  try {
    const existing = await optionalDirectory(publicDirectory);
    const currentPage = await optionalText(generatedPage);
    if (currentPage !== expectedPage)
      throw new Error('Generated page changed after its source-qualified read');
    if (currentPage !== null && !currentPage.includes(generatorMarker))
      throw new TypeError('Refusing to overwrite an independently authored civic page');
    stage = await mkdtemp(path.join(path.dirname(publicDirectory),
      '.' + path.basename(publicDirectory) + '-stage-'));
    priorTree = stage + '.previous';
    await prepare(stage);
    await verifySource();
    if (await optionalText(generatedPage) !== currentPage)
      throw new Error('Generated civic page changed concurrently; publication refused');
    const beforeMove = await optionalDirectory(publicDirectory);
    if (!!existing !== !!beforeMove ||
      (existing && (existing.ino !== beforeMove.ino || existing.dev !== beforeMove.dev)))
      throw new Error('Public assets changed concurrently; publication refused');
    if (nextPage !== currentPage) {
      stagedPage = path.join(path.dirname(generatedPage),
        '.' + path.basename(generatedPage) + '.stage-' + randomUUID());
      await writeFile(stagedPage, nextPage, { flag: 'wx' });
    }
    if (existing) { await renamePath(publicDirectory, priorTree); movedPrior = true; }
    await renamePath(stage, publicDirectory); movedNew = true;
    if (stagedPage) {
      await renamePath(stagedPage, generatedPage);
      stagedPage = null;
    }
    committed = true;
    return Object.freeze({ assets: 'promoted', page: nextPage === currentPage ? 'unchanged' : 'replaced' });
  } catch (error) {
    const rollbackErrors = [];
    if (movedNew) {
      try { await rm(publicDirectory, { recursive: true, force: true }); }
      catch (e) { rollbackErrors.push(e); }
    }
    if (movedPrior && rollbackErrors.length === 0) {
      try { await renamePath(priorTree, publicDirectory); movedPrior = false; }
      catch (e) { rollbackErrors.push(e); }
    }
    if (rollbackErrors.length) {
      rollbackFailed = true;
      throw new AggregateError([error, ...rollbackErrors],
      'Publication refused; previous assets require operator recovery at ' + priorTree);
    }
    throw error;
  } finally {
    if (stage) await rm(stage, { recursive: true, force: true }).catch(() => {});
    if (stagedPage) await rm(stagedPage, { force: true }).catch(() => {});
    // Never remove a backup after a failed rollback. Success owns the backup.
    if (committed && movedPrior) await rm(priorTree, { recursive: true, force: true }).catch(() => {});
    // Failed rollback retains the REAL exclusion and backup for explicit recovery.
    if (!rollbackFailed) await rm(lock, { recursive: true, force: true });
  }
}
