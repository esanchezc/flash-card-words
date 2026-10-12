export interface SynonymEntry {
  word: string;
  primary: string;
  alternatives?: string[];
  distractors: string[];
}

export const SYNONYMS_DATA: Record<string, SynonymEntry> = {
  // Chapter 1
  absolve: {
    word: "absolve",
    primary: "exonerate",
    alternatives: ["acquit", "pardon", "clear"],
    distractors: ["blame", "convict", "restrain"],
  },
  adamant: {
    word: "adamant",
    primary: "stubborn",
    alternatives: ["inflexible", "firm", "unyielding"],
    distractors: ["flexible", "lenient", "yielding"],
  },
  amiable: {
    word: "amiable",
    primary: "friendly",
    alternatives: ["pleasant", "good-natured", "cordial"],
    distractors: ["hostile", "abrupt", "quarrelsome"],
  },
  amoral: {
    word: "amoral",
    primary: "unprincipled",
    alternatives: ["unethical", "lacking morals"],
    distractors: ["virtuous", "moral", "honorable"],
  },
  animosity: {
    word: "animosity",
    primary: "hostility",
    alternatives: ["hatred", "ill will", "bitterness"],
    distractors: ["kindness", "goodwill", "friendship"],
  },
  antagonist: {
    word: "antagonist",
    primary: "opponent",
    alternatives: ["adversary", "rival", "competitor"],
    distractors: ["ally", "partner", "supporter"],
  },
  eccentric: {
    word: "eccentric",
    primary: "unusual",
    alternatives: ["odd", "peculiar", "unconventional"],
    distractors: ["conventional", "typical", "normal"],
  },
  encounter: {
    word: "encounter",
    primary: "meet",
    alternatives: ["run into", "come across"],
    distractors: ["avoid", "escape", "dodge"],
  },
  epitome: {
    word: "epitome",
    primary: "model",
    alternatives: ["perfect example", "embodiment", "archetype"],
    distractors: ["exception", "anomaly", "contrast"],
  },
  malign: {
    word: "malign",
    primary: "defame",
    alternatives: ["slander", "vilify", "speak ill of"],
    distractors: ["praise", "compliment", "honor"],
  },

  // Chapter 2
  curt: {
    word: "curt",
    primary: "abrupt",
    alternatives: ["blunt", "terse", "brusque"],
    distractors: ["polite", "wordy", "friendly"],
  },
  demoralize: {
    word: "demoralize",
    primary: "discourage",
    alternatives: ["dishearten", "dispirit"],
    distractors: ["encourage", "inspire", "cheer"],
  },
  dilemma: {
    word: "dilemma",
    primary: "predicament",
    alternatives: ["quandary", "difficult choice"],
    distractors: ["solution", "certainty", "resolution"],
  },
  inclination: {
    word: "inclination",
    primary: "preference",
    alternatives: ["tendency", "leaning", "penchant"],
    distractors: ["aversion", "dislike", "neutrality"],
  },
  irate: {
    word: "irate",
    primary: "furious",
    alternatives: ["enraged", "incensed", "angry"],
    distractors: ["calm", "peaceful", "serene"],
  },
  retort: {
    word: "retort",
    primary: "reply",
    alternatives: ["counter", "snap back", "answer"],
    distractors: ["inquire", "ask", "hesitate"],
  },
  sabotage: {
    word: "sabotage",
    primary: "undermine",
    alternatives: ["damage", "destroy", "wreck"],
    distractors: ["assist", "construct", "support"],
  },
  subsequent: {
    word: "subsequent",
    primary: "following",
    alternatives: ["later", "next", "ensuing"],
    distractors: ["prior", "previous", "former"],
  },
  wary: {
    word: "wary",
    primary: "cautious",
    alternatives: ["watchful", "suspicious", "guarded"],
    distractors: ["reckless", "trusting", "careless"],
  },
  zeal: {
    word: "zeal",
    primary: "passion",
    alternatives: ["enthusiasm", "fervor", "devotion"],
    distractors: ["apathy", "indifference", "lethargy"],
  },

  // Chapter 3
  acclaim: {
    word: "acclaim",
    primary: "praise",
    alternatives: ["applause", "approval", "commendation"],
    distractors: ["criticism", "condemnation", "disapproval"],
  },
  adjacent: {
    word: "adjacent",
    primary: "neighboring",
    alternatives: ["next to", "bordering", "adjoining"],
    distractors: ["distant", "remote", "separated"],
  },
  elicit: {
    word: "elicit",
    primary: "evoke",
    alternatives: ["draw forth", "bring out", "trigger"],
    distractors: ["suppress", "repress", "conceal"],
  },
  engross: {
    word: "engross",
    primary: "absorb",
    alternatives: ["captivate", "fascinate", "occupy"],
    distractors: ["bore", "distract", "disinterest"],
  },
  escalate: {
    word: "escalate",
    primary: "intensify",
    alternatives: ["increase", "heighten", "expand"],
    distractors: ["decrease", "lessen", "diminish"],
  },
  exploit: {
    word: "exploit",
    primary: "take advantage of",
    alternatives: ["misuse", "abuse"],
    distractors: ["protect", "respect", "cherish"],
  },
  methodical: {
    word: "methodical",
    primary: "orderly",
    alternatives: ["systematic", "organized", "disciplined"],
    distractors: ["chaotic", "haphazard", "disorganized"],
  },
  obsolete: {
    word: "obsolete",
    primary: "outdated",
    alternatives: ["out of date", "archaic", "superseded"],
    distractors: ["modern", "current", "brand-new"],
  },
  tangible: {
    word: "tangible",
    primary: "concrete",
    alternatives: ["touchable", "physical", "palpable"],
    distractors: ["abstract", "imaginary", "intangible"],
  },
  terminate: {
    word: "terminate",
    primary: "end",
    alternatives: ["conclude", "finish", "stop"],
    distractors: ["commence", "start", "initiate"],
  },

  // Chapter 4
  deterrent: {
    word: "deterrent",
    primary: "restraint",
    alternatives: ["discouragement", "prevention", "obstacle"],
    distractors: ["incentive", "catalyst", "attraction"],
  },
  implication: {
    word: "implication",
    primary: "hint",
    alternatives: ["suggestion", "insinuation"],
    distractors: ["direct statement", "fact", "declaration"],
  },
  inequity: {
    word: "inequity",
    primary: "unfairness",
    alternatives: ["injustice", "bias", "partiality"],
    distractors: ["fairness", "equality", "justice"],
  },
  infirmity: {
    word: "infirmity",
    primary: "ailment",
    alternatives: ["disability", "weakness", "illness"],
    distractors: ["strength", "vitality", "robustness"],
  },
  infringe: {
    word: "infringe",
    primary: "violate",
    alternatives: ["trespass", "intrude", "breach"],
    distractors: ["comply", "respect", "uphold"],
  },
  innovation: {
    word: "innovation",
    primary: "breakthrough",
    alternatives: ["novelty", "new invention", "modernization"],
    distractors: ["tradition", "custom", "stagnation"],
  },
  revitalize: {
    word: "revitalize",
    primary: "refresh",
    alternatives: ["restore", "renew", "re-energize"],
    distractors: ["exhaust", "drain", "weaken"],
  },
  sparse: {
    word: "sparse",
    primary: "scattered",
    alternatives: ["thin", "meager", "scanty"],
    distractors: ["dense", "crowded", "abundant"],
  },
  subjective: {
    word: "subjective",
    primary: "personal",
    alternatives: ["biased", "individual", "opinion-based"],
    distractors: ["objective", "impartial", "factual"],
  },
  succinct: {
    word: "succinct",
    primary: "concise",
    alternatives: ["brief", "to the point", "terse"],
    distractors: ["wordy", "lengthy", "verbose"],
  },

  // Chapter 5
  allusion: {
    word: "allusion",
    primary: "reference",
    alternatives: ["hint", "suggestion", "mention"],
    distractors: ["direct quote", "reality", "explanation"],
  },
  altruistic: {
    word: "altruistic",
    primary: "unselfish",
    alternatives: ["generous", "charitable", "selfless"],
    distractors: ["selfish", "greedy", "egotistical"],
  },
  appease: {
    word: "appease",
    primary: "pacify",
    alternatives: ["soothe", "calm", "placate"],
    distractors: ["provoke", "infuriate", "antagonize"],
  },
  arbitrary: {
    word: "arbitrary",
    primary: "random",
    alternatives: ["impulsive", "unreasonable", "whimsical"],
    distractors: ["logical", "reasoned", "methodical"],
  },
  assail: {
    word: "assail",
    primary: "attack",
    alternatives: ["assault", "criticize", "strike"],
    distractors: ["defend", "protect", "shield"],
  },
  banal: {
    word: "banal",
    primary: "commonplace",
    alternatives: ["ordinary", "dull", "clichéd", "trite"],
    distractors: ["original", "unique", "thrilling"],
  },
  euphemism: {
    word: "euphemism",
    primary: "polite term",
    alternatives: ["mild expression", "substitute term"],
    distractors: ["harsh insult", "vulgarity", "direct offense"],
  },
  mercenary: {
    word: "mercenary",
    primary: "greedy",
    alternatives: ["money-oriented", "materialistic"],
    distractors: ["generous", "altruistic", "charitable"],
  },
  syndrome: {
    word: "syndrome",
    primary: "symptom pattern",
    alternatives: ["condition", "disorder", "complex"],
    distractors: ["cure", "cause", "single symptom"],
  },
  taint: {
    word: "taint",
    primary: "corrupt",
    alternatives: ["stain", "dishonor", "spoil"],
    distractors: ["purify", "cleanse", "sanctify"],
  },
};

