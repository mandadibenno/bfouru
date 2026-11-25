import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { site, whatsappLink } from '../data/site';
import { useScrollState } from '../lib/hooks';
import { Icon } from './Icon';
import s from './MobileActionBar.module.css';

/** Thumb-zone actions on phones — appears after the hero, hides near the footer. */
export function MobileActionBar() {
  const { y } = useScrollState();
  const { pathname } = useLocation();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);

  const show = y > 520 && !footerVisible && pathname !== '/contact';

  return (
    <div className={`${s.bar} ${show ? s.show : ''}`} aria-hidden={!show}>
      <a
        href={whatsappLink('Hi BFourU, I’d like to discuss a project.')}
        target="_blank"
        rel="noopener noreferrer"
        className={s.item}
        tabIndex={show ? 0 : -1}
      >
        <Icon name="whatsapp" />
        <span>WhatsApp</span>
      </a>
      <a href={site.phone.href} className={s.item} tabIndex={show ? 0 : -1}>
        <Icon name="phone" />
        <span>Call</span>
      </a>
      <Link to="/contact" className={s.primary} tabIndex={show ? 0 : -1}>
        Start a project
        <Icon name="arrow" />
      </Link>
    </div>
  );
}
