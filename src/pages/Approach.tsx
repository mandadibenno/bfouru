import { Link } from 'react-router-dom';
import { ProcessSteps } from '../components/Blocks';
import { Glyph } from '../components/Glyph';
import { Icon } from '../components/Icon';
import { CtaBand, SectionHead } from '../components/Section';
import { engagementModels, exclusions, principles, quoteFactors } from '../data/content';
import { breadcrumbLd, Seo } from '../lib/seo';
import p from './Page.module.css';
import s from './Approach.module.css';

const reasons = [
  {
    title: 'One brief',
    text: 'Explain your business once. Every discipline works from the same understanding — no re-briefing five vendors.',
    glyph: ['sq', 'em', 'em', 'em'] as const,
  },
  {
    title: 'One brand standard',
    text: 'Your logo, colours, tone and type are applied the same way on a reel, a signboard and a prescription pad.',
    glyph: ['sq', 'sq', 'em', 'em'] as const,
  },
  {
    title: 'One point of contact',
    text: 'A single accountable person coordinates timelines, approvals and delivery across every service you use.',
    glyph: ['sq', 'sq', 'sq', 'em'] as const,
  },
  {
    title: 'One relationship that grows',
    text: 'Start with one service and add more as you need them — without starting from scratch each time.',
    glyph: ['sq', 'sq', 'sq', 'ci'] as const,
  },
];

export default function Approach() {
  return (
    <>
      <Seo
        title="Our Approach — How We Work | BFourU"
        description="One brief, one brand standard, one point of contact. A six-step process, project or subscription engagements, and clear, customised quotations."
        path="/approach"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Approach', path: '/approach' },
          ]),
        ]}
      />

      <section className={p.pageHero}>
        <div className={`container ${p.pageHeroInner}`}>
          <div className={p.pageHeroTop}>
            <span className="eyebrow">Approach</span>
            <span className="section-head__index">About BFourU</span>
          </div>
          <h1 className={`display-xl ${s.title}`}>
            Built around you<span className="dot-accent">.</span>
            <br />
            Delivered as one<span className="dot-accent">.</span>
          </h1>
        </div>
      </section>

      {/* About */}
      <section className="section section--tight" aria-labelledby="about-title">
        <div className={`container ${s.about}`}>
          <div className={s.aboutText}>
            <h2 id="about-title" className="sr-only">
              About BFourU
            </h2>
            <p className={s.aboutLead} data-reveal>
              BFourU brings creative, digital and technology solutions under one platform — helping businesses build
              recognisable brands, communicate professionally, strengthen their digital presence and simplify everyday
              operations.
            </p>
            <p data-reveal>
              We work with startups, entrepreneurs, SMEs, marketing teams and established businesses across industries. In
              healthcare — our specialist vertical — we support doctors, clinics, hospitals and medical organisations with
              everything around care, never the care itself.
            </p>
          </div>
          <div className={s.vm}>
            <div className={s.vmCard} data-reveal>
              <span className={s.vmLabel}>Vision</span>
              <p>To become a trusted creative and technology partner for businesses, delivering comprehensive and innovative solutions.</p>
            </div>
            <div className={`${s.vmCard} ${s.vmInk}`} data-reveal style={{ ['--d' as string]: '100ms' }}>
              <span className={s.vmLabel}>Mission</span>
              <p>To empower businesses through professional branding, effective digital systems, meaningful communication and reliable business support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why one partner */}
      <section className="section band-paper2" aria-labelledby="why-title">
        <div className="container">
          <SectionHead
            index="01"
            label="Why one partner"
            id="why-title"
            split
            title={
              <>
                “Can one agency really do it all?” <span className="serif">Fair question.</span>
              </>
            }
            intro="One partner doesn’t mean one person doing everything. It means specialist disciplines working from one brief, to one standard, through one point of contact. That’s what makes the work consistent."
          />
          <ol className={s.reasons}>
            {reasons.map((r, i) => (
              <li key={r.title} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
                <Glyph cells={[...r.glyph]} accent={i === 3 ? 3 : 0} size={40} className={s.reasonGlyph} />
                <h3 className="h3">{r.title}</h3>
                <p>{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Process */}
      <section className="section band-ink" aria-labelledby="proc-title">
        <div className={`container ${s.procGrid}`}>
          <div className={s.procLeft}>
            <div className="section-head__top" data-reveal="fade">
              <span className="eyebrow">Process</span>
              <span className="section-head__index">02</span>
            </div>
            <h2 id="proc-title" className="h2" data-reveal>
              Six steps, from first conversation to ongoing support<span className="dot-accent">.</span>
            </h2>
            <p className="lead" data-reveal>
              The same clear path for a business card or a hospital-wide rollout. You always know what’s happening next — and
              nothing goes live without your approval.
            </p>
          </div>
          <ProcessSteps tone="ink" />
        </div>
      </section>

      {/* Engagement */}
      <section className="section" aria-labelledby="eng-title">
        <div className="container">
          <SectionHead
            index="03"
            label="Ways to work together"
            id="eng-title"
            split
            title={
              <>
                Project, subscription — or both<span className="dot-accent">.</span>
              </>
            }
            intro="Choose what fits the work. Many clients start with a project and continue with monthly support."
          />
          <div className={s.models}>
            {engagementModels.map((m, i) => (
              <article key={m.name} className={`${s.model} ${i === 1 ? s.modelInk : ''}`} data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="tag">{m.tag}</span>
                <h3 className="display-l">{m.name}</h3>
                <p className={s.modelText}>{m.text}</p>
                <ul className={s.modelList}>
                  {m.examples.map((e) => (
                    <li key={e}>
                      <Icon name="check" /> {e}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={s.quote}>
            <div className={s.quoteLeft} data-reveal>
              <h3 className="h2">
                How pricing works<span className="dot-accent">.</span>
              </h3>
              <p className="lead">
                Every engagement is quoted to your scope — no one-size packages, no surprises. These are the things that shape a
                quotation:
              </p>
              <Link to="/contact" className="arrow-link">
                Request a customised quotation <Icon name="arrow" />
              </Link>
            </div>
            <ol className={s.factors}>
              {quoteFactors.map((f, i) => (
                <li key={f.title} data-reveal style={{ ['--d' as string]: `${i * 50}ms` }}>
                  <span className={s.fNum}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 className="h4">{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Principles + exclusions */}
      <section className="section band-paper2" aria-labelledby="princ-title">
        <div className="container">
          <SectionHead
            index="04"
            label="Principles"
            id="princ-title"
            title={
              <>
                How we choose to work<span className="dot-accent">.</span>
              </>
            }
          />
          <ul className={s.principles}>
            {principles.map((pr, i) => (
              <li key={pr.title} data-reveal style={{ ['--d' as string]: `${i * 60}ms` }}>
                <span className={s.pNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3">{pr.title}</h3>
                <p>{pr.text}</p>
              </li>
            ))}
          </ul>
          <div className={s.excl} data-reveal>
            <h3 className="h4">Outside our scope</h3>
            <p>
              To stay focused, BFourU does not offer: {exclusions.map((e) => e.toLowerCase()).join('; ')}.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
