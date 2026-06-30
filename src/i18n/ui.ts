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

/** Locale of a path like /en/mariages/ → 'en'; defaults to 'fr'. */
export function localeFromPath(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0];
  return (locales as readonly string[]).includes(seg) ? (seg as Locale) : defaultLocale;
}

/** Swap the locale segment of a path, preserving the rest (path-preserving switcher). */
export function withLocale(pathname: string, target: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  if ((locales as readonly string[]).includes(parts[0])) parts[0] = target;
  else parts.unshift(target);
  return '/' + parts.join('/') + '/';
}
