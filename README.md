# Château de Lésigny — Website

A bilingual (FR / EN) luxury website for **Château de Lésigny** — a privatized 16th-century château near Paris, hosting weddings & events, film/TV location work, and photo shoots. Built with **Astro 5** (static, host-agnostic), fully token-driven, image-rich, accessible, and SEO-ready.

## 🔗 Live preview

<a href="https://refactored-space-spoon-5w7prrjw9x537rww-4321.app.github.dev/" target="_blank" rel="noopener noreferrer"><strong>▶ View the live site →</strong></a>

> Served from the development codespace (port `4321`). It is live while the codespace + dev server are running. For a permanent production URL, deploy the static build to Cloudflare Pages / GitHub Pages.

## Highlights

- **10 pages × FR/EN** with native Astro i18n + hreflang + a path-preserving language switcher
- Real château photography (from the property's own assets), optimized to responsive AVIF/WebP
- **Le Domaine** — a filterable index of the château's décors + an SVG estate site-plan
- Deeply-researched, sourced **history** (Poncher 1508 → Pierrevive Renaissance → Galigaï/Concini → Louis XIII → 1794 → today)
- **Castle Impossible (HGTV)** tie-ins, awards, and a downloadable **location pack** (PDF)
- Zero-backend **inquiry funnel** (mailto + clipboard fallback; optional serverless upgrade)
- Heraldic **Blason de Lésigny** brand mark (CC BY-SA, Chatsam)

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
```

## Structure

- `src/pages/[locale]/` — bilingual pages
- `src/components/` — Nav, Footer, Photo, domaine/*
- `src/styles/tokens.css` — the design system (palette, type, motion)
- `src/config/site.ts` — single source of truth for facts (legal `TODO:` fields are owner-only)
- `src/assets/` — `gallery/` (curated imagery), `brand/` (crest + logo)
- `brand-kit/` — extracted original-site brand (for the V2 re-skin)
- `.ravenclaude/runs/forge/` — the planning artifacts for each FORGE pass
