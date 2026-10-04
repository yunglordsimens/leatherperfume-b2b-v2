# Sections Map

Полная таблица соответствий: React-компонент → Liquid-файл → статус миграции.

⚠️ **Updated 2026-05-02 после аудита Claude Code на живом репо.** 8 из 11 секций уже существуют — задача не «писать с нуля», а **аудит качества + локализация + правки под закрытые DECISIONS**.

## Лендинг (главная страница)

| # | React | Liquid | Status | Notes |
|---|-------|--------|--------|-------|
| 1 | `AccessibilityPanel.jsx` | `snippets/accessibility-panel.liquid` | ✅ exists | Аудит: соответствует ли макету, работает ли state через localStorage |
| 2 | `AnnouncementBar.jsx` | `sections/announcement-bar.liquid` | 🔲 audit + extend | Dawn-нативная, проверить текст/стиль и locales |
| 3 | `Header.jsx` | `sections/header.liquid` | 🔲 audit + extend | Dawn-нативная. Расширить под Mega Menu (D-03), Lang Switcher, A11y кнопку, B2B топбар (D-10) |
| 4 | `Hero.jsx` | `sections/hero-b2b.liquid` | ✅ exists | Аудит против макета + локализация |
| 5 | `TrustBar.jsx` | `sections/trust-bar.liquid` | ✅ exists | Аудит против макета + локализация |
| 6 | `CatalogCards.jsx` | `sections/catalog-cards.liquid` | ✅ exists | Аудит против макета + локализация |
| 7 | `EditorialBlock.jsx` | `sections/editorial-heritage.liquid` | ✅ exists | Аудит против макета + локализация |
| 8 | `WholesalePackages.jsx` | `sections/packages-wholesale.liquid` | ✅ exists | Аудит против макета + локализация |
| 9 | `BottomCTA.jsx` | `sections/bottom-cta.liquid` | ✅ exists | Аудит против макета + локализация |
| 10 | `ScrollToTop.jsx` | `snippets/scroll-to-top.liquid` | ✅ exists | Аудит, проверить включение в `layout/theme.liquid` |
| 11 | `Footer.jsx` | `sections/footer.liquid` | 🔲 audit + extend | Dawn-нативная. Расширить под B2B-навигацию + locales |

**Сводка миграции:**
- ✅ **8 of 11 уже существуют** в репо — нужен аудит качества против `/mockups/components/*.jsx`
- 🔲 **3 of 11 — Dawn-нативные** (header, footer, announcement-bar) — нужен аудит и расширение

## Шаблон главной (templates/index.json)

Должен включать секции в таком порядке:

```
1. announcement-bar (settings_schema, не в template обычно)
2. header (settings_schema, не в template)
3. hero-b2b
4. trust-bar
5. catalog-cards
6. editorial-heritage
7. packages-wholesale
8. bottom-cta
9. footer (settings_schema)
```

## Другие страницы (не покрыто React-макетом)

Эти страницы тоже нужны, но дизайн не нарисован — нужно либо просить Gemini нарисовать, либо использовать Dawn-дефолты:

| Страница | Шаблон | Статус |
|----------|--------|--------|
| Apply for Partnership | `templates/page.apply.json` | 🔲 — Massy форма embedded (BUGS #5 phone overlap) |
| Login | `templates/customers/login.liquid` | 🔲 — Massy login |
| Каталог (для wholesale) | `templates/collection.json` | ✅ partial — `catalog-header.liquid` + `product-grid-b2b-logged-in.liquid` |
| PDP | `templates/product.json` | ✅ partial — `product-b2b.liquid` |
| Корзина | `templates/cart.json` | ✅ partial — `cart-summary-b2b.liquid` (MOQ bar работает) |
| Custom checkout | `templates/page.checkout.json` | 🔲 not built |
| Thank You / Order Received | `templates/page.thank-you.json` | 🔲 not built (BUGS #9) |
| Partner Dashboard (overview) | `templates/page.partner-dashboard.json` | 🔲 not built (D-02) |
| Quick Reorder | `templates/page.quick-reorder.json` | 🔲 not built (D-02) |
| Order details (нативная) | `templates/customers/order.liquid` | 🔲 audit |

## Качество существующих секций — что аудитировать

Для каждой ✅ exists секции CC/DS должен проверить:

1. **Локализация:** все ли строки через `{{ '...' | t }}` или ещё хардкод EN? (BUGS #18 — массовый хардкод)
2. **Соответствие макету:** структура и стили match с `/mockups/components/<Name>.jsx`?
3. **A11y high-contrast вариант:** работает ли через `html.a11y-high-contrast`?
4. **Schema settings:** все настраиваемые тексты вынесены в `{% schema %}`?
5. **Wholesale gating:** где применимо — есть ли `customer.tags contains 'wholesale'`?

## Flow когда менять статус

| Старый | Новый | Когда |
|--------|-------|-------|
| 🔲 not built | 🔄 in progress | Когда CC начал писать `.liquid` файл |
| 🔄 in progress | 🔍 review | Когда файл написан, ждёт review от DS |
| ✅ exists | 🔍 audit-review | После аудита кем-то (CC/DS), результаты в PROGRESS |
| 🔍 review | ✅ done | После закрытия аудита и мержа |
| ✅ done | ❌ regression | Если что-то сломалось, нужен фикс |

После любого изменения статуса — запись в `/docs/PROGRESS.md` Session Log.
