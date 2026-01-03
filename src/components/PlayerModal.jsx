"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const PlayerModal = ({ player, onClose }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        if (player) {
            // Animate modal opening
            gsap.fromTo(
                overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(
                contentRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    }, [player]);

    useEffect(() => {
        if (!player) return;

        // Handle escape key
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };

        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleEscape);
        };
    }, [player, onClose]);

    if (!player) return null;

    const handleClose = () => {
        // Animate modal closing
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
        });
        gsap.to(contentRef.current, {
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 0.3,
            ease: "power2.in",
            onComplete: onClose,
        });
    };

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="player-modal-title"
        >
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                ref={contentRef}
                className="relative bg-gradient-to-br from-gray-900 to-black border border-yellow/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-yellow/20 border border-white/10 hover:border-yellow transition-all group"
                    aria-label="Close modal"
                >
                    <svg
                        className="w-6 h-6 text-white group-hover:text-yellow transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Player Image */}
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                    <img
                        src={player.image}
                        alt={player.name}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Jersey Number Badge */}
                    <div className="absolute top-4 left-4 w-16 h-16 flex items-center justify-center bg-yellow rounded-full border-4 border-white shadow-lg">
                        <span className="text-2xl font-anton text-black">
                            {player.jerseyNumber}
                        </span>
                    </div>
                </div>

                {/* Player Info */}
                <div className="p-6 md:p-8 space-y-6">
                    {/* Name and Position */}
                    <div>
                        <h2
                            id="player-modal-title"
                            className="text-4xl md:text-5xl font-anton text-yellow mb-2"
                        >
                            {player.name}
                        </h2>
                        <div className="flex flex-wrap gap-3 text-white/80">
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                                {player.position}
                            </span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                                Class of {player.gradYear}
                            </span>
                            <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                                #{player.jerseyNumber}
                            </span>
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <h3 className="text-xl font-anton text-white mb-3 uppercase tracking-wide">
                            Player Bio
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                            {player.bio}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerModal;
