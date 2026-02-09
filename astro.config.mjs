import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://mydojo.software',
  redirects: {
    '/blog/karate-belt-colors-guide': '/blog/karate-belt-order-complete-guide',
    '/blog/karate-belt-ranking-system-guide': '/blog/karate-belt-order-complete-guide',
    '/blog/karate-belts-ranking-system-guide': '/blog/karate-belt-order-complete-guide',
    '/blog/karate-belts': '/blog/karate-belt-order-complete-guide',
  },
  integrations: [
    tailwind(),
    sitemap(),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
          collapseWhitespace: true,
          removeComments: true,
        }
      },
      Image: false, // We'll handle images separately
      JavaScript: true,
      SVG: true,
    })
  ],
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        }
      }
    }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  }
});
