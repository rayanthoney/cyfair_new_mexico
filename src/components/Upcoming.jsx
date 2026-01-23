"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { tournamentList as staticTournaments, trainingList as staticTraining } from "../../constants/index.js";
import { fetchScheduleEvents } from "../sanity/queries.js";

const Upcoming = () => {
  const [activeTab, setActiveTab] = useState("tournaments");
  const [tournamentList, setTournamentList] = useState(staticTournaments);
  const [trainingList, setTrainingList] = useState(staticTraining);

  useEffect(() => {
    Promise.all([
      fetchScheduleEvents("tournament"),
      fetchScheduleEvents("training"),
    ])
      .then(([sanityTournaments, sanityTraining]) => {
        console.log("Sanity tournaments:", sanityTournaments);
        console.log("Sanity training:", sanityTraining);
        // Merge Sanity data with static data
        if (sanityTournaments.length > 0) {
          setTournamentList([...staticTournaments, ...sanityTournaments]);
        }
        if (sanityTraining.length > 0) {
          setTrainingList([...staticTraining, ...sanityTraining]);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch from Sanity, using static data:", err);
      });
  }, []);

  const currentList = activeTab === "tournaments" ? tournamentList : trainingList;

  useGSAP(() => {
    // Parallax animations
    const _parallaxTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#upcoming",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    // Animate rows on tab change
    gsap.fromTo(
      ".schedule-row",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
    );
  }, [activeTab]);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    gsap.to(".schedule-row", {
      opacity: 0,
      x: 20,
      duration: 0.2,
      stagger: 0.02,
      onComplete: () => setActiveTab(tab),
    });
  };

  // Find the first upcoming event (no result)
  const upcomingIndex = currentList.findIndex((item) => !item.result);

  return (
    <section id="upcoming" className="relative min-h-dvh w-full overflow-hidden pt-32 pb-20">

      <div className="container mx-auto relative z-10 max-w-6xl pt-20 2xl:px-0 px-5">
        {/* Section Title */}
        <h2 className="text-5xl md:text-7xl font-anton text-center text-yellow mb-8 uppercase tracking-wide">
          Schedule
        </h2>

        {/* Toggle Tabs */}
        <nav className="flex justify-center mb-10" aria-label="Schedule Navigation" role="tablist">
          <div className="inline-flex bg-black/50 border border-white/20 rounded-lg p-1">
            <button
              onClick={() => handleTabChange("tournaments")}
              className={`px-4 md:px-10 py-2 md:py-3 text-lg md:text-xl font-anton uppercase rounded-md transition-all duration-300 ${activeTab === "tournaments"
                ? "bg-yellow text-black"
                : "text-white/70 hover:text-yellow hover:bg-white/5"
                }`}
              role="tab"
              aria-selected={activeTab === "tournaments"}
              aria-controls="schedule-content"
            >
              Tournaments
            </button>
            <button
              onClick={() => handleTabChange("training")}
              className={`px-4 md:px-10 py-2 md:py-3 text-lg md:text-xl font-anton uppercase rounded-md transition-all duration-300 ${activeTab === "training"
                ? "bg-yellow text-black"
                : "text-white/70 hover:text-yellow hover:bg-white/5"
                }`}
              role="tab"
              aria-selected={activeTab === "training"}
              aria-controls="schedule-content"
            >
              Training
            </button>
          </div>
        </nav>

        {/* Table Container */}
        <div id="schedule-content" role="tabpanel" className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 border-b border-white/10">
            <div className="col-span-2 text-yellow font-anton text-sm uppercase tracking-wider">
              Date
            </div>
            <div className="col-span-5 text-yellow font-anton text-sm uppercase tracking-wider">
              Event
            </div>
            <div className="col-span-3 text-yellow font-anton text-sm uppercase tracking-wider">
              Location
            </div>
            <div className="col-span-2 text-yellow font-anton text-sm uppercase tracking-wider text-right">
              {activeTab === "tournaments" ? "Time / Result" : "Time"}
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-white/5">
            {currentList.map((item, index) => {
              const isUpcoming = index === upcomingIndex;
              const isPast = item.result;

              return (
                <div
                  key={index}
                  className={`schedule-row grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 transition-colors ${index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                    } ${isUpcoming ? "border-l-4 border-l-yellow bg-yellow/5" : ""} ${isPast ? "opacity-60" : ""
                    } hover:bg-white/5`}
                >
                  {/* Date Column */}
                  <div className="md:col-span-2 flex flex-col">
                    <span className="font-anton text-2xl md:text-3xl text-white leading-none">
                      {item.date.split(" ")[0]}
                    </span>
                    <span className="text-xs font-bold text-yellow uppercase tracking-widest">
                      {item.date.split(" ").slice(1).join(" ")}
                    </span>
                  </div>

                  {/* Event Column */}
                  <div className="md:col-span-5">
                    <h3 className="font-anton text-xl md:text-2xl uppercase text-white tracking-wide">
                      {item.name}
                    </h3>
                    {isUpcoming && (
                      <span className="inline-block mt-1 text-xs bg-yellow text-black px-2 py-0.5 rounded font-bold uppercase">
                        Next Up
                      </span>
                    )}
                  </div>

                  {/* Location Column */}
                  <div className="md:col-span-3 flex items-center gap-2 text-white/60 text-sm font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-yellow flex-shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="truncate">{item.location}</span>
                  </div>

                  {/* Time/Result Column */}
                  <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                    {item.result ? (
                      <span
                        className={`text-lg md:text-xl font-anton tracking-wide ${item.result.includes("W")
                          ? "text-green-400"
                          : item.result.includes("L")
                            ? "text-red-400"
                            : "text-white"
                          }`}
                      >
                        {item.result}
                      </span>
                    ) : (
                      <span className="text-lg md:text-xl font-anton text-white/80 tracking-wide">
                        {item.time || "TBA"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow rounded-sm" />
            <span>Next Event</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">W</span>
            <span>Win</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-400 font-bold">L</span>
            <span>Loss</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
