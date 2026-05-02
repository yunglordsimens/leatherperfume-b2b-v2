// BottomCTA.jsx
// Соответствует: sections/bottom-cta.liquid
//
// Финальный CTA блок: "Ready to elevate your retail space?" + кнопка Apply for Partnership.
// При миграции в Liquid:
// - Заголовок, описание, текст кнопки и URL — все в schema settings
// - Локализация через locales

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BottomCTA({ highContrast, getHeadingSize, getBodyTextSize }) {
  return (
    <section
      className={`py-20 md:py-32 ${
        highContrast ? 'bg-white border-t-4 border-black' : 'bg-amber-800 text-white'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          className={`font-serif ${getHeadingSize(
            'text-4xl md:text-5xl',
            'text-5xl md:text-6xl'
          )} font-bold mb-6 ${highContrast ? 'text-black' : 'text-white'}`}
        >
          Ready to elevate your retail space?
        </h2>
        <p
          className={`${getBodyTextSize()} mb-10 ${
            highContrast ? 'text-black font-medium' : 'text-amber-100'
          }`}
        >
          Join our network of premium retail partners and get access to exclusive wholesale
          pricing, priority shipping, and dedicated support.
        </p>
        <button
          className={`px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-3 transition-colors ${
            highContrast
              ? 'bg-black text-white hover:bg-stone-800 border-2 border-black'
              : 'bg-stone-900 text-white hover:bg-black shadow-xl'
          }`}
        >
          Apply for Partnership <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
