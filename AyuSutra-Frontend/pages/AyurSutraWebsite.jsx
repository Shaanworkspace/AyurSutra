import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Bell, TrendingUp, Users, Shield, Clock, FileText, Stethoscope, Menu, X, User, Heart, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white text-2xl font-bold">AyurSutra Dashboard</h3>
                  <p className="text-green-100">Patient Management System</p>
                </div>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">Next Appointment</h4>
                    <p className="text-gray-600 text-sm mb-1">Priya Sharma</p>
                    <p className="text-green-600 font-medium">Abhyanga - 2:30 PM</p>
                  </motion.div>
                  
                  {dashboardStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + stat.delay }}
                      className="text-center"
                    >
                      <div className="text-3xl font-bold text-green-600 mb-1">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                      {stat.label === "Treatment Progress" && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="bg-green-500 h-2 rounded-full"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">Real-time Sync</h4>
                    <span className="text-sm text-gray-600">All devices connected</span>
                  </div>
                  <div className="flex space-x-2">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 20 }}
                        animate={{ height: [20, 40, 60, 40, 20] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                        className="bg-green-500 rounded flex-1"
                      />
                    ))}
                  </div>
                </div>
              </div>
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
            <Footer/>
    </div>
  );
};

export default AyurSutraWebsite;