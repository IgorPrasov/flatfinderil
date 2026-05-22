export type Lang = 'ru' | 'en' | 'he' | 'fr'

export const translations = {
  // ── Bottom nav ──────────────────────────────────────────────────────────────
  nav_search:     { ru: 'Поиск',     en: 'Search',   he: 'חיפוש',    fr: 'Recherche' },
  nav_map:        { ru: 'Карта',     en: 'Map',       he: 'מפה',      fr: 'Carte' },
  nav_favorites:  { ru: 'Избранное', en: 'Saved',     he: 'מועדפים',  fr: 'Favoris' },
  nav_calculator: { ru: 'Ипотека',   en: 'Mortgage',  he: 'משכנתה',   fr: 'Hypothèque' },
  nav_cabinet:    { ru: 'Кабинет',   en: 'Cabinet',   he: 'אזור אישי', fr: 'Cabinet' },

  // ── Search page ─────────────────────────────────────────────────────────────
  search_title:       { ru: 'FlatFinder IL',     en: 'FlatFinder IL',    he: 'FlatFinder IL',    fr: 'FlatFinder IL' },
  search_ai_placeholder: {
    ru: 'AI поиск... (3 комнаты в ТА до 6000)',
    en: 'AI search... (3 rooms in Tel Aviv under 6000)',
    he: 'חיפוש AI... (3 חדרים בת"א עד 6000)',
    fr: 'Recherche AI... (3 pièces à Tel Aviv sous 6000)',
  },
  search_ai_find:     { ru: 'Найти',      en: 'Find',     he: 'חפש',      fr: 'Chercher' },
  search_loading:     { ru: 'Загрузка...', en: 'Loading...', he: 'טוען...', fr: 'Chargement...' },
  search_results:     { ru: 'объявлений', en: 'listings', he: 'מודעות',   fr: 'annonces' },
  search_updating:    { ru: '· обновляется', en: '· updating', he: '· מתעדכן', fr: '· mise à jour' },
  // ── Infrastructure ──────────────────────────────────────────────────────────
  infra_title:        { ru: '🏙 Инфраструктура района', en: '🏙 Neighborhood infrastructure', he: '🏙 תשתיות שכונה', fr: '🏙 Infrastructure du quartier' },
  infra_kindergarten: { ru: '🧒 Детский сад',           en: '🧒 Kindergarten',        he: '🧒 גן ילדים',            fr: '🧒 Crèche' },
  infra_school:       { ru: '🏫 Школа',                  en: '🏫 School',              he: '🏫 בית ספר',             fr: '🏫 École' },
  infra_mall:         { ru: '🛒 ТЦ',                     en: '🛒 Mall',                he: '🛒 קניון',               fr: '🛒 Centre commercial' },
  infra_park:         { ru: '🌳 Парк',                   en: '🌳 Park',                he: '🌳 פארק',                fr: '🌳 Parc' },
  infra_gym:          { ru: '💪 Спортзал',               en: '💪 Gym',                 he: '💪 חדר כושר',            fr: '💪 Salle de sport' },
  infra_hospital:     { ru: '🏥 Больница',               en: '🏥 Hospital',            he: '🏥 בית חולים',           fr: '🏥 Hôpital' },
  infra_beach:        { ru: '🏖 Пляж',                   en: '🏖 Beach',               he: '🏖 חוף ים',              fr: '🏖 Plage' },
  infra_transport:    { ru: '🚌 Транспорт',              en: '🚌 Transport',           he: '🚌 תחבורה ציבורית',       fr: '🚌 Transports' },
  infra_restaurant:   { ru: '🍽 Рестораны',              en: '🍽 Restaurants',         he: '🍽 מסעדות',              fr: '🍽 Restaurants' },
  infra_synagogue:    { ru: '🕍 Синагога',               en: '🕍 Synagogue',           he: '🕍 בית כנסת',            fr: '🕍 Synagogue' },
  infra_public_pool:  { ru: '🏊 Бассейн',               en: '🏊 Public pool',         he: '🏊 בריכה ציבורית',       fr: '🏊 Piscine publique' },

  search_empty:       { ru: 'Ничего не найдено', en: 'Nothing found', he: 'לא נמצאו תוצאות', fr: 'Aucun résultat' },
  search_empty_sub:   { ru: 'Попробуйте изменить фильтры', en: 'Try changing filters', he: 'נסה לשנות את הפילטרים', fr: 'Essayez de modifier les filtres' },
  search_load_more:   { ru: 'Загрузить ещё', en: 'Load more', he: 'טען עוד', fr: 'Charger plus' },

  // ── Filters ─────────────────────────────────────────────────────────────────
  filters_title:      { ru: 'Фильтры',     en: 'Filters',       he: 'פילטרים',    fr: 'Filtres' },
  filters_deal:       { ru: 'Тип сделки',  en: 'Deal type',     he: 'סוג עסקה',   fr: 'Type de deal' },
  filters_all:        { ru: 'Все',         en: 'All',           he: 'הכל',        fr: 'Tous' },
  filters_rent:       { ru: 'Аренда',      en: 'Rent',          he: 'שכירות',     fr: 'Location' },
  filters_buy:        { ru: 'Купить',      en: 'Buy',           he: 'קנייה',      fr: 'Acheter' },
  filters_ptype:      { ru: 'Тип недвижимости', en: 'Property type', he: 'סוג נכס', fr: 'Type de bien' },
  filters_city:       { ru: 'Город',       en: 'City',          he: 'עיר',        fr: 'Ville' },
  filters_rooms:      { ru: 'Комнаты',     en: 'Rooms',         he: 'חדרים',      fr: 'Pièces' },
  filters_from:       { ru: 'от',          en: 'from',          he: 'מ-',         fr: 'de' },
  filters_to:         { ru: 'до',          en: 'to',            he: 'עד',         fr: 'à' },
  filters_price:      { ru: 'Цена (₪)',    en: 'Price (₪)',     he: 'מחיר (₪)',   fr: 'Prix (₪)' },
  filters_photos:     { ru: 'Только с фото', en: 'With photos only', he: 'עם תמונות בלבד', fr: 'Avec photos seulement' },
  filters_pool:       { ru: '🏊 Есть бассейн', en: '🏊 Has pool', he: '🏊 יש בריכה', fr: '🏊 Avec piscine' },
  filters_extras:     { ru: 'Дополнительно', en: 'Extras',      he: 'נוסף',       fr: 'Extras' },
  filters_reset:      { ru: 'Сбросить',    en: 'Reset',         he: 'איפוס',      fr: 'Réinitialiser' },
  filters_apply:      { ru: 'Применить',   en: 'Apply',         he: 'החל',        fr: 'Appliquer' },

  // ── Property types ──────────────────────────────────────────────────────────
  ptype_apartment:    { ru: 'Квартира',     en: 'Apartment',    he: 'דירה',       fr: 'Appartement' },
  ptype_house:        { ru: 'Дом',          en: 'House',        he: 'בית',        fr: 'Maison' },
  ptype_villa:        { ru: 'Вилла',        en: 'Villa',        he: 'וילה',       fr: 'Villa' },
  ptype_penthouse:    { ru: 'Пентхаус',     en: 'Penthouse',    he: 'פנטהאוז',    fr: 'Penthouse' },
  ptype_duplex:       { ru: 'Дуплекс',      en: 'Duplex',       he: 'דופלקס',     fr: 'Duplex' },
  ptype_studio:       { ru: 'Студия',       en: 'Studio',       he: 'סטודיו',     fr: 'Studio' },
  ptype_room:         { ru: 'Комната',      en: 'Room',         he: 'חדר',        fr: 'Chambre' },
  ptype_commercial:   { ru: 'Коммерческая', en: 'Commercial',   he: 'מסחרי',      fr: 'Commercial' },

  // ── Listing card ────────────────────────────────────────────────────────────
  card_private:       { ru: 'Частник',      en: 'Private',      he: 'פרטי',       fr: 'Particulier' },
  card_agent:         { ru: 'Агент',        en: 'Agent',        he: 'סוכן',       fr: 'Agent' },
  card_suspicious:    { ru: 'Подозрительно', en: 'Suspicious',  he: 'חשוד',       fr: 'Suspect' },
  card_duplicate:     { ru: 'Дубль',        en: 'Duplicate',    he: 'כפול',       fr: 'Doublon' },
  card_compare_add:   { ru: '+ Сравнить',   en: '+ Compare',    he: '+ השווה',    fr: '+ Comparer' },
  card_compare_in:    { ru: '✓ В сравнении', en: '✓ Comparing', he: '✓ בהשוואה',  fr: '✓ En comparaison' },
  card_per_month:     { ru: '/мес',         en: '/mo',          he: '/חודש',      fr: '/mois' },
  card_rooms:         { ru: 'к',            en: 'r',            he: 'חד',         fr: 'p' },
  card_floor:         { ru: 'эт',           en: 'fl',           he: 'קומה',       fr: 'ét' },

  // ── Listing detail ──────────────────────────────────────────────────────────
  detail_rooms:       { ru: 'комнат',       en: 'rooms',        he: 'חדרים',      fr: 'pièces' },
  detail_area:        { ru: 'м²',           en: 'm²',           he: 'מ"ר',        fr: 'm²' },
  detail_floor:       { ru: 'этаж',         en: 'floor',        he: 'קומה',       fr: 'étage' },
  detail_ai_title:    { ru: 'AI Оценка рынка', en: 'AI Market Valuation', he: 'הערכת שוק AI', fr: 'Évaluation AI' },
  detail_overpriced:  { ru: 'Завышено на', en: 'Overpriced by', he: 'מוגזם ב-',   fr: 'Surévalué de' },
  detail_underpriced: { ru: 'Ниже рынка на', en: 'Below market by', he: 'מתחת לשוק ב-', fr: 'Sous le marché de' },
  detail_fair:        { ru: 'Соответствует рыночной цене', en: 'Fair market price', he: 'מחיר שוק הוגן', fr: 'Prix de marché équitable' },
  detail_suspicious_title: { ru: 'Подозрительное объявление', en: 'Suspicious listing', he: 'מודעה חשודה', fr: 'Annonce suspecte' },
  detail_desc:        { ru: 'Описание',     en: 'Description',  he: 'תיאור',      fr: 'Description' },
  detail_amenities:   { ru: 'Удобства',     en: 'Amenities',    he: 'מתקנים',     fr: 'Commodités' },
  detail_seller:      { ru: 'Продавец',     en: 'Seller',       he: 'מוכר',       fr: 'Vendeur' },
  detail_contact:     { ru: 'Связаться',    en: 'Contact',      he: 'צור קשר',    fr: 'Contacter' },
  detail_show_photos: { ru: 'Показать фото', en: 'Show photos',  he: 'הצג תמונות',  fr: 'Voir les photos' },
  detail_booking:     { ru: 'Просмотр',     en: 'Book viewing', he: 'תיאום ביקור', fr: 'Visite' },
  detail_booking_title: { ru: '📅 Записаться на просмотр', en: '📅 Book a viewing', he: '📅 קביעת ביקור', fr: '📅 Réserver une visite' },
  detail_date:        { ru: 'Дата и время', en: 'Date & time',  he: 'תאריך ושעה', fr: 'Date et heure' },
  detail_message:     { ru: 'Сообщение (необязательно)', en: 'Message (optional)', he: 'הודעה (אופציונלי)', fr: 'Message (facultatif)' },
  detail_send:        { ru: 'Отправить запрос', en: 'Send request', he: 'שלח בקשה', fr: 'Envoyer la demande' },
  detail_done:        { ru: 'Готово',       en: 'Done',         he: 'סיום',       fr: 'Terminer' },
  detail_sent:        { ru: 'Запрос отправлен!', en: 'Request sent!', he: 'הבקשה נשלחה!', fr: 'Demande envoyée!' },
  detail_owner_reply: { ru: 'Владелец свяжется с вами', en: 'Owner will contact you', he: 'הבעלים ייצור קשר', fr: "Le propriétaire vous contactera" },
  detail_add_compare: { ru: 'Добавить к сравнению', en: 'Add to compare', he: 'הוסף להשוואה', fr: 'Ajouter à la comparaison' },
  detail_rm_compare:  { ru: 'Убрать из сравнения', en: 'Remove from compare', he: 'הסר מהשוואה', fr: 'Retirer de la comparaison' },
  detail_verified:    { ru: 'Проверено',    en: 'Verified',     he: 'מאומת',      fr: 'Vérifié' },

  // ── Map ─────────────────────────────────────────────────────────────────────
  map_on_map:         { ru: 'на карте',     en: 'on map',       he: 'על המפה',    fr: 'sur la carte' },

  // ── Favorites ────────────────────────────────────────────────────────────────
  fav_title:          { ru: 'Избранное',    en: 'Favorites',    he: 'מועדפים',    fr: 'Favoris' },
  fav_empty_title:    { ru: 'Нет избранных', en: 'No favorites', he: 'אין מועדפים', fr: 'Pas de favoris' },
  fav_empty_sub:      { ru: 'Нажмите ❤️ на любом объявлении', en: 'Tap ❤️ on any listing', he: 'לחץ ❤️ על כל מודעה', fr: 'Appuyez ❤️ sur une annonce' },

  // ── Compare ──────────────────────────────────────────────────────────────────
  compare_title:      { ru: 'Сравнение',    en: 'Compare',      he: 'השוואה',     fr: 'Comparaison' },
  compare_clear:      { ru: 'Очистить',     en: 'Clear',        he: 'נקה',        fr: 'Effacer' },
  compare_empty:      { ru: 'Нет объявлений для сравнения', en: 'Nothing to compare', he: 'אין מה להשוות', fr: 'Rien à comparer' },
  compare_empty_sub:  { ru: 'Добавляйте до 3 квартир из поиска', en: 'Add up to 3 listings from search', he: 'הוסף עד 3 דירות מהחיפוש', fr: 'Ajoutez jusqu\'à 3 annonces' },
  compare_price:      { ru: 'Цена ₪',       en: 'Price ₪',      he: 'מחיר ₪',     fr: 'Prix ₪' },
  compare_rooms:      { ru: 'Комнаты',      en: 'Rooms',        he: 'חדרים',      fr: 'Pièces' },
  compare_area:       { ru: 'Площадь м²',   en: 'Area m²',      he: 'שטח מ"ר',    fr: 'Surface m²' },
  compare_floor:      { ru: 'Этаж',         en: 'Floor',        he: 'קומה',       fr: 'Étage' },
  compare_type:       { ru: 'Тип',          en: 'Type',         he: 'סוג',        fr: 'Type' },
  compare_parking:    { ru: 'Парковка',     en: 'Parking',      he: 'חניה',       fr: 'Parking' },
  compare_pool:       { ru: 'Бассейн',      en: 'Pool',         he: 'בריכה',      fr: 'Piscine' },
  compare_seller:     { ru: 'Продавец',     en: 'Seller',       he: 'מוכר',       fr: 'Vendeur' },
  compare_ai:         { ru: 'AI оценка ₪',  en: 'AI val. ₪',    he: 'הערכת AI ₪', fr: 'Valeur AI ₪' },
  compare_suspicious: { ru: 'Подозрительно', en: 'Suspicious',  he: 'חשוד',       fr: 'Suspect' },
  compare_dup:        { ru: 'Дубль',        en: 'Duplicate',    he: 'כפול',       fr: 'Doublon' },
  compare_private:    { ru: 'Частник',      en: 'Private',      he: 'פרטי',       fr: 'Particulier' },

  // ── Mortgage calculator ──────────────────────────────────────────────────────
  calc_title:         { ru: 'Ипотечный калькулятор', en: 'Mortgage Calculator', he: 'מחשבון משכנתה', fr: 'Calculateur hypothécaire' },
  calc_price:         { ru: 'Стоимость квартиры', en: 'Property price', he: 'מחיר הנכס', fr: 'Prix du bien' },
  calc_down:          { ru: 'Первоначальный взнос', en: 'Down payment', he: 'הון עצמי', fr: 'Apport initial' },
  calc_rate:          { ru: 'Процентная ставка', en: 'Interest rate', he: 'ריבית שנתית', fr: "Taux d'intérêt" },
  calc_years:         { ru: 'Срок кредита', en: 'Loan term',     he: 'תקופת הלוואה', fr: 'Durée du prêt' },
  calc_years_unit:    { ru: 'лет',          en: 'years',         he: 'שנים',       fr: 'ans' },
  calc_monthly:       { ru: 'Ежемесячный платёж', en: 'Monthly payment', he: 'תשלום חודשי', fr: 'Paiement mensuel' },
  calc_loan:          { ru: 'Сумма кредита', en: 'Loan amount',  he: 'סכום הלוואה', fr: 'Montant du prêt' },
  calc_overpay:       { ru: 'Переплата',    en: 'Total interest', he: 'ריבית כוללת', fr: 'Intérêts totaux' },
  calc_total:         { ru: 'Итого выплат за', en: 'Total paid over', he: 'סה"כ לתשלום ב-', fr: 'Total payé sur' },
  calc_tip_title:     { ru: '💡 Совет',     en: '💡 Tip',        he: '💡 טיפ',      fr: '💡 Conseil' },
  calc_tip_text:      {
    ru: 'В Израиле минимальный первоначальный взнос — 25% для первого жилья и 50% для инвестиционной недвижимости.',
    en: 'In Israel, the minimum down payment is 25% for a first home and 50% for investment property.',
    he: 'בישראל, ההון העצמי המינימלי הוא 25% לדירה ראשונה ו-50% לדירה להשקעה.',
    fr: "En Israël, l'apport minimum est de 25% pour une première résidence et 50% pour un investissement.",
  },
  calc_warn_down:     {
    ru: '⚠️ В Израиле мин. взнос для первого жилья — 25%',
    en: '⚠️ Min. down payment for first home in Israel is 25%',
    he: '⚠️ הון עצמי מינימלי לדירה ראשונה בישראל הוא 25%',
    fr: "⚠️ L'apport minimum en Israël est de 25% pour une 1ère résidence",
  },

  // ── Cabinet ──────────────────────────────────────────────────────────────────
  cabinet_guest:      { ru: 'Гость',        en: 'Guest',        he: 'אורח',       fr: 'Invité' },
  cabinet_login:      { ru: 'Войдите через Telegram', en: 'Sign in via Telegram', he: 'התחבר דרך טלגרם', fr: 'Connectez-vous via Telegram' },
  cabinet_open_bot:   { ru: 'Открыть в Telegram', en: 'Open in Telegram', he: 'פתח בטלגרם', fr: 'Ouvrir dans Telegram' },
  cabinet_subscriptions: { ru: 'Мои подписки', en: 'My subscriptions', he: 'המנויים שלי', fr: 'Mes abonnements' },
  cabinet_sub_sub:    { ru: 'Управление алертами и подпиской', en: 'Manage alerts and subscription', he: 'ניהול התראות ומנוי', fr: 'Gérer alertes et abonnement' },
  cabinet_notifications: { ru: 'Уведомления', en: 'Notifications', he: 'התראות', fr: 'Notifications' },
  cabinet_notif_sub:  { ru: 'Настройка нотификаций', en: 'Configure notifications', he: 'הגדרת התראות', fr: 'Configurer les notifications' },
  cabinet_listings:   { ru: 'Мои объявления', en: 'My listings', he: 'המודעות שלי', fr: 'Mes annonces' },
  cabinet_listings_sub: { ru: 'Добавленные мной', en: 'Added by me', he: 'שפרסמתי', fr: 'Ajoutées par moi' },
  cabinet_docs:       { ru: 'Документы',    en: 'Documents',    he: 'מסמכים',     fr: 'Documents' },
  cabinet_docs_sub:   { ru: 'Загруженные файлы', en: 'Uploaded files', he: 'קבצים שהועלו', fr: 'Fichiers téléchargés' },
  cabinet_about:      { ru: 'Поиск жилья в Израиле', en: 'Real estate search in Israel', he: 'חיפוש נדל"ן בישראל', fr: "Recherche immobilière en Israël" },

  // ── Compare badge ────────────────────────────────────────────────────────────
  compare_badge:      { ru: 'сравнить',     en: 'compare',      he: 'השווה',      fr: 'comparer' },
  back:               { ru: '← Назад',      en: '← Back',       he: '← חזרה',     fr: '← Retour' },

  // ── Services page ────────────────────────────────────────────────────────────
  nav_services:       { ru: 'Услуги',       en: 'Services',     he: 'שירותים',    fr: 'Services' },
  svc_title:          { ru: 'Услуги',       en: 'Services',     he: 'שירותים',    fr: 'Services' },
  svc_all:            { ru: 'Все',          en: 'All',          he: 'הכל',        fr: 'Tous' },
  svc_moving:         { ru: '🚚 Перевозки', en: '🚚 Moving',    he: '🚚 הובלות',  fr: '🚚 Déménagement' },
  svc_cleaning:       { ru: '🧹 Клининг',   en: '🧹 Cleaning',  he: '🧹 ניקיון',  fr: '🧹 Nettoyage' },
  svc_packing:        { ru: '📦 Упаковка',  en: '📦 Packing',   he: '📦 אריזה',   fr: '📦 Emballage' },
  svc_repairs:        { ru: '🔧 Ремонт',    en: '🔧 Repairs',   he: '🔧 תיקונים', fr: '🔧 Réparations' },
  svc_empty:          { ru: 'Нет специалистов в этой категории', en: 'No specialists in this category', he: 'אין מומחים בקטגוריה זו', fr: 'Aucun spécialiste dans cette catégorie' },
  svc_call:           { ru: 'Позвонить',    en: 'Call',         he: 'התקשר',      fr: 'Appeler' },
  svc_write:          { ru: 'Написать',     en: 'Write',        he: 'כתוב',       fr: 'Écrire' },
  svc_per_lead:       { ru: '/лид',         en: '/lead',        he: '/ליד',       fr: '/lead' },
  svc_per_month:      { ru: '/мес',         en: '/mo',          he: '/חודש',      fr: '/mois' },
  svc_contact:        { ru: 'Связаться',    en: 'Contact',      he: 'צור קשר',    fr: 'Contacter' },
  svc_region_all:     { ru: 'Весь Израиль', en: 'All Israel',   he: 'כל ישראל',   fr: 'Tout Israël' },
  svc_views:          { ru: 'просмотров',   en: 'views',        he: 'צפיות',      fr: 'vues' },

  // ── Commercial page ──────────────────────────────────────────────────────────
  nav_commercial:      { ru: 'Бизнес',       en: 'Business',     he: 'עסקים',      fr: 'Commerce' },
  commercial_title:    { ru: '🏢 Коммерческая недвижимость', en: '🏢 Commercial Real Estate', he: '🏢 נדל"ן מסחרי', fr: '🏢 Immobilier commercial' },
  commercial_sub:      { ru: 'Офисы, торговые площади, склады', en: 'Offices, retail, warehouses', he: 'משרדים, חנויות, מחסנים', fr: 'Bureaux, commerces, entrepôts' },
  commercial_types:    { ru: 'Тип помещения', en: 'Space type',   he: 'סוג שטח',    fr: 'Type de local' },
  commercial_office:   { ru: '💼 Офис',       en: '💼 Office',     he: '💼 משרד',     fr: '💼 Bureau' },
  commercial_retail:   { ru: '🛍 Торговый',   en: '🛍 Retail',     he: '🛍 קמעוני',   fr: '🛍 Commerce' },
  commercial_warehouse:{ ru: '📦 Склад',      en: '📦 Warehouse',  he: '📦 מחסן',     fr: '📦 Entrepôt' },
  commercial_cowork:   { ru: '☕ Коворкинг',  en: '☕ Coworking',  he: '☕ קוורקינג',  fr: '☕ Coworking' },
  commercial_add:      { ru: 'Добавить объявление',en: 'Add listing', he: 'הוסף מודעה', fr: 'Ajouter une annonce' },
  commercial_empty:    { ru: 'Объявлений пока нет', en: 'No listings yet', he: 'אין מודעות עדיין', fr: 'Pas encore d\'annonces' },
  commercial_empty_sub:{ ru: 'Скоро здесь появятся коммерческие объекты', en: 'Commercial listings coming soon', he: 'מודעות מסחריות בקרוב', fr: 'Annonces commerciales bientôt' },
  commercial_sqm:      { ru: 'м²',            en: 'm²',           he: 'מ"ר',        fr: 'm²' },
  commercial_rent_sqm: { ru: '₪/м²/мес',     en: '₪/m²/mo',     he: '₪/מ"ר/חודש',  fr: '₪/m²/mois' },
  commercial_contact:  { ru: 'Связаться',     en: 'Contact',      he: 'צור קשר',    fr: 'Contacter' },

  // ── Documents page ───────────────────────────────────────────────────────────
  nav_documents:       { ru: 'Документы',    en: 'Documents',    he: 'מסמכים',     fr: 'Documents' },
  docs_title:          { ru: '📄 Юридические документы', en: '📄 Legal Documents', he: '📄 מסמכים משפטיים', fr: '📄 Documents juridiques' },
  docs_tab_templates:  { ru: 'Типовые договора', en: 'Templates',  he: 'תבניות',     fr: 'Modèles' },
  docs_tab_builder:    { ru: 'Конструктор',  en: 'Builder',      he: 'בונה חוזים', fr: 'Constructeur' },
  docs_rent_title:     { ru: '🏠 Договор аренды', en: '🏠 Rental Agreement', he: '🏠 חוזה שכירות', fr: '🏠 Contrat de location' },
  docs_buy_title:      { ru: '🔑 Договор купли-продажи', en: '🔑 Purchase Agreement', he: '🔑 חוזה מכר', fr: '🔑 Compromis de vente' },
  docs_preliminary:    { ru: '📝 Предварительный договор', en: '📝 Letter of Intent', he: '📝 זכרון דברים', fr: '📝 Promesse de vente' },
  docs_view:           { ru: 'Читать',       en: 'View',         he: 'קרא',        fr: 'Lire' },
  docs_copy:           { ru: 'Копировать',   en: 'Copy',         he: 'העתק',       fr: 'Copier' },
  docs_copied:         { ru: '✓ Скопировано', en: '✓ Copied',    he: '✓ הועתק',    fr: '✓ Copié' },
  docs_builder_title:  { ru: 'Конструктор договора', en: 'Contract Builder', he: 'בונה חוזים', fr: 'Générateur de contrat' },
  docs_builder_type:   { ru: 'Тип договора', en: 'Contract type', he: 'סוג חוזה',  fr: 'Type de contrat' },
  docs_type_rent:      { ru: 'Аренда',       en: 'Rental',       he: 'שכירות',     fr: 'Location' },
  docs_type_buy:       { ru: 'Купля-продажа', en: 'Purchase',    he: 'מכר',        fr: 'Vente' },
  docs_landlord:       { ru: 'Арендодатель (ФИО)', en: 'Landlord (full name)', he: 'משכיר (שם מלא)', fr: 'Bailleur (nom complet)' },
  docs_tenant:         { ru: 'Арендатор (ФИО)', en: 'Tenant (full name)', he: 'שוכר (שם מלא)', fr: 'Locataire (nom complet)' },
  docs_seller:         { ru: 'Продавец (ФИО)', en: 'Seller (full name)', he: 'מוכר (שם מלא)', fr: 'Vendeur (nom complet)' },
  docs_buyer:          { ru: 'Покупатель (ФИО)', en: 'Buyer (full name)', he: 'קונה (שם מלא)', fr: 'Acheteur (nom complet)' },
  docs_address:        { ru: 'Адрес объекта', en: 'Property address', he: 'כתובת הנכס', fr: 'Adresse du bien' },
  docs_area:           { ru: 'Площадь (м²)', en: 'Area (m²)',    he: 'שטח (מ"ר)',  fr: 'Surface (m²)' },
  docs_price:          { ru: 'Сумма (₪)',    en: 'Amount (₪)',   he: 'סכום (₪)',   fr: 'Montant (₪)' },
  docs_rent_price:     { ru: 'Аренда (₪/мес)', en: 'Rent (₪/mo)', he: 'שכירות (₪/חודש)', fr: 'Loyer (₪/mois)' },
  docs_deposit:        { ru: 'Залог (₪)',    en: 'Deposit (₪)',  he: 'פיקדון (₪)', fr: 'Dépôt de garantie (₪)' },
  docs_date_start:     { ru: 'Дата начала',  en: 'Start date',   he: 'תאריך התחלה', fr: 'Date de début' },
  docs_date_end:       { ru: 'Дата окончания', en: 'End date',   he: 'תאריך סיום', fr: 'Date de fin' },
  docs_generate:       { ru: '📄 Сгенерировать договор', en: '📄 Generate contract', he: '📄 צור חוזה', fr: '📄 Générer le contrat' },
  docs_result_title:   { ru: 'Готовый договор', en: 'Generated contract', he: 'חוזה מוכן', fr: 'Contrat généré' },
  docs_disclaimer:     { ru: '⚠️ Документ носит информационный характер. Обратитесь к юристу перед подписанием.', en: '⚠️ This document is for informational purposes only. Consult a lawyer before signing.', he: '⚠️ מסמך זה הוא לצורכי מידע בלבד. התייעץ עם עורך דין לפני החתימה.', fr: '⚠️ Ce document est à titre informatif uniquement. Consultez un avocat avant de signer.' },

  // ── Language selector ────────────────────────────────────────────────────────
  lang_title:         { ru: 'Язык',         en: 'Language',     he: 'שפה',        fr: 'Langue' },
  lang_ru:            { ru: 'Русский',      en: 'Russian',      he: 'רוסית',      fr: 'Russe' },
  lang_en:            { ru: 'English',      en: 'English',      he: 'אנגלית',     fr: 'Anglais' },
  lang_he:            { ru: 'עברית',        en: 'Hebrew',       he: 'עברית',      fr: 'Hébreu' },
  lang_fr:            { ru: 'Français',     en: 'French',       he: 'צרפתית',     fr: 'Français' },
} as const

export type TranslationKey = keyof typeof translations

export function t(key: TranslationKey, lang: Lang): string {
  const entry = translations[key]
  if (!entry) return key
  return (entry as Record<Lang, string>)[lang] ?? (entry as Record<Lang, string>).ru ?? key
}

export function detectLang(languageCode?: string): Lang {
  if (!languageCode) return 'ru'
  if (languageCode.startsWith('he') || languageCode.startsWith('iw')) return 'he'
  if (languageCode.startsWith('en')) return 'en'
  if (languageCode.startsWith('fr')) return 'fr'
  return 'ru'
}

export const RTL_LANGS: Lang[] = ['he']
export function isRTL(lang: Lang): boolean {
  return RTL_LANGS.includes(lang)
}
