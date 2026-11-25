import { Link } from 'react-router-dom';
import { CtaBand } from '../components/Section';
import { articles } from '../data/articles';
import { pageSeo } from '../data/seo';
import { absoluteUrl, breadcrumbLd, Seo } from '../lib/seo';
import p from './Page.module.css';
import s from './Insights.module.css';

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function Insights() {
  return (
    <>
      <Seo
        {...pageSeo.insights}
        path="/insights"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'BFourU Insights',
            url: absoluteUrl('/insights'),
            hasPart: articles.map((a) => ({ '@type': 'Article', headline: a.title, url: absoluteUrl(`/insights/${a.slug}`) })),
          },
        ]}
      />
      <section className={p.pageHero}>
        <div className={`container ${p.pageHeroInner}`}>
          <div className={p.pageHeroTop}>
            <span className="eyebrow">Insights</span>
            <span className="section-head__index">{articles.length} guides</span>
          </div>
          <h1 className={`display-l ${p.pageTitle}`}>
            Practical guides, <span className="serif">plainly written</span>
            <span className="dot-accent">.</span>
          </h1>
          <p className={`lead ${p.pageLead}`} style={{ maxWidth: '40em' }}>
            Short, useful reading for business owners, doctors and clinic teams — on branding, websites, local search and
            ethical healthcare communication.
          </p>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <ul className={s.list}>
            {articles.map((a) => (
              <li key={a.slug}>
                <Link to={`/insights/${a.slug}`} className={s.card}>
                  <span className={`tag ${a.audience === 'healthcare' ? 'tag--teal' : ''}`}>{a.eyebrow}</span>
                  <h2>{a.title}</h2>
                  <p className="small muted">{a.description}</p>
                  <span className={s.cardMeta}>
                    {formatDate(a.updated)} · {a.readMins} min read
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
