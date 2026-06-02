import React, { useEffect, useRef } from 'react';

/**
 * ParticleNetwork — animated "constellation" background.
 * Floating gold particles connected by hairlines, with subtle mouse interaction.
 * Theme-aware (reads --accent-primary), performance-conscious:
 *  - capped particle count based on viewport area
 *  - pauses when the tab is hidden
 *  - respects prefers-reduced-motion (renders a static field)
 *  - pointer-events: none (never blocks clicks)
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function readAccentRGB(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent-primary')
    .trim();
  // Expecting hex like #D4B273
  const hex = raw.replace('#', '');
  if (hex.length === 6) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }
  return [201, 169, 110]; // fallback gold
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // When the user prefers reduced motion we keep a calmer, slower drift
    // rather than freezing the field entirely.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = reduceMotion ? 0.06 : 0.18;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let rgb = readAccentRGB();
    const mouse = { x: -9999, y: -9999 };
    let rafId = 0;
    let running = true;

    const LINK_DIST = 140;
    const MOUSE_DIST = 180;

    const buildParticles = () => {
      const count = Math.min(110, Math.max(28, Math.floor((width * height) / 16000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const [r, g, b] = rgb;

      // Move + draw dots
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // wrap around edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.38)`;
        ctx.fill();
      }

      // Links between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const c = particles[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.10;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }

        // Link to mouse
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < MOUSE_DIST) {
          const alpha = (1 - mdist / MOUSE_DIST) * 0.22;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          // gentle attraction toward cursor
          a.vx += (mouse.x - a.x) * 0.000018;
          a.vy += (mouse.y - a.y) * 0.000018;
        }

        // velocity damping to avoid runaway from attraction
        a.vx = Math.max(-0.3, Math.min(0.3, a.vx));
        a.vy = Math.max(-0.3, Math.min(0.3, a.vy));
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else {
        running = true;
        loop();
      }
    };
    const onThemeChange = () => {
      rgb = readAccentRGB();
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave);
    document.addEventListener('visibilitychange', onVisibility);

    // Update particle colour when the theme (.dark class) toggles
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    loop();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  );
}
