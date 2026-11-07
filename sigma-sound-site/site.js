// ===== Настройки: замени на реальные контакты =====
const CONFIG = {
  whatsapp: "972539954331",          // номер для WhatsApp, международный формат без "+"
  phoneShown: "053-995-4331",        // как показывать номер на сайте
  email: "",                         // почта для заявок (пусто = не показывать)
  instagram: "sigma_sound_tlv",
  area: { ru: "Тель-Авив и центр", he: "תל אביב והמרכז" }
};
// ===================================================

const L = (ru, he) => `<span data-l="ru">${ru}</span><span data-l="he">${he}</span>`;

const PAGES = [
  ["index.html",    "Главная",              "ראשי"],
  ["home.html",     "Для дома",             "לבית"],
  ["venues.html",   "Бары и клубы",         "ברים ומועדונים"],
  ["security.html", "Безопасность",         "אבטחה"],
];

const LOGO = `<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="5" fill="none" stroke="#ffb23f" stroke-width="2"/><path d="M9 9h14l-8 7 8 7H9" fill="none" stroke="#ece9e2" stroke-width="2.4" stroke-linejoin="round"/></svg>`;

function header() {
  const here = location.pathname.split("/").pop() || "index.html";
  const links = PAGES.map(([href, ru, he]) =>
    `<a href="${href}"${href === here ? ' aria-current="page"' : ""}>${L(ru, he)}</a>`).join("");
  return `<header class="top"><div class="wrap">
    <a class="logo" href="index.html">${LOGO}SIGMA SOUND</a>
    <nav class="nav" id="nav">${links}</nav>
    <button class="burger" id="burger" aria-controls="nav" aria-expanded="false">${L("Меню", "תפריט")}</button>
    <div class="lang" role="group" aria-label="Language">
      <button type="button" data-set="he" id="lang-he">עב</button>
      <button type="button" data-set="ru" id="lang-ru">RU</button>
    </div>
  </div></header>`;
}

function contact(preset) {
  return `<section id="contact"><div class="wrap contact">
    <div class="head">
      <span class="tag">${L("Связь", "צור קשר")}</span>
      <h2>${L("Расскажите про объект", "ספרו לנו על הפרויקט")}</h2>
      <p class="lead">${L("Приедем, посмотрим помещение и пришлём проект с ценой. Выезд на замер бесплатный.",
                          "נגיע, נראה את המקום ונשלח תכנון עם הצעת מחיר. ביקור ומדידה ללא עלות.")}</p>
      <div class="contacts-list">
        <div><span>WhatsApp / ${L("Телефон", "טלפון")}</span><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener"><b dir="ltr">${CONFIG.phoneShown}</b></a></div>
        <div><span>Instagram</span><a href="https://www.instagram.com/${CONFIG.instagram}/" target="_blank" rel="noopener"><b dir="ltr">@${CONFIG.instagram}</b></a></div>
        ${CONFIG.email ? `<div><span>Email</span><b>${CONFIG.email}</b></div>` : ""}
        <div><span>${L("Район работы", "אזור שירות")}</span>${L(CONFIG.area.ru, CONFIG.area.he)}</div>
      </div>
    </div>
    <form id="lead-form" novalidate>
      <label for="f-name">${L("Имя", "שם")}<input id="f-name" name="name" autocomplete="name" required></label>
      <label for="f-type">${L("Что нужно", "מה צריך")}
        <select id="f-type" name="type">
          <option value="home"${preset==="home"?" selected":""} data-ru="Оборудование для дома" data-he="מערכות לבית">Оборудование для дома</option>
          <option value="venue"${preset==="venue"?" selected":""} data-ru="Бар, ресторан или клуб" data-he="בר, מסעדה או מועדון">Бар, ресторан или клуб</option>
          <option value="security"${preset==="security"?" selected":""} data-ru="Камеры и сигнализация" data-he="מצלמות ואזעקה">Камеры и сигнализация</option>
        </select></label>
      <label for="f-city">${L("Город", "עיר")}<input id="f-city" name="city" autocomplete="address-level2"></label>
      <label for="f-msg">${L("Коротко о задаче", "בקצרה על הפרויקט")}<textarea id="f-msg" name="msg"></textarea></label>
      <button class="btn primary" type="submit">${L("Отправить в WhatsApp", "שליחה בוואטסאפ")}</button>
      <div class="out" id="lead-out" role="status">
        <span>${L("Откройте ссылку, чтобы отправить сообщение:", "פתחו את הקישור כדי לשלוח את ההודעה:")}</span>
        <a id="lead-link" href="#" target="_blank" rel="noopener"></a>
        <span class="muted">${L("Если WhatsApp не открылся, позвоните: ", "אם וואטסאפ לא נפתח, התקשרו: ")}${CONFIG.phoneShown}</span>
      </div>
    </form>
  </div></section>`;
}

