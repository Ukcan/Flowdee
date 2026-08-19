# Passation — Flowdee, 19/08/2026

> Pour l'agent qui reprend. Lis « Pièges » avant d'écrire du code : chacun de
> ces points a coûté du temps, et tous ont le même mode d'échec — **rien ne
> casse, rien n'apparaît en console, l'effet ne se produit simplement pas.**

---

## 1. Où en est le dépôt

**Branche : `design/bandeau-cookies-et-flux-etude-de-cas`**, deux commits au-dessus de `main` (`f62f616`). **Rien n'a été poussé.**

| commit | contenu |
|---|---|
| `67e7472` | étude de cas en flux par public + bandeau cookies inversé |
| `c1befb4` | horodatage, versionnage et expiration du consentement (RGPD) |

**Sept fichiers restent modifiés dans le répertoire de travail, non commités, et ne sont pas de moi** (voir §2) :

```
src/styles/globals.css
src/app/components/FinalCTA.tsx
src/app/components/Section/{Deliverables,FAQ,Services}.tsx
src/app/components/{TrustedClients,UseCases}.tsx
```

⚠️ `UseCases.tsx` contient **à la fois** mon travail (commité) **et** le leur (non commité). J'ai découpé le diff pour ne stager que mes hunks : la classe `.theme-inverse` qu'ils ajoutent dépend de `globals.css`, que je ne commitais pas — l'inclure aurait produit un commit référençant une classe sans définition.

---

## 2. Le chantier de thème : deux tentatives, la seconde en cours

C'est la clé pour lire les sept fichiers. **Ne les traite pas comme du bruit.**

**Tentative 1 — committée puis annulée.**
`6315c99` poussait `--bg-base` à `#08090C` et `--bg-depth` à `#000000`, en global. `f62f616` l'a intégralement annulée (retour à `#18212E` / `#0E131B`). Cinq lignes de `globals.css`, rien d'autre.

**Tentative 2 — dans le répertoire de travail, non committée.**
Approche différente et plus fine du même problème : au lieu d'assombrir tout le site, elle introduit

