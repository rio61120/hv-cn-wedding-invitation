import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import type { Transition } from 'motion/react';

// Transition presets
const defaultTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
};

interface AnimationProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
}

/**
 * Slide up from below with fade-in (viewport: once)
 */
export const FadeUp: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  className = '',
  amount = 0.15,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
    transition={{ ...defaultTransition, duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Slide down from top with fade-in (viewport: once)
 */
export const FadeDown: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  className = '',
  amount = 0.15,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y: -28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
    transition={{ ...defaultTransition, duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Slide in from LEFT (viewport: once) — 2 bên đi vào
 */
export const SlideInLeft: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  className = '',
  amount = 0.15,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, x: -36 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
    transition={{ ...defaultTransition, duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Slide in from RIGHT (viewport: once) — 2 bên đi vào
 */
export const SlideInRight: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  className = '',
  amount = 0.15,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, x: 36 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
    transition={{ ...defaultTransition, duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Scale up smoothly with fade-in (viewport: once)
 */
export const ScaleIn: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  className = '',
  amount = 0.15,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.88 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
    transition={{ ...defaultTransition, duration, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

/**
 * Stagger container for children
 */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  amount?: number;
}> = ({ children, staggerDelay = 0.12, className = '', amount = 0.15 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
    variants={{
      hidden: {},
      show: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 24, scale: 0.96 },
      show: { opacity: 1, y: 0, scale: 1, transition: defaultTransition },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
