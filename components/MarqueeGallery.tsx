'use client';

import { useState } from 'react';

type Props = {
  images: { src: string; alt: string }[];
  /** Segundos para completar un ciclo. Más bajo = más rápido. */
  speed?: number;
  /** Altura de las imágenes — usar clases tailwind (ej. 'h-80 md:h-96'). */
  heightClass?: string;
  /** Dirección inicial del scroll. */
  reverse?: boolean;
  /** Mostrar flechas para alternar la dirección manualmente. */
  arrows?: boolean;
  /** Color del icono/borde de las flechas (default 'ink' para fondos claros). */
  arrowsTheme?: 'ink' | 'white';
};

/**
 * Galería horizontal infinita con scroll continuo.
 *
 * - Cada imagen mantiene su aspect ratio natural (h-full, w-auto).
 * - Pausa en hover del marquee.
 * - Opcional: flechas sutiles laterales que aparecen al hover y permiten
 *   alternar la dirección del scroll.
 * - Respeta `prefers-reduced-motion` vía el `animation-play-state` del CSS.
 */
export default function MarqueeGallery({
  images,
  speed = 30,
  heightClass = 'h-72 md:h-80 lg:h-96',
  reverse = false,
  arrows = false,
  arrowsTheme = 'ink',
}: Props) {
  const [direction, setDirection] = useState<'forward' | 'backward'>(
    reverse ? 'backward' : 'forward',
  );

  if (images.length === 0) return null;
  // Duplicamos las imágenes para que el loop sea seamless.
  const doubled = [...images, ...images];

  const arrowBase =
    arrowsTheme === 'ink'
      ? 'bg-white/40 hover:bg-white/80 text-ink border border-ink/10'
      : 'bg-ink/30 hover:bg-ink/60 text-white border border-white/20';

  return (
    <div className={`relative ${heightClass} overflow-hidden w-full select-none group/marquee`}>
      <div
        className={`flex gap-4 md:gap-5 absolute inset-y-0 left-0 will-change-transform ${
          direction === 'backward' ? 'animate-marquee-reverse' : 'animate-marquee'
        } group-hover/marquee:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((img, i) => (
          <div key={`${img.src}-${i}`} className="relative h-full flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-auto object-cover block"
              loading={i < images.length ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {arrows && (
        <>
          <button
            type="button"
            onClick={() => setDirection('backward')}
            aria-label="Mover el carrusel hacia la izquierda"
            className={`absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 hover:scale-110 ${arrowBase}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setDirection('forward')}
            aria-label="Mover el carrusel hacia la derecha"
            className={`absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 hover:scale-110 ${arrowBase}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
