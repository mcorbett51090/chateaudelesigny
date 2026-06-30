# Panel A (opus) — Design + Build Plan
See full text captured in FORGE run. Stack: Astro 4.x + Sveltia CMS (git-based) + Cloudflare Pages/Functions + Resend + Turnstile. PhotoSwipe galleries, MapLibre map, Kuula/Matterport 360, Astro native i18n.

## Key positions
- IA reorganized by 3 revenue streams (Mariages / Tournages / Photographes) + signature **Décor Index** (/les-decors) cataloguing 70+ décors as a "location-scout's monograph". Castle Impossible demoted nav→/presse.
- Design language: "The Location Scout's Monograph". Type: GT Sectra Display/Text + Söhne + GT Pressura Mono (free fallbacks: Fraunces/Newsreader/Instrument Sans/Geist Mono). Palette: limestone #EAE4D8 / warm-black #1C1B19 / **oxblood #6E2230 signature** / brass #A98B5D hairlines. Oxblood-over-gold = anti-cliché.
- Motion: native Astro View Transitions (film "cuts"), letterbox reveal, IntersectionObserver stagger (~1KB), GSAP only on ONE signature moment. All behind prefers-reduced-motion.
- Inquiry funnel: 3-branch (wedding/film/photo), pre-selected from context; SOFT date-check via CMS availability.json (no booking backend, no payment); Pages Function → Turnstile → branch-routed Resend + localized auto-reply.
- 8 phases: P0 assets/decisions gate → P1 scaffold+tokens → P2 content model+CMS+i18n → P3 core pages → P4 Décor Index+galleries → P5 funnel+email → P6 tour+map → P7 SEO/a11y/perf hardening → P8 content load/translation QA/handover/launch.
- Critical path P0→P1→P2→P3→P7→P8; P4/P5/P6 parallelize after P2 freeze. Hidden long-pole = Phase-0 photo/360/translation (non-code).
- Alternatives: Next.js+Sanity; Storyblok (visual WYSIWYG); Decap (conservative); Pannellum self-host; Netlify; GSAP-throughout.
- Top risks: weak photography; generic AI-template feel; machine-translated copy; CMS handover failure; perf collapse under video/360/galleries. Each pre-empted.
- Confidence 0.78. Open: Sveltia-vs-Storyblok hinges on owner GitHub-login tolerance; font budget; 360 capture method.
