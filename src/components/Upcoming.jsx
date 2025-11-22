import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cocktailLists, mockTailLists } from "../../constants/index.js";

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
        x:  -100,
        y: 100,
      })
      .from("#c-right-ball", {
        x: 100,
        y: 100,
      });
  });

  return (
    <section id="upcoming" className="noisy">
      <img src="/images/webp/upcoming-left-ball.webp" alt="l-ball" id="c-left-ball" />
      <img src="/images/webp/upcoming-right-ball.webp" alt="r-ball" id="c-right-ball" />

      <div className="list">
        <div className="popular">
          <h2>Upcoming Tournaments: </h2>

          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Practice and Training: </h2>

          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>- {price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Upcoming;
