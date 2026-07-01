# FORGE G4b — Tiebreaks

1. **Contact success UX** — A: real navigation to /merci/ page. B: preserve inline confirm via
   hidden iframe / pushState.
   → **VERDICT A.** Real thank-you page = reliable beacon (full load), best-practice conversion
   pattern, room for next-steps content, and it sidesteps B's undocumented pushState risk (B's 0d).
2. **Boutique/voucher conversions** — A: Stripe post-payment redirect → /merci/boutique/ (real
   purchase). B: click-intent only (site can't see completed sale).
   → **SYNTHESIS.** Stripe Payment Links DO support a post-payment redirect URL → use it for TRUE
   purchase tracking (A is right it's possible). Where a link's redirect isn't set, fall back to
   B's click-intent, labeled explicitly. Prefer the redirect. Also pull Stripe sales via API for
   the digest's number-of-record.
3. **Conversion source** (critic reframe) — noisy /merci counts vs ground truth.
   → **SYNTHESIS.** CF = traffic + channel (reliable). Conversions of-record = Stripe API (sales)
   + owner-entered/confirmed enquiry count (30-sec inbox glance). /merci = cheap cross-check,
   demoted, always shown with a confidence flag.
4. **Sequencing** (critic) — build pipeline now vs observe first.
   → **VERDICT: phase it.** Phase 1 (beacon + /go + /merci, buildable now, cheap). OBSERVE 3-4wk.
   Phase 2 (automated digest/dashboard) only after confirming usable volume; manual template interim.
