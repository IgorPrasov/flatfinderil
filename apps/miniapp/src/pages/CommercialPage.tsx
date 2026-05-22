import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Building2, MapPin, Maximize2, Plus, LayoutGrid, List } from 'lucide-react'
import { searchListings } from '@/api/listings'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'
import type { Listing } from '@/types'

const PAGE_SIZE = 50

// Commercial deal type tabs
const DEAL_TABS = [
  { v: undefined, label: 'Все' },
  { v: 'rent',    label: 'Аренда' },
  { v: 'buy',     label: 'Купить' },
] as const

// Price chips for commercial rent (₪/month)
const PRICE_RENT = [3000, 5000, 8000, 12000, 20000, 30000, 50000]
const PRICE_BUY  = [500000, 1000000, 2000000, 5000000, 10000000]

function fmtPrice(n: number) {
  if (n >= 1_000_000) return `${n / 1_000_000}M₪`
  if (n >= 1_000)     return `${n / 1_000}K₪`
  return `${n}₪`
}

function CommercialCard({ listing, onClick, compact }: { listing: Listing; onClick: () => void; compact?: boolean }) {
  const { lang } = useTelegram()
  const photoCount = listing.photos?.filter((p) => p.length > 20).length ?? 0
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm cursor-pointer active:scale-[0.98] transition-transform p-4"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-bold text-gray-900">
            ₪{listing.price?.toLocaleString()}
            {listing.deal_type === 'rent' && <span className="text-xs text-gray-400 font-normal">/мес</span>}
          </p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            listing.deal_type === 'rent' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
          }`}>
            {listing.deal_type === 'rent' ? t('filters_rent', lang) : t('filters_buy', lang)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-brand bg-brand-light px-2 py-1 rounded-full font-medium">
          <Building2 className="w-3 h-3" />
          Коммерч.
        </div>
      </div>

      <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
        <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
        <span className="truncate">
          {listing.city}{listing.district ? `, ${listing.district}` : ''}
          {listing.address ? ` · ${listing.address}` : ''}
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm text-gray-600">
        {listing.area != null && (
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
            {listing.area} м²
          </span>
        )}
        {listing.area && listing.price && listing.deal_type === 'rent' && (
          <span className="text-gray-400 text-xs">
            ₪{Math.round(listing.price / listing.area)}/м²/мес
          </span>
        )}
        {photoCount > 0 && (
          <span className="text-xs text-gray-400 ml-auto">📷 {photoCount}</span>
        )}
      </div>

      {listing.description && !compact && (
        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {listing.description}
        </p>
      )}
    </div>
  )
}

export function CommercialPage({ onSelect }: { onSelect: (id: number) => void }) {
  const { lang, haptic, webapp } = useTelegram()
  const [deal, setDeal] = useState<'rent' | 'buy' | undefined>(undefined)
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined)
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [allListings, setAllListings] = useState<Listing[]>([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const filters = {
    property_types: ['commercial'],
    ...(deal ? { deal_type: deal } : {}),
    ...(priceMax ? { price_max: priceMax } : {}),
  }

  const { isLoading } = useQuery({
    queryKey: ['commercial', filters],
    queryFn: async () => {
      const result = await searchListings(filters, 0, PAGE_SIZE)
      setAllListings(result.listings)
      setTotal(result.total)
      setOffset(result.listings.length)
      return result
    },
    staleTime: 60_000,
  })

  const loadMore = useCallback(async () => {
    if (loadingMore || allListings.length >= total) return
    setLoadingMore(true)
    try {
      const result = await searchListings(filters, offset, PAGE_SIZE)
      setAllListings((prev) => [...prev, ...result.listings])
      setOffset((prev) => prev + result.listings.length)
      setTotal(result.total)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, allListings.length, total, filters, offset])

  const priceOptions = deal === 'buy' ? PRICE_BUY : PRICE_RENT

  return (
    <div className="flex flex-col h-full" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white sticky top-0 z-10 border-b border-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-brand leading-tight">🏢 Коммерческая</h1>
            <p className="text-xs text-gray-400">{t('commercial_sub', lang)}</p>
          </div>
          <button
            onClick={() => webapp?.openTelegramLink('https://t.me/FlatFinderILBot')}
            className="flex items-center gap-1 text-xs font-medium text-brand bg-brand-light px-3 py-1.5 rounded-xl"
          >
            <Plus className="w-3.5 h-3.5" />
            {t('commercial_add', lang)}
          </button>
        </div>

        {/* Deal type tabs */}
        <div className="flex gap-2 mb-3">
          {DEAL_TABS.map(({ v, label }) => (
            <button
              key={String(v)}
              onClick={() => { haptic('light'); setDeal(v); setPriceMax(undefined) }}
              className={`px-3 py-1.5 rounded-xl text-sm font-medium border transition-colors ${
                deal === v ? 'bg-brand border-brand text-white' : 'border-gray-200 text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Price filter */}
        <div className="flex gap-2 flex-wrap mb-2">
          {priceOptions.map((p) => (
            <button
              key={p}
              onClick={() => { haptic('light'); setPriceMax(priceMax === p ? undefined : p) }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                priceMax === p ? 'bg-brand border-brand text-white' : 'border-gray-200 text-gray-600'
              }`}
            >
              до {fmtPrice(p)}
            </button>
          ))}
        </div>

        {/* Count + view toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {isLoading ? 'Загрузка...' : `${allListings.length}${total > allListings.length ? `/${total}` : ''} объектов`}
          </span>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button onClick={() => setView('grid')} className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}>
              <LayoutGrid className="w-4 h-4 text-gray-600" />
            </button>
            <button onClick={() => setView('list')} className={`p-1.5 rounded-md ${view === 'list' ? 'bg-white shadow-sm' : ''}`}>
              <List className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto pb-24">
        {isLoading ? (
          <div className="flex flex-col gap-3 p-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : allListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <Building2 className="w-16 h-16 text-gray-200 mb-4" />
            <p className="font-semibold text-gray-700 mb-1">{t('commercial_empty', lang)}</p>
            <p className="text-sm text-gray-400 mb-6">{t('commercial_empty_sub', lang)}</p>
            <button
              onClick={() => webapp?.openTelegramLink('https://t.me/FlatFinderILBot')}
              className="bg-brand text-white text-sm font-medium px-5 py-2.5 rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Разместить объект
            </button>
            {/* Info blocks */}
            <div className="mt-8 grid grid-cols-2 gap-3 w-full">
              {[
                { emoji: '💼', label: 'Офисы', sub: 'Аренда и продажа' },
                { emoji: '🛍', label: 'Торговые', sub: 'Магазины, шоурумы' },
                { emoji: '📦', label: 'Склады', sub: 'Холодные и тёплые' },
                { emoji: '☕', label: 'Коворкинги', sub: 'Гибкие рабочие места' },
              ].map(({ emoji, label, sub }) => (
                <div key={label} className="bg-gray-50 rounded-2xl p-3 text-left">
                  <p className="text-2xl mb-1">{emoji}</p>
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className={view === 'grid' ? 'grid grid-cols-2 gap-3 p-4' : 'flex flex-col gap-3 p-4'}>
              {allListings.map((l) => (
                <CommercialCard
                  key={l.id}
                  listing={l}
                  compact={view === 'grid'}
                  onClick={() => { haptic(); onSelect(l.id) }}
                />
              ))}
            </div>
            {allListings.length < total && (
              <div className="px-4 pb-6 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="w-full py-3 bg-brand-light text-brand font-medium rounded-2xl text-sm disabled:opacity-50"
                >
                  {loadingMore ? 'Загрузка...' : `Загрузить ещё (${total - allListings.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
