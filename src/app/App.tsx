import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { EditableContentProvider } from './contexts/EditableContentContext';
import { HeaderNav } from './components/Nav/Header';
import { HeroSection } from './components/Section/Hero';
import { TrustedClientsSection } from './components/Section/TrustedClients';
import { ProblemsSection } from './components/Section/Problems';
import { CaseStudiesSection } from './components/Section/CaseStudies';
import { ServicesSection } from './components/Section/Services';
import { ApproachSection } from './components/Section/Approach';
import { FAQSection } from './components/Section/FAQ';
import { FinalCTASection } from './components/Section/FinalCTA';
import { FooterSection } from './components/Section/Footer';
import { CGVSection } from './components/Section/CGV';
import { PrivacySection } from './components/Section/Privacy';
import { ScrollToTopButton } from './components/Button/ScrollToTop';
import { CookieBanner } from './components/Consent/CookieBanner';
import { ScrollBarIndicator } from './components/Indicator/ScrollBar';
import { ScrollMouseIndicator } from './components/Indicator/ScrollMouse';
// import { StickyCTA } from './components/CTA/Sticky'; // Disabled — Zero Deletion Policy
// import { DecorKeylines } from './components/Decor/Keylines'; // Disabled — Zero Deletion Policy
import { DecorKeylinesParallaxFlow } from './components/Decor/KeylinesParallaxFlow';
import { ParticleNetwork } from './components/Decor/ParticleNetwork';
import { CalendarModal } from './components/CalendarModal';

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
    // Synchronous init — avoids flash
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return true; // Default: Midnight Navy (dark)
  });
  const [showCGV, setShowCGV] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [forceShowCookies, setForceShowCookies] = useState(false);

  useEffect(() => {
    // Apply dark class immediately on mount (sync with state init)
    document.documentElement.classList.toggle('dark', darkMode);

    // Measure scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const openCGV = () => {
    setShowCGV(true);
  };

  const closeCGV = () => {
    setShowCGV(false);
  };

  const openPrivacy = () => {
    setShowPrivacy(true);
  };

  const closePrivacy = () => {
    setShowPrivacy(false);
  };

  useEffect(() => {
    if (showCGV || showPrivacy) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [showCGV, showPrivacy]);

  return (
    <LanguageProvider>
      <EditableContentProvider>
        <div className="relative min-h-screen bg-bg-base text-text-primary overflow-x-hidden">
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

          {/* BG / FX_KeylinesParallaxFlow_Dark — parallax keylines, dark mode only */}
          <DecorKeylinesParallaxFlow />

          {/* Animated particle network background */}
          <ParticleNetwork />

          {/* Scroll Progress Bar — minimalist hairline */}
          <ScrollBarIndicator />

          {/* Decorative Keylines — disabled (file preserved per Zero Deletion Policy) */}
          {/* <DecorKeylines /> */}

          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-primary focus:text-on-accent focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-focus-ring"
          >
            Skip to main content
          </a>

          {/* Toast Notifications */}
          <Toaster position="top-right" />

          {/* Modals rendered above everything else if active */}
          <AnimatePresence>
            {showCGV && (
              <CGVSection onClose={closeCGV} />
            )}
            
            {showPrivacy && (
              <PrivacySection onClose={closePrivacy} />
            )}
          </AnimatePresence>

          {/* Navigation */}
          <HeaderNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Main Content */}
          <main id="main-content" className="relative z-10">
            <HeroSection />
            <TrustedClientsSection />
            <ProblemsSection />
            <ServicesSection />
            <CaseStudiesSection />
            <ApproachSection />
            <FAQSection />
            <FinalCTASection />
          </main>

          {/* Footer */}
          <FooterSection 
            onOpenCGV={openCGV} 
            onOpenPrivacy={openPrivacy}
            onOpenCookies={() => setForceShowCookies(true)} 
          />

          {/* Scroll to Top */}
          <ScrollToTopButton />

          {/* Global Scroll Mouse Indicator — contextual per section */}
          <ScrollMouseIndicator />

          {/* Sticky Bottom CTA — Disabled per user request */}
          {/* <StickyCTA /> */}

          {/* In-site booking modal (Google Calendar embed) */}
          <CalendarModal />

          {/* Cookie Consent Banner */}
          <CookieBanner 
            forceShow={forceShowCookies} 
            onClose={() => setForceShowCookies(false)} 
          />

          {/* Editable Toggle Button — Disabled per user request */}
          {/* <EditableToggleButton /> */}
        </div>
      </EditableContentProvider>
    </LanguageProvider>
  );
}