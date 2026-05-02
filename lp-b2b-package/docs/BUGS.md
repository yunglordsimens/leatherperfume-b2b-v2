# Bugs Tracker

Severity: **Critical** = блокирует MVP запуск · **High** = критично для UX · **Medium** = заметно но не критично · **Low** = технический долг

| # | Bug | Severity | Status | Found By | How to reproduce | How to test fix |
|---|-----|----------|--------|----------|------------------|-----------------|
| 1 | `cart:refresh` event not caught by cart-summary | Critical | ✅ Fixed | DS | Add product to cart from PDP — MOQ bar не обновлялся | Добавить с PDP, проверить что MOQ-bar обновился без перезагрузки |
| 2 | Grid ATC never fired `cart:updated` | Critical | ✅ Fixed | DS | Add product from collection grid — cart-summary не реагировал | То же что #1, но из коллекции |
| 3 | No wholesale gate on product grid | Critical | ✅ Fixed | DS | Открыть коллекцию без логина — видны B2B-цены | Гость видит login prompt вместо цен; залогиненный wholesale видит цены |
| 4 | WSP metafield unit ambiguity (cents vs CZK) | High | ✅ Fixed (2026-05-02) | DS | Цены могли отображаться неправильно если код делил на 100 | После решения CZK — пройтись по всем файлам, убрать `/ 100` где читается `wholesale_price` |
| 5 | Phone field overlap on Apply form | High | ❌ Blocked | US/DS | Открыть Apply form, поле телефона визуально налезает на соседнее | Нужен HTML формы Massy в DOM или скриншот для диагностики |
| 6 | Singleton JS guards not per-section-id | Low | 🔲 Open | DS | Только в теории — секция дублируется на странице | Не проявляется при текущем использовании |
| 7 | `progress_raw` dead Liquid variable | Low | 🔲 Open | DS | В `cart-summary-b2b.liquid` объявлена но не используется | Удалить переменную, проверить что MOQ bar всё ещё работает (он на JS) |
| 8 | Margin calc could divide by zero if WSP = 0 | Medium | 🔲 Open | DS | Если `custom.wholesale_price` = 0 — ошибка делением на ноль | Установить WSP=0 на тестовом продукте, проверить что нет JS-ошибки |
| 9 | No `/pages/thank-you` page exists | High | 🔲 Open | DS | После submit заказа — 404 | Создать страницу, после submit редирект → 200 OK |

---

## Новые баги / неясности (добавлены 2026-05-02)

| # | Issue | Severity | Status | Notes |
|---|-------|----------|--------|-------|
| 10 | Дубляж страниц в дашборде аккаунта | High | ❌ Open | Quick Reorder, Invoice page, и третья похожая. Что оставить, что снести? См. DECISIONS D-02 |
| 11 | Меню — структура неясна | Medium | ❌ Open | Главное / Mega Menu / Account меню — не аудитировано. См. DECISIONS D-03 |
| 12 | Massy B2B vs тема — границы ответственности | High | ❌ Open | Не ясно что рендерит Massy, что мы. См. DECISIONS D-04 |
| 13 | Invoice generation — чем делать | High | ❌ Open | Cart-summary редиректит на thank-you, но кто рендерит инвойс? См. DECISIONS D-01 |
| 14 | Discount tier system не реализован | High | 🔲 Open | Метафилды есть в плане, но нет кода применения скидки. См. ARCHITECTURE > Pricing model |
| 15 | Топбар не показывает shop_name + tier | Low | 🔲 Open | Решение D-10 принято, нужна имплементация в `header.liquid` |
| 16 | Locales JSON-файлы — наполнение | Medium | 🔲 Open | EN/CS/VI ключи могут быть неполными. Аудит после миграции React → Liquid |
| 17 | Yeseva One — проверить что подгружается на всех страницах | Low | 🔲 Open | Если `@font-face` в `theme.css`, то ок. Если в одной секции — может не примениться где-то ещё |

---

## Когда обнаруживается новый баг

1. Добавь строчку в эту таблицу
2. Severity ставь по правилу выше
3. **Critical** — блокирует merge / запуск
4. **How to reproduce** — конкретные шаги, не абстрактно
5. **How to test fix** — что должно произойти после фикса
6. После фикса: статус → ✅ Fixed, в `PROGRESS.md` запись в Session Log
