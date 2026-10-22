import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { seoPages } from './build/seo-plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      // After the build, writes one HTML file per route with page-specific
      // <title>, description, canonical and Open Graph tags, plus sitemap.xml
      // and robots.txt. Set VITE_SITE_URL in .env for absolute URLs.
      seoPages({ siteUrl: env.VITE_SITE_URL || 'https://imrgroups.in' }),
    ],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
  };
});
