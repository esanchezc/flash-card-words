"use client";

import React, { useEffect } from "react";
import { X, Check, RotateCw } from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface DeckControlsProps {
  onNeedsPractice: () => void;
  onGotIt: () => void;
  onFlip: () => void;
  disabled?: boolean;
  language: Language;
}

export const DeckControls: React.FC<DeckControlsProps> = ({
  onNeedsPractice,
  onGotIt,
  onFlip,
  disabled = false,
  language,
}) => {
  const t = translations[language] || translations.en;

  // Desktop keyboard listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      // Ignore if user is inside an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onNeedsPractice();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onGotIt();
      } else if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        onFlip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, onNeedsPractice, onGotIt, onFlip]);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-4 py-3 flex items-center justify-between gap-3">
      {/* Needs Practice Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={onNeedsPractice}
        className="flex-1 flex flex-col items-center justify-center py-3.5 px-4 bg-white border-2 border-rose-200 text-rose-600 rounded-2xl shadow-xs hover:bg-rose-50 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
      >
        <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base">
          <X className="w-5 h-5 stroke-[2.5]" />
          <span>{t.needsWork}</span>
        </div>
        <span className="text-[10px] text-rose-400 font-medium hidden sm:inline mt-0.5">
          {t.leftArrow}
        </span>
      </button>

      {/* Flip Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={onFlip}
        className="p-3.5 bg-slate-100 border border-slate-200 text-slate-700 rounded-2xl hover:bg-slate-200 active:scale-90 transition-all disabled:opacity-50 cursor-pointer"
        title={t.flipCard}
      >
        <RotateCw className="w-6 h-6" />
      </button>

      {/* Got It Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={onGotIt}
        className="flex-1 flex flex-col items-center justify-center py-3.5 px-4 bg-emerald-600 text-white rounded-2xl shadow-md hover:bg-emerald-700 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
      >
        <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base">
          <Check className="w-5 h-5 stroke-[3]" />
          <span>{t.gotIt}</span>
        </div>
        <span className="text-[10px] text-emerald-200 font-medium hidden sm:inline mt-0.5">
          {t.rightArrow}
        </span>
      </button>
    </div>
  );
};
