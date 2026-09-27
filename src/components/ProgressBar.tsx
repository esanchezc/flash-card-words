"use client";

import React from "react";

interface ProgressBarProps {
  currentCount: number;
  totalCards: number;
  masteredCount: number;
  bucketName: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentCount,
  totalCards,
  masteredCount,
  bucketName,
}) => {
  const percent = totalCards > 0 ? Math.round((masteredCount / totalCards) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
        <span className="truncate max-w-[150px]">
          {bucketName === "__GLOBAL_POOL__" ? "Global Pool" : bucketName}
        </span>
        <div className="flex items-center gap-2">
          <span>Card {currentCount} of {totalCards}</span>
          <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
            {masteredCount}/{totalCards} Got it
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
