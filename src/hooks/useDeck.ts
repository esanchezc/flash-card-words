"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { FlashCard } from "@/types/card";
import { parseWordsCSV, exportWordsToCSV } from "@/lib/csvParser";
import {
  getStoredCustomCards,
  saveStoredCustomCards,
  getStoredCustomSynonyms,
  getStoredStarredIds,
  saveStoredStarredIds,
  getStoredActiveBucket,
  saveStoredActiveBucket,
} from "@/lib/storage";
import { registerCustomSynonyms } from "@/data/synonyms";
import { enrichCustomCards } from "@/lib/autoEnrich";

export const GLOBAL_POOL_BUCKET = "__GLOBAL_POOL__";

export type CardMode = "meaning" | "synonyms";

export function useDeck(cardMode: CardMode = "meaning") {
  const [allCards, setAllCards] = useState<FlashCard[]>([]);
  const [starredIds, setStarredIds] = useState<string[]>([]);
  const [activeBucket, setActiveBucketState] = useState<string>("Chapter 1");
  const [meaningQueue, setMeaningQueue] = useState<FlashCard[]>([]);
  const [meaningMastered, setMeaningMastered] = useState<string[]>([]);
  const [synonymsQueue, setSynonymsQueue] = useState<FlashCard[]>([]);
  const [synonymsMastered, setSynonymsMastered] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. Initial Load: Poll public/words.csv and merge with localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/words.csv");
        const csvText = await res.text();
        const baseCards = parseWordsCSV(csvText);

        const rawCustomCards = getStoredCustomCards();
        const savedStarred = getStoredStarredIds();
        const savedBucket = getStoredActiveBucket();
        registerCustomSynonyms(getStoredCustomSynonyms());

        // Remove any custom cards that have now been officially added to words.csv
        const baseWordSet = new Set(
          baseCards.flatMap((c) => {
            const w = c.word.trim().toLowerCase();
            return [w, w.replace(/ied$/, "y"), w.replace(/ed$/, "")];
          })
        );
        const customCards = rawCustomCards.filter((c) => {
          const w = c.word.trim().toLowerCase().split(/\s+/)[0];
          return !baseWordSet.has(w) && !baseWordSet.has(w.replace(/ied$/, "y"));
        });
        if (customCards.length !== rawCustomCards.length) {
          saveStoredCustomCards(customCards);
        }

        const combined = [...baseCards, ...customCards].map((c) => ({
          ...c,
          starred: savedStarred.includes(c.id),
        }));

        setAllCards(combined);
        setStarredIds(savedStarred);

        const availableBuckets = Array.from(new Set(combined.map((c) => c.bucket)));
        let initialBucket = savedBucket;
        if (savedBucket === "Set 1" && !availableBuckets.includes("Set 1")) {
          initialBucket = availableBuckets.includes("Chapter 4") ? "Chapter 4" : "Chapter 1";
        } else if (savedBucket === "Set 2" && !availableBuckets.includes("Set 2")) {
          initialBucket = availableBuckets.includes("Chapter 5") ? "Chapter 5" : "Chapter 1";
        } else if (
          (savedBucket === "Chapter 6" || savedBucket === "Chapter 7") &&
          !availableBuckets.includes(savedBucket)
        ) {
          initialBucket = availableBuckets.includes("Chapter 20") ? "Chapter 20" : "Chapter 1";
        }
        if (!initialBucket || (!availableBuckets.includes(initialBucket) && initialBucket !== GLOBAL_POOL_BUCKET)) {
          initialBucket = availableBuckets[0] || "Chapter 1";
        }

        setActiveBucketState(initialBucket);
        saveStoredActiveBucket(initialBucket);

        // Background auto-enrich any custom cards missing definitions, examples, or synonyms
        if (customCards.length > 0) {
          enrichCustomCards(customCards).then((enrichedCustom) => {
            const enrichedMap = new Map(enrichedCustom.map((c) => [c.id, c]));
            const applyEnriched = (list: FlashCard[]) =>
              list.map((c) => {
                const updated = enrichedMap.get(c.id);
                return updated ? { ...updated, starred: c.starred } : c;
              });
            setAllCards(applyEnriched);
            setMeaningQueue(applyEnriched);
            setSynonymsQueue(applyEnriched);
          });
        }
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

  // Reset session queues whenever active bucket changes or initial load completes
  useEffect(() => {
    if (bucketCards.length > 0) {
      setMeaningQueue([...bucketCards]);
      setMeaningMastered([]);
      setSynonymsQueue([...bucketCards]);
      setSynonymsMastered([]);
      setIsFlipped(false);
    } else {
      setMeaningQueue([]);
      setMeaningMastered([]);
      setSynonymsQueue([]);
      setSynonymsMastered([]);
    }
  }, [activeBucket, bucketCards.length]);

  // Reset flip whenever mode changes
  useEffect(() => {
    setIsFlipped(false);
  }, [cardMode]);

  const setActiveBucket = useCallback((bucket: string) => {
    setActiveBucketState(bucket);
    saveStoredActiveBucket(bucket);
    setIsFlipped(false);
  }, []);

  // Active queue and mastered based on current cardMode
  const queue = cardMode === "synonyms" ? synonymsQueue : meaningQueue;
  const masteredIds = cardMode === "synonyms" ? synonymsMastered : meaningMastered;

  const currentCard = queue[0] || null;
  const isComplete = queue.length === 0 && bucketCards.length > 0;

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Got It: mark card mastered, remove from active queue
  const markGotIt = useCallback(() => {
    if (!currentCard) return;

    if (cardMode === "synonyms") {
      setSynonymsMastered((prev) => [...prev, currentCard.id]);
      setSynonymsQueue((prevQueue) => prevQueue.slice(1));
    } else {
      setMeaningMastered((prev) => [...prev, currentCard.id]);
      setMeaningQueue((prevQueue) => prevQueue.slice(1));
    }
    setIsFlipped(false);
  }, [currentCard, cardMode]);

  // Needs Practice: move current card to back of active queue
  const markNeedsPractice = useCallback(() => {
    if (!currentCard) return;

    const rotate = (prevQueue: FlashCard[]) => {
      if (prevQueue.length <= 1) return prevQueue;
      const [first, ...rest] = prevQueue;
      return [...rest, first];
    };

    if (cardMode === "synonyms") {
      setSynonymsQueue(rotate);
    } else {
      setMeaningQueue(rotate);
    }
    setIsFlipped(false);
  }, [currentCard, cardMode]);

  // Toggle Star / Favorite
  const toggleStar = useCallback((id: string) => {
    setStarredIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveStoredStarredIds(next);
      return next;
    });

    const updateStar = (list: FlashCard[]) =>
      list.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c));

    setAllCards(updateStar);
    setMeaningQueue(updateStar);
    setSynonymsQueue(updateStar);
  }, []);

  // Restart current session for active mode
  const restartSession = useCallback(() => {
    if (cardMode === "synonyms") {
      setSynonymsQueue([...bucketCards]);
      setSynonymsMastered([]);
    } else {
      setMeaningQueue([...bucketCards]);
      setMeaningMastered([]);
    }
    setIsFlipped(false);
  }, [bucketCards, cardMode]);

  // Shuffle queue for active mode
  const shuffleQueue = useCallback(() => {
    const shuffle = (prev: FlashCard[]) => [...prev].sort(() => Math.random() - 0.5);
    if (cardMode === "synonyms") {
      setSynonymsQueue(shuffle);
    } else {
      setMeaningQueue(shuffle);
    }
    setIsFlipped(false);
  }, [cardMode]);

  // Filter queue to only Starred words in this bucket for active mode
  const practiceStarredOnly = useCallback(() => {
    const starredInBucket = bucketCards.filter((c) => starredIds.includes(c.id));
    if (starredInBucket.length > 0) {
      if (cardMode === "synonyms") {
        setSynonymsQueue([...starredInBucket]);
        setSynonymsMastered([]);
      } else {
        setMeaningQueue([...starredInBucket]);
        setMeaningMastered([]);
      }
      setIsFlipped(false);
    }
  }, [bucketCards, starredIds, cardMode]);

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

      // Automatically enrich newly added custom words (definitions, examples, synonyms)
      enrichCustomCards(updatedCustom).then((enrichedCustom) => {
        const enrichedMap = new Map(enrichedCustom.map((c) => [c.id, c]));
        const applyEnriched = (list: FlashCard[]) =>
          list.map((c) => {
            const updated = enrichedMap.get(c.id);
            return updated ? { ...updated, starred: c.starred } : c;
          });
        setAllCards(applyEnriched);
        setMeaningQueue(applyEnriched);
        setSynonymsQueue(applyEnriched);
      });
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
