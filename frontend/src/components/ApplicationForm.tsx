import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  GraduationCap, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Loader2,
  Calendar
} from 'lucide-react';
import TopNavbar from './TopNavbar';
import Navbar from './Navbar';
import Footer from './Footer';

const STEPS = [
  { id: 1, title: 'Identity', icon: <User size={18} /> },
  { id: 2, title: 'Academics', icon: <GraduationCap size={18} /> },
  { id: 3, title: 'Guardian', icon: <Users size={18} /> }
];

const GRADES = [
  'Senior 1', 'Senior 2', 'Senior 3', 
  'Senior 4 (MPC)', 'Senior 4 (MCB)', 'Senior 4 (MCE)', 'Senior 4 (PCM)', 'Senior 4 (BCIC)',
  'Senior 5 (MPC)', 'Senior 5 (MCB)', 'Senior 5 (MCE)', 'Senior 5 (PCM)', 'Senior 5 (BCIC)',
  'Senior 6 (MPC)', 'Senior 6 (MCB)', 'Senior 6 (MCE)', 'Senior 6 (PCM)', 'Senior 6 (BCIC)'
];

const ApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '',
    address: '',
    previousSchool: '',
    gradeApplyingFor: 'Senior 1',
    parentName: '',
    parentPhone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== STEPS.length) return nextStep();

    setLoading(true);
    setError('');

    try {
      await axios.post('https://ecose-backend.vercel.app/api/applications/submit', formData);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed. Please check your data.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <TopNavbar />
        <Navbar />
        <main className="pt-40 pb-24 px-6 flex flex-col items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl bg-white p-12 rounded-[2.5rem] shadow-2xl border border-school-green/10"
          >
            <div className="w-20 h-20 bg-school-green/10 text-school-green rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-3xl font-black text-black mb-4 uppercase tracking-tight">Application <span className="text-school-green">Received!</span></h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Thank you for choosing Ecose St Kizito Musambira. Your application has been logged into our system. 
              Our admissions office will review your request and reach out via email shortly.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-10 py-4 bg-black text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-school-green transition-all"
            >
              Return Home
            </button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <TopNavbar />
      <Navbar />

      <main className="flex-grow pt-40 pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-16">
              <span className="text-school-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Student Enrollment 2026</span>
              <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">Admission <span className="text-school-green">Gateway</span></h1>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed">
                Begin your journey towards professional excellence. Fill out the application form carefully 
                to secure your spot at Ecose St Kizito Musambira.
              </p>
            </div>

            {/* Stepper */}
            <div className="flex justify-between items-center mb-12 relative max-w-md mx-auto">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 h-[2px] bg-school-green -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${(currentStep - 1) * 50}%` }} />
              
              {STEPS.map(step => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 
                    ${currentStep >= step.id ? 'bg-school-green border-school-green text-white shadow-lg shadow-school-green/20' : 'bg-white border-gray-100 text-gray-300'}`}
                  >
                    {currentStep > step.id ? <CheckCircle2 size={16} /> : step.icon}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest ${currentStep >= step.id ? 'text-school-green' : 'text-gray-400'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-black/[0.03] border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-school-green/[0.02] rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="p-10 md:p-16 relative z-10">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div 
                      key="step1" 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input icon={<User size={16}/>} label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" />
                        <Input icon={<Mail size={16}/>} label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                        <Input icon={<Phone size={16}/>} label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+250 788 XXX XXX" />
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Gender</label>
                          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-xs text-black focus:ring-2 focus:ring-school-green/20 outline-none">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <Input icon={<Calendar size={16}/>} label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                        <Input icon={<MapPin size={16}/>} label="Home Address" name="address" value={formData.address} onChange={handleChange} required placeholder="District, Sector, Cell" />
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div 
                      key="step2" 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input icon={<School size={16}/>} label="Previous School" name="previousSchool" value={formData.previousSchool} onChange={handleChange} required placeholder="Name of former institution" />
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Grade Applying For</label>
                          <select name="gradeApplyingFor" value={formData.gradeApplyingFor} onChange={handleChange} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-xs text-black focus:ring-2 focus:ring-school-green/20 outline-none">
                            {GRADES.map(grade => <option key={grade}>{grade}</option>)}
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div 
                      key="step3" 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input icon={<User size={16}/>} label="Parent/Guardian Name" name="parentName" value={formData.parentName} onChange={handleChange} required placeholder="Full name of guardian" />
                        <Input icon={<Phone size={16}/>} label="Guardian Phone" name="parentPhone" value={formData.parentPhone} onChange={handleChange} required placeholder="+250 788 XXX XXX" />
                      </div>
                      <div className="bg-school-gold/5 border border-school-gold/20 p-6 rounded-2xl">
                         <p className="text-[10px] font-bold text-school-gold uppercase tracking-widest flex items-center gap-2">
                           <CheckCircle2 size={12} /> Privacy Assurance
                         </p>
                         <p className="text-gray-500 text-[10px] mt-2 leading-relaxed">
                           By submitting this form, you authorize Ecose St Kizito to store and process your academic records 
                           for admission purposes. We respect your privacy according to national guidelines.
                         </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {error && <div className="mt-8 p-4 bg-school-red/10 text-school-red text-[10px] font-black uppercase tracking-widest rounded-2xl border border-school-red/20">{error}</div>}

                {/* Footer Actions */}
                <div className="flex justify-between items-center mt-12 pt-10 border-t border-gray-50">
                  <button 
                    type="button" 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${currentStep === 1 ? 'opacity-0' : 'text-gray-400 hover:text-black'}`}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="group relative flex items-center gap-3 bg-school-green text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-school-green/20 hover:bg-[#2a7525] active:scale-95 transition-all"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : (currentStep === STEPS.length ? 'Submit Final' : 'Proceed Next')}
                    {currentStep !== STEPS.length && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  icon: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, name, type = "text", value, onChange, required, placeholder, icon }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-gray-400 group-focus-within:text-school-green transition-colors uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        required={required} 
        placeholder={placeholder}
        className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 pr-12 text-xs text-black focus:ring-2 focus:ring-school-green/20 outline-none transition-all placeholder:text-gray-300 font-medium"
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-6 text-gray-300 group-focus-within:text-school-green transition-colors">
        {icon}
      </div>
    </div>
  </div>
);

export default ApplicationForm;
