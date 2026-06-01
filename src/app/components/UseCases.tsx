import image_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71 from 'figma:asset/14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71.jpg';
import image_5d01d94ee99e37b8c24f102a36d51d884f769ccd from 'figma:asset/5d01d94ee99e37b8c24f102a36d51d884f769ccd.jpg';
import image_527f60f73fe096905f75e234d997f79c2f990c15 from 'figma:asset/527f60f73fe096905f75e234d997f79c2f990c15.jpg';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, BarChart3, Target, CheckCircle2, Zap, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CTA_PRIMARY } from '../constants/ctaCopy';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';

const featuredCase = {
  tag: 'EdTech SaaS',
  title: 'Simulation & Serious Game Dashboard',
  headerTitle: '+65% ENGAGEMENT ÉTUDIANT',
  headerSubtitle: 'EdTech SaaS B2B2C',
  imageBefore: image_527f60f73fe096905f75e234d997f79c2f990c15,
  imageAfter: image_5d01d94ee99e37b8c24f102a36d51d884f769ccd,
  problemShort: 'Apprentissage passif & correction manuelle chronophage',
  actionShort: 'Gamification UX + Dashboard Analytics Professeur',
  resultShort: '+65% engagement, -3h/semaine correction',
  scope: 'SaaS / Serious Game',
  duration: '12 semaines',
  metrics: [
    { label: '+65% engagement', positive: true },
    { label: '-3h/sem correction', positive: true }
  ],
  deliverables: [
    'User Flow Étudiant vs Prof',
    'Interface Serious Game',
    'Dashboard Analytics',
    'Design System Gamifié'
  ],
  iaNote: 'IA : analyse prédictive des lacunes élèves pour les professeurs',
  detailedDescription: 'Développement d\'un serious game immersif pour lycéens et étudiants, permettant l\'entraînement et l\'évaluation à distance via une simulation gamifiée.',
  challenge: 'Transformer un contenu pédagogique dense en expérience engageante, tout en fournissant aux professeurs un outil de suivi précis et automatisé.',
  solution: 'Interface de simulation immersive accessible sur desktop/tablette, couplée à un dashboard professeur automatisant les corrections et soulignant les points de blocage via data-viz.',
  results: [
    'Engagement étudiant augmenté de 65%',
    'Gain de temps de correction : 3h/semaine par professeur',
    'Taux de complétion des modules passé de 40% à 92%',
    'Score moyen aux évaluations +24%'
  ],
  tools: ['Figma', 'Unity WebGL', 'React', 'GPT-4']
};

const otherUseCases = [
  {
    tag: 'Application web SaaS',
    title: 'Réduction de 40% du temps d\'activation',
    image: 'https://images.unsplash.com/photo-1646708198974-4c4893e8a2d7?auto=format&fit=crop&q=80&w=1080',
    problemShort: 'Onboarding complexe (8 étapes)',
    actionShort: 'Simplification à 3 étapes + templates',
    resultShort: '+40% activation, -25% drop-off',
    scope: 'Onboarding',
    duration: '6 semaines',
    metrics: [
      { label: '+40% activation', positive: true },
      { label: '-25% drop-off', positive: true }
    ],
    deliverables: [
      { name: 'Audit heuristique' },
      { name: 'Prototype Figma' },
      { name: 'Tests utilisateurs' },
      { name: 'UI specs' }
    ],
    iaNote: 'IA : synthèse de 12 interviews + variantes CTA',
    challenge: 'Les utilisateurs abandonnaient face à un formulaire complexe de 8 étapes.',
    solution: 'Simplification du parcours à 3 étapes essentielles et ajout de templates pré-configurés.',
    results: [
      'Temps d\'activation réduit de 12 à 7 minutes',
      'Taux de complétion passé de 45% à 85%',
      '40% d\'augmentation des comptes actifs'
    ],
    tools: ['Figma', 'Notion', 'Hotjar', 'GPT-4']
  },
  {
    tag: 'E-commerce',
    title: 'Optimisation du tunnel d\'achat',
    image: image_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71,
    problemShort: '68% abandon panier mobile',
    actionShort: 'Checkout one-page + Apple/Google Pay',
    resultShort: '+32% conversion, -18% abandon',
    scope: 'Checkout',
    duration: '8 semaines',
    metrics: [
      { label: '+32% conversion', positive: true },
      { label: '-18% abandon panier', positive: true }
    ],
    deliverables: [
      { name: 'User flow mapping' },
      { name: 'A/B testing protocol' },
      { name: 'Checkout redesign' },
      { name: 'Mobile optimization' }
    ],
    iaNote: 'IA : analyse 500+ sessions + états d\'erreur',
    challenge: 'Le tunnel d\'achat comportait 5 pages avec de nombreux champs obligatoires.',
    solution: 'Refonte complète en checkout one-page et intégration de méthodes de paiement rapides.',
    results: [
      'Conversion mobile passée de 1.8% à 2.4%',
      'Abandon panier réduit de 68% à 50%',
      '+470K€ de revenus mensuels additionnels'
    ],
    tools: ['Figma', 'Google Analytics', 'Hotjar', 'Claude']
  }
];

