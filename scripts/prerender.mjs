// Prérendu build-time du site Flowdee (SPA React, plusieurs routes).
//
// Pourquoi : le site est une SPA (pas de SSR). Les crawlers qui n'exécutent
// pas de JavaScript (GPTBot, ClaudeBot, PerplexityBot, une partie des
// indexeurs classiques) ne voient donc que <div id="root"></div> vide. Ce
// script, lancé juste après `vite build`, ouvre chaque route buildée dans
// Chromium headless, attend que React ait rendu le contenu, puis écrit un
// fichier HTML statique par route dans `dist/`. Le script de l'app reste en
// place partout : un vrai visiteur reçoit toujours la version interactive
// (React "écrase" ce HTML au montage), seul ce qui est visible sans JS change.
//
// Chaque route non-"/" obtient son propre `dist/<route>/index.html`, servi
// tel quel par Cloudflare Workers Assets pour une correspondance exacte de
// chemin — pas de routage serveur ni de dépendance supplémentaire.
//
// Le <title>/meta description/canonical de chaque route ne sont pas
// dupliqués ici : chaque page les pose elle-même via `useSeo` (voir
// src/app/hooks/useSeo.ts), ce script se contente de relire le <head> une
// fois le rendu stabilisé — source unique de vérité dans le composant.

import { preview } from 'vite';
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const distIndexPath = path.join(distDir, 'index.html');

// Une entrée par route réellement crawlable. Pour ajouter une étude de cas,
// ajoute son slug ici (doit correspondre à `src/app/constants/caseStudies.ts`).
const ROUTES = [
  '/',
  '/audit-ux',
  '/etudes-de-cas/application-edtech-ux',
  '/etudes-de-cas/optimisation-onboarding-saas',
  '/etudes-de-cas/optimisation-checkout-ecommerce',
];

function outputPathFor(route) {
  if (route === '/') return distIndexPath;
  return path.join(distDir, ...route.split('/').filter(Boolean), 'index.html');
}

/** Remplace le contenu d'une balise `<tag ...>...</tag>` par un texte donné. */
function replaceTagText(html, tag, text) {
  const re = new RegExp(`(<${tag}[^>]*>)([\\s\\S]*?)(</${tag}>)`, 'i');
  return html.replace(re, `$1${text}$3`);
}

/** Remplace `content="..."` sur la balise meta ciblée par name= ou property=. */
function replaceMetaContent(html, attr, key, content) {
  const re = new RegExp(`(<meta[^>]*${attr}=["']${key}["'][^>]*content=["'])[^"']*(["'][^>]*>)`, 'i');
  return html.replace(re, `$1${content}$2`);
}

function replaceCanonical(html, href) {
  const re = /(<link[^>]*rel=["']canonical["'][^>]*href=["'])[^"']*(["'][^>]*>)/i;
  return html.replace(re, `$1${href}$2`);
}

/** Retire le bloc JSON-LD figé dans index.html : spécifique à la home
 *  (WebSite/Organization/ProfessionalService/FAQPage), inexact sur les
 *  autres routes qui posent leur propre JSON-LD (Breadcrumb/Article) via React. */
function stripHomeJsonLd(html) {
  return html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '');
}

/**
 * Navigue vers `route`. Seule la toute première route passe par un vrai
 * `page.goto` — les suivantes utilisent une navigation client (pushState +
 * popstate synthétique) que React Router traite comme un changement de
 * route normal : `dist/` ne contient pas encore de fichier pour ces chemins
 * à ce stade du build, un `goto` direct se ferait donc 404 par la couche
 * d'assets (comportement volontaire, voir `wrangler.jsonc`).
 */
async function gotoRoute(page, baseUrl, route, isFirst) {
  if (isFirst) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForSelector('#main-content h1', { timeout: 15000 });
  } else {
    await page.evaluate((path) => {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }, route);
  }
}

async function renderRoute(page, baseUrl, route, isFirst) {
  await gotoRoute(page, baseUrl, route, isFirst);

  // Chaque page non-home pose son canonical avec un slash final (forme
  // servie en 200 par Cloudflare, voir AuditUX.tsx / EtudeDeCas.tsx).
  const expectedCanonical = route === '/' ? 'https://flowdee.fr/' : `https://flowdee.fr${route}/`;
  // Chaque page pose son <title>/description/canonical via `useSeo` dans un
  // effet ; attendre que le canonical corresponde à la route ciblée est le
  // signal fiable que le bon composant a fini de se monter.
  await page.waitForFunction(
    (expected) => document.querySelector('link[rel="canonical"]')?.href === expected,
    expectedCanonical,
    { timeout: 15000 }
  );
  await page.waitForSelector('#main-content h1', { timeout: 15000 });
  // Laisse le temps aux effets/contexts (i18n, thème) de se stabiliser.
  await page.waitForTimeout(300);

  return page.evaluate(() => ({
    html: document.getElementById('root').innerHTML,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.href ?? '',
  }));
}

async function main() {
  console.log('[prerender] démarrage du serveur de preview...');
  const server = await preview({
    root,
    preview: { port: 4173, strictPort: false, host: '127.0.0.1' },
  });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  console.log(`[prerender] preview servi sur ${baseUrl}`);

  const template = readFileSync(distIndexPath, 'utf-8');
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Marqueur <div id="root"></div> introuvable dans dist/index.html — build a peut-être changé de forme.');
  }

  console.log('[prerender] lancement de Chromium...');
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    for (const [i, route] of ROUTES.entries()) {
      console.log(`[prerender] rendu de ${route}...`);
      const { html, title, description, canonical } = await renderRoute(page, baseUrl, route, i === 0);

      let output = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

      if (route !== '/') {
        output = replaceTagText(output, 'title', title);
        output = replaceMetaContent(output, 'name', 'description', description);
        output = replaceCanonical(output, canonical);
        output = replaceMetaContent(output, 'property', 'og:title', title);
        output = replaceMetaContent(output, 'property', 'og:description', description);
        output = replaceMetaContent(output, 'property', 'og:url', canonical);
        output = replaceMetaContent(output, 'name', 'twitter:title', title);
        output = replaceMetaContent(output, 'name', 'twitter:description', description);
        output = stripHomeJsonLd(output);
      }

      const outPath = outputPathFor(route);
      mkdirSync(path.dirname(outPath), { recursive: true });
      writeFileSync(outPath, output, 'utf-8');
      console.log(`[prerender] OK — ${route} → ${path.relative(root, outPath)} (${html.length.toLocaleString('fr-FR')} caractères)`);
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

const watchdog = setTimeout(() => {
  console.error('[prerender] Timeout global (90s) — abandon.');
  process.exit(1);
}, 90000);

main()
  .catch((err) => {
    console.error('[prerender] Échec :', err);
    process.exitCode = 1;
  })
  .finally(() => {
    clearTimeout(watchdog);
    // Le plugin Cloudflare (workerd) garde des handles ouverts après
    // server.httpServer.close() : on force la sortie plutôt que d'attendre
    // un drain naturel de la boucle d'événements qui n'arrive jamais.
    process.exit(process.exitCode ?? 0);
  });
