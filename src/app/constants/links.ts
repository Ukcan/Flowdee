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
 * Opens a blank tab synchronously. Call this directly inside a click handler,
 * before any `await` — browsers only allow window.open() to bypass the popup
 * blocker while it's still tied to the original user gesture. Pass the
 * returned handle to openAuditLink() once any async work (e.g. a form
 * submission) has finished.
 */
export function openBlankTab(): Window | null {
  if (typeof window === 'undefined') return null;
  const tab = window.open('about:blank', '_blank');
  if (tab) tab.opener = null; // sever the reference (like noopener) while keeping our handle
  return tab;
}

/**
 * Navigates to Stripe checkout in a new tab so the Flowdee tab stays open, and
 * warns the visitor explicitly — most people won't notice a silently-opened
 * tab on their own.
 *
 * Pass a tab already opened via openBlankTab() when this runs after an
 * `await` (e.g. a form submission) — otherwise the popup blocker silently
 * drops the new tab because it's no longer tied to the click gesture.
 */
export function openAuditLink(tab?: Window | null) {
  if (typeof window === 'undefined') return;
  const target = tab !== undefined ? tab : window.open(AUDIT_LINK, '_blank', 'noopener,noreferrer');
  if (tab !== undefined && target) {
    target.location.href = AUDIT_LINK;
  }
  if (target) {
    toast('Paiement ouvert dans un nouvel onglet', {
      description: 'Revenez sur cet onglet Flowdee une fois le paiement terminé.',
      duration: 8000,
    });
  } else {
    toast.error("Le paiement n'a pas pu s'ouvrir", {
      description: 'Votre navigateur bloque les popups — autorisez-les pour ce site, ou réessayez.',
    });
  }
}
