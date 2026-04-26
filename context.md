# Leather Parfum B2B — Контекст проекта

## Общее описание
B2B-портал для оптовых партнёров Leather Parfum (нишевая парфюмерия и кожаные аксессуары).
Построен на теме Shopify Dawn с глубокой кастомизацией.
Дизайн разработан в React (Lucide Icons + Tailwind), перенесён в Shopify Liquid.

## Архитектура
- Кастомные секции: `sections/`
- Сниппеты: `snippets/`
- Шаблоны страниц: `templates/` (JSON)
- Системные страницы Shopify используют кастомные шаблоны

## Глобальные компоненты
- **Header** – `sections/header.liquid`
  - Кастомная навигация с мега-меню (CSS hover)
  - B2B Notification Bar
  - Языковой переключатель (EN/CS/VI) – должен быть на POST-формах `localization`
  - Иконки: User, корзина, поиск, Accessibility (скрыта)
- **Footer** – `sections/footer.liquid` (кастомный)
- **Accessibility Panel** – `snippets/accessibility-panel.liquid` (код есть, скрыта)
- **Scroll to Top** – `snippets/scroll-to-top.liquid`
- **Predictive Search Overlay** – `snippets/predictive-search-overlay.liquid`

## Соглашения по стилям
- НИКАКОГО Tailwind. Чистый CSS внутри `<style>`
- Используем CSS-переменные Dawn
- High-contrast: `html.a11y-high-contrast`
  - Белый фон, чёрный текст, чёрные рамки
  - Кнопки – чёрные с белым текстом
- Адаптив: базовый брейкпоинт 1024px
- Шрифты: заголовки – `'Yeseva One', serif`, остальное – системный шрифт Dawn

## Созданные секции и шаблоны
### Главная
- `index.json`
- `hero-b2b`, `trust-bar`, `catalog-cards`, `editorial-heritage`, `packages-wholesale`, `bottom-cta`

### Wholesale Packages
- `page.wholesale-packages.json`
- `page-header-b2b`, `packages-grid`, `custom-mix-banner`, `how-it-works`, `bottom-cta`

### About Us
- `page.about-us.json`
- `about-hero`, `about-image`, `about-craft-grid`, `about-manifesto`, `bottom-cta`

### Contact Us
- `page.contact-b2b.json`
- `contact-b2b`

### Apply for Partnership
- `page.wholesale-application.json`
- `application-info`, `massy-form-wrapper`, App Block Massy

### Partner Login
- `page.wholesale-login.json`
- `wholesale-login`

### Partner Dashboard
- `page.dashboard.json`
- `dashboard-header`, `dashboard-content`

### Каталог
- `collection.wholesale.json`
- `catalog-header`, `catalog-sidebar`, `product-grid-b2b`

### Страница товара
- `product.b2b.json` (ещё не создан)
- `product-b2b` (ещё не создана)

### Корзина
- `cart.b2b.json`
- `cart-items-b2b` (отсутствует!), `cart-summary-b2b` (MOQ не работает)

### Thank You
- `page.thank-you.json`
- `cart-success-b2b`

### Поиск
- `search.json`
- `predictive-search` (оверлей)

### 404
- `404.json`

### Password Page
- `password.json`
- `main-password-b2b`

## React-макеты (13 штук)
(список сохранён)

## Известные проблемы (на 26.04.2025)
(актуальный список из tasks.md)
