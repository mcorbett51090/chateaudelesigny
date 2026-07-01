# G5 — Red-team (repo-verified failure modes)
HIGH: (1) contact.astro success UI fires unconditionally (no response.ok check) → silent lead loss;
(2) Web3Forms contradicts the form's own "never shared with third parties" consent copy + confidentialite.astro;
(3) no check-todos guard exists — site.legal.* are literal "TODO:" strings that could leak into schema.
MED: (4) DomaineIndex filter state is a private closure — setting dataset won't re-run apply(); need a
document-level CustomEvent('domaine:filter'); verify visible COUNT changes. (7) BaseLayout set:html JSON-LD
lacks </script> escaping → editorial free-text (FAQ/reviews) can break the head; escape with
.replace(/</g,'\\u003c'). (8) i18n key-parity unenforced (UIKey=keyof ui.fr) → missing en key renders FR on
EN page; add both locales for every key. (9) BaseLayout hardcodes TouristAttraction JSON-LD — upgrade must
REPLACE it (single @graph, shared @id), not sit beside it. (5,6) pdfkit brochure font/flush issues.
LOW: (10) prebuild PDF never exists in dev.

## Applied to the re-scoped STATIC core (blockers folded into implementation):
- Keep mailto default (privacy policy stays true; Web3Forms deferred) → #1/#2 avoided; still fix the
  dual-fire so the OPTIONAL endpoint path is correct (POST xor mailto, gate success on response.ok).
- schema.ts: single @graph replacing BaseLayout's inline TouristAttraction (#9); escape </script> (#7);
  never read site.legal.* / strip any "TODO:" value (#3). No aggregateRating (critic CE-5).
- Map: add CustomEvent('domaine:filter') contract in DomaineIndex; dispatch from DomaineSchematic;
  verify count changes (#4). Keyboard + JS-off safe.
- i18n: add every new key in BOTH fr and en (#8).
