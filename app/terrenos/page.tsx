import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';
import BgRender from '@/components/BgRender';
import CountUp from '@/components/CountUp';
import { site } from '@/lib/content/site';
import { trackRecordTerrenos } from '@/lib/content/timeline';
import LandsMap from '@/components/LandsMapClient';

export const metadata = buildMetadata({
  title: 'Terrenos',
  path: '/terrenos',
  description:
    'Invertí en tierra desde el origen junto a Land Ventures: compra conjunta en las mejores zonas de CABA y +30 operaciones de track record.',
});

const advantages = [
  {
    icon: 'invest',
    title: 'Ponemos nuestro capital',
    body: 'Somos el principal inversor de cada operación que ofrecemos. Si no invertiríamos nosotros, no te la ofrecemos.',
    badge: '±30% de cada compra',
  },
  {
    icon: 'star',
    title: 'Negociamos las mejores condiciones',
    body: 'Comprar el terreno en oportunidad es solo la mitad. La otra es el canje: nuestra experiencia negociando con desarrolladores nos da las mejores condiciones del mercado en cada obra.',
    badge: undefined,
  },
  {
    icon: 'lock',
    title: 'Seguridad jurídica real',
    body: 'Constituimos una hipoteca sobre el lote para proteger la inversión, vigente hasta la entrega de las unidades funcionales.',
    badge: 'Hipoteca hasta entrega',
  },
  {
    icon: 'clock',
    title: 'Experiencia comprobada',
    body: '+10 años operando tierra en CABA. Conocemos cada barrio, cada zonificación y cada oportunidad antes de que salga al mercado.',
    badge: '+30 terrenos en CABA',
  },
];

export default function TerrenosPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', href: '/' },
          { name: 'Terrenos', href: '/terrenos' },
        ])}
      />

      {/* HERO */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <BgRender opacity={0.55} variant="hero" />
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <Reveal>
            <p className="eyebrow mb-5 mx-auto justify-center w-fit">Inversión en tierra</p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
              Invertí en tierra <span className="serif-accent">desde el origen</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 text-white/80 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Compramos terrenos en las mejores zonas de CABA junto a inversores. Nuestra fortaleza está en la negociación: conseguimos las mejores condiciones de canje del mercado.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#mapa" className="btn-outline">Ver el mapa</a>
              <Link href="/contacto" className="btn-outline">Quiero invertir</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRACK RECORD — fondo cream */}
      <section className="py-14 md:py-16 border-t border-white/[0.06] bg-cream text-ink">
        <div className="container-page max-w-5xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-12 mx-auto justify-center w-fit !text-coral">Track record</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {trackRecordTerrenos.map((m, i) => (
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

      {/* POR QUÉ INVERTIR EN TIERRA CON NOSOTROS — 4 ventajas reordenadas */}
      <section className="py-20 md:py-28 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender opacity={0.04} />
        <div className="container-page max-w-6xl mx-auto relative">
          <Reveal>
            <p className="eyebrow mb-4 mx-auto justify-center w-fit">Por qué invertir en tierra con nosotros</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-center mb-16 text-balance">
              Cuatro <span className="serif-accent">ventajas únicas</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv, i) => (
              <Reveal key={adv.title} delay={i * 100}>
                <article className="card-soft card-hover p-7 h-full flex flex-col">
                  <AdvantageIcon icon={adv.icon} className="h-11 w-11 text-brand mb-5" />
                  <h3 className="text-lg font-medium mb-3 leading-tight">{adv.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-5 flex-1">{adv.body}</p>
                  {adv.badge && (
                    <span className="inline-block self-start text-[11px] font-medium text-brand bg-brand/[0.08] border border-brand/30 rounded px-2.5 py-1.5 leading-snug">
                      {adv.badge}
                    </span>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section id="mapa" className="py-16 md:py-24 border-t border-white/[0.06] scroll-mt-24">
        <div className="container-page">
          <div className="max-w-5xl mx-auto mb-8">
            <Reveal>
              <p className="eyebrow mb-3">Mapa de terrenos</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-5xl font-light text-balance">
                +30 <span className="serif-accent">operaciones en CABA</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-sm text-white/60 mt-3">Tocá cada punto para ver el detalle del terreno.</p>
            </Reveal>
          </div>
          <Reveal delay={300}>
            <div className="max-w-5xl mx-auto">
              <LandsMap />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CIERRE */}
      <section className="py-20 md:py-24 border-t border-white/[0.06]">
        <div className="container-page max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light text-balance">
              ¿Querés sumarte a la <span className="serif-accent">próxima operación</span>?
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-5 text-white/70 max-w-lg mx-auto leading-relaxed">
              Te contamos cómo se estructura una operación, desde qué ticket se entra y qué oportunidades tenemos abiertas hoy.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                  'Hola, me interesa invertir en tierra con Land Ventures.',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand"
              >
                Quiero invertir
              </a>
              <a href={`mailto:${site.contact.email}?subject=Inversión en tierra`} className="btn-outline">
                {site.contact.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function AdvantageIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const stroke = 'currentColor';
  const base = `${className}`;
  switch (icon) {
    case 'star':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={base} aria-hidden>
          <path d="M16 4l3.6 7.3 8.1 1.2-5.8 5.7 1.4 8L16 22.5 8.7 26.2l1.4-8L4.3 12.5l8.1-1.2L16 4z" />
        </svg>
      );
    case 'lock':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={base} aria-hidden>
          <rect x="6" y="14" width="20" height="14" rx="2" />
          <path d="M10 14V10a6 6 0 0112 0v4" />
          <circle cx="16" cy="21" r="1.5" fill={stroke} />
        </svg>
      );
    case 'clock':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={base} aria-hidden>
          <circle cx="16" cy="16" r="12" />
          <path d="M16 9v7l5 3" />
        </svg>
      );
    case 'invest':
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={base} aria-hidden>
          <path d="M16 4v18" />
          <path d="M10 10l6-6 6 6" />
          <rect x="4" y="22" width="24" height="6" rx="1" />
        </svg>
      );
    default:
      return null;
  }
}
