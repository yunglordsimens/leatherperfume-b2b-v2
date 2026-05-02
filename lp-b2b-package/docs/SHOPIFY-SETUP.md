# Shopify Admin Setup

То, что **не делается через код в репо**, а настраивается вручную в админке Shopify (или в админке Massy). Этот файл — чеклист и source of truth для админ-конфига.

## Customer metafields

Settings → Custom data → Customers → Add definition

| Namespace | Key | Type | Default | Кто заполняет |
|-----------|-----|------|---------|---------------|
| `custom` | `wholesale_status` | Single line text | — | Massy при апруве |
| `custom` | `discount_tier` | Single line text (одно из: standard / silver / gold / platinum) | `standard` | Менеджер вручную (D-05) |
| `custom` | `discount_percentage` | Number (decimal) | 0 | Менеджер вручную (или скрипт) |
| `custom` | `shop_name` | Single line text | — | Из формы аппликации (Massy) |
| `custom` | `vat_number` | Single line text | — | Из формы аппликации |
| `custom` | `country_eu` | Boolean | true/false | Из формы (для VAT reverse charge) |

## Product metafields

Settings → Custom data → Products → Add definition

| Namespace | Key | Type | Notes |
|-----------|-----|------|-------|
| `custom` | `wholesale_price` | Money or Number | **В CZK display value** (D-06) |
| `custom` | `moq` | Integer | Минимальное кол-во в одном заказе для этого продукта |
| `custom` | `featured_in_packages` | List of products | Какие пакеты включают этот товар |

## Customer tags strategy

| Tag | Кто проставляет | Что значит |
|-----|-----------------|------------|
| `wholesale` | Massy после апрува | Доступ к B2B-каталогу и ценам |
| `pending` | Massy после регистрации | Заявка подана |
| `tier-silver` / `tier-gold` / `tier-platinum` | Менеджер | Дополнительный уровень скидки (если используем теги вместо метафилда) |
| `b2b-blocked` | Менеджер | Заблокированный клиент |

⚠️ **Важно:** не использовать одновременно теги и метафилд `discount_tier` — выбрать один источник правды. **Рекомендация: метафилды** (структурированнее, можно отображать в storefront).

## Customer accounts

Settings → Customer accounts

- **Account type:** Classic (не New customer accounts)
- Причина: используем Massy, который интегрирован с classic flow
- Login required для приватных страниц темы (`/account`, `/products` коллекций) — реализовано через wholesale gate в Liquid

## Locales

Online Store → Themes → ⋯ → Edit default theme content

Файлы:
- `locales/en.default.json` — основной
- `locales/cs.json`
- `locales/vi.json`

Все строки в Liquid должны быть `{{ 'section.key' | t }}`. Хардкод недопустим (см. ARCHITECTURE).

**Готовность переводов — задача US/менеджера контента.**

## Apps

| App | Зачем | Status | Платный? |
|-----|-------|--------|----------|
| **Massy B2B** | Регистрация, апрув, формы | ✅ Установлено | TBD |
| **Order Printer** (Shopify) | Генерация PDF Proforma инвойсов (D-01 confirmed) | 🔲 Установить + кастомный темплейт | Бесплатно |
| **Translate & Adapt** (Shopify) | Управление мультиязычными переводами | 🔲 Опционально | Бесплатно |

⚠️ Перед установкой нового app — проверить совместимость с Massy.

## Checkout settings

Settings → Checkout

- **Customer accounts:** Required for checkout (но фактически используем кастомный flow, не Shopify checkout)
- **Order processing:** не имеет значения (мы не используем Shopify checkout)

## Shipping

Settings → Shipping and delivery

- Создать **manual shipping zone** для всех стран
- Один rate: «Calculated by manager — see invoice» (или просто 0 CZK, чтобы не блокировало UX)
- Никаких авто-расчётов веса/тарифов (D-08 — manual)

## Tax

Settings → Taxes and duties

