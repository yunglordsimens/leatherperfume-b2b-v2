// Header.jsx
// Соответствует: sections/header.liquid (нативный Dawn, кастомизировать)
//
// Header содержит:
// - Логотип
// - Главную навигацию с Mega Menu для Catalog
// - Language Switcher (EN / CS / VI)
// - Кнопку Accessibility (открывает панель)
// - Login + Cart
// - Mobile menu toggle
//
// При миграции в Liquid:
// - Главное меню рендерить из linklist в админке Shopify
// - Mega Menu Catalog — отдельный snippet или в header.liquid с linklists
// - Language Switcher — нативные `localization` объекты Shopify (НЕ хардкод useState)
// - Для залогиненных wholesale — добавить топбар "{shop_name} · {tier}" (D-10)

import React from 'react';
import {
  User,
  ShoppingBag,
  Accessibility,
  Menu,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

const langFlags = {
  EN: '🇬🇧',
  CS: '🇨🇿',
  VI: '🇻🇳',
};

export default function Header({
  highContrast,
  linkClasses,
  setMobileMenuOpen,
  activeMegaMenu,
  setActiveMegaMenu,
  langMenuOpen,
  setLangMenuOpen,
  currentLang,
  setCurrentLang,
  setA11yOpen,
}) {
  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        highContrast
          ? 'bg-white border-black border-b-4'
          : 'bg-white border-b border-stone-200 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-24 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-12">
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold cursor-pointer">
            Leather Parfum
          </h1>

          <nav className="hidden lg:flex items-center gap-8 font-bold h-24 text-sm uppercase tracking-wider">
            <button className={`text-amber-700 transition-colors ${linkClasses}`}>Home</button>

            {/* Mega Menu Trigger */}
            <div
              className="relative h-full flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveMegaMenu('catalog')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                className={`flex items-center gap-1 hover:text-amber-700 transition-colors ${linkClasses}`}
              >
                Catalog <ChevronDown className="w-5 h-5" />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === 'catalog' && (
                <div
                  className={`absolute top-24 left-0 w-[700px] rounded-b-2xl p-10 grid grid-cols-2 gap-12 shadow-2xl cursor-default ${
                    highContrast
                      ? 'bg-white border-4 border-t-0 border-black'
                      : 'bg-white border border-t-0 border-stone-200'
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-6 pb-3 border-b border-stone-200 text-stone-900">
                      Perfumes
                    </h3>
                    <ul className="space-y-4 text-base normal-case tracking-normal font-medium text-stone-600">
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          All Fragrances
                        </a>
                      </li>
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          Women's Collection
                        </a>
                      </li>
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          Men's Collection
                        </a>
                      </li>
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          Unisex
                        </a>
                      </li>
                      <li className="pt-2">
                        <a
                          href="#"
                          className={`text-amber-700 flex items-center gap-2 ${linkClasses}`}
                        >
                          <Sparkles className="w-4 h-4" /> Tester Sets (B2B)
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-6 pb-3 border-b border-stone-200 text-stone-900">
                      Leather Goods
                    </h3>
                    <ul className="space-y-4 text-base normal-case tracking-normal font-medium text-stone-600">
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          All Leather Goods
                        </a>
                      </li>
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          Premium Belts
                        </a>
                      </li>
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          Wallets & Purses
                        </a>
                      </li>
                      <li>
                        <a href="#" className={`hover:text-amber-700 ${linkClasses}`}>
                          Cardholders
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-2 pt-6 mt-2 border-t border-stone-100">
                    <button
                      className={`w-full py-4 text-center text-sm font-bold uppercase tracking-widest rounded-xl ${
                        highContrast
                          ? 'bg-black text-white'
                          : 'bg-stone-100 text-stone-900 hover:bg-stone-200 transition-colors'
                      }`}
                    >
                      View Full Catalog
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className={`hover:text-amber-700 transition-colors ${linkClasses}`}>
              Wholesale Packages
            </button>
            <button className={`hover:text-amber-700 transition-colors ${linkClasses}`}>
              Contact
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Language Switcher */}
          <div
            className="relative hidden md:block"
            onMouseEnter={() => setLangMenuOpen(true)}
            onMouseLeave={() => setLangMenuOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 font-bold text-sm uppercase tracking-wider p-2 hover:text-amber-700 transition-colors ${linkClasses}`}
            >
              <span className="text-lg leading-none">{langFlags[currentLang]}</span>{' '}
              {currentLang} <ChevronDown className="w-4 h-4" />
            </button>
            {langMenuOpen && (
              <div
                className={`absolute top-full right-0 mt-2 w-32 rounded-xl shadow-lg overflow-hidden ${
                  highContrast ? 'bg-white border-4 border-black' : 'bg-white border border-stone-200'
                }`}
              >
                <button
                  onClick={() => setCurrentLang('EN')}
                  className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-stone-100 transition-colors flex items-center justify-between"
                >
                  English <span>🇬🇧</span>
                </button>
                <button
                  onClick={() => setCurrentLang('CS')}
                  className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-stone-100 transition-colors flex items-center justify-between"
                >
                  Čeština <span>🇨🇿</span>
                </button>
                <button
                  onClick={() => setCurrentLang('VI')}
                  className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-stone-100 transition-colors flex items-center justify-between"
                >
                  Tiếng Việt <span>🇻🇳</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setA11yOpen(true)}
            className={`p-2 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 font-bold ${
              highContrast
                ? 'border-2 border-black hover:bg-gray-100'
                : 'bg-stone-100 hover:bg-stone-200 transition-colors'
            }`}
          >
            <Accessibility className="w-6 h-6 sm:w-5 sm:h-5" />
          </button>
          <div
            className={`w-px h-8 hidden md:block ${highContrast ? 'bg-black' : 'bg-stone-300'}`}
          ></div>
          <button
            className={`hidden sm:flex items-center gap-2 font-bold hover:text-amber-700 transition-colors text-sm uppercase tracking-wider ${linkClasses}`}
          >
            <User className="w-5 h-5" /> <span className="hidden xl:inline">Log In</span>
          </button>
          <button
            className={`relative p-2 font-bold hover:text-amber-700 transition-colors ${linkClasses}`}
          >
            <ShoppingBag className="w-7 h-7 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
