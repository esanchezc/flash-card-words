"use client";

import React, { useState } from "react";
import { useDeck } from "@/hooks/useDeck";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { FlashCard } from "@/components/FlashCard";
import { DeckControls } from "@/components/DeckControls";
import { NewBucketModal } from "@/components/NewBucketModal";
import { SessionComplete } from "@/components/SessionComplete";
import { Loader2, Plus, Sparkles } from "lucide-react";

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

  const currentIndex =
    totalCardsInBucket > 0 ? Math.min(masteredCount + 1, totalCardsInBucket) : 0;

  return (
    <div className="h-[100dvh] w-full max-w-md mx-auto flex flex-col justify-between overflow-hidden bg-slate-50 text-slate-900 select-none">
      {/* Top Header */}
      <div className="shrink-0 pt-[env(safe-area-inset-top,0.5rem)]">
        <Header
          buckets={buckets}
          activeBucket={activeBucket}
          onSelectBucket={setActiveBucket}
          onOpenNewBucket={() => setIsModalOpen(true)}
          onExportCSV={handleExportCSV}
          onShuffle={shuffleQueue}
          totalCardsInBucket={totalCardsInBucket}
        />

        {/* Progress Bar (hidden if loading or session complete) */}
        {!isLoading && !isComplete && totalCardsInBucket > 0 && (
          <ProgressBar
            currentCount={currentIndex}
            totalCards={totalCardsInBucket}
            masteredCount={masteredCount}
            bucketName={activeBucket}
          />
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
            <span className="text-xs font-semibold">Loading vocabulary cards...</span>
          </div>
        ) : isComplete ? (
          <SessionComplete
            bucketName={activeBucket}
            cards={currentBucketCards}
            onRestart={restartSession}
            onPracticeStarred={practiceStarredOnly}
            onSelectAnotherBucket={() => setIsModalOpen(true)}
            starredCount={starredCountInBucket}
          />
        ) : currentCard ? (
          <FlashCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={toggleFlip}
            onToggleStar={toggleStar}
            currentIndex={currentIndex}
            totalInQueue={queue.length}
          />
        ) : (
          <div className="text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xs">
            <Sparkles className="w-8 h-8 text-sky-500 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-sm mb-1">No words in this bucket</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add words or create a new 10-word bucket to start practicing.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold"
            >
              <Plus className="w-4 h-4" />
              <span>Add Words</span>
            </button>
          </div>
        )}
      </main>

      {/* Bottom Thumb Controls (hidden on complete or empty) */}
      <div className="shrink-0 pb-[env(safe-area-inset-bottom,0.75rem)]">
        {!isLoading && !isComplete && currentCard && (
          <DeckControls
            onNeedsPractice={markNeedsPractice}
            onGotIt={markGotIt}
            onFlip={toggleFlip}
          />
        )}
      </div>

      {/* New Bucket Modal */}
      <NewBucketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateBucket={addNewBucket}
        existingBuckets={buckets}
      />
    </div>
  );
}
