import { useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: "home", text: "Home" },
    { id: "about", text: "About" },
    { id: "projects", text: "Projects" },
    { id: "contact", text: "Contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-[#0d0d0d] shadow-lg border-b border-[#1a1a1a]"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo with Animated Text Gradient */}
        <Link
          to="home"
          smooth={true}
          duration={500}
          offset={-80}
          className="cursor-pointer"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff6b3d] via-[#ffb088] to-[#ff6b3d] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
            Syed Shahriar Ahmed
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                smooth={true}
                duration={500}
                offset={-80}
                className="cursor-pointer text-light hover:text-primary transition-colors"
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Download Resume Button (Desktop) */}
        <a
          href="/src/assets/Syed-Shahriar-Ahmed-Resume_.pdf"
          download
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-primary/90 transition-all duration-300 ease-in-out border-2 border-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Resume
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-light"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-0 w-full bg-dark flex flex-col items-center py-6 space-y-4 shadow-lg md:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-light hover:text-primary transition-colors"
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {/* Download Resume Button (Mobile) */}
            <a
              href="/src/assets/Syed-Shahriar-Ahmed-Resume_.pdf"
              download
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-2 bg-primary text-white font-medium rounded shadow hover:bg-primary/90 transition-colors"
            >
              Download Resume
            </a>
          </motion.ul>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
