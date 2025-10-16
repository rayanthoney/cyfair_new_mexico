import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "words, chars" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-ball", { y: 200 }, 0)
      .to(".left-ball", { y: -200 }, 0 )
      .to(".arrow", { y: 100 }, 0 );

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="home" className="noisy">
        <h1 className="title">CYFAIR</h1>

        <img
          src="/images/hero-left-ball.png"
          alt="left-ball"
          className="left-ball"
        />
        <img
          src="/images/hero-right-ball.png"
          alt="right-ball"
          className="right-ball"
        />

        <div className="body">
          <img src="/images/arrow.png" alt="arrow" className="arrow" />
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Mental Toughness = Greatness.</p>
              <p className="subtitle">
                New Mexico <br /> Girls Basketball
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                CyFair is a Nike basketball affiliate. Our girl's program is a
                year-round basketball organization in the state of New Mexico.
              </p>
              <a href="#Join">Join Us</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
