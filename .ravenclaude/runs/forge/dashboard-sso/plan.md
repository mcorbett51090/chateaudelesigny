# Dashboard SSO — FORGE synthesized plan

**Goal:** Only the owner + a few named staff can view /tableau-de-bord/ AND its data; no bypass.

## Adjudication (critic)
The dashboard shows per-revenue-stream conversion counts, and the monthly digest Action — once
enabled — auto-commits real conversion snapshots to the PUBLIC repo forever. So a page-gate alone
(Panel A) is insufficient: the data must not live on a public origin. Reframe: the dashboard + its
data are an INTERNAL tool → serve them from a gated, private surface; keep the public marketing site
public and separate. No real snapshot committed yet (verified) — there is time to do it right.

## Recommended architecture (Cloudflare Pages, private repo, Cloudflare Access)
1. Repo → **private** (Cloudflare Pages builds private repos free; GitHub Pages can't serve them → the
   parallel unprotected origin dies as a testable 404, not a promise).
2. Host on **Cloudflare Pages** from the private repo; **retire deploy.yml's Pages-publish job**.
   Decouple from the domain cutover — ship on the `*.pages.dev` host first.
3. **Cloudflare Access** on `/fr/tableau-de-bord*` + `/en/tableau-de-bord*`. IdP: **Google + Email-OTP**
   (OTP covers @icloud.com; no paid Apple Developer). Policy: Allow → Include Emails = owner + staff.
4. Public pages: no Access policy → stay public.

## THE decision for Matt (tiebreak #2, high-blast)
- **A — Whole repo private + Cloudflare Pages (RECOMMENDED):** one provider, closes every hole,
  simplest. Cost: the repo (whole château codebase + FORGE artifacts) becomes private — no public
  portfolio visibility.
- **B — Keep repo public + split:** marketing stays public on GitHub Pages; the dashboard becomes a
  Cloudflare Pages Function reading private data (KV/R2 or a 2nd private repo), Access-gated. Keeps the
  repo public but = two providers + a live server component for one page.
Pragmatic "page-gate only, repo public" is OFF the table (the fuse).

## Phases + DAG
- **P0 (now, no infra, no regret):** add `Disallow` for the dashboard paths to robots.txt; KEEP the
  digest Action dormant (do NOT set CF secrets); best-effort Wayback/GSC removal of the sample page.
  → independent, do immediately.
- **P1:** repo→private → CF Pages project (Astro, `astro build`, dist, Node 20) → retire deploy.yml
  Pages job → verify green CF build serves all public pages on *.pages.dev.
- **P2:** PROVE bypass dead — github.io/.../tableau-de-bord/ = 404; raw.githubusercontent JSON = private.
- **P3:** Zero Trust IdPs (Google + OTP) → Access app on the two dashboard paths → email allow-list →
  acceptance tests: anon → 302 login (not 200+data); non-listed → denied; OTP (@icloud) → in; public
  page → no prompt; PAT event-commit flow works against the private repo.
- **P4:** (later) www.chateaudelesigny.com cutover → **then** enable the digest Action (real data).
```
P0 ─ independent
P1 (repo private → CF Pages → retire GH Pages job → verify) → P2 (prove bypass dead) → P3 (Access +
IdP + allow-list + tests) → P4 (domain cutover → enable real-data digest LAST)
```

## Acceptance / DoD
github.io path 404; raw JSON private; anon dashboard → login challenge (no cached 200); non-listed
denied; allow-listed Google + OTP in; public pages open; PAT commit works; deploy.yml Pages job gone;
NO real snapshot committed until all green.

## Alternatives
1. Whole-repo-private + CF Pages + Access (RECOMMENDED).
2. Split: repo public, dashboard = gated CF Pages Function over private data (portfolio-preserving; +complexity).
3. Access-on-custom-domain only, repo public (Panel A) — REJECTED (leaves the fuse + origin/repo holes).
4. Client-side password — REJECTED (data is inlined in the HTML; not real).

## Owner-dependent
Repo-visibility decision (A vs B); Cloudflare account (exists); Google OAuth app (or OTP-only);
staff email allow-list; DNS for the eventual cutover; do NOT set the digest CF secrets until DoD met.
