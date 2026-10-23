import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';

const root = resolve(import.meta.dirname, '..');

test('PoA stays a cross-system priority; no single garden or Move is made its unit', async () => {
  const proof = await readFile(resolve(root, 'content/proof-of-adaptation.md'), 'utf8');
  const governance = await readFile(resolve(root, 'content/governance.md'), 'utf8');

  assert.match(proof, /No universal atomic unit of adaptation has been established/u);
  assert.match(proof, /source-qualified local adaptive transition/u);
  assert.match(proof, /every ecological, collective, thermodynamic or\s+governance adaptation requires an agent Work ID/u);
  assert.match(proof, /Three distinct \*examples\* of possible evidence claims/u);
  assert.match(proof, /These cannot be inferred from each other/u);
  assert.match(proof, /a garden do not substitute for those outcomes/u);
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

test('Duluth remains a negative illustration and cannot capture all of PoA', async () => {
  const proof = await readFile(resolve(root, 'content/proof-of-adaptation.md'), 'utf8');
  const drainage = await readFile(resolve(root, 'content/duluth-garden-drainage.md'), 'utf8');

  assert.match(proof, /\[\[duluth-garden-drainage\|Duluth garden drainage source check\]\]/u);
  assert.match(proof, /It is useful preliminary\s+research, \*\*not\*\* evidence/u);
  assert.match(proof, /negative control/u);
  assert.match(proof, /not a\s+required first experiment or an anchor for the rest of the PoA program/u);
  assert.match(drainage, /No completed drainage\s+simulation, human source review,\s+field observation, trial, or witnessed adaptation outcome/u);
  assert.match(proof, /Any real field intervention requires separate consent/u);
});
