import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings, 
  Layout, 
  BookOpen, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  ChevronRight, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Link as LinkIcon,
  PlusCircle,
  MinusCircle,
  Loader2
} from 'lucide-react';

// Types
interface Course {
  id?: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  instructor_name: string;
  curriculum: any[];
  learning_outcomes: string[];
  skool_url: string;
}

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'pages' | 'courses'>('settings');
  const [settings, setSettings] = useState<any>({});
  const [courses, setCourses] = useState<Course[]>([]);
  const [sections, setSections] = useState<Record<string, any>>({});
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [settingsRes, coursesRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/courses')
      ]);
      
      const settingsData = await settingsRes.json();
      const coursesData = await coursesRes.json();
      
      setSettings(settingsData);
      setCourses(coursesData.map((c: any) => ({
        ...c,
        curriculum: JSON.parse(c.curriculum || '[]'),
        learning_outcomes: JSON.parse(c.learning_outcomes || '[]')
      })));

      // Fetch Home Sections
      const sectionIds = ['home_hero', 'home_why_us', 'home_testimonials'];
      const sectionData: Record<string, any> = {};
      for (const id of sectionIds) {
        const res = await fetch(`/api/sections/${id}`);
        if (res.ok) {
          sectionData[id] = await res.json();
        }
      }
      setSections(sectionData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setMessage({ type: 'error', text: 'Invalid password' });
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      setMessage({ type: 'success', text: 'Settings saved successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    }
    setIsSaving(false);
  };

  const saveSection = async (id: string, content: any) => {
    setIsSaving(true);
    try {
      await fetch(`/api/sections/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      });
      setMessage({ type: 'success', text: 'Section saved successfully' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save section' });
    }
    setIsSaving(false);
  };

  const saveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    
    setIsSaving(true);
    try {
      const method = editingCourse.id ? 'PUT' : 'POST';
      const url = editingCourse.id ? `/api/courses/${editingCourse.id}` : '/api/courses';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCourse)
      });
      
      setMessage({ type: 'success', text: 'Course saved successfully' });
      setEditingCourse(null);
      fetchData();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save course' });
    }
    setIsSaving(false);
  };

  const deleteCourse = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      setMessage({ type: 'success', text: 'Course deleted' });
      fetchData();
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete course' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Settings size={32} />
            </div>
            <h1 className="text-3xl font-display font-bold text-brand-dark">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Enter your password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-xl shadow-brand-primary/10">
              Access Dashboard
            </button>
          </form>
          
          {message && (
            <div className={`mt-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {message.text}
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-brand-dark text-white p-8 flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center font-bold text-xl">FS</div>
          <span className="font-display font-bold text-xl">CMS Panel</span>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'settings' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={20} />
            Settings
          </button>
          <button 
            onClick={() => setActiveTab('pages')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'pages' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Layout size={20} />
            Pages
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'courses' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <BookOpen size={20} />
            Courses
          </button>
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all mt-auto"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-display font-bold text-brand-dark capitalize">{activeTab} Management</h2>
              <p className="text-gray-500 mt-2">Manage your website content and configuration</p>
            </div>
            {activeTab === 'courses' && (
              <button 
                onClick={() => setEditingCourse({ 
                  title: '', slug: '', description: '', price: 0, category: '', image_url: '', instructor_name: '', curriculum: [], learning_outcomes: [], skool_url: '' 
                })}
                className="bg-brand-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20"
              >
                <Plus size={20} />
                Add New Course
              </button>
            )}
          </div>

          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-8 p-6 rounded-[32px] flex items-center justify-between gap-3 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
            >
              <div className="flex items-center gap-3">
                {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                {message.text}
              </div>
              <button onClick={() => setMessage(null)}><X size={18} /></button>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <Globe size={20} className="text-brand-primary" />
                    General Info
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Site Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                      value={settings.site_name || ''}
                      onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Logo Text</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                      value={settings.logo_text || ''}
                      onChange={(e) => setSettings({ ...settings, logo_text: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <Mail size={20} className="text-brand-primary" />
                    Contact Details
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                      value={settings.contact_email || ''}
                      onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                      value={settings.contact_phone || ''}
                      onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-50 flex justify-end">
                <button 
                  onClick={saveSettings}
                  disabled={isSaving}
                  className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-primary transition-all disabled:opacity-50 shadow-xl shadow-brand-primary/10"
                >
                  <Save size={20} />
                  {isSaving ? 'Saving...' : 'Save All Settings'}
                </button>
              </div>
            </div>
          )}

          {/* Pages Tab */}
          {activeTab === 'pages' && (
            <div className="space-y-8">
              {/* Home Hero Section */}
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Layout size={24} className="text-brand-primary" />
                  Home Hero Section
                </h3>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Hero Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                      value={sections.home_hero?.title || ''}
                      onChange={(e) => setSections({ ...sections, home_hero: { ...sections.home_hero, title: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Hero Subtitle</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all h-32"
                      value={sections.home_hero?.subtitle || ''}
                      onChange={(e) => setSections({ ...sections, home_hero: { ...sections.home_hero, subtitle: e.target.value } })}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">CTA Button Text</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                        value={sections.home_hero?.cta_text || ''}
                        onChange={(e) => setSections({ ...sections, home_hero: { ...sections.home_hero, cta_text: e.target.value } })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Intro Video URL</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                        value={sections.home_hero?.video_url || ''}
                        onChange={(e) => setSections({ ...sections, home_hero: { ...sections.home_hero, video_url: e.target.value } })}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-end">
                  <button 
                    onClick={() => saveSection('home_hero', sections.home_hero)}
                    disabled={isSaving}
                    className="bg-brand-dark text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-primary transition-all shadow-lg shadow-brand-primary/10"
                  >
                    <Save size={20} />
                    Save Hero Section
                  </button>
                </div>
              </div>

              {/* Home Why Us Section */}
              <div className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Layout size={24} className="text-brand-primary" />
                  Home "Why Us" Section
                </h3>
                <div className="grid gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Section Title</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                      value={sections.home_why_us?.title || ''}
                      onChange={(e) => setSections({ ...sections, home_why_us: { ...sections.home_why_us, title: e.target.value } })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Section Subtitle</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all h-32"
                      value={sections.home_why_us?.subtitle || ''}
                      onChange={(e) => setSections({ ...sections, home_why_us: { ...sections.home_why_us, subtitle: e.target.value } })}
                    />
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-end">
                  <button 
                    onClick={() => saveSection('home_why_us', sections.home_why_us)}
                    disabled={isSaving}
                    className="bg-brand-dark text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-primary transition-all shadow-lg shadow-brand-primary/10"
                  >
                    <Save size={20} />
                    Save Why Us Section
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="grid gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-xl transition-all">
                  <div className="w-32 h-24 rounded-2xl overflow-hidden bg-gray-100">
                    <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded-full">{course.category}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PKR {course.price.toLocaleString()}</span>
                    </div>
                    <h4 className="text-xl font-bold text-brand-dark">{course.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">{course.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setEditingCourse(course)}
                      className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-brand-primary/10 hover:text-brand-primary transition-all"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button 
                      onClick={() => course.id && deleteCourse(course.id)}
                      className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Course Editor Modal */}
      <AnimatePresence>
        {editingCourse && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingCourse(null)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-2xl font-display font-bold text-brand-dark">
                  {editingCourse.id ? 'Edit Course' : 'Create New Course'}
                </h3>
                <button onClick={() => setEditingCourse(null)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={saveCourse} className="flex-1 overflow-y-auto p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <Layout size={16} />
                      Basic Information
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">Course Title</label>
                      <input 
                        type="text" required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                        value={editingCourse.title}
                        onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">Slug (URL)</label>
                      <input 
                        type="text" required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                        value={editingCourse.slug}
                        onChange={(e) => setEditingCourse({ ...editingCourse, slug: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2">Price (PKR)</label>
                        <input 
                          type="number" required
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                          value={editingCourse.price}
                          onChange={(e) => setEditingCourse({ ...editingCourse, price: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2">Category</label>
                        <input 
                          type="text" required
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                          value={editingCourse.category}
                          onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <ImageIcon size={16} />
                      Media & Links
                    </h4>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">Image URL</label>
                      <input 
                        type="text" required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                        value={editingCourse.image_url}
                        onChange={(e) => setEditingCourse({ ...editingCourse, image_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">Skool Community URL</label>
                      <input 
                        type="text" required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                        value={editingCourse.skool_url}
                        onChange={(e) => setEditingCourse({ ...editingCourse, skool_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-2">Instructor Name</label>
                      <input 
                        type="text" required
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all"
                        value={editingCourse.instructor_name}
                        onChange={(e) => setEditingCourse({ ...editingCourse, instructor_name: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Edit2 size={16} />
                    Course Description
                  </h4>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-primary transition-all h-32"
                    value={editingCourse.description}
                    onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  />
                </div>

                {/* Curriculum Editor */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <BookOpen size={16} />
                      Curriculum (Landing Page Content)
                    </h4>
                    <button 
                      type="button"
                      onClick={() => setEditingCourse({ ...editingCourse, curriculum: [...editingCourse.curriculum, { title: '', duration: '' }] })}
                      className="text-brand-primary font-bold text-xs flex items-center gap-1 hover:underline"
                    >
                      <PlusCircle size={14} /> Add Lesson
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editingCourse.curriculum.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <input 
                          type="text" placeholder="Lesson Title"
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm"
                          value={item.title}
                          onChange={(e) => {
                            const newCur = [...editingCourse.curriculum];
                            newCur[idx].title = e.target.value;
                            setEditingCourse({ ...editingCourse, curriculum: newCur });
                          }}
                        />
                        <input 
                          type="text" placeholder="Duration"
                          className="w-24 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm"
                          value={item.duration}
                          onChange={(e) => {
                            const newCur = [...editingCourse.curriculum];
                            newCur[idx].duration = e.target.value;
                            setEditingCourse({ ...editingCourse, curriculum: newCur });
                          }}
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const newCur = editingCourse.curriculum.filter((_, i) => i !== idx);
                            setEditingCourse({ ...editingCourse, curriculum: newCur });
                          }}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <MinusCircle size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes Editor */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={16} />
                      Learning Outcomes
                    </h4>
                    <button 
                      type="button"
                      onClick={() => setEditingCourse({ ...editingCourse, learning_outcomes: [...editingCourse.learning_outcomes, ''] })}
                      className="text-brand-primary font-bold text-xs flex items-center gap-1 hover:underline"
                    >
                      <PlusCircle size={14} /> Add Outcome
                    </button>
                  </div>
                  <div className="space-y-3">
                    {editingCourse.learning_outcomes.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <input 
                          type="text" placeholder="Outcome"
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm"
                          value={item}
                          onChange={(e) => {
                            const newOut = [...editingCourse.learning_outcomes];
                            newOut[idx] = e.target.value;
                            setEditingCourse({ ...editingCourse, learning_outcomes: newOut });
                          }}
                        />
                        <button 
                          type="button"
                          onClick={() => {
                            const newOut = editingCourse.learning_outcomes.filter((_, i) => i !== idx);
                            setEditingCourse({ ...editingCourse, learning_outcomes: newOut });
                          }}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <MinusCircle size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>

              <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-8 py-3 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveCourse}
                  disabled={isSaving}
                  className="bg-brand-dark text-white px-10 py-3 rounded-2xl font-bold hover:bg-brand-primary transition-all shadow-xl shadow-brand-primary/10 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
