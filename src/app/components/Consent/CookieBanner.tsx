import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { ButtonPrimary } from '../Button/Primary';
import { readConsent, writeConsent } from '../../constants/consent';
import { Cookie, GearSix as Settings, ShieldCheck, CaretLeft as ChevronLeft } from '@phosphor-icons/react';
import { syncAnalyticsWithConsent } from '../../constants/analytics';

/**
 * CookieBanner Component
 *
 * La bannière par défaut est une barre basse compacte (~72-96px) plutôt
 * qu'un encart de coin : celui-ci, sur mobile, recouvrait jusqu'à 47,7 % de
 * la hauteur utile et masquait les trois CTA du premier écran (diagnostic
 * externe 2026-08-18, F-03). Le volet de paramétrage détaillé, lui, reste un
 * panneau plus haut — il ne s'ouvre qu'à la demande, plus jamais au chargement.
 */

export function CookieBanner({
  forceShow,
  onClose,
  onVisibleChange,
}: {
  forceShow?: boolean;
  onClose?: () => void;
  /** Signale à l'appelant si la bannière (barre ou panneau) occupe l'écran,
   *  pour que d'autres éléments flottants (ex. le module d'accessibilité)
   *  puissent s'écarter le temps du choix. */
  onVisibleChange?: (visible: boolean) => void;
}) {
  const { t } = useTranslation();

  // State management - Initialized to true to ensure visibility as requested
  const [show, setShow] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  // Check consent status on mount
  useEffect(() => {
    // `readConsent()` renvoie null si le choix est absent, illisible, d'une
    // version périmée, ou vieux de plus de six mois. Tester la simple présence
    // de la clé rendait le choix éternel : un refus d'il y a deux ans valait
    // encore, et un consentement aussi.
    const consent = readConsent();
    // If consent exists and we are not forcing show, hide it
    if (consent && !forceShow) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [forceShow]);

  useEffect(() => {
    onVisibleChange?.(show);
  }, [show, onVisibleChange]);

  const handleAcceptAll = () => {
    writeConsent({ analytics: true, marketing: true });
    syncAnalyticsWithConsent();
    setShow(false);
    if (onClose) onClose();
  };

  const handleRefuseAll = () => {
    writeConsent({ analytics: false, marketing: false });
    setShow(false);
    if (onClose) onClose();
  };

  const handleSaveSettings = () => {
    writeConsent({ analytics: preferences.analytics, marketing: preferences.marketing });
    syncAnalyticsWithConsent();
    setShow(false);
    setShowSettings(false);
    if (onClose) onClose();
  };

  if (!show) return null;

  // Fallback text if translations are missing or loading
  const texts = {
    badge: t.cookies?.badge || "Confidentialité",
    title: t.cookies?.title || "Cookies",
    description: t.cookies?.description || "Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.",
    acceptAll: t.cookies?.acceptAll || "Tout accepter",
    refuseAll: t.cookies?.refuseAll || "Refuser",
    settings: t.cookies?.settings || "Paramètres",
    save: t.cookies?.save || "Enregistrer",
    essentialTitle: t.cookies?.essential?.title || "Essentiels",
    essentialDesc: t.cookies?.essential?.description || "Requis pour le site.",
    analyticsTitle: t.cookies?.analytics?.title || "Analytiques",
    analyticsDesc: t.cookies?.analytics?.description || "Mesure d'audience.",
    marketingTitle: t.cookies?.marketing?.title || "Marketing",
    marketingDesc: t.cookies?.marketing?.description || "Publicité ciblée."
  };

  // Barre basse compacte — le choix par défaut au chargement. Pleine largeur,
  // hauteur bornée (~72-96px) pour laisser le premier écran du site visible
  // (F-03) : les trois options tiennent sur une ligne, avec le même poids
  // visuel entre « Tout accepter » et « Tout refuser » (F-15).
  if (!showSettings) {
    return (
      <div
        className="fixed inset-x-0 bottom-0 z-[10000] pointer-events-none"
        style={{ isolation: 'isolate' }}
      >
        {/* Bandeau inversé : surface d'accent, encre sombre. On utilise la
            PAIRE de tokens `accent-primary` / `on-accent`, conçue pour aller
            ensemble — en navy elle donne or + encre presque noire, en ivoire
            brun profond + ivoire. Écrire l'or en dur casserait le thème clair,
            où `--accent-primary` vaut #6B5430 : du texte navy y serait
            illisible. */}
        <div className="pointer-events-auto w-full bg-accent-primary border-t border-[color:var(--on-accent)]/30 shadow-panel">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 py-3 md:py-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 min-h-[72px]">
            <div className="flex items-center gap-3 flex-1">
              <Cookie size={20} weight="duotone" className="text-[color:var(--on-accent)] shrink-0 hidden sm:block" aria-hidden="true" />
              <p className="text-[color:var(--on-accent)] font-body text-[12px] md:text-[13px] leading-snug text-center md:text-left">
                {texts.description}
              </p>
            </div>
            {/* Hiérarchie à DEUX niveaux, et non trois boutons pairs.
                « Tout refuser » traité en filet discret face à un « Tout
                accepter » plein est le motif que la CNIL sanctionne : refuser
                doit être aussi simple qu'accepter. Les deux décisions ont donc
                la même hauteur (44px, la cible tactile de ButtonPrimary), le
                même filet de 2px et la même respiration horizontale — l'une en
                aplat, l'autre en contour.

                « Paramétrer » n'est pas une décision mais l'ouverture d'un
                panneau : il perd son filet et devient un lien. Auparavant il
                était visuellement identique à « Tout refuser », seule l'icône
                les distinguait.

                Rayon unifié sur `--radius-button` : les deux secondaires
                étaient en `rounded-full` face à un dominant à 6px, soit deux
                géométries pour une même rangée de commandes. */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
              <button
                onClick={() => setShowSettings(true)}
                className="min-h-[44px] px-2 flex items-center justify-center gap-1.5 bg-transparent border-0 rounded-[var(--radius-button)] text-[color:var(--on-accent)]/80 hover:text-[color:var(--on-accent)] hover:underline underline-offset-4 font-body font-medium text-[12px] transition-all cursor-pointer group"
              >
                <Settings size={13} className="group-hover:rotate-45 transition-transform" aria-hidden="true" />
                {texts.settings}
              </button>
              <button
                onClick={handleRefuseAll}
                className="min-h-[44px] px-5 flex items-center justify-center bg-transparent hover:bg-[color:var(--on-accent)]/10 border-2 border-[color:var(--on-accent)] rounded-[var(--radius-button)] text-[color:var(--on-accent)] font-body font-semibold text-[12px] transition-all cursor-pointer"
              >
                {texts.refuseAll}
              </button>
              {/* Aplat d'encre plutôt que `ButtonPrimary` : le bouton doré du
                  système disparaîtrait sur un bandeau doré. */}
              <button
                onClick={handleAcceptAll}
                className="min-h-[44px] px-5 flex items-center justify-center bg-[color:var(--on-accent)] hover:opacity-90 border-2 border-[color:var(--on-accent)] rounded-[var(--radius-button)] text-accent-bright font-body font-semibold text-[12px] tracking-wide transition-all cursor-pointer"
              >
                {texts.acceptAll}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Panneau de paramétrage détaillé — ouvert uniquement à la demande, jamais
  // au chargement : peut se permettre d'être plus haut que la barre par défaut.
  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-[10000] p-4 md:p-8 flex justify-center md:justify-end pointer-events-none"
        style={{ isolation: 'isolate' }}
      >
        <div className="pointer-events-auto w-full max-w-[380px] bg-surface-0 border border-border-0 rounded-[24px] shadow-panel overflow-hidden">
          <div className="p-5 md:p-6 relative z-20">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-state-hover-bg rounded-xl text-text-secondary hover:text-text-primary transition-all cursor-pointer"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <h3 className="text-text-primary font-heading text-[18px] tracking-[-0.01em] leading-[1.1]" style={{ fontWeight: 400 }}>
                    {texts.title}
                  </h3>
                </div>

                <div className="space-y-3 py-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Essential */}
                  <div className="flex items-center justify-between p-4 bg-surface-1 rounded-[20px] border border-border-0 transition-colors">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <ShieldCheck size={14} className="text-accent-primary" />
                        <span className="text-text-primary font-medium text-[11px] uppercase tracking-wider">
                          {texts.essentialTitle}
                        </span>
                      </div>
                      <p className="text-text-muted text-[10px] leading-normal font-medium">
                        {texts.essentialDesc}
                      </p>
                    </div>
                    <div className="w-10 h-5 bg-accent-bg rounded-full flex items-center px-1">
                      <div className="w-3.5 h-3.5 bg-accent-primary rounded-full translate-x-5 shadow-panel" />
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex items-center justify-between p-4 bg-surface-1 rounded-[20px] border border-border-0 hover:border-border-1 transition-colors">
                    <div className="flex-1 pr-4">
                      <span className="text-text-primary font-medium text-[11px] uppercase tracking-wider block mb-1.5">
                        {texts.analyticsTitle}
                      </span>
                      <p className="text-text-muted text-[10px] leading-normal font-medium">
                        {texts.analyticsDesc}
                      </p>
                    </div>
                    <button 
                      onClick={() => setPreferences(p => ({...p, analytics: !p.analytics}))}
                      className={`w-10 h-5 rounded-full flex items-center px-1 transition-all cursor-pointer ${preferences.analytics ? 'bg-accent-primary' : 'bg-bg-depth'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-panel ${preferences.analytics ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>

                  {/* Marketing */}
                  <div className="flex items-center justify-between p-4 bg-surface-1 rounded-[20px] border border-border-0 hover:border-border-1 transition-colors">
                    <div className="flex-1 pr-4">
                      <span className="text-text-primary font-medium text-[11px] uppercase tracking-wider block mb-1.5">
                        {texts.marketingTitle}
                      </span>
                      <p className="text-text-muted text-[10px] leading-normal font-medium">
                        {texts.marketingDesc}
                      </p>
                    </div>
                    <button 
                      onClick={() => setPreferences(p => ({...p, marketing: !p.marketing}))}
                      className={`w-10 h-5 rounded-full flex items-center px-1 transition-all cursor-pointer ${preferences.marketing ? 'bg-accent-primary' : 'bg-bg-depth'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-panel ${preferences.marketing ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>

                <ButtonPrimary onClick={handleSaveSettings} className="w-full h-10 font-medium text-[13px]">
                  {texts.save}
                </ButtonPrimary>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
