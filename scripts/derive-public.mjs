#!/usr/bin/env node
// Derives the site's public/ directory from the community's own content, so
// the site never holds a second copy of the art: the guild's emoji
// (content/expressions/emoji) become inline marks, content/images the
// illustrations, content/fonts the self-hosted faces, and the turntide emoji
// the browser icons that VICTOR does not emit (/favicon.ico,
// /apple-touch-icon.png, both requested by browsers unprompted).
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import sharp from 'sharp';

const site = path.resolve(import.meta.dirname, '..');
const content = path.resolve(site, '../../content');
const pub = path.join(site, 'public');

// Select the original current Turntide governance owner, not an independently
// copied site-local standing list. This site's original art/research producer
// already requires the same mounted owning section via ../../content/data.
const civicRoot = path.resolve(site, '../..');
const civicPath = path.join(civicRoot, 'data/records/governance/standing-pathways.json');
const civicBytes = await readFile(civicPath);
const civicText = new TextDecoder('utf-8', { fatal: true }).decode(civicBytes);
const sourceDigest = 'ni:///sha-256;' + createHash('sha256').update(civicBytes).digest('base64url');
const { projectStandingPathwayPublication } =
  await import('../' + '../' + '../src/governance/receiving.mjs');
const civicProjection = projectStandingPathwayPublication(JSON.parse(civicText), { sourceDigest });
if (civicProjection.publicationAuthorized !== false ||
    civicProjection.authorityGranted !== false || civicProjection.count !== 4) {
  throw new TypeError('Public civic wayfinding cannot grant voting, delegation, or site publication');
}
const generatedPage = path.join(site, 'content', civicProjection.page.path);
const generatorMarker = '<!-- GENERATED: original Turntide standing pathways; do not edit this derived page -->';
let priorPage = null;
try { priorPage = await readFile(generatedPage, 'utf8'); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
if (priorPage !== null && !priorPage.includes(generatorMarker)) {
  throw new TypeError('Refusing to overwrite an independently authored civic page');
}

await rm(pub, { recursive: true, force: true });
for (const [from, to, keep] of [
  ['expressions/emoji', 'emoji', (name) => name.endsWith('.svg')],
  ['images', 'images', () => true],
  ['fonts', 'fonts', () => true],
]) {
  await mkdir(path.join(pub, to), { recursive: true });
  for (const name of (await readdir(path.join(content, from))).filter(keep)) await copyFile(path.join(content, from, name), path.join(pub, to, name));
}

// Publish this public-data observation with its page; readers need no repository
// account. Keep the original research files authoritative and copy only these
// explicitly public files, rather than exposing the community's data directory.
const terrainResearch = 'duluth-garden-drainage';
const terrainSource = path.resolve(site, '../../data/research', terrainResearch);
const terrainPublic = path.join(pub, 'research', terrainResearch);
await mkdir(terrainPublic, { recursive: true });
for (const name of ['terrain.tif', 'source-item.json', 'extraction.json', 'extract-terrain.py', 'rainfall-atlas14.csv']) {
  await copyFile(path.join(terrainSource, name), path.join(terrainPublic, name));
}

// The original VICTOR publisher builds this generated Markdown with the same
// site/catalog/feed system it already uses for all other source-approved pages.
if (priorPage !== civicProjection.page.body) {
  await writeFile(generatedPage, civicProjection.page.body);
}
// JSON-LD is a derived machine resource, not a grant to subscribe, vote, or
// invoke a bot. Its PROV-O NI source points to the exact original source bytes.
const linkedFile = path.join(pub, civicProjection.linkedData.path);
await mkdir(path.dirname(linkedFile), { recursive: true });
await writeFile(linkedFile, civicProjection.linkedData.body);

const mark = await readFile(path.join(content, 'expressions/emoji/turntide.svg'));
const png = (size) => sharp(mark, { density: 72 * size / 128 * 4 }).resize(size, size).png().toBuffer();
await writeFile(path.join(pub, 'apple-touch-icon.png'), await sharp(await png(160)).extend({ top: 10, bottom: 10, left: 10, right: 10, background: '#0F2A3D' }).png().toBuffer());
await writeFile(path.join(pub, 'favicon.ico'), ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(size) })))));

/** An ICO container of PNG images (Windows Vista+, every current browser). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, index) => {
    const at = 6 + 16 * index;
    header.writeUInt8(size % 256, at); header.writeUInt8(size % 256, at + 1);
    header.writeUInt16LE(1, at + 4); header.writeUInt16LE(32, at + 6);
    header.writeUInt32LE(data.length, at + 8); header.writeUInt32LE(offset, at + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((image) => image.data)]);
}
