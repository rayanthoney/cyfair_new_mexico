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
    .from('#contact h3, #content p', {
      opacity: 0,
      ypercent: 100,
      stagger: 0.02
    })
    .to('#f-right-ball', {
      y: '-50', duration: 1, ease: 'power1.inOut'
    })
    .to('#f-left-ball', {
      y: '-50', duration: 1, ease: 'power1.inOut'
    }, '<')
  })

  return (
    <footer id="contact" >
      <img
        src="/images/footer-right-ball.png"
        alt="ball-right"
        id="f-right-ball"
      />
      <img
        src="/images/footer-left-ball.png"
        alt="ball-left"
        id="f-left-ball"
      />
      

      <div className="content" >
        <h2>Our Contacts</h2>

        <div>
          <h3>Reach Out</h3>
          <p>456, Central Ave. #404, Albuquerque, NM 89102</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>(505) 777-9311</p>
          <p>hello@cyfairnm.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>

        <div>
            <h3>Socials </h3>

            <div className="flex-center gap-5">
                {socials.map((social) => (
                    <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="npopener noreferrer"
                    aria-label={social.name}
                    >
                        <img src={social.icon} />
                    </a>
                ))}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
