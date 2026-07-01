# G4a — Critic brief (correlated errors + premise + risk matrix)

Fresh critic (opus), read both plans + repo. Found shared-anchoring errors a gap-delta can't.

## Correlated errors (both plans, same wrong direction)
- **CE-1 (CRITICAL):** `confidentialite.astro` is a LIVE, fully-authored privacy policy with absolute
  negatives: "no audience analytics", "IP not recorded", contact data "not stored in a database, not
  transferred to any third party", "no third-party cookies… no cookie-consent banner required".
  Analytics + Web3Forms + Brevo + any embed each FALSIFY it. Neither plan rewrote it. RGPD-actionable.
- **CE-2 (SEVERE):** Can't gate a static asset on GitHub Pages — a build-time brochure PDF is a public,
  crawlable URL; the "soft-gate" gates nothing and the ungated PDF gets indexed as canonical.
- **CE-3 (HIGH):** Public Web3Forms access key in client JS → scraped → bypasses client honeypot/time-trap,
  exhausts ~250/mo quota (DoS on the enquiry function), floods inbox. Panels verified price, not abuse.
- **CE-4 (MED, real code bug):** `contact.astro` handler DUAL-FIRES — when `PUBLIC_INQUIRY_ENDPOINT` set it
  `await fetch(endpoint)` THEN unconditionally `window.location = mailto:`. "Just set env var" is false.
- **CE-5 (HIGH):** 6+ empty "coming soon" frames = luxury-trust damage + SEO liability. Emitting
  Product/FAQPage/aggregateRating for empty/hidden content violates Google structured-data policy;
  aggregateRating w/o visible reviews is the most-penalized pattern.
- **CE-6 (HIGH, premise):** "Owner supplies assets on a cadence" is contradicted by 7 legally-required
  mentions-légales fields TODO across multiple passes → build-now-fill-later ≈ build-now-fill-never.
- **CE-7 (MED):** "cookieless ⇒ no CNIL consent" is conditional, not categorical; HGTV before/after
  broadcast stills are copyrighted (rights problem for the marquee feature).

## Premise
Site is PRE-LAUNCH (github.io subpath, 7 legal TODOs, check-todos gate). P0 should be launch-readiness +
one reliable conversion path, not feature breadth. Bottleneck is traffic/assets/ops, not features.

## Risk matrix (top)
| R | Risk | P×I |
|---|------|-----|
| R1 | Features ship, privacy policy left factually false | H×H CRITICAL |
| R2 | Public Web3Forms key → DoS/quota + inbox flood | H×H |
| R3 | Static brochure "gate" captures nothing, indexed ungated | H×M |
| R4 | Empty frames + premature schema → SEO violation + trust loss | M×H |
| R5 | Assets never supplied → permanent dead frames | H×M |
| R6 | Endpoint config makes form dual-fire | M×M |
| R7 | HGTV before/after stills copyrighted | M×H |

## Gate recommendation
Resolve R1/R2 as blocking prerequisites: any third-party surface REQUIRES a matching legal-page rewrite;
prefer NOT shipping a public-key form; defer asset-gated features rather than ship empty shells.
