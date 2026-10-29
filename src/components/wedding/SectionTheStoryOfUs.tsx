import React from 'react';
import { motion } from 'motion/react';
import { weddingConfig } from '../../config/wedding';
import { publicGalleryImages } from '../../config/gallery.generated';
import { WaxSeal } from './Decor';
import { FadeDown, SlideInLeft, SlideInRight } from './AnimatedWrapper';

export const SectionTheStoryOfUs: React.FC = () => {
  const storyBackground = publicGalleryImages.find((image) => image.url.endsWith('/IMG_0783.webp'));
  const groomImageIndex = publicGalleryImages.findIndex((image) => image.url.endsWith('/IMG_0782.webp'));
  const groomImageUrl = groomImageIndex >= 0
    ? publicGalleryImages[groomImageIndex].url
    : '/assets/gallery/_optimized/IMG_0782.webp';

  return (
    <section className="relative min-h-[760px] bg-[#141414] text-white flex flex-col justify-between overflow-hidden border-b border-[#2A2A2A]">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Top Dark Background Photo with "THE STORY of US" */}
        <FadeDown delay={0.1} className="relative w-full h-[160px] overflow-hidden">
          <img
            src={storyBackground?.url ?? '/assets/gallery/_optimized/IMG_0783.webp'}
            alt="The Story of Us"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase font-light text-white text-center">
              THE STORY <span className="font-script lowercase text-3xl sm:text-4xl text-[#E7D7BE] tracking-normal font-normal">of</span> US
            </h2>
          </div>
        </FadeDown>

        {/* Love Quotes Cards matching Screenshot 5 */}
        <div className="px-4 py-5 space-y-6 bg-[#161616] overflow-hidden">
          {/* Card 1: Bride (Cô dâu KHÁNH LINH) - Photo Left (SlideInLeft), Quote Right (SlideInRight) */}
          <div className="grid grid-cols-12 gap-3 items-center">
            {/* Bride Photo with Wax Seal — Slide in from LEFT */}
            <SlideInLeft delay={0.15} duration={0.8} className="col-span-6">
              <div 
                className="relative bg-white p-1.5 shadow-xl rounded-xs border border-white/20"
              >
                {/* Wax Seal at top corner */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.35 }}
                  className="absolute -top-3.5 -left-3.5 z-20"
                >
                  <WaxSeal size={40} />
                </motion.div>

                <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                  <img
                    src={weddingConfig.photos.bride}
                    alt={`Cô dâu ${weddingConfig.couple.brideFullName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Burgundy Tag */}
                <div className="bg-[#680D1B] text-white text-center py-1 mt-1">
                  <span className="font-script text-xs text-[#F5E6CA] block">Cô dâu</span>
                  <span className="font-serif text-[11px] sm:text-xs font-semibold tracking-wider uppercase block">
                    {weddingConfig.couple.brideName}
                  </span>
                </div>
              </div>
            </SlideInLeft>

            {/* Bride Quote — Slide in from RIGHT */}
            <SlideInRight delay={0.2} duration={0.8} className="col-span-6 pl-2 text-left space-y-1">
              <span className="font-serif text-3xl text-white/50 leading-none block -mb-2">“</span>
              <p className="font-serif italic text-xs sm:text-[13px] text-white/90 leading-relaxed">
                {weddingConfig.quotes.bride.quote}
              </p>
            </SlideInRight>
          </div>

          {/* Card 2: Groom (Chú rể HOÀNG LONG) - Quote Left (SlideInLeft), Photo Right (SlideInRight) */}
          <div className="grid grid-cols-12 gap-3 items-center pt-2">
            {/* Groom Quote — Slide in from LEFT */}
            <SlideInLeft delay={0.25} duration={0.8} className="col-span-6 pr-2 text-left space-y-1">
              <span className="font-serif text-3xl text-white/50 leading-none block -mb-2">“</span>
              <p className="font-serif italic text-xs sm:text-[13px] text-white/90 leading-relaxed">
                {weddingConfig.quotes.groom.quote}
              </p>
            </SlideInLeft>

            {/* Groom Photo with Wax Seal — Slide in from RIGHT */}
            <SlideInRight delay={0.2} duration={0.8} className="col-span-6">
              <div 
                className="relative bg-white p-1.5 shadow-xl rounded-xs border border-white/20"
              >
                {/* Wax Seal at top corner */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 15, delay: 0.4 }}
                  className="absolute -top-3.5 -left-3.5 z-20"
                >
                  <WaxSeal size={40} />
                </motion.div>

                <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                  <img
                    src={groomImageUrl}
                    alt={`Chú rể ${weddingConfig.couple.groomFullName}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>

                {/* Burgundy Tag */}
                <div className="bg-[#680D1B] text-white text-center py-1 mt-1">
                  <span className="font-script text-xs text-[#F5E6CA] block">Chú rể</span>
                  <span className="font-serif text-[11px] sm:text-xs font-semibold tracking-wider uppercase block">
                    {weddingConfig.couple.groomName}
                  </span>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
};
