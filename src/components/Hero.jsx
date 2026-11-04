import { useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  BarChart3,
  Database,
  BrainCircuit,
  FileSpreadsheet,
  Atom,
} from "lucide-react";
import { useContent } from "./ContentContext";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stats = [
  { value: "15+", label: "Projects" },
  { value: "1", label: "IEEE Paper" },
  { value: "50k+", label: "Records Modeled" },
];

const Hero = () => {
  const { content } = useContent();
  const profile = content.profile || {};
  const nameParts = String(profile.name || "Syed Shahriar Ahmed").trim().split(/\s+/);
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
  const tiltXValue = useMotionValue(0);
  const tiltYValue = useMotionValue(0);
  const rotateX = useSpring(tiltXValue, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(tiltYValue, { stiffness: 120, damping: 18 });

  // Deterministic particle positions (no re-randomising on re-render).
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        left: (index * 37 + 11) % 100,
        top: (index * 53 + 7) % 100,
        delay: (index % 5) * 0.7,
        duration: 6 + (index % 4),
        size: index % 3 === 0 ? 3 : 2,
      })),
    []
  );

  const handleTilt = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltXValue.set(y * -12);
    tiltYValue.set(x * 12);
  };

  const resetTilt = () => {
    tiltXValue.set(0);
    tiltYValue.set(0);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-32 md:px-12 lg:px-20 lg:pt-28"
    >
      {/* Ambient light */}

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute rounded-full bg-secondary/50"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              willChange: "transform, opacity",
            }}
            animate={{ y: [0, -26, 0], opacity: [0, 0.85, 0] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------------- Left: copy ---------------- */}
        <motion.div variants={container} initial="hidden" animate="show" className="text-left">
          <motion.div variants={item} className="mb-6 inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availability || "Available for opportunities"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              <MapPin size={11} className="text-primary" />
              {profile.location || "Dhaka, Bangladesh"}
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[2.7rem] font-bold leading-[1.02] tracking-tight text-light sm:text-6xl lg:text-[4.4rem]"
          >
            {firstName}
            {lastName && (
              <span className="mt-1 block text-gradient animate-gradient-x">{lastName}</span>
            )}
          </motion.h1>

          <motion.div variants={item} className="mt-5 min-h-[2.5rem]">
            <h2 className="font-display text-xl font-semibold text-light/90 sm:text-2xl">
              <span className="text-muted">I&apos;m a </span>
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
                speed={45}
                repeat={Infinity}
                className="text-secondary"
              />
            </h2>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:text-base"
          >
            I transform raw data into{" "}
            <span className="font-medium text-light">actionable business intelligence</span>{" "}
            — designing high-impact dashboards, data models, and AI-powered tools that drive
            confident decisions.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/30"
            >
              <span className="relative z-10">Let&apos;s Work Together</span>
              <ArrowUpRight
                size={17}
                className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </motion.a>

            <motion.a
              href={profile.cvUrl || "/Syed_Shahriar_Ahmed_Resume.pdf"}
              download={profile.cvFileName || "Syed_Shahriar_Ahmed_Resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3.5 text-sm font-semibold text-light transition-colors duration-300 hover:border-primary/50 hover:text-primary"
            >
              <Download size={16} />
              Download CV
            </motion.a>

            <div className="ml-1 flex items-center gap-2">
              {[
                { icon: Github, href: profile.github, label: "GitHub" },
                {
                  icon: Linkedin,
                  href: profile.linkedin,
                  label: "LinkedIn",
                },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-muted transition-colors duration-300 hover:border-primary/50 hover:text-primary"
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-light">
                  <span className="text-gradient">{stat.value}</span>
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---------------- Right: portrait ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-[30rem] items-center justify-center lg:max-w-none"
        >
          <div className="relative aspect-square w-[18rem] sm:w-[22rem] lg:w-[25rem]">
            {/* Soft halo + orbit ring */}
            <div className="portrait-halo absolute -inset-14 rounded-full" />
            <div className="absolute -inset-7 rounded-full border border-dashed border-white/10" />
            <div className="gradient-ring absolute -inset-2 rounded-full opacity-90" />

            {/* Portrait with subtle 3D tilt */}
            <motion.div
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-surface shadow-[0_36px_100px_-32px_rgba(0,0,0,0.95)]"
            >
              <img
                src={profile.photoUrl || "/cv.png"}
                alt={`${profile.name || "Syed Shahriar Ahmed"} — ${profile.role || "Data Analyst"}`}
                className="h-full w-full scale-105 object-cover transition-transform duration-700 hover:scale-110"
                loading="eager"
                onError={(event) => {
                  event.currentTarget.src = "/cv.png";
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/55 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </motion.div>

            {/* Floating skill chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="animate-float-soft absolute -left-5 top-[4%] flex items-center gap-2 rounded-2xl border border-line bg-surface/95 px-3 py-2 shadow-xl sm:-left-8 sm:px-3.5 sm:py-2.5"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <BarChart3 size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">Power BI</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="animate-float absolute -right-4 top-[12%] flex items-center gap-2 rounded-2xl border border-line bg-surface/95 px-3 py-2 shadow-xl sm:-right-7 sm:px-3.5 sm:py-2.5"
              style={{ animationDelay: "1.6s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                <FileSpreadsheet size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">Excel</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="animate-float absolute -left-6 top-[38%] flex items-center gap-2 rounded-2xl border border-line bg-surface/95 px-3 py-2 shadow-xl sm:-left-9 sm:px-3.5 sm:py-2.5"
              style={{ animationDelay: "0.9s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <Database size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">SQL</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="animate-float-soft absolute -right-4 top-[40%] flex items-center gap-2 rounded-2xl border border-line bg-surface/95 px-3 py-2 shadow-xl sm:-right-8 sm:px-3.5 sm:py-2.5"
              style={{ animationDelay: "1.9s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/15 text-cyan-300">
                <Atom size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">React</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="animate-float-soft absolute -left-4 top-[70%] flex items-center gap-2 rounded-2xl border border-line bg-surface/95 px-3 py-2 shadow-xl sm:-left-7 sm:px-3.5 sm:py-2.5"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <BrainCircuit size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">Python / ML</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-primary md:flex"
        aria-label="Scroll to about section"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
          <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        <ArrowDown size={13} />
      </motion.a>
    </section>
  );
};

export default Hero;
