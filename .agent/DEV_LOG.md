# CYFAIR New Mexico - Development Log

## [2026-01-20] Context Initialization
- **Refactoring**: Renamed `/docs` directory to `.agent` to centralize agentic workflow files.
- **Documentation**: 
    - Updated `GEMINI.md` to reflect current project state (added Sanity CMS, PlayerModal).
    - Created `CLAUDE.md` to provide a concise context summary for Claude-based workflows.
    - Moved `GEMINI.md`, `CLAUDE.md`, and `tasks.md` into the `.agent` directory.
- **Policy**: All application documents will strictly reside in the `.agent` folder.
- **Assets**: Renamed `drink1-8.webp` to `player1-8.webp` in `public/images/webp/` and updated `constants/index.js` references to match conventions.
- **Features**: Implemented **Lenis** smooth scrolling for a premium feel and GSAP integration. Removed native `scroll-behavior: smooth` to prevent conflicts.
- **Archive**: Saved current `Roster.jsx` (carousel version) to `src/components/_archive/RosterCarousel.jsx` for future reuse before grid refactor.
- **Roster Upgrade**: Replaced carousel with responsive **Grid Layout** (4 cols desktop → 1 col mobile), compact segmented tabs, and enhanced player cards with hover effects.
- **Schedule Upgrade**: Added toggle tabs (Tournaments/Training), table headers, alternating row colors, "Next Up" badge, and legend for wins/losses.
- **Community Refactor**: Refactored to match Schedule style with toggle tabs (Events/Gallery), table headers, alternating rows, and consistent styling.
