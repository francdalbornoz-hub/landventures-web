/**
 * Oportunidades de pozo (unidades curadas en proyectos de terceros).
 *
 * IMPORTANTE — privacidad:
 * - NO incluir direcciones exactas, nombres de desarrolladores ni renders identificables.
 * - Formato genérico: tipología + barrio + precio + condiciones.
 * - La ficha completa con dirección, plano y desarrollador se envía a interesados por canal privado (WhatsApp / email).
 * - Mostrar máximo 3-4 oportunidades activas por vez.
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
  /** Trimestre tentativo de entrega: "Q3 2026" */
  entrega: string;
  financiacion: boolean;
  /** Aparece destacada en home/listing */
  destacado?: boolean;
  /** Si false, no se renderiza públicamente */
  activo: boolean;
};

export const opportunities: Opportunity[] = [
  {
    id: 'op-001',
    tipologia: '2 ambientes',
    ambientes: 2,
    barrio: 'Palermo',
    precio: 130000,
    precioM2: 2600,
    m2: 50,
    formaPago: 'Contado / Cuotas',
    entrega: 'Q3 2026',
    financiacion: true,
    destacado: true,
    activo: true,
  },
  {
    id: 'op-002',
    tipologia: '1 ambiente',
    ambientes: 1,
    barrio: 'Belgrano',
    precio: 82000,
    precioM2: 2620,
    m2: 31,
    formaPago: 'Contado',
    entrega: 'Q4 2026',
    financiacion: false,
    activo: true,
  },
  {
    id: 'op-003',
    tipologia: '3 ambientes',
    ambientes: 3,
    barrio: 'Colegiales',
    precio: 195000,
    precioM2: 2500,
    m2: 78,
    formaPago: 'Contado / Cuotas',
    entrega: 'Q1 2027',
    financiacion: true,
    destacado: true,
    activo: true,
  },
  {
    id: 'op-004',
    tipologia: '2 ambientes',
    ambientes: 2,
    barrio: 'Villa Urquiza',
    precio: 108000,
    precioM2: 2400,
    m2: 45,
    formaPago: 'Contado',
    entrega: 'Q2 2026',
    financiacion: false,
    activo: true,
  },
];

/** Referencia de precios por barrio — sirve como contexto en la vista. */
export const priceReference: { barrio: string; precioM2: number }[] = [
  { barrio: 'Belgrano', precioM2: 2600 },
  { barrio: 'Palermo', precioM2: 2730 },
  { barrio: 'Núñez', precioM2: 2500 },
  { barrio: 'Villa Urquiza', precioM2: 2400 },
  { barrio: 'Saavedra', precioM2: 2480 },
  { barrio: 'Colegiales', precioM2: 2520 },
  { barrio: 'Palermo Soho', precioM2: 2800 },
  { barrio: 'Chacarita', precioM2: 2450 },
  { barrio: 'Recoleta', precioM2: 3100 },
];
