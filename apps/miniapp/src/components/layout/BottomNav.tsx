import { Search, Map, Building2, FileText, Wrench, User } from 'lucide-react'
import { clsx } from 'clsx'
import { useStore } from '@/store'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'

const TABS = [
  { id: 'map',        icon: Map,       key: 'nav_map'        },
  { id: 'search',     icon: Search,    key: 'nav_search'     },
  { id: 'commercial', icon: Building2, key: 'nav_commercial' },
  { id: 'documents',  icon: FileText,  key: 'nav_documents'  },
  { id: 'services',   icon: Wrench,    key: 'nav_services'   },
  { id: 'cabinet',    icon: User,      key: 'nav_cabinet'    },
] as const

export function BottomNav() {
  const { activeTab, setActiveTab } = useStore()
  const { lang, haptic, rtl } = useTelegram()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-bottom z-40"
      dir={rtl ? 'rtl' : 'ltr'}
    >
      <div className="flex items-stretch">
        {TABS.map(({ id, icon: Icon, key }) => (
          <button
            key={id}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors',
              activeTab === id ? 'text-brand' : 'text-gray-400'
            )}
            onClick={() => {
              haptic('light')
              setActiveTab(id)
            }}
          >
            <Icon
              className={clsx('w-5 h-5', activeTab === id && 'stroke-2')}
              fill="none"
            />
            <span>{t(key, lang)}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
