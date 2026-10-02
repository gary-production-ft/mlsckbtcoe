import { useEffect, useRef } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseDir: number;
  pulseSpeed: number;
}

interface Edge {
  a: number;
  b: number;
  strength: number;
  strengthDir: number;
  active: boolean;
}

// ─── Config ──────────────────────────────────────────────────────────────────

const CONFIG = {
  accentR: 0,
  accentG: 120,
  accentB: 212,
  nodeCount: 60,
  connectionDistance: 200,
  cursorDistance: 180,
  cursorPull: 0.03,
  baseSpeed: 0.35,
  nodeSizeMin: 1.5,
  nodeSizeMax: 4,
  edgeOpacityMax: 0.45,
  nodeOpacityMax: 0.85,
};

// ─── Component ───────────────────────────────────────────────────────────────

const SynapticShift: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let edges: Edge[] = [];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const initNodes = () => {
      nodes = Array.from({ length: CONFIG.nodeCount }, () => ({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        vx: rand(-CONFIG.baseSpeed, CONFIG.baseSpeed),
        vy: rand(-CONFIG.baseSpeed, CONFIG.baseSpeed),
        radius: rand(CONFIG.nodeSizeMin, CONFIG.nodeSizeMax),
        pulse: Math.random(),
        pulseDir: Math.random() > 0.5 ? 1 : -1,
        pulseSpeed: rand(0.005, 0.018),
      }));

      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() < 0.12) {
            edges.push({
              a: i, b: j,
              strength: Math.random(),
              strengthDir: Math.random() > 0.5 ? 1 : -1,
              active: true,
            });
          }
        }
      }
    };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      const W = canvas.width;
      const H = canvas.height;
      const { accentR: aR, accentG: aG, accentB: aB } = CONFIG;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ctx.fillStyle = 'rgba(5, 5, 5, 0.18)';
      ctx.fillRect(0, 0, W, H);

      for (const node of nodes) {
        const cdx = mx - node.x;
        const cdy = my - node.y;
        const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cDist < CONFIG.cursorDistance && cDist > 1) {
          node.vx += (cdx / cDist) * CONFIG.cursorPull;
          node.vy += (cdy / cDist) * CONFIG.cursorPull;
        }

        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > CONFIG.baseSpeed * 3) {
          node.vx = (node.vx / speed) * CONFIG.baseSpeed * 3;
          node.vy = (node.vy / speed) * CONFIG.baseSpeed * 3;
        }
        node.vx *= 0.995;
        node.vy *= 0.995;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20)    node.x = W + 20;
        if (node.x > W + 20) node.x = -20;
        if (node.y < -20)    node.y = H + 20;
        if (node.y > H + 20) node.y = -20;

        node.pulse += node.pulseDir * node.pulseSpeed;
        if (node.pulse > 1) { node.pulse = 1; node.pulseDir = -1; }
        if (node.pulse < 0) { node.pulse = 0; node.pulseDir =  1; }
      }

      for (const edge of edges) {
        edge.strength += edge.strengthDir * 0.004;
        if (edge.strength > 1) { edge.strength = 1; edge.strengthDir = -1; }
        if (edge.strength < 0) { edge.strength = 0; edge.strengthDir =  1; }
      }

      for (const edge of edges) {
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CONFIG.connectionDistance) continue;

        const distFactor = 1 - dist / CONFIG.connectionDistance;
        const opacity    = distFactor * edge.strength * CONFIG.edgeOpacityMax;
        if (opacity < 0.005) continue;

        const midX = (na.x + nb.x) / 2;
        const midY = (na.y + nb.y) / 2;
        const cmdx = mx - midX;
        const cmdy = my - midY;
        const cMidDist = Math.sqrt(cmdx * cmdx + cmdy * cmdy);
        const cursorBoost = cMidDist < CONFIG.cursorDistance
          ? (1 - cMidDist / CONFIG.cursorDistance) * 0.6
          : 0;
        const finalOpacity = Math.min(1, opacity + cursorBoost);

        const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
        grad.addColorStop(0,   `rgba(${aR},${aG},${aB},${finalOpacity * na.pulse * 0.9 + 0.1})`);
        grad.addColorStop(0.5, `rgba(${aR},${aG},${aB},${finalOpacity})`);
        grad.addColorStop(1,   `rgba(${aR},${aG},${aB},${finalOpacity * nb.pulse * 0.9 + 0.1})`);

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = distFactor * 1.5 * edge.strength + 0.3;
        ctx.stroke();
      }

      for (const node of nodes) {
        const opacity = node.pulse * CONFIG.nodeOpacityMax;
        const ndx = mx - node.x;
        const ndy = my - node.y;
        const nDist = Math.sqrt(ndx * ndx + ndy * ndy);
        const nodeBoost = nDist < CONFIG.cursorDistance
          ? (1 - nDist / CONFIG.cursorDistance) * 0.4
          : 0;
        const finalOpacity = Math.min(1, opacity + nodeBoost);
        const glowRadius   = node.radius * (2.5 + node.pulse * 2 + nodeBoost * 3);

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowRadius);
        glow.addColorStop(0,   `rgba(${aR},${aG},${aB},${finalOpacity * 0.6})`);
        glow.addColorStop(0.4, `rgba(${aR},${aG},${aB},${finalOpacity * 0.15})`);
        glow.addColorStop(1,   `rgba(${aR},${aG},${aB},0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${aR},${aG},${aB},${finalOpacity})`;
        ctx.fill();
      }

      if (mx > 0) {
        const cursorGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 40);
        cursorGlow.addColorStop(0,   `rgba(${aR},${aG},${aB},0.35)`);
        cursorGlow.addColorStop(0.5, `rgba(${aR},${aG},${aB},0.08)`);
        cursorGlow.addColorStop(1,   `rgba(${aR},${aG},${aB},0)`);
        ctx.beginPath();
        ctx.arc(mx, my, 40, 0, Math.PI * 2);
        ctx.fillStyle = cursorGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${aR},${aG},${aB},0.9)`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
};

export default SynapticShift;
