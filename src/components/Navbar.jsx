import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import {
  Home,
  User,
  Folder,
  FlaskConical,
  Mail,
  Trophy,
  Camera,
  Download,
} from "lucide-react";
import { useContent } from "./ContentContext";

const navLinks = [
  { id: "home", text: "Home", icon: Home },
  { id: "about", text: "About", icon: User },
  { id: "projects", text: "Projects", icon: Folder },
  { id: "research", text: "Research", icon: FlaskConical },
  { id: "activities", text: "Activities", icon: Camera },
  { id: "certificates", text: "Certificates", icon: Trophy },
  { id: "contact", text: "Contact", icon: Mail },
];

const Navbar = () => {
  const { content } = useContent();
  const profile = content.profile || {};
  const [activeLink, setActiveLink] = useState("home");
  const [offset, setOffset] = useState(-80);

  useEffect(() => {
    const updateOffset = () => {
      setOffset(window.innerWidth < 768 ? -70 : -88);
    };

    updateOffset();
    window.scrollTo(0, 0);
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="navbar-blur fixed left-0 top-0 z-50 hidden w-full border-b border-line shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] lg:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5">
          <Link
            to="home"
            smooth
            duration={500}
            offset={offset}
            className="group flex shrink-0 cursor-pointer items-center gap-3"
            onClick={() => setActiveLink("home")}
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-[1.5px] shadow-lg shadow-primary/25">
              <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-surface text-[11px] font-black tracking-tight text-light">
                SSA
              </span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[15px] font-bold text-light transition-colors group-hover:text-primary">
                Syed Shahriar
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-muted">
                Data · BI · Research
              </span>
            </span>
          </Link>

          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeLink === link.id;
              return (
                <li key={link.id}>
                  <Link
                    to={link.id}
                    smooth
                    spy
                    duration={500}
                    offset={offset}
                    onSetActive={() => setActiveLink(link.id)}
                    className={`relative block cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${
                      isActive ? "text-light" : "text-muted hover:text-light"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="desktop-nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>

          <a
            href={profile.cvUrl || "/Syed_Shahriar_Ahmed_Resume.pdf"}
            download={profile.cvFileName || "Syed_Shahriar_Ahmed_Resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="shine group relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-transform duration-300 hover:scale-[1.04]"
          >
            <Download size={14} className="relative z-10" />
            <span className="relative z-10">Resume</span>
          </a>
        </div>
      </motion.nav>

      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <div className="navbar-blur fixed bottom-0 left-0 z-50 w-full border-t border-line pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="flex items-center justify-around px-1 py-2.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeLink === link.id;
            return (
              <Link
                key={link.id}
                to={link.id}
                smooth
                duration={500}
                offset={offset}
                spy
                onSetActive={() => setActiveLink(link.id)}
                className="relative flex cursor-pointer flex-col items-center gap-1 px-1.5 py-1"
                aria-label={link.text}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active"
                    className="absolute -top-1 h-1 w-1 rounded-full bg-primary shadow-[0_0_10px_var(--accent-1)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  size={19}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted"
                  }`}
                />
                <span
                  className={`text-[9px] font-bold uppercase tracking-tight transition-colors duration-300 ${
                    isActive ? "text-primary" : "text-muted"
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
