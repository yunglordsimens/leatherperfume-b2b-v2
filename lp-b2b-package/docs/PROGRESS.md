# B2B Wholesale Portal — Build Log

**Project:** Shopify Dawn Theme → B2B Wholesale portal (React mockups → Liquid sections)
**Branch:** `claude/react-to-shopify-hero-lfeDP-deepseek`
**Base branch (preserved, untouched):** `claude/react-to-shopify-hero-lfeDP`
**GitHub:** `yunglordsimens/leatherperfume-b2b-v2`
**Last Updated:** 2026-05-02

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

Контекст: Gemini сделал React-макет в `/mockups/App.full.jsx` (исходный визуал), нужно перенести в Liquid-секции Dawn.

### Полный список блоков из React-макета

| # | React component | Liquid target | Status |
|---|-----------------|---------------|--------|
| 1 | AccessibilityPanel | `snippets/accessibility-panel.liquid` | 🔲 not built |
| 2 | AnnouncementBar (top notification) | `sections/announcement-bar.liquid` (Dawn-нативный, кастомизировать) | 🔲 |
| 3 | Header (с Mega Menu, Lang Switcher, A11y кнопкой, Login, Cart) | `sections/header.liquid` (Dawn-нативный, кастомизировать) | 🔲 |
| 4 | Hero (B2B partnership) | `sections/hero-b2b.liquid` | 🔲 |
| 5 | TrustBar (3 фичи) | `sections/trust-bar.liquid` | 🔲 |
| 6 | CatalogCards (Perfumes / Leather Goods) | `sections/catalog-cards.liquid` | 🔲 |
| 7 | EditorialBlock (Heritage/Quality) | `sections/editorial-heritage.liquid` | 🔲 |
| 8 | WholesalePackages (2 пакета) | `sections/packages-wholesale.liquid` | 🔲 |
| 9 | BottomCTA (Apply for Partnership) | `sections/bottom-cta.liquid` | 🔲 |
| 10 | ScrollToTop button | `snippets/scroll-to-top.liquid` + JS в `assets/theme.js` | 🔲 |
| 11 | Footer | `sections/footer.liquid` (Dawn-нативный, кастомизировать) | 🔲 |

См. `/mockups/SECTIONS-MAP.md` для полной карты соответствий.

### React-макет: что есть, что нужно учесть при миграции

- **Mega Menu** в Header работает на hover, открывает 2 колонки (Perfumes / Leather Goods). В Liquid рендерить из `linklists` Shopify (не хардкод).
- **Language Switcher** EN/CS/VI — в Liquid использовать нативные `localization` объекты Shopify.
- **Accessibility state** — переписать с React useState на localStorage + JS-классы на `<html>`.
- **Hardcoded тексты** в Reactе → в Liquid вынести в `{% schema %}` settings + `locales/`.
- **Иконки lucide-react** → inline SVG snippets (`snippets/icon-package.liquid` и т.д.).
- **Tailwind classes** → переписать под inline CSS темы (см. ARCHITECTURE — Tailwind в Liquid не используем).

---

## Cart Flow

### Fixes applied
- ✅ `product-b2b.liquid` — `cart:refresh` event renamed to `cart:updated` with cart detail payload so MOQ bar updates after PDP add-to-cart _(DS found · CL applied)_
- ✅ `product-grid-b2b-logged-in.liquid` — ATC handler now dispatches `cart:updated` after success so cart-summary MOQ bar responds to catalog adds _(DS found · CL applied)_

### Pending / not built
- 🔲 `/pages/thank-you` order confirmation page — cart-summary redirects here but page doesn't exist _(DS found, see BUGS #9)_
- 🔲 Custom checkout flow (между корзиной и thank-you page) — где собирается адрес/контакт/комментарий
- 🔲 Invoice generation — TBD каким приложением (см. DECISIONS D-01)
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
- 🔲 Wire `custom.discount_tier` + `custom.discount_percentage` customer metafields to pricing in grid and cart _(DS found, см. DECISIONS D-09)_
- 🔲 Product-level MOQ enforcement — PDP qty stepper defaults to 5 but no minimum enforced _(DS found)_
- 🔲 Discount tier application logic not built _(DS found)_
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
- 🔲 Прояснить структуру дашборда (см. DECISIONS D-02 — дубляж страниц)
- 🔲 Решить что делает Massy, что мы (см. DECISIONS D-04)
- 🔲 Order history page
- 🔲 Quick reorder page
- 🔲 Invoice download page

---

## Architecture / Tech Decisions

См. `/docs/ARCHITECTURE.md` для полного списка зафиксированных решений.

### Recently decided (2026-05-02)
- ✅ WSP metafield = CZK (not cents) — D-06 closed
- ✅ Checkout = custom flow → /pages/thank-you, no Shopify Checkout — D-07 closed
- ✅ Shipping = manual via invoice — D-08 closed
- ✅ Discount tiers = Standard/Silver/Gold/Platinum (default 0/5/10/15%) — D-09 closed
- ✅ Topbar shows {shop_name} · {tier} when logged in — D-10 closed

### Open decisions
См. `/docs/DECISIONS.md` — D-01 (invoice gen), D-02 (dashboard structure), D-03 (menu audit), D-04 (Massy boundaries), D-05 (tier assignment process)

---

## Missing MVP Features

См. `/docs/MVP-CHECKLIST.md` для полного списка с приоритетами.

---

## Known Bugs

См. `/docs/BUGS.md` для актуального списка.

---

## Session Log

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
