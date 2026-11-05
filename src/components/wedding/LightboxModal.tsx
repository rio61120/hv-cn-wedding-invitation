import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [pinching, setPinching] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const swipeStartX = useRef<number | null>(null);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const pinchStart = useRef<{ distance: number; zoom: number } | null>(null);
  const pinched = useRef(false);

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [currentIndex, isOpen]);

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

  const currentImage = images[currentIndex] ?? images[0];

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex touch-none items-center justify-center overscroll-none bg-black"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="relative max-w-4xl max-h-[85vh] p-4 flex flex-col items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => {
              if (e.pointerType !== 'touch') return;
              e.currentTarget.setPointerCapture(e.pointerId);
              pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
              if (pointers.current.size === 1) {
                if (zoom > 1) dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
                else swipeStartX.current = e.clientX;
              }
              if (pointers.current.size === 2) {
                const [first, second] = [...pointers.current.values()];
                pinchStart.current = {
                  distance: Math.hypot(first.x - second.x, first.y - second.y),
                  zoom,
                };
                pinched.current = true;
                swipeStartX.current = null;
                dragStart.current = null;
                setPinching(true);
              }
            }}
            onPointerMove={(e) => {
              if (!pointers.current.has(e.pointerId)) return;
              pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
              if (pointers.current.size === 1 && dragStart.current) {
                const maxX = (imageRef.current?.clientWidth ?? 0) * (zoom - 1) / 2;
                const maxY = (imageRef.current?.clientHeight ?? 0) * (zoom - 1) / 2;
                setPan({
                  x: Math.max(-maxX, Math.min(maxX, dragStart.current.panX + e.clientX - dragStart.current.x)),
                  y: Math.max(-maxY, Math.min(maxY, dragStart.current.panY + e.clientY - dragStart.current.y)),
                });
                return;
              }
              if (pointers.current.size < 2 || !pinchStart.current) return;
              const [first, second] = [...pointers.current.values()];
              const distance = Math.hypot(first.x - second.x, first.y - second.y);
              const nextZoom = Math.min(3, Math.max(1, pinchStart.current.zoom * distance / Math.max(1, pinchStart.current.distance)));
              setZoom(nextZoom);
              if (nextZoom === 1) setPan({ x: 0, y: 0 });
            }}
            onPointerUp={(e) => {
              if (!pointers.current.has(e.pointerId)) return;
              pointers.current.delete(e.pointerId);
              if (pointers.current.size === 0) {
                const deltaX = swipeStartX.current === null ? 0 : e.clientX - swipeStartX.current;
                if (!pinched.current && !dragStart.current && Math.abs(deltaX) > 50) {
                  onNavigate((currentIndex + (deltaX < 0 ? 1 : -1) + images.length) % images.length);
                }
                swipeStartX.current = null;
                dragStart.current = null;
                pinchStart.current = null;
                pinched.current = false;
                setPinching(false);
              } else {
                pinchStart.current = null;
              }
            }}
            onPointerCancel={() => {
              pointers.current.clear();
              swipeStartX.current = null;
              dragStart.current = null;
              pinchStart.current = null;
              pinched.current = false;
              setPinching(false);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                ref={imageRef}
                key={currentImage.url}
                src={currentImage.url}
                alt={currentImage.caption || `Wedding photo ${currentIndex + 1}`}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: pan.x, y: pan.y, scale: zoom }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: pinching ? 0 : 0.2, ease: 'easeOut' }}
                onDoubleClick={() => {
                  setZoom((value) => value === 1 ? 2 : 1);
                  setPan({ x: 0, y: 0 });
                }}
                className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl border border-white/10"
              />
            </AnimatePresence>

            {/* Caption & Counter */}
            <div className="mt-3 text-center">
              <p className="font-serif text-sm text-[#E7D7BE] tracking-wide">
                {currentImage.caption || 'Our Wedding Memories'}
              </p>
              <span className="text-xs text-white/50 font-sans tracking-widest mt-1 block">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
