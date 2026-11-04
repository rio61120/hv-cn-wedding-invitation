import React from "react";
import { motion } from "motion/react";
import { weddingConfig } from "../../config/wedding";

interface CoupleLetteringProps {
  className?: string;
  nameClassName?: string;
  groomName?: string;
  brideName?: string;
  nameWeightClassName?: string;
  fontClassName?: string;
  showAmpersand?: boolean;
  reveal?: boolean;
}

const LetterLine: React.FC<{
  children: React.ReactNode;
  className: string;
  delay: number;
  reveal: boolean;
}> = ({ children, className, delay, reveal }) => {
  if (!reveal) return <span className={className}>{children}</span>;

  return (
    <motion.span
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.span>
  );
};

export const CoupleLettering: React.FC<CoupleLetteringProps> = ({
  className = "",
  nameClassName = "text-[clamp(1.65rem,24cqi,3.6rem)]",
  groomName = weddingConfig.couple.groomName,
  brideName = weddingConfig.couple.brideName,
  nameWeightClassName = "font-semibold",
  fontClassName = "font-couple",
  showAmpersand = false,
  reveal = false,
}) => (
  <div
    role="img"
    aria-label={`${groomName} & ${brideName}`}
    className={`@container flex w-full flex-col items-center text-[#F4E6D0] ${nameClassName} ${className}`}
  >
    <LetterLine delay={0.12} reveal={reveal} className={`block whitespace-nowrap ${fontClassName} ${nameWeightClassName} leading-[1.05]`}>
      {groomName}
    </LetterLine>
    {showAmpersand && (
      <LetterLine delay={0.34} reveal={reveal} className={`${fontClassName} ${nameWeightClassName} leading-[1.05] mb-1 mt-2`}>
        &amp;
      </LetterLine>
    )}
    <LetterLine delay={0.56} reveal={reveal} className={`block whitespace-nowrap ${fontClassName} ${nameWeightClassName} leading-[1.05]`}>
      {brideName}
    </LetterLine>
  </div>
);
