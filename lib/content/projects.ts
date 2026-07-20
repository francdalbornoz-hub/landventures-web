/**
 * Listado de proyectos. Para agregar uno nuevo:
 *  1. Sumá la imagen portada a /public/images/projects/<Slug>-portada.webp
 *  2. Sumá las imágenes secundarias a /public/images/projects/<Slug>-1.webp, -2.webp, etc.
 *  3. Agregá un objeto al array `projects` con los datos
 *  4. Listo — aparece en home, /proyectos, sitemap, JSON-LD y llms.txt automáticamente.
 *
 * El campo `winbuildUrl` apunta a la página de renders/proyecto de cada desarrollo.
 *
 * IMPORTANTE: NO publicar el rol de cada proyecto (propio / co-desarrollo / canje).
 * Todas las fichas se muestran parejas en el público.
 */

export type ProjectStatus = 'proximamente' | 'en-construccion' | 'terminado';

export type Project = {
  slug: string;
  /** Nombre corto, ej: "Dorrego" */
  name: string;
  /** Sufijo, ej: "Place", "2305" */
  suffix?: string;
  /** Conector corto en mayúsculas: "Esquina", "Entre" */
  locationHeadline: string;
  /** Calle / intersección (ej: "Dorrego, Arévalo y Av. Córdoba") */
  locationDetail: string;
  /** Barrio en CABA */
  neighborhood: string;
  /** Imagen portada (preview en home/proyectos + hero del detalle) */
  image: string;
  /** Galería de imágenes secundarias */
  gallery?: string[];
  /** Descripción larga (1-2 oraciones) */
  description: string;
  /** Tipologías ofrecidas */
  units: string[];
  /** Cantidad total de unidades */
  unitCount?: number;
  /** Metros cuadrados totales */
  surface?: number;
  /** Tiene locales comerciales en PB */
  commercial: boolean;
  /** Cantidad de locales comerciales */
  commercialCount?: number;
  status: ProjectStatus;
  /** Año tentativo de finalización (opcional) */
  year?: number;
  /** URL de la página de renders del proyecto */
  winbuildUrl?: string;
  /** URL de la carpeta del proyecto (PDF) */
  brochureUrl?: string;
  /** Handle de Instagram del proyecto, sin @ */
  instagramHandle?: string;
};

export const projects: Project[] = [
  {
    slug: 'bonpland-2305',
    name: 'Bonpland',
    suffix: '2305',
    locationHeadline: 'Esquina',
    locationDetail: 'Bonpland y Paraguay',
    neighborhood: 'Palermo Hollywood',
    image: '/images/projects/Bonpland-portada.webp',
    gallery: [
      '/images/projects/Bonpland-1.webp',
      '/images/projects/Bonpland-2.webp',
      '/images/projects/Bonpland-3.webp',
    ],
    description:
      'Esquina única en Palermo Hollywood. Unidades de 1, 2 y 3 ambientes, todas al frente y con luz natural.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 28,
    surface: 1800,
    commercial: true,
    commercialCount: 2,
    status: 'terminado',
  },
  {
    slug: 'ene-nicaragua-6078',
    name: 'ENE',
    suffix: 'Nicaragua 6078',
    locationHeadline: 'Entre',
    locationDetail: 'Dorrego y Arévalo',
    neighborhood: 'Palermo Hollywood',
    image: '/images/projects/Nicaragua-portada.webp',
    gallery: [
      '/images/projects/Nicaragua-1.webp',
      '/images/projects/Nicaragua-2.webp',
      '/images/projects/Nicaragua-3.webp',
    ],
    description:
      'Edificio sobre Nicaragua 6078, entre Dorrego y Arévalo. Diseño cuidado en el corazón de Palermo Hollywood.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 34,
    surface: 2400,
    commercial: true,
    commercialCount: 1,
    status: 'terminado',
    winbuildUrl: 'https://nicaragua.landventures.com.ar/',
    brochureUrl: '/Brochures/Ene-Nicaragua.pdf',
  },
  {
    slug: 'late-san-telmo',
    name: 'LATE',
    suffix: 'San Telmo',
    locationHeadline: 'Entre',
    locationDetail: 'Defensa y Bolívar',
    neighborhood: 'San Telmo',
    image: '/images/projects/Caseros-portada.webp',
    gallery: [
      '/images/projects/Caseros-1.webp',
      '/images/projects/Caseros-2.webp',
      '/images/projects/Caseros-3.webp',
    ],
    description:
      'Sobre el icónico Boulevard Caseros, con acceso al polo cultural emergente de San Telmo. Unidades de 1 y 2 ambientes.',
    units: ['1 ambiente', '2 ambientes'],
    unitCount: 18,
    surface: 1300,
    commercial: true,
    commercialCount: 1,
    status: 'en-construccion',
    winbuildUrl: 'https://santelmo.landventures.com.ar/',
    brochureUrl: '/Brochures/LATE-San-Telmo.pdf',
  },
  {
    slug: 'newbery-place',
    name: 'Newbery',
    suffix: 'Place',
    locationHeadline: 'Esquina',
    locationDetail: 'Newbery y Zapata',
    neighborhood: 'Colegiales',
    image: '/images/projects/Newbery-portada.webp',
    gallery: [
      '/images/projects/Newbery-1.webp',
      '/images/projects/Newbery-2.webp',
      '/images/projects/Newbery-3.webp',
    ],
    description:
      'Esquina única en Colegiales, a metros de Las Cañitas y Belgrano. Unidades de 1, 2 y 3 ambientes en una zona en pleno crecimiento.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 22,
    surface: 1500,
    commercial: true,
    commercialCount: 1,
    status: 'en-construccion',
    brochureUrl: '/Brochures/Newbery-Place.pdf',
  },
  {
    slug: 'dorrego-place',
    name: 'Dorrego',
    suffix: 'Place',
    locationHeadline: 'Triple esquina',
    locationDetail: 'Dorrego, Arévalo y Av. Córdoba',
    neighborhood: 'Palermo Hollywood',
    image: '/images/projects/Dorrego-portada.webp',
    gallery: [
      '/images/projects/Dorrego-2.webp',
      '/images/projects/Dorrego-3.webp',
    ],
    description:
      'Triple esquina en Palermo Hollywood. Excelente accesibilidad en el polo gastronómico y cultural del barrio. Unidades de 1 y 2 ambientes con cocinas integradas.',
    units: ['1 ambiente', '2 ambientes con cocina integrada'],
    unitCount: 39,
    surface: 2200,
    commercial: true,
    commercialCount: 1,
    status: 'en-construccion',
    brochureUrl: '/Brochures/Dorrego-Place.pdf',
  },
  {
    slug: 'aguilar-place',
    name: 'Aguilar',
    suffix: 'Place',
    locationHeadline: 'Esquina',
    locationDetail: 'Aguilar y Cabildo',
    neighborhood: 'Colegiales / Belgrano',
    image: '/images/projects/Aguilar-portada.webp',
    gallery: [
      '/images/projects/Aguilar-2.webp',
      '/images/projects/Aguilar-3.webp',
      '/images/projects/Aguilar-4.webp',
    ],
    description:
      'Esquina sobre el límite Palermo–Belgrano. Ubicación premium con accesibilidad a Av. Cabildo.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 30,
    surface: 2000,
    commercial: true,
    commercialCount: 2,
    status: 'en-construccion',
    winbuildUrl: 'https://aguilarplace.vercel.app/',
    brochureUrl: '/Brochures/Aguilar-Place.pdf',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
