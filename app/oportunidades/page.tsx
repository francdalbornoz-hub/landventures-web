import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import OpportunitiesGrid from '@/components/OpportunitiesGrid';
import BgRender from '@/components/BgRender';
import { priceReference } from '@/lib/content/opportunities';

export const metadata = buildMetadata({
  title: 'Oportunidades',
  path: '/oportunidades',
  description:
    'Unidades en pozo curadas en CABA: barrio, precio, superficie y entrega. La ficha completa se envía a interesados en privado.',
});

const steps = [
  {
    n: '01',
    title: 'Curaduría',
    body: 'Seleccionamos unidades en pozo en zonas con buen recorrido de precio por m².',
  },
  {
    n: '02',
    title: 'Información en privado',
    body: 'La ficha completa (dirección, planos, condiciones) se envía a los interesados por canal directo.',
  },
  {
    n: '03',
    title: 'Acompañamos la operación',
    body: 'Coordinamos la reunión con el desarrollador, asistimos en el boleto y el seguimiento de obra.',
  },
];

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

      <section className="py-12 md:py-16 border-t border-white/[0.06]">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-3 mx-auto justify-center w-fit">Cómo funciona</p>
          <div className="grid gap-6 md:grid-cols-3 mt-10">
            {steps.map((s) => (
              <article key={s.n} className="card-soft card-hover p-7">
                <p className="font-light text-3xl text-brand mb-3">{s.n}</p>
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

      <section className="py-16 md:py-24 border-t border-white/[0.06] relative overflow-hidden">
        <BgRender opacity={0.04} />
        <div className="container-page max-w-5xl mx-auto relative">
          <p className="eyebrow mb-3 mx-auto justify-center w-fit">Referencia</p>
          <h2 className="text-3xl md:text-4xl font-light text-center mb-3">
            Precio por m² por barrio
          </h2>
          <p className="text-center text-sm text-white/60 max-w-xl mx-auto mb-10">
            Valores aproximados de unidades en pozo, actualizados periódicamente. Sirven como referencia, no son cotizaciones oficiales.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {priceReference.map((r) => (
              <div key={r.barrio} className="card-soft p-4 text-center">
                <p className="text-xs uppercase tracking-[0.15em] text-white/60">{r.barrio}</p>
                <p className="text-lg font-semibold text-brand mt-1 tabular-nums">USD {new Intl.NumberFormat('en-US').format(r.precioM2)}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">por m²</p>
              </div>
            ))}
          </div>
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
