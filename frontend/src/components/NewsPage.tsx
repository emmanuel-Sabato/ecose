import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import NewsCard from './NewsCard';
import { Newspaper, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-xs">
      <TopNavbar />
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Header Section */}
        <section className="container mx-auto px-6 mb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-school-gold/5 rounded-full blur-[100px] -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-gray-100 mb-6 shadow-sm">
              <div className="p-1.5 rounded-full bg-school-gold/10">
                <Newspaper className="text-school-gold" size={16} />
              </div>
              <span className="text-[10px] tracking-[0.3em] font-black uppercase text-gray-400">Media Center</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tight">
              Latest <span className="text-school-green">News</span> & Updates
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Stay informed about our latest initiatives, community achievements, 
              and the vibrant life at Ecose St Kizito Musambira.
            </p>
          </motion.div>
        </section>

        {/* News Grid */}
        <section className="container mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={48} className="text-school-green animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading Stories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {news.map((item, index) => (
                <NewsCard 
                  key={item._id} 
                  id={item._id}
                  image={item.image}
                  category={item.category}
                  date={new Date(item.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  readTime={item.readTime}
                  title={item.title}
                  description={item.description}
                  index={index} 
                />
              ))}
            </div>
          )}

          {/* Pagination Placeholder */}
          {!loading && news.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="mt-20 flex justify-center items-center gap-4"
            >
              <button className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-school-gold hover:text-black transition-all duration-500 shadow-xl shadow-black/10">
                Load More Stories
                <ChevronRight size={14} />
              </button>
            </motion.div>
          )}

          {!loading && news.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100">
               <Newspaper size={48} className="mx-auto text-gray-200 mb-6" />
               <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No stories published yet.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
