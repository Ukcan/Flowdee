import image_8d0fbd868add68a87847282f9a6dae596b7a8035 from 'figma:asset/8d0fbd868add68a87847282f9a6dae596b7a8035.jpg';
import React from 'react';
import { motion } from 'motion/react';
import { Target, Cpu, TrendUp as TrendingUp } from '@phosphor-icons/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { EditableText } from '../Editable/Text';

/**
 * Section/Approach — manifeste.
 *
 * Composition typographique : le point focal est la déclaration, pas une
 * collection de cards. Les trois piliers sont des lignes éditoriales séparées
 * par des filets — même contenu, silhouette volontairement différente des
 * sections à grille (Problems, Pricing) qui l'encadrent.
 */

const defaultPillars = [
  {
    key: 'conversion',
    icon: Target,
    title: 'CONVERSION & ACTIVATION',
    description: 'Focus KPIs business mesurables. On ne lance pas sans hypothèses testables.',
  },
  {
    key: 'ia-ux',
    icon: Cpu,
    title: 'IA + UX HYBRID',
    description: 'IA accélère la prod (interviews → JSON structuré). UX décide (heuristiques, tests).',
  },
  {
    key: 'impact',
    icon: TrendingUp,
    title: 'IMPACT MESURABLE',
    description: 'Des résultats orientés conversion, trackables et vérifiables sur vos KPIs.',
  },
];

export function ApproachSection() {
  return (
    <section
      id="approche"
      className="section-aurora py-24 md:py-32 relative overflow-hidden border-t border-border-0"
      aria-labelledby="approach-title"
    >
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        {/* Manifeste — déclaration dominante, signature en appui */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            {/* Le label reste le titre sémantique de la section, mais la
                déclaration ci-dessous porte tout le poids visuel. */}
            <h2 id="approach-title">
              <EditableText
                contentKey="approach.title"
                defaultValue="NOTRE APPROCHE"
                as="span"
                className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted"
              />
            </h2>

            <blockquote className="mt-7">
              <EditableText
                contentKey="approach.quote"
                defaultValue={`"Des insights, oui. Mais surtout : des choix clairs, des parcours fluides, des résultats."`}
                as="p"
                className="font-display text-[26px] sm:text-[32px] md:text-[40px] lg:text-[44px] font-light text-text-primary leading-[1.15] tracking-[-0.02em] text-balance"
                multiline
              />
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 lg:self-end flex items-center gap-5"
          >
            <div className="w-[76px] h-[76px] shrink-0 rounded-[18px] overflow-hidden border border-border-0">
              <ImageWithFallback
                src={image_8d0fbd868add68a87847282f9a6dae596b7a8035}
                alt="Benji - Lead UX/UI Designer"
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <EditableText
                contentKey="approach.author"
                defaultValue="Benjamin, Lead UX/UI Designer"
                as="p"
                className="font-body text-[12px] font-medium text-accent-primary uppercase tracking-[0.18em]"
              />
              <EditableText
                contentKey="approach.authorRole"
                defaultValue="EXPERT PERFORMANCE UX"
                as="p"
                className="font-body text-[10px] font-medium text-text-muted uppercase tracking-[0.22em]"
              />
            </div>
          </motion.div>
        </div>

        {/* Piliers — lignes typographiques séparées par des filets, pas des cards */}
        <div className="mt-20 md:mt-24 border-t border-border-0">
          {defaultPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="grid grid-cols-1 lg:grid-cols-[76px_minmax(0,0.9fr)_minmax(0,1.1fr)] gap-x-10 gap-y-3 py-7 md:py-9 border-b border-border-0 items-start"
              >
                {/* Gouttière : numéro et icône sur une même ligne, calés sur la
                    première ligne du titre — l'icône ne pend plus sous le numéro. */}
                <div className="flex items-center gap-2.5 lg:pt-[5px]">
                  <span className="font-display text-[13px] tabular-nums tracking-[0.16em] text-accent-primary leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Icon size={16} weight="duotone" className="text-text-muted shrink-0" aria-hidden="true" />
                </div>

                <EditableText
                  contentKey={`approach.pillar.${pillar.key}.title`}
                  defaultValue={pillar.title}
                  as="h3"
                  className="font-heading text-[18px] md:text-[20px] font-medium text-text-primary tracking-[0.01em] leading-[1.35]"
                />

                <EditableText
                  contentKey={`approach.pillar.${pillar.key}.desc`}
                  defaultValue={pillar.description}
                  as="p"
                  className="font-body text-[15px] leading-[1.7] text-text-secondary max-w-[46ch]"
                  multiline
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
