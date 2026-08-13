import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ButtonPrimary } from '../Button/Primary';
import { AUDIT_LINK } from '../../constants/links';

/**
 * Hero — optimisée conversion (offre d'audit 279 €).
 * Hiérarchie épurée : un seul CTA dominant (achat audit), réassurance couplée,
 * actions secondaires en liens discrets. Identité, couleurs, fond animé, H1 et sous-titre conservés.
 */

const BENEFITS = ['Rapport priorisé', 'Recommandations illustrées', "Plan d'action clair"];

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-accent-primary" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();

  const anim = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } };

  const openAuditCheckout = () => {
    window.location.href = AUDIT_LINK;
  };
  const openCalendar = () => {
    window.dispatchEvent(new CustomEvent('flowdee:open-calendar'));
  };
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-base)]';
  const textLink = `inline-flex items-center min-h-[44px] px-1 font-body text-[13px] sm:text-[14px] text-text-secondary underline underline-offset-4 decoration-border-1 hover:text-text-primary rounded transition-colors ${focusRing}`;

  return (
    <section
      className="relative min-h-[100svh] md:min-h-[100vh] flex items-center py-20 md:py-28 bg-transparent overflow-hidden"
      aria-label="Audit UX Flowdee"
      id="hero"
    >
      <div className="relative z-10 max-w-[1080px] mx-auto px-6 sm:px-8 md:px-16 w-full">
        <div className="flex flex-col items-center text-center gap-6 md:gap-7">
          {/* Eyebrow */}
          <motion.div {...anim(0.05)} className="inline-block">
            <span className="font-body text-[12px] px-5 py-2 bg-accent-tint text-[color:var(--accent-eyebrow)] font-bold tracking-[0.08em] uppercase rounded-full border border-accent-primary/40">
              Audit UX · SEO · Accessibilité · Microcopy
            </span>
          </motion.div>

          {/* H1 — deux phrases, une par ligne (chaque phrase reste un groupe, wrap interne sur mobile) */}
          <motion.h1 {...anim(0.12)} className="heading-display text-text-primary text-pretty">
            Un beau site ne suffit pas.<br />Il doit convaincre.
          </motion.h1>

          {/* Description (inchangée) */}
          <motion.p {...anim(0.2)} className="body-large max-w-[660px] mx-auto">
            Recevez sous 3 à 5 jours un audit priorisé de votre landing page, site ou tunnel, avec les problèmes
            identifiés et les corrections concrètes à appliquer.
          </motion.p>

          {/* Bénéfices — ligne légère avec coches discrètes */}
          <motion.ul
            {...anim(0.26)}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-body text-[13px] sm:text-[14px] text-text-secondary"
            aria-label="Ce que comprend l'audit"
          >
            {BENEFITS.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5">
                <CheckIcon />
                {b}
              </li>
            ))}
          </motion.ul>

          {/* CTA dominant unique + réassurance couplée */}
          <motion.div {...anim(0.34)} className="flex flex-col items-center gap-3 pt-1">
            <ButtonPrimary
              onClick={openAuditCheckout}
              size="l"
              className={`px-10 min-w-[17rem] text-[16px] ${focusRing}`}
            >
              Commander mon audit — 279 €
            </ButtonPrimary>
            <p className="font-body text-[13px] sm:text-[14px] font-medium text-text-secondary tracking-[0.01em] max-w-[440px]">
              Paiement sécurisé · Confirmation sous 24&nbsp;h · Livraison sous 3 à 5 jours ouvrés
            </p>
          </motion.div>

          {/* Actions secondaires — liens discrets (aucune concurrence avec l'achat) */}
          <motion.div
            {...anim(0.42)}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
          >
            <button type="button" onClick={() => scrollToSection('case-studies')} className={textLink}>
              Voir un exemple de rapport
            </button>
            <span aria-hidden="true" className="text-text-muted select-none">
              ·
            </span>
            <button type="button" onClick={openCalendar} className={textLink}>
              Réserver un appel de 30&nbsp;min
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection as HeroFlowdee };
