import React from 'react';
import { motion } from 'motion/react';
import { weddingConfig } from '../../config/wedding';
import { WaxSeal } from './Decor';
import { FadeUp, FadeDown } from './AnimatedWrapper';

export const Section3CoupleHero: React.FC = () => {
  return (
    <section className="relative min-h-[760px] bg-[#680D1B] text-white flex flex-col justify-between overflow-hidden border-b border-[#4D0712]">
      {/* Top Couple Photograph with Inverted Triangle / Chevron Cut */}
      <div className="relative w-full flex-1 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[360px] sm:h-[390px] overflow-hidden"
        >
          <img
            src={weddingConfig.photos.hero}
            alt={`${weddingConfig.couple.groomFullName} & ${weddingConfig.couple.brideFullName}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_30%]"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#680D1B]/50 via-transparent to-black/30 pointer-events-none" />

          {/* V-Shape / Chevron Cut */}
          <div 
            className="absolute -bottom-[1px] inset-x-0 h-20 bg-[#680D1B]"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 100% 25%, 50% 100%, 0 25%)'
            }}
          />
        </motion.div>

        {/* Centered Wax Seal with 3D Stamp Pop Animation */}
        <div className="relative -mt-10 flex justify-center z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3, margin: '0px 0px -50px 0px' }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: 0.3,
            }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            className="cursor-pointer"
          >
            <WaxSeal size={84} />
          </motion.div>
        </div>

        {/* Text Section below Wax Seal */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-3 pb-8 text-center z-10">
          <FadeDown delay={0.35}>
            <span className="font-script text-3xl sm:text-4xl text-[#FFFFFF] tracking-wide mb-1 drop-shadow-sm font-normal block">
              The wedding of
            </span>
          </FadeDown>

          <FadeUp delay={0.45}>
            <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.14em] text-white font-medium uppercase mt-1">
              {weddingConfig.couple.groomName}
            </h2>
          </FadeUp>

          <FadeUp delay={0.52}>
            <span className="font-serif italic text-2xl text-[#FFFFFF] my-0.5 block">&amp;</span>
          </FadeUp>

          <FadeUp delay={0.58}>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] font-normal tracking-wide">
              {weddingConfig.couple.brideName}
            </h3>
          </FadeUp>
        </div>

      </div>
    </section>
  );
};