/**
 * Fallback pool of general English distractors for unknown/custom words.
 */
const GENERAL_SYNONYM_DISTRACTORS = [
  "harmonious",
  "hesitant",
  "temporary",
  "elaborate",
  "predictable",
  "perceptive",
  "cautious",
  "generous",
  "abrupt",
  "persistent",
  "essential",
  "superficial",
];

export interface SynonymQuizOption {
  text: string;
  isCorrect: boolean;
}

/**
 * Returns 2 options for a synonym quiz (1 correct synonym, 1 distractor).
 */
export function getSynonymQuizOptions(
  targetWord: string,
  definitionFallback?: string
): SynonymQuizOption[] {
  const normalized = targetWord.trim().toLowerCase();
  const entry = SYNONYMS_DATA[normalized];

  let correctText = "";
  let distractorText = "";

  if (entry) {
    // 1. Pick correct answer (prefer primary, or randomly an alternative)
    const allSynonyms = [entry.primary, ...(entry.alternatives || [])];
    correctText = entry.primary;

    // 2. Pick distractor
    const availableDistractors = entry.distractors.filter(
      (d) => !allSynonyms.some((s) => s.toLowerCase() === d.toLowerCase())
    );

    if (availableDistractors.length > 0) {
      distractorText =
        availableDistractors[
          Math.floor(Math.random() * availableDistractors.length)
        ];
    } else {
      // Pick another word's primary synonym
      const otherPrimaries = Object.values(SYNONYMS_DATA)
        .map((e) => e.primary)
        .filter((p) => !allSynonyms.some((s) => s.toLowerCase() === p.toLowerCase()));
      distractorText =
        otherPrimaries[Math.floor(Math.random() * otherPrimaries.length)] ||
        "unrelated";
    }
  } else {
    // Custom/unknown word fallback:
    // Extract first 1-2 words of definition or use first noun/adjective
    const cleanDef = (definitionFallback || "").replace(/^(to|a|an|the)\s+/i, "");
    const firstDefWord = cleanDef.split(/[\s,;.]+/)[0] || targetWord;
    correctText = firstDefWord.toLowerCase();

    const pool = GENERAL_SYNONYM_DISTRACTORS.filter(
      (d) => d.toLowerCase() !== correctText.toLowerCase()
    );
    distractorText = pool[Math.floor(Math.random() * pool.length)] || "different";
  }

  const options: SynonymQuizOption[] = [
    { text: correctText, isCorrect: true },
    { text: distractorText, isCorrect: false },
  ];

  // 50/50 randomize order
  return Math.random() > 0.5 ? options : [options[1], options[0]];
}

/**
 * Retrieves the synonym entry for a given word if known.
 */
export function getSynonymEntry(word: string): SynonymEntry | undefined {
  return SYNONYMS_DATA[word.trim().toLowerCase()];
}
