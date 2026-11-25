import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { commitments, faqs, patientJourney, process, startingPoints, type StartingPoint } from '../data/content';
import { serviceBySlug } from '../data/services';
import { useBrief } from '../lib/brief';
import { Glyph } from './Glyph';
import { Icon } from './Icon';
import s from './Blocks.module.css';

/* ======================= Patient journey ======================= */
export function PatientJourney({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = patientJourney[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % patientJourney.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + patientJourney.length) % patientJourney.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = patientJourney.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  if (compact) {
    return (
      <ol className={s.journeyCompact}>
        {patientJourney.map((st, i) => (
          <li key={st.id} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
            <span className={s.jcNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={s.jcLabel}>{st.label}</span>
            <span className={s.jcText}>{st.touchpoints.slice(0, 2).join(' · ')}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className={s.journey}>
      <div className={s.track} role="tablist" aria-label="Stages of a patient’s visit">
        <span className={s.trackLine} aria-hidden="true">
          <span style={{ transform: `scaleX(${active / (patientJourney.length - 1)})` }} />
        </span>
        {patientJourney.map((st, i) => (
          <button
            key={st.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`stage-tab-${st.id}`}
            aria-selected={active === i}
            aria-controls={`stage-panel-${st.id}`}
            tabIndex={active === i ? 0 : -1}
            className={`${s.stageTab} ${active === i ? s.stageOn : ''} ${i < active ? s.stagePast : ''}`}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={s.stageDot} aria-hidden="true" />
            <span className={s.stageNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={s.stageLabel}>{st.label}</span>
          </button>
        ))}
      </div>

      <div
        key={stage.id}
        id={`stage-panel-${stage.id}`}
        role="tabpanel"
        aria-labelledby={`stage-tab-${stage.id}`}
        className={s.stagePanel}
        tabIndex={0}
      >
        <div className={s.stageIntro}>
          <h3 className="h3">{stage.title}</h3>
          <p className={s.stageText}>{stage.text}</p>
          <ul className={s.touchpoints} aria-label="Touchpoints at this stage">
            {stage.touchpoints.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className={s.stageServices}>
          <p className={s.smallHead}>How we help at this stage</p>
          <ul>
            {stage.services.map((slug) => {
              const sv = serviceBySlug(slug)!;
              return (
                <li key={slug}>
                  <Link to={`/services/${slug}`} className={s.stageService}>
                    <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={30} />
                    <span>
                      <strong>{sv.name}</strong>
                      <small>{sv.tagline}</small>
                    </span>
                    <Icon name="arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ======================= Process ======================= */
export function ProcessSteps({ tone = 'paper' }: { tone?: 'paper' | 'ink' }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ol className={`${s.process} ${tone === 'ink' ? s.processInk : ''}`}>
      {process.map((p, i) => (
        <li
          key={p.title}
          ref={(el) => {
            refs.current[i] = el;
          }}
          data-i={i}
          className={`${s.step} ${i <= active ? s.stepOn : ''}`}
        >
          <span className={s.stepNum} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className={s.stepBody}>
            <h3 className="h3">
              <span className="sr-only">Step {i + 1}: </span>
              {p.title}
            </h3>
            <p>{p.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ======================= Care commitments ======================= */
const commitmentGlyphs: [Parameters<typeof Glyph>[0]['cells'], 0 | 1 | 2 | 3][] = [
  [['sq', 'ci', 'sq', 'sq'], 1],
  [['ring', 'em', 'sq', 'ci'], 3],
  [['tl', 'tr', 'bl', 'br'], 0],
  [['ci', 'ci', 'em', 'ring'], 2],
  [['sq', 'sq', 'ph', 'sq'], 2],
  [['br', 'bl', 'tr', 'tl'], 3],
];

export function Commitments({ tone = 'paper' }: { tone?: 'paper' | 'sage' }) {
  return (
    <ul className={`${s.commitments} ${tone === 'sage' ? s.commitSage : ''}`}>
      {commitments.map((c, i) => (
        <li key={c.title} className={s.commitment} data-reveal style={{ ['--d' as string]: `${(i % 3) * 80}ms` }}>
          <Glyph cells={commitmentGlyphs[i][0]} accent={commitmentGlyphs[i][1]} size={34} className={s.commitGlyph} />
          <h3 className="h4">{c.title}</h3>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  );
}

/* ======================= FAQ ======================= */
export function Faq({ items = faqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className={s.faq}>
      {items.map((f, i) => (
        <details key={f.q} className={s.faqItem} data-reveal style={{ ['--d' as string]: `${i * 40}ms` }}>
          <summary className={s.faqQ}>
            <span>{f.q}</span>
            <span className={s.faqIcon} aria-hidden="true">
              <Icon name="plus" />
            </span>
          </summary>
          <div className={s.faqA}>
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

/* ======================= Starting points ======================= */
function StartingPointCard({ sp, index }: { sp: StartingPoint; index: number }) {
  const brief = useBrief();
  const allIn = sp.services.every((x) => brief.has(x));
  return (
    <article className={`${s.sp} ${sp.audience === 'healthcare' ? s.spHealth : ''}`} data-reveal style={{ ['--d' as string]: `${index * 70}ms` }}>
      <div className={s.spHead}>
        <span className={s.spCount}>{sp.services.length} services</span>
        {sp.audience === 'healthcare' && <span className="tag tag--teal">Healthcare</span>}
      </div>
      <h3 className="h3">{sp.title}</h3>
      <p className={s.spText}>{sp.text}</p>
      <ul className={s.spList}>
        {sp.services.map((slug) => {
          const sv = serviceBySlug(slug)!;
          return (
            <li key={slug}>
              <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={16} />
              <Link to={`/services/${slug}`} className="link link--draw">
                {sv.short}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={`${s.spBtn} ${allIn ? s.spBtnOn : ''}`}
        onClick={() => brief.addMany(sp.services)}
        disabled={allIn}
        aria-label={allIn ? `${sp.title}: all services are in your brief` : `Add the ${sp.title} services to your brief`}
      >
        <Icon name={allIn ? 'check' : 'plus'} />
        {allIn ? 'In your brief' : 'Add this set to my brief'}
      </button>
    </article>
  );
}

export function StartingPoints({ filter }: { filter?: 'business' | 'healthcare' }) {
  const list = filter ? startingPoints.filter((x) => x.audience === filter || (filter === 'healthcare' && x.id === 'conference')) : startingPoints;
  return (
    <div className={s.spGrid} data-count={list.length}>
      {list.map((sp, i) => (
        <StartingPointCard key={sp.id} sp={sp} index={i} />
      ))}
    </div>
  );
}
