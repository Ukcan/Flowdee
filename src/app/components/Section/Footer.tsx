import React from 'react';
import { Envelope as Mail, Phone, MapPin } from '@phosphor-icons/react';
import { useTranslation } from '../../contexts/LanguageContext';
import { CTA_PRIMARY, CTA_SECONDARY } from '../../constants/ctaCopy';
import { CALENDAR_LINK, AUDIT_LINK } from '../../constants/links';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';

/**
 * Section/Footer Component
 * Nomenclature Figma: Section/Footer
 */

interface FooterSectionProps {
  onOpenCGV?: () => void;
  onOpenPrivacy?: () => void;
  onOpenCookies?: () => void;
}

function LogoFlowdee() {
  return (
    <div className="relative h-[60px] w-[240px]" data-name="Logo Flowdee">
      <svg width="150" height="38" viewBox="0 0 150 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="block size-full text-text-primary">
        <defs>
          <filter id="footer_logo_shadow" x="-4" y="-3" width="30" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#C9A96E" floodOpacity="0.25"/>
          </filter>
        </defs>
        <rect x="0.5" y="3.5" width="31" height="31" rx="7.5" fill="var(--surface-1)" stroke="var(--border-0)"/>
        <g transform="translate(7, 9.5)" filter="url(#footer_logo_shadow)">
          <path d="M0 1C0 0.447716 0.447715 0 1 0L10.3093 0C13.7915 1.50063e-07 16.192 1.12414 18.061 3.25862C19.7332 5.33388 20.0694 7.3319 19.9891 9.34914C19.8317 13.306 17.7462 15.2845 15.7001 16.5647C13.7351 17.7941 10.6225 17.971 8.16135 17.996C7.6091 18.0016 7.16146 17.5523 7.16146 17L7.16146 11.3438C7.16146 11.0845 7.26212 10.8354 7.44223 10.649L9.3771 8.64607C10.0019 7.99931 11.0963 8.44159 11.0963 9.34086V13.431C11.0963 13.9833 11.5472 14.4196 12.0843 14.2913C12.9235 14.0908 14.1369 13.6025 15.0705 12.4138C15.9393 11.3076 16.3297 10.0474 16.3297 9C16.3297 7.79741 15.917 6.77112 15.0705 5.70259C13.5647 3.80172 10.9783 3.80172 10.3093 3.80172C8.46341 3.80172 6.12263 3.80172 4.81571 3.80172C4.26343 3.80172 3.81682 4.24944 3.81682 4.80172V5.63362C3.81682 6.1859 4.26453 6.63362 4.81682 6.63362H7.9963C8.87246 6.63362 9.32501 7.68039 8.72479 8.31867L7.10348 10.0428C6.91449 10.2438 6.65087 10.3578 6.37499 10.3578L4.81682 10.3578C4.26453 10.3578 3.81682 10.8055 3.81682 11.3578L3.81682 17C3.81682 17.5523 3.3691 18 2.81682 18H1C0.447716 18 0 17.5523 0 17L0 1Z" fill="#C9A96E"/>
          <path d="M1 0.0253906L10.3096 0.0253906C13.7849 0.0254388 16.1783 1.14622 18.042 3.27441C19.7091 5.3435 20.0439 7.33496 19.9639 9.34766C19.8854 11.3216 19.3262 12.8011 18.5322 13.9463C17.7381 15.0917 16.708 15.9049 15.6865 16.5439C14.7083 17.1558 13.4429 17.5062 12.1133 17.707C10.7836 17.9078 9.39136 17.9582 8.16113 17.9707C7.62298 17.9762 7.18652 17.5386 7.18652 17L7.18652 11.3438C7.18653 11.091 7.28436 10.8478 7.45996 10.666L9.39551 8.66309C10.0047 8.03308 11.0713 8.46425 11.0713 9.34082V13.4307C11.0713 13.9954 11.5337 14.4481 12.0898 14.3154C12.9323 14.1141 14.1517 13.624 15.0898 12.4297C15.9619 11.3193 16.3545 10.0532 16.3545 9C16.3545 7.79069 15.9389 6.75942 15.0898 5.6875C14.3325 4.73151 13.3044 4.25312 12.3828 4.01465C11.4613 3.77626 10.6445 3.77637 10.3096 3.77637C8.46364 3.77637 6.12235 3.77637 4.81543 3.77637C4.24943 3.77652 3.79199 4.2358 3.79199 4.80176V5.63379C3.79208 6.19967 4.25056 6.65798 4.81641 6.6582H7.99609C8.8503 6.6582 9.29209 7.67942 8.70703 8.30176L7.08496 10.0254C6.9007 10.2213 6.64398 10.333 6.375 10.333L4.81641 10.333C4.25062 10.3332 3.79217 10.7916 3.79199 11.3574L3.79199 17C3.79199 17.5385 3.35488 17.9746 2.81641 17.9746H1C0.461523 17.9746 0.0253906 17.5385 0.0253906 17L0.0253906 1C0.0253909 0.461523 0.461523 0.0253906 1 0.0253906Z" fill="none" stroke="var(--border-1)" strokeWidth="0.05"/>
        </g>
        <text x="40" y="24.5" fill="currentColor" style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 500, letterSpacing: '1.4px', textTransform: 'uppercase' as const }}>Flowdee</text>
      </svg>
    </div>
  );
}

