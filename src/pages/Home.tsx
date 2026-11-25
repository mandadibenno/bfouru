import { Link } from 'react-router-dom';
import { Commitments, Faq, PatientJourney, ProcessSteps, StartingPoints } from '../components/Blocks';
import { Glyph } from '../components/Glyph';
import { HeroMark } from '../components/HeroMark';
import { BtnArrow, Icon } from '../components/Icon';
import { CtaBand, SectionHead } from '../components/Section';
import { ClusterRows, DeliverableMarquee } from '../components/ServiceBits';
import { VendorDiagram } from '../components/VendorDiagram';
import { problems, principles, faqs } from '../data/content';
import { clusterById, services, totalDeliverables } from '../data/services';
import { site, whatsappLink } from '../data/site';
import { organizationLd, Seo } from '../lib/seo';
import s from './Home.module.css';

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Home() {
  return (
    <>
      <Seo
        title="BFourU — Branding, Digital Marketing, Websites & Automation | One Partner"
        description="One partner for branding, design, digital marketing, websites, automation, signage, print and events — with specialist support for doctors, clinics and hospitals."
        path="/"
        jsonLd={[organizationLd(), faqLd]}
      />

      {/* ================= HERO ================= */}
      <section className={s.hero} aria-labelledby="hero-title">
        <div className={`container ${s.heroInner}`}>
          <div className={s.heroTop}>
            <p className="eyebrow">Creative · Digital · Technology</p>
            <p className={s.heroFor}>For growing businesses &amp; healthcare teams</p>
          </div>

          <div className={s.heroMain}>
            <h1 id="hero-title" className={`display-xl ${s.heroTitle}`}>
              <span className={s.line}>
                <span>
                  One brand<span className="dot-accent">.</span>
                </span>
              </span>
              <span className={s.line}>
                <span>
                  Multiple solutions<span className="dot-accent">.</span>
                </span>
              </span>
              <span className={s.line}>
                <span>
                  Complete support<span className="dot-accent">.</span>
                </span>
              </span>
            </h1>
            <div className={s.heroMark}>
              <HeroMark />
            </div>
          </div>

          <div className={s.heroBottom}>
            <p className={`lead ${s.heroLead}`}>
              Brand, design, marketing, media, websites, automation, signage, print and events — under one roof. You get one
              accountable partner instead of a dozen vendors, and a brand that finally looks like one business everywhere.
            </p>
            <div className={s.heroCtas}>
              <Link to="/contact" className="btn">
                Start a project
                <BtnArrow />
              </Link>
              <a
                href={whatsappLink('Hi BFourU, I’d like to discuss a project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary btn--text-only"
              >
                <span className="wa-dot" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>
          </div>
        </div>

        <div className={s.heroShelf}>
          <DeliverableMarquee />
        </div>
      </section>

      {/* ================= 01 PROBLEM ================= */}
      <section className="section" aria-labelledby="problem-title">
        <div className={`container ${s.problem}`}>
          <div className={s.problemLeft}>
            <div className="section-head__top" data-reveal="fade">
              <span className="eyebrow">The problem</span>
              <span className="section-head__index">01</span>
            </div>
            <h2 id="problem-title" className={`h2 ${s.problemTitle}`} data-reveal>
              Most growing businesses are held together by a <span className="serif">patchwork</span> of vendors.
            </h2>
            <p className="lead" data-reveal>
              Every new need means a new supplier, a new brief and a new version of your brand. It costs time you don’t have — and
              it shows.
            </p>
          </div>
          <ol className={s.problemList}>
            {problems.map((p, i) => (
              <li key={p.text} className={s.problemItem} data-reveal style={{ ['--d' as string]: `${i * 50}ms` }}>
                <span className={s.problemNum}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="h4">{p.text}</h3>
                  <p>{p.detail}</p>
                </div>
                <span className={s.problemFix}>
                  {p.cluster === 'all' ? (
                    <>
                      <Icon name="arrow" /> One partner
                    </>
                  ) : (
                    <>
                      <Icon name="arrow" /> {clusterById(p.cluster).short}
                    </>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= 02 ONE PARTNER ================= */}
      <section className="section band-ink" aria-labelledby="partner-title">
        <div className="container">
          <SectionHead
            index="02"
            label="The answer"
            id="partner-title"
            split
            title={
              <>
                One partner, <span className="serif">not ten vendors</span>
                <span className="dot-accent">.</span>
              </>
            }
            intro="One partner doesn’t mean one person doing everything. It means one brief, one point of contact and one brand standard — with specialist disciplines working to it."
          />
          <div data-reveal>
            <VendorDiagram />
          </div>
        </div>
      </section>

      {/* ================= 03 WHAT WE DO ================= */}
      <section className="section" aria-labelledby="services-title" id="what-we-do">
        <div className="container">
          <SectionHead
            index="03"
            label="What we do"
            id="services-title"
            split
            title={
              <>
                {services.length} services. Five ways we help<span className="dot-accent">.</span>
              </>
            }
            intro={
              <>
                {totalDeliverables} deliverables — from a logo to LED signage — organised around the questions businesses
                actually ask.{' '}
                <Link to="/services" className="link">
                  Browse all services
                </Link>
              </>
            }
          />
          <ClusterRows />
        </div>
      </section>

      {/* ================= 04 HEALTHCARE ================= */}
      <section className="section band-sage" aria-labelledby="health-title">
        <div className={`container ${s.healthGrid}`}>
          <div className={s.healthLeft}>
            <div className="section-head__top" data-reveal="fade">
              <span className="eyebrow">Healthcare specialisation</span>
              <span className="section-head__index">04</span>
            </div>
            <h2 id="health-title" className={`display-l ${s.healthTitle}`} data-reveal>
              You care for patients<span className={s.tealDot}>.</span> We take care of <span className="serif">the rest</span>
              <span className={s.tealDot}>.</span>
            </h2>
            <p className="lead" data-reveal>
              Non-clinical support for doctors, clinics and hospitals — from the first Google search to the follow-up
              reminder. Always ethical, always consent-first.
            </p>
            <div className={s.healthCtas} data-reveal>
              <Link to="/healthcare" className="btn">
                Explore healthcare
                <BtnArrow />
              </Link>
            </div>
          </div>
          <div className={s.healthRight}>
            <p className={s.journeyHead} data-reveal="fade">
              A patient’s visit, start to finish
            </p>
            <PatientJourney compact />
            <ul className={s.healthPromises} data-reveal>
              <li>
                <Icon name="check" /> Doctor-approved content
              </li>
              <li>
                <Icon name="check" /> Consent before camera
              </li>
              <li>
                <Icon name="check" /> No diagnosis by bots
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= 05 STARTING POINTS ================= */}
      <section className="section" aria-labelledby="start-title">
        <div className="container">
          <SectionHead
            index="05"
            label="Starting points"
            id="start-title"
            split
            title={
              <>
                Not sure where to begin? Start with a set<span className="dot-accent">.</span>
              </>
            }
            intro="Common combinations for common moments. Add a set to your brief, then make it yours — remove what you don’t need, add what you do."
          />
          <StartingPoints />
        </div>
      </section>

      {/* ================= 06 PROCESS ================= */}
      <section className="section band-paper2" aria-labelledby="process-title">
        <div className={`container ${s.processGrid}`}>
          <div className={s.processLeft}>
            <div className="section-head__top" data-reveal="fade">
              <span className="eyebrow">How we work</span>
              <span className="section-head__index">06</span>
            </div>
            <h2 id="process-title" className="h2" data-reveal>
              Six steps. One point of contact throughout<span className="dot-accent">.</span>
            </h2>
            <p className="lead" data-reveal>
              Project-based or by subscription, every engagement follows the same clear path — with nothing going live
              without your approval.
            </p>
            <Link to="/approach" className="arrow-link" data-reveal>
              Our approach &amp; engagement models <Icon name="arrow" />
            </Link>
          </div>
          <ProcessSteps />
        </div>
      </section>

      {/* ================= 07 PRINCIPLES ================= */}
      <section className="section" aria-labelledby="principles-title">
        <div className="container">
          <SectionHead
            index="07"
            label="What you can count on"
            id="principles-title"
            split
            title={
              <>
                Honest work, done properly<span className="dot-accent">.</span>
              </>
            }
            intro="No inflated numbers, no borrowed logos, no promises we can’t keep. Just clear scopes, consistent craft and a team that answers the phone."
          />
          <ul className={s.principles}>
            {principles.map((p, i) => (
              <li key={p.title} data-reveal style={{ ['--d' as string]: `${i * 70}ms` }}>
                <Glyph
                  cells={(['tl', 'ci', 'sq', 'br'] as const).map((c, k) => (k === i ? 'ci' : c)) as ['tl', 'ci', 'sq', 'br']}
                  accent={i as 0 | 1 | 2 | 3}
                  size={30}
                />
                <h3 className="h4">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
          <div className={s.commitWrap}>
            <p className={s.commitHead} data-reveal="fade">
              And for healthcare clients, six care commitments:
            </p>
            <Commitments />
          </div>
        </div>
      </section>

      {/* ================= 08 FAQ ================= */}
      <section className="section band-paper2" aria-labelledby="faq-title">
        <div className={`container ${s.faqGrid}`}>
          <div className={s.faqLeft}>
            <div className="section-head__top" data-reveal="fade">
              <span className="eyebrow">FAQ</span>
              <span className="section-head__index">08</span>
            </div>
            <h2 id="faq-title" className="h2" data-reveal>
              Questions, answered<span className="dot-accent">.</span>
            </h2>
            <p className="lead" data-reveal>
              Something else on your mind?{' '}
              <a href={whatsappLink('Hi BFourU, I have a question.')} target="_blank" rel="noopener noreferrer" className="link">
                Ask us on WhatsApp
              </a>{' '}
              or call <a href={site.phone.href} className="link">{site.phone.display}</a>.
            </p>
          </div>
          <Faq />
        </div>
      </section>

      <CtaBand tone="sage" />
    </>
  );
}
