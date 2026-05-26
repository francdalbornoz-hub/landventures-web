import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/content/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white text-ink" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Pie de página</h2>
      <div className="container-page py-14 grid gap-10 md:grid-cols-[1fr_1fr_1.2fr] items-start">
        <div className="flex md:justify-start">
          <Link href="/" aria-label={`${site.name} — Inicio`} className="inline-block">
            <Image
              src="/images/logo.png"
              alt={`${site.name} logo`}
              width={2522}
              height={1240}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div>
          <ul className="space-y-3 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/70 hover:text-brand transition-colors uppercase tracking-[0.2em] text-xs font-medium">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 text-sm">
          <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-brand">
            <EmailIcon className="h-4 w-4 text-brand" />
            <span>{site.contact.email}</span>
          </a>
          <a href={`https://wa.me/${site.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand">
            <PhoneIcon className="h-4 w-4 text-brand" />
            <span>{site.contact.phone}</span>
          </a>
          <p className="flex items-center gap-3">
            <PinIcon className="h-4 w-4 text-brand" />
            <span>{site.contact.address.city}, {site.contact.address.country}</span>
          </p>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand">
            <InstagramIcon className="h-4 w-4 text-brand" />
            <span>{site.social.instagramHandle}</span>
          </a>
        </div>
      </div>
      <div className="bg-ink-deep">
        <div className="container-page py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-white/50">
          <p>© {year} {site.legalName}. Todos los derechos reservados.</p>
          <p>Buenos Aires, Argentina</p>
        </div>
      </div>
    </footer>
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
function PinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}
function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
