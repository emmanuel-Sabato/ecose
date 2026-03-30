import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  Filter, 
  Newspaper,
  Edit2, 
  Trash2, 
  Image as ImageIcon,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

const CATEGORIES = ['Administration', 'Academic', 'Culture', 'Wellbeing', 'Sports', 'Events'];

const NewsManager: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleting, setDeleting] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    id: '', // for editing
    title: '',
    description: '',
    fullContent: '',
    category: 'Administration',
    readTime: '3 min read',
    author: 'Ecose Editorial Team',
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('https://ecose-backend.vercel.app/api/news');
      setNews(response.data.data.news);
    } catch (err) {
      console.error('Fetch news failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      fullContent: '',
      category: 'Administration',
      readTime: '3 min read',
      author: 'Ecose Editorial Team',
    });
    setSelectedImage(null);
    setImagePreview(null);
    setError('');
  };

  const handleEdit = (article: any) => {
    setFormData({
      id: article._id,
      title: article.title,
      description: article.description,
      fullContent: article.fullContent,
      category: article.category,
      readTime: article.readTime,
      author: article.author,
    });
    setImagePreview(article.image);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    const data = new FormData();
    Object.keys(formData).forEach(key => {
        if (key !== 'id') data.append(key, (formData as any)[key]);
    });
    if (selectedImage) {
      data.append('image', selectedImage);
    }

    try {
      if (formData.id) {
        await axios.patch(`https://ecose-backend.vercel.app/api/news/${formData.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('https://ecose-backend.vercel.app/api/news', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setModalOpen(false);
      resetForm();
      fetchNews();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save news post.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://ecose-backend.vercel.app/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight leading-none mb-3 uppercase">Media <span className="text-school-green">Pulse</span></h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Manage School News & Announcements</p>
        </div>
        <button 
          onClick={() => { resetForm(); setModalOpen(true); }}
          className="bg-school-green text-white px-6 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-school-green/20 hover:bg-[#2a7525] transition-all hover:-translate-y-1"
        >
          <Plus size={16} />
          Add New Post
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
           <input 
             type="text" 
             placeholder="Search articles by title or author..." 
             className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green/50 transition-all text-white"
           />
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3">
              <Filter size={14} />
              Filter
           </button>
        </div>
      </div>

      {/* News Table */}
      <div className="glass-dark rounded-[2.5rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/2">
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Article</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] hidden lg:table-cell">Category</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] hidden md:table-cell">Date</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Status</th>
              <th className="px-8 py-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.3em] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                   <td className="px-8 py-6"><div className="h-8 bg-white/5 rounded-xl w-48"></div></td>
                   <td className="px-8 py-6"><div className="h-4 bg-white/5 rounded-full w-20"></div></td>
                   <td className="px-8 py-6"><div className="h-4 bg-white/5 rounded-full w-24"></div></td>
                   <td className="px-8 py-6"><div className="h-4 bg-white/5 rounded-full w-16"></div></td>
                   <td className="px-8 py-6 text-right"><div className="h-8 bg-white/5 rounded-xl w-8 ml-auto"></div></td>
                </tr>
              ))
            ) : (
              news.map((item) => (
                <tr key={item._id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                         <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">by {item.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 hidden lg:table-cell">
                    <span className="text-[9px] font-black uppercase tracking-widest text-school-green bg-school-green/5 px-3 py-1 rounded-full border border-school-green/10">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 hidden md:table-cell">
                    <p className="text-[10px] font-bold text-gray-400">
                      {new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-school-green shadow-[0_0_8px_rgba(49,138,43,0.5)]"></div>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Published</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => handleEdit(item)}
                         className="p-2.5 bg-white/5 hover:bg-school-green/10 text-gray-400 hover:text-school-green rounded-xl transition-all border border-transparent hover:border-school-green/20"
                       >
                          <Edit2 size={14} />
                       </button>
                       <button 
                         onClick={() => setDeleting(item._id)}
                         className="p-2.5 bg-white/5 hover:bg-school-red/10 text-gray-400 hover:text-school-red rounded-xl transition-all border border-transparent hover:border-school-red/20"
                       >
                          <Trash2 size={14} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {!loading && news.length === 0 && (
          <div className="py-20 text-center">
             <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-600">
                <Newspaper size={32} />
             </div>
             <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No news articles found</p>
          </div>
        )}
      </div>

      {/* MODAL: ADD/EDIT POST */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-6 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[600px] lg:w-[800px] md:max-h-[90vh] bg-obsidian-800 border border-white/10 rounded-[2.5rem] shadow-2xl z-[70] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between flex-shrink-0">
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">
                    {formData.id ? 'Edit' : 'Create'} News <span className="text-school-green">Post</span>
                  </h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Publisher Interface v1.0</p>
                </div>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-8">
                {error && (
                  <div className="bg-school-red/10 border border-school-red/20 rounded-2xl p-4 flex items-center gap-3 text-school-red text-xs font-bold uppercase tracking-wider">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Article Title</label>
                       <input 
                         required
                         type="text" 
                         value={formData.title}
                         onChange={(e) => setFormData({...formData, title: e.target.value})}
                         placeholder="Enter headline..."
                         className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green/50 transition-all"
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Category</label>
                        <select 
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green/50 transition-all appearance-none"
                        >
                          {CATEGORIES.map(c => <option key={c} value={c} className="bg-obsidian-800">{c}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Read Time</label>
                        <input 
                          type="text" 
                          value={formData.readTime}
                          onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                          className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Brief Description</label>
                        <textarea 
                          required
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          rows={3}
                          placeholder="Short summary for the card view..."
                          className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green/50 transition-all resize-none"
                        />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Featured Image</label>
                       <div 
                         onClick={() => document.getElementById('news-image')?.click()}
                         className="aspect-square rounded-[2rem] bg-white/5 border-2 border-dashed border-white/10 hover:border-school-green/40 transition-all cursor-pointer overflow-hidden group flex flex-col items-center justify-center text-center p-6 relative"
                       >
                         {imagePreview ? (
                           <>
                             <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[9px] font-black text-white uppercase tracking-widest bg-black/60 px-4 py-2 rounded-full">Change Image</span>
                             </div>
                           </>
                         ) : (
                           <>
                             <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-gray-500 group-hover:text-school-green transition-colors">
                                <ImageIcon size={32} />
                             </div>
                             <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Upload Portrait Image</p>
                             <p className="text-[8px] text-gray-600 mt-2">Recommended: 1000x1250 px</p>
                           </>
                         )}
                       </div>
                       <input 
                         id="news-image"
                         type="file" 
                         accept="image/*"
                         onChange={handleImageChange}
                         className="hidden" 
                       />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Article Content</label>
                    <textarea 
                      required
                      value={formData.fullContent}
                      onChange={(e) => setFormData({...formData, fullContent: e.target.value})}
                      rows={8}
                      placeholder="Write the complete story here..."
                      className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-6 px-8 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-school-green/20 focus:border-school-green/50 transition-all resize-none leading-relaxed shadow-inner"
                    />
                </div>

                {/* Submit Buttons */}
                <div className="pt-6 border-t border-white/5 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={formLoading}
                    className="px-10 py-4 bg-school-green text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-school-green/20 hover:bg-[#2a7525] transition-all flex items-center gap-3"
                  >
                    {formLoading ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    {formData.id ? 'Save Changes' : 'Publish Story'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleting && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleting(null)} className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-obsidian-800 border border-white/10 rounded-[2.5rem] p-10 z-[90] text-center">
              <div className="w-16 h-16 bg-school-red/10 text-school-red rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-school-red/10">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Delete Story?</h3>
              <p className="text-xs text-gray-500 font-medium mb-8">This action is permanent and will remove the post from the official website.</p>
              <div className="flex gap-4">
                 <button onClick={() => setDeleting(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white">Abort</button>
                 <button onClick={() => handleDelete(isDeleting)} className="flex-1 py-4 bg-school-red rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-school-red/20">Confirm</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsManager;
