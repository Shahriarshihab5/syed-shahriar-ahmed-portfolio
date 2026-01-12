import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Folder,
  FlaskConical,
  Mail,
} from "lucide-react";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [offset, setOffset] = useState(-80);

  // Fix offset & layout on first load
  useEffect(() => {
    const updateOffset = () => {
      setOffset(window.innerWidth < 768 ? -60 : -80);
    };

    updateOffset();
    window.scrollTo(0, 0);
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const navLinks = [
    { id: "home", text: "Home", icon: Home },
    { id: "about", text: "About", icon: User },
    { id: "projects", text: "Projects", icon: Folder },
    { id: "research", text: "Research", icon: FlaskConical },
    { id: "contact", text: "Contact", icon: Mail },
  ];

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <motion.nav
        className="hidden md:block fixed top-0 left-0 w-full z-50 navbar-blur shadow-lg border-b border-[#1a1a1a]"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="home"
            smooth
            duration={500}
            offset={offset}
            className="cursor-pointer"
            onClick={() => setActiveLink("home")}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff4c29] via-white to-[#ff4c29] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Syed Shahriar Ahmed
            </h1>
          </Link>

          {/* Desktop Links */}
          <ul className="flex space-x-6 text-lg">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth
                  duration={500}
                  offset={offset}
                  spy
                  onSetActive={() => setActiveLink(link.id)}
                  className={`cursor-pointer transition-colors ${
                    activeLink === link.id
                      ? "text-primary"
                      : "text-light"
                  } hover:text-primary`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>

          {/* Resume Button */}
          <a
            href="/Syed-Shahriar-Ahmed-Resume_.pdf"
            download="Syed-Shahriar-Ahmed-Resume.pdf"
            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(255,76,41,0.6)] hover:scale-105 transition-all duration-300 border-2 border-white"
          >
            Resume
          </a>
        </div>
      </motion.nav>

      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0d0d0d] border-t border-[#1a1a1a] md:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center py-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.id}
                to={link.id}
                smooth
                duration={500}
                offset={offset}
                spy
                onSetActive={() => setActiveLink(link.id)}
                className="flex flex-col items-center gap-1 cursor-pointer"
              >
                <Icon
                  size={22}
                  className={`transition-colors ${
                    activeLink === link.id
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-xs ${
                    activeLink === link.id
                      ? "text-primary"
                      : "text-gray-400"
                  }`}
                >
                  {link.text}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
