import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "https://i.ibb.co/KjWbZFT7/foodshare2-min.jpg",
    heading: "Share Your Surplus. Help Your Community.",
    text: "Join PlateShare to give away or receive food – because no one should go hungry.",
  },
  {
    image: "https://i.ibb.co/1JGHRrcL/foodshare1.webp",
    heading: "Reduce Waste. Feed Someone Today.",
    text: "Every leftover meal can make a difference. Post it and help your neighbors.",
  },
  {
    image:
      "https://i.ibb.co/9m1Z7DPh/jaz-blakeston-petch-1-M1p-PWo-TKfw-unsplash-min.jpg",
    heading: "Connect. Share. Care.",
    text: "PlateShare helps communities come together by sharing food with those in need.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const { image, heading, text } = slides[current];

  return (
    <section
      className="relative w-full h-[70vh] min-h-[400px] flex items-center justify-center text-center px-4 sm:px-6 md:px-10"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
     
      <div className="absolute inset-0 bg-white/60"></div>

    
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-snug">
          {heading}
        </h1>
        <p className="text-md sm:text-lg md:text-xl mt-4 sm:mt-6 md:mt-10 mb-3 sm:mb-4 md:mb-5">
          {text}
        </p>
           <motion.button
      className="btn btn-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-[17px] mt-3 sm:mt-4 md:mt-5"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/available-foods")}
    >
      View All Foods
    </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
