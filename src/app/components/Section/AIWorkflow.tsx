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

/* Formulé en bénéfice plutôt qu'en méthode (revue Adel × Benji du
   2026-08-18) : un visiteur non technique doit comprendre ce que ça change
   pour lui, pas le nom de la technique employée. */
const AI_OUTPUTS = [
  { key: 'interviews', text: 'Vos interviews utilisateurs résumées et exploitables en quelques minutes' },
  { key: 'microcopy', text: 'Plusieurs textes d’interface testés avant de retenir le meilleur' },
  { key: 'states', text: 'Aucun écran oublié : les cas limites sont couverts dès le départ' },
  { key: 'specs', text: 'Un premier jet de spécifications prêt à affiner' },
];

export function AIWorkflowSection() {
  return (
    <section
      id="ia-workflow"
      aria-labelledby="ia-workflow-title"
      className="relative py-24 md:py-32 bg-surface-0 border-t border-border-0 overflow-hidden"
    >
      {/* Large après le manifeste resserré (980) : un workflow a besoin
          d'étalement horizontal pour se lire comme un flux. */}
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
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
          {/* Ne jamais qualifier ce que fait l'IA de "faible valeur ajoutée" :
              ça sape l'argument même qu'on est en train de vendre (revue
              Adel × Benji du 2026-08-18). Le message est IA + expertise
              humaine = résultat optimal, jamais IA seule = suffisant. */}
          <EditableText
            contentKey="approach.ia.description"
            defaultValue="L'IA accélère l'exécution ; l'expertise humaine garantit que le résultat convertit vraiment. Seule, l'IA ne remplace pas un regard qui a testé ce qui marche."
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

        {/* La formulation la plus concrète du différenciateur restait
            repliée dans un accordéon de FAQ, en position 6 sur 8 — remontée
            ici, dans la section qui porte justement cette promesse (F-11,
            diagnostic externe 2026-08-18). */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-body text-[14px] md:text-[15px] leading-[1.6] text-text-secondary mt-10 md:mt-12 max-w-[640px]"
        >
          L'écran corrigé est livré dans Figma avec des spécifications claires, directement exploitables par votre équipe de développement — et pensé pour être repris facilement par un assistant comme Claude Code afin d'accélérer l'implémentation.
        </motion.p>
      </div>
    </section>
  );
}

export { AIWorkflowSection as AIWorkflow };
