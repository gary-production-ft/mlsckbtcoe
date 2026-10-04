import React, { useRef, useEffect, useState, useCallback } from 'react';
import githubPhoto from '../assets/github-event.jpg';
import './CinematicHero.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.4 + 0.05,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 10,
    drift: (Math.random() - 0.5) * 30,
  }));
}

const PARTICLES = generateParticles(55);

const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: -1.5, rotY: 0 });
  const rafRef = useRef<number | null>(null);
  const targetTilt = useRef({ rotX: -1.5, rotY: 0 });
  const currentTilt = useRef({ rotX: -1.5, rotY: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const nx = ((e.clientX - left) / width - 0.5) * 2;
    const ny = ((e.clientY - top) / height - 0.5) * 2;
    targetTilt.current = {
      rotY: nx * 4.5,
      rotX: -ny * 2.5 - 1.5,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetTilt.current = { rotX: -1.5, rotY: 0 };
  }, []);

  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const loop = () => {
      currentTilt.current.rotX = lerp(currentTilt.current.rotX, targetTilt.current.rotX, 0.06);
      currentTilt.current.rotY = lerp(currentTilt.current.rotY, targetTilt.current.rotY, 0.06);
      setTilt({ ...currentTilt.current });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section ref={containerRef} className="ch-section" aria-label="MLSC KBTCOE GitHub Event Group Photo">
      {/* Layer 0: Deep atmospheric background */}
      <div className="ch-bg" />
      <div className="ch-haze" />

      {/* Layer 0.5: Background ambient particles */}
      {PARTICLES.filter((_, i) => i < 38).map(p => (
        <div
          key={p.id}
          className="ch-particle"
          style={{
            left: p.x + '%',
            top: p.y + '%',
            width: p.size + 'px',
            height: p.size + 'px',
            opacity: p.opacity,
            zIndex: 1,
            '--op': p.opacity,
            '--dur': p.duration + 's',
            '--delay': p.delay + 's',
            '--drift': p.drift + 'px',
          } as React.CSSProperties}
        />
      ))}

      {/* Layer 1: Ambient glow behind display */}
      <div className="ch-ambient-glow" />

      {/* Layer 2: 3D perspective container */}
      <div className="ch-perspective">
        <div
          ref={displayRef}
          className="ch-display"
          style={{
            transform:
              'rotateX(' + tilt.rotX + 'deg) rotateY(' + tilt.rotY + 'deg) translateZ(0)',
          }}
        >
          {/* Locked source photograph — never modified */}
          <img
            src={githubPhoto}
            alt="MLSC KBTCOE GitHub Event — Group Photograph"
            className="ch-photo"
            draggable={false}
          />

          {/* Curvature vignette */}
          <div className="ch-curvature" aria-hidden="true" />

          {/* Film grain */}
          <div className="ch-grain-wrap" aria-hidden="true">
            <svg className="ch-grain-svg" xmlns="http://www.w3.org/2000/svg">
              <filter id="cg">
                <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#cg)" />
            </svg>
          </div>

          {/* Fine scanlines */}
          <div className="ch-scanlines" aria-hidden="true" />

          {/* Glass diagonal sweep */}
          <div className="ch-glass" aria-hidden="true" />

          {/* Edge illumination */}
          <div className="ch-edge" aria-hidden="true" />
        </div>
      </div>

      {/* Layer 3: Foreground edge particles (never over faces — kept to margins) */}
      {PARTICLES.filter((_, i) => i >= 38).map(p => (
        <div
          key={p.id}
          className="ch-particle"
          style={{
            left: (p.x < 50 ? p.x * 0.12 : 88 + p.x * 0.12) + '%',
            top: p.y + '%',
            width: p.size * 0.65 + 'px',
            height: p.size * 0.65 + 'px',
            opacity: p.opacity * 0.45,
            zIndex: 8,
            '--op': p.opacity * 0.45,
            '--dur': p.duration * 1.4 + 's',
            '--delay': (p.delay + 2) + 's',
            '--drift': p.drift * 0.5 + 'px',
          } as React.CSSProperties}
        />
      ))}
    </section>
  );
};

export default CinematicHero;
