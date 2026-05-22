import { Heart, MapPin, AlertTriangle, Copy, BedDouble, Maximize2 } from 'lucide-react'
import { clsx } from 'clsx'
import { useStore } from '@/store'
import { useTelegram } from '@/hooks/useTelegram'
import { Badge } from '@/components/ui/Badge'
import { t } from '@/i18n'
import type { Listing } from '@/types'

interface Props {
  listing: Listing
  onClick?: () => void
  compact?: boolean
}

export function ListingCard({ listing, onClick, compact }: Props) {
  const { favoriteIds, toggleFavorite, addToCompare, compareList } = useStore()
  const { lang, haptic } = useTelegram()
  const isFav = favoriteIds.has(listing.id)
  const inCompare = compareList.some((l) => l.id === listing.id)

  const photoCount = listing.photos?.filter((p) => p.length > 20).length ?? 0

  const price = listing.price
    ? listing.deal_type === 'rent'
      ? `₪${listing.price.toLocaleString()}${t('card_per_month', lang)}`
      : `₪${listing.price.toLocaleString()}`
    : '—'

  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer active:scale-[0.98] transition-transform overflow-hidden',
        compact ? 'p-3' : 'p-4'
      )}
      onClick={onClick}
    >
      {/* Top row: price + fav */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={clsx('font-bold text-gray-900 leading-tight', compact ? 'text-base' : 'text-lg')}>
            {price}
          </p>
          {listing.deal_type && (
            <span className={clsx(
              'inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full font-medium',
              listing.deal_type === 'rent'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-green-50 text-green-600'
            )}>
              {listing.deal_type === 'rent' ? t('filters_rent', lang) : t('filters_buy', lang)}
            </span>
          )}
        </div>

        <button
          className={clsx(
            'shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors',
            isFav
              ? 'bg-red-500 border-red-500 text-white'
              : 'bg-white border-gray-200 text-gray-400'
          )}
          onClick={(e) => { e.stopPropagation(); haptic(); toggleFavorite(listing.id) }}
        >
          <Heart className="w-4 h-4" fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
        <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
        <span className="truncate">
          {listing.city}{listing.district ? `, ${listing.district}` : ''}
          {listing.address ? ` · ${listing.address}` : ''}
        </span>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
        {listing.rooms != null && (
          <span className="flex items-center gap-1">
            <BedDouble className="w-3.5 h-3.5 text-gray-400" />
            {listing.rooms} {t('card_rooms', lang)}
          </span>
        )}
        {listing.area != null && (
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
            {listing.area} м²
          </span>
        )}
        {listing.floor != null && (
          <span className="text-gray-400 text-xs">
            {listing.floor}{listing.floors_total ? `/${listing.floors_total}` : ''} {t('card_floor', lang)}
          </span>
        )}
      </div>

      {/* Badges + photo count */}
      <div className="flex items-center gap-1.5 mt-2 flex-wrap">
        {listing.is_suspicious && (
          <Badge color="red">
            <AlertTriangle className="w-3 h-3 mr-1" />
            {t('card_suspicious', lang)}
          </Badge>
        )}
        {listing.is_duplicate && (
          <Badge color="yellow">
            <Copy className="w-3 h-3 mr-1" />
            {t('card_duplicate', lang)}
          </Badge>
        )}
        {listing.poster_type === 'private' && <Badge color="green">{t('card_private', lang)}</Badge>}
        {listing.poster_type === 'agent'   && <Badge color="blue">{t('card_agent', lang)}</Badge>}
        {photoCount > 0 && (
          <span className="text-xs text-gray-400 ml-auto">
            📷 {photoCount}
          </span>
        )}
        {listing.ai_score != null && (
          <span className="text-xs text-brand font-medium">AI {listing.ai_score}</span>
        )}
      </div>

      {/* Compare button — only in list mode */}
      {!compact && (
        <button
          className={clsx(
            'mt-3 w-full py-1.5 rounded-xl text-xs font-medium border transition-colors',
            inCompare
              ? 'border-brand bg-brand-light text-brand'
              : 'border-gray-200 text-gray-400 hover:text-gray-600'
          )}
          onClick={(e) => { e.stopPropagation(); addToCompare(listing) }}
        >
          {inCompare ? t('card_compare_in', lang) : t('card_compare_add', lang)}
        </button>
      )}
    </div>
  )
}
