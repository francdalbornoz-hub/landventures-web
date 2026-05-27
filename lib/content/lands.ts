/**
 * Operaciones de tierra (terrenos). Track record histórico + oportunidades abiertas.
 *
 * IMPORTANTE — privacidad:
 * - NO usar direcciones exactas en `label`. Usar barrio + referencia genérica.
 *   Ejemplo: "Esquina en Belgrano", no "Cabildo y Aguilar 2403".
 * - Las coordenadas (lat/lng) son aproximadas. Mantienen el mapa visualmente coherente sin quemar la ubicación.
 * - La ficha completa con direcciones se mantiene aparte (PDF privado).
 */

export type LandStatus =
  | 'cerrado-compraventa'
  | 'cerrado-canje'
  | 'cerrado-local'
  | 'en-desarrollo'
  | 'abierto'
  | 'proximo';

export type Land = {
  /** Etiqueta corta y GENÉRICA — sin direcciones exactas */
  label: string;
  zona: string;
  status: LandStatus;
  /** Texto del popup en el mapa */
  info: string;
  /** Coords aproximadas para el marker (jitter ligero respecto al lote real) */
  lat: number;
  lng: number;
};

export const lands: Land[] = [
  // ============ CERRADOS — COMPRAVENTA ============
  { label: 'Compraventa en Núñez', zona: 'Núñez', status: 'cerrado-compraventa', info: 'Compraventa realizada', lat: -34.5527, lng: -58.4697 },
  { label: 'Compraventa en Colegiales', zona: 'Colegiales', status: 'cerrado-compraventa', info: 'Compraventa realizada', lat: -34.5708, lng: -58.4489 },
  { label: 'Compraventa en Belgrano', zona: 'Belgrano', status: 'cerrado-compraventa', info: 'Compraventa realizada', lat: -34.5601, lng: -58.4582 },
  { label: 'Compraventa en Belgrano R', zona: 'Belgrano', status: 'cerrado-compraventa', info: 'Compraventa realizada', lat: -34.5595, lng: -58.4561 },
  { label: 'Compraventa en Colegiales', zona: 'Colegiales', status: 'cerrado-compraventa', info: 'Compraventa realizada', lat: -34.5708, lng: -58.4485 },
  { label: 'Compraventa en Palermo Hollywood', zona: 'Palermo', status: 'cerrado-compraventa', info: 'Compraventa realizada', lat: -34.5832, lng: -58.4337 },

  // ============ CERRADOS — CANJE ============
  { label: 'Canje en Belgrano', zona: 'Belgrano', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5690, lng: -58.4471 },
  { label: 'Canje en Colegiales', zona: 'Colegiales', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5725, lng: -58.4449 },
  { label: 'Canje en Colegiales', zona: 'Colegiales', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5724, lng: -58.4463 },
  { label: 'Canje en Chacarita', zona: 'Chacarita', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5779, lng: -58.4609 },
  { label: 'Canje en Belgrano', zona: 'Belgrano', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5589, lng: -58.4647 },
  { label: 'Canje en Núñez', zona: 'Núñez', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5561, lng: -58.4661 },
  { label: 'Canje en Villa Crespo', zona: 'Villa Crespo', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5943, lng: -58.4456 },
  { label: 'Canje en Núñez', zona: 'Núñez', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5584, lng: -58.4670 },
  { label: 'Canje en Belgrano', zona: 'Belgrano', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5586, lng: -58.4636 },
  { label: 'Canje en Belgrano', zona: 'Belgrano', status: 'cerrado-canje', info: 'Canje finalizado', lat: -34.5567, lng: -58.4477 },

  // ============ LOCALES COMERCIALES ============
  { label: 'Local en Palermo', zona: 'Palermo', status: 'cerrado-local', info: 'Local comercial', lat: -34.5858, lng: -58.4150 },
  { label: 'Local en Colegiales', zona: 'Colegiales', status: 'cerrado-local', info: 'Local comercial', lat: -34.5621, lng: -58.4597 },
  { label: 'Local en Colegiales', zona: 'Colegiales', status: 'cerrado-local', info: 'Local comercial', lat: -34.5713, lng: -58.4482 },

  // ============ EN DESARROLLO (nuestros proyectos) ============
  { label: 'Bonpland 2305', zona: 'Palermo Hollywood', status: 'en-desarrollo', info: 'Proyecto en desarrollo', lat: -34.5786, lng: -58.4318 },
  { label: 'Dorrego Place', zona: 'Palermo Hollywood', status: 'en-desarrollo', info: 'Proyecto en desarrollo', lat: -34.5843, lng: -58.4446 },
  { label: 'ENE — Nicaragua 6078', zona: 'Palermo Hollywood', status: 'en-desarrollo', info: 'Proyecto en desarrollo', lat: -34.5780, lng: -58.4386 },
  { label: 'Newbery Place', zona: 'Colegiales', status: 'en-desarrollo', info: 'Proyecto en desarrollo', lat: -34.5732, lng: -58.4417 },
  { label: 'Caseros 435', zona: 'San Telmo', status: 'en-desarrollo', info: 'Proyecto en desarrollo', lat: -34.6265, lng: -58.3715 },
  { label: 'Aguilar 2403', zona: 'Colegiales / Belgrano', status: 'en-desarrollo', info: 'Proyecto en desarrollo', lat: -34.5690, lng: -58.4471 },

  // ============ EJEMPLO de operación abierta o próxima ============
  // Descomenta y editá para mostrar oportunidades activas en el mapa:
  // { label: 'Lote en Palermo', zona: 'Palermo', status: 'abierto', info: 'Lote disponible — consultar', lat: -34.580, lng: -58.428 },
  // { label: 'Próxima operación en Colegiales', zona: 'Colegiales', status: 'proximo', info: 'En proceso de cierre', lat: -34.573, lng: -58.450 },
];

export const landStatusLabels: Record<LandStatus, string> = {
  'cerrado-compraventa': 'Compraventa realizada',
  'cerrado-canje': 'Canje finalizado',
  'cerrado-local': 'Local comercial',
  'en-desarrollo': 'En desarrollo',
  abierto: 'Oportunidad abierta',
  proximo: 'Próximamente',
};

/** Color por estado — distintos tonos de naranja + verde abierto + violeta próximo. */
export const landStatusColors: Record<LandStatus, string> = {
  'cerrado-compraventa': '#C9502A', // terracota
  'cerrado-canje': '#E8943A', // naranja medio
  'cerrado-local': '#D4944A', // naranja claro
  'en-desarrollo': '#F0A84E', // naranja brillante
  abierto: '#4ade80', // verde — oportunidad activa
  proximo: '#a78bfa', // violeta — próximamente
};

/** Familia de íconos para los markers del mapa. Mapea a SVGs en /public/images/Icons/ */
export const landStatusIcons: Record<LandStatus, 'compraventa' | 'canje' | 'local' | 'desarrollo' | 'handshake'> = {
  'cerrado-compraventa': 'compraventa',
  'cerrado-canje': 'canje',
  'cerrado-local': 'local',
  'en-desarrollo': 'desarrollo',
  abierto: 'handshake',
  proximo: 'handshake',
};
