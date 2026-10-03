#!/usr/bin/env node
// Derives the site's public/ directory from the community's own content, so
// the site never holds a second copy of the art: the guild's emoji
// (content/expressions/emoji) become inline marks, content/images the
// illustrations, content/fonts the self-hosted faces, and the turntide emoji
// the browser icons that VICTOR does not emit (/favicon.ico,
// /apple-touch-icon.png, both requested by browsers unprompted).
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const site = path.resolve(import.meta.dirname, '..');
const content = path.resolve(site, '../../content');
const pub = path.join(site, 'public');

await rm(pub, { recursive: true, force: true });
for (const [from, to, keep] of [
  ['expressions/emoji', 'emoji', (name) => name.endsWith('.svg')],
  ['images', 'images', () => true],
  ['fonts', 'fonts', () => true],
]) {
  await mkdir(path.join(pub, to), { recursive: true });
  for (const name of (await readdir(path.join(content, from))).filter(keep)) await copyFile(path.join(content, from, name), path.join(pub, to, name));
}

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
