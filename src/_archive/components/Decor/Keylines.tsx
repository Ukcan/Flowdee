import React, { useState, useEffect, useCallback } from 'react';

/**
 * Decor/Keylines Component
 * Export: DecorKeylines
 *
 * Asymmetric editorial keyline overlay — purely decorative.
 * Light: #000 @ 10 / 6%  ·  Dark: #FFF @ 14 / 8%
 *
 * V1 — Left vertical  (~25 % of content) — full page, aligns with footer col-1 boundary
 * V2 — Right vertical (~68 % of content) — full page, secondary weight
 * H1 — Hero bottom, edge-to-edge with horizontal fade
 * H2 — Services top, edge-to-edge with horizontal fade
 * H3 — Footer top, edge-to-edge with horizontal fade
 */

const CONTENT_MAX = 1200;

function contentBounds(vw: number) {
  const pad = vw >= 768 ? 64 : 32;
  const w = Math.min(vw - pad * 2, CONTENT_MAX);
  const l = Math.max(pad, (vw - w) / 2);
  return { left: l, width: w };
}

interface VLine {
  x: number;
  top: number;
  height: number;
  secondary?: boolean;
  name: string;
}

interface HLine {
  y: number;
  name: string;
}

export function DecorKeylines() {
  const [vLines, setVLines] = useState<VLine[]>([]);
  const [hLines, setHLines] = useState<HLine[]>([]);
  const [pageHeight, setPageHeight] = useState(0);

  const measure = useCallback(() => {
    const scrollY = window.scrollY;
    const vw = window.innerWidth;
    const pageH = document.documentElement.scrollHeight;
    const { left: cL, width: cW } = contentBounds(vw);

    /* ── Vertical positions (asymmetric within content grid) ─── */
    // V1 at 25% — aligns with lg:grid-cols-4 first column boundary
    const v1X = Math.round(cL + cW * 0.25);
    // V2 at 68% — offset right, editorial asymmetry
    const v2X = Math.round(cL + cW * 0.68);

    /* ── Section edges ──────────────────────────────────────── */
    const heroEl = document.getElementById('hero');
    const servicesEl = document.getElementById('services');
    const footerEl = document.querySelector('footer[role="contentinfo"]');

    let heroBottom = 0;
    let servicesTop = 0;
    let footerTop = pageH;

    if (heroEl) {
      heroBottom = Math.round(heroEl.getBoundingClientRect().bottom + scrollY);
    }
    if (servicesEl) {
      servicesTop = Math.round(servicesEl.getBoundingClientRect().top + scrollY);
    }
    if (footerEl) {
      footerTop = Math.round(footerEl.getBoundingClientRect().top + scrollY);
    }

    /* ── Vertical lines — both full page height ────────────── */
    const nextV: VLine[] = [
      {
        x: v1X,
        top: 0,
        height: pageH,
        secondary: false,
        name: 'Keyline — V1',
      },
      {
        x: v2X,
        top: 0,
        height: pageH,
        secondary: true,
        name: 'Keyline — V2',
      },
    ];

    /* ── Horizontal lines — edge-to-edge ───────────────────── */
    const nextH: HLine[] = [];

    if (heroBottom > 0) {
      nextH.push({ y: heroBottom, name: 'Keyline — H1' });
    }
    if (servicesTop > 0) {
      nextH.push({ y: servicesTop, name: 'Keyline — H2' });
    }
    if (footerTop < pageH) {
      nextH.push({ y: footerTop, name: 'Keyline — H3' });
    }

    setVLines(nextV);
    setHLines(nextH);
    setPageHeight(pageH);
  }, []);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;
    const raf = requestAnimationFrame(() => {
      measure();
      delayTimer = setTimeout(measure, 800);
    });

    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    window.addEventListener('resize', measure);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(delayTimer);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  /* ---- colour tokens ---- */
  const linePrimary =
    'bg-[rgba(0,0,0,0.10)] dark:bg-[rgba(255,255,255,0.14)]';
  const lineSecondary =
    'bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.07)]';

  /* ---- mask gradients ---- */
  const vMaskPrimary =
    'linear-gradient(to bottom, transparent 0px, black 160px, black calc(100% - 160px), transparent 100%)';
  const vMaskSecondary =
    'linear-gradient(to bottom, transparent 0px, black 240px, black calc(100% - 240px), transparent 100%)';
  const hMask =
    'linear-gradient(to right, transparent 0px, black 80px, black calc(100% - 80px), transparent 100%)';

  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none select-none"
      style={{ height: pageHeight || '100%', zIndex: 1 }}
      aria-hidden="true"
      data-name="DECOR — KEYLINES"
      data-locked="true"
      data-export="false"
    >
      {/* ── Vertical keylines ─────────────────────────────── */}
      {vLines.map((v) => (
        <div
          key={v.name}
          className={`absolute w-px ${v.secondary ? lineSecondary : linePrimary}`}
          style={{
            left: v.x,
            top: v.top,
            height: v.height,
            maskImage: v.secondary ? vMaskSecondary : vMaskPrimary,
            WebkitMaskImage: v.secondary ? vMaskSecondary : vMaskPrimary,
          }}
          data-name={v.name}
        />
      ))}

      {/* ── Horizontal keylines (edge-to-edge with fade) ──── */}
      {hLines.map((h) => (
        <div
          key={h.name}
          className={`absolute left-0 right-0 h-px ${linePrimary}`}
          style={{
            top: h.y,
            maskImage: hMask,
            WebkitMaskImage: hMask,
          }}
          data-name={h.name}
        />
      ))}
    </div>
  );
}
