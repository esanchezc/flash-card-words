"use client";

import React, { useState, useEffect } from "react";
import { FlashCard as FlashCardType } from "@/types/card";
import { Star, RotateCw, Eye, EyeOff } from "lucide-react";
import { Language, translations } from "@/lib/i18n";

interface FlashCardProps {
  card: FlashCardType;
  isFlipped: boolean;
  onFlip: () => void;
  onToggleStar: (id: string) => void;
  currentIndex: number;
  totalInQueue: number;
  language: Language;
}

export const FlashCard: React.FC<FlashCardProps> = ({
  card,
  isFlipped,
  onFlip,
  onToggleStar,
  currentIndex,
  totalInQueue,
  language,
}) => {
  const [showClue, setShowClue] = useState<boolean>(false);
  const t = translations[language];

  // Reset clue visibility whenever a new card is shown
  useEffect(() => {
    setShowClue(false);
  }, [card.id]);

  const handleClueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowClue((prev) => !prev);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStar(card.id);
  };

  return (
    <div
      className="w-full max-w-sm sm:max-w-md h-[420px] sm:h-[450px] perspective-1000 cursor-pointer select-none mx-auto my-2"
      onClick={onFlip}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-3xl ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ================= FRONT SIDE (English Word + Clue) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between card-paper-shadow">
          {/* Top Bar: Bucket, Index, Star */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-100 tracking-wide uppercase">
              {card.bucket}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">
                {currentIndex} / {totalInQueue} {t.inQueue}
              </span>
              <button
                type="button"
                onClick={handleStarClick}
                className="p-1.5 rounded-full hover:bg-slate-100 active:scale-90 transition-transform"
                title={card.starred ? "Remove star" : "Star word"}
              >
                <Star
                  className={`w-5 h-5 transition-colors ${
                    card.starred
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300 hover:text-slate-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Center: Main Word (Clean, prominent display) */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-600 tracking-tight capitalize">
              {card.word}
            </h1>
          </div>

          {/* Bottom Section: Clue Peek & Tap To Flip prompt */}
          <div className="space-y-3">
            <div
              onClick={handleClueClick}
              className={`p-3.5 rounded-2xl transition-all duration-200 border ${
                showClue
                  ? "bg-amber-50/80 border-amber-200 text-slate-800"
                  : "bg-slate-50 border-dashed border-slate-200 hover:bg-slate-100/80 text-slate-500"
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  {showClue ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {t.clue}
                </span>
                <span className="text-[10px] text-slate-400">
                  {showClue ? t.tapToHide : t.tapToReveal}
                </span>
              </div>

              {showClue && (
                <div className="mt-2 text-sm">
                  <div className="font-semibold text-slate-800 text-base">{card.translation}</div>
                  {card.notes && (
                    <div className="text-xs text-amber-700/90 mt-0.5 font-normal">
                      * {card.notes}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium pt-1">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{t.tapToSeeDefinition}</span>
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (Definition & Example) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between card-paper-shadow">
          {/* Top Bar: Word reminder, Definition Badge, Star */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200 uppercase tracking-wide">
                {t.definition}
              </span>
              <span className="text-sm font-bold text-sky-700 capitalize">
                {card.word}
              </span>
            </div>

            <button
              type="button"
              onClick={handleStarClick}
              className="p-1.5 rounded-full hover:bg-slate-100 active:scale-90 transition-transform"
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  card.starred
                    ? "fill-amber-400 text-amber-400"
                    : "text-slate-300 hover:text-slate-400"
                }`}
              />
            </button>
          </div>

          {/* Center: English Definition */}
          <div className="flex-1 flex flex-col justify-center my-4 overflow-y-auto pr-1">
            <p className="text-xl sm:text-2xl font-serif text-slate-800 leading-snug font-medium">
              &ldquo;{card.definition}&rdquo;
            </p>

            {/* Example sentence */}
            {card.example && (
              <div className="mt-4 p-3 bg-slate-50 border-l-4 border-sky-400 rounded-r-xl">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {t.example}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 italic">
                  {card.example}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Section: Translation reminder + Flip back prompt */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="truncate max-w-[180px] font-medium text-slate-600">
              {card.translation}
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{t.tapToFlip}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
