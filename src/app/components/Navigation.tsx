import React, { useState, useEffect, useMemo } from 'react';
import { List as Menu, X, PhoneCall } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';
import svgPaths from '../imports/svg-sg0ezcs3e9';
import { useTranslation } from '../contexts/LanguageContext';
import { CTA_PRIMARY, CTA_SECONDARY } from '../constants/ctaCopy';
import { CALENDAR_LINK, openAuditLink } from '../constants/links';
import { CTA, AUDIT_REASSURANCE } from '../constants/offer';

function LogoFlowdee() {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="relative flex items-center gap-2.5 h-[38px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg group" 
      data-name="Logo Flowdee"
      aria-label="Retour en haut de page"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-1 border border-border-0 group-hover:border-accent-primary/30 transition-all duration-300">
        <svg width="20" height="18" viewBox="0 0 20.1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="logo_shadow" x="-2" y="-1" width="26" height="24" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#C9A96E" floodOpacity="0.25"/>
            </filter>
          </defs>
          <g filter="url(#logo_shadow)">
            <path d="M0 1C0 0.447716 0.447715 0 1 0L10.3093 0C13.7915 1.50063e-07 16.192 1.12414 18.061 3.25862C19.7332 5.33388 20.0694 7.3319 19.9891 9.34914C19.8317 13.306 17.7462 15.2845 15.7001 16.5647C13.7351 17.7941 10.6225 17.971 8.16135 17.996C7.6091 18.0016 7.16146 17.5523 7.16146 17L7.16146 11.3438C7.16146 11.0845 7.26212 10.8354 7.44223 10.649L9.3771 8.64607C10.0019 7.99931 11.0963 8.44159 11.0963 9.34086V13.431C11.0963 13.9833 11.5472 14.4196 12.0843 14.2913C12.9235 14.0908 14.1369 13.6025 15.0705 12.4138C15.9393 11.3076 16.3297 10.0474 16.3297 9C16.3297 7.79741 15.917 6.77112 15.0705 5.70259C13.5647 3.80172 10.9783 3.80172 10.3093 3.80172C8.46341 3.80172 6.12263 3.80172 4.81571 3.80172C4.26343 3.80172 3.81682 4.24944 3.81682 4.80172V5.63362C3.81682 6.1859 4.26453 6.63362 4.81682 6.63362H7.9963C8.87246 6.63362 9.32501 7.68039 8.72479 8.31867L7.10348 10.0428C6.91449 10.2438 6.65087 10.3578 6.37499 10.3578L4.81682 10.3578C4.26453 10.3578 3.81682 10.8055 3.81682 11.3578L3.81682 17C3.81682 17.5523 3.3691 18 2.81682 18H1C0.447716 18 0 17.5523 0 17L0 1Z" fill="#C9A96E"/>
            <path d="M1 0.0253906L10.3096 0.0253906C13.7849 0.0254388 16.1783 1.14622 18.042 3.27441C19.7091 5.3435 20.0439 7.33496 19.9639 9.34766C19.8854 11.3216 19.3262 12.8011 18.5322 13.9463C17.7381 15.0917 16.708 15.9049 15.6865 16.5439C14.7083 17.1558 13.4429 17.5062 12.1133 17.707C10.7836 17.9078 9.39136 17.9582 8.16113 17.9707C7.62298 17.9762 7.18652 17.5386 7.18652 17L7.18652 11.3438C7.18653 11.091 7.28436 10.8478 7.45996 10.666L9.39551 8.66309C10.0047 8.03308 11.0713 8.46425 11.0713 9.34082V13.4307C11.0713 13.9954 11.5337 14.4481 12.0898 14.3154C12.9323 14.1141 14.1517 13.624 15.0898 12.4297C15.9619 11.3193 16.3545 10.0532 16.3545 9C16.3545 7.79069 15.9389 6.75942 15.0898 5.6875C14.3325 4.73151 13.3044 4.25312 12.3828 4.01465C11.4613 3.77626 10.6445 3.77637 10.3096 3.77637C8.46364 3.77637 6.12235 3.77637 4.81543 3.77637C4.24943 3.77652 3.79199 4.2358 3.79199 4.80176V5.63379C3.79208 6.19967 4.25056 6.65798 4.81641 6.6582H7.99609C8.8503 6.6582 9.29209 7.67942 8.70703 8.30176L7.08496 10.0254C6.9007 10.2213 6.64398 10.333 6.375 10.333L4.81641 10.333C4.25062 10.3332 3.79217 10.7916 3.79199 11.3574L3.79199 17C3.79199 17.5385 3.35488 17.9746 2.81641 17.9746H1C0.461523 17.9746 0.0253906 17.5385 0.0253906 17L0.0253906 1C0.0253909 0.461523 0.461523 0.0253906 1 0.0253906Z" fill="none" stroke="var(--border-1)" strokeWidth="0.05"/>
          </g>
        </svg>
      </div>
      <span className="font-heading text-[14px] tracking-[0.1em] text-text-primary uppercase" style={{ fontWeight: 500 }}>
        Flowdee
      </span>
    </button>
  );
}

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export type { NavigationProps };

