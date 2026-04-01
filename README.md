# AVILPRO Website

A premium boutique brand website for AVILPRO, built with Next.js App Router.

## Project Snapshot

- Brand-first landing experience with animated hero and section storytelling
- Dedicated contact page with store map embed and WhatsApp lead capture
- Story section with visual identity elements (Since 2011 / 100% Natural)
- Optimized loading behavior for faster perceived performance
- Mobile-responsive layout across all major sections

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Framer Motion
- CSS Modules
- ESLint

## Routes

- `/` Home page (hero, menu, story, gallery, stores, contact form)
- `/about` Redirect route to `/#about`
- `/contact` Contact and map page

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev    # Start local development
npm run lint   # Run ESLint checks
npm run build  # Create production build
npm run start  # Start production server
```

## Folder Structure

```text
src/
	app/
		page.tsx
		contact/
		about/
	components/
		Navbar.tsx
		Footer.tsx
		LoadingOverlay.tsx
		sections/
			HeroSection.tsx
			MenuSection.tsx
			AboutSection.tsx
			GallerySection.tsx
			StoreSection.tsx
			WhatsAppForm.tsx
public/
	signature-drink.png
	boutique-exterior.png
	avil-pro-removebg-preview.png
```

## Quality Status

- ESLint: passing
- Production build: passing
- Static prerender routes: `/`, `/about`, `/contact`

## Performance Notes

- Loader now runs with shorter timing and skips repeated displays in-session.
- Hero image uses responsive `sizes` and tuned quality for faster delivery.
- `metadataBase` is configured for proper metadata URL resolution.

## Deployment

Build and run production locally:

```bash
npm run build
npm run start
```

Deploy on Vercel, Azure Static Web Apps, or any Node-compatible hosting provider.

## License

Private project for AVILPRO brand website.
