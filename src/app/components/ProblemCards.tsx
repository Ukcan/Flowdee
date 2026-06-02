import React from 'react';
import { motion } from 'motion/react';
import { UserMinus, ShoppingCartSimple, Path } from '@phosphor-icons/react';
import { useTranslation } from '../contexts/LanguageContext';
import { CTA_SECONDARY } from '../constants/ctaCopy';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';

export function ProblemCards() {
  const { t } = useTranslation();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section
      id="problems"
      className="relative py-24 md:py-32 bg-bg-base overflow-hidden"
      aria-label="Problems we solve"
    >
      {/* Actionable hover states for problem cards */}
      <style>{`
        .problem-card.card-surface {
          transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease !important;
          background-color: var(--surface-0) !important;
        }
        .problem-card.card-surface:hover {
          border-color: var(--border-1) !important;
          box-shadow: 0 4px 24px rgba(26,23,20,0.10) !important;
          transform: translateY(-2px) !important;
        }
        .problem-card.card-surface:active {
          transform: translateY(0px) !important;
          box-shadow: var(--shadow-panel) !important;
        }
        .problem-card.card-surface:focus-visible {
          outline: 2px solid var(--accent-ring) !important;
          outline-offset: 2px !important;
        }
        .problem-card.card-surface:hover .problem-card-cta {
          border-color: var(--border-1) !important;
          color: var(--text-primary) !important;
        }
      `}</style>
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        <div className="flex flex-col items-center mb-16">
          {/* <TechnicalLabel sectionId="PROBLEMS_01" /> */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="heading-1 text-center text-text-primary mt-4"
          >
            VOUS RECONNAISSEZ CES PROBLÈMES ?
          </motion.h1>
        </div>

        {/* Container: Horizontal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
          
          {/* Card 1: Onboarding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={scrollToContact}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToContact(); } }}
              aria-label="Activer mes inscrits — scroll vers contact"
              className="w-full card-surface problem-card flex flex-col items-center text-center p-10 h-full justify-between cursor-pointer"
            >
              {/* TopGroup - Internal structure to align top elements */}
              <div className="flex flex-col items-center w-full gap-6">
                {/* Slot 1: Icon */}
                <div className="h-[64px] flex items-center justify-center">
                  <div className="w-[56px] h-[56px] flex items-center justify-center bg-surface-1 rounded-[16px]">
                    <UserMinus size={28} weight="duotone" className="text-accent-primary" />
                  </div>
                </div>

                {/* Slot 2: Title - Align to the top to sync the first line across cards */}
                <div className="h-[56px] flex items-start justify-center w-full">
                  <h3 className="font-heading text-[20px] text-text-primary leading-[1.2] max-w-[280px] tracking-[-0.01em]" style={{ fontWeight: 400 }}>
                    BEAUCOUP D'INSCRIPTIONS, PEU D'ACTIVATION ?
                  </h3>
                </div>
                
                {/* Group for Stats elements to maintain internal consistency */}
                <div className="flex flex-col items-center w-full">
                  {/* Slot 3: Stat */}
                  <div className="h-[44px] flex items-center justify-center w-full">
                    <span className="font-display text-[26px] text-accent-primary leading-none tracking-[-0.01em] whitespace-nowrap" style={{ fontWeight: 700 }}>
                      40-60% drop
                    </span>
                  </div>
                  {/* Slot 4: Subtext */}
                  <div className="h-[40px] flex items-start justify-center w-full mt-1">
                    <span className="font-body text-[11px] font-medium uppercase tracking-widest text-text-muted max-w-[240px]">
                      avant activation
                    </span>
                  </div>
                  {/* Slot 5: Meta */}
                </div>
              </div>

              {/* BottomGroup - Locked to the bottom of the card */}
              <div className="flex flex-col items-center w-full gap-6 mt-12">
                {/* Slot 6: Pill - disabled per Zero Deletion Policy */}
                {/* <div className="h-[48px] flex items-center justify-center w-full">
                  <div className="w-full px-4 py-3 bg-[#7EC3F5]/15 text-[#7EC3F5] font-body text-[11px] font-medium uppercase tracking-widest rounded-lg cursor-default select-none">
                    → CAC PERDU · CROISSANCE BLOQUÉE
                  </div>
                </div> */}

                {/* Slot 7: CTA */}
                <div className="h-[44px] w-full">
                  <span
                    className="button-secondary inline-flex items-center justify-center w-full h-full rounded-[14px] text-sm font-medium min-h-[44px] pointer-events-none !border-0 problem-card-cta"
                    aria-hidden="true"
                  >
                    Activer mes inscrits
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Checkout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={scrollToContact}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToContact(); } }}
              aria-label="Récupérer des ventes — scroll vers contact"
              className="w-full card-surface problem-card flex flex-col items-center text-center p-10 h-full justify-between cursor-pointer"
            >
              {/* TopGroup */}
              <div className="flex flex-col items-center w-full gap-6">
                {/* Slot 1: Icon */}
                <div className="h-[64px] flex items-center justify-center">
                  <div className="w-[56px] h-[56px] flex items-center justify-center bg-surface-1 rounded-[16px]">
                    <ShoppingCartSimple size={28} weight="duotone" className="text-accent-primary" />
                  </div>
                </div>

                {/* Slot 2: Title */}
                <div className="h-[56px] flex items-start justify-center w-full">
                  <h3 className="font-heading text-[20px] text-text-primary leading-[1.2] max-w-[280px] tracking-[-0.01em]" style={{ fontWeight: 400 }}>
                    VOTRE TUNNEL DE PAIEMENT PERD DES VENTES ?
                  </h3>
                </div>
                
                <div className="flex flex-col items-center w-full">
                  {/* Slot 3: Stat */}
                  <div className="h-[44px] flex items-center justify-center w-full">
                    <span className="font-display text-[26px] text-accent-primary leading-none tracking-[-0.01em] whitespace-nowrap" style={{ fontWeight: 700 }}>
                      69.8%
                    </span>
                  </div>
                  {/* Slot 4: Subtext */}
                  <div className="h-[40px] flex items-start justify-center w-full mt-1">
                    <span className="font-body text-[11px] font-medium uppercase tracking-widest text-text-muted max-w-[240px]">
                      abandon panier moyen e-commerce
                    </span>
                  </div>
                  {/* Slot 5: Meta */}
                </div>
              </div>

              {/* BottomGroup */}
              <div className="flex flex-col items-center w-full gap-6 mt-12">
                {/* Slot 6: Pill - disabled per Zero Deletion Policy */}
                {/* <div className="h-[48px] flex items-center justify-center w-full">
                  <div className="w-full px-4 py-3 bg-[#7EC3F5]/15 text-[#7EC3F5] font-body text-[11px] font-medium uppercase tracking-widest rounded-lg cursor-default select-none">
                    → REVENUS MANQUÉS · LTV EN CHUTE
                  </div>
                </div> */}

                {/* Slot 7: CTA */}
                <div className="h-[44px] w-full">
                  <span
                    className="button-secondary inline-flex items-center justify-center w-full h-full rounded-[14px] text-sm font-medium min-h-[44px] pointer-events-none !border-0 problem-card-cta"
                    aria-hidden="true"
                  >
                    Récupérer des ventes
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: UX Debt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={scrollToContact}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToContact(); } }}
              aria-label="Simplifier mon interface — scroll vers contact"
              className="w-full card-surface problem-card flex flex-col items-center text-center p-10 h-full justify-between cursor-pointer"
            >
              {/* TopGroup */}
              <div className="flex flex-col items-center w-full gap-6">
                {/* Slot 1: Icon */}
                <div className="h-[64px] flex items-center justify-center">
                  <div className="w-[56px] h-[56px] flex items-center justify-center bg-surface-1 rounded-[16px]">
                    <Path size={28} weight="duotone" className="text-accent-primary" />
                  </div>
                </div>

                {/* Slot 2: Title */}
                <div className="h-[56px] flex items-start justify-center w-full">
                  <h3 className="font-heading text-[20px] text-text-primary leading-[1.2] max-w-[280px] tracking-[-0.01em]" style={{ fontWeight: 400 }}>
                    LES UTILISATEURS SE PERDENT ET ABANDONNENT ?
                  </h3>
                </div>
                
                <div className="flex flex-col items-center w-full">
                  {/* Slot 3: Stat */}
                  <div className="h-[44px] flex items-center justify-center w-full">
                    <span className="font-display text-[26px] text-accent-primary leading-none tracking-[-0.01em] whitespace-nowrap" style={{ fontWeight: 700 }}>
                      22% abandon
                    </span>
                  </div>
                  {/* Slot 4: Subtext */}
                  <div className="h-[40px] flex items-start justify-center w-full mt-1">
                    <span className="font-body text-[11px] font-medium uppercase tracking-widest text-text-muted max-w-[240px]">
                      car l'interface est trop complexe
                    </span>
                  </div>
                  {/* Slot 5: Meta */}
                </div>
              </div>

              {/* BottomGroup */}
              <div className="flex flex-col items-center w-full gap-6 mt-12">
                {/* Slot 6: Pill - disabled per Zero Deletion Policy */}
                {/* <div className="h-[48px] flex items-center justify-center w-full">
                  <div className="w-full px-4 py-3 bg-[#7EC3F5]/15 text-[#7EC3F5] font-body text-[11px] font-medium uppercase tracking-widest rounded-lg cursor-default select-none">
                    → TTM EN HAUSSE · VÉLOCITÉ -50%
                  </div>
                </div> */}

                {/* Slot 7: CTA */}
                <div className="h-[44px] w-full">
                  <span
                    className="button-secondary inline-flex items-center justify-center w-full h-full rounded-[14px] text-sm font-medium min-h-[44px] pointer-events-none !border-0 problem-card-cta"
                    aria-hidden="true"
                  >
                    Simplifier mon interface →
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* New Centered CTA Button */}
        <div className="flex flex-col items-center justify-center mt-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center space-y-6"
          >
            <p className="font-body text-[16px] text-text-secondary max-w-[700px] mx-auto font-normal">
              Vous reconnaissez ces symptômes ? L'audit est le point de départ le plus rapide.
            </p>
            <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
              <ButtonPrimary
                onClick={scrollToContact}
                size="m"
                className="px-[32px]"
              >
                Diagnostiquer mes frictions →
              </ButtonPrimary>
              <ButtonSecondary
                onClick={() => scrollToContact()}
                size="m"
              >
                {CTA_SECONDARY.label}
              </ButtonSecondary>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}