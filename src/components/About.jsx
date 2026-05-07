import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiGithub,
  SiMysql,
} from "react-icons/si";
import { 
  FaChartBar, 
  FaFileExcel, 
  FaDatabase, 
  FaPython, 
  FaMicroscope, 
  FaProjectDiagram, 
  FaNetworkWired,
  FaCogs,
  FaLayerGroup
} from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";

const skills = [
  // --- Data Intelligence & Analytics (Expert Focus) ---
  { name: "Power BI (DAX)", level: "🌟 Expert", icon: <FaChartBar /> },
  { name: "Advanced Excel", level: "🌟 Expert", icon: <FaFileExcel /> },
  { name: "SQL ", level: "💪 Proficient", icon: <FaDatabase /> },
  { name: "Python (Pandas/NumPy)", level: "💪 Proficient", icon: <FaPython /> },
  
  
  // --- Engineering & CS Foundations ---
  { name: "Software Engineering", level: "💪 Proficient", icon: <FaCogs /> },
  { name: "Networking", level: "👍 Good", icon: <FaNetworkWired /> },
  { name: "Deep Learning (CNN)", level: "💪 Proficient", icon: <FaMicroscope /> },
  { name: "DSA & OOP", level: "👍 Good", icon: <FaProjectDiagram /> },
  { name: "System Design", level: "👍 Good", icon: <FaLayerGroup /> },

  // --- Web Technologies ---
  { name: "React.js", level: "💪 Proficient", icon: <SiReact /> },
 
];

const levelWidths = {
  "🌟 Expert": "100%",
  "💪 Proficient": "85%",
  "👍 Good": "70%",
};

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#0d0d0d] text-light px-8 md:px-20 py-20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ff4c29]/10 via-transparent to-transparent blur-3xl"></div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Expertise & Foundation
      </motion.h2>

      <div className="flex flex-col md:flex-row items-start justify-between gap-12 z-10 relative">
        {/* Bio Section */}
        <motion.div
          className="md:w-1/2 text-gray-300 leading-relaxed"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-6 text-lg">
            I am <span className="text-primary font-semibold">Syed Shahriar Ahmed</span> 👋, a 
            <span className="text-primary font-semibold"> Data Analyst & BI Specialist</span>  and a CSE Graduate from Daffodil International University (CGPA: <b>3.56</b>)
          </p>
          
          <p className="mb-6 text-lg">
            As a <b>Published Researcher (IEEE)</b> , I specialize in complex data interpretation and <b>Deep Learning</b>. My expertise lies in architecting <b>Power BI</b> dashboards  and <b>SQL</b> models that drive high-level business decisions.
          </p>

          <p className="mb-6 text-lg">
            Beyond analytics, I have a rigorous background in <b>Software Engineering and Networking</b>. I leverage my <b>React.js</b> and full-stack capabilities to build data-driven tools that are as functional as they are insightful.
          </p>

          <p className="text-lg italic text-primary/80">
            "Engineering logic meets data intelligence."
          </p>
        </motion.div>

        {/* Skill Grid */}
        <motion.div
          className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-3 mb-2 text-sm">
                <span className="text-primary text-xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <span className="font-semibold text-white">
                  {skill.name}
                </span>
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
    </section>
  );
}