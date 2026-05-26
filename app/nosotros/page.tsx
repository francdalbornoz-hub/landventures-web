import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import BgRender from '@/components/BgRender';
import { SearchIcon, HandMoneyIcon, MapIcon, BuildingsIcon } from '@/components/Icons';
import { trackRecord } from '@/lib/content/timeline';
import { team } from '@/lib/content/team';
import { site } from '@/lib/content/site';

export const metadata = buildMetadata({
  title: 'Nosotros',
  path: '/nosotros',
  description:
    'Equipo y expertise de Land Ventures: +10 años desarrollando, comprando y curando oportunidades inmobiliarias en CABA.',
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

      {/* HERO con foto al lado */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <BgRender opacity={0.06} variant="hero" />
        <div className="container-page max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <div>
                <p className="eyebrow mb-5">Quiénes somos</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
                  Identificamos{' '}
                  <span className="serif-accent">oportunidades estratégicas</span>{' '}
                  y desarrollamos proyectos{' '}
                  <span className="serif-accent">modernos y diferenciales</span>{' '}
                  en CABA.
                </h1>
                <p className="mt-6 text-white/75 leading-relaxed max-w-md">
                  Más de una década adquiriendo terrenos, financiando operaciones, diseñando y construyendo. Hoy integramos esa experiencia en una sola plataforma: desarrollos propios, inversión en tierra y oportunidades curadas.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200} variant="scale">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src="/images/projects/dorrego-card.png"
                  alt="Land Ventures — Equipo"
                  fill
                  priority
                  sizes="(min-width:768px) 45vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="py-16 md:py-20 border-t border-white/[0.06]">
        <div className="container-page max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-12 mx-auto justify-center w-fit">Track record</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center">
            {trackRecord.map((m, i) => (
              <Reveal key={m.label} delay={i * 100}>
                <div>
                  <p className="font-serif text-5xl md:text-6xl text-brand leading-none">{m.value}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-white/65">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPO */}
      <section className="py-20 md:py-28 border-t border-white/[0.06]">
        <div className="container-page max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4 mx-auto justify-center w-fit">Equipo</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-light text-center mb-14 text-balance">
              Las <span className="serif-accent">personas</span> detrás
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.slug} delay={i * 100}>
                <article className="card-soft card-hover p-7 text-center h-full">
                  <div className="relative w-28 h-28 mx-auto mb-5 rounded-full overflow-hidden bg-gradient-to-br from-brand/30 to-ink-dark border border-white/10">
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name} fill sizes="112px" className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center font-serif text-3xl text-brand/80">
                        {member.name[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-medium">{member.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-brand mb-3">{member.role}</p>
                  {member.bio && <p className="text-sm text-white/70 leading-relaxed">{member.bio}</p>}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender opacity={0.04} />
        <div className="container-page max-w-5xl mx-auto relative">
          <Reveal>
            <p className="eyebrow mb-4 mx-auto justify-center w-fit">Lo que hacemos</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-light text-center mb-14 text-balance">
              Nuestro <span className="serif-accent">expertise</span>
            </h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((e, i) => (
              <Reveal key={e.label} delay={i * 100}>
                <article className="text-center px-4">
                  <e.Icon className="h-14 w-14 mx-auto text-brand mb-6" />
                  <h3 className="text-brand font-medium mb-3 text-sm uppercase tracking-[0.15em]">{e.label}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{e.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 border-t border-white/[0.06]">
        <div className="container-page max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light text-balance">
              ¿Querés conocernos <span className="serif-accent">en persona</span>?
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`mailto:${site.contact.email}`} className="btn-outline">{site.contact.email}</a>
              <Link href="/comunidad" className="btn-outline">Ver próximos eventos</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
