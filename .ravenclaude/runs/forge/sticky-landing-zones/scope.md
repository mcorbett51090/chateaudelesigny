# G0 — Scope: sticky/magnetic landing zones (all pages)

**Depth:** micro/lean (concrete CSS pattern, not a design-fork → no divergent panels).
**Intent:** Every page opens with a full-viewport "first concept" (like Histoire); scrolling reveals
detail; the hero feels a little sticky/magnetic on scroll-down.

## Decision (chosen interpretation)
Full-viewport hero (`100svh`) + gentle **scroll-snap (`y proximity`)** with the hero as a soft snap
point → "magnetic catch" without trapping. Implemented GLOBALLY by targeting `main > section:first-of-type`
in `global.css` — zero per-page markup, no collision with in-flight page agents. Disabled under
`prefers-reduced-motion`.

## Why not sticky-pinned-reveal (content scrolls over a pinned hero)
Prettier but needs a per-page solid-bg wrapper around post-hero content → per-page edits (collision risk
with running agents) + layout-break risk across 8 differently-built heroes. Scroll-snap delivers the
"a little sticky/magnetic" ask safely in one file. Can layer the pinned-reveal later if desired.

## Refinement to apply at verification build
The global `100svh` rule hits EVERY first section, including utility pages. **Exclude the legal pages**
(`mentions-legales`, `confidentialite`) — a full-screen hero before legal text is poor UX. Contact keeps a
full-screen hero (elegant on a luxury site). Add a reset for the legal hero class once its selector is
confirmed during the build.

## Out of scope
Per-section snap throughout (would feel trappy); JS scroll-hijacking (accessibility/jank risk).
