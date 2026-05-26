/**
 * Historia / hitos de Land Ventures. Ordená cronológicamente (viejos primero).
 * Cambialos por los reales antes de salir a producción.
 */
export type Milestone = {
  year: string;
  title: string;
  body: string;
  /** Marca este hito como "logrado" — afecta el estilo del punto en la timeline */
  done?: boolean;
};

export const timeline: Milestone[] = [
  {
    year: '2014',
    title: 'Primera adquisición',
    body: 'Compramos el primer terreno en CABA bajo el modelo de inversión conjunta.',
    done: true,
  },
  {
    year: '2017',
    title: 'Primeras compraventas',
    body: 'Cerramos las primeras operaciones de compraventa y canje con desarrolladores.',
    done: true,
  },
  {
    year: '2020',
    title: 'Desarrollo propio',
    body: 'Lanzamos los primeros proyectos de desarrollo propio en Palermo y Colegiales.',
    done: true,
  },
  {
    year: '2023',
    title: 'Pozo Club',
    body: 'Empezamos a curar oportunidades de unidades en pozo para nuestra red de inversores.',
    done: true,
  },
  {
    year: '2026',
    title: 'Plataforma unificada',
    body: 'Integramos desarrollos, terrenos y oportunidades en un único frente: Land Ventures.',
    done: true,
  },
];

/** Métricas de track record. Cada entrada define el valor numérico (animable como
 *  counter) y los strings de prefijo/sufijo. Editar con valores reales. */
export const trackRecord: Array<{
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}> = [
  { value: 30, prefix: '+', label: 'Terrenos operados' },
  { value: 15, prefix: '+', suffix: 'M', label: 'USD invertidos' },
  { value: 29.8, prefix: '~', suffix: '%', decimals: 1, label: 'Retorno promedio' },
  { value: 10, prefix: '+', label: 'Años en el mercado' },
];

/** Valores de la empresa. */
export const values = [
  {
    title: 'Curaduría',
    body: 'Cada oportunidad pasa por un proceso de due diligence antes de ofrecerse a inversores.',
  },
  {
    title: 'Track record',
    body: 'Más de 30 operaciones cerradas y +10 años en el mercado inmobiliario de CABA.',
  },
  {
    title: 'Transparencia',
    body: 'Compartimos información completa de cada operación con quienes participan.',
  },
  {
    title: 'Foco local',
    body: 'Especializados en CABA: conocemos cada barrio, cada esquina, cada oportunidad.',
  },
];
