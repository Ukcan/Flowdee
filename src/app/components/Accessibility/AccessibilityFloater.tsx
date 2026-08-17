import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { X, ArrowCounterClockwise, CaretRight, PersonArmsSpread } from '@phosphor-icons/react';
import { Icon, stroke } from './icons';

/**
 * Deux jeux d'icônes cohabitent ici, et c'est délibéré.
 *
 * La navigation du module — ouvrir, fermer, réinitialiser, déplier les profils
 * — emprunte à Phosphor, la bibliothèque du site : ce sont des commandes
 * d'interface ordinaires, elles doivent se lire comme celles du reste des
 * pages.
 *
 * Les réglages eux-mêmes gardent le jeu dessiné dans `./icons` : chacun
 * illustre une notion précise (interligne, espacement des lettres, guide de
 * lecture, saturation) que Phosphor ne couvre pas, et un équivalent approximatif
 * rendrait ces commandes plus difficiles à identifier — l'inverse du but
 * recherché ici.
 */
import {
  nextAlign,
  useA11ySettings,
  useSiteTheme,
  type ColorFilter,
  type ThemeChoice,
} from './useA11ySettings';

/**
 * Accessibility/AccessibilityFloater — panneau de réglages d'accessibilité.
 *
 * Adapté du module source aux tokens de Flowdee : plus aucune couleur en dur,
 * tout passe par les variables du thème et suit donc la bascule Navy/Ivoire.
 *
 * Deux écarts assumés par rapport au module d'origine :
 * - « contraste clair / sombre » pilote le thème natif du site plutôt qu'un
 *   filtre `invert()`, qui aurait délavé une charte déjà sombre ;
 * - la taille du contenu passe par un zoom (voir `useA11ySettings`).
 */

