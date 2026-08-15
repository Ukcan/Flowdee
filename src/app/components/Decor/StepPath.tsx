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
 * Le dessin est piloté directement en `stroke-dashoffset` plutôt que par le
 * `pathLength` de Motion : la longueur du tracé est alors une pure fonction de
 * la position de scroll, sans boucle d'animation intermédiaire.
 */

interface StepPathProps {
  /** Conteneur des étapes (ex. le <ol>), qui sert de repère de mesure. */
  containerRef: React.RefObject<HTMLElement>;
  /** Largeur de la gouttière, en px. Le tracé est centré dedans. */
  gutter?: number;
  /** Amplitude horizontale des courbes, en px. */
  amplitude?: number;
  /**
   * Progression du tracé (0 → 1), émise à chaque frame de scroll. Permet de
   * caler d'autres éléments sur la même horloge que le dessin du chemin.
   */
  onProgress?: (progress: number) => void;
}

export function StepPath({
  containerRef,
  gutter = 32,
  amplitude = 11,
  onProgress,
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
  }, [containerRef, gutter, amplitude]);

  /* ─── Dessin au scroll ─── */
  useEffect(() => {
    const container = containerRef.current;
    const path = progressRef.current;
    if (!container || !path || !d) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);

    const draw = (p: number) => {
      path.style.strokeDashoffset = String(length * (1 - p));
      onProgress?.(p);
    };

    // Le tracé se dessine dans tous les cas, y compris sous
    // `prefers-reduced-motion` : c'est une révélation progressive liée au
    // scroll, sans déplacement d'élément — ce que ce réglage vise à limiter.
    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Démarre quand le haut de la liste atteint 85% de l'écran, s'achève
      // quand son bas remonte à 60%.
      const start = vh * 0.85;
      const span = rect.height + (start - vh * 0.6) || 1;
      draw(Math.min(1, Math.max(0, (start - rect.top) / span)));
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
