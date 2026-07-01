// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Host-agnostic static build. FR is the default locale, prefixed (/fr/), EN mirrored (/en/).
// Every external service (email, analytics, maps, 360) is OPTIONAL and isolated — none required to ship.
//
// === Deployment target ========================================================
// NOW — GitHub Pages project site at https://mcorbett51090.github.io/chateaudelesigny/
//   SITE = 'https://mcorbett51090.github.io'   BASE = '/chateaudelesigny'
// LATER — custom domain at the root of https://www.chateaudelesigny.com/
//   set SITE = 'https://www.chateaudelesigny.com'   BASE = '/'
//   and add a public/CNAME file containing  www.chateaudelesigny.com
// All internal links route through withBase()/localeBase() (src/i18n/ui.ts), so these
// two lines are the only change needed to move between the two.
const SITE = 'https://mcorbett51090.github.io';
// PREVIEW_ROOT=1 serves the site at the ROOT path (base '/') — used by `npm run dev:demo`
// so the forwarded Codespace URL works without the /chateaudelesigny/ prefix. Production
// builds (env unset) keep the GitHub-Pages subpath base.
const BASE = process.env.PREVIEW_ROOT === '1' ? '/' : '/chateaudelesigny';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: true },
  },
  redirects: {
    // Deployment root → default locale. Base-aware target so it works at a subpath or root.
    '/': `${BASE}/fr/`.replace('//', '/'),
  },
  integrations: [
    sitemap({
      // Exclude utility/tracking routes: conversion thank-you pages (/merci/), the attribution
      // redirect hops (/go/), and the owner-only area (/interne/*, dashboard + future tools) — all noindex.
      filter: (page) =>
        !page.includes('/merci/') && !page.includes('/go/') && !page.includes('/interne/'),
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
