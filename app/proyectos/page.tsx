import Image from 'next/image';
import { projects } from '@/lib/content/projects';
import { buildMetadata, breadcrumbJsonLd, projectListJsonLd, projectJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import BgRender from '@/components/BgRender';

export const metadata = buildMetadata({
  title: 'Proyectos',
  path: '/proyectos',
  description:
    'Nuestros desarrollos en las mejores zonas de Buenos Aires: Palermo Hollywood, Colegiales, San Telmo, Belgrano y más.',
  keywords: [
    'departamentos en pozo Buenos Aires',
    'desarrollos Palermo Hollywood',
    'edificios nuevos CABA',
    'Bonpland 2305',
    'Dorrego Place',
    'Newbery Place',
    'Aguilar Place',
    'LATE San Telmo',
    'ENE Nicaragua',
  ],
});

const STATUS_LABEL: Record<string, string> = {
  'en-construccion': 'En construcción',
  terminado: 'Terminado',
  proximamente: 'Próximamente',
};

export default function ProyectosPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Inicio', href: '/' },
            { name: 'Proyectos', href: '/proyectos' },
          ]),
          projectListJsonLd(projects),
          ...projects.map((p) => projectJsonLd(p)),
        ]}
      />

      <section className="pt-40 pb-20 md:pt-48 md:pb-28 relative overflow-hidden">
        <BgRender opacity={0.55} variant="hero" />
        <div className="container-page relative">
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow mb-6 mx-auto justify-center w-fit">Proyectos</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-balance">
              Nuestros <span className="serif-accent">desarrollos</span>
            </h1>
            <p className="mt-7 text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Cada proyecto nace de un terreno comprado junto a nuestros inversores y desarrollado en las mejores zonas de Buenos Aires.
            </p>
          </div>
        </div>
      </section>

      {/* SUBHERO — info secundaria, no compite con el hero */}
      <section className="py-10 md:py-14 border-t border-white/[0.06]">
        <div className="container-page text-center max-w-3xl mx-auto">
          <p className="eyebrow mb-4 mx-auto justify-center w-fit">Zonas</p>
          <p className="text-base md:text-lg text-white/75 leading-relaxed text-balance">
            Desarrollos propios y en curso en{' '}
            <span className="text-brand">Belgrano · Nuñez · Palermo Hollywood · Colegiales · San Telmo</span>
            {' '}y otras zonas premium de la ciudad.
          </p>
        </div>
      </section>

      {/* MENÚ DE ANCLAS — cards con portada, estilo home, en filas de 3 */}
      <section className="py-12 md:py-16 border-t border-white/[0.06]">
        <div className="container-page max-w-6xl mx-auto">
          <p className="eyebrow mb-8 text-center mx-auto justify-center w-fit">Saltar a proyecto</p>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <a
                key={p.slug}
                href={`#${p.slug}`}
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
                  {/* Pill de estado en esquina superior izquierda */}
                  <span
                    className={`absolute top-4 left-4 z-10 text-[10px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full backdrop-blur-md ${
                      p.status === 'terminado'
                        ? 'bg-brand/90 text-white'
                        : 'bg-white/15 text-white border border-white/25'
                    }`}
                  >
                    {p.status === 'terminado' ? 'Terminado' : 'En construcción'}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <p className="eyebrow mb-2 !text-white/80">{p.neighborhood}</p>
                    <h3 className="font-extralight italic text-2xl md:text-3xl leading-tight">
                      {p.name} <span className="not-italic text-white/70">{p.suffix}</span>
                    </h3>
                    <p className="text-xs text-white/60 mt-1.5">{p.locationDetail}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-brand opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      Ir al proyecto <span>↓</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIONES DETALLE POR PROYECTO — alterna 3 fondos para romper la monotonía */}
      {projects.map((p, idx) => {
        const bgClass =
          idx % 3 === 0 ? 'bg-ink' : idx % 3 === 1 ? 'bg-ink-dark' : 'bg-cream text-ink';
        const isLight = idx % 3 === 2;
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={`scroll-mt-24 py-20 md:py-28 border-t border-white/[0.06] ${bgClass}`}
          >
            <div className="container-page">
              <div
                className={`grid gap-10 md:gap-14 items-start md:grid-cols-[1fr_1.1fr] ${
                  idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="md:sticky md:top-24">
                  <p className={`eyebrow mb-3 ${isLight ? '!text-coral' : ''}`}>
                    {p.locationHeadline} — <span>{p.locationDetail}</span>
                  </p>
                  <h2 className={`font-extralight italic text-4xl md:text-6xl mb-5 ${isLight ? 'text-ink' : ''}`}>
                    {p.name}{' '}
                    {p.suffix && (
                      <span className={`not-italic ${isLight ? 'text-ink/60' : 'text-white/80'}`}>
                        {p.suffix}
                      </span>
                    )}
                  </h2>
                  {/* Pill de estado destacada — más notoria que el texto plano anterior */}
                  <span
                    className={`inline-flex items-center gap-2 text-[11px] md:text-xs uppercase tracking-[0.25em] font-medium px-4 py-2 rounded-full mb-6 ${
                      p.status === 'terminado'
                        ? isLight
                          ? 'bg-coral text-white shadow-[0_6px_18px_-6px_rgba(210,94,53,0.5)]'
                          : 'bg-brand text-white shadow-[0_6px_18px_-6px_rgba(224,153,0,0.5)]'
                        : isLight
                          ? 'bg-ink/[0.06] text-ink border border-ink/20'
                          : 'bg-white/[0.08] text-white border border-white/25'
                    }`}
                  >
                    {/* Dot indicador */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        p.status === 'terminado'
                          ? 'bg-white'
                          : isLight
                            ? 'bg-ink/60'
                            : 'bg-white/70'
                      } ${p.status !== 'terminado' ? 'animate-pulse' : ''}`}
                    />
                    {STATUS_LABEL[p.status]}
                  </span>
                  <p
                    className={`leading-relaxed text-balance max-w-prose ${
                      isLight ? 'text-ink/80' : 'text-white/85'
                    }`}
                  >
                    {p.description}
                  </p>

                  <dl className="mt-8 space-y-3">
                    {p.unitCount && <Stat value={p.unitCount.toString()} label="Unidades" light={isLight} />}
                    {p.surface && (
                      <Stat value={p.surface.toLocaleString('es-AR')} label="Metros cuadrados" light={isLight} />
                    )}
                    {p.commercialCount && (
                      <Stat
                        value={p.commercialCount.toString()}
                        label={p.commercialCount === 1 ? 'Local comercial' : 'Locales comerciales'}
                        light={isLight}
                      />
                    )}
                  </dl>

                  {/* BOTÓN PRINCIPAL: 'Conocé más del proyecto'.
                      Si el proyecto tiene URL WinBuild apunta ahí. Si no, fallback
                      al Instagram del proyecto, y si tampoco al Instagram general. */}
                  {(() => {
                    const fallbackIg = p.instagramHandle
                      ? `https://www.instagram.com/${p.instagramHandle}/`
                      : site.social.instagram;
                    const href = p.winbuildUrl ?? fallbackIg;
                    return (
                      <div className="mt-10">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-brand text-base !px-9 !py-4"
                        >
                          Conocé más del proyecto
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 h-4 w-4" aria-hidden>
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      </div>
                    );
                  })()}

                  <div className="mt-5 flex flex-wrap gap-3">
                    {p.brochureUrl && (
                      <a
                        href={p.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={isLight ? 'btn border-ink/40 text-ink hover:bg-ink hover:text-white' : 'btn-outline'}
                      >
                        Descargá la carpeta
                      </a>
                    )}
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isLight ? 'btn border-ink/40 text-ink hover:bg-ink hover:text-white' : 'btn-outline'}
                    >
                      Avances en Instagram
                    </a>
                    <a
                      href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                        `Hola, quiero más información sobre ${p.name} ${p.suffix ?? ''}`.trim(),
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={isLight ? 'btn border-ink/40 text-ink hover:bg-ink hover:text-white' : 'btn-outline'}
                    >
                      Quiero invertir
                    </a>
                  </div>
                </div>

                {/* GALERÍA: portada grande + secundarias debajo */}
                <div>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                    <Image
                      src={p.image}
                      alt={`${p.name} — render principal`}
                      fill
                      sizes="(min-width:768px) 55vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  {p.gallery && p.gallery.length > 0 && (
                    <div
                      className={`mt-4 grid gap-4 ${
                        p.gallery.length === 1
                          ? 'grid-cols-1'
                          : p.gallery.length === 2
                            ? 'grid-cols-2'
                            : p.gallery.length === 3
                              ? 'grid-cols-3'
                              : 'grid-cols-2 md:grid-cols-4'
                      }`}
                    >
                      {p.gallery.map((g, i) => (
                        <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm">
                          <Image
                            src={g}
                            alt={`${p.name} — vista ${i + 1}`}
                            fill
                            sizes="(min-width:768px) 22vw, 45vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CIERRE */}
      <section className="py-20 md:py-28 border-t border-white/[0.06]">
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light text-balance">
            ¿Querés conocer el <span className="serif-accent">próximo desarrollo</span> antes de que salga al mercado?
          </h2>
          <p className="mt-5 text-white/70 max-w-lg mx-auto">Escribinos.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
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
        </div>
      </section>
    </>
  );
}

function Stat({ value, label, light = false }: { value: string; label: string; light?: boolean }) {
  return (
    <div className="flex items-baseline gap-3">
      <dd className={`font-light text-3xl md:text-4xl tabular-nums ${light ? 'text-ink' : 'text-white'}`}>{value}</dd>
      <dt className={`text-xs uppercase tracking-[0.22em] ${light ? 'text-coral' : 'text-brand'}`}>{label}</dt>
    </div>
  );
}
