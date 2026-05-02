# B2B Wholesale Portal — Build Log

**Project:** Shopify Dawn Theme → B2B Wholesale portal (React mockups → Liquid sections)
**Branch:** `claude/react-to-shopify-hero-lfeDP-deepseek`
**Base branch (preserved, untouched):** `claude/react-to-shopify-hero-lfeDP`
**GitHub:** `yunglordsimens/leatherperfume-b2b-v2`
**Last Updated:** 2026-05-02 (post-CC audit — docs synced with actual repo state)

---

## Attribution Legend

| Symbol | Agent | Role |
|--------|-------|------|
| DS | DeepSeek | Code analysis, debugging, architecture decisions |
| GM | Gemini | Design / React mockup analysis |
| CL | Claude (chat) | Orchestration, docs, planning, hand-off |
| CC | Claude Code | File ops, git, applying edits in repo |
| US | User (Masha) | Requirements, product decisions, feedback |

Status icons: ✅ done · 🔄 in progress · ❌ blocked · 🔲 not started

---

## React → Liquid Migration

Контекст: Gemini сделал React-макет в `/mockups/App.full.jsx` (исходный визуал), уже частично перенесён в Liquid-секции Dawn. Аудит CC (2026-05-02) показал что **8 из 11 секций уже существуют** в репо.

### Полный список блоков из React-макета

| # | React component | Liquid target | Status |
|---|-----------------|---------------|--------|
| 1 | AccessibilityPanel | `snippets/accessibility-panel.liquid` | ✅ exists, нужен аудит |
| 2 | AnnouncementBar (top notification) | `sections/announcement-bar.liquid` (Dawn-нативный) | 🔲 audit + extend |
| 3 | Header (с Mega Menu, Lang Switcher, A11y кнопкой, Login, Cart) | `sections/header.liquid` (Dawn-нативный) | 🔲 audit + extend (D-03, D-10) |
| 4 | Hero (B2B partnership) | `sections/hero-b2b.liquid` | ✅ exists, нужен аудит |
| 5 | TrustBar (3 фичи) | `sections/trust-bar.liquid` | ✅ exists, нужен аудит |
| 6 | CatalogCards (Perfumes / Leather Goods) | `sections/catalog-cards.liquid` | ✅ exists, нужен аудит |
| 7 | EditorialBlock (Heritage/Quality) | `sections/editorial-heritage.liquid` | ✅ exists, нужен аудит |
| 8 | WholesalePackages (2 пакета) | `sections/packages-wholesale.liquid` | ✅ exists, нужен аудит |
| 9 | BottomCTA (Apply for Partnership) | `sections/bottom-cta.liquid` | ✅ exists, нужен аудит |
| 10 | ScrollToTop button | `snippets/scroll-to-top.liquid` + JS | ✅ exists, нужен аудит |
| 11 | Footer | `sections/footer.liquid` (Dawn-нативный) | 🔲 audit + extend |

См. `/mockups/SECTIONS-MAP.md` для деталей и чеклиста аудита.

### Что нужно проверить в каждой ✅ exists секции

