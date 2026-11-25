import { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { BriefToast, BriefTray } from './components/BriefTray';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileActionBar } from './components/MobileActionBar';
import { BriefProvider } from './lib/brief';
import { useRevealAll } from './lib/hooks';
import Approach from './pages/Approach';
import Contact from './pages/Contact';
import Healthcare from './pages/Healthcare';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Service from './pages/Service';
import Services from './pages/Services';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        // Wait a frame so the new route has painted
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }));
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  useRevealAll(pathname);

  // Fade pages in only on in-app navigation — the first, prerendered page should paint instantly.
  const firstPath = useRef(pathname);
  const navigated = useRef(false);
  if (pathname !== firstPath.current) navigated.current = true;

  // Move focus to main content on route change (screen-reader friendly), without scrolling.
  useEffect(() => {
    const main = document.getElementById('main');
    if (main && document.activeElement && document.activeElement !== document.body) {
      main.focus({ preventScroll: true });
    }
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} key={pathname} className={navigated.current ? 'page-enter' : undefined} style={{ outline: 'none' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<Service />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BriefTray />
      <BriefToast />
      <MobileActionBar />
    </>
  );
}

export default function App() {
  return (
    <BriefProvider>
      <ScrollManager />
      <Shell />
    </BriefProvider>
  );
}
