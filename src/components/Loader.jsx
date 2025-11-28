import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // Adjust speed here (25ms = ~2.5 seconds total)

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0d0d0d]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Circular Progress Bar */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="rgba(255, 76, 41, 0.2)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="#ff4c29"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 352" }}
              animate={{ strokeDasharray: `${(progress / 100) * 352} 352` }}
              transition={{ duration: 0.1 }}
            />
          </svg>

          {/* Percentage Text in Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-3xl font-bold text-primary"
              key={progress}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
            >
              {progress}%
            </motion.span>
          </div>

          {/* Spinning Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,76,41,0.3) 0%, transparent 70%)",
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

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
          className="text-gray-400 text-lg mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {progress < 100 ? "Loading Portfolio..." : "Almost there!"}
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1.5 bg-gray-800 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-orange-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Loading Dots Animation */}
        <motion.div
          className="flex gap-2 justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2.5 h-2.5 bg-primary rounded-full"
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
