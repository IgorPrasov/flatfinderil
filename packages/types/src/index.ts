// ── Listing ────────────────────────────────────────────────────────────────
export interface Listing {
  id: number
  title?: string
  description?: string
  city: string
  district?: string
  address?: string
  deal_type: 'rent' | 'buy'
  property_type: 'apartment' | 'house' | 'studio' | 'commercial' | 'room'
  rooms?: number
  floor?: number
  floors_total?: number
  area?: number            // m²
  price: number            // ILS/mo or total
  currency?: string
  photos?: string[]
  lat?: number
  lng?: number
  source?: string
  date_added?: string
  views?: number
  active?: boolean
  poster_type?: 'private' | 'agent' | 'unknown'
  poster_name?: string
  poster_phone?: string
  poster_username?: string
  parking?: number
  pool?: boolean
  infrastructure?: string[]
  // AI-enriched fields
  ai_score?: number        // 0-100 quality score
  is_duplicate?: boolean
  is_suspicious?: boolean
  suspicion_reason?: string
  ai_valuation?: number    // estimated fair price
}

// ── Search filters ─────────────────────────────────────────────────────────
export interface SearchFilters {
  deal_type?: 'rent' | 'buy'
  property_types?: string[]
  cities?: string[]
  city?: string
  rooms_min?: number
  rooms_max?: number
  price_min?: number
  price_max?: number
  with_photos?: boolean
  parking_min?: number
  pool?: boolean
  infrastructure?: string[]
}

// ── Service provider ───────────────────────────────────────────────────────
export interface ServiceProvider {
  id: number
  service_type: 'moving' | 'cleaning' | 'packing' | 'repairs'
  name: string
  phone?: string
  city?: string
  region?: string
  description?: string
  price?: number
  subscription_ils?: number
  active?: boolean
  views?: number
}

// ── Mortgage calc ──────────────────────────────────────────────────────────
export interface MortgageParams {
  price: number         // property price ILS
  down_payment: number  // ILS
  rate: number          // annual % (e.g. 4.5)
  years: number
}

export interface MortgageResult {
  monthly_payment: number
  total_payment: number
  total_interest: number
  loan_amount: number
}

// ── Telegram WebApp ─────────────────────────────────────────────────────────
export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
}

export interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: TelegramUser
    start_param?: string
    auth_date: number
    hash: string
  }
  version: string
  colorScheme: 'light' | 'dark'
  themeParams: Record<string, string>
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    setText(text: string): void
    show(): void
    hide(): void
    enable(): void
    disable(): void
    onClick(fn: () => void): void
    offClick(fn: () => void): void
  }
  BackButton: {
    isVisible: boolean
    show(): void
    hide(): void
    onClick(fn: () => void): void
    offClick(fn: () => void): void
  }
  HapticFeedback: {
    impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void
    notificationOccurred(type: 'error' | 'success' | 'warning'): void
    selectionChanged(): void
  }
  expand(): void
  close(): void
  ready(): void
  sendData(data: string): void
  openTelegramLink(url: string): void
  openLink(url: string, options?: { try_instant_view?: boolean }): void
}

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp }
  }
}
