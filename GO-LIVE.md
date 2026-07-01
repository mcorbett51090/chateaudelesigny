# Go-live checklist — owner inputs

The site is **built, QA-clean, and auto-deploying** to the interim URL
(`https://mcorbett51090.github.io/chateaudelesigny/`). Everything below is already
wired and ready — it just needs a value/asset only the owner can provide. Nothing
here blocks the interim site; these unlock the last features and the custom domain.

## 1. Feature keys — paste into `.env` (see [`.env.example`](.env.example)) or the host build env
Each turns a feature on the moment it's set; the privacy policy updates itself to name the processor.

- [ ] `PUBLIC_WEB3FORMS_KEY` — real enquiry delivery + auto-reply ([web3forms.com](https://web3forms.com), free)
- [ ] `PUBLIC_CF_BEACON` **or** `PUBLIC_PLAUSIBLE_DOMAIN` — cookieless analytics (no consent banner)
- [ ] **Analytics reporting** (full setup in [`docs/ANALYTICS.md`](docs/ANALYTICS.md)): repo secrets `CF_API_TOKEN` (Account Analytics:Read) + `CF_ACCOUNT_ID` + `DIGEST_RECIPIENTS` (reuse `BREVO_API_KEY`) to switch on the monthly digest; set Stripe Payment-Link post-payment redirects → `…/fr/merci/boutique/` & `…/fr/merci/cadeau/`; paste the `/go/instagram|newsletter|gbp|mariagesnet/` links into those channels
- [ ] `PUBLIC_NEWSLETTER_URL` — Brevo hosted-form action URL (EU)
- [ ] `PUBLIC_VOUCHER_STAY_URL` / `PUBLIC_VOUCHER_SHOP_URL` — Stripe Payment Links (gift vouchers)

## 2. Assets — drop a file, or add content to [`src/config/features.ts`](src/config/features.ts)
- [ ] **Before/after photo pairs** → `features.beforeAfter` — the owners' *own* room-reno photos (before + after of the same room). Drives the drag-to-compare slider on the history page.
- [ ] **360° tour URL** → `PUBLIC_TOUR360_URL` — a Kuula/Panoee embed (consent-gated).
- [ ] **Drone/video hero** → `PUBLIC_HERO_VIDEO` — an `.mp4` in `public/media/`.
- [ ] **Super Cho partner image** → replace `src/assets/partners/partner-super-cho.jpg` (current one is low-res; their site lazy-loads so it couldn't be re-sourced).
- [ ] **Real review quotes** → `features.reviews.items` — a few consented couple quotes (the 4.9/5 · 76 rating is already live).

## 2b. Lock the analytics dashboard (SSO) — [`docs/DASHBOARD-SSO-SETUP.md`](docs/DASHBOARD-SSO-SETUP.md)
Decided: repo → **private** + **Cloudflare Pages** + **Cloudflare Access** (Google + email code, email allow-list).
- [ ] Connect the repo to Cloudflare Pages; verify the `*.pages.dev` build; then flip the repo **private**
- [ ] Set up Cloudflare Access on `/fr|/en/interne/*` (covers the dashboard + any future owner page) with the staff email allow-list
- [ ] Verify no bypass (github.io 404, raw repo JSON private)
- [ ] **Do NOT** set the digest secrets (`CF_API_TOKEN`…) until the above is green — it would auto-publish real numbers to the repo

## 3. Domain cutover → `www.chateaudelesigny.com`
- [ ] Give the go-ahead → dev flips `SITE`/`BASE` in `astro.config.mjs` + adds `public/CNAME`
- [ ] **You:** add DNS `CNAME` record `www → mcorbett51090.github.io`, and set the custom domain in the repo's **Settings → Pages**
- [ ] Dev re-verifies canonical / hreflang / sitemap / OG all point to the new domain

## Already confirmed / done
- [x] **Legal identity** — Magnus Events (SAS), SIREN 903 305 498, RCS Melun (verified from the French registry) — in `site.ts`; legal pages now indexable, launch gate passes.
- [x] **Reviews rating** — 4.9/5 · 76 (Mariages.net) — live with `AggregateRating`.
- [x] **Restoration before/after** — links + embeds to the owners' own reveals + HGTV galleries (no copyrighted re-hosting).
