import Link from 'next/link';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import { ApartmentIcon, PinMoneyIcon, PartnerIcon } from '@/components/Icons';
import ContactForm from '@/components/ContactForm';

export const metadata = buildMetadata({
  title: 'Invertí con nosotros',
  path: '/inverti-con-nosotros',
  description:
    'Conocé las modalidades de inversión en Land Ventures: compra de unidades en pozo, banca de tierras y asociación con propietarios para desarrollos en Buenos Aires.',
});

const modalities = [
  {
    Icon: ApartmentIcon,
    titleBrand: 'Compra de departamentos en distintas etapas del desarrollo',
    body: ': de pozo o terminados.',
  },
  {
    Icon: PinMoneyIcon,
    titleBrand: 'Land Banking',
    body: ': Acompañarnos en la compra de ',
    bodyHighlight: 'tierra',
    bodyEnd: ' estratégicamente ubicada para su futuro desarrollo.',
  },
  {
    Icon: PartnerIcon,
    titleBrand: 'Propietarios de terrenos',
    body: ': Nos asociamos con propietarios de terrenos para el desarrollo inmobiliario.',
  },
];

export default function InvertiPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', href: '/' },
          { name: 'Invertí con nosotros', href: '/inverti-con-nosotros' },
        ])}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container-page max-w-4xl mx-auto text-center">
          <h1 className="text-brand text-2xl md:text-4xl font-medium uppercase tracking-[0.2em]">
            Invertí con nosotros
          </h1>
          <p className="mt-8 text-lg md:text-xl text-balance text-white/90 leading-relaxed">
            <span className="text-brand">Contamos con diferentes modalidades</span>{' '}
            y <span className="text-brand">oportunidades de inversión</span>, que se ajustan a las
            expectativas de cada uno de nuestros inversores:
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="container-page grid gap-12 md:grid-cols-3">
          {modalities.map((m, i) => (
            <article key={i} className="text-center px-4">
              <m.Icon className="h-14 w-14 mx-auto text-white mb-6" />
              <p className="text-sm md:text-base leading-relaxed text-white/90 text-balance">
                <span className="text-brand font-semibold">{m.titleBrand}</span>
                {m.body}
                {m.bodyHighlight && <span className="text-brand">{m.bodyHighlight}</span>}
                {m.bodyEnd}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/proyectos" className="btn-outline">
            Conocé nuestros proyectos
          </Link>
        </div>
      </section>

      <section id="contacto" className="py-16 md:py-24 border-t border-brand/30">
        <div className="container-page max-w-3xl mx-auto">
          <h2 className="text-center font-display text-3xl md:text-4xl font-normal text-balance">
            Ponete en <span className="text-brand">contacto</span> y organizamos una{' '}
            <span className="text-brand">reunión</span> con nuestro equipo
          </h2>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center items-center text-white/90">
            <a href={`tel:${site.contact.phoneRaw}`} className="flex items-center gap-3 hover:text-brand">
              <PhoneIcon className="h-5 w-5 text-brand" />
              <span>{site.contact.phone}</span>
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-brand">
              <EmailIcon className="h-5 w-5 text-brand" />
              <span>{site.contact.email}</span>
            </a>
          </div>

          <div className="mt-12">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function EmailIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.05 17.31l-1.92-1.92a1.5 1.5 0 00-1.69-.31l-1.61.81a11.6 11.6 0 01-4.72-4.72l.81-1.61a1.5 1.5 0 00-.31-1.69L7.69 5a1.5 1.5 0 00-2.12 0L4.4 6.17a3 3 0 00-.77 2.92c1.27 5.6 5.69 10 11.28 11.28a3 3 0 002.92-.77l1.17-1.17a1.5 1.5 0 00.05-2.12z" />
    </svg>
  );
}
