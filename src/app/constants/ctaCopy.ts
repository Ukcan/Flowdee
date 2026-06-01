/**
 * CTA Copy Constants - Canonical source for all CTAs
 * Single source of truth for CTA labels and micro-copy
 * 
 * Usage:
 * import { CTA_PRIMARY, CTA_SECONDARY } from './ctaCopy';
 */

export const CTA_PRIMARY = {
  label: "Réserver un appel (30 min)",
  subtext: "Sans engagement • Réponse sous 24h",
} as const;

export const CTA_SECONDARY = {
  label: "Acheter l'audit (279€)",
  subtext: "Livraison 72h–5j • Paiement sécurisé",
} as const;

// Legacy exports for backwards compatibility
export const primaryLabel = CTA_PRIMARY.label;
export const secondaryLabel = CTA_SECONDARY.label;
export const primarySub = CTA_PRIMARY.subtext;
export const secondarySub = CTA_SECONDARY.subtext;
