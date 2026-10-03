import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';

const root = resolve(import.meta.dirname, '..');

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
  assert.match(index, /#channel-visas/);
  assert.match(join, /#dock/);
  assert.match(join, /#channel-visas/);
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
  assert.match(join, /Discord arrival does not by itself assign\s+governance weight/u);
  assert.doesNotMatch(join, /doesn't enroll you in a paid membership, a token, a DAO/u);
});
