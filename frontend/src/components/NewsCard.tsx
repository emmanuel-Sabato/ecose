import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface NewsCardProps {
  id: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  description: string;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, image, category, date, readTime, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -12 }}
      className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <Link to={`/news/${id}`}>
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="px-4 py-1.5 rounded-full bg-school-gold/90 backdrop-blur-md text-black text-[10px] font-black uppercase tracking-widest shadow-lg">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center gap-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-school-green" />
              {date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-school-green" />
              {readTime}
            </div>
          </div>

          <h3 className="text-xl font-black text-black mb-4 leading-tight group-hover:text-school-green transition-colors duration-300">
            {title}
          </h3>

          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          <div className="flex items-center gap-2 text-black font-black text-[10px] uppercase tracking-[0.2em] group/btn cursor-pointer">
            <span className="relative">
              Read Story
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-school-gold group-hover/btn:w-full transition-all duration-300" />
            </span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300 text-school-gold" />
          </div>
        </div>
      </Link>

      {/* Subtle Glow Effect on Hover */}

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-school-gold/10 rounded-[2rem] pointer-events-none transition-colors duration-500" />
    </motion.div>
  );
};

export default NewsCard;
