import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';

const root = resolve(import.meta.dirname, '..');

test('PoA stays a proposal for recognizing local adaptations, not a whole-garden unit', async () => {
  const proof = await readFile(resolve(root, 'content/proof-of-adaptation.md'), 'utf8');
  const governance = await readFile(resolve(root, 'content/governance.md'), 'utf8');

  assert.match(proof, /A whole garden, household or island is not the elementary unit of adaptation/u);
  assert.match(proof, /adaptive transition at a source-qualified interface/u);
  assert.match(proof, /possible, attempted, authorized, performed and independently received/u);
  assert.match(proof, /three different candidate claims/u);
  assert.match(proof, /A new attempt is not necessarily\\s+an accepted result/u);
  assert.match(proof, /not necessarily learned\s+future adaptability/u);
  assert.match(governance, /binding authority\*\* requires recorded standing or delegation/u);
  assert.match(proof, /No PoA token minting, sale, investment product, certified field trial,/u);
  assert.match(proof, /Community participation must remain useful\s+without a wallet/u);
});

test('friction, Landauer accounting and conflict remain separate, with adversarial controls', async () => {
  const proof = await readFile(resolve(root, 'content/proof-of-adaptation.md'), 'utf8');

  assert.match(proof, /excess burden.*relative to a feasible/u);
  assert.match(proof, /Some friction is valuable protection/u);
  assert.match(proof, /physical entropy, Shannon uncertainty and model-dependent/u);
  assert.match(proof, /k_B T ln 2/u);
  assert.match(proof, /not\*\* a joule meter/u);
  assert.match(proof, /H¹ = \|E\| − \(\|V\| − \|C\|\)/u);
  assert.match(proof, /collapsed agreement that hides the conflict is not a successful/u);
  assert.match(proof, /ten\s+independently favorable Moves do not necessarily compose/u);
  assert.match(proof, /Unobserved costs are unknown, never silently zero/u);
});

test('Duluth remains a source-screening negative control, never the PoA atomic case', async () => {
  const proof = await readFile(resolve(root, 'content/proof-of-adaptation.md'), 'utf8');
  const drainage = await readFile(resolve(root, 'content/duluth-garden-drainage.md'), 'utf8');

  assert.match(proof, /\[\[duluth-garden-drainage\|Duluth garden drainage source check\]\]/u);
  assert.match(proof, /It is useful preliminary\s+research, \*\*not\*\* evidence/u);
  assert.match(proof, /negative control/u);
  assert.match(proof, /not the\s+elementary unit or required first PoA experiment/u);
  assert.match(drainage, /No completed drainage\s+simulation, human source review,\s+field observation, trial, or witnessed adaptation outcome/u);
  assert.match(proof, /Any real field intervention requires separate consent/u);
});
