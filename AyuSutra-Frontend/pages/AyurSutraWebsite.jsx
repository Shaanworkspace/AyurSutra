import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Bell, TrendingUp, Users, Shield, Clock, FileText, Stethoscope, Menu, X, User, Heart, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const AyurSutraWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent therapy scheduling with automated conflict resolution and optimal resource allocation for Panchakarma treatments.",
      color: "from-green-400 to-emerald-600"
    },
    {
      icon: Bell,
      title: "Intelligent Notifications",
      description: "Real-time alerts for appointments, treatment reminders, and patient status updates with customizable notification preferences.",
      color: "from-teal-400 to-cyan-600"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Comprehensive progress monitoring with detailed analytics, treatment outcomes, and patient improvement metrics.",
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Complete patient profiles with medical history, treatment plans, and personalized Ayurvedic consultation records.",
      color: "from-indigo-400 to-purple-600"
    },
    {
      icon: Stethoscope,
      title: "Treatment Protocols",
      description: "Standardized Panchakarma protocols with customizable treatment plans and therapy sequence management.",
      color: "from-purple-400 to-pink-600"
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Secure digital documentation with treatment notes, prescriptions, and regulatory compliance features.",
      color: "from-pink-400 to-rose-600"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Efficient time slot management with therapist availability tracking and optimal appointment scheduling.",
      color: "from-rose-400 to-red-600"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "HIPAA-compliant data protection with encrypted storage and secure access controls for patient privacy.",
      color: "from-red-400 to-orange-600"
    }
  ];

  const dashboardStats = [
    { value: "18", label: "Today's Sessions", delay: 0.1 },
    { value: "94%", label: "Success Rate", delay: 0.2 },
    { value: "75%", label: "Treatment Progress", delay: 0.3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            style={{ y: heroY }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-8 pb-8"
            >
              AyurSutra
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Revolutionary Panchakarma patient management software that streamlines{' '}
              <span className="text-green-600 font-semibold">therapy scheduling</span>,{' '}
              <span className="text-green-600 font-semibold">intelligent notifications</span>, and{' '}
              <span className="text-green-600 font-semibold">comprehensive progress tracking</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Login as User Button */}
                <Link to="/register?profile=user">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
                  >
                    <User className="w-5 h-5" />
                    Register as User
                  </motion.button>
                </Link>

                {/* Login as Doctor Button */}
                <Link to="/register?profile=doctor">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
                  >
                    <Stethoscope className="w-5 h-5" />
                    Register as Doctor
                  </motion.button>
                </Link>

                {/* Register as Therapist Button */}
                <Link to="/register?profile=therapist">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Register as Therapist
                  </motion.button>
                </Link>

                {/* Login Button */}
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-green-200 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all flex items-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    Login
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
        {/* 3D Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Main Dashboard Container */}
          <div className="relative">
            {/* 3D Dashboard Mockup */}
            <motion.div
              initial={{ rotateX: 45, rotateY: -15 }}
              animate={{ rotateX: 15, rotateY: -5 }}
              transition={{ duration: 2, delay: 2.2 }}
              className="relative"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">AyurSutra Dashboard</h3>
                      <p className="text-emerald-100 text-sm">Patient Management System</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-emerald-600">247</div>
                      <div className="text-sm text-gray-600">Active Patients</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-teal-600">18</div>
                      <div className="text-sm text-gray-600">Today's Sessions</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-cyan-600">94%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">45m</div>
                      <div className="text-sm text-gray-600">Avg. Session</div>
                    </div>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="bg-white rounded-lg p-4 h-32">
                    <div className="flex items-end space-x-2 h-full">
                      {[65, 45, 80, 55, 70, 60, 85, 75].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 1, delay: 2.5 + i * 0.1 }}
                          className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-sm flex-1"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 2.8 }}
              className="absolute -left-8 top-1/4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200"
            >
              <div className="text-left">
                <h4 className="font-semibold text-gray-800 mb-2">Next Appointment</h4>
                <p className="text-sm text-gray-600">Priya Sharma</p>
                <p className="text-sm text-emerald-600 font-medium">Abhyanga - 2:30 PM</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, y: -30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 3 }}
              className="absolute -right-6 top-1/3 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200"
            >
              <div className="text-left">
                <h4 className="font-semibold text-gray-800 mb-2">Treatment Progress</h4>
                <div className="w-24 bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 3.2 }}
                    className="bg-emerald-500 h-2 rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-600">75% Complete</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 3.2 }}
              className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-gray-200"
            >
              <div className="text-center">
                <div className="text-lg font-bold text-teal-600">Real-time Sync</div>
                <div className="text-xs text-gray-600">All devices connected</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your Panchakarma practice efficiently and provide exceptional patient care
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  className="group cursor-pointer"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-3 mb-6"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                </div>
                <span className="text-2xl font-bold">AyurSutra</span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-300 mb-6 max-w-md"
              >
                Revolutionizing Panchakarma practice management with intelligent scheduling, 
                comprehensive patient tracking, and seamless workflow automation.
              </motion.p>
              
              <div className="space-y-2 text-gray-300">
                <p>📧 contact@ayursutra.com</p>
                <p>📞 +1 (555) 123-4567</p>
                <p>📍 123 Wellness Street, Healthcare City</p>
              </div>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Documentation", "API Reference", "Integrations"]
              },
              {
                title: "Company", 
                links: ["About Us", "Careers", "Press", "Partners", "Contact"]
              },
              {
                title: "Resources",
                links: ["Blog", "Help Center", "Community", "Webinars", "Case Studies"]
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "HIPAA Compliance", "Data Security", "Cookie Policy"]
              }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <h3 className="text-green-400 font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-300 hover:text-green الله-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-green-400 font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Get the latest updates on new features, integrations, and Ayurvedic practice insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-gray-400 mb-4 md:mb-0"
              >
                Made with ❤️ for Ayurvedic practitioners worldwide
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-400"
              >
                © 2025 AyurSutra. All rights reserved.
              </motion.p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AyurSutraWebsite;