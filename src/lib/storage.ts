import { FlashCard } from "@/types/card";

const STORAGE_KEYS = {
  CUSTOM_CARDS: "flashcards_custom_cards",
  STARRED_IDS: "flashcards_starred_ids",
  ACTIVE_BUCKET: "flashcards_active_bucket",
  MASTERED_IDS: "flashcards_mastered_ids",
};

export function getStoredCustomCards(): FlashCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CARDS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load custom cards from localStorage", e);
    return [];
  }
}

export function saveStoredCustomCards(cards: FlashCard[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CARDS, JSON.stringify(cards));
  } catch (e) {
    console.error("Failed to save custom cards to localStorage", e);
  }
}

export function getStoredStarredIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STARRED_IDS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to load starred IDs from localStorage", e);
    return [];
  }
}

export function saveStoredStarredIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.STARRED_IDS, JSON.stringify(ids));
  } catch (e) {
    console.error("Failed to save starred IDs to localStorage", e);
  }
}

export function getStoredActiveBucket(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_BUCKET);
  } catch (e) {
    return null;
  }
}

export function saveStoredActiveBucket(bucket: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BUCKET, bucket);
  } catch (e) {
    console.error("Failed to save active bucket to localStorage", e);
  }
}
