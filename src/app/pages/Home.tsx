import React from 'react';
import { HeroSection } from '../components/Section/Hero';
import { TrustedClientsSection } from '../components/Section/TrustedClients';
import { ProblemsSection } from '../components/Section/Problems';
import { DeliverablesSection } from '../components/Section/Deliverables';
import { CaseStudiesSection } from '../components/Section/CaseStudies';
import { ServicesSection } from '../components/Section/Services';
import { ApproachSection } from '../components/Section/Approach';
import { FAQSection } from '../components/Section/FAQ';
import { FinalCTASection } from '../components/Section/FinalCTA';
import { ScrollReveal } from '../components/Decor/ScrollReveal';
import { useSeo } from '../hooks/useSeo';

export function HomePage() {
  useSeo({ title: 'Audit UX & Conversion pour sites et SaaS | Flowdee', description: 'Flowdee audite vos parcours, landing pages et produits SaaS pour identifier les frictions UX, prioriser les corrections et améliorer la conversion.', canonical: 'https://flowdee.fr/' });
  return (
    <>
      <HeroSection />
      <ScrollReveal variant="fadeUp" delay={0.1} duration={0.6} threshold="top 92%"><TrustedClientsSection /></ScrollReveal>
      <ScrollReveal variant="stagger" staggerAmount={0.18} threshold="top 85%"><ProblemsSection /></ScrollReveal>
      <DeliverablesSection />
      <ScrollReveal variant="stagger" staggerAmount={0.2} threshold="top 80%"><CaseStudiesSection /></ScrollReveal>
      <ScrollReveal variant="fadeUp" duration={0.8} threshold="top 82%"><ServicesSection /></ScrollReveal>
      <ScrollReveal variant="fadeUp" duration={0.8} threshold="top 82%"><ApproachSection /></ScrollReveal>
      <ScrollReveal variant="fadeUp" delay={0.05} duration={0.7} threshold="top 85%"><FAQSection /></ScrollReveal>
      <ScrollReveal variant="scaleUp" duration={0.9} threshold="top 80%"><FinalCTASection /></ScrollReveal>
    </>
  );
}
export default HomePage;