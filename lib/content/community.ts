/**
 * Eventos y actividades de comunidad. Editá libremente.
 * Para mostrar foto: poné el archivo en /public/images/community/<slug>.jpg y referenciá en `cover`.
 */
export type EventStatus = 'proximo' | 'pasado';

export type CommunityEvent = {
  slug: string;
  title: string;
  /** Fecha ISO YYYY-MM-DD (para ordenamiento y SEO) */
  date: string;
  /** Texto humano: "15 de Marzo, 2026" o "Próximamente" */
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
  /** URL del Instagram/Reel/post */
  externalUrl?: string;
};

export const events: CommunityEvent[] = [
  {
    slug: 'conversacion-ruckauf',
    title: 'Conversación con Carlos Ruckauf',
    date: '2026-04-15',
    dateLabel: '15 de Abril, 2026',
    location: 'Buenos Aires',
    description: 'Charla abierta con Carlos Ruckauf sobre coyuntura económica, mercado inmobiliario y oportunidades en CABA.',
    status: 'pasado',
    guest: 'Carlos Ruckauf',
  },
  {
    slug: 'asado-inversores-2026',
    title: 'Asado de inversores 2026',
    date: '2026-03-10',
    dateLabel: '10 de Marzo, 2026',
    location: 'Buenos Aires',
    description: 'Encuentro anual de la red de inversores de Land Ventures. Networking y avance de obras.',
    status: 'pasado',
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
