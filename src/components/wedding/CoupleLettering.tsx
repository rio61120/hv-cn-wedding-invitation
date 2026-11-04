import React from "react";
import { weddingConfig } from "../../config/wedding";

interface CoupleLetteringProps {
  className?: string;
  nameClassName?: string;
  groomName?: string;
  brideName?: string;
  nameWeightClassName?: string;
  fontClassName?: string;
  showAmpersand?: boolean;
}

export const CoupleLettering: React.FC<CoupleLetteringProps> = ({
  className = "",
  nameClassName = "text-[clamp(1.65rem,24cqi,3.6rem)]",
  groomName = weddingConfig.couple.groomName,
  brideName = weddingConfig.couple.brideName,
  nameWeightClassName = "font-semibold",
  fontClassName = "font-couple",
  showAmpersand = false,
}) => (
  <div
    role="img"
    aria-label={`${groomName} & ${brideName}`}
    className={`@container flex w-full flex-col items-center text-[#F4E6D0] ${nameClassName} ${className}`}
  >
    <span
      className={`block whitespace-nowrap ${fontClassName} ${nameWeightClassName} leading-[1.05]`}
    >
      {groomName}
    </span>
    {showAmpersand && (
      <span
        className={`${fontClassName} ${nameWeightClassName} leading-[1.05] mb-1 mt-2`}
      >
        &amp;
      </span>
    )}
    <span
      className={`block whitespace-nowrap ${fontClassName} ${nameWeightClassName} leading-[1.05]`}
    >
      {brideName}
    </span>
  </div>
);
