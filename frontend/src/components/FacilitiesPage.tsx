import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FlaskConical, 
  Globe, 
  Leaf, 
  Bed, 
  Activity,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Navbar from './Navbar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';


// Assets now fetched dynamically from Cloudinary

type FacilityCategory = 'All' | 'Academic' | 'Residential' | 'Sports' | 'Social';

// Dynamic facilities fetching enabled


// Dynamic facilities fetching enabled

import axios from 'axios';

const FacilitiesPage: React.FC = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<FacilityCategory>('All');

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/facilities');
        setFacilities(res.data.data.facilities || []);
      } catch (err) {
        console.error('Failed to fetch facilities:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFacilities();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FlaskConical': return <FlaskConical size={18} />;
      case 'Globe': return <Globe size={18} />;
      case 'Leaf': return <Leaf size={18} />;
      case 'Bed': return <Bed size={18} />;
      case 'Activity': return <Activity size={18} />;
      case 'Users': return <Users size={18} />;
      default: return <FlaskConical size={18} />;
    }
  };

  const filteredFacilities = activeCategory === 'All' 
    ? facilities 
    : facilities.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <TopNavbar />
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-school-gold/10 border border-school-gold/20 mb-6 font-black text-[9px] uppercase tracking-[0.2em] text-school-gold">
              <CheckCircle2 size={12} />
              Verified Infrastructure
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight leading-none">
              World-Class <span className="text-school-green">Facilities</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Designed for professional excellence and total student development. 
              Our campus provides a premium environment that nurtures both the mind and the soul.
            </p>
          </motion.div>
        </section>

        {/* Filter Navigation */}
        <section className="container mx-auto px-6 mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {(['All', 'Academic', 'Residential', 'Sports', 'Social'] as FacilityCategory[]).map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                  ${activeCategory === category 
                    ? 'bg-black text-white shadow-xl scale-105' 
                    : 'bg-white text-gray-400 hover:text-black border border-gray-100'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="container mx-auto px-6">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                  Acquiring Infrastructure Data...
                </div>
              ) : filteredFacilities.map((facility) => (
                <motion.div
                  key={facility.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={facility.image} 
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <button className="p-4 rounded-full bg-white text-black translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-6 right-6">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20
                        ${facility.status === 'Open' ? 'bg-school-green/80 text-white' : 'bg-school-gold/80 text-black'}
                      `}>
                        {facility.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-school-green group-hover:bg-school-green group-hover:text-white transition-colors duration-500 shadow-sm">
                        {getIcon(facility.icon)}
                      </div>
                      <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
                        {facility.category}
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-black mb-3 leading-tight tracking-tight">
                      {facility.title}
                    </h3>
                    
                    <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">
                      {facility.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-gray-300" />
                        <span className="text-[10px] font-bold text-gray-400">{facility.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-black text-school-gold uppercase tracking-widest cursor-pointer group/link">
                        Explore Space
                        <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FacilitiesPage;
