import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SiReact } from "react-icons/si";
import {
  FaChartBar,
  FaFileExcel,
  FaDatabase,
  FaPython,
  FaMicroscope,
  FaProjectDiagram,
  FaNetworkWired,
  FaCogs,
  FaLayerGroup,
  FaGraduationCap,
  FaFileSignature,
  FaRocket,
  FaQuoteLeft,
} from "react-icons/fa";
import { BadgeCheck, BriefcaseBusiness, Calendar, MapPin, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import RevealOnScroll from "./RevealOnScroll";
import { useContent } from "./ContentContext";

const Counter = ({ value, suffix = "", decimals = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals) + suffix);
  const ref = useRef(null);

  useEffect(() => {
    const controls = animate(count, parseFloat(value), {
      duration: 1.8,
      ease: [0.33, 1, 0.68, 1],
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const skills = [
  { name: "Power BI (DAX)", level: "Expert", icon: <FaChartBar /> },
  { name: "Advanced Excel", level: "Expert", icon: <FaFileExcel /> },
  { name: "SQL", level: "Proficient", icon: <FaDatabase /> },
  { name: "Python (Pandas/NumPy)", level: "Proficient", icon: <FaPython /> },
  { name: "Software Engineering", level: "Proficient", icon: <FaCogs /> },
  { name: "Deep Learning (CNN)", level: "Proficient", icon: <FaMicroscope /> },
  { name: "React.js", level: "Proficient", icon: <SiReact /> },
  { name: "Networking", level: "Good", icon: <FaNetworkWired /> },
  { name: "DSA & OOP", level: "Good", icon: <FaProjectDiagram /> },
  { name: "System Design", level: "Good", icon: <FaLayerGroup /> },
];

const stats = [
  { label: "Data Records Modeled", value: "50", suffix: "k+", decimals: 0, icon: <FaDatabase /> },
  { label: "IEEE Publications", value: "1", suffix: "", decimals: 0, icon: <FaFileSignature /> },
  { label: "Projects Delivered", value: "15", suffix: "+", decimals: 0, icon: <FaRocket /> },
  { label: "Final CGPA", value: "3.56", suffix: "/4.0", decimals: 2, icon: <FaGraduationCap /> },
];

const levelWidths = {
  Expert: "100%",
  Proficient: "85%",
  Good: "70%",
};

const About = () => {
  const { content } = useContent();
  const experience = (content.experience || []).filter((item) => item.visible !== false);
  const profile = content.profile || {};

  return (
    <section id="about" className="section-shell relative overflow-hidden">

      <SectionHeading
        eyebrow="About Me"
        number="01"
        icon={Sparkles}
        title="Expertise &"
        highlight="Foundation"
        description="Engineering logic meets data intelligence — a blend of analytics, research, and software craft."
      />

      <div className="relative z-10 mx-auto mb-20 grid max-w-7xl items-start gap-8 lg:grid-cols-2">
        {/* Bio */}
        <RevealOnScroll direction="up">
          <div className="gradient-border relative overflow-hidden rounded-3xl border border-line bg-surface/90 p-8 md:p-10">
            <FaQuoteLeft className="mb-5 text-3xl text-primary/30" />

            <div className="space-y-5 text-sm leading-relaxed text-muted md:text-base">
              <p>
                I&apos;m{" "}
                <span className="font-semibold text-light">{profile.name}</span>, a{" "}
                <span className="font-semibold text-primary">
                  Data Analyst &amp; BI Specialist
                </span>{" "}
                and a CSE graduate from Daffodil International University.
              </p>
              <p>
                As a <span className="font-semibold text-light">Published Researcher (IEEE)</span>,
                I specialize in complex data interpretation and{" "}
                <span className="font-semibold text-light">Deep Learning</span>. My expertise lies
                in architecting <span className="font-semibold text-light">Power BI</span>{" "}
                dashboards and <span className="font-semibold text-light">SQL</span> models that
                drive business decisions.
              </p>
              <p>
                Beyond analytics, I have a rigorous background in{" "}
                <span className="font-semibold text-light">Software Engineering</span>. I use{" "}
                <span className="font-semibold text-light">React.js</span> to build data-driven
                tools that are as functional as they are insightful.
              </p>
            </div>

            <p className="mt-6 border-l-2 border-primary/50 pl-4 font-display text-base italic text-primary/90">
              &ldquo;Engineering logic meets data intelligence.&rdquo;
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-dark/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                <BadgeCheck size={12} className="text-primary" />
                CSE Graduate · CGPA 3.56
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-dark/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                <MapPin size={12} className="text-primary" />
                {profile.location || "Dhaka, Bangladesh"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open to work
              </span>
            </div>
          </div>
        </RevealOnScroll>

        {/* Skills */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="rounded-3xl border border-line bg-surface/90 p-8 md:p-10">
            <div className="mb-7 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-light">Core Toolkit</h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {skills.length} skills
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="mb-2 flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm text-primary transition-transform duration-300 group-hover:scale-110">
                      {skill.icon}
                    </span>
                    <span className="text-xs font-semibold text-light">{skill.name}</span>
                    <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-muted">
                      {skill.level}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: levelWidths[skill.level] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: index * 0.06, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Experience timeline */}
      {experience.length > 0 && (
        <div className="relative z-10 mx-auto mb-20 max-w-7xl">
          <RevealOnScroll direction="up">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                <BriefcaseBusiness size={17} />
              </span>
              <h3 className="font-display text-xl font-bold text-light">Experience</h3>
              <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                {experience.length} role{experience.length > 1 ? "s" : ""}
              </span>
            </div>
          </RevealOnScroll>

          <div className="space-y-4">
            {experience.map((role, index) => (
              <RevealOnScroll key={role.id} direction="up" delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -3 }}
                  className="gradient-border group relative overflow-hidden rounded-3xl border border-line bg-surface/90 p-6 transition-colors duration-300 hover:border-primary/40 md:p-8"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/5 blur-3xl" />

                  <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15 transition-transform duration-300 group-hover:scale-105">
                        <BriefcaseBusiness size={22} />
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-display text-lg font-bold leading-snug text-light md:text-xl">
                          {role.role}
                        </h4>
                        <p className="mt-1.5 text-sm text-muted">
                          <span className="font-semibold text-primary">{role.company}</span>
                          {role.department && (
                            <>
                              <span className="mx-1.5 text-muted/60">•</span>
                              {role.department}
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 md:flex-col md:items-end">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                        <Calendar size={11} />
                        {role.start} — {role.current ? "Present" : role.end}
                      </span>
                      {role.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  {role.description && (
                    <p className="relative z-10 mt-4 text-sm leading-relaxed text-muted">
                      {role.description}
                    </p>
                  )}

                  {(role.highlights || []).length > 0 && (
                    <ul className="relative z-10 mt-4 flex flex-wrap gap-2">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full border border-line bg-dark/40 px-3 py-1.5 text-[10px] font-medium text-muted"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      )}

      {/* Impact stats */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-2xl border border-line bg-surface/90 p-7 text-center transition-colors duration-300 hover:border-primary/40"
          >
            <div className="pointer-events-none absolute -bottom-4 -right-3 text-6xl text-white/[0.04] transition-colors duration-500 group-hover:text-primary/10">
              {stat.icon}
            </div>

            <div className="relative z-10">
              <h4 className="font-display text-4xl font-bold text-light">
                <span className="text-gradient">
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </span>
              </h4>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
