import { Link, useParams } from 'react-router-dom';
import { Glyph } from '../components/Glyph';
import { Icon } from '../components/Icon';
import { Mock } from '../components/Mock';
import { CtaBand, SectionHead } from '../components/Section';
import { AddToBrief, ClusterTag, RelatedServices } from '../components/ServiceBits';
import { process } from '../data/content';
import { clusterById, serviceBySlug, services } from '../data/services';
import { whatsappLink } from '../data/site';
import { absoluteUrl, breadcrumbLd, Seo } from '../lib/seo';
import NotFound from './NotFound';
import p from './Page.module.css';
import s from './Service.module.css';

/** Lower-case a short name for use mid-sentence, keeping acronyms such as OPD, TV and IT intact. */
const inSentence = (name: string) => name.split(' ').map((w) => (/^[A-Z0-9]{2,}$/.test(w) ? w : w.toLowerCase())).join(' ');

export default function Service() {
  const { slug = '' } = useParams();
  const sv = serviceBySlug(slug);
  if (!sv) return <NotFound />;

  const cluster = clusterById(sv.cluster);
  const idx = services.findIndex((x) => x.slug === sv.slug);
  const next = services[(idx + 1) % services.length];
  const waMsg = `Hi BFourU, I’m interested in ${sv.name}. Could we discuss my requirements?`;

  return (
    <>
      <Seo
        title={`${sv.name}${sv.proposed ? ' (Proposed)' : ''} — ${cluster.name} | BFourU`}
        description={`${sv.tagline} ${sv.deliverables.length} deliverables from one accountable partner — BFourU.`}
        path={`/services/${sv.slug}`}
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: sv.name, path: `/services/${sv.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: sv.name,
            serviceType: cluster.name,
            description: sv.intro,
            provider: { '@id': absoluteUrl('/#organization') },
            areaServed: 'IN',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: `${sv.name} deliverables`,
              itemListElement: sv.deliverables.map((d) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: d } })),
            },
          },
        ]}
      />

      {/* Hero */}
      <section className={s.hero}>
        <div className={`container ${s.heroGrid}`}>
          <div className={s.heroText}>
            <nav aria-label="Breadcrumb">
              <ol className={p.crumbs}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <span aria-current="page">{sv.short}</span>
                </li>
              </ol>
            </nav>
            <div className={s.meta}>
              <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={40} className={s.heroGlyph} />
              <ClusterTag service={sv} />
              {sv.audience === 'healthcare' && <span className="tag tag--teal">Healthcare</span>}
              {sv.proposed && <span className="tag tag--accent">Proposed</span>}
            </div>
            <h1 className={`display-l ${s.title}`}>{sv.name}</h1>
            <p className={`lead ${s.tagline}`}>{sv.tagline}</p>
            <p className={s.intro}>{sv.intro}</p>
            <div className={s.ctas}>
              <AddToBrief slug={sv.slug} />
              <a href={whatsappLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--text-only">
                <span className="wa-dot" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </div>
          </div>
          <div className={s.stage}>
            <div className={s.stageInner}>
              <Mock type={sv.mock} className={s.stageMock} />
            </div>
            <p className={s.stageNote}>Illustrative example · names are fictional</p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="section section--tight band-paper2" aria-labelledby="included-title">
        <div className="container">
          <SectionHead
            index={`${sv.deliverables.length} deliverables`}
            label="What’s included"
            id="included-title"
            title={
              <>
                Everything in {inSentence(sv.short)}, under one brief<span className="dot-accent">.</span>
              </>
            }
          />
          <ol className={s.deliverables}>
            {sv.deliverables.map((d, i) => (
              <li key={d} data-reveal style={{ ['--d' as string]: `${(i % 6) * 40}ms` }}>
                <span className={s.dNum}>{String(i + 1).padStart(2, '0')}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who & outcome */}
      <section className="section section--tight" aria-label="Who it is for and the outcome">
        <div className={`container ${s.who}`}>
          <div className={s.whoCol} data-reveal>
            <h2 className="eyebrow">Who it’s for</h2>
            <ul className={s.audiences}>
              {sv.audiences.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className={s.whoCol} data-reveal style={{ ['--d' as string]: '100ms' }}>
            <h2 className="eyebrow">The outcome</h2>
            <p className={s.outcome}>{sv.outcome}</p>
          </div>
        </div>
        {sv.note && (
          <div className="container">
            <aside className={`${s.note} ${sv.proposed ? s.noteAccent : ''}`} data-reveal aria-label="Good to know">
              <span className={s.noteIcon} aria-hidden="true">
                i
              </span>
              <div>
                <p className={s.noteHead}>Good to know</p>
                <p>{sv.note}</p>
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* Process strip */}
      <section className="section section--tight band-ink" aria-labelledby="how-title">
        <div className="container">
          <SectionHead
            index="06 steps"
            label="How it works"
            id="how-title"
            split
            title={
              <>
                Same clear process, every time<span className="dot-accent">.</span>
              </>
            }
            intro={
              <>
                One point of contact from brief to delivery — and nothing goes live without your approval.{' '}
                <Link to="/approach" className="link">
                  See our approach
                </Link>
              </>
            }
          />
          <ol className={s.strip}>
            {process.map((st, i) => (
              <li key={st.title} data-reveal style={{ ['--d' as string]: `${i * 60}ms` }}>
                <span className={s.stripNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.stripTitle}>{st.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related */}
      <section className="section section--tight" aria-labelledby="related-title">
        <div className="container">
          <SectionHead
            label="Works well with"
            id="related-title"
            split
            title={
              <>
                One brand, connected services<span className="dot-accent">.</span>
              </>
            }
            intro={`${sv.short} rarely lives alone. These are often planned alongside it — so everything looks and works as one.`}
          />
          <RelatedServices slugs={sv.related} />
          <Link to={`/services/${next.slug}`} className={s.next}>
            <span className={s.nextLabel}>Next service</span>
            <span className={s.nextName}>
              {next.name}
              <Icon name="arrow" />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Let’s talk about {inSentence(sv.short)}
            <span className="dot-accent">.</span>
          </>
        }
        text="Tell us what you have today and where you want to be. We’ll come back with a clear scope and a customised quotation."
        waMessage={waMsg}
        tone={sv.audience === 'healthcare' ? 'sage' : 'paper2'}
      />
    </>
  );
}
