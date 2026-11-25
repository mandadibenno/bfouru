import { site } from "../data/site";
import { Seo } from "../lib/seo";
import p from "./Page.module.css";

/**
 * Plain-language privacy notice for the website's enquiry flow.
 * NOTE: This is a starting template written for the site's actual behaviour.
 * Have it reviewed by a legal professional before launch (see docs/CONTENT-TO-CONFIRM.md).
 */
export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Notice | BFourU"
        description="How BFourU handles the information you share through this website, in plain language."
        path="/privacy"
      />
      <section className={p.pageHero}>
        <div className={`container ${p.pageHeroInner}`}>
          <div className={p.pageHeroTop}>
            <span className="eyebrow">Privacy notice</span>
            <span className="section-head__index">Plain language</span>
          </div>
          <h1 className={`display-l ${p.pageTitle}`}>
            Your details, handled with care<span className="dot-accent">.</span>
          </h1>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={p.prose}>
            <p className="lead">
              This notice explains what information BFourU collects through this
              website, why, and the choices you have. We collect as little as
              possible.
            </p>

            <h2>What we collect</h2>
            <p>
              When you send us a brief or enquiry, we receive only what you
              choose to share:
            </p>
            <ul>
              <li>Your name and phone / WhatsApp number</li>
              <li>Optionally, your email address and city</li>
              <li>
                The type of business you run, the services you’re interested in
                and any message you add
              </li>
            </ul>

            <h2>How it reaches us</h2>
            <p>
              When you choose “Send on WhatsApp” or “Send by email”, your brief
              is prepared on your device and opened in your own WhatsApp or
              email app. Nothing is sent until you press send there. WhatsApp
              and your email provider process that message under their own
              terms.
            </p>

            <h2>Why we use it</h2>
            <p>
              Only to respond to your enquiry, understand your requirements and
              prepare a proposal or quotation. We don’t sell your information or
              use it for unrelated marketing.
            </p>

            <h2>On this device</h2>
            <p>
              Services you add to “Your brief” are saved in your browser’s local
              storage so the list survives a page reload. It stays on your
              device and you can clear it at any time from the brief panel. This
              website does not use advertising or analytics cookies, and fonts
              are served from our own site rather than third-party services.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry details only as long as needed to respond and, if
              we work together, to deliver the project and meet legal
              obligations.
            </p>

            <h2>Your rights</h2>
            <p>
              Under India’s Digital Personal Data Protection Act, 2023 you can
              ask to access, correct or erase your personal data, or withdraw
              consent. Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
              <a href={site.phone.href}>{site.phone.display}</a> and we’ll help.
            </p>

            <h2>Healthcare projects</h2>
            <p>
              Where our work for clinics or hospitals involves patient
              information, images or communications, it is carried out only with
              appropriate consent and under the safeguards agreed with that
              healthcare organisation.
            </p>

            <p className="small muted">
              This notice may be updated as our services evolve.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
