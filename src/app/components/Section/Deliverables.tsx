import React from 'react';
import { motion } from 'motion/react';
import { ListChecks, Layout, TextAa, ShieldCheck } from '@phosphor-icons/react';
import { StickySplit } from '../Layout/StickySplit';

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
    icon: <ListChecks size={18} weight="duotone" aria-hidden="true" />,
    title: 'Frictions UX priorisées',
    description: 'Ce qui bloque vraiment la compréhension et l’action.',
  },
  {
    icon: <Layout size={18} weight="duotone" aria-hidden="true" />,
    title: 'Corrections UI concrètes',
    description: 'Hiérarchie, CTA, sections, formulaires, états et composants.',
  },
  {
    icon: <TextAa size={18} weight="duotone" aria-hidden="true" />,
    title: 'Textes du site réécrits',
    description: 'Titres, CTA, aides, erreurs, réassurances et FAQ.',
  },
  {
    icon: <ShieldCheck size={18} weight="duotone" aria-hidden="true" />,
    title: 'Checklist SEO & accessibilité',
    description:
      'Pour répondre aux exigences européennes d’accessibilité et sécuriser vos bases SEO : Hn, title, meta, contrastes, focus, labels, textes alternatifs.',
  },
] as const;

export function DeliverablesSection() {
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
              <p className="font-body text-[11px] uppercase tracking-[0.18em] text-text-muted mt-8 pt-8 border-t border-border-0">
                4 volets d’analyse
              </p>
            </motion.div>
          }
        >
          <ol className="relative">
            {DELIVERABLES.map((d, i) => (
              <motion.li
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                /* Espacement genereux entre etapes : donne au rail sticky une
                   course reelle, et laisse la progression respirer. */
                className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 md:gap-x-8 pb-12 md:pb-16 last:pb-0"
              >
                {/* Chemin jalonné : un nœud par étape, relié par une ligne
                    continue. L'anneau reprend la couleur de fond pour donner
                    l'impression que le nœud est posé sur le fil. */}
                <div className="flex flex-col items-center" aria-hidden="true">
                  <span className="relative z-10 mt-[7px] w-[11px] h-[11px] shrink-0 rounded-full bg-accent-primary ring-4 ring-surface-0 transition-transform duration-300 group-hover:scale-125" />
                  {i < DELIVERABLES.length - 1 && (
                    <span className="-mt-px w-px flex-1 bg-border-0 group-hover:bg-border-1 transition-colors duration-300" />
                  )}
                </div>

                <div className="relative pb-2">
                  {/* Chiffre fantôme — donne l'échelle et rythme la progression.
                      Purement graphique : l'ordre reste porté par <ol>/<li>. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-7 md:-top-9 -left-2 font-display font-bold leading-none text-[72px] md:text-[96px] text-text-primary/[0.12] tabular-nums"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-2.5">
                      <span className="text-accent-primary shrink-0">{d.icon}</span>
                      <h3 className="font-heading text-[19px] md:text-[21px] font-medium text-text-primary tracking-[-0.01em] leading-tight">
                        {d.title}
                      </h3>
                    </div>
                    <p className="font-body text-[15px] leading-[1.65] text-text-secondary mt-2.5">
                      {d.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </StickySplit>
      </div>
    </section>
  );
}
