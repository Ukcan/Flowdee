// Prérendu build-time du one-pager Flowdee.
//
// Pourquoi : le site est une SPA React pure (pas de SSR). Les crawlers qui
// n'exécutent pas de JavaScript (GPTBot, ClaudeBot, PerplexityBot, et une
// partie des indexeurs classiques) ne voient donc que <div id="root"></div>
// vide. Ce script, lancé juste après `vite build`, ouvre la page buildée
// dans Chromium headless, attend que React ait rendu le contenu, puis
// réinjecte le HTML obtenu dans dist/index.html. Le script de l'app reste
// en place : un vrai visiteur reçoit toujours la version interactive
// (React "écrase" ce HTML au montage), seul ce qui est visible sans JS change.

import { preview } from 'vite';
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distIndexPath = path.join(root, 'dist', 'index.html');

async function main() {
  console.log('[prerender] démarrage du serveur de preview...');
  const server = await preview({
    root,
    preview: { port: 4173, strictPort: false, host: '127.0.0.1' },
  });
  const url = server.resolvedUrls.local[0];
  console.log(`[prerender] preview servi sur ${url}`);

  console.log('[prerender] lancement de Chromium...');
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    console.log('[prerender] navigation vers la page...');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log('[prerender] attente du contenu rendu...');
    await page.waitForSelector('#main-content h1', { timeout: 15000 });
    // Laisse le temps aux effets/contexts (i18n, thème) de se stabiliser.
    await page.waitForTimeout(300);

    const renderedHTML = await page.evaluate(() => document.getElementById('root').innerHTML);
    console.log(`[prerender] contenu capturé (${renderedHTML.length} caractères)`);

    const original = readFileSync(distIndexPath, 'utf-8');
    if (!original.includes('<div id="root"></div>')) {
      throw new Error('Marqueur <div id="root"></div> introuvable dans dist/index.html — build a peut-être changé de forme.');
    }
    const updated = original.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedHTML}</div>`
    );
    writeFileSync(distIndexPath, updated, 'utf-8');
    console.log(`[prerender] OK — ${renderedHTML.length.toLocaleString('fr-FR')} caractères de HTML injectés dans dist/index.html`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }
}

const watchdog = setTimeout(() => {
  console.error('[prerender] Timeout global (45s) — abandon.');
  process.exit(1);
}, 45000);

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
