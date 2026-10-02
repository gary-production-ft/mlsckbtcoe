import { useEffect, useRef } from 'react';

// Ordered Bayer 4x4 dithering matrix
const BAYER_4 = [
   0, 8, 2,10,
  12, 4,14, 6,
   3,11, 1, 9,
  15, 7,13, 5,
];
const BAYER_SIZE = 4;

const PlasmaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0..1
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 }); // smooth target
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create persistent offscreen canvas
    offscreenRef.current = document.createElement('canvas');

    // Downsample factor — 3 = fine dither pixel grid
    const SCALE = 3;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const off = offscreenRef.current!;
      off.width = Math.ceil(window.innerWidth / SCALE);
      off.height = Math.ceil(window.innerHeight / SCALE);
    };
    resize();
    window.addEventListener('resize', resize);

    // Track raw mouse position and normalize to 0..1
    const onMouseMove = (e: MouseEvent) => {
      targetMouseRef.current.x = e.clientX / window.innerWidth;
      targetMouseRef.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = () => {
      const off = offscreenRef.current!;
      const cols = off.width;
      const rows = off.height;
      const octx = off.getContext('2d')!;
      const imageData = octx.createImageData(cols, rows);
      const data = imageData.data;

      // Lerp mouse position for smooth trailing effect
      const lerpSpeed = 0.04;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * lerpSpeed;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * lerpSpeed;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;

          // Distance from cursor (normalized coords)
          const dx = nx - mx;
          const dy = ny - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Plasma layers — base ambient waves + cursor-reactive ripple
          const v1 = Math.sin(nx * 7 + t);
          const v2 = Math.sin(ny * 5 + t * 0.6);
          const v3 = Math.sin((nx + ny) * 6 + t * 0.8);
          const v4 = Math.sin(dist * 18 - t * 2.5);      // ripple from cursor
          const v5 = Math.sin(dist * 10 + t * 1.2) * (1 - Math.min(1, dist * 3)); // local bloom

          // Weighted sum → 0..1
          const plasma = (v1 * 0.15 + v2 * 0.15 + v3 * 0.15 + v4 * 0.45 + v5 * 0.1 + 1) / 2;

          // Keep dark: max brightness ~28%
          const brightness = plasma * 0.28;

          // Bayer 4×4 ordered dithering
          const bayer = BAYER_4[(y % BAYER_SIZE) * BAYER_SIZE + (x % BAYER_SIZE)] / 16;
          const dithered = brightness + (bayer - 0.5) * 0.14;
          const pixel = Math.max(0, Math.min(255, Math.floor(dithered * 255)));

          // Blue-tinted to match MSC accent color (#0078d4)
          const i = (y * cols + x) * 4;
          data[i + 0] = Math.floor(pixel * 0.35);  // R
          data[i + 1] = Math.floor(pixel * 0.55);  // G
          data[i + 2] = pixel;                       // B
          data[i + 3] = 255;
        }
      }

      octx.putImageData(imageData, 0, 0);

      // Scale up pixelated to full canvas
      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      t += 0.012;
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
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

export default PlasmaBackground;
