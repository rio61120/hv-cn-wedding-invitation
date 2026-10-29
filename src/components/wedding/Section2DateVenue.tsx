import React, { useState } from "react";
import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";
import { GoldMonogramCrest } from "./Decor";
import { MapPin, Navigation, Copy, Check } from "lucide-react";

export const Section2DateVenue: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const currentEvent = weddingConfig.events.thanhHon;

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(currentEvent.address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden border-b border-[#E4DDD4] bg-[#F8F6F4] text-[#1A1A1A]">
      <div className="px-5 py-10 text-center sm:px-7">
        <div className="mx-auto mb-5 grid max-w-[340px] grid-cols-2 divide-x divide-[#D8D3C9]">
          {(["groom", "bride"] as const).map((side) => {
            const family = weddingConfig.families[side];
            return (
              <div key={side} className="px-2.5">
                <h2 className="mb-2 font-serif text-[11px] tracking-[0.16em] text-[#680D1B]">
                  {family.label}
                </h2>
                <p className="font-serif text-xs italic leading-relaxed text-[#2D2521]">
                  {family.father}
                  <br />
                  {family.mother}
                </p>
                <p className="mt-1.5 font-sans text-[9px] leading-relaxed text-[#74675D]">
                  {family.address}
                </p>
              </div>
            );
          })}
        </div>

        <GoldMonogramCrest size={96} className="mb-3" />

        <motion.div
          key="wedding-day"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-serif text-sm font-medium uppercase tracking-[0.12em]">
            {currentEvent.title} được tổ chức
          </h3>
          <p className="mt-1 font-serif text-sm uppercase tracking-[0.14em]">
            vào lúc {currentEvent.time}
          </p>
          <p className="mt-3 font-serif text-xs uppercase tracking-[0.2em] text-[#680D1B]">
            {weddingConfig.date.month}
          </p>

          <div className="mx-auto mt-3 flex max-w-[290px] items-center justify-between border-t border-[#82786E] py-2.5">
            <span className="w-1/3 text-left font-serif text-[11px] uppercase tracking-wider">
              {currentEvent.dayOfWeek}
            </span>
            <span className="w-1/3 font-serif text-4xl leading-none text-[#680D1B]">
              {weddingConfig.date.day}
            </span>
            <span className="w-1/3 text-right font-serif text-sm tracking-wider">
              {weddingConfig.date.year}
            </span>
          </div>
          <p className="mt-2 font-serif text-xs italic text-[#665950]">
            ({currentEvent.lunarDate})
          </p>

          <div className="mx-auto mt-6 max-w-[320px] border-t border-[#DED6CC] pt-5">
            <MapPin
              size={20}
              className="mx-auto mb-2 fill-[#680D1B] text-[#F8F6F4]"
              aria-hidden="true"
            />
            <h4 className="font-serif text-sm font-semibold uppercase tracking-[0.12em] text-[#680D1B]">
              {currentEvent.venueName}
            </h4>
            <p className="mt-1 px-1 font-serif text-xs leading-relaxed text-[#4A3B32]">
              {currentEvent.address}
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <a
                href={currentEvent.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#680D1B] px-4 font-sans text-[11px] text-white transition-colors hover:bg-[#861E2E]"
              >
                <Navigation size={13} aria-hidden="true" /> Chỉ đường
              </a>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#D8D3C9] px-4 font-sans text-[11px] text-[#4A3B32] transition-colors hover:bg-white"
              >
                {copied ? (
                  <Check size={13} aria-hidden="true" />
                ) : (
                  <Copy size={13} aria-hidden="true" />
                )}
                {copied ? "Đã sao chép" : "Sao chép địa chỉ"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
