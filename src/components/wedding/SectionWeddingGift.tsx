import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Gift, QrCode, X } from 'lucide-react';

const giftImageUrl = '/assets/images/wedding-gift-box.png';
const fireworksScriptUrl = 'https://cdn.jsdelivr.net/npm/fireworks-js@2.10.8/dist/index.umd.js';

interface FireworksInstance {
  start: () => void;
  launch: (count?: number) => void;
  stop: (dispose?: boolean) => void;
  clear: () => void;
}

interface FireworksConstructor {
  new (container: HTMLElement, options?: Record<string, unknown>): FireworksInstance;
}

declare global {
  interface Window {
    Fireworks?: { default?: FireworksConstructor };
  }
}

let fireworksLibraryPromise: Promise<FireworksConstructor | null> | null = null;

const loadFireworksLibrary = (): Promise<FireworksConstructor | null> => {
  if (window.Fireworks?.default) return Promise.resolve(window.Fireworks.default);
  if (fireworksLibraryPromise) return fireworksLibraryPromise;

  fireworksLibraryPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = fireworksScriptUrl;
    script.async = true;
    script.dataset.fireworksJs = 'true';
    script.onload = () => resolve(window.Fireworks?.default ?? null);
    script.onerror = () => {
      fireworksLibraryPromise = null;
      resolve(null);
    };
    document.head.appendChild(script);
  });

  return fireworksLibraryPromise;
};

export const SectionWeddingGift: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasGiftImage, setHasGiftImage] = useState(true);
  const fireworksContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const container = fireworksContainerRef.current;
    if (!isOpen || !container) return;

    let disposed = false;
    let fireworks: FireworksInstance | null = null;

    void loadFireworksLibrary().then((Fireworks) => {
      if (disposed || !Fireworks) return;
      fireworks = new Fireworks(container, {
        autoresize: true,
        opacity: 0.65,
        acceleration: 1.03,
        friction: 0.96,
        gravity: 1.45,
        particles: 42,
        traceLength: 3,
        traceSpeed: 4,
        explosion: 5,
        intensity: 12,
        flickering: 55,
        lineStyle: 'round',
        hue: { min: 0, max: 48 },
        delay: { min: 450, max: 850 },
        rocketsPoint: { min: 15, max: 85 },
        sound: { enabled: false },
        mouse: { click: false, move: false },
      });
      fireworks.start();
      fireworks.launch(3);
    });

    return () => {
      disposed = true;
      fireworks?.stop(true);
      fireworks?.clear();
    };
  }, [isOpen]);

  return (
    <>
      <section className="relative overflow-hidden border-y border-[#E6DDD2] bg-[#F8F6F4] px-5 py-10 text-center text-[#2D2521] sm:px-7">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8A715D]">A little gift</p>
        <h2 className="mt-1 font-script text-4xl text-[#680D1B] sm:text-5xl">Wedding Gift</h2>
        <p className="mx-auto mt-2 max-w-[300px] font-serif text-xs italic leading-relaxed text-[#6F6258]">
          Sự hiện diện của bạn là món quà quý giá nhất. Nếu muốn gửi lời chúc mừng, xin mời bạn chạm vào hộp quà.
        </p>

        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-label="Mở thông tin gửi quà cưới"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group mx-auto mt-5 flex min-h-[190px] w-full max-w-[260px] flex-col items-center justify-center rounded-2xl border border-[#D7C5A7] bg-white/80 px-5 py-4 shadow-[0_12px_32px_rgba(70,29,32,0.1)] transition-shadow hover:shadow-[0_18px_38px_rgba(70,29,32,0.16)]"
        >
          <motion.span
            animate={{ y: [0, -7, 0], rotate: [-3, 3, -3] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative grid h-28 w-28 place-items-center"
          >
            {hasGiftImage ? (
              <img
                src={giftImageUrl}
                alt="Hộp quà cưới"
                onError={() => setHasGiftImage(false)}
                className="h-full w-full object-contain drop-shadow-[0_12px_12px_rgba(104,13,27,0.18)]"
              />
            ) : (
              <span className="grid h-24 w-24 place-items-center rounded-full bg-[#680D1B]/[0.06] text-[#8B1E2E]">
                <Gift size={44} strokeWidth={1.25} />
              </span>
            )}
          </motion.span>
          <span className="mt-2 font-serif text-[11px] uppercase tracking-[0.22em] text-[#680D1B]">
            Gửi lời chúc mừng
          </span>
        </motion.button>
      </section>

      {isOpen && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#19070B]/75 px-4 py-6 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wedding-gift-title"
            className="relative my-auto w-full max-w-[420px] overflow-hidden rounded-xl border border-[#D4BC92] bg-[#FBF8F2] px-5 pb-6 pt-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:px-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div ref={fireworksContainerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng thông tin quà cưới"
              className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full text-[#6D5A4D] transition-colors hover:bg-[#680D1B]/10 hover:text-[#680D1B]"
            >
              <X size={18} />
            </button>

            <div className="relative z-10">
              <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full bg-[#680D1B]/[0.08] text-[#680D1B]">
                <Gift size={20} />
              </span>
              <h2 id="wedding-gift-title" className="font-script text-4xl text-[#680D1B]">Wedding Gift</h2>
              <p className="mt-1 font-serif text-xs italic text-[#75675C]">
                Cảm ơn bạn đã gửi lời chúc tới Việt &amp; Nhung
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <QrCard label="Cô dâu" imageUrl="/assets/images/qr-bride.png" />
                <QrCard label="Chú rể" imageUrl="/assets/images/qr-groom.png" />
              </div>

              <p className="mt-4 font-sans text-[10px] leading-relaxed text-[#88796D]">
                Quét mã QR để gửi lời chúc mừng tới cô dâu hoặc chú rể.
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

const QrCard: React.FC<{ label: string; imageUrl: string }> = ({ label, imageUrl }) => {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div className="rounded-lg border border-[#E4D8C7] bg-white p-2.5 shadow-sm">
      <div className="mx-auto grid aspect-square w-full max-w-[148px] place-items-center overflow-hidden rounded-md border border-[#EEE7DE] bg-[#F9F6F1]">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={`Mã QR ${label.toLowerCase()}`}
            onError={() => setHasImage(false)}
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-2 text-[#9A8978]">
            <QrCode size={34} strokeWidth={1.2} />
            <span className="font-sans text-[9px] leading-snug">Thêm ảnh QR {label.toLowerCase()}</span>
          </div>
        )}
      </div>
      <p className="mt-2 font-serif text-[11px] font-semibold uppercase tracking-[0.16em] text-[#680D1B]">{label}</p>
    </div>
  );
};

