# FORGE G0 — Scope: Venue web analytics + reporting

**Idea:** Give the château owners privacy-clean web analytics + reporting that drives real
business/marketing decisions. Owner is non-technical ("give me the best reporting").

**G0 answers (2026-07-01):**
- Platform: **Cloudflare Web Analytics (free, cookieless, no consent banner)**.
- Spotlight conversions: **weddings, corporate, overnight stays, boutique/vouchers** (all four).
- Reporting: **both** a live shareable dashboard AND a plain-language monthly digest
  (what happened · what it means · what to do).

**Scoped intent:** Activate CF Web Analytics (beacon already wired), engineer conversion
tracking that works in a *pageview-only* tool (dedicated thank-you paths per stream + a UTM
tagging convention), share a curated dashboard, and produce a monthly plain-language digest
(template and/or automated via CF GraphQL API).

**Out of scope:** switching to a paid analytics tool; A/B testing; ad-platform pixels
(Meta/Google Ads) — they'd reintroduce a consent banner; CRM/booking-system integration.

**Success signal:** Owner can answer monthly, in plain language: where visitors come from,
which pages/channels drive enquiries per stream, and what to do next — with zero cookie banner.

**Owner:** Team Lead (this session).
