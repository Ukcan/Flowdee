import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ButtonPrimary } from '../Button/Primary';
import { openAuditLink } from '../../constants/links';
import { CTA, AUDIT_DIMENSIONS, AUDIT_DELIVERY } from '../../constants/offer';

/**
 * Hero — optimisée conversion (offre d'audit 890 €).
 * Hiérarchie épurée : un seul CTA dominant (achat audit), réassurance couplée,
 * actions secondaires en liens discrets. Identité, couleurs, fond animé, H1 et sous-titre conservés.
 */

const BENEFITS = ['Rapport priorisé', 'Recommandations actionnables', "Plan d'action clair"];

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
    openAuditLink();
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
      aria-labelledby="hero-title"
      id="hero"
    >
      <div className="relative z-10 max-w-[1080px] mx-auto px-6 sm:px-8 md:px-16 w-full">
        <div className="flex flex-col items-center text-center gap-6 md:gap-7">
          {/* Eyebrow — plain text on mobile (a wrapped pill looks broken at that width), full chip from sm+ */}
          <motion.div {...anim(0.05)} className="block sm:inline-block">
            <span className="block sm:inline max-w-[260px] sm:max-w-none mx-auto font-body text-[10px] sm:text-[11px] px-0 sm:px-5 py-0 sm:py-1.5 bg-transparent sm:bg-accent-tint/50 sm:backdrop-blur-sm text-[color:var(--accent-eyebrow)] font-medium tracking-[0.08em] sm:tracking-[0.12em] uppercase rounded-full sm:border sm:border-accent-primary/25">
              {/* Annonçait « Audit UX · SEO · Accessibilité · Rédaction », soit
                  quatre audits complets. Le livrable en compte un, assorti de
                  trois contrôles : la promesse est ramenée à ce qui est
                  réellement produit. */}
              {AUDIT_DIMENSIONS}
            </span>
          </motion.div>

          {/* H1 — deux phrases, une par ligne (chaque phrase reste un groupe, wrap interne sur mobile) */}
          <motion.h1 id="hero-title" {...anim(0.12)} className="heading-display text-text-primary text-pretty">
            Un beau site ne suffit pas.<br />Il doit convaincre.
          </motion.h1>

          {/* Description (inchangée) */}
          {/* « votre landing page, site ou tunnel » laissait entendre qu'un site
              entier était audité pour 890 €. Le périmètre est désormais énoncé
              avant le bénéfice — c'est lui qui conditionne la tenue de la
              promesse. */}
          <motion.p {...anim(0.2)} className="body-large max-w-[660px] mx-auto">
            Un parcours critique, une landing page ou jusqu’à 5 écrans/pages : vous recevez les problèmes
            identifiés, priorisés, et les corrections concrètes à appliquer.
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
              {CTA.audit}
            </ButtonPrimary>
            {/* La ligne cumulait un délai de confirmation et un délai de
                livraison ; côte à côte, les deux se lisaient comme une seule
                fourchette floue. Seul le délai de livraison est engagé ici, le
                démarrage est détaillé dans la FAQ. */}
            <p className="font-body text-[13px] sm:text-[14px] font-medium text-text-secondary tracking-[0.01em] max-w-[440px]">
              Paiement sécurisé · {AUDIT_DELIVERY}
            </p>
          </motion.div>

          {/* Actions secondaires — liens discrets (aucune concurrence avec l'achat) */}
          <motion.div
            {...anim(0.42)}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
          >
            {/* Annonçait « Voir un exemple de rapport » et menait aux
                réalisations : aucun rapport d'exemple n'existe sur le site. Le
                lien mène désormais à la section qui détaille réellement le
                livrable, sous un intitulé qui ne promet que ça. */}
            <button type="button" onClick={() => scrollToSection('deliverables')} className={textLink}>
              {CTA.auditContents}
            </button>
            <span aria-hidden="true" className="text-text-muted select-none">
              ·
            </span>
            <button type="button" onClick={openCalendar} className={textLink}>
              {CTA.call}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection as HeroFlowdee };
