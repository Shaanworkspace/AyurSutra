import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Heart, LogIn } from 'lucide-react';
import Header from '../../layout/Header';

const LoginPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('User');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const [practitionerEmail, setPractitionerEmail] = useState('');
  const [practitionerPassword, setPractitionerPassword] = useState('');

  const profiles = [
    { name: 'User', icon: User },
    { name: 'Doctor', icon: Stethoscope },
    { name: 'Practitioner', icon: Heart },
  ];

  const handleLogin = (e, profile) => {
    e.preventDefault();
    const email = profile === 'User' ? userEmail : profile === 'Doctor' ? doctorEmail : practitionerEmail;
    console.log(`Logging in as ${profile} with email: ${email}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Login Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-green-100"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8"
          >
            Login to AyurSutra
          </motion.h1>

          {/* Profile Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="flex space-x-2 bg-gray-100 rounded-xl p-1">
              {profiles.map((profile) => (
                <motion.button
                  key={profile.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProfile(profile.name)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                    selectedProfile === profile.name
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'text-gray-600 hover:bg-green-50'
                  }`}
                >
                  <profile.icon className="w-5 h-5" />
                  {profile.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Login Forms */}
          {profiles.map((profile) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: selectedProfile === profile.name ? 1 : 0,
                height: selectedProfile === profile.name ? 'auto' : 0,
                display: selectedProfile === profile.name ? 'block' : 'none',
              }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <form onSubmit={(e) => handleLogin(e, profile.name)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-6"
                >
                  <label className="block text-gray-600 font-medium mb-2">
                    {profile.name} Email
                  </label>
                  <input
                    type="email"
                    value={
                      profile.name === 'User'
                        ? userEmail
                        : profile.name === 'Doctor'
                        ? doctorEmail
                        : practitionerEmail
                    }
                    onChange={(e) => {
                      if (profile.name === 'User') setUserEmail(e.target.value);
                      else if (profile.name === 'Doctor') setDoctorEmail(e.target.value);
                      else setPractitionerEmail(e.target.value);
                    }}
                    placeholder={`Enter ${profile.name.toLowerCase()} email`}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-8"
                >
                  <label className="block text-gray-600 font-medium mb-2">
                    {profile.name} Password
                  </label>
                  <input
                    type="password"
                    value={
                      profile.name === 'User'
                        ? userPassword
                        : profile.name === 'Doctor'
                        ? doctorPassword
                        : practitionerPassword
                    }
                    onChange={(e) => {
                      if (profile.name === 'User') setUserPassword(e.target.value);
                      else if (profile.name === 'Doctor') setDoctorPassword(e.target.value);
                      else setPractitionerPassword(e.target.value);
                    }}
                    placeholder={`Enter ${profile.name.toLowerCase()} password`}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  Login as {profile.name}
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-4 text-center"
              >
                <a
                  href="#forgot-password"
                  className="text-green-600 hover:text-emerald-700 transition-colors text-sm"
                >
                  Forgot Password?
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default LoginPage;