// AccessibilityPanel.jsx
// Соответствует: snippets/accessibility-panel.liquid
//
// Правая выезжающая панель с настройками доступности:
// - Размер текста (small / standard / large)
// - High contrast toggle
// - Highlight links toggle
//
// При миграции в Liquid:
// - State из useState → localStorage + класс на <html>
// - При перезагрузке страницы класс восстанавливается из localStorage в <head>
// - Никакого React — vanilla JS

import React from 'react';
import { Accessibility, X, Type, Contrast, Link as LinkIcon } from 'lucide-react';

export default function AccessibilityPanel({
  a11yOpen,
  setA11yOpen,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
  highlightLinks,
  setHighlightLinks,
}) {
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 w-80 md:w-96 bg-stone-900 text-white z-[100] transform transition-transform duration-300 shadow-2xl ${
          a11yOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between border-b border-stone-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Accessibility className="w-6 h-6 text-amber-500" /> Accessibility
          </h2>
          <button
            onClick={() => setA11yOpen(false)}
            className="p-2 hover:bg-stone-800 rounded-md transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-8">
          {/* Text Size Control */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-stone-300 mb-4 flex items-center gap-3">
              <Type className="w-5 h-5" /> Text Size
            </h3>
            <div className="flex flex-col gap-2 bg-stone-800 rounded-xl p-2 font-bold">
              <button
                onClick={() => setTextSize('small')}
                className={`w-full py-3 rounded-lg transition-colors ${
                  textSize === 'small' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Small
              </button>
              <button
                onClick={() => setTextSize('standard')}
                className={`w-full py-3 rounded-lg transition-colors ${
                  textSize === 'standard' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setTextSize('large')}
                className={`w-full py-3 rounded-lg transition-colors ${
                  textSize === 'large' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Large
              </button>
            </div>
          </div>

          {/* Contrast Control */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-stone-300 mb-4 flex items-center gap-3">
              <Contrast className="w-5 h-5" /> Contrast
            </h3>
            <label className="flex items-center justify-between cursor-pointer bg-stone-800 p-5 rounded-xl font-bold hover:bg-stone-700 transition-colors">
              <span>High Contrast (B/W)</span>
              <div
                className={`w-14 h-8 rounded-full relative transition-colors ${
                  highContrast ? 'bg-amber-500' : 'bg-stone-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    highContrast ? 'translate-x-6' : ''
                  }`}
                ></div>
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
              />
            </label>
          </div>

          {/* Links Control */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-widest text-stone-300 mb-4 flex items-center gap-3">
              <LinkIcon className="w-5 h-5" /> Navigation
            </h3>
            <label className="flex items-center justify-between cursor-pointer bg-stone-800 p-5 rounded-xl font-bold hover:bg-stone-700 transition-colors">
              <span>Highlight Links</span>
              <div
                className={`w-14 h-8 rounded-full relative transition-colors ${
                  highlightLinks ? 'bg-amber-500' : 'bg-stone-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                    highlightLinks ? 'translate-x-6' : ''
                  }`}
                ></div>
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={highlightLinks}
                onChange={() => setHighlightLinks(!highlightLinks)}
              />
            </label>
          </div>
        </div>
      </div>
      {a11yOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm transition-opacity"
          onClick={() => setA11yOpen(false)}
        ></div>
      )}
    </>
  );
}
