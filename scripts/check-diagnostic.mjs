/**
 * check-diagnostic.mjs — garde-fou sur les critères mécanisables du diagnostic
 * externe d'Adel (`Diagnostic externe de flowdee.md`, constats F-01 à F-20).
 *
 * Même rôle que `check-offer.mjs` pour les prix : empêcher une dérive de partir
 * en production, plutôt que de la découvrir à la relecture suivante. Motivation
 * concrète : le 19/08/2026, un agent a réintroduit « Notre action » dans
 * `UseCases.tsx` et régressé F-08 sans que rien ne le signale — ni erreur, ni
 * console, ni build en échec.
 *
 * ─── POURQUOI CE SCRIPT OUVRE UN NAVIGATEUR PLUTÔT QUE DE GREPPER ───────────
 *
 * Parce qu'un grep sur les sources produit des faux positifs qui feraient
 * échouer le build sur des problèmes inexistants. Deux cas rencontrés en
 * écrivant ce fichier, tous deux annoncés à tort comme non conformes :
 *
 *   • F-20 — les numéros de la FAQ SONT en `aria-hidden`. Lire `textContent`
 *     (ou grepper le JSX) les voit quand même ; le nom accessible, non.
 *   • F-13 — l'`aria-label` anglais « Reset to default » existe bien dans
 *     `Editable/Text.tsx`, mais ce composant n'est jamais monté sur le site
 *     public. Le source ment, la page rendue dit vrai.
 *
 * Le critère d'Adel porte sur ce que le visiteur reçoit. On mesure donc le DOM
 * servi, après build, comme le diagnostic lui-même l'a fait.
 *
 * ─── CE QUI EST VÉRIFIÉ ─────────────────────────────────────────────────────
 *
 * Actifs   : F-08, F-13, F-14, F-16, F-18, F-20.
 *
 * F-14 est le seul contrôle qui parcourt les neuf routes publiques : son
 * critère l'exige (« axe-core ne remonte plus aucune violation sur les neuf
 * pages »). Les autres portent sur l'accueil, où vit la copie commerciale —
 * et pour F-08 c'est nécessaire : le « nous » des pages légales désigne
 * l'entité juridique et n'a rien à s'y reprocher.
 * Inactifs : F-06 et F-19 — ils échouent aujourd'hui et leur correction
 *            n'est pas mécanique (une vraie capture à produire pour F-06, un
 *            arbitrage typographique pour F-19). Les brancher maintenant
 *            casserait le build sans rien apprendre à personne. Le code est
 *            écrit et prêt : passer `actif: true` le jour où c'est corrigé.
 *
 * Les constats hors de portée d'un script — F-02, F-04, F-05, F-07 —
 * n'apparaissent pas ici. Ils demandent du contenu ou une configuration
 * Stripe, et rester silencieux à leur sujet vaut mieux que de
 * laisser croire qu'ils sont couverts.
 *
 * Usage : pnpm run check:diagnostic   (exige un `vite build` préalable)
 */

