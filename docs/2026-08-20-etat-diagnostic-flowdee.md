# État du diagnostic externe — flowdee.fr, 2026-08-20

> Source de vérité des arbitrages : **`Diagnostic externe de flowdee.md`** (hors dépôt,
> dossier `Bureau/Flowdee/Flowdee diag/`). Benji l'a tranché explicitement : c'est ce
> document qui fait foi, pas le compte rendu de réunion ni les commentaires du code.
> C'est un JSON dans une clôture markdown — il faut le parser, pas le grepper.
>
> **Chaque statut ci-dessous est mesuré**, jamais déduit du code source. Voir §4 : deux
> constats avaient été déclarés non conformes à tort pour cette raison exacte.

---

## 1. Ce document corrige `2026-08-18-reste-a-faire-diagnostic-flowdee.md`

Le document du 18/08 annonce les rangs 1, 2, 3 et 6 « **faits, déployés en prod** ».
Vérification faite le 20/08, trois de ces constats ne remplissent pas leur critère :

| Constat | Déclaré le 18/08 | Mesuré le 20/08 |
|---|---|---|
| **F-16** | fait | les 4 liens `/etudes-de-cas/:slug` étaient **sans barre finale** → 307 à chaque clic. Le volet sitemap, lui, était bien fait. Corrigé aujourd'hui (`fad9189`). |
| **F-17** | fait | les routes sont bien passées en `lazy`, **mais `HomePage` non** : une page légale charge toujours l'entrée complète. Critère non rempli. Voir §3. |
| **F-19** | fait | **44 textes rendus sous 12 px**, dont des porteurs de sens (accroche du hero à 11 px, étiquettes du comparateur à 10,5 px). Critère non rempli. |

En revanche F-01, F-13, F-14 et F-20 sont bien conformes, vérifiés à la mesure.

**À retenir** : un statut « fait » sans critère revérifié ne vaut rien. C'est ce qui a
motivé le garde-fou du §2.

---

## 2. État des 20 constats

**10 réglés · 3 partiels · 6 ouverts · 1 hors de portée**

### Réglés (mesurés)

| | Constat | Preuve |
|---|---|---|
| F-01 | bouton tarifs inerte | `ctaPrimaryAction: 'audit'` → `openAuditLink()`, `Services.tsx:465` et `:484`. C'est un `<button>`, le clavier suit. |
| F-08 | « nous » / « je » | 2 occurrences de « Notre action » réintroduites par `040d09c` repassées en « Mon action » (`331806a`). Plus aucun pluriel hors pages légales. |
| F-09 | formulaire muet sur le RGPD | ligne visible sans dépli (`FinalCTA.tsx:344`) ; Web3Forms nommé comme sous-traitant (`Privacy.tsx:178`). |
| F-10 | « Choisir un créneau » | enregistre le lead puis émet `flowdee:open-calendar`. |
| F-11 | différenciateur enterré | section IA remise en position 2 (`a7897cd`). **Mesuré : la phrase distinctive se lit à 11 % de la hauteur de page**, critère = premier tiers. Elle n'existait qu'à 81 %, dans un accordéon replié. |
| F-13 | noms accessibles en anglais | 29 `aria-label` rendus, **zéro en anglais**. |
| F-14 | violations WCAG | **axe-core, 9 pages, wcag2a/2aa/21a/21aa/22aa → 0 violation** (`8a8c30d`). |
| F-15 | refus moins proéminent | à 360 et 390 px : trois boutons à 12 px, aucun recouvert par le widget d'accessibilité. |
| F-16 | redirections 307 | 4 liens passés en barre finale (`fad9189`). Vérifié dans les deux sens : React Router matche `/etudes-de-cas/x/`, et le prérendu sert le fichier sans redirection. |
| F-20 | noms accessibles collés | numéros de FAQ en `aria-hidden`, onglets du cas porteurs d'un `aria-label` à séparateur. |

### Partiels

