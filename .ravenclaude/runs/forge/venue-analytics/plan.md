# Venue Analytics & Reporting — FORGE synthesized plan

**Goal:** Give the non-technical owners a monthly, plain-language read on what's working —
where visitors come from, which of the 4 streams is trending, and what to do next — while the
site stays cookieless with **zero consent banner**. Cloudflare Web Analytics (free) is the
collection layer; ground truth for conversions stays the inbox + Stripe.

## Guiding principle (from the critic)
CF is trustworthy for **traffic + channel (referrer) trends** at aggregate — use it there.
CF is NOT trustworthy for low-volume conversion counts (10% sample) — so **conversions of-record
come from ground truth**: Stripe API (sales) + a 30-second owner inbox count (enquiries). The
`/merci/` pageviews are a cheap programmatic cross-check, always shown with a confidence flag.
**Scale automation to observed traffic** — turn the beacon on and look before building the pipeline.

## Phase 0 — Verify & observe (owner + dev; gates everything)
- Confirm `PUBLIC_CF_BEACON` is set in the deploy env and the beacon fires in prod (view-source +
  a live visit appears in CF). If dark, there's been no baseline — start the clock now.
- Create a CF API token scoped **Account Analytics:Read** + note the account ID; verify a
  `rumPageloadEventsAdaptiveGroups` query returns rows (introspect live schema for field names).
- Confirm CF's owner-access model (scoped share link vs full-account invite).
- **Observe ~3–4 weeks** of real traffic to size how much automation is justified.
- *Accept:* beacon live, zero cookies, no banner; GraphQL query returns rows; volume known.

## Phase 1 — Cheap tracking (buildable NOW, no tokens) [parallel builds]
- **/merci/{slug}/ thank-you pages** (`[locale]/merci/[slug].astro`, getStaticPaths over
  locales × [mariage, entreprise, sejour, boutique, cadeau, tournage, photo]) — noindex,
  sitemap-excluded, on-brand, BaseLayout (inherits beacon). **Real navigation** on success
  (Tiebreak #1 = A). Move the existing confirmation copy onto the page.
- **contact.astro:** on the TWO genuine-success sites only (Web3Forms 200 + mailto fallback),
  `location.assign(withBase('/{locale}/merci/{slug}/'))`. **Do NOT touch the honeypot branch**
  (it must keep showing fake success to bots with zero tracking) — add a code comment saying why
  (Red-team #6). Map internal stream → slug in one lookup.
- **/go/{source}/ redirect pages** (instagram, newsletter, gbp, mariagesnet) — noindex,
  sitemap-excluded, instant redirect; owner one-pager of paste-these-links (path-based attribution,
  since UTM is stripped).
- **Stripe:** set each Payment Link's post-payment redirect → /merci/boutique|cadeau/ (Tiebreak
  #2 = true purchase). Where unset, treat as click-intent, labeled.
- *Accept:* genuine submit → matching /merci pageview; honeypot → none; /go redirects log one
  pageview each; /merci+/go absent from sitemap; both locales slug correctly.

## Phase 2 — Monthly digest (GATED on Phase 0 volume; automate only if justified)
- GitHub Action (`analytics-digest.yml`, monthly cron + dispatch). Secrets: CF_API_TOKEN,
  CF_ACCOUNT_ID, BREVO_API_KEY, DIGEST_RECIPIENTS, (optional) STRIPE_API_KEY.
- Query prior month RUM (by day / path / referer host) → archive `reports/analytics/YYYY-MM.json`
  to the repo (**this is the fix for 30-day retention**) → generate a 3-part plain-language digest
  with MoM deltas:
  - **What happened** — visits (+MoM), FR/EN split, top referrer channels, top landing pages,
    conversions: Stripe sales (of-record) + enquiries (owner-entered/inbox) + /merci cross-check.
  - **What it means** — channel shifts, stream trends, visit→enquiry direction.
  - **What to do** — 2–3 concrete actions (rules baked into the template).
  - **Confidence flags** on every slice < ~50 raw events ("directional only"); boutique line always
    carries "check Stripe for actual sales".
- Delivery: Brevo email (reuse newsletter vendor) + committed archive. **Interim before automation:
  a manual digest template** so value lands even at low volume.
- *Accept:* run produces committed snapshot + readable 3-part digest with correct MoM deltas +
  confidence flags; email arrives; second run computes deltas from the prior snapshot.

## Phase 3 — Owner dashboard (simplest that satisfies "shareable")
- Render the latest digest as an always-current **noindex page** on the site (snapshot-fed by the
  same Action) — one bookmarkable URL, no login. CF login = dev-only fallback. (Critic #3: skip a
  bespoke charting lib unless volume warrants it.)
- *Accept:* URL renders latest numbers, no login, updates after a scheduled run, shows "as-of" date.

## Dependency DAG
```
P0 verify+observe ──► P1 (merci + /go + Stripe redirect; buildable now, parallel) 
        │            └► P2 digest (needs P0 token+volume + P1 paths) ──► P3 dashboard (needs P2 snapshots)
critical path = owner token turnaround + 3-4wk data-accumulation, NOT engineering effort.
```

## Alternatives (with trade-offs)
1. **CF-free + this plan (RECOMMENDED).** €0, cookieless, zero runtime services; low-vol conversion
   counts noisy → mitigated by ground-truth-of-record + confidence flags.
2. **Flip on Plausible** (1 env var, already wired). Native cookieless goals/funnels, no sampling,
   longer retention, real public shareable dashboard; ~€9–19/mo + a 2nd processor. No rework wasted
   — /merci and /go become Plausible goals directly. The escape hatch if CF noise frustrates.
3. **Cloudflare Worker + Workers Analytics Engine** event counter — accurate, unsampled, cookieless;
   +serverless component to maintain. Overkill unless volume grows.
   (Zaraz/server-side tag mgr REJECTED: its value is proxying cookie-setting pixels → banner risk.)

## Honest shortfall / owner cost
CF gives reliable traffic+channel trends for free; it does NOT give trustworthy low-volume conversion
counts, funnels, journey attribution, UTM campaigns, or >30-day history (archival fixes the last).
For those natively while staying CNIL-clean, Plausible is a 1-env-var, ~€9–19/mo upgrade.

## Owner-dependent (paste-a-value)
PUBLIC_CF_BEACON; CF_API_TOKEN (Account Analytics:Read) + CF_ACCOUNT_ID; Stripe post-payment redirect
URLs; DIGEST_RECIPIENTS (+ reuse BREVO_API_KEY); pasting /go/ links into IG/Brevo/Google Business/listing.

## Definition of done
Beacon live cookieless/no-banner; /merci + /go built (noindex, sitemap-excluded), genuine-only
tracking; monthly digest emails 3-part report w/ MoM + confidence flags + ground-truth conversions;
shareable no-login dashboard page; privacy policy already covers CF conditionally (no change of truth).
