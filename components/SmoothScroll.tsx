'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Smooth scrolling premium con Lenis.
 * - Respeta prefers-reduced-motion (no inicializa si está activado).
 * - Intercepta clicks en anchors `href="#..."` para scroll suave nativo.
 * - Al cambiar de ruta (App Router) resetea el scroll al top — fix del bug
 *   donde Lenis no respetaba el reset automático de Next.js entre páginas.
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Inicialización + cleanup
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Hash links scroll suave
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    }
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Al cambiar de ruta, resetear al top.
  // Si la URL trae hash (ej. /proyectos#aguilar-2403), el handler de hash
  // del effect anterior ya se encarga del scroll a ese ancla.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback cuando Lenis no está activo (reduced-motion).
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
