import { useEffect, useRef } from 'react';

/*
 * A field of isometric blocks drawn in the geometry of the V-Cube logo (home page hero).
 * Blocks rise into place on load; the ones near the pointer lift and take on the logo's three blues.
 * With `sketch`, the field is first drawn as hand-sketched outlines in pen blue, then the solid blocks
 * rise to fill the sketch: a plan becoming a build.
 * Drawn on a canvas, paused when off screen, and static (fully built) under prefers-reduced-motion.
 */

const DEFAULT_GRID = 9;
const GAP = 0.86; // share of each tile the block fills, leaving a thin gap between blocks

// The logo's faces: light top, mid left, deep right.
const BRAND = { top: [111, 176, 234], left: [31, 111, 221], right: [26, 69, 160] };
const SLATE = { top: [46, 53, 68], left: [33, 39, 51], right: [26, 31, 41] };
const PEN = '125,180,240'; // the logo's light blue, as used for the handwritten notes
const SKETCH_MS = 1900; // how long the sketch is drawn before the blocks start rising

const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;

/** A deterministic, stepped terrain, like stacked blocks: taller toward the middle, with some variation. */
const targetHeight = (i: number, j: number, GRID: number) => {
  const c = (GRID - 1) / 2;
  const d = Math.hypot(i - c, j - c) / c;
  const wave = Math.sin(i * 1.3 + 0.6) * Math.cos(j * 1.1 - 0.4);
  const raw = Math.max(0.2, 1.7 - d * 1.35 + wave * 0.55);
  return Math.round(raw * 2) / 2;
};

type CubeFieldProps = {
  className?: string;
  /** Draw the field as a pen sketch first, then build it. */
  sketch?: boolean;
  /** Blocks per side. */
  grid?: number;
  /** Keep moving after the build: a drifting "builder" and a slight breathing. */
  ambient?: boolean;
  /** How strongly blocks near the pointer lift and turn blue (0 to 1). */
  hoverStrength?: number;
  /** After the build, colour one block (the tallest near the middle) in the logo's blues. */
  keystone?: boolean;
};

