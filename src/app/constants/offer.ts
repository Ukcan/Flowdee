/**
 * constants/offer — source de vérité de l'offre et des libellés d'action.
 *
 * Le contenu commercial était jusqu'ici recopié dans chaque composant, ce qui
 * a laissé coexister deux prix d'audit (279 € et 890 €), trois délais
 * (72 h–5 j, 3–5 jours, 5 jours) et une dizaine de libellés différents pour
 * trois actions. Tout ce qui décrit l'offre ou déclenche une action se lit
 * désormais ici, et nulle part ailleurs.
 *
 * Règle : une action = un libellé. Si deux boutons mènent au même endroit,
 * ils portent le même texte — sans quoi le visiteur croit avoir le choix
 * entre deux choses différentes.
 */

/* ── Chiffres de l'offre ─────────────────────────────────────────────── */

export const AUDIT_PRICE = '890 €';
export const SPRINT_PRICE = '3 900 €';
export const FRACTIONAL_PRICE = '2 200 €';

/**
 * Un seul délai de livraison sur tout le site. Le délai de démarrage est une
 * information distincte (ci-dessous) : les mélanger laissait entendre que la
 * livraison pouvait intervenir en 24 h.
 */
export const AUDIT_DELIVERY = 'Livraison sous 5 jours ouvrés';
export const AUDIT_DELIVERY_SHORT = 'Sous 5 jours ouvrés';
export const AUDIT_START = 'Démarrage confirmé sous 24 h après réception des éléments nécessaires.';

/* ── Périmètre ───────────────────────────────────────────────────────── */

/**
 * L'audit portait jusqu'ici sur « votre site », sans qualification : à 890 €,
 * la promesse était intenable sur un site de plusieurs dizaines de pages et
 * exposait à une déception à la livraison.
 */
export const AUDIT_SCOPE = 'Un parcours critique, une landing page ou jusqu’à 5 écrans/pages';
export const AUDIT_SCOPE_SHORT = 'Jusqu’à 5 écrans/pages';
export const AUDIT_SCOPE_NOTE =
  'Pour un site plus large, le parcours ayant le plus d’impact est priorisé.';

/* ── Positionnement ──────────────────────────────────────────────────── */

/**
 * Un produit principal, trois contrôles inclus — et non quatre audits
 * complets, que le livrable ne couvre pas.
 */
export const AUDIT_NAME = 'Audit UX & Conversion';
export const AUDIT_DIMENSIONS = 'UX & Conversion · SEO UX · Accessibilité · Microcopy';
export const AUDIT_DIMENSIONS_SENTENCE =
  'Contrôles SEO UX, accessibilité et microcopy inclus.';

/** Liste unique, reprise à l'identique partout où les livrables sont détaillés. */
export const AUDIT_DELIVERABLES = [
  AUDIT_SCOPE,
  'Problèmes UX priorisés',
  'Recommandations actionnables',
  'Contrôles SEO UX',
  'Contrôles d’accessibilité WCAG 2.2 AA sur le périmètre audité',
  'Microcopy prioritaire réécrite',
  '1 écran clé corrigé dans Figma',
  'Rapport final priorisé',
  AUDIT_DELIVERY,
] as const;

/* ── Libellés d'action ───────────────────────────────────────────────── */

/**
 * Une entrée par intention. Les variantes rédactionnelles (« Clarifier mon
 * offre », « Fluidifier le parcours », « Convertir mon trafic »…) menaient
 * toutes au même endroit : trois formulations pour une seule action donnaient
 * l'illusion de trois parcours.
 */
export const CTA = {
  audit: `Commander l’audit — ${AUDIT_PRICE}`,
  call: 'Réserver un appel de 30 min',
  sprint: 'Parler du Product Sprint',
  fractional: 'Parler de l’accompagnement mensuel',
  caseStudy: 'Voir l’étude de cas',
  sampleReport: 'Voir un exemple de rapport',
  auditContents: 'Découvrir ce que contient l’audit',
} as const;

/** Réassurance sous le bouton d'achat. */
export const AUDIT_REASSURANCE = `${AUDIT_DELIVERY} · Paiement sécurisé`;
