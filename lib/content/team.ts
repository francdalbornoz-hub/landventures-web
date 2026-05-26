/**
 * Equipo de Land Ventures. Placeholder — confirmar qué miembros se muestran y si llevan fotos.
 * Para agregar foto: poné el archivo en /public/images/team/<slug>.jpg y referenciá en `photo`.
 */
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** Bio corta (1-2 oraciones) */
  bio?: string;
  /** Imagen relativa a /public, ej: '/images/team/lionel.jpg' */
  photo?: string;
};

export const team: TeamMember[] = [
  {
    slug: 'lionel',
    name: 'Lionel',
    role: 'Estrategia',
    bio: 'Define la dirección de los proyectos, banca de tierras y oportunidades de inversión.',
    photo: '/images/Team/Lionel.png',
  },
  {
    slug: 'federico',
    name: 'Federico',
    role: 'Comercialización',
    bio: 'A cargo de la relación con inversores y la curaduría de oportunidades.',
    photo: '/images/Team/Federico.png',
  },
  {
    slug: 'damian',
    name: 'Damián',
    role: 'Operaciones',
    bio: 'Coordina el ciclo de vida de cada operación: due diligence, ejecución y cierre.',
  },
];
