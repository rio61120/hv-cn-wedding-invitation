import React from 'react';
import { motion } from 'motion/react';
import { weddingConfig } from '../../config/wedding';
import { publicGalleryImages } from '../../config/gallery.generated';

interface GalleryProps {
  onOpenLightbox?: (index: number) => void;
}

const imagesUsedAboveGallery = new Set([
  'IMG_0778.webp', // Cover filmstrip
  'IMG_0789.webp', // Cover filmstrip
  'IMG_0784.webp', // Cover filmstrip
  'IMG_0779.webp', // The wedding of banner
  'IMG_0783.webp', // THE STORY of US background
  'IMG_0776.webp', // Bride portrait in THE STORY of US
  'IMG_0782.webp', // Groom portrait in THE STORY of US
  'IMG_0728.webp', // Marked for use as the Thank You background
  'IMG_0729.webp', // Marked for removal from the gallery
  'IMG_0731.webp', // Marked for removal from the gallery
  '05-ceremony.webp', // Marked for removal from the gallery
  'IMG_0785.webp', // Marked for use as the calendar background
]);

export const SectionGallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const galleryEntries = publicGalleryImages
    .map((image, imageIndex) => ({ image, imageIndex }))
    .filter(({ image }) => ![...imagesUsedAboveGallery].some((source) => image.url.endsWith(source)));
  const { leftColumn, rightColumn } = buildBalancedColumns(galleryEntries);

  return (
    <section className="border-b border-[#6B1B2A] bg-[#2A0911] px-4 py-10 text-white sm:px-6">
      <header className="mb-6 text-center">
        <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.32em] text-[#D8C6A5]">
          Những khoảnh khắc
        </p>
        <h2 className="font-script text-4xl text-[#F5E6CA] sm:text-5xl">Our Gallery</h2>
        <span className="mx-auto mt-3 block h-px w-12 bg-[#A88C62]" />
      </header>

      <div className="grid grid-cols-2 items-start gap-2.5 sm:gap-3">
        <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
          {leftColumn.map(({ image, imageIndex }) => {
            return (
              <GalleryImage
                key={image.url}
                image={image}
                index={imageIndex}
                onOpenLightbox={onOpenLightbox}
              />
            );
          })}
        </div>
        <div className="flex min-w-0 flex-col gap-2.5 sm:gap-3">
          {rightColumn.map(({ image, imageIndex, invitationAfter }) => {
            return (
              <React.Fragment key={image.url}>
                <GalleryImage
                  image={image}
                  index={imageIndex}
                  onOpenLightbox={onOpenLightbox}
                />
                {invitationAfter && <InvitationTile />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

type GalleryEntry = {
  image: (typeof publicGalleryImages)[number];
  imageIndex: number;
  invitationAfter?: boolean;
};

const buildBalancedColumns = (images: GalleryEntry[]) => {
  const leftColumn: GalleryEntry[] = [];
  const rightColumn: GalleryEntry[] = [];
  let leftHeight = 0;
  let rightHeight = 0;

  images.forEach(({ image, imageIndex }, position) => {
    // Keep the first two visible photos side by side and the invitation below #2.
    const goesRight = position === 1 || (position > 1 && rightHeight < leftHeight);
    const column = goesRight ? rightColumn : leftColumn;
    column.push({ image, imageIndex, invitationAfter: position === 1 });

    // The two columns have equal width, so height/width estimates each tile's height.
    const tileHeight = image.height / image.width;
    if (goesRight) {
      rightHeight += tileHeight;
      if (position === 1) rightHeight += 1 / 1.1; // invitation tile aspect ratio is 1.1:1
    } else {
      leftHeight += tileHeight;
    }
  });

  return { leftColumn, rightColumn };
};

interface GalleryImageProps {
  image: (typeof publicGalleryImages)[number];
  index: number;
  onOpenLightbox?: (index: number) => void;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index, onOpenLightbox }) => (
  <motion.button
    type="button"
    whileTap={{ scale: 0.98 }}
    onClick={() => onOpenLightbox?.(index)}
    aria-label={`Mở ảnh: ${image.caption}`}
    className="group relative block w-full overflow-hidden border border-white/10 bg-[#21191A] text-left shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D8C6A5]"
  >
    <img
      src={image.url}
      alt={image.caption}
      loading={index < 4 ? 'eager' : 'lazy'}
      decoding="async"
      className="block h-auto w-full transition duration-700 ease-out group-hover:scale-[1.04]"
    />
    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-2 pb-2 pt-6 font-serif text-[10px] tracking-wide text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      {image.caption}
    </span>
  </motion.button>
);

const InvitationTile: React.FC = () => (
  <div className="w-full rounded-[3px] bg-gradient-to-br from-[#9A293F] via-[#841A30] to-[#731326] p-[5px] shadow-[0_8px_24px_rgba(80,8,24,0.38)] ring-1 ring-[#C7B28A]/75">
    <div className="flex aspect-[1.1] w-full flex-col items-center justify-center border border-[#D8BD8E]/50 bg-[radial-gradient(ellipse_at_50%_38%,rgba(190,54,74,0.32),transparent_72%)] px-2 text-center sm:px-3">
      <CardOrnament />
      <h4 className="mt-1 whitespace-nowrap font-serif text-[11px] font-semibold uppercase tracking-[0.13em] text-[#FFF8EF] drop-shadow-sm sm:text-[13px] sm:tracking-[0.16em]">
        {weddingConfig.couple.groomName}
      </h4>
      <span className="my-0.5 font-script text-[22px] leading-none text-[#E6CD9F] sm:text-[26px]">&amp;</span>
      <h4 className="whitespace-nowrap font-cormorant text-[17px] italic leading-none tracking-normal text-[#FFF1DE] drop-shadow-sm sm:text-[21px]">
        {weddingConfig.couple.brideName}
      </h4>
      <div className="mt-2 flex w-full items-center gap-1.5 text-[#F0DDBB]">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C7B28A]/65" />
        <span className="font-sans text-[8px] tracking-[0.2em] sm:text-[9px]">
          {weddingConfig.date.saveTheDate}
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C7B28A]/65" />
      </div>
    </div>
  </div>
);

const CardOrnament: React.FC = () => (
  <svg aria-hidden="true" viewBox="0 0 96 12" className="h-3 w-20 text-[#C7B28A]/80 sm:w-24">
    <path d="M2 6h34m24 0h34M43 6l5-4 5 4-5 4-5-4Z" fill="none" stroke="currentColor" strokeWidth=".8" />
    <circle cx="48" cy="6" r="1" fill="currentColor" />
  </svg>
);
