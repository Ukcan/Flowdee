/**
 * CTA Copy Constants
 *
 * Ce module ne fait plus que réexporter la taxonomie définie dans `./offer`,
 * qui est désormais la seule source de vérité pour les libellés d'action et
 * les chiffres de l'offre. Il portait un prix (890 €) et un délai (« 3-5j »)
 * en dur, qui divergeaient déjà du reste du site.
 *
 * Conservé plutôt que supprimé : plusieurs composants l'importent encore.
 * Pour tout nouveau code, importer directement `./offer`.
 */

import { CTA, AUDIT_REASSURANCE } from './offer';

export const CTA_PRIMARY = {
  label: CTA.call,
  subtext: 'Sans engagement · Réponse sous 24 h',
} as const;

export const CTA_SECONDARY = {
  label: CTA.audit,
  subtext: AUDIT_REASSURANCE,
} as const;

// Legacy exports for backwards compatibility
export const primaryLabel = CTA_PRIMARY.label;
export const secondaryLabel = CTA_SECONDARY.label;
export const primarySub = CTA_PRIMARY.subtext;
export const secondarySub = CTA_SECONDARY.subtext;
