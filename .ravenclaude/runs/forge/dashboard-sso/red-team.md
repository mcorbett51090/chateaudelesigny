# FORGE G5 — Red-team (real, reproducible)

1. **The fuse**: setting CF_API_TOKEN/CF_ACCOUNT_ID before privatizing → the monthly Action commits
   real per-stream conversion snapshots to the PUBLIC repo, forever. Repro: enable secrets today.
   Mitigate: enablement is the LAST step, gated behind repo-private + Access-verified DoD.
2. **Resurrected origin**: leaving deploy.yml's Pages job "just in case" → a stray push to main
   republishes the unprotected github.io origin. Mitigate: DELETE the Pages-publish job; DoD test =
   github.io/.../tableau-de-bord/ returns 404.
3. **CF Pages build parity**: sharp/astro:assets may behave differently on CF's build image → broken
   images/build. Mitigate: verify a green CF Pages build serving all public pages BEFORE decommissioning GH Pages.
4. **Over-broad Access path** gates the whole public site. Mitigate: scope app to /fr|/en/tableau-de-bord*;
   DoD test = a public page loads with no login.
5. **Owner lockout**: owner email absent/typo in the allow-list. Mitigate: owner email first; keep OTP on.
6. **Forks/clones of the public repo** retain data permanently. Mitigate: verified 0 forks + no real
   data yet; re-check fork count immediately before enabling real data.
7. **Cached/archived copies** of the (sample-data) page. Mitigate: robots Disallow now + best-effort
   Wayback/GSC removal; low severity while only sample data exists.
8. **BASE/SITE change** breaks an internal link the withBase() helper missed. Mitigate: full
   click-through regression on the CF Pages build before trusting it.
No unmitigated high-severity remains → synthesize.
