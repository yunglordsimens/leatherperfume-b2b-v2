# Leather Parfum B2B – Список задач и Fixes

Файл дополняет `context.md`. Задачи попадают сюда после проверки вместе с готовыми промптами.
Статусы: ⏳ to do, 🔄 in progress, ✅ done, ⏭ Admin task (ручная работа в админке Shopify).

---

## 1. Кастомный шрифт — применить к заголовкам
**Промпт:** В `assets/base.css` пропиши для `h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6` свойство `font-family: 'Yeseva One', serif;`. Убедись, что в `layout/theme.liquid` загружен `@font-face` из assets с `font-display: swap`.
Ожидание: все заголовки рендерятся шрифтом Yeseva One.

---

## 2. Иконки в Contact Us — заменить на SVG
**Промпт:** В `sections/contact-b2b.liquid` найди все иконки‑компоненты React (`Mail`, `Phone`, `MessageCircle`, `Building2`, `Clock`). Замени их на inline SVG размером 20×20, stroke-width 2, цвет `currentColor`.
Ожидание: иконки отображаются, стили совпадают с макетом.

---

## 3. Massy Form Wrapper — точные селекторы
**Промпт:** В `sections/massy-form-wrapper.liquid` замени все селекторы вида `[class*="label"]` на прямые теги внутри `.massy-form-container`: `input`, `select`, `label`, `button[type="submit"]`. Убедись, что поля имеют скругления 12px, фон `#fafaf9`, фокус с янтарной рамкой.
Ожидание: форма Massy выглядит идентично React‑макету.

---

## 4. Footer — восстановить настройки
⏭ **Admin task** – открыть кастомайзер, нажать Footer и вручную заполнить все ссылки, контакты и копирайт.
Ожидание: футер показывает реальные данные.

---

## 5. Теги и метаполя клиентов
⏭ **Admin task**:
- Settings → Custom data → Customers → создать метаполя: `company_name` (текст), `discount_tier` (текст), `discount_percentage` (число).
- Customers → выбрать тестового клиента → тег `wholesale`, заполнить созданные метаполя.
Ожидание: дашборд и топ‑бар подхватывают данные.

---

## 6. Языковой переключатель — исправить лаги
**Промпт:** В `sections/header.liquid` внутри `.header-lang__dropdown` замени ссылки `?locale=en` на три POST‑формы `{%- form 'localization' -%}` с `input name="locale_code"`. Убедись, что Dawn `localization-form` отключён в кастомайзере.
Ожидание: переключение языка работает без глюков.

---

## 7. Кнопка логина → Partner Login
**Промпт:** В `sections/header.liquid` измени ссылку кнопки «Log In» с `/account/login` на `/pages/partner-login`. Добавь URL Redirect: `/account/login` → `/pages/partner-login`.
Ожидание: гости и клиенты попадают на кастомный логин.

---

## 8. Кнопка Account — динамическая (гость/клиент/B2B)
**Промпт:** В `sections/header.liquid` замени кнопку Account на три условия:
- `{% if customer and customer.tags contains 'wholesale' %}` → ссылка `/pages/partner-dashboard`, текст `{{ customer.first_name }}`.
- `{% elsif customer %}` → ссылка `/account`, текст «Account».
- `{% else %}` → ссылка `/pages/partner-login`, текст «Log In».
Во всех случаях оставить иконку User.
Ожидание: кнопка ведёт партнёра в дашборд.

---

## 9. Топ‑бар — персонализация
**Промпт:** В `sections/header.liquid` (или `lp-top-bar.liquid`) замени статичный текст B2B‑бара на динамический:
- Если `customer` и `customer.tags contains 'wholesale'` → `Partner: {{ customer.metafields.custom.company_name }} | Discount Tier: {{ customer.metafields.custom.discount_tier }} ({{ customer.metafields.custom.discount_percentage }}%)`.
- Иначе → `For verified wholesale partners only`.
Ожидание: топ‑бар показывает компанию и тир после входа.

---

## 10. Мега‑меню и навигация — разные пункты для гостей и партнёров
**Промпт:** В `sections/header.liquid` в блоке кастомной навигации оберни пункты «Order Portal», «Quick Reorder», «Invoices», «Dashboard» в проверку `{% if customer and customer.tags contains 'wholesale' %}`. Для остальных оставь «Catalog», «Packages», «About Us», «Contact», «Apply».
Ожидание: после логина меню меняется.

---

## 11. Иконка поиска и корзины
**Промпт:** В `header.liquid` замени кнопку поиска на минималистичную SVG-лупу 22×22. Замени SVG корзины на кастомный из макета (сумка 24×24). Обе иконки должны быть одинакового размера и без лишнего текста.
Ожидание: иконки выглядят как в React‑референсе.

---

## 12. Адаптив — увеличить брейкпоинт
**Промпт:** В `assets/base.css` и других CSS‑файлах замени `@media screen and (min-width: 990px)` на `1024px`.
Ожидание: мобильная вёрстка ломается только на узких экранах (<1024px).

---

## 13. Поиск — убрать «translation missing»
**Промпт:** В `snippets/predictive-search-overlay.liquid` замени все `{{ '...' | t }}` на жёстко заданный английский текст.
Ожидание: ошибка Translation missing исчезла.

---

## 14. Cart Items B2B — создать недостающую секцию
**Промпт:** Создай файл `sections/cart-items-b2b.liquid`. Используй `{% for item in cart.items %}`. Для каждого товара:
- Изображение, название, SKU, размер
- Счётчик количества с кнопками +/− и AJAX (`/cart/change.js`)
- Кнопка удаления (trash SVG, AJAX удаление)
- Сумма за позицию
Стили: чистый CSS, таблица на десктопе, карточки на мобильных. High‑contrast. Schema пустой.
Ожидание: корзина показывает товары.

---

## 15. MOQ‑трекер — динамическая полоска
**Промпт:** В `sections/cart-summary-b2b.liquid` добавь JavaScript который читает `{{ cart.total_price }}` (в центах), сравнивает с MOQ из `{{ section.settings.moq_amount }}`, вычисляет процент и устанавливает ширину `.moq-bar`. При достижении MOQ разблокирует кнопку отправки.
Ожидание: полоска заполняется при добавлении товаров.

---

## 16. Cart Success — восстановить страницу Thank You
**Промпт:** Убедись, что `templates/page.thank-you.json` содержит секцию `cart-success-b2b`. Если секции нет — создай её: иконка CheckCircle, заголовок «Order Submitted!», референс PO, текст благодарности, кнопка «Return to Catalog».
Ожидание: после отправки заказа открывается экран благодарности.

---

## 17. Редирект из корзины в Thank You
**Промпт:** В `sections/cart-summary-b2b.liquid` добавь обработчик кнопки «Submit for Invoicing»: после сохранения атрибутов корзины (PO, Notes) через `/cart/update.js` редирект на `/pages/thank-you`.
Ожидание: клиент попадает на экран успеха.

---

## 18. Product Page B2B — создать секцию и шаблон
**Промпт:** Создай `templates/product.b2b.json` с секцией `product-b2b`. Затем создай `sections/product-b2b.liquid`:
- Хлебные крошки
- Галерея (product.media)
- Описание
- Блок с RRP, WSP, маржой (логика B2B: скрывать WSP для гостей)
- Счётчик количества
- Кнопка «Add to Order» с AJAX
Стили: чистый CSS, high‑contrast, адаптив.
Ожидание: страница товара выглядит как в макете.
