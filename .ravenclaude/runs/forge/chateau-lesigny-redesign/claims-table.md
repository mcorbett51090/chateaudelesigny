# G1 — Research + Fact-Verification (tiered)

## A. Existing-site inventory (in-session grounded via WebFetch 2026-06-30) — WARN-tier, confirmed
Source: WebFetch of chateaudelesigny.com home, /events, /cinematography, /contact (2026-06-30).

| # | Claim (current site) | Tier | Source |
|---|---|---|---|
| S1 | Property = privatized historic château (1508), ~24 km SE of Paris; 54 hectares / 130 acres, 70+ décors | grounded | WebFetch home+cinema 2026-06-30 |
| S2 | Three revenue streams: weddings/events, cinematography (film/TV/commercial), photo shoots | grounded | WebFetch home 2026-06-30 |
| S3 | Pages: Home, Cinematography, Events/Weddings, History, Contact, Photo Shoots, "Book a Visit" | grounded | WebFetch home 2026-06-30 |
| S4 | Weddings capacity: 300 cocktail / 250 seated dinner / 350 ceremony; prices from 3350€ | grounded | WebFetch /events 2026-06-30 |
| S5 | Cinematography: 30+ yrs as location, 50+ French productions; La Château (40 rooms, dungeon, 5 levels), La Ferme (8 rooms) | grounded | WebFetch /cinematography 2026-06-30 |
| S6 | Contact form fields: Name, Country Code, Phone, Email, Inquiry category (9 options), Message | grounded | WebFetch /contact 2026-06-30 |
| S7 | Bilingual FR/EN via `?lang=` param; NO real language switcher, NO galleries lightbox, NO map, NO booking, thin polish | grounded | WebFetch all 2026-06-30 |
| S8 | Contacts: events +33 06 64 08 43 59; cinema +33 06 47 30 62 44; contact@chateaudelesigny.com; Allée du Château, Lésigny 77150 | grounded | WebFetch /contact 2026-06-30 |
| S9 | Social: Instagram, Facebook, YouTube (TheBeauChateau); wedding dirs Zankyou, Mariages.net; awards 2024 & 2026 | grounded | WebFetch home 2026-06-30 |

## B. Load-bearing external/tech claims the BUILD PLAN rests on
| # | Claim | Tier | Source / marker | Settling gate |
|---|---|---|---|---|
| T1 | Astro 4.0+ has **built-in i18n routing** (config locales in astro.config, `/[locale]/` folders, `getRelativeLocaleUrl()`/`getAbsoluteLocaleUrl()` helpers, hreflang). Static-per-locale = great SEO/Lighthouse. | verified | Astro docs + 2026 guides via WebSearch 2026-06-30 | G6 (stack) |
| T2 | **Git-based CMS** options pair with Astro for self-editing: **Decap** (free, browser, GitHub OAuth, commits Markdown), **Sveltia** (modern Decap successor, <500KB, first-class i18n), **Storyblok** (visual editor, most mature `@storyblok/astro`), **Sanity**/Tina (hosted DB, richer). | verified | 2026 CMS comparison guides via WebSearch 2026-06-30 | G4b tiebreak |
| T3 | Astro's native i18n can conflict with some third-party i18n libs — pick native OR a lib, not both. | verified | WebSearch 2026-06-30 (Astro i18n guide) | G6 |
| T4 | Astro supports static + SSR/hybrid + serverless functions (for the inquiry-form POST/email handler) via adapters. | [unverified — training knowledge] Astro adapter API is stable but exact 2026 adapter names/config not re-verified this session; verify against current Astro docs at build time (Phase that wires the form handler). | G8 build |
| T5 | A serverless form handler + transactional email (e.g., Resend/SMTP) can deliver inquiry emails without a backend server. | [unverified — training knowledge] Provider APIs change; pick + verify the email provider's current SDK during the inquiry-funnel phase. | G8 build |
| T6 | 360°/virtual-tour can be done with a JS lib (e.g., Pannellum/Photo Sphere Viewer) or an embedded third-party (Matterport/Kuula) — no original imagery required to scaffold; placeholder panoramas acceptable. | [unverified — training knowledge] Confirm chosen lib/embed + licensing during the gallery phase. | G8 build |

**Verdict:** No BLOCK-tier claim is unsupported. Architectural facts (T1–T3) are this-session verified;
build-time integration details (T4–T6) carry `[unverified]` markers with named settling steps in the
build phases. Cleared to advance to the panels.
