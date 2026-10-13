"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FlashCard as FlashCardType } from "@/types/card";
import { Star, RotateCw, Eye, EyeOff, Check, X, ArrowRight, AlertCircle } from "lucide-react";
import { Language, translations } from "@/lib/i18n";
import { getRandomDistractor } from "@/data/distractors";
import { getSynonymQuizOptions, getSynonymEntry } from "@/data/synonyms";

interface FlashCardProps {
  card: FlashCardType;
  quizType?: "meaning" | "synonyms";
  isFlipped: boolean;
  onFlip: () => void;
  onToggleStar: (id: string) => void;
  currentIndex: number;
  totalInQueue: number;
  language: Language;
  onCorrect: () => void;
  onIncorrect: () => void;
  otherTranslations?: string[];
}

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export const FlashCard: React.FC<FlashCardProps> = ({
  card,
  quizType = "meaning",
  isFlipped,
  onFlip,
  onToggleStar,
  currentIndex,
  totalInQueue,
  language,
  onCorrect,
  onIncorrect,
  otherTranslations = [],
}) => {
  const [showClue, setShowClue] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrectChoice, setIsCorrectChoice] = useState<boolean | null>(null);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const t = translations[language] || translations.en;

  // Retrieve curated English synonym entry if available
  const synonymEntry = useMemo(() => getSynonymEntry(card.word), [card.word]);

  // Generate 2 quiz options (1 correct, 1 distractor) stably per card
  const quizOptions = useMemo<QuizOption[]>(() => {
    if (quizType === "synonyms") {
      return getSynonymQuizOptions(card.word, card.definition);
    }

    // Split synonyms if separated by comma, semicolon, or slash
    const synonyms = card.translation
      .split(/[,;/]/)
      .map((s) => s.trim())
      .filter(Boolean);

    // Pick 1 single synonym randomly to avoid dead giveaways and visual imbalance
    const correctText =
      synonyms.length > 1
        ? synonyms[Math.floor(Math.random() * synonyms.length)]
        : card.translation.trim();

    const excludeList = [
      ...synonyms,
      card.translation,
      card.word,
      ...(card.notes ? [card.notes] : []),
    ];
    
    // Pick distractor from blended pool (curated list + actual deck translations)
    const distractorText = getRandomDistractor(
      excludeList,
      otherTranslations
    );

    const options: QuizOption[] = [
      { text: correctText, isCorrect: true },
      { text: distractorText, isCorrect: false },
    ];

    // Randomize 50/50 order
    return Math.random() > 0.5 ? options : [options[1], options[0]];
  }, [quizType, card.id, card.word, card.definition, card.translation, card.notes, otherTranslations]);

  // Reset state when moving to a new card
  useEffect(() => {
    setShowClue(false);
    setSelectedIdx(null);
    setIsAnswered(false);
    setIsCorrectChoice(null);
    setIsExiting(false);
  }, [card.id]);

  const handleClueClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowClue((prev) => !prev);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStar(card.id);
  };

  const handleSelectOption = (idx: number, opt: QuizOption) => {
    if (isAnswered || isFlipped) return;

    setSelectedIdx(idx);
    setIsAnswered(true);

    if (opt.isCorrect) {
      setIsCorrectChoice(true);
      // Brief celebration pause, then advance
      setTimeout(() => {
        setIsExiting(true);
      }, 350);
      setTimeout(() => {
        onCorrect();
      }, 550);
    } else {
      setIsCorrectChoice(false);
      // Wait 600ms so student sees the red/green feedback, then auto-flip to definition
      setTimeout(() => {
        onFlip();
      }, 650);
    }
  };

  // Called when student is on the back of the card and taps "Continue"
  const handleContinueAfterMistake = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFlip(); // flip back
    onIncorrect(); // moves card to end of queue to practice again
  };

  return (
    <div
      className={`w-full max-w-sm sm:max-w-md h-[460px] sm:h-[480px] perspective-1000 select-none mx-auto my-2 transition-all duration-300 ${
        isExiting ? "scale-95 opacity-0 translate-y-3" : "animate-card-enter"
      }`}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-500 rounded-3xl ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* ================= FRONT SIDE (Word + Clue Peek + 2 Quiz Choices) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between card-paper-shadow">
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
                className="p-1.5 rounded-full hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer"
                title={card.starred ? t.removeStar : t.starWord}
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

          {/* Center: Main Word (Bold marker aesthetic) */}
          <div className="my-auto py-2 flex flex-col items-center justify-center text-center px-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-600 tracking-tight capitalize">
              {card.word}
            </h1>

            {/* Optional Clue button (Peeks English definition if needed before answering) */}
            <div className="mt-3 w-full max-w-[280px]">
              <button
                type="button"
                onClick={handleClueClick}
                className={`w-full py-1.5 px-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  showClue
                    ? "bg-amber-50 border-amber-200 text-amber-900 shadow-2xs"
                    : "bg-slate-50 border-dashed border-slate-200 text-slate-500 hover:bg-slate-100/70"
                }`}
              >
                {showClue ? (
                  <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                )}
                <span>{showClue ? t.tapToHide : t.clue}</span>
              </button>

              {showClue && (
                <div className="mt-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs font-serif text-slate-800 leading-snug italic text-left animate-in fade-in duration-200">
                  &ldquo;{card.definition}&rdquo;
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Quiz Choices (2 Options Inside Card) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
              {quizType === "synonyms" ? t.chooseSynonym : t.chooseMeaning}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {quizOptions.map((opt, idx) => {
                const isSelected = selectedIdx === idx;
                const isCorrect = opt.isCorrect;

                let btnStyles =
                  "bg-white border-2 border-slate-200 text-slate-800 hover:border-sky-300 hover:bg-sky-50/30 active:scale-98";

                if (isAnswered) {
                  if (isSelected && isCorrect) {
                    btnStyles =
                      "bg-emerald-500 border-2 border-emerald-600 text-white font-bold shadow-md animate-success-pulse";
                  } else if (isSelected && !isCorrect) {
                    btnStyles =
                      "bg-rose-500 border-2 border-rose-600 text-white font-bold shadow-md animate-shake";
                  } else if (!isSelected && isCorrect) {
                    // Reveal correct answer when wrong was chosen
                    btnStyles =
                      "bg-emerald-50 border-2 border-emerald-400 text-emerald-800 font-bold";
                  } else {
                    btnStyles =
                      "bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx, opt)}
                    className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between shadow-2xs cursor-pointer ${btnStyles}`}
                  >
                    <span className="truncate pr-2 capitalize">{opt.text}</span>
                    {isAnswered && (
                      <span className="shrink-0">
                        {isCorrect && <Check className="w-4 h-4 stroke-[3]" />}
                        {isSelected && !isCorrect && (
                          <X className="w-4 h-4 stroke-[3]" />
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE (Auto-flipped on mistake: Translation, Definition & Example) ================= */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between card-paper-shadow">
          {/* Top Bar: Mistake Banner / Translation Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t.reviewAnswer}</span>
            </div>

            <button
              type="button"
              onClick={handleStarClick}
              className="p-1.5 rounded-full hover:bg-slate-100 active:scale-90 transition-transform cursor-pointer"
              title={card.starred ? t.removeStar : t.starWord}
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

          {/* Center: Translation + Notes + English Definition & Example */}
          <div className="flex-1 flex flex-col justify-center my-2 overflow-y-auto pr-1 space-y-2.5">
            {quizType === "synonyms" ? (
              /* When in Synonyms mode, highlight the English Synonym block */
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-2xl">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
                  {t.synonym} ({card.word})
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 capitalize">
                  {synonymEntry?.primary || card.word}
                </h2>
                {synonymEntry?.alternatives && synonymEntry.alternatives.length > 0 && (
                  <p className="text-xs text-amber-800 font-medium mt-1">
                    {t.synonyms}: {synonymEntry.alternatives.join(", ")}
                  </p>
                )}
                <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <span className="text-amber-800/80 font-medium">{t.translation}:</span>
                  <span className="font-bold text-amber-950 capitalize">{card.translation}</span>
                </div>
              </div>
            ) : (
              /* When in Meaning mode, highlight the Spanish Translation */
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  {t.translation}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 capitalize">
                  {card.translation}
                </h2>
                {card.notes && (
                  <p className="text-xs text-amber-700 font-medium mt-0.5">
                    * {card.notes}
                  </p>
                )}
                {synonymEntry?.primary && (
                  <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-100 rounded-md text-[11px] font-medium">
                    <span className="font-bold">{t.synonym}:</span>
                    <span className="capitalize">{synonymEntry.primary}</span>
                  </div>
                )}
              </div>
            )}

            {/* Definition Box */}
            <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {t.definition} ({card.word})
              </span>
              <p className="text-xs sm:text-sm font-serif text-slate-700 leading-snug">
                &ldquo;{card.definition}&rdquo;
              </p>
            </div>

            {/* Example sentence */}
            {card.example && (
              <div className="p-2.5 bg-sky-50/60 border-l-4 border-sky-400 rounded-r-xl">
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block mb-0.5">
                  {t.example}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 italic">
                  {card.example}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Action: Continue button to advance */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleContinueAfterMistake}
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{t.continueBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
