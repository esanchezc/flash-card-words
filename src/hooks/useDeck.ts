"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { FlashCard } from "@/types/card";
import { parseWordsCSV, exportWordsToCSV } from "@/lib/csvParser";
import {
  getStoredCustomCards,
  saveStoredCustomCards,
  getStoredStarredIds,
  saveStoredStarredIds,
  getStoredActiveBucket,
  saveStoredActiveBucket,
} from "@/lib/storage";

export const GLOBAL_POOL_BUCKET = "__GLOBAL_POOL__";

export function useDeck() {
  const [allCards, setAllCards] = useState<FlashCard[]>([]);
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const [activeBucket, setActiveBucketState] = useState<string>("Set 1");
  const [queue, setQueue] = useState<FlashCard[]>([]);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. Initial Load: Poll public/words.csv and merge with localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/words.csv");
        const csvText = await res.text();
        const baseCards = parseWordsCSV(csvText);

        const customCards = getStoredCustomCards();
        const savedStarred = getStoredStarredIds();
        const savedBucket = getStoredActiveBucket();

        const combined = [...baseCards, ...customCards].map((c) => ({
          ...c,
          starred: savedStarred.includes(c.id),
        }));

        setAllCards(combined);
        setStarredIds(savedStarred);

        const availableBuckets = Array.from(new Set(combined.map((c) => c.bucket)));
        const initialBucket =
          savedBucket && (availableBuckets.includes(savedBucket) || savedBucket === GLOBAL_POOL_BUCKET)
            ? savedBucket
            : availableBuckets[0] || "Set 1";

        setActiveBucketState(initialBucket);
      } catch (err) {
        console.error("Error loading words:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Compute unique buckets
  const buckets = useMemo(() => {
    return Array.from(new Set(allCards.map((c) => c.bucket)));
  }, [allCards]);

  // Cards filtered by active bucket
  const bucketCards = useMemo(() => {
    if (activeBucket === GLOBAL_POOL_BUCKET) {
      return allCards;
    }
    return allCards.filter((c) => c.bucket === activeBucket);
  }, [allCards, activeBucket]);

  // Reset session queue whenever active bucket changes or initial load completes
  useEffect(() => {
    if (bucketCards.length > 0) {
      setQueue([...bucketCards]);
      setMasteredIds([]);
      setIsFlipped(false);
    } else {
      setQueue([]);
    }
  }, [activeBucket, bucketCards.length]);

  const setActiveBucket = useCallback((bucket: string) => {
    setActiveBucketState(bucket);
    saveStoredActiveBucket(bucket);
    setIsFlipped(false);
  }, []);

  const currentCard = queue[0] || null;
  const isComplete = queue.length === 0 && bucketCards.length > 0;

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Got It: mark card mastered, remove from queue
  const markGotIt = useCallback(() => {
    if (!currentCard) return;

    setMasteredIds((prev) => [...prev, currentCard.id]);
    setQueue((prevQueue) => prevQueue.slice(1));
    setIsFlipped(false);
  }, [currentCard]);

  // Needs Practice: move current card to back of queue
  const markNeedsPractice = useCallback(() => {
    if (!currentCard) return;

    setQueue((prevQueue) => {
      if (prevQueue.length <= 1) return prevQueue;
      const [first, ...rest] = prevQueue;
      return [...rest, first];
    });
    setIsFlipped(false);
  }, [currentCard]);

  // Toggle Star / Favorite
  const toggleStar = useCallback((id: string) => {
    setStarredIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveStoredStarredIds(next);
      return next;
    });

    setAllCards((prevCards) =>
      prevCards.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c))
    );

    setQueue((prevQueue) =>
      prevQueue.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c))
    );
  }, []);

  // Restart current session
  const restartSession = useCallback(() => {
    setQueue([...bucketCards]);
    setMasteredIds([]);
    setIsFlipped(false);
  }, [bucketCards]);

  // Shuffle queue
  const shuffleQueue = useCallback(() => {
    setQueue((prev) => [...prev].sort(() => Math.random() - 0.5));
    setIsFlipped(false);
  }, []);

  // Filter queue to only Starred words in this bucket
  const practiceStarredOnly = useCallback(() => {
    const starredInBucket = bucketCards.filter((c) => starredIds.includes(c.id));
    if (starredInBucket.length > 0) {
      setQueue([...starredInBucket]);
      setMasteredIds([]);
      setIsFlipped(false);
    }
  }, [bucketCards, starredIds]);

  // Add a new bucket with cards
  const addNewBucket = useCallback(
    (bucketName: string, newCardsData: Omit<FlashCard, "id" | "bucket">[]) => {
      const trimmedBucket = bucketName.trim();
      if (!trimmedBucket) return;

      const createdCards: FlashCard[] = newCardsData.map((data, idx) => ({
        ...data,
        id: `${trimmedBucket}-${data.word}-${Date.now()}-${idx}`
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "-"),
        bucket: trimmedBucket,
        mastered: false,
        starred: false,
        isCustom: true,
      }));

      const existingCustom = getStoredCustomCards();
      const updatedCustom = [...existingCustom, ...createdCards];
      saveStoredCustomCards(updatedCustom);

      setAllCards((prev) => [...prev, ...createdCards]);
      setActiveBucket(trimmedBucket);
    },
    [setActiveBucket]
  );

  // Export current full list to CSV
  const exportCSV = useCallback(() => {
    return exportWordsToCSV(allCards);
  }, [allCards]);

  const totalCardsInBucket = bucketCards.length;
  const masteredCount = masteredIds.length;
  const remainingCount = queue.length;
  const progressPercent =
    totalCardsInBucket > 0 ? Math.round((masteredCount / totalCardsInBucket) * 100) : 0;

  return {
    allCards,
    buckets,
    activeBucket,
    setActiveBucket,
    currentCard,
    queue,
    isFlipped,
    setIsFlipped,
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
    remainingCount,
    progressPercent,
    addNewBucket,
    exportCSV,
    starredCountInBucket: bucketCards.filter((c) => starredIds.includes(c.id)).length,
  };
}
