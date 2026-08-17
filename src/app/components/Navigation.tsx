import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';
import { List as Menu, X, PhoneCall } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';
import svgPaths from '../imports/svg-sg0ezcs3e9';
import { LogoFlowdee } from './Brand/LogoFlowdee';
import { useTranslation } from '../contexts/LanguageContext';
import { CTA_PRIMARY, CTA_SECONDARY } from '../constants/ctaCopy';
import { CALENDAR_LINK, openAuditLink } from '../constants/links';
import { CTA, AUDIT_REASSURANCE } from '../constants/offer';

function LogoHomeButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="relative flex items-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg group"
      aria-label="Retour en haut de page"
    >
      <LogoFlowdee
        markClassName="size-8 md:size-9 transition-opacity duration-300 group-hover:opacity-85"
        wordmarkClassName="text-[14px]"
      />
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
  const location = useLocation();
  const onHome = location.pathname === '/';

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

  /* Vraie ancre crawlable plutôt qu'un bouton pur JS (section 5 de l'audit
     SEO) : sur l'accueil, comportement inchangé (scroll fluide, empêché par
     défaut) ; ailleurs (/audit-ux, /etudes-de-cas/:slug), navigation complète
     vers l'accueil suivie de l'ancre native du navigateur. */
  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);
  const handleSectionClick = (id: string) => (e: React.MouseEvent) => {
    if (onHome) {
      e.preventDefault();
      scrollToSection(id);
    } else {
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
          {/* Logo — pas de hauteur figée sur le conteneur : la tuile grandit
              de 32 à 36px au-delà de `md` et un `h-8` la rognerait. */}
          <div className="flex items-center">
            <LogoHomeButton />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={sectionHref(item.id)}
                  onClick={handleSectionClick(item.id)}
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
                </a>
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
            /* z-index au-dessus du bouton flottant d'accessibilité (z-[10100],
               volontairement au-dessus de tout pour rester joignable partout) :
               sans ça, ce bouton restait visible par-dessus le volet mobile
               ouvert, chevauchant le CTA et sa réassurance en bas de panneau. */
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface-0 border-l border-border-0 lg:hidden z-[10200] flex flex-col p-12 gap-8 shadow-panel"
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
                <a
                  key={item.label}
                  href={sectionHref(item.id)}
                  onClick={handleSectionClick(item.id)}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  className={`font-body font-medium text-[20px] text-left py-1.5 transition-colors duration-200 hover:text-accent-primary ${
                    activeSection === item.id ? 'text-accent-primary' : 'text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/audit-ux"
                onClick={() => setMobileMenuOpen(false)}
                className="font-body font-medium text-[20px] text-left py-1.5 transition-colors duration-200 hover:text-accent-primary text-text-primary"
              >
                Audit UX (page complète)
              </a>
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