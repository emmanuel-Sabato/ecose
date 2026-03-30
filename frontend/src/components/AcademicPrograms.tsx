import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AcademicPrograms: React.FC = () => {
  return (
    <section id="academics" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-school-gold font-bold tracking-widest uppercase text-sm mb-4 block underline decoration-school-gold decoration-2 underline-offset-8">Academic Programs</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6">Our Academic Pathways</h2>
          <div className="h-1 w-20 bg-school-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-black">
          <ProgramCard 
            image="/src/assets/hero/karate-students-ecose.jpeg"
            level="Level: 1 - 3"
            title="O'Level (Ordinary Level)"
            description="Our O'Level program provides a solid foundational education across diverse subjects, fostering curiosity and critical thinking skills in young learners."
            color="border-school-red"
            badge="Foundation"
          />
          <ProgramCard 
            image="/src/assets/hero/first-genius-students-ecose.jpeg"
            level="Level: 4 - 6"
            title="A'Level (Advanced Level)"
            description="Specialized pathways designed for deeper academic rigor, preparing students for university entrance and professional life through focused study."
            color="border-school-green"
            badge="Excellence"
          />
        </div>
      </div>
    </section>
  );
};

interface ProgramCardProps {
  image: string;
  level: string;
  title: string;
  description: string;
  color: string;
  badge: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ image, level, title, description, color, badge }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`bg-white rounded-3xl overflow-hidden shadow-lg border-b-8 ${color} transition-all duration-300 group`}
  >
    <div className="h-64 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-black">
        {badge}
      </div>
    </div>
    <div className="p-8">
      <span className="text-school-gold font-bold text-xs tracking-widest uppercase mb-2 block">{level}</span>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">{description}</p>
      <button className="flex items-center gap-2 font-bold text-xs tracking-widest uppercase group-hover:text-school-gold transition-colors">
        Explore Pathway <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </motion.div>
);

export default AcademicPrograms;
