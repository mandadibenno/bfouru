import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Glyph } from '../components/Glyph';
import { BtnArrow, Icon } from '../components/Icon';
import { clusters, serviceBySlug, servicesInCluster } from '../data/services';
import { mailtoLink, site, whatsappLink } from '../data/site';
import { useBrief } from '../lib/brief';
import { pageSeo } from '../data/seo';
import { breadcrumbLd, organizationLd, Seo } from '../lib/seo';
import s from './Contact.module.css';

const businessTypes = [
  { id: 'startup', label: 'Startup / new venture' },
  { id: 'sme', label: 'Small or medium business' },
  { id: 'established', label: 'Established company' },
  { id: 'doctor', label: 'Individual doctor' },
  { id: 'clinic', label: 'Clinic' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'diagnostic', label: 'Diagnostic centre' },
  { id: 'medical-org', label: 'Medical college / association' },
  { id: 'other', label: 'Something else' },
];

const ways = [
  { id: 'project', label: 'Project-based', hint: 'A defined piece of work' },
  { id: 'subscription', label: 'Subscription', hint: 'Ongoing monthly support' },
  { id: 'unsure', label: 'Not sure yet', hint: 'Help me decide' },
];

type Errors = Partial<Record<'name' | 'phone' | 'email' | 'consent' | 'need', string>>;

