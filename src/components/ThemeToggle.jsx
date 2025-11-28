import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary shadow-lg hover:shadow-[0_0_20px_rgba(255,76,41,0.5)] flex items-center justify-center text-white transition-all"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={theme}
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
