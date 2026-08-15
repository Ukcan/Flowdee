import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Section map — ordered list of section IDs with their contextual labels.
 * The label shown is the NEXT section the user will scroll to.
 */
const SECTIONS = [
  { id: 'hero', label: 'Découvrir' },
  { id: 'problems', label: 'Frictions UX' },
  { id: 'services', label: 'Offres & Tarifs' },
  { id: 'case-studies', label: 'Cas clients' },
  { id: 'approche', label: 'Ma méthode' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Réserver un appel' },
] as const;

/**
 * ScrollMouseIndicator
 * Fixed global scroll-encouragement indicator.
 * Follows the user, adapts label to the next section,
 * flips direction near the bottom, hides at footer.
 */
export function ScrollMouseIndicator() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* ─── Detect current section via IntersectionObserver ─── */
  useEffect(() => {
    const sectionEls = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        /* Find the most visible section */
        let maxRatio = 0;
        let maxId = '';
        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxId = entry.target.id;
          }
        });

        if (maxId) {
          const idx = SECTIONS.findIndex(s => s.id === maxId);
          if (idx !== -1) setCurrentIndex(idx);
        }
      },
      {
        threshold: [0, 0.15, 0.3, 0.5],
        rootMargin: '-10% 0px -10% 0px',
      }
    );

    sectionEls.forEach(el => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  /* ─── Detect bottom of page & initial scroll ─── */
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollY / (docHeight - winHeight);

    if (!hasScrolled && scrollY > 50) {
      setHasScrolled(true);
    }

    /* Near the very bottom (last 3%) → hide entirely */
    setIsVisible(scrollPercent < 0.97);

    /* In the last ~15% of the page → flip to "scroll up" mode */
    setIsAtBottom(scrollPercent > 0.85);
  }, [hasScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ─── Click handler: scroll to next section or back to top ─── */
  const handleClick = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const nextIndex = Math.min(currentIndex + 1, SECTIONS.length - 1);
    const nextSection = document.getElementById(SECTIONS[nextIndex].id);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ─── Contextual label: next section or "Haut" ─── */
  const nextLabel = isAtBottom
    ? 'Haut'
    : currentIndex < SECTIONS.length - 1
      ? SECTIONS[currentIndex + 1].label
      : '';

  /* Current section label — eyebrow micro-text above */
  const currentLabel = SECTIONS[currentIndex]?.label ?? '';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          /* Empilement vertical : libellé et jauge au-dessus de la souris,
             centrés sur elle. `col-reverse` place le bloc décoratif au-dessus
             tout en gardant le bouton en premier dans le DOM (ordre de
             tabulation inchangé). */
          /* Remonté au-dessus du bouton d'accessibilité, qui occupe désormais
             le coin bas gauche (56px + 24px de marge). */
          className="hidden md:flex fixed bottom-32 left-6 z-40 w-14 flex-col-reverse items-center gap-3 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mouse icon — interactive */}
          <motion.button
            onClick={handleClick}
            className="
              flex flex-col items-center
              cursor-pointer bg-transparent border-none
              min-h-[44px] min-w-[44px]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2
              transition-opacity duration-300 hover:opacity-70
              pointer-events-auto
            "
            aria-label={isAtBottom ? 'Retour en haut de page' : `Aller à la section ${nextLabel}`}
            type="button"
          >
            <motion.svg
              width="20"
              height="30"
              viewBox="0 0 20 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent-primary"
              animate={{ rotate: isAtBottom ? 180 : 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Outer shell */}
              <rect
                x="0.5"
                y="0.5"
                width="19"
                height="29"
                rx="9.5"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              {/* Scroll wheel — animated line */}
              <motion.line
                x1="10"
                y1="8"
                x2="10"
                y2="12"
                stroke="currentColor"
                strokeWidth="0.75"
                strokeLinecap="round"
                animate={{
                  y1: [8, 11.5],
                  y2: [12, 15.5],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 0.6,
                }}
              />
            </motion.svg>
          </motion.button>

          {/* Libellé + jauge, empilés au-dessus de la souris — purement
              décoratifs, redondants avec l'aria-label du bouton, masqués aux
              technologies d'assistance */}
          <div className="flex flex-col items-center" aria-hidden="true">
            {/* Next section label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={nextLabel}
                className="
                  font-body text-[9px] font-medium uppercase tracking-[0.18em]
                  text-text-muted mb-1 select-none
                  pointer-events-none
                "
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 0.6, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {nextLabel}
              </motion.span>
            </AnimatePresence>

            {/* Tiny progress dots — shows position in section order */}
            <div className="flex gap-[3px]">
              {SECTIONS.map((s, i) => (
                <span
                  key={s.id}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? 8 : 3,
                    height: 3,
                    backgroundColor: i === currentIndex
                      ? 'var(--accent-primary)'
                      : 'var(--border-1)',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}