import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import AdminOverview from './AdminOverview';
import NewsManager from './NewsManager';
import CalendarManager from './CalendarManager';
import AdminSettings from './AdminSettings';
import FacilitiesManager from './FacilitiesManager';
import ApplicationsManager from './ApplicationsManager';
import { Bell, Search, User, Menu, X } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-obsidian-900 text-white font-sans overflow-hidden flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        
        {/* Topbar */}
        <header className="h-20 border-b border-white/5 bg-obsidian-900/50 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-school-green transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics, news..." 
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green/50 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <button className="relative p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-400 hover:text-white">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-school-red rounded-full border-2 border-obsidian-900"></span>
               </button>
            </div>
            
            <div className="h-8 w-px bg-white/10 mx-2"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white tracking-wide">Administrator</p>
                <p className="text-[10px] text-gray-500 font-medium">ecose.admin@campus.rw</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-school-green to-school-gold p-[1px]">
                 <div className="w-full h-full rounded-[11px] bg-obsidian-800 flex items-center justify-center">
                    <User size={20} className="text-white" />
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<AdminOverview />} />
              <Route path="/news" element={<NewsManager />} />
              <Route path="/facilities" element={<FacilitiesManager />} />
              <Route path="/applications" element={<ApplicationsManager />} />
              <Route path="/calendar" element={<CalendarManager />} />
              <Route path="/settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
