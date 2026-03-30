import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Users, 
  Newspaper, 
  CalendarDays, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  Clock,
  ChevronRight,
  Plus,
  Loader2
} from 'lucide-react';

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  trend?: string; 
  isUp?: boolean; 
  icon: React.ReactNode; 
  color: string;
}> = ({ title, value, trend, isUp, icon, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="glass-dark p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group transition-all duration-500"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}/10 blur-[60px] transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700`} />
    
    <div className="flex justify-between items-start relative z-10 mb-4">
      <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-${color} shadow-lg shadow-${color}/5`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-wider ${isUp ? 'text-school-green' : 'text-school-red'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend}
        </div>
      )}
    </div>

    <div className="relative z-10">
      <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
         <span className="text-3xl font-black text-white tracking-tight">{value}</span>
         <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">this month</span>
      </div>
    </div>
  </motion.div>
);

const ActivityItem: React.FC<{ 
  title: string; 
  time: string; 
  type: 'news' | 'calendar' | 'system'; 
}> = ({ title, time, type }) => (
  <div className="flex items-center gap-4 py-4 border-b border-white/5 last:border-none group cursor-pointer">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-colors group-hover:border-white/20 ${
      type === 'news' ? 'text-school-green bg-school-green/5' : 
      type === 'calendar' ? 'text-school-gold bg-school-gold/5' : 'text-gray-400 bg-white/5'
    }`}>
      {type === 'news' ? <Newspaper size={18} /> : type === 'calendar' ? <CalendarDays size={18} /> : <Clock size={18} />}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-gray-200 truncate group-hover:text-white transition-colors">{title}</p>
      <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-0.5">{time}</p>
    </div>
    <ChevronRight size={14} className="text-gray-600 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
  </div>
);

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/admin/stats', { withCredentials: true });
        setStats(res.data.data.stats);
        setActivities(res.data.data.activities);
      } catch (err) {
        console.error('Failed to load dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).toUpperCase();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="text-school-green animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Synchronizing Command Center...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-3 uppercase">Command <span className="text-school-green">Center</span></h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em]">Management Overview • {currentDate}</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/admin/news'}
          className="bg-school-green text-white px-6 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-school-green/20 hover:bg-[#2a7525] transition-colors"
        >
          <Plus size={16} />
          Post Announcement
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active News" value={stats?.newsCount?.toString() || '0'} trend="+3.2%" isUp={true} icon={<Newspaper size={20} />} color="school-green" />
        <StatCard title="Upcoming Events" value={stats?.eventsCount?.toString() || '0'} trend="+1.5%" isUp={true} icon={<CalendarDays size={20} />} color="school-gold" />
        <StatCard title="System Health" value={stats?.systemHealth || '99.9%'} trend="Stable" isUp={true} icon={<ArrowUpRight size={20} />} color="gray-400" />
        <StatCard title="Admissions" value={stats?.applicationsCount?.toString() || '0'} trend="-1.2%" isUp={false} icon={<Users size={20} />} color="school-red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5 h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-school-green rounded-full shadow-[0_0_10px_rgba(49,138,43,0.5)]" />
                 Recent Activity
              </h2>
              <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.2em] transition-all">View All</button>
            </div>
            
            <div className="space-y-2">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <ActivityItem 
                    key={`${activity.type}-${activity.id}`} 
                    type={activity.type} 
                    title={activity.title} 
                    time={activity.displayTime} 
                  />
                ))
              ) : (
                <div className="py-20 text-center text-gray-500 text-[10px] font-black uppercase tracking-widest border border-white/5 border-dashed rounded-3xl">
                   Intelligence Feed Quiet • No Recent Activity Detected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions / Chart Placeholder */}
        <div className="space-y-6">
           <div className="glass-dark rounded-[2.5rem] p-8 border border-white/5">
              <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-school-green/30 transition-all cursor-pointer group text-center">
                    <div className="w-10 h-10 rounded-xl bg-school-green/10 flex items-center justify-center mx-auto mb-3 text-school-green group-hover:scale-110 transition-transform">
                       <Newspaper size={20} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">New Article</span>
                 </div>
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-school-gold/30 transition-all cursor-pointer group text-center">
                    <div className="w-10 h-10 rounded-xl bg-school-gold/10 flex items-center justify-center mx-auto mb-3 text-school-gold group-hover:scale-110 transition-transform">
                       <CalendarDays size={20} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Add Event</span>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-school-green to-school-gold p-[1px] rounded-[2.5rem]">
              <div className="bg-obsidian-900 rounded-[39px] p-8 relative overflow-hidden h-full">
                 <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-school-green/20 blur-[60px]" />
                 <h2 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-4 relative z-10">Premium Plan</h2>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mb-6 leading-relaxed relative z-10">You are using the Ecose Enterprise Management Suite v4.0.2</p>
                 <button className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all relative z-10 border border-white/10">
                    System Updates
                 </button>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOverview;
