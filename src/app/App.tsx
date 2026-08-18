import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { EditableContentProvider } from './contexts/EditableContentContext';
import { HeaderNav } from './components/Nav/Header';
import { HomePage } from './pages/Home';
import { FooterSection } from './components/Section/Footer';
import { ScrollToTopButton } from './components/Button/ScrollToTop';

/**
 * Le même paquet applicatif de 843 Ko était servi à l'identique sur les neuf
 * pages, y compris /cgv/ et /mentions-legales/ qui ne sont que du texte
 * statique (diagnostic externe 2026-08-18, F-17). La page d'accueil reste
 * chargée d'emblée (route la plus visitée) ; les autres routes ne tirent
 * leur code qu'à la navigation.
 */
const AuditUXPage = lazy(() => import('./pages/AuditUX'));
const EtudeDeCasPage = lazy(() => import('./pages/EtudeDeCas'));
const SeRetracterPage = lazy(() => import('./pages/SeRetracter'));
const CGVSection = lazy(() => import('./components/Section/CGV').then((m) => ({ default: m.CGVSection })));
const PrivacySection = lazy(() => import('./components/Section/Privacy').then((m) => ({ default: m.PrivacySection })));
const MentionsLegalesSection = lazy(() => import('./components/Section/MentionsLegales').then((m) => ({ default: m.MentionsLegalesSection })));
import { CookieBanner } from './components/Consent/CookieBanner';
import { ScrollBarIndicator } from './components/Indicator/ScrollBar';
import { ScrollMouseIndicator } from './components/Indicator/ScrollMouse';
// import { StickyCTA } from './components/CTA/Sticky'; // Disabled — Zero Deletion Policy
// import { DecorKeylines } from './components/Decor/Keylines'; // Disabled — Zero Deletion Policy
import { DecorKeylinesParallaxFlow } from './components/Decor/KeylinesParallaxFlow';
import { ParticleNetwork } from './components/Decor/ParticleNetwork';
import { CalendarModal } from './components/CalendarModal';
import { ThankYouModal } from './components/ThankYouModal';
import { AccessibilityFloater } from './components/Accessibility/AccessibilityFloater';
import { THEME_EVENT } from './components/Accessibility/useA11ySettings';
import { syncAnalyticsWithConsent } from './constants/analytics';

/**
 * BackgroundGrid Component
 * Implements the visible but subtle grid and vignette requested in the Master Prompt.
 */
