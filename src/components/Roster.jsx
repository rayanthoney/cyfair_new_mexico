"use client";

import { useRef, useState } from "react";
import { rosterList } from "../../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Roster = () => {
  const contentRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useGSAP(() => {
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    gsap.fromTo(
      ".roster-display img",
      { opacity: 0, xPercent: -100 },
      {
        xPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
      }
    );
    gsap.fromTo(
      ".player-details h2",
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 100,
        ease: "power1.inOut",
      }
    );
    gsap.fromTo(
      ".player-details p",
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 100,
        ease: "power1.inOut",
      }
    );
  }, [currentIndex]);

  const totalPlayers = rosterList.length;

  const goToSlide = (index) => {
    const newIndex = (index + totalPlayers) % totalPlayers;

    setCurrentIndex(newIndex);
  };

  const getPlayerAt = (indexOffset) => {
    return rosterList[
      (currentIndex + indexOffset + totalPlayers) % totalPlayers
    ];
  };

  const currentPlayer = getPlayerAt(0);
  const prevPlayer = getPlayerAt(-1);
  const nextPlayer = getPlayerAt(1);

  return (
    <section id="roster" aria-labelledby="roster-heading" className="relative w-full md:mt-40 mt-0 2xl:px-0 px-5 py-20 radial-gradient">
      {/* <img
        src="/images/webp/slider-left-ball.webp"
        alt="left-ball"
        id="m-left-ball"
        className="object-contain absolute -bottom-20 left-0 md:w-fit w-1/3"
      />
      <img
        src="/images/webp/slider-right-ball.webp"
        alt="right-ball"
        id="m-right-ball"
        className="object-contain absolute -top-40 right-0 md:w-fit w-1/4"
      /> */}

      <h2 id="roster-heading" className="sr-only">
        Team Roster
      </h2>

      <nav className="division-tabs grid md:grid-cols-4 grid-cols-2 md:gap-20 gap-10 sm:mb-32 mb-20 relative z-10 md:max-w-6xl md:mx-auto" aria-label="Roster Navigation">
        {rosterList.map((player, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={player.id}
              className={`touch-target px-4 md:text-3xl text-xl pb-2 cursor-pointer hover:text-yellow hover:border-yellow border-b-1 transition-colors font-anton ${isActive
                ? "text-white border-white"
                : "text-white/50 border-white/50"
                }`}
              onClick={() => goToSlide(index)}
            >
              {player.name}
            </button>
          );
        })}
      </nav>

      <div className="content flex flex-col justify-between items-center container mx-auto relative">
        <div className="arrows flex items-center justify-between w-full absolute">
          <button
            className="text-left touch-target group text-white hover:text-yellow cursor-pointer transition-colors max-w-36"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span className="group-hover:text-yellow transition-colors text-3xl font-anton leading-none hidden md:block">{prevPlayer.name}</span>
            <img
              src="/images/webp/right-arrow.webp"
              alt="Previous Player"
              className="ml-2 group-hover:scale-110 transition-transform"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left touch-target group text-white hover:text-yellow cursor-pointer transition-colors max-w-36"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span className="group-hover:text-yellow transition-colors text-3xl font-anton leading-none hidden md:block">{nextPlayer.name}</span>
            <img
              src="/images/webp/left-arrow.webp"
              alt="Next Player"
              className="ml-2 group-hover:scale-110 transition-transform"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="roster-display flex-center mt-10">
          <img src={currentPlayer.image} className="object-contain h-[60vh]" />
        </div>

        <div className="player-details flex max-md:flex-col gap-10 md:items-center justify-between w-full lg:absolute bottom-0">
          <div ref={contentRef} className="info space-y-4 lg:translate-y-20">
            <p>Meet Player:</p>
            <p id="title" className="font-anton md:text-6xl text-3xl text-yellow max-w-40">{currentPlayer.name}</p>
          </div>

          <div className="details space-y-5 md:max-w-md text-left">
            <h2 className="md:text-5xl text-3xl font-serif">{currentPlayer.title}</h2>
            <p className="md:text-lg pe-5">{currentPlayer.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roster;
