# G4b — Tiebreaks (rulings)

Resolved under the critic's binding reframe: **build a working, polished site NOW in this repo; every
external dependency is OPTIONAL and isolated behind one env var / one swappable component; art direction
(not procurement) is the luxury.** Team-Lead rulings (clean calls); rationale one line each.

| # | Conflict | Ruling | Rationale |
|---|---|---|---|
| C1 | CMS: Sveltia vs Storyblok | **SYNTHESIS — in-repo typed Astro content collections (Markdown/JSON) now; NO CMS account.** Reserve **git-backed Sveltia** as a documented optional upgrade (it needs no hosted account/DB). | A CMS is premature infra for build-now; content-in-repo is zero-account, versioned, host-agnostic. B's "non-technical owners won't use Git" is valid only at the *upgrade* decision — and Sveltia's browser UI addresses it without a hosted account. |
| C2 | Signature element | **SYNTHESIS — curated ~12–15 editorial "Décors" selection + an agent-authored simple SVG estate/floor schematic (line-plan).** | B's commissioned hand-survey painting is unbuildable now; A's 70-tile filterable grid advertises asset thinness. Curation = luxury; story > inventory; a clean SVG line-schematic is zero-dependency and distinctive. |
| C3 | Host: Cloudflare vs Netlify | **SYNTHESIS — host-agnostic static build** (deploys to Cloudflare Pages / Netlify / GitHub Pages alike). | Don't couple to a vendor; the only server-ish bit (form submit) is a pluggable adapter, so the static site stays portable. |
| C4 | Fonts: paid GT Sectra vs free Cormorant | **SYNTHESIS — free, self-hosted, STURDY: Fraunces (display) + Source Serif 4 (body) + Inter/Instrument Sans (UI) + a mono for "slate" metadata.** | Paid fonts can't be licensed in-session; Cormorant renders thin/fragile at text sizes (cheap-luxury tell). Fraunces is distinctive, variable, sturdy, free. |
| C5 | Map: MapLibre vs Mapbox | **SYNTHESIS — static branded SVG location panel + "Open in Maps / Get directions" deep-links.** Tile map (MapLibre+MapTiler) = optional upgrade. | Both tile options need a token/account/tiles; the map's only job is "near Paris, here's how to arrive" — a static panel does that faster, on-brand, account-free. |
| C6 | 360: Kuula vs Pannellum | **SYNTHESIS — OMIT 360 from the build; ship a swappable `<VirtualTour>` slot** (renders a poster/placeholder until panoramas + provider supplied). | 360 secretly requires equirectangular captures that don't exist and can't be faithfully generated; shipping a broken/placeholder tour is anti-luxury. |

## Reframes adopted from G4a (not conflicts, but binding corrections)
- **Inquiry funnel:** replace the multi-step branching wizard with a **short, elegant single-step inquiry** (stream pre-select via context) + **prominent direct contact** (email/phone). Submit goes through a **pluggable adapter**: default = no-infra (mailto compose + honeypot/time-trap anti-spam); optional upgrade = serverless endpoint + Resend + Turnstile, all behind env vars.
- **Analytics:** **none by default** (cookieless ≠ GDPR-exempt per CNIL). Documented one-line slot.
- **Legal:** ADD **Mentions légales** + **Politique de confidentialité** pages (FR-mandatory; both panels omitted). Templates wired to user-provided facts.
- **i18n:** agent drafts **both FR + EN now**; **all strings externalized** (no hardcoded copy); a **do-not-translate glossary** for proper nouns; single content source feeding both locale trees.
- **Art direction (the luxury lever):** a unifying **duotone/monochrome treatment + generous editorial whitespace + strict typographic rhythm** so the existing modest/mismatched photos read as one deliberate, expensive language. Curate, don't inventory.
- **Cheap wins the agent can do now:** build-time **OG/share images**, **JSON-LD structured data** (LocalBusiness / TouristAttraction / Event), responsive/lazy images, performance budget.
- **Palette:** oxblood/bronze as **accent only**, WCAG-AA contrast-checked tokens (no oxblood-on-stone body text).

## Minimal set the USER must provide (facts only they hold; everything else the agent builds now)
1. Legal entity name + registered address (Mentions légales) · real contact email + phone · postal address/directions.
2. Real logo/crest if one exists (else agent generates a monogram).
3. Pointer to existing image assets (else agent uses the live site's own marketing images as placeholders + applies duotone art direction).
4. Any real décor names / capacities / pricing that must be accurate.
5. ONLY if/when they want live versions: Resend + DNS (email), analytics account, map token, 360 captures. **None required to ship.**
