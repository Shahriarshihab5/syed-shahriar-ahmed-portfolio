import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { SiReact, SiGithub } from "react-icons/si";
import { 
  FaChartBar, FaFileExcel, FaDatabase, FaPython, 
  FaMicroscope, FaProjectDiagram, FaNetworkWired,
  FaCogs, FaLayerGroup, FaGraduationCap, FaFileSignature, FaRocket
} from "react-icons/fa";

// Optimized Counter with Decimal support
const Counter = ({ value, suffix = "", decimals = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return latest.toFixed(decimals) + suffix;
  });
  const ref = useRef(null);

  useEffect(() => {
    const numericValue = parseFloat(value);
    const controls = animate(count, numericValue, { 
      duration: 2, 
      ease: [0.33, 1, 0.68, 1] 
    });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const skills = [
  { name: "Power BI (DAX)", level: "🌟 Expert", icon: <FaChartBar /> },
  { name: "Advanced Excel", level: "🌟 Expert", icon: <FaFileExcel /> },
  { name: "SQL", level: "💪 Proficient", icon: <FaDatabase /> },
  { name: "Python (Pandas/NumPy)", level: "💪 Proficient", icon: <FaPython /> },
  { name: "Software Engineering", level: "💪 Proficient", icon: <FaCogs /> },
  { name: "Deep Learning (CNN)", level: "💪 Proficient", icon: <FaMicroscope /> },
  { name: "React.js", level: "💪 Proficient", icon: <SiReact /> },
  { name: "Networking", level: "👍 Good", icon: <FaNetworkWired /> },
  { name: "DSA & OOP", level: "👍 Good", icon: <FaProjectDiagram /> },
  { name: "System Design", level: "👍 Good", icon: <FaLayerGroup /> },
];

const stats = [
  { label: "Data Records Modeled", value: "50", suffix: "k+", decimals: 0, icon: <FaDatabase /> },
  { label: "IEEE Publications", value: "1", suffix: "", decimals: 0, icon: <FaFileSignature /> },
  { label: "Projects Delivered", value: "15", suffix: "+", decimals: 0, icon: <FaRocket /> },
  { label: "Final CGPA", value: "3.56", suffix: "/4.0", decimals: 2, icon: <FaGraduationCap /> }
];

const levelWidths = {
  "🌟 Expert": "100%",
  "💪 Proficient": "85%",
  "👍 Good": "70%",
};

export default function About() {
  return (
    <section id="about" className="min-h-screen bg-[#0d0d0d] text-light px-8 md:px-20 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ff4c29]/10 via-transparent to-transparent blur-3xl"></div>

      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Expertise & Foundation
      </motion.h2>

      <div className="flex flex-col md:flex-row items-start justify-between gap-12 z-10 relative mb-24">
        {/* Bio Section */}
        <motion.div className="md:w-1/2 text-gray-300 leading-relaxed">
          <p className="mb-6 text-lg">
            I am <span className="text-primary font-semibold">Syed Shahriar Ahmed</span> 👋, a 
            <span className="text-primary font-semibold"> Data Analyst & BI Specialist</span> and a CSE Graduate from Daffodil International University.
          </p>
          <p className="mb-6 text-lg">
            As a <b>Published Researcher (IEEE)</b>, I specialize in complex data interpretation and <b>Deep Learning</b>. My expertise lies in architecting <b>Power BI</b> dashboards and <b>SQL</b> models that drive business decisions.
          </p>
          <p className="mb-6 text-lg">
            Beyond analytics, I have a rigorous background in <b>Software Engineering</b>. I leverage my <b>React.js</b> capabilities to build data-driven tools that are as functional as they are insightful.
          </p>
          <p className="text-lg italic text-primary/80">"Engineering logic meets data intelligence."</p>
        </motion.div>

        {/* Skill Grid */}
        <motion.div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-3 mb-2 text-sm">
                <span className="text-primary text-xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <span className="font-semibold text-white">{skill.name}</span>
                <span className="ml-auto text-[9px] font-bold text-primary/60 uppercase">
                  {skill.level.split(" ")[1]}
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: levelWidths[skill.level] }}
                  transition={{ duration: 1.2, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Impact Stats (Now Below Expertise) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 max-w-7xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, borderColor: "rgba(255, 76, 41, 0.4)" }}
            transition={{ delay: i * 0.1 }}
            className="relative group bg-[#161616] p-8 rounded-2xl text-center border border-white/5 overflow-hidden transition-all duration-300"
          >
            {/* Decorative Background Icon */}
            <div className="absolute -right-4 -bottom-4 text-white/5 text-7xl group-hover:text-primary/10 transition-colors duration-500">
              {stat.icon}
            </div>

            <div className="relative z-10">
              <h4 className="text-4xl font-bold text-white mb-2">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </h4>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</p>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}