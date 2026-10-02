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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Downsample factor — bigger = blockier dither (more retro), smaller = finer
    const SCALE = 4;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cols = Math.ceil(w / SCALE);
      const rows = Math.ceil(h / SCALE);

      const imageData = ctx.createImageData(cols, rows);
      const data = imageData.data;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          // Plasma formula: layered sin waves creating organic flowing shapes
          const nx = x / cols;
          const ny = y / rows;

          const v1 = Math.sin(nx * 8 + t);
          const v2 = Math.sin(ny * 6 + t * 0.7);
          const v3 = Math.sin((nx + ny) * 5 + t * 0.5);
          const v4 = Math.sin(Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2) * 12 + t * 0.9);

          // Combine into 0..1
          const plasma = (v1 + v2 + v3 + v4 + 4) / 8;

          // Map plasma to a very dark range so it's subtle on dark backgrounds
          // 0 = very dark, 1 = slightly lighter dark
          const brightness = plasma * 0.22; // keep it dark (0 to ~0.22)

          // Bayer ordered dithering
          const bayer = BAYER_4[(y % BAYER_SIZE) * BAYER_SIZE + (x % BAYER_SIZE)] / 16;
          const dithered = brightness + (bayer - 0.5) * 0.12;
          const pixel = Math.max(0, Math.min(255, Math.floor(dithered * 255)));

          const i = (y * cols + x) * 4;
          // Slight blue tint for tech feel (MSC accent blue is #0078d4)
          data[i + 0] = Math.floor(pixel * 0.5);  // R
          data[i + 1] = Math.floor(pixel * 0.6);  // G
          data[i + 2] = pixel;                      // B — more blue
          data[i + 3] = 255;
        }
      }

      // Draw the small imageData then scale it up to fill canvas
      const offscreen = document.createElement('canvas');
      offscreen.width = cols;
      offscreen.height = rows;
      const octx = offscreen.getContext('2d')!;
      octx.putImageData(imageData, 0, 0);

      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, w, h);
      ctx.restore();

      t += 0.008;
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
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
        opacity: 1,
      }}
      aria-hidden="true"
    />
  );
};

export default PlasmaBackground;
