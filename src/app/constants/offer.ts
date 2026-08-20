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

/**
 * Eyebrow du hero — remplace l'ancienne liste de compétences (UX & Conversion ·
 * SEO UX · Accessibilité · Microcopy), qui identifiait quatre audits distincts
 * plutôt qu'une seule offre. L'eyebrow nomme l'offre et son délai, deux
 * informations qu'un visiteur qui arrive sur la page n'a pas encore.
 *
 * Composé depuis AUDIT_NAME et AUDIT_DELIVERY_SHORT, et non écrit à la main :
 * il annonçait « Livré sous 5 jours » quand tout le reste du site dit « 5 jours
 * ouvrés ». Sur la toute première ligne lue de la page, ça promettait mercredi
 * pour une commande du vendredi alors que l'engagement réel est le vendredi
 * suivant — deux jours calendaires d'écart, dans la ligne qui sert de promesse.
 */
/* Le prix entre dans l'accroche (décision Benji, 2026-08-20) : le critère de
   F-03 demande que « le prix ET le CTA principal soient visibles » à l'arrivée,
   en 360×640 comme en 390×844. Le volet CTA était réglé, le prix n'apparaissait
   nulle part avant la section Offres, à 70 % de la page.
   Composé depuis AUDIT_PRICE et non écrit à la main : `check:offer` garantit
   alors qu'un changement de tarif se propage ici sans intervention. */
export const AUDIT_EYEBROW = `${AUDIT_NAME} · ${AUDIT_PRICE} · ${AUDIT_DELIVERY_SHORT}`;

/** Repris à l'identique dans les livrables détaillés et dans les bénéfices du hero. */
export const AUDIT_FIGMA_SCREEN = '1 écran clé corrigé dans Figma';

/**
 * Périmètre reformulé en exemples concrets de parcours plutôt qu'en
 * abstraction ("un parcours critique") : utilisé sous la proposition de
 * valeur du hero, en information secondaire.
 */
export const AUDIT_SCOPE_EXAMPLES =
  'Landing page, onboarding, checkout ou parcours critique · jusqu’à 5 écrans/pages.';

/** Liste unique, reprise à l'identique partout où les livrables sont détaillés. */
export const AUDIT_DELIVERABLES = [
  AUDIT_SCOPE,
  'Problèmes UX priorisés',
  'Recommandations actionnables',
  'Contrôles SEO UX',
  'Contrôles d’accessibilité WCAG 2.2 AA sur le périmètre audité',
  'Microcopy prioritaire réécrite',
  AUDIT_FIGMA_SCREEN,
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
  /** Variante courte pour les boutons etroits : « mensuel » y est deja
   *  porte par le contexte (surtitre, prix). Meme action, meme
   *  destination — seule la longueur change. */
  fractionalShort: 'Parler de l’accompagnement',
  caseStudy: 'Voir l’étude de cas',
  sampleReport: 'Voir un exemple de rapport',
  auditContents: 'Découvrir ce que contient l’audit',
  /**
   * CTA secondaire du hero uniquement. Mène à la même ancre que
   * `auditContents` (#deliverables — aucune page d'exemple de livrable
   * n'existe sur le site) mais porte un libellé distinct : `auditContents`
   * reste utilisé ailleurs (ProblemCards) dans un contexte différent
   * ("on vient de reconnaître un problème"), qu'un renommage global aurait
   * changé sans nécessité.
   */
  auditSample: 'Voir un exemple de livrable',
} as const;

/** Réassurance sous le bouton d'achat. */
export const AUDIT_REASSURANCE = `${AUDIT_DELIVERY} · Paiement sécurisé`;
