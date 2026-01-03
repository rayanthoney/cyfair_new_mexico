"use client";

import { useState, useRef } from "react";
import { rosterByDivision } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PlayerModal from "./PlayerModal.jsx";

const Roster = () => {
  const [activeDivision, setActiveDivision] = useState("17U");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const divisions = Object.keys(rosterByDivision);
  const currentPlayers = rosterByDivision[activeDivision];

  useGSAP(() => {
    // Animate division title
    gsap.fromTo(
      "#roster-title",
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    // Animate player cards with stagger
    gsap.fromTo(
      ".player-card",
      { opacity: 0, x: 100, scale: 0.9 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.2)",
      }
    );
  }, [activeDivision]);

  const handleDivisionChange = (division) => {
    if (division === activeDivision) return;

    // Animate out current cards
    gsap.to(".player-card", {
      opacity: 0,
      x: -50,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.03,
      onComplete: () => {
        setActiveDivision(division);
        if (carouselRef.current) {
          carouselRef.current.scrollLeft = 0;
        }
      },
    });
  };

  const handlePlayerClick = (player) => {
    if (!isDragging) {
      setSelectedPlayer(player);
    }
  };

  const handleCloseModal = () => {
    setSelectedPlayer(null);
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      gsap.to(carouselRef.current, {
        scrollLeft: newScrollLeft,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="roster"
      aria-labelledby="roster-heading"
      className="relative w-full min-h-screen py-20 2xl:px-0 px-5 radial-gradient overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Title */}
        <h2
          id="roster-heading"
          className="text-5xl md:text-7xl font-anton text-center text-yellow mb-12 uppercase tracking-wide"
        >
          <span id="roster-title">Team Roster</span>
        </h2>

        {/* Division Tabs */}
        <nav
          className="flex justify-center gap-4 md:gap-8 mb-16 flex-wrap"
          aria-label="Division Navigation"
          role="tablist"
        >
          {divisions.map((division) => {
            const isActive = division === activeDivision;
            return (
              <button
                key={division}
                onClick={() => handleDivisionChange(division)}
                className={`
                  px-6 md:px-10 py-3 md:py-4 text-2xl md:text-4xl font-anton uppercase
                  border-b-4 transition-all duration-300 ease-out
                  hover:scale-105 hover:text-yellow
                  ${isActive
                    ? "text-yellow border-yellow scale-105"
                    : "text-white/60 border-white/20 hover:border-yellow/50"
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
        </nav>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-black/80 hover:bg-yellow/90 border-2 border-white/20 hover:border-yellow rounded-full flex items-center justify-center transition-all duration-300 group -translate-x-4 md:-translate-x-8"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 bg-black/80 hover:bg-yellow/90 border-2 border-white/20 hover:border-yellow rounded-full flex items-center justify-center transition-all duration-300 group translate-x-4 md:translate-x-8"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Horizontal Scrolling Carousel */}
          <div
            ref={carouselRef}
            id={`${activeDivision}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeDivision}-tab`}
            className={`flex gap-6 overflow-x-auto scroll-smooth pb-8 px-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#fbbf24 transparent',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {currentPlayers.map((player) => (
              <div
                key={player.id}
                className="player-card group flex-shrink-0 w-72 md:w-80"
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
                <div className="relative h-full bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-white/10 hover:border-yellow/50 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-yellow/20">
                  {/* Player Image */}
                  <div className="relative h-80 md:h-96 overflow-hidden">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      draggable="false"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    {/* Jersey Number Badge */}
                    <div className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center bg-yellow rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-xl font-anton text-black">
                        {player.jerseyNumber}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-yellow/0 group-hover:bg-yellow/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
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
                  </div>

                  {/* Player Info */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-2xl md:text-3xl font-anton text-yellow group-hover:text-white transition-colors">
                      {player.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-white/80 text-sm md:text-base font-medium">
                        {player.position}
                      </p>
                      <p className="text-white/60 text-sm">
                        Class of {player.gradYear}
                      </p>
                    </div>
                  </div>

                  {/* Click Indicator */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-yellow font-medium uppercase tracking-wider">
                      Click for details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            <div className="flex items-center gap-1 text-white/40 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Drag or use arrows to scroll</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Empty State (if no players) */}
        {currentPlayers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-xl">
              No players found for {activeDivision}
            </p>
          </div>
        )}
      </div>

      {/* Player Modal */}
      <PlayerModal player={selectedPlayer} onClose={handleCloseModal} />

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        div::-webkit-scrollbar {
          height: 8px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #fbbf24;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #f59e0b;
        }
      `}</style>
    </section>
  );
};

export default Roster;
