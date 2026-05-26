import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/content/site';
import ContactForm from '@/components/ContactForm';
import BgRender from '@/components/BgRender';

export const metadata = buildMetadata({
  title: 'Contacto',
  path: '/contacto',
  description:
    'Contactá a Land Ventures: info@landventures.com.ar, +54 9 11 5163-6153, WhatsApp e Instagram. Buenos Aires, Argentina.',
});

export default function ContactoPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Inicio', href: '/' },
            { name: 'Contacto', href: '/contacto' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contacto Land Ventures',
            url: `${site.url}/contacto`,
          },
        ]}
      />

      <section className="pt-36 pb-12 md:pt-44 md:pb-16 relative overflow-hidden">
        <BgRender opacity={0.06} variant="hero" />
        <div className="container-page max-w-4xl mx-auto text-center relative">
          <p className="eyebrow mb-5 mx-auto justify-center w-fit">Hablemos</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-balance leading-tight">
            Ponete en <span className="serif-accent">contacto</span> y organizamos una{' '}
            <span className="serif-accent">reunión</span> con nuestro equipo.
          </h1>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-page grid gap-5 md:grid-cols-3 max-w-5xl mx-auto">
          <a
            href={`mailto:${site.contact.email}`}
            className="card-soft card-hover p-8 block"
          >
            <p className="eyebrow mb-4">Email</p>
            <p className="text-lg font-medium hover:text-brand transition-colors break-all">
              {site.contact.email}
            </p>
          </a>
          <a
            href={`https://wa.me/${site.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-soft card-hover p-8 block"
          >
            <p className="eyebrow mb-4">WhatsApp / Teléfono</p>
            <p className="text-lg font-medium hover:text-brand transition-colors">
              {site.contact.phone}
            </p>
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="card-soft card-hover p-8 block"
          >
            <p className="eyebrow mb-4">Instagram</p>
            <p className="text-lg font-medium hover:text-brand transition-colors">
              {site.social.instagramHandle}
            </p>
          </a>
        </div>
      </section>

      <section className="pb-20 md:pb-28 border-t border-white/[0.06] pt-16 md:pt-24">
        <div className="container-page max-w-3xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-light mb-12">
            <span className="serif-accent">Escribinos</span>
          </h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
