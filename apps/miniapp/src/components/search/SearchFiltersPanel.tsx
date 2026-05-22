import { SlidersHorizontal, ChevronRight } from 'lucide-react'
import { useStore } from '@/store'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'
import { useState } from 'react'

// ── Constants ────────────────────────────────────────────────────────────────

const CITIES = [
  'Тель-Авив', 'Нетания', 'Хайфа', 'Беэр-Шева', 'Ашдод',
  'Петах-Тиква', 'Ришон-ле-Цион', 'Хадера', 'Реховот', 'Холон',
  'Раанана', 'Герцлия', 'Бат-Ям', 'Модиин', 'Иерусалим',
]

const ROOMS = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5+']

const RENT_PRICES = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000, 12000, 15000, 20000]
const BUY_PRICES  = [500000, 750000, 1000000, 1500000, 2000000, 3000000, 5000000]

const PROP_TYPES = [
  { value: 'apartment', key: 'ptype_apartment' },
  { value: 'house',     key: 'ptype_house'     },
  { value: 'villa',     key: 'ptype_villa'     },
  { value: 'penthouse', key: 'ptype_penthouse' },
  { value: 'duplex',    key: 'ptype_duplex'    },
  { value: 'studio',    key: 'ptype_studio'    },
  { value: 'room',      key: 'ptype_room'      },
] as const

// Property types where pool filter makes sense
const POOL_TYPES = new Set(['villa', 'penthouse', 'house'])

// Must match config.py INFRASTRUCTURE keys in the bot — no public_pool there
const INFRA_KEYS = [
  'kindergarten', 'school', 'mall', 'park', 'gym',
  'hospital', 'beach', 'transport', 'restaurant', 'synagogue',
] as const

// ── Helpers ──────────────────────────────────────────────────────────────────

function fmtPrice(n: number): string {
  if (n >= 1_000_000) return `${n / 1_000_000}M₪`
  if (n >= 1_000)     return `${n / 1_000}K₪`
  return `${n}₪`
}
function roomVal(s: string) { return s === '5+' ? 5 : parseFloat(s) }

