# FORGE G2 — Plan A (Opus · minimal / owner-usability lens)

## Core design
Conversions become real pageviews of dedicated noindex thank-you paths:
`/{locale}/merci/{slug}/` (slugs stable across FR/EN: mariage, entreprise, sejour, boutique, cadeau).
Form success exit changes ONLY: on confirmed Web3Forms send → location.assign(/merci/{slug}/)
instead of inline reveal; mailto fallback keeps inline reveal (no phantom conversion). Boutique/
vouchers = Stripe "after payment" redirect → /merci/boutique|cadeau/. All /merci/* + /go/*
pages noindex + sitemap-excluded (no bot phantom pageviews). Digest sums by slug across locales.

## Attribution (UTM stripped)
1. Passive: Referer host from RUM dataset (Google, mariages.net, social) — zero setup.
2. Active: /go/{source}/ redirect pages (instagram, newsletter, gbp, mariagesnet) — owner pastes
   these PATHS (not ?utm=) into IG bio / Brevo / Google Business / listing. One tap = one pageview.

## Monthly digest (real value)
GitHub Action (monthly cron + dispatch): query CF GraphQL rumPageloadEventsAdaptiveGroups
(Account Analytics:Read token) → archive snapshot JSON to repo (fixes 30-day retention) →
generate 3-part plain-language digest (What happened / means / to do) with MoM deltas →
email via existing Brevo (or GitHub Issue fallback) + commit archive. Digest explicitly defers
exact counts to Web3Forms inbox + Stripe; CF = trend + channel layer.

## Dashboard
CF has NO public share link (gate: confirm on build date). Substitute: static /{locale}/tableau-de-bord/
(noindex) rendering committed snapshots as simple charts, shareable by URL, refreshed daily via cron
(not live-to-second). CF login remains the live option.

## Phases + DAG
P0 activation (owner CF beacon token; beacon already wired) → P1 merci pages + form re-route
(buildable now) ∥ P2 /go pages (parallel) → P3 reporting Action (needs P0 data + P1/P2 paths +
API token) → P4 dashboard (needs P3 snapshots). Critical path = owner token turnaround +
DATA-ACCUMULATION wall-clock (≥3-4 weeks traffic before conversion counts mean anything).

## Alternatives
1. CF-only + /merci + snapshots (RECOMMENDED) — €0, zero runtime, cookieless; low-vol counts noisy.
2. Cloudflare Worker + Workers Analytics Engine event counter — accurate/unsampled/cookieless; +serverless.
3. Flip on Plausible (1 env var, already wired) — native goals/funnels/no-sampling/live public dashboard; ~€9-19/mo + 2nd processor.

## Honest shortfall
10% sample → single-digit monthly conversions are noise; no funnels/journey; no custom events
(each new metric = new page); no pre-launch history; "shareable" = daily snapshot, not live.
Upgrade price to fix all natively while staying CNIL-clean = Plausible ~€9-19/mo (no rework wasted).

## Open questions (Team Lead)
CF share-link confirm; digest delivery Brevo vs GitHub Issue; owner CF login acceptable?; Stripe
redirect base-path+locale handling. Confidence 0.82.
