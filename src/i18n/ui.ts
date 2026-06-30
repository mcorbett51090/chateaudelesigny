/**
 * Externalized UI strings (no hardcoded copy in components) + locale helpers.
 * FR is the default; both locales are drafted now in luxury-hospitality register
 * (vouvoiement in French). Proper nouns in `glossary` are NEVER translated.
 */
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

/** Proper nouns that must remain identical in every language. */
export const glossary = [
  'Château de Lésigny', 'Lésigny', 'Paris', 'La Château', 'La Ferme',
  'Île-de-France', 'Castle Impossible', 'HGTV', 'TheBeauChateau',
] as const;

export const ui = {
  fr: {
    'nav.domaine': 'Le Domaine',
    'nav.mariages': 'Mariages',
    'nav.tournages': 'Tournages',
    'nav.photographes': 'Photographes',
    'nav.histoire': 'Histoire',
    'nav.presse': 'Presse',
    'nav.social': 'Social',
    'nav.contact': 'Contact',
    'cta.inquiry': 'Demande',
    'cta.discover': 'Découvrir',
    'cta.learnMore': 'En savoir plus',
    'cta.seeDecors': 'Voir les décors',
    'cta.planVisit': 'Demander une visite',
    'lang.switch': 'English',
    'lang.label': 'Choisir la langue',
    'footer.explore': 'Explorer',
    'footer.estate': 'Le Domaine',
    'footer.contact': 'Contact',
    'footer.follow': 'Suivre',
    'footer.events': 'Événements',
    'footer.cinema': 'Cinéma',
    'footer.legal': 'Mentions légales',
    'footer.privacy': 'Confidentialité',
    'footer.sitemap': 'Plan du site',
    'footer.rights': 'Tous droits réservés',
    'skip': 'Aller au contenu',
    'stat.years': "ans d'histoire",
    'stat.decors': 'décors',
    'stat.productions': 'de productions',
    'stat.hectares': 'hectares',
    'home.hero.title': 'Un château. Trois destins.',
    'home.hero.sub': 'Mariages, tournages et séances photo dans un domaine privé de 54 hectares, à 24 km de Paris.',
    'contact.title': 'Parlons de votre projet',
    'contact.direct': 'Ou contactez-nous directement',
  },
  en: {
    'nav.domaine': 'The Estate',
    'nav.mariages': 'Weddings',
    'nav.tournages': 'Filming',
    'nav.photographes': 'Photography',
    'nav.histoire': 'History',
    'nav.presse': 'Press',
    'nav.contact': 'Contact',
    'cta.inquiry': 'Enquire',
    'cta.discover': 'Discover',
    'cta.learnMore': 'Learn more',
    'cta.seeDecors': 'See the décors',
    'cta.planVisit': 'Request a visit',
    'lang.switch': 'Français',
    'lang.label': 'Choose language',
    'footer.explore': 'Explore',
    'footer.estate': 'The Estate',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow',
    'footer.events': 'Events',
    'footer.cinema': 'Film',
    'footer.legal': 'Legal notice',
    'footer.privacy': 'Privacy',
    'footer.sitemap': 'Sitemap',
    'footer.rights': 'All rights reserved',
    'skip': 'Skip to content',
    'stat.years': 'years of history',
    'stat.decors': 'décors',
    'stat.productions': 'of productions',
    'stat.hectares': 'hectares',
    'home.hero.title': 'One château. Three destinies.',
    'home.hero.sub': 'Weddings, film productions and photo shoots across a private 54-hectare estate, 24 km from Paris.',
    'contact.title': "Let's talk about your project",
    'contact.direct': 'Or reach us directly',
  },
} as const;

export type UIKey = keyof (typeof ui)['fr'];

export function useT(locale: Locale) {
  return (key: UIKey): string => ui[locale][key] ?? ui[defaultLocale][key] ?? key;
}

/**
 * Deployment base path, e.g. '/chateaudelesigny/' on a GitHub Pages project site
 * or '/' at a domain root. Derived from `base` in astro.config.mjs; always ends in '/'.
 * Every internal link/asset must route through withBase()/localeBase() so the site
 * works unchanged whether it lives at a subpath or at the root of a custom domain.
 */
const BASE: string = import.meta.env.BASE_URL;

/** Prepend the deployment base to a root-relative path. withBase('/x.svg') → '/base/x.svg'. */
export function withBase(path: string): string {
  return BASE + path.replace(/^\//, '');
}

/** Strip the deployment base prefix, returning a leading-slash path (inverse of withBase). */
function stripBase(pathname: string): string {
  if (BASE !== '/' && pathname.startsWith(BASE)) return '/' + pathname.slice(BASE.length);
  return pathname;
}

/** Base + locale, no trailing slash. localeBase('fr') → '/base/fr'. Replaces `/${locale}`. */
export function localeBase(locale: Locale): string {
  return BASE + locale;
}

/** Locale of a path like /base/en/mariages/ → 'en'; defaults to 'fr'. Base-path aware. */
export function localeFromPath(pathname: string): Locale {
  const seg = stripBase(pathname).split('/').filter(Boolean)[0];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

/**
 * Swap the locale segment of a path, preserving the rest (path-preserving switcher).
 * Accepts a path with or without the deployment base; always returns one WITH the base.
 */
export function withLocale(pathname: string, target: Locale): string {
  const parts = stripBase(pathname).split('/').filter(Boolean);
  if ((locales as readonly string[]).includes(parts[0])) parts[0] = target;
  else parts.unshift(target);
  return withBase(parts.join('/') + '/');
}
