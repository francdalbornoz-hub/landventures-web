'use client';

type Props = {
  images: { src: string; alt: string }[];
  /** Segundos para completar un ciclo completo. Más alto = más lento. */
  speed?: number;
  /** Altura de las imágenes — usar clases tailwind (ej. 'h-80 md:h-96'). */
  heightClass?: string;
  /** Dirección del scroll */
  reverse?: boolean;
};

/**
 * Galería horizontal infinita con scroll continuo.
 *
 * Cada imagen mantiene su aspect ratio natural (height fijo, width auto),
 * por lo que el viewport muestra ~3 fotos a la vez dependiendo de los
 * aspect ratios — no hay recorte ni letterbox.
 *
 * El componente NO ocupa el full-width: se renderiza dentro de un wrapper
 * con padding (ej. container-page) que recibe el `clip` exterior.
 * Las imágenes que están fuera del wrapper visible quedan ocultas por
 * `overflow-hidden` en el contenedor padre.
 *
 * Pausa en hover. Respeta `prefers-reduced-motion`.
 */
export default function MarqueeGallery({
  images,
  speed = 50,
  heightClass = 'h-72 md:h-80 lg:h-96',
  reverse = false,
}: Props) {
  if (images.length === 0) return null;
  // Duplicamos las imágenes para que el loop sea seamless (sin salto).
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
    </div>
  );
}