1. Локализация: все строки через `{{ '...' | t }}`, не хардкод (BUGS #18)
2. Соответствие макету `/mockups/components/<Name>.jsx`
3. A11y high-contrast вариант через `html.a11y-high-contrast`
4. Schema settings: тексты вынесены в `{% schema %}`
5. Wholesale gating где применимо

### React-макет: что есть, что нужно учесть при миграции

- **Mega Menu** в Header работает на hover, открывает 2 колонки. В Liquid — рендерить из `linklists` Shopify (D-03).
- **Language Switcher** EN/CS/VI — нативные `localization` объекты Shopify.
- **Accessibility state** — переписать с React useState на localStorage + JS-классы на `<html>`.
- **Hardcoded тексты** в React → в Liquid через `{% schema %}` + `locales/`.
- **Иконки lucide-react** → inline SVG snippets (`snippets/icon-package.liquid` и т.д.).
- **Tailwind classes** → переписаны на inline CSS темы (см. ARCHITECTURE — Tailwind в Liquid не используем).

---

## Cart Flow

### Fixes applied
- ✅ `product-b2b.liquid` — `cart:refresh` event renamed to `cart:updated` with cart detail payload so MOQ bar updates after PDP add-to-cart _(DS found · CL applied)_
- ✅ `product-grid-b2b-logged-in.liquid` — ATC handler now dispatches `cart:updated` after success so cart-summary MOQ bar responds to catalog adds _(DS found · CL applied)_

### Pending / not built
- 🔲 `/pages/thank-you` order confirmation page — cart-summary redirects here but page doesn't exist _(DS found, see BUGS #9)_
- 🔲 Custom checkout flow (между корзиной и thank-you page) — где собирается адрес/контакт/комментарий
- 🔲 Invoice generation — **через Shopify Order Printer** (D-01 closed). Нужно: установить app + Liquid-темплейт Proforma Invoice
- 🔲 Back-in-stock notification for OOS products _(DS found)_
- 🔲 Order history / reorder flow _(DS found)_
- 🔲 `cart-summary-b2b.liquid` — re-test MOQ bar on live shop after refactor (commit `e5781b7`) _(US/CL)_

### Known issues (low priority)
- 🔲 `progress_raw` Liquid variable in `cart-summary-b2b.liquid` is dead code — bar is driven by JS, not Liquid. Harmless, can remove during cleanup _(DS found)_
- 🔲 Singleton guards (`window.lpCartItemsReady`, `window.lpCartSummaryReady`) use global flags instead of per-section-id. Low risk since sections appear once per page _(DS found)_

---

## Catalog / Grid

### Fixes applied
- ✅ `catalog-header.liquid` — merged `catalog-header-b2b.liquid` into one state-aware section: wholesale customers see "Create Order" heading + description, guests see `collection.title` / `collection.description` _(DS designed · CL built)_
- ✅ `catalog-header-b2b.liquid` — deleted (186 lines removed) _(CL)_
- ✅ `templates/collection.json`, `collection.partner-collection.json` — updated to use unified `catalog-header` section _(CL)_
- ✅ `product-grid-b2b-logged-in.liquid` — added `customer.tags contains 'wholesale'` gate; non-wholesale visitors now see a login prompt instead of B2B prices _(DS found · CL applied)_

### Pending / not built
- 🔲 Wire `custom.discount_tier` + `custom.discount_percentage` customer metafields to pricing in grid and cart _(D-09 closed: 4 tiers, defaults 0/5/10/15%, manual assignment per D-05)_
- 🔲 Product-level MOQ enforcement — PDP qty stepper defaults to 5 but no minimum enforced _(DS found)_
- 🔲 Discount tier application logic not built — должна читать `customer.metafields.custom.discount_tier` + `discount_percentage` с дефолтом 0% если метафилд отсутствует
- 🔲 WSP metafield в CZK — проверить весь код, что нигде нет деления на 100 (после решения D-06)

---

## Product Pages (PDP)

### Fixes applied
- ✅ `product-b2b.liquid` — event name fix (see Cart Flow above)

### Pending
- 🔲 Variant selector — currently only renders first available variant, no switching UI
- 🔲 Анализ Gemini React-макетов для PDP — у Gemini в `/mockups` нет PDP-макета (только лендинг блоки). Если нужен PDP-дизайн — отдельная задача для Gemini.
- 🔲 Product MOQ enforcement (см. Catalog/Grid выше)

---

## Sections / UI

### Fixes applied
- ✅ `predictive-search-overlay.liquid` — fixed double focus ring on search input. Root cause: Dawn `assets/base.css` line 727 `*:focus-visible { box-shadow: var(--focused-base-box-shadow) }` overrode local `outline: none`. Fixed by adding explicit `box-shadow: none` scoped rule _(DS diagnosed · CL applied)_
- ✅ `how-it-works.liquid` — added 4 optional URL settings (`step_1_url`–`step_4_url`); when set, step number renders as `<a>` with `aria-label`; added hover states (orange + scale) _(US requested · CL built)_

### Blocked
- ❌ Phone field overlap on Apply form — needs Massy app rendered HTML or screenshot to diagnose. Cannot fix blind _(DS/CL blocked · waiting on US)_

### Pending
- 🔲 Все 11 React-блоков (см. таблицу React → Liquid выше)
- 🔲 Топбар: добавить `{shop_name} · {tier}` для залогиненного wholesale-кастомера

---

## Account Dashboard

### Pending
- 🔲 Реализовать структуру дашборда _(D-02 closed)_:
  - `/pages/partner-dashboard` (overview)
  - `/pages/partner-dashboard?tab=orders` (вкладка)
  - `/pages/partner-dashboard?tab=invoices` (вкладка)
  - `/pages/quick-reorder` (отдельная страница)
- 🔲 Аудит репо: найти и удалить дубли (`/pages/invoices`, `/pages/order-history` если есть)
- 🔲 Проверить `dashboard-content.liquid` — работают ли вкладки Orders и Invoices
- 🔲 Profile-страница (UI наш, данные через Massy) _(D-04 closed)_
- 🔲 Order history rendering на вкладке `?tab=orders`
- 🔲 Quick reorder функционал на `/pages/quick-reorder`
- 🔲 Invoice download (через Order Printer) на вкладке `?tab=invoices`

---

## Architecture / Tech Decisions

См. `/docs/ARCHITECTURE.md` для полного списка зафиксированных решений.

### Recently decided (2026-05-02)

**Все известные открытые вопросы закрыты этой сессией.** Detail в `/docs/DECISIONS.md`.

- ✅ D-01 Invoice generator = **Shopify Order Printer**
- ✅ D-02 Dashboard = табы внутри `/pages/partner-dashboard`, отдельные страницы для quick-reorder, дубли удаляются
- ✅ D-03 Menu = кастомный HTML в `header.liquid`, NOT linklist; план аудита в DECISIONS
- ✅ D-04 Massy = регистрация/login/apply + теги; UI дашборда/каталога/чекаута/инвойсов — наши
- ✅ D-05 Discount tiers = ручное присвоение для MVP, авто — через 3–6 мес
- ✅ D-06 WSP metafield = CZK (not cents)
- ✅ D-07 Checkout = custom flow → /pages/thank-you, no Shopify Checkout
- ✅ D-08 Shipping = manual via invoice
- ✅ D-09 Discount tiers = Standard/Silver/Gold/Platinum (default 0/5/10/15%)
- ✅ D-10 Topbar shows {shop_name} · {tier} when logged in

### Open decisions
_(нет на данный момент)_

---

## Missing MVP Features

См. `/docs/MVP-CHECKLIST.md` для полного списка с приоритетами.

---

## Known Bugs

См. `/docs/BUGS.md` для актуального списка.

---

## Session Log

### 2026-05-02 (evening-2) — Task A: Discount tier pricing

**Participants:** DS (design) · CC (implementation)

**Context:** DeepSeek спроектировал паттерн discount tier pricing (integer arithmetic `discount_factor = 100 | minus: discount_pct`). CC применил во всех трёх секциях.

**Done this session:**
- ✅ `product-grid-b2b-logged-in.liquid` — читает `custom.discount_tier` + `custom.discount_percentage` один раз в head; вычисляет `final_cents = wsp_cents * discount_factor / 100` per-product; показывает зачёркнутый WSP + финальную цену оранжевым когда `has_discount`; margin от `final_cents`
- ✅ `product-b2b.liquid` — то же для PDP: `final_price`, зачёркнутый WSP в pricing box, amber tier badge ниже margin, `unitCents` в JS = `final_price`
- ✅ `cart-summary-b2b.liquid` — `discounted_subtotal = subtotal * discount_factor / 100`; MOQ check против discounted; discount line в breakdown; VAT и total на discounted base; `data-discount-pct` attr; JS `onCartChange` применяет discount; init() тоже
- ✅ `BUGS.md` #14 закрыт (✅ Fixed)

**Next:** BUGS #9 `/pages/thank-you` — страница не существует, cart-summary редиректит на 404

---

### 2026-05-02 (evening) — Task B: топбар {shop_name} · {tier}

**Participants:** CC · US

**Context:** Новый пакет документации загружен в репо. CC прочитал PROMPT-claude-code.md, провёл онбординг, начал с задачи B.

**Done this session:**
- ✅ `lp-b2b-package/` распакован и закоммичен (обновлённые docs, mockups, handoff)
- ✅ `header.liquid` — топбар обновлён согласно D-10: теперь показывает `{shop_name} · {tier}` вместо `{first_name} {last_name}`. Читает `custom.shop_name` (fallback → `customer.first_name` если метафилд пустой). Tier с `capitalize`, fallback → "Standard". Иконка дом вместо человека.
- ✅ `BUGS.md` #15 закрыт (✅ Fixed)

**Next:** задача A — discount tier pricing

---

### 2026-05-02 (post-CC audit) — Docs synced with actual repo state

**Participants:** CC · CL · US

**Context:** После создания пакета документации Маша запустила Claude Code, который провёл аудит реального состояния репо и нашёл 5 расхождений между доками и кодом. Доки обновлены под реальность.

**Findings от CC:**
1. SECTIONS-MAP помечал все 11 React-блоков как 🔲 not built — на самом деле **8 из 11 уже существуют** в репо (hero-b2b, trust-bar, catalog-cards, editorial-heritage, packages-wholesale, bottom-cta, accessibility-panel, scroll-to-top). Осталось аудитить header, footer, announcement-bar (Dawn-нативные)
2. ARCHITECTURE предписывал `lp:` namespace для events — реальный код использует `cart:updated` без префикса (как DS и фиксил). Документация виновата, не код
3. ARCHITECTURE предписывал `lp-` префикс для CSS — реальный код использует короткие префиксы по секциям (`cib`, `csb`, `pgbl`). Аналогично — доки были фантазией
4. Хардкод EN строк во всех B2B-секциях — реальный долг, без него локализация не работает (BUGS #18 добавлен)
5. BUGS #4 (`/100` для WSP) уже исправлен в коде

**Done this session:**
- ✅ ARCHITECTURE.md — events naming convention синхронизирован с кодом (`cart:updated` без префикса)
- ✅ ARCHITECTURE.md — CSS class naming синхронизирован (короткие префиксы по секциям, не `lp-`)
- ✅ SECTIONS-MAP.md — переписан, 8 из 11 секций помечены как ✅ exists с пометкой «нужен аудит качества»
- ✅ BUGS.md — #4 закрыт (Fixed), #18 добавлен (хардкод EN строк во всех B2B-секциях, High severity)
- ✅ PROGRESS.md — React migration таблица обновлена, новый session log

**Параллельно (от CC топ-3 приоритета):**
- 🔄 B (топбар `{shop_name} · {tier}`) — быстрая задача, ~30 минут, разблокирует канал чтения customer метафилдов в UI
- 🔄 A (discount tier pricing) — главное для MVP, формула `final = wsp * (1 - discount_pct / 100)` в grid и cart
- 🔄 Аудит существующих ✅ secrets секций (B2B-локализация = #18)

**Recommended order:** B → A → C (вместо A → B → C). Топбар первым потому что (а) маленький, (б) тестирует канал customer metafields → Liquid → UI end-to-end дёшево, (в) discount tier pricing наследует тот же канал.

**Next session priorities:**
1. **CC:** делает B (топбар) — быстрый win, тест канала метафилдов
2. **CC:** делает A (discount tier pricing) — после B
3. **US:** установить Order Printer в админке (см. SHOPIFY-SETUP.md)
4. **US:** прислать HTML формы Massy (input телефона + label) для разблокировки BUGS #5
5. **DS:** написать кастомный Liquid-темплейт Proforma Invoice для Order Printer
6. **DS:** аудит `header.liquid` по плану из D-03 (mega menu, account dropdown, mobile)
7. **CC + DS:** локализация — вынести хардкод EN строк в `locales/` (BUGS #18, большая задача)

### 2026-05-02 (late) — All 5 open decisions closed by DeepSeek review

**Participants:** DS · CL · US

**Context:** Сразу после создания пакета документации Маша отправила DECISIONS.md в DeepSeek для review. DS дал подробные рекомендации по всем 5 открытым вопросам, Маша приняла все рекомендации.

**Done this session:**
- ✅ D-01 → Shopify Order Printer как генератор инвойсов
- ✅ D-02 → структура дашборда зафиксирована (tabs + отдельные страницы)
- ✅ D-03 → структура меню разобрана (4 типа), план аудита составлен
- ✅ D-04 → границы между Massy и темой определены
- ✅ D-05 → ручное присвоение discount tier для MVP
- ✅ DECISIONS.md обновлён — все 5 в раздел «Закрытые»
- ✅ PROGRESS.md обновлён — этот лог
- ✅ BUGS.md обновлён — план фикса BUGS #5 (phone overlap)

**Параллельно:**
- 🔄 Маша запустила Claude Code на работу над D-01 (Order Printer) и D-02 (структура дашборда)

**Next session priorities:**
1. **US:** прислать HTML формы Massy (один input телефона + label) для разблокировки BUGS #5
2. **DS:** аудит `header.liquid` по плану из D-03
3. **DS:** аудит кода на `wholesale_price / 100` (после D-06 — CZK)
4. **DS:** написать кастомный Liquid-темплейт Proforma Invoice для Order Printer
5. **CC:** результаты от Claude Code по D-01 / D-02 — внести изменения в PROGRESS.md
6. **CC:** реализация discount tier чтения из метафилдов в каталоге и корзине
7. **CC:** реализация топбара `{shop_name} · {tier}` (D-10)
8. **US:** установить Order Printer в админке Shopify

### 2026-05-02 — Documentation package created

**Participants:** CL · US

**Context:** Контекст разъехался между несколькими AI (DeepSeek, Gemini, Claude Code, Claude в чате). Никто не помнит полной картины. Решено: всё что в чатах → в физические `.md` файлы в репо. Любой AI на следующем заходе читает `/docs` и `/mockups` без потери контекста.

**Done this session:**
- ✅ Создана структура `/docs`, `/mockups`, `/handoff`
- ✅ Написаны: README, REQUIREMENTS, ARCHITECTURE, DECISIONS, PROGRESS (этот файл), BUGS, MVP-CHECKLIST, SHOPIFY-SETUP
- ✅ Закрыты решения D-06 (CZK), D-07 (custom checkout), D-08 (manual shipping), D-09 (4 tiers), D-10 (topbar format)
- ✅ Открыты новые: D-01 (invoice gen), D-02 (dashboard), D-03 (menu), D-04 (Massy), D-05 (tier assignment)
- ✅ Разбит React-макет на 11 компонентов в `/mockups/components/`
- ✅ Написаны hand-off промпты для DeepSeek / Claude Code / Gemini / Claude (chat)

**Next session priorities:**
1. **US:** загрузить пакет в репо в корень (`git add docs mockups handoff README.md`)
2. **CC (Claude Code):** прочитать `/docs/`, провести аудит текущего кода против ARCHITECTURE.md
3. **CC:** определить что из 11 React-блоков уже частично реализовано в Liquid, обновить SECTIONS-MAP
4. **DS:** review кода на тему WSP в CZK — найти все места где могло быть деление на 100
5. **US:** ответить на D-01 (invoice gen — рекомендация: Order Printer)
6. **US:** аудит дашборда — какие страницы оставить, какие удалить (D-02)
7. **US:** прислать рендеренный HTML формы Massy для фикса phone overlap
8. **CL/CC:** начать миграцию React → Liquid с самой простой секции (TrustBar или BottomCTA)

### 2026-04-28 / 2026-05-02 — Initial rewrite review + cart flow fixes

**Participants:** DS · CL · US

**Context:** User was using external DeepSeek web chat to build everything but got stuck — Claude was applying fixes to the wrong branch (main instead of the rewrite branch). External DS chat had accumulated context rot. Switched to in-session MCP multi-AI workflow.

**Done this session:**
- ✅ Identified active branch: `claude/react-to-shopify-hero-lfeDP-deepseek`
- ✅ Catalog header dedup (merged two sections into one)
- ✅ Deleted `catalog-header-b2b.liquid`
- ✅ Fixed predictive search overlay focus ring
- ✅ Added step links + hover states to `how-it-works.liquid`
- ✅ DS full review of 6 core B2B sections
- ✅ Fixed cart event chain: `cart:refresh` → `cart:updated` in PDP
- ✅ Added `cart:updated` dispatch to catalog grid ATC
- ✅ Added wholesale gate to product grid section

**Found this session (DS):**
- Broken event chain: PDP and grid ATC never updated cart-summary
- Missing wholesale gate on product grid
- WSP metafield unit ambiguity (resolved 2026-05-02 → CZK)
- Dead Liquid variable `progress_raw`
- 4 singleton guard notes
- Full list of missing MVP features

**Blocked:**
- Phone field overlap — waiting on Massy app rendered HTML / screenshot from US

---

*Log maintained by CL (Claude chat) · Code decisions by DS (DeepSeek) · Design decisions by GM (Gemini) · Repo edits by CC (Claude Code)*
