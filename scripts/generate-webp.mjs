/**
 * Génère une variante .webp à côté de chaque .jpg listé ci-dessous.
 *
 * Pas de nouvelle dépendance (sharp, imagemin...) : Chromium (déjà présent
 * pour le prérendu) encode le WebP via canvas.toBlob, ce qui suffit pour ce
 * besoin ponctuel. AVIF n'est pas couvert — Chromium ne l'expose pas via
 * canvas.toBlob — mais l'audit externe (F-18) demande WebP OU AVIF.
 *
 *   node scripts/generate-webp.mjs
 *
 * Relancer ce script si l'un des .jpg sources est remplacé.
 */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = resolve(root, 'src/assets');

const FILES = [
  '14ef1a1437025d46e765d7e8a3c8b8ccb9fe4f71.jpg',
  '527f60f73fe096905f75e234d997f79c2f990c15.jpg',
  '5d01d94ee99e37b8c24f102a36d51d884f769ccd.jpg',
  '8d0fbd868add68a87847282f9a6dae596b7a8035.jpg',
  'neurolabo-analyses-optimise.jpg',
  'neurolabo-analyses-wireframe.jpg',
];

const browser = await chromium.launch();
const page = await browser.newPage();

let totalBefore = 0;
let totalAfter = 0;

for (const file of FILES) {
  const srcPath = resolve(assetsDir, file);
  const buf = readFileSync(srcPath);
  const dataUrl = `data:image/jpeg;base64,${buf.toString('base64')}`;

  const webpBase64 = await page.evaluate(async (url) => {
    const img = new Image();
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
      img.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', 0.82));
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }, dataUrl);

  const outFile = file.replace(/\.jpg$/, '.webp');
  const outPath = resolve(assetsDir, outFile);
  const outBuf = Buffer.from(webpBase64, 'base64');
  writeFileSync(outPath, outBuf);

  totalBefore += buf.length;
  totalAfter += outBuf.length;
  console.log(
    `${file} (${(buf.length / 1024).toFixed(0)} Ko) → ${outFile} (${(outBuf.length / 1024).toFixed(0)} Ko)`
  );
}

console.log(
  `\nTotal : ${(totalBefore / 1024).toFixed(0)} Ko → ${(totalAfter / 1024).toFixed(0)} Ko`
);

await browser.close();
