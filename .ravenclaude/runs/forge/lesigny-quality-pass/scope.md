# G0 — Scope: site-wide quality/improvement pass

Slug: lesigny-quality-pass · Depth: standard · Models: A=opus, B=sonnet · Owner: Matt · 2026-07-01

## Intent
Audit the current Château de Lésigny site (after the venue-enhancements + serverless/immersive
phases) across FOUR dimensions and FIX EVERYTHING verified:
1. Correctness & bug hunt (schema, interactive map, forms, consent-gating, self-hiding config, i18n)
2. Accessibility & performance (WCAG/keyboard/contrast/focus; LCP/CLS/JS weight/image sizing)
3. SEO & metadata (structured-data validity, titles/desc/OG, sitemap/hreflang, internal links)
4. Visual polish & UX consistency (cross-page rhythm, responsive edges, CTA clarity, nav/footer)

## Locked at G0
- Focus: all four. Action: implement all VERIFIED findings this session, commit to main.

## Out of scope
- New features/pages. Owner-only legal TODO fields. Fabricated content.

## Success
Green build; each verified finding fixed with a concrete diff; no regressions; committed to main.
