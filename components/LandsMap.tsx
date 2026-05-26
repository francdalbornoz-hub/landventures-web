'use client';

import { useEffect, useRef, useState } from 'react';
import { lands, landStatusColors, landStatusLabels, type Land, type LandStatus } from '@/lib/content/lands';

// Leaflet importado en runtime — usa window, no funciona en SSR.
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

export default function LandsMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);
  const [filter, setFilter] = useState<'todos' | LandStatus>('todos');
  const [ready, setReady] = useState(false);
  const [LeafletMod, setLeafletMod] = useState<LeafletNS | null>(null);

  // Cargar Leaflet sólo en el cliente
  useEffect(() => {
    let mounted = true;
    (async () => {
      // Cargar CSS de Leaflet de forma idempotente
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

  // Inicializar mapa cuando Leaflet está disponible
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

  // Renderizar markers según filtro
  useEffect(() => {
    if (!LeafletMod || !mapRef.current) return;
    const L = LeafletMod;
    const map = mapRef.current as InstanceType<LeafletNS['Map']>;
    // Limpiar markers anteriores
    markersRef.current.forEach((m) => {
      try {
        (m as InstanceType<LeafletNS['Marker']>).remove();
      } catch {}
    });
    markersRef.current = [];

    const visible = filter === 'todos' ? lands : lands.filter((l) => l.status === filter);
    visible.forEach((land: Land) => {
      const color = landStatusColors[land.status];
      const isFeatured = land.status === 'en-desarrollo' || land.status === 'abierto' || land.status === 'proximo';
      const icon = L.divIcon({
        className: 'lv-marker',
        html: `<span style="
          display:block; width:${isFeatured ? 18 : 12}px; height:${isFeatured ? 18 : 12}px;
          border-radius:50%; background:${color};
          box-shadow:0 0 0 3px rgba(0,0,0,0.35), 0 0 14px ${color}66;
          border:2px solid #111;
        "></span>`,
        iconSize: [isFeatured ? 18 : 12, isFeatured ? 18 : 12],
        iconAnchor: [isFeatured ? 9 : 6, isFeatured ? 9 : 6],
      });
      const m = L.marker([land.lat, land.lng], { icon });
      const popup = `
        <div style="font-family:var(--font-sans, system-ui); min-width:200px;">
          <div style="font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:#e09900; font-weight:600; margin-bottom:6px;">${landStatusLabels[land.status]}</div>
          <div style="font-family:'Playfair Display', Georgia, serif; font-size:18px; color:#fff; margin-bottom:4px;">${land.label}</div>
          <div style="font-size:12px; color:#bcb3a8;">${land.zona}</div>
          <div style="font-size:12px; color:#bcb3a8; margin-top:6px;">${land.info}</div>
        </div>
      `;
      m.bindPopup(popup);
      m.addTo(map);
      markersRef.current.push(m);
    });
  }, [LeafletMod, filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] border transition-colors ${
                active
                  ? 'bg-brand text-white border-brand'
                  : 'border-white/15 text-white/70 hover:border-brand hover:text-brand'
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <div
        ref={containerRef}
        className="w-full h-[60vh] md:h-[70vh] rounded-lg border border-white/10 bg-black/40"
        aria-label="Mapa de operaciones de Land Ventures"
      />
      {!ready && (
        <p className="mt-3 text-sm text-white/50">Cargando mapa…</p>
      )}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs text-white/70">
        {(Object.keys(landStatusLabels) as LandStatus[]).map((k) => (
          <div key={k} className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: landStatusColors[k] }} />
            <span>{landStatusLabels[k]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
