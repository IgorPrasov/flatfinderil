import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft, Heart, Phone, Calendar,
  MapPin, AlertTriangle, Copy, TrendingUp,
  CheckCircle, ChevronLeft, ChevronRight, GitCompare
} from 'lucide-react'
import { getListing, getListingAI, bookViewing } from '@/api/listings'
import { useStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'

interface Props {
  listingId: number
  onBack: () => void
}

export function ListingDetailPage({ listingId, onBack }: Props) {
  const { favoriteIds, toggleFavorite, addToCompare, compareList } = useStore()
  const { user, haptic, notify, webapp, lang, rtl } = useTelegram()
  const [photoIdx, setPhotoIdx] = useState(0)
  const [showPhotos, setShowPhotos] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [bookDate, setBookDate] = useState('')
  const [bookMsg, setBookMsg] = useState('')
  const [bookLoading, setBookLoading] = useState(false)
  const [bookDone, setBookDone] = useState(false)

  const { data: listing, isLoading } = useQuery({
    queryKey: ['listing', listingId],
    queryFn: () => getListing(listingId),
  })

  const { data: ai } = useQuery({
    queryKey: ['listing-ai', listingId],
    queryFn: () => getListingAI(listingId),
    enabled: !!listing,
    staleTime: 5 * 60_000,
  })

  const isFav = favoriteIds.has(listingId)
  const inCompare = compareList.some((l) => l.id === listingId)
  const photos = listing?.photos?.filter((p) => p.length > 20) ?? []

  useEffect(() => { setPhotoIdx(0) }, [listingId])

  async function handleBookViewing() {
    if (!listing || !bookDate) return
    setBookLoading(true)
    try {
      await bookViewing({ listing_id: listingId, user_id: user?.id ?? 0, date: bookDate, message: bookMsg })
      setBookDone(true)
      notify('success')
    } catch {
      notify('error')
    } finally {
      setBookLoading(false)
    }
  }

  function handleContact() {
    haptic('medium')
    if (listing?.poster_username) webapp?.openTelegramLink(`https://t.me/${listing.poster_username}`)
    else if (listing?.poster_phone) webapp?.openLink(`tel:${listing.poster_phone}`)
  }

  if (isLoading || !listing) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const priceDiff = ai?.valuation && listing.price
    ? Math.round(((listing.price - ai.valuation) / ai.valuation) * 100)
    : null

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-24" dir={rtl ? 'rtl' : 'ltr'}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-50 shrink-0">
        <button onClick={onBack} className="flex items-center gap-1 text-brand font-medium text-sm py-1">
          <ArrowLeft className="w-4 h-4" />
          {t('back', lang)}
        </button>
        <button
          onClick={() => { haptic(); toggleFavorite(listingId) }}
          className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${
            isFav ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-300'
          }`}
        >
          <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Photos section */}
      {photos.length > 0 && (
        <div className="shrink-0">
          {!showPhotos ? (
            /* Show photos button */
            <button
              onClick={() => { haptic('light'); setShowPhotos(true) }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 border-b border-gray-100 text-blue-500 font-medium text-sm active:bg-gray-100"
            >
              <span className="text-lg">📷</span>
              {t('detail_show_photos', lang)} ({photos.length})
            </button>
          ) : (
            /* Full photo viewer */
            <div className="bg-black">
              {/* Photo — natural size, contained */}
              <div className="relative flex items-center justify-center"
                   style={{ minHeight: '240px', maxHeight: '70dvh' }}>
                <img
                  src={photos[photoIdx]}
                  alt=""
                  className="w-full max-h-[70dvh] object-contain"
                  style={{ display: 'block' }}
                />

                {/* Prev / Next */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setPhotoIdx((i) => Math.max(0, i - 1))}
                      disabled={photoIdx === 0}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center disabled:opacity-20"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setPhotoIdx((i) => Math.min(photos.length - 1, i + 1))}
                      disabled={photoIdx === photos.length - 1}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 text-white rounded-full flex items-center justify-center disabled:opacity-20"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Close */}
                <button
                  onClick={() => setShowPhotos(false)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Dots + counter */}
              {photos.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 py-2">
                  {photos.length <= 10
                    ? photos.map((_, i) => (
                        <button key={i} onClick={() => setPhotoIdx(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${i === photoIdx ? 'bg-white' : 'bg-white/30'}`}
                        />
                      ))
                    : <span className="text-white/70 text-xs">{photoIdx + 1} / {photos.length}</span>
                  }
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Price + badges */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <p className="text-2xl font-bold text-gray-900">
              ₪{listing.price?.toLocaleString()}
              {listing.deal_type === 'rent' && <span className="text-sm text-gray-400 font-normal">{t('card_per_month', lang)}</span>}
            </p>
            <div className="flex flex-col items-end gap-1">
              {listing.is_suspicious && <Badge color="red"><AlertTriangle className="w-3 h-3 mr-1" />{t('card_suspicious', lang)}</Badge>}
              {listing.is_duplicate && <Badge color="yellow"><Copy className="w-3 h-3 mr-1" />{t('card_duplicate', lang)}</Badge>}
              {!listing.is_suspicious && !listing.is_duplicate && <Badge color="green"><CheckCircle className="w-3 h-3 mr-1" />{t('detail_verified', lang)}</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {listing.address ?? `${listing.city}${listing.district ? `, ${listing.district}` : ''}`}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {listing.rooms != null && (
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{listing.rooms}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t('detail_rooms', lang)}</p>
            </div>
          )}
          {listing.area && (
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{listing.area}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t('detail_area', lang)}</p>
            </div>
          )}
          {listing.floor != null && (
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-gray-900">{listing.floor}{listing.floors_total ? `/${listing.floors_total}` : ''}</p>
              <p className="text-xs text-gray-500 mt-0.5">{t('detail_floor', lang)}</p>
            </div>
          )}
        </div>

        {/* AI Valuation */}
        {ai?.valuation && (
          <div className="bg-brand-light border border-brand/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-brand" />
              <p className="text-sm font-semibold text-brand">{t('detail_ai_title', lang)}</p>
            </div>
            <p className="text-lg font-bold text-brand-dark">
              ₪{ai.valuation.toLocaleString()}
              {listing.deal_type === 'rent' && <span className="text-sm font-normal text-brand">{t('card_per_month', lang)}</span>}
            </p>
            {priceDiff !== null && (
              <p className={`text-sm mt-1 ${priceDiff > 10 ? 'text-red-600' : priceDiff < -10 ? 'text-green-600' : 'text-gray-600'}`}>
                {priceDiff > 10
                  ? `⚠️ ${t('detail_overpriced', lang)} ${priceDiff}%`
                  : priceDiff < -10
                  ? `✅ ${t('detail_underpriced', lang)} ${Math.abs(priceDiff)}%`
                  : `✅ ${t('detail_fair', lang)}`}
              </p>
            )}
          </div>
        )}

        {/* Suspicious */}
        {listing.is_suspicious && listing.suspicion_reason && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="text-sm font-semibold text-red-700">{t('detail_suspicious_title', lang)}</p>
            </div>
            <p className="text-sm text-red-600">{listing.suspicion_reason}</p>
          </div>
        )}

        {/* Description */}
        {listing.description && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">{t('detail_desc', lang)}</p>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{listing.description}</p>
          </div>
        )}

        {/* Infrastructure */}
        {listing.infrastructure && listing.infrastructure.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">{t('detail_amenities', lang)}</p>
            <div className="flex flex-wrap gap-2">
              {listing.infrastructure.map((item) => (
                <span key={item} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{item}</span>
              ))}
            </div>
          </div>
        )}

        {/* Poster */}
        {(listing.poster_name || listing.poster_type) && (
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-xs text-gray-400 mb-1">{t('detail_seller', lang)}</p>
            <p className="font-medium text-gray-800">
              {listing.poster_name ?? (listing.poster_type === 'agent' ? t('card_agent', lang) : t('card_private', lang))}
            </p>
            {listing.poster_type && (
              <Badge color={listing.poster_type === 'private' ? 'green' : 'blue'} className="mt-1">
                {listing.poster_type === 'private' ? t('card_private', lang) : t('card_agent', lang)}
              </Badge>
            )}
          </div>
        )}

        {/* Compare */}
        <button
          onClick={() => { haptic(); listing && addToCompare(listing) }}
          className={`w-full py-2.5 rounded-xl text-sm font-medium border transition-colors ${
            inCompare ? 'border-brand bg-brand-light text-brand' : 'border-gray-200 text-gray-600'
          }`}
        >
          <GitCompare className="w-4 h-4 inline mr-2" />
          {inCompare ? t('detail_rm_compare', lang) : t('detail_add_compare', lang)}
        </button>
      </div>

      {/* Action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom flex gap-3">
        <Button variant="secondary" onClick={() => setShowBooking(true)} className="flex-1">
          <Calendar className="w-4 h-4" />
          {t('detail_booking', lang)}
        </Button>
        <Button onClick={handleContact} className="flex-1">
          <Phone className="w-4 h-4" />
          {t('detail_contact', lang)}
        </Button>
      </div>

      {/* Booking modal */}
      {showBooking && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowBooking(false)} />
          <div className="relative w-full bg-white rounded-t-3xl p-5" dir={rtl ? 'rtl' : 'ltr'}>
            <h3 className="text-lg font-semibold mb-4">{t('detail_booking_title', lang)}</h3>
            {bookDone ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-medium text-gray-800">{t('detail_sent', lang)}</p>
                <p className="text-sm text-gray-500 mt-1">{t('detail_owner_reply', lang)}</p>
                <Button className="mt-4 w-full" onClick={() => { setShowBooking(false); setBookDone(false) }}>
                  {t('detail_done', lang)}
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="text-sm text-gray-500 mb-1 block">{t('detail_date', lang)}</label>
                  <input
                    type="datetime-local" value={bookDate}
                    onChange={(e) => setBookDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-500 mb-1 block">{t('detail_message', lang)}</label>
                  <textarea
                    value={bookMsg} onChange={(e) => setBookMsg(e.target.value)}
                    rows={2} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none"
                  />
                </div>
                <Button onClick={handleBookViewing} loading={bookLoading} disabled={!bookDate} size="lg">
                  {t('detail_send', lang)}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
