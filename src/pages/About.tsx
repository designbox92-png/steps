import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Heart, Award, Users, Globe, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              Our Story
            </span>
            <h1 className="text-4xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Pioneering <span className="text-brand-primary">Digital Excellence</span> since 2011.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Freelancing Skill was founded by Umar Farooq with a single mission: to bridge the gap between traditional education and the rapidly evolving digital economy. Today, we are a leading ecosystem for digital skill development.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img 
              src="https://picsum.photos/seed/umar-farooq/800/600" 
              alt="Umar Farooq" 
              className="rounded-[40px] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand-primary text-white p-8 rounded-3xl shadow-xl">
              <p className="text-4xl font-display font-bold">14+</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Years of Impact</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col gap-6"
          >
            <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
              <Target size={32} />
            </div>
            <h2 className="text-3xl font-display font-bold">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To equip talent with global skills, real mentorship, and a thriving community, turning learning into lifelong income. We believe in empowering individuals to become self-reliant digital professionals.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-12 bg-brand-dark text-white rounded-[40px] shadow-xl flex flex-col gap-6"
          >
            <div className="w-16 h-16 bg-white/10 text-brand-primary rounded-2xl flex items-center justify-center">
              <Eye size={32} />
            </div>
            <h2 className="text-3xl font-display font-bold">Our Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              To see our students as global leaders in high-quality digital services. We envision a future where every young person has the opportunity to earn a dignified living through the global gig economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600">The principles that guide everything we do at Freelancing Skill.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Student Success First", icon: Heart, desc: "Your growth is our primary metric of success. We go the extra mile to ensure you win." },
              { title: "Practical Mentorship", icon: Award, desc: "We don't just teach theory. Umar Farooq is an active professional earning in the global market." },
              { title: "Community Power", icon: Users, desc: "We believe in the power of networking. Our community is your biggest asset for growth." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-gray-100 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-brand-primary/5 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Meet the Founder</h2>
            <p className="text-gray-600">The expert leading the digital revolution.</p>
          </div>
          <div className="max-w-xl mx-auto">
            <motion.div 
              whileHover={{ y: -10 }}
              className="group text-center"
            >
              <div className="relative h-[500px] rounded-[40px] overflow-hidden mb-8 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/umar-farooq-founder/600/800" 
                  alt="Umar Farooq" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-3xl font-display font-bold mb-2">Umar Farooq</h4>
              <p className="text-brand-primary text-lg font-medium uppercase tracking-widest">Founder & Lead Mentor</p>
              <p className="mt-6 text-gray-500 leading-relaxed">
                With over 14 years of experience in the digital marketplace, Umar Farooq has mentored thousands of students to achieve financial independence through freelancing and digital entrepreneurship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
