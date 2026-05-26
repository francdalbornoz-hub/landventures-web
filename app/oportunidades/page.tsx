import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import OpportunitiesGrid from '@/components/OpportunitiesGrid';
import BgRender from '@/components/BgRender';

export const metadata = buildMetadata({
  title: 'Oportunidades',
  path: '/oportunidades',
  description:
    'Unidades en pozo curadas en CABA: barrio, precio, superficie y entrega. La ficha completa se envía a interesados en privado.',
});

const steps = [
  {
    n: '01',
    icon: 'curator',
    title: 'Curaduría',
    body: 'Seleccionamos unidades en pozo en zonas con buen recorrido de precio por m².',
  },
  {
    n: '02',
    icon: 'private',
    title: 'Información en privado',
    body: 'La ficha completa (dirección, planos, condiciones) se envía a los interesados por canal directo.',
  },
  {
    n: '03',
    icon: 'handshake',
    title: 'Acompañamos la operación',
    body: 'Coordinamos la reunión con el desarrollador, asistimos en el boleto y el seguimiento de obra.',
  },
];

function StepIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const common = 'fill-none stroke-current';
  switch (icon) {
    case 'curator':
      // lupa con corazón / curaduría
      return (
        <svg viewBox="0 0 32 32" className={`${common} ${className}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="13" cy="13" r="8" />
          <path d="M19 19l8 8" />
          <path d="M13 11.5c-1.5-1.5-4-.5-4 1.5 0 2 2.5 4 4 5 1.5-1 4-3 4-5 0-2-2.5-3-4-1.5z" />
        </svg>
      );
    case 'private':
      // candado con doc
      return (
        <svg viewBox="0 0 32 32" className={`${common} ${className}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="7" y="14" width="18" height="14" rx="2" />
          <path d="M11 14v-4a5 5 0 0110 0v4" />
          <circle cx="16" cy="21" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'handshake':
      // apretón de manos
      return (
        <svg viewBox="0 0 32 32" className={`${common} ${className}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 14l5-5 4 4" />
          <path d="M28 14l-5-5-4 4" />
          <path d="M9 14l5 5a2 2 0 002.83 0L19 16.5" />
          <path d="M14 19l3 3a2 2 0 002.83 0l3.17-3.17" />
          <path d="M23 14l-3.5 3.5" />
        </svg>
      );
    default:
      return null;
  }
}

const faq = [
  {
    q: '¿Cómo seleccionan las oportunidades?',
    a: 'Cada unidad pasa por una revisión de antecedentes del desarrollador, situación del proyecto y precio relativo al barrio. Mostramos sólo las que pasan ese filtro.',
  },
  {
    q: '¿Por qué la dirección no aparece pública?',
    a: 'Mantenemos en privado el detalle del proyecto para proteger la relación con los desarrolladores y la información sensible. Te la enviamos al iniciar la conversación.',
  },
  {
    q: '¿Hay comisión?',
    a: 'Operamos con un esquema simple y transparente que te explicamos en la primera reunión, antes de cualquier compromiso.',
  },
  {
    q: '¿Qué pasa si el proyecto se atrasa o cancela?',
    a: 'Toda inversión en pozo tiene riesgos. Por eso seleccionamos cuidadosamente y compartimos toda la información disponible antes de que decidas.',
  },
];

export default function OportunidadesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', href: '/' },
          { name: 'Oportunidades', href: '/oportunidades' },
        ])}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        <BgRender opacity={0.06} variant="hero" />
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <p className="eyebrow mb-5 mx-auto justify-center w-fit">Unidades en pozo curadas</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
            Oportunidades <span className="serif-accent">en pozo</span> respaldadas por nuestro track record.
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            Mostramos información general de cada unidad: barrio, tipología, precio y entrega. La ficha completa con dirección, planos y condiciones del desarrollador se envía a interesados por canal directo.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#listado" className="btn-outline">Ver oportunidades</a>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent('Hola, me interesa recibir las oportunidades de pozo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-t border-white/[0.06]">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-3 mx-auto justify-center w-fit">Cómo funciona</p>
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            {steps.map((s) => (
              <article key={s.n} className="card-soft card-hover p-7">
                <div className="flex items-start justify-between mb-5">
                  <StepIcon icon={s.icon} className="h-10 w-10 text-brand" />
                  <span className="text-xs font-medium tracking-[0.25em] text-brand/60">{s.n}</span>
                </div>
                <h3 className="text-lg font-medium mb-2">{s.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="listado" className="py-16 md:py-24 border-t border-white/[0.06] scroll-mt-24">
        <div className="container-page max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="eyebrow mb-2">Listado</p>
            <h2 className="text-3xl md:text-4xl font-light">Oportunidades <span className="serif-accent">activas</span></h2>
          </div>
          <OpportunitiesGrid />
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/[0.06]">
        <div className="container-page max-w-3xl mx-auto">
          <p className="eyebrow mb-3 mx-auto justify-center w-fit">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-light text-center mb-10">
            Preguntas <span className="serif-accent">frecuentes</span>
          </h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <details key={item.q} className="border border-white/10 p-6 group">
                <summary className="cursor-pointer font-medium list-none flex items-start justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-brand text-2xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-sm text-white/80 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 border-t border-white/[0.06]">
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light text-balance">
            Suscribite para recibir las <span className="serif-accent">nuevas oportunidades</span>
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent('Hola, quiero sumarme a la lista de oportunidades.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand"
            >
              Sumarme por WhatsApp
            </a>
            <Link href="/contacto" className="btn-outline">
              Escribir un mensaje
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
