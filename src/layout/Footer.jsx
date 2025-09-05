import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-gradient-to-br  from-green-50 via-green-300 to-emerald-200 text-black py-16">
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
                className="text-black mb-6 max-w-md"
              >
                Revolutionizing Panchakarma practice management with intelligent scheduling, 
                comprehensive patient tracking, and seamless workflow automation.
              </motion.p>
              
              <div className="space-y-2 text-black">
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
                      <a href="#" className="text-black hover:text-green الله-400 transition-colors">
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
              <p className="text-black mb-4">
                Get the latest updates on new features, integrations, and Ayurvedic practice insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-green-500"
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
                className="text-black mb-4 md:mb-0"
              >
                Made with ❤️ for Ayurvedic practitioners worldwide
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-black"
              >
                © 2025 AyurSutra. All rights reserved.
              </motion.p>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer