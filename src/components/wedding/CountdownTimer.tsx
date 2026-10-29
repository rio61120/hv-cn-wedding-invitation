import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate = "2026-11-11T10:00:00+07:00",
  className = "" 
}) => {
  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0 || isNaN(diff)) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    // Immediate initial calculation
    setTimeLeft(calculateTimeRemaining());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className={`my-2 text-center select-none ${className}`}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#861E2E]/60 border border-[#C7B28A]/40 text-[#F5E6CA] text-xs font-serif tracking-widest">
          <span>✨</span>
          <span>HÔM NAY LÀ NGÀY TRỌNG ĐẠI</span>
          <span>✨</span>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className={`my-2.5 flex flex-col items-center select-none ${className}`}>
      {/* Title with decorative diamond accents */}
      <div className="flex items-center gap-1.5 mb-1.5 text-[#E7D7BE]/80 text-[10px] font-sans tracking-[0.22em] uppercase font-medium">
        <span className="text-[#C7B28A]">◆</span>
        <span>Time Remaining</span>
        <span className="text-[#C7B28A]">◆</span>
      </div>

      {/* Countdown Digits Grid */}
      <div className="flex items-center justify-center bg-black/25 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-[#C7B28A]/35 shadow-inner">
        {/* Days */}
        <div className="flex flex-col items-center min-w-[42px] px-1">
          <span className="font-serif text-lg sm:text-xl font-semibold text-[#F7E7C8] tabular-nums leading-tight">
            {formatNumber(timeLeft.days)}
          </span>
          <span className="font-sans text-[8px] sm:text-[9px] tracking-widest text-[#D8CDC0]/80 uppercase mt-0.5">
            Ngày
          </span>
        </div>

        <span className="font-serif text-[#C7B28A]/60 text-sm font-light -mt-2.5">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center min-w-[42px] px-1">
          <span className="font-serif text-lg sm:text-xl font-semibold text-[#F7E7C8] tabular-nums leading-tight">
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="font-sans text-[8px] sm:text-[9px] tracking-widest text-[#D8CDC0]/80 uppercase mt-0.5">
            Giờ
          </span>
        </div>

        <span className="font-serif text-[#C7B28A]/60 text-sm font-light -mt-2.5">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center min-w-[42px] px-1">
          <span className="font-serif text-lg sm:text-xl font-semibold text-[#F7E7C8] tabular-nums leading-tight">
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="font-sans text-[8px] sm:text-[9px] tracking-widest text-[#D8CDC0]/80 uppercase mt-0.5">
            Phút
          </span>
        </div>

        <span className="font-serif text-[#C7B28A]/60 text-sm font-light -mt-2.5">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center min-w-[42px] px-1">
          <span className="font-serif text-lg sm:text-xl font-semibold text-[#DFC188] tabular-nums leading-tight">
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="font-sans text-[8px] sm:text-[9px] tracking-widest text-[#D8CDC0]/80 uppercase mt-0.5">
            Giây
          </span>
        </div>
      </div>
    </div>
  );
};
