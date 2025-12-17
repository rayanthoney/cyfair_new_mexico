import { useGSAP } from "@gsap/react";
import { openingHours, socials } from "../../constants";
import { SplitText } from "gsap/all";
import gsap from "gsap";


const Contact = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create('#contact h2', { type: 'words' });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#contact',
        start: 'top center',
      },
      ease: "power1.inOut"
    })

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        ypercent: 100,
        stagger: 0.02
      })
      .from('.contact-info > div, form', {
        opacity: 0,
        y: 50,
        stagger: 0.2
      })
      .to('#f-right-ball', {
        y: '-50', duration: 1, ease: 'power1.inOut'
      })
      .to('#f-left-ball', {
        y: '-50', duration: 1, ease: 'power1.inOut'
      }, '<')
  })

  return (
    <footer id="contact" className="relative md:mt-20 mt-0 px-4 w-full overflow-hidden radial-gradient min-h-screen py-20">
      <img
        src="/images/webp/footer-right-ball.webp"
        alt="ball-right"
        id="f-right-ball"
        className="absolute top-0 right-0 pointer-events-none hidden lg:block"
      />
      <img
        src="/images/webp/footer-left-ball.webp"
        alt="ball-left"
        id="f-left-ball"
        className="absolute bottom-0 left-0 pointer-events-none lg:w-fit w-1/3"
      />

      <div className="container mx-auto h-full flex flex-col items-center justify-center max-w-7xl">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton uppercase text-center md:mb-16 mb-10 leading-none">
          Join The <span className="text-yellow">Family</span>
        </h2>

        <div className="grid md:grid-cols-12 gap-10 w-full z-10">

          {/* Left Column: Invite & Info */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-10 contact-info text-left">
            <div>
              <h3 className="text-3xl font-anton uppercase mb-4 text-white">The Next Level Awaits</h3>
              <p className="text-lg text-white/80 leading-relaxed max-w-md">We are seeking elite athletes who are deeply committed to hard work and competitive excellence. If you are ready to showcase your skills on a national stage, we invite you to complete your player profile. Connect with our coaching staff today and take the first step toward reaching your full potential.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-anton uppercase text-xl">Location</h4>
                  <p className="text-white/60">456, Central Ave. #404, Albuquerque, NM 89102</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-anton uppercase text-xl">Email</h4>
                  <p className="text-white/60">coach@cyfairelitenm.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="npopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-yellow hover:text-black transition-all group"
                  aria-label={social.name}
                >
                  <img src={social.icon} className="group-hover:invert transition-all duration-300 w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Player Form */}
          <div className="md:col-span-7">
            <form className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6 backdrop-blur-sm">
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Player Name</label>
                <input type="text" placeholder="Full Name" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Class</label>
                  <input type="text" placeholder="202X" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Position</label>
                  <input type="text" placeholder="PG/SG" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Height</label>
                  <input type="text" placeholder="5'8" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Current School</label>
                  <input type="text" placeholder="High School Name" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Instagram</label>
                  <input type="text" placeholder="@handle" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Contact Email</label>
                  <input type="email" placeholder="Email Address" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Phone</label>
                  <input type="tel" placeholder="(555) 000-0000" className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20" />
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">Highlights / Message</label>
                <textarea rows="3" placeholder="Paste HUDL link or write a message..." className="w-full bg-black/20 border-b border-white/20 px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder:text-white/20 resize-none"></textarea>
              </div>

              <button className="w-full bg-black text-yellow border border-yellow font-medium uppercase text-xl py-4 tracking-wider hover:bg-yellow hover:text-black transition-colors">
                Submit Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
