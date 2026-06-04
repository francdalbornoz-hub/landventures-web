import type { Metadata } from 'next';
import { site } from './content/site';
import type { Project } from './content/projects';
import type { CommunityEvent } from './content/community';
import type { TeamMember } from './content/team';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  /** Keywords específicas de la página, se agregan a las globales */
  keywords?: string[];
};

/** Keywords transversales del sitio. */
const GLOBAL_KEYWORDS = [
  'Land Ventures',
  'desarrolladora inmobiliaria',
  'desarrollos inmobiliarios Buenos Aires',
  'inversión inmobiliaria CABA',
  'inversión en tierra',
  'oportunidades en pozo',
  'Palermo Hollywood',
  'Belgrano',
  'Colegiales',
  'San Telmo',
  'Núñez',
];

export function buildMetadata({
  title,
  description = site.description,
  path = '/',
  // Imagen default para Open Graph (WhatsApp, Facebook, Twitter, LinkedIn).
  // Debe ser 1200x630 JPG en /public/images/og-image.jpg.
  image = '/images/og-image.jpg',
  type = 'website',
  keywords = [],
}: BuildMetadataInput = {}): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} · Desarrollos e inversión en Buenos Aires`;
  const absoluteImage = image.startsWith('http') ? image : `${site.url}${image}`;

  return {
    // `absolute` evita que el template del root layout se aplique encima.
    title: { absolute: fullTitle },
    description,
    keywords: [...keywords, ...GLOBAL_KEYWORDS],
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: absoluteImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

/**
 * Organization JSON-LD enriquecida.
 * Combina RealEstateAgent + LocalBusiness para Google Maps + búsquedas locales.
 * Incluye opening hours, hasMap, areaServed específica y knowsAbout.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': `${site.url}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/images/logo.png`,
      width: 2522,
      height: 1240,
    },
    image: `${site.url}/images/logo.png`,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    foundingDate: '2014',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.neighborhood,
      addressRegion: site.contact.address.city,
      addressCountry: site.contact.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.contact.address.lat,
      longitude: site.contact.address.lng,
    },
    hasMap: site.contact.address.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Buenos Aires' },
      { '@type': 'AdministrativeArea', name: 'CABA' },
      { '@type': 'Place', name: 'Palermo Hollywood' },
      { '@type': 'Place', name: 'Belgrano' },
      { '@type': 'Place', name: 'Colegiales' },
      { '@type': 'Place', name: 'San Telmo' },
      { '@type': 'Place', name: 'Núñez' },
    ],
    sameAs: [site.social.instagram],
    knowsAbout: [
      'Inversión inmobiliaria',
      'Desarrollo de proyectos inmobiliarios',
      'Compra conjunta de terrenos',
      'Unidades en pozo',
      'Banca de tierras',
      'Land banking',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: site.contact.phone,
      email: site.contact.email,
      availableLanguage: ['Spanish', 'es'],
      areaServed: 'AR',
    },
  };
}

/**
 * Person JSON-LD por miembro del equipo.
 * Cada uno queda vinculado a la Organization como `worksFor`,
 * lo cual ayuda a Google a entender la estructura del equipo.
 */
export function personJsonLd(member: TeamMember) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}#person-${member.slug}`,
    name: member.name,
    jobTitle: member.role,
    image: member.photo ? `${site.url}${member.photo}` : undefined,
    worksFor: { '@id': `${site.url}#organization` },
    knowsAbout: [
      'Inversión inmobiliaria',
      'Desarrollo inmobiliario',
      'Mercado inmobiliario Buenos Aires',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#website`,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@id': `${site.url}#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

/** JSON-LD para un proyecto inmobiliario individual (RealEstateListing + Residence). */
export function projectJsonLd(project: Project) {
  const fullName = `${project.name} ${project.suffix ?? ''}`.trim();
  return {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: fullName,
    description: project.description,
    image: `${site.url}${project.image}`,
    url: `${site.url}/proyectos#${project.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: project.locationDetail,
      addressLocality: project.neighborhood,
      addressRegion: 'CABA',
      addressCountry: 'AR',
    },
    numberOfRooms: project.units.length,
    numberOfUnits: project.unitCount,
    floorSize: project.surface
      ? { '@type': 'QuantitativeValue', value: project.surface, unitCode: 'MTK' }
      : undefined,
    isPartOf: { '@id': `${site.url}#organization` },
  };
}

/** Lista de proyectos para schema.org. */
export function projectListJsonLd(projects: Project[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Proyectos Land Ventures',
    description: 'Desarrollos inmobiliarios de Land Ventures en Buenos Aires.',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${site.url}/proyectos#${p.slug}`,
      name: `${p.name} ${p.suffix ?? ''}`.trim(),
    })),
  };
}

/** Evento para schema.org (charlas, encuentros de comunidad). */
export function eventJsonLd(event: CommunityEvent) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventStatus:
      event.status === 'proximo'
        ? 'https://schema.org/EventScheduled'
        : 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: event.location
      ? { '@type': 'Place', name: event.location, address: { '@type': 'PostalAddress', addressLocality: event.location } }
      : undefined,
    image: event.cover ? `${site.url}${event.cover}` : `${site.url}/images/logo.png`,
    performer: event.guest
      ? { '@type': 'Person', name: event.guest, jobTitle: event.guestRole }
      : undefined,
    organizer: { '@id': `${site.url}#organization` },
  };
}

/** Página de FAQs (para Oportunidades). */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** Página de servicio individual (para Terrenos, Oportunidades). */
export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.url}${path}`,
    provider: { '@id': `${site.url}#organization` },
    areaServed: { '@type': 'City', name: 'Buenos Aires' },
  };
}
