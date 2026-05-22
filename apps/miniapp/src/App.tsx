import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BottomNav } from '@/components/layout/BottomNav'
import { SearchPage } from '@/pages/SearchPage'
import { MapPage } from '@/pages/MapPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { CabinetPage } from '@/pages/CabinetPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { CommercialPage } from '@/pages/CommercialPage'
import { DocumentsPage } from '@/pages/DocumentsPage'
import { ListingDetailPage } from '@/pages/ListingDetailPage'
import { ComparePage } from '@/pages/ComparePage'
import { useStore } from '@/store'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
})

function AppContent() {
  const { activeTab } = useStore()
  const { ready, lang, rtl } = useTelegram()
  const [detailId, setDetailId] = useState<number | null>(null)
  const [showCompare, setShowCompare] = useState(false)
  const { compareList } = useStore()

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Listing detail overlay
  if (detailId !== null) {
    return (
      <div className="flex flex-col h-dvh">
        <ListingDetailPage listingId={detailId} onBack={() => setDetailId(null)} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-dvh relative" dir={rtl ? 'rtl' : 'ltr'}>
      {/* Compare badge */}
      {compareList.length > 0 && !showCompare && (
        <button
          onClick={() => setShowCompare(true)}
          className="fixed top-4 right-4 z-30 bg-brand text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
        >
          📊 {compareList.length} {t('compare_badge', lang)}
        </button>
      )}

      {/* Pages */}
      <div className="flex-1 overflow-hidden">
        {showCompare ? (
          <div className="h-full overflow-y-auto">
            <div className="px-4 pt-3">
              <button onClick={() => setShowCompare(false)} className="text-brand text-sm mb-2">
                {t('back', lang)}
              </button>
            </div>
            <ComparePage />
          </div>
        ) : activeTab === 'search' ? (
          <div className="h-full overflow-y-auto">
            <SearchPage onSelect={setDetailId} />
          </div>
        ) : activeTab === 'map' ? (
          <div className="h-full">
            <MapPage onSelect={setDetailId} />
          </div>
        ) : activeTab === 'commercial' ? (
          <div className="h-full overflow-y-auto">
            <CommercialPage onSelect={setDetailId} />
          </div>
        ) : activeTab === 'documents' ? (
          <div className="h-full overflow-y-auto">
            <DocumentsPage />
          </div>
        ) : activeTab === 'services' ? (
          <div className="h-full overflow-y-auto">
            <ServicesPage />
          </div>
        ) : activeTab === 'cabinet' ? (
          <div className="h-full overflow-y-auto">
            <CabinetPage />
          </div>
        ) : activeTab === 'favorites' ? (
          <div className="h-full overflow-y-auto">
            <FavoritesPage onSelect={setDetailId} />
          </div>
        ) : null}
      </div>

      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
