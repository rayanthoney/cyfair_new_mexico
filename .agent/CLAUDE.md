# CYFAIR New Mexico - Project Context for Claude

## Overview
CYFAIR New Mexico is a React-based SPA for a girls' basketball organization. It features a high-performance, visually rich interface with GSAP animations and Tailwind CSS styling.

## Tech Stack
- **Framework:** React 19 + Vite 7
- **Styling:** Tailwind CSS 4 (using `@theme` in CSS)
- **Animation:** GSAP 3.13 (ScrollTrigger, SplitText)
- **Scrolling:** Lenis (premium smooth scroll)
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
- `src/components/`: Functional React components
- `src/components/_archive/`: Reusable archived components
- `src/constants/index.js`: Centralized content/data
- `src/sanity/`: CMS client configuration
- `src/index.css`: Tailwind `@theme` config and global styles
- `public/`: Static assets (fonts, WebP images)

## Key Components
- **Navbar:** Sticky, glassmorphism, mobile menu
- **Hero:** Video background, split text animations
- **Upcoming:** Toggle tabs (Tournaments/Training), table layout
- **Roster:** Responsive grid, division tabs (17U-14U), PlayerModal
- **Fundraising:** Toggle tabs (Events/Gallery), table layout
- **Sponsorships:** Scroll-pinned masking effects
- **Contact:** Recruitment form (frontend only)

## Code Style
- **Tailwind:** Use utility classes for styling.
- **GSAP:** Use `useGSAP` hook for animations.
- **Components:** Functional with data from `constants/`.
- **Images:** WebP format in `public/images/webp/`.
- **Fonts:** Anton, Mona Sans defined in `index.css`.

