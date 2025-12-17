# CyFair New Mexico - Development Task List

## Phase 1: Semantic Refactoring & Cleanup (Completed)
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

## Phase 2: Core Feature Expansion (Ready to Start)
*Objective: Implement the essential sections for a sports team site.*

- [ ] **Roster/Teams Section (`Roster.jsx`)**
    - [ ] **Upgrade Layout**: Convert the current slider into a full **Grid Layout** to show whole team at once.
    - [ ] **Division Tabs**: Implement functioning tabs for 17U, 16U, etc.
    - [ ] **Player Cards**: Enhance card design (include Position, Height, Grad Year).
- [ ] **Schedule Section (`Upcoming.jsx`)**
    - [ ] **Rich Table**: Add columns for Date, Location, Time.
    - [ ] **Results View**: Add toggle/section for past game scores.
- [ ] **Gallery Section (New Component)**
    - [ ] **Create `Gallery.jsx`**: Since the old "Art" component became "Sponsorships", we need a *new* dedicated component for photos/highlights.
    - [ ] **Masonry Grid**: Implement a visual grid for game shots.

## Phase 3: Forms & Functionality
*Objective: Allow users to interact with the organization.*

- [ ] **Join / Recruitment Form (`Contact.jsx`)**
    - [ ] Create a detailed form (Name, Age, Current School, Height, Position, Parent Contact).
    - [ ] Add form validation.
- [ ] **Navigation Updates**
    - [x] Connect "Sponsor Us" link.
    - [ ] Link "Join Us" buttons to the form.

## Phase 4: Visual Polish & Performance
- [ ] **Animations**
    - [ ] Refine GSAP ScrollTriggers for the new Roster elements.
- [ ] **Responsiveness**
    - [ ] QA all new sections on Mobile vs Desktop.
