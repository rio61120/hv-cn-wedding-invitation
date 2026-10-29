import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, X, Share2, Calendar, MapPin, Copy, Check } from 'lucide-react';
import { weddingConfig } from '../../config/wedding';

interface ScreenHeaderProps {
  title?: string;
  showClose?: boolean;
  theme?: 'dark' | 'light';
  onBackClick?: () => void;
  className?: string;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title = "Our Day",
  showClose = false,
  theme = 'light',
  onBackClick,
  className = '',
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative w-full z-20 ${className}`}>
      {/* Top Phone Chrome / Header */}
      <header className={`flex items-center justify-between px-4 py-3 select-none transition-colors ${
        isDark ? 'text-white' : 'text-[#1A1A1A]'
      }`}>
        {/* Left Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (onBackClick) onBackClick();
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`p-1.5 rounded-full transition-opacity hover:opacity-70 cursor-pointer ${
              isDark ? 'text-white' : 'text-[#1A1A1A]'
            }`}
            aria-label="Quay lại đầu trang"
          >
            <ChevronLeft size={20} strokeWidth={2.2} />
          </button>

          {showClose && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`p-1.5 rounded-full transition-opacity hover:opacity-70 cursor-pointer ${
                isDark ? 'text-white' : 'text-[#1A1A1A]'
              }`}
              aria-label="Đóng"
            >
              <X size={18} strokeWidth={2.2} />
            </button>
          )}
        </div>

        {/* Center Title */}
        <div className="text-center">
          <span className={`text-[15px] font-medium tracking-wide ${
            isDark ? 'font-serif text-[#F8F6F4]' : 'font-sans font-semibold text-[#1A1A1A]'
          }`}>
            {title}
          </span>
        </div>

        {/* Right Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`p-1.5 rounded-full transition-opacity hover:opacity-70 cursor-pointer ${
              isDark ? 'text-white' : 'text-[#1A1A1A]'
            }`}
            aria-label="Tùy chọn"
          >
            <MoreHorizontal size={20} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowMenu(false)} 
              />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#D8D3C9]/60 py-1.5 z-50 text-[#1A1A1A] animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    handleCopyLink();
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2 text-xs hover:bg-[#F8F6F4] transition-colors text-left"
                >
                  {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} className="text-[#680D1B]" />}
                  <span>{copied ? 'Đã sao chép link!' : 'Sao chép đường dẫn thiệp'}</span>
                </button>

                <a
                  href={weddingConfig.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 px-3.5 py-2 text-xs hover:bg-[#F8F6F4] transition-colors text-left"
                >
                  <MapPin size={15} className="text-[#680D1B]" />
                  <span>Chỉ đường đến nơi tổ chức</span>
                </a>

                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(weddingConfig.couple.title)}&dates=20261129T020000Z/20261129T060000Z&details=${encodeURIComponent(`Lễ thành hôn ${weddingConfig.couple.groomFullName} & ${weddingConfig.couple.brideFullName} tại ${weddingConfig.venue.name}`)}&location=${encodeURIComponent(weddingConfig.venue.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowMenu(false)}
                  className="flex items-center gap-3 px-3.5 py-2 text-xs hover:bg-[#F8F6F4] transition-colors text-left"
                >
                  <Calendar size={15} className="text-[#680D1B]" />
                  <span>Thêm vào Google Calendar</span>
                </a>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};
