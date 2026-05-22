import { useState } from 'react'
import { Copy, Check, ChevronDown, ChevronUp, AlertTriangle, Wand2 } from 'lucide-react'
import { useTelegram } from '@/hooks/useTelegram'
import { t } from '@/i18n'

// ── Contract templates ───────────────────────────────────────────────────────

const RENT_TEMPLATE = `הסכם שכירות מגורים
(טופס מקובל)

תאריך: _____ לחודש ____________ שנת _____

הצדדים:
המשכיר: ___________________________________
מספר תעודת זהות: ___________________________

השוכר: ____________________________________
מספר תעודת זהות: ___________________________

מושא ההסכם:
המשכיר משכיר לשוכר את הנכס המצוי בכתובת:
_________________________________________________
שטח הנכס: _______ מ"ר, מספר חדרים: _____________

תקופת השכירות:
מתאריך ___/___/______ ועד ___/___/______

דמי שכירות ותשלומים:
דמי השכירות החודשיים הינם _________ ₪.
התשלום ישולם עד ה-_____ לכל חודש.
אמצעי תשלום: _________________________________

פיקדון:
השוכר ישלם פיקדון בסך _________ ₪
(המקביל ל-_____ חודשי שכירות) תוך _____ ימים מחתימת ההסכם.
הפיקדון יוחזר תוך 60 יום מסיום תקופת השכירות, בכפוף לאין נזקים.

חלוקת תשלומים שוטפים:
ארנונה:          □ משכיר  □ שוכר
חשמל:            □ משכיר  □ שוכר
מים:             □ משכיר  □ שוכר
גז:              □ משכיר  □ שוכר
ועד בית:         □ משכיר  □ שוכר

חובות הצדדים:
המשכיר מתחייב:
1. למסור את הנכס במצב תקין וראוי למגורים.
2. לבצע תיקונים מהותיים הנובעים מבלאי סביר.
3. שלא להפריע לשוכר בשימוש הסביר בנכס.

השוכר מתחייב:
1. להשתמש בנכס למגורים בלבד.
2. לשמור על הנכס במצב תקין ונקי.
3. שלא לבצע שינויים מבניים ללא אישור המשכיר בכתב.
4. שלא להשכיר את הנכס בשכירות משנה ללא הסכמת המשכיר.
5. לשלם דמי שכירות במועד.

ביטול מוקדם:
השוכר רשאי לסיים את ההסכם לפני מועד תפוגתו בהודעה מוקדמת של _____ חודשים בכתב.
בביטול מוקדם מיוזמת השוכר ללא סיבה מוצדקת — הפיקדון לא יוחזר (או לפי הסכמת הצדדים).

תנאים נוספים:
בעלי חיים: □ מותרים  □ אסורים
עישון בנכס: □ מותר  □ אסור
_________________________________________________
_________________________________________________

הסכם זה נערך בשני עותקים, עותק אחד לכל צד.

חתימות:
המשכיר: _________________ תאריך: ___________
השוכר:  _________________ תאריך: ___________`

const PRELIMINARY_BUY_TEMPLATE = `זיכרון דברים לרכישת מקרקעין

תאריך: _____ לחודש ____________ שנת _____

הצדדים:
המוכר: _______________________________________
מספר תעודת זהות: _____________________________

הקונה: _______________________________________
מספר תעודת זהות: _____________________________

הנכס נשוא העסקה:
דירה/נכס בכתובת: _____________________________
_____________________________________________
שטח: _______ מ"ר, קומה: _____, חדרים: ________
גוש: ____________ חלקה: _____ תת-חלקה: _______

מחיר העסקה:
הצדדים הסכימו על מחיר של: ___________ ₪
(___________________________________________ שקלים)

לוח תשלומים:
מקדמה בחתימה: ________________________________ ₪
תשלום בחתימת חוזה מכר: _______________________ ₪
יתרה במסירת החזקה: ___________________________ ₪

מועדים:
חתימת חוזה מכר מלא לא יאוחר מ: _______________
מסירת החזקה ומפתחות: _________________________

תנאים:
1. הנכס נמכר ללא שעבודים, עיקולים או זכויות צד ג' (עסקה נקייה).
2. המוכר מתחייב להסדיר כל חוב ארנונה, ועד בית ותשלומים שוטפים עד מועד המסירה.
3. הצדדים מתחייבים להיעזר בעורך דין לצורך עריכת חוזה המכר.
4. חלוקת הוצאות העסקה: ________________________

מקדמה:
סירוב הקונה לאחר חתימה — המקדמה תישאר בידי המוכר.
סירוב המוכר לאחר חתימה — המוכר יחזיר את המקדמה בכפל.

מסמך זה נערך בשני עותקים.
הצדדים מבינים כי מסמך זה אינו מחליף חוזה מכר מקרקעין חתום כדין.

המוכר:   _________________ תאריך: ___________
הקונה:   _________________ תאריך: ___________`

