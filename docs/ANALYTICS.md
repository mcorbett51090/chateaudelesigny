# Analytics & Reporting — master plan

> Produced by the FORGE pipeline (2026-07-01). Full gate artifacts:
> `.ravenclaude/runs/forge/venue-analytics/`. This is the durable, owner-facing master doc.

## The idea in one line
Cloudflare tells you the **traffic story** (where visitors come from, is it growing). Your
**inbox + Stripe** tell you the **money story** (actual enquiries and sales). Once a month a
plain-language email stitches them together and says **what to do next** — all with **zero
cookies and no consent banner**.

## Why this shape (the honest constraint)
Cloudflare Web Analytics (free) is **pageview-only**: it can't natively count "conversions",
it **strips `?utm=` campaign tags**, it shows a **~10% sample**, and it keeps **only 30 days**.
It *is* reliable and free for **aggregate traffic + referrer/channel trends**. So we use it there,
and take the real conversion numbers from ground truth — never dress up a noisy estimate as fact.

---

## Option A — Cloudflare Web Analytics (FREE) — **current build**
Cookieless, no banner, €0. What we build on top of it:

1. **Conversion proxies** — dedicated thank-you pages `/{locale}/merci/{slug}/`
   (`mariage · entreprise · sejour · boutique · cadeau · tournage · photo`). The contact form
   navigates there **only on a confirmed send** (never on the bot/honeypot path); Stripe sends
   buyers there via its post-payment redirect. A pageview of `/merci/{slug}/` ≈ one conversion —
   shown with a **confidence flag** because at low volume it's noisy. Ground truth stays the inbox + Stripe.
2. **Channel attribution without UTM** — Cloudflare records the **referrer** automatically
   (Google, Instagram, mariages.net). For places that lose the referrer (newsletter, QR codes,
   Google Business), paste a **path-based link** instead of a `?utm=` link:
   | Paste this link | …in this place |
   |---|---|
   | `…/go/instagram/` | Instagram bio |
   | `…/go/newsletter/` | Brevo newsletter button |
   | `…/go/gbp/` | Google Business Profile "website" |
   | `…/go/mariagesnet/` | your mariages.net listing |
   Each is an invisible one-hop redirect that logs the source, then sends the visitor home.
3. **Monthly digest** — a GitHub Action queries Cloudflare's GraphQL API, **archives a snapshot to
   the repo** (this is how we keep history past the 30-day wipe), computes month-over-month change,
   and emails a 3-part plain-language report (What happened / What it means / What to do), with
   confidence flags on small numbers. Delivered via Brevo; also committed to `reports/`.
4. **Dashboard** — a bookmarkable, no-login page on the site that shows the latest snapshot.

**Limits you accept with free Cloudflare:** conversion counts are directional (trust inbox/Stripe
for exact numbers), no funnels/journey, no per-campaign UTM, 30-day native history (we archive it).

## Option B — Plausible (~€9–19/mo) — **one-line upgrade, nothing wasted**
Already wired (`PUBLIC_PLAUSIBLE_DOMAIN` in `src/config/features.ts`). Also cookieless / no banner,
but adds what Cloudflare can't: **native conversion goals, funnels, no sampling, longer history, and
a genuine live public shareable dashboard.** The `/merci/` and `/go/` pages we build become Plausible
goals directly — so if the free version's noise ever frustrates you, flip one env var. **Recommended
path: start on free (A); upgrade to B only if you find you need exact low-volume conversion counts.**

## Option C — Cloudflare Worker + Workers Analytics Engine (advanced)
Accurate, unsampled, cookieless first-party event counter. More moving parts / maintenance. Only
worth it at higher traffic. Not built now.
*(Rejected: Zaraz / server-side tag managers — their purpose is proxying cookie-setting ad pixels,
which would reintroduce a consent banner.)*

---

## Phases & status
- **Phase 1 — tracking (BUILT):** `/merci/` pages, `/go/` links, contact-form re-route, sitemap exclusion.
- **Phase 2 — digest (BUILT, dormant):** generator script + monthly GitHub Action — runs once secrets are set.
- **Phase 3 — dashboard (BUILT):** owner-area `/{locale}/interne/tableau-de-bord/` reading the snapshot.
- **Phase 0 — activation (OWNER):** see below, then watch ~3–4 weeks of real traffic before trusting numbers.

## Owner setup (paste-a-value — see also [`GO-LIVE.md`](../GO-LIVE.md))
1. Create a free **Cloudflare Web Analytics** site → copy the **beacon token** → set `PUBLIC_CF_BEACON`.
2. Create a Cloudflare **API token** scoped `Account Analytics:Read` → repo secrets `CF_API_TOKEN` + `CF_ACCOUNT_ID`.
3. In Stripe, set each Payment Link's **post-payment redirect** to `…/fr/merci/boutique/` (shop) and `…/fr/merci/cadeau/` (vouchers).
4. Repo secrets `BREVO_API_KEY` (reuse newsletter) + `DIGEST_RECIPIENTS` (owner email).
5. Paste the four `/go/…` links into Instagram / newsletter / Google Business / mariages.net.

## Timeline events (milestones on the chart)
The dashboard's right-hand **Événements / Events** panel marks significant dates (renovations,
launches, a site update…) as labeled vertical lines on the trend chart, each toggleable.

- **Shared/durable events** live in [`reports/analytics/events.json`](../reports/analytics/events.json)
  (`[{ "date": "2026-04", "label": "Ballroom renovated" }]`). Edit that file — or use the in-page
  **"⚙ Save to the site"** flow — and everyone sees them.
- **Save-to-the-site flow (no backend needed):** the owner pastes a **fine-grained GitHub token**
  once; the page then commits new/removed events straight to `events.json` via the GitHub Contents
  API, GitHub Pages redeploys, and it's live for everyone (~1 min). To create the token:
  GitHub → *Settings → Developer settings → Fine-grained tokens* → **Repository access:** only
  `mcorbett51090/chateaudelesigny` → **Permissions:** *Contents: Read and write* → generate, paste
  into the panel. **The token is stored only in that browser's localStorage — never in the code or
  the deployed site.** Without a token, added events are remembered per-browser only.

## Snapshot schema (contract shared by generator + dashboard)
`reports/analytics/YYYY-MM.json`:
```json
{
  "month": "2026-06",
  "generatedAt": "2026-07-01T06:00:00Z",
  "sampleNote": "~10% sampled; counts under ~50 are directional only",
  "totals": { "visits": 0, "pageviews": 0, "prevVisits": 0 },
  "locales": { "fr": 0, "en": 0 },
  "channels": [ { "source": "instagram", "visits": 0 } ],
  "landingPages": [ { "path": "/fr/mariages/", "visits": 0 } ],
  "conversions": {
    "mariage":    { "merci": 0, "confirmed": null },
    "entreprise": { "merci": 0, "confirmed": null },
    "sejour":     { "merci": 0, "confirmed": null },
    "boutique":   { "merci": 0, "confirmed": null },
    "cadeau":     { "merci": 0, "confirmed": null }
  }
}
```
`merci` = Cloudflare pageview proxy (directional). `confirmed` = ground-truth count (Stripe API /
owner-entered), `null` when unknown. The dashboard/digest always label `merci` as an estimate.
