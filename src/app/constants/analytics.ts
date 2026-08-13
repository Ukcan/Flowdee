// Google Analytics 4 — Measurement ID (format G-XXXXXXXXXX).
// Tant que cette valeur est vide, aucun script gtag ne se charge :
// pas d'ID assigné pour l'instant.
export const GA_MEASUREMENT_ID = 'G-QX1YKWRJDW';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let gaLoaded = false;

function injectGtag() {
  if (gaLoaded || !GA_MEASUREMENT_ID) return;
  gaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

function readAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem('flowdee-cookie-consent');
    return raw ? JSON.parse(raw)?.analytics === true : false;
  } catch {
    return false;
  }
}

/**
 * À appeler au montage de l'app et juste après toute écriture du
 * consentement (CookieBanner) : charge gtag uniquement si l'utilisateur
 * a accepté les cookies analytiques, jamais avant.
 */
export function syncAnalyticsWithConsent() {
  if (readAnalyticsConsent()) injectGtag();
}
