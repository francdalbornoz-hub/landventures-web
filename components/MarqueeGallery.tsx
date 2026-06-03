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
}: Props) {
  if (images.length === 0) return null;
  // Duplicamos para crear el loop infinito sin salto visible.
  const doubled = [...images, ...images];

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
            className="relative flex-shrink-0 h-full aspect-[4/5] overflow-hidden bg-ink-deep"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width:1024px) 280px, 220px"
              className="object-cover"
              priority={i < images.length}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
