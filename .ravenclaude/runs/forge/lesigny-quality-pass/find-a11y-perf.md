# A11y/Perf findings
H  9/11 pages eager LCP Photo without fetchpriority="high". Add to the one hero per page.
H  entreprise/sejour/mariages hero fill Photo lacks sizes/widths (50vw default on 100vw hero → blurry LCP). sizes=100vw widths=[800,1600,2400].
H  mariages hero video: no prefers-reduced-motion gating (2.2.2). Hide video under reduced-motion (poster shows).
M  mariages .m-plate--1/2/3 gallery sizes default 50vw but ~33vw → over-fetch. Add sizes.
M  ConsentEmbed focus lost after load. iframe.tabIndex=-1; iframe.focus().
M  ReviewsFrame .rv__src --laiton-deep on light = 3.77:1 fail. Recolor to --sang.
M  DomaineSchematic SVG g role=button AT support (SUSPECTED — keyboard OK). Leave.
M  photographes .ph-hero__plates aria-hidden but children have real alt → set alt="" (decorative).
L  FAQ summaries not wrapped in heading. Wrap question in <h3> inside <summary>.
L  contact form no <noscript> fallback. Add mailto/phone noscript.
L  --focus ring 3.13:1 thin. Darken slightly.
L  PhotoSwipe per-page bundle (architectural). Skip.
L  Nav burger aria-label hardcoded English. Add nav.menu key + t().
VERIFIED SOUND: skip link, lang, CLS (astro:assets w/h), CompareSlider/ConsentEmbed reserve space,
Newsletter label, WhatsApp, no raw --laiton text, reduced-motion sitewide (except hero video).
