import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { ButtonPrimary } from '../Button/Primary';
import { Cookie, GearSix as Settings, ShieldCheck, CaretLeft as ChevronLeft, X } from '@phosphor-icons/react';

/**
 * CookieBanner Component - Ultra Simple & Robust Version
 * No animations, no complex logic, fixed at the very top of the Z-index.
 * Includes explicit fallbacks for translations.
 */

export function CookieBanner({ forceShow, onClose }: { forceShow?: boolean, onClose?: () => void }) {
  const { t } = useTranslation();
  
  // State management - Initialized to true to ensure visibility as requested
  const [show, setShow] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
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

  const handleAcceptAll = () => {
    localStorage.setItem('flowdee-cookie-consent', JSON.stringify({ essential: true, analytics: true, marketing: true }));
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

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 z-[9999] bg-black/30 transition-opacity duration-300"
        onClick={() => { setShow(false); if (onClose) onClose(); }}
        aria-hidden="true"
      />
      <div 
        className="fixed inset-x-0 bottom-0 z-[10000] p-4 md:p-8 flex justify-center md:justify-end pointer-events-none"
        style={{ isolation: 'isolate' }}
      >
        <div className="pointer-events-auto w-full max-w-[380px] bg-surface-0 border border-border-0 rounded-[24px] shadow-panel overflow-hidden">
          <div className="p-5 md:p-6 relative z-20">
            {!showSettings ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-1 rounded-[16px] flex items-center justify-center text-accent-primary shrink-0 border border-border-0">
                      <Cookie size={24} weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-text-primary font-heading text-[18px] tracking-[-0.01em] leading-[1.1]" style={{ fontWeight: 400 }}>
                        {texts.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                        <p className="text-text-primary font-body text-[10px] font-medium uppercase tracking-[0.15em] whitespace-nowrap">
                          {texts.badge}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShow(false)} 
                    className="text-text-muted hover:text-text-primary p-2 hover:bg-state-hover-bg rounded-full transition-all shrink-0 cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-text-secondary font-body text-[14px] leading-relaxed max-w-[95%]">
                  {texts.description}
                </p>

                <div className="flex flex-col gap-2.5">
                  <ButtonPrimary onClick={handleAcceptAll} className="w-full h-10 text-[13px] font-medium tracking-wide">
                    {texts.acceptAll}
                  </ButtonPrimary>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button 
                      onClick={() => setShowSettings(true)}
                      className="h-9 flex items-center justify-center gap-2 bg-surface-1 hover:bg-state-hover-bg border border-border-0 rounded-full text-text-primary font-medium text-[11px] transition-all cursor-pointer group"
                    >
                      <Settings size={13} className="group-hover:rotate-45 transition-transform" />
                      {texts.settings}
                    </button>
                    <button 
                      onClick={handleRefuseAll}
                      className="h-9 flex items-center justify-center bg-surface-1 hover:bg-state-hover-bg border border-border-0 rounded-full text-text-primary font-medium text-[11px] transition-all cursor-pointer"
                    >
                      {texts.refuseAll}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