const BUY_CONTRACT_TEMPLATE = `חוזה מכר מקרקעין
(טופס מקוצר)

תאריך: _____ לחודש ____________ שנת _____

המוכר: _______________________________________
תעודת זהות: __________________________________
כתובת: _______________________________________

הקונה: _______________________________________
תעודת זהות: __________________________________
כתובת: _______________________________________

מושא החוזה:
המוכר מוכר לקונה את זכויותיו במקרקעין המצויים בכתובת:
_________________________________________________
שטח: _______ מ"ר
גוש: ____________ חלקה: _____________________

מחיר ולוח תשלומים:
מחיר המכירה: __________________________________₪
מקדמה (10%): _________________________________₪ — בחתימה
יתרה: ________________________________________₪ — ברישום הטאבו

מצב הנכס:
הנכס מועבר במצב: □ "כמות שהוא"  □ גמר מלא  □ כולל ריהוט

הצהרות המוכר:
1. המוכר הוא הבעלים הרשום החוקי של הנכס.
2. הנכס חופשי מכל שעבוד, עיקול וזכות צד שלישי.
3. אין חובות ארנונה, ועד בית או תשלומים שוטפים.
4. קיימים כל היתרי הבנייה הדרושים.

מיסים ותשלומים:
מס רכישה: ישולם על ידי הקונה.
מס שבח: ישולם על ידי המוכר.
שכר טרחת עורך דין: לפי הסכם בין הצדדים.

מסירת החזקה:
מועד מסירת המפתחות: ___________________________
בעת המסירה ייחתם פרוטוקול מסירה.

ביטוח:
הקונה מתחייב לבטח את הנכס מרגע קבלת החזקה.

הפרת החוזה:
הפרה יסודית תזכה את הצד הנפגע בפיצויים מוסכמים בסך _________ ₪
ובזכות לבטל את החוזה.

בוררות:
כל מחלוקת בקשר לחוזה זה תוכרע על ידי בורר מוסכם,
בהתאם לחוק הבוררות תשכ"ח-1968.

ייפוי כוח:
המוכר מסמיך את עורך הדין _____________ לבצע את כל הפעולות הנדרשות
לרישום הזכויות על שם הקונה בלשכת רישום המקרקעין (ייפוי כוח בלתי חוזר).

המוכר:   _________________ תאריך: ___________
הקונה:   _________________ תאריך: ___________`

// ── Contract templates list ──────────────────────────────────────────────────

const TEMPLATES = [
  {
    id: 'rent',
    icon: '🏠',
    title: 'הסכם שכירות',
    subtitle: 'שכירות מגורים לטווח ארוך (טופס מקובל)',
    text: RENT_TEMPLATE,
    color: 'bg-blue-50 border-blue-100',
    badge: 'שכירות',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'preliminary',
    icon: '📝',
    title: 'זיכרון דברים',
    subtitle: 'הסכם עקרונות לרכישת מקרקעין',
    text: PRELIMINARY_BUY_TEMPLATE,
    color: 'bg-amber-50 border-amber-100',
    badge: 'קנייה',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'buy',
    icon: '🔑',
    title: 'חוזה מכר',
    subtitle: 'חוזה מכר מקרקעין (טופס מקוצר)',
    text: BUY_CONTRACT_TEMPLATE,
    color: 'bg-green-50 border-green-100',
    badge: 'קנייה',
    badgeColor: 'bg-green-100 text-green-700',
  },
]

// ── Contract builder ─────────────────────────────────────────────────────────

interface BuilderState {
  type: 'rent' | 'buy'
  party1: string   // landlord/seller
  party2: string   // tenant/buyer
  address: string
  area: string
  price: string
  deposit: string
  dateStart: string
  dateEnd: string
}

const EMPTY_BUILDER: BuilderState = {
  type: 'rent',
  party1: '', party2: '',
  address: '', area: '',
  price: '', deposit: '',
  dateStart: '', dateEnd: '',
}

