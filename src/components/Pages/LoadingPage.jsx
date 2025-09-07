import { motion } from 'framer-motion';

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
        className="text-center flex items-center justify-center"
      >

        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mb-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600"
            />
          ))}
        </div>

        

        
      </motion.div>
    </div>
  );
};

export default LoadingPage;
