import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Heart, Users, MessageSquareHeart, Sparkles } from 'lucide-react';
import { FadeUp } from './AnimatedWrapper';
import { weddingConfig } from '../../config/wedding';

interface RSVPRecord {
  id: string;
  name: string;
  attending: 'yes' | 'no';
  guestCount: number;
  message: string;
  createdAt: string;
}

export const Section10RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentRSVPs, setRecentRSVPs] = useState<RSVPRecord[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load existing RSVPs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding_rsvps');
      if (stored) {
        setRecentRSVPs(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên của bạn để chúng tớ chuẩn bị nhé!');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const newRecord: RSVPRecord = {
        id: Date.now().toString(),
        name: name.trim(),
        attending,
        guestCount: attending === 'yes' ? guestCount : 0,
        message: message.trim(),
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      const updated = [newRecord, ...recentRSVPs];
      setRecentRSVPs(updated);
      try {
        localStorage.setItem('wedding_rsvps', JSON.stringify(updated));
      } catch {
        // ignore
      }

      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setMessage('');
    setAttending('yes');
    setGuestCount(1);
    setSubmitted(false);
  };

  return (
    <section className="relative min-h-[740px] bg-[#680D1B] text-white flex flex-col justify-between overflow-hidden py-8 sm:py-10">
      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        {/* RSVP Card with Ivory Background with FadeUp */}
        <FadeUp delay={0.15} className="w-full max-w-[340px]">
          <div className="w-full bg-[#FAF8F5] text-[#1A1A1A] p-5 sm:p-6 rounded-md shadow-2xl border border-[#E8DFD5] relative">
          {/* Card Title */}
          <div className="text-center mb-5">
            <h3 className="font-serif text-lg sm:text-xl font-bold tracking-[0.14em] text-[#680D1B] uppercase">
              THƯ MỜI THAM DỰ
            </h3>
            <div className="w-12 h-0.5 bg-[#C7B28A] mx-auto mt-1" />
          </div>

          {submitted ? (
            /* Success Feedback State */
            <div className="text-center py-6 space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="inline-flex p-3 rounded-full bg-[#680D1B]/10 text-[#680D1B] mb-1">
                <CheckCircle2 size={36} className="text-[#680D1B]" />
              </div>
              <h4 className="font-serif text-lg text-[#680D1B] font-semibold">
                Xác nhận thành công!
              </h4>
              <p className="font-sans text-xs text-[#5C524C] leading-relaxed px-2">
                {attending === 'yes'
                  ? `Cảm ơn bạn ${name} rất nhiều! ${weddingConfig.couple.groomShort} & ${weddingConfig.couple.brideShort} rất háo hức được đón tiếp bạn trong ngày vui.`
                  : `Cảm ơn bạn ${name} đã gửi lời chúc mừng! Dù tiếc vì bạn không thể đến nhưng vợ chồng mình luôn trân trọng tình cảm của bạn.`}
              </p>

              <div className="pt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-2.5 px-4 rounded-md bg-[#680D1B] text-white text-xs font-sans font-medium hover:bg-[#861E2E] transition-colors cursor-pointer"
                >
                  Gửi thêm xác nhận khác
                </button>
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="text-xs text-[#680D1B] underline font-sans pt-1 cursor-pointer"
                >
                  {showHistory ? 'Ẩn danh sách khách' : `Xem danh sách đã xác nhận (${recentRSVPs.length})`}
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Form matching sketch screen 10 */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="block text-xs font-sans font-medium text-[#4A3B32]">
                  Tên của bạn
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập họ và tên của bạn..."
                  className="w-full px-3 py-2 text-xs font-sans rounded-md border border-[#D8D3C9] bg-white text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#680D1B] focus:border-[#680D1B] transition-all"
                  required
                />
              </div>

              {/* Attendance Choice */}
              <div className="space-y-1.5">
                <label className="block text-xs font-sans font-medium text-[#4A3B32]">
                  Câu hỏi mời
                </label>
                <div className="space-y-2 text-xs font-sans">
                  {/* Option 1: Attending */}
                  <label 
                    className={`flex items-center gap-2.5 p-2 rounded-md border transition-all cursor-pointer ${
                      attending === 'yes'
                        ? 'border-[#680D1B] bg-[#680D1B]/5 text-[#680D1B] font-medium'
                        : 'border-[#E8DFD5] bg-white text-[#5C524C] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={attending === 'yes'}
                      onChange={() => setAttending('yes')}
                      className="accent-[#680D1B] cursor-pointer"
                    />
                    <span>Mình sẽ đến tham dự</span>
                  </label>

                  {/* Option 2: Busy */}
                  <label 
                    className={`flex items-center gap-2.5 p-2 rounded-md border transition-all cursor-pointer ${
                      attending === 'no'
                        ? 'border-[#680D1B] bg-[#680D1B]/5 text-[#680D1B] font-medium'
                        : 'border-[#E8DFD5] bg-white text-[#5C524C] hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={attending === 'no'}
                      onChange={() => setAttending('no')}
                      className="accent-[#680D1B] cursor-pointer"
                    />
                    <span>Tiếc quá, mình có việc bận không thể đến</span>
                  </label>
                </div>
              </div>

              {/* Guest Count (if attending) */}
              {attending === 'yes' && (
                <div className="space-y-1 animate-in fade-in duration-200">
                  <label className="block text-xs font-sans font-medium text-[#4A3B32]">
                    Số người tham dự
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        type="button"
                        key={count}
                        onClick={() => setGuestCount(count)}
                        className={`flex-1 py-1.5 text-xs font-sans rounded-md border transition-colors cursor-pointer ${
                          guestCount === count
                            ? 'bg-[#680D1B] text-white border-[#680D1B]'
                            : 'bg-white text-[#4A3B32] border-[#D8D3C9] hover:bg-slate-50'
                        }`}
                      >
                        {count} {count === 1 ? 'người' : 'người'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="space-y-1">
                <label className="block text-xs font-sans font-medium text-[#4A3B32]">
                  Gửi lời nhắn đến chúng tớ nhé!
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Viết lời chúc mừng hạnh phúc..."
                  className="w-full px-3 py-2 text-xs font-sans rounded-md border border-[#D8D3C9] bg-white text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#680D1B] focus:border-[#680D1B] transition-all resize-none"
                />
              </div>

              {/* Error note if any */}
              {error && (
                <p className="text-[11px] text-rose-600 font-sans tracking-wide">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 px-6 rounded-full bg-[#680D1B] text-white font-sans text-xs tracking-widest font-semibold uppercase hover:bg-[#861E2E] transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN'}
              </motion.button>

              {/* Helper note matching sketch */}
              <p className="text-[10px] text-center text-[#7A6B62] italic font-sans">
                (Vui lòng xác nhận để chúng tớ có thể chuẩn bị chu đáo nhé)
              </p>
            </form>
          )}

          {/* Guestbook Drawer toggle */}
          {recentRSVPs.length > 0 && !submitted && (
            <div className="mt-3 text-center border-t border-[#E8DFD5] pt-2">
              <button
                type="button"
                onClick={() => setShowHistory(!showHistory)}
                className="text-[11px] text-[#680D1B] hover:underline font-sans cursor-pointer inline-flex items-center gap-1"
              >
                <Users size={12} />
                <span>{showHistory ? 'Ẩn' : `Xem danh sách đã phản hồi (${recentRSVPs.length})`}</span>
              </button>
            </div>
          )}

          {/* List of recent RSVPs */}
          {showHistory && recentRSVPs.length > 0 && (
            <div className="mt-3 max-h-40 overflow-y-auto custom-scrollbar border-t border-[#E8DFD5] pt-2 space-y-2">
              {recentRSVPs.map((r) => (
                <div key={r.id} className="text-left bg-white p-2 rounded-sm border border-[#E8DFD5] text-[11px]">
                  <div className="flex items-center justify-between font-medium text-[#1A1A1A]">
                    <span>{r.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      r.attending === 'yes' ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {r.attending === 'yes' ? `Tham dự (${r.guestCount})` : 'Bận việc'}
                    </span>
                  </div>
                  {r.message && <p className="text-[#6E5D53] italic mt-0.5">{r.message}</p>}
                </div>
              ))}
            </div>
          )}
          </div>
        </FadeUp>
      </div>

      {/* Footer Links matching Screen 10 in sketch */}
      <footer className="w-full py-4 text-center text-[10px] text-white/50 font-sans tracking-wide border-t border-[#861E2E]/40 px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white/80 transition-colors">
            Điều khoản và hỗ trợ
          </a>
          <span>·</span>
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white/80 transition-colors">
            Chính sách quyền riêng tư
          </a>
          <span>·</span>
          <span>Được thiết kế cho {weddingConfig.couple.groomName} &amp; {weddingConfig.couple.brideName}</span>
        </div>
      </footer>
    </section>
  );
};
