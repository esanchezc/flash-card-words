"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles, FileText } from "lucide-react";
import { FlashCard } from "@/types/card";
import Papa from "papaparse";
import { Language, translations } from "@/lib/i18n";

interface NewBucketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBucket: (
    bucketName: string,
    cards: Omit<FlashCard, "id" | "bucket">[]
  ) => void;
  existingBuckets: string[];
  language: Language;
}

export const NewBucketModal: React.FC<NewBucketModalProps> = ({
  isOpen,
  onClose,
  onCreateBucket,
  existingBuckets,
  language,
}) => {
  const t = translations[language];
  const defaultBucketName = `Set ${existingBuckets.length + 1}`;
  const [bucketName, setBucketName] = useState(defaultBucketName);
  const [pasteText, setPasteText] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleParseAndCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedBucket = bucketName.trim();
    if (!trimmedBucket) {
      setError(t.enterBucketNameError);
      return;
    }

    if (!pasteText.trim()) {
      setError(t.pasteAtLeastOneError);
      return;
    }

    try {
      // Parse using PapaParse
      const parsed = Papa.parse<string[]>(pasteText.trim(), {
        skipEmptyLines: true,
      });

      const cards: Omit<FlashCard, "id" | "bucket">[] = [];

      for (const row of parsed.data) {
        if (!row || row.length === 0) continue;

        // If first column looks like a header, skip it
        if (
          cards.length === 0 &&
          (row[0].toLowerCase() === "word" || row[0].toLowerCase() === "bucket")
        ) {
          continue;
        }

        let word = "";
        let translation = "";
        let notes = "";
        let definition = "";
        let example = "";

        if (row.length === 1) {
          word = row[0];
        } else if (row.length === 2) {
          word = row[0];
          translation = row[1];
        } else if (row.length === 3) {
          word = row[0];
          translation = row[1];
          definition = row[2];
        } else if (row.length === 4) {
          word = row[0];
          translation = row[1];
          notes = row[2];
          definition = row[3];
        } else {
          if (row.length >= 6) {
            word = row[1];
            translation = row[2];
            notes = row[3];
            definition = row[4];
            example = row[5];
          } else {
            word = row[0];
            translation = row[1];
            notes = row[2];
            definition = row[3];
            example = row[4];
          }
        }

        if (word && word.trim()) {
          cards.push({
            word: word.trim(),
            translation: translation.trim(),
            notes: notes.trim(),
            definition: definition.trim() || (language === "es" ? "Sin definición." : "No definition provided."),
            example: example.trim(),
            mastered: false,
            starred: false,
          });
        }
      }

      if (cards.length === 0) {
        setError(t.couldNotExtractError);
        return;
      }

      onCreateBucket(trimmedBucket, cards);
      onClose();
    } catch (err) {
      console.error(err);
      setError(t.couldNotExtractError);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 flex flex-col max-h-[90dvh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-500" />
              {t.createNewBucket}
            </h2>
            <p className="text-xs text-slate-500">
              {t.modalSubtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleParseAndCreate} className="flex-1 flex flex-col overflow-y-auto pt-4 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.bucketNameLabel}
            </label>
            <input
              type="text"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              placeholder={t.bucketNamePlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
              required
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                {t.pasteLabel}
              </label>
              <span className="text-[11px] text-slate-400">{t.usually10Words}</span>
            </div>

            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              placeholder={t.pastePlaceholder}
              rows={8}
              className="w-full flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white resize-none"
              required
            />
            <p className="text-[11px] text-slate-400 mt-1">
              {t.formatHelp}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.createAndStudy}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
