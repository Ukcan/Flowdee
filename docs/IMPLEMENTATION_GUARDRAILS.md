# 🛡️ Implementation Guardrails — Flowdee

> Garde-fous pour modifier le projet **sans rien casser**.
> À lire avant toute intervention. Source de vérité : ce qui est réellement importé dans `src/app/App.tsx`.

---

## 1. ✅ Fichiers ACTIFS réellement rendus (via `App.tsx`)

> Attention au pattern « wrapper » : plusieurs sections sont importées via un fichier `Section/*` qui n'est **qu'un re-export**. La logique réelle est ailleurs. **Toujours éditer l'implémentation réelle**, pas le wrapper.

| Section / élément | Importé dans App.tsx | ⭐ Implémentation RÉELLE à éditer |
|---|---|---|
| Navigation | `components/Nav/Header.tsx` | **`components/Navigation.tsx`** (re-export `HeaderNav`) |
| Hero | `components/Section/Hero.tsx` | **`components/Section/Hero.tsx`** (réel) |
| TrustedClients (marquee) | `components/Section/TrustedClients.tsx` | **`components/TrustedClients.tsx`** (re-export) |
| Problems | `components/Section/Problems.tsx` | **`components/ProblemCards.tsx`** (re-export) |
| Services (pricing) | `components/Section/Services.tsx` | **`components/Section/Services.tsx`** (réel) |
| CaseStudies | `components/Section/CaseStudies.tsx` | **`components/UseCases.tsx`** (re-export) |
| Approach | `components/Section/Approach.tsx` | **`components/Section/Approach.tsx`** (réel) |
| FAQ | `components/Section/FAQ.tsx` | **`components/Section/FAQ.tsx`** (réel) |
| FinalCTA (contact) | `components/Section/FinalCTA.tsx` | **`components/FinalCTA.tsx`** (re-export) |
| Footer | `components/Section/Footer.tsx` | **`components/Section/Footer.tsx`** (réel) |
| Modale CGV | `components/Section/CGV.tsx` | **`components/Section/CGV.tsx`** (réel, conditionnel) |
| Modale Confidentialité | `components/Section/Privacy.tsx` | **`components/Section/Privacy.tsx`** (réel, conditionnel) |

**Overlays / globaux actifs :**
- `components/Button/ScrollToTop.tsx` → impl. réelle **`components/ScrollToTop.tsx`**
- `components/Consent/CookieBanner.tsx`
- `components/Indicator/ScrollBar.tsx` + `components/Indicator/ScrollMouse.tsx`
- `components/Decor/KeylinesParallaxFlow.tsx` + `components/Decor/ParticleNetwork.tsx`
- `components/CalendarModal.tsx` + `components/ThankYouModal.tsx`
- `components/ui/sonner.tsx` (Toaster)

**Données / styles actifs :**
- `src/app/constants/links.ts`, `src/app/constants/ctaCopy.ts`
- `src/app/i18n/translations.ts` (textes FR/EN)
- `src/app/contexts/LanguageContext.tsx`, `EditableContentContext.tsx`
- `src/styles/index.css`, `src/styles/globals.css` ⭐

---

## 2. 🗄️ Fichiers LEGACY — archivés dans `src/_archive/`

