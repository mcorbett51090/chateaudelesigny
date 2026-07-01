# G0 — Scope / Château de Lésigny venue-site enhancements

**Slug:** lesigny-venue-enhancements · **Depth:** standard · **Models:** A=opus, B=sonnet
**Owner:** Matt (mcorbett51090) · **Date:** 2026-07-01

## Scoped intent
Do a wide, sourced survey of high-end wedding-venue websites (especially French châteaux and
comparable luxury estates), identify what the Château de Lésigny V1 site is missing or could
enhance, and **implement the full recommended set** of features that (a) add value for the owners
(leads, conversion, revenue, ops, discoverability) and (b) give visitors unique/memorable
experiences. Both dimensions weighted for **maximum value** (per Matt).

## Decisions locked at G0 (from AskUserQuestion)
- **Architecture:** lightweight **serverless allowed** now (Cloudflare Pages Functions / form
  services / embeddable widgets). Must degrade gracefully and stay host-agnostic where possible.
- **Value emphasis:** **both** owner-value and unique visitor features, max value.
- **Build scope:** implement the **full recommended set** this session.

## Current site (baseline, confirmed in-session this session)
Astro 5 static, bilingual FR/EN, token-driven. Pages: home, le-domaine (filterable décors +
SVG estate plan), mariages, entreprise (new), tournages, photographes, sejour (new), histoire,
presse, social, boutique (new), partenaires (new), contact (mailto/clipboard funnel), legal.
Features: PhotoSwipe galleries, awards, capacities, downloadable location-pack PDF, reveal anims.

## Out of scope
- Full headless CMS migration or rebuild off Astro.
- Real payment processing / PCI handling (deposits) — may be *stubbed*/routed to Shopify or a
  hosted checkout, not built in-house.
- Fabricated content (fake testimonials, invented prices) — features ship as populated frames
  with real data where available, otherwise honest empty-states.
- Non-FR/EN locales.

## Success signal
A merged, green build adding a coherent set of owner-value + visitor-facing features, each
grounded in the competitive research, working in both locales, with serverless pieces
degrading gracefully when unconfigured.
