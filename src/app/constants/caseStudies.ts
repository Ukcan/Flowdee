/**
 * constants/caseStudies — source de vérité des études de cas.
 *
 * Reprises telles quelles depuis `UseCases.tsx` (panneau détail de la home) :
 * ce fichier existe pour que la home et les pages dédiées `/etudes-de-cas/:slug`
 * affichent exactement le même contenu, sans données dupliquées qui divergent.
 * Aucune métrique, client ou résultat n'est inventé ici — uniquement ce qui
 * était déjà publié.
 */

import image_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71 from 'figma:asset/14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71.jpg';
import image_5d01d94ee99e37b8c24f102a36d51d884f769ccd from 'figma:asset/5d01d94ee99e37b8c24f102a36d51d884f769ccd.jpg';
import image_527f60f73fe096905f75e234d997f79c2f990c15 from 'figma:asset/527f60f73fe096905f75e234d997f79c2f990c15.jpg';
// Variantes WebP (F-18) — générées par scripts/generate-webp.mjs, servies via
// <picture> par ImageWithFallback ; le JPEG ci-dessus reste le repli natif.
import webp_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71 from 'figma:asset/14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71.webp';
import webp_5d01d94ee99e37b8c24f102a36d51d884f769ccd from 'figma:asset/5d01d94ee99e37b8c24f102a36d51d884f769ccd.webp';
import webp_527f60f73fe096905f75e234d997f79c2f990c15 from 'figma:asset/527f60f73fe096905f75e234d997f79c2f990c15.webp';

export interface CaseStudyMetric {
  label: string;
  positive: boolean;
}

export interface CaseStudy {
  slug: string;
  tag: string;
  title: string;
  image: string;
  /** Variante WebP de `image`, quand elle existe (voir ImageWithFallback). */
  imageWebp?: string;
  problemShort: string;
  actionShort: string;
  resultShort: string;
  scope: string;
  duration: string;
  metrics: CaseStudyMetric[];
  deliverables: string[];
  iaNote: string;
  challenge: string;
  solution: string;
  results: string[];
  tools: string[];
  headerTitle?: string;
  headerSubtitle?: string;
}

export const FEATURED_CASE: CaseStudy = {
  slug: 'application-edtech-ux',
  tag: 'EdTech SaaS',
  title: 'Simulation & Serious Game Dashboard',
  headerTitle: 'APPRENTISSAGE GAMIFIÉ, CORRECTION AUTOMATISÉE',
  headerSubtitle: 'EdTech SaaS B2B2C',
  image: image_5d01d94ee99e37b8c24f102a36d51d884f769ccd,
  imageWebp: webp_5d01d94ee99e37b8c24f102a36d51d884f769ccd,
  problemShort: 'Apprentissage passif & correction manuelle chronophage',
  actionShort: 'Gamification UX + Dashboard Analytics Professeur',
  resultShort: 'Parcours d’apprentissage gamifié et correction automatisée côté professeur',
  scope: 'SaaS / Serious Game',
  duration: '12 semaines',
  metrics: [
    { label: 'Simulation gamifiée côté étudiant', positive: true },
    { label: 'Correction automatisée côté professeur', positive: true },
  ],
  deliverables: [
    'User Flow Étudiant vs Prof',
    'Interface Serious Game',
    'Dashboard Analytics',
    'Design System Gamifié',
  ],
  iaNote: 'IA : analyse prédictive des lacunes élèves pour les professeurs',
  challenge: 'Transformer un contenu pédagogique dense en expérience engageante, tout en fournissant aux professeurs un outil de suivi précis et automatisé.',
  solution: 'Interface de simulation immersive accessible sur desktop/tablette, couplée à un dashboard professeur automatisant les corrections et soulignant les points de blocage via data-viz.',
  results: [
    'Parcours étudiant repensé en simulation gamifiée',
    'Correction manuelle remplacée par un dashboard automatisé',
    'Points de blocage rendus visibles par data-visualisation',
    'Design System gamifié livré et documenté',
  ],
  tools: ['Figma', 'Unity WebGL', 'React', 'GPT-4'],
};

/** Avant/après réutilisés par le comparateur de la home. */
export const FEATURED_CASE_COMPARE_IMAGES = {
  before: image_527f60f73fe096905f75e234d997f79c2f990c15,
  beforeWebp: webp_527f60f73fe096905f75e234d997f79c2f990c15,
  after: image_5d01d94ee99e37b8c24f102a36d51d884f769ccd,
  afterWebp: webp_5d01d94ee99e37b8c24f102a36d51d884f769ccd,
};

export const OTHER_CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'optimisation-onboarding-saas',
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
      { label: 'Templates pré-configurés ajoutés', positive: true },
    ],
    deliverables: ['Audit heuristique', 'Prototype Figma', 'Tests utilisateurs', 'UI specs'],
    iaNote: 'IA : synthèse de 12 interviews + variantes CTA',
    challenge: 'Les utilisateurs abandonnaient face à un formulaire trop long et complexe.',
    solution: 'Simplification du parcours recentré sur les étapes essentielles et ajout de templates pré-configurés.',
    results: [
      'Formulaire d’inscription réduit aux étapes essentielles',
      'Templates pré-configurés pour démarrer sans configuration',
      'Parcours validé par tests utilisateurs avant développement',
    ],
    tools: ['Figma', 'Notion', 'Hotjar', 'GPT-4'],
  },
  {
    slug: 'optimisation-checkout-ecommerce',
    tag: 'E-commerce',
    title: 'Optimisation du tunnel d’achat',
    image: image_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71,
    imageWebp: webp_14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71,
    problemShort: 'Fort taux d’abandon panier sur mobile',
    actionShort: 'Checkout one-page + Apple/Google Pay',
    resultShort: 'Tunnel ramené de 5 pages à un checkout unique, paiements rapides intégrés',
    scope: 'Checkout',
    duration: '8 semaines',
    metrics: [
      { label: 'Checkout ramené à une seule page', positive: true },
      { label: 'Apple Pay et Google Pay intégrés', positive: true },
    ],
    deliverables: ['User flow mapping', 'A/B testing protocol', 'Checkout redesign', 'Mobile optimization'],
    iaNote: 'IA : analyse 500+ sessions + états d’erreur',
    challenge: 'Le tunnel d’achat comportait 5 pages avec de nombreux champs obligatoires.',
    solution: 'Refonte complète en checkout one-page et intégration de méthodes de paiement rapides.',
    results: [
      'Tunnel d’achat ramené de 5 pages à un checkout unique',
      'Champs obligatoires réduits au strict nécessaire',
      'Apple Pay et Google Pay intégrés au parcours mobile',
    ],
    tools: ['Figma', 'Google Analytics', 'Hotjar', 'Claude'],
  },
];

export const ALL_CASE_STUDIES: CaseStudy[] = [FEATURED_CASE, ...OTHER_CASE_STUDIES];

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined;
  return ALL_CASE_STUDIES.find((c) => c.slug === slug);
}
