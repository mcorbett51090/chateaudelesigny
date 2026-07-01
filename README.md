# Château de Lésigny — Website

A bilingual (FR / EN) luxury website for **Château de Lésigny** — a privatized 16th-century château near Paris, hosting weddings & events, film/TV location work, and photo shoots. Built with **Astro 5** (static, host-agnostic), fully token-driven, image-rich, accessible, and SEO-ready.

## 🔗 Live preview

<a href="https://refactored-space-spoon-5w7prrjw9x537rww-4321.app.github.dev/" target="_blank" rel="noopener noreferrer"><strong>▶ View the live site →</strong></a>

> Served from the development codespace (port `4321`). It is live while the codespace + dev server are running. For a permanent production URL, deploy the static build to Cloudflare Pages / GitHub Pages.

## Highlights

- **16 pages × FR/EN** with native Astro i18n + hreflang + a path-preserving language switcher
- Real château photography (from the property's own assets), optimized to responsive AVIF/WebP
- **Le Domaine** — a filterable décor index + an **interactive** SVG estate site-plan (click a zone to filter)
- **Weddings, Corporate, Filming, Photography, Stay, Shop, Partners, Press, FAQ** landing pages
- Deeply-researched, sourced **history** (Poncher 1508 → Pierrevive Renaissance → Galigaï/Concini → Louis XIII → 1794 → today)
- **Castle Impossible (HGTV)** tie-ins, awards, and a downloadable **location pack** (PDF)
- **SEO-ready structured data** — one canonical `LocalBusiness`+`EventVenue` `@graph` with per-page `LodgingBusiness` / `Product` / `FAQPage` nodes
- **Inquiry funnel** — mailto/clipboard by default, with an optional serverless backend (see below)
- **Optional, config-gated features** — real form backend, cookieless analytics, gift vouchers, newsletter, reviews, 360° tour, before/after slider, video hero (see [Optional features](#optional-features))
- Heraldic **Blason de Lésigny** brand mark (CC BY-SA, Chatsam)

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output → dist/
```

## Optional features

Several higher-value features are **off by default** and switch on via configuration — no
code change. The rule everywhere: **an empty value renders _nothing_** (no empty "coming
soon" shells), and the **privacy policy is conditional on the same flags**, so enabling a
third-party service automatically updates `confidentialite.astro` to name it as a processor —
the published policy can never contradict what the site actually does.

**1. Env-var toggles** — copy [`.env.example`](.env.example) to `.env` (or set these in your
host's build environment) and fill in what you want live:

| Feature | Variable(s) | Where to get it |
|---|---|---|
| Enquiry backend + auto-reply | `PUBLIC_WEB3FORMS_KEY` _or_ `PUBLIC_INQUIRY_ENDPOINT` | [web3forms.com](https://web3forms.com) (free) / your own function |
| Cookieless analytics (no banner) | `PUBLIC_CF_BEACON` _or_ `PUBLIC_PLAUSIBLE_DOMAIN` | Cloudflare Web Analytics / Plausible |
| Newsletter | `PUBLIC_NEWSLETTER_URL` | Brevo hosted-form action URL (EU) |
| Gift vouchers | `PUBLIC_VOUCHER_STAY_URL`, `PUBLIC_VOUCHER_SHOP_URL` | Stripe Payment Links (hosted, PCI-free) |
| 360° virtual tour | `PUBLIC_TOUR360_URL` | Kuula / Panoee embed URL (loads only after consent) |
| Video / drone hero | `PUBLIC_HERO_VIDEO` | path to an mp4 in `public/`, e.g. `/media/hero.mp4` |

**2. Content toggles** in [`src/config/features.ts`](src/config/features.ts) — these carry real
content/assets, not just a URL:

- `reviews` — paste **real** Google / Mariages.net ratings + quotes. Star display and the
  `AggregateRating` schema appear **only** when real data is present (never fabricated).
- `beforeAfter` — your **rights-cleared** before/after restoration image pairs for the slider on
  the history page (HGTV broadcast stills are copyrighted — use your own photography).

Enabling any of these needs no other change; rebuild and the feature (and its privacy-policy
clause) appears. Leaving them empty is a fully supported, honest state.

> **Serverless note:** GitHub Pages can't run functions, so the form backend uses a client-side
> service (Web3Forms) that works on any static host. To run your own `/api/*` function instead,
> deploy to Cloudflare Pages / Netlify and point `PUBLIC_INQUIRY_ENDPOINT` at it.

**3. Preview everything at once** — `npm run dev:demo` (or `build:demo`) sets `PUBLIC_DEMO=1`,
which populates *every* gated feature with realistic demo data so you can see them without any
keys/assets: review stars + quotes, the before/after restoration slider, the 360° tour card,
gift-voucher buttons, the newsletter form, and a filled-in Mentions légales. Demo data is
preview-only — the [`check-todos`](scripts/check-todos.mjs) launch gate **fails a production build
while `PUBLIC_DEMO` is set**, so it can never ship live.

> **Launch gate:** `npm run build` runs `scripts/check-todos.mjs` first. On the interim
> github.io preview it only warns about unfilled legal `TODO:` fields; on a production build
> (custom-domain `SITE`, or `GO_LIVE=1`) it **fails** until they're filled — and always fails if
> `PUBLIC_DEMO` is set.

## Structure

- `src/pages/[locale]/` — bilingual pages
- `src/components/` — Nav, Footer, Photo, Lightbox, ConsentEmbed, Newsletter, ReviewsFrame, CompareSlider, domaine/*
- `src/styles/tokens.css` — the design system (palette, type, motion)
- `src/config/site.ts` — single source of truth for **facts** (legal `TODO:` fields are owner-only)
- `src/config/features.ts` — **optional-feature registry** (see [Optional features](#optional-features)); empty ⇒ hidden
- `src/lib/schema.ts` — typed JSON-LD builders (one canonical venue `@graph`; escapes output, never emits `TODO:` or fabricated ratings)
- `src/assets/` — `gallery/` (curated imagery), `partners/`, `boutique/`, `brand/` (crest + logo)
- `.env.example` — every optional env toggle, documented
- `brand-kit/` — extracted original-site brand (for the V2 re-skin)
- `.ravenclaude/runs/forge/` — the planning artifacts for each FORGE pass
