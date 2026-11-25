import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Every route is prerendered to its own HTML file, so serve them as a multi-page site
  // (no single-page fallback that would hand /contact the home page's HTML).
  appType: 'mpa',
  css: {
    modules: {
      // Short, readable class names in dev; compact hashes in production.
      generateScopedName: process.env.NODE_ENV === 'production' ? '[hash:base64:6]' : '[name]_[local]_[hash:base64:4]',
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 2048,
  },
  server: { port: 5173, host: true },
  preview: { port: 4173 },
});
