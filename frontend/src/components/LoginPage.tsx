import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, UserCircle, Loader2, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Configure axios for session-based auth
axios.defaults.withCredentials = true;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://ecose-backend.vercel.app/api/auth/login', {
        email,
        password
      });

      if (response.data.status === 'success') {
        navigate('/admin');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Connection failed. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-school-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-school-green/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6 group">
            <motion.img 
              whileHover={{ scale: 1.05 }}
              src="/assets/ecose-logo.png" 
              alt="Ecose Logo" 
              className="h-20 w-auto drop-shadow-2xl" 
            />
          </Link>
          <h1 className="text-2xl font-black text-black tracking-tight mb-2 uppercase">Gate<span className="text-school-green">way</span></h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Ecose St Kizito Portal</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-black/5 border border-gray-100 relative overflow-hidden">
          {/* Subtle accent bar at the top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-school-gold via-school-green to-school-gold opacity-50" />
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Error Message Display */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-school-red/10 border border-school-red/20 rounded-xl p-4 flex items-center gap-3 text-school-red text-xs font-bold uppercase tracking-wider"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 ml-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-school-green transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-school-green/5 focus:border-school-green transition-all duration-300"
                  placeholder="name@ecose.rw"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Password</label>
                <Link to="#" className="text-[9px] font-black border-b border-school-gold/30 hover:border-school-gold text-school-gold uppercase tracking-[0.2em] transition-all">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-school-green transition-colors">
                  <Lock size={16} />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 focus:ring-school-green/5 focus:border-school-green transition-all duration-300"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-black transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 ml-2">
              <input type="checkbox" className="w-4 h-4 rounded-md border-gray-200 text-school-green focus:ring-school-green cursor-pointer" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Keep me logged in</span>
            </div>

            {/* Login Button */}
            <motion.button 
              disabled={loading}
              whileHover={!loading ? { scale: 1.02, backgroundColor: '#2a7525' } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className={`w-full bg-school-green text-white font-black rounded-2xl py-4 px-6 text-xs uppercase tracking-[0.3em] shadow-xl shadow-school-green/20 flex items-center justify-center gap-3 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  Verifying...
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Access Portal
                  <ArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Alternative Logins */}
          <div className="mt-10 pt-8 border-t border-gray-50">
            <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Secured By MAGICPENTAGON</p>
            <div className="flex justify-center gap-4">
               <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 cursor-help hover:bg-white hover:text-school-green transition-all duration-300 group">
                  <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
               </div>
               <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-400 cursor-help hover:bg-white hover:text-school-gold transition-all duration-300 group">
                  <UserCircle size={20} className="group-hover:scale-110 transition-transform" />
               </div>
            </div>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-10">
          <Link to="/">
            <button className="text-[10px] font-black text-gray-400 hover:text-black uppercase tracking-[0.3em] transition-colors flex items-center gap-2 mx-auto">
              <ArrowRight size={14} className="rotate-180" />
              Back to Campus Website
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
