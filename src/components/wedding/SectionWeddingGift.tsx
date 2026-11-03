import React, { useState } from 'react';
import { QrCode } from 'lucide-react';

export const SectionWeddingGift: React.FC = () => (
  <section className="border-y border-[#E6DDD2] bg-[#F8F6F4] text-center text-[#2D2521]">
    <div className="relative mx-auto w-full max-w-[430px] overflow-hidden border border-[#C7B28A]/80 bg-[#FBF8F2] px-5 pb-6 pt-8 sm:px-7 shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-[7px] border border-[#C7B28A]/35" />
      <div className="relative z-10">
        <span className="font-sans text-[9px] uppercase tracking-[0.32em] text-[#9A7B55]">
          Hoàng Việt <span className="px-1 text-[#680D1B]">&amp;</span> Cẩm Nhung
        </span>
        <h2 className="mt-1 font-script text-[42px] leading-tight text-[#680D1B]">Wedding Gift</h2>
        <div className="mx-auto mt-2 flex w-36 items-center gap-2 text-[#C7B28A]">
          <span className="h-px flex-1 bg-current/70" />
          <span className="text-[10px]">◆</span>
          <span className="h-px flex-1 bg-current/70" />
        </div>
        <p className="mx-auto mt-3 max-w-[270px] font-serif text-xs italic leading-relaxed text-[#75675C]">
          Quét mã QR để gửi lời chúc mừng tới cô dâu hoặc chú rể.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
          <QrCard label="Cô dâu" imageUrl="/assets/images/qr-bride.png" />
          <QrCard label="Chú rể" imageUrl="/assets/images/qr-groom.png" />
        </div>

        <p className="mt-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#9A7B55]">
          Trân trọng cảm ơn tấm lòng của bạn
        </p>
      </div>
    </div>
  </section>
);

const QrCard: React.FC<{ label: string; imageUrl: string }> = ({ label, imageUrl }) => {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div className="rounded-xl border border-[#D9C7A7] bg-gradient-to-b from-[#FFFEFB] to-[#F8F2E8] p-2.5 shadow-[0_7px_20px_rgba(79,31,30,0.1)]">
      <p className="mb-2 font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8B6E4B]">{label}</p>
      <div className="mx-auto grid aspect-[3/4] w-full max-w-[148px] place-items-center overflow-hidden rounded-lg border border-[#E9DFD0] bg-white shadow-inner">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={`Mã QR ${label.toLowerCase()}`}
            onError={() => setHasImage(false)}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 px-2 text-[#9A8978]">
            <QrCode size={34} strokeWidth={1.2} />
            <span className="font-sans text-[9px] leading-snug">Thêm ảnh QR {label.toLowerCase()}</span>
          </div>
        )}
      </div>
    </div>
  );
};
