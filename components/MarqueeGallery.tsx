'use client';

import { useState } from 'react';

type Props = {
  images: { src: string; alt: string }[];
  /** Segundos para completar un ciclo. Más bajo = más rápido. */
  speed?: number;
  /** Factor de aceleración al mantener una flecha presionada (default 5x). */
  boostFactor?: number;
  /** Altura de las imágenes — usar clases tailwind (ej. 'h-80 md:h-96'). */
  heightClass?: string;
  /** Dirección inicial del scroll. */
  reverse?: boolean;
  /** Mostrar flechas para acelerar manualmente. */
  arrows?: boolean;
  /** Color del icono/borde de las flechas (default 'ink' para fondos claros). */
  arrowsTheme?: 'ink' | 'white';
};

/**
 * Galería horizontal infinita con scroll continuo.
 *
 * - Cada imagen mantiene su aspect ratio natural (h-full, w-auto).
 * - Pausa en hover del marquee.
 * - Opcional: flechas sutiles que aceleran el marquee en su dirección
 *   mientras se mantienen presionadas (mouse/touch).
 */
export default function MarqueeGallery({
  images,
  speed = 30,
  boostFactor = 5,
  heightClass = 'h-72 md:h-80 lg:h-96',
  reverse = false,
  arrows = false,
  arrowsTheme = 'ink',
}: Props) {
  // Velocidad activa (boostada o normal) y dirección actual.
  const [activeSpeed, setActiveSpeed] = useState(speed);
  const [direction, setDirection] = useState<'forward' | 'backward'>(
    reverse ? 'backward' : 'forward',
  );
  // Mantengo el estado del "boost activo" para pausar/reanudar correctamente.
  const [boosting, setBoosting] = useState(false);

  if (images.length === 0) return null;
  const doubled = [...images, ...images];

  // Mientras se mantiene presionada una flecha, aumentar velocidad en su
  // dirección. Al soltar, vuelve a la velocidad y dirección originales.
  const boostStart = (dir: 'forward' | 'backward') => () => {
    setDirection(dir);
    setActiveSpeed(Math.max(1.5, speed / boostFactor));
    setBoosting(true);
  };
  const boostStop = () => {
    setDirection(reverse ? 'backward' : 'forward');
    setActiveSpeed(speed);
    setBoosting(false);
  };

  const arrowBase =
    arrowsTheme === 'ink'
      ? 'bg-white/40 hover:bg-white/80 text-ink border border-ink/10'
      : 'bg-ink/30 hover:bg-ink/60 text-white border border-white/20';

  return (
    <div
      className={`relative ${heightClass} overflow-hidden w-full select-none group/marquee`}
    >
      <div
        className={`flex gap-4 md:gap-5 absolute inset-y-0 left-0 will-change-transform ${
          direction === 'backward' ? 'animate-marquee-reverse' : 'animate-marquee'
        } ${
          // Pausamos en hover SOLO cuando no estamos acelerando manualmente.
          boosting ? '' : 'group-hover/marquee:[animation-play-state:paused]'
        }`}
        style={{ animationDuration: `${activeSpeed}s` }}
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
            onMouseDown={boostStart('backward')}
            onMouseUp={boostStop}
            onMouseLeave={boostStop}
            onTouchStart={boostStart('backward')}
            onTouchEnd={boostStop}
            onTouchCancel={boostStop}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="Acelerar el carrusel hacia la izquierda (mantené presionado)"
            className={`absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 ${arrowBase}`}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onMouseDown={boostStart('forward')}
            onMouseUp={boostStop}
            onMouseLeave={boostStop}
            onTouchStart={boostStart('forward')}
            onTouchEnd={boostStop}
            onTouchCancel={boostStop}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="Acelerar el carrusel hacia la derecha (mantené presionado)"
            className={`absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 rounded-full backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/marquee:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 ${arrowBase}`}
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
