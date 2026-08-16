import React, { useEffect, useRef, useState } from 'react';

/**
 * Decor/StepPath — tracé serpentin reliant les jalons d'une progression.
 *
 * Le chemin est recalculé à partir de la position réelle des nœuds (attribut
 * `data-step-node`), et non figé dans le markup : les étapes ont des hauteurs
 * de texte variables, qui changent avec le breakpoint et la longueur des
 * contenus. Un ResizeObserver le tient à jour.
 *
 * Deux tracés superposés : une piste continue et discrète, puis le même tracé
 * en accent dont la longueur suit le scroll — le chemin se dessine à mesure
 * qu'on descend.
 *
 * Fluidité : le scroll écrit directement la longueur visible, et une courte
 * transition CSS absorbe les à-coups (molette, trackpad). Pas de boucle
 * d'animation à entretenir — la valeur reste une pure fonction de la position
 * de scroll, donc jamais désynchronisée.
 */

interface StepPathProps {
  /** Conteneur des étapes (ex. le <ol>), qui sert de repère de mesure. */
  containerRef: React.RefObject<HTMLElement>;
  /** Largeur de la gouttière, en px. Le tracé est centré dedans. */
  gutter?: number;
  /** Amplitude horizontale des courbes, en px. */
  amplitude?: number;
  /** Progression du tracé (0 → 1), émise à chaque frame de dessin. */
  onProgress?: (progress: number) => void;
  /**
   * Position de chaque jalon le long du tracé (0 → 1), émise à chaque
   * recalcul. Permet de caler d'autres éléments sur les jalons réels plutôt
   * que sur un espacement supposé régulier.
   */
  onNodes?: (fractions: number[]) => void;
}

export function StepPath({
  containerRef,
  gutter = 32,
  amplitude = 11,
  onProgress,
  onNodes,
}: StepPathProps) {
  const progressRef = useRef<SVGPathElement>(null);
  const [{ d, height }, setPath] = useState({ d: '', height: 0 });

  /* ─── Tracé : recalculé depuis la position réelle des jalons ─── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const compute = () => {
      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>('[data-step-node]')
      );
      if (nodes.length < 2) return;

      // Mesure par offsetTop et non getBoundingClientRect : les étapes ont une
      // animation d'entrée en translateY, et les rects incluent cette
      // transformation — le tracé se serait calé sur des positions d'animation.
      const ys = nodes.map((n) => {
        let y = n.offsetHeight / 2;
        let el: HTMLElement | null = n;
        while (el && el !== container) {
          y += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        return y;
      });

      const cx = gutter / 2;
      let path = `M ${cx} ${ys[0].toFixed(1)}`;
      for (let i = 0; i < ys.length - 1; i++) {
        const y1 = ys[i];
        const y2 = ys[i + 1];
        // Bombé alternativement à droite puis à gauche : le fil serpente entre
        // deux jalons tout en passant exactement par chacun d'eux.
        const dir = i % 2 === 0 ? 1 : -1;
        const c1 = y1 + (y2 - y1) * 0.35;
        const c2 = y1 + (y2 - y1) * 0.65;
        path += ` C ${cx + dir * amplitude} ${c1.toFixed(1)}, ${cx + dir * amplitude} ${c2.toFixed(1)}, ${cx} ${y2.toFixed(1)}`;
      }

      setPath({ d: path, height: Math.ceil(ys[ys.length - 1]) + 2 });

      // Position relative de chaque jalon, d'après les écarts réels : la
      // dernière étape porte une description plus longue, les jalons ne sont
      // donc pas régulièrement espacés.
      const span = ys[ys.length - 1] - ys[0] || 1;
      onNodes?.(ys.map((y) => (y - ys[0]) / span));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    Array.from(container.children).forEach((c) => ro.observe(c));
    window.addEventListener('resize', compute);
    // Les webfonts modifient la hauteur des étapes une fois chargées.
    if (document.fonts?.ready) document.fonts.ready.then(compute).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [containerRef, gutter, amplitude, onNodes]);

  /* ─── Dessin au scroll, lissé ─── */
  useEffect(() => {
    const container = containerRef.current;
    const path = progressRef.current;
    if (!container || !path || !d) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    // Lissage confié au CSS : le scroll pose la valeur cible, la transition
    // absorbe les à-coups de molette. Aucune boucle d'animation à entretenir,
    // et la valeur reste une pure fonction de la position de scroll.
    path.style.transition = 'stroke-dashoffset 140ms linear';

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      /* Une seule ligne de référence, à 85% de la hauteur d'écran : la
         progression démarre quand le haut de la liste la franchit et s'achève
         quand son bas la franchit à son tour.

         L'ancienne fenêtre exigeait que le bas de la liste remonte jusqu'à 60%
         de l'écran pour s'achever. Sur une liste plus courte que la fenêtre,
         cela laissait une plage entière où tout était affiché mais où la
         dernière étape restait à l'opacité 0 — un trou visible en bas de
         section, alors même que le contenu était sous les yeux. Le fil ne peut
         pas finir après que le contenu a fini d'entrer. */
      const line = vh * 0.85;
      const span = Math.max(1, rect.height);
      const p = Math.min(1, Math.max(0, (line - rect.top) / span));
      path.style.strokeDashoffset = String(length * (1 - p));
      onProgress?.(p);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [containerRef, d, onProgress]);

  if (!d) return null;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0"
      width={gutter}
      height={height}
      viewBox={`0 0 ${gutter} ${height}`}
      fill="none"
      overflow="visible"
    >
      {/* Piste — le chemin complet, discret */}
      <path d={d} stroke="var(--border-0)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Progression — se dessine au scroll */}
      <path
        ref={progressRef}
        d={d}
        stroke="var(--accent-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
