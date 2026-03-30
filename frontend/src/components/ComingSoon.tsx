import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hammer, ArrowLeft, Stars } from 'lucide-react';
import Navbar from './Navbar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';

interface ComingSoonProps {
  title: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar />
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-4xl w-full text-center relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-school-gold/10 rounded-full blur-3xl -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gray-50 border border-gray-100 mb-8 shadow-sm">
              <Hammer className="text-school-gold" size={18} />
              <span className="text-[10px] tracking-[0.3em] font-black uppercase text-gray-400">Under Construction</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-black mb-8 leading-tight">
              {title} <br/>
              <span className="text-school-green tracking-tighter">Coming Soon</span>
            </h1>

            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
              We're currently building a premium digital experience for our {title.toLowerCase()} section. 
              Our team is working hard to bring you a gateway that reflects the excellence of Ecose St Kizito.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold tracking-widest uppercase text-xs shadow-2xl hover:bg-school-gold hover:text-black transition-all duration-500"
                >
                  <ArrowLeft size={18} />
                  Back to Campus
                </motion.button>
              </Link>
              
              <div className="flex items-center gap-3 text-school-gold">
                <Stars size={20} className="animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Shaping Excellence</span>
              </div>
            </div>
          </motion.div>

          {/* Progress Bar Mockup */}
          <div className="mt-24 max-w-md mx-auto">
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] tracking-[0.2em] font-black uppercase text-black">Development Status</span>
              <span className="text-school-green font-bold text-xs">85%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-full bg-school-green rounded-full shadow-lg shadow-school-green/20"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;
