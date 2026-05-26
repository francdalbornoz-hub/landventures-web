import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/content/projects';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';

export const metadata = buildMetadata({
  title: 'Proyectos',
  path: '/proyectos',
  description:
    'Todos los desarrollos inmobiliarios de Land Ventures en Buenos Aires: Palermo Hollywood, Colegiales, San Telmo y más.',
});

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

      {/* HERO con título flanqueado por imágenes de proyectos */}
      <section className="pt-36 md:pt-44 pb-12">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr_1fr] items-center gap-8 md:gap-6">
            <div className="hidden md:block aspect-[3/4] relative overflow-hidden">
              <Image
                src={projects[0].image}
                alt={projects[0].name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-normal leading-tight text-balance">
                Desarrollamos proyectos<br />
                <em className="text-brand not-italic">modernos y diferenciales</em>
              </h1>
              <div className="mt-8">
                <a href="#proyectos" className="btn-outline">Ver proyectos</a>
              </div>
            </div>
            <div className="hidden md:block aspect-[3/4] relative overflow-hidden">
              <Image
                src={projects[1].image}
                alt={projects[1].name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GRILLA DE PROYECTOS */}
      <section id="proyectos" className="bg-white text-ink py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`#${p.slug}`}
                scroll
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.locationDetail}`}
                    fill
                    sizes="(min-width:768px) 40vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 text-center">
                  <h2 className="font-display text-3xl md:text-4xl font-normal italic text-ink">
                    {p.name} <span className="not-italic">{p.suffix}</span>
                  </h2>
                  <p className="eyebrow mt-2">{p.locationHeadline}</p>
                  <p className="text-sm text-ink/70 mt-1">{p.locationDetail}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIONES DE DETALLE POR PROYECTO */}
      {projects.map((p, idx) => (
        <section
          key={p.slug}
          id={p.slug}
          className={`scroll-mt-24 py-16 md:py-24 ${idx % 2 === 0 ? 'bg-ink' : 'bg-ink-dark'}`}
        >
          <div className="container-page">
            <div className={`grid gap-10 md:gap-14 items-center md:grid-cols-2 ${
              idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            }`}>
              <div>
                <p className="eyebrow mb-3">
                  {p.locationHeadline} <span className="text-brand"> — </span>
                  <span className="text-brand">{p.locationDetail}</span>
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-normal mb-6">
                  {p.name}{' '}
                  {p.suffix && <em className="text-white/80 not-italic">{p.suffix}</em>}
                </h2>
                <p className="text-white/85 leading-relaxed text-balance max-w-prose">
                  {p.description}
                </p>

                <dl className="mt-8 space-y-3">
                  {p.unitCount && (
                    <div className="flex items-baseline gap-3">
                      <dd className="font-display text-3xl md:text-4xl text-white">{p.unitCount}</dd>
                      <dt className="text-brand text-sm uppercase tracking-[0.2em]">Unidades</dt>
                    </div>
                  )}
                  {p.surface && (
                    <div className="flex items-baseline gap-3">
                      <dd className="font-display text-3xl md:text-4xl text-white">{p.surface.toLocaleString('es-AR')}</dd>
                      <dt className="text-brand text-sm uppercase tracking-[0.2em]">Metros cuadrados</dt>
                    </div>
                  )}
                  {p.commercialCount && (
                    <div className="flex items-baseline gap-3">
                      <dd className="font-display text-3xl md:text-4xl text-white">{p.commercialCount}</dd>
                      <dt className="text-brand text-sm uppercase tracking-[0.2em]">
                        {p.commercialCount === 1 ? 'Local comercial' : 'Locales comerciales'}
                      </dt>
                    </div>
                  )}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  {p.brochureUrl ? (
                    <a href={p.brochureUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                      Descargá la carpeta del proyecto
                    </a>
                  ) : (
                    <Link href={`/proyectos/${p.slug}`} className="btn-outline">
                      Más información
                    </Link>
                  )}
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Mirá los avances en Instagram
                  </a>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                      `Hola, quiero más información sobre ${p.name} ${p.suffix ?? ''}`.trim(),
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Contactate para más información
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
      ))}
    </>
  );
}
