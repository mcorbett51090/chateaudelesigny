# FORGE G1 — Claims table (verified 2026-07-01)

| # | Claim | Tier | Source / marker | Settling gate |
|---|-------|------|-----------------|---------------|
| 1 | Cloudflare Access free plan = 50 users; supports path-scoped policies (protect just /tableau-de-bord/) | BLOCK | cloudflare.com/plans/zero-trust-services; developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths (2026-07-01) | design → Access policy on dashboard path |
| 2 | Cloudflare Access IdPs: Google (native, needs a Google OAuth app), Email One-Time-PIN (zero-config, add emails), generic OIDC/SAML | BLOCK | developers.cloudflare.com/cloudflare-one/integrations/identity-providers/{google,one-time-pin,generic-oidc} (2026-07-01) | Google + OTP recommended |
| 3 | "Sign in with Apple" has NO built-in CF Access IdP; only via generic OIDC (needs Apple Developer acct ~$99/yr). Email OTP covers @icloud.com users | BLOCK | CF identity-providers docs list (no Apple) 2026-07-01 | recommend Google+OTP; Apple-button optional/heavy |
| 4 | Cloudflare Access protects only requests via the CF-proxied hostname; the public github.io origin URL is served by GitHub directly and BYPASSES Access. GitHub Pages has no reliable origin-allowlist on free/pro | BLOCK | architecture + CF Access model; no doc contradicts (2026-07-01) [reasoned, high-confidence] | red-team; drives hosting choice |
| 5 | Cloudflare Pages builds+deploys from PRIVATE GitHub repos on the free plan | BLOCK | developers.cloudflare.com/pages/configuration/git-integration/github-integration (2026-07-01) | full solution = migrate to CF Pages |
| 6 | GitHub Pages needs Pro for private-repo publishing, AND the published static site's source is still public (page source) | BLOCK | github.blog/changelog access-control-for-github-pages; community discussions (2026-07-01) | public-data hole → private repo + CF Pages |
| 7 | Analytics data (reports/analytics/*.json) + embedded snapshots are committed to a PUBLIC repo → world-readable regardless of page auth | WARN (in-repo, confirmed) | repo is public github.com/mcorbett51090/chateaudelesigny | make repo private (CF Pages path) |
| 8 | Site currently deploys via GitHub Actions → GitHub Pages; custom domain cutover still pending | WARN (in-repo, confirmed) | .github/workflows/deploy.yml, GO-LIVE.md | SSO couples to domain-on-Cloudflare |
