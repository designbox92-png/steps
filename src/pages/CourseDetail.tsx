import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Shield, 
  Zap, 
  BookOpen,
  MessageSquare,
  Award,
  ChevronRight,
  PlayCircle,
  Loader2,
  ArrowLeft,
  Globe,
  Laptop,
  ShieldCheck
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  video_url?: string;
  instructor_name: string;
  skool_url: string;
  curriculum: string; // JSON string
  learning_outcomes: string; // JSON string
}

export const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <Link to="/courses" className="text-brand-primary font-bold">Back to Courses</Link>
      </div>
    );
  }

  const curriculum = JSON.parse(course.curriculum || '[]');
  const learningOutcomes = JSON.parse(course.learning_outcomes || '[]');

  return (
    <div className="bg-white pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors">
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative pb-20 overflow-hidden bg-brand-dark rounded-[60px] mx-6">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/10 blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-primary/5 blur-[120px] -z-0" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand-primary/30">
                <Star size={12} fill="currentColor" />
                Top Rated Training
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
                {course.title}
              </h1>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
                {course.description || 'Master this high-income skill with our comprehensive training program.'}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Students</p>
                    <p className="font-bold">5,000+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-primary">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Duration</p>
                    <p className="font-bold">8 Weeks</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-brand-primary">
                    <Award size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">Certificate</p>
                    <p className="font-bold">Included</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={course.skool_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-primary/20 flex items-center justify-center gap-3"
                >
                  Enroll via Skool
                  <ArrowRight size={20} />
                </a>
                <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-gray-400 text-sm">Course Fee:</span>
                  <span className="text-2xl font-display font-bold text-white">PKR {course.price.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white/10 relative group">
                <img 
                  src={course.image_url} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-dark/40 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-2xl">
                    <PlayCircle size={40} />
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Job Ready</p>
                    <p className="font-bold text-brand-dark">Practical Training</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+20}`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">+5k</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-4xl font-display font-bold text-brand-dark mb-8">What You'll Master</h2>
            <div className="grid gap-4">
              {learningOutcomes.map((outcome: string, idx: number) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-white hover:shadow-xl transition-all">
                  <div className="w-8 h-8 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed">{outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-display font-bold text-brand-dark mb-8">Course Curriculum</h2>
            <div className="space-y-4">
              {curriculum.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-6 rounded-3xl border border-gray-100 hover:border-brand-primary transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center font-bold text-sm group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all">
                      {idx + 1}
                    </div>
                    <h4 className="font-bold text-brand-dark">{item.title}</h4>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.duration}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-10 rounded-[40px] bg-brand-dark text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 blur-3xl" />
              <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
              <p className="text-gray-400 mb-8">Join our Skool community to access the full course content, live sessions, and mentorship.</p>
              <a 
                href={course.skool_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all"
              >
                Join Skool Community
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-16">
            <div className="w-64 h-64 rounded-[40px] overflow-hidden shadow-2xl flex-shrink-0">
              <img 
                src="https://picsum.photos/seed/instructor/600/600" 
                alt={course.instructor_name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4 block">Your Mentor</span>
              <h2 className="text-4xl font-display font-bold text-brand-dark mb-6">{course.instructor_name}</h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                With over 14 years of experience in the global market, I've helped thousands of students transition from traditional jobs to successful digital careers. This course is the culmination of everything I've learned.
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-3xl font-display font-bold text-brand-dark">100k+</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Students Mentored</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-brand-dark">14+</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-brand-dark">500+</p>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Success Stories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-display font-bold text-brand-dark mb-8">Don't Miss Your Chance to Master {course.title}</h2>
          <p className="text-xl text-gray-500 mb-12 leading-relaxed">
            Enroll today and get lifetime access to our community, templates, and weekly live Q&A sessions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href={course.skool_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-brand-primary text-white px-12 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-primary/20"
            >
              Enroll Now via Skool
            </a>
            <Link to="/courses" className="w-full sm:w-auto bg-gray-50 text-brand-dark px-12 py-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all">
              View Other Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
