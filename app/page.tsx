import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/content/site';
import { projects } from '@/lib/content/projects';
import { trackRecord } from '@/lib/content/timeline';
import { opportunities } from '@/lib/content/opportunities';
import { lands } from '@/lib/content/lands';
import { events } from '@/lib/content/community';
import JsonLd from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/',
  description: site.description,
});

export default function HomePage() {
  const featuredOpportunities = opportunities.filter((o) => o.activo && o.destacado).slice(0, 3);
  const upcomingEvent = events.find((e) => e.status === 'proximo');

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

      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src="/images/projects/dorrego.jpg"
          alt="Land Ventures — Desarrollos inmobiliarios en Buenos Aires"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        <div className="relative z-10 container-page text-center text-white pt-20">
          <Image
            src="/images/logo.png"
            alt="Land Ventures"
            width={2522}
            height={1240}
            priority
            className="mx-auto h-20 md:h-28 lg:h-36 w-auto drop-shadow-2xl brightness-0 invert"
          />
          <h1 className="sr-only">{site.name} — Desarrollos inmobiliarios y oportunidades de inversión en Buenos Aires</h1>
          <p className="mt-8 font-display text-xl md:text-2xl font-normal max-w-2xl mx-auto text-balance">
            Desarrollos propios, inversión en tierra y oportunidades en pozo —{' '}
            <em className="text-brand not-italic">todo en un solo lugar</em>.
          </p>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/70 animate-bounce" fill="currentColor">
            <path d="M12 16l-6-6h12z" />
          </svg>
        </div>
      </section>

      {/* TAGLINE */}
      <section className="py-16 md:py-24">
        <div className="container-page text-center max-w-4xl mx-auto">
          <p className="font-display text-2xl md:text-3xl lg:text-4xl font-normal leading-snug text-balance">
            Identificamos oportunidades{' '}
            <span className="text-brand">estratégicas</span> y desarrollamos en ellas
            proyectos inmobiliarios{' '}
            <span className="text-brand">modernos y diferenciales</span>.
          </p>
        </div>
      </section>

      {/* PILARES */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-6xl mx-auto">
          <p className="eyebrow mb-4 text-center">Lo que hacemos</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-center mb-12">Nuestras líneas</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {site.pillars.map((p) => (
              <Link
                key={p.slug}
                href={p.href}
                className="group border border-white/10 bg-ink-dark/30 p-7 hover:border-brand transition-colors"
              >
                <div className="font-display text-3xl text-brand mb-3 group-hover:translate-x-1 transition-transform">
                  {p.label}
                </div>
                <p className="text-sm text-white/75 leading-relaxed">{p.tagline}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-white/60 group-hover:text-brand">
                  Ver más →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-4 text-center">Track record</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            {trackRecord.map((m) => (
              <div key={m.label}>
                <p className="font-display text-4xl md:text-5xl text-brand">{m.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS — preview */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 max-w-6xl mx-auto">
            <div>
              <p className="eyebrow mb-2">Proyectos</p>
              <h2 className="font-display text-3xl md:text-4xl font-normal">
                Nuestros desarrollos
              </h2>
            </div>
            <Link href="/proyectos" className="btn-outline self-start md:self-auto">
              Ver todos los proyectos
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {projects.slice(0, 6).map((p) => (
              <Link
                key={p.slug}
                href={`/proyectos/${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.locationDetail}`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="eyebrow mb-1">{p.neighborhood}</p>
                    <h3 className="font-display text-2xl md:text-3xl font-normal">
                      {p.name} <em className="text-white/80 not-italic">{p.suffix}</em>
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TERRENOS PREVIEW */}
      <section className="py-16 md:py-24 border-t border-white/10 bg-ink-dark/40">
        <div className="container-page max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow mb-3">Terrenos</p>
              <h2 className="font-display text-3xl md:text-5xl font-normal mb-5 text-balance">
                +{lands.length} operaciones de tierra en CABA
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                Más de una década comprando, canjeando y vendiendo tierra junto a inversores en los mejores corredores de Buenos Aires.
              </p>
              <Link href="/terrenos" className="btn-outline">
                Ver el mapa
              </Link>
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-brand/20 via-ink-dark to-ink-deep grid place-items-center">
              <div className="text-center">
                <p className="font-display text-7xl text-brand">+30</p>
                <p className="text-sm uppercase tracking-[0.2em] text-white/60 mt-2">terrenos operados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPORTUNIDADES PREVIEW */}
      {featuredOpportunities.length > 0 && (
        <section className="py-16 md:py-24 border-t border-white/10">
          <div className="container-page max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow mb-2">Oportunidades</p>
                <h2 className="font-display text-3xl md:text-4xl font-normal">
                  Unidades en pozo curadas
                </h2>
              </div>
              <Link href="/oportunidades" className="btn-outline self-start md:self-auto">
                Ver oportunidades
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredOpportunities.map((o) => (
                <article key={o.id} className="border border-white/10 bg-ink-dark/40 p-6">
                  <p className="eyebrow mb-2">{o.barrio}</p>
                  <h3 className="font-display text-2xl mb-4">{o.tipologia}</h3>
                  <p className="font-display text-xl text-brand">USD {new Intl.NumberFormat('en-US').format(o.precio)}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/60 mt-1">
                    USD {new Intl.NumberFormat('en-US').format(o.precioM2)}/m² · Entrega {o.entrega}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMUNIDAD PREVIEW */}
      {upcomingEvent && (
        <section className="py-16 md:py-24 border-t border-white/10 bg-ink-dark/40">
          <div className="container-page max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-3">Comunidad</p>
            <h2 className="font-display text-3xl md:text-4xl font-normal mb-3">
              {upcomingEvent.title}
            </h2>
            <p className="text-brand mb-3 text-sm uppercase tracking-[0.2em]">{upcomingEvent.dateLabel}</p>
            <p className="text-white/80 max-w-xl mx-auto mb-8">{upcomingEvent.description}</p>
            <Link href="/comunidad" className="btn-outline">Ver todos los eventos</Link>
          </div>
        </section>
      )}

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
