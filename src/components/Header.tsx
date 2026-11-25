import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { clusters, servicesInCluster } from '../data/services';
import { site, whatsappLink } from '../data/site';
import { useBrief } from '../lib/brief';
import { useFocusTrap, useScrollLock, useScrollState } from '../lib/hooks';
import { Glyph } from './Glyph';
import { BtnArrow, Icon } from './Icon';
import { Logo } from './Logo';
import s from './Header.module.css';

export function Header() {
  const { pathname } = useLocation();
  const { y, dir } = useScrollState();
  const brief = useBrief();
  const [panel, setPanel] = useState(false);
  const [menu, setMenu] = useState(false);
  const [bump, setBump] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close overlays on navigation
  useEffect(() => {
    setPanel(false);
    setMenu(false);
  }, [pathname]);

  // Bump the brief counter when something is added
  useEffect(() => {
    if (!brief.pulse) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 600);
    return () => clearTimeout(t);
  }, [brief.pulse]);

  // Services panel: close on outside click / Escape
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) setPanel(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanel(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [panel]);

  const closeMenu = useCallback(() => setMenu(false), []);
  useScrollLock(menu);
  useFocusTrap(menu, menuRef, closeMenu);

  const hidden = dir === 'down' && y > 160 && !panel && !menu;
  const scrolled = y > 8;
  const count = brief.items.length;

  return (
    <>
    <header
      className={`${s.header} ${hidden ? s.hidden : ''} ${scrolled || panel ? s.scrolled : ''}`}
      data-panel={panel ? 'open' : undefined}
    >
      <div className={`container ${s.bar}`}>
        <Link to="/" className={s.logoLink} aria-label="BFourU — home">
          <Logo />
        </Link>

        <nav className={s.nav} aria-label="Main">
          <ul className={s.navList}>
            <li>
              <button
                ref={triggerRef}
                type="button"
                className={`${s.navItem} ${pathname.startsWith('/services') ? s.active : ''}`}
                aria-expanded={panel}
                aria-controls="services-panel"
                onClick={() => setPanel((v) => !v)}
              >
                Services
                <Icon name="chevron" className={s.chev} />
              </button>
            </li>
            <li>
              <NavLink to="/healthcare" className={({ isActive }) => `${s.navItem} ${isActive ? s.active : ''}`}>
                Healthcare
              </NavLink>
            </li>
            <li>
              <NavLink to="/approach" className={({ isActive }) => `${s.navItem} ${isActive ? s.active : ''}`}>
                Approach
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `${s.navItem} ${isActive ? s.active : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={s.actions}>
          {count > 0 && (
            <button
              type="button"
              className={`${s.briefBtn} ${bump ? s.bump : ''}`}
              onClick={() => brief.setOpen(true)}
              aria-label={`Your brief: ${count} service${count === 1 ? '' : 's'}. Open brief`}
            >
              <span className={s.briefLabel}>Brief</span>
              <span className={s.count}>{count}</span>
            </button>
          )}
          <Link to="/contact" className={`btn btn--sm ${s.cta}`}>
            Start a project
            <BtnArrow />
          </Link>
          <button
            type="button"
            className={s.menuBtn}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? 'Close menu' : 'Open menu'}
            onClick={() => setMenu((v) => !v)}
          >
            <Icon name={menu ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Desktop services panel */}
      <div
        id="services-panel"
        ref={panelRef}
        className={`${s.panel} ${panel ? s.panelOpen : ''}`}
        role="region"
        aria-label="Services"
        hidden={!panel}
      >
        <div className={`container ${s.panelGrid}`}>
          {clusters.map((c) => (
            <div key={c.id} className={s.panelCol}>
              <Link to={`/services#${c.id}`} className={s.panelCluster}>
                <span className={s.panelNum}>{c.number}</span>
                {c.name}
              </Link>
              <ul>
                {servicesInCluster(c.id).map((sv) => (
                  <li key={sv.slug}>
                    <Link to={`/services/${sv.slug}`} className={s.panelLink}>
                      <Glyph cells={sv.glyph.cells} accent={sv.glyph.accent} size={18} className={s.panelGlyph} />
                      <span>{sv.short}</span>
                      {sv.proposed && <span className={s.proposed}>Proposed</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`container ${s.panelFoot}`}>
          <Link to="/services" className="arrow-link">
            All 14 services <Icon name="arrow" />
          </Link>
          <Link to="/contact" className="arrow-link">
            Not sure what you need? Build a brief <Icon name="arrow" />
          </Link>
        </div>
      </div>

    </header>

      {/* Mobile menu — outside <header> so the header blur/transform never traps it */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${s.mobile} ${menu ? s.mobileOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!menu}
      >
        <div className={s.mobileTop}>
          <Link to="/" aria-label="BFourU — home" onClick={closeMenu}>
            <Logo />
          </Link>
          <button type="button" className={s.menuBtn} aria-label="Close menu" onClick={closeMenu}>
            <Icon name="close" />
          </button>
        </div>
        <nav className={s.mobileNav} aria-label="Mobile">
          <Link to="/services" className={s.mobileLink}>
            Services <span>14</span>
          </Link>
          <ul className={s.mobileClusters}>
            {clusters.map((c) => (
              <li key={c.id}>
                <Link to={`/services#${c.id}`}>
                  <span className={s.panelNum}>{c.number}</span> {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/healthcare" className={s.mobileLink}>
            Healthcare
          </Link>
          <Link to="/approach" className={s.mobileLink}>
            Approach
          </Link>
          <Link to="/insights" className={s.mobileLink}>
            Insights
          </Link>
          <Link to="/contact" className={s.mobileLink}>
            Contact
          </Link>
        </nav>
        <div className={s.mobileFoot}>
          <Link to="/contact" className="btn btn--block">
            Start a project
            <BtnArrow />
          </Link>
          <div className={s.mobileQuick}>
            <a className="btn btn--secondary btn--text-only" href={whatsappLink('Hi BFourU, I’d like to discuss a project.')} target="_blank" rel="noopener noreferrer">
              <span className="wa-dot" aria-hidden="true" /> WhatsApp
            </a>
            <a className="btn btn--secondary btn--text-only" href={site.phone.href}>
              <Icon name="phone" width={18} height={18} /> Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
