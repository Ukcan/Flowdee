import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/**
 * ParallaxHeading — wraps a section heading and drifts it gently on scroll
 * for a light sense of depth. Continuous parallax lives on this outer wrapper,
 * so any entrance animation on the inner heading keeps working independently.
 */
interface ParallaxHeadingProps {
  children: React.ReactNode;
  className?: string;
  /** Max vertical drift in px (default 36). */
  amount?: number;
}

export function ParallaxHeading({ children, className, amount = 36 }: ParallaxHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div ref={ref} style={{ y, willChange: 'transform' }} className={className}>
      {children}
    </motion.div>
  );
}
