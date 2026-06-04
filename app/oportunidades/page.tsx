import Image from 'next/image';
import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import OpportunitiesGrid from '@/components/OpportunitiesGrid';
import BgRender from '@/components/BgRender';

export const metadata = buildMetadata({
  title: 'Oportunidades · Pozo Club',
  path: '/oportunidades',
  description:
    'Land Ventures Pozo Club: unidades en pozo exclusivas en las mejores zonas de CABA. Entramos a cada proyecto desde el origen, con las mejores condiciones de entrada.',
  keywords: [
    'oportunidades en pozo',
    'departamentos pozo Buenos Aires',
    'Pozo Club Land Ventures',
    'invertir en pozo CABA',
    'unidades pozo Palermo',
    'unidades pozo Belgrano',
    'unidades pozo San Telmo',
  ],
});

const offerings = [
  {
    icon: 'building',
    title: 'Distintos proyectos',
    body: 'Unidades disponibles en varios de nuestros desarrollos en CABA.',
  },
  {
    icon: 'stages',
    title: 'Distintas etapas',
    body: 'En pozo, en construcción o terminadas, según lo que estés buscando.',
  },
  {
    icon: 'dollar',
    title: 'Precio de oportunidad',
    body: 'Mejores zonas de la ciudad, con un precio de entrada difícil de igualar.',
  },
];

function StepIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const common = 'fill-none stroke-current';
  switch (icon) {
    case 'building':
      // edificio — Distintos proyectos
      return (
        <svg viewBox="0 0 32 32" className={`${common} ${className}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="7" y="4" width="18" height="24" />
          <line x1="11" y1="9" x2="13" y2="9" />
          <line x1="19" y1="9" x2="21" y2="9" />
          <line x1="11" y1="14" x2="13" y2="14" />
          <line x1="19" y1="14" x2="21" y2="14" />
          <line x1="11" y1="19" x2="13" y2="19" />
          <line x1="19" y1="19" x2="21" y2="19" />
          <rect x="14" y="22" width="4" height="6" />
        </svg>
      );
    case 'stages':
      // progresión / escalera — Distintas etapas
      return (
        <svg viewBox="0 0 32 32" className={`${common} ${className}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 26h6v-6" />
          <path d="M10 20h6v-6" />
          <path d="M16 14h6V8" />
          <path d="M22 8h6V2" />
          <circle cx="7" cy="26" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="13" cy="20" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="19" cy="14" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="25" cy="8" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'dollar':
      // símbolo dólar — Precio de oportunidad
      return (
        <svg viewBox="0 0 32 32" className={`${common} ${className}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="16" cy="16" r="12" />
          <path d="M19.5 12c-.5-1.5-2-2.5-3.5-2.5-2 0-3.5 1-3.5 2.5s1.5 2 3.5 2.5c2 .5 3.5 1 3.5 2.5s-1.5 2.5-3.5 2.5c-1.5 0-3-1-3.5-2.5" />
          <path d="M16 7v18" />
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
        data={[
          breadcrumbJsonLd([
            { name: 'Inicio', href: '/' },
            { name: 'Oportunidades', href: '/oportunidades' },
          ]),
          serviceJsonLd({
            name: 'Land Ventures Pozo Club',
            description:
              'Curaduría de unidades en pozo en proyectos de Land Ventures. Entramos a cada proyecto desde el origen con las mejores condiciones de entrada.',
            path: '/oportunidades',
          }),
          faqJsonLd(faq),
        ]}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        <BgRender src="/images/Pozo/Pozo-background.jpg" opacity={0.55} variant="hero" />
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <p className="eyebrow mb-5 mx-auto justify-center w-fit">Land Ventures · Pozo Club</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-balance">
            Oportunidades <span className="serif-accent">exclusivas</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Unidades seleccionadas en las mejores zonas de CABA. Entramos a cada proyecto desde el origen, y eso se traduce en mejores condiciones de entrada para vos.
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

      {/* QUÉ OFRECEMOS — fondo gris claro con imagen sutil */}
      <section className="py-20 md:py-24 border-t border-white/[0.06] bg-[#dad7d1] text-ink relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/que-ofrecemos-bg.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#dad7d1]/75 via-[#dad7d1]/65 to-[#dad7d1]/85" />
        </div>
        <div className="container-page max-w-5xl mx-auto relative">
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
