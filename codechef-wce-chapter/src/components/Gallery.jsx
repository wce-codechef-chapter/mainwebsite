import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import WCPC from "../assets/gallery/wcpc.jpeg";
import Bootcamp from "../assets/gallery/bootcamp.png";
import GIM from "../assets/gallery/gim.jpeg";
import Coffee from "../assets/gallery/coffee.png";
import Contest from "../assets/gallery/contest.jpeg";


const GallerySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, title: "WCPC Prize Distribution", image: WCPC },
    { id: 2, title: "Bootcamp Hands-on Session", image: Bootcamp },
    { id: 3, title: "GIM Inauguration", image: GIM },
    { id: 4, title: "Coffee With Chef Speaker", image: Coffee },
    { id: 5, title: "Coding Contest Arena", image: Contest },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">

      {/* Slide Image */}
      <img
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Hover Overlay Title */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <h3 className="text-2xl font-bold text-white">{slides[currentSlide].title}</h3>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white border border-white/10 hover:bg-blue-600 transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white border border-white/10 hover:bg-blue-600 transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Bottom Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${currentSlide === idx ? 'w-8 bg-blue-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

    </div>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-slate-950 border-b border-slate-900">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Event Gallery"
          subtitle="Capturing the moments of competition, learning, and achievement."
        />
        <GallerySlider />
      </div>
    </section>
  );
};

export default Gallery;
