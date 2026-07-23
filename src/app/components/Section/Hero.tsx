import React from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';
import { useTranslation } from '../../contexts/LanguageContext';
import { CTA_PRIMARY, CTA_SECONDARY } from '../../constants/ctaCopy';
import { TechnicalLabel } from '../TechnicalLabel';
// ScrollMouseIndicator moved to global App-level — see /components/Indicator/ScrollMouse.tsx

import { AUDIT_LINK } from '../../constants/links';

interface HeroSectionProps {
  imageUrl?: string;
}

export function HeroSection({ 
  imageUrl
}: HeroSectionProps = {}) {
  const { t } = useTranslation();
  
  const openCalendar = () => {
    window.dispatchEvent(new CustomEvent('flowdee:open-calendar'));
  };

  const openAuditCheckout = () => {
    window.location.href = AUDIT_LINK;
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      className="relative min-h-[100svh] md:min-h-[100vh] flex items-center py-24 md:py-40 bg-transparent overflow-hidden"
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
            className="space-y-6 md:space-y-[32px]"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative inline-block"
            >
              <span className="relative z-10 font-body text-[12px] px-5 py-2 bg-accent-tint text-[color:var(--accent-eyebrow)] font-bold tracking-[0.08em] uppercase rounded-full border border-accent-primary/40">
                Audit UX · SEO · Accessibilité · Microcopy
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="heading-display text-text-primary"
            >
              Découvrez pourquoi votre site ne convertit pas.
            </motion.h1>

            {/* Body Text / Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="body-large max-w-[700px] mx-auto"
            >
              Flowdee analyse votre landing, site ou tunnel pour repérer les frictions qui freinent vos visiteurs : clarté de l’offre, CTA, formulaire, preuve, SEO, accessibilité et microcopy.
            </motion.p>

            {/* Proof Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="hidden sm:flex flex-wrap gap-3 justify-center"
            >
              {['Livrable priorisé', 'Recommandations concrètes', 'Sans refonte inutile'].map((p) => (
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
              className="flex flex-col gap-4 md:gap-8 pt-2 md:pt-8 items-center"
            >
              {/* CTAs Row */}
              <div className="flex sm:hidden flex-col gap-3 justify-center w-full max-w-[360px] mx-auto">
                <ButtonPrimary
                  onClick={openAuditCheckout}
                  size="m"
                  className="w-full"
                >
                  Acheter l'audit — 279 €
                </ButtonPrimary>
                <p className="font-body text-[10px] font-medium uppercase tracking-widest text-text-muted text-center">
                  Livraison 72h–5j • Paiement sécurisé
                </p>

                <ButtonSecondary
                  onClick={openCalendar}
                  size="m"
                  className="w-full mt-1"
                >
                  Réserver un appel
                </ButtonSecondary>

                <button
                  type="button"
                  onClick={() => scrollToSection('services')}
                  className="font-body text-[13px] text-text-secondary underline underline-offset-4 decoration-border-1 hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ring transition-colors"
                >
                  Voir ce que l'audit analyse
                </button>
              </div>

              <div className="hidden sm:flex sm:flex-row gap-[16px] justify-center w-full max-w-[480px] mx-auto">
                {/* Primary CTA */}
                <div className="flex-1 flex flex-col gap-2">
                  <ButtonPrimary
                    onClick={openCalendar}
                    size="m"
                    className="w-full"
                  >
                    Trouver mes points de friction
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
                    Voir ce que l’audit analyse
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
