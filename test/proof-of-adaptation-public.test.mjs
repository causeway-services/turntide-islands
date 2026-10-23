import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';

const root = resolve(import.meta.dirname, '..');

test('public PoA preserves draft status and does not turn recognition into authority', async () => {
  const proof = await readFile(resolve(root, 'content/proof-of-adaptation.md'), 'utf8');
  const governance = await readFile(resolve(root, 'content/governance.md'), 'utf8');

  assert.match(proof, /Neither proposal\s+has been activated as a token or field-trial program/u);
  assert.match(proof, /proposed descriptions from a draft/u);
  assert.match(proof, /Recognition is not permission/u);
  assert.match(proof, /Calling a token work-backed or non-speculative does not itself\s+establish its legal classification/u);
  assert.match(proof, /No\s+token minting, token sale, certification, trial funding, or new governance\s+weight is announced here/u);
  assert.match(governance, /binding authority\*\* requires recorded standing or delegation/u);
});

test('the existing Duluth research cannot be presented as a simulated or field-tested adaptation', async () => {
  const proof = await readFile(resolve(root, 'content/proof-of-adaptation.md'), 'utf8');
  const drainage = await readFile(resolve(root, 'content/duluth-garden-drainage.md'), 'utf8');

  assert.match(proof, /\[\[duluth-garden-drainage\|Duluth garden drainage source check\]\]/u);
  assert.match(proof, /research and screening/u);
  assert.match(proof, /It does \*\*not\*\* establish the garden's actual drainage path/u);
  assert.match(proof, /No PoA field-result claim or token reward\s+can be derived from that record/u);
  assert.match(drainage, /No completed drainage\s+simulation, human source review,\s+field observation, trial, or witnessed adaptation outcome/u);
  assert.match(proof, /A witnessed installation establishes that installation occurred/u);
  assert.match(proof, /It does \*\*not\*\*\s+by itself establish a reduction/u);
});
