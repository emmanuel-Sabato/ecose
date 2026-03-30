import React from 'react';
import { motion } from 'framer-motion';
import { Construction, Sparkles, Layout } from 'lucide-react';

interface AdminComingSoonProps {
  title: string;
  description: string;
}

const AdminComingSoon: React.FC<AdminComingSoonProps> = ({ title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-[calc(100vh-12rem)] flex items-center justify-center p-8"
    >
      <div className="max-w-md w-full text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-school-green/5 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <div className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 text-school-green mb-8 shadow-2xl shadow-school-green/10">
            <Construction size={48} className="animate-pulse" />
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-4 uppercase">
            {title} <br/>
            <span className="text-gray-600">is being evolved</span>
          </h1>

          <p className="text-sm text-gray-400 font-medium leading-relaxed mb-10">
            {description}
          </p>

          <div className="flex flex-col gap-4">
             <div className="flex items-center justify-center gap-3 py-3 px-6 rounded-2xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                <Layout size={14} />
                Portal Architecture v4.0.2
             </div>
             
             <div className="flex items-center justify-center gap-3 text-school-gold">
                <Sparkles size={16} className="animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-widest">Premium Interface</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminComingSoon;
