import { User, Stethoscope, Heart, UserPlus } from 'lucide-react';

const AuthButtons = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Login as User Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
      >
        <User className="w-5 h-5" />
        Register as User
      </motion.button>

      {/* Login as Doctor Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
      >
        <Stethoscope className="w-5 h-5" />
        Register as Doctor
      </motion.button>

      {/* Login as Therapist Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center gap-2"
      >
        <Heart className="w-5 h-5" />
        Register as Therapist
      </motion.button>

      {/* Signup Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="border-2 border-green-200 text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all flex items-center gap-2"
      >
        <UserPlus className="w-5 h-5" />
        Login
      </motion.button>
    </div>
  );
};

export default AuthButtons;