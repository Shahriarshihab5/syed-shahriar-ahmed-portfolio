import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import heroImg from '../assets/cv.png';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 pt-28 bg-[#0d0d0d] text-light relative overflow-hidden"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl"></div>

      {/* Left Text Section */}
      <motion.div
        className="text-left z-10 md:w-1/2"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-lg text-primary font-semibold mb-2">Hello 👋</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          I'm <span className="text-primary">Syed Shahriar Ahmed</span>
        </h1>
        
        {/* Typing Animation */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 min-h-[3rem]">
          <TypeAnimation
            sequence={[
              "Front-End Developer",
              2000,
              "CSE Student",
              2000,
              "React Enthusiast",
              2000,
              "Problem Solver",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-primary"
          />
        </h2>

        <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
          Passionate about crafting clean, responsive, and dynamic web
          experiences. Skilled in React, Tailwind CSS, APIs & Firebase
          Authentication — currently learning backend development to become
          a full-stack developer.
        </p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-lg bg-primary text-dark font-semibold hover:shadow-[0_0_20px_#ff4c29] transition-shadow"
          >
            Got a project?
          </motion.a>
          <motion.a
            href="/src/assets/Syed-Shahriar-Ahmed-Resume_.pdf"
            download
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-dark transition-all"
          >
            My Resume
          </motion.a>
        </div>
      </motion.div>

      {/* Right Image Section */}
      <motion.div
        className="relative mt-12 md:mt-0 md:w-1/2 flex justify-center z-10"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Glowing ring effect */}
        <div className="absolute w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#ff4c29]/60 via-transparent to-transparent blur-3xl"></div>

        <img
          src={heroImg}
          alt="Syed Shahriar Ahmed"
          className="w-64 md:w-80 rounded-full shadow-[0_0_40px_#ff4c29]"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
