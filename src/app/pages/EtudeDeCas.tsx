import React from 'react';
import { useParams, Link } from 'react-router';
import { ArrowRight } from '@phosphor-icons/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ButtonPrimary } from '../components/Button/Primary';
import { useSeo } from '../hooks/useSeo';
import { getCaseStudyBySlug, ALL_CASE_STUDIES } from '../constants/caseStudies';
import { openAuditLink } from '../constants/links';
import { CTA } from '../constants/offer';

/**
 * Page dédiée d'une étude de cas — même contenu que le volet détail affiché
 * depuis la home (`UseCases.tsx`), mais sur une URL propre et indexable :
 * jusqu'ici ce contenu n'existait que dans un panneau monté au clic, absent
 * du HTML tant qu'on ne l'ouvrait pas.
 */
export function EtudeDeCasPage() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = getCaseStudyBySlug(slug);

  // Trailing slash : forme servie en 200 par Cloudflare Workers Assets
  // (html_handling redirige sinon vers cette URL).
  const canonical = `https://flowdee.fr/etudes-de-cas/${slug ?? ''}/`;
  useSeo({
    title: caseStudy ? `${caseStudy.title} — Étude de cas UX | Flowdee` : 'Étude de cas — Flowdee',
    description: caseStudy
      ? `${caseStudy.problemShort}. ${caseStudy.resultShort}.`
      : 'Étude de cas introuvable.',
    canonical,
  });

  if (!caseStudy) {
    return (
      <section className="py-32 text-center px-6">
        <h1 className="heading-2 text-text-primary mb-4">Étude de cas introuvable</h1>
        <p className="body mb-8">Cette étude de cas n’existe pas ou plus.</p>
        <Link to="/" className="font-body text-[14px] text-accent-primary hover:underline">
          Retour à l’accueil
        </Link>
      </section>
    );
  }

  const others = ALL_CASE_STUDIES.filter((c) => c.slug !== caseStudy.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://flowdee.fr/' },
          { '@type': 'ListItem', position: 2, name: 'Études de cas', item: 'https://flowdee.fr/#case-studies' },
          { '@type': 'ListItem', position: 3, name: caseStudy.title, item: canonical },
        ],
      },
      {
        '@type': 'Article',
        headline: caseStudy.title,
        description: caseStudy.resultShort,
        image: caseStudy.image,
        mainEntityOfPage: canonical,
        about: caseStudy.tag,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Fil d'Ariane */}
      <nav aria-label="Fil d’Ariane" className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 pt-28 md:pt-32">
        <ol className="flex flex-wrap items-center gap-2 font-body text-[12px] text-text-muted">
          <li>
            <Link to="/" className="hover:text-accent-primary transition-colors underline-offset-4 hover:underline">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <a href="/#case-studies" className="hover:text-accent-primary transition-colors underline-offset-4 hover:underline">
              Études de cas
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary" aria-current="page">{caseStudy.title}</li>
        </ol>
      </nav>

      {/* En-tête */}
      <header className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 pt-8 pb-12 md:pb-16">
        <span className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-accent-primary">
          {caseStudy.tag}
        </span>
        <h1 className="heading-display text-text-primary text-pretty mt-4">{caseStudy.title}</h1>
        <p className="font-body text-[13px] text-text-muted uppercase tracking-[0.15em] mt-3">
          {caseStudy.scope} · {caseStudy.duration}
        </p>
        <div className="relative aspect-[16/9] rounded-[20px] overflow-hidden border border-border-0 mt-10">
          <ImageWithFallback src={caseStudy.image} srcWebp={caseStudy.imageWebp} alt={caseStudy.title} className="w-full h-full object-cover" />
        </div>
      </header>

      {/* Défi / Solution */}
      <section className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border-l-2 border-accent-primary pl-6">
          <h2 className="font-heading text-[13px] text-accent-primary uppercase tracking-[0.16em] mb-4" style={{ fontWeight: 500 }}>
            Le défi
          </h2>
          <p className="body-large">{caseStudy.challenge}</p>
        </div>
        <div className="border-l-2 border-border-0 pl-6">
          <h2 className="font-heading text-[13px] text-text-primary uppercase tracking-[0.16em] mb-4" style={{ fontWeight: 500 }}>
            La solution
          </h2>
          <p className="body-large">{caseStudy.solution}</p>
        </div>
      </section>

      {/* Résultats + livrables */}
      <section className="bg-surface-1 border-t border-border-0 py-16 md:py-20">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-heading text-[13px] text-accent-primary uppercase tracking-[0.16em] mb-5" style={{ fontWeight: 500 }}>
              Ce qui a changé
            </h2>
            <ul className="space-y-3">
              {caseStudy.results.map((r) => (
                <li key={r} className="font-body text-[15px] leading-[1.6] text-text-primary flex items-start gap-3">
                  <span className="text-accent-primary font-bold shrink-0">/</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-[13px] text-text-primary uppercase tracking-[0.16em] mb-5" style={{ fontWeight: 500 }}>
              Livrables
            </h2>
            <ul className="grid grid-cols-1 gap-3">
              {caseStudy.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 font-body text-[14px] text-text-secondary">
                  <span className="w-1.5 h-1.5 bg-accent-primary rounded-full shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="font-body text-[11px] text-text-muted uppercase tracking-widest mt-6">
              Stack : {caseStudy.tools.join(' · ')}
            </p>
          </div>
        </div>
      </section>

      {/* Autres études de cas */}
      <section className="py-16 md:py-20 border-t border-border-0">
        <div className="max-w-[1140px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-12">
          <h2 className="heading-3 text-text-primary mb-8">Autres études de cas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/etudes-de-cas/${c.slug}/`}
                className="card-surface bg-surface-0 border-border-0 p-6 flex flex-col gap-2 hover:border-border-1 transition-colors"
              >
                <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-muted">{c.tag}</span>
                <span className="font-heading text-[17px] text-text-primary" style={{ fontWeight: 400 }}>{c.title}</span>
                <span className="font-body text-[13px] text-text-secondary">{c.resultShort}</span>
                <span className="inline-flex items-center gap-1.5 mt-2 font-body text-[13px] font-medium text-accent-primary">
                  Voir l’étude de cas <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center border-t border-border-0">
        <p className="body mb-6">Un parcours qui bloque des conversions comparable au vôtre ?</p>
        <ButtonPrimary onClick={() => openAuditLink()} size="l" className="px-10">
          {CTA.audit}
        </ButtonPrimary>
        <div className="mt-6">
          <Link to="/audit-ux/" className="font-body text-[13px] text-text-secondary hover:text-accent-primary underline underline-offset-4">
            Voir la page complète de l’Audit UX & Conversion
          </Link>
        </div>
      </section>
    </>
  );
}

export default EtudeDeCasPage;
