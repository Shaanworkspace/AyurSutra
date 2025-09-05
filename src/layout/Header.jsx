import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-2 left-4 right-4 z-50"
    >
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-2xl">
        <nav className="px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-emerald-600" />
              <span className="text-lg font-bold text-emerald-700">
                AyurSutra
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {["Features", "Dashboard", "About"].map((item) =>
                item === "Dashboard" ? (
                  <Link
                    key={item}
                    to="/patient-dashboard"
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-shadow"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 pt-4 border-t border-white/20"
              >
                <div className="flex flex-col space-y-4">
                  {["Features", "Dashboard", "About"].map((item) =>
                    item === "Dashboard" ? (
                      <Link
                        key={item}
                        to="/patient-dashboard"
                        className="text-gray-700 hover:text-emerald-600 transition-colors"
                      >
                        {item}
                      </Link>
                    ) : (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-700 hover:text-emerald-600 transition-colors"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
