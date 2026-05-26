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
      street: 'Av. del Libertador 6201',
      building: 'DOME Business Plaza',
      neighborhood: 'Núñez',
      city: 'Ciudad Autónoma de Buenos Aires',
      country: 'Argentina',
      countryCode: 'AR',
      /** Link que abre Google Maps */
      mapsUrl: 'https://maps.app.goo.gl/boiT8VfgH5svrfqb7',
      /** Para embeber Google Maps con iframe (centro aproximado) */
      lat: -34.5544912,
      lng: -58.4491121,
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
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Terrenos', href: '/terrenos' },
    { label: 'Oportunidades', href: '/oportunidades' },
    { label: 'Comunidad', href: '/comunidad' },
    { label: 'Contacto', href: '/contacto' },
  ],
  /** Tres pilares del negocio + comunidad transversal */
  pillars: [
    {
      slug: 'proyectos',
      label: 'Proyectos',
      tagline: 'Desarrollos propios en ubicaciones estratégicas de CABA.',
      href: '/proyectos',
    },
    {
      slug: 'terrenos',
      label: 'Terrenos',
      tagline: 'Inversión en tierra. Compra conjunta y banca de terrenos.',
      href: '/terrenos',
    },
    {
      slug: 'oportunidades',
      label: 'Oportunidades',
      tagline: 'Unidades en pozo curadas, respaldadas por nuestro historial.',
      href: '/oportunidades',
    },
    {
      slug: 'comunidad',
      label: 'Comunidad',
      tagline: 'Eventos, charlas y encuentros con inversores e invitados.',
      href: '/comunidad',
    },
  ] as const,
} as const;

export type Site = typeof site;
