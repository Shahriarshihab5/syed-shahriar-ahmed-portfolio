import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  
  // Reduced stiffness and increased restDelta to prevent "micro-jitter"
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 70, // Lowered for smoother, less "aggressive" movement
    damping: 30,
    restDelta: 0.01, // Increased from 0.001 to reduce calculation frequency
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
      style={{ 
        scaleX,
        // Force GPU acceleration for the progress bar
        translateZ: 0 
      }}
    />
  );
};

export default ScrollProgressBar;