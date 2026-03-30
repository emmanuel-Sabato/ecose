import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <span className="text-school-gold font-bold tracking-widest uppercase text-sm mb-4 block">Discover Our School</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-8 leading-tight">
              A Legacy of <span className="text-school-green">Educational Excellence</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Ecose St Kizito Musambira is more than classrooms and textbooks — it's a place where curiosity meets opportunity, dreams take shape, and friendships begin. Here, every student's story matters.
            </p>
            <p className="text-gray-600 text-lg mb-12 leading-relaxed">
              At Ecose, we believe in holistic education — one that balances academic excellence with character development, creativity, and compassion. We prepare our students not just for exams, but for life.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-school-gold shadow-sm">
                <h4 className="font-bold text-black mb-2 uppercase tracking-wide">Our Vision</h4>
                <p className="text-gray-500 text-sm">To impart high-quality education for a vibrant and ethical society.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border-l-4 border-school-green shadow-sm">
                <h4 className="font-bold text-black mb-2 uppercase tracking-wide">Core Values</h4>
                <p className="text-gray-500 text-sm">Integrity, Excellence, Community, and Resilience in all endeavors.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img src="/assets/hero/students-ecoseee.jpeg" alt="Students learning" className="w-full h-auto transform hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hidden md:block max-w-xs animate-bounce-slow">
              <h4 className="text-school-green font-bold text-lg mb-2">The Difference</h4>
              <p className="text-gray-500 text-sm">"We focus on individualized learning, catering to unique learning styles and character growth."</p>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-school-gold/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-school-green/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
