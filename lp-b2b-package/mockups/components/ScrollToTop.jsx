// ScrollToTop.jsx
// Соответствует: snippets/scroll-to-top.liquid + JS в assets/theme.js
//
// Плавающая кнопка появляющаяся после 500px скролла, скроллит наверх.
// При миграции:
// - HTML кнопки — snippet (включается в layout/theme.liquid)
// - Логика появления и скролла — vanilla JS в assets/theme.js
// - Стиль — inline CSS в snippet или в theme.css

import React from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop({ showScroll, highContrast }) {
  if (!showScroll) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-[80] p-4 rounded-full shadow-2xl transition-all hover:-translate-y-1 focus:outline-none ${
        highContrast
          ? 'bg-black text-white border-2 border-white'
          : 'bg-stone-900 text-white hover:bg-amber-700'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}

// JS логика для миграции (vanilla):
//
// (function() {
//   const btn = document.querySelector('[data-scroll-to-top]');
//   if (!btn) return;
//
//   const onScroll = () => {
//     if (window.scrollY > 500) {
//       btn.classList.add('is-visible');
//     } else {
//       btn.classList.remove('is-visible');
//     }
//   };
//
//   window.addEventListener('scroll', onScroll, { passive: true });
//   btn.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   });
// })();
