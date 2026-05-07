import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const Certificates = () => {
  const certs = [
    {
      title: "Certificate Of Presentation (QPAIN)",
      issuer: "IEEE",
      date: "2026",
      image: "/qpincrt1.jpg",
      link: "#"
    },
    {
      title: "Intro to SQL",
      issuer: "HackerRank",
      date: "2026",
      image: "/Syed Shahriar Ahmed - Intro to SQL.png",
      link: "https://drive.google.com/file/d/1FHm-SUO4JDKqFL4DyYpeNAsc6VbPf7tz/view?usp=sharing"
    },
    // Add more here
  ];

  return (
    <section id="certificates" className="min-h-screen px-8 md:px-20 py-20 bg-[#0d0d0d]">
      <RevealOnScroll direction="up">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="text-primary">Credentials</span>
          </h2>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert, idx) => (
          <motion.div 
            key={idx}
            className="group relative bg-[#1a1a1a] p-4 rounded-xl border border-[#2a2a2a] hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
              {/* REMOVED: grayscale and group-hover:grayscale-0 */}
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-full object-cover transition-all duration-500" 
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Award className="text-white" size={48} />
              </div>
            </div>
            <h3 className="text-white font-bold mb-1">{cert.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{cert.issuer} • {cert.date}</p>
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-primary text-xs font-bold hover:underline"
            >
              VIEW CERTIFICATE <ExternalLink size={12} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;