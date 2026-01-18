import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const slides = [
    {
      image: "https://i.ibb.co/FkH2vgXG/banner1.jpg",
      title: "Share Your Surplus. Help Your Community.",
      subtitle: "Join PlateShare to give away or receive food – because no one should go hungry."
    },
    {
      image: "https://i.ibb.co/gFWfLCqm/banner2.webp",
      title: "Reduce Food Waste Together.",
      subtitle: "Every shared meal makes a difference in creating a sustainable future."
    },
    {
      image: "https://i.ibb.co/mrF3tmhH/banner3.jpg",
      title: "Connect with Your Neighbors.",
      subtitle: "Build stronger communities through the simple act of sharing food."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="hero-section relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-10 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg mb-6 transition-all duration-500">
          {slides[currentSlide].title}
        </h1>

        <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-8 transition-all duration-500">
          {slides[currentSlide].subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="bg-white text-[#0c4428] px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => navigate("/dashboard/add-food")}
          >
            Start Sharing
          </button>
          
          <button
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#0c4428] transition-all duration-200"
            onClick={() => navigate("/available-foods")}
          >
            Browse Foods
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
};

export default HeroSection;