- **F-03** — ⏳ **volet CTA réglé le 20/08** (`627cfbd`). Mesuré en production : le CTA
  est entièrement visible au-dessus du pli dans les deux formats du critère —
  360 × 640 (pli 534, CTA 456→504, marge 30 px) et 390 × 844 (marge 135 px). Le
  bandeau est passé de **166 à 106 px**, ses trois choix sur une ligne, comme le
  demandait la correction. F-15 revérifié : 12 px, 44 px de haut, tous cliquables.
  **Reste la moitié du critère** : le prix, absent du hero. C'est une décision
  commerciale, pas une correction de mise en page.
  ➡️ Dernier P1 encore à portée du code. Deux voies au choix dans le document : barre
  compacte à trois choix sur une ligne, ou bandeau retardé au premier défilement.
  Recommandation : la barre compacte — retarder ressemble à une esquive. Mais ça touche
  un composant construit sur la contrainte CNIL (refus aussi proéminent que
  l'acceptation, contrastes mesurés à 8,09:1 et 9,59:1) : **ne pas casser cet équilibre**.
- **F-12** — l'intitulé est exactement celui que le constat recommande (« Ils m'ont fait
  confiance »). Reste l'accord écrit avec KCS sur l'usage du logo Karma Com Solidarité en
  contexte commercial. Hors dépôt.
- **F-18** — og-image à 45 Ko, sous le plafond de 150 Ko. Mais la négociation se fait en
  **WebP, pas en AVIF** ; le critère demande de l'AVIF. Pillow est disponible côté Python
  si on veut générer les variantes.

### Ouverts

| Constat | Ce qu'il faut |
|---|---|
| **F-02** | Aucune page d'exemple de livrable n'existe — le commentaire d'`offer.ts:113` le dit lui-même, le bouton mène à l'ancre `#deliverables`. Il faut publier un extrait réel et anonymisé, sans mur à l'e-mail. |
| **F-04** | Les `metrics` des trois cas sont qualitatifs. Il faut un chiffre + sa base + sa période, ou une phrase explicite disant pourquoi il n'est pas publiable. |
| **F-06** | Voir §5 — brief complet, en attente de Benji. |
| **F-07** | « CEO, Hub LMS » : toujours anonyme. Un témoignage nommé, ou le retirer. |
| **F-17** | Voir §3 — mesuré, mauvais échange en l'état. |
| **Dette CI** | ✅ **réglée le 20/08** (`91cc934`) — les quatre actions GitHub sont passées en runtime node24, versions lues dans leur `action.yml`. Zéro annotation Node 20 sur le run de déploiement, et la CI tourne désormais avec la même chaîne d'outils que la machine de développement (pnpm 11, Node 24, wrangler 4.96.0 constaté dans le journal). |
| **F-19** | 44 textes sous 12 px. Arbitrage typographique : lesquels sont porteurs de sens. Le constat cite nommément les attributions, les étiquettes de comparateur et les métadonnées d'offre. |

### Hors de portée d'ici

