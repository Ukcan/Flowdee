import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from '@phosphor-icons/react';
import { openCalendar } from '../constants/links';
import { ButtonPrimary } from './Button/Primary';

/**
 * ThankYouModal — shown when the visitor returns from Stripe after a successful
 * payment. Stripe Payment Link must be configured to redirect to:
 *   https://<your-domain>/?payment=success
 */
export function ThankYouModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') === 'success') {
      setOpen(true);
      // Clean the URL so a refresh doesn't re-trigger the modal
      params.delete('payment');
      const clean = window.location.pathname + (params.toString() ? `?${params}` : '');
      window.history.replaceState({}, '', clean);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
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
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-label="Merci pour votre achat"
        >
          <div className="absolute inset-0 bg-bg-depth/80 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-[520px] bg-surface-0 border border-accent-border rounded-[24px] p-10 text-center shadow-soft"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-surface-1 border border-border-0 text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-colors"
            >
              <X size={18} weight="bold" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent-bg border border-accent-border flex items-center justify-center">
                <CheckCircle size={36} weight="duotone" className="text-accent-primary" />
              </div>
            </div>

            <h2 className="heading-3 text-text-primary mb-3">Merci pour votre confiance&nbsp;!</h2>
            <p className="body text-text-secondary mb-2">
              Votre paiement a bien été reçu. Vous allez recevoir un email de confirmation avec votre reçu.
            </p>
            <p className="body text-text-secondary mb-8">
              Prochaine étape&nbsp;: planifions ensemble le kickoff de votre audit (30&nbsp;min).
            </p>

            <ButtonPrimary
              onClick={() => { setOpen(false); openCalendar(); }}
              size="m"
              className="w-full"
            >
              Réserver le kickoff (30 min)
            </ButtonPrimary>
            <button
              onClick={() => setOpen(false)}
              className="mt-3 font-body text-[13px] text-text-muted hover:text-text-primary transition-colors"
            >
              Plus tard
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
