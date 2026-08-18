import React from 'react';
import { HeroSection } from '../components/Section/Hero';
import { TrustedClientsSection } from '../components/Section/TrustedClients';
import { ProblemsSection } from '../components/Section/Problems';
import { DeliverablesSection } from '../components/Section/Deliverables';
import { CaseStudiesSection } from '../components/Section/CaseStudies';
import { ServicesSection } from '../components/Section/Services';
import { ApproachSection } from '../components/Section/Approach';
import { AIWorkflowSection } from '../components/Section/AIWorkflow';
import { FAQSection } from '../components/Section/FAQ';
import { FinalCTASection } from '../components/Section/FinalCTA';
import { ScrollReveal } from '../components/Decor/ScrollReveal';
import { useSeo } from '../hooks/useSeo';

/**
 * Page d'accueil. Le contenu (sections + animations ScrollReveal) est
 * inchangé — seul son emplacement change : il vivait directement dans
 * `App.tsx`, qui devient une coquille de routes.
 *
 * Le title/description/canonical posés ici doivent rester identiques à ceux
 * figés dans `index.html` (voir le commentaire là-bas) : cette fonction ne
 * fait que les réappliquer si le visiteur revient sur "/" après avoir
 * navigué côté client vers une autre route.
 */
export function HomePage() {
  useSeo({
    title: 'Audit UX & Conversion pour sites et SaaS | Flowdee',
    description:
      "Flowdee audite vos parcours, landing pages et produits SaaS pour identifier les frictions UX, prioriser les corrections et améliorer la conversion.",
    canonical: 'https://flowdee.fr/',
  });

  return (
    <>
      {/* Hero — pas de ScrollTrigger, entre dès le chargement */}
      <HeroSection />

      {/* Problèmes — stagger sur les cards */}
      <ScrollReveal variant="stagger" staggerAmount={0.18} threshold="top 85%">
        <ProblemsSection />
      </ScrollReveal>

      {/* Livrables — pas de wrapper ScrollReveal ici : GSAP laisse un
          transform residuel sur le wrapper, et un ancetre transforme
          neutralise le position: sticky du rail de gauche. La section
          anime deja ses propres elements (motion whileInView). */}
      <DeliverablesSection />

      {/* Services — fadeUp standard */}
      <ScrollReveal variant="fadeUp" duration={0.8} threshold="top 82%">
        <ServicesSection />
      </ScrollReveal>

      {/* Logos clients + témoignage — déplacés depuis juste après le hero
          (revue Adel × Benji du 2026-08-18) : la preuve sociale n'a de poids
          qu'une fois le problème posé et l'offre comprise, pas avant. Ils
          rejoignent maintenant le bloc de preuve concrète (études de cas). */}
      <ScrollReveal variant="fadeUp" delay={0.1} duration={0.6} threshold="top 92%">
        <TrustedClientsSection />
      </ScrollReveal>

      {/* Case Studies — stagger sur les cards */}
      <ScrollReveal variant="stagger" staggerAmount={0.2} threshold="top 80%">
        <CaseStudiesSection />
      </ScrollReveal>

      {/* Approche — fadeUp : le manifeste s'installe, il ne "pop" pas */}
      <ScrollReveal variant="fadeUp" duration={0.8} threshold="top 82%">
        <ApproachSection />
      </ScrollReveal>

      {/* IA — workflow IA ↔ designer, entre depuis la gauche (sens de lecture du flux) */}
      <ScrollReveal variant="fadeLeft" duration={0.75} threshold="top 82%">
        <AIWorkflowSection />
      </ScrollReveal>

      {/* FAQ — fadeUp, légèrement différé */}
      <ScrollReveal variant="fadeUp" delay={0.05} duration={0.7} threshold="top 85%">
        <FAQSection />
      </ScrollReveal>

      {/* Final CTA — fadeIn + scale, impact maximal */}
      <ScrollReveal variant="scaleUp" duration={0.9} threshold="top 80%">
        <FinalCTASection />
      </ScrollReveal>
    </>
  );
}

export default HomePage;
