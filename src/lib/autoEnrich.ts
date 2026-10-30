import { FlashCard } from "@/types/card";
import {
  SynonymEntry,
  SYNONYMS_DATA,
  registerCustomSynonyms,
} from "@/data/synonyms";
import {
  getStoredCustomSynonyms,
  saveStoredCustomSynonyms,
  saveStoredCustomCards,
} from "@/lib/storage";

interface DatamuseWord {
  word: string;
  tags?: string[];
  defs?: string[];
}

interface DictionaryApiMeaning {
  partOfSpeech?: string;
  definitions?: {
    definition?: string;
    example?: string;
    synonyms?: string[];
    antonyms?: string[];
  }[];
  synonyms?: string[];
  antonyms?: string[];
}

interface DictionaryApiEntry {
  word?: string;
  meanings?: DictionaryApiMeaning[];
}

const FALLBACK_DISTRACTORS = [
  "reluctant",
  "ordinary",
  "temporary",
  "obscure",
  "indifferent",
  "cautious",
  "hostile",
  "trivial",
  "scarce",
  "rigid",
];

function cleanDefinitionClause(rawDef: string): string {
  if (!rawDef) return "express a distinct meaning in context";
  const cleaned = rawDef
    .replace(/^\([a-z]+\)\s*/i, "")
    .replace(/\.$/, "")
    .split(";")[0]
    .trim();
  if (!cleaned) return "express a distinct meaning in context";
  return cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
}

/**
 * Deterministic, non-LLM grammar templates that construct a contextual sentence
 * using the word's part of speech and its dictionary definition clause so that:
 * 1. The target word can be swapped directly with its primary synonym.
 * 2. When blanked out in Sentence Check 1 & 2, the rest of the sentence gives a
 *    clear context clue pointing to the word's meaning.
 */
export function buildContextSentence(
  word: string,
  partOfSpeech: string,
  definition: string,
  primarySynonym: string,
  index: number = 0
): string {
  const w = word.trim();
  const pos = partOfSpeech.toLowerCase();
  const defClause = cleanDefinitionClause(definition || primarySynonym);

  if (pos.includes("verb") || pos === "v") {
    const cleanVerbClause = defClause.replace(/^to\s+/i, "");
    const templates = [
      `In difficult situations, the committee had to ${w} in order to ${cleanVerbClause}.`,
      `No one expected the director to ${w} when asked to ${cleanVerbClause}.`,
      `They decided to ${w} immediately rather than wait and ${cleanVerbClause} later.`,
    ];
    return templates[index % templates.length];
  }

  if (pos.includes("noun") || pos === "n") {
    const templates = [
      `Everyone in the room noticed the sudden ${w}, which revealed ${defClause}.`,
      `The report highlighted the ${w} as a clear case of ${defClause}.`,
      `Without addressing the ${w}, the team could not handle ${defClause}.`,
    ];
    return templates[index % templates.length];
  }

  if (pos.includes("adv")) {
    const templates = [
      `She spoke ${w} during the meeting, acting in a way that showed ${defClause}.`,
      `The team responded ${w} once they realized the situation involved ${defClause}.`,
    ];
    return templates[index % templates.length];
  }

  // Default / Adjective
  const templates = [
    `The manager's attitude seemed ${w}, clearly showing a tendency to be ${defClause}.`,
    `Everyone described the decision as ${w} because it appeared ${defClause}.`,
    `Even under pressure, her response remained ${w}—remarkably ${defClause}.`,
  ];
  return templates[index % templates.length];
}

