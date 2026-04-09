<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
## Project: Mouzy (Avil Milk brand landing page)
- Stack: React 18 + TypeScript + Tailwind CSS + Vite
- Font: `font-foundersgrotesk` (custom, referenced in `tailwind.config.js`)
- Path alias: `@/` maps to `./src/` (configured in vite)
- Design palette: green-700 (#15803d) + yellow-400 (#facc15) + black + white
- All carousels use manual offset state + IntersectionObserver pattern (no external lib)
- Modal state lives in `ModalContext` exported from `src/App.tsx` — import via `useModal()`
- ScrollReveal hook: `src/hooks/useScrollReveal.ts` — returns `{ ref, isVisible }`
- Section IDs for smooth scroll: home, about, items, outlets, gallery, contact (set in Main.tsx wrappers)
- Carousel pattern: duplicate slides array for infinite feel, use `offset % (count * itemWidth)`
</coder>
