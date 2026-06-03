'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type CarouselImage = { src: string; alt: string };

type Props = {
  images: CarouselImage[];
  /** Intervalo del autoplay en ms (4000 = 4s) */
  interval?: number;
  /** Aspect ratio de Tailwind (ej. 'aspect-[16/9]') */
  aspectClass?: string;
  /** sizes para next/image */
  sizes?: string;
  /** Borrar el redondeo si no se quiere */
  rounded?: boolean;
};

/**
 * Carousel con cross-fade entre imágenes + controles laterales + dots inferiores.
 * Autoplay configurable, pausa en hover, swipe en mobile.
 * Respeta prefers-reduced-motion (no autoplay).
 */
export default function Carousel({
  images,
  interval = 4500,
  aspectClass = 'aspect-[16/9]',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  rounded = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused || images.length < 2) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearTimeout(t);
  }, [index, paused, images.length, interval]);

  if (images.length === 0) return null;

  const goNext = () => setIndex((i) => (i + 1) % images.length);
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? goNext : goPrev)();
    touchStartX.current = null;
  }

  return (
    <div
      className={`relative ${aspectClass} overflow-hidden bg-ink-deep group ${rounded ? 'rounded-md' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((img, i) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-1000 ease-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
          priority={i === 0}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-black/70 hover:-translate-x-0.5 z-10"
            aria-label="Imagen anterior"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/45 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-black/70 hover:translate-x-0.5 z-10"
            aria-label="Imagen siguiente"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
