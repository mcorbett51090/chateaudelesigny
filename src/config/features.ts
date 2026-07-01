/**
 * features.ts — central registry for optional, config/asset-gated features.
 *
 * The rule enforced everywhere that reads this: an EMPTY value means the feature
 * stays HIDDEN (never an empty "coming soon" shell). Secrets/tokens come from
 * build-time env vars (PUBLIC_* so client scripts can read them); owner-supplied
 * URLs and content live here as literals to fill in — no code change to activate,
 * just paste the value and rebuild.
 *
 * PREVIEW/DEMO MODE — build with `PUBLIC_DEMO=1` (`npm run dev:demo` / `build:demo`)
 * to populate EVERY gated feature with realistic demo/placeholder data so you can
 * SEE them (reviews, before/after, vouchers, newsletter, 360, legal). Demo data is
 * NEVER production data: the check-todos launch gate FAILS a production build while
 * PUBLIC_DEMO is set, and the interim preview host is not indexed. Turn it off (the
 * default) and every feature reverts to its real env/owner value or stays hidden.
 *
 * IMPORTANT: enabling any real third-party feature changes the site's data flow.
 * `confidentialite.astro` (the privacy policy) describes each as a named processor
 * conditionally, so turning one on does NOT falsify the published policy.
 */
const env = import.meta.env as Record<string, string | undefined>;
const first = (...vals: (string | undefined)[]) => vals.find((v) => v && v.length > 0) ?? '';

/** Preview mode — populate gated features with demo data (never ships to production). */
export const isDemo = env.PUBLIC_DEMO === '1';

export interface Review {
  author: string;
  text: string;
  source: string; // e.g. 'Google', 'Mariages.net'
}
export interface BeforeAfterPair {
  before: string; // key in src/assets/images.ts
  after: string;
  labelFr: string;
  labelEn: string;
}
export interface LegalFields {
  entityName: string;
  legalForm: string;
  siren: string;
  rcs: string;
  shareCapital: string;
  publicationDirector: string;
  hostingProvider: string;
}

// --- Demo dataset (only used when isDemo) --------------------------------------
// Realistic placeholder content so every feature renders in a preview build.
// The review rating mirrors the Mariages.net figure surfaced by search (4.9 / 76);
// treat it as UNVERIFIED demo until the owner confirms — it is not shipped live.
const DEMO = {
  reviews: {
    ratingValue: 4.9,
    reviewCount: 76,
    url: 'https://www.mariages.net/chateau-mariage/chateau-de-lesigny--e141033',
    items: [
      { author: 'Camille & Antoine', text: 'Un cadre absolument féérique et une équipe aux petits soins du début à la fin. Nos invités en parlent encore.', source: 'Mariages.net' },
      { author: 'Sophie L.', text: 'Les décors Renaissance sont à couper le souffle. Tout était parfait pour notre grand jour, à 30 minutes de Paris.', source: 'Mariages.net' },
      { author: 'Marie & Julien', text: 'Un lieu chargé d’histoire et une organisation sans faille. Merci à toute l’équipe du domaine.', source: 'Mariages.net' },
    ] as Review[],
  },
  vouchers: {
    stay: 'https://buy.stripe.com/test_demo_stay_voucher',
    shop: 'https://buy.stripe.com/test_demo_shop_voucher',
  },
  newsletterUrl: 'https://example.sibforms.com/serve/demo-newsletter',
  tour360Url: 'https://kuula.co/share/hqZL7',
  beforeAfter: [
    { before: 'int-empty-fireplace', after: 'int-fireplace-parquet', labelFr: 'Le Salon aux Cheminées', labelEn: 'The Fireplace Salon' },
    { before: 'int-attic', after: 'int-green-room', labelFr: 'Une chambre restaurée', labelEn: 'A restored bedroom' },
  ] as BeforeAfterPair[],
  legal: {
    entityName: 'SARL Château de Lésigny — DONNÉES DE DÉMONSTRATION',
    legalForm: 'SARL',
    siren: '000 000 000 (démo)',
    rcs: 'RCS Melun 000 000 000 (démo)',
    shareCapital: '10 000 €',
    publicationDirector: 'Daphne Reckert',
    hostingProvider: 'GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. St, San Francisco, CA 94107, USA',
  } as LegalFields,
};

export const features = {
  // --- Serverless enquiry delivery (real only — a demo key would attract spam) ---
  web3formsKey: first(env.PUBLIC_WEB3FORMS_KEY),
  inquiryEndpoint: first(env.PUBLIC_INQUIRY_ENDPOINT),

  // --- Cookieless analytics (real only — needs a real account token) -------------
  cloudflareBeacon: first(env.PUBLIC_CF_BEACON),
  plausibleDomain: first(env.PUBLIC_PLAUSIBLE_DOMAIN),

  // --- Newsletter (Brevo, EU) ----------------------------------------------------
  newsletterUrl: isDemo ? DEMO.newsletterUrl : first(env.PUBLIC_NEWSLETTER_URL),

  // --- Gift vouchers — Stripe Payment Links (hosted, PCI-free) -------------------
  vouchers: {
    stay: isDemo ? DEMO.vouchers.stay : first(env.PUBLIC_VOUCHER_STAY_URL),
    shop: isDemo ? DEMO.vouchers.shop : first(env.PUBLIC_VOUCHER_SHOP_URL),
  },

  // --- Reviews (real data ONLY in production; demo figures in preview) -----------
  reviews: isDemo
    ? DEMO.reviews
    : { ratingValue: 0, reviewCount: 0, url: '', items: [] as Review[] },

  // --- 360 virtual tour (Kuula/Panoee embed URL) — consent-gated ----------------
  tour360Url: isDemo ? DEMO.tour360Url : first(env.PUBLIC_TOUR360_URL),

  // --- Before/after restoration slider (owner rights-cleared image keys) --------
  beforeAfter: isDemo ? DEMO.beforeAfter : ([] as BeforeAfterPair[]),

  // --- Video / drone hero (self-hosted mp4 in public/, or file URL) -------------
  // Left off even in demo — it needs a real video file to preview meaningfully.
  heroVideo: first(env.PUBLIC_HERO_VIDEO),

  // --- Preview flag + demo legal identity (used by the legal pages when isDemo) --
  demo: isDemo,
  demoLegal: DEMO.legal,
} as const;

/** True when at least one real review exists (gate for stars + AggregateRating). */
export const hasReviews = features.reviews.reviewCount > 0 && features.reviews.ratingValue > 0;
