import { motion } from "framer-motion";
import { BookOpen, FileText, Database, Award, CheckCircle } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const Research = () => {
  const researchWorks = [
    {
      id: 1,
      title: "Comparative Study of CNN-Based Transfer Learning Models for Osteoporosis Detection in X-ray Images",
      type: "Conference Paper",
      status: "Accepted & Published",
      statusColor: "bg-emerald-500", // Success color for accepted paper
      icon: <CheckCircle size={24} />,
      description:
        "Lead author of this research evaluating various CNN-based transfer learning models for medical image classification. The study provides a framework for early osteoporosis detection using deep learning to improve diagnostic accuracy.",
      conference: "IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN)",
      publication: "IEEE Xplore Digital Library (Scopus Indexed)",
      technologies: [
        "CNN",
        "Transfer Learning",
        "Deep Learning",
        "Medical Imaging",
        "Python",
        "Ensemble Learning",
      ],
      year: "2024-2025",
      highlights: [
        "Lead Author & Presenter",
        "Accepted at IEEE QPAIN",
        "To be Published in IEEE Xplore",
        "Poster Presentation at CUET",
      ],
    },
    {
      id: 2,
      title: "AI-Powered Diagnostic System for Osteoarthritis Detection",
      type: "Thesis (Ongoing)",
      status: "In Progress",
      statusColor: "bg-blue-500",
      icon: <FileText size={24} />,
      description:
        "Developing a deep learning-based diagnostic system for automated detection and classification of osteoarthritis and fractures. Utilizing convolutional neural networks (CNN) and Grad-CAM visualizations to assist radiologists in early detection.",
      technologies: [
        "Deep Learning",
        "CNN",
        "Python",
        "Medical Imaging",
        "Computer Vision",
        "Flask/React",
      ],
      year: "2024-2025",
      highlights: [
        "Undergraduate Thesis Work",
        "Medical Image Interpretation",
        "AI-Assisted Clinical Diagnosis",
      ],
    },
    {
      id: 3,
      title: "Chrysanthemum Leaf Disease Classification Dataset",
      type: "Dataset Publication",
      status: "Under Review",
      statusColor: "bg-yellow-500",
      icon: <Database size={24} />,
      description:
        "Submitted to 'Data in Brief' journal. Created and curated a comprehensive image dataset for bacterial disease and Septoria leaf spot classification in chrysanthemum plants to facilitate agricultural AI research.",
      journal: "Data in Brief",
      technologies: [
        "Dataset Curation",
        "Image Processing",
        "Agricultural AI",
        "Plant Pathology",
        "Data Annotation",
      ],
      year: "2025",
      highlights: [
        "Submitted to Data in Brief",
        "Original Dataset Creation",
        "Agricultural Technology",
      ],
    },
  ];

  const getStatusBadge = (status, statusColor) => {
    return (
      <span
        className={`px-3 py-1 text-[10px] uppercase font-bold text-white rounded-full ${statusColor} shadow-lg`}
      >
        {status}
      </span>
    );
  };

  return (
    <section
      id="research"
      className="min-h-screen px-8 md:px-20 py-20 bg-[#0d0d0d] text-light relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      {/* Section Header */}
      <RevealOnScroll direction="up" delay={0}>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen size={40} className="text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Research & <span className="text-primary">Publications</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-3xl mx-auto italic">
            Contributing to global intelligence through published research in healthcare and agricultural technology.
          </p>
        </div>
      </RevealOnScroll>

      {/* Research Cards */}
      <div className="max-w-6xl mx-auto space-y-8">
        {researchWorks.map((research, index) => (
          <RevealOnScroll key={research.id} direction="up" delay={index * 0.1}>
            <motion.div
              className={`rounded-xl p-8 border transition-all duration-300 ${
                research.status.includes("Accepted") 
                ? "bg-[#1a1a1a] border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                : "bg-[#1a1a1a] border-[#2a2a2a] hover:border-primary/50"
              }`}
              whileHover={{ y: -5, boxShadow: research.status.includes("Accepted") ? "0 0 30px rgba(16,185,129,0.2)" : "0 0 30px rgba(255, 76, 41, 0.2)" }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${research.status.includes("Accepted") ? "bg-emerald-500/20 text-emerald-500" : "bg-primary/20 text-primary"}`}>
                    {research.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-snug">
                      {research.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`${research.status.includes("Accepted") ? "text-emerald-400" : "text-primary"} font-semibold text-sm`}>
                        {research.type}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">{research.year}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(research.status, research.statusColor)}
              </div>

              {/* Conference/Journal Info */}
              {(research.conference || research.journal) && (
                <div className={`mb-4 p-3 bg-[#0d0d0d] rounded-lg border-l-4 ${research.status.includes("Accepted") ? "border-emerald-500" : "border-primary"}`}>
                  <p className="text-sm text-gray-300">
                    <span className={`font-semibold ${research.status.includes("Accepted") ? "text-emerald-500" : "text-primary"}`}>
                      {research.conference ? "Venue: " : "Journal: "}
                    </span>
                    {research.conference || research.journal}
                    {research.publication && (
                      <span className="block mt-1 text-xs text-gray-400">
                        Indexed: <span className="text-gray-300 font-medium">{research.publication}</span>
                      </span>
                    )}
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-6">
                {research.description}
              </p>

              {/* Highlights */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
                    <Award size={14} className="text-primary"/> Key Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {research.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 text-xs rounded-full border ${research.status.includes("Accepted") ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-primary/10 text-primary border-primary/30"}`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-white font-semibold mb-3 text-sm">
                    Technologies & Methods:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {research.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-[#0d0d0d] text-gray-300 text-xs rounded-lg border border-[#2a2a2a]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>

      {/* Bottom Note */}
      <RevealOnScroll direction="up" delay={0.3}>
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Open to research collaboration and innovative AI/ML projects.
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default Research;