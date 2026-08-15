import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from '@phosphor-icons/react';
import { EditableText } from '../Editable/Text';

/**
 * Section/AIWorkflow — division du travail IA ↔ designer.
 *
 * Extrait de Section/Approach (où le bloc n'était qu'une liste de plus au bas
 * d'une section déjà dense). Devient une section à part entière avec sa propre
 * silhouette : un flux orienté, où l'on voit que l'IA produit et que la
 * décision reste humaine — plutôt qu'une énumération de capacités.
 *
 * Les `contentKey` d'origine (`approach.ia.*`, `approach.guardrail.*`) sont
 * conservés pour ne pas orpheliner d'éventuels contenus déjà édités.
 */

const AI_OUTPUTS = [
  { key: 'interviews', text: "Synthèse d'interviews assistée par IA" },
  { key: 'microcopy', text: 'Variantes de microcopy optimisées' },
  { key: 'states', text: "Génération d'états (empty, error, loading)" },
  { key: 'specs', text: 'Draft de specs structurées' },
];

export function AIWorkflowSection() {
  return (
    <section
      id="ia-workflow"
      aria-labelledby="ia-workflow-title"
      className="relative py-24 md:py-32 bg-surface-0 border-t border-border-0 overflow-hidden"
    >
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[720px]"
        >
          <EditableText
            contentKey="approach.ia.badge"
            defaultValue="OPTIMISATION IA"
            as="p"
            className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted"
          />
          <h2 id="ia-workflow-title" className="mt-5">
            <EditableText
              contentKey="approach.ia.title"
              defaultValue="L'IA pour la vitesse, l'humain pour la direction."
              as="span"
              className="heading-1 text-text-primary text-balance"
            />
          </h2>
          <EditableText
            contentKey="approach.ia.description"
            defaultValue="L'IA assiste sur les tâches opérationnelles à faible valeur ajoutée, permettant de consacrer l'expertise à la réflexion stratégique."
            as="p"
            className="body mt-6"
            multiline
          />
        </motion.div>

        {/* Flux — production automatisée → arbitrage humain */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.72fr)] lg:gap-10 lg:items-center">
          {/* Amont : ce que l'IA produit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-text-muted pb-5 border-b border-border-0">
              IA — exécute
            </p>
            <ol className="mt-2">
              {AI_OUTPUTS.map((item, index) => (
                <li
                  key={item.key}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-baseline py-4 border-b border-border-0 last:border-b-0"
                >
                  <span className="font-display text-[12px] tabular-nums tracking-[0.16em] text-accent-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <EditableText
                    contentKey={`approach.guardrail.${item.key}`}
                    defaultValue={item.text}
                    as="span"
                    className="font-body text-[14px] md:text-[15px] leading-[1.55] text-text-secondary group-hover:text-text-primary transition-colors"
                  />
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Bascule */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="w-11 h-11 rounded-full border border-accent-border bg-accent-bg flex items-center justify-center text-accent-primary">
              <ArrowRight size={18} weight="bold" className="hidden lg:block" />
              <ArrowDown size={18} weight="bold" className="lg:hidden" />
            </span>
          </motion.div>

          {/* Aval : ce qui reste humain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[20px] border border-accent-border bg-accent-bg p-7 md:p-8"
          >
            <p className="font-body text-[10px] font-medium uppercase tracking-[0.22em] text-accent-primary pb-5 border-b border-accent-border">
              UX — décide
            </p>
            <p className="font-heading text-[19px] md:text-[21px] font-normal text-text-primary leading-snug tracking-[-0.01em] mt-6">
              Heuristiques, tests, arbitrage.
            </p>
            <p className="font-body text-[14px] leading-[1.65] text-text-secondary mt-3">
              La direction reste humaine : l'IA propose, l'expertise tranche.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { AIWorkflowSection as AIWorkflow };