- deux rôles narratifs — `--bg-section-strong` (alias de `surface-2`) et `--bg-section-tint` (`surface-1` infusé à 12 % d'accent) ;
- `--surface-raised` ;
- **`.theme-inverse`** : redéclare les ~30 variables Midnight Navy sur un sous-arbre, dupliquées plutôt que référencées à `.dark`, pour que l'îlot reste navy quel que soit le thème actif. Tous les utilitaires `bg-`/`text-`/`border-` déjà en place en héritent sans qu'aucune classe ne change.

Les six composants ne font qu'appliquer ce vocabulaire (une ou deux classes chacun) : `theme-inverse` sur UseCases et FinalCTA — deux ruptures inverses volontaires, la preuve puis le contact — et une redistribution des paliers entre les deux.

**Vérifié :** `--surface-raised` est bien défini (`globals.css:96` et `:234`), les trois composants qui l'utilisent ne resteront pas sans fond.
**Non vérifié :** le rendu. Je n'ai jugé que la cohérence du code, jamais l'apparence des six sections.

**Décision en attente de Benji** : garder, ajuster ou annuler. Vu qu'une première tentative a déjà été annulée, ne commite pas celle-ci sans son accord explicite.

---

## 3. Ce que contiennent mes deux commits

### Étude de cas — trois colonnes → flux par public

Le bloc « Le problème / Mon action / Ce qui a changé » présentait une **chaîne causale dans la forme d'un comparatif**. Trois coûts :

- le regard remontait deux fois (on lit une colonne, on revient en haut) ;
- « correction manuelle » et « correction automatisée » sont la même chose avant/après, et la grille les plaçait aux deux extrémités de l'écran avec une colonne étrangère au milieu ;
- « Mon action », seule des trois à être le travail vendu, avait le même budget visuel que le contexte, qui appartient au client.

**Le contenu ne compte pas trois parties mais deux personnes** — `FEATURED_CASE.metrics` les nomme déjà (« côté étudiant », « côté professeur »). Une ligne par public, lue de gauche à droite, avec une montée de valeur sourdine → contraste → accent qui porte le sens de lecture sans flèche.

Données dans `VOIX` (`UseCases.tsx`). Contenu **redistribué, pas réécrit** : chaque phrase vient du bloc précédent. Le résultat final reste lu dans `metrics` — source unique.

### Bandeau cookies

Surface d'accent, encre sombre, via la **paire** `--accent-primary` / `--on-accent`. Ne remplace jamais par un or en dur : en thème ivoire, `--accent-primary` vaut `#6B5430` et du texte navy y serait illisible.

Hiérarchie ramenée à **deux niveaux** : « Tout refuser » et « Tout accepter » strictement égaux (44 px, filet 2 px, même respiration), « Paramétrer » réduit à un lien. **Ce n'est pas un choix esthétique** : la CNIL exige que refuser soit aussi simple qu'accepter et sanctionne le motif inverse depuis 2021.

Contrastes mesurés : 8,09:1 (texte), 9,59:1 (action dominante).

### Consentement (`src/app/constants/consent.ts`, nouveau)

Deux points étaient **déjà corrects** : aucune case pré-cochée, gtag jamais injecté avant acceptation.

Le manque était dans le stockage : `{ essential, analytics, marketing }` sans date, sans preuve, sans version — donc un choix éternel. Le module ajoute les trois et devient **le seul endroit où l'enregistrement s'écrit et se relit**. Séparer les lecteurs aurait laissé gtag se recharger sur un consentement périmé.

`readConsent()` renvoie `null` si le choix est absent, illisible, d'une version périmée ou vieux de plus de six mois. Les quatre cas se traitent pareil : il faut redemander.

➡️ **Incrémenter `CONSENT_VERSION` dès qu'une finalité change** (outil de mesure ajouté ou remplacé, nouvelle catégorie, nouveau destinataire).

---

## 4. `hero-test/` — bac à sable, hors production

Prototype de hero « affiche » (photo plein cadre, texte à gauche, travelling au défilement). **Volontairement invisible de git** : exclu via `.git/info/exclude`, décision de Benji. Ne le commite pas sans qu'il le redemande.

- **Vue :** `http://localhost:5185/hero-test/` — ajouter `?motion=1` pour forcer l'animation (voir Pièges).
- **Seconde entrée Vite**, non déclarée dans `rollupOptions.input` : elle ne part pas au build, par construction. Aucun fichier de production n'est modifié pour elle.
- Les sections y sont **importées**, pas recopiées : `HomeHeroTest.tsx` est une copie de `Home.tsx` avec le hero remplacé.
- `public/hero-test/` contient 1,5 Mo d'AVIF, également exclus. ⚠️ `public/` est copié dans `dist/` : s'ils étaient commités et poussés, ils partiraient en ligne.

Sauvegarde hors dépôt : `Bureau\flowdee-hero-essai\` et `Bureau\hero-flowdee-essai.html` (version autonome, un fichier).

---

## 5. Pièges

**Tailwind ne scanne pas `hero-test/`.** Toute classe à valeur arbitraire utilisée uniquement là (`mt-[1.9rem]`, `leading-[1.12]`) n'est **jamais générée** — et échoue en silence. Les marges y valaient 0 sans que rien ne le signale. Dans `hero-test/`, écris du vrai CSS. Dans `src/`, les arbitraires fonctionnent.

**`rounded-[--radius-button]` n'est pas valide.** Il faut `rounded-[var(--radius-button)]`. La première forme donne un rayon de 0, silencieusement.

**`:root` n'est pas `<body>`.** `App.tsx` pose `.dark` sur `documentElement`. Une règle `:root:not(.dark)` écrite en supposant la classe sur `<body>` matche dans les deux thèmes.

**Un canvas est un élément remplacé.** `position:absolute; inset:0` ne l'étire pas : il garde sa taille intrinsèque de 300×150. Il faut `width/height: 100%`.

**`gsap.context(fn, el)` restreint les sélecteurs aux descendants de `el`.** Un élément déplacé hors de ce sous-arbre cesse d'être ciblé par une chaîne CSS, sans erreur.

**GSAP fige les valeurs de départ d'un tween à sa création** et les réinvalide à chaque rafraîchissement de ScrollTrigger. Pour un état piloté par le défilement, calcule depuis la seule progression (`onUpdate`) plutôt que par tween.

**`pinType: 'fixed'` et non `'transform'`.** Un ancêtre transformé casse `position: sticky` chez ses descendants — le rail des Livrables en dépend, c'est documenté dans `Home.tsx`.

**Une media query n'ajoute aucune spécificité.** Un override mobile écrit `.x { }` perd contre un `:root.dark .x { }` défini plus haut.

**Le poste de développement demande `prefers-reduced-motion: reduce`.** Aucune animation ne s'y joue — ni celles du site, ni celles d'un prototype. Vérifie ce réglage avant de conclure qu'un effet ne marche pas.

**Le panneau navigateur intégré bride `requestAnimationFrame` à 1 Hz**, et `scrollTo()` depuis le contexte d'injection ne déclenche pas les écouteurs de scroll de la page. Toute mesure d'animation ou de ScrollTrigger doit se faire dans un vrai navigateur, avec un vrai défilement.

**Pas de `tsconfig.json`** : `npx tsc --noEmit` échoue, c'est normal. Le contrôle réel = le serveur de dev ou `npx vite build`. Un composant cassé renvoie un **HTTP 500 sur son module** sans rien afficher en console — `curl http://localhost:5185/<chemin>.tsx` est le moyen le plus rapide de le voir.

---

## 6. Ce qui reste ouvert

1. **Les sept fichiers** — décision de Benji (§2). Une première tentative a déjà été annulée.
2. **Le hero « affiche »** — jamais intégré, et à ne pas intégrer en l'état : il lui manque un **fond nettoyé derrière la silhouette** (inpainting) sans lequel le travelling dédouble le sujet. Et surtout une destination : le mouvement n'a de valeur que s'il révèle quelque chose, ce qui rejoint **F-02** (« Voir un exemple de livrable » ne montre rien) — un problème de contenu, pas de code.
3. **`CONSENT_VERSION`** à incrémenter au prochain changement de finalité.
4. Les chantiers de `docs/2026-08-18-reste-a-faire-diagnostic-flowdee.md` restent valides : réglages Stripe (F-05), chantier de preuve (F-02, F-04, F-06, F-07), autorisation du logo Karma Com (F-12).

## 7. Conventions observées

- Commits en français, forme `type(portée): sujet`, corps expliquant **pourquoi** et pas seulement quoi.
- Commentaires de code en français, denses, qui documentent la **raison** d'un choix et les impasses écartées.
- Chiffres et libellés d'offre : `constants/offer.ts` exclusivement, garde-fou `pnpm run check:offer` branché sur le build.
- Valider en local avec **`pnpm run build:prerender`**, pas `pnpm build` : la CI passe par un prérendu Playwright.
- Ne jamais pousser sans demande explicite.
