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
    <section id="roster" aria-labelledby="roster-heading">
      {/* <img
        src="/images/webp/slider-left-ball.webp"
        alt="left-ball"
        id="m-left-ball"
      />
      <img
        src="/images/webp/slider-right-ball.webp"
        alt="right-ball"
        id="m-right-ball"
      /> */}

      <h2 id="roster-heading" className="sr-only">
        Team Roster
      </h2>

      <nav className="division-tabs" aria-label="Roster Navigation">
        {rosterList.map((player, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={player.id}
              className={`${isActive
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

      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevPlayer.name}</span>
            <img
              src="/images/webp/right-arrow.webp"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextPlayer.name}</span>
            <img
              src="/images/webp/left-arrow.webp"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="roster-display">
          <img src={currentPlayer.image} className="object-contain" />
        </div>

        <div className="player-details">
          <div ref={contentRef} className="info">
            <p>Meet Player:</p>
            <p id="title">{currentPlayer.name}</p>
          </div>

          <div className="details">
            <h2>{currentPlayer.title}</h2>
            <p>{currentPlayer.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roster;
