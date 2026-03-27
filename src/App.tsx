/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  ChevronDown, 
  Phone, 
  Mail, 
  Globe, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  PhoneCall,
  Menu
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Constants ---
const COURSES = [
  "Core Java",
  "Python",
  "Cyber Security",
  "Full Stack Web Development",
  "Data Science",
  "AI Tools and Agents",
  "Machine Learning",
  "IT Foundation",
  "Digital Marketing",
  "VLSI Design and Embedded Systems",
  "Cloud Computing",
  "App Development for Cogito Insights AI",
  "Power BI",
  "Tableau"
];

const JOB_ROLES = [
  "Junior Web Developer",
  "AI and API Integrator",
  "Backend Developer",
  "Digital Marketing Executive",
  "Business Development Executive",
  "Full Stack Developer",
  "UI/UX Designer",
  "Data Scientist"
];

const HIRING_ROLES = [
  "Junior Web Developer",
  "AI and API integrator",
  "Backend Developer",
  "Digital Marketing",
  "Business Development Executives",
  "Full Stack Developer",
  "UI/UX Designer",
  "Data Scientist"
];

// --- Components ---

const Header = () => (
  <header className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 py-3 md:px-8 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
        C
      </div>
      <div>
        <h1 className="text-blue-900 font-black text-xl leading-tight tracking-tighter uppercase">
          Cognito Insights
        </h1>
        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">
          Solutions Pvt Ltd
        </p>
      </div>
    </div>
    
    <div className="hidden md:flex items-center gap-4">
      <button className="bg-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-blue-800 transition-all shadow-md hover:shadow-lg active:scale-95">
        <PhoneCall size={18} />
        Contact for any queries and issues faced
      </button>
    </div>
    
    <button className="md:hidden p-2 text-blue-900">
      <Menu size={24} />
    </button>
  </header>
);

