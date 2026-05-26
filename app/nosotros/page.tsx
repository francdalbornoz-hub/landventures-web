import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { SearchIcon, HandMoneyIcon, MapIcon, BuildingsIcon } from '@/components/Icons';

export const metadata = buildMetadata({
  title: 'Nosotros',
  path: '/nosotros',
  description:
    'Conocé al equipo de Land Ventures. Identificamos oportunidades estratégicas y desarrollamos proyectos inmobiliarios modernos y diferenciales en Buenos Aires.',
});

const expertise = [
  {
    Icon: SearchIcon,
    titleBrand: 'Adquirir terrenos',
    title: ' estratégicamente ubicados',
    body: 'para el desarrollo inmobiliario',
  },
  {
    Icon: HandMoneyIcon,
    titleBrand: 'Financiar',
    title: ' la compra del',
    body: 'terreno seleccionado',
  },
  {
    Icon: MapIcon,
    titleBrand: '',
    title: 'Diseñar proyectos',
    body: 'inmobiliarios',
    bodyHighlight: 'diferenciales y eficientes.',
  },
  {
    Icon: BuildingsIcon,
    titleBrand: 'Desarrollar y Construir',
    title: ',',
    body: 'haciendo',
    bodyHighlight: 'realidad los proyectos',
  },
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
          <h1 className="font-display text-3xl md:text-5xl font-normal leading-snug text-balance">
            En Land Ventures nos dedicamos a identificar{' '}
            <span className="text-brand font-semibold">oportunidades estratégicas</span>, para luego desarrollar en ellas
            proyectos inmobiliarios <span className="text-brand font-semibold">modernos y diferenciales</span>.
          </h1>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-page">
          <p className="text-center text-base md:text-lg mb-14 text-white/85">
            Nuestro equipo posee el expertise necesario para:
          </p>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((e, i) => (
              <article key={i} className="text-center px-4">
                <e.Icon className="h-14 w-14 mx-auto text-white mb-6" />
                <p className="text-sm md:text-base leading-relaxed text-white/90 text-balance">
                  {e.titleBrand && <span className="text-brand font-semibold">{e.titleBrand}</span>}
                  <span className="text-brand font-semibold">{e.title}</span>
                  {' '}
                  {e.body}
                  {e.bodyHighlight && (
                    <>
                      {' '}
                      <span className="text-brand font-semibold">{e.bodyHighlight}</span>
                    </>
                  )}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
