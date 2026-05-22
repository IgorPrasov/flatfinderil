import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Listing, SearchFilters } from '@/types'
import type { Lang } from '@/i18n'

interface AppState {
  // Language override (persisted)
  langOverride: Lang | null
  setLangOverride: (l: Lang | null) => void

  // Search
  filters: SearchFilters
  setFilters: (f: Partial<SearchFilters>) => void
  resetFilters: () => void

  // Compare
  compareList: Listing[]
  addToCompare: (l: Listing) => void
  removeFromCompare: (id: number) => void
  clearCompare: () => void

  // Favorites (local cache)
  favoriteIds: Set<number>
  toggleFavorite: (id: number) => void

  // Active tab
  activeTab: 'map' | 'search' | 'commercial' | 'documents' | 'services' | 'cabinet'
  setActiveTab: (t: AppState['activeTab']) => void
}

const defaultFilters: SearchFilters = {}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      langOverride: null,
      setLangOverride: (l) => set({ langOverride: l }),

      filters: defaultFilters,
      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
      resetFilters: () => set({ filters: defaultFilters }),

      compareList: [],
      addToCompare: (l) => {
        const cur = get().compareList
        if (cur.length >= 3 || cur.some((x) => x.id === l.id)) return
        set({ compareList: [...cur, l] })
      },
      removeFromCompare: (id) =>
        set((s) => ({ compareList: s.compareList.filter((l) => l.id !== id) })),
      clearCompare: () => set({ compareList: [] }),

      favoriteIds: new Set(),
      toggleFavorite: (id) =>
        set((s) => {
          const next = new Set(s.favoriteIds)
          next.has(id) ? next.delete(id) : next.add(id)
          return { favoriteIds: next }
        }),

      activeTab: 'map',
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'flatfinder-store',
      partialize: (s) => ({ langOverride: s.langOverride }),
    }
  )
)
