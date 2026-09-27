"use client";

import React from "react";
import { Language, translations } from "@/lib/i18n";
import { GLOBAL_POOL_BUCKET } from "@/hooks/useDeck";

interface ProgressBarProps {
  currentCount: number;
  totalCards: number;
  masteredCount: number;
  bucketName: string;
  language: Language;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentCount,
  totalCards,
  masteredCount,
  bucketName,
  language,
}) => {
  const t = translations[language];
  const percent = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
        <span className="truncate max-w-[150px]">
          {bucketName === GLOBAL_POOL_BUCKET ? t.globalPool : bucketName}
        </span>
        <div className="flex items-center gap-2">
          <span>
            {t.cardOf} {currentCount} {t.of} {totalCards}
          </span>
          <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
            {masteredCount}/{totalCards} {t.gotItBadge}
          </span>
        </div>
      </div>
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
