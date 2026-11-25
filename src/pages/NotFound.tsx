import { Link } from 'react-router-dom';
import { Glyph } from '../components/Glyph';
import { BtnArrow } from '../components/Icon';
import { clusters } from '../data/services';
import { Seo } from '../lib/seo';
import p from './Page.module.css';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found | BFourU" description="This page doesn’t exist. Explore BFourU’s services or start a project." path="/404" noindex />
      <section className={p.pageHero} style={{ minHeight: '80vh', display: 'grid', alignItems: 'center' }}>
        <div className={`container ${p.pageHeroInner}`}>
          <div className={p.pageHeroTop}>
            <span className="eyebrow">Error 404</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Glyph cells={['tl', 'em', 'sq', 'br']} accent={0} size={96} />
            <h1 className={`display-l ${p.pageTitle}`}>
              This piece is missing<span className="dot-accent">.</span>
            </h1>
          </div>
          <p className="lead">The page you’re looking for has moved or never existed. Here’s where you might want to go instead:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {clusters.map((c) => (
              <Link key={c.id} to={`/services#${c.id}`} className="btn btn--secondary btn--sm btn--text-only">
                {c.name}
              </Link>
            ))}
          </div>
          <div>
            <Link to="/" className="btn">
              Back to home
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
