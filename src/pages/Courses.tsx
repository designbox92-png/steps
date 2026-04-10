import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, Clock, Users, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  instructor_name: string;
}

export const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/courses');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setCourses(data);
          // Derive unique categories from courses
          const uniqueCats = Array.from(new Set(data.map((c: any) => c.category))).filter(Boolean) as string[];
          setCategories(['All', ...uniqueCats]);
        } else {
          console.error('API returned non-array data:', data);
          setError('Failed to load courses. Invalid data format.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to connect to the server. Please try again later.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-brand-primary mx-auto mb-4" size={48} />
          <p className="text-gray-500 font-medium">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-2xl font-display font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-10 leading-relaxed">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-brand-dark">
        <div className="absolute top-0 right-0 -z-0 w-1/2 h-full bg-gradient-to-l from-brand-primary/10 to-transparent rounded-l-[100px]" />
        <div className="absolute -top-24 -left-24 -z-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Star size={14} fill="currentColor" />
              Join 5,000+ Successful Students
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-8"
            >
              Master the Skills That <span className="text-brand-primary">Drive Results.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 mb-12 max-w-xl leading-relaxed"
            >
              Industry-vetted courses designed to take you from beginner to professional. Start your journey towards financial independence today.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-xl"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="What do you want to learn today?"
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 py-6 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mr-2 hidden lg:block">Categories:</span>
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/25' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          
          <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <Filter size={16} className="text-brand-primary" />
              <span>{filteredCourses.length} Courses</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
              <span className="text-gray-400">Sort by:</span>
              <select className="bg-transparent focus:outline-none cursor-pointer text-brand-dark">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Explore Our <span className="text-brand-primary">Programs</span></h2>
              <p className="text-gray-500 max-w-xl">Browse through our curated list of high-impact courses designed for the modern digital economy.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-px w-24 bg-gray-200 hidden lg:block" />
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Showing {filteredCourses.length} results</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCourses.map((course, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={course.id}
                className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <Link to={`/course/${course.id}`} className="block relative">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={course.image_url} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <div className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary shadow-lg">
                        {course.category}
                      </div>
                      {i === 0 && (
                        <div className="bg-brand-primary px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                          Bestseller
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-white text-xs font-medium">
                        Learn: {course.description.split('.')[0]}...
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1.5 text-yellow-400">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gray-900 ml-1">4.9</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs font-bold bg-gray-50 px-3 py-1 rounded-full">
                      <Clock size={14} className="text-brand-primary" />
                      12 Weeks
                    </div>
                  </div>
                  
                  <Link to={`/course/${course.id}`}>
                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                      {course.title}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-brand-primary font-bold border-2 border-white shadow-md">
                      {course.instructor_name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Instructor</p>
                      <p className="text-sm font-bold text-gray-900">{course.instructor_name || 'Umar Farooq'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Users size={14} className="text-brand-primary" />
                      1.2k Students
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <CheckCircle2 size={14} className="text-green-500" />
                      Certificate
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Course Fee</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-display font-bold text-brand-dark">PKR {course.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-400 line-through font-medium">PKR {(course.price * 1.5).toLocaleString()}</span>
                      </div>
                    </div>
                    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                      <Link to={`/course/${course.id}`} className="bg-brand-primary text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20">
                        Enroll
                        <ArrowRight size={18} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">No Courses Found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="mt-6 text-brand-primary font-bold hover:underline"
              >
                Clear All Filters
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-10 grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-white p-10 rounded-[48px] shadow-xl shadow-gray-200/50 border border-gray-50 transition-all"
                  >
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                      <Users size={32} />
                    </div>
                    <h4 className="text-2xl font-display font-bold mb-3">Expert Mentors</h4>
                    <p className="text-gray-500 leading-relaxed">Learn from industry veterans with years of real-world experience.</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-brand-primary p-10 rounded-[48px] shadow-2xl shadow-brand-primary/30 text-white transition-all translate-y-8"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                      <Star size={32} />
                    </div>
                    <h4 className="text-2xl font-display font-bold mb-3">Top Rated</h4>
                    <p className="text-white/80 leading-relaxed">Consistently rated 4.9/5 by our global community of students.</p>
                  </motion.div>
                </div>
                <div className="space-y-6 pt-16">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-brand-dark p-10 rounded-[48px] shadow-xl shadow-black/10 text-white transition-all"
                  >
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                      <Clock size={32} />
                    </div>
                    <h4 className="text-2xl font-display font-bold mb-3">Flexible</h4>
                    <p className="text-white/60 leading-relaxed">Study at your own pace with lifetime access to all materials.</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="bg-white p-10 rounded-[48px] shadow-xl shadow-gray-200/50 border border-gray-50 transition-all translate-y-8"
                  >
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-8">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-2xl font-display font-bold mb-3">Verified</h4>
                    <p className="text-gray-500 leading-relaxed">Get certificates that are recognized by top global employers.</p>
                  </motion.div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-6">
                Our Competitive Edge
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-[1.1]">
                We don't just teach skills, we build <span className="text-brand-primary italic">Careers.</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Our curriculum is designed in collaboration with industry leaders to ensure you're learning exactly what the market demands right now.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  { title: 'Hands-on practical projects', desc: 'Apply what you learn with real-world assignments.' },
                  { title: 'Weekly live Q&A sessions', desc: 'Get your doubts cleared directly by Umar Farooq.' },
                  { title: 'Private community access', desc: 'Network with thousands of like-minded achievers.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-dark mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-dark text-white px-12 py-5 rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-2xl shadow-brand-dark/20 flex items-center gap-3"
              >
                Explore Our Method
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-32 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-primary rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Success <span className="text-brand-primary">Stories</span></h2>
            <p className="text-gray-400 text-lg">Hear from our students who transformed their lives through our specialized training programs.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Khan",
                role: "Full-time Freelancer",
                text: "Before this course, I was struggling to find clients. Now I'm earning $3k+ monthly on Upwork. The roadmap provided by Umar is pure gold.",
                image: "https://picsum.photos/seed/ahmed/100/100"
              },
              {
                name: "Sara Malik",
                role: "UI/UX Designer",
                text: "The design principles I learned here are world-class. I landed a job at a top agency within 2 months of completing the certification.",
                image: "https://picsum.photos/seed/sara/100/100"
              },
              {
                name: "Zain Ali",
                role: "Digital Marketer",
                text: "The practical approach to marketing is what sets this apart. We didn't just learn theory, we ran real campaigns that delivered results.",
                image: "https://picsum.photos/seed/zain/100/100"
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[48px] hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-primary/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-brand-primary text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-400 italic leading-relaxed text-lg">"{testimonial.text}"</p>
                <div className="mt-8 flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-32 bg-white px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Your Path to <span className="text-brand-primary italic">Mastery</span></h2>
            <p className="text-gray-600 text-lg">We've streamlined the learning process into four simple steps to ensure your success.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10" />
            
            {[
              { step: "01", title: "Choose Path", desc: "Select the skill that aligns with your goals." },
              { step: "02", title: "Learn & Build", desc: "Watch lessons and build real-world projects." },
              { step: "03", title: "Get Certified", desc: "Pass the assessment and receive your certificate." },
              { step: "04", title: "Start Earning", desc: "Apply for jobs or start your freelance career." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl group-hover:border-brand-primary transition-all duration-500">
                  <span className="text-2xl font-display font-bold text-brand-primary">{item.step}</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ/Support Section */}
      <section className="py-32 bg-gray-50 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 rounded-l-[100px] -z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">Need Help <span className="text-brand-primary">Choosing?</span></h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Our career counselors are available to help you pick the right path based on your interests and goals. Don't let indecision hold you back.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-primary text-white px-12 py-5 rounded-2xl font-bold transition-all shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-3"
                >
                  Talk to an Expert
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border-2 border-gray-100 px-12 py-5 rounded-2xl font-bold hover:border-brand-primary transition-all flex items-center justify-center gap-3"
                >
                  View FAQ
                </motion.button>
              </div>
            </div>
            
            <div className="bg-white p-12 rounded-[48px] shadow-2xl shadow-gray-200/50 border border-gray-50">
              <h3 className="text-2xl font-display font-bold mb-8">Quick Contact</h3>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Message</label>
                  <textarea className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-primary transition-all h-32" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-brand-primary transition-all shadow-xl">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-brand-primary px-6">
        <div className="max-w-5xl mx-auto bg-brand-dark rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand-primary rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-primary rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Stay Ahead of the <span className="text-brand-primary">Curve</span></h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">Subscribe to our newsletter and get exclusive tips, early access to new courses, and special discounts delivered to your inbox.</p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-primary transition-all"
              />
              <button className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-brand-dark transition-all shadow-lg">Subscribe</button>
            </form>
            <p className="mt-6 text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
