import Image from 'next/image';

type Props = {
  /** Imagen de fondo. Por default usa /images/bg-default.jpg como placeholder. */
  src?: string;
  /** Opacidad de la imagen (0–1). 0.22 da presencia sin competir con el texto. */
  opacity?: number;
  /** hero = overlay más claro arriba para mostrar más imagen.
   *  block = overlay uniforme, imagen como acento. */
  variant?: 'hero' | 'block';
};

/**
 * Fondo traslúcido reutilizable. Por defecto usa la imagen placeholder
 * /images/bg-default.jpg con opacidad notoria (~0.22) y un overlay que
 * mantiene la legibilidad del texto.
 *
 * Para cambiar la imagen por bloque: pasá `src="/images/<archivo>.jpg"`.
 */
export default function BgRender({
  src = '/images/bg-default.jpg',
  opacity = 0.8,
  variant = 'block',
}: Props) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        style={{ opacity }}
      />
      <div
        className={
          variant === 'hero'
            ? 'absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/55 to-ink'
            : 'absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/40 to-ink/75'
        }
      />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
