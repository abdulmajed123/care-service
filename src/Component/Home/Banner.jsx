"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    title: "Trusted Care for Your Loved Ones",
    desc: "Service Care connects families with reliable caregivers for babies, elderly, and sick people — ensuring safety and peace of mind.",
    cta: "Book Baby Care",
    link: "/services/baby",
    emoji: "👶",
  },
  {
    title: "Compassionate Elderly Support",
    desc: "Professional and respectful care for senior family members at home.",
    cta: "Book Elderly Care",
    link: "/services/elderly",
    emoji: "👴",
  },
  {
    title: "Quality Home Patient Care",
    desc: "Dedicated caregivers to support recovery and daily needs of sick loved ones.",
    cta: "Book Sick Care",
    link: "/services/sick",
    emoji: "🧑‍⚕️",
  },
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {slide.title}
          </h1>

          <p className="text-lg text-base-content/80">{slide.desc}</p>

          <div className="flex gap-3">
            <Link href={slide.link} className="btn btn-primary">
              {slide.cta}
            </Link>

            <Link href="/services" className="btn btn-outline">
              All Services
            </Link>
          </div>
        </div>

        {/* Visual */}
        <div className="rounded-3xl bg-base-100 shadow-lg h-72 md:h-96 flex items-center justify-center text-7xl">
          {slide.emoji}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-primary scale-110" : "bg-base-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
