import { motion } from "framer-motion";
import { ArrowUp, Github, Heart, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-scroll";
import { useContent } from "./ContentContext";

const quickLinks = [
  { id: "home", text: "Home" },
  { id: "about", text: "About" },
  { id: "projects", text: "Projects" },
  { id: "research", text: "Research" },
  { id: "activities", text: "Activities" },
  { id: "certificates", text: "Certificates" },
  { id: "contact", text: "Contact" },
];

const Footer = () => {
  const { content } = useContent();
  const profile = content.profile || {};
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, url: profile.github, label: "GitHub" },
    { icon: Linkedin, url: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, url: `mailto:${profile.email}`, label: "Email" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-dark/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="home" smooth duration={500} className="inline-flex cursor-pointer items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-[1.5px] shadow-lg shadow-primary/25">
                <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-surface text-[11px] font-black text-light">
                  SSA
                </span>
              </span>
              <span className="font-display text-lg font-bold text-light">
                {profile.name || "Syed Shahriar Ahmed"}
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Data Analyst &amp; BI Specialist leveraging engineering logic to transform complex
              data into actionable business intelligence.
            </p>

            <p className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
              <MapPin size={11} className="text-primary" />
              {profile.location || "Dhaka, Bangladesh"}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-light">Navigation</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.id}
                    smooth
                    duration={500}
                    offset={-84}
                    className="inline-block cursor-pointer text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-light">
              Let&apos;s Collaborate
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Open to data-driven insights, BI consulting, and software opportunities.
            </p>

            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface/90 text-primary transition-all duration-300 hover:border-primary/50 hover:bg-primary hover:text-white"
                  >
                    <Icon size={17} />
                  </motion.a>
                );
              })}
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
            >
              <Sparkles size={12} />
              Start a conversation
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-line pt-7 md:flex-row">
          <p className="text-center text-xs font-medium text-muted md:text-left">
            © {currentYear} Syed Shahriar Ahmed. Built for Business Intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <p className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
              Engineering <span className="text-primary">•</span> Data{" "}
              <span className="text-primary">•</span> Leadership
            </p>
            <p className="flex items-center gap-1 text-xs text-muted">
              Made with <Heart size={12} className="fill-primary text-primary" /> using React
            </p>
            <Link
              to="home"
              smooth
              duration={600}
              aria-label="Back to top"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line bg-surface/90 text-muted transition-all duration-300 hover:border-primary/50 hover:text-primary"
            >
              <ArrowUp size={15} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
