"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { socials } from "../../constants";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const Contact = () => {
  const [formData, setFormData] = useState({
    playerName: "",
    classYear: "",
    position: "",
    height: "",
    school: "",
    instagram: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    const titleSplit = SplitText.create("#contact h2", { type: "words" });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact",
        start: "top center",
      },
      ease: "power1.inOut",
    });

    timeline
      .from(titleSplit.words, {
        opacity: 0,
        ypercent: 100,
        stagger: 0.02,
      })
      .from(".contact-info > div, form", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
      })
      .to("#f-right-ball", {
        y: "-20",
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        "#f-left-ball",
        {
          y: "-20",
          duration: 1,
          ease: "power1.inOut",
        },
        "<"
      );
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.playerName.trim()) {
      newErrors.playerName = "Player name is required";
    }

    if (!formData.classYear.trim()) {
      newErrors.classYear = "Class year is required";
    } else if (!/^20\d{2}$/.test(formData.classYear)) {
      newErrors.classYear = "Enter a valid year (e.g., 2025)";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.height.trim()) {
      newErrors.height = "Height is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone) || formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          playerName: "",
          classYear: "",
          position: "",
          height: "",
          school: "",
          instagram: "",
          email: "",
          phone: "",
          message: "",
        });
      }, 5000);
    }, 1500);
  };

  const inputClass = (field) =>
    `w-full bg-black/20 border-b px-4 py-3 text-white focus:outline-none transition-colors placeholder:text-white/30 ${errors[field] ? "border-red-500" : "border-white/20 focus:border-yellow"
    }`;

  return (
    <footer
      id="contact"
      className="relative md:mt-20 mt-0 px-4 w-full overflow-hidden radial-gradient min-h-screen py-20"
    >
      <img
        src="/images/webp/footer-right-ball.webp"
        alt=""
        id="f-right-ball"
        className="absolute top-0 right-0 pointer-events-none lg:w-fit w-1/3"
      />
      <img
        src="/images/webp/footer-left-ball.webp"
        alt=""
        id="f-left-ball"
        className="absolute bottom-0 left-0 pointer-events-none lg:w-fit w-1/3"
      />

      <div className="content container mx-auto lg:py-14 2xl:py-32 py-16 flex flex-col justify-between gap-10 min-h-dvh relative z-10">
        <h2 className="text-5xl md:text-7xl font-anton uppercase text-center md:mb-16 mb-10 leading-none lg:text-6xl 2xl:text-8xl md:translate-y-0 translate-y-5">
          Join The <span className="text-yellow">Family</span>
        </h2>

        <div className="grid md:grid-cols-12 gap-10 w-full z-10">
          {/* Left Column: Info */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-10 contact-info text-left">
            <div>
              <h3 className="font-anton uppercase text-white xl:text-base 2xl:text-lg text-base mb-2">
                The Next Level Awaits
              </h3>
              <p className="text-white/80 leading-relaxed max-w-md lg:text-2xl 2xl:text-3xl text-sm">
                We are seeking elite athletes who are deeply committed to hard work and competitive
                excellence. If you are ready to showcase your skills on a national stage, we invite
                you to complete your player profile.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-anton uppercase text-xl">Location</h4>
                  <p className="text-white/60">456, Central Ave. #404, Albuquerque, NM 89102</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-anton uppercase text-xl">Email</h4>
                  <p className="text-white/60">coach@cyfairelitenm.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-yellow hover:text-black transition-all group"
                  aria-label={social.name}
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="group-hover:invert transition-all duration-300 w-6 h-6"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="md:col-span-7">
            {isSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/30 p-10 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-anton text-3xl text-green-400 uppercase">Profile Submitted!</h3>
                <p className="text-white/70">Our recruitment team will review your profile and contact you shortly.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6 backdrop-blur-sm"
              >
                {/* Player Name */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                    Player Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="playerName"
                    value={formData.playerName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={inputClass("playerName")}
                  />
                  {errors.playerName && <p className="text-red-500 text-xs mt-1">{errors.playerName}</p>}
                </div>

                {/* Class / Position / Height */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="classYear"
                      value={formData.classYear}
                      onChange={handleChange}
                      placeholder="2025"
                      className={inputClass("classYear")}
                    />
                    {errors.classYear && <p className="text-red-500 text-xs mt-1">{errors.classYear}</p>}
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                      Position <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="PG/SG"
                      className={inputClass("position")}
                    />
                    {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                      Height <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="5'8&quot;"
                      className={inputClass("height")}
                    />
                    {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
                  </div>
                </div>

                {/* School / Instagram */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                      Current School
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      placeholder="High School Name"
                      className={inputClass("school")}
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@handle"
                      className={inputClass("instagram")}
                    />
                  </div>
                </div>

                {/* Email / Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className={inputClass("phone")}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-widest text-yellow ml-1">
                    Highlights / Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Paste HUDL link or write a message..."
                    className={`${inputClass("message")} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full text-xl py-4 btn-primary flex items-center justify-center gap-2 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Profile"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Cyfair Elite NM. Created by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="copyright-link"
            href="https://meroiticmedia.com"
          >
            Meroitic Media
          </a>
          . All rights reserved. |{" "}
          <a href="#" className="copyright-link">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Contact;
