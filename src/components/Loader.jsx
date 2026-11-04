import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((previous) => {
        if (previous >= 100) {
          clearInterval(timer);
          return 100;
        }
        return previous + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative text-center">
        <div className="relative mx-auto mb-8 h-32 w-32">
          <svg className="h-full w-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="color-mix(in srgb, var(--accent-1) 18%, transparent)"
              strokeWidth="7"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="var(--accent-1)"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 352" }}
              animate={{ strokeDasharray: `${(progress / 100) * 352} 352` }}
              transition={{ duration: 0.1 }}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gradient font-display text-3xl font-bold">{progress}%</span>
          </div>

          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent-1) 28%, transparent) 0%, transparent 70%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <motion.h1
          className="font-display text-2xl font-bold text-light md:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          Syed Shahriar <span className="text-gradient animate-gradient-x">Ahmed</span>
        </motion.h1>

        <motion.p
          className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
        >
          {progress < 100 ? "Preparing portfolio" : "Welcome"}
        </motion.p>

        <div className="mx-auto mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
