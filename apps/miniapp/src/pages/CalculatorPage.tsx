import { useState, useMemo } from 'react'
import { Calculator } from 'lucide-react'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'
import type { MortgageParams, MortgageResult } from '@/types'

function calcMortgage({ price, down_payment, rate, years }: MortgageParams): MortgageResult {
  const loan = price - down_payment
  const monthly_rate = rate / 100 / 12
  const n = years * 12
  if (monthly_rate === 0) {
    return { monthly_payment: loan / n, total_payment: loan, total_interest: 0, loan_amount: loan }
  }
  const monthly_payment = (loan * monthly_rate * Math.pow(1 + monthly_rate, n)) / (Math.pow(1 + monthly_rate, n) - 1)
  const total_payment = monthly_payment * n
  return {
    monthly_payment: Math.round(monthly_payment),
    total_payment: Math.round(total_payment),
    total_interest: Math.round(total_payment - loan),
    loan_amount: loan,
  }
}

function fmt(n: number) {
  return '₪' + Math.round(n).toLocaleString()
}

export function CalculatorPage() {
  const { lang, rtl } = useTelegram()
  const [params, setParams] = useState<MortgageParams>({
    price: 2_000_000,
    down_payment: 400_000,
    rate: 5.0,
    years: 25,
  })

  const result = useMemo(() => calcMortgage(params), [params])
  const dpPercent = params.price > 0 ? Math.round((params.down_payment / params.price) * 100) : 0

  const set = (k: keyof MortgageParams) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setParams((p) => ({ ...p, [k]: +e.target.value }))

  return (
    <div className="p-4 pb-24 space-y-5" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2">
        <Calculator className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-bold text-gray-900">{t('calc_title', lang)}</h2>
      </div>

      <div className="bg-white rounded-2xl p-4 space-y-4 shadow-sm border border-gray-100">
        {/* Property price */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{t('calc_price', lang)}</span>
            <span className="font-semibold text-gray-900">{fmt(params.price)}</span>
          </div>
          <input type="range" min={500_000} max={10_000_000} step={50_000}
            value={params.price} onChange={set('price')} className="w-full accent-blue-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>₪500K</span><span>₪10M</span>
          </div>
        </div>

        {/* Down payment */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{t('calc_down', lang)}</span>
            <span className="font-semibold text-gray-900">{fmt(params.down_payment)} <span className="text-gray-400 text-xs">({dpPercent}%)</span></span>
          </div>
          <input type="range" min={0} max={params.price} step={10_000}
            value={params.down_payment} onChange={set('down_payment')} className="w-full accent-green-500" />
          {dpPercent < 25 && (
            <p className="text-xs text-orange-500 mt-1">{t('calc_warn_down', lang)}</p>
          )}
        </div>

        {/* Rate */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{t('calc_rate', lang)}</span>
            <span className="font-semibold text-gray-900">{params.rate.toFixed(1)}%</span>
          </div>
          <input type="range" min={1} max={12} step={0.1}
            value={params.rate} onChange={set('rate')} className="w-full accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>1%</span><span>12%</span>
          </div>
        </div>

        {/* Years */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{t('calc_years', lang)}</span>
            <span className="font-semibold text-gray-900">{params.years} {t('calc_years_unit', lang)}</span>
          </div>
          <input type="range" min={5} max={30} step={1}
            value={params.years} onChange={set('years')} className="w-full accent-orange-500" />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>5</span><span>30</span>
          </div>
        </div>
      </div>

      {/* Monthly payment */}
      <div className="bg-blue-500 rounded-2xl p-5 text-white">
        <p className="text-sm opacity-80 mb-1">{t('calc_monthly', lang)}</p>
        <p className="text-4xl font-bold">{fmt(result.monthly_payment)}</p>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">{t('calc_loan', lang)}</p>
          <p className="text-lg font-bold text-gray-900">{fmt(result.loan_amount)}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-1">{t('calc_overpay', lang)}</p>
          <p className="text-lg font-bold text-red-500">{fmt(result.total_interest)}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 col-span-2">
          <p className="text-xs text-gray-400 mb-1">{t('calc_total', lang)} {params.years} {t('calc_years_unit', lang)}</p>
          <p className="text-xl font-bold text-gray-900">{fmt(result.total_payment)}</p>
          <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${Math.round((result.loan_amount / result.total_payment) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-4 text-sm text-amber-800">
        <p className="font-semibold mb-1">{t('calc_tip_title', lang)}</p>
        <p>{t('calc_tip_text', lang)}</p>
      </div>
    </div>
  )
}
