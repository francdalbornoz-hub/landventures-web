/**
 * Eventos y actividades de comunidad. Editá libremente.
 * Para mostrar foto: poné el archivo en /public/images/Eventos/<archivo> y referenciá en `cover`.
 */
export type EventStatus = 'proximo' | 'pasado';

export type CommunityEvent = {
  slug: string;
  title: string;
  /** Fecha ISO YYYY-MM-DD (para ordenamiento y SEO) */
  date: string;
  /** Texto humano: "16 de Septiembre, 2025" o "Próximamente" */
  dateLabel?: string;
  /** Ubicación / venue */
  location?: string;
  /** Descripción corta (1-2 oraciones) */
  description: string;
  status: EventStatus;
  /** Imagen de cover, relativa a /public */
  cover?: string;
  /** Invitado / speaker destacado */
  guest?: string;
  /** Rol del invitado, ej. "Economista", "Periodista" */
  guestRole?: string;
  /** URL del Instagram/Reel/post */
  externalUrl?: string;
};

export const events: CommunityEvent[] = [
  {
    slug: 'charla-trebucq',
    title: 'Charla con Esteban Trebucq',
    date: '2026-04-30',
    dateLabel: '30 de Abril, 2026',
    location: 'Buenos Aires',
    description: 'Charla con Esteban Trebucq sobre política y economía.',
    status: 'pasado',
    guest: 'Esteban Trebucq',
    guestRole: 'Periodista',
    cover: '/images/Eventos/trebucq.jpeg',
  },
  {
    slug: 'charla-bulat',
    title: 'Charla con Santiago Bulat',
    date: '2025-09-16',
    dateLabel: '16 de Septiembre, 2025',
    location: 'Buenos Aires',
    description: 'Charla con Santiago Bulat sobre economía.',
    status: 'pasado',
    guest: 'Santiago Bulat',
    guestRole: 'Economista',
    cover: '/images/Eventos/Bulat.webp',
  },
  {
    slug: 'conversacion-ruckauf',
    title: 'Conversación con Carlos Ruckauf',
    date: '2026-04-15',
    dateLabel: '15 de Abril, 2026',
    location: 'Buenos Aires',
    description: 'Charla abierta con Carlos Ruckauf sobre coyuntura económica, mercado inmobiliario y oportunidades en CABA.',
    status: 'pasado',
    guest: 'Carlos Ruckauf',
    guestRole: 'Ex-Vicepresidente',
    cover: '/images/Eventos/ruckauf.jpg',
  },
  {
    slug: 'proximo-encuentro',
    title: 'Próximo encuentro',
    date: '2026-07-01',
    dateLabel: 'Próximamente',
    description: 'Estamos preparando el próximo evento de comunidad. Suscribite para enterarte primero.',
    status: 'proximo',
  },
];
