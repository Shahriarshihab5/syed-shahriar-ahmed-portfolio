import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-primary via-secondary to-accent shadow-[0_0_12px_var(--accent-1)]"
      style={{
        scaleX,
        translateZ: 0,
      }}
    />
  );
};

export default ScrollProgressBar;
