import { useState } from 'react'
import { LogIn, Star, Bell, MessageSquare, Calculator, ChevronRight, ChevronDown } from 'lucide-react'
import { useTelegram } from '@/hooks/useTelegram'
import { Button } from '@/components/ui/Button'
import { LangSelector } from '@/components/ui/LangSelector'
import { CalculatorPage } from '@/pages/CalculatorPage'
import { t } from '@/i18n'

export function CabinetPage() {
  const { user, webapp, lang, rtl } = useTelegram()
  const [showCalc, setShowCalc] = useState(false)
  const isLoggedIn = user && user.id !== 0

  function openBot() {
    webapp?.openTelegramLink('https://t.me/FlatFinderILBot')
  }

  const MENU = [
    { icon: Star,         labelKey: 'cabinet_subscriptions', subKey: 'cabinet_sub_sub',    action: openBot },
    { icon: Bell,         labelKey: 'cabinet_notifications', subKey: 'cabinet_notif_sub',  action: openBot },
    { icon: MessageSquare,labelKey: 'cabinet_listings',      subKey: 'cabinet_listings_sub', action: openBot },
    { icon: Calculator,   labelKey: 'nav_calculator',        subKey: 'calc_title',          action: () => setShowCalc((v) => !v) },
  ] as const

  return (
    <div className="p-4 pb-24" dir={rtl ? 'rtl' : 'ltr'}>
      {/* Profile card */}
      <div className="bg-gradient-to-br from-brand to-brand-dark rounded-2xl p-5 text-white mb-5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
            {isLoggedIn ? user.first_name[0].toUpperCase() : '?'}
          </div>
          <div>
            {isLoggedIn ? (
              <>
                <p className="font-bold text-lg">{user.first_name} {user.last_name ?? ''}</p>
                {user.username && <p className="text-white/70 text-sm">@{user.username}</p>}
                <p className="text-white/60 text-xs mt-0.5">ID: {user.id}</p>
              </>
            ) : (
              <>
                <p className="font-bold">{t('cabinet_guest', lang)}</p>
                <p className="text-white/70 text-sm">{t('cabinet_login', lang)}</p>
              </>
            )}
          </div>
        </div>
        {!isLoggedIn && (
          <Button
            variant="secondary"
            className="mt-4 w-full bg-white text-brand hover:bg-brand-light"
            onClick={openBot}
          >
            <LogIn className="w-4 h-4" />
            {t('cabinet_open_bot', lang)}
          </Button>
        )}
      </div>

      {/* Menu */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4">
        {MENU.map(({ icon: Icon, labelKey, subKey, action }, i) => (
          <div key={labelKey}>
            <button
              onClick={action}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors ${i > 0 ? 'border-t border-gray-50' : ''}`}
            >
              <div className="w-9 h-9 bg-brand-light rounded-xl flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{t(labelKey, lang)}</p>
                <p className="text-xs text-gray-400">{t(subKey, lang)}</p>
              </div>
              {labelKey === 'nav_calculator'
                ? (showCalc
                    ? <ChevronDown className="w-4 h-4 text-brand shrink-0" />
                    : <ChevronRight className={`w-4 h-4 text-gray-300 shrink-0 ${rtl ? 'rotate-180' : ''}`} />)
                : <ChevronRight className={`w-4 h-4 text-gray-300 shrink-0 ${rtl ? 'rotate-180' : ''}`} />}
            </button>
            {labelKey === 'nav_calculator' && showCalc && (
              <div className="border-t border-gray-50 bg-gray-50/50 px-2 py-2">
                <CalculatorPage />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Language selector */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">{t('lang_title', lang)}</p>
        <LangSelector />
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 text-center">
        <img src="/logo.png" alt="FlatFinder IL" className="w-12 h-12 rounded-2xl mx-auto mb-2" />
        <p className="text-sm font-bold text-brand">FlatFinder IL</p>
        <p className="text-xs text-gray-400 mt-0.5">{t('cabinet_about', lang)}</p>
        <button onClick={openBot} className="mt-3 text-xs text-brand font-medium">
          @FlatFinderILBot
        </button>
      </div>
    </div>
  )
}
