# FORGE G3 — Plan B (Sonnet · security-correctness lens) — condensed
Migrate origin to Cloudflare Pages built from a PRIVATE repo; Cloudflare Access on
/tableau-de-bord/ path; decommission GitHub Pages. Closes 3 holes as one motion:
(1) github.io origin bypass → gone (Pages off + private repo → 404); (2) public-repo raw data
(raw.githubusercontent, UI, clone, API) → repo private; (3) embedded-HTML data → Access is an
EDGE gate, returns login before the origin serves the HTML. IdP: Google + Email-OTP (no paid
Apple). KEY: data is per-revenue-stream conversion counts + a write-capable UI = genuinely
sensitive; and the digest Action is a live fuse that auto-commits real snapshots to the public
repo monthly once enabled. Verified: no real snapshot committed yet (git log), 0 forks.
Phase0 (now): robots Disallow + hold digest dormant + Wayback/GSC removal. Phase1: repo private +
CF Pages project + retire deploy.yml Pages job. Phase2: PROVE bypass dead (github.io 404,
raw.githubusercontent private). Phase3: Access app + Google/OTP + email allow-list + bypass-closure
tests. Phase4: domain cutover + only THEN enable real-data digest. Alt A: ship on *.pages.dev first
(decouple from DNS). Alt 2: keep repo public, split — dashboard as a CF Pages Function reading
private data (KV/R2/2nd private repo), 2 providers + server component.
GAP-DELTA: a minimal "Access on custom domain, repo public, github.io live" plan leaves ALL of:
github.io serves data unauth forever; public repo is a standing data copy; digest auto-manufactures
monthly leaks to public repo; write-UI exposed; cached/archived copies survive; killing the origin
needs deliberate GH-Pages-off, which "did the login appear" never prompts.
