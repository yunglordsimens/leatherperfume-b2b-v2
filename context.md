# Leather Parfum B2B – Контекст проекта

## Общее описание
B2B-портал для оптовых партнёров нишевой парфюмерии и кожаных аксессуаров Leather Parfum.
Построен на теме Shopify Dawn с глубокой кастомизацией.
Дизайн разработан в React (Lucide Icons + Tailwind), перенесён в Shopify Liquid.

## Архитектура
- Все кастомные секции лежат в `sections/`
- Все кастомные сниппеты лежат в `snippets/`
- Шаблоны страниц – в `templates/` (JSON)
- Системные страницы Shopify (product, collection, cart, search, 404, password, customers/*) используют кастомные шаблоны

## Глобальные компоненты (работают на всех страницах)
- **Header** – `sections/header.liquid`
  - Кастомная навигация с мега-меню (CSS hover)
  - B2B Notification Bar (верхняя плашка)
  - Языковой переключатель (EN/CS/VI) – должен быть на POST-формах `localization`
  - Иконки: User (логин/аккаунт), корзина, поиск, Accessibility
  - Кнопка Accessibility временно скрыта (закомментировать можно)
- **Footer** – `sections/footer.liquid` (использует наш кастомный)
- **Accessibility Panel** – `snippets/accessibility-panel.liquid` (скрыта, но код есть)
- **Scroll to Top** – `snippets/scroll-to-top.liquid` (подключён в `theme.liquid`)
- **Predictive Search Overlay** – `snippets/predictive-search-overlay.liquid` (подключён в `theme.liquid`)

## Соглашения по стилям
- **НИКАКОГО Tailwind**. Всё пишем на чистом CSS внутри `<style>` в каждом файле
- Используем CSS-переменные Dawn: `var(--font-body-family)`, `var(--color-base-text)` и т.д.
- **High-contrast режим** включается через класс `html.a11y-high-contrast` на `<html>`. В этом режиме:
  - Фон становится белым, текст – чёрным
  - Кнопки – чёрные с белым текстом
  - Карточки – чёрные рамки 4px
  - Интерактивные элементы – высококонтрастные
- **Адаптив**: базовый брейкпоинт 990px (меняем на 1024px или 1100px)
- **Шрифты**: заголовки – `'Yeseva One', serif` (файл загружен в assets)

## Созданные секции и шаблоны

### Главная страница
- Шаблон: `index.json`
- Секции: `hero-b2b`, `trust-bar`, `catalog-cards`, `editorial-heritage`, `packages-wholesale`, `bottom-cta`

### Wholesale Packages
- Шаблон: `page.wholesale-packages.json`
- Секции: `page-header-b2b`, `packages-grid`, `custom-mix-banner`, `how-it-works`, `bottom-cta`

### About Us
- Шаблон: `page.about-us.json`
- Секции: `about-hero`, `about-image`, `about-craft-grid`, `about-manifesto`, `bottom-cta`

### Contact Us
- Шаблон: `page.contact-b2b.json`
- Секция: `contact-b2b` (вся страница в одной секции)

### Apply for Partnership
- Шаблон: `page.wholesale-application.json`
- Секции: `application-info`, `massy-form-wrapper`, App Block Massy

### Partner Login
- Шаблон: `page.wholesale-login.json`
- Секция: `wholesale-login` (сплит-экран с формой `customer_login`)

### Partner Dashboard
- Шаблон: `page.dashboard.json`
- Секции: `dashboard-header`, `dashboard-content`

### Каталог
- Шаблон: `collection.wholesale.json`
- Секции: `catalog-header`, `catalog-sidebar`, `product-grid-b2b`

### Страница товара
- Шаблон: `product.b2b.json` (ещё не создан)
- Секция: `product-b2b` (ещё не создана)

### Корзина
- Шаблон: `cart.b2b.json`
- Секции: `cart-items-b2b` (отсутствует!), `cart-summary-b2b` (есть, но MOQ не работает)

### Thank You (после отправки заказа)
- Шаблон: `page.thank-you.json`
- Секция: `cart-success-b2b`

### Поиск
- Шаблон: `search.json`
- Секция: `predictive-search` (или оверлей)

### 404
- Шаблон: `404.json`

### Password Page
- Шаблон: `password.json`
- Секция: `main-password-b2b`

## React-макеты (оригиналы)
1. **Главная** – первый макет с Hero, Trust Bar, Catalog Cards, Editorial, Packages, Bottom CTA
2. **Wholesale Packages** – макет со страницей пакетов (4 карточки + Custom Mix + How it Works)
3. **About Us** – страница с историей бренда
4. **Contact Us** – страница контактов
5. **Apply for Partnership** – форма заявки с левой колонкой (инструкции + доверие)
6. **Partner Login** – сплит-экран (бренд-блок слева, форма логина справа)
7. **Partner Dashboard** – дашборд с боковым меню, карточками и таблицей заказов
8. **Каталог (гость)** – сетка товаров с кнопкой «Log in for B2B price»
9. **Каталог (авторизованный)** – сетка с ценами WSP и кнопками «Add to Order»
10. **Корзина** – список товаров + MOQ-трекер + поля PO/Notes + кнопка Submit
11. **Страница товара** – галерея, описание, B2B-цены, количество, «Add to Order»
12. **Search Overlay** – полноэкранный предиктивный поиск
13. **Password Page** – сплит-экран с манифестом бренда и формой ввода пароля

## Известные проблемы (на 26.04.2025)
1. Языковой переключатель не работает (нужны POST-формы)
2. Кнопка логина ведёт на стандартный `/account/login`
3. Иконка поиска – слишком громоздкая
4. Иконка корзины – стандартная Dawn
5. Иконки в Contact Us – React-компоненты вместо SVG
6. Massy Form Wrapper – селекторы угаданы, нужно инспектировать реальный HTML
7. Footer – настройки сброшены в `{}`
8. Password Page – отсутствует секция `main-password-b2b.liquid`
9. Partner Login – белая полоса снизу на мобильных
10. Cart Items B2B – секция не создана
11. Cart Summary B2B – MOQ-трекер не работает
12. Product Page B2B – секция и шаблон не созданы
13. Wholesale Packages – внешний вид не соответствует макету, привязка к bundles/коллекциям не решена
14. Collections – кастомный шаблон с фильтрами не работает
15. Брейкпоинт адаптива – 990px нужно увеличить до 1024/1100px
16. Кастомный шрифт – файл загружен, но не применён к заголовкам
17. Металогика Customer – теги и метаполя не настроены в админке Shopify
