# Château de Lésigny — Website Rebuild: Synthesized Plan (FORGE)

**Slug:** chateau-lesigny-redesign · **Depth:** standard · **Date:** 2026-06-30
**Panels:** A=opus, B=sonnet · **Critic + red-team:** applied · **Route:** see G7 below

---

## 0. Framing (the critic's binding reframe)
This is a **build-now spec**, not an agency statement-of-work. It is executed by an AI agent in this empty
repo this session. Three optimization priorities, in order:
1. **Ships working AND beautiful with only existing + agent-generated assets** — no feature *functions* by
   depending on an unfunded crew or an unprovisioned account.
2. **Every external dependency is OPTIONAL and isolated** behind one env var / one swappable component;
   the site is fully functional with none set.
3. **Upgrade-in-place** — the owner later swaps real photos, switches on email, adds analytics by
   replacing a slot or setting a secret — never a rebuild.
The luxury comes from **art direction** (unification, whitespace, typographic rhythm), the one thing the
agent fully controls — not from procurement.

---

## 1. Old-site component inventory (the requested analysis)
Grounded in WebFetch of home, /events, /cinematography, /contact (2026-06-30).

**What it is:** a privatized historic château (1508), ~24 km SE of Paris, 54 ha / 130 acres, 70+ filmable
"décors," monetized via **weddings/events**, **film/TV/commercial location**, and **photo shoots**; YouTube
presence ("Castle Impossible"/HGTV/*TheBeauChateau*); bilingual FR/EN.

| Page | Sections → subcomponents |
|---|---|
| **Home** | Hero image (static) · FR lede (Louis XIII history) · 3 service cards (Cinema/Weddings/History) · Particulier vs Professionnel audience split · empty "next public event" placeholder · footer (manager Daphne Reckert, phone, address, social) |
| **Weddings/Events** | Hero + tagline · capacities (300 cocktail / 250 dinner / 350 ceremony) · 4-photo grid · event types (9: weddings, birthdays, conferences, corporate, show rooms, baptisms, bar/bat mitzvahs) · "The Chateau" pricing (from 3350€) + interior detail + 5-photo gallery · Partnerships (catering/photo/decor/animation/planning) · Exposé Albums (3 past weddings) · awards 2024/2026 · footer |
| **Cinematography** | Hero (30+ yrs, 50+ productions) · The Domaine (54 ha, 70+ sites) · La Château (40 rooms, dungeon, 5 levels, Renaissance mantels) + gallery · La Ferme (8 rooms, soundproofing) + gallery · footer |
| **Photo Shoots** | Pro + personal folded together; thin |
| **History** | Heritage prose (1508, notable residents) |
| **Contact** | Flat 1-step form: Name · Country Code · Phone · Email · Inquiry category (9-option dropdown) · Message · phones · emails · address · social |
| **Global gaps** | NO real language switcher (`?lang=` only) · NO lightbox galleries · NO map · NO inquiry funnel · NO testimonials · NO CMS · NO structured data · NO Mentions légales/privacy |

**Diagnosis:** IA organized by internal mental model (particulier/professionnel) not visitor intent; the
décors — the most valuable, most search-relevant asset — are essentially invisible; brochure, not brand.

---

## 2. New information architecture
FR default at root-prefixed, EN mirrored. **Strings externalized; both languages agent-drafted now.**

```
/  → /fr/
/fr/                  Accueil           /en/                  Home
/fr/mariages          Mariages & Événements                   Weddings & Events
/fr/tournages         Tournages (film location)               Filming
/fr/photographes      Séances photo                           Photo shoots
/fr/le-domaine        Le Domaine & les décors (signature)     The Estate & Décors
/fr/histoire          Histoire (1508→)                        History
/fr/presse            Presse & distinctions                   Press & awards
/fr/contact           Contact & demande                       Contact & inquiry
/fr/mentions-legales  Mentions légales (mandatory)            Legal notice
/fr/confidentialite   Politique de confidentialité            Privacy
  + /sitemap.xml · /robots.txt · per-locale JSON-LD
```
**Nav:** Le Domaine · Mariages · Tournages · Photographes · Histoire | FR/EN switcher + one filled
"Demande" CTA (oxblood). Presse in footer. **Footer:** Explorer · Le Domaine (address + directions +
"54 ha · 70+ décors") · Contact (two labeled lines: Événements / Cinéma) · Suivre (IG/FB/YT + awards +
Zankyou/Mariages.net) · utility row (FR/EN · Mentions légales · Confidentialité · Plan du site).

**Consolidations:** events→mariages; photo pro/perso→one page w/ toggle; Castle Impossible→Presse +
featured on Home; History→own page; **décors promoted** to the signature page `/le-domaine`.

---

## 3. Design system — art direction is the luxury
**Concept: "The Location Scout's Monograph"** — a heritage monograph (editorial, numbered plates,
generous margins) crossed with a film-location bible (slate metadata: room counts, levels, light, dims).
Distinctive, impossible to mistake for a wedding template.

**Type (free, self-hosted, subset, sturdy):**
- Display/H1–H2: **Fraunces** (variable, optical, "soft/wonky" off) — distinctive, sturdy, not Playfair.
- Body/longform: **Source Serif 4** (variable) — refined, legible ≥17px.
- UI/nav/labels: **Instrument Sans** (or Inter) — quiet grotesque.
- "Slate" metadata mono: **Geist Mono** — used ONLY for décor specs (`DÉCOR N°34 · NIVEAU 2 · NORD · 6×9 m`).

**Palette (WCAG-AA tokens; oxblood = accent only, never body text on stone):**
| Token | Hex | Role |
|---|---|---|
| `--pierre` | `#EAE4D8` | warm limestone canvas (never pure white) |
| `--calcaire` | `#F4EFE6` | raised surfaces |
| `--encre` | `#1A1714` | primary ink (AA on pierre) |
| `--suie` | `#23221F` | cinematic dark panels (sparingly) |
| `--sang` | `#6E2230` | **oxblood signature** — sole filled-button color (AA as button bg w/ ivory text) |
| `--laiton` | `#A98B5D` | brass — hairline rules/dividers only, never fills |

**Imagery treatment (R1/R2 mitigations):** download the château's own marketing images into `src/assets/`
(no hotlinking); apply a **restrained** warm-monochrome on *secondary* imagery + intentional crops + subtle
grain so resolution limits read as art direction; keep a few hero "money shots" full-color; per-image
full-color escape hatch; every image is a **swappable slot** for the owner's hi-res.

**Motion:** Astro View Transitions (film "cuts"); IntersectionObserver stagger reveal (~1KB); one GSAP
signature moment (the estate schematic draw); ALL behind `prefers-reduced-motion`; zero CLS.

**Signature element:** curated **~12–15 best décors** as numbered editorial plates (N° + still + name +
mono slate + "suited for: wedding/film/photo") **plus an agent-authored clean SVG estate/floor schematic**
(architectural line-plan, not illustrative heraldry) that draws on scroll. Curation > 70-tile inventory.

**Brand mark:** typographic **monogram lockup** (refined wordmark + initials), agent-generated; falls back
to an elegant wordmark if quality bar not met (R3). Build-time **OG/share images** + **JSON-LD** structured
data (LocalBusiness/TouristAttraction/Event) — zero-asset "expensive" signals.

---

## 4. The four premium features — build-now form
1. **Inquiry funnel →** short, elegant **single-step** inquiry (stream pre-selected from context) + always
   prominent direct email/phone. Submit = **pluggable adapter**: default `mailto:` compose (tidy templated
   body) + honeypot/time-trap anti-spam + copy-to-clipboard fallback when no mail handler (R4); optional
   upgrade = serverless endpoint + Resend + Turnstile behind env vars. A **soft availability note** (static
   JSON the owner edits), never a live booking.
2. **Immersive galleries + virtual tour →** PhotoSwipe v5 (dynamic import, AVIF/WebP, keyboard/SR-accessible)
   ships now; full-bleed cinematic layouts; **360 omitted**, shipped as a swappable `<VirtualTour>` slot
   (poster until panoramas + provider supplied).
3. **Multilingual FR/EN →** Astro native i18n, both languages drafted now, all strings externalized,
   do-not-translate glossary, hreflang, path-preserving switcher.
4. **Self-editable CMS →** content lives as **typed Astro content collections in-repo** now (zero account);
   documented optional upgrade to **git-backed Sveltia** (no hosted DB) reading the same collections.

---

## 5. Recommended stack + architecture (resolved)
**Astro 5.x (static) + TypeScript + content collections + vanilla CSS custom properties.** Host-agnostic
static output (Cloudflare Pages / Netlify / GitHub Pages). PhotoSwipe galleries; static SVG location panel
+ "Open in Maps" deep-links (tile map = optional upgrade); pluggable form adapter; no analytics by default;
build-time OG images + JSON-LD. **Every external service optional, behind an env var.**

```
src/
  content/        decors, pages, testimonials, press, settings, availability  (typed collections, FR+EN)
  i18n/           fr.json · en.json (UI strings) · glossary (do-not-translate)
  assets/         downloaded + art-directed château imagery (swappable)
  styles/         tokens.css · typography.css · components/*
  components/     Nav · Footer · LangSwitcher · Hero · DecorPlate · EstateSchematic(svg) ·
                  Gallery(PhotoSwipe) · VirtualTour(slot) · LocationPanel(svg+links) · InquiryForm(+adapter)
  layouts/        BaseLayout(hreflang, JSON-LD, fonts) · PageLayout
  pages/[locale]/ index · mariages · tournages · photographes · le-domaine(+décors) ·
                  histoire · presse · contact · mentions-legales · confidentialite
  lib/            i18n.ts · schema.ts (JSON-LD) · submit-adapter.ts
public/ fonts (subset) · favicon · robots.txt · og/
site.config.ts   ALL user-held facts w/ explicit TODO: markers (legal entity, contact, address)
```

---

## 6. Phased build plan (each phase: tasks · acceptance tests · pre-gate)

**P1 — Scaffold + design system**
Tasks: `npm create astro` (static, TS strict); i18n config (fr default, en); `tokens.css` (AA palette) +
type scale; self-host+subset Fraunces/Source Serif 4/Instrument Sans/Geist Mono; BaseLayout (hreflang,
JSON-LD slot, View Transitions); Nav/Footer/LangSwitcher; motion util; `site.config.ts` with TODO facts.
Accept: builds clean; `/fr/` & `/en/` 200 w/ correct `lang`; switcher preserves path; AA contrast passes;
CLS≈0; reduced-motion honored. Pre-gate: none (greenfield).

**P2 — Content model + copy (FR+EN) + assets**
Tasks: content collections w/ Zod schemas (decors, pages, testimonials, press, settings, availability);
agent-draft FR+EN copy in luxury register (vouvoiement); externalize all strings + glossary; **download &
art-direct** château images into `src/assets/` (duotone secondary, crops, grain); generate monogram + OG
template. Accept: Zod rejects malformed entries at build; no hardcoded UI strings (lint); every page exists
both locales; images self-hosted (no external `<img src>` to live site). Pre-gate: P1 merged.

**P3 — Core pages**
Tasks: Home, Mariages, Tournages, Photographes, Histoire, Presse rendered FR+EN from collections; capacities
band; event types; partners; testimonials; press/awards; contextual "Demande" CTAs. Accept: each page perf
within budget; hreflang valid; no untranslated strings; JSON-LD validates (Rich Results). Pre-gate: P2 model frozen.

**P4 — Signature: Le Domaine (décors) + galleries**
Tasks: `/le-domaine` curated ~12–15 décor plates (N° + still + mono slate); agent-authored SVG estate
schematic w/ one GSAP draw; PhotoSwipe galleries (AVIF/WebP/srcset); `<VirtualTour>` swappable slot.
Accept: galleries keyboard+SR accessible (axe 0 critical); largest image ≤~200KB AVIF; schematic degrades
w/ reduced-motion; slot renders poster cleanly. Pre-gate: P2 assets in.

**P5 — Inquiry + contact + location + legal**
Tasks: single-step InquiryForm + pluggable submit-adapter (mailto default + honeypot/time-trap + clipboard
fallback; env-var serverless/Resend/Turnstile upgrade path stubbed); always-visible direct contact; static
SVG LocationPanel + "Open in Maps/Waze/Apple" deep-links; **Mentions légales + Confidentialité** wired to
`site.config` facts. Accept: mailto opens tidy body; no-handler shows clipboard fallback; honeypot blocks
bot; build-lint FAILS if any `TODO:` legal/contact placeholder remains; map links open correct coords.
Pre-gate: P3 merged.

**P6 — SEO/a11y/perf hardening + deploy**
Tasks: full JSON-LD per locale; per-locale sitemap + robots; axe + manual SR audit; Core Web Vitals tune;
OG images per page; static deploy (GitHub Pages/githack preview). Accept: axe 0 critical; Lighthouse ≥95
SEO/Best-Practices/A11y on Home, Mariages, a décor page, Contact; LCP <2.5s/4G; CLS <0.05; deploy preview
loads. Pre-gate: P4+P5 merged.

**DoD:** all acceptance tests pass; no `TODO:` legal/contact placeholder remains (or is surfaced to user);
both locales complete; `[unverified]` claims T4–T6 (Astro adapter, email provider, 360 lib) remain
**unbuilt by design** as optional upgrades — no settling needed to ship; documented in the upgrade guide.

---

## 7. Reconciled dependency DAG
```
P1 ──► P2 ──┬──► P3 ──┬──► P6 ──► (deploy)
            │         │
            ├──► P4 ──┤
            └──► P5 ──┘
```
Critical path: P1→P2→P3→P6. P4 (signature/galleries) and P5 (inquiry/legal) parallelize after P2 freezes
the content model. No phantom external long-pole (the cut features are slots, not blockers).

---

## 8. Risk matrix (critic + red-team merged, ranked)
| Risk | P×I | Mitigation |
|---|---|---|
| Asset poverty kills "$50k look" | H×H | Art-direct around scarcity: duotone unify, curate ~12 heroes, agent SVG/monogram, swappable slots |
| Functional dead-ends w/o accounts | H×H | Every dynamic feature behind a swappable adapter degrading to a working no-infra fallback |
| Legal non-compliance (FR) | M-H×H | Ship Mentions légales + privacy wired to facts; zero analytics default; lint blocks TODO placeholders |
| Hotlinked/low-res images (R1) | H×H | Download into assets; art-direct; reserve hi-res slot |
| Mailto form feels broken (R4) | M×H | Graceful adapter + always-visible direct contact + clipboard fallback |
| Signature backfires | M×M | Curated ~12–15 + clean SVG schematic; no 70-tile grid, no commissioned art |
| Duotone gimmicky (R2) | M×M | Restrained, secondary-only, one-line tunable, per-image escape |
| Palette/type contrast (R7/C4) | M×M | AA tokens, oxblood accent-only, sturdy Fraunces not thin Cormorant |
| Perf blown on mobile (R6) | M×M | Budget; responsive/lazy images; no autoplay video default; subset fonts |
| i18n string drift / routing (R5/C-i18n) | M×M | Externalize strings; single source; path-preserving switcher; both-locale build check |

## 9. Alternatives (with switch conditions)
- **Stack:** Next.js + Sanity — switch if a real booking engine / payments / client portal is added later.
- **CMS upgrade:** Storyblok (visual WYSIWYG) — switch if owner rejects git-based editing and wants drag-drop.
- **Map:** MapLibre + MapTiler tile map — switch from static panel if interactive exploration is wanted.
- **360:** Pannellum (self-host) or Kuula/Matterport — enable the `<VirtualTour>` slot once panoramas exist.
- **Email:** serverless + Resend (or Netlify Forms) — enable once DNS/SPF/DKIM is controlled.

## 10. User-must-provide (surfaced at exit; none block shipping a demo)
Legal entity name + registered address · real contact email/phone · postal address/directions · real
logo/crest (else monogram) · pointer to real image assets (else live-site images used) · any accurate
décor names/capacities/pricing · (optional, for live versions) Resend+DNS, analytics, map token, 360 captures.
