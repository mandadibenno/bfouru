import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { clusterById, serviceBySlug } from '../data/services';
import { whatsappLink } from '../data/site';
import { useBrief } from '../lib/brief';
import { useFocusTrap, useScrollLock } from '../lib/hooks';
import { Glyph } from './Glyph';
import { BtnArrow, Icon } from './Icon';
import s from './BriefTray.module.css';

/** Slide-over drawer listing the services collected while browsing. */
export function BriefTray() {
  const brief = useBrief();
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => brief.setOpen(false), [brief]);
  useScrollLock(brief.open);
  useFocusTrap(brief.open, ref, close);

  const names = brief.items.map((slug) => serviceBySlug(slug)?.name).filter(Boolean) as string[];
  const waText = `Hi BFourU, I’d like to discuss a project. I’m interested in:\n${names.map((n) => `• ${n}`).join('\n')}`;

  return (
    <div className={`${s.root} ${brief.open ? s.open : ''}`} hidden={!brief.open}>
      <div className={s.scrim} onClick={close} aria-hidden="true" />
      <div ref={ref} className={s.drawer} role="dialog" aria-modal="true" aria-labelledby="brief-title" tabIndex={-1}>
        <div className={s.head}>
          <div>
            <p className="eyebrow">Your brief</p>
            <h2 id="brief-title" className={`h3 ${s.title}`}>
              {brief.items.length
                ? `${brief.items.length} service${brief.items.length === 1 ? '' : 's'} selected`
                : 'Nothing here yet'}
            </h2>
          </div>
          <button type="button" className={s.close} onClick={close} aria-label="Close brief">
            <Icon name="close" />
          </button>
        </div>

        {brief.items.length ? (
          <ul className={s.list}>
            {brief.items.map((slug) => {
              const sv = serviceBySlug(slug);
              if (!sv) return null;
              return (
                <li key={slug} className={s.item}>
                  <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={28} />
                  <div className={s.itemText}>
                    <Link to={`/services/${slug}`} onClick={close} className={s.itemName}>
                      {sv.name}
                    </Link>
                    <span className={s.itemCluster}>{clusterById(sv.cluster).name}</span>
                  </div>
                  <button type="button" className={s.remove} onClick={() => brief.remove(slug)} aria-label={`Remove ${sv.name}`}>
                    <Icon name="close" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={s.empty}>
            Add services as you browse and we’ll send them to BFourU as one brief — no forms to repeat.{' '}
            <Link to="/services" onClick={close} className="link">
              Browse services
            </Link>
          </p>
        )}

        <div className={s.foot}>
          <Link to="/contact" className="btn btn--block" onClick={close}>
            Continue to send brief
            <BtnArrow />
          </Link>
          {brief.items.length > 0 && (
            <div className={s.footRow}>
              <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="arrow-link">
                <span className="wa-dot" aria-hidden="true" /> Send on WhatsApp now
              </a>
              <button type="button" className={s.clear} onClick={brief.clear}>
                Clear all
              </button>
            </div>
          )}
          <p className={s.privacy}>Saved on this device only. Nothing is shared until you send it.</p>
        </div>
      </div>
    </div>
  );
}

/** Small polite toast confirming an addition. */
export function BriefToast() {
  const brief = useBrief();
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!brief.pulse) return;
    const sv = brief.lastAdded ? serviceBySlug(brief.lastAdded) : null;
    setMsg(sv ? `${sv.short} added to your brief` : 'Services added to your brief');
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, [brief.pulse, brief.lastAdded]);

  return (
    <div className={`${s.toast} ${visible ? s.toastIn : ''}`} role="status" aria-live="polite">
      {visible && (
        <>
          <span className={s.toastCheck}>
            <Icon name="check" />
          </span>
          <span>{msg}</span>
          <button type="button" className={s.toastBtn} onClick={() => brief.setOpen(true)}>
            View
          </button>
        </>
      )}
    </div>
  );
}
