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
  Award,
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
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />

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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted backdrop-blur">
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
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3.5 text-sm font-semibold text-light backdrop-blur transition-colors duration-300 hover:border-primary/50 hover:text-primary"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/60 text-muted backdrop-blur transition-colors duration-300 hover:border-primary/50 hover:text-primary"
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
          <div className="relative aspect-square w-[19rem] sm:w-[23rem] lg:w-[26rem]">
            {/* Rotating conic aura */}
            <div className="animate-spin-slow absolute -inset-5 rounded-full bg-[conic-gradient(from_0deg,var(--accent-1),var(--accent-2),var(--accent-3),var(--accent-1))] opacity-30 blur-2xl" />
            <div className="animate-spin-slower absolute -inset-2 rounded-full bg-[conic-gradient(from_180deg,transparent,var(--accent-2),transparent_55%,var(--accent-1),transparent)] opacity-70" />
            <div className="absolute -inset-2 rounded-full border border-white/10" />

            {/* Portrait with subtle 3D tilt */}
            <motion.div
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
              style={{ rotateX, rotateY, transformPerspective: 1000 }}
              className="relative h-full w-full overflow-hidden rounded-full border border-white/15 bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            >
              <img
                src="/cv.png"
                alt="Syed Shahriar Ahmed — Data Analyst & BI Specialist"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </motion.div>

            {/* Floating skill chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="animate-float-soft absolute -left-6 top-[14%] flex items-center gap-2 rounded-2xl border border-line bg-surface/80 px-3.5 py-2.5 shadow-xl backdrop-blur-xl sm:-left-10"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <BarChart3 size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">Power BI</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="animate-float absolute -right-4 top-[42%] flex items-center gap-2 rounded-2xl border border-line bg-surface/80 px-3.5 py-2.5 shadow-xl backdrop-blur-xl sm:-right-8"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <Database size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">SQL</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="animate-float-soft absolute -bottom-2 left-[8%] flex items-center gap-2 rounded-2xl border border-line bg-surface/80 px-3.5 py-2.5 shadow-xl backdrop-blur-xl"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <BrainCircuit size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">Python / ML</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.6 }}
              className="animate-float absolute -bottom-6 right-[4%] flex items-center gap-2 rounded-2xl border border-emerald-400/25 bg-surface/80 px-3.5 py-2.5 shadow-xl backdrop-blur-xl"
              style={{ animationDelay: "1.8s" }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                <Award size={16} />
              </span>
              <span className="text-[11px] font-bold text-light">IEEE Published</span>
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