function footer() {
  return `<footer><div class="wrap">
    <span>© ${new Date().getFullYear()} SIGMA SOUND · ${L("аудио, видео, умный дом и безопасность", "אודיו, וידאו, בית חכם ואבטחה")}</span>
    <span><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener" dir="ltr">WhatsApp ${CONFIG.phoneShown}</a> · <a href="https://www.instagram.com/${CONFIG.instagram}/" target="_blank" rel="noopener" dir="ltr">Instagram @${CONFIG.instagram}</a></span>
  </div></footer>`;
}

function setLang(lang) {
  const h = document.documentElement;
  h.lang = lang; h.dir = lang === "he" ? "rtl" : "ltr";
  document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.set === lang)));
  document.querySelectorAll("option[data-ru]").forEach(o => o.textContent = o.dataset[lang]);
  const t = document.querySelector("meta[name='title-" + lang + "']");
  if (t) document.title = t.content;
  try { localStorage.setItem("ss-lang", lang); } catch (e) {}
}

function initForm() {
  const f = document.getElementById("lead-form");
  if (!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const he = document.documentElement.lang === "he";
    const v = id => document.getElementById(id).value.trim();
    const type = document.getElementById("f-type");
    const lines = [
      he ? "שלום, פנייה מהאתר של Sigma Sound" : "Здравствуйте! Заявка с сайта Sigma Sound",
      (he ? "שם: " : "Имя: ") + (v("f-name") || "-"),
      (he ? "נושא: " : "Тема: ") + type.options[type.selectedIndex].textContent,
      (he ? "עיר: " : "Город: ") + (v("f-city") || "-"),
      v("f-msg")
    ].filter(Boolean);
    const url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
    const a = document.getElementById("lead-link");
    a.href = url; a.textContent = he ? "פתיחת וואטסאפ" : "Открыть WhatsApp";
    document.getElementById("lead-out").classList.add("show");
  });
}

function initMeter() {
  const c = document.getElementById("meter");
  if (!c) return;
  const ctx = c.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h, bars, t = 0;
  function size() {
    const r = devicePixelRatio || 1;
    w = c.clientWidth; h = c.clientHeight;
    c.width = w * r; c.height = h * r; ctx.setTransform(r, 0, 0, r, 0, 0);
    bars = Math.max(24, Math.floor(w / 14));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const bw = w / bars;
    for (let i = 0; i < bars; i++) {
      const x = i / bars;
      const env = Math.exp(-Math.pow((x - 0.32) * 2.4, 2)) * 0.8 + Math.exp(-Math.pow((x - 0.78) * 3.2, 2)) * 0.45 + 0.12;
      const wob = 0.72 + 0.28 * Math.sin(t * 1.7 + i * 0.55) * Math.sin(t * 0.9 + i * 0.13);
      const v = Math.min(1, env * wob);
      const segs = 18, sh = h / segs, lit = Math.round(v * segs);
      for (let s = 0; s < lit; s++) {
        ctx.fillStyle = s > segs * 0.82 ? "#ff4d4d" : s > segs * 0.62 ? "#ffd27a" : "#ffb23f";
        ctx.globalAlpha = 0.25 + 0.75 * (s / segs);
        ctx.fillRect(i * bw + 2, h - (s + 1) * sh + 2, bw - 4, sh - 3);
      }
    }
    ctx.globalAlpha = 1;
  }
  function loop() { t += 0.03; draw(); requestAnimationFrame(loop); }
  size(); addEventListener("resize", () => { size(); draw(); });
  still ? draw() : loop();
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", header());
  const slot = document.getElementById("contact-slot");
  if (slot) slot.outerHTML = contact(slot.dataset.preset || "home");
  document.body.insertAdjacentHTML("beforeend", footer());
  let lang = "ru";
  try { lang = localStorage.getItem("ss-lang") || "ru"; } catch (e) {}
  setLang(lang);
  document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.set)));
  const burger = document.getElementById("burger"), nav = document.getElementById("nav");
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  initForm(); initMeter();
});
