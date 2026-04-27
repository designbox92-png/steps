import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Users, 
  Award, 
  TrendingUp, 
  Play,
  Star,
  Zap,
  BookOpen,
  Laptop,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/courses';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-brand-primary/5 to-transparent rounded-l-[100px]" />
      <div className="absolute -top-24 -left-24 -z-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Zap size={14} />
            Master High-Income Skills with Umar Farooq
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-[1] md:leading-[0.9] mb-6">
            Turn Your Skills into a Global Digital Empire.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Stop trading time for money. I'll show you the exact roadmap to master freelancing, digital marketing, and design to earn 6-figures from the global market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/courses" className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all group w-full sm:w-auto shadow-xl shadow-brand-primary/20">
                Explore Our Trainings
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/community" className="bg-white border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-brand-primary transition-all w-full sm:w-auto">
                Join Free Community
              </Link>
            </motion.div>
          </div>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-yellow-400 mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-gray-500 font-medium">Trusted by 100k+ Students</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://picsum.photos/seed/learning/800/1000" 
              alt="Digital Learning" 
              className="w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
              <motion.button 
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-xl transition-transform"
              >
                <Play fill="currentColor" />
              </motion.button>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-gray-50"
          >
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Earnings</p>
              <p className="text-lg font-bold">$1.2M+ Total</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-gray-50"
          >
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Globe size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Global Reach</p>
              <p className="text-lg font-bold">36+ Countries</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Students Trained', value: '100,000+', icon: Users },
    { label: 'Top Rated Sellers', value: '100+', icon: Award },
    { label: 'Agency Founders', value: '50+', icon: Laptop },
    { label: 'Years Excellence', value: '14+', icon: CheckCircle2 },
  ];

  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-brand-primary">
                <stat.icon size={24} />
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CoursesPreview = () => {
  const courses = COURSES.slice(0, 3);

  return (
      <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gray-50/50" />
      <div className="absolute top-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-brand-primary/10 rounded-full blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-brand-primary/5 rounded-full blur-[80px] md:blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand-primary/20">
              <Zap size={12} fill="currentColor" />
              Expert-Led Training
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Master the Skills That <br />
              <span className="text-brand-primary italic">Actually Pay.</span>
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Our premium trainings are designed by industry veterans who have built multi-million dollar digital businesses from scratch.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/courses" className="group flex items-center gap-4 bg-white border border-gray-200 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:border-brand-primary transition-all shadow-sm hover:shadow-md">
              View All Courses 
              <div className="w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[40px] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <Link to={`/course/${course.id}`} className="block">
                <div className="relative h-64 rounded-[32px] overflow-hidden mb-6">
                  <img 
                    src={course.image_url} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-sm">
                      {course.category}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="bg-brand-primary text-white py-3 rounded-xl font-bold text-center text-sm">
                      Enroll Now
                    </div>
                  </div>
                </div>
              </Link>

              <div className="px-4 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">4.9 (2.5k+ Reviews)</span>
                </div>
                
                <Link to={`/course/${course.id}`}>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-primary transition-colors leading-tight">
                    {course.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Course Fee</p>
                    <span className="font-display font-bold text-2xl text-brand-dark">PKR {course.price.toLocaleString()}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all">
                    <Zap size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmed Khan",
      role: "Top Rated Seller on Upwork",
      text: "Freelancing Skill was the turning point in my career. I started with zero knowledge of freelancing, and within 6 months, I was earning more than my corporate job.",
      image: "https://picsum.photos/seed/grad1/100/100",
      stats: "$50k+ Earned"
    },
    {
      name: "Sara Malik",
      role: "Agency Owner",
      text: "The mentorship at Freelancing Skill is unmatched. They don't just teach skills; they teach you how to build a sustainable business and lead a team.",
      image: "https://picsum.photos/seed/grad2/100/100",
      stats: "12+ Team Members"
    }
  ];

  return (
    <section className="py-32 bg-brand-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand-primary/30">
              <Star size={12} fill="currentColor" />
              Real Results
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-bold leading-[1] md:leading-[0.85] mb-6">
              Our Graduates <br />
              <span className="text-brand-primary italic">Lead the Industry.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Since 2011, we've helped thousands of Pakistanis break free from traditional career paths and build global digital empires.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="flex flex-col gap-8">
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 md:gap-8 animate-marquee group-hover:pause-animation">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i} 
                className="flex-shrink-0 w-[300px] md:w-[450px] bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-[32px] md:rounded-[40px] hover:bg-white/10 transition-all group/card"
              >
                <div className="flex justify-between items-start mb-6 md:mb-8">
                  <div className="flex gap-1 text-brand-primary">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="currentColor" />)}
                  </div>
                  <div className="text-[9px] md:text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 md:px-3 py-1 rounded-full">
                    {t.stats || 'Success Story'}
                  </div>
                </div>
                <p className="text-base md:text-xl font-medium mb-8 md:mb-10 leading-relaxed text-gray-200">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="relative">
                    <img 
                      src={t.image || `https://picsum.photos/seed/${t.name}/100/100`} 
                      alt={t.name} 
                      className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-brand-primary/30"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-brand-primary rounded-full flex items-center justify-center text-white border-2 border-brand-dark">
                      <CheckCircle2 size={8} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg text-white">{t.name}</h4>
                    <p className="text-gray-500 text-xs md:text-sm font-medium">{t.role || 'Graduate'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <div className="bg-gradient-to-br from-brand-primary/20 to-transparent p-1 rounded-[40px] md:rounded-[50px]">
          <div className="bg-brand-dark rounded-[38px] md:rounded-[48px] p-8 md:p-20 flex flex-col md:flex-row items-center gap-10 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">Want to be our next success story?</h3>
              <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10">
                Join the 100,000+ students who have already started their journey. Your global career starts here.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/courses" className="inline-flex items-center gap-3 bg-brand-primary text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-transform">
                  Start Your Journey <ArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
            <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-[32px] md:rounded-[40px] border border-white/10 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center mb-6">
                <TrendingUp size={32} />
              </div>
              <p className="text-3xl md:text-4xl font-display font-bold mb-2">$1.2M+</p>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-[10px] md:text-xs">Total Student Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <CoursesPreview />
      
      {/* Why Us Section */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="absolute -inset-10 bg-brand-primary/10 blur-[100px] rounded-full -z-10" />
          
          <div className="grid grid-cols-2 gap-6 relative">
            <div className="space-y-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-start"
              >
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen size={28} />
                </div>
                <h4 className="font-bold text-lg mb-2">Structured Learning</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Step-by-step curriculum from basics to advanced mastery.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-brand-primary p-8 rounded-[40px] shadow-xl shadow-brand-primary/20 flex flex-col items-start text-white"
              >
                <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
                  <Users size={28} />
                </div>
                <h4 className="font-bold text-lg mb-2">Expert Mentors</h4>
                <p className="text-white/80 text-sm leading-relaxed">Direct access to industry leaders and successful entrepreneurs.</p>
              </motion.div>
            </div>

            <div className="space-y-6 mt-12">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-brand-dark p-8 rounded-[40px] shadow-xl flex flex-col items-start text-white"
              >
                <div className="w-14 h-14 bg-white/10 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp size={28} />
                </div>
                <h4 className="font-bold text-lg mb-2">Career Growth</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Proven strategies to scale your income and build a global career.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-start"
              >
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Globe size={28} />
                </div>
                <h4 className="font-bold text-lg mb-2">Global Network</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Join a community of 100k+ graduates working worldwide.</p>
              </motion.div>
            </div>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand-primary/20">
            <CheckCircle2 size={12} fill="currentColor" />
            Why Learn with Umar Farooq?
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 leading-tight">
            Your Shortcut to Digital Mastery.
          </h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            Freelancing Skill isn't just another course platform. It's a hub where we test, refine, and share the exact strategies I use to dominate the global marketplace.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {[
              { label: "10k+", sub: "Students Mentored" },
              { label: "500+", sub: "Fiverr Pro Sellers" },
              { label: "100+", sub: "Agencies Built" },
              { label: "8+", sub: "Years of Experience" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-primary" />
                <div>
                  <p className="text-2xl font-display font-bold text-brand-dark">{stat.label}</p>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/courses" className="group bg-brand-dark text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-primary transition-all flex items-center gap-3 w-fit">
              Explore Our Courses
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      <Testimonials />
      
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-brand-dark rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 blur-[100px] -z-0" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -z-0" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Ready to Start Your Freelancing Skill Journey?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Join the thousands of freelancers earning global income. Start your journey from Beginner to Pro today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/courses" className="bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold text-lg transition-transform block">
                  Enroll in a Course
                </Link>
              </motion.div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
