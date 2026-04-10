import React, { useState, useEffect } from 'react';
import { Globe, BookOpen, Users, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const [settings, setSettings] = useState<any>({ site_name: 'Freelancing Skill', logo_text: 'FS' });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Settings fetch error:', err));
  }, []);

  return (
    <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {settings.logo_url ? (
                <img src={settings.logo_url} alt={settings.site_name} className="h-10 w-auto object-contain" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">{settings.logo_text}</div>
              )}
              <span className="font-display font-bold text-2xl tracking-tighter">{settings.site_name}</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Master your freelance career with Umar Farooq. Learn the secrets of digital success and build a sustainable income through expert-led courses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-brand-primary hover:border-brand-primary transition-all">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-brand-primary transition-colors">Our Courses</Link></li>
              <li><Link to="/success-stories" className="hover:text-brand-primary transition-colors">Success Stories</Link></li>
              <li><Link to="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-center gap-2">
                <Globe size={16} />
                www.freelancingskill.com
              </li>
              <li className="flex items-center gap-2">
                <BookOpen size={16} />
                LMS Portal
              </li>
              <li className="flex items-center gap-2">
                <Users size={16} />
                Skool Community
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium uppercase tracking-widest">
          <p>© 2025 Freelancing Skill. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-primary">Privacy Policy</a>
            <a href="#" className="hover:text-brand-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
