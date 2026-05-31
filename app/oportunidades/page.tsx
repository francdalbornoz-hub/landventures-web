import Image from 'next/image';
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

const offerings = [
  {
    icon: 'curator',
    title: 'Distintos proyectos',
    body: 'Unidades disponibles en varios de nuestros desarrollos en CABA.',
  },
  {
    icon: 'handshake',
    title: 'Distintas etapas',
    body: 'En pozo, en construcción o terminadas, según lo que estés buscando.',
  },
  {
    icon: 'private',
    title: 'Precio de oportunidad',
    body: 'Mejores zonas de la ciudad, con un precio de entrada difícil de igualar.',
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
        <BgRender src="/images/Pozo/Pozo-background.jpg" opacity={0.55} variant="hero" />
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <p className="eyebrow mb-5 mx-auto justify-center w-fit">Land Ventures · Pozo Club</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
            Oportunidades <span className="serif-accent">en pozo</span> exclusivas
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Unidades en pozo seleccionadas en las mejores zonas de CABA. Entramos a cada proyecto desde el origen, y eso se traduce en mejores condiciones de entrada para vos.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#listado" className="btn-outline">Ver oportunidades</a>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent('Hola, me interesa invertir en una oportunidad en pozo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Quiero invertir
            </a>
          </div>
        </div>
      </section>

      {/* QUÉ OFRECEMOS — fondo gris claro */}
      <section className="py-20 md:py-24 border-t border-white/[0.06] bg-[#dad7d1] text-ink">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-3 mx-auto justify-center w-fit !text-coral">Lo que ofrecemos</p>
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
            ¿Qué <span className="serif-accent">ofrecemos</span>?
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {offerings.map((o) => (
              <article key={o.title} className="bg-white border border-ink/10 p-7 hover:border-coral/40 transition-colors">
                <StepIcon icon={o.icon} className="h-10 w-10 text-coral mb-5" />
                <h3 className="text-lg font-medium mb-2 text-ink">{o.title}</h3>
                <p className="text-sm text-ink/70 leading-relaxed">{o.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="listado" className="py-16 md:py-24 border-t border-white/[0.06] scroll-mt-24">
        <div className="container-page max-w-6xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Listado</p>
              <h2 className="text-3xl md:text-4xl font-light">Oportunidades <span className="serif-accent">activas</span></h2>
            </div>
            <p className="text-sm text-white/55 max-w-md md:text-right leading-relaxed">
              Mostramos información general: barrio, tipología, precio y entrega.
              La ficha completa (dirección, planos, condiciones) se envía por privado.
            </p>
          </div>
          <OpportunitiesGrid />
        </div>
      </section>

      {/* FAQ — fondo con imagen pozo y overlay claro, items animados */}
      <section className="py-20 md:py-24 border-t border-white/[0.06] bg-cream text-ink relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/Pozo/Pozo-background.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/80 to-cream" />
        </div>
        <div className="container-page max-w-3xl mx-auto relative">
          <p className="eyebrow mb-3 mx-auto justify-center w-fit !text-coral">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">
            Preguntas <span className="serif-accent">frecuentes</span>
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="bg-white border border-ink/10 rounded-md overflow-hidden transition-all duration-300 open:border-coral/60 open:shadow-[0_8px_24px_-12px_rgba(210,94,53,0.25)]"
              >
                <summary className="cursor-pointer list-none px-6 py-5 flex items-start justify-between gap-4 hover:bg-ink/[0.03] transition-colors">
                  <span className="font-medium text-ink group-open:text-coral">{item.q}</span>
                  <span className="text-coral text-2xl leading-none flex-shrink-0 transition-transform duration-400 [details[open]_&]:rotate-45">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1 border-t border-coral/15 bg-coral/[0.04]">
                  <p className="text-sm text-ink/80 leading-relaxed">{item.a}</p>
                </div>
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
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent('Hola, me interesa invertir en una oportunidad en pozo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand"
            >
              Quiero invertir
            </a>
            <a href={`mailto:${site.contact.email}`} className="btn-outline">
              {site.contact.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
