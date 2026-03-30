import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Calendar, Building2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] h-10 bg-black/90 backdrop-blur-md border-b border-white/5 transition-transform duration-500 ${isScrolled ? '-translate-y-full' : 'translate-y-0'} hidden lg:block`}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between text-white">
        {/* Quick Contact Info */}
        <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] font-bold uppercase text-white/40">
          <div className="flex items-center gap-2 group cursor-pointer hover:text-school-gold transition-colors duration-300">
            <Phone size={12} className="text-school-gold/50 group-hover:text-school-gold transition-colors" />
            <span>+250 XXX XXX XXX</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:text-school-gold transition-colors duration-300">
            <Mail size={12} className="text-school-gold/50 group-hover:text-school-gold transition-colors" />
            <span>info@ecosemusambira.rw</span>
          </div>
        </div>

        {/* Utility Links */}
        <div className="flex items-center gap-8">
          <UtilityLink icon={<Newspaper size={14} />} label="School News" href="/news" />
          <UtilityLink icon={<Calendar size={14} />} label="Calendar" href="/calendar" />
          <UtilityLink icon={<Building2 size={14} />} label="Facilities" href="/facilities" />
        </div>
      </div>
    </div>
  );
};

interface UtilityLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const UtilityLink: React.FC<UtilityLinkProps> = ({ icon, label, href }) => (
  <Link to={href}>
    <motion.div 
      whileHover={{ y: -1 }}
      className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-black uppercase text-white/60 hover:text-white transition-all duration-300 group cursor-pointer"
    >
      <span className="text-school-gold group-hover:scale-110 transition-transform duration-300">
        {icon}
      </span>
      {label}
    </motion.div>
  </Link>
);

export default TopNavbar;
