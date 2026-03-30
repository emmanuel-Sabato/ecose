import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye, 
  Trash2, 
  Mail,
  Phone,
  Calendar,
  MapPin,
  School,
  GraduationCap,
  Users,
  User,
  X
} from 'lucide-react';

const STATUS_COLORS: any = {
  'Pending': 'text-school-gold bg-school-gold/10',
  'Reviewed': 'text-blue-400 bg-blue-400/10',
  'Accepted': 'text-school-green bg-school-green/10',
  'Rejected': 'text-school-red bg-school-red/10'
};

const ApplicationsManager: React.FC = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/applications', { withCredentials: true });
      setApplications(res.data.data.applications || []);
    } catch (err) {
      console.error('Failed to fetch applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await axios.patch(`http://localhost:5001/api/applications/${id}`, { status }, { withCredentials: true });
      fetchApplications();
      if (selectedApp && selectedApp._id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setUpdating(null);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/applications/${id}`, { withCredentials: true });
      fetchApplications();
      setSelectedApp(null);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Student <span className="text-school-gold">Applications</span></h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Manage New Enrollments & Inquiries</p>
        </div>
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-school-gold transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-gold/20 w-64 transition-all"
              />
           </div>
           <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl py-3 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 focus:outline-none focus:ring-2 focus:ring-school-gold/20 outline-none"
           >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
           </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Candidate</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Grade</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Applied</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Status</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-8 py-6"><div className="h-12 bg-white/5 rounded-xl w-full"></div></td>
                </tr>
              ))
            ) : filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <tr key={app._id} className="group hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setSelectedApp(app)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-school-gold/20 to-school-green/20 flex items-center justify-center text-school-gold font-black text-xs">
                          {app.fullName.charAt(0)}
                       </div>
                       <div>
                          <p className="text-xs font-bold text-white">{app.fullName}</p>
                          <p className="text-[10px] text-gray-500">{app.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-gray-400">{app.gradeApplyingFor}</td>
                  <td className="px-8 py-6 text-[10px] font-medium text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-full ${STATUS_COLORS[app.status]}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"><Eye size={14} /></button>
                       <button onClick={(e) => { e.stopPropagation(); deleteApplication(app._id); }} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-school-red"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center text-gray-500 text-[10px] font-black uppercase tracking-widest">No applications found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Sidebar Modal */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setSelectedApp(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-obsidian-900 border-l border-white/10 z-[110] shadow-2xl flex flex-col pt-10"
            >
              {/* Modal Header */}
              <div className="px-10 flex justify-between items-center mb-10">
                 <div className="flex items-center gap-3">
                    <UserPlus className="text-school-gold" size={24} />
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Application <span className="text-school-gold">Details</span></h3>
                 </div>
                 <button onClick={() => setSelectedApp(null)} className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-xl"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto px-10 space-y-10 custom-scrollbar pb-20">
                {/* Status Control */}
                <section className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex items-center justify-between">
                   <div>
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Current Status</p>
                      <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${STATUS_COLORS[selectedApp.status]}`}>
                        {selectedApp.status}
                      </span>
                   </div>
                   <div className="flex gap-2">
                      {['Pending', 'Reviewed', 'Accepted', 'Rejected'].map(s => (
                        <button 
                          key={s}
                          disabled={updating === selectedApp._id}
                          onClick={() => updateStatus(selectedApp._id, s)}
                          className={`p-2 rounded-lg transition-all ${selectedApp.status === s ? 'bg-white/10 text-white shadow-lg' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}
                          title={`Mark as ${s}`}
                        >
                          {s === 'Accepted' && <CheckCircle2 size={16} />}
                          {s === 'Rejected' && <XCircle size={16} />}
                          {s === 'Reviewed' && <Eye size={16} />}
                          {s === 'Pending' && <Clock size={16} />}
                        </button>
                      ))}
                   </div>
                </section>

                {/* Info Blocks */}
                <div className="grid grid-cols-2 gap-8">
                  <InfoItem label="Full Name" value={selectedApp.fullName} icon={<User size={14}/>} />
                  <InfoItem label="Email Address" value={selectedApp.email} icon={<Mail size={14}/>} />
                  <InfoItem label="Phone Number" value={selectedApp.phone} icon={<Phone size={14}/>} />
                  <InfoItem label="Gender" value={selectedApp.gender} icon={<Users size={14}/>} />
                  <InfoItem label="Date of Birth" value={new Date(selectedApp.dateOfBirth).toLocaleDateString()} icon={<Calendar size={14}/>} />
                  <InfoItem label="Address" value={selectedApp.address} icon={<MapPin size={14}/>} />
                  <InfoItem label="Previous School" value={selectedApp.previousSchool} icon={<School size={14}/>} />
                  <InfoItem label="Grade Applying For" value={selectedApp.gradeApplyingFor} icon={<GraduationCap size={14}/>} />
                </div>

                <div className="border-t border-white/5 pt-10">
                   <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6">Guardian Information</h4>
                   <div className="grid grid-cols-2 gap-8">
                      <InfoItem label="Guardian Name" value={selectedApp.parentName} icon={<User size={14}/>} />
                      <InfoItem label="Guardian Phone" value={selectedApp.parentPhone} icon={<Phone size={14}/>} />
                   </div>
                </div>

                {/* Footer Notes */}
                <div className="bg-school-gold/5 border border-school-gold/10 p-6 rounded-2xl">
                   <p className="text-[9px] font-black text-school-gold uppercase tracking-widest mb-2 flex items-center gap-2 underline">Administrative Note</p>
                   <p className="text-gray-500 text-[10px] leading-relaxed font-bold uppercase tracking-tight">
                     This candidate applied on {new Date(selectedApp.createdAt).toLocaleString()}. Profile status updates will notify the system logs.
                   </p>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="p-10 border-t border-white/5 bg-obsidian-900 flex justify-between gap-4">
                 <button onClick={() => deleteApplication(selectedApp._id)} className="flex-1 py-4 bg-school-red/10 text-school-red text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-school-red hover:text-white transition-all transition-all duration-300">Expunge Record</button>
                 <button onClick={() => setSelectedApp(null)} className="flex-1 py-4 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all transition-all duration-300">Close Profile</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="space-y-2 group">
    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 group-hover:text-school-gold transition-colors">{icon} {label}</label>
    <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-xs font-bold text-white group-hover:border-school-gold/20 transition-all">
      {value}
    </div>
  </div>
);

export default ApplicationsManager;
