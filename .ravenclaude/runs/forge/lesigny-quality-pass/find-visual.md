# Visual/UX findings
1 HIGH  --step--2 used in 6 files but UNDEFINED in tokens.css → micro-labels ~40% oversized (LIVE on boutique/presse/partenaires). ADD --step--2.
2 HIGH  Newsletter .ft__h heading is Footer-scoped → renders as giant display heading when enabled. Move .ft__h into Newsletter.
3 MED   mariages testimonials placeholder contradicts ReviewsFrame when reviews present. Gate on !hasReviews.
4 MED   DomaineSchematic FR hint "Cliquez le château" → "Cliquez sur le château".
5 MED   sejour voucher: two --suie dark bands collide; uses raw --suie not .is-dark. Add divider/light band or is-dark.
6 MED   mariages FR straight apostrophes (13) → typographic ' for consistency.
7 MED   mariages testimonials Instagram btn--primary leaks conversion off-site → btn--ghost.
8 LOW   histoire before/after renders BELOW terminal CTA → move above closing CTA.
9 LOW   Footer Explore = 12 links single column, imbalanced. Split/trim.
10 LOW  boutique mailing eyebrow == footer newsletter title (different lists). Differentiate.
11 LOW  ui.ts EN contact.title straight apostrophe → typographic.
12 LOW  (SUSPECTED, likely no-action: zones are focusable buttons per correctness audit; hint aria-hidden ok)
13 LOW  (SUSPECTED optional: featured-weddings 8 items ragged at 3-col)
