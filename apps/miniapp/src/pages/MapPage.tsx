import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { searchListings } from '@/api/listings'
import { useStore } from '@/store'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'
import type { Listing } from '@/types'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Approximate city centres (fallback when listing has no lat/lng)
const CITY_COORDS: Record<string, [number, number]> = {
  'Тель-Авив':       [32.0853, 34.7818],
  'Хайфа':           [32.7940, 34.9896],
  'Иерусалим':       [31.7683, 35.2137],
  'Бат-Ям':          [32.0222, 34.7503],
  'Ашдод':           [31.8057, 34.6553],
  'Ашкелон':         [31.6658, 34.5742],
  'Нетания':         [32.3215, 34.8532],
  'Нагария':         [33.0048, 35.0998],
  'Рамат-Ган':       [32.0681, 34.8248],
  'Ришон-ле-Цион':   [31.9730, 34.8073],
  'Герцлия':         [32.1659, 34.8432],
  'Акко':            [32.9227, 35.0713],
  'Эйлат':           [29.5581, 34.9482],
  'Кирьят-Ата':      [32.8117, 35.1195],
  'Модиин':          [31.8966, 35.0095],
  'Петах-Тиква':     [32.0878, 34.8867],
  'Холон':           [32.0109, 34.7739],
  'Беэр-Шева':       [31.2518, 34.7913],
  'Раанана':         [32.1840, 34.8706],
  'Хадера':          [32.4359, 34.9193],
  'Реховот':         [31.8949, 34.8145],
  'Герцлия Питуах':  [32.1659, 34.8432],
  'Кесария':         [32.5009, 34.9042],
  'Кфар-Саба':       [32.1789, 34.9077],
  'Гиватаим':        [32.0706, 34.8130],
  'Бней-Брак':       [32.0840, 34.8339],
  'Израиль':         [32.0853, 34.7818],
}

/**
 * Return listing coordinates — real if available, city-centre + stable
 * pseudo-random offset based on listing id otherwise.
 */
function getCoords(l: Listing): [number, number] | null {
  if (l.lat && l.lng) return [l.lat, l.lng]
  const base = CITY_COORDS[l.city]
  if (!base) return null
  // Deterministic scatter: ±0.012° (~1.3 km) using listing id as seed
  const seed = (l.id * 9301 + 49297) % 233280
  const rnd = (seed / 233280) - 0.5          // -0.5 … +0.5
  const seed2 = (l.id * 1234 + 5678) % 9999
  const rnd2 = (seed2 / 9999) - 0.5
  return [base[0] + rnd * 0.024, base[1] + rnd2 * 0.024]
}

function makeIcon(price: number, suspicious: boolean, duplicate: boolean) {
  const color = suspicious ? '#ef4444' : duplicate ? '#f59e0b' : '#863bff'
  const label = price > 0
    ? price >= 1_000_000 ? `₪${(price / 1_000_000).toFixed(1)}M` : `₪${Math.round(price / 1000)}K`
    : '?'
  return L.divIcon({
    className: '',
    html: `<div style="background:${color};color:#fff;border:2px solid white;border-radius:20px;padding:2px 8px;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${label}</div>`,
    iconAnchor: [24, 16],
  })
}

function FitBounds({ listings }: { listings: Listing[] }) {
  const map = useMap()
  useEffect(() => {
    const pts = listings
      .map((l) => getCoords(l))
      .filter((p): p is [number, number] => p !== null)
    if (pts.length > 0) map.fitBounds(pts, { padding: [40, 40], maxZoom: 13 })
  }, [listings, map])
  return null
}

export function MapPage({ onSelect }: { onSelect: (id: number) => void }) {
  const { filters } = useStore()
  const { lang } = useTelegram()

  const { data, isLoading } = useQuery({
    queryKey: ['listings', filters],
    queryFn: () => searchListings(filters, 0, 500),
    staleTime: 60_000,
  })
  const listings = data?.listings ?? []

  // Pair every listing with its resolved coordinates
  const geoListings = listings
    .map((l) => ({ l, pos: getCoords(l) }))
    .filter((x): x is { l: Listing; pos: [number, number] } => x.pos !== null)

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <MapContainer center={[32.0853, 34.7818]} zoom={8} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
        {geoListings.length > 0 && <FitBounds listings={geoListings.map((x) => x.l)} />}
        {geoListings.map(({ l, pos }) => (
          <Marker
            key={l.id}
            position={pos}
            icon={makeIcon(l.price, !!l.is_suspicious, !!l.is_duplicate)}
            eventHandlers={{ click: () => onSelect(l.id) }}
          >
            <Popup closeButton={false} offset={[0, -10]}>
              <div className="text-sm">
                <p className="font-bold">₪{l.price?.toLocaleString()}</p>
                <p className="text-gray-500">{l.city}</p>
                {l.rooms && <p>{l.rooms} {t('card_rooms', lang)}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute top-4 left-4 z-10 bg-white rounded-xl px-3 py-1.5 shadow-md text-sm font-medium text-gray-700">
        📍 {geoListings.length} {t('map_on_map', lang)}
      </div>
    </div>
  )
}
