import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const input = path.resolve('public/images/menu/raw');
const output = path.resolve('public/images/menu');
await fs.mkdir(output, { recursive: true });
let files;
try { files = (await fs.readdir(input)).filter((name) => /\.(jpe?g|png|tiff?|webp)$/i.test(name)); }
catch { console.error('Create public/images/menu/raw and add menu-1.jpg, menu-2.jpg, etc.'); process.exit(1); }
if (!files.length) { console.error('No menu photos found in public/images/menu/raw.'); process.exit(1); }
for (const file of files) {
  const base = path.basename(file, path.extname(file));
  const source = sharp(path.join(input, file), { failOn: 'none' }).rotate();
  const meta = await source.metadata();
  const width = meta.width ?? 0, height = meta.height ?? 0;
  const ratio = width / Math.max(1, height);
  if (Math.max(width, height) < 2000) console.warn(`${file}: reshoot/export at 2000px or more on the long side for crisp zoom.`);
  if (Math.min(width, height) < 900 || ratio < .48 || ratio > .9) console.warn(`${file}: check framing, all four page corners, perspective and crop; the script cannot correct missing corners or strong skew.`);
  for (const size of [800, 1400, 2000]) {
    await sharp(path.join(input, file), { failOn: 'none' }).rotate().normalise().modulate({ brightness: 1.02 }).linear(1.04, -3).sharpen({ sigma: .45, m1: .35, m2: .65 }).resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true }).webp({ quality: size === 800 ? 78 : 82, effort: 5 }).toFile(path.join(output, `${base}-${size}.webp`));
  }
  console.log(`Processed ${file} → ${base}-800/1400/2000.webp (inspect crop, glare, skew and exposure before publishing).`);
}
