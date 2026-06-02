import image_8d0fbd868add68a87847282f9a6dae596b7a8035 from 'figma:asset/8d0fbd868add68a87847282f9a6dae596b7a8035.jpg';
import React from 'react';
import { motion } from 'motion/react';
import { Target, Cpu, TrendUp as TrendingUp, Check } from '@phosphor-icons/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { TechnicalLabel } from '../TechnicalLabel';
import { EditableText } from '../Editable/Text';

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
    description: '+40% activation, +32% checkout clients 2024. Résultats trackables ou remboursé.',
  },
];

const defaultGuardrails = [
  { key: 'interviews', text: "Synthèse d'interviews assistée par IA" },
  { key: 'microcopy', text: 'Variantes de microcopy optimisées' },
  { key: 'states', text: "Génération d'états (empty, error, loading)" },
  { key: 'specs', text: 'Draft de specs structurées' },
];

export function ApproachSection() {
  return (
    <section
      id="approche"
      className="section-aurora py-24 md:py-32 relative overflow-hidden border-t border-border-0"
      aria-label="Notre Approche"
    >
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        <div className="flex flex-col items-center mb-16">
          {/* <TechnicalLabel sectionId="APPROACH_CORE_01" /> */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-1 text-text-primary text-center mt-4"
          >
            <EditableText
              contentKey="approach.title"
              defaultValue="NOTRE APPROCHE"
              as="span"
              className="heading-1 text-text-primary"
            />
          </motion.h1>
        </div>

        {/* Bloc Citation / Profil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row items-center gap-12 mb-20 p-10 bg-surface-0 border border-border-0 rounded-[24px]"
        >
          {/* Image */}
          <div className="relative shrink-0">
            <div className="w-[140px] h-[140px] rounded-[20px] overflow-hidden border border-border-0">
              <ImageWithFallback
                src={image_8d0fbd868add68a87847282f9a6dae596b7a8035}
                alt="Benji - Lead UX/UI Designer"
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
          </div>

          {/* Texte & Signature */}
          <div className="text-center md:text-left space-y-4">
            <EditableText
              contentKey="approach.quote"
              defaultValue={`"Des insights, oui. Mais surtout : des choix clairs, des parcours fluides, des résultats."`}
              as="p"
              className="font-body text-[18px] md:text-[22px] font-light text-text-primary leading-snug tracking-wide"
              multiline
            />
            <div className="flex flex-col gap-1">
              <EditableText
                contentKey="approach.author"
                defaultValue="Benjamin, Lead UX/UI Designer"
                as="p"
                className="font-body text-[12px] font-medium text-accent-primary uppercase tracking-[0.2em]"
              />
              <EditableText
                contentKey="approach.authorRole"
                defaultValue="EXPERT PERFORMANCE UX"
                as="p"
                className="font-body text-[10px] font-medium text-accent-primary uppercase tracking-[0.3em]"
              />
            </div>
          </div>
        </motion.div>

        <div className="space-y-12">
          {/* Grille 3 Piliers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {defaultPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-surface text-center flex flex-col items-center p-10 bg-surface-0"
                >
                  <div className="mb-6 p-4 bg-surface-1 text-accent-primary rounded-[16px]">
                    <Icon size={36} weight="duotone" className="text-accent-primary" />
                  </div>
                  <EditableText
                    contentKey={`approach.pillar.${pillar.key}.title`}
                    defaultValue={pillar.title}
                    as="h3"
                    className="font-heading text-[16px] font-medium text-text-primary mb-4 tracking-[-0.01em]"
                  />
                  <EditableText
                    contentKey={`approach.pillar.${pillar.key}.desc`}
                    defaultValue={pillar.description}
                    as="p"
                    className="font-body text-[14px] leading-relaxed text-text-secondary font-normal"
                    multiline
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Section IA Fusionnee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-0 border border-border-0 p-12 rounded-[24px] relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <EditableText
                  contentKey="approach.ia.badge"
                  defaultValue="OPTIMISATION IA"
                  as="span"
                  className="font-body text-[10px] px-4 py-1.5 bg-surface-1 text-accent-primary font-medium uppercase tracking-[0.2em] rounded-full border border-border-0 relative -top-2 mb-4 inline-block"
                />
                <EditableText
                  contentKey="approach.ia.title"
                  defaultValue="L'IA pour la vitesse, l'humain pour la direction."
                  as="h3"
                  className="font-heading text-[28px] font-normal text-text-primary leading-[1.2] tracking-[-0.01em]"
                />
                <EditableText
                  contentKey="approach.ia.description"
                  defaultValue="L'IA assiste sur les tâches opérationnelles à faible valeur ajoutée, permettant de consacrer l'expertise à la réflexion stratégique."
                  as="p"
                  className="body"
                  multiline
                />
              </div>

              <div className="flex-1 w-full grid grid-cols-1 gap-3">
                {defaultGuardrails.map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center gap-4 p-4 bg-bg-base border border-border-0 hover:border-border-1 transition-colors rounded-[16px] group"
                  >
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(138, 158, 140, 0.15)', color: '#8A9E8C' }}>
                      <Check size={12} weight="bold" />
                    </div>
                    <EditableText
                      contentKey={`approach.guardrail.${item.key}`}
                      defaultValue={item.text}
                      as="span"
                      className="font-body text-[12px] text-text-secondary font-medium uppercase tracking-wide group-hover:text-text-primary transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}