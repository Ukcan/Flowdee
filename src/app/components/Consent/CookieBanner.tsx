import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { ButtonPrimary } from '../Button/Primary';
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
    const consent = localStorage.getItem('flowdee-cookie-consent');
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
    localStorage.setItem('flowdee-cookie-consent', JSON.stringify({ essential: true, analytics: true, marketing: true }));
    syncAnalyticsWithConsent();
    setShow(false);
    if (onClose) onClose();
  };

  const handleRefuseAll = () => {
    localStorage.setItem('flowdee-cookie-consent', JSON.stringify({ essential: true, analytics: false, marketing: false }));
    setShow(false);
    if (onClose) onClose();
  };

  const handleSaveSettings = () => {
    localStorage.setItem('flowdee-cookie-consent', JSON.stringify(preferences));
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
        <div className="pointer-events-auto w-full bg-surface-0 border-t border-border-0 shadow-panel">
          <div className="mx-auto max-w-[1100px] px-5 md:px-8 py-3 md:py-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 min-h-[72px]">
            <div className="flex items-center gap-3 flex-1">
              <Cookie size={20} weight="duotone" className="text-accent-primary shrink-0 hidden sm:block" aria-hidden="true" />
              <p className="text-text-secondary font-body text-[12px] md:text-[13px] leading-snug text-center md:text-left">
                {texts.description}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
              <button
                onClick={() => setShowSettings(true)}
                className="h-10 px-4 flex items-center justify-center gap-1.5 bg-transparent hover:bg-state-hover-bg border border-border-0 rounded-full text-text-primary font-body font-medium text-[12px] transition-all cursor-pointer group"
              >
                <Settings size={13} className="group-hover:rotate-45 transition-transform" aria-hidden="true" />
                {texts.settings}
              </button>
              <button
                onClick={handleRefuseAll}
                className="h-10 px-4 flex items-center justify-center bg-transparent hover:bg-state-hover-bg border border-border-1 rounded-full text-text-primary font-body font-medium text-[12px] transition-all cursor-pointer"
              >
                {texts.refuseAll}
              </button>
              <ButtonPrimary onClick={handleAcceptAll} className="h-10 px-4 text-[12px] font-medium tracking-wide">
                {texts.acceptAll}
              </ButtonPrimary>
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