export function FooterSection({ onOpenCGV, onOpenPrivacy, onOpenCookies }: FooterSectionProps) {
  const { t } = useTranslation();
  
  const menuItems = [
    { label: t.nav.services, id: 'services' },
    { label: t.nav.caseStudies, id: 'case-studies' },
    { label: t.nav.about, id: 'approche' },
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
      className="py-24 md:py-32 bg-surface-0 border-t border-border-0 relative overflow-hidden" 
      role="contentinfo"
    >
      <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
          {/* Left: Logo + Contact Info */}
          <div className="space-y-8 lg:pr-8">
            <LogoFlowdee />
            
            <div className="space-y-3">
              <a href="mailto:contact@flowdee.fr" className="flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary hover:text-accent-primary transition-all group">
                <Mail size={16} weight="duotone" className="w-4 h-4 shrink-0 text-accent-primary group-hover:opacity-70 transition-opacity" />
                <span>contact@flowdee.fr</span>
              </a>
              <a href="tel:+33630699273" className="flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.15em] text-text-secondary hover:text-accent-primary transition-all group">
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
              <nav className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="https://ukcan.github.io/benjamin-duffau-cv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  Mon parcours (CV)
                </a>
              </nav>
            </div>

            {/* Center-Right: Legal Links */}
            <div className="space-y-6 min-w-[140px]">
              <h3 className="font-heading text-[13px] font-medium uppercase tracking-[0.08em] text-text-primary">LÉGAL</h3>
              <nav className="flex flex-col gap-4">
                <button className="text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors">
                  Mentions légales
                </button>
                <button 
                  onClick={onOpenPrivacy}
                  className="text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors"
                >
                  Politique de confidentialité
                </button>
                <button onClick={onOpenCookies} className="text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors">
                  Paramètres cookies
                </button>
                <button onClick={onOpenCGV} className="text-left font-body text-[13px] font-normal text-text-muted hover:text-accent-primary transition-colors">
                  CGV
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

        {/* Global CTAs */}
        <div className="pt-12 pb-12 border-t border-border-0 flex flex-col sm:flex-row justify-center items-center gap-6">
          <ButtonPrimary
            onClick={() => window.dispatchEvent(new CustomEvent('flowdee:open-calendar'))}
            size="l"
            className="px-12"
          >
            {CTA_PRIMARY.label}
          </ButtonPrimary>
          <ButtonSecondary
            onClick={() => { window.location.href = AUDIT_LINK; }}
            size="l"
            className="px-12"
          >
            {CTA_SECONDARY.label}
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