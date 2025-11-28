import { motion } from "framer-motion";
import { BookOpen, FileText, Database, Award } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const Research = () => {
  const researchWorks = [
    {
      id: 1,
      title: "X-ray Osteoarthritis Fracture Detection",
      type: "Thesis (Ongoing)",
      status: "In Progress",
      statusColor: "bg-blue-500",
      icon: <FileText size={24} />,
      description:
        "Developing a deep learning model for automated detection and classification of osteoarthritis and fractures from radiology X-ray images. Utilizing convolutional neural networks (CNN) to assist radiologists in accurate diagnosis and early detection of bone-related conditions.",
      technologies: [
        "Deep Learning",
        "CNN",
        "Python",
        "TensorFlow/PyTorch",
        "Medical Imaging",
        "Computer Vision",
      ],
      year: "2024-2025",
      highlights: [
        "Thesis Work - Ongoing Research",
        "Medical Image Analysis",
        "AI-Assisted Diagnosis",
      ],
    },
    {
      id: 2,
      title: "Osteoporosis Detection with Explainable AI",
      type: "Conference Paper",
      status: "Under Review",
      statusColor: "bg-yellow-500",
      icon: <Award size={24} />,
      description:
        "Submitted to the International Conference on Intelligent Data Analysis and Applications (IDAA 2025). This research focuses on developing an explainable AI model for early osteoporosis detection, providing transparent and interpretable predictions to enhance clinical decision-making.",
      conference: "IDAA 2025 - Advancing Data-Driven Intelligence for Real-World Applications",
      technologies: [
        "Explainable AI",
        "Deep Learning",
        "XAI Techniques",
        "Medical AI",
        "Python",
        "Classification Models",
      ],
      year: "2025",
      highlights: [
        "Submitted to IDAA 2025",
        "Explainable AI Implementation",
        "Healthcare Application",
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
        "Submitted to Data in Brief journal. Created and curated a comprehensive image dataset for bacterial disease and Septoria leaf spot classification in chrysanthemum plants. This dataset aims to facilitate research in agricultural AI and automated plant disease detection systems.",
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
        className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${statusColor}`}
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
          <p className="text-gray-400 max-w-3xl mx-auto">
            Exploring the intersection of AI, deep learning, and real-world applications
            in healthcare and agriculture. Focused on developing explainable and
            practical solutions for critical domains.
          </p>
        </div>
      </RevealOnScroll>

      {/* Research Cards */}
      <div className="max-w-6xl mx-auto space-y-8">
        {researchWorks.map((research, index) => (
          <RevealOnScroll key={research.id} direction="up" delay={index * 0.1}>
            <motion.div
              className="bg-[#1a1a1a] rounded-xl p-8 border border-[#2a2a2a] hover:border-primary/50 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: "0 0 30px rgba(255, 76, 41, 0.2)" }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                    {research.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {research.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-primary font-semibold text-sm">
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
                <div className="mb-4 p-3 bg-[#0d0d0d] rounded-lg border-l-4 border-primary">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-primary">
                      {research.conference ? "Conference: " : "Journal: "}
                    </span>
                    {research.conference || research.journal}
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-6">
                {research.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 text-sm">
                  Key Highlights:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {research.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-primary/10 text-primary text-xs rounded-full border border-primary/30"
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
