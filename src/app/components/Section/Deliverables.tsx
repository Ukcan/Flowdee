import React, { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ListChecks, Layout, TextAa, ShieldCheck } from '@phosphor-icons/react';
import { StickySplit } from '../Layout/StickySplit';
import { StepPath } from '../Decor/StepPath';
import { AUDIT_SCOPE, AUDIT_SCOPE_NOTE } from '../../constants/offer';

/**
 * Section/Deliverables — "Ce que vous recevez après l'audit"
 *
 * Composition : progression narrative (sticky statement + étapes numérotées),
 * et non plus une grille de features. Le modèle mental visé est « système /
 * progression » : le lecteur voit un parcours ordonné qui transforme un
 * problème flou en décisions exploitables, pas une liste d'avantages.
 */

const DELIVERABLES = [
  {
    icon: <ListChecks size={20} weight="duotone" aria-hidden="true" />,
    title: 'Frictions UX priorisées',
    description: 'Ce qui bloque vraiment la compréhension et l’action.',
  },
  {
    icon: <Layout size={20} weight="duotone" aria-hidden="true" />,
    title: 'Corrections UI concrètes',
    description: 'Hiérarchie, CTA, sections, formulaires, états et composants.',
  },
  {
    icon: <TextAa size={20} weight="duotone" aria-hidden="true" />,
    /* « Textes du site réécrits » engageait la totalité des contenus. Le
       livrable porte sur la microcopy du périmètre audité. */
    title: 'Microcopy prioritaire réécrite',
    description: 'Titres, CTA, aides, erreurs, réassurances et FAQ du périmètre audité.',
  },
  {
    icon: <ShieldCheck size={20} weight="duotone" aria-hidden="true" />,
    /* Annonçait « répondre aux exigences européennes d'accessibilité » : une
       checklist repère des écarts, elle ne vaut ni conformité ni certification.
       Promettre l'un pour l'autre expose juridiquement le client comme le
       prestataire. */
    title: 'Contrôles SEO UX & accessibilité',
    description:
      'Repérage des principaux écarts WCAG 2.2 AA sur le périmètre audité — contrastes, focus, clavier, labels, alternatives textuelles et cibles interactives — et bases SEO UX : Hn, title, meta.',
  },
] as const;