async function fetchWordEnrichment(
  card: FlashCard,
  index: number
): Promise<{
  updatedCard: FlashCard;
  synonymEntry: SynonymEntry;
}> {
  const cleanWord = card.word.trim().toLowerCase();
  const existingStatic =
    SYNONYMS_DATA[cleanWord] ||
    SYNONYMS_DATA[cleanWord.replace(/ied$/, "y")] ||
    SYNONYMS_DATA[cleanWord.replace(/ed$/, "")];

  let partOfSpeech = "adjective";
  let dictDef = card.definition?.trim() || "";
  let dictExample = card.example?.trim() || "";
  const synonymsList: string[] = [];
  const antonymsList: string[] = [];

  // 1. Query Free Dictionary API (no API key or LLM required)
  try {
    const dictRes = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`
    );
    if (dictRes.ok) {
      const data: DictionaryApiEntry[] = await dictRes.json();
      const firstEntry = data?.[0];
      if (firstEntry?.meanings?.length) {
        const primaryMeaning = firstEntry.meanings[0];
        if (primaryMeaning.partOfSpeech) {
          partOfSpeech = primaryMeaning.partOfSpeech;
        }
        for (const m of firstEntry.meanings) {
          for (const s of m.synonyms || []) {
            if (s.toLowerCase() !== cleanWord) synonymsList.push(s);
          }
          for (const a of m.antonyms || []) {
            if (a.toLowerCase() !== cleanWord) antonymsList.push(a);
          }
          for (const d of m.definitions || []) {
            if (!dictDef && d.definition) {
              dictDef = d.definition;
            }
            if (
              !dictExample &&
              d.example &&
              d.example.toLowerCase().includes(cleanWord)
            ) {
              dictExample = d.example;
            }
            for (const s of d.synonyms || []) {
              if (s.toLowerCase() !== cleanWord) synonymsList.push(s);
            }
            for (const a of d.antonyms || []) {
              if (a.toLowerCase() !== cleanWord) antonymsList.push(a);
            }
          }
        }
      }
    }
  } catch {
    // Offline or network error; fall back to Datamuse / deterministic rules
  }

  // 2. Query Datamuse Lexical Database for ranked synonyms, definitions & POS tags
  if (synonymsList.length < 2 || !dictDef) {
    try {
      const dmRes = await fetch(
        `https://api.datamuse.com/words?ml=${encodeURIComponent(cleanWord)}&md=dp&max=8`
      );
      if (dmRes.ok) {
        const dmWords: DatamuseWord[] = await dmRes.json();
        for (const item of dmWords) {
          if (
            item.word &&
            item.word.toLowerCase() !== cleanWord &&
            !synonymsList.includes(item.word)
          ) {
            synonymsList.push(item.word);
          }
          if (!dictDef && item.defs?.length) {
            const rawDef = item.defs[0].split("\t")[1] || item.defs[0];
            dictDef = rawDef;
          }
          if (item.tags?.length) {
            if (item.tags.includes("v")) partOfSpeech = "verb";
            else if (item.tags.includes("n")) partOfSpeech = "noun";
            else if (item.tags.includes("adj")) partOfSpeech = "adjective";
            else if (item.tags.includes("adv")) partOfSpeech = "adverb";
          }
        }
      }
    } catch {
      // Ignore network errors
    }
  }

  // 3. Query Datamuse for antonyms to serve as realistic quiz distractors
  if (antonymsList.length < 2) {
    try {
      const antRes = await fetch(
        `https://api.datamuse.com/words?rel_ant=${encodeURIComponent(cleanWord)}&max=5`
      );
      if (antRes.ok) {
        const antWords: DatamuseWord[] = await antRes.json();
        for (const item of antWords) {
          if (item.word && !antonymsList.includes(item.word)) {
            antonymsList.push(item.word);
          }
        }
      }
    } catch {
      // Ignore network errors
    }
  }

  // 4. Optional Spanish translation fallback if user left translation blank
  let finalTranslation = card.translation?.trim() || "";
  if (!finalTranslation) {
    try {
      const trRes = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=en|es`
      );
      if (trRes.ok) {
        const trData = await trRes.json();
        const translated = trData?.responseData?.translatedText;
        if (translated) {
          finalTranslation = translated.toLowerCase();
        }
      }
    } catch {
      // Ignore
    }
  }
  if (!finalTranslation) {
    finalTranslation = cleanWord;
  }

  const uniqueSynonyms = Array.from(
    new Set(
      existingStatic
        ? [existingStatic.primary, ...(existingStatic.alternatives || [])]
        : synonymsList.slice(0, 4)
    )
  );
  if (uniqueSynonyms.length === 0) {
    uniqueSynonyms.push(
      dictDef ? cleanDefinitionClause(dictDef).split(" ").slice(0, 3).join(" ") : "equivalent"
    );
  }

  const primarySynonym =
    existingStatic?.primary || uniqueSynonyms[0] || "similar";

  const uniqueDistractors = Array.from(
    new Set(
      existingStatic?.distractors?.length
        ? existingStatic.distractors
        : [
            ...antonymsList,
            FALLBACK_DISTRACTORS[index % FALLBACK_DISTRACTORS.length],
            FALLBACK_DISTRACTORS[(index + 3) % FALLBACK_DISTRACTORS.length],
          ]
    )
  ).slice(0, 4);

  const finalDefinition =
    dictDef ||
    (card.notes?.trim()
      ? `${card.notes.trim()} (${primarySynonym})`
      : `Related to or meaning ${uniqueSynonyms.slice(0, 2).join(", ")}.`);

  const finalExample =
    dictExample ||
    existingStatic?.sentence ||
    buildContextSentence(
      card.word,
      partOfSpeech,
      finalDefinition,
      primarySynonym,
      index
    );

  const swapSentence = existingStatic?.sentence || finalExample;

  const updatedCard: FlashCard = {
    ...card,
    translation: finalTranslation,
    definition: finalDefinition,
    example: finalExample,
  };

  const synonymEntry: SynonymEntry = {
    word: cleanWord,
    primary: primarySynonym,
    alternatives: uniqueSynonyms.slice(1),
    distractors: uniqueDistractors,
    sentence: swapSentence,
  };

  return { updatedCard, synonymEntry };
}

/**
 * Automatically enriches custom cards that are missing definitions, examples,
 * or synonym entries, persisting the results in localStorage.
 */
export async function enrichCustomCards(
  customCards: FlashCard[]
): Promise<FlashCard[]> {
  if (!customCards.length) return customCards;

  const storedSynonyms = getStoredCustomSynonyms();
  registerCustomSynonyms(storedSynonyms);

  const needsEnrichment = customCards.some((c) => {
    const key = c.word.trim().toLowerCase();
    return (
      !c.definition?.trim() ||
      !c.example?.trim() ||
      (!SYNONYMS_DATA[key] && !storedSynonyms[key])
    );
  });

  if (!needsEnrichment) {
    return customCards;
  }

  const updatedCards: FlashCard[] = [];
  const nextCustomSynonyms: Record<string, SynonymEntry> = {
    ...storedSynonyms,
  };

  for (let i = 0; i < customCards.length; i++) {
    const card = customCards[i];
    const key = card.word.trim().toLowerCase();
    const hasDefAndEx =
      Boolean(card.definition?.trim()) && Boolean(card.example?.trim());
    const hasSyn = Boolean(SYNONYMS_DATA[key] || nextCustomSynonyms[key]);

    if (hasDefAndEx && hasSyn) {
      updatedCards.push(card);
      continue;
    }

    const { updatedCard, synonymEntry } = await fetchWordEnrichment(card, i);
    updatedCards.push(updatedCard);
    nextCustomSynonyms[key] = synonymEntry;
  }

  saveStoredCustomCards(updatedCards);
  saveStoredCustomSynonyms(nextCustomSynonyms);
  registerCustomSynonyms(nextCustomSynonyms);

  return updatedCards;
}
