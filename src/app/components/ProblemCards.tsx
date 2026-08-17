import React from 'react';
import { motion } from 'motion/react';
import { ParallaxHeading } from './Decor/ParallaxHeading';
import { useTranslation } from '../contexts/LanguageContext';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';
import { CTA } from '../constants/offer';

/**
 * Signaux — liste numérotée éditoriale (remplace la grille de 3 cartes).
 * Décalage horizontal en zigzag sur desktop (01/03 à gauche, 02 décalé à
 * droite) : la ligne sous le numéro va toujours jusqu'au bord droit de la
 * section, quel que soit le décalage — d'où la colonne "spacer" en % plutôt
 * qu'une simple marge.
 */
const SIGNALS = [
  {
    number: '01',
    offset: 0,
    statement: 'Votre offre n’est pas comprise assez vite.',
    label: 'Offre floue',
    description: 'Le visiteur part avant d’avoir compris.',
  },
  {
    number: '02',
    offset: 24,
    statement: 'Vos parcours demandent trop d’effort.',
    label: 'Trop d’étapes',
    description: 'Hésitation. Friction. Abandon.',
  },
  {
    number: '03',
    offset: 0,
    statement: (
      <>
        Du trafic.
        <br />
        Peu de conversions.
      </>
    ),
    label: 'Preuve tardive',
    description: 'La confiance arrive après la décision.',
  },
] as const;

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
      <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
        <div className="flex flex-col items-center mb-16">
          {/* <TechnicalLabel sectionId="PROBLEMS_01" /> */}
          <ParallaxHeading>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="heading-1 text-center text-text-primary mt-4"
            >
              LES SIGNAUX
            </motion.h2>
          </ParallaxHeading>
        </div>

        {/* Liste numérotée — 01/03 pleine largeur à gauche, 02 décalé à
            droite sur desktop via une colonne "spacer" en % (la ligne sous le
            numéro, en flex-1, atteint alors toujours le même bord droit,
            quel que soit le décalage). Une seule colonne sur mobile : le
            décalage ne s'applique qu'à partir de lg. */}
        <div className="flex flex-col gap-14 md:gap-16 w-full">
          {SIGNALS.map((signal, i) => (
            <motion.div
              key={signal.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
              className={`grid grid-cols-1 w-full ${signal.offset > 0 ? 'lg:grid-cols-[24%_1fr]' : ''}`}
            >
              {signal.offset > 0 && <div aria-hidden="true" />}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-body text-[13px] tracking-[0.15em] text-text-muted tabular-nums shrink-0">
                    {signal.number}
                  </span>
                  <span className="h-px flex-1 bg-border-1" aria-hidden="true" />
                </div>
                <p className="font-display font-bold tracking-[-0.02em] leading-[1.15] text-text-primary text-[clamp(1.5rem,3vw,2.25rem)] max-w-[560px]">
                  {signal.statement}
                </p>
                <p className="font-heading text-[15px] font-semibold uppercase tracking-[0.08em] text-accent-primary mt-5">
                  {signal.label}
                </p>
                <p className="font-body text-[14px] text-text-muted mt-1.5">{signal.description}</p>
              </div>
            </motion.div>
          ))}
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
