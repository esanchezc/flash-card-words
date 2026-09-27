"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { RotateCw, Star, Layers, CheckCircle2 } from "lucide-react";
import { FlashCard } from "@/types/card";
import { Language, translations } from "@/lib/i18n";
import { GLOBAL_POOL_BUCKET } from "@/hooks/useDeck";

interface SessionCompleteProps {
  bucketName: string;
  cards: FlashCard[];
  onRestart: () => void;
  onPracticeStarred: () => void;
  onSelectAnotherBucket: () => void;
  starredCount: number;
  language: Language;
}

export const SessionComplete: React.FC<SessionCompleteProps> = ({
  bucketName,
  cards,
  onRestart,
  onPracticeStarred,
  onSelectAnotherBucket,
  starredCount,
  language,
}) => {
  const t = translations[language];

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto my-auto p-6 bg-white border border-slate-200/80 rounded-3xl shadow-xl flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </div>

      <span className="text-xs font-bold text-sky-600 uppercase tracking-widest px-3 py-1 bg-sky-50 rounded-full mb-2">
        {bucketName === GLOBAL_POOL_BUCKET ? t.globalPool : bucketName}
      </span>

      <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
        {t.bucketCompleted}
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        {t.masteredSubtitle(cards.length)}
      </p>

      {/* Mini word summary */}
      <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 mb-6 max-h-48 overflow-y-auto divide-y divide-slate-100 text-left">
        {cards.map((c) => (
          <div key={c.id} className="py-1.5 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-800 capitalize">{c.word}</span>
              <span className="text-slate-400 ml-2">{c.translation}</span>
            </div>
            {c.starred && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-2.5">
        <button
          type="button"
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-2xl shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>{t.practiceAgain}</span>
        </button>

        {starredCount > 0 && (
          <button
            type="button"
            onClick={onPracticeStarred}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-sm rounded-2xl active:scale-95 transition-all cursor-pointer"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{t.reviewStarred(starredCount)}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onSelectAnotherBucket}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-slate-600 hover:bg-slate-100 font-semibold text-xs rounded-xl transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>{t.chooseAnotherBucket}</span>
        </button>
      </div>
    </div>
  );
};
