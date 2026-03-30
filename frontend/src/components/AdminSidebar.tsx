import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Newspaper, 
  CalendarDays, 
  Settings, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  UserPlus
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarItem: React.FC<{ 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  isOpen: boolean; 
}> = ({ to, icon, label, isOpen }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) => `
      flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
      ${isActive 
        ? 'bg-gradient-to-r from-school-green/20 to-school-gold/10 text-school-green border border-school-green/20 shadow-lg shadow-school-green/5' 
        : 'text-gray-500 hover:bg-white/5 hover:text-white border border-transparent'}
    `}
  >
    <div className="flex-shrink-0">{icon}</div>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-between"
      >
        <span className="text-xs font-black uppercase tracking-[0.15em] leading-none">{label}</span>
        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    )}
  </NavLink>
);

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://ecose-backend.vercel.app/api/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      // Fallback redirect even if API fails
      navigate('/login');
    }
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-obsidian-900 border-r border-white/5 transition-all duration-300 z-50 flex flex-col pt-8 pb-10 ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Brand Section */}
      <div className={`px-6 mb-12 flex items-center gap-4 h-12 overflow-hidden`}>
        <div className="flex-shrink-0">
          <img src="/assets/ecose-logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(49,138,43,0.3)]" />
        </div>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col"
          >
            <span className="text-sm font-black text-white uppercase tracking-tighter">Ecose<span className="text-school-green">Admin</span></span>
            <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.4em]">St Kizito</span>
          </motion.div>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-4 space-y-2">
        <div className={`px-4 mb-3 ${!isOpen && 'hidden'}`}>
           <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">General</span>
        </div>
        
        <SidebarItem to="/admin" icon={<LayoutDashboard size={20} />} label="Overview" isOpen={isOpen} />
        
        <div className={`px-4 mt-8 mb-3 ${!isOpen && 'hidden'}`}>
           <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Management</span>
        </div>
        
        <SidebarItem to="/admin/news" icon={<Newspaper size={20} />} label="News Posts" isOpen={isOpen} />
        <SidebarItem to="/admin/facilities" icon={<ShieldCheck size={20} />} label="Facilities" isOpen={isOpen} />
        <SidebarItem to="/admin/applications" icon={<UserPlus size={20} />} label="Registrations" isOpen={isOpen} />
        <SidebarItem to="/admin/calendar" icon={<CalendarDays size={20} />} label="Calendar" isOpen={isOpen} />
        
        <div className={`px-4 mt-8 mb-3 ${!isOpen && 'hidden'}`}>
           <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">System</span>
        </div>
        <SidebarItem to="/admin/settings" icon={<Settings size={20} />} label="Settings" isOpen={isOpen} />
      </nav>

      {/* Footer Section */}
      <div className="px-4 mt-auto">
        <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-school-red/60 hover:text-school-red hover:bg-school-red/5 transition-all duration-300 group border border-transparent hover:border-school-red/10 cursor-pointer"
        >
            <LogOut size={20} />
            {isOpen && (
                <span className="text-xs font-black uppercase tracking-[0.15em]">Log Out</span>
            )}
        </button>

        {isOpen && (
           <div className="mt-6 flex items-center justify-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/5">
              <ShieldCheck size={14} className="text-school-green" />
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">Secured By MAGICPENTAGON</span>
           </div>
        )}
      </div>
    </aside>
  );
};

export default AdminSidebar;
