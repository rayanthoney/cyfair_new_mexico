import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { fundraisersList, communityImages } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Fundraising = () => {
    const [selectedFlyer, setSelectedFlyer] = useState(null);

    useGSAP(() => {
        // Header Animation
        const titleSplit = SplitText.create("#fundraising h2", { type: "words" });

        gsap.from(titleSplit.words, {
            opacity: 0,
            y: 50,
            stagger: 0.05,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: "#fundraising",
                start: "top 60%",
            }
        });

        gsap.from("#donate-btn", {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: "#fundraising",
                start: "top 60%",
            }
        });

        // List Animation
        gsap.from(".fundraiser-row", {
            opacity: 0,
            x: -50,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".fundraisers-list",
                start: "top 75%",
            }
        });

        // Gallery Animation
        gsap.from(".gallery-img", {
            opacity: 0,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.8,
            scrollTrigger: {
                trigger: ".community-gallery",
                start: "top 70%",
            }
        });

    }, []);

    return (
        <section id="fundraising" className="min-h-screen py-24 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/images/webp/noise.webp')] opacity-20 pointer-events-none z-0"></div>

            <div className="container mx-auto px-5 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-24 max-w-4xl mx-auto">
                    <p className="text-yellow text-lg font-bold uppercase tracking-widest mb-4">Community & Giving</p>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-anton uppercase text-center md:mb-16 mb-10 leading-none">
                        Fueling The <span className="text-outline text-yellow stroke-white">Future</span>
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Your support helps maintain our excellence, covering tournament fees, travel, and equipment for the next generation of athletes.
                    </p>
                    <a
                        id="donate-btn"
                        href="https://paypal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-yellow text-black font-anton text-2xl px-12 py-4 uppercase tracking-wider hover:bg-white transition-colors transform hover:-translate-y-1 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                    >
                        Donate Now
                    </a>
                </div>

                {/* Upcoming Events List */}
                <div className="mb-32 fundraisers-list">
                    <h3 className="text-4xl font-anton uppercase text-white mb-10 border-b border-white/20 pb-4">Upcoming Fundraisers</h3>
                    <div className="flex flex-col">
                        {fundraisersList.map((event, index) => (
                            <div key={index} className="fundraiser-row grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-white/10 hover:bg-white/5 transition-colors items-center group">
                                {/* Date */}
                                <div className="md:col-span-2 text-center md:text-left">
                                    <span className="block text-3xl font-anton text-yellow">{event.date}</span>
                                </div>

                                {/* Info */}
                                <div className="md:col-span-7">
                                    <h4 className="text-3xl font-anton uppercase text-white group-hover:text-yellow transition-colors">{event.title}</h4>
                                    <div className="flex items-center gap-2 text-white/60 mt-2 uppercase tracking-wide text-sm font-bold">
                                        <span className="text-yellow">📍</span> {event.location}
                                    </div>
                                </div>

                                {/* Action */}
                                <div className="md:col-span-3 flex justify-center md:justify-end">
                                    <button
                                        onClick={() => event.flyerImage && setSelectedFlyer(event.flyerImage)}
                                        className="text-white border border-white/30 px-6 py-2 uppercase font-bold tracking-widest text-sm hover:bg-white hover:text-black transition-all cursor-pointer"
                                    >
                                        {event.action}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Community Impact Gallery */}
                <div className="community-gallery">
                    <h3 className="text-4xl font-anton uppercase text-white mb-10 border-b border-white/20 pb-4">Community Impact</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {communityImages.map((img, index) => (
                            <div key={index} className={`gallery-img relative overflow-hidden rounded-xl aspect-[4/3] group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                <img
                                    src={img}
                                    alt={`Community ${index}`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Flyer Modal */}
            {selectedFlyer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setSelectedFlyer(null)}
                >
                    <div className="relative max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedFlyer(null)}
                            className="absolute -top-10 right-0 text-white hover:text-yellow text-xl font-bold"
                        >
                            CLOSE [X]
                        </button>
                        <img
                            src={selectedFlyer}
                            alt="Event Flyer"
                            className="w-full h-auto rounded-lg shadow-2xl border border-white/20"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Fundraising;
