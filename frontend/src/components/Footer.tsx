import React, { useState, useEffect } from 'react';
import { Globe, MessageSquare, Share2, PlayCircle, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get('https://ecose-backend.vercel.app/api/settings');
      setSettings(res.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Globe size={20} />;
      case 'twitter': return <Globe size={20} />;
      case 'instagram': return <Globe size={20} />;
      case 'youtube': return <Globe size={20} />;
      default: return <Globe size={20} />;
    }
  };

  return (
    <footer id="footer" className="bg-[#0a0b10] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-school-gold/5 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-school-green/5 rounded-full blur-[120px] translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* School Identity */}
          <div className="lg:col-span-4">
            <img src="/assets/ecose-logo.png" alt="Ecose Logo" className="h-20 w-auto mb-8" />
            <h3 className="text-2xl font-bold mb-6 tracking-tight">
              {settings?.schoolName ? (
                <>
                  {settings.schoolName.split(' ').slice(0, -1).join(' ')} <br/>
                  <span className="text-school-gold">{settings.schoolName.split(' ').slice(-1)}</span>
                </>
              ) : (
                <>ECOSE ST KIZITO <br/><span className="text-school-gold">MUSAMBIRA</span></>
              )}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Empowering students with knowledge, integrity, and resilience since our foundation. 
              Dedicated to shaping the next generation of leaders in Rwanda.
            </p>
            <div className="flex gap-4">
              {settings?.socialLinks && settings.socialLinks.length > 0 ? (
                settings.socialLinks.map((link: any, idx: number) => (
                  <SocialIcon key={idx} icon={getSocialIcon(link.platform)} href={link.url} />
                ))
              ) : (
                <>
                  <SocialIcon icon={<Globe size={20} />} href="#" />
                  <SocialIcon icon={<MessageSquare size={20} />} href="#" />
                  <SocialIcon icon={<Share2 size={20} />} href="#" />
                  <SocialIcon icon={<PlayCircle size={20} />} href="#" />
                </>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-school-gold font-bold text-xs tracking-[0.2em] uppercase mb-10">Quick Links</h4>
            <ul className="space-y-4">
              <FooterLink label="Home" href="/" />
              <FooterLink label="About Us" href="/#about" />
              <FooterLink label="Academics" href="/#academics" />
              <FooterLink label="Admissions" href="/#admissions" />
              <FooterLink label="Gallery" href="/#gallery" />
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-school-gold font-bold text-xs tracking-[0.2em] uppercase mb-10">Resources</h4>
            <ul className="space-y-4">
              <FooterLink label="School News" href="/news" />
              <FooterLink label="Calendar" href="/calendar" />
              <FooterLink label="Facilities" href="/facilities" />
              <FooterLink label="Apply Online" href="/apply" />
              <FooterLink label="Contact" href="/#footer" />
              <FooterLink label="Portals" href="/portals" />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4 className="text-school-gold font-bold text-xs tracking-[0.2em] uppercase mb-10">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-school-gold group-hover:bg-school-gold group-hover:text-black transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Our Location</p>
                  <p className="text-gray-400 text-sm">{settings?.contactAddress || 'Musambira, Kamonyi, Southern Province, Rwanda'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-school-gold group-hover:bg-school-gold group-hover:text-black transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Phone Number</p>
                  <p className="text-gray-400 text-sm">{settings?.contactPhone || '+250 XXX XXX XXX'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-school-gold group-hover:bg-school-gold group-hover:text-black transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email Address</p>
                  <p className="text-gray-400 text-sm">{settings?.contactEmail || 'info@ecosemusambira.rw'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-xs tracking-widest uppercase font-medium">
            © {currentYear} {settings?.schoolName || 'ECOSE ST KIZITO MUSAMBIRA'}. ALL RIGHTS RESERVED.
          </div>
          
          {/* Powered By Section */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 py-2 px-5 rounded-full bg-white/5 border border-white/10 hover:border-school-gold/30 transition-all duration-300 group shadow-lg"
          >
            <span className="text-gray-400 text-[10px] tracking-[0.2em] uppercase font-bold">Powered by</span>
            <div className="flex items-center gap-2">
              <img src="/assets/magicpentagonicon.png" alt="Magic Pentagon" className="h-6 w-auto grayscale group-hover:grayscale-0 transition-all duration-500" />
              <span className="text-white text-xs font-black tracking-tighter group-hover:text-school-gold transition-colors">{settings?.securityBranding || 'MAGICPENTAGON'}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink: React.FC<{ label: string; href: string }> = ({ label, href }) => {
  const isExternal = href.startsWith('/') && !href.includes('#');
  
  if (isExternal) {
    return (
      <li>
        <Link 
          to={href} 
          className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-300 flex items-center group gap-2"
        >
          <span className="w-0 group-hover:w-2 h-[1px] bg-school-gold transition-all duration-300" />
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-white text-sm font-medium transition-all duration-300 flex items-center group gap-2"
      >
        <span className="w-0 group-hover:w-2 h-[1px] bg-school-gold transition-all duration-300" />
        {label}
      </a>
    </li>
  );
};

const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-school-gold hover:text-black hover:border-school-gold transition-all duration-500 hover:-translate-y-1 shadow-lg"
  >
    {icon}
  </a>
);

export default Footer;
