import React from 'react';
import { useScrollReveal, RevealVariant } from '../../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  staggerAmount?: number;
  threshold?: string;
  once?: boolean;
  childSelector?: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * ScrollReveal — wrapper composant pour les animations au scroll (GSAP ScrollTrigger).
 *
 * Usage simple :
 *   <ScrollReveal variant="fadeUp">
 *     <MonComposant />
 *   </ScrollReveal>
 *
 * Usage stagger (révèle chaque enfant direct en cascade) :
 *   <ScrollReveal variant="stagger" staggerAmount={0.2}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </ScrollReveal>
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  staggerAmount = 0.15,
  threshold = 'top 88%',
  once = true,
  childSelector,
  className,
  as: Tag = 'div',
}) => {
  const ref = useScrollReveal({
    variant,
    delay,
    duration,
    staggerAmount,
    threshold,
    once,
    childSelector,
  });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};
