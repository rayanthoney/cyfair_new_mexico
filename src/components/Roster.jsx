"use client";

import { useState, useEffect } from "react";
import { rosterByDivision as staticRoster } from "../../constants/index.js";
import { fetchPlayers } from "../sanity/queries.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PlayerModal from "./PlayerModal.jsx";

const Roster = () => {
  const [rosterByDivision, setRosterByDivision] = useState(staticRoster);
  const [activeDivision, setActiveDivision] = useState("17U");
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    console.log("🚀 Roster useEffect running - fetching from Sanity...");
    fetchPlayers()
      .then((sanityData) => {
        console.log("✅ Sanity players fetched:", sanityData);
        console.log("📊 Divisions from Sanity:", Object.keys(sanityData));
        // Merge Sanity data with static data
        const merged = { ...staticRoster };
        for (const division of Object.keys(sanityData)) {
          if (merged[division]) {
            // Add Sanity players to existing division
            merged[division] = [...merged[division], ...sanityData[division]];
            console.log(`➕ Added ${sanityData[division].length} Sanity players to ${division}`);
          } else {
            // New division from Sanity
            merged[division] = sanityData[division];
            console.log(`🆕 Created new division ${division} with ${sanityData[division].length} players`);
          }
        }
        console.log("📦 Final merged roster:", merged);
        setRosterByDivision(merged);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch from Sanity:", err);
      });
  }, []);

  const divisions = Object.keys(rosterByDivision);
  const currentPlayers = rosterByDivision[activeDivision] || [];

  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      "#roster-title",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Staggered grid animation
    gsap.fromTo(
      ".player-card",
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [activeDivision]);

  const handleDivisionChange = (division) => {
    if (division === activeDivision) return;

    // Animate out current cards
    gsap.to(".player-card", {
      opacity: 0,
      y: -20,
      scale: 0.95,
      duration: 0.25,
      stagger: 0.02,
      onComplete: () => {
        setActiveDivision(division);
      },
    });
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  return (
    <section
      id="roster"
      aria-labelledby="roster-heading"
      className="relative w-full min-h-screen pt-32 pb-20 2xl:px-0 px-5 radial-gradient overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        {/* Section Title */}
        <h2
          id="roster-heading"
          className="text-5xl md:text-7xl font-anton text-center text-yellow mb-8 uppercase tracking-wide"
        >
          <span id="roster-title">Roster</span>
        </h2>

        {/* Division Tabs */}
        <nav
          className="flex justify-center mb-12"
          aria-label="Division Navigation"
          role="tablist"
        >
          <div className="inline-flex flex-wrap justify-center gap-2 bg-black/50 border border-white/20 rounded-lg p-1">
            {divisions.map((division) => {
              const isActive = division === activeDivision;
              return (
                <button
                  key={division}
                  onClick={() => handleDivisionChange(division)}
                  className={`
                    px-4 md:px-8 py-2 md:py-3 text-lg md:text-xl font-anton uppercase
                    rounded-md transition-all duration-300
                    ${isActive
                      ? "bg-yellow text-black"
                      : "text-white/70 hover:text-yellow hover:bg-white/5"
                    }
                  `}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${division}-panel`}
                >
                  {division}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Player Grid */}
        <div
          id={`${activeDivision}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeDivision}-tab`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {currentPlayers.map((player) => (
            <div
              key={player.id}
              className="player-card group"
              onClick={() => handlePlayerClick(player)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePlayerClick(player);
                }
              }}
              aria-label={`View details for ${player.name}`}
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black rounded-xl overflow-hidden border border-white/10 hover:border-yellow/50 transition-all duration-300 cursor-pointer group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-yellow/10">
                {/* Player Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Jersey Number Badge */}
                  <div className="absolute top-3 left-3 w-12 h-12 flex items-center justify-center bg-yellow rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-xl font-anton text-black">
                      {player.jerseyNumber}
                    </span>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-yellow/90 flex items-center justify-center">
                      <svg
                        className="w-7 h-7 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Player Info */}
                <div className="p-4 space-y-1">
                  <h3 className="text-xl md:text-2xl font-anton text-yellow group-hover:text-white transition-colors truncate">
                    {player.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm font-medium uppercase tracking-wide">
                      {player.position}
                    </span>
                    <span className="text-white/50 text-xs px-2 py-1 bg-white/10 rounded-full">
                      Class of {player.gradYear}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentPlayers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-xl">
              No players found for {activeDivision}
            </p>
          </div>
        )}

        {/* Player Count */}
        <div className="text-center mt-10">
          <p className="text-white/40 text-sm">
            Showing {currentPlayers.length} player{currentPlayers.length !== 1 ? 's' : ''} in {activeDivision}
          </p>
        </div>
      </div>

      {/* Player Modal */}
      <PlayerModal player={selectedPlayer} onClose={handleCloseModal} />
    </section>
  );
};

export default Roster;
