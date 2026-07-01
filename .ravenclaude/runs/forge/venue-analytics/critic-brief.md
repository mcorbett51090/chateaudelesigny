# FORGE G4a — Critic brief (independent; authored neither plan)

## Correlated errors (where A & B agree on something wrong)
1. **Both over-invest in a noisy /merci conversion-count layer, then tell the owner not to
   trust it.** At ~10% sampling + single-digit monthly conversions, /merci counts are noise.
   Ground truth (Web3Forms inbox + Stripe) is what both defer to anyway. → Demote /merci to a
   cheap programmatic cross-check; source real conversion numbers from ground truth (Stripe API
   + owner-entered inbox count). CF's value is the TRAFFIC + CHANNEL layer, which IS reliable at
   aggregate. The digest's power = marrying reliable CF channel data with true conversion counts.
2. **Both frontload building the GraphQL pipeline/dashboard before confirming there's signal.**
   Sequencing risk: turn the beacon on and OBSERVE actual volume for 3-4 weeks before building
   automation. Scale ambition to traffic; a low-traffic venue may only justify a manual digest.
3. **Both build a bespoke charting dashboard page.** Simpler: render the latest digest as an
   always-current noindex page (same content, no charting lib).

## Premise attack
"Best reporting to drive real insights and actions" for a small venue is dominated by a few levers
(where enquiries come from; which of 4 streams trends; visit→enquiry rate). Risk = engineering a
GraphQL/Action/dashboard stack when a monthly {CF traffic view + inbox count + Stripe count} gives
~90% of the value. Start lean; automate only if observed volume justifies it.

## Risk matrix (prob × impact)
| Risk | P | I | Mitigation |
|------|---|---|-----------|
| Noisy conversion count drives a bad decision | H | H | confidence flags + ground-truth as number-of-record |
| Beacon not live / no baseline | M | H | Phase 0 verify FIRST |
| Over-engineering vs actual traffic | H | M | gate automation on observed volume; lean interim |
| Boutique click-intent read as sales | M | H | Stripe post-payment redirect for truth; label honestly |
| GraphQL token returns no rows | M | M | verify query returns rows as a build gate |
| pushState/iframe fragility (B) | — | — | resolved: choose A's real navigation |
