import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/content/projects';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import ProjectsFilter from '@/components/ProjectsFilter';
import BgRender from '@/components/BgRender';

export const metadata = buildMetadata({
  title: 'Proyectos',
  path: '/proyectos',
  description:
    'Todos los desarrollos inmobiliarios de Land Ventures en Buenos Aires: Palermo Hollywood, Colegiales, San Telmo y más. Filtrá por estado: en curso, terminados, próximamente.',
});

const STATUS_LABEL: Record<string, string> = {
  'en-curso': 'En curso',
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
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: projects.map((p, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${site.url}/proyectos/${p.slug}`,
              name: `${p.name} ${p.suffix ?? ''}`.trim(),
            })),
          },
        ]}
      />

      <section className="pt-40 pb-20 md:pt-48 md:pb-28 relative overflow-hidden">
        <BgRender opacity={0.45} variant="hero" />
        <div className="container-page relative">
          <div className="max-w-4xl mx-auto text-center">
            <p className="eyebrow mb-6 mx-auto justify-center w-fit">Portfolio</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-balance">
              Desarrollamos proyectos<br />
              <span className="serif-accent">modernos y diferenciales</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page">
          <ProjectsFilter projects={projects} />
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
                  <h2 className={`font-extralight italic text-4xl md:text-6xl mb-2 ${isLight ? 'text-ink' : ''}`}>
                    {p.name}{' '}
                    {p.suffix && (
                      <span className={`not-italic ${isLight ? 'text-ink/60' : 'text-white/80'}`}>
                        {p.suffix}
                      </span>
                    )}
                  </h2>
                  <p
                    className={`text-xs uppercase tracking-[0.22em] mb-6 ${
                      isLight ? 'text-coral' : 'text-brand'
                    }`}
                  >
                    {STATUS_LABEL[p.status]}
                  </p>
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

                  {/* BOTÓN PRINCIPAL: VER RENDERS WINBUILD */}
                  {p.winbuildUrl && (
                    <div className="mt-10">
                      <a
                        href={p.winbuildUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={isLight ? 'btn-brand text-base !px-9 !py-4' : 'btn-brand text-base !px-9 !py-4'}
                      >
                        Ver renders del proyecto
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1 h-4 w-4" aria-hidden>
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  )}

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
                      Contactate
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
