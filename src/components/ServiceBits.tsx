import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { clusterById, clusters, services, servicesInCluster, type Service } from '../data/services';
import { useBrief } from '../lib/brief';
import { Glyph } from './Glyph';
import { BtnArrow, Icon } from './Icon';
import { Mock } from './Mock';
import s from './ServiceBits.module.css';

/* ---------------- Add to brief ---------------- */
export function AddToBrief({ slug, variant = 'primary', className = '' }: { slug: string; variant?: 'primary' | 'secondary'; className?: string }) {
  const brief = useBrief();
  const added = brief.has(slug);
  return (
    <button
      type="button"
      className={`btn ${variant === 'secondary' ? 'btn--secondary' : ''} ${added ? s.added : ''} ${className}`}
      aria-pressed={added}
      onClick={() => brief.toggle(slug)}
    >
      {added ? 'Added to your brief' : 'Add to my brief'}
      <BtnArrow name={added ? 'check' : 'plus'} />
    </button>
  );
}

/** Compact icon toggle used on cards. */
export function AddToBriefIcon({ service }: { service: Service }) {
  const brief = useBrief();
  const added = brief.has(service.slug);
  return (
    <button
      type="button"
      className={`${s.addIcon} ${added ? s.addIconOn : ''}`}
      aria-pressed={added}
      aria-label={added ? `Remove ${service.name} from your brief` : `Add ${service.name} to your brief`}
      title={added ? 'In your brief' : 'Add to brief'}
      onClick={() => brief.toggle(service.slug)}
    >
      <Icon name={added ? 'check' : 'plus'} />
    </button>
  );
}

/* ---------------- Service card ---------------- */
export function ServiceCard({ service, index, showMock = false }: { service: Service; index?: number; showMock?: boolean }) {
  return (
    <article className={s.card} data-reveal style={{ ['--d' as string]: `${(index ?? 0) * 60}ms` }}>
      {showMock && (
        <div className={s.cardMock}>
          <Mock type={service.mock} />
        </div>
      )}
      <div className={s.cardTop}>
        <Glyph cells={service.glyph.cells} accent={service.glyph.accent} size={36} className={s.cardGlyph} />
        <div className={s.cardTags}>
          {service.audience === 'healthcare' && <span className="tag tag--teal">Healthcare</span>}
          {service.proposed && <span className="tag tag--accent">Proposed</span>}
        </div>
      </div>
      <h3 className={`h3 ${s.cardTitle}`}>
        <Link to={`/services/${service.slug}`} className={s.stretched}>
          {service.name}
        </Link>
      </h3>
      <p className={s.cardText}>{service.tagline}</p>
      <div className={s.cardFoot}>
        <span className={s.count}>{service.deliverables.length} deliverables</span>
        <span className={s.cardArrow} aria-hidden="true">
          <Icon name="arrow" />
        </span>
      </div>
      <div className={s.cardAdd}>
        <AddToBriefIcon service={service} />
      </div>
    </article>
  );
}

/* ---------------- Hero marquee of deliverables ---------------- */
const marqueeOrder = [
  'branding-identity',
  'smart-automation',
  'opd-tv-displays',
  'creative-design',
  'interior-branding-signage',
  'website-app-development',
  'events-conferences',
  'patient-education',
  'printing-production',
  'photography-media',
  'digital-marketing',
  'customized-merchandise',
  'clinic-management-software',
  'it-technical-solutions',
];

export function DeliverableMarquee() {
  const [paused, setPaused] = useState(false);
  const list = marqueeOrder.map((slug) => services.find((x) => x.slug === slug)!);
  const renderSet = (hidden: boolean) =>
    list.map((sv) => (
      <li key={`${hidden ? 'b' : 'a'}-${sv.slug}`} className={s.mqItem} aria-hidden={hidden || undefined}>
        <Link to={`/services/${sv.slug}`} tabIndex={hidden ? -1 : undefined} className={s.mqLink}>
          <span className={s.mqObject}>
            <Mock type={sv.mock} />
          </span>
          <span className={s.mqCaption}>
            <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={14} />
            {sv.short}
          </span>
        </Link>
      </li>
    ));

  return (
    <div className={`${s.marquee} ${paused ? s.paused : ''}`}>
      <ul className={s.mqTrack} aria-label="Examples of what one brief can become">
        {renderSet(false)}
        {renderSet(true)}
      </ul>
      <button type="button" className={s.mqToggle} onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
        <Icon name={paused ? 'play' : 'pause'} />
        <span className="sr-only">{paused ? 'Play' : 'Pause'} the moving showcase</span>
      </button>
    </div>
  );
}

/* ---------------- Cluster rows (Home: What we do) ---------------- */
export function ClusterRows() {
  const [open, setOpen] = useState(0);
  return (
    <div className={s.rows}>
      {clusters.map((c, i) => {
        const list = servicesInCluster(c.id);
        const isOpen = open === i;
        return (
          <div key={c.id} className={`${s.row} ${isOpen ? s.rowOpen : ''}`} data-reveal style={{ ['--d' as string]: `${i * 60}ms` }}>
            <h3 className={s.rowH}>
              <button
                type="button"
                className={s.rowBtn}
                aria-expanded={isOpen}
                aria-controls={`cluster-${c.id}`}
                id={`cluster-btn-${c.id}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className={s.rowNum}>{c.number}</span>
                <span className={s.rowName}>{c.name}</span>
                <span className={s.rowList}>
                  {list.map((x, k) => (
                    <Fragment key={x.slug}>
                      {k > 0 && <span aria-hidden="true"> · </span>}
                      <span className={s.rowListItem}>{x.short}</span>
                    </Fragment>
                  ))}
                </span>
                <span className={s.rowToggle} aria-hidden="true">
                  <Icon name="plus" />
                </span>
              </button>
            </h3>
            <div id={`cluster-${c.id}`} role="region" aria-labelledby={`cluster-btn-${c.id}`} className={s.rowPanel}>
              <div className={s.rowPanelInner}>
                <div className={s.rowPanelGrid}>
                  <p className={s.rowPromise}>{c.promise}</p>
                  <ul className={s.rowServices}>
                    {list.map((sv) => (
                      <li key={sv.slug}>
                        <Link to={`/services/${sv.slug}`} className={s.rowService} tabIndex={isOpen ? undefined : -1}>
                          <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={30} className={s.rowGlyph} />
                          <span className={s.rowServiceText}>
                            <span className={s.rowServiceName}>
                              {sv.name}
                              {sv.proposed && <em className={s.proposedMark}> · Proposed</em>}
                            </span>
                            <span className={s.rowServiceMeta}>{sv.deliverables.length} deliverables</span>
                          </span>
                          <Icon name="arrow" className={s.rowServiceArrow} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Related services ---------------- */
export function RelatedServices({ slugs }: { slugs: string[] }) {
  const list = slugs.map((sl) => services.find((x) => x.slug === sl)).filter(Boolean) as Service[];
  return (
    <div className={s.related}>
      {list.map((sv, i) => (
        <ServiceCard key={sv.slug} service={sv} index={i} />
      ))}
    </div>
  );
}

export function ClusterTag({ service }: { service: Service }) {
  const c = clusterById(service.cluster);
  return (
    <Link to={`/services#${c.id}`} className={s.clusterTag}>
      {c.number} · {c.name}
    </Link>
  );
}

export { s as serviceStyles };
export const ArrowBtn = BtnArrow;
