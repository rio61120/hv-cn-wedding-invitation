import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/assets/decor');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processImage(inputPath, outputPath, options = {}) {
  const { isWaxSeal = false, threshold = 238, feather = 20 } = options;
  console.log(`Processing ${inputPath} -> ${outputPath}...`);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = Buffer.from(data);

  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.min(width, height) * 0.47;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      if (isWaxSeal) {
        // Distance from center
        const dist = Math.hypot(x - cx, y - cy);
        // If outside seal or bright white background
        const brightness = (r + g + b) / 3;
        if (dist > maxR || (brightness > 230 && (r > 200 && g > 200 && b > 200))) {
          pixels[idx + 3] = 0; // Transparent
        } else if (dist > maxR - 4) {
          const factor = (maxR - dist) / 4;
          pixels[idx + 3] = Math.max(0, Math.min(255, Math.round(pixels[idx + 3] * factor)));
        } else if (brightness > 210) {
          const factor = (230 - brightness) / 20;
          pixels[idx + 3] = Math.max(0, Math.min(255, Math.round(pixels[idx + 3] * factor)));
        }
      } else {
        // For line drawings and crests: white background removal
        const brightness = (r + g + b) / 3;
        if (brightness >= threshold) {
          pixels[idx + 3] = 0;
        } else if (brightness > threshold - feather) {
          // Feather alpha
          const alphaFactor = (threshold - brightness) / feather;
          pixels[idx + 3] = Math.round(255 * Math.pow(alphaFactor, 1.2));
        }
      }
    }
  }

  await sharp(pixels, {
    raw: { width, height, channels: 4 }
  })
  .png({ quality: 100, compressionLevel: 9 })
  .toFile(outputPath);

  console.log(`Created ${outputPath} successfully (${fs.statSync(outputPath).size} bytes)`);
}

async function main() {
  await processImage(
    'src/assets/images/decor_wax_seal_1793091222016.jpg',
    'public/assets/decor/decor_wax_seal.png',
    { isWaxSeal: true }
  );

  await processImage(
    'src/assets/images/decor_monogram_crest_1793091222022.jpg',
    'public/assets/decor/decor_monogram_crest.png',
    { threshold: 242, feather: 25 }
  );

  await processImage(
    'src/assets/images/decor_flower_branch_1793091222401.jpg',
    'public/assets/decor/decor_flower_branch.png',
    { threshold: 245, feather: 25 }
  );

  await processImage(
    'src/assets/images/decor_flourish_1793091223829.jpg',
    'public/assets/decor/decor_flourish.png',
    { threshold: 245, feather: 25 }
  );

  console.log('All PNGs created successfully!');
}

main().catch(console.error);
