import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  /** URL absolue (https://flowdee.fr/...). */
  canonical: string;
  /** Défaut : "index, follow". À ne surcharger que pour une page comme
   *  /se-retracter, qui doit rester joignable mais pas indexée. */
  robots?: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Applique title/description/canonical/OG côté client au changement de route.
 *
 * Le site est une SPA à un seul `index.html` : ce sont les seuls tags que le
 * prérendu build-time (`scripts/prerender.mjs`) ne peut pas figer par route à
 * l'avance — il relit ces mêmes tags une fois que chaque page les a posés,
 * pour générer un `dist/<route>/index.html` avec le bon `<head>`.
 */
export function useSeo({ title, description, canonical, robots = 'index, follow' }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertCanonical(canonical);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
  }, [title, description, canonical, robots]);
}
