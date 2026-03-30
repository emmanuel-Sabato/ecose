import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Coffee, 
  Calendar as CalendarIcon, 
  Star, 
  BookOpen,
  Info,
  Loader2
} from 'lucide-react';
import Navbar from './Navbar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import axios from 'axios';

type ActivityType = 'holiday' | 'day-off' | 'morning-only' | 'afternoon-only' | 'exam' | 'event';

interface Activity {
  type: ActivityType;
  title: string;
  description: string;
}

interface DayData {
  activities?: Activity[];
  isTermMarker?: boolean;
  termName?: string;
}

const activityStyles: Record<ActivityType, { color: string; bg: string; shadow: string; icon: React.ReactNode }> = {
  holiday: { color: 'text-red-500', bg: 'bg-red-50', shadow: 'shadow-red-500/10', icon: <Star size={12} /> },
  'day-off': { color: 'text-orange-500', bg: 'bg-orange-50', shadow: 'shadow-orange-500/10', icon: <Coffee size={12} /> },
  'morning-only': { color: 'text-blue-500', bg: 'bg-blue-50', shadow: 'shadow-blue-500/10', icon: <Sun size={12} /> },
  'afternoon-only': { color: 'text-school-gold', bg: 'bg-school-gold/10', shadow: 'shadow-school-gold/10', icon: <Moon size={12} /> },
  exam: { color: 'text-purple-500', bg: 'bg-purple-50', shadow: 'shadow-purple-500/10', icon: <BookOpen size={12} /> },
  event: { color: 'text-school-green', bg: 'bg-school-green/10', shadow: 'shadow-school-green/10', icon: <CalendarIcon size={12} /> }
};

const SchoolCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026 for now
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const response = await axios.get(`https://ecose-backend.vercel.app/api/events/month?year=${year}&month=${month}`);
      setEvents(response.data.data.events);
    } catch (err) {
      console.error('Fetch events failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  
  const days = [];
  const totalDays = daysInMonth(year, currentDate.getMonth());
  const offset = firstDayOfMonth(year, currentDate.getMonth());

  // Current date for comparison
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  for (let i = 0; i < offset; i++) {
    days.push(<div key={`empty-${i}`} className="h-32 border-b border-r border-gray-100 bg-gray-50/30" />);
  }

  // Pre-process events for easy lookup
  const eventsByDate = events.reduce((acc, e) => {
    const dStr = e.date.split('T')[0];
    if (!acc[dStr]) acc[dStr] = { activities: [], isTermMarker: e.isTermMarker, termName: e.termName };
    acc[dStr].activities.push(e);
    if (e.isTermMarker) {
        acc[dStr].isTermMarker = true;
        acc[dStr].termName = e.termName;
    }
    return acc;
  }, {} as Record<string, DayData>);

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const data = eventsByDate[dateStr];
    const isToday = dateStr === todayStr;

    days.push(
      <motion.div
        key={d}
        whileHover={{ zIndex: 10, scale: 1.02 }}
        onClick={() => setSelectedDate(dateStr)}
        className={`h-32 border-b border-r border-gray-100 p-3 cursor-pointer transition-all relative group
          ${selectedDate === dateStr ? 'bg-school-gold/[0.05]' : 'bg-white hover:bg-gray-50'}
        `}
      >
        <div className="flex justify-between items-start mb-2">
          <span className={`text-[10px] font-black ${isToday ? 'bg-school-green text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg' : 'text-gray-400'}`}>
            {d}
          </span>
          {data?.isTermMarker && (
            <span className="text-[7px] font-black uppercase tracking-tighter text-school-gold bg-school-gold/10 px-2 py-0.5 rounded-full border border-school-gold/10">
              {data.termName}
            </span>
          )}
        </div>

        <div className="space-y-1 overflow-hidden">
          {data?.activities?.slice(0, 2).map((activity: any, idx: number) => {
             const style = activityStyles[activity.type as ActivityType];
             return (
               <div 
                 key={idx}
                 className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${style.bg} ${style.color} text-[8px] font-black uppercase tracking-wider truncate shadow-sm ${style.shadow}`}
               >
                 {style.icon}
                 <span className="truncate">{activity.title}</span>
               </div>
             );
          })}
          {(data?.activities?.length ?? 0) > 2 && (
            <div className="text-[7px] text-gray-400 font-bold pl-2 tracking-widest uppercase">
              + {data!.activities!.length - 2} more
            </div>
          )}
        </div>

        {isToday && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-school-green rounded-full shadow-[0_0_10px_rgba(49,138,43,0.8)]" />
        )}
      </motion.div>
    );
  }

  const selectedData = selectedDate ? eventsByDate[selectedDate] : null;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans">
      <TopNavbar />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Calendar Section */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 relative min-h-[600px]">
              {/* Calendar Header */}
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-black text-white">
                <div>
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-school-gold opacity-60 mb-1 block">Institutional Schedule</span>
                   <h2 className="text-3xl font-black tracking-tighter flex items-center gap-4">
                     {monthName} <span className="text-school-gold/50">{year}</span>
                   </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handlePrevMonth} className="p-3 rounded-2xl bg-white/10 hover:bg-school-gold hover:text-black transition-all border border-white/10 group"><ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" /></button>
                  <button onClick={handleNextMonth} className="p-3 rounded-2xl bg-white/10 hover:bg-school-gold hover:text-black transition-all border border-white/10 group"><ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" /></button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 bg-gray-50/50 border-b border-gray-100">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7 border-l border-gray-100 relative">
                {loading && (
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-[20] flex flex-col items-center justify-center">
                      <Loader2 size={48} className="text-school-green animate-spin mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Archiving Schedule...</p>
                   </div>
                )}
                {days}
              </div>
            </div>

            {/* Legend Section */}
            <div className="mt-12 p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl flex flex-wrap gap-10 justify-center">
              {Object.entries(activityStyles).map(([type, style]) => (
                <div key={type} className="flex items-center gap-4 group">
                  <div className={`w-10 h-10 rounded-[1.25rem] ${style.bg} ${style.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                    {style.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{type.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-40 space-y-8">
              <motion.div 
                key={selectedDate}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 min-h-[500px] flex flex-col"
              >
                <div className="flex items-center gap-4 mb-10 overflow-hidden">
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-school-gold shadow-xl flex-shrink-0">
                    <CalendarIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-black uppercase tracking-tight leading-none text-sm">Briefing</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Daily Log</p>
                  </div>
                </div>

                {selectedDate ? (
                  <div className="flex-1 space-y-10">
                    <div className="text-4xl font-black text-black leading-none tracking-tighter">
                      {new Date(selectedDate).toLocaleDateString('default', { day: 'numeric', month: 'long' })}
                    </div>
                    
                    <div className="space-y-6">
                      {selectedData?.activities && selectedData.activities.length > 0 ? (
                        selectedData.activities.map((activity: any, idx: number) => (
                          <div key={idx} className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 shadow-sm relative group overflow-hidden">
                            <div className={`absolute top-0 right-0 w-2 h-full ${activityStyles[activity.type as ActivityType].bg.replace('bg-', 'bg-opacity-50 ' + activityStyles[activity.type as ActivityType].color.replace('text-', 'bg-'))}`} />
                            <div className="flex items-center gap-2 mb-4">
                              <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${activityStyles[activity.type as ActivityType].color}`}>
                                {activity.type}
                              </span>
                            </div>
                            <h4 className="font-black text-black mb-4 leading-snug">{activity.title}</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{activity.description}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center grayscale opacity-10">
                          <Info size={64} className="mb-4" />
                          <p className="text-[10px] font-black uppercase tracking-widest">Idle Schedule</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-gray-50 flex items-center justify-center mb-8 text-gray-100 shadow-inner">
                      <CalendarIcon size={40} />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] leading-relaxed text-gray-300">
                      Query a date to view <br/> school activities
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Notice Center Banner */}
              <div className="p-10 rounded-[3rem] bg-black text-white shadow-2xl relative overflow-hidden group border border-white/5 cursor-pointer">
                 <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-school-gold/20 rounded-full blur-[100px] group-hover:bg-school-gold/40 transition-all duration-700" />
                 <span className="text-[9px] font-black uppercase tracking-[0.4em] text-school-gold mb-6 block">Bulletins</span>
                 <p className="font-black text-xl leading-snug tracking-tighter mb-8">
                    Stay Ahead of the Academic Stream.
                 </p>
                 <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-school-gold group-hover:gap-5 transition-all">
                    Term Archives
                    <ChevronRight size={16} />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SchoolCalendar;
