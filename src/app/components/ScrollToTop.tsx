import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from '@phosphor-icons/react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update visibility
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={scrollToTop}
          className="group fixed bottom-24 md:bottom-8 right-8 z-[100] min-w-[48px] min-h-[48px] flex items-center justify-center bg-surface-0 border border-border-0 text-accent-primary rounded-full transition-colors duration-200 hover:bg-accent-tint hover:border-accent-primary hover:shadow-[0_6px_20px_-6px_var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-focus-ring"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}