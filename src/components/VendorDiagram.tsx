import { useEffect, useState } from 'react';
import { useInViewOnce, useMediaQuery, usePrefersReducedMotion } from '../lib/hooks';
import s from './VendorDiagram.module.css';

/**
 * "One partner, not ten vendors" — the core objection-handler.
 * Without: you sit in the middle of eight disconnected vendors.
 * With: one point of contact, specialist disciplines organised behind it.
 */
const vendors = ['Logo designer', 'Printer', 'Web developer', 'Social media freelancer', 'Photographer', 'Sign maker', 'IT technician', 'Event vendor'];
const disciplines = ['Brand identity', 'Print & production', 'Websites & apps', 'Digital marketing', 'Photo & media', 'Signage & interiors', 'IT & automation', 'Events'];

type Pt = [number, number];
interface Layout {
  vb: [number, number];
  you: { tangled: Pt; hub: Pt };
  hub: Pt;
  tangled: Pt[];
  ordered: Pt[];
  chaos: [number, number][];
  hubLabel: { x: number; y: number; anchor: "start" | "middle" };
}

const wide: Layout = {
  vb: [1000, 560],
  you: { tangled: [500, 290], hub: [90, 280] },
  hub: [330, 280],
  tangled: [
    [175, 105],
    [455, 70],
    [790, 115],
    [700, 300],
    [800, 470],
    [470, 505],
    [150, 440],
    [95, 270],
  ],
  ordered: Array.from({ length: 8 }, (_, i) => {
    const a = ((-62 + i * (124 / 7)) * Math.PI) / 180;
    return [Math.round(330 + 400 * Math.cos(a)), Math.round(280 + 235 * Math.sin(a))] as Pt;
  }),
  chaos: [
    [0, 2],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 0],
    [5, 3],
  ],
  hubLabel: { x: -122, y: 74, anchor: "middle" },
};

const narrow: Layout = {
  vb: [380, 640],
  you: { tangled: [190, 320], hub: [150, 48] },
  hub: [150, 172],
  tangled: [
    [40, 70],
    [235, 118],
    [212, 228],
    [150, 420],
    [222, 540],
    [70, 604],
    [28, 488],
    [36, 300],
  ],
  ordered: Array.from({ length: 8 }, (_, i) => [i % 2 === 0 ? 28 : 206, 300 + Math.floor(i / 2) * 88] as Pt),
  chaos: [
    [0, 2],
    [1, 6],
    [3, 7],
    [4, 0],
    [5, 2],
  ],
  hubLabel: { x: 60, y: -6, anchor: "start" },
};

export function VendorDiagram() {
  const isNarrow = useMediaQuery('(max-width: 720px)');
  const reduced = usePrefersReducedMotion();
  const [ref, inView] = useInViewOnce<HTMLDivElement>({ threshold: 0.45 });
  const [unified, setUnified] = useState(false);
  const [touched, setTouched] = useState(false);
  const L = isNarrow ? narrow : wide;

  // The server renders the wide layout; when the client switches layout (e.g. on a phone),
  // jump straight to the new positions instead of animating nodes across the screen.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [isNarrow]);

  // Play the story once when it scrolls into view
  useEffect(() => {
    if (!inView || touched) return;
    const t = setTimeout(() => setUnified(true), reduced ? 0 : 1400);
    return () => clearTimeout(t);
  }, [inView, touched, reduced]);

  const choose = (v: boolean) => {
    setTouched(true);
    setUnified(v);
  };

  const nodes = unified ? L.ordered : L.tangled;
  const you = unified ? L.you.hub : L.you.tangled;
  const labels = unified ? disciplines : vendors;

  const metrics = unified
    ? ['1 brief', '1 point of contact', '1 brand system', 'Every discipline']
    : ['8 briefs', '8 invoices', '8 timelines', '8 versions of your brand'];

  return (
    <div ref={ref} className={`${s.wrap} ${unified ? s.unified : s.tangledState} ${animate ? '' : s.still}`}>
      <div className={s.toggle} role="group" aria-label="Compare working models">
        <button type="button" aria-pressed={!unified} onClick={() => choose(false)} className={!unified ? s.on : ''}>
          Without BFourU
        </button>
        <button type="button" aria-pressed={unified} onClick={() => choose(true)} className={unified ? s.on : ''}>
          With BFourU
        </button>
        <span className={s.thumb} aria-hidden="true" />
      </div>

      <svg
        className={s.svg}
        viewBox={`0 0 ${L.vb[0]} ${L.vb[1]}`}
        role="img"
        aria-label={
          unified
            ? 'With BFourU: you work with one point of contact, who coordinates every specialist discipline.'
            : 'Without BFourU: you coordinate eight separate vendors yourself, and they rarely talk to each other.'
        }
      >
        {/* Tangled connections */}
        <g className={s.linesTangled}>
          {L.tangled.map((p, i) => (
            <line key={`t${i}`} x1={L.you.tangled[0]} y1={L.you.tangled[1]} x2={p[0]} y2={p[1]} />
          ))}
          {L.chaos.map(([a, b], i) => (
            <line key={`c${i}`} className={s.dashed} x1={L.tangled[a][0]} y1={L.tangled[a][1]} x2={L.tangled[b][0]} y2={L.tangled[b][1]} />
          ))}
        </g>

        {/* Hub connections */}
        <g className={s.linesHub}>
          <line className={s.main} x1={L.you.hub[0]} y1={L.you.hub[1]} x2={L.hub[0]} y2={L.hub[1]} pathLength={1} />
          {L.ordered.map((p, i) => (
            <line key={`h${i}`} x1={L.hub[0]} y1={L.hub[1]} x2={p[0]} y2={p[1]} pathLength={1} style={{ transitionDelay: unified ? `${700 + i * 50}ms` : '0ms' }} />
          ))}
        </g>

        {/* Vendor / discipline nodes */}
        {nodes.map((p, i) => (
          <g key={i} className={s.node} style={{ transform: `translate(${p[0]}px, ${p[1]}px)`, transitionDelay: `${i * 35}ms` }}>
            <circle r={unified ? 7 : 6} />
            <text x={16} y={6} className={s.label}>
              {labels[i]}
            </text>
          </g>
        ))}

        {/* BFourU hub */}
        <g className={s.hub} style={{ transform: `translate(${L.hub[0]}px, ${L.hub[1]}px)` }}>
          <circle className={s.hubRing} r={46} />
          <g transform="translate(-20 -20)">
            <path d="M0 18A18 18 0 0 1 18 0V18Z" fill="currentColor" />
            <circle cx="31" cy="9" r="9" fill="var(--accent)" />
            <rect y="22" width="18" height="18" fill="currentColor" />
            <path d="M22 22H40A18 18 0 0 1 22 40Z" fill="currentColor" />
          </g>
          <text x={L.hubLabel.x} y={L.hubLabel.y} textAnchor={L.hubLabel.anchor} className={s.hubLabel}>
            <tspan x={L.hubLabel.x}>BFourU</tspan>
            <tspan x={L.hubLabel.x} dy={22} className={s.hubSub}>
              One point of contact
            </tspan>
          </text>
        </g>

        {/* You */}
        <g className={s.you} style={{ transform: `translate(${you[0]}px, ${you[1]}px)` }}>
          <circle r={30} />
          <text y={6} textAnchor="middle">
            You
          </text>
        </g>
      </svg>

      <ul className={s.metrics} aria-live="polite">
        {metrics.map((m, i) => (
          <li key={m} style={{ animationDelay: `${i * 70}ms` }}>
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