function buildContract(s: BuilderState): string {
  const today = new Date().toLocaleDateString('he-IL')
  if (s.type === 'rent') {
    return `הסכם שכירות מגורים

תאריך: ${today}

המשכיר: ${s.party1 || '_______________'}
השוכר:  ${s.party2 || '_______________'}

הנכס: ${s.address || '_______________'}
שטח: ${s.area || '___'} מ"ר

תקופה: מ-${s.dateStart || '___'} עד ${s.dateEnd || '___'}

דמי שכירות: ${s.price ? `${parseInt(s.price).toLocaleString()} ₪ לחודש` : '___ ₪ לחודש'}
פיקדון: ${s.deposit ? `${parseInt(s.deposit).toLocaleString()} ₪` : '___ ₪'}

תנאים:
1. השוכר מתחייב לשלם דמי שכירות עד ה-5 לכל חודש.
2. הפיקדון יוחזר תוך 60 יום מסיום תקופת השכירות.
3. תשלומים שוטפים (חשמל, מים, ארנונה) ישולמו על ידי השוכר.
4. אין להשכיר בשכירות משנה ללא אישור בכתב מהמשכיר.
5. ביטול מוקדם — הודעה 2 חודשים מראש.

המשכיר: _________________ תאריך: ______
השוכר:  _________________ תאריך: ______`
  } else {
    return `זיכרון דברים לרכישת מקרקעין

תאריך: ${today}

המוכר:  ${s.party1 || '_______________'}
הקונה:  ${s.party2 || '_______________'}

הנכס: ${s.address || '_______________'}
שטח: ${s.area || '___'} מ"ר

מחיר העסקה: ${s.price ? `${parseInt(s.price).toLocaleString()} ₪` : '___ ₪'}
מקדמה (10%): ${s.price ? `${Math.round(parseInt(s.price) * 0.1).toLocaleString()} ₪` : '___ ₪'}

מועדים:
חתימת חוזה מכר עד: ${s.dateEnd || '___'}
מסירת מפתחות: ${s.dateEnd || '___'}

תנאים:
1. הנכס נמכר ללא שעבודים ועיקולים.
2. סירוב הקונה — המקדמה תישאר בידי המוכר.
3. סירוב המוכר — המוכר יחזיר את המקדמה בכפל.
4. הצדדים מתחייבים לערוך חוזה מכר מלא בליווי עורך דין.

המוכר:  _________________ תאריך: ______
הקונה:  _________________ תאריך: ______`
  }
}

// ── Main Component ────────────────────────────────────────────────────────────

