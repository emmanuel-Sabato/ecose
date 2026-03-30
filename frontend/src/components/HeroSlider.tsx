import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const images = [
  '/assets/hero/ecose-footbal-club.jpeg',
  '/assets/hero/ecose-traditionel.jpeg',
  '/assets/hero/karate-students-ecose.jpeg',
  '/assets/hero/pray-ecose.jpeg',
  '/assets/hero/students-ecoseee.jpeg',
];

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload all images for a seamless slider experience
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black font-heading">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={images[currentIndex]}
            alt={`School life ${currentIndex + 1}`}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl"
        >
          <span className="text-school-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Welcome to Ecose St Kizito Musambira
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-2xl">
            Shaping Excellence <br />
            <span className="text-school-gold">Inspiring Futures</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            A center of academic excellence and character building in Kamonyi, Rwanda. 
            Empowering students to become the leaders of tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/apply')}
              className="bg-school-gold text-black font-bold px-10 py-4 rounded-lg hover:bg-white transition-all duration-300 shadow-xl shadow-school-gold/20 flex items-center gap-2"
            >
              APPLY NOW <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/facilities')}
              className="border-2 border-white text-white font-bold px-10 py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              OUR FACILITIES
            </button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 bottom-12 z-30 flex justify-center gap-6 md:justify-between md:px-12 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full border border-white/30 text-white hover:bg-school-gold hover:border-school-gold hover:text-black transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 rounded-full border border-white/30 text-white hover:bg-school-gold hover:border-school-gold hover:text-black transition-all duration-300 backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-school-gold shadow-lg shadow-school-gold/50' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
