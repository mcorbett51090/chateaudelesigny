/**
 * features.ts — central registry for optional, config/asset-gated features.
 *
 * The rule enforced everywhere that reads this: an EMPTY value means the feature
 * stays HIDDEN (never an empty "coming soon" shell). Secrets/tokens come from
 * build-time env vars (PUBLIC_* so client scripts can read them); owner-supplied
 * URLs and content live here as literals to fill in — no code change to activate,
 * just paste the value and rebuild.
 *
 * IMPORTANT: enabling any third-party feature below changes the site's data flow.
 * `confidentialite.astro` (the privacy policy) already describes each of these as
 * a named processor with a conditional ("if/when used") — so turning one on does
 * NOT falsify the published policy. Keep that page in sync if you add a processor.
 */
const env = import.meta.env as Record<string, string | undefined>;
const first = (...vals: (string | undefined)[]) => vals.find((v) => v && v.length > 0) ?? '';

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

export const features = {
  // --- Serverless enquiry delivery -----------------------------------------
  // Web3Forms access key (works on any static host). Empty → mailto fallback.
  web3formsKey: first(env.PUBLIC_WEB3FORMS_KEY),
  // Or a custom endpoint (e.g. a Cloudflare Pages Function). Empty → unused.
  inquiryEndpoint: first(env.PUBLIC_INQUIRY_ENDPOINT),

  // --- Cookieless analytics (no consent banner needed) ---------------------
  cloudflareBeacon: first(env.PUBLIC_CF_BEACON), // Cloudflare Web Analytics token
  plausibleDomain: first(env.PUBLIC_PLAUSIBLE_DOMAIN), // Plausible data-domain

  // --- Newsletter (Brevo, EU) ----------------------------------------------
  newsletterUrl: first(env.PUBLIC_NEWSLETTER_URL), // Brevo hosted form action URL

  // --- Gift vouchers — Stripe Payment Links (hosted, PCI-free) -------------
  vouchers: {
    stay: first(env.PUBLIC_VOUCHER_STAY_URL), // Stripe Payment Link for the overnight stay
    shop: first(env.PUBLIC_VOUCHER_SHOP_URL), // Stripe Payment Link for a shop voucher
  },

  // --- Reviews (real data ONLY — never fabricated) -------------------------
  // Fill ratingValue/reviewCount from the actual platform; leave 0 to render nothing.
  reviews: {
    ratingValue: 0,
    reviewCount: 0,
    url: '', // link to Google/Mariages.net profile
    items: [] as Review[],
  },

  // --- 360 virtual tour (Kuula/Panoee embed URL) — consent-gated ----------
  tour360Url: first(env.PUBLIC_TOUR360_URL),

  // --- Before/after restoration slider (owner rights-cleared image keys) ---
  beforeAfter: [] as BeforeAfterPair[],

  // --- Video / drone hero (self-hosted mp4 in public/, or file URL) --------
  heroVideo: first(env.PUBLIC_HERO_VIDEO), // e.g. '/media/hero.mp4' (routed via withBase)
} as const;

/** True when at least one real review exists (gate for stars + AggregateRating). */
export const hasReviews = features.reviews.reviewCount > 0 && features.reviews.ratingValue > 0;
