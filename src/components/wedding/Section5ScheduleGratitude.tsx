import React from 'react';
import { motion } from 'motion/react';
import { weddingConfig } from '../../config/wedding';
import { WeddingIcon } from './Decor';
import { FadeUp, FadeDown, ScaleIn } from './AnimatedWrapper';

export const Section5ScheduleGratitude: React.FC = () => {
  // Calendar data for November 2026
  // Nov 1, 2026 is Sunday (so Mon, Tue, Wed, Thur, Fri, Sat are blank in week 1)
  const daysInMonth = [
    null, null, null, null, null, null, 1,
    2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29,
    30, null, null, null, null, null, null
  ];

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="w-full flex flex-col border-b border-[#2A2A2A]">
      {/* ========================================================
          CALENDAR SECTION WITH HEART OUTLINE (Tháng 11 / 2026)
         ======================================================== */}
      <section className="relative min-h-[460px] bg-black text-white flex flex-col justify-center overflow-hidden">
        {/* Background couple photo in grayscale */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="/assets/gallery/_optimized/IMG_0785.webp"
            alt="Calendar Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-8 text-center">
          {/* Month in Calligraphic Script */}
          <FadeDown delay={0.1}>
            <div className="font-script text-4xl sm:text-5xl text-white mb-4 drop-shadow-md">
              {weddingConfig.date.calendarMonthName} - 2026
            </div>
          </FadeDown>

          {/* Calendar Grid */}
          <ScaleIn delay={0.2} duration={0.8} className="max-w-[320px] mx-auto text-white">
            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-[11px] sm:text-xs font-serif tracking-wider text-white/80 mb-2">
              {weekdays.map((day, idx) => (
                <div key={idx} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-xs sm:text-[13px] font-serif">
              {daysInMonth.map((dayNum, idx) => (
                <div key={idx} className="h-8 flex items-center justify-center relative">
                  {dayNum !== null && (
                    <span 
                      className={`relative inline-flex items-center justify-center font-normal ${
                        dayNum === weddingConfig.date.selectedDay
                          ? 'text-white font-bold'
                          : dayNum === weddingConfig.date.napTaiDay
                          ? 'text-[#F5E6CA] font-semibold'
                          : 'text-white/85'
                      }`}
                    >
                      <span className="relative z-10">{dayNum}</span>

                      {/* Thin outline heart around the wedding date */}
                      {dayNum === weddingConfig.date.selectedDay && (
                        <motion.span 
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: [1, 1.15, 1], opacity: 1 }}
                          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                          transition={{ 
                            scale: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' },
                            opacity: { duration: 0.5 }
                          }}
                          className="pointer-events-none absolute -inset-1.5 z-0 mt-1 flex items-center justify-center"
                        >
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="#E61E38" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.span>
                      )}

                      {dayNum === weddingConfig.date.napTaiDay && (
                        <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[#E7D7BE]" title="Lễ Nạp Tài (24.11)" />
                      )}

                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Note under calendar */}
            <div className="mt-3 flex items-center justify-center gap-4 border-t border-white/10 pt-2 font-sans text-[11px] text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#E7D7BE]" />
                <span>24.11: Nạp Tài</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E61E38]" />
                <span>29.11: Thành Hôn</span>
              </span>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ========================================================
          TIMELINE BANNER (Timeline 24.11 & 29.11)
         ======================================================== */}
      <section className="bg-[#680D1B] text-white py-6 px-4 shadow-xl border-t border-b border-[#861E2E] overflow-hidden">
        <ScaleIn delay={0.1} className="text-center mb-4">
          <span className="font-script text-3xl sm:text-4xl text-white block">
            Time Line
          </span>
        </ScaleIn>

        {/* 3 Milestones connected by horizontal line */}
        <div className="relative max-w-[340px] mx-auto">
          {/* Horizontal connecting line with drawing animation */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-5 inset-x-8 h-[1px] bg-white/40 origin-left -z-0" 
          />

          <div className="grid grid-cols-3 relative z-10 text-center">
            {weddingConfig.timeline.map((item, idx) => (
              <FadeUp key={idx} delay={0.25 + idx * 0.15} className="flex flex-col items-center">
                {/* Milestone Icon with bounce on hover */}
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#680D1B] flex items-center justify-center text-white mb-1.5 shadow-md cursor-pointer border border-white/20"
                >
                  <WeddingIcon
                    name={item.type === 'welcome' ? 'guests' : item.type === 'ceremony' ? 'rings' : 'banquet'}
                    size={22}
                    color="#FFFFFF"
                  />
                </motion.div>

                {/* Date Tag */}
                <span className="text-[10px] font-sans px-1.5 py-0.5 rounded-full bg-white/15 text-[#F5E6CA] font-medium mb-0.5">
                  {item.date}
                </span>

                {/* Time */}
                <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-white">
                  {item.time}
                </span>

                {/* Title */}
                <span className="font-serif text-[10px] sm:text-[11px] tracking-wider uppercase text-white/90 mt-0.5">
                  {item.title}
                </span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          THANK YOU SECTION (Screenshot 8)
         ======================================================== */}
      <section className="relative min-h-[380px] bg-black text-white flex flex-col justify-center overflow-hidden">
        {/* Soft couple photo background */}
        <div className="absolute inset-0 opacity-40">
          <img
            src="/assets/gallery/_optimized/IMG_0728.webp"
            alt="Thank You Couple"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_35%] grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content with FadeUp */}
        <div className="relative z-10 px-6 py-10 text-center max-w-[360px] mx-auto">
          <ScaleIn delay={0.15}>
            <h3 className="font-script text-5xl sm:text-6xl text-white mb-3 drop-shadow-md">
              {weddingConfig.gratitude.heading}
            </h3>
          </ScaleIn>

          <FadeUp delay={0.3}>
            <p className="font-serif italic text-xs sm:text-sm text-white/95 leading-relaxed tracking-wide drop-shadow">
              {weddingConfig.gratitude.body}
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
};
