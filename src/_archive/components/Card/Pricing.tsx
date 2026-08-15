import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';
import { Badge } from '../ui/badge';

/**
 * Card/Pricing Component
 * Nomenclature Figma: Card/Pricing
 * Skin: CY-FOCUS (Dark Graphite + Orange Accents)
 */

export interface PricingCardProps {
  timeline: string;
  title: string;
  price: string;
  deliverables: string[];
  featured?: boolean;
  plan?: 'audit' | 'sprint' | 'partner';
  theme?: 'light' | 'dark';
  isActive?: boolean;
  onSelect?: () => void;
  onCTA?: () => void;
  ctaLabel?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  timeline,
  title,
  price,
  deliverables,
  featured = false,
  plan = 'audit',
  theme,
  isActive = false,
  onSelect,
  onCTA,
  ctaLabel = 'Get a Quote'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onClick={onSelect}
      className={`card-surface p-8 flex flex-col cursor-pointer transition-all duration-300 ${
        isActive || featured ? 'border-accent-primary ring-1 ring-accent-primary shadow-soft' : ''
      } ${featured ? 'scale-105 z-10' : ''}`}
      data-component="card-pricing"
      data-plan={plan}
      data-featured={featured}
    >
      {/* Timeline Badge */}
      <div className="self-start mb-6 px-3 py-1.5 bg-surface-2 text-text-secondary text-xs uppercase tracking-wider rounded border border-border-1">
        {timeline}
      </div>

      {/* Featured Badge */}
      {featured && (
        <div className="self-start mb-2 px-3 py-1 bg-accent-tint text-accent-primary text-xs uppercase tracking-wider rounded border border-accent-primary/20 absolute top-8 right-8">
          Most Popular
        </div>
      )}

      {/* Title */}
      <h3 className="font-heading text-xl font-medium text-text-primary mb-3">
        {title}
      </h3>

      {/* Price */}
      <div className="font-heading text-3xl font-medium text-text-primary mb-8 text-accent-primary">
        {price}
      </div>

      {/* Deliverables */}
      <div className="space-y-4 mb-8 flex-grow">
        {deliverables.map((deliverable, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="min-w-[20px] min-h-[20px] rounded-full bg-accent-tint flex items-center justify-center mt-0.5">
              <Check className="w-3 h-3 text-accent-primary" />
            </div>
            <span className="text-sm text-text-secondary leading-relaxed">
              {deliverable}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="w-full">
        {isActive || featured ? (
          <ButtonPrimary onClick={onCTA} className="w-full">
            {ctaLabel}
          </ButtonPrimary>
        ) : (
          <ButtonSecondary onClick={onCTA} className="w-full">
            {ctaLabel}
          </ButtonSecondary>
        )}
      </div>
    </motion.div>
  );
};
