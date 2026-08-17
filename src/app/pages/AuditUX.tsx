import React from 'react';
import { Link } from 'react-router';
import { Check, ArrowRight, PhoneCall } from '@phosphor-icons/react';
import { ButtonPrimary } from '../components/Button/Primary';
import { ButtonSecondary } from '../components/Button/Secondary';
import { SectionHeader } from '../components/Layout/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { useSeo } from '../hooks/useSeo';
import { openAuditLink } from '../constants/links';
import {
  AUDIT_NAME,
  AUDIT_PRICE,
  AUDIT_DELIVERY,
  AUDIT_DELIVERY_SHORT,
  AUDIT_START,
  AUDIT_SCOPE,
  AUDIT_SCOPE_NOTE,
  AUDIT_DIMENSIONS_SENTENCE,
  AUDIT_DELIVERABLES,
  CTA,
} from '../constants/offer';
import { FAQS } from '../constants/faq';
import { ALL_CASE_STUDIES } from '../constants/caseStudies';

// Trailing slash : c'est la forme que Cloudflare Workers Assets sert en 200
// (html_handling par défaut redirige /audit-ux → /audit-ux/), le canonical
// doit désigner l'URL finale plutôt que celle qui redirige.
const CANONICAL = 'https://flowdee.fr/audit-ux/';

const WHEN_TO_AUDIT = [
  'Le taux de conversion stagne et vous ne savez pas précisément où les visiteurs décrochent.',
  'Vous vous préparez à investir en acquisition (SEA, contenu, partenariats) et voulez éviter de payer du trafic vers un tunnel qui fuit.',
  'Une refonte ou un nouveau parcours vient d’être livré et doit être validé avant d’aller plus loin.',
  'Un doute UX récurrent (formulaire, onboarding, checkout) revient dans les retours clients ou l’équipe support.',
];

const SEGMENTS = [
  {
    title: 'Audit UX SaaS',
    description:
      'Onboarding, activation, dashboard : on identifie ce qui freine la prise en main et fait décrocher les nouveaux utilisateurs avant qu’ils atteignent la valeur du produit.',
    caseSlug: 'optimisation-onboarding-saas',
  },
  {
    title: 'Audit UX landing page',
    description:
      'Clarté de la promesse, hiérarchie visuelle, friction avant le CTA : on audite ce qui empêche une landing page de convertir le trafic qu’elle reçoit déjà.',
    caseSlug: 'application-edtech-ux',
  },
  {
    title: 'Audit UX e-commerce',
    description:
      'Fiche produit, panier, checkout : on repère les points d’abandon du tunnel d’achat, en particulier sur mobile, où l’essentiel du trafic e-commerce se joue.',
    caseSlug: 'optimisation-checkout-ecommerce',
  },
];

// Sous-ensemble des questions FAQ les plus directement liées au périmètre de l'audit
// (mêmes questions/réponses que la home — cf. constants/faq.ts, source unique).
const AUDIT_FAQ_QUESTIONS = [
  'Sur quel périmètre porte l’audit ?',
  'Qu’est-ce que je reçois concrètement avec l’audit ?',
  'Le SEO et l’accessibilité sont-ils couverts ?',
  'Combien de temps ça prend et combien ça coûte ?',
];

