// AnnouncementBar.jsx
// Соответствует: sections/announcement-bar.liquid (нативный Dawn, кастомизировать)
//
// Тонкая полоса сверху страницы. Текст в Dawn управляется через theme settings.
// При миграции:
// - Текст вынести в schema settings секции announcement-bar
// - Сделать многоязычным через locales
// - Вариант с high-contrast — через CSS-класс html.a11y-high-contrast (см. ARCHITECTURE)

import React from 'react';

export default function AnnouncementBar({ highContrast }) {
  return (
    <div
      className={`py-2.5 text-center text-xs font-bold uppercase tracking-[0.2em] ${
        highContrast
          ? 'bg-black text-white border-b-2 border-white'
          : 'bg-amber-800 text-amber-50'
      }`}
    >
      For verified wholesale partners only
    </div>
  );
}
