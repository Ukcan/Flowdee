import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type RevealVariant =
  | 'fadeUp'      // fade + montée (sections standard)
  | 'fadeIn'      // fade simple (hero, overlays)
  | 'fadeLeft'    // slide depuis la gauche
  | 'fadeRight'   // slide depuis la droite
  | 'scaleUp'     // zoom in léger (cards, images)
  | 'stagger';    // révélation enfants en cascade

interface UseScrollRevealOptions {
  variant?: RevealVariant;
  delay?: number;         // délai en secondes
  duration?: number;      // durée en secondes
  staggerAmount?: number; // total stagger en secondes (variant stagger)
  threshold?: string;     // ex: "top 85%" — quand déclencher
  once?: boolean;         // ne joue qu'une fois (défaut: true)
  childSelector?: string; // sélecteur enfants pour stagger (défaut: ':scope > *')
}

const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  fadeUp:    { opacity: 0, y: 48 },
  fadeIn:    { opacity: 0 },
  fadeLeft:  { opacity: 0, x: -48 },
  fadeRight: { opacity: 0, x: 48 },
  scaleUp:   { opacity: 0, scale: 0.92 },
  stagger:   { opacity: 0, y: 32 },
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    variant = 'fadeUp',
    delay = 0,
    duration = 0.7,
    staggerAmount = 0.15,
    threshold = 'top 88%',
    once = true,
    childSelector = ':scope > *',
  } = options;

  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const fromVars = VARIANTS[variant];
      const toVars: gsap.TweenVars = {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: threshold,
          once,
        },
      };

      if (variant === 'stagger') {
        const children = ref.current.querySelectorAll(childSelector);
        if (children.length) {
          gsap.from(children, {
            ...fromVars,
            duration,
            delay,
            ease: 'power3.out',
            stagger: { amount: staggerAmount, from: 'start' },
            scrollTrigger: {
              trigger: ref.current,
              start: threshold,
              once,
            },
          });
        }
      } else {
        gsap.from(ref.current, { ...fromVars, ...toVars });
      }
    },
    { scope: ref }
  );

  return ref;
}
