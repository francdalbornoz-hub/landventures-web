'use client';

import { useEffect, useRef, useState } from 'react';
import {
  lands,
  landStatusColors,
  landStatusIcons,
  landStatusLabels,
  type Land,
  type LandStatus,
} from '@/lib/content/lands';

type LeafletNS = typeof import('leaflet');

const FILTERS: { label: string; value: 'todos' | LandStatus }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'En desarrollo', value: 'en-desarrollo' },
  { label: 'Compraventas', value: 'cerrado-compraventa' },
  { label: 'Canjes', value: 'cerrado-canje' },
  { label: 'Locales', value: 'cerrado-local' },
  { label: 'Abiertas', value: 'abierto' },
  { label: 'Próximamente', value: 'proximo' },
];

/** SVG path strokes — íconos flat sin relleno. Color del stroke = currentColor blanco. */
function iconSvg(name: string): string {
  const common = `width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"`;
  switch (name) {
    case 'building':
      // edificio
      return `<svg ${common}><rect x="5" y="3" width="14" height="18" rx="0.5"/><line x1="9" y1="7" x2="9.01" y2="7"/><line x1="15" y1="7" x2="15.01" y2="7"/><line x1="9" y1="11" x2="9.01" y2="11"/><line x1="15" y1="11" x2="15.01" y2="11"/><line x1="9" y1="15" x2="9.01" y2="15"/><line x1="15" y1="15" x2="15.01" y2="15"/></svg>`;
    case 'money':
      // billete con $
      return `<svg ${common}><rect x="3" y="6" width="18" height="12" rx="1"/><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5v.5M12 14v.5"/></svg>`;
    case 'shop':
      // local comercial — tienda con awning
      return `<svg ${common}><path d="M4 6h16l-1 4H5L4 6Z"/><path d="M5 10v10h14V10"/><path d="M9 20v-5h6v5"/></svg>`;
    case 'crane':
      // construcción / en desarrollo
      return `<svg ${common}><path d="M4 20h16"/><path d="M7 20V8l10-3"/><path d="M7 8h6"/><path d="M13 5v15"/><rect x="9" y="14" width="4" height="6"/></svg>`;
    case 'gem':
      // diamante / gema — oportunidad
      return `<svg ${common}><path d="M6 9l-2 3 8 9 8-9-2-3"/><path d="M6 9h12"/><path d="M6 9l3-5h6l3 5"/><path d="M12 4v17"/><path d="M9 9l3 12 3-12"/></svg>`;
    case 'soon':
      // construcción próxima — reloj con flecha
      return `<svg ${common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
    default:
      return '';
  }
}

export default function LandsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);
  const [filter, setFilter] = useState<'todos' | LandStatus>('todos');
  const [ready, setReady] = useState(false);
  const [LeafletMod, setLeafletMod] = useState<LeafletNS | null>(null);

  // Cargar Leaflet sólo en cliente
  useEffect(() => {
    let mounted = true;
    (async () => {
      const cssId = 'leaflet-css';
      if (typeof document !== 'undefined' && !document.getElementById(cssId)) {
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
      const L = (await import('leaflet')).default as unknown as LeafletNS;
      if (mounted) setLeafletMod(L);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Inicializar mapa
  useEffect(() => {
    if (!LeafletMod || !containerRef.current || mapRef.current) return;
    const L = LeafletMod;
    const map = L.map(containerRef.current, {
      center: [-34.575, -58.445],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false,
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    setReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [LeafletMod]);

  // Renderizar markers
  useEffect(() => {
    if (!LeafletMod || !mapRef.current) return;
    const L = LeafletMod;
    const map = mapRef.current as InstanceType<LeafletNS['Map']>;

    markersRef.current.forEach((m) => {
      try {
        (m as InstanceType<LeafletNS['Marker']>).remove();
      } catch {}
    });
    markersRef.current = [];

    const visible = filter === 'todos' ? lands : lands.filter((l) => l.status === filter);

    visible.forEach((land: Land) => {
      const color = landStatusColors[land.status];
      const iconName = landStatusIcons[land.status];
      const isFeatured =
        land.status === 'en-desarrollo' || land.status === 'abierto' || land.status === 'proximo';
      const size = isFeatured ? 46 : 40;
      const pulse = isFeatured
        ? `animation: brand-pulse 2.2s ease-out infinite;`
        : '';

      const icon = L.divIcon({
        className: 'lv-marker',
        html: `
          <span style="
            position:relative;
            display:flex; align-items:center; justify-content:center;
            width:${size}px; height:${size}px;
            border-radius:50%;
            background:${color};
            border:2px solid rgba(255,255,255,0.92);
            box-shadow:0 6px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.3);
            ${pulse}
          ">
            ${iconSvg(iconName)}
          </span>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2 + 2],
      });

      const m = L.marker([land.lat, land.lng], { icon, riseOnHover: true });

      const popup = `
        <div style="font-family: Montserrat, system-ui, sans-serif; min-width:220px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
            <span style="
              display:inline-flex; align-items:center; justify-content:center;
              width:28px; height:28px; border-radius:50%; background:${color};
            ">${iconSvg(iconName).replace('width="20"', 'width="14"').replace('height="20"', 'height="14"')}</span>
            <span style="font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:${color}; font-weight:600;">${landStatusLabels[land.status]}</span>
          </div>
          <div style="font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size:18px; color:#fff; margin-bottom:6px; line-height:1.2;">${land.label}</div>
          <div style="font-size:11px; color:#bcb3a8; text-transform:uppercase; letter-spacing:.12em;">${land.zona}</div>
          <div style="font-size:13px; color:#dcd4cb; margin-top:8px; line-height:1.5;">${land.info}</div>
        </div>
      `;
      m.bindPopup(popup, { closeButton: true, className: 'lv-popup' });
      m.addTo(map);
      markersRef.current.push(m);
    });
  }, [LeafletMod, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] border transition-all duration-300 ${
                active
                  ? 'bg-brand text-white border-brand shadow-[0_6px_20px_rgba(224,153,0,0.3)]'
                  : 'border-white/15 text-white/70 hover:border-brand/60 hover:text-brand'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <div
        ref={containerRef}
        className="w-full h-[60vh] md:h-[72vh] rounded-lg border border-white/10 bg-black/40 overflow-hidden"
        aria-label="Mapa de operaciones de Land Ventures"
      />
      {!ready && <p className="mt-3 text-sm text-white/50">Cargando mapa…</p>}

      {/* Leyenda */}
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/70">
        <span className="text-[10px] uppercase tracking-[0.22em] text-white/50 mr-2">Referencias</span>
        {(Object.keys(landStatusLabels) as LandStatus[]).map((k) => (
          <div key={k} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ background: landStatusColors[k], boxShadow: `0 0 0 1.5px rgba(255,255,255,0.9)` }}
            />
            <span>{landStatusLabels[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