export function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isFloating, setIsFloating] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  // useMemo : une référence stable évite que le useEffect de détection de
  // section (ci-dessous) ne se désabonne/réabonne à chaque rendu, ce qui
  // pouvait laisser passer un scroll sans que le listener soit attaché.
  /* Les sections telles qu'elles existent dans la page, dans l'ordre de
     lecture. Le volet mobile les déroule toutes : c'est un sommaire, il a la
     hauteur pour ça, et n'en montrer que quatre laissait la moitié du parcours
     invisible — livrables, optimisation IA et FAQ n'étaient atteignables qu'en
     faisant défiler à l'aveugle.
     `primary` marque celles que la barre desktop peut afficher : elle n'a la
     place que de quatre entrées entre le logo et les deux boutons d'action. */
  const sectionItems = useMemo(() => [
    { label: t.nav.frictions, id: 'problems' },
    { label: t.nav.deliverables, id: 'deliverables' },
    { label: t.nav.services, id: 'services', primary: true },
    { label: t.nav.caseStudies, id: 'case-studies', primary: true },
    { label: t.nav.approach, id: 'approche', primary: true },
    { label: t.nav.aiWorkflow, id: 'ia-workflow' },
    { label: t.nav.faq, id: 'faq' },
    { label: t.nav.contact, id: 'contact', primary: true }
  ], [t]);

  const menuItems = useMemo(() => sectionItems.filter((i) => i.primary), [sectionItems]);

  // Track floating state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFloating(scrollPosition > 40);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Toutes les sections, pas seulement celles de la barre desktop : sinon
      // l'entrée précédente restait allumée pendant qu'on traversait une
      // section absente du raccourci, et désignait donc le mauvais endroit.
      const sections = sectionItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        if (section) {
          // getBoundingClientRect (pas offsetTop) : certaines sections sont
          // nichées dans un ancêtre positionné (wrapper d'animation), ce qui
          // fausse offsetTop en le rendant relatif à cet ancêtre plutôt qu'à
          // la page entière.
          const rect = section.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const bottom = top + rect.height;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Marque la section active immédiatement au clic : scrollIntoView ne
      // déclenche pas toujours un évènement "scroll" (constaté quand le
      // saut est instantané), donc on ne peut pas compter uniquement sur le
      // scroll-spy passif pour refléter un choix explicite de l'utilisateur.
      setActiveSection(sectionId);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const openCalendar = () => {
    window.dispatchEvent(new CustomEvent('flowdee:open-calendar'));
  };

  const openAudit = () => {
    openAuditLink();
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 h-[64px] flex items-center transition-all duration-300 border-b ${
        isFloating 
          ? 'bg-surface-0/95 backdrop-blur-xl border-border-0' 
          : 'bg-transparent border-transparent'
      }`}>
        <nav className="w-full max-w-[1440px] mx-auto px-8 md:px-16 flex items-center justify-between" aria-label="Navigation principale">
          {/* Logo Texte */}
          <div className="flex items-center h-8">
            <LogoFlowdee />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative inline-flex items-center font-body font-medium text-[13px] leading-none 
                    px-4 h-[40px] rounded-full 
                    transition-all duration-200 ease-in-out 
                    nav-focus-treatment

                    ${isActive
                      ? 'text-accent-primary bg-accent-tint'
                      : 'text-text-secondary bg-transparent hover:text-accent-primary hover:bg-accent-tint'
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Hairline separator */}
            <div className="h-5 w-px bg-border-0" />
            {/* Action secondaire discrète : réserver un appel */}
            <button
              onClick={openCalendar}
              /* Cible de 21px de haut, sous le minimum de 24 (WCAG 2.5.8).
                 La barre fait 64px : la porter à 44 ne change rien à la mise
                 en page, les éléments étant centrés verticalement. */
              className="inline-flex items-center gap-1.5 min-h-[44px] px-1 font-body text-[13px] font-medium text-text-secondary hover:text-accent-primary underline-offset-4 hover:underline rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-base)]"
            >
              <PhoneCall size={16} weight="duotone" />
              {CTA.call}
            </button>

            {/* CTA primaire dominant : commander l'audit */}
            <ButtonPrimary
              onClick={openAudit}
              size="s"
              className="ml-2"
            >
              {CTA.audit}
            </ButtonPrimary>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-base)] hover:bg-state-hover-bg transition-colors"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface-0 border-l border-border-0 lg:hidden z-[70] flex flex-col p-12 gap-8 shadow-panel"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="self-end w-[44px] h-[44px] flex items-center justify-center border border-border-0 rounded-xl text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 relative z-10"
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
            
            {/* Sommaire complet du parcours. Corps réduit de 24 à 20px : à huit
                entrées, l'ancienne échelle dépassait de l'écran sur les petits
                mobiles. Le remplissage vertical porte la zone tactile à 44px,
                le minimum praticable au doigt — le texte seul n'en faisait que
                32. L'écart entre entrées absorbe la différence. */}
            <nav className="flex flex-col gap-2 relative z-10" aria-label="Sections de la page">
              {sectionItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  className={`font-body font-medium text-[20px] text-left py-1.5 transition-colors duration-200 hover:text-accent-primary ${
                    activeSection === item.id ? 'text-accent-primary' : 'text-text-primary'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <div className="mt-auto space-y-3 relative z-10">
              {/* CTA primaire dominant : commander l'audit */}
              <ButtonPrimary
                onClick={() => {
                  openAudit();
                  setMobileMenuOpen(false);
                }}
                size="l"
                className="w-full"
              >
                {CTA.audit}
              </ButtonPrimary>
              <p className="font-body text-[11px] text-center text-text-muted">
                {AUDIT_REASSURANCE}
              </p>
              {/* Action secondaire discrète : réserver un appel */}
              <button
                onClick={() => {
                  openCalendar();
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] font-body text-[15px] text-text-secondary hover:text-accent-primary underline underline-offset-4 decoration-border-1 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                {CTA.call}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}