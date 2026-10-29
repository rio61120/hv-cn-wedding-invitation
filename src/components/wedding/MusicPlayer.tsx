import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const weddingTrack = '/assets/audio/wedding-song.mp3';

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let disposed = false;
    let gesturePlayPending = false;
    const removeGestureListeners = () => {
      window.removeEventListener('pointerdown', retryAfterGesture, true);
      window.removeEventListener('touchstart', retryAfterGesture, true);
      window.removeEventListener('click', retryAfterGesture, true);
      window.removeEventListener('keydown', retryAfterGesture, true);
    };
    const retryAfterGesture = (event?: Event) => {
      if (event && !event.isTrusted) return;
      if (event instanceof KeyboardEvent && !['Enter', ' '].includes(event.key)) return;
      if (event?.target instanceof Element && event.target.closest('[data-music-control]')) return;
      if (gesturePlayPending || !audio.paused) return;

      gesturePlayPending = true;
      void audio.play().then(() => {
        gesturePlayPending = false;
        if (!disposed) setIsPlaying(true);
        removeGestureListeners();
      }).catch(() => {
        gesturePlayPending = false;
      });
    };

    // Try immediately; browsers that block audible autoplay retry after the first gesture.
    window.addEventListener('pointerdown', retryAfterGesture, true);
    window.addEventListener('touchstart', retryAfterGesture, true);
    window.addEventListener('click', retryAfterGesture, true);
    window.addEventListener('keydown', retryAfterGesture, true);
    // Keep the autoplay attempt separate so a pending browser rejection can't swallow the first real gesture.
    void audio.play().then(() => {
      if (!disposed) setIsPlaying(true);
      removeGestureListeners();
    }).catch(() => {
      // Autoplay may be blocked; keep the real-interaction fallback armed.
    });

    return () => {
      disposed = true;
      removeGestureListeners();
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingTrack}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        data-music-control
        onClick={toggleMusic}
        className={`fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full border px-3 py-2 shadow-lg backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'border-[#C7B28A]/50 bg-[#680D1B]/90 text-[#F5E6CA] ring-2 ring-[#C7B28A]/30'
            : 'border-[#D8D3C9] bg-white/80 text-[#680D1B] hover:bg-white'
        }`}
        title={isPlaying ? 'Tắt nhạc cưới' : 'Bật nhạc cưới'}
        aria-label={isPlaying ? 'Tắt nhạc cưới' : 'Bật nhạc cưới'}
      >
        <div className={isPlaying ? 'animate-spin' : ''} style={{ animationDuration: '4s' }}>
          <Music size={16} />
        </div>
        <span className="font-sans text-xs font-medium tracking-wide">
          {isPlaying ? 'Nhạc cưới' : 'Bật nhạc'}
        </span>
        {isPlaying ? <Volume2 size={14} className="opacity-80" /> : <VolumeX size={14} className="opacity-60" />}
      </button>
    </>
  );
};
