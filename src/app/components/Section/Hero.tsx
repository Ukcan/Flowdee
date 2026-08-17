import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ButtonPrimary } from '../Button/Primary';
import { openAuditLink } from '../../constants/links';
import {
  CTA,
  AUDIT_NAME,
  AUDIT_EYEBROW,
  AUDIT_SCOPE_EXAMPLES,
  AUDIT_SCOPE_SHORT,
  AUDIT_FIGMA_SCREEN,
  AUDIT_DELIVERY,
} from '../../constants/offer';

/**
 * Hero — optimisée conversion (offre d'audit 890 €).
 * Hiérarchie épurée : un seul H1 (dominant visuellement et sémantiquement),
 * une proposition de valeur, un périmètre en information secondaire, trois
 * preuves concrètes, un seul CTA dominant (achat audit), réassurance couplée,
 * actions secondaires hiérarchisées en liens discrets. Identité, couleurs,
 * fond animé conservés.
 */

const BENEFITS = [AUDIT_SCOPE_SHORT, AUDIT_FIGMA_SCREEN, AUDIT_DELIVERY];

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
  // Réservation d'appel — ne doit plus rivaliser avec l'achat ni avec le lien
  // vers l'exemple de livrable : plus petit, plus sourd, underline seulement
  // au survol/focus plutôt qu'en permanence.
  const textLinkQuiet = `inline-flex items-center min-h-[44px] px-1 font-body text-[12px] sm:text-[13px] text-text-muted underline-offset-4 hover:text-text-secondary hover:underline focus-visible:underline rounded transition-colors ${focusRing}`;

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
              {/* Annonçait « UX & Conversion · SEO UX · Accessibilité ·
                  Microcopy », une liste de compétences plutôt qu'une offre.
                  Nommer l'offre et son délai est l'information qu'un visiteur
                  qui arrive sur la page n'a pas encore. */}
              {AUDIT_EYEBROW}
            </span>
          </motion.div>

          {/* H1 unique — portait auparavant le message SEO pendant qu'un second
              texte (non sémantique, en `heading-display`) portait tout le
              poids visuel juste dessous : deux messages se disputaient
              l'attention, celui qui gagnait visuellement était le plus
              générique des deux. Le H1 hérite maintenant du traitement
              `heading-display` : un seul message, dominant à la fois
              sémantiquement et visuellement. `max-w` contrôle la coupure des
              lignes (2-3 lignes en desktop) plutôt que de la laisser au hasard
              de la largeur du conteneur. */}
          <motion.h1
            id="hero-title"
            {...anim(0.1)}
            className="font-display font-bold tracking-[-0.03em] leading-[1.08] text-text-primary text-pretty max-w-[900px]"
            style={{ fontSize: 'clamp(1.9rem, 0.7rem + 3.1vw, 3.5rem)' }}
          >
            {AUDIT_NAME} : identifiez ce qui bloque vos utilisateurs et freine vos conversions.
          </motion.h1>

          {/* Proposition de valeur — dit le bénéfice (savoir quoi corriger, dans
              quel ordre) avant le périmètre, qui redescend en information
              secondaire juste en dessous. */}
          <motion.p {...anim(0.16)} className="body-large max-w-[640px] mx-auto">
            En 5 jours ouvrés, vous savez quoi corriger, pourquoi et dans quel ordre — avec les frictions
            prioritaires, les recommandations concrètes et {AUDIT_FIGMA_SCREEN}.
          </motion.p>

          {/* Périmètre — plus discret (taille, couleur, largeur) que la
              proposition de valeur au-dessus : il précise l'offre, il ne doit
              jamais rivaliser avec le bénéfice qui la vend. */}
          <motion.p {...anim(0.2)} className="font-body text-[13px] sm:text-[14px] text-text-muted max-w-[480px] mx-auto -mt-2">
            {AUDIT_SCOPE_EXAMPLES}
          </motion.p>

          {/* Bénéfices — trois preuves concrètes (remplacent trois formulations
              du même bénéfice abstrait : rapport priorisé, recommandations
              actionnables, plan d'action clair — qui ne se distinguaient pas
              entre elles). */}
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

          {/* Conversion — un seul ordre de priorité : achat, puis exemple de
              livrable, puis réassurance, puis prise de rendez-vous (la moins
              engageante, reléguée en bas et visuellement la plus discrète). */}
          <motion.div {...anim(0.34)} className="flex flex-col items-center gap-3 pt-1">
            <ButtonPrimary
              onClick={openAuditCheckout}
              size="l"
              className={`px-10 min-w-[17rem] text-[16px] ${focusRing}`}
            >
              {CTA.audit}
            </ButtonPrimary>

            {/* Aucune page d'exemple de livrable n'existe sur le site : le lien
                mène à la section qui détaille réellement le contenu du
                livrable (#deliverables), seul le libellé change. */}
            <button type="button" onClick={() => scrollToSection('deliverables')} className={textLink}>
              {CTA.auditSample}
            </button>

            {/* La ligne cumulait un délai de confirmation et un délai de
                livraison ; côte à côte, les deux se lisaient comme une seule
                fourchette floue. Seul le délai de livraison est engagé ici, le
                démarrage est détaillé dans la FAQ. */}
            <p className="font-body text-[13px] sm:text-[14px] font-medium text-text-secondary tracking-[0.01em] max-w-[440px]">
              Paiement sécurisé · {AUDIT_DELIVERY}
            </p>

            <button type="button" onClick={openCalendar} className={`${textLinkQuiet} mt-1`}>
              {CTA.call}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection as HeroFlowdee };
