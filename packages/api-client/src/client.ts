import axios from 'axios'

// Railway bot-gateway API base
const BASE = import.meta.env.VITE_API_URL ?? 'https://flatfinderil-bot-production.up.railway.app'

/**
 * Serialize params so arrays are repeated without brackets:
 *   cities=Тель-Авив&cities=Хайфа   (not cities[]=...)
 * Python's parse_qs handles repeated keys correctly.
 */
function serializeParams(params: Record<string, unknown>): string {
  const parts: string[] = []
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value)) {
      for (const item of value) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`)
      }
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    }
  }
  return parts.join('&')
}

export const api = axios.create({
  baseURL: BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: { serialize: serializeParams },
})

// Attach Telegram initData for auth on every request
api.interceptors.request.use((config) => {
  const initData = window.Telegram?.WebApp?.initData
  if (initData) {
    config.headers['X-Telegram-Init-Data'] = initData
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error('[API]', err?.response?.status, err?.config?.url, err?.message)
    return Promise.reject(err)
  }
)
