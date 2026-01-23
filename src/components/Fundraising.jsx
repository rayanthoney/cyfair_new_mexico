"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fundraisersList, communityImages } from "../../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Fundraising = () => {
    const [activeTab, setActiveTab] = useState("events");
    const [selectedFlyer, setSelectedFlyer] = useState(null);

    useGSAP(() => {
        // Animate rows/gallery on tab change
        if (activeTab === "events") {
            gsap.fromTo(
                ".event-row",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        } else {
            gsap.fromTo(
                ".gallery-item",
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        }
    }, [activeTab]);

    const handleTabChange = (tab) => {
        if (tab === activeTab) return;

        const selector = activeTab === "events" ? ".event-row" : ".gallery-item";
        gsap.to(selector, {
            opacity: 0,
            y: 10,
            duration: 0.2,
            stagger: 0.02,
            onComplete: () => setActiveTab(tab),
        });
    };

    return (
        <section id="fundraising" className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/images/webp/noise.webp')] opacity-20 pointer-events-none z-0" />

            <div className="container mx-auto px-5 relative z-10 max-w-6xl">
                {/* Section Title */}
                <h2 className="text-5xl md:text-7xl font-anton text-center text-yellow mb-4 uppercase tracking-wide">
                    Community
                </h2>
                <p className="text-center text-white/70 mb-8 max-w-2xl mx-auto">
                    Your support helps maintain our excellence, covering tournament fees, travel, and equipment.
                </p>

                {/* Donate Button */}
                <div className="flex justify-center mb-12">
                    <a
                        href="https://paypal.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-lg px-10 py-3"
                    >
                        Donate Now
                    </a>
                </div>

                {/* Toggle Tabs */}
                <nav className="flex justify-center mb-10" aria-label="Community Navigation" role="tablist">
                    <div className="inline-flex bg-black/50 border border-white/20 rounded-lg p-1">
                        <button
                            onClick={() => handleTabChange("events")}
                            className={`px-4 md:px-10 py-2 md:py-3 text-lg md:text-xl font-anton uppercase rounded-md transition-all duration-300 ${activeTab === "events"
                                ? "bg-yellow text-black"
                                : "text-white/70 hover:text-yellow hover:bg-white/5"
                                }`}
                            role="tab"
                            aria-selected={activeTab === "events"}
                        >
                            Events
                        </button>
                        <button
                            onClick={() => handleTabChange("gallery")}
                            className={`px-4 md:px-10 py-2 md:py-3 text-lg md:text-xl font-anton uppercase rounded-md transition-all duration-300 ${activeTab === "gallery"
                                ? "bg-yellow text-black"
                                : "text-white/70 hover:text-yellow hover:bg-white/5"
                                }`}
                            role="tab"
                            aria-selected={activeTab === "gallery"}
                        >
                            Gallery
                        </button>
                    </div>
                </nav>

                {/* Events Tab Content */}
                {activeTab === "events" && (
                    <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
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
                                Action
                            </div>
                        </div>

                        {/* Table Rows */}
                        <div className="divide-y divide-white/5">
                            {fundraisersList.map((event, index) => (
                                <div
                                    key={index}
                                    className={`event-row grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 transition-colors ${index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"
                                        } hover:bg-white/5 group`}
                                >
                                    {/* Date Column */}
                                    <div className="md:col-span-2 flex flex-col">
                                        <span className="font-anton text-2xl md:text-3xl text-yellow leading-none">
                                            {event.date}
                                        </span>
                                    </div>

                                    {/* Event Column */}
                                    <div className="md:col-span-5">
                                        <h3 className="font-anton text-xl md:text-2xl uppercase text-white tracking-wide group-hover:text-yellow transition-colors">
                                            {event.title}
                                        </h3>
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
                                        <span className="truncate">{event.location}</span>
                                    </div>

                                    {/* Action Column */}
                                    <div className="md:col-span-2 flex justify-start md:justify-end items-center">
                                        <button
                                            onClick={() => event.flyerImage && setSelectedFlyer(event.flyerImage)}
                                            className="text-sm font-anton uppercase tracking-wide text-white border border-white/30 px-4 py-2 rounded hover:bg-yellow hover:text-black hover:border-yellow transition-all"
                                            aria-label={`${event.action} for ${event.title}`}
                                        >
                                            {event.action}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Gallery Tab Content */}
                {activeTab === "gallery" && (
                    <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {communityImages.map((img, index) => (
                                <div
                                    key={index}
                                    className={`gallery-item relative overflow-hidden rounded-xl aspect-[4/3] group ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Community ${index + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-white/50 text-sm mt-6">
                            Showing {communityImages.length} community moments
                        </p>
                    </div>
                )}
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
                            className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-yellow border border-white/20 hover:border-yellow text-white hover:text-black transition-all"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedFlyer}
                            alt="Event Flyer"
                            className="w-full h-auto rounded-xl shadow-2xl border border-white/20"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Fundraising;
