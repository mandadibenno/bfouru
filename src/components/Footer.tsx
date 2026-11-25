import { Link } from 'react-router-dom';
import { clusters } from '../data/services';
import { site, whatsappLink } from '../data/site';
import { Glyph } from './Glyph';
import { BtnArrow } from './Icon';
import s from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={`band-ink ${s.footer}`} id="site-footer">
      <div className={`container ${s.top}`}>
        <p className={`display-l ${s.signoff}`}>
          One brand<span className="dot-accent">.</span>
          <br />
          Multiple solutions<span className="dot-accent">.</span>
          <br />
          Complete support<span className="dot-accent">.</span>
        </p>
        <div className={s.topCta}>
          <p className={s.topText}>Tell us what you’re building. We’ll put the right team on it — and one person in charge of it.</p>
          <div className={s.btns}>
            <Link to="/contact" className="btn btn--light">
              Start a project
              <BtnArrow />
            </Link>
            <a
              href={whatsappLink('Hi BFourU, I’d like to discuss a project.')}
              className="btn btn--ghost-light btn--text-only"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="wa-dot" aria-hidden="true" />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <div className={`container ${s.cols}`}>
        <nav aria-label="Services" className={s.col}>
          <h2 className={s.colHead}>Services</h2>
          <ul>
            {clusters.map((c) => (
              <li key={c.id}>
                <Link to={`/services#${c.id}`} className="link link--draw">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company" className={s.col}>
          <h2 className={s.colHead}>Company</h2>
          <ul>
            <li>
              <Link to="/healthcare" className="link link--draw">
                Healthcare
              </Link>
            </li>
            <li>
              <Link to="/approach" className="link link--draw">
                Approach
              </Link>
            </li>
            <li>
              <Link to="/insights" className="link link--draw">
                Insights
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link link--draw">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="link link--draw">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>
        <div className={s.col}>
          <h2 className={s.colHead}>Talk to us</h2>
          <ul>
            <li>
              <a href={site.phone.href} className="link link--draw">
                {site.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link link--draw">
                WhatsApp Business
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={`link link--draw ${s.email}`}>
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <div className={`${s.col} ${s.note}`}>
          <h2 className={s.colHead}>Please note</h2>
          <p>
            BFourU provides non-clinical creative, digital and technology support. We do not provide medical care, medical
            equipment, medicines or staffing. Clinical content is always approved by the relevant healthcare professionals.
          </p>
        </div>
      </div>

      <div className={`container ${s.bottom}`}>
        <div className={s.giant} aria-hidden="true">
          <Glyph cells={['tl', 'ci', 'sq', 'br']} accent={1} size="1em" className={s.giantMark} />
          <span>BFourU</span>
        </div>
        <div className={s.legal}>
          <span suppressHydrationWarning>© {year} BFourU. All rights reserved.</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
