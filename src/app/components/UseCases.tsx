import image_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71 from 'figma:asset/14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71.jpg';
import image_5d01d94ee99e37b8c24f102a36d51d884f769ccd from 'figma:asset/5d01d94ee99e37b8c24f102a36d51d884f769ccd.jpg';
import image_527f60f73fe096905f75e234d997f79c2f990c15 from 'figma:asset/527f60f73fe096905f75e234d997f79c2f990c15.jpg';
import neurolaboAnalysesWireframe from '../../assets/neurolabo-analyses-wireframe.jpg';
import neurolaboAnalysesOptimise from '../../assets/neurolabo-analyses-optimise.jpg';
import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowsHorizontal, X } from '@phosphor-icons/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TechnicalLabel } from './TechnicalLabel';
import { ButtonPrimary } from './Button/Primary';
import { ButtonSecondary } from './Button/Secondary';
import { SectionHeader } from './Layout/SectionHeader';
import { CTA } from '../constants/offer';

const featuredCase = {
  tag: 'EdTech SaaS',
  title: 'Simulation & Serious Game Dashboard',
  headerTitle: 'APPRENTISSAGE GAMIFIÉ, CORRECTION AUTOMATISÉE',
  headerSubtitle: 'EdTech SaaS B2B2C',
  imageBefore: image_527f60f73fe096905f75e234d997f79c2f990c15,
  imageAfter: image_5d01d94ee99e37b8c24f102a36d51d884f769ccd,
  problemShort: 'Apprentissage passif & correction manuelle chronophage',
  actionShort: 'Gamification UX + Dashboard Analytics Professeur',
  resultShort: 'Parcours d’apprentissage gamifié et correction automatisée côté professeur',
  scope: 'SaaS / Serious Game',
  duration: '12 semaines',
  /* Ces libellés annonçaient des effets mesurés dont aucune donnée n'existe
     dans le projet. Ils décrivent désormais ce qui a été livré. */
  metrics: [
    { label: 'Simulation gamifiée côté étudiant', positive: true },
    { label: 'Correction automatisée côté professeur', positive: true }
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
    'Parcours étudiant repensé en simulation gamifiée',
    'Correction manuelle remplacée par un dashboard automatisé',
    'Points de blocage rendus visibles par data-visualisation',
    'Design System gamifié livré et documenté'
  ],
  tools: ['Figma', 'Unity WebGL', 'React', 'GPT-4']
};

// Écrans comparables (avant/après). Pour ajouter un slot, ajoute une entrée ici
// avec son wireframe (before) et sa version finale (after).
const compareScreens = [
  {
    label: 'Catalogue',
    sublabel: 'Liste des simulations',
    before: featuredCase.imageBefore,
    after: featuredCase.imageAfter,
  },
  {
    label: 'Analyses',
    sublabel: 'Heatmap & débriefing',
    before: neurolaboAnalysesWireframe,
    after: neurolaboAnalysesOptimise,
  },
];