const HiringMarquee = () => (
  <div className="bg-blue-900 text-white overflow-hidden whitespace-nowrap py-3 border-y border-blue-800/30">
    <motion.div 
      className="inline-block"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <div className="flex items-center gap-8">
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="font-bold text-sm flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              HIRING NOW:
            </span>
            {HIRING_ROLES.map((role, idx) => (
              <span key={idx} className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium border border-white/5">
                {role}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  </div>
);

const AccordionItem = ({ 
  title, 
  icon: Icon, 
  children, 
  isOpen, 
  onToggle 
}: { 
  title: string; 
  icon: any; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
}) => (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-4 transition-all hover:shadow-md">
    <button 
      onClick={onToggle}
      className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900">
          <Icon size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="text-gray-400" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 pb-8 pt-2 border-t border-gray-50">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Footer = () => (
  <footer className="bg-[#050505] text-white pt-20 pb-10 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold text-xl">
            C
          </div>
          <div>
            <h2 className="font-bold text-lg uppercase tracking-tight">Cognito Insights</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Solutions Pvt Ltd</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
          We are a leading technology solutions provider dedicated to empowering businesses through innovation and exceptional talent acquisition.
        </p>
        <div className="flex gap-4">
          {[Globe, Phone, Mail].map((Icon, i) => (
            <button key={i} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon size={18} className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-8 relative inline-block">
          Contact Details
          <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-600" />
        </h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
              <Phone size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Call Us</p>
              <p className="text-sm font-medium">+91 8978246111</p>
              <p className="text-sm font-medium">+91 8978247111</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
              <Mail size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Email Us</p>
              <p className="text-sm font-medium">info@cognitoinsights.ai</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
              <Globe size={18} className="text-blue-500" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Visit Us</p>
              <p className="text-sm font-medium">www.cognitoinsights.ai</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-8 relative inline-block">
          Quick Links
          <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-blue-600" />
        </h3>
        <ul className="space-y-4">
          {["About Cognito", "Our Services", "Career Portal", "Privacy Policy", "Terms of Use", "Contact Support"].map((link, i) => (
            <li key={i}>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 text-center">
      <p className="text-gray-500 text-xs">
        © 2026 Cognito Insights Solutions Pvt Ltd. Crafted with excellence.
      </p>
    </div>
  </footer>
);

export default function App() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>("personal");
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    branch: '',
    yearOfPassing: '',
    selectedCourse: '',
    preferredJobRole: '',
    agreed: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreed) {
      setError("Please agree to the terms and conditions.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to register');
      
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError("Failed to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const calculateProgress = () => {
    const fields = ['fullName', 'email', 'phone', 'collegeName', 'selectedCourse'];
    const filled = fields.filter(f => !!(formData as any)[f]).length;
    return Math.round((filled / fields.length) * 100);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <HiringMarquee />
      
      <main className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative"
        >
          {/* Main Card Header */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-t-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-10 -mb-10 blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
                  Cognito Internships, <br /> Training and Placement <br /> Support Registration
                </h2>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Form Completion</p>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-blue-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold">{calculateProgress()}%</span>
                  </div>
                </div>
              </div>
              <p className="text-blue-100 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
                Unlock your potential with Cognito Insights. Register now for our specialized training and placement support programs.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white rounded-b-[40px] p-6 md:p-12 shadow-xl -mt-4 relative z-20">
            {submitted ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-10">
                  Thank you for registering. Your details have been saved in our local database. Our team will review your application and contact you soon.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-lg active:scale-95"
                >
                  Register Another Student
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <AccordionItem 
                  title="Personal Details" 
                  icon={User} 
                  isOpen={openSection === "personal"}
                  onToggle={() => setOpenSection(openSection === "personal" ? null : "personal")}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="name@example.com"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem 
                  title="Education Details" 
                  icon={GraduationCap} 
                  isOpen={openSection === "education"}
                  onToggle={() => setOpenSection(openSection === "education" ? null : "education")}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">College Name</label>
                      <input 
                        type="text" 
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your college name"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Branch / Degree</label>
                      <input 
                        type="text" 
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        placeholder="e.g. B.Tech CSE"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Year of Passing</label>
                      <select 
                        name="yearOfPassing"
                        value={formData.yearOfPassing}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="">Select Year</option>
                        {[2023, 2024, 2025, 2026, 2027].map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem 
                  title="Program Preferences" 
                  icon={Briefcase} 
                  isOpen={openSection === "preferences"}
                  onToggle={() => setOpenSection(openSection === "preferences" ? null : "preferences")}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Interested Course</label>
                      <select 
                        name="selectedCourse"
                        value={formData.selectedCourse}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="">Select a Course</option>
                        {COURSES.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Preferred Job Role</label>
                      <select 
                        name="preferredJobRole"
                        value={formData.preferredJobRole}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                      >
                        <option value="">Select a Role</option>
                        {JOB_ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </AccordionItem>

                <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50">
                  <label className="flex items-start gap-4 cursor-pointer group">
                    <div className="relative flex items-center mt-1">
                      <input 
                        type="checkbox" 
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleInputChange}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-200 bg-white transition-all checked:bg-blue-600 checked:border-blue-600"
                      />
                      <CheckCircle2 className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" />
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">
                      I hereby declare that all the information provided above is true to the best of my knowledge. I agree to the <a href="#" className="text-blue-600 font-bold underline underline-offset-4">Terms & Conditions</a> of Cognito Insights.
                    </span>
                  </label>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium"
                  >
                    <AlertCircle size={18} />
                    {error}
                  </motion.div>
                )}

                <div className="flex flex-col md:flex-row gap-4 pt-6">
                  <button 
                    type="submit"
                    disabled={submitting}
                    className={cn(
                      "flex-1 bg-blue-900 text-white px-8 py-5 rounded-3xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-blue-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3",
                      submitting && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {submitting ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "Register Now"
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({
                      fullName: '', email: '', phone: '', collegeName: '', 
                      branch: '', yearOfPassing: '', selectedCourse: '', preferredJobRole: '', agreed: false
                    })}
                    className="px-8 py-5 bg-white border border-gray-200 text-gray-600 rounded-3xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 size={20} className="text-red-500" />
                    Clear Form
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </main>

      <Footer />

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-900 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-blue-800 transition-colors"
      >
        <Phone size={28} />
      </motion.button>
    </div>
  );
}
