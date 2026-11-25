import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { whatsappLink } from '../data/site';
import { BtnArrow } from './Icon';

export function SectionHead({
  index,
  label,
  title,
  intro,
  split = false,
  id,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  split?: boolean;
  id?: string;
}) {
  return (
    <div className={`section-head ${split ? 'section-head--split' : ''}`}>
      <div className="section-head__top" data-reveal="fade">
        <span className="eyebrow">{label}</span>
        {index && <span className="section-head__index">{index}</span>}
      </div>
      <h2 className="h2" id={id} data-reveal>
        {title}
      </h2>
      {intro && (
        <p className="lead" data-reveal style={{ ['--d' as string]: '80ms' }}>
          {intro}
        </p>
      )}
    </div>
  );
}

/** Closing call-to-action band used at the end of most pages. */
export function CtaBand({
  title = (
    <>
      Ready when you are<span className="dot-accent">.</span>
    </>
  ),
  text = 'Share what you need — one service or ten. We’ll come back with a clear, customised plan and quotation.',
  waMessage = 'Hi BFourU, I’d like to discuss a project.',
  tone = 'paper2',
}: {
  title?: ReactNode;
  text?: string;
  waMessage?: string;
  tone?: 'paper2' | 'sage';
}) {
  return (
    <section className={`section ${tone === 'sage' ? 'band-sage' : 'band-paper2'}`} aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band">
          <h2 id="cta-title" className="display-l" data-reveal>
            {title}
          </h2>
          <div className="cta-band__side" data-reveal style={{ ['--d' as string]: '100ms' }}>
            <p className="lead">{text}</p>
            <div className="cta-band__btns">
              <Link to="/contact" className="btn">
                Start a project
                <BtnArrow />
              </Link>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--text-only">
                <span className="wa-dot" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
