import { api } from './client'
import type { Listing, SearchFilters } from '@flatfinderil/types'

export async function searchListings(
  filters: SearchFilters,
  offset = 0,
  limit = 50,
): Promise<{ listings: Listing[]; total: number }> {
  const { data } = await api.get('/api/miniapp/listings', {
    params: { ...filters, offset, limit },
  })
  return {
    listings: data.listings ?? [],
    total: data.total ?? (data.listings?.length ?? 0),
  }
}

export async function getListing(id: number): Promise<Listing> {
  const { data } = await api.get(`/api/miniapp/listings/${id}`)
  return data
}

export async function getListingAI(id: number): Promise<{
  valuation?: number
  is_duplicate?: boolean
  is_suspicious?: boolean
  suspicion_reason?: string
  score?: number
}> {
  const { data } = await api.get(`/api/miniapp/listings/${id}/ai`)
  return data
}

export async function getFavorites(userId: number): Promise<Listing[]> {
  const { data } = await api.get('/api/miniapp/favorites', { params: { user_id: userId } })
  return data.listings ?? []
}

export async function toggleFavorite(userId: number, listingId: number): Promise<{ saved: boolean }> {
  const { data } = await api.post('/api/miniapp/favorites/toggle', { user_id: userId, listing_id: listingId })
  return data
}

export async function getPriceStats(city?: string, deal?: string) {
  const { data } = await api.get('/api/price-stats', { params: { city, deal: deal ?? 'rent', days: 30 } })
  return data
}

export async function bookViewing(params: {
  listing_id: number
  user_id: number
  date: string
  message?: string
}): Promise<{ ok: boolean }> {
  const { data } = await api.post('/api/miniapp/viewing', params)
  return data
}

export async function aiSearch(query: string, lang = 'ru'): Promise<{ filters: SearchFilters; explanation: string }> {
  const { data } = await api.post('/api/miniapp/ai-search', { query, lang })
  return data
}
