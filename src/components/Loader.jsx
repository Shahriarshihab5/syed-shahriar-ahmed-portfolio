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
    }, 12);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-dark"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mesh-bg absolute inset-0 opacity-80" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative w-[min(82vw,24rem)]">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary/70" />
          <span className="font-display text-[10px] font-bold uppercase tracking-[0.42em] text-muted">
            Portfolio
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-primary/70" />
        </div>

        <motion.h1
          className="text-center font-display text-3xl font-bold leading-tight text-light md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Syed Shahriar <span className="text-gradient">Ahmed</span>
        </motion.h1>

        <motion.p
          className="mt-3 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          Data Analyst &amp; BI Specialist
        </motion.p>

        <div className="mt-10 h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-px bg-gradient-to-r from-primary via-secondary to-accent"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.24em] text-muted">
          <span>{progress < 100 ? "Preparing portfolio" : "Welcome"}</span>
          <span className="font-mono text-light">{String(progress).padStart(3, "0")}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
