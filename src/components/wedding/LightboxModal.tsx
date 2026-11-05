import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; caption?: string }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex touch-none items-center justify-center overscroll-none bg-black transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
        aria-label="Đóng"
      >
        <X size={24} />
      </button>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex - 1 + images.length) % images.length);
        }}
        className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/70 p-2.5 text-white hover:bg-black cursor-pointer"
        aria-label="Ảnh trước"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((currentIndex + 1) % images.length);
        }}
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/70 p-2.5 text-white hover:bg-black cursor-pointer"
        aria-label="Ảnh tiếp"
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Image Container */}
      <div 
        className="relative max-w-4xl max-h-[85vh] p-4 flex flex-col items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => {
          touchStartX.current = e.pointerType === 'touch' ? e.clientX : null;
        }}
        onPointerUp={(e) => {
          if (touchStartX.current === null) return;
          const deltaX = e.clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(deltaX) > 50) {
            onNavigate((currentIndex + (deltaX < 0 ? 1 : -1) + images.length) % images.length);
          }
        }}
      >
        <img
          src={currentImage.url}
          alt={currentImage.caption || `Wedding photo ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl border border-white/10"
        />
        
        {/* Caption & Counter */}
        <div className="mt-3 text-center">
          <p className="font-serif text-sm text-[#E7D7BE] tracking-wide">
            {currentImage.caption || 'Our Wedding Memories'}
          </p>
          <span className="text-xs text-white/50 font-sans tracking-widest mt-1 block">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
};
