# Correctness findings (all CONFIRMED)
1 MED  contact stream=stay unsupported → sejour CTAs mislabel stay inquiries as weddings. Add 'stay' stream.
2 LOW  contact confirm copy says "mail app opened" even after successful Web3Forms POST. Distinct sent-copy.
3 LOW  schema.ts docstring overstates U+2028/2029 escaping (harmless in ld+json). Fix comment or add escaping.
4 LOW  DomaineIndex PhotoSwipe pages through hidden/filtered-out items. Skip [hidden] via pswp filter.
5 LOW  mariages heroVideo withBase() breaks an absolute http URL. Only withBase when starts with '/'.
6 LOW  contact submit button not disabled during await deliver() → double-submit possible. In-flight guard.
7 LOW  ConsentEmbed localStorage key by provider only → collision if two same-provider embeds. Key by provider+src.
VERIFIED CORRECT: JSON-LD @graph/@id, aggregateRating gating, feature hiding, form logic, map re-filter,
ConsentEmbed pre-consent, CompareSlider math, i18n parity, withBase, getStaticPaths, dual PhotoSwipe init.