const BackgroundGrid = () => (
  <div className="bg-grid-container" aria-hidden="true">
    <div className="bg-grid-pattern" />
    <div className="bg-vignette" />
  </div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Lecture protégée : `localStorage` lève dans un contexte cloisonné
    // (Safari « bloquer tous les cookies », certaines webviews). Non protégée,
    // l'exception remontait jusqu'au render initial et laissait une page vide.
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
    } catch {
      /* on retombe sur le thème par défaut */
    }
    return true; // Default: Midnight Navy (dark)
  });
  const [forceShowCookies, setForceShowCookies] = useState(false);
  // Le bouton flottant d'accessibilité (bas-gauche) recouvrait partiellement
  // le bandeau de consentement sur mobile (diagnostic externe 2026-08-18,
  // F-15) : il s'efface le temps que la bannière occupe l'écran.
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  const location = useLocation();

  // React Router ne fait rien au scroll lors d'un changement de route en SPA
  // (ce n'est pas un vrai chargement de page) : sans ce correctif, une
  // nouvelle page s'affichait à la position de défilement laissée par la
  // précédente — flagrant sur "Retour" (navigate(-1)), qui rendait avec la
  // mise en page encore en train de s'stabiliser (GSAP/ScrollTrigger,
  // images). On ignore les URL avec ancre (`/#services`) : elles arrivent
  // toujours via un <a> classique (rechargement complet), le navigateur gère
  // déjà leur défilement nativement.
  useEffect(() => {
    if (location.hash) return;
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    // Apply dark class immediately on mount (sync with state init)
    document.documentElement.classList.toggle('dark', darkMode);

    // Measure scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

    // Charge Google Analytics si un consentement a déjà été enregistré
    // lors d'une session précédente.
    syncAnalyticsWithConsent();
  }, []);

  // Subtle mouse-follow on the hero depth glow (parallax with the constellation)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const glow = document.querySelector('.bg-hero-glow') as HTMLElement | null;
    if (!glow) return;
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      glow.style.setProperty('--glow-x', `${(nx * 40).toFixed(1)}px`);
      glow.style.setProperty('--glow-y', `${(ny * 30).toFixed(1)}px`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const applyTheme = React.useCallback((dark: boolean) => {
    setDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch {
      /* quota ou stockage bloqué : le thème reste appliqué pour la session */
    }
  }, []);

  const toggleDarkMode = () => applyTheme(!darkMode);

  // Le module d'accessibilité peut demander un thème ; l'état reste détenu ici
  // pour que la bascule de l'en-tête et le panneau restent cohérents.
  useEffect(() => {
    const onThemeRequest = (e: Event) => {
      const dark = (e as CustomEvent<{ dark: boolean }>).detail?.dark;
      if (typeof dark === 'boolean') applyTheme(dark);
    };
    window.addEventListener(THEME_EVENT, onThemeRequest);
    return () => window.removeEventListener(THEME_EVENT, onThemeRequest);
  }, [applyTheme]);

  return (
    <LanguageProvider>
      <EditableContentProvider>
        {/* overflow-x-clip et non -hidden : `hidden` fait de ce conteneur un
            conteneur de defilement, ce qui empeche tout `position: sticky`
            descendant de s'accrocher (rail des livrables). `clip` protege
            identiquement d'un debordement horizontal sans cet effet de bord. */}
        <div className="relative min-h-screen bg-bg-base text-text-primary overflow-x-clip">
          {/* Gooey SVG filter for blob-button CTA hover effect */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            aria-hidden="true"
            style={{ position: 'absolute', width: 0, height: 0 }}
          >
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="16" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9"
                  result="goo"
                />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
              </filter>
              {/* Softer, meltier variant — used by the secondary CTA */}
              <filter id="goo-soft">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="21" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -10"
                  result="goo"
                />
                <feBlend in2="goo" in="SourceGraphic" result="mix" />
              </filter>
            </defs>
          </svg>

          {/* Master Background Layer (Grid + Vignette) */}
          <BackgroundGrid />

          {/* Aurora — slow drifting colour background (over the flat grid) */}
          <div className="aurora-bg" aria-hidden="true" />

          {/* Depth: soft gold halo behind the hero headline (dark theme) */}
          <div className="bg-hero-glow" aria-hidden="true" />

          {/* BG / FX_KeylinesParallaxFlow_Dark — parallax keylines, dark mode only */}
          <DecorKeylinesParallaxFlow />

          {/* Animated particle network background */}
          <ParticleNetwork />

          {/* Scroll Progress Bar — minimalist hairline */}
          <ScrollBarIndicator />

          {/* Decorative Keylines — disabled (file preserved per Zero Deletion Policy) */}
          {/* <DecorKeylines /> */}

          {/* Aller au contenu principal link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-on-accent focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            Aller au contenu principal
          </a>

          {/* Toast Notifications */}
          <Toaster position="top-right" />

          {/* Navigation */}
          <HeaderNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Main Content — une route par page, chrome (nav/footer/décor) partagé.
              CGV et Politique de confidentialité sont des pages normales dans
              le flux, comme les autres — plus de calque plein-écran superposé. */}
          <main id="main-content" className="relative z-10">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/audit-ux" element={<AuditUXPage />} />
                <Route path="/etudes-de-cas/:slug" element={<EtudeDeCasPage />} />
                <Route path="/cgv" element={<CGVSection />} />
                <Route path="/politique-de-confidentialite" element={<PrivacySection />} />
                <Route path="/mentions-legales" element={<MentionsLegalesSection />} />
                <Route path="/se-retracter" element={<SeRetracterPage />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer */}
          <FooterSection onOpenCookies={() => setForceShowCookies(true)} />

          {/* Scroll to Top */}
          <ScrollToTopButton />

          {/* Global Scroll Mouse Indicator — contextual per section */}
          <ScrollMouseIndicator />

          {/* Sticky Bottom CTA — Disabled per user request */}
          {/* <StickyCTA /> */}

          {/* In-site booking modal (Google Calendar embed) */}
          <CalendarModal />

          {/* Post-payment thank-you modal (shown on ?payment=success) */}
          <ThankYouModal />

          {/* Module d'accessibilité — bouton flottant + panneau de réglages */}
          <AccessibilityFloater suppressLauncher={cookieBannerVisible} />

          {/* Cookie Consent Banner */}
          <CookieBanner
            forceShow={forceShowCookies}
            onClose={() => setForceShowCookies(false)}
            onVisibleChange={setCookieBannerVisible}
          />

          {/* Editable Toggle Button — Disabled per user request */}
          {/* <EditableToggleButton /> */}
        </div>
      </EditableContentProvider>
    </LanguageProvider>
  );
}