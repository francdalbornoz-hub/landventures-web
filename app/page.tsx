import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/content/site';
import { projects } from '@/lib/content/projects';
import { trackRecordHome } from '@/lib/content/timeline';
import { events } from '@/lib/content/community';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import BgRender from '@/components/BgRender';
import CountUp from '@/components/CountUp';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/',
  description: site.description,
});

const pillarCopy: Record<string, { label: string; tagline: string }> = {
  proyectos: {
    label: 'Proyectos',
    tagline: 'Desarrollos propios en las mejores zonas de CABA.',
  },
  terrenos: {
    label: 'Terrenos',
    tagline: 'Invertí en tierra junto a nosotros, desde el origen de cada operación.',
  },
  oportunidades: {
    label: 'Oportunidades',
    tagline: 'Unidades seleccionadas para comprar al mejor precio, con el respaldo de +30 operaciones.',
  },
  comunidad: {
    label: 'Comunidad',
    tagline: 'Eventos, charlas y encuentros con inversores e invitados.',
  },
};

export default function HomePage() {
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
            src="/images/bg-default.jpg"
            alt="Land Ventures — Desarrollos inmobiliarios en Buenos Aires"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/75 to-ink" />
        <div className="absolute inset-0 grain" />

        <div className="relative z-10 container-page text-center pt-20 animate-fade-up">
          <Image
            src="/images/logo.png"
            alt="Land Ventures"
            width={2522}
            height={1240}
            priority
            className="mx-auto h-28 md:h-40 lg:h-48 w-auto brightness-0 invert opacity-95"
          />
          <h1 className="sr-only">
            Land Ventures — Desarrollos e inversión inmobiliaria en Buenos Aires
          </h1>
          <div className="mt-12 mx-auto w-px h-10 bg-brand/60" />
          <p className="mt-10 text-xl md:text-2xl lg:text-3xl font-light max-w-3xl mx-auto text-balance text-white/95 leading-snug">
            Una década definiendo <span className="serif-accent">dónde vale la pena construir</span> en Buenos Aires.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/proyectos" className="btn-outline-white">Ver proyectos</Link>
            <Link href="/oportunidades" className="btn-outline-white">Oportunidades</Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-scroll-hint" aria-hidden>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
        </div>
      </section>

      {/* PILARES — LO QUE HACEMOS */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender src="/images/pilares-bg.jpg" opacity={0.5} />
        <div className="container-page max-w-6xl mx-auto relative">
          <Reveal>
            <p className="eyebrow mb-5 mx-auto justify-center w-fit">Lo que hacemos</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-light text-center mb-16 text-balance">
              Descubrí <span className="serif-accent">Land Ventures</span>
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {site.pillars.map((p, i) => {
              const copy = pillarCopy[p.slug] ?? { label: p.label, tagline: p.tagline };
              return (
                <Reveal key={p.slug} delay={i * 100} variant="fade-up">
                  <Link
                    href={p.href}
                    className="group h-full flex flex-col relative p-7 bg-ink/70 backdrop-blur-md border border-white/10 border-l-2 border-l-brand/60 hover:bg-ink/85 hover:border-l-brand hover:border-white/20 transition-all duration-500"
                  >
                    <span className="text-[10px] font-medium text-brand tracking-[0.3em]">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-2xl text-white mt-3 mb-4 font-light group-hover:text-brand transition-colors duration-500 leading-tight">
                      {copy.label}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">{copy.tagline}</p>
                    {/* Conocé más siempre alineado al final */}
                    <span className="mt-auto pt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-brand/80 group-hover:text-brand group-hover:gap-3 transition-all duration-500">
                      Conocé más <span>→</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRACK RECORD — fondo cream */}
      <section className="py-20 md:py-24 border-t border-white/[0.06] bg-cream text-ink">
        <div className="container-page max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-12 mx-auto justify-center w-fit !text-coral">Track record</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {trackRecordHome.map((m, i) => (
              <Reveal key={m.label} delay={i * 100} variant="fade-up">
                <div>
                  <p className="font-light text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-brand leading-none whitespace-nowrap">
                    <CountUp
                      target={m.value}
                      decimals={m.decimals ?? 0}
                      prefix={m.prefix ?? ''}
                      suffix={m.suffix ?? ''}
                    />
                  </p>
                  <p className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-ink/60">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender opacity={0.5} />
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
                  href={`/proyectos#${p.slug}`}
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
                      <h3 className="font-extralight italic text-2xl md:text-3xl leading-tight">
                        {p.name} <span className="not-italic text-white/70">{p.suffix}</span>
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

      {/* BLOQUE TERRENOS */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] bg-ink-dark/40 relative overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-96 h-96 rounded-full bg-brand/5 blur-3xl" aria-hidden />
        <div className="container-page max-w-5xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <div>
                <p className="eyebrow mb-4">Terrenos</p>
                <h2 className="text-3xl md:text-5xl font-light mb-6 text-balance leading-tight">
                  Una década comprando, canjeando y vendiendo tierra en las{' '}
                  <span className="serif-accent">mejores zonas</span> de Buenos Aires.
                </h2>
                <p className="text-white/75 leading-relaxed mb-8 max-w-md">
                  Cada operación, con nuestro propio capital adentro.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/terrenos" className="btn-outline">
                    Ver el mapa →
                  </Link>
                  <Link href="/oportunidades" className="btn-outline">
                    Ver oportunidades
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200} variant="scale">
              <div className="aspect-square relative">
                <Image
                  src="/images/CABA.png"
                  alt="Mapa de operaciones en CABA"
                  fill
                  sizes="(min-width:768px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* COMUNIDAD — fondo blanco con imagen sutil */}
      <section className="py-24 md:py-32 border-t border-white/[0.06] bg-white text-ink relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/Eventos/Background-comunidad.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/70 to-white" />
        </div>
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <Reveal>
            <p className="eyebrow mb-5 mx-auto justify-center w-fit !text-coral">Comunidad</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light mb-6 text-balance leading-tight">
              Formá parte de la <span className="serif-accent">comunidad Land Ventures</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-ink/70 max-w-2xl mx-auto leading-relaxed text-base md:text-lg mb-10">
              Encuentros, charlas e invitados que se suman a las conversaciones sobre mercado inmobiliario y nuevas oportunidades.
            </p>
          </Reveal>
          {upcomingEvent && (
            <Reveal delay={300}>
              <div className="inline-block border border-ink/15 rounded-lg p-6 md:p-8 max-w-md mx-auto mb-10 text-left bg-cream/50">
                <p className="text-[10px] uppercase tracking-[0.28em] text-coral mb-2">Próximo evento</p>
                <h3 className="text-xl font-medium mb-2">{upcomingEvent.title}</h3>
                <p className="text-sm text-ink/70">{upcomingEvent.description}</p>
              </div>
            </Reveal>
          )}
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/comunidad" className="btn border-ink/40 text-ink hover:bg-ink hover:text-white">
                Ver todos los eventos
              </Link>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-ink/40 text-ink hover:bg-ink hover:text-white"
              >
                Seguinos en Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 md:py-32 border-t border-white/[0.06]">
        <div className="container-page text-center max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-balance leading-tight">
              <span className="serif-accent">Conversemos</span>.
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
