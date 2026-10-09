import Papa from "papaparse";
import { FlashCard } from "@/types/card";

export function parseWordsCSV(csvText: string): FlashCard[] {
  const result = Papa.parse<Record<string, string>>(csvText.trim(), {
    header: true,
    skipEmptyLines: true,
  });

  return result.data
    .filter((row) => row.word && row.word.trim().length > 0)
    .map((row, index) => {
      const bucket = (row.bucket || "Chapter 1").trim();
      const word = row.word.trim();
      return {
        id: `${bucket}-${word}-${index}`.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        bucket,
        word,
        translation: (row.translation || "").trim(),
        notes: (row.notes || "").trim(),
        definition: (row.definition || "").trim(),
        example: (row.example || "").trim(),
        mastered: false,
        starred: false,
        isCustom: false,
      };
    });
}

export function exportWordsToCSV(cards: FlashCard[]): string {
  const rows = cards.map((card) => ({
    bucket: card.bucket,
    word: card.word,
    translation: card.translation,
    notes: card.notes || "",
    definition: card.definition,
    example: card.example || "",
  }));

  return Papa.unparse(rows, {
    quotes: true,
    header: true,
  });
}
