# Mockups

Это **дизайн-референс**, не исполняемый код. Здесь лежит React-макет от Gemini, разбитый на 11 компонентов. Каждый соответствует одному блоку Liquid-секции в теме.

## Зачем эти файлы существуют

- Дать DeepSeek/Claude Code/любому AI **визуальный референс** для миграции в Liquid
- Зафиксировать дизайн-интент: цвета, размеры, структуру, копирайт
- Отделить дизайн от логики — Gemini рисовал, DS/CC переносят

## Файлы

| Файл | Что | Соответствует Liquid |
|------|-----|----------------------|
| `App.full.jsx` | Полный исходный файл (как пришёл от Gemini) | — (мастер-копия) |
| `components/AccessibilityPanel.jsx` | Выезжающая панель A11y | `snippets/accessibility-panel.liquid` |
| `components/AnnouncementBar.jsx` | Топ-полоса «For verified partners» | `sections/announcement-bar.liquid` |
| `components/Header.jsx` | Header с Mega Menu и Lang Switcher | `sections/header.liquid` |
| `components/Hero.jsx` | Hero блок | `sections/hero-b2b.liquid` |
| `components/TrustBar.jsx` | 3 фичи (margin / shipping / orders) | `sections/trust-bar.liquid` |
| `components/CatalogCards.jsx` | 2 категории (Perfumes / Leather) | `sections/catalog-cards.liquid` |
| `components/EditorialBlock.jsx` | Heritage/Quality блок | `sections/editorial-heritage.liquid` |
| `components/WholesalePackages.jsx` | 2 пакета | `sections/packages-wholesale.liquid` |
| `components/BottomCTA.jsx` | Apply for Partnership CTA | `sections/bottom-cta.liquid` |
| `components/ScrollToTop.jsx` | Плавающая кнопка | `snippets/scroll-to-top.liquid` |
| `components/Footer.jsx` | Footer | `sections/footer.liquid` |
| `SECTIONS-MAP.md` | Полная таблица соответствий + статусы | — |

## Как этим пользоваться

### Если ты GM (Gemini)
- Если нужно поправить дизайн — правь конкретный компонент (не весь App.full.jsx)
- После правки: обнови `SECTIONS-MAP.md` если меняется структура

### Если ты DS / CC (DeepSeek / Claude Code)
- Открой соответствующий `components/*.jsx`
- Перепиши на Liquid с соблюдением правил из `/docs/ARCHITECTURE.md`:
  - НЕ Tailwind — переписываешь на inline CSS с CSS-переменными
  - НЕ хардкод текстов — выноси в `{% schema %}` settings + `locales/`
  - НЕ lucide-react — заменяешь на inline SVG snippets
  - Учитывай wholesale gating где применимо

### Если ты CL (Claude в чате) или US (Маша)
- Используй для быстрого поиска «как выглядит блок X» без открывания всего App.full.jsx

## Что НЕ нужно делать

- ❌ Не запускай эти файлы как Vite/CRA приложение — они не для этого
- ❌ Не правь `App.full.jsx` — это снэпшот
- ❌ Не добавляй новые зависимости в эти файлы — это просто JSX-разметка для референса

## Tech notes

Эти файлы используют:
- React 18 syntax (functional components, hooks)
- Tailwind CSS classes (только для дизайн-референса — в Liquid НЕ переносим)
- `lucide-react` иконки (заменяются на SVG в Liquid)

Если кто-то захочет реально посмотреть как это выглядит — можно собрать в `Vite + React + Tailwind + lucide-react` отдельным проектом, но это не часть основного флоу.
