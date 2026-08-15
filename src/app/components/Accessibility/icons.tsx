/**
 * Accessibility/icons — jeu d'icônes du module d'accessibilité.
 *
 * Repris tel quel du module source : SVG inline, tracé 1.6, aucune
 * dépendance. Isolé ici pour que le composant reste lisible.
 *
 * Ce jeu ne couvre plus que les réglages. La navigation du module (Reset,
 * Close, Chevron) est passée à Phosphor, la bibliothèque du site — leurs
 * entrées restent définies ici mais ne sont plus employées : ne pas les
 * reprendre pour de nouvelles commandes d'interface.
 */

export type IconProps = { className?: string };

export const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const Icon = {
  Person: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <circle cx="12" cy="4.6" r="2.1" fill="currentColor" stroke="none" />
      <path d="M5 9.5 L19 9.5 M12 9.5 L9 21 M12 9.5 L15 21" {...stroke} />
    </svg>
  ),
  Reset: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M5 12a7 7 0 1 0 2-4.9" {...stroke} />
      <path d="M4.5 4.5 L4.8 8 L8.3 7.4" {...stroke} />
    </svg>
  ),
  Close: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M6 6 L18 18 M18 6 L6 18" {...stroke} />
    </svg>
  ),
  Chevron: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M9 5 L16 12 L9 19" {...stroke} />
    </svg>
  ),
  FontSize: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M3 8 L3 6 L11 6 L11 8 M7 6 L7 18 M13 10 L13 9 L20 9 L20 10 M16.5 9 L16.5 18" {...stroke} />
    </svg>
  ),
  Title: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2.5" {...stroke} />
      <path d="M9 9 L15 9 M12 9 L12 15" {...stroke} />
    </svg>
  ),
  Link: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M10 14a3.5 3.5 0 0 0 5 0l2.5-2.5a3.54 3.54 0 0 0-5-5L11 8" {...stroke} />
      <path d="M14 10a3.5 3.5 0 0 0-5 0L6.5 12.5a3.54 3.54 0 0 0 5 5L13 16" {...stroke} />
    </svg>
  ),
  Dyslexia: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M4 6 L9 6 A4 4 0 0 1 9 18 L4 18 Z M4 6 L4 18" {...stroke} />
      <path d="M18 4 L18 20" {...stroke} strokeWidth={2.2} />
    </svg>
  ),
  /* Interlettrage : un A et un V que la flèche écarte, convention partagée
     par Figma et Adobe.
     Le A était refermé par le bas — sa barre transversale posée sur la ligne
     de pied plutôt qu'à mi-hauteur, doublée d'un segment reliant les deux
     pieds — et se lisait donc comme un triangle. Le V, lui, portait une barre
     transversale qu'un V n'a pas, ce qui en faisait un A retourné. Les deux
     ensemble donnaient « ∆∀ », sans rapport avec des lettres. */
  Letter: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      {/* A — jambages depuis l'apex, barre à mi-hauteur, pied ouvert */}
      <path d="M6 5 L3 12 M6 5 L9 12 M4 9.8 L8 9.8" {...stroke} />
      {/* V — deux jambages, rien d'autre */}
      <path d="M12 5 L15 12 L18 5" {...stroke} />
      <path d="M3 18 L21 18 M3 18 L5 16 M3 18 L5 20 M21 18 L19 16 M21 18 L19 20" {...stroke} />
    </svg>
  ),
  LineHeight: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M4 6 L4 18 M4 6 L2.5 7.5 M4 6 L5.5 7.5 M4 18 L2.5 16.5 M4 18 L5.5 16.5" {...stroke} />
      <path d="M9 7 L20 7 M9 12 L20 12 M9 17 L20 17" {...stroke} />
    </svg>
  ),
  Weight: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M4 5 L20 5 M12 5 L12 20" {...stroke} strokeWidth={2.4} />
    </svg>
  ),
  Align: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M4 6 L20 6 M4 11 L16 11 M4 16 L20 16 M4 21 L14 21" {...stroke} />
    </svg>
  ),
  Moon: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M20 14.5A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10.5Z" {...stroke} />
    </svg>
  ),
  Sun: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <circle cx="12" cy="12" r="4" {...stroke} />
      <path d="M12 3 L12 5 M12 19 L12 21 M3 12 L5 12 M19 12 L21 12 M5.5 5.5 L7 7 M17 17 L18.5 18.5 M18.5 5.5 L17 7 M7 17 L5.5 18.5" {...stroke} />
    </svg>
  ),
  Contrast: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M12 3.5 A8.5 8.5 0 0 1 12 20.5 Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  Drop: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M12 3 C12 3 5 11 5 15.5 A7 7 0 0 0 19 15.5 C19 11 12 3 12 3 Z" {...stroke} />
    </svg>
  ),
  DropLow: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M12 3 C12 3 5 11 5 15.5 A7 7 0 0 0 19 15.5 C19 11 12 3 12 3 Z" {...stroke} />
      <path d="M8 16 A4 4 0 0 0 16 16 Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  Mono: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M12 3.5 A8.5 8.5 0 0 1 12 20.5 Z" fill="currentColor" stroke="none" />
      <path d="M12 3.5 L12 20.5" {...stroke} />
    </svg>
  ),
  Mute: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M4 9 L4 15 L8 15 L13 19 L13 5 L8 9 Z" {...stroke} />
      <path d="M16 9 L21 15 M21 9 L16 15" {...stroke} />
    </svg>
  ),
  Read: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <rect x="3" y="6" width="14" height="12" rx="2" {...stroke} />
      <path d="M6 10 L12 10 M6 14 L10 14" {...stroke} />
      <path d="M19 9 A4 4 0 0 1 19 15 M21 7 A7 7 0 0 1 21 17" {...stroke} />
    </svg>
  ),
  Guide: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <rect x="3" y="4" width="18" height="6" rx="1.5" {...stroke} />
      <path d="M6 7.5 L12 7.5" {...stroke} />
      <path d="M12 14 L12 20 M12 20 L9.5 17.5 M12 20 L14.5 17.5" {...stroke} />
    </svg>
  ),
  Pause: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <path d="M10 9 L10 15 M14 9 L14 15" {...stroke} />
    </svg>
  ),
  Cursor: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} aria-hidden>
      <path d="M6 4 L6 18 L10 14 L13 20 L15.5 19 L12.5 13 L18 13 Z" {...stroke} />
    </svg>
  ),
}


export { Icon };
