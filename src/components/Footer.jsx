import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ExternalLink } from "lucide-react";
import { Link } from "react-scroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: "home", text: "Home" },
    { id: "about", text: "About" },
    { id: "projects", text: "Projects" },
    { id: "research", text: "Research" },
    { id: "activities", text: "Activities" },
    { id: "certificates", text: "Certificates" },
    { id: "contact", text: "Contact" },
  ];

  const socialLinks = [
    {
      icon: <Github size={20} />,
      url: "https://github.com/Shahriarshihab5",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      url: "https://www.linkedin.com/in/syed-shahriar-ahmed-183233208/",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={20} />,
      url: "mailto:syedshahriarahmed0@gmail.com", // Updated to professional email 
      label: "Email",
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] text-light">
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              Syed Shahriar Ahmed
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Data Analyst & BI Specialist leveraging engineering logic to 
              transform complex data into actionable business intelligence.
            </p>
          </motion.div>

          {/* Quick Links - Expanded for new sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:pl-12"
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.id}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-gray-400 hover:text-primary transition-colors cursor-pointer text-sm inline-block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">
              Let's Collaborate
            </h4>
            <p className="text-gray-400 text-sm mb-6">
              Open to discussing data-driven insights and fintech ecosystem 
              opportunities.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-10 h-10 flex items-center justify-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] text-primary hover:bg-primary hover:text-dark hover:shadow-[0_0_15px_#ff4c29] transition-all"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm text-center md:text-left font-medium">
            © {currentYear} Syed Shahriar Ahmed. Built for Business Intelligence.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest flex items-center gap-1 font-bold">
              Engineering <span className="text-primary">•</span> Data <span className="text-primary">•</span> Leadership
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart size={14} className="text-primary fill-primary" /> using React
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;