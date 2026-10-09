import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';

const root = resolve(import.meta.dirname, '..');

test('Turntide keeps a durable public-home source contract', async () => {
  const config = await readFile(resolve(root, 'static-site-publisher.config.mjs'), 'utf8');
  const index = await readFile(resolve(root, 'content', 'index.md'), 'utf8');
  const join = await readFile(resolve(root, 'content', 'join.md'), 'utf8');
  const products = await readFile(resolve(root, 'content', 'products.md'), 'utf8');
  const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

  assert.match(config, /baseIri:\s*'https:\/\/turntide\.561\.group\/'/);
  assert.match(config, /archives:\s*\{\s*pageSize:/);
  assert.match(index, /public-facing record of a community/);
  assert.match(index, /\[\[join\|join Turntide\s+Islands\]\]/);
  assert.doesNotMatch(index, /https:\/\/discord\.gg\//);
  assert.match(products, /\[\[duluth-garden-drainage\|Duluth garden drainage record\]\]/);
  assert.match(products, /\/feed\.rss\.xml/);
  assert.match(products, /\/feed\.atom\.xml/);
  assert.match(products, /\/feed\.json/);
  assert.match(join, /Ordinary messages and\s+participation are not consent/);
  assert.equal(pkg.scripts.build, 'static-site-publisher build content dist --config=./static-site-publisher.config.mjs');
  assert.equal(pkg.scripts.check, 'static-site-publisher check content --config=./static-site-publisher.config.mjs');
});
