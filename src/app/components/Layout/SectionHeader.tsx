import React from 'react';
import { motion } from 'motion/react';

/**
 * Layout/SectionHeader — quatre traitements pour un même langage typographique.
 *
 * Le problème résolu ici : toutes les sections ouvraient sur la même forme
 * (eyebrow + h2 centré), ce qui faisait fusionner les chapitres au scroll.
 * Les variantes réutilisent strictement les mêmes tokens (heading-1, body,
 * text-muted, tracking) — seule la composition change.
 *
 * - `standard` : rationnel (Trust, Problems, Pricing, FAQ)
 * - `editorial` : le titre devient un élément graphique (Approach, Featured case)
 * - `split`     : titre à gauche / introduction à droite (Deliverables)
 * - `inline`    : ligne compacte `01 / LABEL` (contenus secondaires)
 */

export type SectionHeaderVariant = 'standard' | 'editorial' | 'split' | 'inline';

interface SectionHeaderProps {
  variant?: SectionHeaderVariant;
  /** Numéro de chapitre, ex. "01" — affiché par `editorial` et `inline`. */
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  /** `accent` conserve le titre doré des sections de preuve (identité existante). */
  tone?: 'default' | 'accent';
  /** id posé sur le h2, pour `aria-labelledby` côté <section>. */
  titleId?: string;
  className?: string;
}

const EYEBROW = 'font-body text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted';

export function SectionHeader({
  variant = 'standard',
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'default',
  titleId,
  className = '',
}: SectionHeaderProps) {
  const titleTone = tone === 'accent' ? 'text-accent-primary' : 'text-text-primary';
  const enter = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  } as const;

  if (variant === 'inline') {
    return (
      <motion.div {...enter} transition={{ duration: 0.5 }} className={className}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {index && (
            <span className="font-display text-[13px] tabular-nums tracking-[0.16em] text-accent-primary">
              {index}
            </span>
          )}
          {eyebrow && <span className={EYEBROW}>{eyebrow}</span>}
        </div>
        <h2 id={titleId} className="heading-3 text-text-primary mt-3 text-balance">
          {title}
        </h2>
        {description && <p className="body mt-3 max-w-[62ch]">{description}</p>}
      </motion.div>
    );
  }

  if (variant === 'editorial') {
    return (
      <motion.div {...enter} transition={{ duration: 0.55 }} className={className}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          {index && (
            <span className="font-display text-[13px] tabular-nums tracking-[0.16em] text-accent-primary">
              {index}
            </span>
          )}
          {eyebrow && <span className={EYEBROW}>{eyebrow}</span>}
        </div>
        {/* Le titre porte tout le poids : il agit comme un élément graphique. */}
        <h2
          id={titleId}
          className={`font-display text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-light ${titleTone} leading-[1.08] tracking-[-0.025em] mt-6 text-balance max-w-[18ch]`}
        >
          {title}
        </h2>
        {description && <p className="body-large mt-7 max-w-[54ch]">{description}</p>}
      </motion.div>
    );
  }

  if (variant === 'split') {
    return (
      <motion.div
        {...enter}
        transition={{ duration: 0.5 }}
        className={`grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,0.75fr)] lg:gap-16 lg:items-end ${className}`}
      >
        <div>
          {eyebrow && <p className={`${EYEBROW} mb-5`}>{eyebrow}</p>}
          <h2 id={titleId} className="heading-1 text-text-primary text-balance">
            {title}
          </h2>
        </div>
        {description && <p className="body lg:pb-1">{description}</p>}
      </motion.div>
    );
  }

  // standard
  const centered = align === 'center';
  return (
    <motion.div
      {...enter}
      transition={{ duration: 0.5 }}
      className={`${centered ? 'text-center flex flex-col items-center' : ''} ${className}`}
    >
      {eyebrow && <p className={`${EYEBROW} mb-5`}>{eyebrow}</p>}
      <h2
        id={titleId}
        className={`heading-1 text-text-primary text-balance ${centered ? 'max-w-[20ch]' : 'max-w-[24ch]'}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`body mt-5 max-w-[62ch] ${centered ? 'mx-auto' : ''}`}>{description}</p>
      )}
    </motion.div>
  );
}
