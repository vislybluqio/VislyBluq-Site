import { useId } from 'react';
import type { CSSProperties } from 'react';

const R = 250;
const C = 300;
const latitudes = [-60, -30, 0, 30, 60];
const meridianCount = 6;
const spinSeconds = 18;

// Stylised network points and the arcs between them (not geographic).
const points = [
  { x: 96, y: 300 },
  { x: 150, y: 150 },
  { x: 300, y: 92 },
  { x: 462, y: 140 },
  { x: 506, y: 330 },
  { x: 418, y: 492 },
  { x: 182, y: 474 },
];
const arcs: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [1, 3]];

const arcPath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.hypot(b.x - a.x, b.y - a.y) * 0.35;
  return `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`;
};

/**
 * Decorative wireframe globe for the home hero. Meridians squash and flip (scaleX) out of phase
 * to read as a slow rotation; the static fallback freezes them at evenly spread angles.
 */
const HeroGlobe = ({ className = '' }: { className?: string }) => {
  // Two globes render (mobile and desktop), so the gradient id must be unique per instance.
  const glowId = `globe-glow-${useId().replace(/:/g, '')}`;
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={glowId} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#20C6F7" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#2E7EF7" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0B1633" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={C} cy={C} r={R} fill={`url(#${glowId})`} stroke="#20C6F7" strokeOpacity="0.35" strokeWidth="1.2" />

      <g fill="none" stroke="#adc6ff" strokeOpacity="0.22" strokeWidth="1">
        {latitudes.map((lat) => {
          const rad = (lat * Math.PI) / 180;
          const rx = R * Math.cos(rad);
          return <ellipse key={lat} cx={C} cy={C + R * Math.sin(rad)} rx={rx} ry={rx * 0.16} />;
        })}
      </g>

      <g fill="none" stroke="#20C6F7" strokeOpacity="0.3" strokeWidth="1">
        {Array.from({ length: meridianCount }, (_, i) => {
          const phase = i / meridianCount;
          const style = {
            '--globe-delay': `${-phase * spinSeconds}s`,
            '--globe-spin': `${spinSeconds}s`,
            transform: `scaleX(${Math.cos(phase * Math.PI).toFixed(3)})`,
          } as CSSProperties;
          return <ellipse key={i} className="globe-meridian" cx={C} cy={C} rx={R} ry={R} style={style} />;
        })}
      </g>

      <g fill="none" stroke="#77d8ff" strokeWidth="1.5" strokeLinecap="round">
        {arcs.map(([from, to], i) => (
          <path
            key={`${from}-${to}`}
            className="globe-arc"
            d={arcPath(points[from], points[to])}
            strokeOpacity="0.55"
            style={{ animationDelay: `${i * -1.3}s` } as CSSProperties}
          />
        ))}
      </g>

      {points.map((point, i) => (
        <g key={i}>
          <circle className="globe-pulse" cx={point.x} cy={point.y} r="10" fill="#20C6F7" fillOpacity="0.35" style={{ animationDelay: `${i * -0.7}s` }} />
          <circle cx={point.x} cy={point.y} r="3.5" fill="#d7e3f9" />
        </g>
      ))}
    </svg>
  );
};

export default HeroGlobe;
