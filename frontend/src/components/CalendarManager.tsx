import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Star, 
  Coffee, 
  Sun, 
  Moon, 
  BookOpen, 
  Calendar as CalendarIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Info
} from 'lucide-react';

type ActivityType = 'holiday' | 'day-off' | 'morning-only' | 'afternoon-only' | 'exam' | 'event';

const EVENT_TYPES: { value: ActivityType; label: string; icon: any; color: string; bg: string }[] = [
  { value: 'holiday', label: 'Holiday', icon: Star, color: 'text-red-500', bg: 'bg-red-500/10' },
  { value: 'day-off', label: 'Day Off', icon: Coffee, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { value: 'morning-only', label: 'Morning Only', icon: Sun, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { value: 'afternoon-only', label: 'Afternoon Only', icon: Moon, color: 'text-school-gold', bg: 'bg-school-gold/10' },
  { value: 'exam', label: 'Examination', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { value: 'event', label: 'School Event', icon: CalendarIcon, color: 'text-school-green', bg: 'bg-school-green/10' },
];

const CalendarManager: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    title: '',
    description: '',
    type: 'event' as ActivityType,
    isTermMarker: false,
    termName: ''
  });

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const response = await axios.get(`http://localhost:5001/api/events/month?year=${year}&month=${month}`);
      setEvents(response.data.data.events);
    } catch (err) {
      console.error('Fetch events failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const daysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const firstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const handleDayClick = (day: number) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Adjust for timezone to avoid "off by one" in date input
    const dateStr = d.toISOString().split('T')[0];
    
    // Check if event exists
    const existing = events.find(e => e.date.split('T')[0] === dateStr);
    
    if (existing) {
        handleEdit(existing);
    } else {
        resetForm();
        setFormData({ ...formData, date: dateStr });
        setModalOpen(true);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      date: '',
      title: '',
      description: '',
      type: 'event',
      isTermMarker: false,
      termName: ''
    });
    setError('');
  };

  const handleEdit = (event: any) => {
    setFormData({
      id: event._id,
      date: event.date.split('T')[0],
      title: event.title,
      description: event.description || '',
      type: event.type as ActivityType,
      isTermMarker: event.isTermMarker || false,
      termName: event.termName || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      if (formData.id) {
        await axios.patch(`http://localhost:5001/api/events/${formData.id}`, formData);
      } else {
        await axios.post('http://localhost:5001/api/events', formData);
      }
      setModalOpen(false);
      resetForm();
      fetchEvents();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save event.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/events/${id}`);
      fetchEvents();
      setModalOpen(false);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const days = [];
  const totalDays = daysInMonth(year, currentDate.getMonth());
  const offset = firstDayOfMonth(year, currentDate.getMonth());

  // Empty cells for offset
  for (let i = 0; i < offset; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-white/[0.02] border-b border-r border-white/5" />);
  }

  // Actual days
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date.split('T')[0] === dateStr);
    
    days.push(
      <div 
        key={d} 
        onClick={() => handleDayClick(d)}
        className="h-24 bg-obsidian-900/40 border-b border-r border-white/5 p-2 cursor-pointer hover:bg-white/[0.05] transition-all group relative"
      >
        <span className="text-[10px] font-black text-gray-500 group-hover:text-white transition-colors">{d}</span>
        
        <div className="mt-1 space-y-0.5 max-h-[50px] overflow-hidden">
          {dayEvents.map((e, idx) => {
            const typeInfo = EVENT_TYPES.find(t => t.value === e.type);
            return (
              <div key={idx} className={`flex items-center gap-1 p-1 rounded-md ${typeInfo?.bg} ${typeInfo?.color} text-[7px] font-bold truncate`}>
                {typeInfo && <typeInfo.icon size={8} />}
                <span className="truncate">{e.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight leading-none mb-3 uppercase">Academic <span className="text-school-gold">Timeline</span></h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Manage School Events & Term Schedules</p>
        </div>
        <button 
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="bg-school-gold text-black px-6 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-school-gold/20 hover:bg-[#e6c200] transition-all hover:-translate-y-1"
        >
          <Plus size={16} />
          Schedule Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
           {/* Calendar Header */}
           <div className="px-8 py-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">{monthName} <span className="text-school-gold">{year}</span></h3>
              <div className="flex gap-2">
                 <button onClick={handlePrevMonth} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"><ChevronLeft size={16} /></button>
                 <button onClick={handleNextMonth} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all"><ChevronRight size={16} /></button>
              </div>
           </div>

           {/* Weekday labels */}
           <div className="grid grid-cols-7 border-b border-white/5">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="py-3 text-center text-[8px] font-black uppercase tracking-widest text-gray-600">{d}</div>
              ))}
           </div>

           {/* Grid Body */}
           <div className="grid grid-cols-7 relative min-h-[400px]">
              {loading && (
                <div className="absolute inset-0 bg-obsidian-900/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                   <Loader2 size={32} className="text-school-gold animate-spin mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Schedule...</p>
                </div>
              )}
              {days}
           </div>
        </div>

        {/* Legend & Details */}
        <div className="space-y-6">
           <div className="glass-dark rounded-[2rem] border border-white/5 p-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6">Activity Legend</h4>
              <div className="grid grid-cols-1 gap-4">
                 {EVENT_TYPES.map(type => (
                   <div key={type.value} className="flex items-center gap-4 group">
                      <div className={`w-10 h-10 rounded-xl ${type.bg} ${type.color} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                         <type.icon size={18} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{type.label}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-dark rounded-[2rem] border border-white/5 p-6 bg-school-green/5">
              <div className="flex items-center gap-3 mb-4">
                 <Info size={16} className="text-school-green" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">Pro Tip</span>
              </div>
              <p className="text-[10px] leading-relaxed text-gray-400 uppercase tracking-wider font-bold">Click on any date cell to quickly add or manage activities for that specific day.</p>
           </div>
        </div>
      </div>

      {/* MODAL: EVENT FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] bg-obsidian-800 border border-white/10 rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden">
               <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">{formData.id ? 'Edit' : 'Schedule'} <span className="text-school-gold">Event</span></h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Calendar Logistics Center</p>
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"><X size={18} /></button>
               </div>

               <form onSubmit={handleSubmit} className="p-10 space-y-6">
                 {error && <div className="bg-school-red/10 border border-school-red/20 rounded-2xl p-4 flex items-center gap-3 text-school-red text-xs font-bold uppercase tracking-wider"><AlertCircle size={16} />{error}</div>}
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Date</label>
                       <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-gold/20 select-none" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Activity Type</label>
                       <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as ActivityType})} className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-gold/20 appearance-none">
                          {EVENT_TYPES.map(t => <option key={t.value} value={t.value} className="bg-obsidian-800">{t.label}</option>)}
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Event Title</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g., Mathematics Finals..." className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-gold/20" />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Short Description</label>
                    <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Context about this activity..." className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-gold/20 resize-none" />
                 </div>

                 <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <input type="checkbox" checked={formData.isTermMarker} onChange={e => setFormData({...formData, isTermMarker: e.target.checked})} className="w-4 h-4 accent-school-gold" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mark as official Term Milestone?</span>
                    {formData.isTermMarker && (
                        <input type="text" value={formData.termName} onChange={e => setFormData({...formData, termName: e.target.value})} placeholder="Name (e.g., Term 1 Finals)" className="flex-1 bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-[10px] text-white focus:outline-none" />
                    )}
                 </div>

                 <div className="pt-6 border-t border-white/5 flex gap-4">
                    {formData.id && (
                        <button type="button" onClick={() => handleDelete(formData.id)} className="p-4 bg-school-red/10 text-school-red rounded-2xl hover:bg-school-red hover:text-white transition-all"><Trash2 size={18} /></button>
                    )}
                    <button type="submit" disabled={formLoading} className="flex-1 py-4 bg-school-gold text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-school-gold/20 hover:bg-[#e6c200] transition-all flex items-center justify-center gap-3">
                       {formLoading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                       {formData.id ? 'Update Activity' : 'Schedule Activity'}
                    </button>
                 </div>
               </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarManager;
