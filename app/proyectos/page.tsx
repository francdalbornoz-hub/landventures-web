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

      <section className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        <BgRender opacity={0.06} variant="hero" />
        <div className="container-page relative">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] items-center gap-8 md:gap-6">
            <div className="hidden md:block aspect-[3/4] relative overflow-hidden">
              <Image src={projects[0].image} alt={projects[0].name} fill sizes="20vw" className="object-cover" />
            </div>
            <div className="text-center">
              <p className="eyebrow mb-5 mx-auto justify-center w-fit">Portfolio</p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
                Desarrollamos proyectos<br />
                <span className="serif-accent">modernos y diferenciales</span>
              </h1>
            </div>
            <div className="hidden md:block aspect-[3/4] relative overflow-hidden">
              <Image src={projects[1].image} alt={projects[1].name} fill sizes="20vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page">
          <ProjectsFilter projects={projects} />
        </div>
      </section>

      {/* SECCIONES DETALLE POR PROYECTO */}
      {projects.map((p, idx) => (
        <section
          key={p.slug}
          id={p.slug}
          className={`scroll-mt-24 py-16 md:py-24 border-t border-white/10 ${idx % 2 === 1 ? 'bg-ink-dark/30' : ''}`}
        >
          <div className="container-page">
            <div
              className={`grid gap-10 md:gap-14 items-center md:grid-cols-2 ${
                idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <p className="eyebrow mb-3">
                  {p.locationHeadline} — <span>{p.locationDetail}</span>
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-normal italic mb-2">
                  {p.name} {p.suffix && <span className="text-white/80 not-italic">{p.suffix}</span>}
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-brand mb-6">{STATUS_LABEL[p.status]}</p>
                <p className="text-white/85 leading-relaxed text-balance max-w-prose">{p.description}</p>

                <dl className="mt-8 space-y-3">
                  {p.unitCount && (
                    <Stat value={p.unitCount.toString()} label="Unidades" />
                  )}
                  {p.surface && (
                    <Stat value={p.surface.toLocaleString('es-AR')} label="Metros cuadrados" />
                  )}
                  {p.commercialCount && (
                    <Stat
                      value={p.commercialCount.toString()}
                      label={p.commercialCount === 1 ? 'Local comercial' : 'Locales comerciales'}
                    />
                  )}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  {p.brochureUrl ? (
                    <a href={p.brochureUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                      Descargá la carpeta
                    </a>
                  ) : (
                    <Link href={`/proyectos/${p.slug}`} className="btn-outline">
                      Más información
                    </Link>
                  )}
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
                    Mirá los avances
                  </a>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                      `Hola, quiero más información sobre ${p.name} ${p.suffix ?? ''}`.trim(),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Contactate
                  </a>
                </div>
              </div>

              <div>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={`${p.name} — render principal`}
                    fill
                    sizes="(min-width:768px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                {p.gallery && p.gallery.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {p.gallery.slice(0, 2).map((g, i) => (
                      <div key={i} className="relative aspect-[4/3] overflow-hidden">
                        <Image src={g} alt={`${p.name} — vista ${i + 1}`} fill sizes="(min-width:768px) 22vw, 45vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <dd className="font-serif text-3xl md:text-4xl text-white tabular-nums">{value}</dd>
      <dt className="text-brand text-xs uppercase tracking-[0.22em]">{label}</dt>
    </div>
  );
}
