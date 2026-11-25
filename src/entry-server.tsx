import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { HeadContext, renderHead, type HeadData } from './lib/seo';
import { services } from './data/services';

export const routes = [
  '/',
  '/services',
  ...services.map((s) => `/services/${s.slug}`),
  '/healthcare',
  '/approach',
  '/contact',
  '/privacy',
  '/404',
];

export function render(url: string) {
  const collector: { head?: HeadData } = {};
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  );
  return { html, head: collector.head ? renderHead(collector.head) : '', noindex: !!collector.head?.noindex };
}
