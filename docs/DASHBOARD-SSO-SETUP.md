# Dashboard SSO — setup runbook

Goal: only the owner + a few staff can open `/tableau-de-bord/` **and** its data; no bypass.
Decision made: **whole repo → private + host on Cloudflare Pages + Cloudflare Access.** Full
reasoning: [`.ravenclaude/runs/forge/dashboard-sso/plan.md`](../.ravenclaude/runs/forge/dashboard-sso/plan.md).

> **Do NOT enable the analytics digest yet.** Keep `CF_API_TOKEN` / `CF_ACCOUNT_ID` **unset** until
> the DoD at the bottom is green. Turning it on before the repo is private auto-commits real
> conversion numbers into a public repo (the "live fuse"). Nothing has leaked yet — keep it that way.

Legend: **[you]** = clicks in Cloudflare/GitHub · **[dev]** = a code change (ping me, I do it).

## Phase 0 — done ✅
- robots.txt now disallows the dashboard paths (crawler hygiene).
- Digest Action is dormant (no CF secrets set). Leave it.

## Phase 1 — new private origin (do NOT break the current site first)
1. **[you]** Cloudflare → **Workers & Pages → Create → Pages → Connect to Git** → pick
   `mcorbett51090/chateaudelesigny`. Build settings: framework **Astro**, build command
   `PREVIEW_ROOT=1 astro build`, output dir `dist`, Node `20`. Deploy → you get a
   `something.pages.dev` URL.
2. **[dev]** Once that URL exists, I update `astro.config.mjs` `SITE` (and confirm base `/`) for the
   new host and re-verify canonical/hreflang/sitemap/OG. *(Do this while the repo is still public so
   the CF build is easy to debug.)*
3. **[you]** Verify the `*.pages.dev` site loads every public page (nav, FR/EN switch, images).
4. **[you]** **GitHub → repo Settings → General → Danger Zone → Change visibility → Private.**
   (GitHub Pages on a free plan stops serving a private repo — that's intended; Cloudflare Pages
   keeps building from the private repo.)
5. **[dev]** Retire the GitHub-Pages publish job in `.github/workflows/deploy.yml` so a stray push
   can't resurrect the old public origin.

## Phase 2 — prove the bypasses are dead
6. **[you]** Open `https://mcorbett51090.github.io/chateaudelesigny/fr/tableau-de-bord/` → must be
   **404**. If it still loads: GitHub → Settings → Pages → Source = **None**.
7. **[you]** Open `https://raw.githubusercontent.com/mcorbett51090/chateaudelesigny/main/reports/analytics/events.json`
   while logged out → must be **404 / requires auth**.

## Phase 3 — the login wall (Cloudflare Access)
8. **[you]** Cloudflare → **Zero Trust** (free). If prompted, create a team name.
9. **[you]** **Settings → Authentication → Login methods:** add **Google** (paste a Google OAuth
   client ID/secret — 10-min setup, or ask me for the walkthrough) **and** **One-time PIN** (no setup;
   this is the "Apple / any email" path — users get a 6-digit code).
10. **[you]** **Access → Applications → Add → Self-hosted.** App name "Dashboard". Add **two paths**
    (or one app per path): `<your-host>/fr/tableau-de-bord/*` and `<your-host>/en/tableau-de-bord/*`.
11. **[you]** **Policy:** Action **Allow**, Include → **Emails** → list the owner's email **first**,
    then each staff email. (Add/remove people later = edit this list. No code, no deploy.)
12. **[you]** Session duration ~24h. Save.

## Phase 4 — later (not blocking)
13. **[you]** Custom domain cutover to `www.chateaudelesigny.com` (point DNS at the Pages project).
14. **[dev]** Finalize `SITE`/`BASE`, robots sitemap URL, canonical.
15. **[you/dev]** ONLY NOW set `CF_API_TOKEN` / `CF_ACCOUNT_ID` / `DIGEST_RECIPIENTS` to switch on the
    real monthly digest (see [`docs/ANALYTICS.md`](ANALYTICS.md)). Re-check the repo has 0 forks first.

## Definition of done (all must be true)
- [ ] `github.io/.../tableau-de-bord/` returns **404** (verified, not assumed).
- [ ] `raw.githubusercontent.com/.../reports/analytics/*.json` is **private/404** logged-out.
- [ ] Incognito hit to the dashboard → **redirected to the Cloudflare login**, never a page with data.
- [ ] A **non-listed** account is **denied**; an **allow-listed** email (Google **and** email-code) gets in.
- [ ] Every **other** page loads with **no** login prompt.
- [ ] The in-page "save event to the site" (GitHub token) flow still works against the private repo.
- [ ] `deploy.yml` no longer publishes to GitHub Pages.
- [ ] No real analytics snapshot committed until everything above is green.
