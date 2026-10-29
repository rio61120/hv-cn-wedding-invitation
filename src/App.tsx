import React, { useState, useRef, useEffect } from 'react';
import { Section1Cover } from './components/wedding/Section1Cover';
import { Section2DateVenue } from './components/wedding/Section2DateVenue';
import { Section3CoupleHero } from './components/wedding/Section3CoupleHero';
import { SectionTheStoryOfUs } from './components/wedding/SectionTheStoryOfUs';
import { SectionGallery } from './components/wedding/SectionGallery';
import { Section5ScheduleGratitude } from './components/wedding/Section5ScheduleGratitude';
import { Section10RSVP } from './components/wedding/Section10RSVP';
import { SectionWeddingGift } from './components/wedding/SectionWeddingGift';
import { LightboxModal } from './components/wedding/LightboxModal';
import { MusicPlayer } from './components/wedding/MusicPlayer';
import { PetalsCanvas } from './components/wedding/Decor';
import { publicGalleryImages } from './config/gallery.generated';
import { Smartphone, Monitor, Sparkles, ArrowDown, Pause, Play } from 'lucide-react';

export default function App() {
  const [deviceMode, setDeviceMode] = useState<'phone' | 'wide'>('phone');
  const [petalsActive, setPetalsActive] = useState<boolean>(true);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const initialAutoScrollDelayApplied = useRef(false);
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // References for scrolling
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const rsvpRef = useRef<HTMLDivElement | null>(null);

  const allGalleryImages = publicGalleryImages;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index % allGalleryImages.length);
    setLightboxOpen(true);
  };

  const handleScrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToRSVP = () => {
    rsvpRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!autoScrollActive) return;

    let frameId = 0;
    let startDelayId = 0;
    let previousTime = 0;
    const stopOnManualScroll = () => setAutoScrollActive(false);
    const stopOnScrollKey = (event: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
      if (!scrollKeys.includes(event.key)) return;

      const target = event.target;
      if (target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"], [data-auto-scroll-control]')) {
        return;
      }
      stopOnManualScroll();
    };

    window.addEventListener('wheel', stopOnManualScroll, { passive: true });
    window.addEventListener('touchmove', stopOnManualScroll, { passive: true });
    window.addEventListener('keydown', stopOnScrollKey);

    const scrollFrame = (time: number) => {
      if (previousTime) {
        const elapsed = Math.min(time - previousTime, 100);
        window.scrollBy(0, (42 * elapsed) / 1000);
      }
      previousTime = time;

      const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atPageEnd) {
        setAutoScrollActive(false);
        return;
      }
      frameId = window.requestAnimationFrame(scrollFrame);
    };

    if (initialAutoScrollDelayApplied.current) {
      frameId = window.requestAnimationFrame(scrollFrame);
    } else {
      initialAutoScrollDelayApplied.current = true;
      startDelayId = window.setTimeout(() => {
        frameId = window.requestAnimationFrame(scrollFrame);
      }, 4000);
    }
    return () => {
      window.clearTimeout(startDelayId);
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('wheel', stopOnManualScroll);
      window.removeEventListener('touchmove', stopOnManualScroll);
      window.removeEventListener('keydown', stopOnScrollKey);
    };
  }, [autoScrollActive]);

  return (
    <div className="min-h-screen bg-[#1E0509] text-[#1A1A1A] font-sans relative overflow-x-hidden selection:bg-[#680D1B] selection:text-white">
      {/* Floating Rose Petals Animation */}
      <PetalsCanvas active={petalsActive} />

      {/* Floating Audio Player */}
      <MusicPlayer />

      {/* Automatic page scroll control */}
      <button
        type="button"
        data-auto-scroll-control
        onClick={() => setAutoScrollActive((active) => !active)}
        aria-pressed={autoScrollActive}
        aria-label={autoScrollActive ? 'Dừng tự cuộn trang' : 'Tiếp tục tự cuộn trang'}
        title={autoScrollActive ? 'Dừng tự cuộn' : 'Tiếp tục tự cuộn'}
        className={`fixed bottom-6 right-6 z-40 h-[76px] w-11 rounded-full border p-1 shadow-lg backdrop-blur-md transition-colors ${
          autoScrollActive
            ? 'border-[#C7B28A]/65 bg-[#680D1B]/90'
            : 'border-[#D8D3C9] bg-white/90'
        }`}
      >
        <span className={`absolute left-1/2 top-1 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full shadow transition-all duration-300 ${
          autoScrollActive
            ? 'translate-y-0 bg-[#F5E6CA] text-[#680D1B]'
            : 'translate-y-8 bg-[#680D1B] text-white'
        }`}>
          {autoScrollActive ? <ArrowDown size={16} /> : <Play size={14} className="ml-0.5" />}
        </span>
        <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 ${autoScrollActive ? 'text-[#F5E6CA]/65' : 'text-[#680D1B]/55'}`}>
          {autoScrollActive ? <Pause size={11} /> : <ArrowDown size={11} />}
        </span>
      </button>

      {/* Desktop Floating Control Bar */}
      <div className="fixed top-4 right-4 z-40 hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white shadow-xl text-xs">
        <button
          onClick={() => setDeviceMode(deviceMode === 'phone' ? 'wide' : 'phone')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-[#F5E6CA]"
          title="Chuyển chế độ xem"
        >
          {deviceMode === 'phone' ? <Monitor size={14} /> : <Smartphone size={14} />}
          <span>{deviceMode === 'phone' ? 'Mở rộng màn hình' : 'Mô phỏng điện thoại'}</span>
        </button>

        <span className="text-white/20">|</span>

        <button
          onClick={() => setPetalsActive(!petalsActive)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
            petalsActive ? 'bg-[#680D1B] text-white' : 'hover:bg-white/10 text-white/70'
          }`}
          title="Bật/Tắt cánh hoa rơi"
        >
          <Sparkles size={13} />
          <span>Hoa rơi</span>
        </button>

        <span className="text-white/20">|</span>

        <button
          onClick={handleScrollToRSVP}
          className="px-2.5 py-1 rounded-full bg-[#C7B28A] text-[#2A050A] font-semibold hover:bg-[#DFC188] transition-colors cursor-pointer"
        >
          Gửi RSVP
        </button>
      </div>

      {/* Main Content Layout */}
      <main className="w-full min-h-screen flex items-center justify-center sm:py-6 md:py-10">
        <div 
          className={`w-full transition-all duration-500 relative ${
            deviceMode === 'phone'
              ? 'max-w-[420px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] sm:rounded-[36px] overflow-hidden sm:border-[8px] sm:border-[#2C2C2C] sm:ring-1 sm:ring-white/10'
              : 'max-w-2xl shadow-2xl rounded-xl overflow-hidden border border-[#D8D3C9]/40'
          }`}
        >
          {/* Section 1: Opening Cover / Save The Date */}

          {/* Section 1: Opening Cover / Save The Date */}
          <Section1Cover 
            onScrollNext={handleScrollToSection2}
          />

          {/* Section 2: Couple Hero & Wax Seal */}
          <Section3CoupleHero />

          {/* Section 3: Invitation details and both families */}
          <div ref={section2Ref}>
            <Section2DateVenue />
          </div>

          {/* Section: The Story of Us (Bride & Groom cards with quotes and wax seals) */}
          <SectionTheStoryOfUs />

          {/* Section 5: Our Day photo gallery */}
          <SectionGallery
            onOpenLightbox={handleOpenLightbox}
          />

          {/* Section 5: Wedding Schedule Milestones, Monthly Calendar & Thank You */}
          <Section5ScheduleGratitude />

          {/* Wedding gift and QR modal */}
          <SectionWeddingGift />

          {/* Section 10: RSVP Invitation & Attendance Confirmation Form */}
          <div ref={rsvpRef}>
            <Section10RSVP />
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={allGalleryImages}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
