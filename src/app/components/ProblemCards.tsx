import React from 'react';
import { motion } from 'motion/react';
import { ParallaxHeading } from './Decor/ParallaxHeading';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';
import { CTA } from '../constants/offer';

const SIGNALS = [
  {
    number: '01',
    offset: 0,
    title: 'Votre offre n’est pas comprise assez vite.',
    signal: 'SIGNAL · OFFRE FLOUE',
    description: 'Le visiteur doit chercher ce que vous faites et pour qui.',
    consequence: 'hésitation avant l’action',
  },
  {
    number: '02',
    offset: 24,
    title: 'Vos parcours demandent trop d’effort.',
    signal: 'SIGNAL · TROP D’ÉTAPES',
    description: 'Les actions essentielles sont noyées dans des choix ou étapes secondaires.',
    consequence: 'abandon ou report',
  },
  {
    number: '03',
    offset: 0,
    title: 'Du trafic. Peu de conversions.',
    signal: 'SIGNAL · PREUVE TARDIVE',
    description: 'Les éléments qui rassurent arrivent après le moment où l’utilisateur doit décider.',
    consequence: 'confiance insuffisante',
  },
] as const;

const AUDIT_CHECKS = [
  { label: 'CLARTÉ', question: 'L’offre est-elle comprise rapidement ?' },
  { label: 'EFFORT', question: 'L’action demande-t-elle trop d’étapes ?' },
  { label: 'CONFIANCE', question: 'Les preuves arrivent-elles avant la décision ?' },
] as const;

export function ProblemCards() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openCalendar = () => {
    window.dispatchEvent(new CustomEvent('flowdee:open-calendar'));
  };

  return (
    <section
      id="problems"
      className="relative overflow-hidden py-24 md:py-32 section-grid"
      aria-labelledby="signals-title"
    >
      <div className="relative z-10 mx-auto max-w-[1320px] px-8 md:px-16">
        <header className="mb-16 flex flex-col items-center md:mb-20">
          <ParallaxHeading>
            <motion.h2
              id="signals-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-[650px] text-center font-display text-[clamp(2.25rem,3vw,2.625rem)] font-medium leading-[1.08] tracking-[-0.025em] text-text-primary"
            >
              Votre parcours freine la conversion quand…
            </motion.h2>
          </ParallaxHeading>
        </header>

        <div className="flex w-full flex-col gap-16 md:gap-20">
          {SIGNALS.map((signal, index) => (
            <motion.article
              key={signal.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={`grid w-full grid-cols-1 ${signal.offset > 0 ? 'lg:grid-cols-[24%_minmax(0,1fr)]' : ''}`}
            >
              {signal.offset > 0 && <div aria-hidden="true" />}
              <div className="max-w-[420px]">
                <div className="mb-6 flex items-center gap-4">
                  <span className="shrink-0 font-body text-[13px] tracking-[0.15em] text-text-muted tabular-nums">
                    {signal.number}
                  </span>
                  <span className="h-px flex-1 bg-border-1" aria-hidden="true" />
                </div>
                <h3 className="font-display text-[clamp(1.5rem,2vw,1.875rem)] font-semibold leading-[1.17] tracking-[-0.02em] text-text-primary">
                  {signal.title}
                </h3>
                <p className="mt-4 font-body text-[12px] font-semibold uppercase leading-[1.3] tracking-[0.08em] text-accent-primary">
                  {signal.signal}
                </p>
                <p className="mt-2 font-body text-[15px] leading-[1.6] text-text-secondary">
                  {signal.description}
                </p>
                <p className="mt-3 font-body text-[14px] font-medium leading-[1.45] text-text-secondary">
                  <span className="text-text-primary">Conséquence</span> → {signal.consequence}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 border-y border-border-0 py-8 md:mt-24 md:py-10">
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-text-muted">
            L’audit vérifie
          </p>
          <div className="mt-6 grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-10">
            {AUDIT_CHECKS.map((check) => (
              <div key={check.label}>
                <p className="font-body text-[12px] font-semibold uppercase tracking-[0.1em] text-accent-primary">
                  {check.label}
                </p>
                <p className="mt-2 max-w-[28ch] font-body text-[15px] leading-[1.55] text-text-primary">
                  {check.question}
                </p>
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-center gap-8 md:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 text-center"
          >
            <p className="mx-auto max-w-[62ch] font-body text-[16px] leading-[1.55] text-text-secondary">
              Si un seul de ces points vous parle, l’audit permet d’identifier ce qui bloque et quoi corriger en priorité.
            </p>
            <div className="mx-auto flex w-full max-w-[360px] flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
              <ButtonPrimary onClick={() => scrollToSection('deliverables')} size="m" className="w-full sm:w-auto sm:px-[32px]">
                {CTA.auditContents}
              </ButtonPrimary>
              <ButtonSecondary onClick={openCalendar} size="m" className="w-full sm:w-auto">
                {CTA.call}
              </ButtonSecondary>
            </div>
          </motion.div>
        </footer>
      </div>
    </section>
  );
}