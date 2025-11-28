import { motion } from "framer-motion";

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0d0d0d]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Logo/Name */}
      <div className="text-center">
        {/* Spinning Circle */}
        <motion.div
          className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Name Animation */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-primary mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Syed Shahriar Ahmed
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          className="text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Loading Portfolio...
        </motion.p>

        {/* Loading Dots Animation */}
        <motion.div
          className="flex gap-2 justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
