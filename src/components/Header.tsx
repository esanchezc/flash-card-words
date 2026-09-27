"use client";

import React, { useState } from "react";
import { Plus, Download, Shuffle, ChevronDown, Layers, Sparkles, Globe } from "lucide-react";
import { GLOBAL_POOL_BUCKET } from "@/hooks/useDeck";
import { Language, translations } from "@/lib/i18n";

interface HeaderProps {
  buckets: string[];
  activeBucket: string;
  onSelectBucket: (bucket: string) => void;
  onOpenNewBucket: () => void;
  onExportCSV: () => void;
  onShuffle: () => void;
  totalCardsInBucket: number;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  buckets,
  activeBucket,
  onSelectBucket,
  onOpenNewBucket,
  onExportCSV,
  onShuffle,
  totalCardsInBucket,
  language,
  onToggleLanguage,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = translations[language];

  const activeLabel =
    activeBucket === GLOBAL_POOL_BUCKET ? t.globalPool : activeBucket;

  return (
    <header className="w-full max-w-md mx-auto pt-3 px-4 pb-1">
      <div className="flex items-center justify-between gap-2">
        {/* Bucket Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 active:scale-95 transition-all text-xs font-bold text-slate-800 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span className="truncate max-w-[110px] sm:max-w-[130px]">{activeLabel}</span>
            <span className="text-[10px] text-slate-400 font-normal">
              ({totalCardsInBucket})
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />

              <div className="absolute left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-40 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {t.selectBucket}
                </div>

                {buckets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      onSelectBucket(b);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      activeBucket === b
                        ? "bg-sky-50 text-sky-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{b}</span>
                    {activeBucket === b && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    )}
                  </button>
                ))}

                <div className="border-t border-slate-100 my-1" />

                {/* Global Pool Option */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectBucket(GLOBAL_POOL_BUCKET);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    activeBucket === GLOBAL_POOL_BUCKET
                      ? "bg-sky-50 text-sky-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    {t.globalPool}
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Action icons & Language Toggle */}
        <div className="flex items-center gap-1.5">
          {/* Simple Language Switcher Pill */}
          <button
            type="button"
            onClick={onToggleLanguage}
            title={language === "en" ? "Cambiar a Español" : "Switch to English"}
            className="flex items-center gap-1 px-2 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span className="uppercase text-[11px] font-extrabold text-sky-700">
              {language === "en" ? "ES" : "EN"}
            </span>
          </button>

          <button
            type="button"
            onClick={onShuffle}
            title={t.shuffle}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExportCSV}
            title={t.exportCSV}
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenNewBucket}
            className="flex items-center gap-1 px-2.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">{t.newBucket}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