// ── Chip ─────────────────────────────────────────────────────────────────────

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xl text-sm border transition-colors ${
        active
          ? 'border-brand bg-brand text-white font-medium'
          : 'border-gray-200 bg-white text-gray-700 active:bg-gray-50'
      }`}
    >
      {label}
    </button>
  )
}

// ── Toggle switch ─────────────────────────────────────────────────────────────

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange} className="flex items-center justify-between w-full py-3 border-b border-gray-50">
      <span className="text-sm text-gray-800">{label}</span>
      <div className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-brand' : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </div>
    </button>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</p>
      {children}
    </div>
  )
}

// ── Full-screen filter page ───────────────────────────────────────────────────

function FiltersScreen({ onClose }: { onClose: () => void }) {
  const { filters, setFilters, resetFilters } = useStore()
  const { lang, rtl, haptic } = useTelegram()

  const priceOptions = filters.deal_type === 'buy' ? BUY_PRICES : RENT_PRICES
  const showPool = (filters.property_types ?? []).some(pt => POOL_TYPES.has(pt))

  function apply() { haptic('medium'); onClose() }
  function reset()  { haptic('light');  resetFilters() }

  const activeCount = [
    filters.deal_type,
    filters.property_types?.length,
    filters.cities?.length,
    filters.rooms_min,
    filters.rooms_max,
    filters.price_max,
    filters.infrastructure?.length,
    filters.with_photos,
    filters.pool,
  ].filter(Boolean).length

  return (
    <div
      className="fixed inset-0 bg-white z-50 flex flex-col"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
        <button type="button" onClick={apply} className="text-blue-500 font-medium text-sm px-1 py-2">
          {t('back', lang)}
        </button>
        <h2 className="text-base font-bold text-gray-900">{t('filters_title', lang)}</h2>
        <button type="button" onClick={reset} className="text-gray-400 text-sm px-1 py-2">
          {t('filters_reset', lang)}
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4">

        <Section title={t('filters_deal', lang)}>
          <div className="flex gap-2 flex-wrap">
            {([
              { v: undefined, k: 'filters_all'  },
              { v: 'rent',    k: 'filters_rent' },
              { v: 'buy',     k: 'filters_buy'  },
            ] as const).map(({ v, k }) => (
              <Chip
                key={k}
                label={t(k, lang)}
                active={filters.deal_type === v}
                onClick={() => setFilters({ deal_type: v, price_max: undefined })}
              />
            ))}
          </div>
        </Section>

        <Section title={t('filters_ptype', lang)}>
          <div className="flex gap-2 flex-wrap">
            {PROP_TYPES.map(({ value, key }) => (
              <Chip
                key={value}
                label={t(key, lang)}
                active={!!filters.property_types?.includes(value)}
                onClick={() => {
                  const cur = filters.property_types ?? []
                  const has = cur.includes(value)
                  const next = has ? cur.filter(v => v !== value) : [...cur, value]
                  // Clear pool filter if no pool-eligible type remains selected
                  const poolStillValid = next.some(pt => POOL_TYPES.has(pt))
                  setFilters({ property_types: next, pool: poolStillValid ? filters.pool : undefined })
                }}
              />
            ))}
          </div>
          {/* Pool — only when villa / penthouse / house is selected */}
          {showPool && (
            <div className="mt-3">
              <Toggle
                label={t('filters_pool', lang)}
                value={!!filters.pool}
                onChange={() => setFilters({ pool: filters.pool ? undefined : true })}
              />
            </div>
          )}
        </Section>

        <Section title={t('filters_city', lang)}>
          <div className="flex gap-2 flex-wrap">
            {CITIES.map(city => (
              <Chip
                key={city}
                label={city}
                active={!!filters.cities?.includes(city)}
                onClick={() => {
                  const cur = filters.cities ?? []
                  const has = cur.includes(city)
                  setFilters({ cities: has ? cur.filter(c => c !== city) : [...cur, city] })
                }}
              />
            ))}
          </div>
        </Section>

        <Section title={`${t('filters_rooms', lang)} — ${t('filters_from', lang)}`}>
          <div className="flex gap-2 flex-wrap">
            {ROOMS.map(r => (
              <Chip key={r} label={r}
                active={filters.rooms_min === roomVal(r)}
                onClick={() => setFilters({ rooms_min: filters.rooms_min === roomVal(r) ? undefined : roomVal(r) })}
              />
            ))}
          </div>
        </Section>

        <Section title={`${t('filters_rooms', lang)} — ${t('filters_to', lang)}`}>
          <div className="flex gap-2 flex-wrap">
            {ROOMS.map(r => (
              <Chip key={r} label={r}
                active={filters.rooms_max === roomVal(r)}
                onClick={() => setFilters({ rooms_max: filters.rooms_max === roomVal(r) ? undefined : roomVal(r) })}
              />
            ))}
          </div>
        </Section>

        <Section title={`${t('filters_price', lang)} — ${t('filters_to', lang)}`}>
          <div className="flex gap-2 flex-wrap">
            {priceOptions.map(p => (
              <Chip key={p} label={fmtPrice(p)}
                active={filters.price_max === p}
                onClick={() => setFilters({ price_max: filters.price_max === p ? undefined : p })}
              />
            ))}
          </div>
        </Section>

        <Section title={t('infra_title', lang)}>
          <div className="flex gap-2 flex-wrap">
            {INFRA_KEYS.map(key => (
              <Chip
                key={key}
                label={t(`infra_${key}` as Parameters<typeof t>[0], lang)}
                active={!!filters.infrastructure?.includes(key)}
                onClick={() => {
                  const cur = filters.infrastructure ?? []
                  const has = cur.includes(key)
                  setFilters({ infrastructure: has ? cur.filter(k => k !== key) : [...cur, key] })
                }}
              />
            ))}
          </div>
        </Section>

        <Section title={t('filters_extras', lang)}>
          <Toggle label={t('filters_photos', lang)} value={!!filters.with_photos}
            onChange={() => setFilters({ with_photos: filters.with_photos ? undefined : true })} />
        </Section>

      </div>

      {/* Big apply button — always visible */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-gray-100">
        <button
          type="button"
          onClick={apply}
          className="w-full py-4 bg-brand hover:bg-brand-dark active:bg-brand-dark text-white text-base font-bold rounded-2xl transition-colors"
        >
          🔍 {t('filters_apply', lang)}
          {activeCount > 0 && ` · ${activeCount}`}
        </button>
      </div>
    </div>
  )
}

// ── Public trigger ────────────────────────────────────────────────────────────

export function SearchFiltersPanel() {
  const { filters } = useStore()
  const { lang, haptic } = useTelegram()
  const [open, setOpen] = useState(false)

  const activeCount = [
    filters.deal_type,
    filters.property_types?.length,
    filters.cities?.length,
    filters.rooms_min,
    filters.rooms_max,
    filters.price_max,
    filters.infrastructure?.length,
    filters.with_photos,
    filters.pool,
  ].filter(Boolean).length

  return (
    <>
      <button
        type="button"
        onClick={() => { haptic('light'); setOpen(true) }}
        className="relative flex items-center gap-1.5 px-3 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-700 active:bg-gray-200"
      >
        <SlidersHorizontal className="w-4 h-4" />
        {t('filters_title', lang)}
        {activeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-brand text-white text-xs rounded-full flex items-center justify-center font-bold px-1">
            {activeCount}
          </span>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
      </button>

      {open && <FiltersScreen onClose={() => setOpen(false)} />}
    </>
  )
}
