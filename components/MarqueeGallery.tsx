'use client';

import Image from 'next/image';

type Props = {
  images: { src: string; alt: string }[];
  /** Segundos para completar un ciclo completo. Más alto = más lento. */
  speed?: number;
  /** Altura de las imágenes — usar clases tailwind. */
  heightClass?: string;
  /** Dirección del scroll */
  reverse?: boolean;
  /** Cantidad aproximada de imágenes visibles a la vez en desktop. */
  visibleDesktop?: number;
  /** Cantidad aproximada de imágenes visibles a la vez en mobile. */
  visibleMobile?: number;
};

/**
 * Galería de imágenes que se desplaza horizontalmente en loop infinito.
 * Usada en el bloque Comunidad del home para mostrar muchas fotos y dar
 * sensación de movimiento continuo. Las imágenes se duplican para que el
 * loop sea seamless (no se nota el salto).
 *
 * No tiene controles — es decorativa. Pausa en hover para que el usuario
 * pueda apreciar una imagen.
 */
export default function MarqueeGallery({
  images,
  speed = 50,
  heightClass = 'h-56 md:h-72 lg:h-80',
  reverse = false,
  visibleDesktop = 3,
  visibleMobile = 1.2,
}: Props) {
  if (images.length === 0) return null;
  // Duplicamos para crear el loop infinito sin salto visible.
  const doubled = [...images, ...images];

  // El ancho de cada slide se calcula como % del viewport para garantizar
  // que entren exactamente `visibleDesktop`/`visibleMobile` por vista.
  const widthMobile = `calc((100vw - 2rem) / ${visibleMobile})`;
  const widthDesktop = `calc((100vw - 6rem) / ${visibleDesktop})`;

  return (
    <div className={`relative ${heightClass} overflow-hidden w-full select-none`} aria-hidden>
      <div
        className={`flex gap-4 md:gap-5 absolute inset-y-0 left-0 will-change-transform ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="relative flex-shrink-0 h-full overflow-hidden bg-ink-deep"
            style={{
              width: widthMobile,
              ['--w-md' as string]: widthDesktop,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:768px) 33vw, 80vw"
              className="object-cover"
              priority={i < images.length}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          div[style*="--w-md"] {
            width: var(--w-md) !important;
          }
        }
      `}</style>
    </div>
  );
}
