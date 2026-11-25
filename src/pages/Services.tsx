import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { CtaBand } from '../components/Section';
import { ServiceCard } from '../components/ServiceBits';
import { clusters, services, servicesInCluster, totalDeliverables } from '../data/services';
import { absoluteUrl, breadcrumbLd, Seo } from '../lib/seo';
import p from './Page.module.css';
import s from './Services.module.css';

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Branding, Marketing, Websites, Automation & More | BFourU"
        description={`${services.length} services and ${totalDeliverables} deliverables in five clusters: Brand & Creative, Digital & Web, Technology & Automation, Spaces & Print, and Events & Education.`}
        path="/services"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: services.map((sv, i) => ({ '@type': 'ListItem', position: i + 1, name: sv.name, url: absoluteUrl(`/services/${sv.slug}`) })),
          },
        ]}
      />

      <section className={p.pageHero}>
        <div className={`container ${p.pageHeroInner}`}>
          <div className={p.pageHeroTop}>
            <span className="eyebrow">Services</span>
            <span className="section-head__index">
              {services.length} services · {totalDeliverables} deliverables
            </span>
          </div>
          <h1 className={`display-l ${p.pageTitle}`}>
            Everything your brand needs, organised in five clusters<span className="dot-accent">.</span>
          </h1>
          <div className={s.heroBottom}>
            <p className={`lead ${p.pageLead}`}>
              Pick one service or combine several. Add what you need to your brief as you browse — we’ll send it to BFourU as
              one request.
            </p>
            <nav className={s.jump} aria-label="Jump to a cluster">
              {clusters.map((c) => (
                <a key={c.id} href={`#${c.id}`} className={s.jumpLink}>
                  <span>{c.number}</span>
                  {c.short}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {clusters.map((c, ci) => {
        const list = servicesInCluster(c.id);
        return (
          <section key={c.id} id={c.id} className={`section section--tight ${ci % 2 === 1 ? 'band-paper2' : ''}`} aria-labelledby={`${c.id}-title`}>
            <div className="container">
              <header className={s.clusterHead}>
                <span className={s.clusterNum} data-reveal="fade">
                  {c.number}
                </span>
                <div className={s.clusterText}>
                  <h2 id={`${c.id}-title`} className="h2" data-reveal>
                    {c.name}
                  </h2>
                  <p className="lead" data-reveal>
                    {c.promise}
                  </p>
                </div>
                <p className={s.clusterQ} data-reveal="fade">
                  <span>Answers</span> “{c.question}”
                </p>
              </header>
              <div className={s.grid} data-count={list.length}>
                {list.map((sv, i) => (
                  <ServiceCard key={sv.slug} service={sv} index={i} showMock />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section section--tight">
        <div className={`container ${s.unsure}`}>
          <p className="h3">Not sure which services you need?</p>
          <p className="lead">
            Tell us the problem instead. We’ll recommend the right mix — and tell you honestly if you need less than you think.
          </p>
          <Link to="/contact" className="arrow-link">
            Describe your situation <Icon name="arrow" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
