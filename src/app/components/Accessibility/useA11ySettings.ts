import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Accessibility/useA11ySettings — état des réglages et application au document.
 *
 * Le hook ne rend rien : il détient l'état, le persiste, et se contente de
 * poser des classes et des variables sur <html>. Toute la traduction visuelle
 * vit dans `src/styles/a11y.css`.
 */

/** Filtres purement visuels, appliqués via un calque en backdrop-filter. */
export const COLOR_FILTERS = ['contrast', 'sat-high', 'sat-low', 'mono'] as const;
export type ColorFilter = (typeof COLOR_FILTERS)[number];

/** Le clair/sombre repasse par le thème natif du site, pas par un filtre. */
export type ThemeChoice = 'light' | 'dark';

export type TextAlign = 'left' | 'center' | 'right';

export interface A11ySettings {
  /** 0..5 → zoom de 100% à 150%. */
  zoomStep: number;
  highlightTitles: boolean;
  highlightLinks: boolean;
  dyslexia: boolean;
  /** 0..3 */
  letterStep: number;
  /** 0..3 */
  lineStep: number;
  weightBold: boolean;
  align: TextAlign | null;
  /** null = on laisse le thème choisi par le visiteur via l'en-tête. */
  theme: ThemeChoice | null;
  colorFilter: ColorFilter | null;
  muteSounds: boolean;
  pageRead: boolean;
  readingGuide: boolean;
  stopAnim: boolean;
  bigCursor: boolean;
}

export const A11Y_DEFAULTS: A11ySettings = {
  zoomStep: 0,
  highlightTitles: false,
  highlightLinks: false,
  dyslexia: false,
  letterStep: 0,
  lineStep: 0,
  weightBold: false,
  align: null,
  theme: null,
  colorFilter: null,
  muteSounds: false,
  pageRead: false,
  readingGuide: false,
  stopAnim: false,
  bigCursor: false,
};

const STORAGE_KEY = 'flowdee-a11y-v1';
const LETTER = ['normal', '0.06em', '0.12em', '0.2em'];
const LINE = ['normal', '1.6', '2', '2.6'];

/** Évènement écouté par App.tsx, qui détient l'état du thème. */
export const THEME_EVENT = 'flowdee:set-theme';

function readStored(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...A11Y_DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* stockage indisponible (navigation privée, quota) — on ignore */
  }
  return A11Y_DEFAULTS;
}

export function useA11ySettings() {
  const [settings, setSettings] = useState<A11ySettings>(readStored);

  const update = useCallback(
    <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) =>
      setSettings((s) => ({ ...s, [key]: value })),
    []
  );

  const patch = useCallback(
    (partial: Partial<A11ySettings>) => setSettings((s) => ({ ...s, ...partial })),
    []
  );

  const reset = useCallback(() => setSettings(A11Y_DEFAULTS), []);

  /* ── Application au document ─────────────────────────────────────── */
  useEffect(() => {
    const root = document.documentElement;

    // Taille du contenu : zoom plutôt que surcharge de font-size, pour ne pas
    // écraser l'échelle typographique du site (titres en clamp()).
    root.style.zoom = settings.zoomStep > 0 ? String(1 + settings.zoomStep * 0.1) : '';

    const typeActive =
      settings.letterStep > 0 || settings.lineStep > 0 || settings.weightBold;
    root.classList.toggle('a11y-type', typeActive);
    root.style.setProperty('--a11y-letter', LETTER[settings.letterStep] ?? 'normal');
    root.style.setProperty('--a11y-line', LINE[settings.lineStep] ?? 'normal');
    root.style.setProperty('--a11y-weight', settings.weightBold ? '700' : 'normal');

    root.classList.toggle('a11y-highlight-titles', settings.highlightTitles);
    root.classList.toggle('a11y-highlight-links', settings.highlightLinks);
    root.classList.toggle('a11y-dyslexia', settings.dyslexia);
    root.classList.toggle('a11y-align-left', settings.align === 'left');
    root.classList.toggle('a11y-align-center', settings.align === 'center');
    root.classList.toggle('a11y-align-right', settings.align === 'right');

    for (const f of COLOR_FILTERS) {
      root.classList.toggle(`a11y-${f}`, settings.colorFilter === f);
    }

    root.classList.toggle('a11y-stop-anim', settings.stopAnim);
    root.classList.toggle('a11y-big-cursor', settings.bigCursor);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore */
    }
  }, [settings]);

  /* ── Thème : délégué au site, qui en détient l'état ───────────────── */
  useEffect(() => {
    if (!settings.theme) return;
    window.dispatchEvent(
      new CustomEvent(THEME_EVENT, { detail: { dark: settings.theme === 'dark' } })
    );
  }, [settings.theme]);

  /* ── Coupure du son des médias ───────────────────────────────────── */
  useEffect(() => {
    document.querySelectorAll('video, audio').forEach((el) => {
      (el as HTMLMediaElement).muted = settings.muteSounds;
    });
  }, [settings.muteSounds]);

  /* ── Lecture vocale du contenu principal ─────────────────────────── */
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (!settings.pageRead) {
      window.speechSynthesis.cancel();
      return;
    }

    const text = document.querySelector('main')?.textContent?.trim().slice(0, 4000);
    if (!text) {
      update('pageRead', false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.98;
    utterance.onend = () => update('pageRead', false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);

    return () => window.speechSynthesis.cancel();
  }, [settings.pageRead, update]);

  /* ── Nettoyage au démontage ──────────────────────────────────────── */
  useEffect(
    () => () => {
      const root = document.documentElement;
      root.style.zoom = '';
      root.classList.remove(
        'a11y-type',
        'a11y-highlight-titles',
        'a11y-highlight-links',
        'a11y-dyslexia',
        'a11y-align-left',
        'a11y-align-center',
        'a11y-align-right',
        'a11y-stop-anim',
        'a11y-big-cursor',
        ...COLOR_FILTERS.map((f) => `a11y-${f}`)
      );
    },
    []
  );

  const activeCount = useMemo(() => countActive(settings), [settings]);

  return { settings, update, patch, reset, activeCount };
}

function countActive(s: A11ySettings): number {
  let n = 0;
  if (s.zoomStep > 0) n++;
  if (s.highlightTitles) n++;
  if (s.highlightLinks) n++;
  if (s.dyslexia) n++;
  if (s.letterStep > 0) n++;
  if (s.lineStep > 0) n++;
  if (s.weightBold) n++;
  if (s.align) n++;
  if (s.theme) n++;
  if (s.colorFilter) n++;
  if (s.muteSounds) n++;
  if (s.pageRead) n++;
  if (s.readingGuide) n++;
  if (s.stopAnim) n++;
  if (s.bigCursor) n++;
  return n;
}

export function nextAlign(current: TextAlign | null): TextAlign | null {
  if (current === null) return 'left';
  if (current === 'left') return 'center';
  if (current === 'center') return 'right';
  return null;
}