export function AccessibilityFloater() {
  const { settings, update, patch, reset, activeCount } = useA11ySettings();
  const [theme, setTheme] = useSiteTheme();
  const [open, setOpen] = useState(false);
  const [profilesOpen, setProfilesOpen] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  /* Le panneau n'est monté qu'à la première ouverture : ~140 nœuds et 1.9 Ko
     gzippés en moins au chargement, et autant de libellés d'interface en moins
     dans le HTML prérendu, que les moteurs indexaient comme du contenu.
     Le montage se fait fermé, l'ouverture suit dans un effet — la transition
     d'entrée joue donc dès la première fois. */
  const [mounted, setMounted] = useState(false);
  const firstOpen = useRef(false);
  useEffect(() => {
    if (mounted && !firstOpen.current) {
      firstOpen.current = true;
      setOpen(true);
    }
  }, [mounted]);

  const toggle = () => (mounted ? setOpen((v) => !v) : setMounted(true));
  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  /* Une fois monté, le panneau ne se démonte plus : fermé, il est simplement
     hors champ. Sans `inert`, ses ~30 contrôles restaient donc atteignables à
     la tabulation, et un `role="dialog" aria-modal` fermé mais présent peut
     laisser les lecteurs d'écran masquer le reste de la page. */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    if (open) panel.removeAttribute('inert');
    else panel.setAttribute('inert', '');
  }, [open, mounted]);

  /* Guide de lecture — suit le pointeur.
     `clientY` est en pixels de fenêtre non zoomés, alors que `top` s'applique
     dans le repère zoomé : sans division, la barre dérivait sous le curseur
     dès qu'un agrandissement était actif. */
  useEffect(() => {
    if (!settings.readingGuide) return;
    const move = (e: MouseEvent) => {
      if (!guideRef.current) return;
      const zoom = 1 + Math.min(5, Math.max(0, settings.zoomStep)) * 0.1;
      guideRef.current.style.top = `${e.clientY / zoom}px`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [settings.readingGuide, settings.zoomStep]);

  /* Échap referme, et la tabulation reste captive du panneau.
     Sans ce piège, `aria-modal` masque bien l'arrière-plan aux lecteurs
     d'écran, mais le focus clavier, lui, s'échappait dans la page. */
  useEffect(() => {
    if (!open) return;

    const focusables = () => {
      const panel = panelRef.current;
      if (!panel) return [] as HTMLElement[];
      const inPanel = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      // Le bouton flottant fait partie du dialogue : c'est sa croix de fermeture.
      return launcherRef.current ? [launcherRef.current, ...inPanel] : inPanel;
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !list.includes(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      {settings.readingGuide && <div ref={guideRef} className="a11y-reading-guide" data-a11y-ui aria-hidden="true" />}

      {/* Calque de filtrage — monté seulement si un mode couleur est actif,
          pour ne pas laisser un calque plein écran en permanence */}
      {settings.colorFilter && <div className="a11y-filter-layer" data-a11y-ui aria-hidden="true" />}

      {/* Bouton flottant */}
      <button
        ref={launcherRef}
        data-a11y-ui
        type="button"
        aria-label={open ? "Fermer le menu d'accessibilité" : "Ouvrir le menu d'accessibilité"}
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={toggle}
        /* À l'ouverture, le bouton se décale juste à droite du volet plutôt que
           de rester posé dessus. Le décalage suit la largeur réelle du panneau
           (380px, plafonnée à 92vw) et reste borné pour ne jamais sortir de
           l'écran sur les petites largeurs. */
        style={{
          transform: open
            ? 'translateX(min(calc(min(380px, 92vw) + 1rem), calc(100vw - 5.5rem)))'
            : 'translateX(0)',
        }}
        /* bg/backdrop-blur plutôt qu'un fond plein : ce bouton reste fixe
           par-dessus tout le contenu (z très élevé, volontaire), et sur mobile
           il finit régulièrement au-dessus d'un texte de réassurance ou d'un
           CTA au fil du scroll. Un fond translucide laisse deviner ce qu'il
           masque au lieu de l'effacer complètement. */
        className="
          fixed bottom-6 left-6 z-[10100] grid h-14 w-14 place-items-center rounded-full
          bg-accent-primary/70 backdrop-blur-sm text-on-accent shadow-soft
          outline-none transition-transform duration-300 ease-out
          focus-visible:ring-4 focus-visible:ring-accent-ring
        "
      >
        {open ? <X size={26} weight="bold" /> : <PersonArmsSpread className="h-7 w-7" weight="bold" aria-hidden="true" />}
        {!open && activeCount > 0 && (
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-surface-0 text-[11px] font-semibold text-accent-primary ring-2 ring-accent-primary">
            {activeCount}
          </span>
        )}
      </button>

      {/* Voile et panneau : rien n'est monté avant la première ouverture */}
      {mounted && (
        <>
      <div
        data-a11y-ui
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[10080] bg-bg-depth/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        id="a11y-panel"
        data-a11y-ui
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Menu d'accessibilité"
        className={`
          fixed bottom-0 left-0 top-0 z-[10090] flex w-[380px] max-w-[92vw] flex-col
          bg-bg-base border-r border-border-0 shadow-soft outline-none
          transition-transform duration-300 ease-out
          ${open ? 'translate-x-0' : '-translate-x-[110%]'}
        `}
      >
        <header className="flex items-center gap-3 bg-accent-primary px-5 py-4 text-on-accent">
          <Icon.Person className="h-8 w-8 shrink-0" />
          {/* Couleur posée explicitement : une règle de base du site fixe la
              couleur des titres, qui ne suivrait donc pas celle du header. */}
          <h2 className="flex-1 font-heading text-[18px] font-medium tracking-[-0.01em] text-on-accent">
            Menu d’accessibilité
          </h2>
          {/* `bold` reprend la graisse déjà retenue pour le X du bouton
              flottant : ces deux commandes sont les mêmes, vues de l'intérieur
              ou de l'extérieur du volet. */}
          <HeaderButton label="Réinitialiser les réglages" onClick={reset}>
            <ArrowCounterClockwise className="h-5 w-5" weight="bold" aria-hidden />
          </HeaderButton>
          <HeaderButton label="Fermer le menu d’accessibilité" onClick={close}>
            <X className="h-5 w-5" weight="bold" aria-hidden />
          </HeaderButton>
        </header>

        <div className="flex-1 space-y-7 overflow-y-auto px-5 py-6">
          {/* Profils */}
          <div>
            <button
              type="button"
              aria-expanded={profilesOpen}
              onClick={() => setProfilesOpen((v) => !v)}
              className="flex w-full items-center gap-3 rounded-[16px] border border-border-0 bg-surface-0 px-4 py-4 text-left transition-colors hover:border-border-1 outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-1 text-accent-primary">
                <Icon.Person className="h-5 w-5" />
              </span>
              <span className="flex-1 font-body text-[15px] text-text-primary">
                Profils d’accessibilité
              </span>
              {/* Graisse normale, à l'inverse des commandes du bandeau : ce
                  chevron n'est pas une action mais l'indication d'un repli, il
                  doit rester en retrait du libellé qu'il accompagne. */}
              <CaretRight
                aria-hidden
                className={`h-5 w-5 text-text-muted transition-transform ${profilesOpen ? 'rotate-90' : ''}`}
              />
            </button>

            {profilesOpen && (
              <div className="mt-2 space-y-2 rounded-[16px] border border-border-0 bg-surface-0 p-2">
                <ProfileToggle
                  label="Profil dyslexie"
                  desc="Police lisible, espacement accru"
                  active={settings.dyslexia && settings.letterStep >= 2}
                  onClick={() => patch({ dyslexia: true, letterStep: 2, lineStep: 2 })}
                />
                <ProfileToggle
                  label="Vision réduite"
                  desc="Contenu agrandi et contraste renforcé"
                  active={settings.zoomStep >= 3 && settings.colorFilter === 'contrast'}
                  onClick={() => patch({ zoomStep: 3, colorFilter: 'contrast', weightBold: true })}
                />
                <ProfileToggle
                  label="Confort de lecture"
                  desc="Interligne aéré et guide de lecture"
                  active={settings.lineStep >= 2 && settings.readingGuide}
                  onClick={() => patch({ lineStep: 2, readingGuide: true })}
                />
              </div>
            )}
          </div>

          {/* Contenu */}
          <Section title="Ajustements du contenu">
            <Stepper
              icon={<Icon.FontSize className="h-6 w-6" />}
              label="Taille du contenu"
              value={`${100 + settings.zoomStep * 10} %`}
              onDec={() => update('zoomStep', Math.max(0, settings.zoomStep - 1))}
              onInc={() => update('zoomStep', Math.min(5, settings.zoomStep + 1))}
            />
            <Grid>
              <Tile
                icon={<Icon.Title className="h-6 w-6" />}
                label="Souligner les titres"
                active={settings.highlightTitles}
                onClick={() => update('highlightTitles', !settings.highlightTitles)}
              />
              <Tile
                icon={<Icon.Link className="h-6 w-6" />}
                label="Souligner les liens"
                active={settings.highlightLinks}
                onClick={() => update('highlightLinks', !settings.highlightLinks)}
              />
              <Tile
                icon={<Icon.Dyslexia className="h-6 w-6" />}
                label="Police dyslexie"
                active={settings.dyslexia}
                onClick={() => update('dyslexia', !settings.dyslexia)}
              />
              <Tile
                icon={<Icon.Letter className="h-6 w-6" />}
                label="Espacement des lettres"
                active={settings.letterStep > 0}
                badge={settings.letterStep > 0 ? String(settings.letterStep) : undefined}
                onClick={() => update('letterStep', (settings.letterStep + 1) % 4)}
              />
              <Tile
                icon={<Icon.LineHeight className="h-6 w-6" />}
                label="Hauteur de ligne"
                active={settings.lineStep > 0}
                badge={settings.lineStep > 0 ? String(settings.lineStep) : undefined}
                onClick={() => update('lineStep', (settings.lineStep + 1) % 4)}
              />
              <Tile
                icon={<Icon.Weight className="h-6 w-6" />}
                label="Texte en gras"
                active={settings.weightBold}
                onClick={() => update('weightBold', !settings.weightBold)}
              />
              <Tile
                icon={<Icon.Align className="h-6 w-6" />}
                label="Alignement du texte"
                active={settings.align !== null}
                badge={settings.align ? { left: 'G', center: 'C', right: 'D' }[settings.align] : undefined}
                onClick={() => update('align', nextAlign(settings.align))}
              />
            </Grid>
          </Section>

          {/* Couleur */}
          <Section title="Couleur et contraste">
            <Grid>
              {/* L'état actif se lit sur le thème réellement appliqué, pas sur
                  une copie : la bascule de l'en-tête reste donc cohérente. */}
              <ThemeTile
                icon={<Icon.Moon className="h-6 w-6" />}
                label="Thème sombre"
                mode="dark"
                current={theme}
                onPick={setTheme}
              />
              <ThemeTile
                icon={<Icon.Sun className="h-6 w-6" />}
                label="Thème clair"
                mode="light"
                current={theme}
                onPick={setTheme}
              />
              <FilterTile
                icon={<Icon.Contrast className="h-6 w-6" />}
                label="Contraste élevé"
                mode="contrast"
                current={settings.colorFilter}
                onPick={(m) => update('colorFilter', settings.colorFilter === m ? null : m)}
              />
              <FilterTile
                icon={<Icon.Drop className="h-6 w-6" />}
                label="Saturation élevée"
                mode="sat-high"
                current={settings.colorFilter}
                onPick={(m) => update('colorFilter', settings.colorFilter === m ? null : m)}
              />
              <FilterTile
                icon={<Icon.DropLow className="h-6 w-6" />}
                label="Saturation faible"
                mode="sat-low"
                current={settings.colorFilter}
                onPick={(m) => update('colorFilter', settings.colorFilter === m ? null : m)}
              />
              <FilterTile
                icon={<Icon.Mono className="h-6 w-6" />}
                label="Monochrome"
                mode="mono"
                current={settings.colorFilter}
                onPick={(m) => update('colorFilter', settings.colorFilter === m ? null : m)}
              />
            </Grid>
          </Section>

          {/* Navigation */}
          <Section title="Navigation">
            <Grid>
              <Tile
                icon={<Icon.Mute className="h-6 w-6" />}
                label="Couper le son"
                active={settings.muteSounds}
                onClick={() => update('muteSounds', !settings.muteSounds)}
              />
              <Tile
                icon={<Icon.Read className="h-6 w-6" />}
                label="Lecture de la page"
                active={settings.pageRead}
                onClick={() => update('pageRead', !settings.pageRead)}
              />
              <Tile
                icon={<Icon.Guide className="h-6 w-6" />}
                label="Guide de lecture"
                active={settings.readingGuide}
                onClick={() => update('readingGuide', !settings.readingGuide)}
              />
              <Tile
                icon={<Icon.Pause className="h-6 w-6" />}
                label="Arrêter les animations"
                active={settings.stopAnim}
                onClick={() => update('stopAnim', !settings.stopAnim)}
              />
              <Tile
                icon={<Icon.Cursor className="h-6 w-6" />}
                label="Curseur agrandi"
                active={settings.bigCursor}
                onClick={() => update('bigCursor', !settings.bigCursor)}
              />
            </Grid>
          </Section>
        </div>

        <footer className="border-t border-border-0 bg-bg-base p-4">
          <button
            type="button"
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-accent-primary py-3.5 font-body text-[15px] font-medium text-on-accent transition hover:bg-accent-hover outline-none focus-visible:ring-2 focus-visible:ring-accent-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <ArrowCounterClockwise className="h-5 w-5" weight="bold" aria-hidden />
            Réinitialiser les réglages
          </button>
        </footer>
      </aside>
        </>
      )}
    </>
  );
}

export default AccessibilityFloater;

/* ── Primitives d'interface ───────────────────────────────────────── */

function HeaderButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full bg-on-accent/15 text-on-accent transition hover:bg-on-accent/25 outline-none focus-visible:ring-2 focus-visible:ring-on-accent"
    >
      {children}
    </button>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="font-body text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}

function Tile({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`relative flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-[16px] border p-3 text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-ring ${
        active
          ? 'border-accent-primary bg-accent-bg text-accent-primary'
          : 'border-border-0 bg-surface-0 text-text-secondary hover:border-border-1'
      }`}
    >
      {badge && (
        <span className="absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent-primary px-1 text-[10px] font-semibold text-on-accent">
          {badge}
        </span>
      )}
      {icon}
      <span className="font-body text-[12px] leading-tight">{label}</span>
    </button>
  );
}

function ThemeTile({
  icon,
  label,
  mode,
  current,
  onPick,
}: {
  icon: ReactNode;
  label: string;
  mode: ThemeChoice;
  current: ThemeChoice;
  onPick: (mode: ThemeChoice) => void;
}) {
  return <Tile icon={icon} label={label} active={current === mode} onClick={() => onPick(mode)} />;
}

function FilterTile({
  icon,
  label,
  mode,
  current,
  onPick,
}: {
  icon: ReactNode;
  label: string;
  mode: ColorFilter;
  current: ColorFilter | null;
  onPick: (mode: ColorFilter) => void;
}) {
  return <Tile icon={icon} label={label} active={current === mode} onClick={() => onPick(mode)} />;
}

function Stepper({
  icon,
  label,
  value,
  onDec,
  onInc,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  onDec: () => void;
  onInc: () => void;
}) {
  return (
    <div className="rounded-[16px] border border-border-0 bg-surface-0 p-4">
      <div className="mb-3 flex items-center gap-3">
        <span className="text-accent-primary">{icon}</span>
        <span className="font-body text-[14px] text-text-primary">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <StepBtn label={`Diminuer : ${label}`} onClick={onDec}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M6 12 L18 12" {...stroke} strokeWidth={2.4} />
          </svg>
        </StepBtn>
        <output className="grid flex-1 place-items-center rounded-full bg-surface-1 py-2.5 font-body text-[14px] font-semibold text-accent-primary">
          {value}
        </output>
        <StepBtn label={`Augmenter : ${label}`} onClick={onInc}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path d="M12 6 L12 18 M6 12 L18 12" {...stroke} strokeWidth={2.4} />
          </svg>
        </StepBtn>
      </div>
    </div>
  );
}

function StepBtn({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-primary text-on-accent transition hover:bg-accent-hover outline-none focus-visible:ring-2 focus-visible:ring-accent-ring"
    >
      {children}
    </button>
  );
}

function ProfileToggle({
  label,
  desc,
  active,
  onClick,
}: {
  label: string;
  desc: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-[12px] px-3 py-3 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-ring ${
        active ? 'bg-accent-bg ring-1 ring-accent-primary' : 'hover:bg-surface-1'
      }`}
    >
      <span className="flex-1">
        <span className="block font-body text-[14px] font-medium text-text-primary">{label}</span>
        <span className="block font-body text-[12px] text-text-muted">{desc}</span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          active ? 'bg-accent-primary' : 'bg-surface-2'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-bg-base shadow transition-all ${
            active ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  );
}
