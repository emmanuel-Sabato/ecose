import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Plus, Edit2, Trash2, 
  Image as ImageIcon, X, Loader2,
  FlaskConical, Globe, Leaf, Bed, Activity, Users
} from 'lucide-react';

const CATEGORIES = ['Academic', 'Residential', 'Sports', 'Social'];
const STATUSES = ['Open', 'In Use', 'Maintenance'];
const ICONS = [
  { name: 'FlaskConical', component: <FlaskConical size={16} /> },
  { name: 'Globe', component: <Globe size={16} /> },
  { name: 'Leaf', component: <Leaf size={16} /> },
  { name: 'Bed', component: <Bed size={16} /> },
  { name: 'Activity', component: <Activity size={16} /> },
  { name: 'Users', component: <Users size={16} /> }
];

const FacilitiesManager: React.FC = () => {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleting, setDeleting] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Academic',
    description: '',
    icon: 'FlaskConical',
    capacity: '',
    status: 'Open'
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => { fetchFacilities(); }, []);

  const fetchFacilities = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/facilities');
      setFacilities(res.data.data.facilities || []);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const resetForm = () => {
    setFormData({ id: '', title: '', category: 'Academic', description: '', icon: 'FlaskConical', capacity: '', status: 'Open' });
    setSelectedImage(null);
    setImagePreview(null);
    setError('');
  };

  const handleEdit = (f: any) => {
    setFormData({ id: f._id, title: f.title, category: f.category, description: f.description, icon: f.icon, capacity: f.capacity, status: f.status });
    setImagePreview(f.image);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => { if (key !== 'id') data.append(key, (formData as any)[key]); });
    if (selectedImage) data.append('image', selectedImage);

    try {
      const url = `http://localhost:5001/api/facilities${formData.id ? `/${formData.id}` : ''}`;
      const method = formData.id ? 'patch' : 'post';
      await axios[method](url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      setModalOpen(false);
      resetForm();
      fetchFacilities();
    } catch (err: any) { setError(err.response?.data?.message || 'Action failed'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/facilities/${id}`);
      fetchFacilities();
    } catch (err) { console.error(err); }
    finally { setDeleting(null); }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Campus <span className="text-school-green">Infrastructure</span></h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Manage School Facilities & Assets</p>
        </div>
        <button onClick={() => { resetForm(); setModalOpen(true); }} className="bg-school-green text-white px-6 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-school-green/20 hover:bg-[#2a7525] transition-all"><Plus size={16} /> Add Facility</button>
      </div>

      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Facility</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Category</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Capacity</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Status</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? [...Array(3)].map((_, i) => <tr key={i} className="animate-pulse"><td colSpan={5} className="px-8 py-6"><div className="h-12 bg-white/5 rounded-xl w-full"></div></td></tr>) : 
            facilities.map((item) => (
                <tr key={item._id} className="group hover:bg-white/[0.02]">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <img src={item.image} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    <div>
                      <p className="text-xs font-bold text-white">{item.title}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">{item.icon}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[9px] font-black uppercase text-school-green">{item.category}</td>
                  <td className="px-8 py-6 text-[10px] font-bold text-gray-400">{item.capacity}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${item.status === 'Open' ? 'text-school-green bg-school-green/10' : 'text-school-gold bg-school-gold/10'}`}>{item.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 text-gray-400">
                      <button onClick={() => handleEdit(item)} className="p-2 hover:bg-white/10 rounded-lg hover:text-white transition-all"><Edit2 size={14} /></button>
                      <button onClick={() => setDeleting(item._id)} className="p-2 hover:bg-white/10 rounded-lg hover:text-school-red transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <><motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]" />
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-obsidian-800 border border-white/10 rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden">
              <div className="px-10 py-8 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">{formData.id ? 'Edit' : 'New'} Facility</h3>
                <button onClick={() => setModalOpen(false)} className="p-2 text-gray-500 hover:text-white"><X size={20}/></button>
              </div>
              <form onSubmit={handleSubmit} className="p-10 space-y-6">
                {error && <div className="p-4 bg-school-red/10 text-school-red text-[10px] font-black uppercase rounded-xl">{error}</div>}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Title</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:ring-1 focus:ring-school-green/50 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Category</label>
                        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-2 text-[10px] text-white outline-none">
                          {CATEGORIES.map(c => <option key={c} value={c} className="bg-obsidian-800">{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Status</label>
                        <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-2 text-[10px] text-white outline-none">
                          {STATUSES.map(s => <option key={s} value={s} className="bg-obsidian-800">{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Icon Representation</label>
                      <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs text-white outline-none">
                        {ICONS.map(i => <option key={i.name} value={i.name} className="bg-obsidian-800">{i.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Feature Image</label>
                    <div onClick={() => document.getElementById('facility-img')?.click()} className="aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group">
                      {imagePreview ? <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" /> : <div className="text-center"><ImageIcon size={24} className="mx-auto mb-2 text-gray-500"/><p className="text-[8px] font-black text-gray-600 uppercase">Upload Space Photo</p></div>}
                    </div>
                    <input id="facility-img" type="file" accept="image/*" className="hidden" onChange={e => { if(e.target.files?.[0]) { setSelectedImage(e.target.files[0]); setImagePreview(URL.createObjectURL(e.target.files[0])); } }} />
                    <div>
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Capacity</label>
                      <input type="text" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} placeholder="e.g. 50 Students" className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs text-white outline-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Description</label>
                  <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/5 rounded-xl py-3 px-4 text-xs text-white outline-none resize-none" />
                </div>
                <div className="flex justify-end gap-4 pt-6">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-8 py-3 bg-white/5 text-gray-400 font-black text-[10px] uppercase rounded-xl hover:text-white transition-all">Cancel</button>
                  <button disabled={formLoading} className="px-10 py-3 bg-school-green text-white font-black text-[10px] uppercase rounded-xl flex items-center gap-2 shadow-lg shadow-school-green/20">
                    {formLoading ? <Loader2 size={16} className="animate-spin" /> : (formData.id ? 'Save Changes' : 'Create Space')}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleting && (
          <><motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={() => setDeleting(null)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]" />
            <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.9 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] bg-obsidian-800 border border-white/10 rounded-[2rem] p-10 z-[90] text-center">
              <div className="w-16 h-16 bg-school-red/10 text-school-red rounded-2xl flex items-center justify-center mx-auto mb-6"><Trash2 size={32}/></div>
              <h4 className="text-white font-black uppercase tracking-tight mb-2">Delete Facility?</h4>
              <p className="text-[10px] text-gray-500 font-bold mb-8">This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => setDeleting(null)} className="flex-1 py-3 bg-white/5 text-gray-400 font-black text-[10px] uppercase rounded-xl">Abort</button>
                <button onClick={() => handleDelete(isDeleting)} className="flex-1 py-3 bg-school-red text-white font-black text-[10px] uppercase rounded-xl shadow-lg shadow-school-red/20">Delete</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FacilitiesManager;
