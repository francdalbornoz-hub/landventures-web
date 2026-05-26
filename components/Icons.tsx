type IconProps = { className?: string };

const base = 'stroke-current fill-none';

export function SearchIcon({ className = 'h-12 w-12' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${base} ${className}`} strokeWidth="1.5" aria-hidden>
      <circle cx="27" cy="27" r="16" />
      <line x1="38" y1="38" x2="52" y2="52" strokeLinecap="round" />
      <path d="M22 27a5 5 0 015-5" strokeLinecap="round" />
    </svg>
  );
}

export function HandMoneyIcon({ className = 'h-12 w-12' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${base} ${className}`} strokeWidth="1.5" aria-hidden>
      <circle cx="32" cy="20" r="9" />
      <path d="M28 16h7a2 2 0 010 4h-7l-2 2v3h7a2 2 0 010 4h-8" />
      <path d="M8 44c4-3 9-3 13 0l4 3h10a3 3 0 010 6H28" strokeLinecap="round" />
      <path d="M25 50l15-7c3-1 6 2 4 5l-14 10c-3 2-7 2-10 0l-8-6" strokeLinecap="round" />
    </svg>
  );
}

export function MapIcon({ className = 'h-12 w-12' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${base} ${className}`} strokeWidth="1.5" aria-hidden>
      <path d="M6 16l16-6 20 6 16-6v40l-16 6-20-6-16 6V16z" strokeLinejoin="round" />
      <line x1="22" y1="10" x2="22" y2="50" />
      <line x1="42" y1="16" x2="42" y2="56" />
    </svg>
  );
}

export function BuildingsIcon({ className = 'h-12 w-12' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${base} ${className}`} strokeWidth="1.5" aria-hidden>
      <rect x="10" y="20" width="20" height="36" />
      <rect x="34" y="10" width="20" height="46" />
      <line x1="14" y1="28" x2="18" y2="28" />
      <line x1="22" y1="28" x2="26" y2="28" />
      <line x1="14" y1="36" x2="18" y2="36" />
      <line x1="22" y1="36" x2="26" y2="36" />
      <line x1="14" y1="44" x2="18" y2="44" />
      <line x1="22" y1="44" x2="26" y2="44" />
      <line x1="38" y1="18" x2="42" y2="18" />
      <line x1="46" y1="18" x2="50" y2="18" />
      <line x1="38" y1="26" x2="42" y2="26" />
      <line x1="46" y1="26" x2="50" y2="26" />
      <line x1="38" y1="34" x2="42" y2="34" />
      <line x1="46" y1="34" x2="50" y2="34" />
      <line x1="38" y1="42" x2="42" y2="42" />
      <line x1="46" y1="42" x2="50" y2="42" />
    </svg>
  );
}

export function ApartmentIcon({ className = 'h-12 w-12' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${base} ${className}`} strokeWidth="1.5" aria-hidden>
      <rect x="14" y="8" width="36" height="48" />
      <line x1="20" y1="16" x2="26" y2="16" />
      <line x1="32" y1="16" x2="38" y2="16" />
      <line x1="44" y1="16" x2="44" y2="16" />
      <line x1="20" y1="24" x2="26" y2="24" />
      <line x1="32" y1="24" x2="38" y2="24" />
      <line x1="20" y1="32" x2="26" y2="32" />
      <line x1="32" y1="32" x2="38" y2="32" />
      <line x1="20" y1="40" x2="26" y2="40" />
      <line x1="32" y1="40" x2="38" y2="40" />
      <line x1="20" y1="48" x2="26" y2="48" />
      <line x1="32" y1="48" x2="38" y2="48" />
    </svg>
  );
}

export function PinMoneyIcon({ className = 'h-12 w-12' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${base} ${className}`} strokeWidth="1.5" aria-hidden>
      <path d="M32 6c-9 0-16 7-16 16 0 11 16 28 16 28s16-17 16-28c0-9-7-16-16-16z" strokeLinejoin="round" />
      <circle cx="32" cy="22" r="6" />
      <path d="M30 20h3a1.5 1.5 0 010 3h-3l-1 1v2h4" strokeLinecap="round" />
      <ellipse cx="32" cy="56" rx="14" ry="3" />
    </svg>
  );
}

export function PartnerIcon({ className = 'h-12 w-12' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={`${base} ${className}`} strokeWidth="1.5" aria-hidden>
      <circle cx="32" cy="20" r="8" />
      <path d="M16 50c0-8 7-14 16-14s16 6 16 14" strokeLinecap="round" />
      <path d="M8 30l8 8 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 30l-8 8-8-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
