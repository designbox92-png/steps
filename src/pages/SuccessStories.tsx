import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Quote, 
  Star, 
  ArrowRight, 
  Search, 
  MessageSquare, 
  User,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const blogStories = [
  {
    id: 1,
    title: "From a Small Village to $5,000/Month: Ahmed's Journey",
    excerpt: "How Ahmed mastered UI/UX design and built a global client base from his hometown in Punjab.",
    author: "Ahmed Khan",
    date: "Feb 15, 2025",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/story1/800/500",
    category: "Design Success"
  },
  {
    id: 2,
    title: "Building a Digital Agency with Freelancing Skill: The Story of 'Creative Pulse'",
    excerpt: "Zain and his team of 5 now manage marketing for 20+ international brands after completing our Mastery course.",
    author: "Zain Ul Abideen",
    date: "Jan 28, 2025",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/story2/800/500",
    category: "Agency Growth"
  },
  {
    id: 3,
    title: "How I Replaced My 9-5 with Freelancing in Just 4 Months",
    excerpt: "Sara shares her exact strategy for landing high-ticket clients on Upwork using the Freelancing Skill framework.",
    author: "Sara Malik",
    date: "Jan 10, 2025",
    readTime: "5 min read",
    image: "https://picsum.photos/seed/story3/800/500",
    category: "Career Shift"
  }
];

const videoTestimonials = [
  {
    id: 1,
    name: "Usman Ali",
    role: "Top Rated Plus Freelancer",
    thumbnail: "https://picsum.photos/seed/video1/600/400",
    duration: "4:20"
  },
  {
    id: 2,
    name: "Fatima Noor",
    role: "Social Media Strategist",
    thumbnail: "https://picsum.photos/seed/video2/600/400",
    duration: "3:15"
  },
  {
    id: 3,
    name: "Bilal Sheikh",
    role: "Shopify Expert",
    thumbnail: "https://picsum.photos/seed/video3/600/400",
    duration: "5:45"
  }
];

const textTestimonials = [
  {
    id: 1,
    text: "The mentorship at Freelancing Skill is what sets it apart. Umar doesn't just teach skills; he teaches you how to sell them. I made my first $1,000 within 2 months.",
    name: "Kamran J.",
    role: "Web Developer",
    rating: 5
  },
  {
    id: 2,
    text: "I was skeptical about online courses, but Freelancing Skill changed my life. The community support is incredible. Highly recommended for every freelancer.",
    name: "Ayesha R.",
    role: "Content Writer",
    rating: 5
  },
  {
    id: 3,
    text: "Best decision of my career. The course content is updated and very practical. I'm now working with clients from the US and UK.",
    name: "Omar D.",
    role: "SEO Specialist",
    rating: 5
  },
  {
    id: 4,
    text: "Freelancing Skill isn't just an institute; it's a family. The connections I made here helped me launch my own digital marketing agency.",
    name: "Sana M.",
    role: "Agency Owner",
    rating: 5
  }
];

export const SuccessStories = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-dark py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-brand-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-brand-primary rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6">
              Inspiration Hub
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Real People. <span className="text-brand-primary">Real Results.</span>
            </h1>
            <p className="text-gray-400 text-base md:text-xl mb-10 max-w-2xl mx-auto">
              Discover how thousands of students transformed their lives and careers through the Freelancing Skill ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 text-center md:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Video Testimonials</h2>
              <p className="text-gray-600 text-sm md:text-base">Watch our graduates share their journeys in their own words.</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-brand-primary font-bold text-sm md:text-base flex items-center gap-2 hover:gap-3 transition-all"
            >
              Watch More on YouTube <ExternalLink size={18} />
            </motion.button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, i) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-[32px] overflow-hidden shadow-lg aspect-video cursor-pointer"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex flex-col justify-between p-6">
                  <div className="flex justify-end">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} fill="currentColor" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{video.name}</h4>
                      <p className="text-white/70 text-xs">{video.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Stories Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Success Journeys</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              In-depth stories of transformation, hard work, and the power of digital skills.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {blogStories.map((story, i) => (
              <motion.article 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col group"
              >
                <div className="relative h-64 rounded-[40px] overflow-hidden mb-8 shadow-sm">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {story.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {story.readTime}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                  {story.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <User size={16} />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{story.author}</span>
                  </div>
                  <motion.button 
                    whileHover={{ x: 4 }}
                    className="text-brand-primary font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Read Story <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Text Testimonials Grid */}
      <section className="py-24 px-6 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] -z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">What Our Community Says</h2>
            <p className="text-gray-400">Join 10,000+ students who have already started their journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {textTestimonials.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[32px] flex flex-col"
              >
                <div className="text-brand-primary mb-6">
                  <Quote size={32} fill="currentColor" className="opacity-20" />
                </div>
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-8 flex-grow italic">
                  "{t.text}"
                </p>
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-brand-primary text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-brand-primary rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">Be Our Next Success Story</h2>
              <p className="text-white/80 text-base md:text-lg mb-10 max-w-2xl mx-auto">
                The only thing standing between you and your dream career is the first step. Take it today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/enroll" className="bg-brand-dark text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-transform block">
                    Enroll Now
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/courses" className="bg-white text-brand-primary px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:bg-gray-50 transition-all block">
                    Explore Courses
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
};
