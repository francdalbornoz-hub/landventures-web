import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import BgRender from '@/components/BgRender';
import CountUp from '@/components/CountUp';
import { SearchIcon, HandMoneyIcon, MapIcon, BuildingsIcon } from '@/components/Icons';
import { trackRecord } from '@/lib/content/timeline';
import { team } from '@/lib/content/team';
import { site } from '@/lib/content/site';

export const metadata = buildMetadata({
  title: 'Nosotros',
  path: '/nosotros',
  description:
    'Somos Land Ventures: una década adquiriendo terrenos, financiando, diseñando y construyendo en las mejores zonas de CABA. Conocé al equipo y nuestro track record.',
  keywords: [
    'equipo Land Ventures',
    'desarrolladora Buenos Aires',
    'experiencia inmobiliaria CABA',
  ],
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

      {/* HERO con logo en lugar de foto */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <BgRender opacity={0.6} variant="hero" />
        <div className="container-page max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <Reveal>
              <div>
                <p className="eyebrow mb-5">Quiénes somos</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
                  Somos <span className="serif-accent">Land Ventures</span>
                </h1>
                <p className="mt-6 text-white/80 leading-relaxed max-w-md text-base md:text-lg">
                  Más de una década adquiriendo terrenos, financiando operaciones, diseñando y construyendo. Esa experiencia hoy se traduce en tres líneas: desarrollos propios, inversión en tierra y oportunidades curadas.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200} variant="scale">
              <div className="relative aspect-square md:aspect-[4/5] flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="Land Ventures"
                  width={2522}
                  height={1240}
                  className="w-full max-w-md h-auto brightness-0 invert opacity-95"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRACK RECORD — fondo cream */}
      <section className="py-16 md:py-20 border-t border-white/[0.06] bg-cream text-ink">
        <div className="container-page max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-12 mx-auto justify-center w-fit !text-coral">Track record</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {trackRecord.map((m, i) => (
              <Reveal key={m.label} delay={i * 100}>
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

      {/* EXPERTISE — Lo que hacemos */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender opacity={0.18} />
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

      {/* EQUIPO — fondo gris claro contrastante */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] bg-[#e6e3dd] text-ink">
        {/* Container un poco más ancho para que las 4 cards entren en una sola fila cómodas */}
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 mx-auto justify-center w-fit !text-coral">Equipo</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-16 text-balance">
              Conocé al equipo de <span className="serif-accent">Land Ventures</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.slug} delay={i * 80}>
                <article className="group relative bg-white border border-ink/10 p-8 md:p-9 text-center h-full overflow-hidden transition-all duration-500 hover:border-coral/50 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)] hover:-translate-y-1">
                  {/* Acento decorativo: línea superior coral que aparece en hover */}
                  <span className="absolute top-0 left-0 right-0 h-px bg-coral scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-500" />
                  {/* Detalle de número */}
                  <span className="absolute top-4 right-5 text-[10px] tracking-[0.3em] text-ink/30 font-medium">
                    0{i + 1}
                  </span>
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-brand/15 to-ink/5 ring-1 ring-ink/10 ring-offset-4 ring-offset-white">
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name} fill sizes="160px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center font-light text-4xl text-brand/80">
                        {member.name[0]}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-light text-ink leading-tight">
                    {member.name}
                  </h3>
                  <span className="block w-8 h-px bg-coral/60 mx-auto my-3" />
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-coral font-medium">
                    {member.role}
                  </p>
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
