# FORGE G5 — Red-team (real, reproducible failure modes)

1. **Beacon not set in prod** → analytics dark, no baseline. Repro: view-source live site for
   beacon.min.js + token. Mitigate: Phase 0 verify before any build.
2. **GraphQL token returns empty/forbidden** → digest has no data. Repro: run the RUM query with
   the token before building the generator. Mitigate: "returns rows" is a hard build gate.
3. **Owner never pastes /go/ links** → attribution stays "direct", dashboard looks useless. Repro:
   observe referrers all-direct. Mitigate: printed one-pager; set the top 2 (IG bio, Google
   Business) WITH the owner during handoff.
4. **Noisy count drives a bad call** (cut IG on 2-vs-4). Mitigate: confidence flags + ground-truth
   number-of-record + digest labels CF counts "directional".
5. **Boutique click-intent mistaken for sales.** Mitigate: Stripe redirect for truth; never show
   click-intent without the "check Stripe" caveat on the same line.
6. **Honeypot/bot inflation + bilingual double-count.** Repro: bot fill today already calls
   reveal(). Mitigate: fire tracking ONLY at the two genuine-success sites (NOT reveal(), NOT the
   honeypot branch); noindex + sitemap-exclude /merci + /go; sum by slug across locales.
7. **Privacy of committed snapshots.** CF snapshots hold only aggregated dims (path, referer host,
   counts) — no IPs/PII/query-strings. Safe to commit. Mitigate: snapshot aggregated dims only;
   assert no query strings.
8. **Over-engineering vs traffic.** Mitigate: gate Phase 2 automation on observed volume; ship a
   manual digest template as the interim so value lands even at low volume.

No unmitigated high-severity mode remains → proceed to synthesize.