function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div 
      className="relative w-full h-[400px] lg:h-[600px] cursor-ew-resize overflow-hidden select-none rounded-[16px] border border-border-0 bg-surface-1 shadow-panel"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <ImageWithFallback src={after} alt="After" className="w-full h-full object-cover" />
        <div className="absolute bottom-6 right-6 z-20">
          <span className="font-body text-[11px] bg-accent-primary text-on-accent font-medium px-6 py-2 uppercase tracking-widest rounded-full shadow-panel" style={{ fontWeight: 500 }}>
            OPTIMISÉ
          </span>
        </div>
      </div>
      <div 
        className="absolute inset-0 border-r border-accent-primary z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <ImageWithFallback src={before} alt="Wireframe" className="w-full h-full object-cover" />
        <div className="absolute bottom-6 left-6 z-20">
          <span className="font-body text-[11px] bg-surface-0 text-text-primary border border-border-0 font-bold px-6 py-2 uppercase tracking-widest rounded-full">
            WIREFRAME
          </span>
        </div>
      </div>
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-accent-primary z-20 pointer-events-none flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 bg-surface-0 shadow-panel rounded-full flex items-center justify-center gap-1 border border-accent-primary">
          <div className="w-[1px] h-4 bg-accent-primary" />
          <div className="w-[1px] h-4 bg-accent-primary" />
        </div>
      </div>
    </div>
  );
}

