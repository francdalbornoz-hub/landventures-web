import Image from 'next/image';

type Props = {
  /** Imagen de fondo. Por ahora todos usan el mismo render placeholder. */
  src?: string;
  /** Opacidad de la imagen (0–1). Mantenerlo bajo para que no compita con el texto. */
  opacity?: number;
  /** Posición del overlay: clearer arriba (hero) o uniforme (bloque). */
  variant?: 'hero' | 'block';
};

/**
 * Fondo traslúcido reutilizable. Por defecto usa dorrego.jpg como placeholder
 * con baja opacidad y blend con el color de fondo. Reemplazar por render por bloque
 * cuando estén disponibles.
 *
 * Uso:
 *   <section className="relative overflow-hidden">
 *     <BgRender />
 *     <div className="relative">…contenido…</div>
 *   </section>
 */
export default function BgRender({ src = '/images/projects/dorrego.jpg', opacity = 0.08, variant = 'block' }: Props) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" style={{ opacity }} />
      <div
        className={
          variant === 'hero'
            ? 'absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink'
            : 'absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink'
        }
      />
      <div className="absolute inset-0 grain" />
    </div>
  );
}
