import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { tournamentList, trainingList } from "../../constants/index.js";

const Upcoming = () => {
  useGSAP(() => {
    const parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#upcoming",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    parallaxTimeline
      .from("#c-left-ball", {
        x: -100,
        y: 100,
      })
      .from("#c-right-ball", {
        x: 100,
        y: 100,
      });
  });

  return (
    <section id="upcoming">
      <div className="container mx-auto relative z-10 px-5 py-24">
        <div className="flex flex-col gap-20">

          {/* Tournaments Section */}
          <div className="w-full">
            <h2 className="text-4xl font-anton mb-10 text-yellow uppercase">Upcoming Tournaments</h2>
            <div className="flex flex-col gap-0 border-t border-white/20">
              {tournamentList.map(({ name, location, date, time, result }, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-white/10 hover:bg-white/5 transition-colors items-center">

                  {/* Date Column */}
                  <div className="md:col-span-2 flex flex-col items-start md:items-center justify-center">
                    <span className="font-anton text-3xl md:text-4xl leading-none text-white">{date.split(' ')[0]}</span>
                    <span className="text-sm font-bold text-yellow uppercase tracking-widest">{date.split(' ').slice(1).join(' ')}</span>
                  </div>

                  {/* Info Column */}
                  <div className="md:col-span-8 space-y-2">
                    <h3 className="font-anton text-2xl md:text-4xl uppercase text-white tracking-wide">{name}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm md:text-base font-medium uppercase tracking-wider">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {location}
                    </div>
                  </div>

                  {/* Time/Result Column */}
                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    {result ? (
                      <span className={`text-xl font-anton tracking-wide ${result.includes('W') ? 'text-green-400' : result.includes('L') ? 'text-red-400' : 'text-white'}`}>
                        {result}
                      </span>
                    ) : (
                      <span className="text-xl font-anton text-white tracking-wide">{time}</span>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Training Section */}
          <div className="w-full pb-20">
            <h2 className="text-4xl font-anton mb-10 text-yellow uppercase">Practice & Training</h2>
            <div className="flex flex-col gap-0 border-t border-white/20">
              {trainingList.map(({ name, location, date }, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-white/10 hover:bg-white/5 transition-colors items-center">

                  {/* Date Column */}
                  <div className="md:col-span-2 flex flex-col items-start md:items-center justify-center">
                    <span className="font-anton text-3xl text-white">{date.split(' ')[0]}</span>
                    <span className="text-xs font-bold text-yellow uppercase tracking-widest">{date.split(' ').slice(1).join(' ')}</span>
                  </div>

                  {/* Info Column */}
                  <div className="md:col-span-8 space-y-1">
                    <h3 className="font-anton text-2xl uppercase text-white tracking-wide">{name}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm font-medium uppercase tracking-wider">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {location}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Upcoming;
