import React from 'react';
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import svgPaths from '../imports/svg-sg0ezcs3e9';
import { useTranslation } from '../contexts/LanguageContext';

function LogoFlowdee() {
  return (
    <div className="relative h-[41px] w-[181px] text-accent-primary">
      <svg className="block size-full" fill="none" viewBox="0 0 181.18 41">
        <g id="Logo Flowdee">
          <path d={svgPaths.p134dde00} fill="currentColor" id="Vector" />
          <g id="FL">
            <path d={svgPaths.pa8f9a80} fill="currentColor" id="Vector_2" />
            <path d={svgPaths.p121b2a00} fill="currentColor" id="Vector_3" />
          </g>
          <path d={svgPaths.p1c918f00} fill="currentColor" id="o" />
          <g id="Group 47">
            <path d={svgPaths.p29a3c300} fill="currentColor" id="Vector_4" />
            <path d={svgPaths.p1102b900} fill="currentColor" id="Vector_5" />
            <path d={svgPaths.p2f609b80} fill="currentColor" id="Vector_6" />
            <path d={svgPaths.p261caa80} fill="currentColor" id="Vector_7" />
            <path d={svgPaths.p1ed64800} fill="white" id="Vector_8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  
  const menuItems = [
    { label: t.nav.services, id: 'services' },
    { label: t.nav.caseStudies, id: 'case-studies' },
    { label: t.nav.about, id: 'approche' }, // Fixed ID to match Nav
    { label: t.nav.contact, id: 'contact' }
  ];
  
  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="py-12 md:py-16 bg-surface-0 border-t border-border-0" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12 max-w-5xl mx-auto">
          {/* Left: Logo + Contact Info */}
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-start">
              <LogoFlowdee />
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:contact@flowdee.fr"
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent-primary transition-colors justify-start group"
              >
                <Mail className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>contact@flowdee.fr</span>
              </a>
              
              <a 
                href="tel:+33612345678"
                className="flex items-center gap-3 text-sm text-text-secondary hover:text-accent-primary transition-colors justify-start group"
              >
                <Phone className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>+33 6 12 34 56 78</span>
              </a>
              
              <div className="flex items-center gap-3 text-sm text-text-secondary justify-start">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Bordeaux | Nice - Remote</span>
              </div>
            </div>
          </div>

          {/* Center: Links */}
          <div className="space-y-4 text-left">
            <h3 className="font-heading font-medium text-text-primary uppercase tracking-wide text-sm">{t.footer.navigation}</h3>
            <nav className="flex flex-col gap-[12px] items-start" aria-label="Footer navigation">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-text-secondary hover:text-accent-primary transition-colors flex items-center focus-ring rounded px-2 py-1 -ml-2"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Social Icons */}
          <div className="space-y-4 text-left sm:col-span-2 lg:col-span-1">
            <h3 className="font-heading font-medium text-text-primary uppercase tracking-wide text-sm">{t.footer.followMe}</h3>
            <div className="flex gap-4 justify-start">
              <a
                href="https://www.linkedin.com/in/benjamin-duffau/"
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-surface-2 border border-border-1 hover:border-accent-primary hover:bg-accent-tint hover:text-accent-primary transition-all duration-200 hover:scale-[1.02] focus-ring"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-text-secondary group-hover:fill-accent-primary transition-colors" viewBox="0 0 14 14">
                  <path clipRule="evenodd" d="M2.913 2.362C3.173 2.094 3.316 1.736 3.313 1.364C3.29957 1.00292 3.14871 0.660606 2.89127 0.407065C2.63382 0.153525 2.28924 0.00791031 1.928 0C1.56581 0.00823195 1.22025 0.153628 0.961121 0.406813C0.701996 0.659999 0.548627 1.0021 0.532 1.364C0.537382 1.73557 0.685218 2.09089 0.944991 2.35662C1.20477 2.62235 1.55665 2.7782 1.928 2.792C2.29999 2.78326 2.65369 2.62885 2.913 2.362ZM1.67 4.63C1.083 4.617 0.683 4.608 0.683 5.326V13.318C0.683 14.021 1.065 14.007 1.615 13.986C1.715 13.9813 1.81967 13.9787 1.929 13.978C2.039 13.9787 2.14367 13.9813 2.243 13.986C2.791 14.006 3.165 14.021 3.165 13.318V5.327C3.165 4.609 2.773 4.617 2.189 4.631C2.10567 4.633 2.019 4.63433 1.929 4.635C1.839 4.635 1.75233 4.63367 1.669 4.631M5.753 4.646C5.487 4.699 5.316 4.869 5.316 5.327V13.318C5.316 14.022 5.683 14.008 6.234 13.987C6.334 13.9823 6.44 13.9797 6.552 13.979C6.664 13.9797 6.77033 13.9823 6.871 13.987C7.425 14.007 7.799 14.022 7.799 13.319V9.057C7.77768 8.83914 7.80289 8.61924 7.87297 8.41186C7.94305 8.20448 8.0564 8.01436 8.20551 7.8541C8.35462 7.69384 8.53608 7.56709 8.73787 7.48225C8.93966 7.39741 9.15717 7.35643 9.376 7.362C9.59589 7.34884 9.81603 7.38319 10.0215 7.46271C10.2269 7.54223 10.4128 7.66507 10.5665 7.82286C10.7202 7.98065 10.8381 8.16969 10.9122 8.37713C10.9863 8.58456 11.0149 8.80553 10.996 9.025V13.287C10.996 13.99 11.362 13.976 11.913 13.955C12.013 13.9503 12.119 13.9477 12.231 13.947C12.343 13.9477 12.4493 13.9503 12.55 13.955C13.101 13.975 13.467 13.99 13.467 13.287V7.83C13.4875 7.38205 13.4135 6.93481 13.2497 6.51735C13.086 6.0999 12.8362 5.72158 12.5167 5.40702C12.1971 5.09245 11.8149 4.84867 11.3949 4.69154C10.9749 4.53441 10.5266 4.46744 10.079 4.495C9.62312 4.45314 9.16412 4.5292 8.74611 4.71588C8.3281 4.90256 7.96511 5.19358 7.692 5.561C7.703 5.167 7.575 4.645 7.256 4.645C7.164 4.645 7.023 4.64 6.863 4.635C6.463 4.623 5.943 4.608 5.753 4.646Z" fillRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg bg-surface-2 border border-border-1 hover:border-accent-primary hover:bg-accent-tint hover:text-accent-primary transition-all duration-200 hover:scale-[1.02] focus-ring"
                aria-label="Behance"
              >
                <svg className="w-5 h-5 fill-text-secondary group-hover:fill-accent-primary transition-colors" viewBox="0 0 24 24">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-6 md:pt-8 border-t border-border-1 text-center">
          <p className="text-xs text-text-tertiary">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}