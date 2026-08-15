import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, X } from 'lucide-react';
import { ButtonPrimary } from '../Button/Primary';
import { CALENDAR_LINK } from '../../constants/links';
import { cn } from '../ui/utils';

/**
 * StickyCTA Component
 * High-contrast Indigo version with white CTA.
 * Respects "Quiet Intelligence" with bold color application.
 */

const DISMISS_KEY = 'flowdee-sticky-dismissed-at';
const DISMISS_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const openCalendar = () => {
    window.open(CALENDAR_LINK, '_blank', 'noopener,noreferrer');
  };

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
  }, []);

  useEffect(() => {
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const timeSinceDismiss = Date.now() - parseInt(dismissedAt, 10);
      if (timeSinceDismiss < DISMISS_DURATION) {
        setIsDismissed(true);
        return;
      }
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (currentScrollY / scrollHeight) * 100;

      if (scrollPercent > 15 && !isDismissed) {
        setIsVisible(true);
      }

      if (isVisible && !isDismissed) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          if (currentScrollY - lastScrollY > 20) setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          if (lastScrollY - currentScrollY > 20) setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isVisible, isDismissed, lastScrollY]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-8 inset-x-0 z-[100] px-4 flex justify-center pointer-events-none"
        >
          <div className={cn(
            "pointer-events-auto",
            "flex items-center gap-4 md:gap-6",
            "bg-surface-0/95 backdrop-blur-md", 
            "border border-border-0",
            "rounded-full shadow-panel",
            "p-2 pr-2 pl-4 md:pl-6",
            "min-h-[56px] max-w-full md:w-fit"
          )}>
            
            {/* CONTENT: Icon + Text */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-7 h-7 bg-surface-1 text-accent-primary rounded-full items-center justify-center shrink-0">
                <ArrowRight size={16} strokeWidth={2.5} />
              </div>
              <p className="font-heading text-[13px] md:text-[14px] font-light text-text-primary whitespace-nowrap uppercase tracking-[0.04em]">
                Prêt à supprimer les frictions ?
              </p>
            </div>

            {/* SEPARATOR */}
            <div className="hidden md:block h-6 w-px bg-border-0" />

            {/* ACTIONS: CTA + Close */}
            <div className="flex items-center gap-2">
              <ButtonPrimary 
                onClick={openCalendar}
                className="h-10 px-5 md:px-6 text-[13px] md:text-[14px] font-bold rounded-[14px] !bg-transparent !border-accent-primary !text-accent-primary hover:!bg-accent-bg hover:!text-accent-hover"
              >
                Prendre rendez-vous →
              </ButtonPrimary>

              <button 
                onClick={handleDismiss}
                className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary transition-all rounded-xl hover:bg-state-hover-bg"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}