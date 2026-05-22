import { Globe } from 'lucide-react'
import { useStore } from '@/store'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'
import type { Lang } from '@/i18n'

const LANGS: { code: Lang; flag: string; tKey: 'lang_ru' | 'lang_en' | 'lang_he' | 'lang_fr' }[] = [
  { code: 'ru', flag: '🇷🇺', tKey: 'lang_ru' },
  { code: 'en', flag: '🇬🇧', tKey: 'lang_en' },
  { code: 'he', flag: '🇮🇱', tKey: 'lang_he' },
  { code: 'fr', flag: '🇫🇷', tKey: 'lang_fr' },
]

export function LangSelector() {
  const { lang, haptic } = useTelegram()
  const { langOverride, setLangOverride } = useStore()

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="w-4 h-4 text-gray-400" />
      <div className="flex gap-1">
        {LANGS.map(({ code, flag }) => (
          <button
            key={code}
            onClick={() => {
              haptic('light')
              setLangOverride(code === langOverride ? null : code)
            }}
            className={`w-7 h-7 text-base rounded-lg flex items-center justify-center transition-colors ${
              lang === code
                ? 'bg-blue-100 ring-2 ring-blue-400'
                : 'bg-gray-100 opacity-60 hover:opacity-100'
            }`}
            title={t(`lang_${code}` as Parameters<typeof t>[0], lang)}
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  )
}
