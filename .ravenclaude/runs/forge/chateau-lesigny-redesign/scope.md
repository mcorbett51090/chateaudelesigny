# G0 — Scope / Clarify

**Slug:** chateau-lesigny-redesign
**Owner:** Matt (matt@ravenpower.net)
**Date:** 2026-06-30
**Depth:** standard (G0·G1·G2·G3·G4a·G4b·G5·G6·G7·G8)
**Models:** Panel A = opus, Panel B = sonnet (cross-model divergence)

## Scoped intent (one paragraph)
Analyze the existing Château de Lésigny website (https://www.chateaudelesigny.com), produce an
exhaustive component/subcomponent inventory, then design and BUILD in this empty codespace a new,
high-end, easy-to-use marketing website that reads as a "$50,000" property site. The château is a
fully-privatized historic French castle (1508, ~24 km SE of Paris) monetized via three streams —
**weddings/private events**, **film/TV/commercial shoots** (cinematography), and **photo shoots** —
with a YouTube presence ("Castle Impossible"/HGTV/*TheBeauChateau*) and 70+ filmable "décors."
The rebuild must include four must-have premium features and ship as a working, polished site.

## Locked decisions (from G0 clarify)
- **Deliverable:** Plan, THEN build it here in this codespace (working result, not plan-only).
- **Tech stack:** Deferred to the panels — they recommend + justify. (NOTE: the *self-editable CMS*
  + *multilingual* requirements heavily constrain this; it is the primary G4b tiebreak fork.)
- **Must-have premium features (all four):**
  1. Inquiry/booking funnel — tailored lead capture (weddings vs film), date check, smart form,
     auto-email. NOT online card payment (luxury venues qualify leads, they don't sell online).
  2. Immersive galleries + virtual tour — full-screen cinematic galleries, background video,
     optional 360°/virtual tour of the 70+ décors. The primary "wow" factor.
  3. Multilingual FR/EN — proper switcher, fully translated, SEO-friendly (hreflang) for both the
     French client market and international film productions.
  4. Self-editable CMS — owners update copy, available dates, press, and photos without a developer.
- **Baked-in standard polish (not optional, not asked):** motion/animation, fully responsive,
  WCAG AA accessibility, SEO + structured data, interactive map + directions, performance budget.

## Out of scope
- Online payment / e-commerce checkout (explicitly inquiry-only).
- Native mobile apps.
- Real-time multi-editor collaboration on content (single-owner editing assumed).
- Migrating/owning the existing YouTube content (link out only).
- Account systems / user login (beyond CMS admin auth).

## Success signal (one line)
A deployed, bilingual, polished château site in this repo where a prospect can browse immersive
galleries, switch FR/EN, and submit a tailored wedding/film inquiry — and the owner can edit
content via a CMS — passing a11y/SEO/performance gates and reading as genuinely high-end.

## Routing triage
Privacy = clean (public marketing site). Build target = THIS repo (greenfield, empty). User wants
local build. Likely `use_local`; landing = main (pure greenfield build, no marketplace
pre-commitments in this repo). Confirmed deterministically at G7.
