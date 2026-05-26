import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import { trackRecord } from '@/lib/content/timeline';
import { lands } from '@/lib/content/lands';
import LandsMap from '@/components/LandsMapClient';

export const metadata = buildMetadata({
  title: 'Terrenos',
  path: '/terrenos',
  description:
    'Inversión en tierra en CABA: compra conjunta y banca de terrenos junto a Land Ventures. Más de 30 operaciones en el historial.',
});

const steps = [
  {
    n: '01',
    title: 'Identificamos el lote',
    body: 'Buscamos terrenos estratégicamente ubicados en CABA con potencial de desarrollo.',
  },
  {
    n: '02',
    title: 'Estructuramos la operación',
    body: 'Definimos la inversión conjunta, los plazos y los participantes según el perfil del lote.',
  },
  {
    n: '03',
    title: 'Cerramos la compra',
    body: 'Coordinamos la escrituración y la administración legal del terreno.',
  },
  {
    n: '04',
    title: 'Maximizamos la rentabilidad',
    body: 'Vendemos, canjeamos o desarrollamos según la oportunidad de cada lote.',
  },
];

const advantages = [
  {
    title: 'Curaduría experta',
    body: 'Más de 10 años especializados en tierra en CABA. Cada lote pasa por due diligence técnico, legal y comercial.',
  },
  {
    title: 'Inversión conjunta',
    body: 'Participás de operaciones de gran escala con tickets accesibles, compartiendo el riesgo y la oportunidad.',
  },
  {
    title: 'Múltiples salidas',
    body: 'Cada terreno puede salir por compraventa, canje con desarrollador o desarrollo propio.',
  },
  {
    title: 'Transparencia',
    body: 'Acceso a la información completa de cada operación, escrituración y administración a la vista.',
  },
];

export default function TerrenosPage() {
  const totalOps = lands.length;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', href: '/' },
          { name: 'Terrenos', href: '/terrenos' },
        ])}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container-page max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-4">Inversión en tierra</p>
          <h1 className="font-display text-4xl md:text-6xl font-normal leading-tight text-balance">
            Compramos terrenos en CABA junto a inversores para{' '}
            <em className="text-brand not-italic">maximizar su rentabilidad</em>.
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#mapa" className="btn-outline">Ver el mapa</a>
            <Link href="/contacto" className="btn-outline">Quiero invertir</Link>
          </div>
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
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-3 text-center">Cómo funciona</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-center mb-12">
            Nuestro modelo de negocios
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <article key={s.n} className="bg-ink-dark/50 border border-white/10 p-6">
                <p className="font-display text-3xl text-brand mb-3">{s.n}</p>
                <h3 className="font-display text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mapa" className="py-16 md:py-24 border-t border-white/10 scroll-mt-24">
        <div className="container-page">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 max-w-5xl mx-auto">
            <div>
              <p className="eyebrow mb-2">Mapa de terrenos</p>
              <h2 className="font-display text-3xl md:text-4xl font-normal">
                +{totalOps} operaciones en CABA
              </h2>
              <p className="text-sm text-white/60 mt-2">Tocá cada punto para ver el detalle.</p>
            </div>
          </div>
          <div className="max-w-5xl mx-auto">
            <LandsMap />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-5xl mx-auto">
          <p className="eyebrow mb-3 text-center">Por qué invertir con nosotros</p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-center mb-12">
            Ventajas del modelo
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {advantages.map((a) => (
              <article key={a.title} className="border border-white/10 p-6">
                <h3 className="font-display text-xl text-brand mb-3">{a.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="container-page max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-normal text-balance">
            ¿Querés sumarte a la próxima operación?
          </h2>
          <p className="mt-4 text-white/70">
            Te contamos cómo se estructura, qué tickets manejamos y qué oportunidades tenemos abiertas.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${site.contact.email}?subject=Inversión en tierra`} className="btn-outline">
              {site.contact.email}
            </a>
            <a
              href={`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
                'Hola, me interesa invertir en tierra con Land Ventures.',
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
