// EditorialBlock.jsx
// Соответствует: sections/editorial-heritage.liquid
//
// Editorial-блок про Heritage / Quality:
// - Заголовок + 2 параграфа текста
// - Список преимуществ с галочками
// - Картинка справа с декоративной заливкой
//
// При миграции в Liquid:
// - Заголовок и параграфы — schema settings (rich_text)
// - Список преимуществ — blocks (тип "feature_item" с текстом)
// - Картинка — image_picker

import React from 'react';
import { CheckCircle2, Image as ImageIcon } from 'lucide-react';

export default function EditorialBlock({ highContrast, getHeadingSize, getBodyTextSize }) {
  return (
    <section className={`py-24 ${highContrast ? 'bg-white' : 'bg-white'} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2
            className={`font-serif ${getHeadingSize(
              'text-4xl md:text-5xl',
              'text-5xl md:text-6xl'
            )} font-bold mb-8`}
          >
            Made to be a bestseller.
          </h2>
          <div
            className={`space-y-6 ${getBodyTextSize()} ${
              highContrast ? 'font-medium' : 'text-stone-600'
            }`}
          >
            <p>
              Leather Parfum is more than just fragrance. It is an anchor product for your retail
              business. We use the highest quality ingredients to create lasting, memorable
              compositions that keep clients coming back.
            </p>
            <p>
              Every bottle and leather item comes in premium packaging designed to look stunning on
              the shelves of boutiques and concept stores. We provide our partners with all
              necessary marketing materials for visual merchandising.
            </p>
          </div>
          <ul className="mt-10 space-y-4">
            <li className="flex items-center gap-3 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" /> European quality certification
            </li>
            <li className="flex items-center gap-3 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" /> Full-size testers for retail
              partners
            </li>
          </ul>
        </div>
        <div className="relative h-[400px] md:h-[600px] w-full">
          <div
            className={`absolute inset-0 rounded-2xl flex items-center justify-center z-10 ${
              highContrast
                ? 'border-4 border-black bg-white'
                : 'bg-stone-100 border border-stone-200'
            }`}
          >
            <ImageIcon className="w-16 h-16 text-stone-400" />
          </div>
          {!highContrast && (
            <div className="absolute top-8 left-8 w-full h-full bg-amber-700/10 rounded-2xl z-0"></div>
          )}
        </div>
      </div>
    </section>
  );
}
