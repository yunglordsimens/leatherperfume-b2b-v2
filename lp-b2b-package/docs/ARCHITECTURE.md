# Architecture

Зафиксированные технические решения. **НЕ предлагать альтернативы** этим пунктам без явного разрешения пользователя — это съедает контекст и тормозит работу.

## Stack

- **Платформа:** Shopify (online store)
- **Тема:** Dawn (форк), кастомизированный под B2B
- **Язык темы:** Liquid + vanilla JS + inline CSS
- **Шрифт заголовков:** Yeseva One (`assets/YesevaOne-Regular.woff2` через `@font-face`, замаплен на `--font-heading-family`)

## Чего НЕ используем в теме

- ❌ Tailwind в Liquid-секциях (Tailwind есть только в `/mockups` для дизайн-референса)
- ❌ Внешние CSS-файлы помимо Dawn-овских и `assets/theme.css`
- ❌ React в теме (никаких bundler'ов, никаких npm-зависимостей в продакшене)
- ❌ Shopify Checkout
- ❌ Shopify B2B native (используем Massy)
- ❌ Multi-currency / currency switcher
- ❌ jQuery (vanilla JS only)

## Что используем

- ✅ Inline `<style>` в каждой секции с локальным scope (через ID секции)
- ✅ Vanilla JS в `<script>` блоках секций или в `assets/theme.js`
- ✅ Liquid схемы (`{% schema %}`) для всех настраиваемых текстов и параметров
- ✅ Метафилды для динамических данных (см. ниже)
- ✅ Massy B2B app для авторизации и B2B-логики
- ✅ Massy формы для apply-to-partnership

## Customer gating pattern

```liquid
{% if customer.tags contains 'wholesale' %}
  {% comment %} Wholesale partner UI {% endcomment %}
{% else %}
  {% comment %} Public/login prompt {% endcomment %}
{% endif %}
```

Применять во всех секциях которые показывают цены или B2B-функционал.

## Pricing model

- `compare_at_price` = RRP (рекомендованная розничная)
- `price` = базовая wholesale цена
- `metafield: product.custom.wholesale_price` = WSP (если отличается от `price` для конкретного партнёра)
- Финальная цена для tier'а:
  ```
  final = wholesale_price * (1 - discount_percentage / 100)
  ```

### ⚠️ ВАЖНО: единицы измерения

**WSP метафилд хранится в CZK (не в cents).**

Решение пользователя 2026-05-02. Все секции которые читают `custom.wholesale_price` должны работать с display CZK напрямую, без деления на 100.

MOQ minimum для отображения = 5,000 CZK (это display value).

## Discount tier system

| Customer metafield | Тип | Значение |
|--------------------|-----|----------|
| `custom.discount_tier` | string | `standard` / `silver` / `gold` / `platinum` |
| `custom.discount_percentage` | number | 0, 5, 10, 15 |
| `custom.shop_name` | string | Название магазина клиента (для топбара) |

В топбаре залогиненного аккаунта: `«{shop_name} · {discount_tier}»`

## Accessibility

- Класс `html.a11y-high-contrast` триггерит все override-правила в CSS темы
- Класс `html.a11y-text-large` / `html.a11y-text-small` для размера текста
- Класс `html.a11y-highlight-links` для подчёркивания ссылок
- State хранится в `localStorage` (ключи: `lp_a11y_contrast`, `lp_a11y_text_size`, `lp_a11y_links`)
- На каждой загрузке `<head>` восстанавливает классы из localStorage до рендера (избегаем FOUC)

## Локализация

- Все строки в `locales/en.default.json`, `locales/cs.json`, `locales/vi.json`
- В Liquid: `{{ 'section.key' | t }}`
- Хардкод английских строк в Liquid НЕДОПУСТИМ
- Дефолт: `en`

## Naming conventions

- **B2B-специфичные секции:** суффикс `-b2b` (`product-grid-b2b-logged-in.liquid`)
- **Переиспользуемые snippets:** без суффикса
- **CSS-классы:** в реальном коде используются короткие префиксы по секциям (`cib`, `csb`, `pgbl` и т.п.). Это исторически сложившаяся конвенция, не переименовывать. Для новых секций можно использовать тот же паттерн или короткий уникальный префикс. Главное — не конфликтовать с Dawn-овскими классами и быть консистентным внутри одной секции.
- **Кастомные events:** без префикса, `<scope>:<action>` (`cart:updated`)

## JS event chain

| Event | Где dispatch | Где слушается | Payload |
|-------|--------------|---------------|---------|
| `cart:updated` | PDP ATC, Grid ATC, Cart-summary remove | Cart-summary (MOQ bar, totals) | `detail: { cart }` |

⚠️ Событие исторически называлось `cart:refresh` — переименовано в `cart:updated` (исправлено 2026-04-28). Старое имя нигде не должно встречаться.

⚠️ **Naming convention для events: без префикса** (`cart:updated`, не `lp:cart:updated`). В ранней версии этих доков был указан `lp:` namespace, но реальный код использует events без префикса, и переименовывать сейчас = ломать рабочее. Для новых кастомных events следовать тому же паттерну: `<scope>:<action>` без префикса.

## Singleton guards

В JS секций используются глобальные флаги (`window.lpCartItemsReady`, `window.lpCartSummaryReady`) чтобы не инициализировать секцию дважды. Это известный технический долг — низкий приоритет, секции всё равно встречаются один раз на странице (см. BUGS.md #6).

## Multi-AI workflow (organisational architecture)

Этот проект ведут несколько AI-агентов параллельно. Чтобы они не сломали работу друг друга:

| Агент | Зона ответственности | Файлы которые трогает |
|-------|----------------------|----------------------|
| Claude (chat) | Документация, планирование, hand-off | `/docs/*`, `/handoff/*` |
| Claude Code | Код в репо, git, file ops | `sections/*`, `snippets/*`, `assets/*`, `templates/*` |
| DeepSeek | Code review, debug, рефакторинг (через копипаст) | Дает суждения, правки применяет CL/CC |
| Gemini | Дизайн, React-макеты | `/mockups/*` |

Каждое значимое изменение в коде → запись в `PROGRESS.md`. Иначе через сессию никто не вспомнит что делал.
