import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SearchIcon, HandMoneyIcon, MapIcon, BuildingsIcon } from '@/components/Icons';
import { timeline, trackRecord, values } from '@/lib/content/timeline';
import { team } from '@/lib/content/team';
import { site } from '@/lib/content/site';

export const metadata = buildMetadata({
  title: 'Nosotros',
  path: '/nosotros',
  description:
    'Equipo, historia y track record de Land Ventures: +10 años desarrollando, comprando y curando oportunidades inmobiliarias en CABA.',
});

const expertise = [
  { Icon: SearchIcon, label: 'Adquirir terrenos', body: 'estratégicamente ubicados para el desarrollo inmobiliario.' },
  { Icon: HandMoneyIcon, label: 'Financiar', body: 'la compra y la ejecución de cada operación.' },
  { Icon: MapIcon, label: 'Diseñar proyectos', body: 'inmobiliarios diferenciales y eficientes.' },
  { Icon: BuildingsIcon, label: 'Desarrollar y construir', body: 'haciendo realidad los proyectos.' },
];

export default function NosotrosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', href: '/' },
          { name: 'Nosotros', href: '/nosotros' },
        ])}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container-page max-w-4xl text-center mx-auto">
          <p className="eyebrow mb-4">Quiénes somos</p>
          <h1 className="font-display text-3xl md:text-5xl font-normal leading-snug text-balance">
            En Land Ventures nos dedicamos a identificar{' '}
            <span className="text-brand">oportunidades estratégicas</span>, para luego desarrollar en ellas
            proyectos inmobiliarios <span className="text-brand">modernos y diferenciales</span>.
          </h1>
        </div>
      </section>

      <section className="py-12 md:py-16 border-t border-white/10">
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

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-3xl mx-auto">
          <p className="eyebrow mb-4 text-center">Nuestra historia</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-center mb-12">
            Más de una década en CABA
          </h2>
          <ol className="relative pl-8 border-l border-brand/30 space-y-10">
            {timeline.map((m) => (
              <li key={m.year} className="relative">
                <span className={`absolute -left-[37px] top-1 w-4 h-4 rounded-full border-2 border-brand ${m.done ? 'bg-brand' : 'bg-ink'}`} />
                <p className="text-xs uppercase tracking-[0.2em] text-brand mb-1">{m.year}</p>
                <h3 className="font-display text-xl mb-2">{m.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-4 text-center">Equipo</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-center mb-12">
            Las personas detrás
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <article key={member.slug} className="border border-white/10 bg-ink-dark/40 p-6 text-center">
                <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-gradient-to-br from-brand/30 to-ink-dark border border-white/10">
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill sizes="112px" className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center font-display text-3xl text-brand/80">
                      {member.name[0]}
                    </div>
                  )}
                </div>
                <h3 className="font-display text-xl">{member.name}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-brand mb-3">{member.role}</p>
                {member.bio && <p className="text-sm text-white/70">{member.bio}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-4 text-center">Lo que hacemos</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-center mb-12">
            Nuestro expertise
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((e) => (
              <article key={e.label} className="text-center px-4">
                <e.Icon className="h-14 w-14 mx-auto text-white mb-6" />
                <h3 className="text-brand font-semibold mb-2">{e.label}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{e.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-4 text-center">Valores</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-center mb-12">
            Cómo trabajamos
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((v) => (
              <article key={v.title} className="border border-white/10 p-6">
                <h3 className="font-display text-xl text-brand mb-3">{v.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-normal text-balance">
            ¿Querés conocernos en persona?
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${site.contact.email}`} className="btn-outline">{site.contact.email}</a>
            <Link href="/comunidad" className="btn-outline">Ver próximos eventos</Link>
          </div>
        </div>
      </section>
    </>
  );
}
