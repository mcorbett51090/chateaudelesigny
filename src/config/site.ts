/**
 * Single source of truth for user-held facts.
 * Values marked `TODO:` are legally required (Mentions légales) but are NOT public
 * on the current site — only the owner holds them. A build-time check (see
 * scripts/check-todos) should flag any remaining TODO before go-live.
 * Everything else was extracted from the live site (2026-06-30).
 */
export const site = {
  name: 'Château de Lésigny',
  tagline: {
    fr: 'Un domaine privé du XVIᵉ siècle aux portes de Paris',
    en: 'A privatized 16th-century estate at the gates of Paris',
  },
  founded: 1508,
  estate: { hectares: 54, acres: 130, decors: 70 },

  contact: {
    email: 'contact@chateaudelesigny.com',
    emailAffiliations: 'thebeauchateau@gmail.com',
    phoneEvents: '+33 6 64 08 43 59',
    phoneCinema: '+33 6 47 30 62 44',
    manager: 'Daphne Reckert',
  },

  address: {
    street: 'Allée du Château',
    postalCode: '77150',
    city: 'Lésigny',
    region: 'Île-de-France',
    country: 'France',
    countryCode: 'FR',
    // Verified from the owner's Google Maps pin (2026-06-30).
    lat: 48.7433572,
    lng: 2.614141,
    fromParisKm: 24,
    googleMapsUrl: 'https://maps.app.goo.gl/XKZkqFJ1QeZtA9NG9',
  },

  social: {
    instagram: 'https://www.instagram.com/chateaudelesigny/',
    facebook: 'https://www.facebook.com/chateaudelesigny/',
    youtube: 'https://www.youtube.com/c/TheBeauChateau',
    zankyou: 'https://www.zankyou.fr/',
    mariagesnet: 'https://www.mariages.net/',
  },

  weddings: {
    capacityCocktail: 300,
    capacityDinner: 250,
    capacityCeremony: 350,
    priceFromEUR: 3350,
    eventTypes: [
      'wedding', 'birthday', 'conference', 'corporate',
      'showroom', 'baptism', 'barBatMitzvah',
    ],
    partners: ['catering', 'photography', 'decoration', 'animation', 'planning'],
  },

  cinema: {
    yearsAsLocation: 30,
    productions: 50,
  },

  awards: [2024, 2026],

  // --- Legally required (Mentions légales) ---
  // Verified against the official French registry (recherche-entreprises.api.gouv.fr,
  // corroborated by Pappers + societe.com, 2026-07-01): Magnus Events is the operating
  // SAS. `publicationDirector` is the LCEN legal default (the SAS's président) — confirm
  // with the owner. `hostingProvider` reflects the CURRENT host (GitHub Pages); update it
  // if you move to Cloudflare/Netlify. The property is owned by a separate entity —
  // SCI Résidence Château Lésigny (SIREN 329 892 335, RCS Melun) — not named here.
  legal: {
    entityName: 'Magnus Events',
    legalForm: 'SAS (Société par actions simplifiée)',
    siren: 'SIREN 903 305 498 · SIRET 903 305 498 00011 · TVA FR55 903 305 498',
    rcs: 'RCS Melun 903 305 498',
    shareCapital: '1 000 €',
    publicationDirector: 'Daphné Reckert (Présidente)',
    hostingProvider: 'GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis',
  },
} as const;

export type Site = typeof site;
