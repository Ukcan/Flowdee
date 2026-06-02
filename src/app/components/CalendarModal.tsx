import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from '@phosphor-icons/react';
import { CALENDAR_EMBED_URL } from '../constants/links';

/**
 * CalendarModal — in-site Google Calendar booking overlay.
 * Opens when a `flowdee:open-calendar` event is dispatched (see openCalendar()).
 * Keeps the visitor on the page instead of opening a new tab.
 */
export function CalendarModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('flowdee:open-calendar', onOpen);
    return () => window.removeEventListener('flowdee:open-calendar', onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) {
      document.addEventListener('keydown', onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-label="Réserver un appel"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg-depth/80 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-[760px] h-[82vh] max-h-[760px] bg-white border border-accent-border rounded-[20px] overflow-hidden shadow-soft"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-surface-1 border border-border-0 text-text-primary hover:border-accent-primary hover:text-accent-primary transition-colors"
            >
              <X size={20} weight="bold" />
            </button>

            <iframe
              src={CALENDAR_EMBED_URL}
              title="Réserver un appel — Flowdee"
              className="w-full h-full border-0"
              style={{ background: '#ffffff' }}
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
