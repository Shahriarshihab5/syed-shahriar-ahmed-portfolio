import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Code2,
  Database,
  ExternalLink,
  Github,
  PieChart,
  Sparkles,
  Table,
} from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { useContent } from "./ContentContext";

const ProjectImage = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const safeImages = images && images.length ? images : ["/vite.svg"];

  useEffect(() => {
    if (safeImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % safeImages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [safeImages.length]);

  const activeImage = safeImages[currentIndex % safeImages.length];

  return (
    <div className="relative h-52 overflow-hidden bg-dark">
      <AnimatePresence mode="wait">
        <motion.img
          key={activeImage}
          src={activeImage}
          alt={`${title} — preview ${currentIndex + 1}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.92, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {safeImages.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {safeImages.map((_, index) => (
            <span
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex % safeImages.length
                  ? "w-5 bg-primary"
                  : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const topTabs = [
  { id: "data", label: "Data Intelligence", icon: BarChart3 },
  { id: "web", label: "Software Engineering", icon: Code2 },
];

const dataTabs = [
  { id: "powerbi", label: "Power BI", icon: PieChart },
  { id: "excel", label: "Excel", icon: Table },
  { id: "sql", label: "SQL", icon: Database },
];

const badgeLabels = {
  powerbi: "Power BI",
  excel: "Excel",
  sql: "SQL",
};

const Projects = () => {
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState("data");
  const [activeSubTab, setActiveSubTab] = useState("powerbi");

  const projects = (content.projects || []).filter((project) => project.visible !== false);

  const filteredProjects = projects.filter(
    (project) =>
      project.category === activeTab &&
      (activeTab === "web" || project.subCategory === activeSubTab)
  );

  const gridKey = `${activeTab}-${activeSubTab}`;

  return (
    <section id="projects" className="section-shell relative overflow-hidden">

      <SectionHeading
        eyebrow="Portfolio"
        number="02"
        icon={Sparkles}
        title="Featured"
        highlight="Projects"
        description="A selection of data intelligence dashboards and full-stack software engineering work — built to turn complex problems into clear, usable products."
      />

      {/* Main tabs */}
      <RevealOnScroll direction="up" delay={0.05}>
        <div className="mb-5 flex justify-center">
          <div className="flex rounded-full border border-line bg-surface/90 p-1.5">
            {topTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-colors sm:px-6 sm:text-sm ${
                    isActive ? "text-white" : "text-muted hover:text-light"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="main-project-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </RevealOnScroll>

      {/* Nested data tabs */}
      <AnimatePresence initial={false}>
        {activeTab === "data" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-10 flex flex-wrap justify-center gap-2.5"
          >
            {dataTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`relative flex items-center gap-2 overflow-hidden rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                    isActive
                      ? "border-primary/40 text-primary"
                      : "border-line text-muted hover:border-primary/25 hover:text-light"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="data-project-tab"
                      className="absolute inset-0 -z-10 bg-primary/10"
                      transition={{ type: "spring", stiffness: 360, damping: 30 }}
                    />
                  )}
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div
              key={`${gridKey}-empty`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-surface/50 px-6 py-24 text-center"
            >
              <div className="mb-5 rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/20">
                <Sparkles className="animate-pulse text-primary" size={34} />
              </div>
              <h3 className="font-display text-2xl font-bold text-light">
                Something big is coming
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                New work is being prepared for this section. Check back soon for more
                data-driven projects.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={gridKey}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.5 }}
                  className="group card-lift gradient-border relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/80"
                >
                  <ProjectImage images={project.images} title={project.title} />

                  <span className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-dark/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-light">
                    {project.category === "data"
                      ? badgeLabels[project.subCategory] || "Data"
                      : "Software"}
                  </span>

                  <div className="relative z-10 flex flex-grow flex-col p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-light transition-colors duration-300 group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(project.tools || []).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-primary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5">
                      {project.liveLink ? (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-light transition-colors hover:text-primary"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      ) : (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                          Case Study
                        </span>
                      )}
                      <div className="flex items-center gap-2">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-primary/40 hover:text-primary"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title}`}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                          >
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
