// Footer.jsx
// Соответствует: sections/footer.liquid (нативный Dawn, кастомизировать)
//
// 4 колонки: Brand + Navigation + Contact + Legal
// + копирайт и "Made in Europe"
//
// При миграции:
// - Бренд-блок: name + description + соцссылки → schema settings
// - Навигация и Legal: linklist из админки
// - Contact: schema (телефон, локация, email)
// - Все строки в locales/

import React from 'react';
import { Phone, MapPin } from 'lucide-react';

export default function Footer({ highContrast, getBodyTextSize, linkClasses }) {
  return (
    <footer
      className={`${
        highContrast ? 'bg-white border-t-4 border-black text-black' : 'bg-stone-900 text-stone-300'
      } py-16 md:py-24 mt-auto`}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
        <div className="lg:col-span-1">
          <h4 className="font-serif text-3xl font-bold mb-6 text-white">Leather Parfum</h4>
          <p className={`${getBodyTextSize()} font-medium opacity-80 mb-8`}>
            Your premium wholesale partner. Exclusive terms for retail businesses.
          </p>
          <div className="flex gap-4">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                highContrast
                  ? 'border-2 border-black hover:bg-black hover:text-white'
                  : 'bg-stone-800 hover:bg-amber-700 text-white transition-colors'
              }`}
            >
              In
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                highContrast
                  ? 'border-2 border-black hover:bg-black hover:text-white'
                  : 'bg-stone-800 hover:bg-amber-700 text-white transition-colors'
              }`}
            >
              Fb
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-8 uppercase tracking-widest text-stone-500">
            Navigation
          </h4>
          <ul className={`space-y-5 font-bold ${getBodyTextSize()}`}>
            <li>
              <button className={`hover:text-amber-500 transition-colors ${linkClasses}`}>
                Perfume Catalog
              </button>
            </li>
            <li>
              <button className={`hover:text-amber-500 transition-colors ${linkClasses}`}>
                Wholesale Packages
              </button>
            </li>
            <li>
              <button className={`hover:text-amber-500 transition-colors ${linkClasses}`}>
                About Us
              </button>
            </li>
            <li>
              <button className={`hover:text-amber-500 transition-colors ${linkClasses}`}>
                Partner Login
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-8 uppercase tracking-widest text-stone-500">
            Contact
          </h4>
          <ul className={`space-y-5 font-bold ${getBodyTextSize()}`}>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 opacity-50" /> +420 123 456 789
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 opacity-50" /> Prague, Czechia
            </li>
            <li className="flex items-center gap-3">b2b@leatherparfum.com</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold mb-8 uppercase tracking-widest text-stone-500">Legal</h4>
          <ul className={`space-y-5 font-bold ${getBodyTextSize()}`}>
            <li>
              <a href="#" className={`hover:text-amber-500 transition-colors ${linkClasses}`}>
                B2B Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className={`hover:text-amber-500 transition-colors ${linkClasses}`}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className={`hover:text-amber-500 transition-colors ${linkClasses}`}>
                Returns & Claims
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold uppercase tracking-wider ${
          highContrast ? 'border-t-2 border-black' : 'border-t border-stone-800'
        }`}
      >
        <p className="opacity-60">&copy; 2026 Leather Parfum Wholesale. All rights reserved.</p>
        <div className="flex gap-6 opacity-60">
          <span>Made in Europe</span>
        </div>
      </div>
    </footer>
  );
}
