import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { test } from 'node:test';

const root = resolve(import.meta.dirname, '..');

function repositoryRoot(from) {
  for (let directory = resolve(from); directory !== dirname(directory); directory = dirname(directory)) {
    if (existsSync(resolve(directory, 'pnpm-workspace.yaml'))) return directory;
  }
  throw new Error('repository root not found');
}

test('the site depends on VICTOR through the registry', async () => {
  const manifest = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
  assert.equal(manifest.dependencies['@red-cup-engineering/static-site-publisher'], '0.1.15');
  assert.doesNotMatch(manifest.dependencies['@red-cup-engineering/static-site-publisher'], /^file:/);
  assert.doesNotMatch(manifest.dependencies['@red-cup-engineering/static-site-publisher'], /^workspace:/);
});

test('the project declares its public origin and catalog pages', async () => {
  const config = await readFile(resolve(root, 'static-site-publisher.config.mjs'), 'utf8');
  assert.match(config, /https:\/\/turntide\.561\.group\//);
  for (const page of ['index.md', 'join.md', 'events.md', 'settlement.md', 'proof-of-adaptation.md', 'governance.md']) {
    const content = await readFile(resolve(root, 'content', page), 'utf8');
    assert.match(content, /^---\ntitle: /);
    assert.match(content, /date-created: 2026-08-29/);
  }
});

test('the public programming page distinguishes elapsed intake from scheduled events', async () => {
  const events = await readFile(resolve(root, 'content', 'events.md'), 'utf8');
  const config = await readFile(resolve(root, 'static-site-publisher.config.mjs'), 'utf8');
  assert.ok(config.includes("label: 'Events', href: '/events/'"));
  assert.match(events, /Open Harbor/);
  assert.match(events, /September 2026 intake period has ended/);
  assert.match(events, /Discord's\s+Events list is authoritative/);
  assert.match(events, /No synchronous event is confirmed/);
});

test('the Join page is the single public carrier for the Discord invite', async () => {
  const index = await readFile(resolve(root, 'content', 'index.md'), 'utf8');
  const join = await readFile(resolve(root, 'content', 'join.md'), 'utf8');
  const events = await readFile(resolve(root, 'content', 'events.md'), 'utf8');
  const products = await readFile(resolve(root, 'content', 'products.md'), 'utf8');
  const drainage = await readFile(resolve(root, 'content', 'duluth-garden-drainage.md'), 'utf8');
  const rainGarden = await readFile(resolve(root, 'content', 'rain-garden-question.md'), 'utf8');
  const config = await readFile(resolve(root, 'static-site-publisher.config.mjs'), 'utf8');
  const invite = 'https://discord.gg/xZHxzDz4zv';
  const directInvite = /https:\/\/discord\.gg\//;

  assert.match(join, new RegExp(invite));
  for (const page of [index, events, products, drainage, rainGarden]) {
    assert.doesNotMatch(page, directInvite);
    assert.match(page, /\[\[join\|/);
  }
  assert.match(index, /#dock/);
  assert.match(index, /Channels & Roles/);
  assert.match(join, /#dock/);
  assert.match(join, /Channels & Roles/);
  assert.doesNotMatch(index, /#channel-visas/);
  assert.doesNotMatch(join, /#channel-visas/);
  assert.doesNotMatch(index, /#start-here/);
  assert.doesNotMatch(join, /#start-here/);
  assert.ok(config.includes("label: 'Join', href: '/join/'"));
});

test('Cloudflare serves the verified VICTOR release at the public hostname', async () => {
  const wrangler = JSON.parse(await readFile(resolve(root, 'wrangler.json'), 'utf8'));
  assert.equal(wrangler.name, 'turntide-islands-561-group');
  assert.equal(wrangler.main, './worker.mjs');
  assert.equal(wrangler.assets.directory, './dist');
  assert.equal(wrangler.assets.binding, 'ASSETS');
  assert.equal(wrangler.assets.run_worker_first, true);
  assert.deepEqual(wrangler.routes, [{ pattern: 'turntide.561.group', custom_domain: true }]);
});

test('the edge serves the VICTOR landing cell at the root URL', async () => {
  const worker = await readFile(resolve(root, 'worker.mjs'), 'utf8');
  assert.match(worker, /url\.pathname === '\/'/);
  assert.match(worker, /new URL\('\/index\/', url\)/);
  assert.match(worker, /env\.ASSETS\.fetch/);
});


test('Tidepool projection does not promote source capability to public availability', async () => {
  const products = await readFile(resolve(root, 'content', 'products.md'), 'utf8');
  assert.match(products, /source and configuration are not evidence that those paths are deployed or\s+publicly available/);
  assert.match(products, /does not present Tidepool\s+admission or routing as an available community offering/);
  assert.doesNotMatch(products, /no public admission or routing action is\s+available/);
});


test('Turntide public governance describes the DAO as current and human-agent accessible', async () => {
  const governance = await readFile(resolve(root, 'content', 'governance.md'), 'utf8');
  const join = await readFile(resolve(root, 'content', 'join.md'), 'utf8');

  assert.match(governance, /governed as a decentralized autonomous organization/u);
  assert.match(governance, /both humans and agents/u);
  assert.match(governance, /Inactive or hypothetical constituencies do not\s+acquire a veto/u);
  assert.match(governance, /does not require a monthly human meeting, broad human consensus/u);
  assert.match(governance, /Discord, this website, Tidepool, bots, schedulers,\s+financial pools, and provider systems are instruments and projections/u);
  assert.doesNotMatch(governance, /planned DAO/u);
  assert.match(join, /Turntide itself is a DAO/u);
  assert.match(join, /Discord arrival does not by itself assign\s*(?:>\s*)?governance weight/u);
  assert.doesNotMatch(join, /doesn't enroll you in a paid membership, a token, a DAO/u);
});


test('Products follows the current Discord onboarding carrier', async () => {
  const products = await readFile(resolve(root, 'content', 'products.md'), 'utf8');
  assert.match(products, /#dock/);
  assert.match(products, /Channels & Roles/);
  assert.doesNotMatch(products, /#channel-visas/);
});


test('Turntide public governance receives the host-independent ANT identity boundary', async () => {
  const institution = JSON.parse(await readFile(
    resolve(root, '../../data/records/institution/turntide-islands.ant.json'),
    'utf8',
  ));
  const governance = await readFile(resolve(root, 'content', 'governance.md'), 'utf8');
  const join = await readFile(resolve(root, 'content', 'join.md'), 'utf8');

  assert.equal(institution.type, 'TurntideInstitutionIdentity');
  assert.equal(institution.status, 'recognized');
  assert.equal(institution.institution.id, 'turntide-islands');
  assert.equal(institution.institution.form, 'autonomous-national-territory');
  assert.equal(institution.governance.model, 'decentralized-autonomous-organization');
  assert.deepEqual(institution.governance.standingKinds, ['human', 'agent']);
  assert.equal(institution.identityBoundary.hostIndependent, true);
  assert.equal(institution.identityBoundary.deploymentIdentitySeparate, true);
  for (const instrument of ['discord-guild', 'public-website', 'tidepool', 'zelo', 'metroplat-instance', 'metroplat-deployment', 'physical-host']) {
    assert.ok(institution.identityBoundary.notIdenticalTo.includes(instrument));
  }
  assert.ok(institution.authorityDomains.discordParticipation.doesNotImply.includes('turntide-governance'));
  assert.ok(institution.authorityDomains.discordParticipation.doesNotImply.includes('tidepool-financial-membership'));
  assert.ok(institution.authorityDomains.tidepoolFinancialMembership.doesNotImply.includes('turntide-governance'));
  assert.equal(institution.projectionLaw.publicSurfacesAreAuthority, false);
  assert.equal(institution.projectionLaw.providerCapabilityIsAuthority, false);
  assert.equal(institution.projectionLaw.sourcePresenceIsDeploymentReceipt, false);

  assert.match(governance, /Discord, this website, Tidepool, bots, schedulers,[\s\S]*are instruments and projections/u);
  assert.match(join, /Governance standing and delegations are[\s>]*separate recorded states/u);
});


test('Turntide logical MetroPlat world remains distinct from ANT and deployment identity', async () => {
  const ant = JSON.parse(await readFile(
    resolve(root, '../../data/records/institution/turntide-islands.ant.json'),
    'utf8',
  ));
  const binding = JSON.parse(await readFile(
    resolve(root, '../../data/records/institution/turntide-islands.metroplat-world.json'),
    'utf8',
  ));
  const repository = repositoryRoot(root);
  const manifest = JSON.parse(await readFile(resolve(repository, binding.instanceManifest), 'utf8'));

  assert.equal(binding.type, 'TurntideMetroPlatWorldBinding');
  assert.equal(binding.status, 'declared-unhosted');
  assert.equal(binding.institutionId, ant.institution.id);
  assert.notEqual(binding.metroplatInstanceId, binding.institutionId);
  assert.equal(manifest.instanceOf, '@red-cup-engineering/metroplat');
  assert.equal(manifest.identity.id, binding.metroplatInstanceId);
  assert.equal(manifest.identity.origin, undefined);
  assert.deepEqual(binding.deploymentBindings, []);
  assert.deepEqual(manifest.operationSources, []);
  assert.deepEqual(manifest.capabilities, []);
  assert.deepEqual(manifest.schedules, []);
  assert.equal(binding.realizationLaw.deploymentBindingRequiredForLiveClaim, true);
  assert.equal(binding.realizationLaw.redundancyRequiresConvergenceReceipt, true);
  assert.ok(ant.identityBoundary.notIdenticalTo.includes('metroplat-instance'));
  assert.ok(ant.identityBoundary.notIdenticalTo.includes('metroplat-deployment'));
  for (const projection of binding.publicProjections) assert.equal(projection.authority, false);
});


test('Zelo civic mandate lowers governance friction without becoming sovereign', async () => {
  const mandate = JSON.parse(await readFile(
    resolve(root, '../../data/records/governance/zelo-civic-steward.json'),
    'utf8',
  ));
  const routines = JSON.parse(await readFile(
    resolve(root, '../../data/records/governance/civic-routines.json'),
    'utf8',
  ));
  const guild = JSON.parse(await readFile(
    resolve(root, '../../data/records/discord-guild/turntide-islands.guild.json'),
    'utf8',
  ));
  const governance = await readFile(resolve(root, 'content', 'governance.md'), 'utf8');

  assert.equal(mandate.status, 'enacted');
  assert.equal(mandate.office.id, 'zelo-civic-steward');
  assert.match(mandate.purpose, /Help Turntiders understand Turntide/u);
  assert.ok(mandate.duties.some((duty) => duty.id === 'discover-routines'));
  assert.ok(mandate.duties.some((duty) => duty.id === 'reconcile-decisions-and-actions'));
  assert.ok(mandate.immunities.some((rule) => /cannot be required to invent consensus/u.test(rule)));
  assert.ok(mandate.immunities.some((rule) => /cannot treat reactions, message volume, silence, or Discord presence as governance weight/u.test(rule)));
  assert.ok(mandate.immunities.some((rule) => /cannot admit a Tidepool member/u.test(rule)));

  assert.equal(routines.status, 'enacted');
  for (const id of [
    'civic-orientation',
    'governance-rock-sweep',
    'proposal-ferry',
    'decision-action-reconciliation',
    'island-routine-discovery',
    'standing-delegation-review',
    'tidepool-boundary-explainer',
    'civic-receipt',
    'routine-retirement-review',
    'received-act-teaching-example',
    'next-move-nudge',
    'governance-rehearsal',
    'civic-state-answer',
    'participation-wayfinding',
    'routine-studio',
    'tidepool-civic-liaison',
  ]) assert.ok(routines.routines.some((routine) => routine.id === id), `missing civic routine ${id}`);
  assert.ok(routines.antiPatterns.includes('mandatory recurring human consensus meetings'));
  assert.ok(routines.antiPatterns.includes('treating silence or absence as consent'));
  assert.match(
    routines.routines.find((routine) => routine.id === 'governance-rock-sweep').output,
    /or no post/u,
  );

  const questions = guild.channels.find((channel) => channel.key === 'governance-questions');
  const discussion = guild.channels.find((channel) => channel.key === 'governance-discussion');
  const proposals = guild.channels.find((channel) => channel.key === 'governance-proposals');
  const action = guild.channels.find((channel) => channel.key === 'governance-action');
  assert.match(questions.topic, /Zelo can explain/u);
  assert.match(questions.topic, /not a vote or authority grant/u);
  assert.match(discussion.topic, /Zelo can help turn a concern into a clearly scoped draft proposal/u);
  assert.match(proposals.topic, /a proposal is not enacted until an authorized governance act/u);
  assert.match(action.topic, /Zelo reconciles decisions against execution/u);

  assert.match(governance, /Governance Rock is an asynchronous civic path, not a meeting requirement/u);
  assert.match(governance, /Zelo is Turntide's disclosed agentic civic steward/u);
  assert.match(governance, /self-government easier to use, not to become the government/u);
  assert.match(governance, /Zelo stays quiet when a scheduled review finds no material change/u);
});

test('Turntide civic standing and state protocol make Zelo guidance non-inferential', async () => {
  const standing = JSON.parse(await readFile(
    resolve(root, '../../data/records/governance/current-standing.json'),
    'utf8',
  ));
  const protocol = JSON.parse(await readFile(
    resolve(root, '../../data/records/governance/civic-action-protocol.json'),
    'utf8',
  ));
  const mandate = JSON.parse(await readFile(
    resolve(root, '../../data/records/governance/zelo-civic-steward.json'),
    'utf8',
  ));

  assert.equal(standing.status, 'enacted');
  assert.equal(standing.authorityDomain, 'turntide-governance');
  assert.equal(standing.principles.standingRequiresRecord, true);
  assert.equal(standing.principles.discordRoleCreatesStanding, false);
  assert.equal(standing.principles.providerCredentialCreatesStanding, false);
  assert.equal(standing.principles.tidepoolMembershipCreatesTurntideStanding, false);

  const founder = standing.entries.find((entry) => entry.id === 'emsenn');
  const zelo = standing.entries.find((entry) => entry.id === 'zelo-civic-steward');
  const providers = standing.entries.find((entry) => entry.id === '561-group-delegated-turntide-agents');
  assert.equal(founder.state, 'active-governor');
  assert.ok(founder.may.includes('enact'));
  assert.equal(zelo.state, 'active-delegated-steward');
  assert.ok(zelo.mayNot.includes('self-expand-authority'));
  assert.equal(providers.state, 'conditional-active-standing');
  assert.ok(providers.mayNot.includes('convert-provider-capability-into-community-authority'));

  assert.equal(protocol.status, 'enacted');
  assert.equal(protocol.artifactKinds.question.initialState, 'open');
  assert.equal(protocol.artifactKinds.proposal.initialState, 'draft-proposal');
  assert.equal(protocol.artifactKinds.decision.initialState, 'enacted');
  const enact = protocol.artifactKinds.proposal.transitions.find((transition) => transition.to === 'enacted');
  assert.ok(enact.mayBePerformedBy.includes('recorded-governance-standing'));
  assert.ok(!enact.mayBePerformedBy.includes('zelo-civic-steward'));
  const received = protocol.artifactKinds.decision.transitions.find((transition) => transition.to === 'received');
  assert.ok(received.requires.some((item) => /receiving evidence/u.test(item)));
  assert.ok(protocol.zeloRules.mayNotWithoutExactDelegation.some((rule) => /grant governance standing/u.test(rule)));

  assert.ok(mandate.duties.some((duty) => duty.id === 'maintain-civic-state-legibility'));
  assert.ok(mandate.defaultInteraction.behavior.some((rule) => /current state and smallest lawful next transition/u.test(rule)));
});


test('Use Turntide exposes Zelo as a practical civic interface without granting authority', async () => {
  const guide = await readFile(resolve(root, 'content', 'use-turntide.md'), 'utf8');
  const config = await readFile(resolve(root, 'static-site-publisher.config.mjs'), 'utf8');
  const guild = JSON.parse(await readFile(
    resolve(root, '../../data/records/discord-guild/turntide-islands.guild.json'),
    'utf8',
  ));

  assert.match(guide, /^---\ntitle: Use Turntide/mu);
  assert.match(guide, /Ask Zelo like a civic interface/u);
  assert.match(guide, /what state the matter is in/u);
  assert.match(guide, /smallest next act/u);
  assert.match(guide, /governance rehearsal/u);
  assert.match(guide, /Rehearsal creates no vote,\s+standing, decision, or authority/u);
  assert.match(guide, /You can matter without already governing/u);
  assert.match(guide, /low-friction participation, high-legibility\s+authority/u);
  assert.match(guide, /Use Zelo as a routine studio/u);
  assert.match(guide, /routine candidate/u);
  assert.match(guide, /patterns are prompts for thinking, not enacted routines/u);
  assert.match(guide, /Question Quarry/u);
  assert.match(guide, /Solidarity Shoals/u);
  assert.match(guide, /Zelo does not silently enact one/u);
  assert.match(guide, /Tidepool is adjacent to Turntide but has its own financial membership and governance\s+boundary/u);
  assert.match(guide, /Tidepool civic liaison/u);
  assert.match(guide, /Turntide participation cannot grant it/u);
  assert.match(guide, /Zelo's civic office cannot do that/u);
  assert.ok(config.includes("label: 'Use Turntide', href: '/use-turntide/'"));

  const questions = guild.channels.find((channel) => channel.key === 'governance-questions');
  assert.match(questions.topic, /what state a matter is in/u);
  assert.match(questions.topic, /smallest lawful next move/u);
});


test('Turntide routine patterns are advisory and place-aware', async () => {
  const patterns = JSON.parse(await readFile(
    resolve(root, '../../data/records/governance/routine-pattern-library.json'),
    'utf8',
  ));
  const mandate = JSON.parse(await readFile(
    resolve(root, '../../data/records/governance/zelo-civic-steward.json'),
    'utf8',
  ));

  assert.equal(patterns.status, 'advisory');
  assert.equal(patterns.authorityEffect, 'none');
  assert.equal(patterns.rules.patternIsNotRoutine, true);
  assert.equal(patterns.rules.observationBeforeAutomation, true);
  assert.equal(patterns.rules.silenceAndReactionCountsAreNotDemand, true);
  for (const id of [
    'harbor-welcome-follow-up',
    'question-quarry-rescue',
    'field-note-rescue',
    'knowledge-vault-rescue',
    'solidarity-loop-follow-up',
    'island-material-pulse',
    'project-next-move',
    'governance-learning-loop',
    'seasonal-school-cycle',
  ]) assert.ok(patterns.patterns.some((pattern) => pattern.id === id), `missing routine pattern ${id}`);

  assert.ok(mandate.duties.some((duty) => duty.id === 'teach-participation-without-standing'));
  assert.ok(mandate.duties.some((duty) => duty.id === 'facilitate-routine-studio'));
  assert.ok(mandate.immunities.some((rule) => /advisory routine pattern/u.test(rule)));
});


test('Governance Rock onboarding invites participation without implying standing', async () => {
  const guild = JSON.parse(await readFile(
    resolve(root, '../../data/records/discord-guild/turntide-islands.guild.json'),
    'utf8',
  ));
  const prompt = guild.onboarding.prompts.find((candidate) => /Governance Rock/u.test(candidate.title));
  assert.ok(prompt);
  assert.equal(prompt.title, 'Want to follow Governance Rock?');
  assert.match(prompt.options[0].title, /Watch, ask, propose, and learn/u);
  assert.match(prompt.options[0].description, /distinguishes participation from binding standing/u);
  assert.doesNotMatch(JSON.stringify(prompt), /Want a seat on Governance Rock/u);
});
