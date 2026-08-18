# Reste à faire — diagnostic externe flowdee.fr (2026-08-18)

> Contexte : passe d'amélioration menée le 2026-08-18 à partir de `2026-08-18-diagnostic-flowdee/findings.json`
> (20 constats, F-01 à F-20). Les rangs 1, 2, 3 et 6 de l'ordre de traitement (12 correctifs techniques) sont
> **faits, déployés en prod** — voir les 7 commits sur `main` du 2026-08-18. Ce document liste ce qui reste :
> deux actions manuelles hors du code, et les rangs 4-5 mis de côté volontairement (décisions éditoriales/business).

---

## 1. Action manuelle — tableau de bord Stripe (reste de F-05)

Le site est corrigé (TVA affichée près du prix). Il reste un réglage côté Stripe, que je ne peux pas faire :

- **Renommer le produit** du lien de paiement `buy.stripe.com/8x28wQf378p8bGAeUwgYU01` : il s'appelle
  actuellement *« Audit UX/UI Site web | App - Standard »*, le site parle d'un *« Audit UX & Conversion »*.
  Le suffixe « Standard » laisse croire à d'autres formules qui n'existent pas.
- **Activer la collecte d'acceptation des CGV** sur ce même lien de paiement, avec l'URL
  `https://flowdee.fr/cgv/`. Actuellement aucune case n'est présentée à l'achat.
- Une fois fait, relire l'article des CGV sur la formation du contrat : il décrit un fonctionnement par
  devis/acompte que l'achat Stripe en un clic court-circuite.

**Critère de vérification :** la page de paiement affiche le même nom de produit que le site et un lien vers
les CGV, avec acceptation requise.

---

## 2. Reste de F-18 — négociation AVIF/WebP des images d'études de cas

Fait : l'image de partage (og-image) est passée de 384 Ko à 46 Ko (JPEG).

Non fait : les 4 images de comparaison avant/après (`src/assets/*.jpg`, 160 à 241 Ko chacune) sont encore
servies en JPEG pur, sans variante AVIF/WebP. Pourquoi ce n'est pas allé plus loin :

- Ces images passent par un plugin Vite maison (`figmaAssetResolver` dans `vite.config.ts`), déjà signalé
  comme fragile dans `AUDIT_TECHNIQUE.md` (« ne pas y toucher sans précaution »).
- Aucun outil de conversion d'image (sharp, imagemin…) n'est installé dans le projet, et en ajouter un
  touche `pnpm-workspace.yaml`, dont le fichier note déjà des soucis de build Cloudflare par le passé.

**Si vous voulez le faire :** générer les variantes AVIF/WebP des 4 fichiers dans `src/assets/`, puis servir
chaque image via `<picture>` (source AVIF, source WebP, fallback JPEG) dans les composants qui les
consomment (`UseCases.tsx`, `constants/caseStudies.ts`, `Approach.tsx`). Impact mesuré comme faible
aujourd'hui grâce au cache Cloudflare — pas urgent.

---

## 3. Rangs 4 et 5 — mis de côté (décisions à prendre avant d'écrire)

### Rang 4 — chantier de preuve (le plus long, celui qui change le taux de contact)

| Constat | Ce qu'il faut fournir/décider |
|---|---|
| **F-02** — « Voir un exemple de livrable » ne montre rien | Publier un extrait réel et anonymisé : 3-5 pages du rapport, une capture Figma corrigée, un avant/après de microcopy. Sans mur à l'e-mail. |
| **F-04** — aucun résultat chiffré dans les 3 études de cas | Un chiffre par cas + sa base de comparaison + sa période. À défaut, dire explicitement pourquoi le chiffre n'est pas publiable. |
| **F-06** — photo Unsplash sur le cas SaaS | Remplacer par une vraie capture (même floutée) ou un schéma du parcours. |
| **F-07** — témoignage unique, anonyme, en 11px | Obtenir un témoignage nommé (prénom, fonction, entreprise, si possible LinkedIn), sinon le retirer. |

### Rang 5 — arbitrages de positionnement (à trancher avant d'écrire)

| Constat | Décision à prendre |
|---|---|
| **F-08** — le site hésite entre « nous »/studio et « je »/personne | L'audit recommande le « je » partout (position forte face aux agences) — à valider. |
| **F-10** — « Choisir un créneau » n'ouvre pas de créneau, l'agenda réel est ailleurs | Décider si le formulaire doit rediriger directement vers l'agenda Google quand « Réserver un appel » est choisi. |
| **F-11** — le vrai différenciateur (IA + humain, livrable repris par Claude Code) est en position 9/11, replié dans la FAQ | Remonter cette promesse dans le premier tiers de page, à la place de la section « LES SIGNAUX » trop générique. |
| **F-12** — Karma Com Solidarité (KCS) et Université de Bordeaux affichés comme « entreprises qui ont fait confiance » | Deux décisions distinctes : (1) renommer l'intitulé du bandeau en « Ils m'ont fait confiance », exact pour les 4 ; (2) **côté KCS** — poser explicitement avec Adel l'autorisation d'usage du logo dans une communication commerciale. |

---

## Rappel — ce qui a déjà été corrigé le 2026-08-18

Rangs 1, 2, 3, 6 (F-01, F-03, F-05 volet site, F-09, F-13, F-14, F-15, F-16, F-17, F-18 volet og-image, F-19,
F-20) — 7 commits sur `main`, déployés en prod via GitHub Actions le 2026-08-18.
