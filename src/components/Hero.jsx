import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <section
      id="home"
      // Added contain: 'paint' to isolate animations and prevent layout jitters
      style={{ contain: 'paint' }}
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-28 bg-[#0d0d0d] text-light relative overflow-hidden"
    >
      {/* Optimized Background Gradient with Hardware Acceleration */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl"
        style={{ willChange: "opacity" }}
        animate={{
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Optimized Particles - Reduced count for smoother frame rates */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              willChange: "transform, opacity"
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Left Text Section - Content updated from CV */}
      <motion.div
        className="text-left z-10 md:w-1/2"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.p 
          className="text-lg text-primary font-semibold mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hello 👋
        </motion.p>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          I'm{" "}
          <span className="text-primary relative inline-block">
            Syed Shahriar Ahmed
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ transformOrigin: "left" }}
            />
          </span>
        </motion.h1>

        {/* Updated Typing Animation for Data Analytics Focus */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6 min-h-[3rem]"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            <TypeAnimation
              sequence={[
                "Data Analyst",
                2000,
                "BI Developer",
                2000,
                "SQL & Power BI Expert",
                2000,
                "Published Researcher",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h2>
        </motion.div>

        {/* Updated Description focusing on BI and actionable insights */}
        <motion.p 
          className="text-gray-400 mb-8 max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Computer Science graduate specializing in transforming raw data into actionable 
          business intelligence. Expert in building high-impact dashboards and 
          models that drive informed decision-making.
        </motion.p>

        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-primary text-white font-semibold transition-all relative overflow-hidden group"
          >
            <span className="relative z-10 font-bold uppercase tracking-wide">Hire Me</span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          {/* Corrected Resume filename based on CV document */}
          <motion.a
            href="/SYED_SHAHRIAR_AHMED_CV.pdf"
            download="SYED_SHAHRIAR_AHMED_CV.pdf"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 76, 41, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-bold uppercase tracking-wide transition-all"
          >
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right Image Section with Performance Fixes */}
      <motion.div
        className="relative mt-12 md:mt-0 md:w-1/2 flex justify-center z-10"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Rotating glow ring 1 - Optimized with will-change */}
        <motion.div
          className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full bg-primary/20 blur-2xl"
          style={{ willChange: "transform", transformOrigin: "center" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Rotating glow ring 2 - Simplified animation */}
        <motion.div
          className="absolute w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-orange-500/10 blur-2xl"
          style={{ willChange: "transform", transformOrigin: "center" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="relative"
          // Force hardware acceleration for the image container
          style={{ transform: "translateZ(0)" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.img
            src="/cv.png"
            alt="Syed Shahriar Ahmed - Data Analyst & BI Specialist"
            className="w-64 md:w-80 rounded-full shadow-2xl relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;