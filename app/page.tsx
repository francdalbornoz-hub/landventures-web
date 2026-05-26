import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/content/site';
import { projects } from '@/lib/content/projects';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/',
  description: site.description,
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Proyectos Land Ventures',
          itemListElement: projects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.url}/proyectos/${p.slug}`,
            name: `${p.name} ${p.suffix ?? ''}`.trim(),
          })),
        }}
      />

      {/* HERO con imagen full + logo centrado */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src="/images/projects/dorrego.jpg"
          alt="Land Ventures — Desarrollos inmobiliarios en Buenos Aires"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="relative z-10 container-page text-center text-white pt-20">
          <Image
            src="/images/logo.png"
            alt="Land Ventures"
            width={2522}
            height={1240}
            priority
            className="mx-auto h-20 md:h-28 lg:h-36 w-auto drop-shadow-2xl brightness-0 invert"
          />
          <h1 className="sr-only">
            {site.name} — Desarrollos inmobiliarios en Buenos Aires
          </h1>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/70 animate-bounce" fill="currentColor">
            <path d="M12 16l-6-6h12z" />
          </svg>
        </div>
      </section>

      {/* TAGLINE + CTA */}
      <section className="py-16 md:py-24">
        <div className="container-page text-center max-w-4xl mx-auto">
          <p className="font-display text-2xl md:text-3xl lg:text-4xl font-normal leading-snug text-balance">
            Identificamos oportunidades{' '}
            <span className="text-brand font-medium">estratégicas</span> y desarrollamos en ellas
            proyectos inmobiliarios{' '}
            <span className="text-brand font-medium">modernos y diferenciales</span>.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/proyectos" className="btn-outline">Conocé nuestros proyectos</Link>
            <Link href="/inverti-con-nosotros" className="btn-outline">Invertí con nosotros</Link>
          </div>
        </div>
      </section>

      {/* PROYECTOS — alternando layouts magazine */}
      {projects.map((p, i) => (
        <MagazineProject key={p.slug} project={p} index={i} />
      ))}

      {/* CTA FINAL */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-normal text-balance">
            Ponete en <span className="text-brand">contacto</span> y organizamos una{' '}
            <span className="text-brand">reunión</span> con nuestro equipo
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${site.contact.email}`} className="btn-outline">{site.contact.email}</a>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              WhatsApp {site.contact.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

type Props = { project: (typeof projects)[number]; index: number };

function MagazineProject({ project, index }: Props) {
  const isLight = index % 2 === 1;
  const bg = isLight ? 'bg-cream text-ink' : 'bg-ink text-white';

  // Layout alterna: izquierda y derecha (asimétrico magazine)
  const reverse = index % 2 === 1;

  return (
    <section
      aria-labelledby={`project-${project.slug}`}
      className={`${bg} py-20 md:py-28 overflow-hidden`}
    >
      <div className="container-page">
        <div className={`grid items-center gap-10 md:gap-16 md:grid-cols-2 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}>
          <div className={reverse ? 'md:pl-8' : 'md:pr-8'}>
            <h2
              id={`project-${project.slug}`}
              className={`font-display font-normal leading-none text-6xl md:text-7xl lg:text-8xl ${
                isLight ? 'text-ink/40' : 'text-white/30'
              }`}
            >
              {project.name}
            </h2>
            {project.suffix && (
              <p className={`mt-2 font-display italic text-2xl md:text-3xl ${isLight ? 'text-ink/60' : 'text-white/60'} title-underline`}>
                {project.suffix.toUpperCase()}
              </p>
            )}
            <div className="mt-12">
              <p className={`eyebrow mb-2 ${isLight ? 'text-brand-600' : 'text-brand'}`}>
                {project.locationHeadline}
              </p>
              <p className={`uppercase text-sm tracking-[0.2em] font-medium ${isLight ? 'text-ink' : 'text-white'}`}>
                {project.locationDetail}
              </p>
            </div>
            <div className="mt-8">
              <Link href={`/proyectos#${project.slug}`} className={isLight ? 'btn-outline' : 'btn-outline-white'}>
                Ver proyecto
              </Link>
            </div>
          </div>

          {/* Imagen principal */}
          <div className="relative aspect-[4/5] md:aspect-[3/4]">
            <Image
              src={project.image}
              alt={`${project.name} — ${project.locationDetail}`}
              fill
              sizes="(min-width:768px) 50vw, 90vw"
              className="object-cover"
              priority={index < 2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
