/**
 * Listado de proyectos. Para agregar uno nuevo:
 *  1. Sumá la imagen principal a /public/images/projects/<slug>.png (idealmente 1600x1200 o similar)
 *  2. Sumá imágenes secundarias a /public/images/projects/<slug>-*.jpg para la galería
 *  3. Agregá un objeto al array `projects` con los datos
 *  4. Listo — aparece en home, /proyectos, sitemap, JSON-LD y llms.txt automáticamente.
 */

export type ProjectStatus = 'proximamente' | 'en-curso' | 'terminado';

export type Project = {
  slug: string;
  /** Nombre corto, ej: "Dorrego" */
  name: string;
  /** Sufijo en serif, ej: "Place", "2305", "435" */
  suffix?: string;
  /** Conector corto en mayúsculas: "Triple esquina", "Esquina", "Entre" */
  locationHeadline: string;
  /** Calle / intersección (ej: "Dorrego, Arévalo y Av. Córdoba") */
  locationDetail: string;
  /** Barrio en CABA */
  neighborhood: string;
  /** Imagen hero del proyecto (relativa a /public) */
  image: string;
  /** Galería de imágenes secundarias (relativa a /public) */
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
  /** URL de la carpeta del proyecto (PDF u otro) */
  brochureUrl?: string;
  /** Hashtag o handle de Instagram del proyecto, sin @ */
  instagramHandle?: string;
};

export const projects: Project[] = [
  {
    slug: 'dorrego-place',
    name: 'Dorrego',
    suffix: 'Place',
    locationHeadline: 'Triple esquina',
    locationDetail: 'Dorrego, Arévalo y Av. Córdoba',
    neighborhood: 'Palermo Hollywood',
    image: '/images/block-default.jpg',
    gallery: ['/images/block-default.jpg'],
    description:
      'Triple esquina en Palermo Hollywood. Excelente accesibilidad en el polo gastronómico y cultural del barrio. Unidades de 1 y 2 ambientes con cocinas integradas.',
    units: ['1 ambiente', '2 ambientes con cocina integrada'],
    unitCount: 39,
    surface: 2200,
    commercial: true,
    commercialCount: 1,
    status: 'en-curso',
  },
  {
    slug: 'newbery-place',
    name: 'Newbery',
    suffix: 'Place',
    locationHeadline: 'Esquina',
    locationDetail: 'Newbery y Zapata',
    neighborhood: 'Colegiales',
    image: '/images/block-default.jpg',
    description:
      'Esquina única en Colegiales, a metros de Las Cañitas y Belgrano. Unidades de 1, 2 y 3 ambientes en una zona en pleno crecimiento.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 22,
    surface: 1500,
    commercial: true,
    commercialCount: 1,
    status: 'en-curso',
  },
  {
    slug: 'bonpland-2305',
    name: 'Bonpland',
    suffix: '2305',
    locationHeadline: 'Esquina',
    locationDetail: 'Bonpland y Paraguay',
    neighborhood: 'Palermo Hollywood',
    image: '/images/block-default.jpg',
    description:
      'Esquina única en Palermo Hollywood. Unidades de 1, 2 y 3 ambientes, todas al frente y con luz natural.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 28,
    surface: 1800,
    commercial: true,
    commercialCount: 2,
    status: 'en-curso',
  },
  {
    slug: 'ene-nicaragua-6078',
    name: 'ENE',
    suffix: 'Nicaragua 6078',
    locationHeadline: 'Entre',
    locationDetail: 'Dorrego y Arévalo',
    neighborhood: 'Palermo Hollywood',
    image: '/images/block-default.jpg',
    description:
      'Edificio sobre Nicaragua 6078, entre Dorrego y Arévalo. Diseño cuidado en el corazón de Palermo Hollywood.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 34,
    surface: 2400,
    commercial: true,
    commercialCount: 1,
    status: 'en-curso',
  },
  {
    slug: 'caseros-435',
    name: 'Caseros',
    suffix: '435',
    locationHeadline: 'Entre',
    locationDetail: 'Defensa y Bolivia',
    neighborhood: 'San Telmo',
    image: '/images/block-default.jpg',
    description:
      'Sobre el icónico Boulevard Caseros, con acceso al polo cultural emergente de San Telmo. Unidades de 1 y 2 ambientes.',
    units: ['1 ambiente', '2 ambientes'],
    unitCount: 18,
    surface: 1300,
    commercial: true,
    commercialCount: 1,
    status: 'en-curso',
  },
  {
    slug: 'aguilar-2403',
    name: 'Aguilar',
    suffix: '2403',
    locationHeadline: 'Esquina',
    locationDetail: 'Aguilar y Cabildo',
    neighborhood: 'Colegiales / Belgrano',
    image: '/images/block-default.jpg',
    description:
      'Esquina sobre el límite Palermo–Belgrano. Ubicación premium con accesibilidad a Av. Cabildo.',
    units: ['1 ambiente', '2 ambientes', '3 ambientes'],
    unitCount: 30,
    surface: 2000,
    commercial: true,
    commercialCount: 2,
    status: 'en-curso',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
