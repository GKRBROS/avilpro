<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
## 2026-04-07 — Loader rebuilt to exactly match mouzy.in style
- Pure white `#ffffff` background (mouzy.in uses white, not dark)
- Logo springs in with cubic-bezier bounce (scale + translateY) — same as mouzy.in
- Thin green (#16a34a) spinning arc ring below logo with grey track ring
- Small 10px tracked uppercase "Loading..." label in muted grey
- Phase-based state machine: enter → hold → exit; fully removed from DOM at 2.9s

## 2026-04-07 — Populate with real Avilpro.in content & images
## 2026-04-07 — Populate with real Avilpro.in content & images
- Replaced all Mouzy branding/text with Avilpro content from avilpro.in (fetched via url_context)
- Loader now uses Avilpro logo (`avil-pro-removebg-preview.png`) with correct tagline
- Outlets replaced: Chavakkad, Guruvayoor, Attupurram with real addresses, hours, phone (+91 9497711171)
- Products updated: Avil Milk Speciality, Milk Shakes, Mojito, Falooda, Fruit Salad, Burgers, Sandwiches
- Gallery/Guests section now shows real menu & store photos from avilpro.in/wp-content/uploads/2026/01/
- Franchise section updated with Semi-FOCO model roles, real requirements, real email/phone
- Footer: copyright → "2026 Avilpro", social links → avilpro Facebook/Instagram, contact email updated

## 2026-04-07 — Fix loader & scroll reveal animations
- Rebuilt `LoadingOverlay`: Mouzy logo (white/yellow tinted) + animated progress bar + "Since 1985" label; fades out after bar completes (~1.7s)
- Added `animate-loader-logo` keyframe to `tailwind.config.js` (spring-in scale + translateY)
- Fixed `useScrollReveal`: lowered threshold to `0.08`, added `rootMargin: "0px 0px -60px 0px"` so large sections always trigger
- Wired `LoadingOverlay` into `App.tsx` (was missing from render tree)

## 2026-04-07 — Full interactivity, animations & responsiveness pass
- Rebuilt `Navbar` with working hamburger mobile drawer, scroll-aware active section highlight, smooth-scroll
- Replaced all static carousels (HeroCarousel, ItemsCarousel, OutletsSection, GuestCarousel, ProductCarousel) with fully interactive drag/swipe/auto-scroll carousels
- Added `useScrollReveal` hook (`src/hooks/useScrollReveal.ts`) for scroll-triggered fade/slide-in animations across all sections
- Rewired modals (Partnership, Video, Success) via React Context (`ModalContext` in App.tsx) — overlay close, form validation, loading state, video autoplay
- `FloatingButton` now scroll-aware (shows after 300px), `LoadingOverlay` auto-fades after 1.2s
- All nav `href` converted to internal anchors; section IDs added in `Main.tsx`
- Font Awesome icons replaced with inline SVGs in FooterSocial
</changelog>
