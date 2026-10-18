# Flash Card App: Project Memory Bank & Context

## Project Overview
A lightweight, mobile-first, iPhone-optimized English vocabulary flashcard application.
Directly models physical handwritten 3x5 index cards:
- **Front:** Target English word (bold marker accent), peekable Clue button revealing the English definition (*A physical weakness or defect; ailment*).
- **Back:** Spanish translation (*Debilidad física*, `*` *discapacidad*), definition, and example sentence.

## Key Features & Constraints
1. **Buckets & Focus:** Words are grouped into 10-word sets (e.g. `Set 1`, `Week 20`, `Module 1`) to allow the student to focus on their active study set, with a global pool option.
2. **Data Polling & Ingestion:**
   - Source of truth: `public/words.csv` in the app repository.
   - On load, the app polls and parses `public/words.csv`.
   - In-app "+ New Bucket" tool allows the student/tutor to create new 10-word buckets on their phone, persisted in `localStorage`.
   - In-app "Export CSV" allows syncing merged words back to a CSV file.
3. **3D Tactile Card Flip:** Smooth CSS 3D perspective flip (`rotateY(180deg)`), touch & keyboard shortcuts.
4. **Vercel Readiness:** Single Next.js 15+ (App Router) + TypeScript + Tailwind CSS project with zero separate backend servers. Ready to deploy via Vercel with zero config when user is satisfied.
5. **V2 Scope:** Audio pronunciation (Web Speech API) postponed to V2 to ensure fast, zero-hiccup visual delivery.

## Current State
- Next.js 15+ initialized with TypeScript, Tailwind CSS v4, Lucide icons, PapaParse, and Canvas Confetti.
- Initialized Git repository on `main` branch (commits `a229be8` and `9debff0`).
- Pre-populated `words.csv` and `public/words.csv` with `Set 1` containing 10 words, translations, notes, definitions, and examples.
- Client-side English/Spanish localization toggle (`src/lib/i18n.ts`) persisted in `localStorage`.
- Streamlined card front: removed redundant "English Vocabulary" label and renamed clue button to concise "Clue" / "Pista".
- Added two-tab word addition modal: One by One form with staged word list and CSV / Paste parser.
- Fully configured Progressive Web App (PWA) with `manifest.json`, Apple touch icon (`public/apple-touch-icon.png`), and Android maskable icons (192px and 512px).
- Quiz-Style Mode implemented locally: 2 Spanish choices inside the card, green success animation on correct answer, auto-flip to definition on mistake, blended distractor pool (`src/data/distractors.ts`), removal of redundant bottom buttons, and single-synonym selection for multi-word translations to prevent giveaway commas.
- Pre-populated `Set 2` (10 words from textbook: arbitrary, mercenary, allusion, syndrome, euphemism, appease, banal, taint, assail, altruistic) in `words.csv` and `public/words.csv`.
- Sentence Check 1 & 2 Interactive Exercises implemented: segmented mode toggle (`🎴 Flashcards`, `📝 Check 1`, `🔗 Check 2`), tactile struck-through Word Bank (`src/components/WordBank.tsx`), single-blank sentence solver (`src/components/SentenceCheck1.tsx`), and two-blank passage solver (`src/components/SentenceCheck2.tsx`).
- Ingested all 50 vocabulary words across Chapters 1 through 5 from the Townsend Press textbook photos into `words.csv` and `public/words.csv` with authentic handwritten Spanish notes and textbook example sentences.
- Full Sentence Check 1 (50 items total, 10 per chapter) and Sentence Check 2 (25 items total, 5 two-blank pairs per chapter) loaded into `src/data/sentenceChecks.ts`.
- Seamless backward compatibility and migration in `useDeck.ts` and `sentenceChecks.ts` for previous `Set 1` and `Set 2` entries.
- English Synonyms Practice Mode added (`src/data/synonyms.ts`): dedicated 2-choice English synonym quiz (1 correct synonym, 1 distractor), auto-reveal and flip on mistake, prominent synonym banner on card back, independent queue tracking between Meaning (`🎴 Meaning` / `Significado`) and Synonyms (`✨ Synonyms` / `Sinónimos`), and contextual swap sentences on card front & back demonstrating drop-in synonym substitution.
- Mode navigation updated to 4 clean mobile pills: `🎴 Meaning`, `✨ Synonyms`, `📝 Check 1`, `🔗 Check 2`.
- GitHub Remote: `git@github.com:esanchezc/flash-card-words.git` (tracked on `main`).
- Ingested Chapter 19 vocabulary words (benign, blasé, comprise, condescend, facade, glib, haughty, libel, pseudonym, redundant) from textbook photos into `words.csv` and `public/words.csv` with authentic handwritten Spanish notes and textbook example sentences.
- Chapter 19 full Sentence Check 1 (10 items) and Sentence Check 2 (5 two-blank pairs) loaded into `src/data/sentenceChecks.ts`.
- Chapter 19 English Synonyms data added to `src/data/synonyms.ts` with dedicated swap sentences, primary synonyms, and distractors across both `blasé` and `blase`.
- Deployed live to Vercel: https://flashcards-study-english-words.vercel.app
