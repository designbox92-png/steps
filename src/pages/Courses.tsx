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
      {/* Header */}
      <section className="bg-brand-dark py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-primary rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            Master the Skills That <span className="text-brand-primary">Matter</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-10"
          >
            Choose from our industry-vetted courses and start your journey towards financial independence.
          </motion.p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for courses (e.g. 'Marketing', 'Figma')..."
              className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pl-16 pr-6 text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 md:py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar mask-fade-right">
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
          
          <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
            <Filter size={18} />
            <span>{filteredCourses.length} Courses Found</span>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                key={course.id}
                className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <Link to={`/course/${course.id}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={course.image_url} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                      {course.category}
                    </div>
                  </div>
                </Link>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold text-gray-900">4.9</span>
                      <span className="text-xs text-gray-400 font-medium">(1.2k)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
                      <Clock size={14} />
                      12 Weeks
                    </div>
                  </div>
                  
                  <Link to={`/course/${course.id}`}>
                    <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-brand-primary transition-colors">
                      {course.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{course.description}</p>
                  
                  <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2 size={14} className="text-green-500" />
                      Professional Certification
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle2 size={14} className="text-green-500" />
                      Lifetime Access
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Course Fee</p>
                      <p className="text-xl font-display font-bold text-brand-dark">PKR {course.price.toLocaleString()}</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Link to={`/course/${course.id}`} className="bg-brand-dark text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-brand-primary transition-all group/btn">
                        <ArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
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

      {/* FAQ/Support Section */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-10">
            Our career counselors are available to help you pick the right path based on your interests and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-bold transition-transform"
            >
              Talk to an Expert
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-gray-200 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all"
            >
              View FAQ
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};
