"use client";

import React from "react";
import { Check, BookOpen } from "lucide-react";
import { Language } from "@/lib/i18n";

interface WordBankProps {
  words: string[];
  usedWords: string[];
  onSelectWord: (word: string) => void;
  selectedWord?: string | null;
  language?: Language;
  disabled?: boolean;
}

export const WordBank: React.FC<WordBankProps> = ({
  words,
  usedWords,
  onSelectWord,
  selectedWord,
  language = "en",
  disabled = false,
}) => {
  const normalizedUsed = usedWords.map((w) => w.toLowerCase().trim());
  const usedCount = words.filter((w) =>
    normalizedUsed.includes(w.toLowerCase().trim())
  ).length;

  return (
    <div className="w-full bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-3 shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <BookOpen className="w-3.5 h-3.5 text-sky-500" />
          <span>{language === "es" ? "Banco de Palabras" : "Word Bank"}</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">
          {usedCount} / {words.length} {language === "es" ? "usadas" : "used"}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {words.map((word) => {
          const isUsed = normalizedUsed.includes(word.toLowerCase().trim());
          const isSelected = selectedWord?.toLowerCase().trim() === word.toLowerCase().trim();

          if (isUsed) {
            return (
              <span
                key={word}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium bg-slate-100/70 border border-dashed border-slate-200 text-slate-400 line-through opacity-65 select-none"
                title={language === "es" ? `"${word}" ya fue usada` : `"${word}" has been used`}
              >
                <span>{word}</span>
                <Check className="w-3 h-3 text-slate-400 no-underline shrink-0" />
              </span>
            );
          }

          return (
            <button
              key={word}
              type="button"
              disabled={disabled}
              onClick={() => onSelectWord(word)}
              className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 active:scale-95 cursor-pointer shadow-2xs ${
                isSelected
                  ? "bg-sky-500 text-white border-2 border-sky-600 ring-2 ring-sky-200 shadow-sm"
                  : "bg-white text-slate-800 border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 hover:text-sky-700"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
};
