import React, { useEffect, useRef } from 'react';

/**
 * Real Generated 3D Wax Seal with embossed monogram "LL" (PNG asset)
 */
export const WaxSeal: React.FC<{ size?: number; className?: string }> = ({ size = 76, className = '' }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img 
        src="/assets/decor/decor_wax_seal_vn.png" 
        alt="" 
        className="w-full h-full object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.55)] transform hover:scale-105 transition-transform duration-300" 
        draggable={false}
      />
    </div>
  );
};

/**
 * Real Generated Botanical Crest with Monogram LL in champagne gold (PNG asset)
 */
export const GoldMonogramCrest: React.FC<{ size?: number; className?: string }> = ({ size = 96, className = '' }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`} 
      style={{ width: size, height: size }}
    >
      <img 
        src="/assets/decor/decor_monogram_crest_vn.png" 
        alt="" 
        className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(199,178,138,0.35)] transform hover:scale-105 transition-transform duration-300"
        draggable={false}
      />
    </div>
  );
};

/**
 * Real Generated Vintage Botanical Flourish / Ornamental Divider (PNG asset)
 */
export const FloralFlourish: React.FC<{ className?: string; width?: number }> = ({ className = '', width = 140 }) => {
  return (
    <div className={`flex items-center justify-center select-none my-2 ${className}`}>
      <svg aria-hidden="true" width={width} viewBox="0 0 180 34" fill="none" className="text-[#B8A887]">
        <path d="M4 17h55c10 0 12-9 20-9 5 0 8 4 11 9-3 5-6 9-11 9-8 0-10-9-20-9M176 17h-55c-10 0-12-9-20-9m0 18c8 0 10-9 20-9" stroke="currentColor" strokeWidth="1" />
        <path d="M88 17c-8-7-12-13-12-16 7 2 11 7 14 13 3-6 7-11 14-13 0 3-4 9-12 16 8 7 12 13 12 16-7-2-11-7-14-13-3 6-7 11-14 13 0-3 4-9 12-16Z" stroke="currentColor" strokeWidth=".9" />
        <circle cx="90" cy="17" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

/**
 * Real Generated Botanical Flower Branch Ornament for Date & Venue (PNG asset)
 */
export const FloralBranch: React.FC<{ className?: string; width?: number }> = ({ className = '', width = 110 }) => {
  return (
    <div className={`flex items-center justify-center select-none my-2 ${className}`}>
      <svg aria-hidden="true" width={width} viewBox="0 0 120 82" fill="none" className="text-[#B8A887]">
        <g stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 70C34 60 49 47 68 20M25 62C21 52 17 47 9 44c1 8 5 15 16 18Zm10-7c-2-11 0-18 7-25 4 9 3 17-4 26Zm11-8c-1-10 2-17 10-22 2 9 0 16-7 24Zm10-9c1-9 6-14 14-17 0 8-3 14-11 19Zm-28 27c7-1 12 1 16 7-7 2-12 0-16-7Zm13-10c8-2 14 1 18 7-8 2-13 0-18-7Z" />
          <path d="M63 28c1-8 6-13 13-16 1 8-3 13-11 18Zm9-9c4-7 10-9 17-8-3 7-8 10-16 10Zm-2 5c-6-4-8-9-7-15 6 4 8 8 8 14Z" />
          <path d="M90 12c-2-4-1-7 2-10 3 4 3 7 0 11m-1 2c3-4 6-5 10-4-2 4-5 5-9 5m-3 0c-4-3-5-6-4-10 4 3 5 6 5 10" />
          <circle cx="91" cy="14" r="2.1" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Schedule Milestones & Wedding Theme Icons
 */
export const WeddingIcon: React.FC<{ 
  name: 'guests' | 'rings' | 'banquet' | 'pin' | 'calendar';
  size?: number;
  className?: string;
  color?: string;
}> = ({ name, size = 28, className = '', color = 'currentColor' }) => {
  switch (name) {
    case 'guests':
      // Two figures welcoming guests
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="9" cy="7" r="3" />
          <path d="M4 19v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M15 13.5a3.5 3.5 0 0 1 5 3.5v2" />
        </svg>
      );
    case 'rings':
      // Two interlocking wedding rings
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="9" cy="12" r="5.5" />
          <circle cx="15" cy="12" r="5.5" />
          {/* Diamond atop first ring */}
          <path d="M 8 6.5 L 9 5 L 10 6.5 Z" fill={color} />
        </svg>
      );
    case 'banquet':
      // Plate with fork and knife
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="6.5" />
          <circle cx="12" cy="12" r="4.5" strokeDasharray="1 1.5" />
          <path d="M 3.5 5 v 5 a 1.5 1.5 0 0 0 3 0 v -5" />
          <path d="M 5 10 v 9" />
          <path d="M 20.5 5 v 14" />
          <path d="M 18.5 5 c 0 3 2 4 2 4" />
        </svg>
      );
    case 'pin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
          <circle cx="12" cy="10" r="3" fill={color} fillOpacity="0.2" />
        </svg>
      );
    case 'calendar':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="12" cy="15" r="1.5" fill={color} />
        </svg>
      );
  }
};

/**
 * 3-Frame Vertical Filmstrip Photo (Screen 1 Cover)
 */
export const VerticalFilmstrip: React.FC<{
  images: string[];
  caption?: string;
  className?: string;
}> = ({ images, caption = 'Cherish the moments', className = '' }) => {
  return (
    <div className={`relative bg-white p-2.5 shadow-2xl rounded-sm max-w-[210px] mx-auto border border-[#E8DFD5] ${className}`}>
      {/* Film frames container */}
      <div className="flex flex-col gap-2">
        {images.slice(0, 3).map((img, idx) => (
          <div key={idx} className="relative overflow-hidden aspect-[4/3] bg-[#2A050A]">
            <img 
              src={img} 
              alt={`Wedding moment ${idx + 1}`} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle vintage vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Script footer on the filmstrip card */}
      <div className="pt-2 text-center relative flex items-center justify-center">
        <span className="font-script text-[17px] text-[#680D1B] tracking-wide block">
          {caption}
        </span>
        {/* Cursor click indicator from the reference sketch */}
        <div className="absolute -right-2 -bottom-2 select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] animate-pulse">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M4 4l7 17 3-6.5 6.5-3L4 4z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

/**
 * Floating Rose Petals Canvas Effect
 */
export const PetalsCanvas: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Petal particles
    interface Petal {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      angle: number;
      angularSpeed: number;
      opacity: number;
      color: string;
    }

    const petals: Petal[] = [];
    const petalColors = ['#D44A63', '#C72C48', '#E87A90', '#F2AEC1', '#8B1E2E'];
    const totalPetals = 22;

    for (let i = 0; i < totalPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: 7 + Math.random() * 8,
        speedY: 0.8 + Math.random() * 1.4,
        speedX: -0.6 + Math.random() * 1.2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        opacity: 0.35 + Math.random() * 0.45,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      // Organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 4, p.size, 0);
      ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, p.size, 0, p.size * 0.7);
      ctx.bezierCurveTo(-p.size / 2, p.size, -p.size / 2, 0, 0, 0);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.015) * 0.8 + p.speedX;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none absolute inset-0 z-30 w-full h-full"
    />
  );
};
