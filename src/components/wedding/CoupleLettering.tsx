import React from "react";
import { weddingConfig } from "../../config/wedding";

interface CoupleLetteringProps {
  className?: string;
  nameClassName?: string;
  groomName?: string;
  brideName?: string;
  nameWeightClassName?: string;
  showAmpersand?: boolean;
}

export const CoupleLettering: React.FC<CoupleLetteringProps> = ({
  className = "",
  nameClassName = "text-[clamp(1.65rem,24cqi,3.6rem)]",
  groomName = weddingConfig.couple.groomName,
  brideName = weddingConfig.couple.brideName,
  nameWeightClassName = "font-semibold",
  showAmpersand = false,
}) => (
  <div
    role="img"
    aria-label={`${groomName} & ${brideName}`}
    className={`@container flex w-full flex-col items-center text-[#F4E6D0] ${nameClassName} ${className}`}
  >
    <span
      className={`block whitespace-nowrap font-couple ${nameWeightClassName} leading-[1.05]`}
    >
      {groomName}
    </span>
    {showAmpersand && (
      <span
        className={`${nameWeightClassName} leading-8 text-xl font-cormorant mb-3`}
      >
        &amp;
      </span>
    )}
    <span
      className={`block whitespace-nowrap font-couple ${nameWeightClassName} leading-[1.05]`}
    >
      {brideName}
    </span>
  </div>
);
