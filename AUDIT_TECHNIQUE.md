# Audit technique — Flowdee (landing page)

> Audit en lecture seule de l'existant. Aucun fichier de code modifié.
> Stack, structure, styles, sections, composants partagés et stratégie de modification.

---

## 🧱 Stack utilisée

- **React 18** + **TypeScript**
- **Vite 6** (bundler) — plugin custom pour les imports versionnés Figma Make + résolution `figma:asset/`
- **Tailwind CSS v4** (`@tailwindcss/vite`, config via `@theme inline` dans le CSS — pas de `tailwind.config.js`)
- **Motion** (ex-Framer Motion) — animations
- **Phosphor Icons** (`@phosphor-icons/react`) — icônes (migrées depuis Lucide)
- **Radix UI / shadcn** — composants UI primitifs (`components/ui/*`)
- **Hébergement** : Cloudflare Workers (`claude-pour-figma.benjamin-duffau.workers.dev`)
- **CI/CD** : déploiement auto via GitHub `Ukcan/claude-pour-figma` (push → build → deploy)

---

## 1. 🌳 Arborescence utile

```
Flowdee_extracted/
├── index.html                  → SEO, OG/Twitter, JSON-LD, fonts
├── vite.config.ts              → plugins Figma (assets + imports versionnés)
├── src/
│   ├── main.tsx                → point d'entrée (monte <App/>)
│   ├── styles/
│   │   ├── index.css           → imports Tailwind + thèmes
│   │   ├── globals.css   ⭐     → TOKENS, couleurs, typo, boutons, cartes, aurora, marquee, grille
│   │   └── default_theme.css   → tokens shadcn (oklch) — peu utilisé
│   └── app/
│       ├── App.tsx       ⭐     → orchestration : ordre des sections + modals + fonds
│       ├── constants/
│       │   ├── links.ts  ⭐     → CALENDAR_LINK, CALENDAR_EMBED_URL, AUDIT_LINK, openCalendar()
│       │   └── ctaCopy.ts      → libellés CTA
│       ├── contexts/           → LanguageContext (i18n), EditableContentContext
│       ├── i18n/translations.ts → textes FR/EN
│       └── components/
│           ├── Section/        → Hero, Services, Approach, FAQ, Footer (implémentations)
│           │                     + Problems/CaseStudies/TrustedClients/FinalCTA (re-exports)
│           ├── ProblemCards.tsx, UseCases.tsx, TrustedClients.tsx, FinalCTA.tsx (implémentations réelles)
│           ├── Button/         → CTA, Primary, Secondary, ScrollToTop
│           ├── Card/           → Feature (seul composant Card actif)
│           ├── Decor/          → ParticleNetwork, ParallaxHeading, KeylinesParallaxFlow, ScrollReveal
│           ├── Consent/CookieBanner, Indicator/ScrollMouse + ScrollBar
│           ├── CalendarModal.tsx, ThankYouModal.tsx, TechnicalLabel.tsx
│           ├── ui/             → sonner, button, accordion, utils (4 primitifs actifs)
│           └── _archive/       → (à la racine de src/, hors de app/) fichiers legacy préservés, non rendus
```

---

## 2. ⚠️ Fichiers à risque

| Fichier / zone | Risque |
|----------------|--------|
| **Doublons de composants** | Les **vraies** implémentations de certaines sections sont en racine (`ProblemCards.tsx`, `UseCases.tsx`, `TrustedClients.tsx`, `FinalCTA.tsx`), pendant que `Section/Problems.tsx`, `Section/CaseStudies.tsx`, etc. ne sont que des **re-exports**. Risque de modifier le mauvais fichier. Idem : `components/Services.tsx` / `Footer.tsx` / `FAQ.tsx` / `HeroSection.tsx` sont des **versions legacy non rendues** (la version active est dans `Section/`). |
| **`globals.css`** | Fichier central : tokens + classes `.button-*` + `.cta-blob*` + `.section-aurora` + `.marquee-*`. Une erreur ici impacte tout le site. |
| **`vite.config.ts`** | Le plugin d'imports versionnés est vital — ne pas y toucher sans précaution (sinon build cassé). |
| **`pnpm-workspace.yaml`** | Un linter y réinjecte parfois un bloc `allowBuilds` invalide qui **casse le build Cloudflare**. À surveiller à chaque commit. |
| **`.button-primary`** | Désormais **transparent** (le doré vient des `.cta-blobs`). Utiliser la classe brute sans le composant `ButtonPrimary` = bouton invisible. |
| **URLs absolues `index.html`** | `og:url`, `canonical`, `og:image` codées en dur sur le domaine workers.dev → à mettre à jour lors du passage au domaine IONOS. |

