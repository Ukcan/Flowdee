import React from 'react';
import { motion } from 'motion/react';
import { UserMinus, ShoppingCartSimple, Path } from '@phosphor-icons/react';
import { ParallaxHeading } from './Decor/ParallaxHeading';
import { useTranslation } from '../contexts/LanguageContext';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';
import { CTA } from '../constants/offer';

export function ProblemCards() {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openCalendar = () => {
    window.dispatchEvent(new CustomEvent('flowdee:open-calendar'));
  };

  return (
    <section
      id="problems"
      className="relative py-24 md:py-32 section-grid overflow-hidden"
      aria-label="Frictions UX fréquentes"
    >
      {/* Les cartes ne sont plus cliquables : les états de survol, d'appui et
          de focus qui les faisaient passer pour des boutons sont retirés. Un
          élément qui se soulève au survol annonce une action ; il n'y en a
          pas ici. Seul reste le fond, qui les détache du fond de section. */}
      <style>{`
        .problem-card.card-surface {
          background-color: var(--surface-0) !important;
        }
      `}</style>
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
        <div className="flex flex-col items-center mb-16">
          {/* <TechnicalLabel sectionId="PROBLEMS_01" /> */}
          <ParallaxHeading>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="heading-1 text-center text-text-primary mt-4 whitespace-nowrap text-[clamp(1.3rem,4.4vw,3.3rem)]"
            >
              CES SIGNAUX VOUS PARLENT ?
            </motion.h2>
          </ParallaxHeading>
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
            <article
              className="w-full card-surface problem-card flex flex-col items-center text-center p-10 h-full justify-between"
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
                    VOTRE OFFRE N’EST PAS COMPRISE ASSEZ VITE ?
                  </h3>
                </div>
                
                {/* Group for Stats elements to maintain internal consistency */}
                <div className="flex flex-col items-center w-full">
                  {/* Slot 3: Stat */}
                  <div className="h-[44px] flex items-center justify-center w-full">
                    <span className="font-display text-[26px] text-accent-primary leading-none tracking-[-0.01em] whitespace-nowrap" style={{ fontWeight: 700 }}>
                      Offre floue
                    </span>
                  </div>
                  {/* Slot 4: Subtext */}
                  <div className="h-[40px] flex items-start justify-center w-full mt-1">
                    <span className="font-body text-[11px] font-medium uppercase tracking-widest text-text-muted max-w-[240px]">
                      le visiteur part avant d’avoir compris
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

              </div>
            </article>
          </motion.div>

          {/* Card 2: Checkout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <article
              className="w-full card-surface problem-card flex flex-col items-center text-center p-10 h-full justify-between"
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
                    VOS PARCOURS DEMANDENT TROP D’EFFORT ?
                  </h3>
                </div>
                
                <div className="flex flex-col items-center w-full">
                  {/* Slot 3: Stat */}
                  <div className="h-[44px] flex items-center justify-center w-full">
                    <span className="font-display text-[26px] text-accent-primary leading-none tracking-[-0.01em] whitespace-nowrap" style={{ fontWeight: 700 }}>
                      Trop d’étapes
                    </span>
                  </div>
                  {/* Slot 4: Subtext */}
                  <div className="h-[40px] flex items-start justify-center w-full mt-1">
                    <span className="font-body text-[11px] font-medium uppercase tracking-widest text-text-muted max-w-[240px]">
                      hésitation, friction, parcours flou
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

              </div>
            </article>
          </motion.div>

          {/* Card 3: UX Debt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <article
              className="w-full card-surface problem-card flex flex-col items-center text-center p-10 h-full justify-between"
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
                    DU TRAFIC, MAIS PEU DE CONVERSIONS ?
                  </h3>
                </div>
                
                <div className="flex flex-col items-center w-full">
                  {/* Slot 3: Stat */}
                  <div className="h-[44px] flex items-center justify-center w-full">
                    <span className="font-display text-[26px] text-accent-primary leading-none tracking-[-0.01em] whitespace-nowrap" style={{ fontWeight: 700 }}>
                      Preuve tardive
                    </span>
                  </div>
                  {/* Slot 4: Subtext */}
                  <div className="h-[40px] flex items-start justify-center w-full mt-1">
                    <span className="font-body text-[11px] font-medium uppercase tracking-widest text-text-muted max-w-[240px]">
                      confiance pas installée au bon moment
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

              </div>
            </article>
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
              Si un seul de ces points vous parle, l’audit est le moyen le plus rapide de le corriger.
            </p>
            {/* Une seule paire d'actions, identique a toutes les largeurs.
                Les deux branches precedentes ne differaient pas que par la
                mise en page : sur mobile le bouton principal ouvrait le
                paiement, sur desktop il descendait au formulaire, sous un
                libelle encore different. Trois variantes pour une meme zone.

                L'action retenue mene au detail du livrable plutot qu'au
                paiement : on vient de reconnaitre un probleme, on n'a pas
                encore choisi une solution. L'achat reste dominant dans le hero
                et dans la section Offres. */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-[360px] sm:max-w-none mx-auto">
              <ButtonPrimary
                onClick={() => scrollToSection('deliverables')}
                size="m"
                className="w-full sm:w-auto sm:px-[32px]"
              >
                {CTA.auditContents}
              </ButtonPrimary>
              <ButtonSecondary
                onClick={openCalendar}
                size="m"
                className="w-full sm:w-auto"
              >
                {CTA.call}
              </ButtonSecondary>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
