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
      delay: 0.5,
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
      .to(".right-ball", { y: 50 }, 0)
      .to(".left-ball", { y: -50 }, 0)
      .to(".arrow", { y: 100 }, 0);

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

    if (videoRef.current) {
      if (videoRef.current.readyState >= 1) {
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration,
        });
      } else {
        videoRef.current.onloadedmetadata = () => {
          tl.to(videoRef.current, {
            currentTime: videoRef.current.duration,
          });
        };
      }
    }
  }, [isMobile]);

  return (
    <>
      <section id="home" className="relative z-10 min-h-dvh w-full border border-transparent">
        <h1 className="title md:mt-32 mt-40 text-8xl md:text-[20vw] leading-none text-center font-anton">CYFAIR</h1>
        <img
          src="/images/webp/hero-left-ball.webp"
          alt="left-ball"
          className="left-ball absolute bottom-0 left-0 pointer-events-none lg:w-fit w-1/3"
        />
        <img
          src="/images/webp/hero-right-ball.webp"
          alt="right-ball"
          className="right-ball absolute top-0 right-0 pointer-events-none lg:w-fit w-1/3"
        />

        <div className="body container mx-auto absolute left-1/2 -translate-x-1/2 lg:bottom-20 top-auto md:top-[30vh] flex justify-between items-end px-5">
          <img src="/images/webp/arrow.webp" alt="arrow" className="arrow" />
          <div className="content flex lg:flex-row flex-col w-full gap-10 justify-between items-center lg:items-end mx-auto">
            <div className="space-y-5 block">
              <p className="text-xl md:text-base font-medium">Mental Toughness = Greatness.</p>
              <p className="subtitle text-4xl md:text-6xl font-anton text-yellow max-w-xl">
                New Mexico <br /> Girls Basketball
              </p>
            </div>

            <div className="team-info space-y-5 text-lg lg:max-w-2xs md:max-w-xs w-full">
              <p className="subtitle text-center lg:text-left leading-relaxed text-balance">
                CYFAIR New Mexico is a proud Nike Basketball affiliate. As a premier year-round girls' basketball organization, we are dedicated to providing elite training and competitive opportunities throughout the state of New Mexico.
              </p>
              <a className="font-semibold opacity-80 lg:text-left text-center hover:text-yellow" href="#contact">Join Now</a>
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
          preload="metadata"
        />
      </div>
    </>
  );
};

export default Hero;
