"use client";

import React, { useState } from "react";
import { Plus, Download, Shuffle, ChevronDown, Layers, Sparkles } from "lucide-react";
import { GLOBAL_POOL_BUCKET } from "@/hooks/useDeck";

interface HeaderProps {
  buckets: string[];
  activeBucket: string;
  onSelectBucket: (bucket: string) => void;
  onOpenNewBucket: () => void;
  onExportCSV: () => void;
  onShuffle: () => void;
  totalCardsInBucket: number;
}

export const Header: React.FC<HeaderProps> = ({
  buckets,
  activeBucket,
  onSelectBucket,
  onOpenNewBucket,
  onExportCSV,
  onShuffle,
  totalCardsInBucket,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeLabel =
    activeBucket === GLOBAL_POOL_BUCKET ? "Global Pool (All)" : activeBucket;

  return (
    <header className="w-full max-w-md mx-auto pt-3 px-4 pb-1">
      <div className="flex items-center justify-between gap-2">
        {/* Bucket Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-slate-300 active:scale-95 transition-all text-xs font-bold text-slate-800"
          >
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span className="truncate max-w-[120px]">{activeLabel}</span>
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

              <div className="absolute left-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl z-40 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Bucket / Set
                </div>

                {buckets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => {
                      onSelectBucket(b);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
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
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors ${
                    activeBucket === GLOBAL_POOL_BUCKET
                      ? "bg-sky-50 text-sky-700 font-bold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Global Pool (All Words)
                  </span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onShuffle}
            title="Shuffle deck"
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExportCSV}
            title="Export CSV"
            className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenNewBucket}
            className="flex items-center gap-1 px-2.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Bucket</span>
          </button>
        </div>
      </div>
    </header>
  );
};
