import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-28 bg-[#0d0d0d] text-light relative overflow-hidden"
    >
      {/* Animated background with multiple layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Left Text Section */}
      <motion.div
        className="text-left z-10 md:w-1/2"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 1.2,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        {/* Greeting with stagger animation */}
        <motion.p 
          className="text-lg text-primary font-semibold mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hello 👋
        </motion.p>

        {/* Name with letter animation */}
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          I'm{" "}
          <span className="text-primary relative inline-block">
            Syed Shahriar Ahmed
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.h1>

        {/* Typing Animation - White Color Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-6 min-h-[3rem]"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            <TypeAnimation
              sequence={[
                "Front-End Developer",
                2000,
                "React Enthusiast",
                2000,
                "CSE Student",
                2000,
                "Problem Solver",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-gray-400 mb-8 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Passionate about crafting clean, responsive, and dynamic web
          experiences. Skilled in React, Tailwind CSS, APIs & Firebase
          Authentication — currently learning backend development to become a
          full-stack developer.
        </motion.p>

        {/* Buttons with stagger */}
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255, 76, 41, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Got a project?</span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="/Syed-Shahriar-Ahmed-Resume_.pdf"
            download="Syed-Shahriar-Ahmed-Resume.pdf"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#ff4c29",
              color: "#ffffff",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold transition-all duration-300"
          >
            My Resume
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        className="relative mt-12 md:mt-0 md:w-1/2 flex justify-center z-10"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 1.2,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        {/* Rotating glow ring 1 */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/40 to-transparent blur-2xl"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Rotating glow ring 2 - opposite direction */}
        <motion.div
          className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-tl from-orange-500/30 to-transparent blur-2xl"
          animate={{
            rotate: -360,
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Profile Image with Clean Shadow */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/cv.png"
            alt="Syed Shahriar Ahmed"
            className="w-64 md:w-80 rounded-full shadow-[0_0_60px_rgba(255,76,41,0.6)] relative z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