export function DeliverablesSection() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  // Les étapes se dévoilent sur la même horloge que le tracé : quand le fil
  // approche un jalon, l'étape correspondante apparaît. La première reste
  // visible d'emblée, pour ne pas ouvrir la section sur du vide.
  const [revealed, setRevealed] = useState(1);

  // Position réelle de chaque jalon le long du tracé, fournie par StepPath.
  // Les étapes n'ont pas toutes la même hauteur (la dernière porte une
  // description sur deux lignes) : un espacement supposé régulier ferait
  // apparaître les dernières étapes en décalage avec le fil.
  const nodesRef = useRef<number[]>([]);
  const handleNodes = useCallback((fractions: number[]) => {
    nodesRef.current = fractions;
  }, []);

  const handleProgress = useCallback((p: number) => {
    const fractions = nodesRef.current;
    if (!fractions.length) return;
    // Devancement : l'étape apparaît un peu avant que le fil ne l'atteigne,
    // pour qu'on ne scrolle jamais vers une zone vide.
    const LEAD = 0.14;
    let count = 1;
    for (let i = 1; i < fractions.length; i++) {
      if (p >= fractions[i] - LEAD) count = i + 1;
    }
    setRevealed((prev) => (prev === count ? prev : count));
  }, []);

  return (
    <section
      id="deliverables"
      aria-labelledby="deliverables-title"
      /* Respiration élargie : cette section ouvre l'acte "solution" après le
         diagnostic — la frontière d'acte se joue d'abord dans le vide. */
      /* overflow-x-clip et non overflow-hidden : `hidden` ferait de la section
         le conteneur de reference du rail sticky, qui se retrouvait pousse de
         74px vers le bas et desaligne de la colonne de droite. `clip` protege
         d'un debordement horizontal sans creer de conteneur de defilement. */
      className="relative py-28 md:py-40 bg-surface-0 border-t border-border-0 overflow-x-clip"
    >
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
        <StickySplit
          aside={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
                Ce que vous recevez
              </p>
              <h2
                id="deliverables-title"
                className="heading-1 text-text-primary mt-5 text-balance"
              >
                Vous repartez avec un plan clair, pas avec des remarques abstraites.
              </h2>
              {/* Le périmètre est rappelé ici, au plus près du détail du
                  livrable : c'est le moment où le visiteur évalue ce qu'il
                  achète, et où l'absence de limite se lisait comme une
                  couverture illimitée. */}
              <div className="mt-8 pt-8 border-t border-border-0">
                <p className="font-body text-[11px] uppercase tracking-[0.18em] text-text-muted">
                  4 volets d’analyse
                </p>
                <p className="font-body text-[14px] leading-[1.6] text-text-secondary mt-3">
                  Périmètre : {AUDIT_SCOPE.charAt(0).toLowerCase() + AUDIT_SCOPE.slice(1)}.{' '}
                  {AUDIT_SCOPE_NOTE}
                </p>
              </div>
            </motion.div>
          }
        >
          <ol ref={stepsRef} className="relative">
            {/* Tracé serpentin reliant les jalons, dessiné au scroll.
                Il pilote aussi l'apparition des étapes via onProgress. */}
            {/* Gouttière élargie pour accueillir les pastilles : le tracé
                centre ses jalons sur `gutter / 2`, les deux valeurs doivent
                rester accordées. */}
            <StepPath
              containerRef={stepsRef}
              gutter={44}
              onProgress={handleProgress}
              onNodes={handleNodes}
            />

            {DELIVERABLES.map((d, i) => {
              const visible = i < revealed;
              // Sous `prefers-reduced-motion` on garde le fondu mais on
              // supprime le glissement : c'est le déplacement qui gêne les
              // personnes sensibles, pas la variation d'opacité.
              const reveal = reduce
                ? `transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`
                : `transition-[opacity,transform] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`;
              return (
              <li
                key={d.title}
                /* Révélation par simple bascule de classes CSS : l'état visible
                   dépend uniquement de la progression du scroll, sans boucle
                   d'animation à piloter. `reduce` court-circuite l'effet.
                   Le décalage vertical est purement visuel — StepPath mesure les
                   jalons en offsetTop, insensible aux transforms. */
                /* Gouttière à largeur fixe : le tracé SVG est centré dessus et
                   doit pouvoir s'y caler de façon déterministe. Élargie de 32 à
                   44px pour accueillir la pastille (voir `gutter` sur
                   StepPath). */
                className={`group grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 md:gap-x-6 pb-12 md:pb-16 last:pb-0 duration-500 ease-out ${reveal}`}
              >
                {/* Jalon posé sur le tracé. Il portait un simple point de 11px
                    et le pictogramme vivait devant le titre, où il coupait la
                    ligne de lecture : l'œil rencontrait une icône avant de
                    lire, et les titres ne démarraient pas sur un axe commun.

                    Le pictogramme entre dans la pastille : le jalon dit
                    désormais de quoi parle l'étape, les titres s'alignent tous
                    sur la même verticale, et le tracé relie des repères
                    porteurs de sens plutôt que des points neutres.

                    L'anneau couleur fond découpe le fil pour que la pastille
                    se détache. */}
                <div className="flex justify-center" aria-hidden="true">
                  <span
                    data-step-node
                    className="relative z-10 mt-[5px] grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-1 text-accent-primary ring-4 ring-surface-0 border border-border-1 transition-transform duration-300 group-hover:scale-110"
                  >
                    {d.icon}
                  </span>
                </div>

                <div className="relative pb-2">
                  <div className="relative">
                    <h3 className="font-heading text-[19px] md:text-[21px] font-medium text-text-primary tracking-[-0.01em] leading-tight mt-2.5">
                      {d.title}
                    </h3>
                    <p className="font-body text-[15px] leading-[1.65] text-text-secondary mt-2.5">
                      {d.description}
                    </p>
                  </div>
                </div>
              </li>
              );
            })}
          </ol>
        </StickySplit>
      </div>
    </section>
  );
}
