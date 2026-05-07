import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, BarChart3, Code2, Database, Table, PieChart, Sparkles } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

// Sub-component for auto-changing images with fade effect
const ProjectImage = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Transitions every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative h-48 bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${title} view ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </AnimatePresence>
      
      {/* Indicator dots for multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-primary w-4" : "bg-white/20 w-1.5"
              }`}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("data");
  const [activeSubTab, setActiveSubTab] = useState("powerbi");

  const projects = [
    // --- POWER BI PROJECTS ---
    {
      id: 1,
      category: "data",
      subCategory: "powerbi",
      title: "Real-Time Weather Intelligence Dashboard",
      description: "Integrated WeatherAPI and transformed JSON data using Power Query to build a data model for AQI and trend analysis. Features multi-city comparisons in real-time.",
      images: ["/Weather Report.png"],
      tools: ["Power BI", "DAX", "API Integration", "Power Query"],
      liveLink: "https://github.com/Shahriarshihab5/Weather_Report_Dashboard",
      githubLink: "https://github.com/Shahriarshihab5/Weather_Report_Dashboard",
    },
    {
      id: 2,
      category: "data",
      subCategory: "powerbi",
      title: "HR Analytics & Employee Attrition Dashboard",
      description: "Analyzed 941 records to track a 13.8% attrition rate. Developed interactive KPIs using DAX to visualize salary and job role trends.",
      images: ["/HR_Analytics.jpeg"],
      tools: ["Power BI", "DAX", "Data Modeling", "KPI Tracking"],
      liveLink: "https://github.com/Shahriarshihab5/HR-Analytics-Dashboard",
      githubLink: "https://github.com/Shahriarshihab5/HR-Analytics-Dashboard",
    },

    // --- EXCEL PROJECTS (Updated for Multi-Image) ---
    {
      id: 3,
      category: "data",
      subCategory: "excel",
      title: "Sales & Revenue Analysis Dashboard",
      description: "Modeled revenue trends using Power Pivot and DAX across multi-sheet workbooks. Applied Goal Seek and Scenario Manager for revenue target simulation.",
 
      images: [
        "/Sa1.png", 
        "/sa2.png", 
        "/sa3.png", 
        "/Sa4.png"
      ],
      tools: ["MS Excel", "Power Pivot", "XLOOKUP", "What-If Analysis"],
      liveLink: "https://github.com/Shahriarshihab5/Sales-Revenue-Analysis-Dashboard",
      githubLink: "https://github.com/Shahriarshihab5/Sales-Revenue-Analysis-Dashboard",
    },

    // --- SOFTWARE ENGINEERING PROJECTS ---
    {
      id: 4,
      category: "web",
      title: "AI-Powered Osteoarthritis Detection",
      description: "Full-stack AI system using CNNs for medical image interpretation. Lead author of the corresponding IEEE-accepted research paper.",
      images: ["/X-ray.png"],
      tools: ["CNN", "React.js", "Flask", "Deep Learning"],
      liveLink: "https://osteodetector-frontend.vercel.app/",
      githubLink: "https://github.com/Shahriarshihab5/osteodetector-backend",
    },
    {
      id: 5,
      category: "web",
      title: "Shopify Inspired Platform",
      description: "Multi-vendor e-commerce platform with role-based access control and MongoDB-backed APIs.",
      images: ["/Shopify.png"],
      tools: ["Next.js", "TypeScript", "Node.js", "MongoDB"],
      liveLink: "https://shopifyinspiredwebapp.netlify.app/",
      githubLink: "https://github.com/Shahriarshihab5/Shopify-inspired-webApp",
    },
  ];

  const filteredProjects = projects.filter(p => 
    p.category === activeTab && (activeTab === "web" || p.subCategory === activeSubTab)
  );

  return (
    <section id="projects" className="min-h-screen px-8 md:px-20 py-20 bg-[#0d0d0d] text-light">
      <RevealOnScroll direction="up">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Project <span className="text-primary">Showcase</span>
          </h2>
        </div>
      </RevealOnScroll>

      {/* Main Tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-[#1a1a1a] p-1 rounded-xl border border-[#2a2a2a] flex">
          <button
            onClick={() => setActiveTab("data")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
              activeTab === "data" ? "bg-primary text-white" : "text-gray-400"
            }`}
          >
            <BarChart3 size={18} /> Data Intelligence
          </button>
          <button
            onClick={() => setActiveTab("web")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${
              activeTab === "web" ? "bg-primary text-white" : "text-gray-400"
            }`}
          >
            <Code2 size={18} /> Software Engineering
          </button>
        </div>
      </div>

      {/* Nested Sub-Tabs for Data Intelligence */}
      <AnimatePresence>
        {activeTab === "data" && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex justify-center gap-4 mb-12"
          >
            {[
              { id: "powerbi", label: "Power BI", icon: <PieChart size={14}/> },
              { id: "excel", label: "Excel", icon: <Table size={14}/> },
              { id: "sql", label: "SQL", icon: <Database size={14}/> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all ${
                  activeSubTab === tab.id 
                  ? "border-primary text-primary bg-primary/10" 
                  : "border-gray-700 text-gray-500 hover:border-gray-500"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {activeSubTab === "sql" && activeTab === "data" ? (
            <motion.div
              key="sql-coming-soon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 border-2 border-dashed border-[#2a2a2a] rounded-2xl flex flex-col items-center justify-center text-center"
            >
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Sparkles className="text-primary animate-pulse" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Something Big is Coming</h3>
              <p className="text-gray-500 max-w-sm">
                I am currently architecting complex SQL optimization and database design projects. Stay tuned for data-driven excellence.
              </p>
            </motion.div>
          ) : (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a] group hover:border-primary/50 transition-all flex flex-col h-full"
              >
                {/* Auto-cycling Image Component */}
                <ProjectImage images={project.images} title={project.title} />
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {project.tools.map((tool, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[9px] uppercase font-black bg-primary/10 text-primary border border-primary/20 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 border-t border-white/5 pt-4">
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors">
                      <ExternalLink size={18} />
                    </a>
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;