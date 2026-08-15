import { toast } from 'sonner@2.0.3';

export const CALENDAR_LINK = "https://calendar.app.google/s7Zh6d3dwE5Z88DZ7"; // Google Calendar — Appel découverte Flowdee (30 min)

// Embeddable Google Calendar scheduling URL (renders inside an iframe).
export const CALENDAR_EMBED_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3vG2YiZoaekIIXcTaVzYNpO3PCMLvnJ-QBJ3yRmDd1Y1pt86UVgCPXJRUEPBGS1l60H9jQOzUs?gv=true";

// Stripe payment link for the audit (LIVE mode — real payments).
export const AUDIT_LINK = "https://buy.stripe.com/8x28wQf378p8bGAeUwgYU01";

/**
 * Opens the in-site booking modal (Google Calendar embed) instead of a new tab.
 * Any "Réserver un appel" CTA can call this.
 */
export function openCalendar() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('flowdee:open-calendar'));
  }
}

/**
 * Opens Stripe checkout in a new tab so the Flowdee tab stays open, and warns the
 * visitor explicitly — most people won't notice a silently-opened tab on their own.
 */
export function openAuditLink() {
  if (typeof window !== 'undefined') {
    window.open(AUDIT_LINK, '_blank', 'noopener,noreferrer');
    toast('Paiement ouvert dans un nouvel onglet', {
      description: 'Revenez sur cet onglet Flowdee une fois le paiement terminé.',
      duration: 8000,
    });
  }
}
