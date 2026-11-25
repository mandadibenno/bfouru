import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { usePrefersReducedMotion } from '../lib/hooks';
import { Glyph } from './Glyph';
import s from './HeroMark.module.css';

/**
 * The modular mark, cycling through every service glyph:
 * one system, many outputs — the brand idea made literal.
 */
export function HeroMark() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % services.length), 2400);
    return () => clearInterval(t);
  }, [reduced, paused]);

  const sv = services[i];
  return (
    <div className={s.wrap} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={s.markBox} aria-hidden="true">
        <Glyph key={sv.slug} cells={sv.glyph.cells} accent={sv.glyph.accent} size="100%" className={s.mark} />
      </div>
      <Link to={`/services/${sv.slug}`} className={s.caption} aria-live="off">
        <span className={s.count}>
          {String(i + 1).padStart(2, '0')} / {services.length}
        </span>
        <span key={sv.slug} className={s.name}>{sv.name}</span>
      </Link>
    </div>
  );
}
