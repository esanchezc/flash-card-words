"use client";

import React, { useState } from "react";
import { X, Plus, Sparkles, FileText, PenTool, Trash2, CheckCircle2 } from "lucide-react";
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
  const t = translations[language] || translations.en;

  // Active Tab: "csv" | "oneByOne"
  const [activeTab, setActiveTab] = useState<"csv" | "oneByOne">("oneByOne");

  // Bucket selection: "new" vs existing name
  const [bucketMode, setBucketMode] = useState<"new" | "existing">(
    existingBuckets.length > 0 ? "new" : "new"
  );
  const defaultBucketName = `Chapter ${existingBuckets.length + 1}`;
  const [customBucketName, setCustomBucketName] = useState(defaultBucketName);
  const [selectedExistingBucket, setSelectedExistingBucket] = useState(
    existingBuckets[0] || "Chapter 1"
  );

  // CSV Tab state
  const [pasteText, setPasteText] = useState("");

  // One-by-one Tab state
  const [singleWord, setSingleWord] = useState("");
  const [singleTranslation, setSingleTranslation] = useState("");
  const [singleNotes, setSingleNotes] = useState("");
  const [singleDefinition, setSingleDefinition] = useState("");
  const [singleExample, setSingleExample] = useState("");
  const [stagedCards, setStagedCards] = useState<Omit<FlashCard, "id" | "bucket">[]>([]);

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetBucketName =
    bucketMode === "existing" ? selectedExistingBucket : customBucketName.trim();

  // Add a single word to the staged list in Tab 2
  const handleAddSingleWord = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const word = singleWord.trim();
    const definition = singleDefinition.trim();
    const translation = singleTranslation.trim();

    if (!word || !definition) {
      setError(t.requiredFieldsMissing);
      return;
    }

    const newCard: Omit<FlashCard, "id" | "bucket"> = {
      word,
      translation,
      notes: singleNotes.trim(),
      definition,
      example: singleExample.trim(),
      mastered: false,
      starred: false,
    };

    setStagedCards((prev) => [newCard, ...prev]);

    // Clear form inputs for the next word
    setSingleWord("");
    setSingleTranslation("");
    setSingleNotes("");
    setSingleDefinition("");
    setSingleExample("");
  };

  const handleRemoveStagedCard = (index: number) => {
    setStagedCards((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit all staged words from One-by-One Tab
  const handleSubmitStagedCards = () => {
    setError(null);
    if (!targetBucketName) {
      setError(t.enterBucketNameError);
      return;
    }

    if (stagedCards.length === 0) {
      setError(t.pasteAtLeastOneError);
      return;
    }

    onCreateBucket(targetBucketName, stagedCards);
    setStagedCards([]);
    onClose();
  };

  // Parse and submit CSV Tab
  const handleParseAndCreateCSV = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!targetBucketName) {
      setError(t.enterBucketNameError);
      return;
    }

    if (!pasteText.trim()) {
      setError(t.pasteAtLeastOneError);
      return;
    }

    try {
      const parsed = Papa.parse<string[]>(pasteText.trim(), {
        skipEmptyLines: true,
      });

      const cards: Omit<FlashCard, "id" | "bucket">[] = [];

      for (const row of parsed.data) {
        if (!row || row.length === 0) continue;

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
            definition:
              definition.trim() ||
              (language === "es" ? "Sin definición." : "No definition provided."),
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

      onCreateBucket(targetBucketName, cards);
      setPasteText("");
      onClose();
    } catch (err) {
      console.error(err);
      setError(t.couldNotExtractError);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-5 sm:p-6 flex flex-col max-h-[92dvh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-500" />
              {t.addWordsModalTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.addWordsModalSubtitle}
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

        {/* Bucket Target Selector */}
        <div className="pt-3 pb-2 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              {t.targetBucketLabel}
            </label>
            {existingBuckets.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setBucketMode("new")}
                  className={`px-2 py-0.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    bucketMode === "new"
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {t.newBucketOption}
                </button>
                <span className="text-slate-300">|</span>
                <button
                  type="button"
                  onClick={() => setBucketMode("existing")}
                  className={`px-2 py-0.5 rounded-lg text-xs font-semibold cursor-pointer ${
                    bucketMode === "existing"
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {t.existingBucketsOption}
                </button>
              </div>
            )}
          </div>

          {bucketMode === "new" ? (
            <input
              type="text"
              value={customBucketName}
              onChange={(e) => setCustomBucketName(e.target.value)}
              placeholder={t.bucketNamePlaceholder}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
              required
            />
          ) : (
            <select
              value={selectedExistingBucket}
              onChange={(e) => setSelectedExistingBucket(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
            >
              {existingBuckets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl my-3">
          <button
            type="button"
            onClick={() => {
              setActiveTab("oneByOne");
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "oneByOne"
                ? "bg-white text-sky-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>{t.tabOneByOne}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("csv");
              setError(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "csv"
                ? "bg-white text-sky-700 shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.tabCsv}</span>
          </button>
        </div>

        {error && (
          <div className="p-2.5 mb-2 bg-rose-50 border border-rose-200 text-rose-600 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* ================= TAB 1: ONE BY ONE FORM ================= */}
        {activeTab === "oneByOne" ? (
          <div className="flex-1 flex flex-col overflow-y-auto space-y-3 pr-1">
            <form onSubmit={handleAddSingleWord} className="space-y-2.5 bg-slate-50/60 p-3 rounded-2xl border border-slate-200/80">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.wordField} *
                  </label>
                  <input
                    type="text"
                    value={singleWord}
                    onChange={(e) => setSingleWord(e.target.value)}
                    placeholder={t.wordPlaceholder}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.translationField}
                  </label>
                  <input
                    type="text"
                    value={singleTranslation}
                    onChange={(e) => setSingleTranslation(e.target.value)}
                    placeholder={t.translationPlaceholder}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  {t.definitionField} *
                </label>
                <textarea
                  value={singleDefinition}
                  onChange={(e) => setSingleDefinition(e.target.value)}
                  placeholder={t.definitionPlaceholder}
                  rows={2}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.notesField}
                  </label>
                  <input
                    type="text"
                    value={singleNotes}
                    onChange={(e) => setSingleNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {t.exampleField}
                  </label>
                  <input
                    type="text"
                    value={singleExample}
                    onChange={(e) => setSingleExample(e.target.value)}
                    placeholder={t.examplePlaceholder}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addWordToSetBtn}</span>
              </button>
            </form>

            {/* Staged words in current bucket */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>{t.wordsInList(stagedCards.length)}</span>
                {stagedCards.length > 0 && (
                  <span className="text-[11px] font-normal text-slate-400">
                    Target: 10 words
                  </span>
                )}
              </div>

              {stagedCards.length === 0 ? (
                <div className="p-3 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                  {t.noWordsInListYet}
                </div>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {stagedCards.map((card, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs shadow-2xs"
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold text-sky-700 capitalize">
                          {card.word}
                        </span>
                        {card.translation && (
                          <span className="text-slate-500 ml-2">
                            ({card.translation})
                          </span>
                        )}
                        <span className="text-slate-400 ml-2 truncate block text-[11px]">
                          {card.definition}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveStagedCard(idx)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save Staged Words Action */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleSubmitStagedCards}
                disabled={stagedCards.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.saveAndStudy(stagedCards.length)}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= TAB 2: CSV / PASTE FORM ================= */
          <form
            onSubmit={handleParseAndCreateCSV}
            className="flex-1 flex flex-col overflow-y-auto space-y-3"
          >
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
                rows={7}
                className="w-full flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white resize-none"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1">
                {t.formatHelp}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{t.createAndStudy}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
