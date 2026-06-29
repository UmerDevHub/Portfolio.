/**
 * convert-webp.mjs
 * Converts all PNG images in public/assets/images/ to high-quality WebP.
 * Run: node scripts/convert-webp.mjs
 */
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR  = join(__dirname, '../public/assets/images');
const OUTPUT_DIR = join(__dirname, '../public/assets/images');
const QUALITY    = 90; // 90 = high quality, still ~60% smaller than PNG

const files = await readdir(INPUT_DIR);
const pngs  = files.filter(f => extname(f).toLowerCase() === '.png');

console.log(`\n🖼️  Converting ${pngs.length} PNG(s) to WebP @ quality ${QUALITY}...\n`);

for (const file of pngs) {
  const inputPath  = join(INPUT_DIR, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(OUTPUT_DIR, outputName);

  try {
    const info = await sharp(inputPath)
      .webp({ quality: QUALITY, effort: 6 })
      .toFile(outputPath);

    const inputKb  = (1 /* will log below */);
    console.log(`  ✅ ${file.padEnd(20)} → ${outputName.padEnd(22)} (${(info.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ❌ Failed: ${file} — ${err.message}`);
  }
}

console.log('\n✅ Done! Update your image paths to .webp in projects.js\n');
