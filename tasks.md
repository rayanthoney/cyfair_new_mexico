#### Phase 1: Semantic Refactoring & Cleanup (High Priority)
*Objective: Remove leftover code from the previous "Cocktail/Restaurant" template and align the domain with a Basketball Organization.*
*   [x] **CSS Class Cleanup (`index.css`)**
    *   Rename `.view-cocktails` -> `.team-info`
    *   Rename `#menu` -> `#roster` or `#teams`
    *   Rename `.cocktail-tabs` -> `.division-tabs`
    *   Rename `.cocktail` -> `.player-card`
    *   Rename `.recipe` -> `.stats-card`
*   [x] **Component Renaming**
    *   Rename `Menu.jsx` -> `Roster.jsx`
    *   Rename `Art.jsx` -> `Gallery.jsx`
*   [x] **Content Logic Update**
    *   Update `Hero.jsx` content structure.
    *   Update `Roster.jsx` (old Menu) to handle Player data instead of Drinks.
    - [ ] In `Roster.jsx` (formerly Menu): Replace drink data structures with Player/Team data structures.

## Phase 2: Core Feature Expansion
*Objective: Implement the essential sections for a sports team site.*

- [ ] **Roster/Teams Section (`Roster.jsx`)**
    - [ ] Create a dynamic grid Layout to show players.
    - [ ] Implement tabs for different age groups/divisions (e.g., 17U, 16U, 15U).
    - [ ] Add player details card (Name, #, Position, Height, Grad Year).
- [ ] **Schedule Section (`Upcoming.jsx`)**
    - [ ] Enhance the list view to show Date, Opponent, Location, and Time.
    - [ ] Add a "Results" toggle to show past scores.
- [ ] **Gallery Section (`Gallery.jsx` - formerly `Art.jsx`)**
    - [ ] Convert the single image display into a masonry grid or carousel of game highlights.

## Phase 3: Forms & Functionality
*Objective: Allow users to interact with the organization.*

- [ ] **Join / Recruitment Form (`Contact.jsx`)**
    - [ ] Create a detailed form (Name, Age, Current School, Height, Position, Parent Contact).
    - [ ] Add form validation.
- [ ] **Navigation Updates (`Navbar.jsx`)**
    - [ ] Update links to match new component names (`#teams`, `#schedule`, `#join`).

## Phase 4: Visual Polish & Performance
- [ ] **Animations**
    - [ ] Refine GSAP ScrollTriggers for the new Roster elements.
    - [ ] Add hover effects to player cards.
- [ ] **Responsiveness**
    - [ ] QA all new sections on Mobile vs Desktop.
