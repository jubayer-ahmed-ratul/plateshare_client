import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://i.ibb.co/KjWbZFT7/foodshare2-min.jpg)` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-10 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg mb-6">
          Share Your Surplus. Help Your Community.
        </h1>

        <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md mb-8">
          Join PlateShare to give away or receive food – because no one should go hungry.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            className="bg-white text-[#0c4428] px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            onClick={() => navigate("/add-food")}
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
    </section>
  );
};

export default HeroSection;
