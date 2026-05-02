# Requirements

## Цель проекта

B2B wholesale-портал для **Leather Parfum** — поставщика нишевой парфюмерии и кожаных аксессуаров. Портал — закрытый, только для верифицированных ритейл-партнёров. Публичный фронт показывает «лендинг для аппликации в партнёры», цены и каталог скрыты от не-залогиненных.

## Бизнес-контекст

- **Склад:** Прага
- **ЦА:** владельцы бутиков, концепт-сторов, парфюмерных магазинов в EU + Vietnam
- **Партнёрский флоу:** заявка → ручная верификация → доступ к B2B-каталогу → заказ → инвойс → оплата по инвойсу → отгрузка
- **Маржа партнёров:** 100–150% retail markup
- **Минимальный заказ:** 5,000 CZK (display value, см. ARCHITECTURE про cents/CZK)
- **Доставка:** из Праги в течение 1 рабочего дня после подтверждения

## Языки и локализация

- **EN** — основной для не-чешских клиентов
- **CS** — для чешского рынка
- **VI** — для вьетнамских клиентов
- Все строки должны быть в `locales/` JSON-файлах. Хардкод в Liquid недопустим (см. ARCHITECTURE).

## Валюта

- **CZK only.** Currency switcher не нужен. Multi-currency не нужен.

## Авторизация и пользователи

- **Massy B2B app** управляет: регистрацией, апрувом, тегированием, login/logout flow.
- Shopify B2B native НЕ используется. Все интеграции с авторизацией — через Massy.
- Customer state в теме определяется по тегам Shopify, которые проставляет Massy:
  - `wholesale` — апрувленный B2B-партнёр
  - `pending` — заявка подана, ждёт апрува
  - (без тегов) — гость или не-B2B клиент

## Discount tiers

Партнёрам присваивается tier, который автоматически модифицирует цены в каталоге и корзине.

**Предлагаемая структура (TBD, можно менять):**

| Tier | Скидка от RRP | Условие получения |
|------|---------------|-------------------|
| Standard | базовая wholesale-цена | Default для всех новых партнёров |
| Silver | -5% к WSP | После N заказов / X CZK оборота |
| Gold | -10% к WSP | После N заказов / X CZK оборота |
| Platinum | -15% к WSP | По решению менеджера |

**Реализация:**
- Customer metafield `custom.discount_tier` (string: standard / silver / gold / platinum)
- Customer metafield `custom.discount_percentage` (number, e.g. 5, 10, 15)
- При рендере цены: `final_price = wholesale_price * (1 - discount_percentage/100)`
- В топбаре залогиненного аккаунта показывать: **«[Shop name] · [Tier]»** (e.g. «Boutique Prague · Gold»)

## Checkout flow

**Кастомный, НЕ Shopify checkout.**

```
Корзина (cart-summary-b2b)
  ↓ [Submit Order]
Custom checkout page (адрес/контакт/комментарий к заказу)
  ↓
Order создаётся в Shopify через Storefront API или draft order
  ↓
Генерация proforma-инвойса (TBD: чем генерим — см. DECISIONS.md)
  ↓
Redirect на /pages/thank-you (с подтверждением и копией инвойса)
  ↓
Email с инвойсом клиенту + менеджеру
  ↓
Клиент оплачивает по инвойсу (банковский перевод)
  ↓
Менеджер вручную меняет статус заказа после получения оплаты
  ↓
Отгрузка из Праги
```

**Что не должно происходить:**
- Никакого Shopify Checkout
- Никаких онлайн-платежей через Shopify
- Никакого автоматического списания денег

## Доставка

Не автоматизированная. Расчёт и условия — индивидуально по инвойсу. В UI показываем «Calculated by manager» или «Quote on invoice». Не пытаемся считать вес/тарифы автоматически.

## Что должно быть на сайте (must-have)

### Публичные страницы (для гостей)
- [x] Landing с описанием B2B-предложения (Hero, Trust Bar, Catalog teaser, Editorial, Packages, Bottom CTA, Footer)
- [x] Apply for Partnership форма (через Massy)
- [x] Login страница (через Massy)
- [x] Legal: B2B Terms, Privacy Policy, Returns & Claims (страницы созданы — проверить контент!)

### Private (после login + wholesale tag)
- [x] Каталог с реальными ценами (RRP перечёркнуто, WSP активная)
- [ ] PDP с qty stepper (минимум = product MOQ)
- [ ] Корзина с MOQ-прогресс баром (5,000 CZK минимум на заказ)
- [ ] Кастомный checkout
- [ ] Дашборд аккаунта:
  - История заказов
  - Quick reorder из прошлых заказов
  - Скачивание инвойсов
  - Профиль (управление через Massy)

### Известная проблема (см. BUGS.md)
В дашборде сейчас дубляж: «Quick Reorder» страница, «Invoice» страница и третья похожая. Нужно прояснить структуру.

## Дизайн-направление

- **Шрифт заголовков:** Yeseva One
- **Body:** sans-serif (TBD точный — пока system stack)
- **Палитра:** земляная (stone/amber из Tailwind), премиум-сдержанная
- **Стиль:** «editorial luxury», не яркие цвета, акцент на типографике
- Inline CSS в каждой секции, без Tailwind в Liquid (см. ARCHITECTURE)

## Accessibility

В дизайне есть кастомная панель A11y (правая выезжающая):
- Text size: small / standard / large
- High contrast (B/W) toggle
- Highlight links toggle

В Liquid реализовано через CSS-класс `html.a11y-high-contrast` + JS на `<html>`.

## Out of scope

- Shopify native checkout
- Онлайн-платежи (Stripe, PayPal, etc.)
- Multi-currency
- B2C-флоу
- Mobile app
- Loyalty program / points
- Wishlist
- Product reviews
- Live chat
- Currency switcher

Если кто-то предлагает что-то из этого — отказываем со ссылкой на этот раздел.
