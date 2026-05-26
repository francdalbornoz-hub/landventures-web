/**
 * Contenido global del sitio — editá aquí para cambiar textos, contacto, redes.
 * Todo lo que está acá se refleja en SEO, JSON-LD, header, footer, etc.
 */

export const site = {
  name: 'Land Ventures',
  legalName: 'Land Ventures',
  url: 'https://landventures.com.ar',
  locale: 'es-AR',
  description:
    'Desarrolladora inmobiliaria en Buenos Aires. Identificamos oportunidades estratégicas y desarrollamos proyectos inmobiliarios modernos y diferenciales.',
  shortDescription:
    'Identificamos oportunidades estratégicas y desarrollamos proyectos inmobiliarios modernos y diferenciales.',
  tagline: {
    line1: 'Identificamos oportunidades',
    highlight1: 'estratégicas',
    line2: 'y desarrollamos en ellas',
    line3: 'proyectos inmobiliarios',
    highlight2: 'modernos y diferenciales',
  },
  contact: {
    email: 'info@landventures.com.ar',
    phone: '+54 9 11 5163-6153',
    phoneRaw: '+5491151636153',
    whatsapp: '5491151636153',
    address: {
      city: 'Buenos Aires',
      country: 'Argentina',
      countryCode: 'AR',
    },
  },
  social: {
    instagram: 'https://www.instagram.com/landventures.ar/',
    instagramHandle: '@landventures.ar',
  },
  brand: {
    primary: '#e09900',
    coral: '#e25a3c',
    ink: '#111111',
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Invertí con nosotros', href: '/inverti-con-nosotros' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ],
} as const;

export type Site = typeof site;
