// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Host-agnostic static build. FR is the default locale, prefixed (/fr/), EN mirrored (/en/).
// Every external service (email, analytics, maps, 360) is OPTIONAL and isolated — none required to ship.
export default defineConfig({
  site: 'https://www.chateaudelesigny.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    '/': '/fr/',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-FR', en: 'en-US' },
      },
    }),
  ],
  image: {
    // astro:assets uses sharp by default → AVIF/WebP/srcset at build time.
    responsiveStyles: true,
  },
});