- **F-05** — configuration du tableau de bord Stripe (nom du produit, collecte
  d'acceptation des CGV). Détaillé dans le document du 18/08, §1, toujours valide.

---

## 3. Le garde-fou : `pnpm run check:diagnostic`

`scripts/check-diagnostic.mjs`, branché **après le prérendu** dans `build:prerender` — il
contrôle donc le HTML réellement livré. Même rôle que `check-offer.mjs` pour les prix.

**Actifs : F-08, F-13, F-14, F-16, F-18, F-20.**

**Inactifs mais écrits**, avec la raison en clair dans le fichier — les activer se réduit à
passer `actif: true` :
- **F-06** attend une vraie capture (seul Benji peut la fournir) ;
- **F-19** attend son arbitrage typographique.

Les brancher aujourd'hui casserait le build sans rien apprendre à personne. Les constats
hors de portée d'un script — F-02, F-04, F-05, F-07 — n'y figurent pas du tout : rester
silencieux vaut mieux que de laisser croire qu'ils sont couverts.

### F-17 : mesuré, puis écarté

Toutes les routes sont déjà en `lazy` **sauf `HomePage`** (import statique dans `App.tsx`),
d'où une entrée de 736 Ko que les pages légales chargent entièrement.

Expérience faite : rendre `HomePage` paresseuse donne **entrée 508 Ko + chunk Home 204 Ko**.
Une page légale y gagnerait 31 %, mais deux choses tuent l'affaire :

1. **69 % du poids est la coquille partagée** — nav, footer, décor, modales, motion, GSAP —
   chargée sur toutes les pages quoi qu'on fasse. Le critère serait rempli à la lettre
   pendant que le vrai poids reste.
2. `src/main.tsx` utilise **`createRoot` et non `hydrateRoot`** : le prérendu est jeté et
   remplacé par un rendu client. Avec Home en `lazy` et `Suspense fallback={null}`,
   l'accueil clignoterait en blanc le temps du chunk.

Échanger un défaut visible sur la page commerciale contre un gain que le document
lui-même classe P3 « confort et hygiène, aucun effet mesuré aujourd'hui » : non.
**Le vrai levier serait d'alléger les 508 Ko de coquille**, qui pèsent sur *toutes* les
pages — ce que F-17 ne demande pas. Le faire proprement passe par `hydrateRoot`, avec des
risques de désynchronisation d'hydratation (thème, langue) : chantier réel, pas config.

---

## 4. Pourquoi le garde-fou ouvre un navigateur au lieu de grepper

Point le plus important de ce document pour qui reprend.

Analyser les sources produit des **faux positifs qui feraient échouer le build sur des
problèmes inexistants**. Deux constats ont été annoncés non conformes à tort, puis
corrigés après mesure :

- **F-20** — les numéros de la FAQ **sont** en `aria-hidden`. Lire `textContent` (ou
  grepper le JSX) les voit quand même ; le nom accessible, non.
- **F-13** — l'`aria-label` anglais « Reset to default » existe bien dans
  `Editable/Text.tsx`, mais **ce composant n'est jamais monté sur le site public**.

Et l'inverse s'est produit aussi : un grep sur `to="/[a-z-]+"` ne couvrait qu'un segment de
chemin et **ratait les liens d'études de cas** que le contrôle DOM a trouvés du premier coup.

Le critère d'Adel porte sur ce que le visiteur reçoit. On mesure le DOM servi.

Deux détails techniques qui coûteraient du temps à retrouver :
- la CSP du site interdit les scripts en ligne, ce qui bloque l'injection d'axe-core → le
  contexte Playwright est ouvert en `bypassCSP` pour l'instrumentation seulement ;
- `page.evaluate` traite une chaîne comme une **expression** : passer `"() => {...}"` rend
  un objet fonction non sérialisable et le relevé revient `undefined` sans erreur. Il faut
  l'invoquer : `` page.evaluate(`(${FN})()`) ``.

---

## 5. F-06 — brief prêt, en attente de Benji

Emplacement : section « Résultats observés sur des cas concrets », **première carte**
(`01 · APPLICATION WEB SAAS`, « Parcours d'activation simplifié »), plus la page
`/etudes-de-cas/optimisation-onboarding-saas/`. Un seul fichier couvre les deux.

Le visuel actuel est **une capture d'une partie de Tetris** chargée depuis
`images.unsplash.com` — seul domaine tiers appelé par l'accueil. La carte 02 juste en
dessous montre, elle, une vraie interface : le contraste est visible à l'œil nu.

**Format : 1600 × 1000 (ratio 1,60)** — celui des deux autres cartes (1644 × 1027), pour
que la section reste homogène. Les deux cadres rognent modérément : ≈16 % sur les côtés
pour la carte (`aspect-[4/3]`, `object-top`), ≈10 % en haut/bas pour la page dédiée
(`aspect-[16/9]`, centré). Garder l'essentiel au centre.

Contenu : une capture d'onboarding ou d'écran de templates — c'est ce que le cas revendique.
Anonymisation : pas de nom ni logo client, pas de données réelles, **mais la mise en page
doit rester lisible** — flouter les données, pas la structure.

Un seul fichier JPEG ou PNG suffit : le WebP se génère avec Pillow, les fichiers vont dans
`src/assets/`, l'URL Unsplash est remplacée par des imports, et le contrôle F-06 passe en actif.

**Repli prévu par le constat lui-même**, faisable sans Benji : « à défaut, un schéma du
parcours avant/après, qui prouve la réflexion ». En SVG, dans la grammaire des trois
schémas de l'audit — thème-aware, quelques Ko, aucun domaine tiers. Moins fort qu'une vraie
capture, nettement mieux qu'un Tetris.

---

## 6. L'épisode Codex — ce qui a été réparé, ce qui reste

Trois commits d'un autre agent (`864c339`, `040d09c`, `9b65670`) ont apporté des
changements demandés **et** emporté au passage des décisions et des garde-fous écrits.

Réparé :
- la section IA n'était pas déplacée mais **retirée** (`AIWorkflowSection` restait le seul
  composant orphelin du projet) → remise en position 2 ;
- l'avertissement interdisant d'envelopper les Livrables dans un `ScrollReveal` avait été
  effacé → réécrit, avec le mécanisme en clair ;
- F-08 régressé → corrigé.

**Laissé tel quel, sur décision de Benji : `StepPath`.** Le serpentin est devenu une droite
(`C …` remplacé par `L …`), ce qui laisse `dir`, `c1`, `c2` calculés et jamais utilisés, la
prop `amplitude` inerte, et le nom du fichier + sa documentation + le commentaire ligne 77
qui parlent toujours d'un « fil qui serpente ». **Ne pas y toucher sans son accord.**

`CLAUDE.md` est non suivi et vient de Codex : il n'a pas été commité à sa place.

⚠️ Un agent interrogé sur son propre travail rapporte son **intention**, pas son diff.
Celui-ci a omis les quatre dégâts ci-dessus et a présenté comme « en cours » du travail
qui ne venait pas de lui — il lit le répertoire de travail sans pouvoir distinguer ses
modifications de celles d'un autre. Le diff tranche, pas le récit.

---

## 7. Ce qui attend une décision de Benji

1. **F-03 à 360 px** — barre compacte ou bandeau retardé. Dernier P1 à portée du code.
2. **F-06** — la capture, ou le feu vert pour le schéma SVG de repli.
3. **F-19** — quels textes sous 12 px sont porteurs de sens. Liste par section disponible
   sur demande.
4. **F-04, F-02, F-07** — le chantier de preuve, rang 4 de l'ordre recommandé, désigné par
   le document comme *« celui qui change le taux de contact »*. Entièrement ouvert.
5. **F-05** — les deux réglages Stripe du document du 18/08.
6. **Ce que Codex avait pour consigne** — toujours inconnu. Sa réponse a résumé ses
   changements au lieu de citer les demandes.

**Rien n'est poussé.** Branche `design/bandeau-cookies-et-flux-etude-de-cas`, en avance sur
`origin`, et `main` (donc la production) n'a rien de tout ceci.

---

## 8. Le chantier de preuve, en détail (rang 4)

> Différé sur décision de Benji le 2026-08-20. Cette section existe pour qu'on
> puisse le reprendre sans refaire l'analyse.

Quatre constats — **F-02, F-04, F-06, F-07** — tous sur l'axe **crédibilité**, et
tous de la même forme : **le site affirme quelque chose et n'en montre jamais la
preuve.** Adel le désigne d'une phrase : *« C'est le plus long et c'est celui qui
change le taux de contact. »*

| | Ce qui manque | Effort |
|---|---|---|
| **F-02** | « Voir un exemple de livrable » ne montre aucun livrable — le bouton fait défiler vers une liste à puces qui le *décrit* | M |
| **F-04** | Trois études de cas, aucun résultat chiffré | M |
| **F-06** | Le cas SaaS illustré par une photo de banque d'images (voir §5) | S |
| **F-07** | Un témoignage unique, anonyme, en 11 px | S |

### Pourquoi F-04 est le cœur

Adel l'appelle **« la contradiction la plus coûteuse du site »**. La page affirme
**trois fois** la mesurabilité — « Décisions guidées par des KPIs mesurables »,
« IMPACT MESURABLE — des résultats mesurables et vérifiables sur vos KPIs », et
le titre de section « Résultats observés sur des cas concrets ». Et les trois cas
ne mesurent rien : ils décrivent des actions et des livraisons. La seule quantité
du lot (« tunnel ramené de 5 pages à un checkout unique ») décrit un périmètre,
pas un résultat.

*« Un acheteur attentif, qui est précisément la cible d'un audit de conversion,
le voit. Un seul chiffre réel, même modeste et bien borné, vaut plus que les
trois cas actuels réunis. »*

### Comment les quatre s'aggravent entre eux

- **F-06 aggrave F-04** — le constat le dit explicitement. Dans une section qui
  prétend montrer des cas concrets, la photo de stock est le signal le plus
  rapide qu'il n'y a peut-être rien derrière : *« le lecteur ne se dit pas
  "jolie photo", il se dit "il n'a pas d'écran à montrer" »*.
- **F-02 est le bouton du visiteur qui doute**, celui qui veut vérifier avant de
  payer 890 €. Il promet une preuve et rend une promesse supplémentaire :
  *« l'acheteur doit croire sur parole exactement là où il cherchait à arrêter
  de croire »*.
- **F-07 peut coûter plus qu'il ne rapporte** : un témoignage non attribuable se
  lit comme un témoignage fabriqué. Et avec quatre logos seulement, « certaines
  références sous NDA » se lit comme une justification, pas une réassurance.

### ⚠️ Deux des quatre ne sont PAS bloqués

Le point à ne pas perdre : ce chantier n'attend aucun client pour commencer.

- **F-04** prévoit un repli explicite : *« à défaut de chiffre client
  communicable, dire explicitement ce qui a été mesuré et pourquoi le chiffre
  n'est pas publiable, ce qui reste plus crédible que le silence. »* Adel donne
  même la formulation de secours : *« Trois variantes testées sur 5
  utilisateurs, celle à une page l'emporte sur le temps d'achèvement. »*
- **F-07** aussi : *« Si aucune autorisation n'est obtenue, retirer le témoignage
  plutôt que de le garder anonyme. »* Une décision, pas une négociation.

**Ce chantier n'est pas bloqué, il n'est pas commencé.**

### Répartition du travail

**Seul Benji peut fournir** : les chiffres réels, ou la phrase disant pourquoi ils
ne le sont pas · l'autorisation nominative d'un client, ou la décision de retirer
le témoignage · la capture pour F-06 · les pages du rapport pour F-02.

**Faisable par un agent** : la page `/exemple-de-livrable/` avec sa route, son
prérendu et son balisage (⚠️ sans mur à l'e-mail — le constat insiste : « la
friction ici coûte plus que le lead qu'elle capture, parce que le visiteur est
encore en phase de doute ») · l'anonymisation et l'intégration des captures ·
les schémas de repli en SVG · la reformulation des `metrics` de `caseStudies.ts`
dès que la matière ou la décision existe · l'activation des contrôles F-06 et
F-19 du garde-fou dès qu'ils passent.

### Point d'entrée recommandé

**F-04 en version repli.** Aucune dépendance externe, et c'est la contradiction
que l'acheteur cible voit. Méthode proposée : préparer les trois formulations à
partir de ce que `caseStudies.ts` contient déjà, puis les faire corriger par
Benji — plus rapide de le faire réagir à un brouillon que d'écrire depuis rien.