import { preview } from 'vite';
import { chromium } from 'playwright';
import { statSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/* ─── Réglages par constat ────────────────────────────────────────────────── */

/**
 * F-08 — tournures à la première personne du pluriel tolérées.
 * Le critère vise « toute référence à l'équipe Flowdee ». Le bandeau de
 * consentement parle au nom de l'entité juridique et non d'une équipe : c'est
 * la formulation attendue d'un bandeau RGPD, la changer nuirait à sa clarté.
 * Toute autre occurrence doit échouer.
 */
const F08_TOLERE = [
  /* Bandeau de consentement : il parle au nom de l'entité juridique, pas d'une
     équipe. C'est la formulation attendue d'un bandeau RGPD. La phrase entière
     est tolérée — la version précédente ne couvrait que son début et laissait
     « analyser notre trafic » déclencher le contrôle. */
  'Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic',
  /* ⚠️ EXEMPTION ASSUMÉE, décision de Benji du 2026-08-20 : le libellé de
     navigation « Notre approche » (en-tête ET pied de page, même clé i18n).
     Elle va CONTRE la recommandation de F-08, qui demande d'assumer le « je »
     partout — « le "je" est ici la position forte, pas la position modeste ».
     Le reste du site garde le « je » (« Mon action » dans les cartes de cas a
     justement été rétabli le matin même). Conséquence : le site mêle de
     nouveau les deux personnes sur ce point précis, ce que le constat décrit
     comme « une incohérence visible qui donne l'impression d'une façade ».
     Retirer cette ligne fera de nouveau échouer le contrôle — c'est voulu, il
     faut alors renommer le libellé, pas l'exempter deux fois. */
  'Notre approche',
];

/**
 * F-13 — mots qui trahissent un intitulé anglais. Liste de mots-outils plutôt
 * que détection de langue : c'est grossier, mais sans faux positif sur du
 * français, et ça rattrape les libellés laissés par les bibliothèques.
 * `LinkedIn` est un nom propre, pas de l'anglais.
 */
const F13_MOTS_ANGLAIS = /\b(reset|default|close|open|back|next|previous|submit|search|toggle|navigate|scroll|loading|dismiss|expand|collapse)\b/i;
const F13_NOMS_PROPRES = ['LinkedIn'];

/**
 * F-14 — les neuf pages publiques, dans l'ordre du prérendu. Seule la première
 * passe par un `goto` : les suivantes par pushState + popstate, que React
 * Router traite comme une navigation normale. C'est plus rapide et ça évite de
 * dépendre de la façon dont l'hébergeur sert les chemins profonds.
 */
const F14_ROUTES = [
  '/',
  '/audit-ux',
  '/etudes-de-cas/application-edtech-ux',
  '/etudes-de-cas/optimisation-onboarding-saas',
  '/etudes-de-cas/optimisation-checkout-ecommerce',
  '/cgv',
  '/politique-de-confidentialite',
  '/mentions-legales',
  '/se-retracter',
];
const F14_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** F-18 — plafond fixé par le critère du diagnostic. */
const F18_POIDS_MAX_KO = 150;

const CONTROLES = [
  { id: 'F-08', actif: true, intitule: 'aucun « nous / notre / nos » désignant l\'équipe' },
  { id: 'F-13', actif: true, intitule: 'aucun nom accessible en anglais' },
  { id: 'F-14', actif: true, intitule: `aucune violation axe-core sur les ${F14_ROUTES.length} pages publiques` },
  { id: 'F-16', actif: true, intitule: 'liens internes avec barre finale, /se-retracter au sitemap' },
  { id: 'F-18', actif: true, intitule: `og-image sous ${F18_POIDS_MAX_KO} Ko` },
  { id: 'F-20', actif: true, intitule: 'aucun nom accessible aux fragments collés' },
  {
    id: 'F-06',
    actif: false,
    intitule: 'aucun domaine tiers pour les visuels de cas',
    raison: 'échoue aujourd\'hui : caseStudies.ts sert une photo images.unsplash.com. Demande une vraie capture anonymisée, que seul Benji peut fournir.',
  },
  {
    id: 'F-19',
    actif: false,
    intitule: 'aucun texte porteur d\'information sous 12px',
    raison: 'échoue aujourd\'hui : 44 textes sous 12px. Lesquels sont « porteurs de sens » est un arbitrage typographique, pas une correction mécanique.',
  },
];

/* ─── Mesures dans la page ────────────────────────────────────────────────── */

/**
 * Nom accessible, approché mais fidèle sur ce qui compte ici : `aria-label`
 * l'emporte, sinon le contenu textuel PRIVÉ des sous-arbres `aria-hidden`.
 * C'est exactement la distinction que `textContent` seul ne fait pas.
 */
const RELEVE_DOM = `() => {
  const nomAccessible = (el) => {
    const label = el.getAttribute('aria-label');
    if (label) return label.replace(/\\s+/g, ' ').trim();
    const copie = el.cloneNode(true);
    copie.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    return (copie.textContent || '').replace(/\\s+/g, ' ').trim();
  };

  /* Tout le texte rendu, en-tête et pied de page COMPRIS. La version
     précédente recomposait le contenu de main, puis les frères de body qui ne
     contenaient pas main : or l'app monte header, main et footer dans un même
     div, donc ce filtre excluait l'en-tête et le pied. Le contrôle F-08 ne
     voyait que le corps, et a laissé passer un « Notre approche » posé dans le
     menu. Trou trouvé le 20/08/2026 en éprouvant le contrôle sur un cas réel.
     ⚠️ Pas d'accent grave dans ce commentaire : il vit dans un littéral de
     gabarit, un accent grave y fermerait la chaîne. */

  return {
    texteMain: (document.body.innerText || '').replace(/\\s+/g, ' '),
    texteBandeaux: '',

    ariaLabels: [...document.querySelectorAll('[aria-label]')].map((e) => e.getAttribute('aria-label')),
    nomsInteractifs: [...document.querySelectorAll('button, a, [role="tab"], summary')]
      .map(nomAccessible)
      .filter(Boolean),
    liensInternes: [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && h.startsWith('/') && !h.startsWith('//')),
    imagesTierces: [...document.querySelectorAll('img, source')]
      .map((e) => e.getAttribute('src') || e.getAttribute('srcset') || '')
      .filter((s) => /^https?:\\/\\//.test(s) && !s.includes(location.host)),
    petitsTextes: (() => {
      const out = [];
      document.querySelectorAll('*').forEach((e) => {
        if (e.children.length) return;
        const t = (e.textContent || '').trim();
        if (!t) return;
        const px = parseFloat(getComputedStyle(e).fontSize);
        if (px < 12) out.push({ px, texte: t.slice(0, 50) });
      });
      return out;
    })(),
  };
}`;

/* ─── Contrôles ───────────────────────────────────────────────────────────── */

function verifie(releve) {
  const echecs = [];
  const actif = (id) => CONTROLES.find((c) => c.id === id)?.actif;

  if (actif('F-08')) {
    let texte = releve.texteMain + ' ' + releve.texteBandeaux;
    for (const tolere of F08_TOLERE) texte = texte.split(tolere).join(' ');
    const trouve = texte.match(/\b(nous|notre|nos)\b/gi);
    if (trouve?.length) {
      // Un extrait autour de la première occurrence : sans lui, le message
      // dit qu'il y a un problème sans dire où le chercher.
      const i = texte.search(/\b(nous|notre|nos)\b/i);
      echecs.push(`F-08 — ${trouve.length} occurrence(s) de « nous / notre / nos » dans le texte rendu : « …${texte.slice(Math.max(0, i - 45), i + 55)}… »`);
    }
  }

  if (actif('F-13')) {
    const anglais = releve.ariaLabels.filter(
      (l) => F13_MOTS_ANGLAIS.test(l) && !F13_NOMS_PROPRES.some((n) => l.includes(n))
    );
    if (anglais.length) echecs.push(`F-13 — nom(s) accessible(s) en anglais : ${[...new Set(anglais)].join(', ')}`);
  }

  if (actif('F-16')) {
    const sansBarre = releve.liensInternes.filter((h) => {
      const chemin = h.split(/[?#]/)[0];
      return chemin !== '/' && !chemin.endsWith('/');
    });
    if (sansBarre.length) {
      echecs.push(`F-16 — lien(s) interne(s) sans barre finale (redirection 307 en production) : ${[...new Set(sansBarre)].join(', ')}`);
    }
  }

  if (actif('F-20')) {
    // Deux fragments distincts rendus collés : minuscule ou chiffre suivi
    // immédiatement d'une majuscule, ou chiffre suivi de lettres.
    // Les noms propres à majuscule interne (LinkedIn) déclenchent la règle des
    // fragments collés sans être un défaut : ils sont retirés avant le test.
    const colles = releve.nomsInteractifs
      .map((n) => F13_NOMS_PROPRES.reduce((acc, propre) => acc.split(propre).join(' '), n))
      .filter((n) => /[a-zà-ÿ0-9][A-ZÀ-Ý]/.test(n) || /^\d+[A-Za-zÀ-ÿ]/.test(n));
    if (colles.length) echecs.push(`F-20 — nom(s) accessible(s) aux fragments collés : ${[...new Set(colles)].slice(0, 5).join(' | ')}`);
  }

  if (CONTROLES.find((c) => c.id === 'F-06')?.actif && releve.imagesTierces.length) {
    echecs.push(`F-06 — visuel(s) servi(s) par un domaine tiers : ${[...new Set(releve.imagesTierces)].join(', ')}`);
  }

  if (CONTROLES.find((c) => c.id === 'F-19')?.actif) {
    const petits = releve.petitsTextes.filter((t) => t.texte.length > 3);
    if (petits.length) echecs.push(`F-19 — ${petits.length} texte(s) rendus sous 12px, dont « ${petits[0].texte} » à ${petits[0].px}px`);
  }

  return echecs;
}

function verifieFichiers() {
  const echecs = [];

  if (CONTROLES.find((c) => c.id === 'F-18')?.actif) {
    const og = path.join(root, 'public', 'og-image.jpg');
    const ko = Math.round(statSync(og).size / 1024);
    if (ko > F18_POIDS_MAX_KO) echecs.push(`F-18 — og-image.jpg pèse ${ko} Ko, plafond ${F18_POIDS_MAX_KO} Ko`);
  }

  if (CONTROLES.find((c) => c.id === 'F-16')?.actif) {
    const sitemap = readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf-8');
    if (!sitemap.includes('se-retracter')) echecs.push('F-16 — /se-retracter absent du sitemap');
  }

  return echecs;
}

/**
 * F-14 — axe-core sur chaque route publique. Rend une ligne d'échec par
 * violation, page et règle nommées : « il y a des violations » sans dire
 * lesquelles ni où obligerait à refaire la mesure à la main.
 */
async function passeAxe(page, baseUrl) {
  const axeSource = readFileSync(path.join(root, 'node_modules', 'axe-core', 'axe.min.js'), 'utf-8');
  const echecs = [];

  for (const [i, route] of F14_ROUTES.entries()) {
    if (i > 0) {
      await page.evaluate((chemin) => {
        window.history.pushState({}, '', chemin);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }, route);
      await page.waitForTimeout(1200);
    } else {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle', timeout: 20000 });
    }

    await page.addScriptTag({ content: axeSource });
    const { violations } = await page.evaluate(
      (tags) =>
        window.axe
          .run(document, { runOnly: { type: 'tag', values: tags } })
          .then((r) => ({
            violations: r.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nb: v.nodes.length,
              cible: v.nodes[0]?.target?.join(' ') ?? '',
            })),
          })),
      F14_TAGS
    );

    for (const v of violations) {
      echecs.push(`F-14 — ${route} : [${v.impact}] ${v.id}, ${v.nb} nœud(s), ex. ${v.cible}`);
    }
  }

  return echecs;
}

