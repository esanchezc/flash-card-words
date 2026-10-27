export interface SynonymEntry {
  word: string;
  primary: string;
  alternatives?: string[];
  distractors: string[];
  sentence: string; // Context sentence where the target word can be swapped with its primary synonym
}

export const SYNONYMS_DATA: Record<string, SynonymEntry> = {
  // Chapter 1
  absolve: {
    word: "absolve",
    primary: "exonerate",
    alternatives: ["acquit", "pardon", "clear"],
    distractors: ["blame", "convict", "restrain"],
    sentence: "The jury will absolve the innocent man of all blame.",
  },
  adamant: {
    word: "adamant",
    primary: "stubborn",
    alternatives: ["inflexible", "firm", "unyielding"],
    distractors: ["flexible", "lenient", "yielding"],
    sentence: "Ron is adamant about not changing his weekend plans.",
  },
  amiable: {
    word: "amiable",
    primary: "friendly",
    alternatives: ["pleasant", "good-natured", "cordial"],
    distractors: ["hostile", "abrupt", "quarrelsome"],
    sentence: "Our host was amiable and greeted every guest with a warm smile.",
  },
  amoral: {
    word: "amoral",
    primary: "unprincipled",
    alternatives: ["unethical", "lacking morals"],
    distractors: ["virtuous", "moral", "honorable"],
    sentence: "The amoral thief cared nothing about what was right or wrong.",
  },
  animosity: {
    word: "animosity",
    primary: "hostility",
    alternatives: ["hatred", "ill will", "bitterness"],
    distractors: ["kindness", "goodwill", "friendship"],
    sentence: "There was bitter animosity between the two rival teams.",
  },
  antagonist: {
    word: "antagonist",
    primary: "opponent",
    alternatives: ["adversary", "rival", "competitor"],
    distractors: ["ally", "partner", "supporter"],
    sentence: "In the final tournament, he faced a fierce antagonist.",
  },
  eccentric: {
    word: "eccentric",
    primary: "unusual",
    alternatives: ["odd", "peculiar", "unconventional"],
    distractors: ["conventional", "typical", "normal"],
    sentence: "The artist had eccentric habits, like painting only at night.",
  },
  encounter: {
    word: "encounter",
    primary: "meet",
    alternatives: ["run into", "come across"],
    distractors: ["avoid", "escape", "dodge"],
    sentence: "I did not expect to encounter my neighbor at the airport.",
  },
  epitome: {
    word: "epitome",
    primary: "model",
    alternatives: ["perfect example", "embodiment", "archetype"],
    distractors: ["exception", "anomaly", "contrast"],
    sentence: "The dedicated nurse is the epitome of compassionate care.",
  },
  malign: {
    word: "malign",
    primary: "defame",
    alternatives: ["slander", "vilify", "speak ill of"],
    distractors: ["praise", "compliment", "honor"],
    sentence: "Vicious tabloids tried to malign the actor's reputation.",
  },

  // Chapter 2
  curt: {
    word: "curt",
    primary: "abrupt",
    alternatives: ["blunt", "terse", "brusque"],
    distractors: ["polite", "wordy", "friendly"],
    sentence: "The busy cashier gave a curt reply when I asked for a bag.",
  },
  demoralize: {
    word: "demoralize",
    primary: "discourage",
    alternatives: ["dishearten", "dispirit"],
    distractors: ["encourage", "inspire", "cheer"],
    sentence: "Losing three games in a row can demoralize any team.",
  },
  dilemma: {
    word: "dilemma",
    primary: "predicament",
    alternatives: ["quandary", "difficult choice"],
    distractors: ["solution", "certainty", "resolution"],
    sentence: "Having two exams scheduled at the same time created a dilemma.",
  },
  inclination: {
    word: "inclination",
    primary: "preference",
    alternatives: ["tendency", "leaning", "penchant"],
    distractors: ["aversion", "dislike", "neutrality"],
    sentence: "My first inclination was to stay home and read a book.",
  },
  irate: {
    word: "irate",
    primary: "furious",
    alternatives: ["enraged", "incensed", "angry"],
    distractors: ["calm", "peaceful", "serene"],
    sentence: "The irate customer demanded to speak with the manager.",
  },
  retort: {
    word: "retort",
    primary: "reply",
    alternatives: ["counter", "snap back", "answer"],
    distractors: ["inquire", "ask", "hesitate"],
    sentence: "She had a clever retort ready for every sarcastic remark.",
  },
  sabotage: {
    word: "sabotage",
    primary: "undermine",
    alternatives: ["damage", "destroy", "wreck"],
    distractors: ["assist", "construct", "support"],
    sentence: "A jealous worker tried to sabotage the company's presentation.",
  },
  subsequent: {
    word: "subsequent",
    primary: "following",
    alternatives: ["later", "next", "ensuing"],
    distractors: ["prior", "previous", "former"],
    sentence: "The first draft had errors, but subsequent versions were clean.",
  },
  wary: {
    word: "wary",
    primary: "cautious",
    alternatives: ["watchful", "suspicious", "guarded"],
    distractors: ["reckless", "trusting", "careless"],
    sentence: "Pedestrians should be wary of icy patches on the sidewalk.",
  },
  zeal: {
    word: "zeal",
    primary: "passion",
    alternatives: ["enthusiasm", "fervor", "devotion"],
    distractors: ["apathy", "indifference", "lethargy"],
    sentence: "He attacked his morning workout with intense zeal.",
  },

  // Chapter 3
  acclaim: {
    word: "acclaim",
    primary: "praise",
    alternatives: ["applause", "approval", "commendation"],
    distractors: ["criticism", "condemnation", "disapproval"],
    sentence: "The musician's new album received enthusiastic acclaim.",
  },
  adjacent: {
    word: "adjacent",
    primary: "neighboring",
    alternatives: ["next to", "bordering", "adjoining"],
    distractors: ["distant", "remote", "separated"],
    sentence: "They moved into an adjacent apartment on the same floor.",
  },
  elicit: {
    word: "elicit",
    primary: "evoke",
    alternatives: ["draw forth", "bring out", "trigger"],
    distractors: ["suppress", "repress", "conceal"],
    sentence: "The comedian's funny jokes will elicit loud laughter.",
  },
  engross: {
    word: "engross",
    primary: "absorb",
    alternatives: ["captivate", "fascinate", "occupy"],
    distractors: ["bore", "distract", "disinterest"],
    sentence: "A thrilling mystery novel can completely engross the reader.",
  },
  escalate: {
    word: "escalate",
    primary: "intensify",
    alternatives: ["increase", "heighten", "expand"],
    distractors: ["decrease", "lessen", "diminish"],
    sentence: "Small disagreements can escalate into major arguments.",
  },
  exploit: {
    word: "exploit",
    primary: "take advantage of",
    alternatives: ["misuse", "abuse"],
    distractors: ["protect", "respect", "cherish"],
    sentence: "Greedy employers must not exploit hardworking laborers.",
  },
  methodical: {
    word: "methodical",
    primary: "orderly",
    alternatives: ["systematic", "organized", "disciplined"],
    distractors: ["chaotic", "haphazard", "disorganized"],
    sentence: "She solved the difficult puzzle through a methodical approach.",
  },
  obsolete: {
    word: "obsolete",
    primary: "outdated",
    alternatives: ["out of date", "archaic", "superseded"],
    distractors: ["modern", "current", "brand-new"],
    sentence: "Rotary phones have become completely obsolete in modern homes.",
  },
  tangible: {
    word: "tangible",
    primary: "concrete",
    alternatives: ["touchable", "physical", "palpable"],
    distractors: ["abstract", "imaginary", "intangible"],
    sentence: "Detectives searched for tangible evidence at the crime scene.",
  },
  terminate: {
    word: "terminate",
    primary: "end",
    alternatives: ["conclude", "finish", "stop"],
    distractors: ["commence", "start", "initiate"],
    sentence: "The company decided to terminate the contract after one year.",
  },

  // Chapter 4
  deterrent: {
    word: "deterrent",
    primary: "restraint",
    alternatives: ["discouragement", "prevention", "obstacle"],
    distractors: ["incentive", "catalyst", "attraction"],
    sentence: "High speeding fines act as an effective deterrent.",
  },
  implication: {
    word: "implication",
    primary: "hint",
    alternatives: ["suggestion", "insinuation"],
    distractors: ["direct statement", "fact", "declaration"],
    sentence: "There was a subtle implication that prices would soon increase.",
  },
  inequity: {
    word: "inequity",
    primary: "unfairness",
    alternatives: ["injustice", "bias", "partiality"],
    distractors: ["fairness", "equality", "justice"],
    sentence: "The community protested against wage inequity in the factory.",
  },
  infirmity: {
    word: "infirmity",
    primary: "ailment",
    alternatives: ["disability", "weakness", "illness"],
    distractors: ["strength", "vitality", "robustness"],
    sentence: "A severe knee infirmity made it difficult for him to walk.",
  },
  infringe: {
    word: "infringe",
    primary: "violate",
    alternatives: ["trespass", "intrude", "breach"],
    distractors: ["comply", "respect", "uphold"],
    sentence: "Downloading movies illegally will infringe copyright law.",
  },
  innovation: {
    word: "innovation",
    primary: "breakthrough",
    alternatives: ["novelty", "new invention", "modernization"],
    distractors: ["tradition", "custom", "stagnation"],
    sentence: "Electric cars represent a major innovation in transport.",
  },
  revitalize: {
    word: "revitalize",
    primary: "refresh",
    alternatives: ["restore", "renew", "re-energize"],
    distractors: ["exhaust", "drain", "weaken"],
    sentence: "A cold drink can revitalize tired runners on a hot afternoon.",
  },
  sparse: {
    word: "sparse",
    primary: "scattered",
    alternatives: ["thin", "meager", "scanty"],
    distractors: ["dense", "crowded", "abundant"],
    sentence: "Trees are sparse across the arid desert plains.",
  },
  subjective: {
    word: "subjective",
    primary: "personal",
    alternatives: ["biased", "individual", "opinion-based"],
    distractors: ["objective", "impartial", "factual"],
    sentence: "Choosing a favorite color is a completely subjective decision.",
  },
  succinct: {
    word: "succinct",
    primary: "concise",
    alternatives: ["brief", "to the point", "terse"],
    distractors: ["wordy", "lengthy", "verbose"],
    sentence: "The editor praised her succinct summary of the report.",
  },

  // Chapter 5
  allusion: {
    word: "allusion",
    primary: "reference",
    alternatives: ["hint", "suggestion", "mention"],
    distractors: ["direct quote", "reality", "explanation"],
    sentence: "His poem contained an allusion to the story of Romeo and Juliet.",
  },
  altruistic: {
    word: "altruistic",
    primary: "unselfish",
    alternatives: ["generous", "charitable", "selfless"],
    distractors: ["selfish", "greedy", "egotistical"],
    sentence: "Volunteering at the hospital is a truly altruistic pursuit.",
  },
  appease: {
    word: "appease",
    primary: "pacify",
    alternatives: ["soothe", "calm", "placate"],
    distractors: ["provoke", "infuriate", "antagonize"],
    sentence: "The babysitter gave him a toy to appease the upset child.",
  },
  arbitrary: {
    word: "arbitrary",
    primary: "random",
    alternatives: ["impulsive", "unreasonable", "whimsical"],
    distractors: ["logical", "reasoned", "methodical"],
    sentence: "Picking names out of a hat was an arbitrary selection method.",
  },
  assail: {
    word: "assail",
    primary: "attack",
    alternatives: ["assault", "criticize", "strike"],
    distractors: ["defend", "protect", "shield"],
    sentence: "Political opponents will assail each other during the debate.",
  },
  banal: {
    word: "banal",
    primary: "commonplace",
    alternatives: ["ordinary", "dull", "clichéd", "trite"],
    distractors: ["original", "unique", "thrilling"],
    sentence: "The speech was full of banal clichés about following dreams.",
  },
  euphemism: {
    word: "euphemism",
    primary: "polite term",
    alternatives: ["mild expression", "substitute term"],
    distractors: ["harsh insult", "vulgarity", "direct offense"],
    sentence: "'Senior citizen' is a kind euphemism for an older person.",
  },
  mercenary: {
    word: "mercenary",
    primary: "greedy",
    alternatives: ["money-oriented", "materialistic"],
    distractors: ["generous", "altruistic", "charitable"],
    sentence: "The selfish landlord had a purely mercenary attitude.",
  },
  syndrome: {
    word: "syndrome",
    primary: "symptom pattern",
    alternatives: ["condition", "disorder", "complex"],
    distractors: ["cure", "cause", "single symptom"],
    sentence: "Headaches and dizziness are signs of this common syndrome.",
  },
  taint: {
    word: "taint",
    primary: "corrupt",
    alternatives: ["stain", "dishonor", "spoil"],
    distractors: ["purify", "cleanse", "sanctify"],
    sentence: "Bribery rumors will taint the politician's good reputation.",
  },

  // Chapter 19
  benign: {
    word: "benign",
    primary: "gentle",
    alternatives: ["kindly", "harmless", "kindhearted", "benevolent"],
    distractors: ["hostile", "cruel", "severe", "malignant"],
    sentence: "The doctor gave a benign smile that instantly comforted the nervous patient.",
  },
  blasé: {
    word: "blasé",
    primary: "unexcited",
    alternatives: ["indifferent", "unimpressed", "bored", "apathetic"],
    distractors: ["enthusiastic", "eager", "fascinated", "thrilled"],
    sentence: "After visiting twenty countries, the traveler grew blasé about seeing new cities.",
  },
  blase: {
    word: "blasé",
    primary: "unexcited",
    alternatives: ["indifferent", "unimpressed", "bored", "apathetic"],
    distractors: ["enthusiastic", "eager", "fascinated", "thrilled"],
    sentence: "After visiting twenty countries, the traveler grew blasé about seeing new cities.",
  },
  comprise: {
    word: "comprise",
    primary: "include",
    alternatives: ["contain", "consist of", "encompass"],
    distractors: ["exclude", "separate", "divide", "eliminate"],
    sentence: "The new committee will comprise teachers, students, and parents.",
  },
  condescend: {
    word: "condescend",
    primary: "stoop",
    alternatives: ["deign", "lower oneself", "humble oneself"],
    distractors: ["respect", "admire", "elevate", "praise"],
    sentence: "The proud champion would not condescend to reply to the rude comment.",
  },
  facade: {
    word: "facade",
    primary: "front",
    alternatives: ["exterior", "appearance", "mask", "face"],
    distractors: ["interior", "core", "center", "inside"],
    sentence: "Behind the elegant facade stood a simple brick building.",
  },
  glib: {
    word: "glib",
    primary: "slick",
    alternatives: ["smooth-talking", "persuasive", "smooth"],
    distractors: ["hesitant", "sincere", "awkward", "clumsy"],
    sentence: "The politician offered a glib explanation for the missing funds.",
  },
  haughty: {
    word: "haughty",
    primary: "arrogant",
    alternatives: ["snobbish", "conceited", "proud", "vain"],
    distractors: ["humble", "modest", "meek", "polite"],
    sentence: "Her haughty attitude turned away many potential friends.",
  },
  libel: {
    word: "libel",
    primary: "defamation",
    alternatives: ["slander", "smear", "calumny"],
    distractors: ["praise", "truth", "compliment", "tribute"],
    sentence: "The actress sued the magazine for malicious libel after the false story.",
  },
  pseudonym: {
    word: "pseudonym",
    primary: "pen name",
    alternatives: ["alias", "assumed name", "false name"],
    distractors: ["real name", "birth name", "legal name", "identity"],
    sentence: "The novelist published under a pseudonym to keep her real name private.",
  },
  redundant: {
    word: "redundant",
    primary: "repetitive",
    alternatives: ["superfluous", "wordy", "repetitious", "unneeded"],
    distractors: ["concise", "essential", "necessary", "brief"],
    sentence: "The editor cut out redundant paragraphs from the long article.",
  },

  // Chapter 20
  averse: {
    word: "averse",
    primary: "opposed",
    alternatives: ["reluctant", "unwilling", "disinclined"],
    distractors: ["eager", "willing", "enthusiastic", "inclined"],
    sentence: "Many commuters are averse to driving in heavy snowstorms.",
  },
  detract: {
    word: "detract",
    primary: "take away",
    alternatives: ["diminish", "lessen", "reduce"],
    distractors: ["enhance", "increase", "improve", "boost"],
    sentence: "A few small scratches do not detract from the beauty of the antique table.",
  },
  disdain: {
    word: "disdain",
    primary: "contempt",
    alternatives: ["scorn", "disrespect", "derision"],
    distractors: ["admiration", "respect", "praise", "affection"],
    sentence: "The critic expressed open disdain for the poorly written sequel.",
  },
  divulge: {
    word: "divulge",
    primary: "reveal",
    alternatives: ["disclose", "tell", "expose", "uncover"],
    distractors: ["conceal", "hide", "suppress", "keep secret"],
    sentence: "The journalist refused to divulge the name of her confidential source.",
  },
  elation: {
    word: "elation",
    primary: "joy",
    alternatives: ["euphoria", "delight", "exhilaration", "bliss"],
    distractors: ["misery", "sorrow", "despair", "grief"],
    sentence: "The championship team celebrated their victory with pure elation.",
  },
  endow: {
    word: "endow",
    primary: "bless",
    alternatives: ["provide", "gift", "equip", "grant"],
    distractors: ["deprive", "strip", "deny", "withhold"],
    sentence: "Nature seemed to endow the young singer with extraordinary vocal talent.",
  },
  expulsion: {
    word: "expulsion",
    primary: "removal",
    alternatives: ["banishment", "dismissal", "ouster", "ejection"],
    distractors: ["admission", "inclusion", "welcome", "acceptance"],
    sentence: "Cheating on the final exam resulted in his immediate expulsion from the academy.",
  },
  mortified: {
    word: "mortified",
    primary: "humiliated",
    alternatives: ["embarrassed", "ashamed"],
    distractors: ["proud", "confident", "honored", "flattered"],
    sentence: "The actor was mortified when he forgot his lines in front of the live audience.",
  },
  mortify: {
    word: "mortified",
    primary: "humiliated",
    alternatives: ["embarrassed", "ashamed"],
    distractors: ["proud", "confident", "honored", "flattered"],
    sentence: "The actor was mortified when he forgot his lines in front of the live audience.",
  },
  nullified: {
    word: "nullified",
    primary: "canceled",
    alternatives: ["invalidated", "voided", "annulled", "revoked"],
    distractors: ["approved", "validated", "confirmed", "ratified"],
    sentence: "The judge declared that the unfair contract was officially nullified.",
  },
  nullify: {
    word: "nullified",
    primary: "canceled",
    alternatives: ["invalidated", "voided", "annulled", "revoked"],
    distractors: ["approved", "validated", "confirmed", "ratified"],
    sentence: "The judge declared that the unfair contract was officially nullified.",
  },
  ominous: {
    word: "ominous",
    primary: "threatening",
    alternatives: ["menacing", "foreboding", "sinister"],
    distractors: ["promising", "encouraging", "favorable", "comforting"],
    sentence: "A low, ominous rumble of thunder warned the hikers to seek shelter.",
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

/**
 * Returns a version of the sentence with the target word swapped with its synonym.
 */
export function getSwappedSentence(
  sentence: string,
  targetWord: string,
  synonym: string
): string {
  if (!sentence || !targetWord || !synonym) return sentence;
  const regex = new RegExp(`\\b${targetWord}\\b`, "i");
  return sentence.replace(regex, synonym);
}

/**
 * Splits sentence around the target word so it can be highlighted in JSX.
 */
export function splitSentenceForHighlight(
  sentence: string,
  targetWord: string
): { before: string; match: string; after: string } | null {
  if (!sentence || !targetWord) return null;
  const regex = new RegExp(`(\\b${targetWord}\\b)`, "i");
  const parts = sentence.split(regex);
  if (parts.length >= 3) {
    return {
      before: parts[0],
      match: parts[1],
      after: parts.slice(2).join(""),
    };
  }
  return null;
}
