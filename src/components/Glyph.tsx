import type { CSSProperties } from 'react';

/** Primitive vocabulary of the BFourU modular mark. Each cell is drawn in an 18×18 box. */
export type GlyphCell = 'sq' | 'ci' | 'ring' | 'tl' | 'tr' | 'br' | 'bl' | 'em' | 'ph' | 'pv' | 'dot';

function Cell({ type, x, y, accent }: { type: GlyphCell; x: number; y: number; accent: boolean }) {
  const fill = accent ? 'var(--glyph-accent, var(--accent))' : 'currentColor';
  const t = `translate(${x} ${y})`;
  switch (type) {
    case 'sq':
      return <rect transform={t} width="18" height="18" fill={fill} />;
    case 'ci':
      return <circle transform={t} cx="9" cy="9" r="9" fill={fill} />;
    case 'dot':
      return <circle transform={t} cx="9" cy="9" r="4.5" fill={fill} />;
    case 'ring':
      return <circle transform={t} cx="9" cy="9" r="7" fill="none" stroke={fill} strokeWidth="4" />;
    case 'tl':
      return <path transform={t} d="M0 18A18 18 0 0 1 18 0V18Z" fill={fill} />;
    case 'tr':
      return <path transform={t} d="M0 0A18 18 0 0 1 18 18H0Z" fill={fill} />;
    case 'br':
      return <path transform={t} d="M18 0A18 18 0 0 1 0 18V0Z" fill={fill} />;
    case 'bl':
      return <path transform={t} d="M18 18A18 18 0 0 1 0 0H18Z" fill={fill} />;
    case 'ph':
      return <rect transform={t} y="4.5" width="18" height="9" rx="4.5" fill={fill} />;
    case 'pv':
      return <rect transform={t} x="4.5" width="9" height="18" rx="4.5" fill={fill} />;
    case 'em':
    default:
      return null;
  }
}

const positions: [number, number][] = [
  [0, 0],
  [22, 0],
  [0, 22],
  [22, 22],
];

export function Glyph({
  cells,
  accent,
  size = 40,
  className,
  style,
  title,
}: {
  cells: [GlyphCell, GlyphCell, GlyphCell, GlyphCell];
  accent: 0 | 1 | 2 | 3;
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {cells.map((c, i) => (
        <g key={i} className="glyph-cell" style={{ transformOrigin: `${positions[i][0] + 9}px ${positions[i][1] + 9}px` }}>
          <Cell type={c} x={positions[i][0]} y={positions[i][1]} accent={i === accent} />
        </g>
      ))}
    </svg>
  );
}
