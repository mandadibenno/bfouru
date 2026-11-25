import { Link } from 'react-router-dom';
import { Commitments, Faq, PatientJourney, StartingPoints } from '../components/Blocks';
import { Glyph } from '../components/Glyph';
import { BtnArrow, Icon } from '../components/Icon';
import { Mock } from '../components/Mock';
import { CtaBand, SectionHead } from '../components/Section';
import { ServiceCard } from '../components/ServiceBits';
import { audiences, exclusions, faqs } from '../data/content';
import { services } from '../data/services';
import { site, whatsappLink } from '../data/site';
import { breadcrumbLd, Seo } from '../lib/seo';
import s from './Healthcare.module.css';

const specialist = services.filter((x) => x.audience === 'healthcare');
const core = services.filter((x) => x.audience !== 'healthcare');
const healthFaqs = [faqs[4], faqs[5], faqs[6], faqs[2]];
const waMsg = 'Hi BFourU, I run a healthcare practice and would like to discuss a project.';

export default function Healthcare() {
  return (
    <>
      <Seo
        title="Healthcare Branding, Marketing & Patient Communication | BFourU"
        description="Non-clinical branding, websites, ethical marketing, OPD TV content, signage, patient education and automation for doctors, clinics and hospitals."
        path="/healthcare"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Healthcare', path: '/healthcare' },
          ]),
        ]}
      />

      {/* Hero */}
      <section className={`band-sage ${s.hero}`}>
        <div className={`container ${s.heroGrid}`}>
          <div className={s.heroText}>
            <div className={s.heroTop}>
              <span className="eyebrow">Healthcare specialisation</span>
            </div>
            <h1 className={`display-xl ${s.title}`}>
              You care for patients<span className={s.dot}>.</span>
              <br />
              We take care of <span className="serif">the rest</span>
              <span className={s.dot}>.</span>
            </h1>
            <p className={`lead ${s.lead}`}>
              Non-clinical creative, digital and technology support for doctors, clinics and hospitals — so your team can focus
              on care, and your practice looks, communicates and runs the way it deserves.
            </p>
            <div className={s.ctas}>
              <Link to="/contact?type=clinic" className="btn">
                Start a healthcare project
                <BtnArrow />
              </Link>
              <a href={whatsappLink(waMsg)} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--text-only">
                <span className="wa-dot" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>
          </div>
          <div className={s.collage} aria-hidden="true">
            <div className={s.cTv}>
              <Mock type="opd" />
            </div>
            <div className={s.cChat}>
              <Mock type="whatsapp" />
            </div>
            <div className={s.cCal}>
              <Mock type="calendar" />
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section section--tight" aria-labelledby="who-title">
        <div className={`container ${s.who}`}>
          <div>
            <div className="section-head__top" data-reveal="fade">
              <span className="eyebrow">Who we work with</span>
              <span className="section-head__index">01</span>
            </div>
            <h2 id="who-title" className={`h2 ${s.whoTitle}`} data-reveal>
              From a single doctor to a multi-specialty hospital<span className="dot-accent">.</span>
            </h2>
          </div>
          <ul className={s.audienceList}>
            {audiences.healthcare.map((a, i) => (
              <li key={a} data-reveal style={{ ['--d' as string]: `${i * 40}ms` }}>
                <Glyph cells={['ci', 'sq', 'sq', 'tl']} accent={(i % 4) as 0 | 1 | 2 | 3} size={18} />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Patient journey */}
      <section className="section band-paper2" id="journey" aria-labelledby="journey-title">
        <div className="container">
          <SectionHead
            index="02"
            label="The patient journey"
            id="journey-title"
            split
            title={
              <>
                Every touchpoint of a patient’s visit, handled<span className="dot-accent">.</span>
              </>
            }
            intro="Patients judge care by more than the consultation. Select a stage to see where BFourU fits in."
          />
          <div data-reveal>
            <PatientJourney />
          </div>
        </div>
      </section>

      {/* Specialist services */}
      <section className="section" aria-labelledby="spec-title">
        <div className="container">
          <SectionHead
            index="03"
            label="Built for healthcare"
            id="spec-title"
            split
            title={
              <>
                Specialist services, plus everything else under one roof<span className="dot-accent">.</span>
              </>
            }
            intro="Three services designed specifically for healthcare — and every core BFourU service, adapted for clinical environments."
          />
          <div className={s.specGrid}>
            {specialist.map((sv, i) => (
              <ServiceCard key={sv.slug} service={sv} index={i} showMock />
            ))}
          </div>
          <div className={s.core}>
            <p className={s.coreHead} data-reveal="fade">
              Also for healthcare
            </p>
            <ul className={s.coreList}>
              {core.map((sv) => (
                <li key={sv.slug}>
                  <Link to={`/services/${sv.slug}`} className={s.coreLink}>
                    <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={22} />
                    <span>{sv.name}</span>
                    <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Starting points */}
      <section className="section band-paper2" aria-labelledby="hsp-title">
        <div className="container">
          <SectionHead
            index="04"
            label="Starting points"
            id="hsp-title"
            split
            title={
              <>
                Common healthcare briefs, ready to tailor<span className="dot-accent">.</span>
              </>
            }
            intro="Add a set to your brief and adjust it to your practice. We’ll refine the scope together."
          />
          <StartingPoints filter="healthcare" />
        </div>
      </section>

      {/* Commitments */}
      <section className="section band-sage" aria-labelledby="care-title">
        <div className="container">
          <SectionHead
            index="05"
            label="Care commitments"
            id="care-title"
            split
            title={
              <>
                Ethics aren’t a footnote. <span className="serif">They’re the brief.</span>
              </>
            }
            intro="Healthcare communication carries responsibility. These commitments apply to every healthcare engagement — in line with applicable advertising, professional-ethics and data-protection requirements."
          />
          <Commitments tone="sage" />
        </div>
      </section>

      {/* Boundaries + FAQ */}
      <section className="section" aria-labelledby="bound-title">
        <div className={`container ${s.bounds}`}>
          <div className={s.boundsLeft}>
            <div className="section-head__top" data-reveal="fade">
              <span className="eyebrow">Clear boundaries</span>
              <span className="section-head__index">06</span>
            </div>
            <h2 id="bound-title" className="h2" data-reveal>
              What we don’t do<span className="dot-accent">.</span>
            </h2>
            <p className="lead" data-reveal>
              BFourU provides non-clinical support only. We never provide medical care — and we’re upfront about what’s outside
              our scope.
            </p>
            <ul className={s.exclusions} data-reveal>
              {exclusions.map((e) => (
                <li key={e}>
                  <span className={s.x} aria-hidden="true">
                    <Icon name="close" />
                  </span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={s.faqHead} data-reveal="fade">
              Common questions from healthcare teams
            </p>
            <Faq items={healthFaqs} />
            <p className={s.faqMore}>
              More questions? Call <a href={site.phone.href} className="link">{site.phone.display}</a>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        tone="sage"
        title={
          <>
            Let’s take care of the rest<span className="dot-accent">.</span>
          </>
        }
        text="Opening a clinic, upgrading a hospital’s patient experience or planning a medical conference? Tell us about it."
        waMessage={waMsg}
      />
    </>
  );
}
