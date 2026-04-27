import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  ArrowLeft,
  Zap,
  Star,
  MessageSquare
} from 'lucide-react';
import { COURSES } from '../data/courses';
import { SITE_SETTINGS } from '../data/settings';

export const Enroll = () => {
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get('courseId');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState('easypaisa');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const selectedCourse = COURSES.find(c => c.id === Number(initialCourseId)) || COURSES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!selectedCourse) return null;

  if (isSubmitted) {
    return (
      <div className="pt-32 min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white rounded-[40px] p-12 text-center shadow-xl border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">Request Submitted!</h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Thank you for your interest in <span className="font-bold text-brand-dark">{selectedCourse.title}</span>. 
            Please send your payment screenshot to our WhatsApp support to get instant access to the course.
          </p>
          <div className="space-y-4">
            <a 
              href={`https://wa.me/${SITE_SETTINGS.contact_phone.replace(/[^0-9]/g, '')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-green-500/20 hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              Chat on WhatsApp
            </a>
            <Link to="/courses" className="block text-gray-400 font-bold hover:text-brand-primary transition-colors">
              Back to Courses
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brand-primary transition-colors mb-4">
            <ArrowLeft size={16} />
            Back to Courses
          </Link>
          <h1 className="text-4xl font-display font-bold text-brand-dark">Enroll in {selectedCourse.title}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div 
              layout
              className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100"
            >
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-display font-bold mb-6">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Enter your full name"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-primary outline-none transition-all"
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          placeholder="Enter your email"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-primary outline-none transition-all"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-bold text-gray-600 ml-1">WhatsApp Number</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="e.g. +92 300 1234567"
                          className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-brand-primary outline-none transition-all"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-display font-bold mb-6">Payment Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {[
                        { id: 'easypaisa', name: 'EasyPaisa / JazzCash', icon: Smartphone, color: 'text-green-600', bg: 'bg-green-50' },
                        { id: 'bank', name: 'Bank Transfer', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
                      ].map((method) => (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col gap-4 ${
                            paymentMethod === method.id 
                              ? 'border-brand-primary bg-brand-primary/5' 
                              : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <div className={`w-12 h-12 ${method.bg} ${method.color} rounded-2xl flex items-center justify-center`}>
                            <method.icon size={24} />
                          </div>
                          <span className="font-bold text-gray-900">{method.name}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <ShieldCheck className="text-brand-primary" size={20} />
                        Payment Instructions
                      </h3>
                      <div className="space-y-4 text-sm text-gray-600">
                        {paymentMethod === 'easypaisa' ? (
                          <div className="space-y-2">
                            <p>Account Title: <span className="font-bold text-gray-900">Umar Farooq</span></p>
                            <p>EasyPaisa Number: <span className="font-bold text-gray-900">0300 1234567</span></p>
                            <p>JazzCash Number: <span className="font-bold text-gray-900">0300 1234567</span></p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p>Bank Name: <span className="font-bold text-gray-900">Meezan Bank</span></p>
                            <p>Account Title: <span className="font-bold text-gray-900">Umar Farooq</span></p>
                            <p>Account Number: <span className="font-bold text-gray-900">1234 5678 9012 3456</span></p>
                            <p>IBAN: <span className="font-bold text-gray-900">PK00 MEZN 0000 1234 5678 9012</span></p>
                          </div>
                        )}
                        <p className="pt-4 border-t border-gray-200 italic">
                          * After payment, please send the screenshot to our WhatsApp support for manual activation.
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/20 hover:bg-brand-dark transition-all flex items-center justify-center gap-2"
                  >
                    Submit Enrollment Request
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-display font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedCourse.image_url} 
                    alt={selectedCourse.title} 
                    className="w-20 h-20 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight mb-1">{selectedCourse.title}</h4>
                    <p className="text-xs text-brand-primary font-bold uppercase tracking-wider">Professional Training</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Course Fee</span>
                    <span className="font-bold text-gray-900">PKR {selectedCourse.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Registration Fee</span>
                    <span className="text-green-600 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-50">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-display font-bold text-brand-primary">PKR {selectedCourse.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-brand-dark text-white p-8 rounded-[40px]">
              <h4 className="font-bold mb-6 flex items-center gap-2">
                <Star className="text-brand-primary" size={18} fill="currentColor" />
                Why Join Freelancing Skill?
              </h4>
              <ul className="space-y-4">
                {[
                  "8+ Years of Excellence",
                  "10k+ Successful Graduates",
                  "Lifetime Community Access",
                  "Direct Mentorship"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-400 font-medium">
                    <CheckCircle2 size={16} className="text-brand-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
