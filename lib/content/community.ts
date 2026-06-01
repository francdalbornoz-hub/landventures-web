/**
 * Eventos y actividades de comunidad. Editá libremente.
 * Para mostrar foto: poné el archivo en /public/images/Eventos/<archivo> y referenciá en `cover`.
 *
 * NOTA: las fechas no se muestran en la web (decisión de Diego 2026-05-27).
 * Se mantienen en el código para ordenamiento interno y SEO/sitemap.
 */
export type EventStatus = 'proximo' | 'pasado';

export type CommunityEvent = {
  slug: string;
  title: string;
  /** Fecha ISO YYYY-MM-DD (para ordenamiento interno, no se muestra) */
  date: string;
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
    location: 'Buenos Aires',
    description: 'Una mirada sobre la coyuntura económica y política del país.',
    status: 'pasado',
    guest: 'Esteban Trebucq',
    guestRole: 'Periodista',
    cover: '/images/Eventos/trebucq.jpeg',
  },
  {
    slug: 'conversacion-ruckauf',
    title: 'Conversación con Carlos Ruckauf',
    date: '2026-04-15',
    location: 'Buenos Aires',
    description:
      'El escenario político y económico tras las elecciones, y cómo puede influir en las oportunidades de inversión de los próximos meses.',
    status: 'pasado',
    guest: 'Carlos Ruckauf',
    guestRole: 'Ex-Vicepresidente',
    cover: '/images/Eventos/ruckauf.jpg',
  },
  {
    slug: 'proximo-encuentro',
    title: 'Próximo encuentro',
    date: '2026-07-01',
    description: 'Estamos preparando el próximo encuentro. Sumate a la comunidad por WhatsApp o seguinos en Instagram.',
    status: 'proximo',
  },
];
