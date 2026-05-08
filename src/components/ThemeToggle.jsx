import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      // The layout prop helps Framer Motion handle position changes without jitter
      layout
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      // translateZ(0) forces the GPU to render this button on its own layer
      style={{ translateZ: 0 }} 
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary shadow-lg hover:shadow-[0_0_20px_rgba(255,76,41,0.5)] flex items-center justify-center text-white transition-shadow"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;