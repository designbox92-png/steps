import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Users, Zap, Globe, ShieldCheck, Heart, ArrowRight, ExternalLink } from 'lucide-react';

export const Community = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-dark py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-brand-primary rounded-full blur-[150px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-primary rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              Stronger Together
            </span>
            <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              A Global <span className="text-brand-primary">Digital Community.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join 100,000+ freelancers, entrepreneurs, and digital experts mentored by Umar Farooq. Network, learn, and grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Join Skool Community <ExternalLink size={20} />
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                Join WhatsApp Group
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Community Matters */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight">
                Why our community is your <span className="text-brand-primary">unfair advantage.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Instant Support", desc: "Stuck on a project? Get help from peers and mentors in real-time.", icon: MessageCircle },
                  { title: "Networking Opportunities", desc: "Connect with potential partners, clients, and collaborators.", icon: Globe },
                  { title: "Exclusive Resources", desc: "Access templates, guides, and case studies shared only within the community.", icon: Zap }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center shrink-0">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/community-life/800/800" 
                alt="Community Interaction" 
                className="rounded-[60px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-10 -left-10 bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 max-w-[240px]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <img key={i} src={`https://picsum.photos/seed/user${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white" referrerPolicy="no-referrer" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-400">+100k</span>
                </div>
                <p className="text-sm font-bold text-gray-900">Active members sharing knowledge daily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Platforms */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Where we hang out</h2>
            <p className="text-gray-600">Choose the platform that works best for you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Skool", desc: "Our primary hub for structured learning, discussions, and leaderboards.", action: "Join Skool", color: "bg-indigo-600" },
              { name: "Facebook", desc: "Join our massive group for general discussions and success stories.", action: "Join Facebook", color: "bg-blue-600" },
              { name: "WhatsApp", desc: "Get instant alerts for new courses, webinars, and community meetups.", action: "Join WhatsApp", color: "bg-green-600" }
            ].map((platform, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${platform.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Users size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{platform.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">{platform.desc}</p>
                <button className={`w-full py-4 rounded-2xl text-white font-bold transition-transform hover:scale-105 ${platform.color}`}>
                  {platform.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
