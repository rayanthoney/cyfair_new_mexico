# Component Archive

This folder contains archived component implementations that can be reused in future projects or swapped in as alternative layouts.

## Available Components

### RosterCarousel.jsx
**Description:** A horizontal scrolling carousel for displaying team roster with division tabs.

**Features:**
- Division tab navigation (17U, 16U, 15U, 14U)
- Drag-to-scroll carousel with arrow navigation
- Animated player cards with GSAP stagger effects
- PlayerModal integration for detailed player bios
- Jersey number badges, position, and graduation year display

**Usage:**
```jsx
import RosterCarousel from './_archive/RosterCarousel.jsx';

// In your App.jsx, replace:
// import Roster from './components/Roster.jsx';
// with:
// import Roster from './components/_archive/RosterCarousel.jsx';
```

**Dependencies:**
- `rosterByDivision` from `constants/index.js`
- `PlayerModal` component
- GSAP with `@gsap/react`
