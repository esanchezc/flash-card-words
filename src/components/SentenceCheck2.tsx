"use client";

import React, { useState, useMemo } from "react";
import { SentenceCheck2Item } from "@/data/sentenceChecks";
import { WordBank } from "./WordBank";
import {
  Check,
  X,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowLeftRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Language } from "@/lib/i18n";

interface SentenceCheck2Props {
  items: SentenceCheck2Item[];
  allSetWords: string[];
  bucketName: string;
  language: Language;
  onSelectAnotherMode?: () => void;
}

export const SentenceCheck2: React.FC<SentenceCheck2Props> = ({
  items,
  allSetWords,
  bucketName,
  language,
  onSelectAnotherMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Track placed words per item id: { "set2-sc2-1": { blank1: "arbitrary", blank2: "euphemism" } }
  const [answers, setAnswers] = useState<
    Record<string, { blank1?: string; blank2?: string }>
  >({});
  // Track correctness per item id: { "set2-sc2-1": true }
  const [status, setStatus] = useState<Record<string, boolean>>({});
  // Track which blank is currently receiving input: 1 | 2
  const [activeBlank, setActiveBlank] = useState<1 | 2>(1);
  // Track hints toggled per item id: { "set2-sc2-1": boolean }
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [shakeCurrent, setShakeCurrent] = useState<boolean>(false);

  const currentItem = items[currentIndex];
  const currentPair = currentItem ? answers[currentItem.id] || {} : {};
  const isCurrentSolved = currentItem ? status[currentItem.id] === true : false;
  const isCurrentWrong = currentItem && status[currentItem.id] === false;

  // Words currently placed across solved items or the active item
  const usedWords = useMemo(() => {
    const list: string[] = [];
    Object.entries(answers).forEach(([id, pair]) => {
      const isSolved = status[id] === true;
      const isCurrent = currentItem && currentItem.id === id;
      if (isSolved || isCurrent) {
        if (pair.blank1) list.push(pair.blank1);
        if (pair.blank2) list.push(pair.blank2);
      }
    });
    return list;
  }, [answers, status, currentItem]);

  const solvedCount = useMemo(() => {
    return Object.values(status).filter(Boolean).length;
  }, [status]);

  const allCompleted = items.length > 0 && solvedCount === items.length;

  const handleSelectWord = (word: string) => {
    if (!currentItem || isCurrentSolved) return;

    const currentBlank = activeBlank;
    const otherBlank = currentBlank === 1 ? 2 : 1;
    const existingOther =
      currentBlank === 1 ? currentPair.blank2 : currentPair.blank1;

    // If this word is already in the other blank of this sentence, don't duplicate
    if (existingOther?.toLowerCase().trim() === word.toLowerCase().trim()) {
      return;
    }

    const updatedPair = {
      ...currentPair,
      [currentBlank === 1 ? "blank1" : "blank2"]: word,
    };

    setAnswers((prev) => ({
      ...prev,
      [currentItem.id]: updatedPair,
    }));

    // Reset status when user makes a change
    setStatus((prev) => {
      const next = { ...prev };
      delete next[currentItem.id];
      return next;
    });

    // If both blanks are now filled, evaluate
    if (updatedPair.blank1 && updatedPair.blank2) {
      const b1 = updatedPair.blank1.toLowerCase().trim();
      const b2 = updatedPair.blank2.toLowerCase().trim();
      const t1 = currentItem.targetWords[0].toLowerCase().trim();
      const t2 = currentItem.targetWords[1].toLowerCase().trim();

      const isBothCorrect = b1 === t1 && b2 === t2;

      if (isBothCorrect) {
        setStatus((prev) => ({ ...prev, [currentItem.id]: true }));
        if (solvedCount + 1 === items.length) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      } else {
        setStatus((prev) => ({ ...prev, [currentItem.id]: false }));
        setShakeCurrent(true);
        setTimeout(() => setShakeCurrent(false), 500);
      }
    } else {
      // Auto-advance active blank to the other blank if it's empty
      if (!existingOther) {
        setActiveBlank(otherBlank);
      }
    }
  };

  const handleClearBlank = (blankNum: 1 | 2) => {
    if (!currentItem || isCurrentSolved) return;

    setAnswers((prev) => {
      const pair = prev[currentItem.id] || {};
      const updated = {
        ...pair,
        [blankNum === 1 ? "blank1" : "blank2"]: undefined,
      };
      return { ...prev, [currentItem.id]: updated };
    });

    setStatus((prev) => {
      const next = { ...prev };
      delete next[currentItem.id];
      return next;
    });

    setActiveBlank(blankNum);
  };

  const handleSwapWords = () => {
    if (!currentItem || isCurrentSolved) return;
    if (!currentPair.blank1 || !currentPair.blank2) return;

    const swapped = {
      blank1: currentPair.blank2,
      blank2: currentPair.blank1,
    };

    setAnswers((prev) => ({ ...prev, [currentItem.id]: swapped }));

    const b1 = swapped.blank1.toLowerCase().trim();
    const b2 = swapped.blank2.toLowerCase().trim();
    const t1 = currentItem.targetWords[0].toLowerCase().trim();
    const t2 = currentItem.targetWords[1].toLowerCase().trim();

    if (b1 === t1 && b2 === t2) {
      setStatus((prev) => ({ ...prev, [currentItem.id]: true }));
      if (solvedCount + 1 === items.length) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      setStatus((prev) => ({ ...prev, [currentItem.id]: false }));
      setShakeCurrent(true);
      setTimeout(() => setShakeCurrent(false), 500);
    }
  };

  const toggleHints = () => {
    if (!currentItem) return;
    setShowHints((prev) => ({
      ...prev,
      [currentItem.id]: !prev[currentItem.id],
    }));
  };

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setActiveBlank(1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setActiveBlank(1);
    }
  };

  const resetAll = () => {
    setAnswers({});
    setStatus({});
    setShowHints({});
    setCurrentIndex(0);
    setActiveBlank(1);
  };

  if (!items || items.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto text-center p-8 bg-white rounded-3xl border border-slate-200">
        <Sparkles className="w-8 h-8 text-sky-500 mx-auto mb-2" />
        <h3 className="font-bold text-slate-800 text-sm mb-1">
          {language === "es" ? "Sin oraciones disponibles" : "No sentences available"}
        </h3>
        <p className="text-xs text-slate-500">
          {language === "es"
            ? `Sentence Check 2 para ${bucketName} estará disponible próximamente.`
            : `Sentence Check 2 for ${bucketName} is coming soon.`}
        </p>
      </div>
    );
  }

  // Completion screen
  if (allCompleted) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-3xl border border-emerald-200 shadow-md text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            {language === "es" ? "¡Sentence Check 2 Completado!" : "Sentence Check 2 Complete!"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === "es"
              ? `Dominaste los 5 pasajes y colocaste todas las parejas de palabras en ${bucketName}.`
              : `You mastered all 5 passages and paired all vocabulary in ${bucketName}.`}
          </p>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-semibold text-emerald-800">
          ✓ 5 / 5 {language === "es" ? "pasajes resueltos correctamente" : "passages solved correctly"}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            type="button"
            onClick={resetAll}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{language === "es" ? "Practicar de nuevo" : "Practice Again"}</span>
          </button>
          {onSelectAnotherMode && (
            <button
              type="button"
              onClick={onSelectAnotherMode}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold text-xs cursor-pointer active:scale-98 transition-all"
            >
              {language === "es" ? "Volver a Tarjetas" : "Back to Flashcards"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Check individual blank accuracy for visual color coding
  const isBlank1Correct =
    currentPair.blank1 &&
    currentPair.blank1.toLowerCase().trim() ===
      currentItem.targetWords[0].toLowerCase().trim();
  const isBlank2Correct =
    currentPair.blank2 &&
    currentPair.blank2.toLowerCase().trim() ===
      currentItem.targetWords[1].toLowerCase().trim();

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {/* Top Exercise Card */}
      <div
        className={`w-full bg-white rounded-3xl border transition-all duration-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[320px] ${
          isCurrentSolved
            ? "border-emerald-300 ring-2 ring-emerald-100"
            : isCurrentWrong
            ? "border-rose-300 ring-2 ring-rose-100"
            : "border-slate-200"
        } ${shakeCurrent ? "animate-shake" : ""}`}
      >
        {/* Card Header: Item Counter & Clue Toggle */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
              {bucketName}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {language === "es" ? "Pasaje" : "Passage"} {currentIndex * 2 + 1}-{currentIndex * 2 + 2} / 10
            </span>
          </div>

          <button
            type="button"
            onClick={toggleHints}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              showHints[currentItem.id]
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === "es" ? "Pistas (2)" : "Hints (2)"}</span>
          </button>
        </div>

        {/* Hint Box (if open) */}
        {showHints[currentItem.id] && (
          <div className="my-2 p-3 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs font-serif italic text-amber-900 leading-snug space-y-1.5 animate-in fade-in duration-200">
            <div>
              <span className="font-bold font-sans not-italic text-amber-700 mr-1">
                (1):
              </span>
              &ldquo;{currentItem.hints[0]}&rdquo;
            </div>
            <div>
              <span className="font-bold font-sans not-italic text-amber-700 mr-1">
                (2):
              </span>
              &ldquo;{currentItem.hints[1]}&rdquo;
            </div>
          </div>
        )}

        {/* Passage Body with 2 Interactive Blanks */}
        <div className="my-4 text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
          <span>{currentItem.part1}</span>

          {/* Blank 1 */}
          {currentPair.blank1 ? (
            <button
              type="button"
              disabled={isCurrentSolved}
              onClick={() => handleClearBlank(1)}
              className={`inline-flex items-center gap-1 mx-1 px-2.5 py-0.5 rounded-xl font-sans font-bold text-xs sm:text-sm align-middle transition-all shadow-2xs ${
                isCurrentSolved
                  ? "bg-emerald-500 text-white cursor-default shadow-sm"
                  : isCurrentWrong && !isBlank1Correct
                  ? "bg-rose-500 text-white cursor-pointer active:scale-95"
                  : "bg-sky-500 text-white cursor-pointer active:scale-95"
              }`}
            >
              <span>{currentPair.blank1}</span>
              {isCurrentSolved ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <X className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveBlank(1)}
              className={`inline-block mx-1 px-2.5 py-0.5 rounded-xl font-sans font-bold text-xs align-middle transition-all cursor-pointer ${
                activeBlank === 1
                  ? "bg-sky-100 text-sky-700 border-2 border-sky-400 ring-2 ring-sky-200 animate-pulse"
                  : "bg-slate-50 text-slate-400 border border-dashed border-slate-300 hover:border-sky-300"
              }`}
            >
              (1) {language === "es" ? "Palabra 1" : "Word 1"}
            </button>
          )}

          <span>{currentItem.part2}</span>

          {/* Blank 2 */}
          {currentPair.blank2 ? (
            <button
              type="button"
              disabled={isCurrentSolved}
              onClick={() => handleClearBlank(2)}
              className={`inline-flex items-center gap-1 mx-1 px-2.5 py-0.5 rounded-xl font-sans font-bold text-xs sm:text-sm align-middle transition-all shadow-2xs ${
                isCurrentSolved
                  ? "bg-emerald-500 text-white cursor-default shadow-sm"
                  : isCurrentWrong && !isBlank2Correct
                  ? "bg-rose-500 text-white cursor-pointer active:scale-95"
                  : "bg-sky-500 text-white cursor-pointer active:scale-95"
              }`}
            >
              <span>{currentPair.blank2}</span>
              {isCurrentSolved ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <X className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveBlank(2)}
              className={`inline-block mx-1 px-2.5 py-0.5 rounded-xl font-sans font-bold text-xs align-middle transition-all cursor-pointer ${
                activeBlank === 2
                  ? "bg-sky-100 text-sky-700 border-2 border-sky-400 ring-2 ring-sky-200 animate-pulse"
                  : "bg-slate-50 text-slate-400 border border-dashed border-slate-300 hover:border-sky-300"
              }`}
            >
              (2) {language === "es" ? "Palabra 2" : "Word 2"}
            </button>
          )}

          <span>{currentItem.part3}</span>
        </div>

        {/* Feedback & Swap Row */}
        <div className="min-h-[44px] flex flex-col justify-center">
          {isCurrentSolved && (
            <div className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-sans flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
              <span>{currentItem.explanation}</span>
            </div>
          )}
          {isCurrentWrong && (
            <div className="w-full p-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-sans flex items-center justify-between gap-2 animate-in fade-in">
              <div className="flex items-center gap-1.5 truncate">
                <X className="w-4 h-4 text-rose-600 shrink-0 stroke-[3]" />
                <span className="truncate">
                  {language === "es" ? "Revisa las palabras elegidas." : "Check chosen words."}
                </span>
              </div>
              {currentPair.blank1 && currentPair.blank2 && (
                <button
                  type="button"
                  onClick={handleSwapWords}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-rose-100/70 border border-rose-300 text-rose-700 font-bold rounded-lg text-[11px] cursor-pointer shrink-0 transition-colors"
                >
                  <ArrowLeftRight className="w-3 h-3" />
                  <span>{language === "es" ? "Intercambiar" : "Swap"}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Card Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={goToPrev}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 5 Passage Dots */}
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const isSolved = status[it.id] === true;
              const isWrong = status[it.id] === false;
              const isCurrent = currentIndex === idx;
              const hasAnswers = answers[it.id]?.blank1 || answers[it.id]?.blank2;

              let dotColor = "bg-slate-200";
              if (isSolved) dotColor = "bg-emerald-500";
              else if (isWrong) dotColor = "bg-rose-400";
              else if (hasAnswers) dotColor = "bg-amber-400";

              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    setActiveBlank(1);
                  }}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${dotColor} ${
                    isCurrent ? "ring-2 ring-sky-500 ring-offset-2 scale-125" : ""
                  }`}
                  title={`${language === "es" ? "Pasaje" : "Passage"} ${idx * 2 + 1}-${idx * 2 + 2}`}
                />
              );
            })}
          </div>

          <button
            type="button"
            disabled={currentIndex === items.length - 1}
            onClick={goToNext}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sticky Interactive Word Bank with Strike-through */}
      <WordBank
        words={allSetWords}
        usedWords={usedWords}
        onSelectWord={handleSelectWord}
        selectedWord={
          activeBlank === 1 ? currentPair.blank1 : currentPair.blank2
        }
        language={language}
        disabled={isCurrentSolved}
      />
    </div>
  );
};
