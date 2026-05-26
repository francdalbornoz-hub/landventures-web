'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  /** Valor final del contador. */
  target: number;
  /** Duración de la animación en ms. */
  duration?: number;
  /** Decimales a mostrar (ej. 1 para 29.8). */
  decimals?: number;
  /** Texto antes del número (ej. "+" o "+USD "). */
  prefix?: string;
  /** Texto después del número (ej. "M" o "%"). */
  suffix?: string;
  /** Separador decimal (",": español; ".": inglés). */
  decimalSeparator?: string;
  /** Clase para el <span> resultante. */
  className?: string;
};

/**
 * Contador animado que arranca cuando el elemento entra al viewport.
 * Usa requestAnimationFrame + easing cubic out.
 * Respeta prefers-reduced-motion (muestra el valor final directamente).
 */
export default function CountUp({
  target,
  duration = 900,
  decimals = 0,
  prefix = '',
  suffix = '',
  decimalSeparator = ',',
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - startTime) / duration);
              const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
              setValue(target * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(target);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  // Formato con decimales y separador
  const fixed = value.toFixed(decimals);
  const display = decimals > 0 ? fixed.replace('.', decimalSeparator) : fixed;

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
