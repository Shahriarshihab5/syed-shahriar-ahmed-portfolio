import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const Projects = () => {
  const projects = [

    {
      id: 1,
      title: "X-ray Osteoarthritis Detection System",
      description:
        "Full-stack AI-powered web application that allows users to upload X-ray images and receive osteoarthritis predictions via a REST API. Includes Grad-CAM visualizations for model interpretability and real-world deployment.",
      image: "/X-ray.png", 
      tools: [
        "Python",
        "Deep Learning",
        "Ensemble Models",
        "Grad-CAM",
        "Flask",
        "REST API",
        "React.js",
        "Hugging Face",
        "HTML",
        "CSS",
      ],
      liveLink: "https://osteodetector-frontend.vercel.app/",
      
      githubLink: "https://github.com/Shahriarshihab5/osteodetector-backend", 
    },
    {
      id: 2,
      title: "GadgetHeaven",
      description:
        "Responsive React gadget store with Tailwind CSS, featuring product browsing, cart, and wishlist. A full-featured e-commerce platform with smooth navigation, dynamic cart management, and real-time updates using Context API and LocalStorage.",
      image: "/gadgetheaven.png",
      tools: [
        "React",
        "Tailwind CSS",
        "React Router",
        "React Toastify",
        "Vite",
        "Firebase Authentication",
      ],
      liveLink: "https://gadget-heaven-eight.vercel.app/",
      githubLink: "https://github.com/Shahriarshihab5/Gadget-Heaven",
    },

 
    {
      id: 3,
      title: "Shopify Inspired Platform",
      description:
        "A full‑stack, Shopify‑inspired multi‑vendor e‑commerce platform where merchants can create and manage stores, products, and orders while customers browse and purchase items. Features role‑based access (admin, merchant, customer), protected dashboards, Firebase authentication, and MongoDB‑backed APIs with a modern, responsive UI.",
      image: "/public/Shopify.png",
      tools: [
        "Next.js (App Router)",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Zustand",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Firebase Authentication"
      ],
    
      liveLink: "https://shopifyinspiredwebapp.netlify.app/",
      githubLink:
        "https://github.com/Shahriarshihab5/Shopify-inspired-webApp",
    },



    {
      id: 4,
      title: "PetAdoption (Peddy)",
      description:
        "A responsive web app built with HTML, Tailwind CSS, and JavaScript (ES6) that lets users browse, filter, and adopt pets with interactive modals, price sorting, and a simulated adoption process. Features dynamic pet listing and seamless user experience.",
      image: "/peddy.png",
      tools: [
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "JavaScript (ES6+)",
        "Node.js",
        "MongoDB",
        "Mongoose",
        "Firebase Authentication",
      ],
      liveLink: "https://peddy-pet-adoptionnsite.surge.sh/",
      githubLink:
        "https://github.com/Shahriarshihab5/CSE416-Web-Engineering-Lab-Project",
    },
    {
      id: 5,
      title: "BookVibe",
      description:
        "Responsive book listing app with read-list management, sorting, and toast notifications using React, Tailwind CSS, and React Router. Allows users to browse books, manage their reading list, and track their favorite books with local storage integration.",
      image: "/bookvibe.png",
      tools: [
        "React.js",
        "React Router",
        "Tailwind CSS",
        "Firebase",
        "React Toastify",
        "Local Storage",
      ],
      liveLink: "https://book-vibee8.netlify.app/",
      githubLink: "https://github.com/Shahriarshihab5/Bookvibe",
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen px-8 md:px-20 py-20 bg-[#0d0d0d] text-light"
    >
      {/* Section Header */}
      <RevealOnScroll direction="up" delay={0}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web
            development, responsive design, and problem-solving.
          </p>
        </div>
      </RevealOnScroll>

      {/* Projects Grid */}
      <div className="space-y-16">
        {projects.map((project, index) => (
          <RevealOnScroll key={project.id} direction="up" delay={index * 0.15}>
            <motion.div
              className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(255,76,41,0.3)] transition-all duration-300 border border-[#2a2a2a]"
              whileHover={{ y: -5 }}
            >
              <div
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Project Image */}
                <div className="md:w-1/2 relative group overflow-hidden bg-[#0d0d0d]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent opacity-60"></div>
                </div>

                {/* Project Details */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tools/Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-sm bg-primary/20 text-primary rounded-full border border-primary/30"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-dark font-semibold rounded-lg hover:shadow-[0_0_20px_#ff4c29] transition-all"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-dark transition-all"
                    >
                      <Github size={18} />
                      GitHub
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
};

export default Projects;
