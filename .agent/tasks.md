# CyFair New Mexico - Development Task List

## Phase 1: Semantic Refactoring & Cleanup ✅ (Completed)
*Objective: Remove leftover code from the previous "Cocktail/Restaurant" template and align the domain with a Basketball Organization.*
- [x] **CSS Class Cleanup (`index.css`)**
    - [x] Renamed `.view-cocktails` -> `.team-info`
    - [x] Renamed `#menu` -> `#roster`
    - [x] Renamed `#art` -> `#sponsorships` (Pivot from Gallery)
    - [x] Fixed `noisy` background image path.
- [x] **Component Renaming**
    - [x] `Menu.jsx` -> `Roster.jsx`
    - [x] `Art.jsx` -> `Sponsorships.jsx` (User requested pivot for Sponsorship content)
- [x] **Content Logic Update**
    - [x] Updated `constants/index.js` (replaced drink lists with `tournamentList`, `trainingList`, `rosterList`).
    - [x] Updated `Navbar` to frame "Sponsor Us" correctly.

## Phase 2: Core Feature Expansion ✅ (Completed)
*Objective: Implement the essential sections for a sports team site.*

- [x] **Roster/Teams Section (`Roster.jsx`)**
    - [x] **Upgrade Layout**: Converted carousel to responsive **Grid Layout** (4→1 cols).
    - [x] **Division Tabs**: Implemented functioning tabs for 17U, 16U, 15U, 14U.
    - [x] **Player Cards**: Enhanced with jersey badge, position, grad year, hover effects.
    - [x] **PlayerModal**: Click-to-expand with full player bio.
    - [x] **Archive**: Saved carousel version to `_archive/RosterCarousel.jsx`.
- [x] **Schedule Section (`Upcoming.jsx`)**
    - [x] **Toggle Tabs**: Switch between Tournaments/Training views.
    - [x] **Table Layout**: DATE | EVENT | LOCATION | TIME/RESULT columns.
    - [x] **Alternating Rows**: Subtle striping for readability.
    - [x] **Next Up Badge**: Gold highlight on upcoming events.
    - [x] **Results Legend**: Win (green) / Loss (red) indicators.
- [x] **Community Section (`Fundraising.jsx`)**
    - [x] Refactored to match Schedule style.
    - [x] **Toggle Tabs**: Events/Gallery views.
    - [x] **Table Layout**: Matching columns and styling.
- [x] **Smooth Scrolling**
    - [x] Implemented **Lenis** for premium scroll feel.
    - [x] Integrated with GSAP ticker.
- [x] **Asset Cleanup**
    - [x] Renamed `drink1-8.webp` → `player1-8.webp`.

## Phase 3: Forms & Functionality ✅ (Completed)
*Objective: Allow users to interact with the organization.*

- [x] **Join / Recruitment Form (`Contact.jsx`)**
    - [x] Created a detailed form (Name, Age, Current School, Height, Position, Parent Contact).
    - [x] Added comprehensive form validation (required fields, email/phone formats).
    - [x] Implemented loading states and success feedback.
- [x] **Navigation Updates**
    - [x] Connect "Sponsor Us" link.
    - [x] Linked "Join Us" buttons in Hero and Navbar to the form.

## Phase 4: Visual Polish & Performance 🎨 (Planned)
- [x] **Dynamic Theming**
    - [x] Implemented CSS variables and ThemeSwitcher.
    - [x] Configured ThemeSwitcher as development-only.

- [ ] **Animations**
    - [ ] Refine GSAP ScrollTriggers for new components.
- [ ] **Responsiveness**
    - [ ] QA all sections on Mobile vs Desktop.
- [ ] **Accessibility Audit**
    - [ ] ARIA labels, keyboard navigation, color contrast.