- **Czech VAT** настроен по умолчанию (21%)
- **Reverse charge для EU B2B:** требует настройки правил в Tax overrides (для клиентов с VAT-номером из других EU стран — налог 0%)
- TBD: разобраться нужно ли это в MVP или после

## Pages (страницы которые должны существовать)

Online Store → Pages

| Handle | Title | Контент | Status |
|--------|-------|---------|--------|
| `/pages/thank-you` | Thank You / Order Received | Подтверждение заказа + ссылка на инвойс | 🔲 Не создана (BUGS #9) |
| `/pages/partner-dashboard` | Partner Dashboard | Overview + tabs orders/invoices (D-02) | 🔲 Не создана |
| `/pages/quick-reorder` | Quick Reorder | Список последних товаров + 1-click ATC (D-02) | 🔲 Не создана |
| `/pages/apply` | Apply for Partnership | Massy form embed | 🔲 Проверить |
| `/pages/login` | Partner Login | Massy login form | 🔲 Проверить |
| `/pages/about` | About Us | Brand story | 🔲 Проверить |
| `/pages/contact` | Contact | Контакты + форма | 🔲 Проверить |
| `/pages/b2b-terms` | B2B Terms of Service | Юр.текст | 🔲 Проверить |
| `/pages/privacy` | Privacy Policy | Юр.текст | 🔲 Проверить |
| `/pages/returns` | Returns & Claims | Юр.текст | 🔲 Проверить |

⚠️ Дубли которые надо удалить из админки если есть (D-02):
- `/pages/invoices` (если существует отдельно — функционал в `partner-dashboard?tab=invoices`)
- `/pages/order-history` (если существует отдельно — функционал в `partner-dashboard?tab=orders`)

## Email notifications

Settings → Notifications

Кастомизировать на B2B-флоу:
- **New customer welcome** — версия для wholesale тегированных
- **Order confirmation** — переименовать на «Proforma Invoice» формат
- **Apply submitted** (Massy)
- **Apply approved** (Massy)
- **Apply rejected** (Massy)

Все — на 3 языках (через Translate & Adapt или вручную в HTML).

## Themes

Online Store → Themes

- **Live theme:** Dawn (текущий)
- **Working theme:** ветка `claude/react-to-shopify-hero-lfeDP-deepseek` (push через Shopify CLI или GitHub integration)
- **Backup theme:** копия live перед каждым крупным merge

## Domains

Settings → Domains

- Основной домен: `leatherperfume.com` (или какой используется)
- Subdomains для языков: TBD (нативная локализация Shopify не требует субдоменов, но можно)

## SEO basics

- robots.txt — Shopify авто-генерит, для приватного B2B-контента можно добавить `Disallow: /account/`, `Disallow: /collections/wholesale/` и т.д.
- sitemap.xml — авто (Shopify)
- hreflang — авто если используется нативная Shopify localization
- meta-теги по умолчанию из Shopify, кастомизировать на ключевых страницах через theme settings

## Analytics (опционально, после запуска)

- GA4 — через Theme settings (или Custom Pixels)
- Meta Pixel — через Custom Pixels
- НЕ трекать B2B-клиентов в e-commerce events (они не покупают через Shopify checkout)

---

## Чеклист админ-настройки перед запуском

- [ ] Customer metafields созданы (5 шт)
- [ ] Product metafields созданы (3 шт)
- [ ] Discount tier применён хотя бы 1 тестовому клиенту
- [ ] Yeseva One шрифт загружен в `assets/`
- [ ] Locales заполнены на 3 языках
- [ ] Все 8 pages созданы (или подтверждено что есть)
- [ ] Order Printer (или альтернатива) установлен и протестирован
- [ ] Manual shipping zone настроена
- [ ] Email templates обновлены (B2B + 3 языка)
- [ ] Massy формы работают (apply + login)
- [ ] Тестовый full-flow заказ прошёл от начала до конца
