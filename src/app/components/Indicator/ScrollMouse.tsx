import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Section map — ordered list of section IDs with their contextual labels.
 * The label shown is the NEXT section the user will scroll to.
 */
const SECTIONS = [
  /* Chaque libellé nomme la destination telle qu'on la trouvera : il reprend
     le surtitre de la section quand elle en a un. Une version raccourcie pour
     gagner de la largeur avait fini par renommer les sections — l'indicateur
     annonçait « Méthode » pour une section intitulée « Notre approche ». */
  { id: 'hero', label: 'Découvrir' },
  { id: 'problems', label: 'Frictions UX' },
  { id: 'deliverables', label: 'Livrables' },
  { id: 'services', label: 'Offres & tarifs' },
  { id: 'case-studies', label: 'Réalisations' },
  { id: 'approche', label: 'Notre approche' },
  { id: 'ia-workflow', label: 'Optimisation IA' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
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

  /* ─── Section courante, position et visibilité ──────────────────────
     La détection se fait par une ligne de référence plutôt que par un
     IntersectionObserver : l'observateur ne comparait que les sections dont
     l'intersection venait de changer, si bien que celle qui occupait
     réellement l'écran était souvent absente du lot. Et son ratio étant
     relatif à la hauteur de chaque section, une section courte l'emportait
     sur une longue même quand cette dernière remplissait la fenêtre.

     Règle retenue, déterministe : la section courante est la dernière dont
     le haut a franchi une ligne située à 35% de la hauteur d'écran. */
  const handleScroll = useCallback(() => {
    const winHeight = window.innerHeight || 1;
    const line = winHeight * 0.35;

    let index = 0;
    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= line) index = i;
    });
    setCurrentIndex(index);

    const docHeight = document.documentElement.scrollHeight;
    const scrollable = docHeight - winHeight;
    // Garde contre 0/0 : page plus courte que la fenêtre, ou défilement
    // verrouillé par une modale ouverte — sans quoi le ratio vaut NaN et
    // l'indicateur disparaissait sans jamais revenir.
    const scrollPercent = scrollable > 0 ? window.scrollY / scrollable : 0;

    setIsVisible(scrollPercent < 0.97);
    setIsAtBottom(scrollPercent > 0.85);
  }, []);

  useEffect(() => {
    // Exécuté au montage : après un rechargement avec restauration de la
    // position, l'état de départ était celui du haut de page.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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

  /* ─── Libellé : la section où l'on se trouve ────────────────────────
     Il nommait la section suivante alors que la jauge marque la section
     courante : les deux étaient décalés d'un cran, et empilés ils se
     lisaient comme une seule information — d'où l'impression que le
     changement se déclenchait trop tôt. Les deux disent maintenant la même
     chose ; le clic, lui, mène toujours à la suite. */
  const nextLabel = isAtBottom ? 'Haut' : SECTIONS[currentIndex]?.label ?? '';

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
             le coin bas gauche (56px + 24px de marge).
             Aligné à gauche et non centré : les noms de section n'ont pas la
             même longueur, un centrage ferait glisser la souris horizontalement
             à chaque changement. La largeur reste libre pour que le libellé
             tienne sur une ligne. */
          className="hidden md:flex fixed bottom-32 left-6 z-40 flex-col-reverse items-start gap-2.5 pointer-events-none"
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
            /* Le libellé visible nomme la section courante ; le clic mène à la
               suivante. Le nom accessible doit donc décrire la destination
               réelle, sans quoi il contredirait l'action. */
            aria-label={
              isAtBottom
                ? 'Retour en haut de page'
                : `Aller à la section suivante : ${SECTIONS[Math.min(currentIndex + 1, SECTIONS.length - 1)].label}`
            }
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
          <div className="flex flex-col items-start gap-2" aria-hidden="true">
            {/* Next section label */}
            <AnimatePresence mode="wait">
              <motion.span
                key={nextLabel}
                className="
                  font-body text-[9px] font-medium uppercase tracking-[0.18em]
                  text-text-muted select-none whitespace-nowrap
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

            {/* Jauge de progression — verticale, comme le défilement qu'elle
                représente. Elle ne fait plus que 3px de large, ce qui libère
                d'autant la marge gauche au-dessus du contenu.
                Centrée sur la largeur du bouton (44px) pour tomber sur le même
                axe que la souris : jauge et curseur se lisent alors comme un
                seul élément vertical, et non comme deux colonnes décalées. */}
            <div className="flex w-11 flex-col items-center gap-[3px]">
              {SECTIONS.map((s, i) => (
                <span
                  key={s.id}
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: 3,
                    height: i === currentIndex ? 8 : 3,
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