> Ces fichiers existaient hors de l'arbre de rendu (jamais importés, directement ou indirectement, depuis `App.tsx`). Conformément à la Zero Deletion Policy, ils ont été **déplacés** (pas supprimés) sous `src/_archive/`, en conservant leur chemin relatif d'origine (ex. `components/Footer.tsx` → `src/_archive/components/Footer.tsx`) pour que leurs imports internes entre eux restent valides. 91 fichiers concernés le 2026-08-15 : les doublons (`HeroSection.tsx`, `HeroFlowdee.tsx`, `Services.tsx`, `Footer.tsx`, `FAQ.tsx`, `About.tsx`+`Section/About.tsx`, `AIGuardrails.tsx`+`Section/AIGuardrails.tsx`), les composants désactivés (`CTA/Sticky.tsx`, `Decor/Keylines.tsx`, `Editable/ToggleButton.tsx`), les cartes démo (`CalendarCard`, `GoogleMeetCard`, `SlackCard`, `NewsfeedCard`, `ContactCard`, `FileDropCard`, `ProjectCard`), `CustomCursor.tsx`, `DarkModeToggle.tsx`, les 5 barrels `index.ts`, ~44 primitifs `ui/*` shadcn non utilisés, `Card/CaseStudy.tsx`+`Friction.tsx`+`Pricing.tsx`, et les 18 fichiers Figma codegen de `src/app/imports/` non référencés.
>
> **Correction** : `components/TechnicalLabel.tsx` était listé ici par erreur — il est en réalité utilisé par 6 fichiers actifs (`TrustedClients.tsx`, `ProblemCards.tsx`, `UseCases.tsx`, `FinalCTA.tsx`, `Section/Approach.tsx`, `Section/FAQ.tsx`). Il reste dans `components/`, ne pas l'archiver.
>
> **Nuance** : `src/styles/default_theme.css` reste dans `src/styles/` (pas archivé) — il est réellement `@import`-é par `index.css` et fait partie du bundle CSS chargé, même si la plupart de ses tokens shadcn sont ensuite écrasés par `globals.css`.

> ⚠️ Avant de classer un fichier « legacy », **vérifier le graphe d'imports réel depuis `App.tsx`** (pas juste des `grep` ponctuels) : un fichier peut sembler mort mais être importé par un fichier actif pour une seule valeur (cf. `TechnicalLabel.tsx`, ou `imports/svg-sg0ezcs3e9.ts` utilisé par `Navigation.tsx`).

---

## 3. 🔁 Composants PARTAGÉS à préserver (ne pas dupliquer, ne pas réécrire en dur)

- **Boutons** : `ButtonPrimary` / `ButtonSecondary` (via `Button/CTA.tsx` → injecte les **blobs gooey**).
  - ⚠️ La classe `.button-primary` est **transparente** : le doré vient des `.cta-blobs`. Ne jamais utiliser la classe brute sans le composant.
- **Cartes** : `Card/Pricing`, `Card/CaseStudy`, `Card/Feature`, `Card/Friction` + classe `.card-surface`
- **Décor / fonds** : `Decor/ParticleNetwork`, `Decor/ParallaxHeading`, classes `.section-aurora` / `.section-grid`
- **Modales** : `CalendarModal` (event `flowdee:open-calendar` + `detail.context`), `ThankYouModal` (query `?payment=success`)
- **Réservation/paiement** : helpers et constantes de `constants/links.ts` (`openCalendar()`, `CALENDAR_EMBED_URL`, `AUDIT_LINK`)
- **Typographie** : classes `.heading-display`, `.heading-1`, `.heading-3`, `.body`, `.label-upper`
- **i18n** : `useTranslation()` + `translations.ts`
- **Édition de contenu** : `EditableText`
- **UI primitifs** : `components/ui/*` (Accordion, Dialog, Tabs, etc.)

---

## 4. 🔥 Fichiers à HAUT RISQUE (modifier avec extrême prudence)

| Fichier | Pourquoi | Précaution |
|---|---|---|
| `src/styles/globals.css` | Tokens + `.button-*` + `.cta-blob*` + `.section-aurora` + `.marquee-*` | Impact global ; tester tout le site après |
| `vite.config.ts` | Plugin imports versionnés Figma + resolver assets | Une erreur = build cassé |
| `pnpm-workspace.yaml` | Un linter y réinjecte un bloc `allowBuilds` invalide | **Vérifier qu'il ne contient QUE `onlyBuiltDependencies`** avant push (sinon build Cloudflare échoue) |
| `index.html` | `og:url`, `canonical`, `og:image` en absolu (domaine workers.dev) | Mettre à jour lors du passage au domaine IONOS |
| `src/app/App.tsx` | Orchestration : ordre sections, modals, fonds, état thème | Modifs structurelles uniquement, testées |
| `src/app/constants/links.ts` | Liens Stripe / Calendar / embed | Vérifier le bon domaine + mode Live Stripe |

---

## 5. 💻 Commandes Build / Dev

> Gestionnaire : **pnpm**. Sous Windows, lancer via le binaire local si `pnpm` capricieux.

