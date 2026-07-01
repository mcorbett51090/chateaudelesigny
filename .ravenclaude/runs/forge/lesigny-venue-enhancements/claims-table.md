# G1 — Claims table (load-bearing facts)

Tiers: **BLOCK** = outside-repo claim, needs session source or `[unverified]`+justification.
**WARN** = repo-structural, confirmed in-session. Sources retrieved 2026-07-01 unless noted.

## Repo-structural (WARN — confirmed in-session this + prior session)
| # | Claim | Tier | Source | Settles at |
|---|-------|------|--------|-----------|
| R1 | Site is static Astro 5, bilingual FR/EN, token-driven; pages incl. contact (mailto funnel), le-domaine (SVG plan + filterable décor index), mariages, entreprise, sejour, boutique, partenaires | WARN | read this/prior session | — |
| R2 | `photoswipe@5.4.4` + `pdfkit@0.19.1` + `sharp` are already dependencies; `@astrojs/sitemap` configured with i18n hreflang | WARN | package.json / astro.config.mjs read in-session (agents 1&3) | G6 |
| R3 | JSON-LD currently only `TouristAttraction` in BaseLayout.astro | WARN | agent-1 read BaseLayout.astro:25-44 | Phase: schema |
| R4 | contact.astro already has a multi-field form (name/email/phone/date/guests/type/consent/honeypot) defaulting to `mailto:` with optional POST upgrade | WARN | agent-1 read contact.astro | Phase: forms |
| R5 | `DomaineSchematic.astro` + `DomaineIndex.astro` exist (SVG plan + filterable index) — scaffolding for a clickable map | WARN | agent-3 read repo | Phase: map |
| R6 | Existing PDF is an **ungated, film-only** location pack (tournages.astro) — no wedding brochure | WARN | agent-1 read tournages.astro:485 | Phase: brochure |

## Outside-repo (BLOCK — session-sourced)
| # | Claim | Tier | Source (2026-07-01) |
|---|-------|------|---------------------|
| E1 | Gated wedding brochure (email capture) is table-stakes on premium châteaux | BLOCK✓ | hedsor.com/weddings/download-your-weddings-brochure; chateaududoux.com/weddings |
| E2 | Availability + complimentary provisional date-hold is a real differentiator | BLOCK✓ | hedsor.com/weddings/availability ("held complimentary for seven days") |
| E3 | Guided 360 virtual tour is a differentiator for destination couples | BLOCK✓ | hedsor.com/explore/virtual-tour |
| E4 | Real-weddings gallery + review aggregation are table-stakes (social proof) | BLOCK✓ | chateaudelacouronne.com/weddings; blenheimpalace.com; oheka on weddingwire/theknot |
| E5 | FAQ w/ FAQPage schema is table-stakes | BLOCK✓ | hedsor.com/contact-us/frequently-asked-questions |
| E6 | Gift vouchers / experience packages are an established château revenue line | BLOCK✓ | chateaudemontcaud.com; kilconquharcastle.co.uk; hattonchatelchateau.fr/en/vouchers |
| E7 | Château de Lésigny IS HGTV "Castle Impossible" (S1 29 Apr 2025, S2 26 May 2026) → before/after story is uniquely ownable | BLOCK✓ | hgtv.com; tvinsider.com |
| E8 | Web3Forms = static-friendly, no-storage, forwards to email (free, rate-limited); Formspree free 50/mo (US-hosted, EU-data caution) | BLOCK✓ | web3forms.com/pricing; help.formspree.io |
| E9 | Cloudflare Pages Functions/Workers + Resend (free 3k/mo, EU multi-region) = "own-your-pipeline" email; Resend GDPR-friendly | BLOCK✓ | resend.com/pricing |
| E10 | Cloudflare Web Analytics + Plausible (EU) are cookieless → CNIL audience-measurement exemption, **no consent banner** | BLOCK✓ | plausible.io/data-policy; cloudflare.com/web-analytics; cnil.fr |
| E11 | Under CNIL: no non-essential cookies pre-consent; accept/reject equally easy; scroll≠consent; third-party embeds must be click-to-load gated | BLOCK✓ | cnil.fr; Matomo 2025; Usercentrics |
| E12 | Stripe Payment Links = hosted PCI-compliant checkout, no backend, for fixed-value vouchers; Shopify gift-cards need Basic €33/mo | BLOCK✓ | docs.stripe.com/payment-links/create; shopify.com/pricing |
| E13 | `wa.me` WhatsApp link = no cookies/no consent needed (until wrapped in tracking) | BLOCK✓ | hello-charles.com/blog/whatsapp-opt-in-gdpr |
| E14 | schema.org LocalBusiness + EventVenue (+ LodgingBusiness for stay, Product for shop, FAQPage); add aggregateRating ONLY with real reviews | BLOCK✓ | schema.org/EventVenue; dualsparkmarketing |
| E15 | Mariages.net dominant FR directory (The Knot WW) w/ review-driven Wedding Awards badge; Zankyou #2; free "publish reviews on your site" option | BLOCK✓ | similarweb; mariages.net/emp-AccesoReviews.php |
| E16 | Kuula/Panoee give iframe/self-host 360 embeds; Matterport is cloud-locked (~$828/yr) | BLOCK✓ | panoee.com; cloudpano.com |
| E17 | In-person tour requests convert ~40–60%; short forms + fast human follow-up beat elaborate booking systems; live availability calendar is an over-engineering trap for a relationship-led €20k+ sale | BLOCK (Medium) | boykinwebmanagement.com/services/cro; sonas.events; wedinspire.com |

## Asset / owner-ops gated (settle by asking owner — flagged `[needs-asset]`)
| # | Claim | Marker |
|---|-------|--------|
| A1 | Before/after restoration slider needs owned, rights-cleared paired photos (HGTV footage may be Discovery-licensed) | `[needs-asset]` — ship the component with placeholder/graceful empty-state; owner supplies imagery |
| A2 | 360 tour + drone hero need capture the château doesn't have yet | `[needs-asset]` — build consent-gated embed slot, populate later |
| A3 | Review aggregation / aggregateRating need real reviews to exist | `[needs-asset]` — build the display + schema frame, do NOT fabricate ratings |
| A4 | Gift-voucher sales + newsletter need owner to fulfil/send | `[needs-ops]` — build UI + Stripe-link/Brevo slots behind config; inert until owner enables |

## Settling principle
Every `[needs-asset]`/`[needs-ops]` feature ships as a **working frame with an honest empty-state or
config flag** (no fabricated content), so the owner can populate/enable without a code change. All
third-party embeds route through **one CNIL click-to-load consent component** (E11) — a hard
precondition before any embed lands.