const otherUseCases = [
  {
    tag: 'Application web SaaS',
    title: 'Parcours d’activation simplifié',
    image: 'https://images.unsplash.com/photo-1646708198974-4c4893e8a2d7?auto=format&fit=crop&q=80&w=1080',
    problemShort: 'Onboarding trop complexe',
    actionShort: 'Parcours raccourci + templates',
    resultShort: 'Parcours d’activation simplifié et points de friction prioritaires corrigés',
    scope: 'Onboarding',
    duration: '6 semaines',
    metrics: [
      { label: 'Parcours recentré sur les étapes essentielles', positive: true },
      { label: 'Templates pré-configurés ajoutés', positive: true }
    ],
    deliverables: [
      { name: 'Audit heuristique' },
      { name: 'Prototype Figma' },
      { name: 'Tests utilisateurs' },
      { name: 'UI specs' }
    ],
    iaNote: 'IA : synthèse de 12 interviews + variantes CTA',
    challenge: 'Les utilisateurs abandonnaient face à un formulaire trop long et complexe.',
    solution: 'Simplification du parcours recentré sur les étapes essentielles et ajout de templates pré-configurés.',
    results: [
      'Formulaire d’inscription réduit aux étapes essentielles',
      'Templates pré-configurés pour démarrer sans configuration',
      'Parcours validé par tests utilisateurs avant développement'
    ],
    tools: ['Figma', 'Notion', 'Hotjar', 'GPT-4']
  },
  {
    tag: 'E-commerce',
    title: 'Optimisation du tunnel d\'achat',
    image: image_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71,
    problemShort: 'Fort taux d’abandon panier sur mobile',
    actionShort: 'Checkout one-page + Apple/Google Pay',
    resultShort: 'Tunnel ramené de 5 pages à un checkout unique, paiements rapides intégrés',
    scope: 'Checkout',
    duration: '8 semaines',
    metrics: [
      { label: 'Checkout ramené à une seule page', positive: true },
      { label: 'Apple Pay et Google Pay intégrés', positive: true }
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
      'Tunnel d’achat ramené de 5 pages à un checkout unique',
      'Champs obligatoires réduits au strict nécessaire',
      'Apple Pay et Google Pay intégrés au parcours mobile'
    ],
    tools: ['Figma', 'Google Analytics', 'Hotjar', 'Claude']
  }
];

