/**
 * schema.ts — typed JSON-LD builders for the site's structured data.
 *
 * Design rules (enforced here so every consumer inherits them):
 *  1. ONE canonical venue entity with a stable `@id` — every page emits the same
 *     LocalBusiness+EventVenue node plus any page-specific nodes in a single
 *     `@graph`, so Google never sees duplicate/ambiguous entities.
 *  2. Never publish owner-only `TODO:` placeholders as machine-readable data
 *     (`real()` filters them) — legal fields in site.ts are still TODO.
 *  3. Never emit `aggregateRating`/`Review` without real reviews (we have none).
 *  4. `jsonLdScript()` escapes `<` so a literal `</script>` in editorial free-text
 *     (FAQ answers, product copy) can't close the tag early. The payload is parsed
 *     as JSON (not executed as JS), so no further escaping is needed.
 */
import { site } from '../config/site';
import { features, hasReviews } from '../config/features';

/** Keep a value only if it's a real string (drop owner `TODO:` placeholders). */
const real = (v: unknown): string | undefined =>
  typeof v === 'string' && v.length > 0 && !v.startsWith('TODO:') ? v : undefined;

const postalAddress = () => ({
  '@type': 'PostalAddress',
  streetAddress: site.address.street,
  postalCode: site.address.postalCode,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  addressCountry: site.address.countryCode,
});

const geo = () => ({
  '@type': 'GeoCoordinates',
  latitude: site.address.lat,
  longitude: site.address.lng,
});

/** Deployment origin+base as a stable IRI root, e.g. https://host/chateaudelesigny (no trailing slash). */
export function siteOrigin(astroSite: URL | undefined, base: string): string {
  const root = new URL(base, astroSite ?? 'https://www.chateaudelesigny.com').href;
  return root.replace(/\/$/, '');
}

/** Stable @id for the one venue entity every page's nodes reference. */
export const venueId = (origin: string) => `${origin}/#venue`;

/**
 * Canonical LocalBusiness + EventVenue node — byte-identical on every page.
 * `description` MUST be a fixed site-level string (not a per-page meta description)
 * so the one `@id` never carries conflicting values across the graph.
 */
export function venueNode(origin: string, description: string, image?: string) {
  return {
    '@type': ['LocalBusiness', 'EventVenue'],
    '@id': venueId(origin),
    name: site.name,
    description,
    url: `${origin}/`,
    ...(image ? { image } : {}),
    telephone: site.contact.phoneEvents,
    email: site.contact.email,
    foundingDate: String(site.founded),
    address: postalAddress(),
    geo: geo(),
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
    // legalName only if the owner has filled it in (else omitted, never "TODO:").
    ...(real(site.legal.entityName) ? { legalName: real(site.legal.entityName) } : {}),
    // aggregateRating/review ONLY when real reviews are entered (never fabricated).
    ...(hasReviews
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: features.reviews.ratingValue,
            reviewCount: features.reviews.reviewCount,
          },
          review: features.reviews.items.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.author },
            reviewBody: r.text,
          })),
        }
      : {}),
  };
}

/** Overnight-stay lodging (Le Colombier), tied to the venue. */
export function lodgingNode(origin: string, url: string, name: string, description: string) {
  return {
    '@type': 'LodgingBusiness',
    '@id': `${url}#lodging`,
    name,
    description,
    url,
    address: postalAddress(),
    geo: geo(),
    telephone: site.contact.phoneEvents,
    isPartOf: { '@id': venueId(origin) },
  };
}

/** A shop product with a single Offer (no fabricated ratings). */
export function productNode(opts: {
  url: string;
  name: string;
  description: string;
  priceEUR: number;
  availability?: string;
  image?: string | string[];
  priceValidUntil?: string;
}) {
  return {
    '@type': 'Product',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    ...(opts.image ? { image: opts.image } : {}),
    brand: { '@type': 'Brand', name: 'The Beau Chateau' },
    offers: {
      '@type': 'Offer',
      price: String(opts.priceEUR),
      priceCurrency: 'EUR',
      availability: opts.availability ?? 'https://schema.org/PreOrder',
      url: opts.url,
      ...(opts.priceValidUntil ? { priceValidUntil: opts.priceValidUntil } : {}),
    },
  };
}

/** FAQPage from real Q&A pairs. */
export function faqNode(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/**
 * Serialize a set of nodes to one <script type="application/ld+json"> string.
 * Escapes `<` (so a literal </script> in any value can't close the tag early)
 * and the JSON-legal-but-JS-illegal line separators U+2028 / U+2029.
 */
export function jsonLdScript(nodes: object[]): string {
  const graph = { "@context": "https://schema.org", "@graph": nodes };
  // Escape < so a literal </script> inside any string value cannot close the
  // tag early (red-team #7). ld+json is parsed as JSON, so this is sufficient.
  const json = JSON.stringify(graph).split("<").join("\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
}
