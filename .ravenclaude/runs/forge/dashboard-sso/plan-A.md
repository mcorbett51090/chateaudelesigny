# FORGE G2 — Plan A (Opus · lowest-effort-that-works lens)

## Design: Cloudflare Access on the CF-proxied custom domain (zero build change for the wall)
1. Move chateaudelesigny.com DNS to Cloudflare (nameservers) — the load-bearing dependency.
2. Do the GitHub-Pages cutover THROUGH Cloudflare (revise GO-LIVE §3): proxied CNAME
   www → mcorbett51090.github.io, GitHub Pages custom domain = www.chateaudelesigny.com.
3. Cloudflare Access app(s) scoped to www…/fr/tableau-de-bord* and /en/tableau-de-bord*.
4. IdP: Google native (the literal "Sign in with Google" button; ~15-min Google OAuth app) +
   Email One-Time-PIN (zero-config; the honest answer to "Apple" — @icloud.com gets a code;
   no paid Apple Developer acct). OTP-only is the faster fallback.
5. Allow-list = Access policy Allow → Include Emails = owner + staff. Add/remove = 1 dashboard field.

## Key structural fact
Dashboard data is baked into the HTML at BUILD time (readFileSync inlines JSON) — gating the HTML
route gates the numbers. No live API to also protect. Repo/build changes for the wall = NONE
(only the cutover edits: SITE/BASE flip + public/CNAME, which was happening anyway).

## The two residual holes (accepted only for low-sensitivity aggregate traffic)
1. Origin bypass: github.io mirror serves identical HTML+numbers, never touches Cloudflare, not
   origin-lockable on Pages free/pro. Mitigation = noindex+sitemap-excluded (non-publication, not security).
2. Public-data: reports/analytics/*.json world-readable in the public repo; required at build time.
   Not closable without a private repo (→ Alt 2).
Net: real IdP wall for every normal visitor at the real URL; NOT confidentiality vs a determined
party reading the repo/github.io. Documented, owner-acknowledged trade.

## Phases + DAG
P0 preconditions → P1 nameserver move → P2 cutover via Cloudflare (a: repo PR SITE/BASE+CNAME;
b: bootstrap DNS-only + GitHub cert; c: flip to Proxied, SSL Full) → P3 Access app + Google OAuth +
OTP + allow-list (Google app parallelizable from P0) → P4 hole verification/sign-off → P5 owner runbook.

## Core acceptance test (P3)
Incognito → www…/tableau-de-bord/ → CF Access login (not dashboard); allow-listed email (Google +
OTP) → renders; non-listed → denied; public pages → no prompt.

## Alternatives
1. Access on custom domain (RECOMMENDED) — real wall, zero build change; leaves 2 holes.
2. Migrate to Cloudflare Pages from a PRIVATE repo — closes BOTH holes (no github.io mirror, JSON
   inputs private), Access native; cost = rebuild deploy.yml, repo private, abandon GH Pages. The
   pre-scoped upgrade if data sensitivity rises.
3. Email-OTP-only — even lower effort, no Google button.
4. Client-side password — REJECTED (violates G0, trivially bypassed).

## Risks
HTTPS chicken-egg (bootstrap DNS-only then proxy); whole-site accidentally gated (scope to 2 paths);
owner lockout (own email first + OTP fallback); nameserver move breaks other DNS (export/recreate records).
Confidence 0.82.

## Open questions
Google button vs OTP-only? www-only or also apex? Owner formally accepts the 2 holes or escalate to Alt 2?
