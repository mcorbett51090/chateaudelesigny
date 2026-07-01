# G2/G3 — Panels + Gap-delta

Panel A = opus (maximalist), Panel B = sonnet (leaner + gap-delta). Both grounded in the repo.

## Strong convergence (adopt directly)
- **Forms:** Web3Forms client-side on GitHub Pages NOW (existing `contact.astro` already POSTs to
  `PUBLIC_INQUIRY_ENDPOINT` then falls back to `mailto:` — real backend = config, not a rewrite).
  Defer Cloudflare Pages+Functions migration to the custom-domain cutover.
- **Gated features = config-flag frames** in new `src/config/features.ts`; empty ⇒ honest empty-state
  or self-hide. Never fabricate prices/ratings/testimonials (matches existing `mariages.astro:406`
  testimonials precedent).
- **One CNIL click-to-load consent component** (`ConsentEmbed.astro`) gates every 3rd-party embed;
  cookieless analytics + `wa.me` need no consent.
- **Schema:** canonical LocalBusiness+EventVenue @graph in BaseLayout + per-page `jsonLd` prop nodes
  (LodgingBusiness for sejour, Product for boutique, FAQPage for FAQ). Currently only TouristAttraction.
- **Interactive estate map = click-to-filter wiring** of existing `DomaineSchematic` zones →
  `DomaineIndex` filters (shared chateau/ferme vocabulary already exists). NOT a pan/zoom engine.
- **Brochure = build-time pdfkit PDF** from `site.ts` facts (pdfkit installed, unused), soft email-gate.
- Ship-now, no-asset wins: FAQ + FAQPage, WhatsApp `wa.me`, cookieless analytics (no banner),
  "book a visit" funnel, schema rollout, interactive map.
- Frames: featured-weddings gallery (existing imagery, no fake names), reviews frame (schema off till
  real), gift vouchers (Stripe Payment Links), newsletter (Brevo), before/after slider, 360, video hero.

## Divergences (→ tiebreak)
| # | Fork | Panel A (opus) | Panel B (sonnet) | Provisional |
|---|------|----------------|------------------|-------------|
| D1 | Style/mood quiz → décors | keep | **DROP** (duplicate taxonomy vs existing filter = maintenance trap) | lean B |
| D2 | Season-by-month guide | keep | **DROP** (pure evergreen copy, ages badly, no owner to maintain) | lean B |
| D3 | Capacity/layout visualizer | keep (uses real facts) | DROP (seating-planner-adjacent gimmick) | tiebreak |
| D4 | FAQ placement | new `/faq` page (+nav item) | **embed** in existing pages (avoid nav bloat, topical authority) | tiebreak |
| D5 | Real-weddings | new page | section in mariages | lean section |
| D6 | Empty-frame trust cap | not addressed | **≤2 simultaneously-visible** null-gated sections, ever | adopt B (critical) |
| D7 | Brochure automation | full auto-gate needs backend | build-time PDF + soft gate now | converge (soft gate now) |

## Panel B gap-delta highlights
- Over-serialization risk: treating "pick a form backend" as a hard blocker — it isn't (mailto already
  degrades gracefully); brochure/FAQ/vouchers ship without it.
- Over-build risks: multi-tier pricing engine (owner has 1 number), pan/zoom map, bespoke newsletter CRM.
- Riskiest assumption: that many simultaneous "coming soon" frames read as *restraint* not *unfinished* —
  dangerous on a luxury venue where completeness signals trust for a 5–6-figure purchase. → D6 cap.