---

## 3. 📑 Sections détectées (ordre dans `App.tsx`)

1. **HeaderNav** (navigation fixe) — `Nav/Header` → `Navigation.tsx`
2. **Hero** — `Section/Hero.tsx` *(fond transparent → particules + aurora)*
3. **TrustedClients** — `TrustedClients.tsx` *(marquee partenaires)*
4. **Problems** — `ProblemCards.tsx` *(fond grille)*
5. **Services** — `Section/Services.tsx` *(pricing, badge "Le plus choisi")*
6. **CaseStudies** — `UseCases.tsx` *(réalisations + "Résultats mesurés")*
7. **Approach** — `Section/Approach.tsx` *(fond aurora)*
8. **FAQ** — `Section/FAQ.tsx`
9. **FinalCTA** — `FinalCTA.tsx` (id `contact`) *(fond transparent → particules + aurora)*
10. **Footer** — `Section/Footer.tsx`
11. *Overlays globaux* : ScrollToTop, ScrollMouse, ScrollBar, CookieBanner, **CalendarModal**, **ThankYouModal**, ParticleNetwork, aurora, keylines

---

## 4. 🔁 Composants partagés (réutilisables)

- **Boutons** : `ButtonPrimary`, `ButtonSecondary` (via `CTAButton` → injecte les blobs gooey). À utiliser plutôt que les classes brutes.
- **Cartes** : `Card/Pricing`, `Card/CaseStudy`, `Card/Feature`, `Card/Friction` + classe `.card-surface`
- **Décor / fonds** : `ParticleNetwork`, `ParallaxHeading`, classes `.section-aurora` / `.section-grid`
- **Modals** : `CalendarModal` (réservation), `ThankYouModal` (post-paiement) — déclenchées par événements / query param
- **Typo** : classes `.heading-display`, `.heading-1`, `.heading-3`, `.body`, `.label-upper`
- **i18n** : `useTranslation()` + `translations.ts`
- **Édition** : `EditableText` (contenu éditable via contexte)
- **UI primitifs** : `components/ui/*` (Accordion, Dialog, Tabs…)

### Tokens / styles centralisés (tout dans `globals.css`)
- **Couleurs** : `:root` (Ivoire) + `.dark` (Navy, défaut) → accent doré `--accent-primary`
- **Typo** : `--font-display` (Satoshi), `--font-heading` / `--font-body` (Inter)
- **Espacements** : pas de tokens dédiés → **Tailwind** (`py-24 md:py-32`, etc.) directement dans le JSX
- **Radius / ombres** : `--radius-card`, `--radius-button`, `--shadow-*`

---

## 5. 🧭 Recommandation — stratégie de modification progressive

1. **Toujours identifier le bon fichier d'abord** — vu les doublons, vérifier ce que `App.tsx` importe réellement avant d'éditer (ex. modifier `ProblemCards.tsx`, **pas** `Section/Problems.tsx`).
2. **Modifier par couches, du plus sûr au plus risqué** :
   - D'abord le **contenu** (`translations.ts`, `ctaCopy.ts`, textes inline)
   - Puis le **style local** d'une section (classes Tailwind dans le composant)
   - En dernier les **tokens globaux** (`globals.css`) — impact transversal
3. **Une section = un commit** — petits commits atomiques, rollback facile.
4. **Vérifier avant push** : `vite build` local + aperçu, **et** surveiller `pnpm-workspace.yaml` (bloc `allowBuilds` parasite — corrigé le 2026-08-15 avec `pnpm approve-builds --all`, à re-vérifier si le warning `ERR_PNPM_IGNORED_BUILDS` réapparaît après un futur `pnpm install`).
5. **Préserver l'architecture composant** : passer par `ButtonPrimary/Secondary` (blobs), `.card-surface`, classes typo — ne pas réécrire de styles en dur qui dupliqueraient les tokens.
6. **Respecter le système de thème** : utiliser les variables CSS (`var(--accent-primary)`, `text-accent-primary`…) plutôt que des hex en dur, pour rester compatible Navy/Ivoire.
7. ~~Nettoyage différé recommandé~~ **Fait le 2026-08-15** : les 91 fichiers legacy/non rendus (doublons, cartes démo, primitifs `ui/*` inutilisés, exports Figma orphelins…) ont été déplacés vers `src/_archive/` (même arborescence relative conservée), conformément à la Zero Deletion Policy — voir `docs/IMPLEMENTATION_GUARDRAILS.md` §2 pour le détail et les 2 exceptions corrigées (`TechnicalLabel.tsx`, `imports/svg-sg0ezcs3e9.ts` : tous deux réellement utilisés, non archivés).
