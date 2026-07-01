# plan.md — Château de Lésigny venue-site enhancements (G6 synthesis)

**Scope corrected by user to "option 1" both axes → fully STATIC + high-value CORE (not 14 frames).**
Ratified by the critic (CE-1 legal-page falsification, CE-3 public-key DoS, CE-5 empty-frame trust/SEO
cost, premise: pre-launch) and red-team (repo-verified build mechanics). No feature ships that would
falsify the already-published privacy policy, publish empty schema, fake a gate, or show a "coming soon"
shell. Every feature below has REAL content and needs NO third-party processor.

## Build this session (static, honest, real content)
1. **Contact-form correctness** (`contact.astro`): make submit **POST xor mailto** (not both); gate the
   success UI on `response.ok`; distinct "couldn't confirm — email opened instead" fallback state. Mailto
   stays the default (privacy policy stays true). Optional `PUBLIC_INQUIRY_ENDPOINT` path now works right
   for when the owner enables a backend at go-live.
2. **Structured-data upgrade** — new `src/lib/schema.ts` (typed builders, `</script>` escaped, strips any
   `TODO:` value, never reads `site.legal`). Refactor `BaseLayout.astro` to emit ONE canonical `@graph`
   (replacing the inline `TouristAttraction`): `LocalBusiness`+`EventVenue` with shared `@id`; add a
   `jsonLd` prop for per-page nodes → `LodgingBusiness` (sejour), `Product`+Offer €39.99 (boutique),
   `FAQPage` (faq). NO `aggregateRating` (no real reviews). Validate no duplicate `@id`.
3. **FAQ page** — new `faq.astro` (FR/EN, getStaticPaths both locales), `<details>` accordion, ~10 Q&A from
   `site.ts` facts (capacity 250/300/350, from €3,350, 24 km from Paris, overnight stay, catering via
   partners, film/photo). FAQPage JSON-LD via the prop. Linked from footer + contact + mariages (not top nav).
4. **Interactive estate map** — add a `document`-level `CustomEvent('domaine:filter',{detail:{group,value}})`
   contract to `DomaineIndex.astro`; make `DomaineSchematic.astro` zones focusable buttons that dispatch it;
   scroll to the index. Keyboard-operable; JS-off = plain SVG (no regression). Verify the visible COUNT
   changes, not just a class.
5. **WhatsApp click-to-chat** — plain `wa.me/<phoneEvents>` link (no script, no cookie) on contact + footer.
   Consistent with existing outbound tel:/social links; privacy policy unaffected.
6. **Featured-weddings gallery** — a section on `mariages.astro` reusing PhotoSwipe + existing real imagery,
   with honest space/scene captions (NO fabricated couple names/quotes). Extends, doesn't replace, the
   existing honest testimonials block.

## Dependency DAG
schema.ts (esc + TODO-strip) → BaseLayout @graph refactor → per-page nodes (faq/sejour/boutique).
DomaineIndex CustomEvent contract → DomaineSchematic dispatch. Contact fix, WhatsApp, gallery are
independent. i18n keys (both locales) underpin faq/whatsapp/gallery. Critical path = schema refactor.

## Deferred backlog (needs an owner asset/decision AND a privacy-policy rewrite before it can ship honestly)
Real form backend (Web3Forms secret-key or Cloudflare Function at domain cutover) · cookieless analytics ·
newsletter (Brevo) · gift vouchers (Stripe Payment Links) · review aggregation + aggregateRating ·
360 tour (Kuula/Panoee via a CNIL click-to-load ConsentEmbed) · drone/video hero · before/after restoration
slider (needs rights-cleared owned photos — HGTV stills are copyrighted) · the 7 `site.legal` TODO fields +
`scripts/check-todos` guard + custom-domain cutover (the real go-live gate).

## Risk register (carried)
R1 legal-page falsification → AVOIDED (no third-party surface added). R2 public-key DoS → AVOIDED (no
Web3Forms). R4 empty schema/frames → AVOIDED (schema only for visible content; no shells). Residual: i18n
key parity (mitigate: add both locales), map event contract (mitigate: verify count), schema dup @id
(mitigate: replace inline block).

## Definition of done
`npm run build` green (30→31 pages: +faq×2); FAQ/map/gallery/WhatsApp render FR+EN; JSON-LD single @graph
valid, no `TODO:`/no aggregateRating; map filter count changes on zone click; contact form no longer
dual-fires. Commit + push to main.