const CubeField = ({ className = '', sketch = false, grid: GRID = DEFAULT_GRID, ambient = true, hoverStrength = 1, keystone = false }: CubeFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cells = Array.from({ length: GRID * GRID }, (_, k) => {
      const i = Math.floor(k / GRID);
      const j = k % GRID;
      const target = targetHeight(i, j, GRID);
      return { i, j, target, z: reduced ? target : 0, lift: 0, delay: (i + j) * 55, built: reduced ? 1 : 0, pen: 0 };
    });
    // The keystone: the tallest block closest to the middle.
    const middle = (GRID - 1) / 2;
    const keystoneCell = keystone
      ? cells.reduce((best, cell) => {
          const score = (c: typeof cell) => c.target * 10 - Math.hypot(c.i - middle, c.j - middle);
          return score(cell) > score(best) ? cell : best;
        })
      : null;
    // Back-to-front, so nearer blocks are painted over farther ones.
    cells.sort((a, b) => a.i + a.j - (b.i + b.j) || a.i - b.i);

    let width = 0;
    let height = 0;
    let tile = 0;
    let unit = 0;
    let originX = 0;
    let originY = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fit the diamond (GRID tiles wide, GRID/2 tiles tall) plus room for the tallest columns.
      tile = Math.min(width / GRID, (height * 0.78) / (GRID / 2));
      unit = tile * 0.5;
      originX = width / 2;
      originY = (height - (GRID * tile) / 2) / 2 + unit * 2.2;
    };

    const toGrid = (x: number, y: number) => {
      const a = (2 * (x - originX)) / tile;
      const b = (4 * (y - originY)) / tile;
      return { i: (a + b) / 2, j: (b - a) / 2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const half = (tile * GAP) / 2;
      const quarter = (tile * GAP) / 4;
      for (const cell of cells) {
        const x = originX + (cell.i - cell.j) * (tile / 2);
        const y = originY + (cell.i + cell.j) * (tile / 4);
        const z = (cell.z + cell.lift) * unit;
        const t = Math.min(1, cell.lift / 1.1) * hoverStrength;
        // The keystone only lights its top face, like a single finished tile.
        const tTop = cell === keystoneCell ? Math.max(t, Math.min(1, cell.built)) : t;
        if (cell.built > 0) drawBlock(x, y, z, t, tTop, half, quarter);
        if (cell.pen > 0 && cell.built < 1) drawSketch(cell, x, y, cell.target * unit, half, quarter, cell.pen * (1 - cell.built));
      }
    };

    /** A pen outline of the block's final shape, with a slight, fixed wobble so it reads as hand-drawn. */
    const drawSketch = (cell: { i: number; j: number }, x: number, y: number, z: number, half: number, quarter: number, alpha: number) => {
      const w = (k: number) => Math.sin(cell.i * 12.99 + cell.j * 78.23 + k * 3.1) * 0.9;
      ctx.strokeStyle = `rgba(${PEN},${(0.7 * alpha).toFixed(3)})`;
      ctx.lineWidth = 1.1;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      // Top face
      ctx.moveTo(x + w(1), y - quarter - z + w(2));
      ctx.lineTo(x + half + w(3), y - z + w(4));
      ctx.lineTo(x + w(5), y + quarter - z + w(6));
      ctx.lineTo(x - half + w(7), y - z + w(8));
      ctx.closePath();
      // Visible vertical edges and the front of the base
      ctx.moveTo(x - half + w(7), y - z + w(8));
      ctx.lineTo(x - half + w(9), y + w(10));
      ctx.lineTo(x + w(11), y + quarter + w(12));
      ctx.lineTo(x + half + w(13), y + w(14));
      ctx.lineTo(x + half + w(3), y - z + w(4));
      ctx.moveTo(x + w(5), y + quarter - z + w(6));
      ctx.lineTo(x + w(11), y + quarter + w(12));
      ctx.stroke();
    };

    const drawBlock = (x: number, y: number, z: number, t: number, tTop: number, half: number, quarter: number) => {
      {

        // Left face
        ctx.beginPath();
        ctx.moveTo(x - half, y - z);
        ctx.lineTo(x, y + quarter - z);
        ctx.lineTo(x, y + quarter);
        ctx.lineTo(x - half, y);
        ctx.closePath();
        ctx.fillStyle = mix(SLATE.left, BRAND.left, t);
        ctx.fill();
        // Right face
        ctx.beginPath();
        ctx.moveTo(x, y + quarter - z);
        ctx.lineTo(x + half, y - z);
        ctx.lineTo(x + half, y);
        ctx.lineTo(x, y + quarter);
        ctx.closePath();
        ctx.fillStyle = mix(SLATE.right, BRAND.right, t);
        ctx.fill();
        // Top face
        ctx.beginPath();
        ctx.moveTo(x, y - quarter - z);
        ctx.lineTo(x + half, y - z);
        ctx.lineTo(x, y + quarter - z);
        ctx.lineTo(x - half, y - z);
        ctx.closePath();
        ctx.fillStyle = mix(SLATE.top, BRAND.top, tTop);
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + tTop * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    let frame = 0;
    let visible = true;
    const start = performance.now();
    const tick = (now: number) => {
      frame = 0;
      const elapsed = now - start;
      // With no pointer (touch screens, or a visitor just reading), a slow "builder" drifts across the field instead.
      const mid = (GRID - 1) / 2;
      const wander = { i: mid + Math.sin(elapsed / 2300) * mid * 0.8, j: mid + Math.sin(elapsed / 3100 + 1.2) * mid * 0.8 };
      const buildStart = sketch ? SKETCH_MS : 0;
      const hover = pointer.active && elapsed > buildStart ? toGrid(pointer.x, pointer.y) : ambient && elapsed > buildStart + 1400 ? wander : null;
      let settling = false;
      for (const cell of cells) {
        // Sketch the outline first (when enabled), then rise into place, then breathe very slightly.
        cell.pen = sketch ? Math.min(1, Math.max(0, (elapsed - cell.delay * 0.75) / 380)) : 0;
        const p = Math.min(1, Math.max(0, (elapsed - buildStart - cell.delay) / 900));
        cell.built = sketch ? p : 1;
        const eased = 1 - Math.pow(1 - p, 3);
        const breathe = ambient && p >= 1 ? Math.sin(elapsed / 1600 + cell.i * 0.5 + cell.j * 0.35) * 0.04 : 0;
        cell.z = cell.target * eased + breathe;
        // Lift near the pointer.
        const want = hover ? (pointer.active ? 1.4 : 1) * Math.max(0.35, hoverStrength) * Math.exp(-((cell.i - hover.i) ** 2 + (cell.j - hover.j) ** 2) / 2.2) : 0;
        cell.lift += (want - cell.lift) * 0.12;
        if (p < 1 || Math.abs(want - cell.lift) > 0.002) settling = true;
      }
      draw();
      // Without ambient motion, stop drawing once everything has settled; the pointer restarts it.
      if (visible && (ambient || settling || pointer.active)) frame = requestAnimationFrame(tick);
    };
    const schedule = () => {
      if (!frame && visible && !reduced) frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      schedule();
    };
    const onLeave = () => {
      pointer.active = false;
      schedule();
    };

    resize();
    draw();
    schedule();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
      schedule();
    });
    resizeObserver.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    intersection.observe(canvas);
    // Listen on the hero (the canvas's parent section) so the field reacts even when the pointer is over the text.
    const area = canvas.closest('section') ?? canvas;
    area.addEventListener('pointermove', onMove as EventListener);
    area.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      area.removeEventListener('pointermove', onMove as EventListener);
      area.removeEventListener('pointerleave', onLeave);
    };
  }, [sketch, GRID, ambient, hoverStrength, keystone]);

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />;
};

export default CubeField;
