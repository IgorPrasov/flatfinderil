import { useEffect, useState } from 'react'
import { detectLang, isRTL } from '@/i18n'
import type { Lang } from '@/i18n'
import type { TelegramWebApp, TelegramUser } from '@/types'
import { useStore } from '@/store'

const tg = (): TelegramWebApp | undefined => window.Telegram?.WebApp

export function useTelegram() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const app = tg()
    if (app) {
      app.ready()
      app.expand()
      setReady(true)
    } else {
      setReady(true)
    }
  }, [])

  const user: TelegramUser | undefined = tg()?.initDataUnsafe?.user ?? {
    id: 0,
    first_name: 'Dev User',
    language_code: 'ru',
  }

  const { langOverride } = useStore()
  const lang: Lang = langOverride ?? detectLang(user?.language_code)
  const rtl = isRTL(lang)
  const isDark = tg()?.colorScheme === 'dark'

  function haptic(type: 'light' | 'medium' | 'heavy' = 'light') {
    tg()?.HapticFeedback?.impactOccurred(type)
  }

  function notify(type: 'success' | 'error' | 'warning') {
    tg()?.HapticFeedback?.notificationOccurred(type)
  }

  function showMainButton(text: string, onClick: () => void) {
    const btn = tg()?.MainButton
    if (!btn) return
    btn.setText(text)
    btn.show()
    btn.enable()
    btn.onClick(onClick)
    return () => btn.offClick(onClick)
  }

  function hideMainButton() { tg()?.MainButton?.hide() }
  function showBackButton(onClick: () => void) {
    const btn = tg()?.BackButton
    if (!btn) return
    btn.show()
    btn.onClick(onClick)
    return () => btn.offClick(onClick)
  }
  function hideBackButton() { tg()?.BackButton?.hide() }

  return {
    ready, user, lang, rtl, isDark, haptic, notify,
    showMainButton, hideMainButton, showBackButton, hideBackButton,
    initData: tg()?.initData ?? '',
    webapp: tg(),
  }
}
