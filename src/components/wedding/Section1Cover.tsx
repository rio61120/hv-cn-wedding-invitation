import React, { useState } from 'react';
import { motion } from 'motion/react';
import { weddingConfig } from '../../config/wedding';
import { publicGalleryImages } from '../../config/gallery.generated';
import { CountdownTimer } from './CountdownTimer';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { FadeDown, FadeUp } from './AnimatedWrapper';

interface SectionProps {
  onScrollNext?: () => void;
}

export const Section1Cover: React.FC<SectionProps> = ({ onScrollNext }) => {
  const [printKey, setPrintKey] = useState(0);
  const [isPrinting, setIsPrinting] = useState(true);

  const filmstripImages = publicGalleryImages.slice(0, 3).map((image, index) =>
    index === 1 ? { ...image, url: '/assets/images/filmstrip-couple-centered.png' } : image,
  );

  const handleReprint = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPrinting) return;
    setIsPrinting(true);
    setPrintKey(prev => prev + 1);
  };

  return (
    <section className="relative min-h-[780px] bg-[#680D1B] text-white flex flex-col justify-between overflow-hidden shadow-2xl border-b border-[#4D0712] pt-6 sm:pt-8">
      {/* Background rich texture overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 25%, #9E1F30 0%, transparent 75%)`
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-2 pb-6 text-center">
        {/* SAVE THE DATE Header with Motion */}
        <FadeDown delay={0.1} className="relative mb-2">
          <div className="relative inline-block">
            {/* Elegant flourish lettering for Save The Date */}
            <div className="font-serif italic font-normal text-3xl sm:text-4xl tracking-wider text-[#FFFFFF] drop-shadow-sm">
              <span className="font-script text-4xl sm:text-5xl text-[#FFFFFF] -mr-1">S</span>AVE
            </div>
            <h2 className="font-serif font-normal text-xl sm:text-2xl tracking-[0.28em] text-[#FFFFFF] -mt-1 uppercase drop-shadow-sm">
              THE DATE
            </h2>
          </div>

          {/* Date numeral */}
          <div className="mt-1 font-serif text-sm tracking-[0.22em] text-[#FFFFFF]/90 font-light">
            {weddingConfig.date.saveTheDate}
          </div>
        </FadeDown>

        {/* Real-time Countdown Timer */}
        <FadeUp delay={0.2} className="w-full flex justify-center mb-1">
          <CountdownTimer targetDate={weddingConfig.date.countdownTarget} />
        </FadeUp>

        {/* Photostrip Dispenser Mechanism (Photo Printer Slot) */}
        <div className="relative flex flex-col items-center mt-2 mb-1 w-full max-w-[280px]">
          
          {/* Printer Slot Housing - Upper Bevel & Slit */}
          <div className="relative z-30 flex flex-col items-center">
            {/* Slot Outer Metallic / Cream Casing matching sketch */}
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -50px 0px' }}
              transition={{ duration: 0.5 }}
              onClick={handleReprint}
              title="Nhấn để in lại ảnh"
              className="group cursor-pointer w-[238px] h-4 bg-gradient-to-b from-[#F9F6F0] via-[#ECE5DC] to-[#D5C9BC] rounded-t-sm shadow-[0_4px_12px_rgba(60,18,26,0.24),inset_0_1px_1.5px_rgba(255,255,255,0.95)] border border-[#C8BAA7] flex items-center justify-center relative hover:brightness-105 transition-all"
            >
              {/* Deep Recessed Slot Mouth / Slit where photo paper feeds out */}
              <div className="w-[214px] h-[3px] bg-[#140205] rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.98)] relative overflow-hidden">
                {/* Subtle light reflection on inner metal guide */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>

              {/* Tiny Re-print indicator on hover */}
              <div className="absolute -top-5 right-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-xs text-[#F2ECE4] text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1 font-sans">
                <RefreshCw size={10} className={isPrinting ? 'animate-spin' : ''} />
                <span>In lại</span>
              </div>
            </motion.div>

            {/* Downward Shadow Cast from Slot onto Paper */}
            <div className="w-[238px] h-1.5 bg-gradient-to-b from-[#3B1018]/20 via-[#3B1018]/8 to-transparent blur-[2px] pointer-events-none -mt-[1px] z-40" />
          </div>

          {/* Masked Dispenser Chamber: Paper physically emerges from behind the slot opening */}
          <div className={`relative w-full flex justify-center -mt-[6px] pt-px pb-3 ${isPrinting ? 'overflow-hidden' : 'overflow-visible'}`}>
            <motion.div 
              key={printKey}
              initial={{ y: '-102%', opacity: 0.85 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 2.2, 
                delay: 0.25, 
                ease: [0.12, 0.82, 0.35, 1], // Realistic mechanical printer extrusion curve
              }}
              onAnimationComplete={() => setIsPrinting(false)}
              className="relative bg-[#FFFFFF] px-2.5 pt-1 pb-2 shadow-[0_16px_52px_rgba(58,12,22,0.28),0_3px_12px_rgba(58,12,22,0.16)] rounded-b-sm max-w-[212px] w-full mx-auto border-x border-b border-[#E3D9CC] transition-shadow duration-300 z-10"
            >
              {/* Paper Gloss Sheen Effect as it feeds out */}
              <motion.div 
                initial={{ y: '-100%' }}
                animate={{ y: '200%' }}
                transition={{ duration: 1.8, delay: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none z-20"
              />

              {/* 3 Photos with editorial photobooth framing */}
              <div className="flex flex-col gap-1.5">
                {filmstripImages.map((image, idx) => (
                  <div key={image.url} className="relative overflow-hidden aspect-[4/3] bg-[#2A050A] rounded-xs shadow-inner">
                    <img 
                      src={image.url} 
                      alt={image.caption || `Khoảnh khắc cưới ${idx + 1}`} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />
                  </div>
                ))}
              </div>

              <div className="pt-2 pb-0.5 text-center">
                <span className="font-script text-[18px] text-[#680D1B] tracking-wide block font-normal">
                  Khoảnh khắc ngày vui
                </span>
              </div>
            </motion.div>
          </div>

          {/* Quick replay label below paper */}
          <button 
            type="button"
            onClick={handleReprint}
            className="flex items-center gap-1 text-[11px] font-serif tracking-wider text-[#E8DFD5]/70 hover:text-white transition-colors cursor-pointer mt-0.5 select-none"
          >
            <RefreshCw size={11} className={isPrinting ? 'animate-spin' : ''} />
            <span>{isPrinting ? 'Đang nhả ảnh...' : 'In lại ảnh'}</span>
          </button>
        </div>

        {/* Couple Names in Script & Invitation subtitle */}
        <FadeUp delay={0.4} className="mt-2 mb-1">
          <div className="font-script text-4xl sm:text-5xl text-[#FFFFFF] drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight">
            {weddingConfig.couple.groomShort} &amp; {weddingConfig.couple.brideShort}
          </div>

          <div className="mt-1 font-serif text-sm tracking-[0.22em] text-[#FFFFFF]/90 uppercase font-light">
            Thân mời!
          </div>
        </FadeUp>

        {/* Scroll hint indicator */}
        <motion.button
          onClick={onScrollNext}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-2 text-[#E7D7BE]/70 hover:text-white transition-colors flex flex-col items-center gap-0.5 cursor-pointer select-none"
          aria-label="Cuộn xuống xem thông tin"
        >
          <ChevronDown size={18} />
        </motion.button>
      </div>
    </section>
  );
};

