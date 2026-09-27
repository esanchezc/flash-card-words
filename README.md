# Flash Card Words 📇

A mobile-first, iPhone-optimized digital flashcard app designed to help students memorize English vocabulary in focused 10-word buckets (modules, weeks, or sets).

Directly modeled after physical handwritten 3x5 index cards:
- **Front:** Target English word (bold marker accent), peekable Spanish translation/notes (*Debilidad física*, `*` *discapacidad*).
- **Back:** English definition and real-world example sentence (*A physical weakness or defect; ailment*).

---

## Features
- **3D Perspective Card Flip:** Tap anywhere on the card to flip between front and back.
- **Active 10-Word Buckets:** Focus on a specific group of 10 words at a time (e.g. `Set 1`, `Week 20`, `Module 1`), or study the Global Pool.
- **CSV Source of Truth (`words.csv`):** The app reads directly from `public/words.csv`.
- **In-App Bucket Creator:** Tap `+ New Bucket` to paste or enter new words on mobile, saved to `localStorage`.
- **Export to CSV:** One-tap export to download or copy the merged CSV anytime.
- **iPhone / Mobile Safari Optimized:** Viewport-fit cover, `100dvh` layout, safe-area-insets, and no double-tap zoom delay.
- **Keyboard Shortcuts (Desktop):**
  - `Space` / `↑` / `↓`: Flip Card
  - `← Left Arrow`: Needs Practice
  - `→ Right Arrow`: Got It!

---

## Getting Started Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the local development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.
   To preview the iPhone experience, open Chrome DevTools and toggle **Device Toolbar (Cmd + Shift + M)**, selecting **iPhone 14/15/16 Pro**.

---

## Deploying to Vercel

When you are ready to deploy:

### Option 1: Vercel CLI
```bash
npx vercel
```

### Option 2: GitHub Integration
1. Push this repository to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/flash-card-words.git
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/dashboard), click **Add New Project** and select this repository.
3. Click **Deploy**. Vercel will automatically build and provide a live production URL with zero configuration.
