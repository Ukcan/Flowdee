import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';
import { AUDIT_LINK } from '../../constants/links';

/**
 * Hero — optimisée conversion (offre d'audit 279 €).
 * Identité, couleurs, fond animé, H1, sous-titre et CTA principal conservés.
 * CTA primaire unique et dominant = achat de l'audit. « Réserver un appel » = action secondaire discrète.
 */

const BENEFITS = ['Rapport priorisé', 'Recommandations illustrées', "Plan d'action clair"];

// Aperçu illustratif du livrable (carte décorative, aria-hidden).
const REPORT_ISSUES = [
  {
    title: 'Proposition de valeur difficile à comprendre',
    impact: 'Impact élevé',
    effort: 'Effort faible',
    reco: 'recentrer le H1 sur le bénéfice client et isoler une seule action primaire.',
  },
  { title: 'CTA principal concurrencé par plusieurs actions', impact: 'Impact élevé', effort: 'Effort moyen' },
  { title: 'Formulaire trop long avant la validation', impact: 'Impact moyen', effort: 'Effort faible' },
];

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-accent-primary" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5l3.5 3.5L16 5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();

  // Animation d'apparition, désactivée si prefers-reduced-motion.
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

  return (
    <section
      className="relative min-h-[100svh] md:min-h-[100vh] flex items-center py-16 md:py-24 bg-transparent overflow-hidden"
      aria-label="Audit UX Flowdee"
      id="hero"
    >
      <div className="relative z-10 max-w-[1120px] mx-auto px-6 sm:px-8 md:px-16 w-full">
        <div className="flex flex-col items-center text-center gap-5 md:gap-6">
          {/* Eyebrow */}
          <motion.div {...anim(0.05)} className="inline-block">
            <span className="font-body text-[12px] px-5 py-2 bg-accent-tint text-[color:var(--accent-eyebrow)] font-bold tracking-[0.08em] uppercase rounded-full border border-accent-primary/40">
              Audit UX · SEO · Accessibilité · Microcopy
            </span>
          </motion.div>

          {/* H1 (inchangé) */}
          <motion.h1 {...anim(0.12)} className="heading-display text-text-primary max-w-[18ch]">
            Comprenez ce qui freine vos conversions — et quoi corriger en priorité.
          </motion.h1>

          {/* Description (inchangée) */}
          <motion.p {...anim(0.2)} className="body-large max-w-[680px] mx-auto">
            Recevez sous 3 à 5 jours un audit priorisé de votre landing page, site ou tunnel, avec les problèmes
            identifiés et les corrections concrètes à appliquer.
          </motion.p>

          {/* Bénéfices — ligne légère avec coches discrètes (plus de capsules pleines) */}
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

          {/* CTA group */}
          <motion.div {...anim(0.32)} className="w-full flex flex-col items-center gap-4 pt-1">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-[520px]">
              <ButtonPrimary onClick={openAuditCheckout} size="l" className={`flex-1 ${focusRing}`}>
                Commander mon audit — 279 €
              </ButtonPrimary>
              <ButtonSecondary
                onClick={() => scrollToSection('case-studies')}
                size="l"
                className={`flex-1 ${focusRing}`}
              >
                Voir un exemple de rapport
              </ButtonSecondary>
            </div>

            {/* Réassurance sous les CTA (lisible, non « mention légale ») */}
            <p className="font-body text-[13px] sm:text-[14px] font-medium text-text-secondary tracking-[0.01em]">
              Paiement sécurisé · Confirmation sous 24&nbsp;h · Livraison sous 3 à 5 jours ouvrés
            </p>

            {/* Action secondaire discrète : réserver un appel */}
            <button
              type="button"
              onClick={openCalendar}
              className={`font-body text-[13px] text-text-secondary underline underline-offset-4 decoration-border-1 hover:text-text-primary rounded transition-colors ${focusRing}`}
            >
              ou réserver un appel de 30&nbsp;min
            </button>
          </motion.div>

          {/* Aperçu du livrable (preuve au-dessus de la ligne de flottaison) */}
          <motion.div
            {...(reduce
              ? {}
              : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay: 0.42 } })}
            className="w-full max-w-[560px] mt-1"
            aria-hidden="true"
          >
            <div className="text-left card-surface bg-surface-0 border border-border-1 rounded-[20px] p-5 md:p-6 shadow-panel">
              {/* En-tête */}
              <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-border-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-primary shadow-[0_0_0_3px_var(--accent-bg)] shrink-0" />
                  <span className="font-body text-[13px] font-semibold text-text-primary truncate">
                    Extrait anonymisé d’un rapport d’audit
                  </span>
                </div>
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.08em] text-accent-primary bg-accent-tint px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                  Aperçu du livrable
                </span>
              </div>

              {/* Problèmes priorisés */}
              <ul className="mt-3.5 space-y-3">
                {REPORT_ISSUES.map((it, i) => (
                  <li key={it.title} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 w-6 h-6 rounded-md bg-surface-1 border border-border-1 flex items-center justify-center font-body text-[11px] font-bold text-accent-primary tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-[13.5px] font-semibold text-text-primary leading-snug">{it.title}</p>
                      {/* Impact / Effort — importance visuelle réduite (texte simple, sans capsule) */}
                      <p className="mt-0.5 font-body text-[11px] text-text-muted">
                        {it.impact} · {it.effort}
                      </p>
                      {/* Recommandation concrète (uniquement sur le 1er point) */}
                      {it.reco && (
                        <p className="mt-2 max-w-[46ch] font-body text-[12px] leading-snug text-text-secondary border-l-2 border-accent-primary/50 pl-2.5">
                          <span className="font-semibold text-accent-primary">Correction proposée :</span> {it.reco}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pied */}
              <div className="mt-3.5 pt-3 border-t border-border-0">
                <p className="font-body text-[10.5px] uppercase tracking-[0.06em] text-text-muted">
                  Backlog priorisé · Recommandations illustrées · Correctifs directement exploitables
                </p>
              </div>
            </div>
          </motion.div>

          {/* Preuve humaine discrète (contenu réel, non décoratif) */}
          <motion.p
            {...anim(0.5)}
            className="flex items-center justify-center gap-2 font-body text-[12px] text-text-muted max-w-[520px]"
          >
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-1 border border-border-1 text-[9px] font-bold text-accent-primary shrink-0"
              aria-hidden="true"
            >
              BD
            </span>
            Audit réalisé manuellement par Benjamin Duffau, UX/UI Designer depuis 2020.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export { HeroSection as HeroFlowdee };
