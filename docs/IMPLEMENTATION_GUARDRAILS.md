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

## 2. 🚫 Fichiers LEGACY / non rendus — NE PAS modifier (aucun effet visible)

> Ces fichiers existent (Zero Deletion Policy) mais **ne sont pas dans l'arbre de rendu**. Les modifier ne change rien à l'écran et crée de la confusion.

- `components/HeroSection.tsx`, `components/HeroFlowdee.tsx` *(le Hero actif est `Section/Hero.tsx`)*
- `components/Services.tsx` *(actif : `Section/Services.tsx`)*
- `components/Footer.tsx` *(actif : `Section/Footer.tsx`)*
- `components/FAQ.tsx` *(actif : `Section/FAQ.tsx`)*
- `components/About.tsx` + `components/Section/About.tsx` *(AboutSection non importé)*
- `components/AIGuardrails.tsx` + `components/Section/AIGuardrails.tsx` *(non rendu)*
- `components/CTA/Sticky.tsx` *(désactivé/commenté)*
- `components/Decor/Keylines.tsx` *(désactivé/commenté)*
- `components/Editable/ToggleButton.tsx` *(EditableToggleButton désactivé)*
- Cartes démo non rendues : `CalendarCard.tsx`, `GoogleMeetCard.tsx`, `SlackCard.tsx`, `NewsfeedCard.tsx`, `ContactCard.tsx`, `FileDropCard.tsx`, `ProjectCard.tsx`
- `components/CustomCursor.tsx`, `components/DarkModeToggle.tsx`, `components/TechnicalLabel.tsx` *(non rendus dans App)*
- `src/styles/default_theme.css` *(tokens shadcn oklch, quasi inutilisés — les vrais tokens sont dans `globals.css`)*

> ⚠️ Avant de classer un fichier « legacy », **re-vérifier `App.tsx`** : la liste peut évoluer.

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

**Cloudflare (auto-déploiement)**
- Build command : `pnpm build`
- Output directory : `dist`
- Variable : `NODE_VERSION=20`
- Déclencheur : **chaque `git push` sur `main`** → build → deploy
- Domaine actuel : `claude-pour-figma.benjamin-duffau.workers.dev`

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
