# MVP Checklist

Что должно быть сделано перед тем как сайт можно показать первым реальным B2B-клиентам.

## Tier 1 — Без этого не запускаемся (Hard blockers)

| # | Item | Status | Owner | Blocked by |
|---|------|--------|-------|------------|
| 1.1 | Wholesale gate работает на всех приватных страницах | ✅ Done (grid) / 🔲 audit others | CC | — |
| 1.2 | PDP с qty stepper и MOQ enforcement | 🔲 | CC + DS | — |
| 1.3 | Cart с MOQ-баром (5,000 CZK) — работает | ✅ Done | — | retest нужен |
| 1.4 | Кастомный checkout-флоу (адрес/контакт/комментарий) | 🔲 | CC | — |
| 1.5 | `/pages/thank-you` страница существует | 🔲 | US (создать в админке) + CC (контент) | — |
| 1.6 | Invoice generation работает | 🔲 | US (выбрать app) + CC | DECISIONS D-01 |
| 1.7 | Discount tier применяется к ценам в каталоге и корзине | 🔲 | CC + DS | DECISIONS D-09 done, имплементация TBD |
| 1.8 | Topbar показывает {shop_name} · {tier} для залогиненных | 🔲 | CC | — |
| 1.9 | Apply for partnership форма работает (включая фикс phone field) | ❌ Blocked | US (Massy HTML) + CC | BUGS #5 |
| 1.10 | Login / logout flow через Massy — работает на всех страницах | 🔲 | US (Massy config) + CC | — |
| 1.11 | Все 11 React-блоков мигрированы в Liquid | 🔲 | CC + GM | см. SECTIONS-MAP |

## Tier 2 — Желательно к запуску, но можно после

| # | Item | Status | Owner |
|---|------|--------|-------|
| 2.1 | Дашборд аккаунта (без дубляжей, чистая структура) | 🔲 | US (D-02) + CC |
| 2.2 | Order history page | 🔲 | CC |
| 2.3 | Quick reorder функционал | 🔲 | CC |
| 2.4 | Invoice download из аккаунта | 🔲 | CC |
| 2.5 | Локализация EN / CS / VI — все ключи переведены | 🔲 | US (переводы) + CC |
| 2.6 | Email templates на 3 языках | 🔲 | US |
| 2.7 | Legal страницы заполнены (B2B Terms, Privacy, Returns) | 🔲 | US |
| 2.8 | A11y панель работает (contrast, text size, links) | 🔲 | CC |
| 2.9 | VAT поля в форме регистрации (IČO/DIČ для CZ) | 🔲 | US (Massy config) |

## Tier 3 — Можно после запуска

| # | Item | Status | Owner |
|---|------|--------|-------|
| 3.1 | Back-in-stock notifications | 🔲 | CC |
| 3.2 | ARES API валидация чешских компаний | 🔲 | CC |
| 3.3 | Auto-tier assignment по обороту | 🔲 | DS + CC |
| 3.4 | VAT display toggle (EU vs non-EU) | 🔲 | CC |
| 3.5 | Loyalty/repeat order бонусы | 🔲 | продуктовое решение |
| 3.6 | SEO оптимизация под B2B-ключи | 🔲 | US |
| 3.7 | Analytics setup (GA4 + Meta Pixel) | 🔲 | US |
| 3.8 | Shopify Flow для авто-теггирования | 🔲 | US (admin) |

---

## Pre-launch чеклист (за день до запуска)

- [ ] Все Tier 1 items закрыты ✅
- [ ] Тестовый прогон полного флоу: регистрация → апрув → каталог → корзина → checkout → инвойс → оплата → отгрузка
- [ ] Тест на 3 языках
- [ ] Тест на mobile (iOS Safari, Android Chrome)
- [ ] Тест на desktop (Chrome, Safari, Firefox)
- [ ] Все ссылки в footer работают
- [ ] Все 404 страницы кастомные (не Dawn-default)
- [ ] Email-уведомления уходят (test order)
- [ ] Backup репо + текущая live тема экспортирована (`shopify theme pull`)
- [ ] Robots.txt / sitemap.xml корректные
- [ ] Все тестовые заказы удалены из live shop

---

## Что считается «MVP запуском»

- 5–10 реальных верифицированных партнёров могут залогиниться
- Сделать заказ на 5,000+ CZK
- Получить инвойс на email
- Оплатить по инвойсу
- Заказ отгружается из Праги

Если хоть один шаг ломается — это не MVP.
