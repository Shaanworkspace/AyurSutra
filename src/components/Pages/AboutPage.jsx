import { motion } from 'framer-motion';
import { Leaf, Heart, Target, Shield, Users, Zap } from 'lucide-react';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "Ayurvedic Excellence",
      description: "Rooted in ancient wisdom, enhanced by modern technology"
    },
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "Every feature designed with patient wellbeing in mind"
    },
    {
      icon: Target,
      title: "Precision & Consistency",
      description: "Ensuring standardized care across all treatments"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HIPAA-compliant with enterprise-grade security"
    },
    {
      icon: Users,
      title: "Practitioner Focused",
      description: "Built by practitioners, for practitioners"
    },
    {
      icon: Zap,
      title: "Digital Efficiency",
      description: "Streamlining workflows without losing the human touch"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf size={32} className="text-white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              About AyurSutra
            </h2>

            <div className="max-w-4xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-xl text-gray-700 leading-relaxed mb-8"
              >
                AyurSutra is a{" "}
                <span className="text-emerald-600 font-semibold">
                  Panchakarma patient management software
                </span>{" "}
                that streamlines{" "}
                <span className="text-teal-600 font-semibold">
                  therapy scheduling
                </span>
                ,{" "}
                <span className="text-cyan-600 font-semibold">
                  notifications
                </span>
                , and
                <span className="text-blue-600 font-semibold">
                  {" "}
                  progress tracking
                </span>
                . It blends Ayurvedic care with digital efficiency, ensuring
                consistency and patient focus.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                Our platform bridges the gap between traditional Ayurvedic
                wisdom and modern healthcare management, empowering
                practitioners to deliver exceptional care while maintaining the
                holistic approach that makes Panchakarma treatments so
                effective.
              </motion.p>
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/50 mb-16"
          >
            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
              >
                Our Mission
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto"
              >
                To revolutionize Panchakarma practice management by seamlessly
                integrating ancient Ayurvedic principles with cutting-edge
                technology, enabling practitioners to focus on what matters most
                – healing and patient wellbeing.
              </motion.p>
            </div>
          </motion.div>

          {/* Core Values Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
              Our Core Values
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  viewport={{ once: true }}
                  className="group text-center"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                    >
                      <value.icon size={24} className="text-white" />
                    </motion.div>

                    {/* Content */}
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}
