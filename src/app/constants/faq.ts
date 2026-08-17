/**
 * constants/faq — source de vérité des questions/réponses FAQ.
 *
 * Reprises telles quelles dans le JSON-LD `FAQPage` de `index.html` (Google
 * exige que ce balisage reproduise le contenu réellement affiché) et, en
 * partie, sur `/audit-ux`. Toute modification ici doit être reportée
 * manuellement dans `index.html`.
 */

export interface FaqEntry {
  question: string;
  answer: string;
  footnote?: string;
}

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
    question: 'Et si je n’ai pas besoin d’une refonte complète ?',
    answer: 'C’est tout l’intérêt : on cible les frictions qui comptent et on corrige par priorité, sans refonte inutile. Vous gardez votre existant, on optimise ce qui bloque vos conversions.',
  },
  {
    question: 'Le SEO et l’accessibilité sont-ils couverts ?',
    answer: 'Ce sont des contrôles inclus dans l’audit, pas des audits séparés. Côté SEO UX : titres, structure des contenus, libellés et lisibilité. Côté accessibilité : repérage des principaux écarts WCAG 2.2 AA sur le périmètre audité — contrastes, focus, clavier, labels, alternatives textuelles et cibles interactives. Un audit SEO technique ou une mise en conformité complète relèvent d’une prestation distincte.',
  },
  {
    question: 'Combien de temps ça prend et combien ça coûte ?',
    answer: 'Audit UX & Conversion : 890 €, livraison sous 5 jours ouvrés. Product Sprint + Tests : 3 900 €, 2 semaines. Fractional Product Designer : dès 2 200 €/mois, en continu. Démarrage confirmé sous 24 h après réception des éléments nécessaires. Paiement sécurisé.',
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
