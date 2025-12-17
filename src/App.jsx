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

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
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
    </main>
  );
};

export default App;