export function AuditUXPage() {
  useSeo({
    title: 'Audit UX : identifiez ce qui freine vos conversions | Flowdee',
    /* Prix et délai composés depuis constants/offer : cette description était
       la 3e copie manuelle des chiffres de l'offre. */
    description: `${AUDIT_NAME} Flowdee : les problèmes qui bloquent vos visiteurs, priorisés, avec les corrections concrètes à appliquer. ${AUDIT_PRICE}, livré ${AUDIT_DELIVERY_SHORT.toLowerCase()}.`,
    canonical: CANONICAL,
  });

  const auditFaqs = FAQS.filter((f) => AUDIT_FAQ_QUESTIONS.includes(f.question));

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://flowdee.fr/' },
      { '@type': 'ListItem', position: 2, name: 'Audit UX', item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d’Ariane" className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 pt-28 md:pt-32">
        <ol className="flex items-center gap-2 font-body text-[12px] text-text-muted">
          <li>
            <Link to="/" className="hover:text-accent-primary transition-colors underline-offset-4 hover:underline">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary" aria-current="page">Audit UX</li>
        </ol>
      </nav>

      {/* Intro */}
      <section className="pt-8 pb-20 md:pb-28" aria-labelledby="audit-ux-title">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 text-center">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.25em] text-text-muted mb-5">
            {AUDIT_NAME}
          </p>
          <h1 id="audit-ux-title" className="heading-display text-text-primary text-pretty">
            Audit UX : identifiez ce qui freine vos utilisateurs et vos conversions
          </h1>
          <p className="body-large mt-6 max-w-[640px] mx-auto">
            {AUDIT_SCOPE} : vous recevez les problèmes identifiés, priorisés, et les corrections concrètes à
            appliquer. {AUDIT_DIMENSIONS_SENTENCE}
          </p>
          <div className="flex flex-col items-center gap-3 mt-9">
            <ButtonPrimary onClick={() => openAuditLink()} size="l" className="px-10 min-w-[17rem]">
              {CTA.audit}
            </ButtonPrimary>
            <p className="font-body text-[13px] text-text-secondary">{AUDIT_DELIVERY} · Paiement sécurisé</p>
          </div>
        </div>
      </section>

      {/* Qu'est-ce qu'un audit UX + Quand en réaliser un */}
      <section className="bg-surface-1 border-t border-border-0 py-20 md:py-28">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="heading-3 text-text-primary mb-4">Qu’est-ce qu’un audit UX ?</h2>
            <p className="body">
              Un audit UX & Conversion examine un parcours réel — une landing page, un onboarding, un checkout —
              du point de vue de la personne qui l’utilise : où elle hésite, où elle décroche, où le message
              n’est pas clair. Il aboutit à une liste de problèmes priorisés par impact, et aux corrections à
              appliquer pour les résoudre, plutôt qu’à un rapport théorique de bonnes pratiques génériques.
            </p>
          </div>
          <div>
            <h2 className="heading-3 text-text-primary mb-4">Quand réaliser un audit UX ?</h2>
            <ul className="space-y-3">
              {WHEN_TO_AUDIT.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-accent-primary/10 text-accent-primary">
                    <Check size={12} weight="bold" />
                  </span>
                  <span className="font-body text-[14px] leading-[1.6] text-text-secondary">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ce que Flowdee analyse / ce que vous recevez */}
      <section className="py-20 md:py-28 border-t border-border-0">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
          <SectionHeader
            variant="standard"
            align="center"
            eyebrow="Méthode"
            title="Ce que Flowdee analyse, ce que vous recevez"
            description="Un seul livrable, trois contrôles inclus — pas quatre audits séparés."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="card-surface bg-surface-0 border-border-0 p-8">
              <h3 className="font-heading text-[15px] font-medium text-accent-primary uppercase tracking-[0.12em] mb-5">
                Analyse
              </h3>
              <p className="body">{AUDIT_DIMENSIONS_SENTENCE} {AUDIT_SCOPE_NOTE}</p>
            </div>
            <div className="card-surface bg-surface-0 border-border-0 p-8">
              <h3 className="font-heading text-[15px] font-medium text-accent-primary uppercase tracking-[0.12em] mb-5">
                Livrables
              </h3>
              <ul className="space-y-3">
                {AUDIT_DELIVERABLES.filter((d) => d !== AUDIT_SCOPE && d !== AUDIT_DELIVERY).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-accent-primary/10 text-accent-primary">
                      <Check size={12} weight="bold" />
                    </span>
                    <span className="font-body text-[14px] text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="bg-surface-1 border-t border-border-0 py-20 md:py-28">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
          <SectionHeader
            variant="standard"
            align="center"
            eyebrow="Selon votre contexte"
            title="Audit UX SaaS, landing page ou e-commerce"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {SEGMENTS.map((segment) => {
              const relatedCase = ALL_CASE_STUDIES.find((c) => c.slug === segment.caseSlug);
              return (
                <div key={segment.title} className="card-surface bg-surface-0 border-border-0 p-7 flex flex-col">
                  <h3 className="font-heading text-[18px] text-text-primary mb-3" style={{ fontWeight: 400 }}>
                    {segment.title}
                  </h3>
                  <p className="font-body text-[14px] leading-[1.6] text-text-secondary flex-grow">
                    {segment.description}
                  </p>
                  {relatedCase && (
                    <Link
                      to={`/etudes-de-cas/${relatedCase.slug}`}
                      className="inline-flex items-center gap-1.5 mt-5 font-body text-[13px] font-medium text-accent-primary hover:underline"
                    >
                      Voir l’étude de cas : {relatedCase.title}
                      <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tarif & fonctionnement */}
      <section className="py-20 md:py-28 border-t border-border-0">
        <div className="max-w-[720px] mx-auto px-5 sm:px-8 text-center">
          <SectionHeader
            variant="standard"
            align="center"
            eyebrow="Tarif & fonctionnement"
            title={`${AUDIT_NAME} — ${AUDIT_PRICE}`}
            description={`${AUDIT_DELIVERY}. ${AUDIT_START}`}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <ButtonPrimary onClick={() => openAuditLink()} size="l" className="px-10">
              {CTA.audit}
            </ButtonPrimary>
            <ButtonSecondary
              onClick={() => window.dispatchEvent(new CustomEvent('flowdee:open-calendar'))}
              size="l"
              className="px-10"
            >
              <PhoneCall size={16} weight="duotone" aria-hidden="true" />
              {CTA.call}
            </ButtonSecondary>
          </div>
        </div>
      </section>

      {/* FAQ ciblée */}
      <section className="bg-surface-1 border-t border-border-0 py-20 md:py-28" aria-label="Questions fréquentes sur l’audit UX">
        <div className="max-w-[800px] mx-auto px-5 sm:px-8">
          <SectionHeader variant="standard" align="center" title="Questions fréquentes" />
          <Accordion type="multiple" className="w-full space-y-4 mt-10">
            {auditFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`audit-faq-${index}`}
                className="card-surface border-border-0 bg-surface-0 rounded-[24px] px-8"
              >
                <AccordionTrigger className="font-heading text-[15px] text-text-primary hover:no-underline py-6 text-left tracking-[-0.01em]" style={{ fontWeight: 400 }}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent forceMount className="pb-8">
                  <div className="body text-[14px] text-text-secondary whitespace-pre-line border-t border-border-0 pt-6">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Retour — ancre réelle (navigation complète) : React Router ne
          scrolle pas automatiquement vers un hash lors d'un changement de
          route en SPA, un <a> classique déclenche le comportement natif du
          navigateur après le chargement de "/". */}
      <section className="py-16 text-center">
        <a href="/#services" className="font-body text-[13px] text-text-secondary hover:text-accent-primary underline underline-offset-4">
          Voir aussi le Product Sprint et le Fractional Product Designer
        </a>
      </section>
    </>
  );
}

export default AuditUXPage;
