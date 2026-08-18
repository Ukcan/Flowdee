import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

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
  { id: 'approche', label: 'Mon approche' },
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
  // Les boucles d'animation sont pilotées en JS : une règle CSS ne les arrête
  // pas. Il faut donc les couper explicitement quand le visiteur a demandé
  // moins de mouvement — le repère reste alors affiché, simplement immobile.
  const reduce = useReducedMotion();

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

    // L'indicateur s'effaçait dans les 3 derniers pourcents de la page. Il
    // disparaissait donc exactement dans le pied de page, au moment précis où
    // il sert le plus : c'est désormais le seul retour en haut sur desktop.
    // Tant qu'il n'était qu'une invitation à faire défiler, le masquer en fin
    // de course se tenait ; ce n'est plus ce qu'il fait.
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

  return (
    <motion.div
          /* Empilement vertical : libellé et jauge au-dessus de la souris,
             centrés sur elle. `col-reverse` place le bloc décoratif au-dessus
             tout en gardant le bouton en premier dans le DOM (ordre de
             tabulation inchangé). */
          /* Coin bas droit, à la place du bouton « retour en haut » : celui-ci
             faisait double emploi, l'indicateur basculant déjà dans ce rôle
             passé 85% de la page. Deux contrôles pour la même action, dans
             deux coins opposés. Le coin gauche revient au seul bouton
             d'accessibilité, dont le panneau s'ouvre vers la droite.
             Aligné à droite et non centré : les noms de section n'ont pas la
             même longueur, un centrage ferait glisser la souris horizontalement
             à chaque changement. La largeur reste libre pour que le libellé
             tienne sur une ligne. */
          className="hidden md:flex fixed bottom-8 right-8 z-40 flex-col-reverse items-end gap-2.5 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mouse icon — interactive */}
          <motion.button
            onClick={handleClick}
            /* L'anneau de focus reprend la convention de `.focus-ring` dans
               globals.css. Il manquait ici la couleur du liseré : Tailwind
               retombe alors sur son défaut, du blanc opaque, ce qui dessinait
               un carré blanc franc autour de la souris sur fond navy. Le rayon
               manquait aussi, d'où un anneau carré autour d'une icône arrondie.
               La couleur passe enfin de `accent-ring` (or à 35% d'opacité, trop
               faible pour un indicateur de focus) à `focus-ring`, qui est
               opaque. */
            className="
              flex flex-col items-center
              cursor-pointer bg-transparent border-none rounded-2xl
              min-h-[44px] min-w-[44px]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
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
            {/* La coque ne bouge plus : elle pivotait de 180° en bas de page,
                sans aucun effet visible puisque la forme est symétrique. Seul
                le repère intérieur change, et c'est lui qui porte le sens. */}
            <svg
              width="20"
              height="30"
              viewBox="0 0 20 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-accent-primary"
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

              {/* Repère intérieur — molette qui descend, ou chevron vers le
                  haut une fois la page parcourue. Le chevron est dessiné à la
                  main plutôt que pris dans Phosphor : à 20px de large et 0.75
                  d'épaisseur de trait, une icône du pack aurait sa propre
                  graisse et jurerait avec le trait de la coque.
                  Le mouvement passe par une translation du groupe et non par
                  les attributs y1/y2 : motion les interpolait en valeurs sans
                  unité que le SVG refusait, ce qui inondait la console
                  d'erreurs « Expected length, "undefined" ». */}
              {/* Les deux repères restent montés et se croisent en opacité,
                  pilotée par une transition CSS et non par un AnimatePresence :
                  le basculement est ici porteur de sens (il annonce le retour
                  en haut), il ne doit pas dépendre de l'achèvement d'une
                  animation de sortie. */}
              <g
                className={`transition-opacity duration-200 ${isAtBottom ? 'opacity-0' : 'opacity-100'}`}
              >
                <motion.line
                  x1="10"
                  y1="8"
                  x2="10"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinecap="round"
                  animate={reduce || isAtBottom ? undefined : { y: [0, 3.5], opacity: [1, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatDelay: 0.6,
                  }}
                />
              </g>

              <g
                data-repere="haut"
                className={`transition-opacity duration-200 ${isAtBottom ? 'opacity-100' : 'opacity-0'}`}
              >
                <motion.path
                  d="M6.6 16.4 L10 12.9 L13.4 16.4"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={reduce || !isAtBottom ? undefined : { y: [1.6, -1.6, 1.6], opacity: [0.55, 1, 0.55] }}
                  transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                />
              </g>
            </svg>
          </motion.button>

          {/* Libellé + jauge, empilés au-dessus de la souris — purement
              décoratifs, redondants avec l'aria-label du bouton, masqués aux
              technologies d'assistance */}
          <div className="flex flex-col items-end gap-2" aria-hidden="true">
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
  );
}