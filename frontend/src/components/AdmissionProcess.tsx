import React from 'react';
import { Mail, FileText, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdmissionProcess: React.FC = () => {
  return (
    <section id="admissions" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 text-black">
          <span className="text-school-gold font-bold tracking-widest uppercase text-sm mb-4 block underline decoration-school-gold decoration-2 underline-offset-8">How To Apply</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Admission Process</h2>
          <div className="h-1 w-20 bg-school-gold mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <StepCard 
            step="01"
            icon={<Mail className="text-blue-900" size={24} />}
            title="Request Info"
            description="Contact our admission office or fill out our online inquiry form to receive detailed information about our programs."
          />
          <StepCard 
            step="02"
            icon={<FileText className="text-blue-900" size={24} />}
            title="Apply Online"
            description="Complete the online application form with all required academic records and personal documentation."
          />
          <StepCard 
            step="03"
            icon={<CreditCard className="text-blue-900" size={24} />}
            title="Submit & Pay"
            description="Submit your application and proceed with the registration fees to secure your entrance interview date."
          />
        </div>
      </div>
    </section>
  );
};

interface StepCardProps {
  step: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, icon, title, description }) => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center group"
    >
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-full border-2 border-school-gold flex items-center justify-center bg-white shadow-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 bg-blue-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
          STEP {step}
        </div>
      </div>
      <h3 className="text-xl font-bold text-black mb-4">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{description}</p>
      {step === '02' && (
        <button 
          onClick={() => navigate('/apply')}
          className="mt-6 px-6 py-2 bg-school-gold text-black font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-black hover:text-white transition-all shadow-lg shadow-school-gold/20"
        >
          Start Online Form
        </button>
      )}
    </motion.div>
  );
};

export default AdmissionProcess;
