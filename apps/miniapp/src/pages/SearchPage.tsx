import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Sparkles, LayoutGrid, List } from 'lucide-react'
import { ListingCard } from '@/components/listing/ListingCard'
import { SearchFiltersPanel } from '@/components/search/SearchFiltersPanel'
import { useStore } from '@/store'
import { searchListings, aiSearch } from '@/api/listings'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'
import type { SearchFilters, Listing } from '@/types'

const PAGE_SIZE = 50

export function SearchPage({ onSelect }: { onSelect: (id: number) => void }) {
  const { filters, setFilters } = useStore()
  const { lang, haptic, rtl } = useTelegram()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [aiQuery, setAiQuery] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiExplain, setAiExplain] = useState('')
  const [allListings, setAllListings] = useState<Listing[]>([])
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [loadingMore, setLoadingMore] = useState(false)

  const { isLoading, isFetching } = useQuery({
    queryKey: ['listings', filters],
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
    haptic('light')
    try {
      const result = await searchListings(filters, offset, PAGE_SIZE)
      setAllListings(prev => [...prev, ...result.listings])
      setOffset(prev => prev + result.listings.length)
      setTotal(result.total)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, allListings.length, total, filters, offset, haptic])

  async function handleAiSearch() {
    if (!aiQuery.trim()) return
    setAiLoading(true)
    haptic('medium')
    try {
      const { filters: aiFilters, explanation } = await aiSearch(aiQuery, lang)
      setFilters(aiFilters as Partial<SearchFilters>)
      setAiExplain(explanation)
      setOffset(0)
      setAllListings([])
    } catch { /* silent */ } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full" dir={rtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white sticky top-0 z-10 border-b border-gray-50">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2 mb-3">
          <img src="/logo.png" alt="FlatFinder IL" className="w-8 h-8 rounded-xl" />
          <div>
            <h1 className="text-base font-bold text-brand leading-none">FlatFinder IL</h1>
            <p className="text-[10px] text-gray-400 leading-none mt-0.5">{t('search_title', lang)}</p>
          </div>
        </div>

        {/* AI Search */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3">
            <Sparkles className="w-4 h-4 text-brand shrink-0" />
            <input
              className="flex-1 bg-transparent py-2.5 text-sm outline-none placeholder-gray-400"
              placeholder={t('search_ai_placeholder', lang)}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
            />
            {aiQuery && (
              <button
                onClick={handleAiSearch}
                disabled={aiLoading}
                className="text-brand font-medium text-sm"
              >
                {aiLoading ? '...' : t('search_ai_find', lang)}
              </button>
            )}
          </div>
          <SearchFiltersPanel />
        </div>

        {aiExplain && (
          <p className="text-xs text-brand bg-brand-light rounded-lg px-3 py-2 mb-2">
            🤖 {aiExplain}
          </p>
        )}

        {/* View toggle + count */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {isLoading
              ? t('search_loading', lang)
              : `${allListings.length}${total > allListings.length ? `/${total}` : ''} ${t('search_results', lang)}`}
            {isFetching && !isLoading && ' ' + t('search_updating', lang)}
          </span>
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <LayoutGrid className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md ${view === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto pb-20">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : allListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Search className="w-12 h-12 mb-3 opacity-30" />
            <p className="text-sm">{t('search_empty', lang)}</p>
            <p className="text-xs mt-1">{t('search_empty_sub', lang)}</p>
          </div>
        ) : (
          <>
            <div className={view === 'grid' ? 'grid grid-cols-2 gap-3 p-4' : 'flex flex-col gap-3 p-4'}>
              {allListings.map((l) => (
                <ListingCard
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
                  {loadingMore
                    ? t('search_loading', lang)
                    : `${t('search_load_more', lang)} (${total - allListings.length})`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
