# Flash Card App: Project Memory Bank & Context

## Project Overview
A lightweight, mobile-first, iPhone-optimized English vocabulary flashcard application.
Directly models physical handwritten 3x5 index cards:
- **Front:** Target English word (bold marker accent), peekable Spanish translation/notes (*Debilidad física*, `*` *discapacidad*).
- **Back:** English definition and example sentence (*A physical weakness or defect; ailment*).

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
- Fully configured Progressive Web App (PWA) with `manifest.json`, Apple touch icon (`public/apple-touch-icon.png`), and Android maskable icons (192px and 512px).
