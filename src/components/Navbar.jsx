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
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary cursor-pointer">
          Syed Shahriar Ahmed
        </h1>

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
          </motion.ul>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
