import React from 'react';
import { HeroSection } from '../components/Section/Hero';
import { AIWorkflowSection } from '../components/Section/AIWorkflow';
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

      {/* IA — position 2, juste après la promesse du hero. Décision de la revue
          Adel × Benji du 2026-08-18 (F-11 du diagnostic) : le vrai
          différenciateur (IA + expertise humaine, livrable repris par une équipe
          dev ou un assistant de code) était en position 8/10, après la section
          « Signaux » que n'importe quel concurrent pourrait écrire.

          ⚠️ Cette section a déjà été retirée une fois de la page par mégarde
          (commit 040d09c, 19/08) : elle est restée orpheline — fichier présent,
          montée nulle part — jusqu'à ce que Benji le repère. Ne pas la déplacer
          ni la retirer sans un arbitrage explicite de sa part. */}
      <ScrollReveal variant="fadeLeft" duration={0.75} threshold="top 90%"><AIWorkflowSection /></ScrollReveal>

      <ScrollReveal variant="stagger" staggerAmount={0.18} threshold="top 85%"><ProblemsSection /></ScrollReveal>

      {/* Livrables — SANS wrapper ScrollReveal, et ce n'est pas un oubli.
          La colonne de gauche de cette section est en `position: sticky`
          (Layout/StickySplit). Or un élément sticky se cale sur son premier
          ancêtre porteur d'un `transform`, et sur la fenêtre seulement à
          défaut : il suffit qu'un parent en ait un — fût-il l'identité — pour
          que le rail décroche.

          ScrollReveal anime en GSAP (`gsap.from(ref, { x: 0, y: 0, scale: 1 })`,
          hooks/useScrollReveal.ts) et le hook n'appelle jamais `clearProps` :
          le `transform` inline reste posé sur le wrapper une fois l'animation
          terminée. L'envelopper casserait donc le rail — sans erreur, sans
          avertissement, sans rien en console.

          La section anime déjà ses propres éléments (motion whileInView), elle
          n'a besoin de personne au-dessus. */}
      <DeliverablesSection />

      {/* Logos clients + témoignage — placés juste avant les études de cas,
          et non après le hero. Décision de la revue Adel × Benji du 18/08,
          réaffirmée par Benji le 20/08 : la preuve sociale n'a de poids
          qu'une fois le problème posé et l'offre comprise, pas avant. Ici
          elle ouvre le bloc de preuve concrète au lieu de flotter seule.

          ⚠️ Ce déplacement ne vient PAS du diagnostic externe d'Adel — vérifié,
          aucun de ses 20 constats ne porte sur la position de ce bandeau (F-12
          traite son intitulé, F-07 son témoignage). C'est un arbitrage de
          Benji, à ne pas défaire au motif qu'on ne le retrouve pas dans le
          document. */}
      <ScrollReveal variant="fadeUp" delay={0.1} duration={0.6} threshold="top 92%"><TrustedClientsSection /></ScrollReveal>

      <ScrollReveal variant="stagger" staggerAmount={0.2} threshold="top 80%"><CaseStudiesSection /></ScrollReveal>
      {/* Approche AVANT les offres, et non après. L'offre est la demande ;
          tout ce qui la précède doit construire le dossier. Réalisations =
          la preuve, Approche = comment je travaille, Offres = combien. Poser
          le prix avant la méthode revient à demander de l'argent avant d'avoir
          expliqué le travail (décision Benji, 2026-08-20).

          Va dans le sens du compte rendu de la réunion Adel × Benji, [10:58] :
          « tu demandes déjà un engagement alors que t'as pas fini de
          convaincre ». Le tarif reste accessible tôt par le hero, dont le
          diagnostic dit que la place est juste. */}
      <ScrollReveal variant="fadeUp" duration={0.8} threshold="top 82%"><ApproachSection /></ScrollReveal>
      <ScrollReveal variant="fadeUp" duration={0.8} threshold="top 82%"><ServicesSection /></ScrollReveal>
      <ScrollReveal variant="fadeUp" delay={0.05} duration={0.7} threshold="top 85%"><FAQSection /></ScrollReveal>
      <ScrollReveal variant="scaleUp" duration={0.9} threshold="top 80%"><FinalCTASection /></ScrollReveal>
    </>
  );
}
export default HomePage;
