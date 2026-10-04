// CatalogCards.jsx
// Соответствует: sections/catalog-cards.liquid
//
// 2 большие карточки: Perfumes / Leather Goods.
// При миграции в Liquid:
// - Сделать blocks в {% schema %} (2 блока, каждый с image, title, description, button text + URL)
// - Кнопка ведёт на коллекцию (Shopify collection picker)

import React from 'react';
import { ArrowRight, Image as ImageIcon, Package } from 'lucide-react';

export default function CatalogCards({
  highContrast,
  getHeadingSize,
  getBodyTextSize,
  cardClasses,
  btnClasses,
}) {
  return (
    <section
      className={`py-24 ${
        highContrast ? 'bg-white border-b-4 border-black' : 'bg-stone-50 border-b border-stone-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className={`font-bold uppercase tracking-widest text-sm mb-4 block ${
              highContrast ? 'text-black' : 'text-amber-700'
            }`}
          >
            Our Collections
          </span>
          <h2
            className={`font-serif ${getHeadingSize('text-4xl md:text-5xl', 'text-5xl md:text-6xl')} font-bold`}
          >
            Explore the Catalog
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Category: Perfumes */}
          <div
            className={`${cardClasses} p-10 md:p-16 rounded-3xl flex flex-col items-center text-center group`}
          >
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 ${
                highContrast
                  ? 'border-4 border-black bg-white'
                  : 'bg-stone-100 border border-stone-200'
              }`}
            >
              <ImageIcon
                className={`w-12 h-12 ${highContrast ? 'text-black' : 'text-stone-400'}`}
                strokeWidth={1.5}
              />
            </div>
            <h3 className={`font-serif ${getHeadingSize('text-3xl', 'text-4xl')} font-bold mb-6`}>
              Perfumes
            </h3>
            <p className={`${getBodyTextSize()} mb-12 opacity-80 max-w-sm`}>
              Premium men's, women's, and unisex fragrances. Available in 50ml, 100ml retail formats
              and B2B tester sets.
            </p>
            <button
              className={`w-full mt-auto py-5 text-xl font-bold rounded-xl flex items-center justify-center gap-3 transition-colors ${btnClasses}`}
            >
              Browse Perfumes <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Category: Leather Goods */}
          <div
            className={`${cardClasses} p-10 md:p-16 rounded-3xl flex flex-col items-center text-center group`}
          >
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 ${
                highContrast
                  ? 'border-4 border-black bg-white'
                  : 'bg-stone-100 border border-stone-200'
              }`}
            >
              <Package
                className={`w-12 h-12 ${highContrast ? 'text-black' : 'text-stone-400'}`}
                strokeWidth={1.5}
              />
            </div>
            <h3 className={`font-serif ${getHeadingSize('text-3xl', 'text-4xl')} font-bold mb-6`}>
              Leather Goods
            </h3>
            <p className={`${getBodyTextSize()} mb-12 opacity-80 max-w-sm`}>
              Handcrafted belts, wallets, and cardholders made from premium leather. The perfect
              high-margin cross-sell items.
            </p>
            <button
              className={`w-full mt-auto py-5 text-xl font-bold rounded-xl flex items-center justify-center gap-3 transition-colors ${btnClasses}`}
            >
              Browse Leather <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
