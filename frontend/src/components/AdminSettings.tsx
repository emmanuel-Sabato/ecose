import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Save, 
  Shield, 
  Globe, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCcw
} from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>({
    schoolName: '',
    contactEmail: '',
    contactPhone: '',
    contactAddress: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: ''
    },
    securityBranding: '',
    maintenanceMode: false
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Password update state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('https://ecose-backend.vercel.app/api/settings');
      setSettings(response.data.data.settings);
    } catch (err) {
      console.error('Fetch settings failed:', err);
      setError('Failed to load settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    try {
      await axios.patch('https://ecose-backend.vercel.app/api/settings', settings, { withCredentials: true });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update settings.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setPwdSaving(true);
    setPwdSuccess(false);
    setError('');

    try {
      // Assuming endpoint exists or handling via authController.updatePassword
      await axios.patch('https://ecose-backend.vercel.app/api/auth/updatePassword', {
        currentPassword: passwords.currentPassword,
        password: passwords.newPassword,
        passwordConfirm: passwords.confirmPassword
      }, { withCredentials: true });
      
      setPwdSuccess(true);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPwdSuccess(false), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setPwdSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 size={48} className="text-school-gold animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 text-center">Configuring Settings Center...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight leading-none mb-3 uppercase">Command <span className="text-school-gold">Settings</span></h1>
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Global Configurations & Security Preferences</p>
      </div>

      <form onSubmit={handleSettingsSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Section: General Info */}
        <section className="glass-dark rounded-[2.5rem] border border-white/5 p-10 space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-2xl bg-school-gold/10 text-school-gold shadow-xl shadow-school-gold/5">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">General Info</h3>
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Public Website Contacts</p>
            </div>
          </div>

          <div className="space-y-6">
            <InputGroup label="School Name" value={settings.schoolName} onChange={(val) => setSettings({...settings, schoolName: val})} icon={<RefreshCcw size={14}/>} placeholder="Full School Name" />
            <InputGroup label="Official Email" value={settings.contactEmail} onChange={(val) => setSettings({...settings, contactEmail: val})} icon={<Mail size={14}/>} placeholder="info@school.rw" />
            <InputGroup label="Official Phone" value={settings.contactPhone} onChange={(val) => setSettings({...settings, contactPhone: val})} icon={<Phone size={14}/>} placeholder="+250 XXX XXX XXX" />
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Physical Address</label>
              <div className="relative">
                <textarea 
                  value={settings.address} 
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-gold/20 resize-none h-24"
                />
                <div className="absolute top-4 right-4 text-gray-500"><MapPin size={14}/></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Social Links */}
        <section className="glass-dark rounded-[2.5rem] border border-white/5 p-10 space-y-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-2xl bg-school-green/10 text-school-green shadow-xl shadow-school-green/5">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Social Connect</h3>
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Manage Global Presence</p>
            </div>
          </div>

          <div className="space-y-6">
            <InputGroup label="Facebook URL" value={settings.socialLinks.facebook} onChange={(val) => setSettings({...settings, socialLinks: {...settings.socialLinks, facebook: val}})} icon={<Globe size={14}/>} placeholder="https://facebook.com/..." />
            <InputGroup label="Twitter URL" value={settings.socialLinks.twitter} onChange={(val) => setSettings({...settings, socialLinks: {...settings.socialLinks, twitter: val}})} icon={<Globe size={14}/>} placeholder="https://twitter.com/..." />
            <InputGroup label="Instagram URL" value={settings.socialLinks.instagram} onChange={(val) => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: val}})} icon={<Globe size={14}/>} placeholder="https://instagram.com/..." />
            <InputGroup label="Youtube URL" value={settings.socialLinks.youtube} onChange={(val) => setSettings({...settings, socialLinks: {...settings.socialLinks, youtube: val}})} icon={<Globe size={14}/>} placeholder="https://youtube.com/..." />
          </div>
        </section>

        {/* Section: Security Branding */}
        <section className="glass-dark rounded-[2.5rem] border border-white/5 p-10 space-y-8 lg:col-span-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 shadow-xl shadow-purple-500/5">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Infrastructure</h3>
              <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Security & Maintenance</p>
            </div>
          </div>

          <div className="space-y-6">
            <InputGroup label="Security Label" value={settings.securityBranding} onChange={(val) => setSettings({...settings, securityBranding: val})} icon={<Lock size={14}/>} placeholder="Secured By..." />
            
            <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] group hover:bg-white/[0.04] transition-all">
               <div>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Maintenance Mode</h4>
                  <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mt-1">Hide public site</p>
               </div>
               <button 
                type="button"
                onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                className={`w-12 h-6 rounded-full relative transition-colors duration-500 ${settings.maintenanceMode ? 'bg-school-gold' : 'bg-white/10'}`}
               >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 ${settings.maintenanceMode ? 'left-7' : 'left-1'}`} />
               </button>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <div className="lg:col-span-2 flex justify-end">
           <button 
            type="submit" 
            disabled={saving}
            className="group relative overflow-hidden bg-school-gold text-black px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-school-gold/30 hover:bg-[#e6c200] transition-all flex items-center gap-3 active:scale-95"
           >
              {saving ? <Loader2 size={16} className="animate-spin" /> : (success ? <CheckCircle2 size={16} /> : <Save size={16} />)}
              {saving ? 'Synchronizing...' : (success ? 'Config Saved' : 'Commit Changes')}
           </button>
        </div>
      </form>

      {/* Account Security Section */}
      <section className="glass-dark rounded-[3rem] border border-white/10 p-12 mt-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-school-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        
        <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
          <div className="md:w-1/3">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/10 text-white shadow-xl">
                  <Lock size={20} />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Security <span className="text-school-gold">Vault</span></h3>
             </div>
             <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8">
               Update your administrative access credentials. We recommend using a unique passphrase that is not used elsewhere.
             </p>
             {pwdSuccess && <div className="text-school-green text-[10px] font-black uppercase tracking-widest flex items-center gap-2 bg-school-green/10 p-4 rounded-xl border border-school-green/20"><CheckCircle2 size={14}/> Credentials Updated Successfully!</div>}
          </div>

          <form onSubmit={handlePasswordSubmit} className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
             <div className="md:col-span-2">
                <InputGroup label="Current Password" type="password" value={passwords.currentPassword} onChange={(val) => setPasswords({...passwords, currentPassword: val})} icon={<Lock size={14}/>} />
             </div>
             <InputGroup label="New Security Key" type="password" value={passwords.newPassword} onChange={(val) => setPasswords({...passwords, newPassword: val})} icon={<RefreshCcw size={14}/>} />
             <InputGroup label="Verify New Key" type="password" value={passwords.confirmPassword} onChange={(val) => setPasswords({...passwords, confirmPassword: val})} icon={<Shield size={14}/>} />
             
             <div className="md:col-span-2 pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={pwdSaving}
                  className="bg-black text-white border border-white/10 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3 shadow-2xl"
                >
                  {pwdSaving ? <Loader2 size={14} className="animate-spin" /> : <Shield size={14} />}
                  Reset Security Credentials
                </button>
             </div>
          </form>
        </div>
      </section>

      {error && (
        <div className="fixed bottom-10 right-10 bg-red-500/90 backdrop-blur-md text-white px-8 py-5 rounded-2xl shadow-2xl z-[100] flex items-center gap-4 border border-white/10 animate-in slide-in-from-right duration-500">
           <AlertCircle size={20} />
           <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
        </div>
      )}
    </div>
  );
};

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, value, onChange, icon, placeholder = "", type = "text" }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-gray-500 group-hover:text-gray-400 transition-colors uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 pr-12 text-xs text-white focus:outline-none focus:ring-2 focus:ring-school-gold/20 transition-all font-medium placeholder:text-gray-700"
      />
      <div className="absolute top-1/2 -translate-y-1/2 right-6 text-gray-600 group-hover:text-school-gold transition-colors duration-500">
        {icon}
      </div>
    </div>
  </div>
);

export default AdminSettings;
