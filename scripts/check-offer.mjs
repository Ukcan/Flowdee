/**
 * Garde-fou de cohérence de l'offre.
 *
 *   node scripts/check-offer.mjs      (ou : pnpm run check:offer)
 *
 * Pourquoi ce script existe. Les chiffres de l'offre vivent dans
 * `src/app/constants/offer.ts`, et tout le code de l'application les lit
 * désormais là. Mais deux fichiers ne peuvent pas importer du TypeScript :
 *
 *   - `index.html` — balisage JSON-LD (Offer + FAQPage) et méta-description ;
 *   - `og-image.html` — gabarit de l'image de partage.
 *
 * Ces deux fichiers portent donc encore les valeurs en clair, ce qui est
 * souhaitable pour du balisage SEO (relisible, greppable, sans magie de build)
 * mais rouvre la porte à la dérive. C'est exactement par là qu'elle est passée :
 * l'image de partage a annoncé un audit à 279 € et un délai de « 3 à 5 jours »
 * longtemps après le passage à 890 € et « sous 5 jours ouvrés ».
 *
 * Ce script ne réécrit rien : il compare et il échoue. Branché avant chaque
 * build, il transforme une dérive silencieuse en échec bruyant.
 *
 * Note sur Google : le balisage FAQPage doit reproduire la FAQ réellement
 * affichée. Une divergence entre `constants/faq.ts` et `index.html` n'est donc
 * pas qu'une incohérence commerciale, c'est un défaut de données structurées.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createServer } from 'vite';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Espaces insécables et fines sont courants dans les prix français
 * (« 3 900 € ») et diffèrent souvent entre un fichier TS et du HTML sans que
 * le texte affiché change. On compare donc à espaces normalisés, sinon le
 * garde-fou crierait au loup sur une différence invisible à l'écran.
 */
const normalize = (text) =>
  text.replace(/[    \s]+/g, ' ').trim();

/** Charge les constantes TypeScript via le chargeur SSR de Vite : les valeurs
 *  composées (gabarits `${...}`) arrivent ainsi résolues, ce qu'une lecture à
 *  l'expression régulière ne saurait pas faire. `configFile: false` évite de
 *  démarrer les plugins du projet, inutiles pour deux modules sans dépendance. */
async function loadConstants() {
  const server = await createServer({
    configFile: false,
    root,
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  });
  try {
    const offer = await server.ssrLoadModule('/src/app/constants/offer.ts');
    const faq = await server.ssrLoadModule('/src/app/constants/faq.ts');
    return { offer, faq };
  } finally {
    await server.close();
  }
}

const { offer, faq } = await loadConstants();
const indexHtml = readFileSync(resolve(root, 'index.html'), 'utf8');
const ogHtml = readFileSync(resolve(root, 'og-image.html'), 'utf8');

const failures = [];
const checks = [];

function expectContains(haystack, needle, where, label) {
  checks.push(label);
  if (!normalize(haystack).includes(normalize(needle))) {
    failures.push(
      `${where} ne contient pas ${label} attendu :\n    « ${needle} »\n` +
        `  Source de vérité : src/app/constants/offer.ts`
    );
  }
}

/* ── 1. Prix numérique du balisage Offer ─────────────────────────────────
   schema.org attend un nombre nu (« 890 »), pas « 890 € ». */
const expectedPriceDigits = offer.AUDIT_PRICE.replace(/[^\d]/g, '');
const markupPrice = indexHtml.match(/"price"\s*:\s*"([\d.,]+)"/);
checks.push('le prix du balisage Offer');
if (!markupPrice) {
  failures.push('index.html : champ "price" introuvable dans le JSON-LD Offer.');
} else if (markupPrice[1].replace(/[^\d]/g, '') !== expectedPriceDigits) {
  failures.push(
    `index.html : le JSON-LD Offer annonce "price": "${markupPrice[1]}" ` +
      `alors que AUDIT_PRICE vaut ${offer.AUDIT_PRICE} (soit ${expectedPriceDigits}).`
  );
}

/* ── 2. Délai de livraison dans index.html ──────────────────────────────── */
expectContains(indexHtml, offer.AUDIT_DELIVERY, 'index.html', 'le délai de livraison');

/* ── 3. Balisage FAQPage = FAQ affichée ─────────────────────────────────
   Toute question reprise dans index.html doit y porter la même réponse. */
let mirrored = 0;
for (const entry of faq.FAQS) {
  if (!normalize(indexHtml).includes(normalize(entry.question))) continue;
  mirrored += 1;
  if (!normalize(indexHtml).includes(normalize(entry.answer))) {
    failures.push(
      `index.html : la question « ${entry.question} » est reprise dans le ` +
        `JSON-LD FAQPage, mais sa réponse y diverge de constants/faq.ts.\n` +
        `  Attendu : « ${entry.answer} »`
    );
  }
}
checks.push(`${mirrored} réponse(s) FAQ reprises dans le balisage`);
if (mirrored === 0) {
  failures.push(
    'index.html : aucune question de constants/faq.ts retrouvée dans le ' +
      'JSON-LD FAQPage. Le balisage a-t-il été réécrit, ou ce script est-il périmé ?'
  );
}

/* ── 4. Textes de repli du gabarit de l'image de partage ─────────────────
   `scripts/og-image.mjs` réécrit ces valeurs avant la capture, donc l'image
   publiée est juste même si le repli dérive. On les vérifie quand même :
   c'est ce qu'on lit en ouvrant le fichier, et une valeur périmée là-dedans
   est précisément ce qui a fait croire pendant des mois que l'image était
   à jour. */
expectContains(ogHtml, offer.AUDIT_PRICE, 'og-image.html', 'le prix de repli');
expectContains(ogHtml, offer.AUDIT_DELIVERY, 'og-image.html', 'le délai de repli');

/* ── Verdict ────────────────────────────────────────────────────────────── */
if (failures.length > 0) {
  console.error(`\n✖ Cohérence de l'offre : ${failures.length} écart(s).\n`);
  for (const failure of failures) console.error(`  - ${failure}\n`);
  console.error(
    "Corrigez le fichier fautif pour qu'il reflète src/app/constants/offer.ts,\n" +
      "puis relancez. Si c'est le prix ou le délai qui a changé, pensez aussi à\n" +
      '`pnpm run og-image` : l\'image de partage n\'est pas régénérée par le build.\n'
  );
  process.exit(1);
}

console.log(`✔ Cohérence de l'offre — ${checks.length} contrôles passés :`);
console.log(`    prix   ${offer.AUDIT_PRICE}`);
console.log(`    délai  ${offer.AUDIT_DELIVERY}`);
for (const check of checks) console.log(`    · ${check}`);
