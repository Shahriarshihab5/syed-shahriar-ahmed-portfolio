import { motion } from "framer-motion";

const RevealOnScroll = ({ children, direction = "up", delay = 0 }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5, // Slightly faster duration for snappier feel
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Smoother cubic-bezier
      }
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible" // Uses the optimized internal observer
      viewport={{ 
        once: true, 
        margin: "-50px", // Reduced margin so it triggers closer to view
        amount: 0.2     // Triggers when 20% of the element is visible
      }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;