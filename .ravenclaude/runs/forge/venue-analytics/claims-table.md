# FORGE G1 — Claims table (verified 2026-07-01)

| # | Claim | Tier | Source / marker | Settling gate |
|---|-------|------|-----------------|---------------|
| 1 | CF Web Analytics (free) is pageview-only — no custom events/conversion goals | BLOCK | plausible.io/vs-cloudflare-web-analytics; developers.cloudflare.com/web-analytics/faq (2026-07-01) | drives design → thank-you paths |
| 2 | CF strips query strings — UTM params NOT logged; referrers via Referer header | BLOCK | community.cloudflare.com/t/utm-url-parameters-do-not-show-up-in-referrers (2026-07-01) | channel attribution = Referer + path landings |
| 3 | CF data is ~10% sampled/extrapolated; 30-day retention; ~15 rows/report | BLOCK | plausible.io/vs-cloudflare-web-analytics (2026-07-01) | digest frames as trends; GraphQL archives history |
| 4 | CF GraphQL Analytics API exposes rumPageloadEventsAdaptiveGroups (account-scoped, Account Analytics:Read token) | BLOCK | developers.cloudflare.com/analytics/graphql-api (2026-07-01) | automated digest via GH Action |
| 5 | CF Web Analytics beacon already wired in BaseLayout via features.cloudflareBeacon | WARN (in-repo, confirmed this session) | src/layouts/BaseLayout.astro:87-93 | owner sets token |
| 6 | Site is static Astro on GitHub Pages; contact form = Web3Forms inline success (streams: mariage/entreprise/sejour); boutique = Stripe | WARN (in-repo, confirmed) | contact.astro, boutique.astro | form-flow change for thank-you paths |
| 7 | CF dashboard public-share capability | UNVERIFIED — not confirmed in G1 | needs check; digest is primary deliverable regardless | G5/impl verify |
