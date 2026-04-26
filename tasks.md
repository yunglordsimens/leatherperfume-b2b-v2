Понял тебя. Накопилось много, и кажется, что ничего не меняется – на самом деле мы просто не довели правки до конца. Давай разложу всё по пунктам и дам **конкретные промпты**, которые реально изменят ситуацию.

---

### 1. Поиск: убрать квадрат (outline) при фокусе

В поле ввода добавлен outline браузером или стилями Dawn. Это легко убрать.

**Промпт:**
> В `snippets/predictive-search-overlay.liquid` найди стили для `input[type="text"]`. Добавь `outline: none; box-shadow: none;` при фокусе. Убедись, что фокусное кольцо не появляется.

---

### 2. Иконка корзины – всё ещё большая

Мы меняли SVG, но, видимо, размеры заданы через CSS, а не через атрибуты. Исправим.

**Промпт:**
> В `sections/header.liquid` найди иконку корзины (`.header__icon--cart svg`). Задай ей `width: 22px; height: 22px;` через CSS. Убедись, что она не растягивается родительскими стилями.

---

### 3. Каталог – две похожие секции, нет сетки товаров

У тебя есть `catalog-header.liquid` (для гостей) и `catalog-header-b2b.liquid` (для авторизованных). На самом деле достаточно **одного** `catalog-header.liquid`, который внутри проверяет статус клиента и показывает соответствующий текст/кнопку.  
Сетка товаров должна быть в `product-grid-b2b.liquid` – её так и не создали. Сейчас мы её сделаем, и она тоже будет динамической (WSP показывается только для wholesale).

**Промпт 1 – объединить хедеры:**
> В `sections/catalog-header.liquid` добавь проверку: если `customer.tags contains 'wholesale'`, то заголовок «Create Order», подзаголовок «Add products to your wholesale cart»; иначе «Wholesale Catalog» и «Log in for B2B pricing». Удали `catalog-header-b2b.liquid` и обнови шаблон `collection.wholesale.json`, оставив только `catalog-header`.

**Промпт 2 – создать product-grid-b2b.liquid:**
> Создай `sections/product-grid-b2b.liquid`. Используй `{% for product in collection.products %}`. В каждой карточке:
> - Изображение, название, SKU, размер.
> - Если `customer.tags contains 'wholesale'`: показывать WSP (`product.price`), RRP (`product.compare_at_price`), процент маржи, кнопку «Add to Order».
> - Иначе: показывать только RRP, кнопку «Log in for B2B price».
> - Инлайн-стили (чистый CSS), high-contrast поддержка.
> - AJAX-добавление в корзину для кнопки «Add to Order».

---

### 4. Страница Packages – тёмный фон, данные, How it Works

**Промпт 1 – исправить фон и стили:**
> В `sections/packages-grid.liquid` (или `packages-wholesale.liquid`) установи фон секции `background-color: #1c1917; color: #fff;`. Убедись, что карточки пакетов выглядят как в React-макете (тёмные, с оранжевыми акцентами). В high-contrast – белый фон, чёрные рамки.

**Промпт 2 – How it Works (ховер + ссылки):**
> В `sections/how-it-works.liquid` для каждого шага добавь обработку наведения: при наведении на номер шага фон становится оранжевым (`#b45309`), текст белым. Номера должны быть обёрнуты в `<a>` с ссылками на соответствующие страницы (например, `/collections/all` для первого шага, `/pages/apply` для второго и т.д.). Ссылки задавать в настройках секции.

**Промпт 3 – данные для пакетов:**
> Сейчас данные статичны. Если хочешь управлять ими из админки, добавь в `packages-grid.liquid` блоки (`blocks`) для каждого пакета с полями: название, описание, скидка, количество SKU, цена, ссылка. По умолчанию заполни их тестовыми значениями из макета.

---

### 5. Мега-меню и кнопка Account – не меняются

**Промпт:**
> В `sections/header.liquid` в кастомной навигации оберни ссылки «Order Portal», «Quick Reorder», «Invoices», «Dashboard» в условие `{% if customer.tags contains 'wholesale' %}`. Ссылку «Account» замени на динамическую:
> - `{% if customer.tags contains 'wholesale' %}` → `/pages/partner-dashboard`
> - `{% elsif customer %}` → `/account`
> - `{% else %}` → `/pages/partner-login`
> Текст внутри кнопки должен меняться соответственно: имя клиента / «Account» / «Log In».

---

### 6. Apply for Partnership – поле телефона оверлапится

Скорее всего, проблема в абсолютном позиционировании иконки и отсутствии `padding-left` у input.

**Промпт:**
> В `sections/application-info.liquid` (или `massy-form-wrapper.liquid`) найди поле телефона. Убедись, что родитель имеет `position: relative`, иконка – `position: absolute; left: 12px; top: 50%; transform: translateY(-50%);`, а input имеет `padding-left: 40px;`.

---

### 7. Шрифты в Massy Form Wrapper

**Промпт:**
> В `sections/massy-form-wrapper.liquid` добавь в CSS:
> ```css
> .massy-form-container input,
> .massy-form-container select,
> .massy-form-container textarea,
> .massy-form-container label,
> .massy-form-container button {
>   font-family: var(--font-body-family);
> }
> .massy-form-container h1, .massy-form-container h2, .massy-form-container h3 {
>   font-family: 'Yeseva One', serif;
> }
> ```

---

Если выполнить эти промпты по порядку, большинство проблем уйдёт. Начни с каталога и корзины – они самые заметные. Как только прогонишь через Claude, дай знать, что получилось, – я проверю.