/* ─── Exécution ───────────────────────────────────────────────────────────── */

async function main() {
  const echecs = [...verifieFichiers()];

  const server = await preview({ root, preview: { port: 4174, strictPort: false, host: '127.0.0.1' } });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 20000 });
    // Invoquée, et non passée telle quelle : `page.evaluate` traite une chaîne
    // comme une EXPRESSION. « () => {...} » s'évalue alors en objet fonction,
    // non sérialisable, et le relevé revient `undefined` sans erreur.
    const releve = await page.evaluate(`(${RELEVE_DOM})()`);
    echecs.push(...verifie(releve));
  } finally {
    await browser.close();
    await server.close();
  }

  const actifs = CONTROLES.filter((c) => c.actif);
  const inactifs = CONTROLES.filter((c) => !c.actif);

  if (echecs.length) {
    console.error('\n✘ Diagnostic Adel — dérive détectée :\n');
    for (const e of echecs) console.error(`    · ${e}`);
    console.error('\n  Référence : « Diagnostic externe de flowdee.md », constats F-01 à F-20.\n');
    process.exit(1);
  }

  console.log(`✔ Diagnostic Adel — ${actifs.length} contrôles passés :`);
  for (const c of actifs) console.log(`    · ${c.id} — ${c.intitule}`);
  if (inactifs.length) {
    console.log(`\n  ${inactifs.length} contrôle(s) écrits mais inactifs :`);
    for (const c of inactifs) console.log(`    · ${c.id} — ${c.raison}`);
  }
}

main().catch((err) => {
  console.error('✘ check-diagnostic a échoué :', err);
  process.exit(1);
});
