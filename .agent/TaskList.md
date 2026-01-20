# UI Polish & Cleanup Task List

This document tracks the tasks required to "clean and polish" the user interface of the Cyfair New Mexico application. It is intended to be a living document, edited as we progress.

## 1. Global Styles & Typography
- [x] **Font Verification**: Ensure "Modern Negra" and "Anton" fonts load correctly on all devices and fallback gracefully.
- [x] **Color Palette**: rigorous check of `text-yellow` and `bg-black` consistency. Ensure sufficient contrast ratios for accessibility.
- [x] **Scroll Behavior**: Verify smooth scrolling is working globally (`scroll-behavior: smooth` is in index.css, need to ensure it doesn't conflict with GSAP ScrollTrigger).

## 2. Navigation (Navbar)
- [x] **Mobile Menu**: Ensure the mobile navigation (hamburger menu) opens/closes smoothly and is accessible.
- [x] **Active States**: Add visual indicators for the current section/page (e.g., underlining "Home" when on Home).
- [x] **Glassmorphism**: Refine the background blur effect on the fixed navbar to ensure text readability over the hero video/images.

## 3. Hero Section Polish
- [x] **Mobile Visibility**: The tagline "Mental Toughness = Greatness" is currently `hidden md:block`. Re-evaluate if this should be visible on mobile (perhaps smaller text).
- [x] **Video Responsive Check**: Ensure the background video covers the area correctly on ultra-wide and very narrow screens without awkward cropping.
- [x] **Animation Timing**: Fine-tune GSAP entrance animations (SplitText) to not delay specific important CTAs like "Join Now".

## 4. Component Refinements
### Buttons & Links
- [x] **Hover Effects**: Standardize hover transitions for all buttons (e.g., `hover:text-yellow`).
- [x] **Touch Targets**: Ensure all clickable elements have a minimum size of 44x44px for mobile users.

### Cards & Grids
- [x] **Spacing Consistency**: Check margins between section headers and content grids (e.g., in `#upcoming` and `#roster`).
- [x] **Image Loading**: Ensure all player profile images and sponsor logos have proper `alt` text and loading placeholders.

## 5. CSS & Code Cleanup
- [x] **Refactor `index.css`**: Review the `#home`, `#sponsorships`, etc., blocks. Check if any styles can be moved to standard Tailwind utility classes in JSX to reduce custom CSS size.
- [x] **Remove Unused Styles**: Check for any orphaned classes or `@apply` directives that aren't used.
- [x] **Error Resolution**: Fix any "Unknown at rule" warnings for `@theme` or `@utility` if the IDE flagging is incorrect or if configuration is missing.

## 6. Specific "Wow" Factors
- [ ] **Micro-interactions**: Add subtle scale/lift effects on cards when hovered.
- [ ] **Page Transitions**: (Optional) Consider smooth page transitions if moving between routes.
- [ ] **Scroll Progress**: (Optional) Add a subtle reading/scroll progress bar or indicator.
