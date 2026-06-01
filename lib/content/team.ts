/**
 * Equipo de Land Ventures.
 * Para agregar foto: poné el archivo en /public/images/Team/<Nombre>.png
 * y referencialo en `photo`.
 * Si no hay bio, el componente sólo muestra nombre + rol.
 */
export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  /** Bio corta (opcional, 1-2 oraciones) */
  bio?: string;
  /** Imagen relativa a /public, ej: '/images/Team/Lionel.png' */
  photo?: string;
};

export const team: TeamMember[] = [
  {
    slug: 'fede',
    name: 'Fede',
    role: 'Socio Director',
    photo: '/images/Team/Federico.png',
  },
  {
    slug: 'lionel',
    name: 'Lionel',
    role: 'Socio Director',
    photo: '/images/Team/Lionel.png',
  },
  {
    slug: 'damian',
    name: 'Damián',
    role: 'Director Comercial',
  },
  {
    slug: 'diego',
    name: 'Diego',
    role: 'Director de Operaciones',
    photo: '/images/Team/Diego.png',
  },
  {
    slug: 'nico',
    name: 'Nico',
    role: 'Administración',
  },
];