/**
 * Comparateur avant/après.
 *
 * Le curseur ne se pilotait qu'au pointeur : aucun élément focusable, aucun
 * rôle, aucune valeur exposée. Au clavier ou au lecteur d'écran, le composant
 * n'existait pas, et les deux images restaient à moitié masquées sans moyen de
 * révéler l'autre.
 *
 * Un `input type="range"` transparent recouvre la zone. Il apporte d'un coup le
 * clavier (flèches, Origine/Fin), le glisser natif au doigt comme à la souris,
 * et la sémantique attendue — plutôt qu'une réimplémentation partielle en
 * `role="slider"`. Le rendu visuel est inchangé : l'ancien survol reste actif.
 */
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const inputId = useId();
  const rounded = Math.round(sliderPos);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(position, 0), 100));
  };

  return (
    <div
      className="relative w-full aspect-[1600/782] cursor-ew-resize overflow-hidden select-none rounded-[16px] border border-border-0 bg-surface-1 shadow-panel"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <ImageWithFallback src={after} alt="Interface après refonte UX — version corrigée" className="w-full h-full object-cover" />
        <div className="absolute bottom-6 right-6 z-20">
          <span className="font-body text-[10px] bg-surface-0/75 backdrop-blur-md text-accent-primary border border-accent-primary/30 font-medium px-4 py-1.5 uppercase tracking-[0.15em] rounded-full">
            Après — optimisé
          </span>
        </div>
      </div>
      <div
        className="absolute inset-0 border-r border-accent-primary z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <ImageWithFallback src={before} alt="Interface avant refonte — version initiale" className="w-full h-full object-cover" />
        <div className="absolute bottom-6 left-6 z-20">
          <span className="font-body text-[10px] bg-surface-0/75 backdrop-blur-md text-text-secondary border border-border-0 font-medium px-4 py-1.5 uppercase tracking-[0.15em] rounded-full">
            Avant — wireframe
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

      {/* Commande réelle : invisible, mais focusable et annoncée.
          `touch-action: pan-y` laisse le doigt faire défiler la page
          verticalement — sans quoi le comparateur capturerait le geste et
          bloquerait la lecture sur mobile. */}
      <label htmlFor={inputId} className="sr-only">
        Comparer l’avant et l’après
      </label>
      <input
        id={inputId}
        type="range"
        min={0}
        max={100}
        step={1}
        value={rounded}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        aria-valuetext={`${rounded}% de la version initiale visible à gauche, le reste montre la version optimisée`}
        className="peer absolute inset-0 z-30 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0 outline-none"
        style={{ touchAction: 'pan-y' }}
      />
      {/* L'anneau de focus se pose sur ce calque : la commande elle-même est
          transparente, elle ne peut pas le porter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-[16px] peer-focus-visible:ring-2 peer-focus-visible:ring-focus-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg-base"
      />
    </div>
  );
}

export function UseCases() {
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [screenIdx, setScreenIdx] = useState(0);
  const screen = compareScreens[screenIdx];
  
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
        /* L'ancre "case-studies" est portée par cette section et non par la
           grille qui suit : c'est ici que commence l'acte "preuve". Posée plus
           bas, elle faisait sauter l'étude de cas phare aux liens du menu, du
           pied de page et du hero, et laissait l'indicateur de défilement
           annoncer encore "Offres & tarifs" sur près de 1900px déjà consacrés
           aux réalisations. */
        id="case-studies"
        /* Rythme le plus large de la page : ouverture de l'acte "preuve",
           la rupture la plus forte du parcours. */
        className="bg-bg-base py-32 md:py-44 border-b border-border-1 overflow-hidden relative"
        aria-labelledby="featured-case-title"
      >
        {/* Header — éditorial, aligné à gauche : la section s'annonce, elle ne se centre pas */}
        <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
          <SectionHeader
            variant="editorial"
            index="01"
            eyebrow="Étude de cas"
            tone="accent"
            titleId="featured-case-title"
            title={featuredCase.headerTitle}
            description={
              <span className="font-body text-[12px] md:text-[13px] font-medium text-text-secondary uppercase tracking-[0.2em]">
                {featuredCase.headerSubtitle}
                <span className="text-text-muted"> · {featuredCase.scope} · {featuredCase.duration}</span>
              </span>
            }
          />
        </div>

        {/* Showcase — le comparateur casse volontairement le container :
            c'est la preuve du travail, elle doit dominer la section. */}
        <div className="max-w-[1560px] mx-auto px-4 sm:px-8 md:px-12 mt-12 md:mt-16 relative z-10">
          {/* Sélecteur d'écrans — barre horizontale compacte, pour libérer toute la largeur au visuel */}
          <div
            className="flex gap-3 overflow-x-auto pb-4 mb-4"
            role="tablist"
            aria-label="Choisir un écran à comparer"
          >
            {compareScreens.map((s, i) => {
              const active = i === screenIdx;
              return (
                <button
                  key={s.label}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setScreenIdx(i)}
                  className={`group flex items-center gap-3 shrink-0 text-left rounded-[14px] border p-2 pr-4 transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base ${active ? 'border-accent-primary bg-accent-bg' : 'border-border-0 bg-surface-0 hover:border-border-1'}`}
                >
                  <span className="block w-14 h-10 rounded-[8px] overflow-hidden border border-border-0 shrink-0">
                    <ImageWithFallback src={s.after} alt="" className="w-full h-full object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-body text-[13px] font-semibold truncate ${active ? 'text-accent-primary' : 'text-text-primary'}`}>{s.label}</span>
                    <span className="block font-body text-[11px] text-text-muted truncate">{s.sublabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <BeforeAfterSlider key={screenIdx} before={screen.before} after={screen.after} />

          <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
            <span className="font-body text-[13px] text-text-secondary inline-flex items-center gap-2">
              <ArrowsHorizontal size={16} weight="bold" className="text-accent-primary" />
              Glissez pour comparer le wireframe et la version optimisée
            </span>
          </div>
        </div>

        {/* Détails — 3 colonnes à plat, séparées par des filets.
            Plus de carte englobante : moins de conteneurs imbriqués, plus de présence. */}
        <div className="max-w-[1320px] mx-auto px-8 md:px-16 mt-20 md:mt-24 relative z-10">
          {/* Les trois colonnes tombaient à 182px de large dès 768px : trois
              colonnes de prose illisibles. Elles n'apparaissent plus qu'à
              partir de 1024px, où chacune dispose d'une mesure tenable. */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-12 items-start">
            {/* Problème */}
            <div className="border-l-2 border-accent-primary pl-6">
              <h3 className="font-heading text-[13px] text-accent-primary uppercase tracking-[0.16em] mb-5" style={{ fontWeight: 500 }}>
                Le problème
              </h3>
              <p className="font-body text-[15px] leading-[1.7] text-text-secondary">
                Apprentissage passif & déconnecté → baisse d'intérêt des élèves. Correction manuelle chronophage pour les professeurs. Besoin d'une solution immersive pour le distanciel.
              </p>
            </div>

            {/* Action */}
            <div className="border-l-2 border-border-0 pl-6">
              <h3 className="font-heading text-[13px] text-text-primary uppercase tracking-[0.16em] mb-5" style={{ fontWeight: 500 }}>
                Notre action
              </h3>
              <ul className="font-body text-[14px] leading-[1.6] text-text-secondary space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mt-2 shrink-0" />
                  Gamification UX : récompenses & progression
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mt-2 shrink-0" />
                  Dashboard Prof : notes & analytics automatisés
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mt-2 shrink-0" />
                  Interface immersive multi-supports (BYOD)
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent-primary rounded-full mt-2 shrink-0" />
                  IA : analyse prédictive des blocages pédagogiques
                </li>
              </ul>
            </div>

            {/* Le bloc affichait « Impact observé » avec « Hausse » et
                « Réduit » en gros corps : la forme d'une métrique, sans la
                métrique. Un chiffre absent mis en scène comme un chiffre
                présent est plus coûteux en crédibilité qu'un simple constat.
                Il énonce désormais ce qui a été livré. */}
            <div className="border-l-2 border-border-0 pl-6">
              <h3 className="font-heading text-[13px] text-accent-primary uppercase tracking-[0.16em] mb-5" style={{ fontWeight: 500 }}>
                Ce qui a changé
              </h3>
              <ul className="space-y-4">
                {featuredCase.metrics.map((m) => (
                  <li key={m.label} className="font-body text-[15px] leading-[1.6] text-text-primary">
                    {m.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-16">
            <ButtonPrimary
              onClick={() => setSelectedCase(featuredCase)}
              size="l"
            >
              {CTA.caseStudy}
            </ButtonPrimary>
          </div>
        </div>
      </section>

      {/* Other Cases Section */}
      <section
        id="case-studies-list"
        className="py-24 md:py-32 bg-bg-base border-b border-border-1 relative overflow-hidden"
        aria-label="Autres réalisations"
      >
        <div className="max-w-[1320px] mx-auto px-8 md:px-16 relative z-10">
          {/* Header compact : ces cas sont subordonnés au cas phare ci-dessus,
              la hiérarchie doit se voir avant même de lire. */}
          <SectionHeader
            variant="inline"
            index="02"
            eyebrow="Autres réalisations"
            title="Résultats observés sur des cas concrets"
            className="mb-4"
          />

          {/* Lignes éditoriales alternées — mouvement vertical plutôt qu'une
              nouvelle grille de cards qui rimerait avec le pricing. */}
          <div>
            {otherUseCases.map((useCase, index) => {
              const kpiHero = useCase.metrics[0]?.label || useCase.title;
              const visualFirst = index % 2 === 1;

              return (
                <motion.article
                  key={useCase.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center py-14 md:py-20 border-t border-border-0"
                >
                  {/* Texte — reste premier dans le DOM, l'ordre visuel alterne via `order` */}
                  <div className={visualFirst ? 'md:order-2' : ''}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-[13px] tabular-nums tracking-[0.16em] text-accent-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {useCase.tag}
                      </span>
                    </div>

                    <h3 className="font-display text-[30px] md:text-[36px] lg:text-[40px] text-accent-primary leading-[1.1] tracking-[-0.02em] mt-5 text-balance" style={{ fontWeight: 300 }}>
                      {kpiHero}
                    </h3>

                    <p className="font-body text-[11px] text-text-muted uppercase tracking-widest mt-3">
                      {useCase.title}
                    </p>

                    {/* Problème / Action — filet plutôt que cartouche : moins de conteneurs */}
                    <dl className="mt-7 space-y-3 border-l border-border-0 pl-5">
                      <div>
                        <dt className="font-body text-[10px] uppercase tracking-[0.16em] text-accent-primary font-medium">Problème</dt>
                        <dd className="font-body text-[14px] leading-[1.6] text-text-secondary mt-1">{useCase.problemShort}</dd>
                      </div>
                      <div>
                        <dt className="font-body text-[10px] uppercase tracking-[0.16em] text-accent-primary font-medium">Action</dt>
                        <dd className="font-body text-[14px] leading-[1.6] text-text-secondary mt-1">{useCase.actionShort}</dd>
                      </div>
                    </dl>

                    <div className="flex flex-wrap gap-2 mt-6">
                      {useCase.metrics.map((metric, idx) => (
                        <span
                          key={idx}
                          className="
                            inline-flex items-center gap-1.5
                            font-body text-[10px] font-medium text-text-secondary
                            bg-transparent border border-border-0
                            px-3 py-1 rounded-full tracking-[0.06em]
                          "
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0" />
                          {metric.label}
                        </span>
                      ))}
                    </div>

                    {/* Ligne de synthèse — pleine opacité : à 10px, le modificateur
                        /60 tombait sous le seuil WCAG AA de 4.5:1. */}
                    <p className="font-body text-[11px] text-text-muted tracking-wide mt-5">
                      {useCase.resultShort}
                    </p>

                    <button
                      onClick={() => setSelectedCase(useCase)}
                      className="
                        inline-flex items-center gap-2 mt-4
                        font-body text-[13px] font-medium uppercase tracking-widest
                        text-accent-primary hover:underline transition-all
                        outline-none focus-visible:ring-2 focus-visible:ring-accent-ring
                        focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
                        rounded-sm min-h-[44px]
                      "
                    >
                      Détails du cas →
                    </button>
                  </div>

                  {/* Visuel */}
                  <div className={visualFirst ? 'md:order-1' : ''}>
                    <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-border-0 bg-surface-0">
                      <ImageWithFallback
                        src={useCase.image}
                        alt={useCase.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                </motion.article>
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
            <ButtonPrimary onClick={scrollToContact} size="l" className="px-12">{CTA.call}</ButtonPrimary>
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
                    <span className="font-body text-[10px] bg-surface-0/75 backdrop-blur-md text-accent-primary border border-accent-primary/30 font-medium px-4 py-1 mb-4 uppercase tracking-[0.15em] inline-block rounded-full">
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
                      <h3 className="font-heading text-[24px] text-accent-primary flex items-center gap-4 tracking-[-0.01em]" style={{ fontWeight: 700 }}>
                        <span className="w-10 h-10 border-2 border-accent-primary text-accent-primary rounded-full flex items-center justify-center text-[15px] leading-none shrink-0" style={{ fontWeight: 600 }}>01</span>
                        LE DÉFI
                      </h3>
                      <p className="body-large">
                        {selectedCase.challenge || selectedCase.problemShort}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="font-heading text-[24px] text-text-primary flex items-center gap-4 tracking-[-0.01em]" style={{ fontWeight: 700 }}>
                        <span className="w-10 h-10 border-2 border-text-primary text-text-primary rounded-full flex items-center justify-center text-[15px] leading-none shrink-0" style={{ fontWeight: 600 }}>02</span>
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
                            <span className="font-display text-[26px] text-accent-primary leading-tight" style={{ fontWeight: 600 }}>{m.label}</span>
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
                            <span key={tool} className="px-3 py-1 bg-transparent border border-border-0 text-text-secondary font-medium uppercase text-[10px] tracking-[0.12em] rounded-full">
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