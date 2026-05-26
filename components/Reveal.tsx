'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  /** Delay en ms para escalonar varios elementos */
  delay?: number;
  /** Tipo de animación */
  variant?: 'fade-up' | 'fade-in' | 'scale';
  className?: string;
  /** Tag a renderizar (default: div) */
  as?: 'div' | 'section' | 'article' | 'li';
};

/**
 * Reveal: muestra el contenido con un fade-up cuando entra en viewport.
 * Usa IntersectionObserver para no usar JS al scroll.
 * Respeta prefers-reduced-motion (se queda visible directamente).
 */
export default function Reveal({
  children,
  delay = 0,
  variant = 'fade-up',
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (mq.matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const base = 'transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform';
  const hidden =
    variant === 'fade-up'
      ? 'opacity-0 translate-y-6'
      : variant === 'scale'
        ? 'opacity-0 scale-[0.98]'
        : 'opacity-0';
  const shown = 'opacity-100 translate-y-0 scale-100';

  return (
    <Tag
      ref={ref as React.RefObject<never>}
      style={{ transitionDelay: visible && !reducedMotion ? `${delay}ms` : '0ms' }}
      className={`${base} ${visible || reducedMotion ? shown : hidden} ${className}`}
    >
      {children}
    </Tag>
  );
}
