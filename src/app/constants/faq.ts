/**
 * constants/faq — source de vérité des questions/réponses FAQ.
 *
 * Reprises telles quelles dans le JSON-LD `FAQPage` de `index.html` (Google
 * exige que ce balisage reproduise le contenu réellement affiché) et, en
 * partie, sur `/audit-ux`. Toute modification ici doit être reportée
 * dans `index.html` — mais ce report n'est plus laissé à la vigilance :
 * `scripts/check-offer.mjs` échoue si les deux divergent, et tourne avant
 * chaque build (voir `check:offer` dans package.json).
 *
 * Les chiffres de l'offre ne sont plus recopiés ici : ils viennent de
 * `./offer`. La réponse « Combien de temps ça prend » portait 890 €, 3 900 €,
 * 2 200 € et deux délais en dur, soit une quatrième copie à maintenir à la
 * main après celles du hero, de la page /audit-ux et de l'image de partage.
 */

import {
  AUDIT_NAME,
  AUDIT_PRICE,
  AUDIT_DELIVERY,
  AUDIT_START,
  SPRINT_PRICE,
  FRACTIONAL_PRICE,
} from './offer';

export interface FaqEntry {
  question: string;
  answer: string;
  footnote?: string;
}

/* Deux questions retirées le 2026-08-18 (revue Adel × Benji) : "Et si je
   n'ai pas besoin d'une refonte complète ?" et "Le SEO et l'accessibilité
   sont-ils couverts ?" entraient trop dans le détail d'un projet précis pour
   un premier contact. Ce niveau de détail se traite dans les échanges qui
   suivent la prise de contact (progressive disclosure), pas ici — ce qui
   reste vise les questions vraiment générales : périmètre, livrable, temps,
   prix, méthode, confidentialité. */
export const FAQS: FaqEntry[] = [
  {
    question: 'Sur quel périmètre porte l’audit ?',
    answer: 'Sur un parcours critique, une landing page ou jusqu’à 5 écrans/pages. Pour un site plus large, le parcours ayant le plus d’impact est priorisé — plutôt qu’un survol de l’ensemble qui ne changerait rien.',
  },
  {
    question: 'Qu’est-ce que je reçois concrètement avec l’audit ?',
    answer: 'Un livrable actionnable, pas un PDF théorique : les problèmes UX priorisés, des recommandations actionnables, la microcopy prioritaire réécrite, 1 écran clé corrigé dans Figma et un rapport final priorisé.',
  },
  {
    question: 'Combien de temps ça prend et combien ça coûte ?',
    /* `AUDIT_DELIVERY` est capitalisé pour un usage autonome (« Livraison
       sous… ») ; ici il s'insère en milieu de phrase, d'où la minuscule. */
    answer: `${AUDIT_NAME} : ${AUDIT_PRICE}, ${AUDIT_DELIVERY.toLowerCase()}. Product Sprint + Tests : ${SPRINT_PRICE}, 2 semaines. Fractional Product Designer : dès ${FRACTIONAL_PRICE}/mois, en continu. ${AUDIT_START} Paiement sécurisé.`,
  },
  {
    question: 'Comment utiliser le livrable avec Figma, votre équipe dev ou Claude Code ?',
    answer: 'L’écran corrigé est livré dans Figma avec des spécifications claires, directement exploitables par votre équipe de développement — et pensé pour être repris facilement par un assistant comme Claude Code afin d’accélérer l’implémentation.',
  },
  {
    question: 'Quelle offre choisir si je ne suis pas sûr ?',
    answer: 'Réservez un appel de 30 minutes : on regarde votre situation ensemble et je vous oriente vers le format le plus adapté. Sans engagement.',
  },
  {
    question: 'Quelle garantie de confidentialité ?',
    answer: 'NDA possible sur demande, anonymisation systématique des cas clients, accès limité aux données strictement nécessaires, suppression ou restitution des fichiers en fin de mission.',
    footnote: 'NDA (Non Disclosure Agreement), garantit la confidentialité des informations, données sensibles ou stratégiques, relatives à une entreprise.',
  },
];
