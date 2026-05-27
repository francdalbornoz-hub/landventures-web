'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/lib/content/site';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled || open
          ? 'bg-ink/85 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between py-3 md:py-4">
        <Link href="/" aria-label={`${site.name} — Inicio`} className="block transition-opacity hover:opacity-80">
          <Image
            src="/images/logo.png"
            alt={`${site.name} logo`}
            width={2522}
            height={1240}
            priority
            className="h-12 w-auto md:h-16"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Principal">
          {site.nav.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-300 relative group ${
                  active ? 'text-brand' : 'text-white/85 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-brand transition-all duration-500 ease-out ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/85 hover:text-brand transition-colors duration-300"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
        </nav>

        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-white"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`block h-px bg-white transition-all duration-400 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-px bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-white transition-all duration-400 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-white/5 bg-ink/95 backdrop-blur-xl animate-fade-in" aria-label="Móvil">
          <ul className="container-page py-4 flex flex-col gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-white/85 hover:text-brand transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-white/5 mt-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-brand py-2"
              >
                <InstagramIcon className="h-4 w-4" /> {site.social.instagramHandle}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
