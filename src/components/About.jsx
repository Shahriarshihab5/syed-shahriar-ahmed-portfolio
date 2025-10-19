import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiFirebase,
  SiMysql,
  SiGithub,
} from "react-icons/si";
import { FiCpu } from "react-icons/fi";
import {
  FaProjectDiagram,
  FaCogs,
  FaDesktop,
  FaNetworkWired,
  FaLayerGroup,
  FaShareAlt, // placeholder for React Router
  FaCode, // placeholder for VS Code
} from "react-icons/fa";

const skills = [
  { name: "HTML", level: "🌟 Expert", icon: <SiHtml5 /> },
  { name: "CSS", level: "🌟 Expert", icon: <SiCss3 /> },
  { name: "JavaScript", level: "💪 Proficient", icon: <SiJavascript /> },
  { name: "React", level: "🌟 Expert", icon: <SiReact /> },
  { name: "React Router", level: "💪 Proficient", icon: <FaShareAlt /> },
  { name: "Firebase", level: "💪 Proficient", icon: <SiFirebase /> },
  { name: "MySQL", level: "👍 Good", icon: <SiMysql /> },
  { name: "APIs", level: "👍 Good", icon: <FiCpu /> },
  { name: "Git & GitHub", level: "💪 Proficient", icon: <SiGithub /> },
  { name: "VS Code", level: "💪 Proficient", icon: <FaCode /> },
  { name: "Data Structures & Algorithms", level: "👍 Good", icon: <FaProjectDiagram /> },
  { name: "OOP", level: "👍 Good", icon: <FaCogs /> },
  { name: "OS", level: "🔰 Familiar", icon: <FaDesktop /> },
  { name: "ES6", level: "💪 Proficient", icon: <SiJavascript /> },
  { name: "Networking Basics", level: "🔰 Familiar", icon: <FaNetworkWired /> },
  { name: "System Design / Architecture", level: "💪 Proficient", icon: <FaLayerGroup /> },
];

// Map skill levels to progress bar widths
const levelWidths = {
  "🌟 Expert": "100%",
  "💪 Proficient": "85%",
  "👍 Good": "70%",
  "🔰 Familiar": "50%",
};

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-[#0d0d0d] text-light px-8 md:px-20 py-20 relative overflow-hidden"
    >
      {/* Glowing background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#ff4c29]/10 via-transparent to-transparent blur-3xl"></div>

      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 z-10 relative">
        {/* Left Text Section */}
        <motion.div
          className="md:w-1/2 text-gray-300 leading-relaxed"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-lg">
            Hi, I’m <span className="text-primary font-semibold">Syed Shahriar Ahmed</span> 👋, a passionate{" "}
            <span className="text-primary font-semibold">CSE student</span> at Daffodil International University with a CGPA of <b>3.56</b>.
          </p>
          <p className="mb-4 text-lg">
            Skilled in <b>HTML, CSS, JavaScript, React, Firebase, MySQL</b>, and have solid foundations in{" "}
            <b>OOP, ES6, Operating Systems, Networking, System Design,</b> and <b>DSA</b>.
          </p>
          <p className="text-lg">
            I love building interactive and modern front-end experiences, exploring backend technologies, and improving my design and problem-solving skills daily.
          </p>
        </motion.div>

        {/* Right Skills Section */}
        <motion.div
          className="md:w-1/2 grid grid-cols-2 gap-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-3 mb-1 text-sm">
                <span className="text-primary text-lg">{skill.icon}</span>
                <span className="font-medium">{skill.name}</span>
                <span className="ml-auto">{skill.level}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-orange-600"
                  initial={{ width: 0 }}
                  whileInView={{ width: levelWidths[skill.level] }}
                  transition={{ duration: 1.2, delay: index * 0.05 }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
