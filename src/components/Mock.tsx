import type { CSSProperties } from 'react';
import type { MockType } from '../data/services';
import { Glyph } from './Glyph';
import s from './Mock.module.css';

/**
 * Illustrative deliverables built entirely in HTML/CSS — light, crisp at any size,
 * and honest: they demonstrate the *kind* of work, not claimed client work.
 * All names shown are fictional.
 */
export function Mock({ type, className, style }: { type: MockType; className?: string; style?: CSSProperties }) {
  return (
    <div className={`${s.mock} ${className ?? ''}`} style={style} aria-hidden="true">
      {render(type)}
    </div>
  );
}

const ClientMark = ({ size = '1.6em' }: { size?: string }) => (
  <Glyph cells={['ci', 'tr', 'bl', 'ci']} accent={0} size={size} style={{ ['--glyph-accent' as string]: 'var(--marigold)' }} />
);

function render(type: MockType) {
  switch (type) {
    case 'identity':
      return (
        <div className={s.identity}>
          <div className={`${s.idCard} ${s.idBack}`}>
            <ClientMark size="3.4em" />
          </div>
          <div className={`${s.idCard} ${s.idFront}`}>
            <div className={s.idBrand}>
              <ClientMark size="1.5em" />
              <span>aarogya</span>
            </div>
            <div className={s.idPerson}>
              <strong>Dr. A. Nair</strong>
              <span>Consultant Paediatrician</span>
            </div>
            <div className={s.idLines}>
              <i />
              <i />
            </div>
          </div>
          <div className={s.swatches}>
            <i style={{ background: '#1E6B58' }} />
            <i style={{ background: 'var(--marigold)' }} />
            <i style={{ background: '#10211C' }} />
            <i style={{ background: '#FBF8F2' }} />
          </div>
        </div>
      );
    case 'social':
      return (
        <div className={s.phone}>
          <div className={s.phoneScreen}>
            <div className={s.postHead}>
              <span className={s.avatar} />
              <span className={s.handle}>aarogya.clinic</span>
              <span className={s.dots}>•••</span>
            </div>
            <div className={s.post}>
              <span className={s.postKicker}>29 September</span>
              <span className={s.postTitle}>World Heart Day</span>
              <span className={s.postSub}>Know your numbers. Book a check-up.</span>
              <span className={s.postHeart} />
            </div>
            <div className={s.postActions}>
              <i />
              <i />
              <i />
              <b />
            </div>
            <div className={s.caption}>
              <i style={{ width: '80%' }} />
              <i style={{ width: '55%' }} />
            </div>
          </div>
        </div>
      );
    case 'camera':
      return (
        <div className={s.camera}>
          <div className={s.scene}>
            <span className={s.subjectHead} />
            <span className={s.subjectBody} />
            <span className={s.sceneWindow} />
          </div>
          <span className={`${s.corner} ${s.c1}`} />
          <span className={`${s.corner} ${s.c2}`} />
          <span className={`${s.corner} ${s.c3}`} />
          <span className={`${s.corner} ${s.c4}`} />
          <span className={s.focus} />
          <div className={s.camTop}>
            <span className={s.rec}>
              <i /> REC
            </span>
            <span className={s.mono}>00:02:14:08</span>
          </div>
          <div className={s.camBottom}>
            <span>Doctor profile — Take 3</span>
            <span className={s.mono}>ISO 400 · f/2.8</span>
          </div>
        </div>
      );
    case 'report':
      return (
        <div className={s.sheet} style={{ width: '20em' }}>
          <div className={s.sheetHead}>
            <strong>Monthly report</strong>
            <span className={s.pill}>November</span>
          </div>
          <div className={s.bars}>
            {[34, 42, 38, 55, 61, 78].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} className={i === 5 ? s.barHot : undefined} />
            ))}
          </div>
          <div className={s.kpis}>
            {['Reach', 'Profile views', 'Enquiries'].map((k) => (
              <div key={k} className={s.kpi}>
                <span>{k}</span>
                <i className={s.up} />
              </div>
            ))}
          </div>
        </div>
      );
    case 'browser':
      return (
        <div className={s.browser}>
          <div className={s.browserBar}>
            <span className={s.lights}>
              <i />
              <i />
              <i />
            </span>
            <span className={s.url}>aarogyaclinic.in</span>
          </div>
          <div className={s.browserBody}>
            <div className={s.siteHero}>
              <span className={s.siteKicker}>Paediatrics</span>
              <span className={s.siteTitle}>Gentle care, close to home.</span>
              <span className={s.siteBtn}>Book a visit</span>
            </div>
            <div className={s.booking}>
              <span className={s.bookingHead}>Choose a time</span>
              <div className={s.slots}>
                {['10:00', '10:30', '11:00', '11:30', '12:00', '12:30'].map((t, i) => (
                  <span key={t} className={i === 1 ? s.slotOn : i === 4 ? s.slotOff : undefined}>
                    {t}
                  </span>
                ))}
              </div>
              <span className={s.bookingCta}>Confirm 10:30</span>
            </div>
          </div>
        </div>
      );
    case 'whatsapp':
      return (
        <div className={s.chat}>
          <div className={s.chatHead}>
            <span className={s.chatAvatar}>A</span>
            <span>
              <strong>Aarogya Clinic</strong>
              <small>Business account</small>
            </span>
          </div>
          <div className={s.chatBody}>
            <p className={s.bIn}>
              Hi Priya, a reminder that your appointment with Dr. Nair is tomorrow at 10:30 AM. Reply 1 to confirm or 2 to
              reschedule.<small>6:02 PM</small>
            </p>
            <p className={s.bOut}>
              1<small>6:04 PM ✓✓</small>
            </p>
            <p className={s.bIn}>
              Confirmed — see you tomorrow!<small>6:04 PM</small>
            </p>
          </div>
        </div>
      );
    case 'dashboard':
      return (
        <div className={s.dash}>
          <div className={s.dashSide}>
            <ClientMark size="1.5em" />
            <i />
            <i />
            <i />
          </div>
          <div className={s.dashMain}>
            <div className={s.sheetHead}>
              <strong>Today’s OPD</strong>
              <span className={s.pillAccent}>Proposed</span>
            </div>
            <div className={s.stats}>
              <span>
                <b>18</b>Appointments
              </span>
              <span>
                <b>4</b>Waiting
              </span>
              <span>
                <b>6</b>Follow-ups
              </span>
            </div>
            <div className={s.rows}>
              {[
                ['A-021', 'Checked in', s.stTeal],
                ['A-022', 'In consult', s.stAccent],
                ['A-023', 'Waiting', s.stGrey],
              ].map(([t, st, c]) => (
                <div key={t} className={s.row}>
                  <span className={s.mono}>{t}</span>
                  <i />
                  <span className={`${s.status} ${c}`}>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'opd':
      return (
        <div className={s.tvWrap}>
          <div className={s.tv}>
            <div className={s.tvScreen}>
              <div className={s.tvTop}>
                <span>Aarogya Clinic · OPD</span>
                <span className={s.mono}>10:42</span>
              </div>
              <div className={s.tvMain}>
                <div className={s.nowServing}>
                  <span className={s.tvLabel}>Now serving</span>
                  <span className={s.token}>A-024</span>
                  <span className={s.room}>Room 3 · Dr. A. Nair</span>
                </div>
                <div className={s.upNext}>
                  <span className={s.tvLabel}>Up next</span>
                  {['A-025', 'A-026', 'A-027'].map((t, i) => (
                    <span key={t} className={s.nextRow}>
                      <b className={s.mono}>{t}</b>
                      <span>Room {i === 1 ? 1 : 3}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.ticker}>
                <span>
                  Please keep your token slip ready · Stay hydrated while you wait · Ask us about vaccination schedules ·
                  Please keep your token slip ready · Stay hydrated while you wait · Ask us about vaccination schedules ·
                </span>
              </div>
            </div>
          </div>
          <span className={s.tvStand} />
        </div>
      );
    case 'status':
      return (
        <div className={s.sheet} style={{ width: '20em' }}>
          <div className={s.sheetHead}>
            <strong>System health</strong>
            <span className={s.okPill}>
              <i /> All good
            </span>
          </div>
          <ul className={s.statusList}>
            {[
              ['Nightly backup', 'Completed 02:00'],
              ['Network & Wi-Fi', 'Healthy'],
              ['Professional email', 'Healthy'],
              ['Reception display', 'Online'],
              ['Software updates', '2 scheduled'],
            ].map(([k, v], i) => (
              <li key={k}>
                <i className={i === 4 ? s.dotAmber : s.dotOk} />
                <span>{k}</span>
                <span className={s.statusVal}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'wayfinding':
      return (
        <div className={s.signWrap}>
          <div className={s.sign}>
            <div className={s.signHead}>
              <ClientMark size="1.4em" />
              <span>Aarogya Hospital</span>
            </div>
            {[
              ['OPD', '←', 'O'],
              ['Radiology', '→', 'R'],
              ['Pharmacy', '↑', 'P'],
              ['Lifts', '↗', 'L'],
            ].map(([label, arrow, letter]) => (
              <div key={label} className={s.signRow}>
                <span className={s.pict}>{letter}</span>
                <span className={s.signLabel}>{label}</span>
                <span className={s.signArrow}>{arrow}</span>
              </div>
            ))}
            <span className={s.signStrip} />
          </div>
          <span className={s.leg} />
          <span className={`${s.leg} ${s.legR}`} />
        </div>
      );
    case 'print':
      return (
        <div className={s.printWrap}>
          <div className={`${s.paper} ${s.paperBack}`}>
            <div className={s.lhHead}>
              <ClientMark size="1.4em" />
              <i />
            </div>
            <div className={s.ruled}>
              {Array.from({ length: 7 }).map((_, i) => (
                <i key={i} />
              ))}
            </div>
          </div>
          <div className={`${s.paper} ${s.paperFront}`}>
            <div className={s.rxHead}>
              <div>
                <strong>Dr. A. Nair</strong>
                <span>MBBS, MD (Paediatrics)</span>
              </div>
              <ClientMark size="1.6em" />
            </div>
            <span className={s.rx}>Rx</span>
            <div className={s.ruled}>
              {Array.from({ length: 6 }).map((_, i) => (
                <i key={i} />
              ))}
            </div>
            <span className={s.rxFoot} />
          </div>
        </div>
      );
    case 'merch':
      return (
        <div className={s.merch}>
          <div className={s.tote}>
            <span className={s.toteHandle} />
            <div className={s.toteBody}>
              <ClientMark size="3em" />
              <span>aarogya</span>
            </div>
          </div>
          <div className={s.bottle}>
            <span className={s.cap} />
            <div className={s.bottleBody}>
              <ClientMark size="1.4em" />
            </div>
          </div>
          <div className={s.notebook}>
            <span className={s.band} />
            <span className={s.nbTitle}>Notes</span>
          </div>
        </div>
      );
    case 'badge':
      return (
        <div className={s.badgeWrap}>
          <span className={s.strapL} />
          <span className={s.strapR} />
          <span className={s.clip} />
          <div className={s.badge}>
            <div className={s.badgeTop}>
              <span>CME Summit</span>
              <small>Annual conference</small>
            </div>
            <div className={s.badgeBody}>
              <span className={s.badgeRole}>Delegate</span>
              <strong>Dr. R. Iyer</strong>
              <span className={s.qr}>
                {'1011010110110010101101101'.split('').map((b, i) => (
                  <i key={i} style={{ opacity: b === '1' ? 1 : 0.08 }} />
                ))}
              </span>
            </div>
          </div>
        </div>
      );
    case 'calendar':
      return (
        <div className={s.sheet} style={{ width: '18em' }}>
          <div className={s.calHead}>
            <span className={s.calKicker}>Pregnancy calendar</span>
            <strong className={s.calWeek}>Week 24</strong>
          </div>
          <div className={s.calRing}>
            <span>
              24<small>/40</small>
            </span>
          </div>
          <ul className={s.checklist}>
            <li className={s.done}>Stay hydrated</li>
            <li className={s.done}>Gentle daily walk</li>
            <li>Next visit — as advised</li>
          </ul>
          <span className={s.reviewed}>✓ Reviewed by your doctor</span>
        </div>
      );
  }
}
