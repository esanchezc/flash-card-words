# Functional Specification: English Flash Card App PoC

## 1. Problem Statement & User Persona
A language student is practicing and memorizing specific sets of English vocabulary words (usually 10 words at a time per module or week). They need:
- A digital counterpart of their physical 3x5 index cards.
- The ability to focus specifically on an active 10-word bucket (e.g. `Set 1`, `Week 20`) without distraction.
- Clear separation between the English word (front), Spanish hints (revealed on demand), and English definition + examples (back).
- Smooth, responsive mobile experience optimized for iPhone Safari.

## 2. Card Data Model
```typescript
export interface FlashCard {
  id: string;
  bucket: string;          // e.g. "Set 1", "Week 20"
  word: string;            // Target English word
  translation: string;     // Spanish translation
  notes?: string;          // Extra hints / synonyms
  definition: string;      // English definition
  example?: string;        // Contextual sentence
  mastered?: boolean;      // Mastered in current session
  starred?: boolean;       // Marked as difficult / favorite
  isCustom?: boolean;      // Created in-app
}
```

## 3. CSV File Contract (`words.csv` and `public/words.csv`)
Headers: `bucket,word,translation,notes,definition,example`
- Comma-delimited with standard RFC 4180 double-quoting for fields containing commas or quotes.

## 4. User Interaction Flows
1. **Launch & Bucket Select:**
   - App automatically loads `public/words.csv`.
   - Default active bucket is selected (e.g. `Set 1`).
   - Header shows active bucket dropdown, word counter (`Card 1 of 10`), and `+ New Bucket` button.
2. **Reviewing a Card:**
   - **Front:** Displays the word in bold vibrant cyan/blue. Spanish clue is initially hidden behind a "Peek Spanish Clue" button to encourage recall.
   - **Flip:** User taps anywhere on the card (or presses Space / Flip button) to flip to the definition & example.
   - **Grade:**
     - ❌ **Needs Practice:** Keeps card in the current bucket queue to be repeated.
     - ✅ **Got It:** Marks card mastered for this session and advances to next card.
3. **Session Completion:**
   - When all cards in the bucket are mastered, a celebratory confetti animation fires.
   - Summary of performance (e.g. "10/10 Mastered!").
   - Buttons: `Restart Bucket`, `Review Starred Words`, `Switch Bucket`.
4. **Creating a New Bucket:**
   - Modal allows entering Bucket Name (e.g. `Week 20`) and entering/pasting 10 words.
   - Saved locally in browser, instantly available in the bucket selector.
   - "Export CSV" option available to sync back to disk or git.