```bash
# Dev (serveur local)
node_modules\.bin\vite.cmd            # ou : pnpm dev

# Aperçu interne (Claude Preview) — config .claude/launch.json, projet "flowdee", port 5175

# Build de production
node_modules\.bin\vite.cmd build      # sortie : dist/

# Install dépendances
pnpm install
```

**Cloudflare (auto-déploiement via GitHub Actions)**
- Déclencheur : **chaque `git push` sur `main`** → `.github/workflows/deploy.yml`
- Build command réelle : **`pnpm run build:prerender`** (⚠️ **pas** `pnpm build` : `vite build` seul saute le prérendu Playwright de `scripts/prerender.mjs`). Valider en local avec la même commande.
- Déploiement : `cloudflare/wrangler-action` → `wrangler deploy` (secret `CLOUDFLARE_API_TOKEN`)
- Output directory : `dist` · Node 22
- Domaine actuel : **https://flowdee.fr** — suivi des déploiements : `gh run list`

---

## 6. 📋 Règles de modification — ticket par ticket

1. **1 ticket = 1 objectif = 1 commit** (atomique, message clair).
2. **Localiser le bon fichier** : confirmer l'import dans `App.tsx` → remonter la chaîne de re-export → éditer l'implémentation **réelle** (cf. §1).
3. **Travailler par couches, du plus sûr au plus risqué** :
   1. Contenu (`translations.ts`, `ctaCopy.ts`, texte inline)
   2. Style local de la section (classes Tailwind dans le composant)
   3. Tokens globaux (`globals.css`) — en dernier recours
4. **Respecter le système** : variables CSS (`var(--accent-primary)`, `text-accent-primary`) plutôt que des hex en dur → compatibilité thème Navy/Ivoire.
5. **Passer par les composants partagés** (boutons, cartes, typo) — ne pas réécrire de styles concurrents.
6. **Ne pas toucher** aux fichiers legacy (§2) ni aux fichiers haut risque (§4) sans raison explicite.
7. **Aucune suppression** sans validation (Zero Deletion Policy).
8. **Accessibilité & responsive** : conserver `aria-*`, respecter `prefers-reduced-motion`, tester mobile.

---

## 7. ✅ Checklist QA avant chaque commit

- [ ] J'ai modifié le **bon fichier** (implémentation réelle, pas un wrapper legacy).
- [ ] `node_modules\.bin\vite.cmd build` **passe sans erreur**.
- [ ] Rendu vérifié dans l'aperçu (desktop **et** mobile si layout touché).
- [ ] Aucune couleur en dur qui devrait être un token (`var(--…)`).
- [ ] Les **deux thèmes** (Navy par défaut + Ivoire) restent corrects si j'ai touché aux couleurs.
- [ ] `prefers-reduced-motion` respecté si j'ai touché à une animation.
- [ ] `pnpm-workspace.yaml` contient **uniquement** `onlyBuiltDependencies` (pas de bloc `allowBuilds` parasite).
- [ ] Pas de fichier legacy modifié par erreur.
- [ ] Message de commit explicite + co-author.
- [ ] Après push : **vérifier le déploiement Cloudflare en vert** (Deployments).
- [ ] Si domaine/URL concerné : `og:url` / `canonical` / `og:image` / retour Stripe cohérents.

---

## CaseStudies — règle pour les métriques vérifiées

Tant que les chiffres ne sont pas vérifiés, utiliser le label :
`IMPACT OBSERVÉ`

Revenir au label :
`RÉSULTATS MESURÉS`

uniquement si chaque métrique affichée dispose de ces éléments :

- métrique avant ;
- métrique après ;
- période de mesure ;
- source de la donnée ;
- contexte du projet ;
- niveau de confidentialité validé.

**Interdiction :**
- Ne jamais afficher de chiffre placeholder comme résultat réel.
- Ne jamais présenter une métrique comme « mesurée » sans source vérifiable.
- Ne jamais inventer de pourcentage, revenu, délai gagné ou taux de conversion.
- Si une donnée est qualitative, utiliser une formulation directionnelle honnête : « en hausse », « réduit », « amélioré », « stabilisé », « clarifié ».
