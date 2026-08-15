import React from 'react';
import { motion } from 'motion/react';
import { Check, PhoneCall, ArrowRight, Star } from '@phosphor-icons/react';
import { ParallaxHeading } from '../Decor/ParallaxHeading';
import { useTranslation } from '../../contexts/LanguageContext';
import { ButtonPrimary } from '../Button/Primary';
import { ButtonSecondary } from '../Button/Secondary';
import { CALENDAR_LINK, AUDIT_LINK } from '../../constants/links';

interface ServiceData {
  plan: string;
  timeline: string;
  title: string;
  price: string;
  description: string;
  forWho: string;
  deliverables: string[];
  ctaPrimaryLabel: string;
  ctaPrimaryAction: 'contact' | 'calendar' | 'audit';
  ctaSecondaryLabel: string;
  ctaSecondaryAction: 'contact' | 'caseStudies' | 'calendar';
  featured: boolean;
  microProof: string;
}

export function ServicesSection() {
  const { t } = useTranslation();

  const services: ServiceData[] = [
    {
      plan: 'Audit',
      timeline: '3–5\u00A0JOURS',
      title: 'Audit UX & Conversion',
      price: '890\u00A0€',
      description: 'Identifiez les frictions qui bloquent votre parcours et repartez avec un plan de correction priorisé.',
      forWho: 'Pour : une landing page, un onboarding, un checkout ou un parcours critique.',
      deliverables: [
        'Audit heuristique UX',
        'Contrôles SEO UX & accessibilité WCAG',
        'Problèmes priorisés impact / effort',
        '1 écran clé corrigé dans Figma',
      ],
      ctaPrimaryLabel: 'Commander l\u2019audit\u00A0— 890\u00A0€',
      ctaPrimaryAction: 'audit',
      ctaSecondaryLabel: 'Poser mes questions',
      ctaSecondaryAction: 'calendar',
      featured: false,
      microProof: 'Livré sous 5\u00A0jours\u00A0\u2022\u00A0Jusqu\u2019à 5\u00A0écrans',
    },
    {
      plan: 'Sprint',
      timeline: '2\u00A0SEMAINES',
      title: 'Product Sprint + Tests',
      price: '3\u00A0900\u00A0€',
      description: 'Concevez, testez et itérez un parcours critique avant d\u2019investir dans son développement.',
      forWho: 'Pour\u00A0: une feature clé, un onboarding, un checkout ou un dashboard.',
      deliverables: [
        'Cadrage + user flow',
        'Wireframes + prototype interactif',
        'Tests avec 5 utilisateurs + itération',
        'UI finale + handoff Figma',
      ],
      ctaPrimaryLabel: 'Réserver un appel\u00A0— 30\u00A0min',
      ctaPrimaryAction: 'calendar',
      ctaSecondaryLabel: 'Voir les cas clients',
      ctaSecondaryAction: 'caseStudies',
      featured: true,
      microProof: 'Prototype testé et itéré\u00A0\u2022\u00A05\u00A0utilisateurs',
    },
    {
      plan: 'Partner',
      timeline: 'MENSUEL',
      title: 'Fractional Product Designer',
      price: 'Dès 2\u00A0200\u00A0€/mois',
      description: 'Une capacité Product Design intégrée à votre équipe sans recruter un poste supplémentaire.',
      forWho: 'Pour\u00A0: concevoir, tester et améliorer votre produit en continu.',
      deliverables: [
        'UX/UI & conception de features',
        'Tests utilisateurs & optimisation',
        'Design System & composants',
        'Handoff Dev & documentation',
      ],
      ctaPrimaryLabel: 'Réserver un appel\u00A0— 30\u00A0min',
      ctaPrimaryAction: 'calendar',
      ctaSecondaryLabel: 'Demander un devis',
      ctaSecondaryAction: 'contact',
      featured: false,
      microProof: '4\u00A0jours/mois réservés\u00A0\u2022\u00A0Engagement flexible',
    },
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToCaseStudies = () => {
    const element = document.getElementById('case-studies');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSecondaryAction = (action: ServiceData['ctaSecondaryAction'], context?: string) => {
    switch (action) {
      case 'caseStudies':
        scrollToCaseStudies();
        break;
      case 'calendar':
        window.dispatchEvent(new CustomEvent('flowdee:open-calendar', { detail: context ? { context } : undefined }));
        break;
      case 'contact':
      default:
        scrollToContact();
        break;
    }
  };

  return (
    <section
      id="services"
      className="services-blueprint-section relative py-24 md:py-32 overflow-hidden bg-surface-1 border-t border-border-0"
      aria-label="Service packages"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 relative z-10">
        {/* Section title */}
        <div className="flex flex-col items-center mb-16">
          <ParallaxHeading>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="heading-1 text-center text-text-primary mt-4"
            >
              {t.services.title}
            </motion.h2>
          </ParallaxHeading>
        </div>

        {/* Cards grid — 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="services-card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7 mb-16">
          {services.map((service, index) => {
            const isFeatured = service.featured;

            return (
              <motion.div
                key={service.plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  card-surface services-card flex flex-col relative transition-all duration-200 p-7 lg:p-8
                  ${isFeatured
                    ? 'bg-surface-0 border-accent-primary/40'
                    : 'bg-surface-0 border-border-0'
                  }
                `}
              >
                {/* Featured badge — inside card, top-right */}
                {isFeatured && (
                  <div className="absolute top-3 right-3">
                    <span
                      className="
                        inline-flex items-center gap-1.5
                        font-body text-[11px] px-3 py-1.5
                        bg-accent-bg text-accent-primary border border-accent-border
                        font-bold whitespace-nowrap tracking-[0.02em] normal-case
                        rounded-full
                      "
                    >
                      <Star size={11} weight="fill" aria-hidden="true" className="text-accent-primary" />
                      Offre recommandée
                    </span>
                  </div>
                )}

                {/* Timeline eyebrow — muted by default; accent stays punctual, reserved for the recommended card */}
                <div className="mb-6">
                  <span className={`font-body text-[10px] font-medium uppercase tracking-[0.2em] ${isFeatured ? 'text-accent-primary' : 'text-text-muted'}`}>
                    {service.timeline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-[24px] lg:text-[28px] text-text-primary mb-3 tracking-[-0.01em]" style={{ fontWeight: 400 }}>
                  {service.title}
                </h3>

                {/* Price — accent anchor on the recommended card only, standard cards read as primary text */}
                <div className={`font-display text-[20px] lg:text-[22px] mb-6 tracking-[-0.01em] ${isFeatured ? 'text-accent-primary' : 'text-text-primary'}`} style={{ fontWeight: 300 }}>
                  {service.price}
                </div>

                {/* Description */}
                <p className="body mb-5">
                  {service.description}
                </p>

                {/* "Pour qui" */}
                {service.forWho && (
                  <p className="font-body text-[12px] text-text-muted font-normal mb-6 border-l border-border-1 pl-4">
                    {service.forWho}
                  </p>
                )}

                {/* Deliverables */}
                <div className="space-y-3.5 mb-8 flex-grow">
                  {service.deliverables.map((deliverable, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="
                          w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
                          bg-[#8A9E8C]/10 text-[#8A9E8C]
                        "
                      >
                        <Check size={12} weight="bold" />
                      </div>
                      <span className="font-body text-[14px] text-text-secondary font-normal">
                        {deliverable}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Micro-proof */}
                <p
                  className="font-body text-[11px] text-text-muted font-normal tracking-[0.02em] mb-5"
                  aria-label="Preuve de livraison"
                >
                  {service.microProof}
                </p>

                {/* CTA area — single primary button + secondary link */}
                <div className="flex flex-col gap-3 mt-auto">
                  {/* Primary action — gold solid only on the recommended card;
                      standard cards use the secondary style so the three CTAs
                      don't compete visually. Text, destination, size unchanged. */}
                  {isFeatured ? (
                    <ButtonPrimary
                      onClick={
                        service.ctaPrimaryAction === 'calendar'
                          ? () => window.dispatchEvent(new CustomEvent('flowdee:open-calendar', { detail: { context: service.title } }))
                          : service.ctaPrimaryAction === 'audit'
                          ? () => { window.location.href = AUDIT_LINK; }
                          : scrollToContact
                      }
                      size="m"
                      className="w-full"
                      aria-label={service.ctaPrimaryLabel}
                    >
                      {service.ctaPrimaryLabel}
                    </ButtonPrimary>
                  ) : (
                    <ButtonSecondary
                      onClick={
                        service.ctaPrimaryAction === 'calendar'
                          ? () => window.dispatchEvent(new CustomEvent('flowdee:open-calendar', { detail: { context: service.title } }))
                          : service.ctaPrimaryAction === 'audit'
                          ? () => { window.location.href = AUDIT_LINK; }
                          : scrollToContact
                      }
                      size="m"
                      className="w-full"
                      aria-label={service.ctaPrimaryLabel}
                    >
                      {service.ctaPrimaryLabel}
                    </ButtonSecondary>
                  )}

                  {/* Secondary — text link, not button */}
                  <button
                    type="button"
                    onClick={() => handleSecondaryAction(service.ctaSecondaryAction, service.title)}
                    className="
                      group/link inline-flex items-center justify-center gap-1.5
                      min-h-[44px] px-2
                      font-body text-[13px] font-normal
                      text-text-secondary bg-transparent border-0
                      hover:text-text-primary hover:underline hover:underline-offset-4
                      transition-all duration-200
                      outline-none
                      focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0
                      rounded-md
                    "
                    aria-label={service.ctaSecondaryLabel}
                  >
                    <span className="text-text-primary">{service.ctaSecondaryLabel}</span>
                    <ArrowRight
                      size={14}
                      className="text-text-primary transition-transform duration-200 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clôture unique : indécision + partenariat long-terme menaient toutes
            deux à "réserver un appel" — un seul bloc plutôt que deux prompts
            empilés au poids visuel identique, pour clarifier la hiérarchie. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative text-center mt-4 p-10 rounded-[24px] bg-accent-bg border border-accent-border shadow-panel hover:border-accent-primary/50 transition-all duration-300 hover:scale-[1.01] group"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Groupe 1 — message : icone + label court + phrase de valeur concrete */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary/15 border border-accent-border group-hover:bg-accent-primary/25 transition-all duration-300">
                <PhoneCall weight="duotone" className="w-5 h-5 text-accent-primary" />
              </div>
              <span className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
                Pas encore décidé ?
              </span>
              <p className="font-body text-[16px] text-text-primary font-medium max-w-md">
                Un appel de 30 minutes suffit pour trouver la bonne formule — audit, sprint, ou partenariat continu.
              </p>
            </div>
            {/* Groupe 2 — action */}
            <a
              href={CALENDAR_LINK}
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('flowdee:open-calendar')); }}
              rel="noopener noreferrer"
              className="group/pri relative !overflow-hidden inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-[var(--radius-button)] bg-accent-primary text-on-accent border-[1.5px] border-transparent hover:!border-accent-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              aria-label="Réserver mes 30 minutes découverte"
            >
              {/* Hover BG (wave overlay) — same as ButtonPrimary */}
              <span className="absolute inset-0 invisible translate-y-full opacity-0 group-hover/pri:visible group-hover/pri:translate-y-0 group-hover/pri:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                <svg
                  className="absolute bottom-full left-0 w-full"
                  style={{ height: '10px' }}
                  viewBox="0 0 500 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,12 C60,12 100,0 250,4 C400,8 440,12 500,12 L500,12 Z"
                    fill="var(--accent-hover)"
                  />
                </svg>
                <div className="w-full h-full" style={{ backgroundColor: 'var(--accent-hover)' }} />
              </span>
              <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-200">
                <PhoneCall weight="duotone" className="w-4 h-4" />
                <span className="font-body text-[14px]">Réserver mes 30 minutes</span>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { ServicesSection as Services };
