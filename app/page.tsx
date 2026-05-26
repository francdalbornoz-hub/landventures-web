import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/content/site';
import { projects } from '@/lib/content/projects';
import { trackRecord } from '@/lib/content/timeline';
import { opportunities } from '@/lib/content/opportunities';
import { lands } from '@/lib/content/lands';
import { events } from '@/lib/content/community';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import BgRender from '@/components/BgRender';
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
        <div className="absolute inset-0 animate-slow-zoom">
          <Image
            src="/images/projects/dorrego.jpg"
            alt="Land Ventures — Desarrollos inmobiliarios en Buenos Aires"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
        <div className="absolute inset-0 grain" />

        <div className="relative z-10 container-page text-center pt-20 animate-fade-up">
          <Image
            src="/images/logo.png"
            alt="Land Ventures"
            width={2522}
            height={1240}
            priority
            className="mx-auto h-16 md:h-24 lg:h-28 w-auto brightness-0 invert opacity-95"
          />
          <h1 className="sr-only">{site.name} — Desarrollos inmobiliarios y oportunidades de inversión en Buenos Aires</h1>
          <div className="mt-10 mx-auto w-px h-8 bg-brand/60" />
          <p className="mt-8 text-xl md:text-2xl font-light max-w-2xl mx-auto text-balance text-white/90">
            Desarrollos propios, inversión en tierra y oportunidades en pozo.<br />
            <span className="serif-accent">Todo en un solo lugar.</span>
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/proyectos" className="btn-outline-white">Ver proyectos</Link>
            <Link href="/oportunidades" className="btn-outline-white">Oportunidades</Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-hint" aria-hidden>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* TAGLINE */}
      <section className="py-20 md:py-32">
        <div className="container-page text-center max-w-4xl mx-auto">
          <Reveal>
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-balance">
              Identificamos oportunidades{' '}
              <span className="serif-accent">estratégicas</span> y desarrollamos en ellas
              proyectos inmobiliarios{' '}
              <span className="serif-accent">modernos y diferenciales</span>.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="divider-line" />
          </Reveal>
        </div>
      </section>

      {/* PILARES */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender />
        <div className="container-page max-w-6xl mx-auto relative">
          <Reveal>
            <p className="eyebrow mb-5 mx-auto justify-center w-fit">Lo que hacemos</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-light text-center mb-16 text-balance">
              Nuestras <span className="serif-accent">cuatro líneas</span>
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {site.pillars.map((p, i) => (
              <Reveal key={p.slug} delay={i * 100} variant="fade-up">
                <Link
                  href={p.href}
                  className="group card-soft card-hover p-8 h-full block relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors duration-500" />
                  <span className="text-[10px] font-medium text-brand/70 tracking-[0.3em]">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl text-white mt-3 mb-4 font-light group-hover:text-brand transition-colors duration-500">
                    {p.label}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">{p.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-brand opacity-70 group-hover:opacity-100 group-hover:gap-3 transition-all duration-500">
                    Conocer <span>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="py-20 md:py-24 border-t border-white/[0.06] bg-gradient-to-b from-ink to-ink-dark/40">
        <div className="container-page max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-12 mx-auto justify-center w-fit">Track record</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center">
            {trackRecord.map((m, i) => (
              <Reveal key={m.label} delay={i * 100} variant="fade-up">
                <div>
                  <p className="font-serif text-5xl md:text-6xl text-brand leading-none">{m.value}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/65">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender opacity={0.04} />
        <div className="container-page relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 max-w-6xl mx-auto">
            <Reveal>
              <div>
                <p className="eyebrow mb-3">Proyectos</p>
                <h2 className="text-3xl md:text-5xl font-light text-balance">
                  Nuestros <span className="serif-accent">desarrollos</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <Link href="/proyectos" className="btn-outline self-start md:self-auto">
                Ver todos
              </Link>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={`/proyectos/${p.slug}`}
                  className="group block relative overflow-hidden"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                    <Image
                      src={p.image}
                      alt={`${p.name} — ${p.locationDetail}`}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 90vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <p className="eyebrow mb-2 !text-white/80">{p.neighborhood}</p>
                      <h3 className="font-display text-2xl md:text-3xl font-normal leading-tight">
                        {p.name} <em className="text-white/70 not-italic">{p.suffix}</em>
                      </h3>
                      <p className="text-xs text-white/60 mt-1.5">{p.locationDetail}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-brand opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        Ver proyecto <span>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TERRENOS */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] bg-ink-dark/30 relative overflow-hidden">
        <BgRender opacity={0.05} />
        <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-96 h-96 rounded-full bg-brand/5 blur-3xl" aria-hidden />
        <div className="container-page max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <div>
                <p className="eyebrow mb-4">Terrenos</p>
                <h2 className="text-3xl md:text-5xl font-light mb-6 text-balance leading-tight">
                  +{lands.length} operaciones de{' '}
                  <span className="serif-accent">tierra en CABA</span>
                </h2>
                <p className="text-white/75 leading-relaxed mb-8 max-w-md">
                  Más de una década comprando, canjeando y vendiendo tierra junto a inversores en los mejores corredores de Buenos Aires.
                </p>
                <Link href="/terrenos" className="btn-outline">
                  Ver el mapa →
                </Link>
              </div>
            </Reveal>
            <Reveal delay={200} variant="scale">
              <div className="aspect-square relative rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-brand/20 via-ink-dark to-ink-deep grid place-items-center">
                <div className="text-center relative z-10">
                  <p className="font-serif text-7xl md:text-8xl text-brand leading-none">+30</p>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 mt-3">terrenos operados</p>
                </div>
                <div className="absolute inset-0 grain opacity-50" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OPORTUNIDADES */}
      {featuredOpportunities.length > 0 && (
        <section className="py-20 md:py-28 border-t border-white/[0.06]">
          <div className="container-page max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
              <Reveal>
                <div>
                  <p className="eyebrow mb-3">Oportunidades</p>
                  <h2 className="text-3xl md:text-5xl font-light text-balance">
                    Unidades en pozo <span className="serif-accent">curadas</span>
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <Link href="/oportunidades" className="btn-outline self-start md:self-auto">
                  Ver listado
                </Link>
              </Reveal>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {featuredOpportunities.map((o, i) => (
                <Reveal key={o.id} delay={i * 100}>
                  <article className="card-soft card-hover p-7 h-full">
                    <p className="eyebrow mb-3">{o.barrio}</p>
                    <h3 className="text-2xl mb-5 font-medium">{o.tipologia}</h3>
                    <p className="font-serif text-3xl text-brand">
                      USD {new Intl.NumberFormat('en-US').format(o.precio)}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/55 mt-2">
                      USD {new Intl.NumberFormat('en-US').format(o.precioM2)}/m² · Entrega {o.entrega}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMUNIDAD */}
      {upcomingEvent && (
        <section className="py-20 md:py-28 border-t border-white/[0.06] bg-ink-dark/30 relative overflow-hidden">
          <BgRender opacity={0.04} />
          <div className="container-page max-w-3xl mx-auto text-center relative">
            <Reveal>
              <p className="eyebrow mb-4 mx-auto justify-center w-fit">Comunidad</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-5xl font-light mb-4 text-balance">
                {upcomingEvent.title}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-brand mb-5 text-[11px] uppercase tracking-[0.28em]">{upcomingEvent.dateLabel}</p>
            </Reveal>
            <Reveal delay={300}>
              <p className="text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">{upcomingEvent.description}</p>
            </Reveal>
            <Reveal delay={400}>
              <Link href="/comunidad" className="btn-outline">Ver todos los eventos</Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* CTA FINAL */}
      <section className="py-24 md:py-32 border-t border-white/[0.06]">
        <div className="container-page text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-balance leading-tight">
              Ponete en <span className="serif-accent">contacto</span> y organizamos una{' '}
              <span className="serif-accent">reunión</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${site.contact.email}`} className="btn-outline">{site.contact.email}</a>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

