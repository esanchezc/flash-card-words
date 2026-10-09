"use client";

import React, { useState, useEffect } from "react";
import { useDeck } from "@/hooks/useDeck";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { FlashCard } from "@/components/FlashCard";
import { NewBucketModal } from "@/components/NewBucketModal";
import { SessionComplete } from "@/components/SessionComplete";
import { SentenceCheck1 } from "@/components/SentenceCheck1";
import { SentenceCheck2 } from "@/components/SentenceCheck2";
import { SENTENCE_CHECKS_1, SENTENCE_CHECKS_2 } from "@/data/sentenceChecks";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { Language, translations } from "@/lib/i18n";
import { getStoredLanguage, saveStoredLanguage } from "@/lib/storage";

type ActiveMode = "flashcards" | "check1" | "check2";

export default function Home() {
  const {
    allCards,
    buckets,
    activeBucket,
    setActiveBucket,
    currentCard,
    queue,
    isFlipped,
    toggleFlip,
    markGotIt,
    markNeedsPractice,
    toggleStar,
    restartSession,
    shuffleQueue,
    practiceStarredOnly,
    isComplete,
    isLoading,
    totalCardsInBucket,
    masteredCount,
    addNewBucket,
    exportCSV,
    starredCountInBucket,
  } = useDeck();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [activeMode, setActiveMode] = useState<ActiveMode>("flashcards");

  // Load language preference from storage on mount
  useEffect(() => {
    const saved = getStoredLanguage();
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const handleToggleLanguage = () => {
    setLanguage((prev) => {
      const next: Language = prev === "en" ? "es" : "en";
      saveStoredLanguage(next);
      return next;
    });
  };

  const t = translations[language];

  // Trigger CSV file download
  const handleExportCSV = () => {
    const csvContent = exportCSV();
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `words-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Find cards belonging to current bucket for completion screen
  const currentBucketCards =
    activeBucket === "__GLOBAL_POOL__"
      ? allCards
      : allCards.filter((c) => c.bucket === activeBucket);

  const activeSetKey =
    activeBucket === "__GLOBAL_POOL__"
      ? "Chapter 1"
      : activeBucket;

  const check1Items = SENTENCE_CHECKS_1[activeSetKey] || [];
  const check2Items = SENTENCE_CHECKS_2[activeSetKey] || [];

  const setWords = currentBucketCards.map((c) => c.word);
  const displayWords =
    setWords.length > 0 ? setWords : check1Items.map((it) => it.targetWord);

  const currentIndex =
    totalCardsInBucket > 0 ? Math.min(masteredCount + 1, totalCardsInBucket) : 0;

  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto flex flex-col justify-between overflow-hidden bg-slate-50 text-slate-900 select-none pb-[env(safe-area-inset-bottom,0.5rem)]">
      {/* Top Section */}
      <div className="shrink-0 pt-[env(safe-area-inset-top,0.5rem)]">
        <Header
          buckets={buckets}
          activeBucket={activeBucket}
          onSelectBucket={setActiveBucket}
          onOpenNewBucket={() => setIsModalOpen(true)}
          onExportCSV={handleExportCSV}
          onShuffle={shuffleQueue}
          totalCardsInBucket={totalCardsInBucket}
          language={language}
          onToggleLanguage={handleToggleLanguage}
        />

        {/* Mode Switcher Pills */}
        <div className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-slate-100/90 border-b border-slate-200/70">
          <button
            type="button"
            onClick={() => setActiveMode("flashcards")}
            className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeMode === "flashcards"
                ? "bg-white text-sky-700 shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>🎴</span>
            <span className="truncate">{t.modeFlashcards}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("check1")}
            className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeMode === "check1"
                ? "bg-white text-sky-700 shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>📝</span>
            <span className="truncate">{t.modeSentenceCheck1}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("check2")}
            className={`flex-1 py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeMode === "check2"
                ? "bg-white text-sky-700 shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>🔗</span>
            <span className="truncate">{t.modeSentenceCheck2}</span>
          </button>
        </div>

        {/* Flashcards Progress Bar (only visible in flashcards mode) */}
        {activeMode === "flashcards" &&
          !isLoading &&
          !isComplete &&
          totalCardsInBucket > 0 && (
            <ProgressBar
              currentCount={currentIndex}
              totalCards={totalCardsInBucket}
              masteredCount={masteredCount}
              bucketName={activeBucket}
              language={language}
            />
          )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start items-center px-4 py-2 overflow-y-auto">
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            <span className="text-xs font-semibold">{t.loadingCards}</span>
          </div>
        ) : activeMode === "check1" ? (
          <div className="w-full my-auto py-2">
            <SentenceCheck1
              items={check1Items}
              allSetWords={displayWords}
              bucketName={activeSetKey}
              language={language}
              onSelectAnotherMode={() => setActiveMode("check2")}
            />
          </div>
        ) : activeMode === "check2" ? (
          <div className="w-full my-auto py-2">
            <SentenceCheck2
              items={check2Items}
              allSetWords={displayWords}
              bucketName={activeSetKey}
              language={language}
              onSelectAnotherMode={() => setActiveMode("flashcards")}
            />
          </div>
        ) : isComplete ? (
          <SessionComplete
            bucketName={activeBucket}
            cards={currentBucketCards}
            onRestart={restartSession}
            onPracticeStarred={practiceStarredOnly}
            onSelectAnotherBucket={() => setIsModalOpen(true)}
            starredCount={starredCountInBucket}
            language={language}
          />
        ) : currentCard ? (
          <div className="w-full my-auto flex flex-col items-center justify-center">
            <FlashCard
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={toggleFlip}
              onToggleStar={toggleStar}
              currentIndex={currentIndex}
              totalInQueue={queue.length}
              language={language}
              onCorrect={markGotIt}
              onIncorrect={markNeedsPractice}
              otherTranslations={allCards.map((c) => c.translation)}
            />
          </div>
        ) : (
          <div className="my-auto text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-xs">
            <Sparkles className="w-8 h-8 text-sky-500 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-sm mb-1">{t.noWordsInBucket}</h3>
            <p className="text-xs text-slate-500 mb-4">{t.noWordsSubtitle}</p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.addWords}</span>
            </button>
          </div>
        )}
      </main>

      {/* New Bucket Modal */}
      <NewBucketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateBucket={addNewBucket}
        existingBuckets={buckets}
        language={language}
      />
    </div>
  );
}
