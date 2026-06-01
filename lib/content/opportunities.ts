/**
 * Oportunidades de pozo (unidades curadas en proyectos de terceros).
 *
 * IMPORTANTE — privacidad:
 * - NO incluir direcciones exactas, nombres de desarrolladores ni renders identificables.
 * - NO incluir número de unidad ni piso (eso va en la ficha privada).
 * - Formato público: tipología + barrio + precio + condiciones + entrega.
 * - La ficha completa con dirección, plano y desarrollador se envía a interesados por
 *   canal privado (WhatsApp / email).
 *
 * El filtro de barrios se genera dinámicamente desde estas entradas.
 */

export type FormaPago = 'Contado' | 'Contado / Cuotas' | 'Cuotas';

export type Opportunity = {
  /** Identificador para tracking interno */
  id: string;
  /** Tipología visible: "1 ambiente", "2 ambientes", etc. */
  tipologia: string;
  ambientes: number;
  barrio: string;
  /** Precio total en USD */
  precio: number;
  /** Precio por m² en USD */
  precioM2: number;
  /** Metros cuadrados totales */
  m2: number;
  formaPago: FormaPago;
  /** Entrega tentativa: "Mayo 2028" */
  entrega: string;
  financiacion: boolean;
  /** Aparece destacada en home/listing */
  destacado?: boolean;
  /** Si false, no se renderiza públicamente */
  activo: boolean;
};

/** Helper para generar la string de tipología desde ambientes. */
function tipologia(ambientes: number): string {
  return ambientes === 1 ? '1 ambiente' : `${ambientes} ambientes`;
}

export const opportunities: Opportunity[] = [
  {
    id: 'op-001',
    tipologia: tipologia(2),
    ambientes: 2,
    barrio: 'Belgrano',
    precio: 146302,
    precioM2: 2600,
    m2: 56,
    formaPago: 'Contado / Cuotas',
    entrega: 'Mayo 2028',
    financiacion: true,
    activo: true,
  },
  {
    id: 'op-002',
    tipologia: tipologia(1),
    ambientes: 1,
    barrio: 'Belgrano',
    precio: 98709,
    precioM2: 2720,
    m2: 36,
    formaPago: 'Contado / Cuotas',
    entrega: 'Mayo 2028',
    financiacion: true,
    activo: true,
  },
  {
    id: 'op-003',
    tipologia: tipologia(4),
    ambientes: 4,
    barrio: 'Belgrano',
    precio: 335650,
    precioM2: 2450,
    m2: 137,
    formaPago: 'Contado / Cuotas',
    entrega: 'Junio 2028',
    financiacion: true,
    destacado: true,
    activo: true,
  },
  {
    id: 'op-004',
    tipologia: tipologia(2),
    ambientes: 2,
    barrio: 'Belgrano',
    precio: 134750,
    precioM2: 2450,
    m2: 55,
    formaPago: 'Contado / Cuotas',
    entrega: 'Junio 2028',
    financiacion: true,
    activo: true,
  },
  {
    id: 'op-005',
    tipologia: tipologia(2),
    ambientes: 2,
    barrio: 'Colegiales',
    precio: 147300,
    precioM2: 3000,
    m2: 49,
    formaPago: 'Contado / Cuotas',
    entrega: 'Diciembre 2026',
    financiacion: true,
    activo: true,
  },
  {
    id: 'op-006',
    tipologia: tipologia(2),
    ambientes: 2,
    barrio: 'Palermo Hollywood',
    precio: 224000,
    precioM2: 3200,
    m2: 70,
    formaPago: 'Contado / Cuotas',
    entrega: 'Junio 2026',
    financiacion: true,
    destacado: true,
    activo: true,
  },
  {
    id: 'op-007',
    tipologia: tipologia(1),
    ambientes: 1,
    barrio: 'San Telmo',
    precio: 92500,
    precioM2: 2500,
    m2: 37,
    formaPago: 'Contado / Cuotas',
    entrega: 'Diciembre 2028',
    financiacion: true,
    activo: true,
  },
  {
    id: 'op-008',
    tipologia: tipologia(2),
    ambientes: 2,
    barrio: 'San Telmo',
    precio: 157500,
    precioM2: 2500,
    m2: 63,
    formaPago: 'Contado / Cuotas',
    entrega: 'Diciembre 2028',
    financiacion: true,
    activo: true,
  },
  {
    id: 'op-009',
    tipologia: tipologia(2),
    ambientes: 2,
    barrio: 'Colegiales',
    precio: 156000,
    precioM2: 3000,
    m2: 52,
    formaPago: 'Contado / Cuotas',
    entrega: 'Marzo 2027',
    financiacion: true,
    activo: true,
  },
  {
    id: 'op-010',
    tipologia: tipologia(3),
    ambientes: 3,
    barrio: 'Colegiales',
    precio: 258960,
    precioM2: 3261,
    m2: 79,
    formaPago: 'Contado / Cuotas',
    entrega: 'Marzo 2027',
    financiacion: true,
    destacado: true,
    activo: true,
  },
];

/** Referencia interna de precios por barrio. No se muestra públicamente. */
export const priceReference: { barrio: string; precioM2: number }[] = [
  { barrio: 'Belgrano', precioM2: 2600 },
  { barrio: 'Palermo Hollywood', precioM2: 3200 },
  { barrio: 'Colegiales', precioM2: 3000 },
  { barrio: 'San Telmo', precioM2: 2500 },
];
