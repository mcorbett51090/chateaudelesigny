# Panel B (sonnet) — Design + Build Plan
Stack: Astro 4.x (SSR hybrid, Netlify adapter) + **Storyblok** (visual editor CMS) + **Netlify** (Edge Functions) + Resend + Turnstile. PhotoSwipe galleries, **Mapbox GL** custom style, **Pannellum** self-hosted 360, Cloudinary video, **Plausible** analytics, GSAP+ScrollTrigger, **vanilla CSS custom properties (no Tailwind)**.

## Key positions
- IA: /[locale]/ folder routing (fr default + en), 10 pages: home, mariage, cinema, photo, decors(+[slug]), histoire, presse, partenaires, contact. Merges events→mariage; promotes histoire/presse/partenaires to own pages.
- Design language: "Private library, not hotel lobby" (Condé Nast Traveller × French architectural survey). Palette: parchment #F7F4F0 / vellum #E8E0D3 / sous-bois #2D2A1E footer / **bronze #8B6B3D CTA (NO gold)** / ivy #4A5240. Type: **Cormorant SC** display + **Source Serif 4** body + **DM Sans** UI (all free Google Fonts; explicitly anti-Playfair). Motion: clip-path horizontal wipe (page-turn), --ease-film-dissolve, GSAP ScrollTrigger.
- **Signature = "Décor Cartography"**: a commissioned hand-survey-style SVG floor plan of the château; hover reveals room name+thumbnail; click → /decors/[slug]. Placeholder rectangle-grid until illustration arrives.
- Inquiry funnel = React island (client:load), 5 steps (stream→date→details→contact→confirm), Nanostores state, custom DatePicker, Netlify Edge Function → Turnstile → Resend (admin + localized guest email), rate-limit 10/IP/hr.
- 7 phases over 50 days: P0 foundation/tokens/schema/commission-illustration → P1 design system+homepage → P2 service pages (parallel) → P3 décors+360 → P4 funnel+email → P5 editorial pages → P6 CMS wiring+i18n+training → P7 QA/perf/launch+DNS cutover.
- Critical path: tokens→BaseLayout→homepage→Gallery→**décors (blocked by illustration)**→funnel→i18n→QA→launch. Illustration = 0 float.
- Alternatives: WordPress+WPML+Elementor (max maintainability, min distinctiveness); Next.js+Sanity+Vercel (if booking/payments/portal added later); Framer (sub-4wk no-code, loses SEO/forms/360).
- Top risks: no cinematic source video; no 360 equirectangular images; illustration blocks P3; fast-in-dev/slow-in-prod; owner never edits CMS → stale. Each pre-empted.
- Confidence 0.82.

## Panel B explicit divergences (vs predicted Panel A)
1. Vanilla CSS over Tailwind (design artifact, not dev scaffold).
2. **Storyblok visual editor over Sveltia/Decap** — non-technical owners won't use Git CMS (decisive).
3. **Cartography SVG map over filterable grid** — distinctiveness, but illustration dependency.
4. Plausible over GA4 (no consent banner on a luxury hero).
5. Cormorant SC + Source Serif 4 over Playfair+Lora (anti-overexposure).
