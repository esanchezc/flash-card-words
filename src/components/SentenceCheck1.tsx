"use client";

import React, { useState, useMemo } from "react";
import { SentenceCheck1Item } from "@/data/sentenceChecks";
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
} from "lucide-react";
import confetti from "canvas-confetti";
import { Language } from "@/lib/i18n";

interface SentenceCheck1Props {
  items: SentenceCheck1Item[];
  allSetWords: string[];
  bucketName: string;
  language: Language;
  onSelectAnotherMode?: () => void;
}

export const SentenceCheck1: React.FC<SentenceCheck1Props> = ({
  items,
  allSetWords,
  bucketName,
  language,
  onSelectAnotherMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Track placed word per item id: { "set2-sc1-1": "euphemism" }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // Track correctness per item id: { "set2-sc1-1": true }
  const [status, setStatus] = useState<Record<string, boolean>>({});
  // Track whether hint is revealed per item id
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});
  const [shakeCurrent, setShakeCurrent] = useState<boolean>(false);

  const currentItem = items[currentIndex];
  const currentAnswer = currentItem ? answers[currentItem.id] : null;
  const isCurrentSolved = currentItem ? status[currentItem.id] === true : false;
  const isCurrentWrong = currentItem && status[currentItem.id] === false;

  // Words that have been correctly placed across all items
  const usedWords = useMemo(() => {
    return Object.entries(answers)
      .filter(([id, word]) => status[id] === true && word)
      .map(([, word]) => word);
  }, [answers, status]);

  const solvedCount = useMemo(() => {
    return Object.values(status).filter(Boolean).length;
  }, [status]);

  const allCompleted = items.length > 0 && solvedCount === items.length;

  const handleSelectWord = (word: string) => {
    if (!currentItem || isCurrentSolved) return;

    // Place word into current blank
    setAnswers((prev) => ({ ...prev, [currentItem.id]: word }));
    // Clear previous wrong status when new word is chosen
    setStatus((prev) => {
      const next = { ...prev };
      delete next[currentItem.id];
      return next;
    });

    // Check automatically on tap
    const isCorrect = word.toLowerCase().trim() === currentItem.targetWord.toLowerCase().trim();

    if (isCorrect) {
      setStatus((prev) => ({ ...prev, [currentItem.id]: true }));
      // Check if this was the last one
      if (solvedCount + 1 === items.length) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      setStatus((prev) => ({ ...prev, [currentItem.id]: false }));
      setShakeCurrent(true);
      setTimeout(() => setShakeCurrent(false), 500);
    }
  };

  const handleRemoveWord = () => {
    if (!currentItem || isCurrentSolved) return;
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentItem.id];
      return next;
    });
    setStatus((prev) => {
      const next = { ...prev };
      delete next[currentItem.id];
      return next;
    });
  };

  const toggleHint = () => {
    if (!currentItem) return;
    setShowHint((prev) => ({
      ...prev,
      [currentItem.id]: !prev[currentItem.id],
    }));
  };

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetAll = () => {
    setAnswers({});
    setStatus({});
    setShowHint({});
    setCurrentIndex(0);
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
            ? `Sentence Check 1 para ${bucketName} estará disponible próximamente.`
            : `Sentence Check 1 for ${bucketName} is coming soon.`}
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
            {language === "es" ? "¡Sentence Check 1 Completado!" : "Sentence Check 1 Complete!"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === "es"
              ? `Completaste con éxito las 10 oraciones de ${bucketName}.`
              : `You successfully completed all 10 sentences for ${bucketName}.`}
          </p>
        </div>

        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-semibold text-emerald-800">
          ✓ 10 / 10 {language === "es" ? "palabras colocadas correctamente" : "words placed correctly"}
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
              {language === "es" ? "Ir a Sentence Check 2" : "Go to Sentence Check 2"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {/* Top Exercise Card */}
      <div
        className={`w-full bg-white rounded-3xl border transition-all duration-200 p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[300px] ${
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
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-100 text-sky-700">
              {bucketName}
            </span>
            <span className="text-xs font-bold text-slate-500">
              {language === "es" ? "Oración" : "Sentence"} {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            type="button"
            onClick={toggleHint}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              showHint[currentItem.id]
                ? "bg-amber-100 text-amber-800 border border-amber-300"
                : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === "es" ? "Pista" : "Hint"}</span>
          </button>
        </div>

        {/* Hint Box (if open) */}
        {showHint[currentItem.id] && (
          <div className="my-2 p-3 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs font-serif italic text-amber-900 leading-snug animate-in fade-in duration-200">
            &ldquo;{currentItem.hint}&rdquo;
          </div>
        )}

        {/* Sentence Body with Interactive Blank */}
        <div className="my-4 text-sm sm:text-base text-slate-800 leading-relaxed font-serif">
          <span>{currentItem.sentenceBefore}</span>

          {/* The Blank */}
          {currentAnswer ? (
            <button
              type="button"
              disabled={isCurrentSolved}
              onClick={handleRemoveWord}
              title={isCurrentSolved ? undefined : language === "es" ? "Toca para quitar" : "Tap to remove"}
              className={`inline-flex items-center gap-1.5 mx-1.5 px-3 py-1 rounded-xl font-sans font-bold text-xs sm:text-sm align-middle transition-all shadow-2xs ${
                isCurrentSolved
                  ? "bg-emerald-500 text-white cursor-default shadow-sm"
                  : isCurrentWrong
                  ? "bg-rose-500 text-white cursor-pointer active:scale-95"
                  : "bg-sky-500 text-white cursor-pointer active:scale-95"
              }`}
            >
              <span>{currentAnswer}</span>
              {isCurrentSolved ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <X className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <span className="inline-block mx-1.5 px-3 py-1 rounded-xl font-sans font-bold text-xs text-sky-600 bg-sky-50 border-2 border-dashed border-sky-300 align-middle animate-pulse">
              {language === "es" ? "[ Elige palabra abajo ]" : "[ Pick word below ]"}
            </span>
          )}

          <span>{currentItem.sentenceAfter}</span>
        </div>

        {/* Feedback Message */}
        <div className="min-h-[42px] flex items-center justify-center">
          {isCurrentSolved && (
            <div className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-sans flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
              <span>{currentItem.explanation}</span>
            </div>
          )}
          {isCurrentWrong && (
            <div className="w-full p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-sans flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600 shrink-0 stroke-[3]" />
                <span>
                  {language === "es"
                    ? "Incorrecto. Intenta con otra palabra o revisa la pista."
                    : "Not quite. Try another word or tap the hint."}
                </span>
              </div>
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

          {/* 10 Question Dots */}
          <div className="flex items-center gap-1.5">
            {items.map((it, idx) => {
              const isSolved = status[it.id] === true;
              const isWrong = status[it.id] === false;
              const isCurrent = currentIndex === idx;

              let dotColor = "bg-slate-200";
              if (isSolved) dotColor = "bg-emerald-500";
              else if (isWrong) dotColor = "bg-rose-400";
              else if (answers[it.id]) dotColor = "bg-sky-400";

              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${dotColor} ${
                    isCurrent ? "ring-2 ring-sky-500 ring-offset-2 scale-125" : ""
                  }`}
                  title={`${language === "es" ? "Oración" : "Sentence"} ${idx + 1}`}
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
        selectedWord={currentAnswer}
        language={language}
        disabled={isCurrentSolved}
      />
    </div>
  );
};
