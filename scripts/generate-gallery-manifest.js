import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import sharp from 'sharp';

const galleryDir = join(process.cwd(), 'public/assets/gallery');
const optimizedDir = join(galleryDir, '_optimized');
const supportedFormats = new Set(['.avif', '.jpeg', '.jpg', '.png', '.webp']);
const visualOrder = [
  'IMG_0778.JPG', // 1 — black and white couple portrait
  'IMG_0789.JPG', // 2 — black and white studio couple
  'IMG_0784.jpeg', // 3 — black and white beach portrait
  'IMG_0779.JPG', // 4 — color studio couple
  'IMG_0783.JPG', // 5 — bridal accessory detail
  'IMG_0776.JPG', // 6 — bride covering her smile
  'IMG_0782.JPG', // 7 — groom portrait
  'IMG_0805.JPG', // 8 — couple on the rocks
  'IMG_0777.JPG', // 9 — close couple portrait
  'IMG_0780.JPG', // 10 — bride portrait
  'IMG_1917.jpeg', // 11 — ring box with invitation
  'IMG_0802.JPG', // 12 — bride by the sea
  'IMG_0790.jpg', // 13 — couple portrait at dusk
  'IMG_0781.JPG', // 14 — black and white bride portrait
  'IMG_0774.JPG', // 15 — seated black and white bride portrait
  'IMG_0793.jpg', // 16 — intimate couple portrait
  'IMG_0730.JPG', // 17 — invitation flat lay
  'IMG_0803.JPG', // 18 — bride by the water
  'IMG_0732.JPG', // 19 — invitation and accessories
  'IMG_0791.JPG', // 20 — long veil portrait
  'IMG_0727.JPG', // 21 — rings in the pink box
  'IMG_0785.JPG', // 22 — black and white kiss
  'IMG_0728.JPG', // 23 — rings over the names
];
const captions = {
  '05-ceremony.jpg': 'Thiệp cưới Việt & Nhung',
  'IMG_0727.JPG': 'Nhẫn cưới trong hộp nhẫn',
  'IMG_0728.JPG': 'Nhẫn cưới và tên Việt & Nhung',
  'IMG_0729.JPG': 'Bộ thiệp cưới',
  'IMG_0730.JPG': 'Thiệp mời và nhẫn cưới',
  'IMG_0731.JPG': 'Thiệp cưới cùng phụ kiện',
  'IMG_0732.JPG': 'Thiệp mời ngày vui',
  'IMG_0774.JPG': 'Chân dung cô dâu trắng đen',
  'IMG_0776.JPG': 'Chân dung cô dâu',
  'IMG_0777.JPG': 'Việt & Nhung trong lễ phục',
  'IMG_0778.JPG': 'Khoảnh khắc đôi uyên ương',
  'IMG_0779.JPG': 'Việt & Nhung',
  'IMG_0780.JPG': 'Cô dâu trong váy cưới',
  'IMG_0781.JPG': 'Chân dung cô dâu trắng đen',
  'IMG_0782.JPG': 'Chú rể chỉnh trang phục',
  'IMG_0783.JPG': 'Phụ kiện ngày cưới',
  'IMG_0784.jpeg': 'Việt & Nhung bên bờ biển',
  'IMG_0785.JPG': 'Khoảnh khắc yêu thương',
  'IMG_0789.JPG': 'Việt & Nhung trong lễ phục',
  'IMG_0790.jpg': 'Khoảnh khắc bên nhau',
  'IMG_0791.JPG': 'Chiếc khăn voan cưới',
  'IMG_0793.jpg': 'Cô dâu và chú rể',
  'IMG_0802.JPG': 'Cô dâu bên bờ biển',
  'IMG_0803.JPG': 'Chân dung cô dâu bên biển',
  'IMG_0805.JPG': 'Việt & Nhung bên bờ biển',
  'IMG_1917.jpeg': 'Nhẫn cưới và thiệp mời',
  'IMG_1992.jpg': 'Nhẫn cưới trên chuỗi ngọc trai',
};

mkdirSync(optimizedDir, { recursive: true });

const sourceFiles = readdirSync(galleryDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && supportedFormats.has(extname(entry.name).toLowerCase()))
  .map((entry) => entry.name);

const images = await Promise.all(sourceFiles.map(async (file) => {
    const name = basename(file, extname(file));
    const outputName = `${name}.webp`;
    const output = await sharp(join(galleryDir, file))
      .rotate()
      .resize({ width: 1800, height: 1800, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84, effort: 4 })
      .toFile(join(optimizedDir, outputName));
    const fallbackCaption = /^\d+$/.test(name)
      ? `Ảnh ${name}`
      : name.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim();

    return {
      url: `/assets/gallery/_optimized/${encodeURIComponent(outputName)}`,
      caption: captions[file] || fallbackCaption || 'Khoảnh khắc ngày cưới',
      width: output.width,
      height: output.height,
      source: file,
    };
  }));

images.sort((a, b) => {
  const aOrder = visualOrder.indexOf(a.source);
  const bOrder = visualOrder.indexOf(b.source);
  if (aOrder !== -1 || bOrder !== -1) {
    if (aOrder === -1) return 1;
    if (bOrder === -1) return -1;
    return aOrder - bOrder;
  }
  return a.source.localeCompare(b.source, 'en', { numeric: true, sensitivity: 'base' });
});
const galleryImages = images.map(({ source, ...image }) => image);

writeFileSync(
  join(process.cwd(), 'src/config/gallery.generated.ts'),
  `// Generated from public/assets/gallery. Add photos there, then restart dev or build.\nexport const publicGalleryImages = ${JSON.stringify(galleryImages, null, 2)};\n`,
);
