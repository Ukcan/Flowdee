/**
 * Régénère public/og-image.png depuis og-image.html.
 *
 * L'image de partage était un PNG committé sans script pour le reproduire :
 * la moindre retouche de marque obligeait à la refaire à la main, et elle a
 * donc dérivé (elle portait encore l'ancien logo doré). Ce script rend le
 * fichier reproductible.
 *
 *   node scripts/og-image.mjs
 *
 * La typo de l'image est encore Satoshi (chargée depuis Fontshare) alors que
 * le site est passé à Geist — voir la note en fin de fichier. Le script
 * échoue si Satoshi n'a pas pu être chargée, plutôt que de produire
 * silencieusement une image en police de repli.
 */
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'og-image.html');
const output = resolve(root, 'public/og-image.png');
const offerFile = resolve(root, 'src/app/constants/offer.ts');

/**
 * Prix et délai sont lus dans `constants/offer.ts`, la source de vérité de
 * l'offre, plutôt que recopiés dans le gabarit. C'est la copie manuelle qui
 * avait laissé l'image annoncer 279 € et « 3 à 5 jours » longtemps après que
 * le site soit passé à 890 € et « sous 5 jours ouvrés ».
 *
 * Lecture par expression régulière et non par `import` : le fichier est du
 * TypeScript, que Node ne sait pas charger tel quel ici.
 */
function readOfferConstant(sourceCode, name) {
  const match = sourceCode.match(
    new RegExp(`export const ${name}\\s*=\\s*['"\`]([^'"\`]+)['"\`]`)
  );
  if (!match) {
    throw new Error(
      `${name} introuvable dans src/app/constants/offer.ts — la constante a été ` +
        `renommée ou reformulée. Corrigez scripts/og-image.mjs plutôt que de ` +
        `réécrire le chiffre à la main dans og-image.html.`
    );
  }
  return match[1];
}

const offerSource = readFileSync(offerFile, 'utf8');
const offer = {
  price: readOfferConstant(offerSource, 'AUDIT_PRICE'),
  delivery: readOfferConstant(offerSource, 'AUDIT_DELIVERY'),
};

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

await page.goto(`file://${source}`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

const satoshiLoaded = await page.evaluate(() =>
  document.fonts.check('700 30px Satoshi')
);
if (!satoshiLoaded) {
  await browser.close();
  console.error(
    "Satoshi n'a pas été chargée (Fontshare injoignable ?). Rendu interrompu :\n" +
      "sans elle, l'image partirait en police système et la typographie changerait."
  );
  process.exit(1);
}

/* Injection des chiffres de l'offre. Le script s'arrête si un emplacement
   manque : une image muette sur le prix vaut mieux qu'une image au mauvais prix. */
const injected = await page.evaluate((values) => {
  const applied = {};
  for (const [key, value] of Object.entries(values)) {
    const target = document.querySelector(`[data-og="${key}"]`);
    if (!target) return { missing: key };
    target.textContent = value;
    applied[key] = value;
  }
  return { applied };
}, offer);

if (injected.missing) {
  await browser.close();
  console.error(
    `Emplacement [data-og="${injected.missing}"] absent de og-image.html. ` +
      `Rendu interrompu pour ne pas publier une image au mauvais chiffre.`
  );
  process.exit(1);
}

await page.locator('.og').screenshot({ path: output });
await browser.close();
console.log(`og-image.png régénéré → ${output}`);
console.log(`  prix   : ${offer.price}`);
console.log(`  délai  : ${offer.delivery}`);
console.log('  (lus dans src/app/constants/offer.ts)');
