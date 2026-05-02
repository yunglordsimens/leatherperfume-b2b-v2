// WholesalePackages.jsx
// Соответствует: sections/packages-wholesale.liquid
//
// 2 пакета (Fragrance Corner + Boutique Launch с пометкой "Best Value") + кнопка "View more".
// При миграции в Liquid:
// - Каждый пакет — block в {% schema %} (тип "package")
// - Поля: title, sku_count, discount_percentage, description, investment_amount, button_url, is_highlighted (bool для "Best Value")
// - "Best Value" badge — условный рендер из block.settings.is_highlighted

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function WholesalePackages({ highContrast, getHeadingSize, getBodyTextSize }) {
  return (
    <section className={`py-24 ${highContrast ? 'bg-white border-t-4 border-black' : 'bg-stone-900 text-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span
            className={`font-bold uppercase tracking-widest text-sm mb-4 block ${
              highContrast ? 'text-black' : 'text-amber-500'
            }`}
          >
            Getting Started
          </span>
          <h2
            className={`font-serif ${getHeadingSize(
              'text-4xl md:text-5xl',
              'text-5xl md:text-6xl'
            )} font-bold mb-6`}
          >
            Ready-Made Solutions
          </h2>
          <p
            className={`max-w-2xl mx-auto ${getBodyTextSize()} ${
              highContrast ? 'font-medium' : 'text-stone-400'
            }`}
          >
            We've designed optimal packages for a quick sales launch. Choose the one that best fits
            your retail format.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Package 1 */}
          <div
            className={`p-10 md:p-12 rounded-3xl flex flex-col ${
              highContrast
                ? 'border-4 border-black text-black'
                : 'bg-stone-800 border border-stone-700'
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className={`font-serif ${getHeadingSize('text-3xl', 'text-4xl')} font-bold mb-4`}>
                  Fragrance Corner
                </h3>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-md ${
                      highContrast ? 'border-2 border-black' : 'bg-stone-900 text-stone-300'
                    }`}
                  >
                    20 SKUs
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-md ${
                      highContrast ? 'border-2 border-black' : 'bg-amber-900/50 text-amber-500'
                    }`}
                  >
                    10% Discount
                  </span>
                </div>
              </div>
            </div>
            <p
              className={`${getBodyTextSize()} mb-10 flex-grow ${
                highContrast ? 'font-medium' : 'text-stone-400'
              }`}
            >
              Ideal for existing clothing or shoe boutiques. A compact display featuring the most
              popular fragrances for cross-selling. Includes a basic tester set.
            </p>
            <div className="border-t border-stone-700 pt-8 mt-auto flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-stone-500 mb-1">
                  Investment
                </p>
                <p className={`font-serif ${getHeadingSize('text-2xl', 'text-3xl')} font-bold`}>
                  from 25,000 CZK
                </p>
              </div>
              <button
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-colors ${
                  highContrast
                    ? 'bg-black text-white hover:bg-stone-800'
                    : 'bg-white text-stone-900 hover:bg-stone-200'
                }`}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Package 2 (Highlighted) */}
          <div
            className={`p-10 md:p-12 rounded-3xl flex flex-col relative ${
              highContrast
                ? 'border-8 border-black text-black'
                : 'bg-amber-700 text-white shadow-2xl shadow-amber-900/20'
            }`}
          >
            {!highContrast && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-amber-900 px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-full shadow-md">
                Best Value
              </div>
            )}
            {highContrast && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-full">
                Best Value
              </div>
            )}

            <div className="flex justify-between items-start mb-8 pt-4">
              <div>
                <h3 className={`font-serif ${getHeadingSize('text-3xl', 'text-4xl')} font-bold mb-4`}>
                  Boutique Launch
                </h3>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-md ${
                      highContrast ? 'border-2 border-black' : 'bg-amber-800 text-amber-50'
                    }`}
                  >
                    60 SKUs
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-md ${
                      highContrast ? 'border-2 border-black' : 'bg-white text-amber-900'
                    }`}
                  >
                    15% Discount
                  </span>
                </div>
              </div>
            </div>
            <p
              className={`${getBodyTextSize()} mb-10 flex-grow ${
                highContrast ? 'font-medium' : 'text-amber-100'
              }`}
            >
              Full inventory for a new store. Includes the entire fragrance line, leather
              accessories, gift sets, and extensive marketing support with a dedicated manager.
            </p>
            <div
              className={`border-t pt-8 mt-auto flex flex-col sm:flex-row justify-between items-center gap-6 ${
                highContrast ? 'border-black' : 'border-amber-600'
              }`}
            >
              <div>
                <p
                  className={`text-sm font-bold uppercase tracking-widest mb-1 ${
                    highContrast ? 'text-stone-500' : 'text-amber-200'
                  }`}
                >
                  Investment
                </p>
                <p className={`font-serif ${getHeadingSize('text-2xl', 'text-3xl')} font-bold`}>
                  from 50,000 CZK
                </p>
              </div>
              <button
                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg transition-colors ${
                  highContrast
                    ? 'bg-black text-white hover:bg-stone-800'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* More Packages Button */}
        <div className="text-center">
          <button
            className={`px-10 py-5 rounded-xl font-bold text-lg inline-flex items-center gap-3 transition-colors ${
              highContrast
                ? 'border-4 border-black text-black hover:bg-black hover:text-white'
                : 'border border-stone-600 text-white hover:bg-stone-800'
            }`}
          >
            View more wholesale packages <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
