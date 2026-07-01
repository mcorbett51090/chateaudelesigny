# SEO findings
H  FAQPage rich result deprecated by Google (May 2026) — harmless schema, no SERP value. Leave JSON-LD; soften intent. (no code change / optional)
M  venueNode uses per-page description for a shared @id → conflicting values for one entity. Pass fixed site.tagline.
M  productNode (boutique) missing image + priceValidUntil. Add both (images exist on page).
M  legal pages (mentions-legales, confidentialite) render visible TODO: text, indexable. noindex while site.legal has TODOs.
L  venue/lodging nodes have no image (Google doesn't require). Optional: add image (pass ogImage).
L  nav omits faq/entreprise/sejour/presse (footer covers; crawl depth 1). Optional promote faq. Skip (nav crowding).
INFO per-page OG image absent (all use default). Skip (needs assets).
INFO fr/entreprise title 61 chars, fr/boutique desc 164 chars — trim a few chars.
INFO domain-cutover: re-verify canonical/hreflang/sitemap after SITE/BASE swap. (checklist, not now)
VERIFIED CLEAN: @graph/@id stable, no dup @id, no aggregateRating/TODO leak, hreflang reciprocal, sitemap 32 urls, trailingSlash.