export function UseCases() {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Featured Case Study Section */}
      <section 
        className="bg-bg-base py-24 md:py-32 border-b border-border-0 overflow-hidden relative"
        aria-label="Featured Case Study"
      >
        <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center mb-20 text-center">
            {/* <TechnicalLabel sectionId="CASE_STUDY_FEATURED" /> */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-display text-accent-primary mt-4"
            >
              {featuredCase.headerTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-body text-[13px] md:text-[16px] font-medium text-text-secondary uppercase tracking-[0.2em] mt-4"
            >
              {featuredCase.headerSubtitle}
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-16 w-full">
            {/* Colonne LEFT */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <BeforeAfterSlider before={featuredCase.imageBefore} after={featuredCase.imageAfter} />
            </div>

            {/* Colonne RIGHT */}
            <div className="w-full lg:w-1/2 flex flex-col gap-[47.99px]">
              {/* Section Problème */}
              <div className="border-l-2 border-accent-primary pl-8 relative">
                <h3 className="font-heading text-[18px] text-accent-primary tracking-[-0.01em] mb-4" style={{ fontWeight: 500 }}>
                  LE PROBLÈME
                </h3>
                <p className="font-body text-[16px] leading-[1.7] text-text-secondary">
                  Apprentissage passif & déconnecté → baisse d'intérêt des élèves. Correction manuelle chronophage pour les professeurs. Besoin d'une solution immersive pour le distanciel.
                </p>
              </div>

              {/* Section Action */}
              <div className="border-l-2 border-border-1 pl-8 relative">
                <h3 className="font-heading text-[18px] text-text-primary tracking-[-0.01em] mb-4" style={{ fontWeight: 500 }}>
                  NOTRE ACTION
                </h3>
                <ul className="font-body text-[15px] leading-[1.7] text-text-secondary space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent-primary rounded-full" />
                    Gamification UX : systèmes de récompenses & progression
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent-primary rounded-full" />
                    Dashboard Prof : automatisation des notes & analytics
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent-primary rounded-full" />
                    Interface immersive adaptée aux supports digitaux (BYOD)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent-primary rounded-full" />
                    IA : Analyse prédictive des points de blocage pédagogiques
                  </li>
                </ul>
              </div>

              {/* Section Résultats */}
              <div>
                <h3 className="font-heading text-[18px] text-accent-primary tracking-[-0.01em] mb-6" style={{ fontWeight: 500 }}>
                  LOGS_RÉSULTATS
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-8 bg-surface-0 border border-border-0 flex flex-col items-center justify-center rounded-[24px]">
                    <span className="font-display text-[42px] text-accent-primary leading-none tracking-wide" style={{ fontWeight: 300 }}>+65%</span>
                    <span className="font-body text-[10px] font-medium uppercase tracking-widest text-text-muted mt-2">ENGAGEMENT</span>
                  </div>
                  <div className="p-8 bg-surface-0 border border-border-0 flex flex-col items-center justify-center rounded-[24px]">
                    <span className="font-display text-[42px] text-accent-primary leading-none tracking-wide" style={{ fontWeight: 300 }}>-3H</span>
                    <span className="font-body text-[10px] font-medium uppercase tracking-widest text-text-muted mt-2">CORRECTION / SEM</span>
                  </div>
                </div>
              </div>

              {/* Bouton Case Study */}
              <ButtonPrimary 
                onClick={() => setSelectedCase(featuredCase)}
                size="l"
                className="w-full mt-4"
              >
                Voir l'étude de cas complète →
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </section>

      {/* Other Cases Section */}
      <section
        id="case-studies"
        className="py-24 md:py-32 bg-surface-1 border-b border-border-0 relative overflow-hidden"
        aria-label="Other client cases"
      >
        <div className="max-w-[1184px] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex flex-col mb-16">
            {/* <TechnicalLabel sectionId="PORTFOLIO_MODULE" /> */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="heading-1 text-text-primary mt-4"
            >
              Autres réalisations & Impact
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherUseCases.map((useCase, index) => {
              const kpiHero = useCase.metrics[0]?.label || useCase.title;

              return (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-surface p-0 flex flex-col overflow-hidden bg-surface-0"
                >
                  {/* Image + discreet tag */}
                  <div className="relative h-64 overflow-hidden border-b border-border-0">
                    <ImageWithFallback src={useCase.image} alt={useCase.title} className="w-full h-full object-cover object-top" />
                    <div className="absolute top-4 left-4">
                      <span className="
                        font-body text-[9px] uppercase tracking-widest 
                        bg-surface-0/60 backdrop-blur-sm text-text-secondary 
                        px-3 py-1 font-medium rounded-full border border-white/10
                      ">
                        {useCase.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    {/* Slot 1: KPI Hero (dominant) */}
                    <div className="min-h-[48px] flex items-start">
                      <h3 className="font-display text-[28px] md:text-[32px] text-accent-primary leading-tight tracking-[-0.01em]" style={{ fontWeight: 300 }}>
                        {kpiHero}
                      </h3>
                    </div>

                    {/* Slot 2: Original title (demoted — zero deletion) */}
                    <p className="font-body text-[11px] text-text-muted uppercase tracking-widest mt-2">
                      {useCase.title}
                    </p>

                    {/* Slot 3: Context line */}
                    <p className="font-body text-[13px] text-text-secondary mt-1">
                      {useCase.problemShort}
                    </p>

                    {/* Slot 4: Cartouche PROBLÈME / ACTION */}
                    <div className="min-h-[96px] mt-6">
                      <div className="space-y-2 p-5 bg-bg-base border border-border-0 rounded-[16px]">
                        <p className="font-body text-[12px]">
                          <span className="text-accent-primary uppercase font-medium mr-2">PROBLÈME:</span>
                          <span className="text-text-secondary">{useCase.problemShort}</span>
                        </p>
                        <p className="font-body text-[12px]">
                          <span className="text-accent-primary uppercase font-medium mr-2">ACTION:</span>
                          <span className="text-text-secondary">{useCase.actionShort}</span>
                        </p>
                      </div>
                    </div>

                    {/* Slot 5: Impact chips */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {useCase.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="
                            font-body text-[11px] font-medium text-accent-primary 
                            bg-accent-tint border border-accent-primary/15 
                            px-3 py-1.5 rounded-full tracking-wide
                          "
                        >
                          {metric.label}
                        </span>
                      ))}
                    </div>

                    {/* Spacer to push bottom elements down */}
                    <div className="flex-1" />

                    {/* Slot 6: Legacy result line (demoted to caption — zero deletion) */}
                    <div className="min-h-[20px] flex items-center mt-6">
                      <span className="font-body text-[10px] text-text-muted/50 tracking-wide">
                        {useCase.resultShort}
                      </span>
                    </div>

                    {/* Slot 7: Details link (accessible, blue) */}
                    <div className="min-h-[44px] flex items-center mt-3">
                      <button
                        onClick={() => setSelectedCase(useCase)}
                        className="
                          flex items-center gap-2 
                          font-body text-[13px] font-medium uppercase tracking-widest 
                          text-accent-primary hover:underline transition-all 
                          focus:outline-2 focus:outline-accent-primary focus:outline-offset-2 
                          rounded-sm min-h-[44px]
                        "
                      >
                        DÉTAILS DU CAS →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-16"
          >
            <ButtonPrimary onClick={scrollToContact} size="l" className="px-12">Réserver un appel (30 min)</ButtonPrimary>
          </motion.div>
        </div>
      </section>

      {/* Side Panel for Details */}
      <AnimatePresence>
        {selectedCase && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCase(null)} className="fixed inset-0 bg-bg-depth/60 z-[100] backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed right-0 top-0 h-full w-full md:w-[850px] lg:w-[1000px] bg-surface-0 z-[101] overflow-y-auto pb-24 shadow-panel">
              {/* Close Button */}
              <div className="sticky top-0 right-0 p-6 flex justify-between items-center bg-surface-0/90 backdrop-blur-md z-[102] border-b border-border-0">
                <div className="font-body text-[11px] font-bold text-accent-primary tracking-[0.2em]">
                  PROJECT VIEWER
                </div>
                <button onClick={() => setSelectedCase(null)} className="w-[44px] h-[44px] flex items-center justify-center bg-surface-1 border border-border-0 rounded-xl text-text-primary hover:bg-state-hover-bg transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="p-0 relative">
                {/* Image Header */}
                <div className="relative h-64 md:h-80 overflow-hidden border-b border-border-0">
                  <ImageWithFallback 
                    src={selectedCase.imageAfter || selectedCase.image} 
                    alt={selectedCase.title} 
                    className="w-full h-full object-cover object-top" 
                  />
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 bg-surface-0/80 backdrop-blur-md border-t border-border-0">
                    <span className="font-body text-[10px] bg-accent-primary text-on-accent font-medium px-4 py-1 mb-4 uppercase tracking-[0.2em] inline-block rounded-full" style={{ fontWeight: 500 }}>
                      {selectedCase.tag}
                    </span>
                    <h2 className="heading-1 text-text-primary">
                      {selectedCase.title}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-0">
                  <div className="col-span-12 md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border-0 space-y-12">
                    <div className="space-y-6">
                      <h3 className="font-heading text-[24px] text-accent-primary flex items-center gap-4 tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                        <span className="w-10 h-10 border-2 border-accent-primary text-accent-primary rounded-full flex items-center justify-center" style={{ fontWeight: 300 }}>01</span>
                        LE DÉFI
                      </h3>
                      <p className="body-large">
                        {selectedCase.challenge || selectedCase.problemShort}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-heading text-[24px] text-text-primary flex items-center gap-4 tracking-[-0.01em]" style={{ fontWeight: 500 }}>
                        <span className="w-10 h-10 border-2 border-text-primary text-text-primary rounded-full flex items-center justify-center" style={{ fontWeight: 300 }}>02</span>
                        LA SOLUTION
                      </h3>
                      <p className="body-large">
                        {selectedCase.solution || selectedCase.actionShort}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-5 p-8 md:p-12 space-y-12 bg-surface-1 relative">
                    <div className="space-y-6">
                      <h3 className="font-body text-[14px] font-bold text-text-primary uppercase tracking-[0.2em] border-b border-border-0 pb-2">MÉTRIQUES CLÉS</h3>
                      <div className="grid grid-cols-1 gap-6">
                        {selectedCase.metrics.map((m: any, i: number) => (
                          <div key={i} className="flex flex-col border-l-4 border-accent-primary pl-4">
                            <span className="font-display text-4xl text-accent-primary leading-none" style={{ fontWeight: 300 }}>{m.label}</span>
                            <span className="font-body text-[10px] font-bold text-text-muted uppercase tracking-widest mt-2">IMPACT LOG</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedCase.deliverables && (
                      <div className="space-y-6">
                        <h3 className="font-body text-[14px] font-bold text-text-primary uppercase tracking-[0.2em] border-b border-border-0 pb-2">LIVRABLES</h3>
                        <ul className="grid grid-cols-1 gap-3">
                          {selectedCase.deliverables.map((item: any, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
                              <span className="w-2 h-2 bg-accent-primary rounded-full" />
                              {item.name || item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-span-12 p-8 md:p-12 border-y border-border-0 bg-surface-1 relative">
                  <h3 className="font-heading text-[28px] text-text-primary mb-8 tracking-[-0.01em]" style={{ fontWeight: 400 }}>Résultats détaillés</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCase.results?.map((r: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 p-6 bg-surface-0 border border-border-0 rounded-xl shadow-panel">
                        <span className="text-accent-primary font-bold text-lg leading-none mt-1">/</span>
                        <span className="text-text-secondary text-[14px] font-semibold uppercase leading-relaxed">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 p-8 md:p-12 space-y-12">
                  <div className="flex flex-wrap gap-12">
                    {selectedCase.tools && (
                      <div className="space-y-4 flex-1">
                        <span className="font-body text-[11px] font-bold text-text-muted uppercase tracking-[0.2em]">Stack technique</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedCase.tools.map((tool: string) => (
                            <span key={tool} className="px-3 py-1 bg-accent-bg text-accent-primary font-bold uppercase text-[10px] tracking-widest rounded-md">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedCase.iaNote && (
                      <div className="space-y-4 flex-[2] min-w-[300px]">
                        <span className="font-body text-[11px] font-bold text-accent-primary uppercase tracking-[0.2em]">Optimisation IA</span>
                        <p className="font-body text-lg font-semibold text-text-primary bg-accent-bg p-6 border-l-4 border-accent-primary rounded-r-xl">
                          "{selectedCase.iaNote}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-8">
                    <ButtonPrimary 
                      onClick={scrollToContact} 
                      size="l"
                      className="w-full flex items-center justify-center gap-3"
                    >
                      <span>Discuter de ce projet</span>
                      <ArrowRight size={18} />
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}