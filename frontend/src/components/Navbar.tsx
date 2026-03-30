import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    fetchSettings();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('https://ecose-backend.vercel.app/api/settings');
      setSettings(res.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT US', href: '/#about' },
    { name: 'ACADEMICS', href: '/#academics' },
    { name: 'ADMISSIONS', href: '/#admissions' },
    { name: 'GALLERY', href: '/#gallery' },
    { name: 'CONTACT', href: '/#footer' },
  ];

  return (
    <>
      <nav 
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'top-0 bg-black/80 backdrop-blur-xl py-3 shadow-2xl border-b border-white/10' 
            : 'top-0 lg:top-10 bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/ecose-logo.png" 
              alt="Ecose Logo" 
              className="h-10 sm:h-12 w-auto group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="hidden sm:block text-left">
              <h1 className="text-white font-bold text-lg lg:text-xl leading-tight tracking-tight uppercase">
                {settings?.schoolName || 'ECOSE ST KIZITO'}
              </h1>
              <p className="text-school-gold text-[10px] font-semibold tracking-[0.2em] uppercase">
                {settings?.contactAddress?.split(',').slice(0, 2).join(' - ') || 'Musambira - Kamonyi'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8 text-white font-bold text-[11px] tracking-widest">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="hover:text-school-gold transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-school-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="text-white/80 hover:text-school-gold transition-colors p-2">
              <Search size={20} />
            </button>
            <Link to="/apply" className="hidden sm:flex bg-school-gold text-black font-black px-5 py-2 rounded-full text-[11px] tracking-tighter hover:bg-white transition-all duration-300 shadow-xl shadow-school-gold/20 items-center gap-2 group">
              APPLY NOW
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col pt-24 pb-10 px-6"
          >
            <div className="flex flex-col gap-6 items-center justify-center flex-grow">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white text-3xl font-black tracking-tight hover:text-school-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto"
            >
              <Link to="/apply" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-school-gold text-black font-black py-4 rounded-2xl text-lg shadow-2xl shadow-school-gold/20 flex items-center justify-center gap-3">
                APPLY FOR ADMISSION
                <ArrowRight size={20} />
              </Link>
              <p className="text-white/40 text-center text-xs mt-6 tracking-widest font-bold uppercase">
                Ecose St Kizito Musambira
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
