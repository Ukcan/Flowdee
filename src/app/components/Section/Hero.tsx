import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';
import { useTranslation } from '../../contexts/LanguageContext';
import { CTA_PRIMARY, CTA_SECONDARY } from '../../constants/ctaCopy';
import { TechnicalLabel } from '../TechnicalLabel';
// ScrollMouseIndicator moved to global App-level — see /components/Indicator/ScrollMouse.tsx

import { CALENDAR_LINK } from '../../constants/links';

interface HeroSectionProps {
  imageUrl?: string;
}

export function HeroSection({ 
  imageUrl
}: HeroSectionProps = {}) {
  const { t } = useTranslation();
  
  const openCalendar = () => {
    window.open(CALENDAR_LINK, '_blank', 'noopener,noreferrer');
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      className="relative min-h-[100vh] flex items-center py-32 md:py-40 bg-transparent overflow-hidden"
      aria-label="Hero section"
      id="hero"
    >
      {/* Content */}
      <div className="relative z-10 max-w-[1184px] mx-auto px-8 md:px-16 w-full">
        <div className="flex flex-col items-center text-center">
          {/* <TechnicalLabel sectionId="HERO_01" className="mb-8" /> */}
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-[32px]"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative inline-block"
            >
              <span className="relative z-10 font-body text-[12px] px-5 py-2 bg-accent-tint text-[color:var(--accent-eyebrow)] font-bold tracking-[0.08em] uppercase rounded-full border border-accent-primary/40">
                Impact / Effort
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="heading-display text-text-primary"
            >
              Flowdee transforme vos frictions UX en conversions.
            </motion.h1>

            {/* Body Text / Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="body-large max-w-[700px] mx-auto"
            >
              Audit UX → priorisation impact/effort → maquettes correctives prêtes à implémenter.
            </motion.p>

            {/* Proof Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {['Acquisition (+ leads)', 'Checkout (- abandons)', 'Onboarding (+ activation)'].map((p) => (
                <span key={p} className="px-4 py-1.5 bg-surface-1 text-text-primary font-body text-[12px] font-bold tracking-[0.04em] uppercase rounded-full cursor-default select-none border border-border-1">
                  {p}
                </span>
              ))}
            </motion.div>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col gap-8 pt-8 items-center"
            >
              {/* CTAs Row */}
              <div className="flex flex-col sm:flex-row gap-[16px] justify-center w-full max-w-[480px] mx-auto">
                {/* Primary CTA */}
                <div className="flex-1 flex flex-col gap-2">
                  <ButtonPrimary
                    onClick={openCalendar}
                    size="m"
                    className="w-full"
                  >
                    Réserver un appel (30 min)
                  </ButtonPrimary>
                  <p className="font-body text-[10px] font-medium uppercase tracking-widest text-text-muted text-center">
                    {CTA_PRIMARY.subtext}
                  </p>
                </div>
                
                {/* Secondary CTA */}
                <div className="flex-1 flex flex-col gap-2">
                  <ButtonSecondary
                    onClick={() => scrollToSection('contact')}
                    size="m"
                    className="w-full"
                  >
                    Voir l'offre Audit (dès 279€)
                  </ButtonSecondary>
                  <p className="font-body text-[10px] font-medium uppercase tracking-widest text-text-muted text-center">
                    {CTA_SECONDARY.subtext}
                  </p>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection as HeroFlowdee };