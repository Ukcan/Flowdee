import React from 'react';
import { useLocation, Link } from 'react-router';
import { Envelope as Mail, Phone, MapPin } from '@phosphor-icons/react';
import { useTranslation } from '../../contexts/LanguageContext';
import { CTA } from '../../constants/offer';
import { CALENDAR_LINK, openAuditLink } from '../../constants/links';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';
import { LogoFlowdee } from '../Brand/LogoFlowdee';

/**
 * Section/Footer Component
 * Nomenclature Figma: Section/Footer
 */

interface FooterSectionProps {
  onOpenCookies?: () => void;
}

export function FooterSection({ onOpenCookies }: FooterSectionProps) {
  const { t } = useTranslation();
  const location = useLocation();
  const onHome = location.pathname === '/';

  /* Même nomenclature que la barre de navigation : « À propos » menait à
     « Notre approche » et « Services » aux offres et tarifs. */
  const menuItems = [
    { label: t.nav.services, id: 'services' },
    { label: t.nav.caseStudies, id: 'case-studies' },
    { label: t.nav.approach, id: 'approche' },
    { label: t.nav.contact, id: 'contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      className="pt-24 md:pt-32 pb-8 bg-surface-0 border-t border-border-0 relative overflow-hidden"
      role="contentinfo"
    >
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          {/* Left: Logo + Contact Info */}
          <div className="space-y-8 lg:pr-8">
            <LogoFlowdee
              markClassName="size-10 md:size-11"
              wordmarkClassName="text-[15px] md:text-[16px]"
            />

            <p className="font-body text-[13px] leading-relaxed text-text-secondary max-w-[280px]">
              {t.footer.tagline}
            </p>

            <div className="space-y-3">
              <a href="mailto:contact@flowdee.fr" className="inline-flex items-center gap-2 min-h-[44px] py-1 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary hover:text-accent-primary transition-all group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-base)]">
                <Mail size={16} weight="duotone" className="w-4 h-4 shrink-0 text-accent-primary group-hover:opacity-70 transition-opacity" />
                <span>contact@flowdee.fr</span>
              </a>
              <a href="tel:+33630699273" className="inline-flex items-center gap-2 min-h-[44px] py-1 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary hover:text-accent-primary transition-all group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-base)]">
                <Phone size={16} weight="duotone" className="w-4 h-4 shrink-0 text-accent-primary group-hover:opacity-70 transition-opacity" />
                <span>06 30 69 92 73</span>
              </a>
              <div className="flex items-start gap-2 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary">
                <MapPin size={16} weight="duotone" className="w-4 h-4 shrink-0 mt-px text-accent-primary" />
                <span>Bordeaux · Nice · À{' '}distance</span>
              </div>
            </div>
          </div>

          {/* Grouped Columns: Navigation, Legal, Social */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row gap-12 lg:gap-24 lg:justify-start lg:pl-40">
            {/* Center: Links */}
            <div className="space-y-6 min-w-[140px]">
              <h3 className="font-heading text-[13px] font-medium uppercase tracking-[0.08em] text-text-primary">{t.footer.navigation}</h3>
              <nav className="flex flex-col" aria-label="Navigation du pied de page">
                {menuItems.map((item) => (
                  /* Vraie ancre crawlable plutôt qu'un bouton pur JS : fonctionne
                     aussi depuis /audit-ux ou /etudes-de-cas/:slug (navigation
                     complète vers l'accueil + ancre), et en scroll fluide quand
                     on est déjà sur l'accueil. */
                  <a
                    key={item.label}
                    href={onHome ? `#${item.id}` : `/#${item.id}`}
                    onClick={(e) => {
                      if (onHome) {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }
                    }}
                    className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/audit-ux/"
                  className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  Audit UX (page complète)
                </a>
                <a
                  href="https://cv.flowdee.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  Mon parcours (CV)
                </a>
              </nav>
            </div>

            {/* Center-Right: Legal Links */}
            <div className="space-y-6 min-w-[140px]">
              <h3 className="font-heading text-[13px] font-medium uppercase tracking-[0.08em] text-text-primary">LÉGAL</h3>
              <nav className="flex flex-col" aria-label="Liens légaux">
                <Link
                  to="/mentions-legales/"
                  className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  Mentions légales
                </Link>
                <Link
                  to="/politique-de-confidentialite/"
                  className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  Politique de confidentialité
                </Link>
                <Link
                  to="/cgv/"
                  className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  CGV
                </Link>
                <Link
                  to="/se-retracter/"
                  className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  Se rétracter
                </Link>
                <button onClick={onOpenCookies} className="min-h-[44px] flex items-center text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors">
                  Gestion des cookies
                </button>
              </nav>
            </div>

            {/* Right: Social Icons */}
            <div className="space-y-6">
              <h3 className="font-heading text-[13px] font-medium uppercase tracking-[0.08em] text-text-primary">{t.footer.followMe}</h3>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/in/benjamin-duffau/" target="_blank" rel="noopener noreferrer" className="group/li relative w-[44px] h-[44px] flex items-center justify-center text-text-secondary overflow-hidden rounded-full transition-all duration-200" aria-label="LinkedIn">
                  {/* Hover BG (wave overlay) — gentle wave rising from bottom */}
                  <span className="absolute inset-0 invisible translate-y-full opacity-0 group-hover/li:visible group-hover/li:translate-y-0 group-hover/li:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                    {/* Wave crest */}
                    <svg
                      className="absolute bottom-full left-0 w-full"
                      style={{ height: '10px' }}
                      viewBox="0 0 500 12"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,12 C60,12 100,0 250,4 C400,8 440,12 500,12 L500,12 Z"
                        fill="var(--accent-primary)"
                      />
                    </svg>
                    {/* Solid fill */}
                    <div className="w-full h-full" style={{ backgroundColor: 'var(--accent-primary)' }} />
                  </span>
                  <span className="relative z-10 group-hover/li:text-[color:var(--surface-0)] transition-colors duration-200 inline-flex items-center justify-center">
                    <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </span>
                </a>
                {/* Twitter button disabled (Zero Deletion Policy)
                <a href="#" className="group relative w-[44px] h-[44px] flex items-center justify-center bg-surface-1 text-text-secondary hover:text-white overflow-hidden rounded-full border border-border-0 hover:border-accent-primary/30 transition-all duration-200" aria-label="Twitter">
                  <span className="absolute inset-0 bg-accent-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Twitter size={18} className="relative z-10" />
                </a>
                */}
              </div>
            </div>
          </div>
        </div>

        {/* La hiérarchie était inversée par rapport au reste du site : l'appel
            en bouton principal, l'achat en secondaire. Le pied de page
            désignait donc une action prioritaire différente de celle du hero et
            de la section Offres. */}
        <div className="pt-12 pb-12 border-t border-border-0 flex flex-col sm:flex-row justify-center items-center gap-6">
          <ButtonPrimary
            onClick={() => openAuditLink()}
            size="l"
            className="px-12"
          >
            {CTA.audit}
          </ButtonPrimary>
          <ButtonSecondary
            onClick={() => window.dispatchEvent(new CustomEvent('flowdee:open-calendar'))}
            size="l"
            className="px-12"
          >
            {CTA.call}
          </ButtonSecondary>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-border-0 text-center">
          <p className="font-body text-[11px] font-normal uppercase tracking-[0.2em] text-text-muted">
             {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

// Alias for backwards compatibility
export { FooterSection as Footer };