import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Loader2 } from 'lucide-react';
import Navbar from './Navbar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import axios from 'axios';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/news/${id}`);
        setStory(response.data.data.news);
      } catch (err) {
        console.error('Fetch story failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <Loader2 size={48} className="text-school-green animate-spin mb-6" />
        <h2 className="text-black text-xs font-black uppercase tracking-[0.4em]">Fetching Story Archive</h2>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6 text-gray-200">
           <Bookmark size={40} />
        </div>
        <h1 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Story not found</h1>
        <Link to="/news">
           <button className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-school-green transition-all shadow-xl shadow-black/10">
              <ArrowLeft size={14} /> Back to News
           </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <TopNavbar />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          
          {/* Left Side: Premium Image Box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 lg:sticky lg:top-40"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-school-gold/10 rounded-[3rem] blur-2xl -z-10 group-hover:bg-school-gold/20 transition-colors duration-700" />
              
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl relative">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                <div className="absolute bottom-8 left-8">
                  <span className="px-6 py-2.5 rounded-full bg-black/80 backdrop-blur-xl text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/10">
                    {story.category}
                  </span>
                </div>
              </div>

              <div className="absolute top-8 right-8 flex flex-col gap-4 text-xs font-black">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl text-black hover:bg-school-gold transition-colors duration-300"
                >
                  <Share2 size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 pb-12"
          >
            <Link to="/news">
              <button className="inline-flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:text-black transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to News
              </button>
            </Link>

            <div className="flex items-center gap-6 text-school-green text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {new Date(story.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                {story.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-black mb-10 leading-[1.1] tracking-tight">
              {story.title}
            </h1>

            <div className="space-y-8 text-gray-600 text-lg leading-relaxed font-medium">
              <p className="border-l-4 border-school-gold pl-8 text-xl text-gray-800 italic">
                {story.description}
              </p>
              
              <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                {story.fullContent}
              </div>

              <div className="pt-12 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-school-gold/20 flex items-center justify-center font-black text-school-gold text-[10px]">
                  {story.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <div className="font-black text-black text-[10px] uppercase tracking-widest">Published By</div>
                  <div className="text-gray-400 text-xs font-bold">{story.author}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetail;
