import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock, Globe, Facebook, Twitter, Instagram, Linkedin, CheckCircle2, Loader2 } from 'lucide-react';

export const Contact = () => {
  const [settings, setSettings] = useState<any>({});
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error('Contact error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Let's Start a <span className="text-brand-primary">Conversation.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Have questions about our courses, community, or enrollment? Our team is here to help you every step of the way.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white text-brand-primary rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Email Us</h3>
                  <p className="text-xl font-bold text-brand-dark">{settings.contact_email || 'info@freelancingskill.com'}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white text-brand-primary rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Call Us</h3>
                  <p className="text-xl font-bold text-brand-dark">{settings.contact_phone || '+92 300 1234567'}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-white text-brand-primary rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Visit Us</h3>
                  <p className="text-xl font-bold text-brand-dark">{settings.contact_address || 'Gulberg III, Lahore, Pakistan'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl border border-gray-100"
          >
            {success ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Message Sent!</h2>
                <p className="text-gray-500 mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} className="text-brand-primary font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-display font-bold mb-8">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Ahmed Khan" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="ahmed@example.com" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                    <input 
                      type="text" 
                      placeholder="How can we help?" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="Tell us more about your inquiry..." 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-primary transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-2 group"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : (
                      <>
                        Send Message
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ / Support Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Support Hours</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Monday - Friday: 9 AM - 6 PM<br />
                Saturday: 10 AM - 2 PM<br />
                Sunday: Closed
              </p>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Live Chat</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Need instant help? Connect with our support team via WhatsApp.
              </p>
              <button className="text-brand-primary font-bold hover:underline">Start Chat Now</button>
            </div>
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Social Media</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Follow us for the latest updates and digital tips.
              </p>
              <div className="flex justify-center gap-4">
                <Facebook className="text-gray-400 hover:text-brand-primary cursor-pointer transition-colors" size={20} />
                <Twitter className="text-gray-400 hover:text-brand-primary cursor-pointer transition-colors" size={20} />
                <Instagram className="text-gray-400 hover:text-brand-primary cursor-pointer transition-colors" size={20} />
                <Linkedin className="text-gray-400 hover:text-brand-primary cursor-pointer transition-colors" size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
