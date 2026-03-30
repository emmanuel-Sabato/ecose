import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Microscope, Atom, Calculator, Globe, Leaf, Bed, Bus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const FacilitiesSection: React.FC = () => {
  return (
    <section className="py-24 bg-blue-950 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-school-gold font-bold tracking-widest uppercase text-sm mb-4 block underline decoration-school-gold decoration-2 underline-offset-8">Infrastructure</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">World-Class Facilities</h2>
          <p className="text-white/60 text-lg">Our serene campus in Kamonyi is equipped with laboratories and amenities to support holistic development.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FacilityCard icon={FlaskConical} title="Chemistry Lab" description="Modern equipment for advanced research." />
          <FacilityCard icon={Microscope} title="Biology Lab" description="Exploring life through modern tools." />
          <FacilityCard icon={Atom} title="Physics Lab" description="Experimentation and scientific discovery." />
          <FacilityCard icon={Calculator} title="Math Hub" description="Nurturing logical and analytical skills." />
          <FacilityCard icon={Globe} title="ICT Center" description="State-of-the-art computer laboratories." />
          <FacilityCard icon={Leaf} title="Green Campus" description="A sustainable, eco-friendly environment." />
          <FacilityCard icon={Bed} title="Modern Hostels" description="Comfortable and secure housing." />
          <FacilityCard icon={Bus} title="Transport" description="Reliable school transport network." />
        </div>
      </div>
    </section>
  );
};

interface FacilityCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
    className="p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm transition-all duration-300"
  >
    <div className="text-school-gold mb-6 inline-block">
      <Icon size={32} />
    </div>
    <h4 className="text-xl font-bold mb-3">{title}</h4>
    <p className="text-white/40 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export default FacilitiesSection;
