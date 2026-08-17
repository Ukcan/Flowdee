import React from 'react';

/**
 * Brand/LogoFlowdee
 * Nomenclature Figma: Brand/Logo Flowdee
 *
 * Source unique du logo. Il vivait auparavant en double — une copie dans
 * Navigation, une autre dans Section/Footer — et les deux avaient divergé :
 * le footer enfermait un SVG 150×38 (liseré compris) dans une boîte de
 * 240×60 en `size-full`, donc tout était étiré, texte inclus, et la taille
 * de police déclarée à 14px ne valait plus 14px à l'écran.
 *
 * Trois principes ici :
 * 1. Le monogramme est dessiné dans un viewBox 32×32 sans width/height en
 *    dur — la taille vient des classes CSS. Vectoriel de bout en bout : net
 *    à toutes les densités d'écran, contrairement au PNG 64px de la source.
 * 2. Le mot « Flowdee » est du vrai texte du DOM, plus un <text> SVG. Il
 *    hérite des tokens de typo, se met à l'échelle avec le reste de la page
 *    et reste lisible par les lecteurs d'écran.
 * 3. La tuile sombre fait partie du logo (identité « app icon ») : elle ne
 *    suit pas les surfaces du thème et reste sombre en clair comme en
 *    sombre. Voir les tokens --logo-* dans styles/globals.css.
 */

/* Monogramme FD, cadré nativement en 20,1 × 18 dans la tuile de 32. */
const GLYPH_PATH =
  'M0 1C0 0.447716 0.447715 0 1 0L10.3093 0C13.7915 1.50063e-07 16.192 1.12414 18.061 3.25862C19.7332 5.33388 20.0694 7.3319 19.9891 9.34914C19.8317 13.306 17.7462 15.2845 15.7001 16.5647C13.7351 17.7941 10.6225 17.971 8.16135 17.996C7.6091 18.0016 7.16146 17.5523 7.16146 17L7.16146 11.3438C7.16146 11.0845 7.26212 10.8354 7.44223 10.649L9.3771 8.64607C10.0019 7.99931 11.0963 8.44159 11.0963 9.34086V13.431C11.0963 13.9833 11.5472 14.4196 12.0843 14.2913C12.9235 14.0908 14.1369 13.6025 15.0705 12.4138C15.9393 11.3076 16.3297 10.0474 16.3297 9C16.3297 7.79741 15.917 6.77112 15.0705 5.70259C13.5647 3.80172 10.9783 3.80172 10.3093 3.80172C8.46341 3.80172 6.12263 3.80172 4.81571 3.80172C4.26343 3.80172 3.81682 4.24944 3.81682 4.80172V5.63362C3.81682 6.1859 4.26453 6.63362 4.81682 6.63362H7.9963C8.87246 6.63362 9.32501 7.68039 8.72479 8.31867L7.10348 10.0428C6.91449 10.2438 6.65087 10.3578 6.37499 10.3578L4.81682 10.3578C4.26453 10.3578 3.81682 10.8055 3.81682 11.3578L3.81682 17C3.81682 17.5523 3.3691 18 2.81682 18H1C0.447716 18 0 17.5523 0 17L0 1Z';

interface LogoFlowdeeMarkProps {
  /** Taille de la tuile, en classes Tailwind (`size-8`, `size-10 md:size-12`…). */
  className?: string;
}

/** La tuile seule, sans le mot. Décorative : le nom accessible vient du parent. */
export function LogoFlowdeeMark({ className = 'size-9' }: LogoFlowdeeMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`block shrink-0 ${className}`}
    >
      {/* rx=7 : calé sur la silhouette du fichier source au pixel près
          (0,2 % d'écart mesuré à 64px, contre 1 % à rx=6,5). */}
      <rect width="32" height="32" rx="7" fill="var(--logo-tile)" />
      {/* Liseré : la tuile ne contraste qu'à 1,15:1 avec le navy du thème
          sombre — sans ce filet son bord disparaît dans le fond. Transparent
          en thème clair, où l'ivoire tranche déjà largement. */}
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="6.5"
        fill="none"
        stroke="var(--logo-tile-ring)"
      />
      {/* +1 sur x par rapport au centre géométrique : centrage optique, la
          panse du D pèse moins que le fût du F. Repris tel quel du fichier. */}
      <path d={GLYPH_PATH} transform="translate(7 7)" fill="var(--logo-glyph)" />
    </svg>
  );
}

interface LogoFlowdeeProps {
  /** Classes du conteneur du lock-up. */
  className?: string;
  /** Taille de la tuile. */
  markClassName?: string;
  /** Taille du mot-symbole. */
  wordmarkClassName?: string;
}

/** Lock-up complet : tuile + mot-symbole. */
export function LogoFlowdee({
  className = '',
  markClassName = 'size-9',
  wordmarkClassName = 'text-[14px]',
}: LogoFlowdeeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      data-name="Logo Flowdee"
    >
      <LogoFlowdeeMark className={markClassName} />
      <span
        className={`font-heading uppercase tracking-[0.1em] text-text-primary leading-none ${wordmarkClassName}`}
        style={{ fontWeight: 500 }}
      >
        Flowdee
      </span>
    </span>
  );
}
