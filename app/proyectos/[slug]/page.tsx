import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/content/projects';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return buildMetadata({ title: 'Proyecto no encontrado' });
  return buildMetadata({
    title: `${p.name} ${p.suffix ?? ''}`.trim(),
    path: `/proyectos/${p.slug}`,
    description: p.description,
    image: p.image,
  });
}

const statusLabel: Record<string, string> = {
  'en-desarrollo': 'En desarrollo',
  'pre-venta': 'En pre-venta',
  finalizado: 'Finalizado',
};

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Inicio', href: '/' },
            { name: 'Proyectos', href: '/proyectos' },
            { name: `${project.name} ${project.suffix ?? ''}`.trim(), href: `/proyectos/${project.slug}` },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Residence',
            name: `${project.name} ${project.suffix ?? ''}`.trim(),
            description: project.description,
            image: `${site.url}${project.image}`,
            url: `${site.url}/proyectos/${project.slug}`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: project.locationDetail,
              addressLocality: project.neighborhood,
              addressRegion: 'CABA',
              addressCountry: 'AR',
            },
          },
        ]}
      />

      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden flex items-end">
        <Image
          src={project.image}
          alt={`${project.name} — ${project.locationDetail}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />
        <div className="relative container-page pb-16 md:pb-24 text-white">
          <Link href="/proyectos" className="eyebrow text-white/80 hover:text-brand">
            ← Volver a proyectos
          </Link>
          <p className="eyebrow mt-4">{project.locationHeadline} — {project.locationDetail}</p>
          <h1 className="mt-2 font-display text-5xl md:text-8xl font-normal leading-none">
            {project.name}
            {project.suffix && <em className="block text-3xl md:text-5xl mt-2 opacity-80 not-italic">{project.suffix}</em>}
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/80">{project.neighborhood}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="eyebrow mb-3">El proyecto</p>
            <p className="font-display text-2xl md:text-3xl font-normal leading-snug text-balance text-white/90">
              {project.description}
            </p>

            <dl className="mt-10 space-y-3">
              {project.unitCount && (
                <div className="flex items-baseline gap-4">
                  <dd className="font-display text-4xl md:text-5xl text-white">{project.unitCount}</dd>
                  <dt className="text-brand text-sm uppercase tracking-[0.2em]">Unidades</dt>
                </div>
              )}
              {project.surface && (
                <div className="flex items-baseline gap-4">
                  <dd className="font-display text-4xl md:text-5xl text-white">{project.surface.toLocaleString('es-AR')}</dd>
                  <dt className="text-brand text-sm uppercase tracking-[0.2em]">Metros cuadrados</dt>
                </div>
              )}
              {project.commercialCount && (
                <div className="flex items-baseline gap-4">
                  <dd className="font-display text-4xl md:text-5xl text-white">{project.commercialCount}</dd>
                  <dt className="text-brand text-sm uppercase tracking-[0.2em]">
                    {project.commercialCount === 1 ? 'Local comercial' : 'Locales comerciales'}
                  </dt>
                </div>
              )}
            </dl>
          </div>

          <aside className="border border-white/15 p-8 self-start">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="eyebrow mb-1">Estado</dt>
                <dd className="font-medium">{statusLabel[project.status]}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Ubicación</dt>
                <dd className="font-medium">{project.locationDetail}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Barrio</dt>
                <dd>{project.neighborhood}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-2">Tipologías</dt>
                <dd>
                  <ul className="space-y-1">
                    {project.units.map((u) => (
                      <li key={u} className="text-white/90">— {u}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-ink-dark">
        <div className="container-page text-center">
          <h2 className="font-display text-3xl md:text-5xl font-normal max-w-2xl mx-auto text-balance">
            ¿Querés saber más sobre <span className="text-brand">{project.name}</span>?
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${site.contact.email}?subject=Consulta ${project.name}`} className="btn-outline">
              {site.contact.email}
            </a>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                `Hola, me interesa el proyecto ${project.name}`,
              )}`}
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