export default function Contact() {
  const brief = useBrief();
  const [params] = useSearchParams();
  const [type, setType] = useState('');
  const [way, setWay] = useState('unsure');
  const [unsure, setUnsure] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<null | 'whatsapp' | 'email' | 'form'>(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const errorRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Prefill from URL: /contact?service=slug&type=clinic
  useEffect(() => {
    const sv = params.get('service');
    if (sv && serviceBySlug(sv)) brief.add(sv);
    const t = params.get('type');
    if (t && businessTypes.some((b) => b.id === t)) setType(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const summary = useMemo(() => {
    const lines: (string | false)[] = [
      'Hi BFourU, here is my project brief.',
      '',
      `• I am: ${businessTypes.find((b) => b.id === type)?.label ?? '—'}`,
      `• Services: ${brief.items.length ? brief.items.map((x) => serviceBySlug(x)?.name).join('; ') : '—'}${unsure ? ' (+ help me decide)' : ''}`,
      `• Way of working: ${ways.find((w) => w.id === way)?.label}`,
      `• Name: ${form.name.trim()}`,
      `• Phone / WhatsApp: ${form.phone.trim()}`,
      !!form.email.trim() && `• Email: ${form.email.trim()}`,
      !!form.city.trim() && `• City: ${form.city.trim()}`,
      !!form.message.trim() && `\n${form.message.trim()}`,
    ];
    // `false` marks an omitted optional line; '' is an intentional blank line.
    return lines.filter((l): l is string => l !== false).join('\n');
  }, [type, brief.items, unsure, way, form]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please tell us your name.';
    const digits = form.phone.replace(/[^\d]/g, '');
    if (!digits) e.phone = 'Please add a phone or WhatsApp number so we can reach you.';
    else if (digits.length < 10 || digits.length > 13) e.phone = 'That number looks incomplete — please check it.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'Please check the email address.';
    if (!brief.items.length && !unsure && !form.message.trim())
      e.need = 'Choose at least one service, tick “Help me decide”, or describe what you need.';
    if (!consent) e.consent = 'Please confirm we may contact you about this enquiry.';
    return e;
  };

  const submit = async (channel: 'whatsapp' | 'email' | 'form', ev?: FormEvent) => {
    ev?.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => {
        errorRef.current?.focus();
        const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
        first?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
      return;
    }
    if (channel === 'whatsapp') {
      window.open(whatsappLink(summary), '_blank', 'noopener,noreferrer');
      setSent('whatsapp');
    } else if (channel === 'email') {
      window.location.href = mailtoLink(`Project brief — ${form.name.trim()}`, summary);
      setSent('email');
    } else {
      try {
        setSubmitting(true);
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            type,
            services: brief.items,
            helpDecide: unsure,
            way,
            ...form,
            consent,
            summary,
          }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setSent('form');
      } catch {
        setErrors({ need: 'Sorry — we couldn’t send that just now. Please use WhatsApp or email instead.' });
      } finally {
        setSubmitting(false);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked */
    }
  };

  const errorList = Object.values(errors).filter(Boolean);

  return (
    <>
      <Seo
        {...pageSeo.contact}
        path="/contact"
        jsonLd={[
          organizationLd(),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ]}
      />

      <section className={s.hero}>
        <div className={`container ${s.heroInner}`}>
          <div className={s.heroTop}>
            <span className="eyebrow">Start a project</span>
            <span className="section-head__index">Takes about 2 minutes</span>
          </div>
          <h1 className={`display-l ${s.title}`}>
            Let’s put your brief together<span className="dot-accent">.</span>
          </h1>
          <p className={`lead ${s.lead}`}>
            Choose what you need, add a few details and send it the way you prefer. No long forms, no obligation — just the start
            of a conversation.
          </p>
        </div>
      </section>

      <section className={s.main} aria-label="Brief builder and contact options">
        <div className={`container ${s.grid}`}>
          {sent ? (
            <div className={s.done} role="status">
              <span className={s.doneIcon}>
                <Icon name="check" />
              </span>
              <h2 className="h2">
                {sent === 'form' ? 'Brief sent. Thank you!' : sent === 'whatsapp' ? 'Your brief is ready in WhatsApp.' : 'Your brief is ready in your email app.'}
              </h2>
              <p className="lead">
                {sent === 'form'
                  ? 'We’ve received your brief and will be in touch to understand your requirements.'
                  : 'Just press send in the window that opened. If nothing opened, copy your brief below and send it to us directly.'}
              </p>
              {sent !== 'form' && (
                <div className={s.doneActions}>
                  <button type="button" className="btn btn--secondary btn--text-only" onClick={copy}>
                    <Icon name={copied ? 'check' : 'copy'} width={18} height={18} />
                    {copied ? 'Copied' : 'Copy my brief'}
                  </button>
                  <button type="button" className="btn btn--secondary btn--text-only" onClick={() => setSent(null)}>
                    Edit brief
                  </button>
                </div>
              )}
              <ol className={s.next}>
                <li>
                  <span>01</span>We read your brief and get in touch to understand your requirements.
                </li>
                <li>
                  <span>02</span>We recommend the right mix of services — nothing you don’t need.
                </li>
                <li>
                  <span>03</span>You receive a customised proposal and quotation.
                </li>
              </ol>
              <Link to="/" className="arrow-link">
                Back to home <Icon name="arrow" />
              </Link>
            </div>
          ) : (
            <form ref={formRef} className={s.form} noValidate onSubmit={(e) => submit(site.formEndpoint ? 'form' : 'whatsapp', e)}>
              {errorList.length > 0 && (
                <div ref={errorRef} className={s.errorBox} role="alert" tabIndex={-1}>
                  <strong>Please check {errorList.length === 1 ? 'one thing' : `${errorList.length} things`}:</strong>
                  <ul>
                    {errorList.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 1 — type */}
              <fieldset className={s.step}>
                <legend className={s.legend}>
                  <span className={s.stepNum}>01</span>
                  <span>
                    You are… <small>optional</small>
                  </span>
                </legend>
                <div className={s.chips} role="radiogroup" aria-label="Type of business">
                  {businessTypes.map((b) => (
                    <label key={b.id} className={`${s.chip} ${type === b.id ? s.chipOn : ''}`}>
                      <input type="radio" name="type" value={b.id} checked={type === b.id} onChange={() => setType(b.id)} />
                      {b.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 2 — services */}
              <fieldset className={s.step} aria-describedby={errors.need ? 'need-error' : undefined}>
                <legend className={s.legend}>
                  <span className={s.stepNum}>02</span>
                  <span>
                    You need… <small>{brief.items.length ? `${brief.items.length} selected` : 'choose any'}</small>
                  </span>
                </legend>
                <div className={s.serviceGroups}>
                  {clusters.map((c) => (
                    <div key={c.id} className={s.group}>
                      <p className={s.groupName}>
                        <span>{c.number}</span> {c.name}
                      </p>
                      <div className={s.chips}>
                        {servicesInCluster(c.id).map((sv) => {
                          const on = brief.has(sv.slug);
                          return (
                            <label key={sv.slug} className={`${s.chip} ${s.svcChip} ${on ? s.chipOn : ''}`}>
                              <input type="checkbox" checked={on} onChange={() => brief.toggle(sv.slug)} />
                              <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={16} className={s.chipGlyph} />
                              {sv.short}
                              {sv.proposed && <em className={s.prop}>proposed</em>}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <label className={`${s.chip} ${s.unsureChip} ${unsure ? s.chipOn : ''}`}>
                    <input type="checkbox" checked={unsure} onChange={(e) => setUnsure(e.target.checked)} />
                    <Icon name="plus" width={16} height={16} /> Not sure — help me decide
                  </label>
                </div>
                {errors.need && (
                  <p id="need-error" className={s.fieldError}>
                    {errors.need}
                  </p>
                )}
              </fieldset>

              {/* 3 — way of working */}
              <fieldset className={s.step}>
                <legend className={s.legend}>
                  <span className={s.stepNum}>03</span>
                  <span>Way of working</span>
                </legend>
                <div className={s.ways} role="radiogroup" aria-label="Way of working">
                  {ways.map((w) => (
                    <label key={w.id} className={`${s.way} ${way === w.id ? s.wayOn : ''}`}>
                      <input type="radio" name="way" value={w.id} checked={way === w.id} onChange={() => setWay(w.id)} />
                      <strong>{w.label}</strong>
                      <span>{w.hint}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 4 — details */}
              <fieldset className={s.step}>
                <legend className={s.legend}>
                  <span className={s.stepNum}>04</span>
                  <span>Your details</span>
                </legend>
                <div className={s.fields}>
                  <div className={s.field}>
                    <label htmlFor="f-name">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="f-name"
                      name="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set('name')}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'e-name' : undefined}
                      required
                    />
                    {errors.name && (
                      <p id="e-name" className={s.fieldError}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className={s.field}>
                    <label htmlFor="f-phone">
                      Phone / WhatsApp <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="f-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+91"
                      value={form.phone}
                      onChange={set('phone')}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'e-phone' : undefined}
                      required
                    />
                    {errors.phone && (
                      <p id="e-phone" className={s.fieldError}>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div className={s.field}>
                    <label htmlFor="f-email">
                      Email <small>optional</small>
                    </label>
                    <input
                      id="f-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={set('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'e-email' : undefined}
                    />
                    {errors.email && (
                      <p id="e-email" className={s.fieldError}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div className={s.field}>
                    <label htmlFor="f-city">
                      City <small>optional</small>
                    </label>
                    <input id="f-city" name="city" autoComplete="address-level2" value={form.city} onChange={set('city')} />
                  </div>
                  <div className={`${s.field} ${s.full}`}>
                    <label htmlFor="f-msg">
                      Anything else? <small>optional</small>
                    </label>
                    <textarea
                      id="f-msg"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Timelines, number of locations, what you have today…"
                    />
                  </div>
                </div>
                <label className={`${s.consent} ${errors.consent ? s.consentErr : ''}`}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-invalid={!!errors.consent}
                    aria-describedby="consent-text"
                  />
                  <span id="consent-text">
                    I agree that BFourU may contact me about this enquiry. My details will only be used to respond and prepare a
                    quotation — see the <Link to="/privacy">privacy notice</Link>.
                  </span>
                </label>
              </fieldset>

              <div className={s.submit}>
                {site.formEndpoint ? (
                  <>
                    <button type="submit" className="btn" disabled={submitting}>
                      {submitting ? 'Sending…' : 'Send my brief'}
                      <BtnArrow />
                    </button>
                    <button type="button" className="btn btn--secondary btn--text-only" onClick={() => submit('whatsapp')}>
                      <span className="wa-dot" aria-hidden="true" /> Send on WhatsApp
                    </button>
                  </>
                ) : (
                  <>
                    <button type="submit" className="btn">
                      Send on WhatsApp
                      <BtnArrow />
                    </button>
                    <button type="button" className="btn btn--secondary btn--text-only" onClick={() => submit('email')}>
                      <Icon name="mail" width={18} height={18} /> Send by email instead
                    </button>
                  </>
                )}
              </div>
            </form>
          )}

          {/* Direct channels */}
          <aside className={s.aside} aria-label="Contact BFourU directly">
            <div className={s.asideCard}>
              <p className={s.asideHead}>Prefer to talk?</p>
              <a href={whatsappLink('Hi BFourU, I’d like to discuss a project.')} target="_blank" rel="noopener noreferrer" className={s.channel}>
                <span className={`${s.chIcon} ${s.chWa}`}>
                  <Icon name="whatsapp" />
                </span>
                <span>
                  <strong>WhatsApp</strong>
                  <small>{site.whatsapp.display}</small>
                </span>
                <Icon name="arrow-up-right" className={s.chArrow} />
              </a>
              <a href={site.phone.href} className={s.channel}>
                <span className={s.chIcon}>
                  <Icon name="phone" />
                </span>
                <span>
                  <strong>Call</strong>
                  <small>{site.phone.display}</small>
                </span>
                <Icon name="arrow-up-right" className={s.chArrow} />
              </a>
              <a href={`mailto:${site.email}`} className={s.channel}>
                <span className={s.chIcon}>
                  <Icon name="mail" />
                </span>
                <span>
                  <strong>Email</strong>
                  <small className={s.break}>{site.email}</small>
                </span>
                <Icon name="arrow-up-right" className={s.chArrow} />
              </a>
            </div>
            <div className={s.asideNext}>
              <p className={s.asideHead}>What happens next</p>
              <ol>
                <li>
                  <span>01</span> We understand your requirements.
                </li>
                <li>
                  <span>02</span> We shape a customised solution.
                </li>
                <li>
                  <span>03</span> You get a clear proposal and quotation.
                </li>
              </ol>
              <p className={s.asideNote}>Pricing is always customised to your scope. Project-based and subscription options available.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