export function DocumentsPage() {
  const { lang, haptic } = useTelegram()
  const [activeTab, setActiveTab] = useState<'templates' | 'builder'>('templates')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [builder, setBuilder] = useState<BuilderState>(EMPTY_BUILDER)
  const [generated, setGenerated] = useState('')
  const [copiedGen, setCopiedGen] = useState(false)

  function copyText(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      haptic('medium')
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  function generate() {
    haptic('medium')
    setGenerated(buildContract(builder))
  }

  function set(k: keyof BuilderState, v: string) {
    setBuilder((b) => ({ ...b, [k]: v }))
    setGenerated('')
  }

  return (
    <div className="flex flex-col h-full" dir="rtl">
      {/* Header */}
      <div className="px-4 pt-4 pb-0 bg-white sticky top-0 z-10 border-b border-gray-50">
        <h1 className="text-lg font-bold text-brand mb-3">{t('docs_title', lang)}</h1>

        {/* Tab switcher */}
        <div className="flex gap-0 bg-gray-100 rounded-xl p-1 mb-3">
          {(['templates', 'builder'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { haptic('light'); setActiveTab(tab) }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
              }`}
            >
              {tab === 'templates' ? `📋 ${t('docs_tab_templates', lang)}` : `✨ ${t('docs_tab_builder', lang)}`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">

        {/* ── Templates tab ── */}
        {activeTab === 'templates' && (
          <div className="p-4 space-y-3">
            {TEMPLATES.map((tpl) => (
              <div key={tpl.id} className={`rounded-2xl border ${tpl.color} overflow-hidden`}>
                {/* Card header */}
                <button
                  className="w-full flex items-center gap-3 p-4 text-right"
                  onClick={() => { haptic('light'); setExpandedId(expandedId === tpl.id ? null : tpl.id) }}
                >
                  <span className="text-2xl">{tpl.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{tpl.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tpl.subtitle}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tpl.badgeColor} shrink-0 ml-2`}>
                    {tpl.badge}
                  </span>
                  {expandedId === tpl.id
                    ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
                </button>

                {/* Expanded content */}
                {expandedId === tpl.id && (
                  <div className="px-4 pb-4">
                    {/* Actions */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => copyText(tpl.text, tpl.id)}
                        className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
                          copiedId === tpl.id
                            ? 'bg-green-500 text-white'
                            : 'bg-brand text-white'
                        }`}
                      >
                        {copiedId === tpl.id
                          ? <><Check className="w-4 h-4" /> {t('docs_copied', lang)}</>
                          : <><Copy className="w-4 h-4" /> {t('docs_copy', lang)}</>}
                      </button>
                    </div>
                    {/* Contract text */}
                    <pre className="text-xs text-gray-700 bg-white/70 rounded-xl p-3 whitespace-pre-wrap leading-relaxed font-mono overflow-x-auto max-h-80 overflow-y-auto" dir="rtl">
                      {tpl.text}
                    </pre>
                  </div>
                )}
              </div>
            ))}

            {/* Disclaimer */}
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-2xl p-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">{t('docs_disclaimer', lang)}</p>
            </div>
          </div>
        )}

        {/* ── Builder tab ── */}
        {activeTab === 'builder' && (
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-4">{t('docs_builder_title', lang)}</p>

            {/* Contract type */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                {t('docs_builder_type', lang)}
              </label>
              <div className="flex gap-2">
                {(['rent', 'buy'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => { haptic('light'); set('type', type); setGenerated('') }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                      builder.type === type
                        ? 'bg-brand border-brand text-white'
                        : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {type === 'rent' ? `🏠 ${t('docs_type_rent', lang)}` : `🔑 ${t('docs_type_buy', lang)}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            {[
              { key: 'party1' as const, label: builder.type === 'rent' ? t('docs_landlord', lang) : t('docs_seller', lang), placeholder: 'ישראל ישראלי' },
              { key: 'party2' as const, label: builder.type === 'rent' ? t('docs_tenant', lang) : t('docs_buyer', lang), placeholder: 'שרה כהן' },
              { key: 'address' as const, label: t('docs_address', lang), placeholder: 'רחוב דיזנגוף 1, תל אביב' },
              { key: 'area' as const, label: t('docs_area', lang), placeholder: '75', type: 'number' },
              { key: 'price' as const, label: builder.type === 'rent' ? t('docs_rent_price', lang) : t('docs_price', lang), placeholder: builder.type === 'rent' ? '6000' : '2000000', type: 'number' },
              ...(builder.type === 'rent' ? [{ key: 'deposit' as const, label: t('docs_deposit', lang), placeholder: '12000', type: 'number' }] : []),
              { key: 'dateStart' as const, label: t('docs_date_start', lang), type: 'date' },
              { key: 'dateEnd' as const, label: t('docs_date_end', lang), type: 'date' },
            ].map(({ key, label, placeholder, type = 'text' }) => (
              <div key={key} className="mb-3">
                <label className="text-sm text-gray-500 mb-1 block">{label}</label>
                <input
                  type={type}
                  value={builder[key]}
                  onChange={(e) => set(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand transition-colors"
                  dir={type === 'text' ? 'rtl' : 'ltr'}
                />
              </div>
            ))}

            {/* Generate button */}
            <button
              onClick={generate}
              className="w-full py-3.5 bg-brand text-white font-bold rounded-2xl flex items-center justify-center gap-2 mt-2"
            >
              <Wand2 className="w-5 h-5" />
              {t('docs_generate', lang)}
            </button>

            {/* Generated result */}
            {generated && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-700">{t('docs_result_title', lang)}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generated).then(() => {
                        setCopiedGen(true)
                        haptic('medium')
                        setTimeout(() => setCopiedGen(false), 2000)
                      })
                    }}
                    className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-xl transition-colors ${
                      copiedGen ? 'bg-green-500 text-white' : 'bg-brand text-white'
                    }`}
                  >
                    {copiedGen
                      ? <><Check className="w-3.5 h-3.5" /> {t('docs_copied', lang)}</>
                      : <><Copy className="w-3.5 h-3.5" /> {t('docs_copy', lang)}</>}
                  </button>
                </div>
                <pre className="text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded-2xl p-4 whitespace-pre-wrap leading-relaxed font-mono" dir="rtl">
                  {generated}
                </pre>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-2xl p-3 mt-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">{t('docs_disclaimer', lang)}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
