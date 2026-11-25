import { Link, useParams } from 'react-router-dom';
import { CtaBand } from '../components/Section';
import { articleBySlug, articles, type Block } from '../data/articles';
import { serviceBySlug } from '../data/services';
import { site } from '../data/site';
import { absoluteUrl, breadcrumbLd, Seo } from '../lib/seo';
import { formatDate } from './Insights';
import NotFound from './NotFound';
import p from './Page.module.css';
import s from './Insights.module.css';

function renderBlock(b: Block, i: number) {
  if ('h2' in b) return <h2 key={i}>{b.h2}</h2>;
  if ('p' in b) return <p key={i}>{b.p}</p>;
  if ('ul' in b) return <ul key={i}>{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>;
  if ('ol' in b) return <ol key={i}>{b.ol.map((t) => <li key={t}>{t}</li>)}</ol>;
  return (
    <p key={i} className={s.note} role="note">
      {b.note}
    </p>
  );
}

export default function Article() {
  const { slug = '' } = useParams();
  const a = articleBySlug(slug);
  if (!a) return <NotFound />;
  const url = `/insights/${a.slug}`;
  const others = articles.filter((x) => x.slug !== a.slug);

  return (
    <>
      <Seo
        title={`${a.seoTitle} | BFourU`}
        description={a.description}
        path={url}
        ogType="article"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
            { name: a.title, path: url },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: a.title,
            description: a.description,
            datePublished: a.published,
            dateModified: a.updated,
            mainEntityOfPage: absoluteUrl(url),
            image: absoluteUrl(`/og/insights-${a.slug}.png`),
            author: { '@type': 'Organization', name: site.name, url: absoluteUrl('/') },
            publisher: { '@id': absoluteUrl('/#organization') },
            inLanguage: 'en-IN',
          },
        ]}
      />
      <section className={p.pageHero}>
        <div className={`container ${p.pageHeroInner}`}>
          <nav aria-label="Breadcrumb">
            <ol className={p.crumbs}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/insights">Insights</Link>
              </li>
              <li>
                <span aria-current="page">{a.eyebrow}</span>
              </li>
            </ol>
          </nav>
          <h1 className={`display-l ${p.pageTitle}`} style={{ maxWidth: '20em' }}>
            {a.title}
            <span className="dot-accent">.</span>
          </h1>
          <div className={s.meta}>
            <span>By {site.name}</span>
            <time dateTime={a.updated}>Updated {formatDate(a.updated)}</time>
            <span>{a.readMins} min read</span>
          </div>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <article className={`${p.prose} ${s.prose}`}>
            <p className="lead">{a.description}</p>
            {a.body.map(renderBlock)}

            <div className={s.related}>
              <span className="eyebrow">Related services</span>
              <div className={s.relatedLinks}>
                {a.services.map((slug) => {
                  const sv = serviceBySlug(slug);
                  return sv ? (
                    <Link key={slug} to={`/services/${slug}`}>
                      {sv.name}
                    </Link>
                  ) : null;
                })}
                {a.audience === 'healthcare' && <Link to="/healthcare">Healthcare at BFourU</Link>}
              </div>
            </div>
            <div className={s.related} style={{ marginTop: '1rem' }}>
              <span className="eyebrow">More insights</span>
              <div className={s.relatedLinks}>
                {others.map((o) => (
                  <Link key={o.slug} to={`/insights/${o.slug}`}>
                    {o.title}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
