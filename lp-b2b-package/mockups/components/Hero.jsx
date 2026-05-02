// Hero.jsx
// Соответствует: sections/hero-b2b.liquid
//
// Главный hero на лендинге для B2B-партнёров.
// При миграции в Liquid:
// - Заголовок, подзаголовок, кнопки CTA — в schema settings
// - Картинка справа — image_picker в schema (заглушка ImageIcon → реальная картинка)
// - Локализация через locales/

import React from 'react';
import { ArrowRight, Image as ImageIcon, Star } from 'lucide-react';

export default function Hero({ highContrast, getHeadingSize, getBodyTextSize, btnClasses }) {
  return (
    <section
      className={`${highContrast ? 'bg-white border-b-4 border-black' : 'bg-stone-900'} relative overflow-hidden`}
    >
      {!highContrast && (
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 font-bold uppercase tracking-widest text-xs rounded-md mb-8 ${
              highContrast ? 'bg-black text-white border border-black' : 'bg-stone-800 text-amber-500'
            }`}
          >
            <Star className="w-4 h-4 fill-current" /> B2B Partnership
          </div>

          <h2
            className={`font-serif ${getHeadingSize(
              'text-5xl md:text-6xl lg:text-7xl',
              'text-6xl md:text-7xl lg:text-8xl'
            )} leading-[1.1] mb-8 ${highContrast ? 'text-black font-black' : 'text-white'}`}
          >
            Your trusted supplier of niche perfumery.
          </h2>

          <p
            className={`mb-12 max-w-xl ${getBodyTextSize()} ${
              highContrast ? 'text-black font-medium' : 'text-stone-300'
            }`}
          >
            Official portal for boutique owners. Recommended retail markup from 100%, dispatch from
            our Prague warehouse in 24 hours. Catalog access is restricted to verified partners.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className={`px-8 py-5 rounded-xl font-bold flex items-center justify-center gap-3 text-lg ${btnClasses}`}
            >
              Apply for Partnership <ArrowRight className="w-5 h-5" />
            </button>
            <button
              className={`px-8 py-5 rounded-xl font-bold flex items-center justify-center text-lg ${
                highContrast
                  ? 'border-4 border-black text-black hover:bg-black hover:text-white'
                  : 'border border-stone-600 text-white hover:bg-stone-800 transition-colors'
              }`}
            >
              Log in to portal
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            className={`relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden ${
              highContrast ? 'border-4 border-black bg-white' : 'bg-stone-800 shadow-2xl'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
              <ImageIcon
                className={`w-24 h-24 ${highContrast ? 'text-black' : 'text-stone-600'}`}
                strokeWidth={1}
              />
              <span
                className={`font-bold uppercase tracking-widest text-sm border-b pb-2 ${
                  highContrast ? 'text-black border-black' : 'text-stone-500 border-stone-600'
                }`}
              >
                L.P. Wholesale
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
