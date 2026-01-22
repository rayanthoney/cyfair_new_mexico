import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Upcoming from "./components/Upcoming.jsx";
import About from "./components/About.jsx";
import Sponsorships from "./components/Sponsorships.jsx";
import Roster from "./components/Roster.jsx";
import Fundraising from "./components/Fundraising.jsx";
import Contact from "./components/Contact.jsx";

// Safely import ThemeSwitcher only if it exists (development only)
const themeSwitcherModules = import.meta.glob("./components/ThemeSwitcher.jsx");
const ThemeSwitcherPromise = themeSwitcherModules["./components/ThemeSwitcher.jsx"];

import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";

const ThemeSwitcher = ThemeSwitcherPromise
  ? lazy(ThemeSwitcherPromise)
  : () => null;

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <Upcoming />
      <About />
      <Sponsorships />
      <Fundraising />
      <Roster />
      <Contact />
      <Suspense fallback={null}>
        <ThemeSwitcher />
      </Suspense>
    </main>
  );
};

export default App;
