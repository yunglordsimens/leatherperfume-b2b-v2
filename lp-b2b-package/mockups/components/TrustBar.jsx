// TrustBar.jsx
// Соответствует: sections/trust-bar.liquid
//
// 3 фичи в ряд: High Margin / Fast Shipping / Flexible Orders.
// При миграции в Liquid:
// - Использовать blocks в {% schema %} (3 блока, каждый с icon picker, title, description)
// - Иконки lucide-react заменить на inline SVG snippets

import React from 'react';
import { Percent, Clock, Package } from 'lucide-react';

export default function TrustBar({ highContrast, getHeadingSize, getBodyTextSize }) {
  return (
    <section
      className={`border-b ${
        highContrast ? 'border-black border-b-4' : 'border-stone-200 bg-white'
      } py-16`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <h3
          className={`text-center font-bold uppercase tracking-widest text-sm mb-12 ${
            highContrast ? 'text-black' : 'text-stone-400'
          }`}
        >
          Why 200+ stores work with us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="flex flex-col items-center text-center pt-6 md:pt-0 md:px-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                highContrast ? 'border-4 border-black' : 'bg-amber-50'
              }`}
            >
              <Percent className={`w-8 h-8 ${highContrast ? 'text-black' : 'text-amber-700'}`} />
            </div>
            <h4 className={`font-serif ${getHeadingSize('text-2xl', 'text-3xl')} font-bold mb-3`}>
              High Margin
            </h4>
            <p className={`${getBodyTextSize()} ${highContrast ? 'font-medium' : 'text-stone-600'}`}>
              Special wholesale pricing allows for a retail markup of 100% to 150%, ensuring rapid
              return on investment.
            </p>
          </div>

          <div className="flex flex-col items-center text-center pt-10 md:pt-0 md:px-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                highContrast ? 'border-4 border-black' : 'bg-amber-50'
              }`}
            >
              <Clock className={`w-8 h-8 ${highContrast ? 'text-black' : 'text-amber-700'}`} />
            </div>
            <h4 className={`font-serif ${getHeadingSize('text-2xl', 'text-3xl')} font-bold mb-3`}>
              Fast Shipping
            </h4>
            <p className={`${getBodyTextSize()} ${highContrast ? 'font-medium' : 'text-stone-600'}`}>
              Our central warehouse is located in Prague. We assemble and dispatch confirmed orders
              within 1 business day.
            </p>
          </div>

          <div className="flex flex-col items-center text-center pt-10 md:pt-0 md:px-8">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                highContrast ? 'border-4 border-black' : 'bg-amber-50'
              }`}
            >
              <Package className={`w-8 h-8 ${highContrast ? 'text-black' : 'text-amber-700'}`} />
            </div>
            <h4 className={`font-serif ${getHeadingSize('text-2xl', 'text-3xl')} font-bold mb-3`}>
              Flexible Orders
            </h4>
            <p className={`${getBodyTextSize()} ${highContrast ? 'font-medium' : 'text-stone-600'}`}>
              We don't force massive bulk purchases. Our Minimum Order Quantity (MOQ) is tailored
              for easy and frequent restocking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
