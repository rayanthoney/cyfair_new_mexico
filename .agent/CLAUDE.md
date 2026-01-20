# CYFAIR New Mexico - Project Context for Claude

## Overview
CYFAIR New Mexico is a React-based SPA for a girls' basketball organization. It features a high-performance, visually rich interface with GSAP animations and Tailwind CSS styling.

## Tech Stack
- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS 4 (using `@theme` in CSS)
- **Animation:** GSAP 3.13 (ScrollTrigger, SplitText usage)
- **CMS:** Sanity (Client v7.14)
- **Linting:** ESLint 9

## Commands
```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview build
```

## Project Structure
- `src/components/`: Functional React components (Hero, Roster, etc.)
- `src/constants/index.js`: Centralized content/data
- `src/sanity/`: CMS client configuration
- `src/index.css`: Tailwind `@theme` configuration and global styles
- `public/`: Static assets (fonts, optimized WebP images)

## Key Components
- **Navbar:** Sticky, glassmorphism effect, mobile menu
- **Hero:** Video background, split text animations
- **Roster:** Player carousel with `PlayerModal` integration
- **Sponsorships:** Scroll-pinned masking effects
- **Contact:** Recruitment form (frontend only currently)

## Code Style
- **Tailwind:** Use utility classes for almost all styling.
- **GSAP:** Use `useGSAP` hook for all animations to ensure cleanup.
- **Components:** Functional components with constants for data.
- **Images:** Use WebP format located in `public/images/webp/`.
- **Fonts:** Custom fonts (Anton, Mona Sans) defined in `index.css`.
