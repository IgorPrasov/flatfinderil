import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Phone, MessageCircle, MapPin, Star } from 'lucide-react'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'
import { api } from '@/api/client'
import type { ServiceProvider } from '@/types'

const CATEGORIES = [
  { key: 'all',      tKey: 'svc_all'      },
  { key: 'moving',   tKey: 'svc_moving'   },
  { key: 'cleaning', tKey: 'svc_cleaning' },
  { key: 'packing',  tKey: 'svc_packing'  },
  { key: 'repairs',  tKey: 'svc_repairs'  },
] as const

async function fetchServices(type?: string): Promise<ServiceProvider[]> {
  const params = type && type !== 'all' ? `?type=${type}` : ''
  const { data } = await api.get(`/api/miniapp/services${params}`)
  return data.services ?? data ?? []
}

const SVC_ICONS: Record<string, string> = {
  moving: '🚚',
  cleaning: '🧹',
  packing: '📦',
  repairs: '🔧',
}

export function ServicesPage() {
  const { lang, rtl, webapp, haptic } = useTelegram()
  const [category, setCategory] = useState<string>('all')

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services', category],
    queryFn: () => fetchServices(category),
    staleTime: 60_000,
  })

  function handleContact(svc: ServiceProvider) {
    haptic('medium')
    if (svc.phone) {
      webapp?.openLink(`tel:${svc.phone}`)
    }
  }

  function handleTelegram(svc: ServiceProvider) {
    haptic('medium')
    // If poster_username exists open telegram
    const anyProvider = svc as unknown as Record<string, unknown>
    const username = anyProvider.telegram_username as string | undefined
    if (username) {
      webapp?.openTelegramLink(`https://t.me/${username}`)
    }
  }

  return (
    <div className="flex flex-col h-full" dir={rtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-white sticky top-0 z-10 border-b border-gray-50">
        <h1 className="text-xl font-bold text-gray-900 mb-3">{t('svc_title', lang)}</h1>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map(({ key, tKey }) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                category === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {t(tKey, lang)}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-20 p-4">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm text-center">{t('svc_empty', lang)}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((svc) => (
              <ServiceCard
                key={svc.id}
                svc={svc}
                lang={lang}
                onCall={() => handleContact(svc)}
                onTelegram={() => handleTelegram(svc)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ServiceCard({
  svc, lang, onCall, onTelegram,
}: {
  svc: ServiceProvider
  lang: ReturnType<typeof useTelegram>['lang']
  onCall: () => void
  onTelegram: () => void
}) {
  const icon = SVC_ICONS[svc.service_type] ?? '🔧'
  const anyProvider = svc as unknown as Record<string, unknown>

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
          {icon}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900 truncate">{svc.name}</p>
            {anyProvider.rating != null && (
              <span className="flex items-center gap-0.5 text-xs text-amber-500">
                <Star className="w-3 h-3 fill-current" />
                {String(anyProvider.rating as number)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />
            <span>{svc.city ?? svc.region ?? t('svc_region_all', lang)}</span>
            {(svc.views ?? 0) > 0 && (
              <span className="ml-1">· {svc.views} {t('svc_views', lang)}</span>
            )}
          </div>

          {svc.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{svc.description}</p>
          )}

          {/* Pricing */}
          <div className="flex gap-3 mt-2 text-xs">
            {svc.subscription_ils && (
              <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                ₪{svc.subscription_ils}{t('svc_per_month', lang)}
              </span>
            )}
            {svc.price && (
              <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">
                ₪{svc.price}{t('svc_per_lead', lang)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3">
        {svc.phone && (
          <button
            onClick={onCall}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium"
          >
            <Phone className="w-3.5 h-3.5" />
            {t('svc_call', lang)}
          </button>
        )}
        {(anyProvider.telegram_username as string | undefined) && (
          <button
            onClick={onTelegram}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t('svc_write', lang)}
          </button>
        )}
        {!svc.phone && !(anyProvider.telegram_username) && (
          <div className="flex-1 py-2 text-center text-sm text-gray-400">
            {t('svc_contact', lang)}
          </div>
        )}
      </div>
    </div>
  )
}
