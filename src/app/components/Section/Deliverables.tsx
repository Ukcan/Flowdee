import React from 'react';
import { motion } from 'motion/react';
import { ListChecks, Layout, TextAa, ShieldCheck } from '@phosphor-icons/react';
import { FeatureCard } from '../Card/Feature';

/**
 * Section/Deliverables — "Ce que vous recevez après l'audit"
 * Real implementation (pattern A, like Hero/Services/Approach/FAQ).
 * Reuses FeatureCard without modifying it. Neutral background, no aurora.
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
    title: 'Textes du site réécrits',
    description: 'Titres, CTA, aides, erreurs, réassurances et FAQ.',
  },
  {
    icon: <ShieldCheck size={20} weight="duotone" aria-hidden="true" />,
    title: 'Checklist SEO & accessibilité',
    description: 'Hn, title, meta, contrastes, focus, labels, textes alternatifs.',
  },
] as const;

export function DeliverablesSection() {
  return (
    <section
      id="deliverables"
      aria-labelledby="deliverables-title"
      className="relative py-24 md:py-32 bg-surface-0 border-t border-border-0 overflow-hidden"
    >
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        {/* Section title */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2
            id="deliverables-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="heading-1 text-center text-text-primary mt-4 max-w-[900px]"
          >
            Vous repartez avec un plan clair, pas avec des remarques abstraites.
          </motion.h2>
        </div>

        {/* Deliverables grid — 1 / 2 / 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DELIVERABLES.map((d, i) => (
            <motion.div
              key={d.title}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <FeatureCard
                iconElement={d.icon}
                title={d.title}
                description={d.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
