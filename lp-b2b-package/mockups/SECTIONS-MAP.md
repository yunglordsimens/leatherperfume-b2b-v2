# Sections Map

Полная таблица соответствий: React-компонент → Liquid-файл → статус миграции.

## Лендинг (главная страница)

| # | React | Liquid | Status | Notes |
|---|-------|--------|--------|-------|
| 1 | `AccessibilityPanel.jsx` | `snippets/accessibility-panel.liquid` | 🔲 not built | Включается в `layout/theme.liquid` чтобы быть на всех страницах |
| 2 | `AnnouncementBar.jsx` | `sections/announcement-bar.liquid` | 🔲 audit | Dawn-нативная секция, проверить что текст и стиль соответствуют |
| 3 | `Header.jsx` | `sections/header.liquid` | 🔲 audit + extend | Dawn-нативная, нужно расширить под Mega Menu, Lang Switcher, A11y кнопку, B2B топбар |
| 4 | `Hero.jsx` | `sections/hero-b2b.liquid` | 🔲 not built | Новая секция |
| 5 | `TrustBar.jsx` | `sections/trust-bar.liquid` | 🔲 not built | Новая секция, 3 blocks в schema |
| 6 | `CatalogCards.jsx` | `sections/catalog-cards.liquid` | 🔲 not built | Новая секция, 2 blocks в schema |
| 7 | `EditorialBlock.jsx` | `sections/editorial-heritage.liquid` | 🔲 not built | Новая секция |
| 8 | `WholesalePackages.jsx` | `sections/packages-wholesale.liquid` | 🔲 not built | Новая секция, 2+ blocks (расширяемое) |
| 9 | `BottomCTA.jsx` | `sections/bottom-cta.liquid` | 🔲 not built | Новая секция |
| 10 | `ScrollToTop.jsx` | `snippets/scroll-to-top.liquid` + JS в `assets/theme.js` | 🔲 not built | Включается в `layout/theme.liquid` |
| 11 | `Footer.jsx` | `sections/footer.liquid` | 🔲 audit + extend | Dawn-нативная, расширить под B2B-навигацию |

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
| Apply for Partnership | `templates/page.apply.json` | 🔲 — Massy форма embedded |
| Login | `templates/customers/login.liquid` | 🔲 — Massy login |
| Каталог (для wholesale) | `templates/collection.json` | ✅ partial — `catalog-header.liquid` + `product-grid-b2b-logged-in.liquid` |
| PDP | `templates/product.json` | ✅ partial — `product-b2b.liquid` |
| Корзина | `templates/cart.json` | ✅ partial — `cart-summary-b2b.liquid` (MOQ bar работает) |
| Custom checkout | `templates/page.checkout.json` | 🔲 not built |
| Thank You / Order Received | `templates/page.thank-you.json` | 🔲 not built (BUGS #9) |
| Account dashboard | `templates/customers/account.liquid` | 🔲 not built (DECISIONS D-02) |
| Order history | `templates/customers/orders.liquid` | 🔲 not built |
| Order details | `templates/customers/order.liquid` | 🔲 not built |

## Flow когда менять статус

| Старый | Новый | Когда |
|--------|-------|-------|
| 🔲 not built | 🔄 in progress | Когда CC начал писать `.liquid` файл |
| 🔄 in progress | 🔍 review | Когда файл написан, ждёт review от DS |
| 🔍 review | ✅ done | После мержа в `claude/react-to-shopify-hero-lfeDP-deepseek` |
| ✅ done | ❌ regression | Если что-то сломалось, нужен фикс |

После любого изменения статуса — запись в `/docs/PROGRESS.md` Session Log.
