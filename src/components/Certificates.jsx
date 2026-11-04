import { motion } from "framer-motion";
import { Award, ExternalLink, GraduationCap, Sparkles } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { useContent } from "./ContentContext";

const Certificates = () => {
  const { content } = useContent();
  const certs = (content.certificates || []).filter((item) => item.visible !== false);

  return (
    <section id="certificates" className="section-shell relative overflow-hidden">

      <SectionHeading
        eyebrow="Credentials"
        number="05"
        icon={Award}
        title="Professional"
        highlight="Credentials"
        description="Certifications and recognition that back the work — from IEEE presentation to verified technical skills."
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((cert, index) => {
          const hasLink = cert.link && cert.link !== "#";

          return (
            <RevealOnScroll key={cert.id} direction="up" delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group gradient-border relative h-full overflow-hidden rounded-3xl border border-line bg-surface/90 p-4 transition-colors duration-300 hover:border-primary/40"
              >
                <div className="relative mb-4 h-52 overflow-hidden rounded-2xl bg-dark">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-surface to-secondary/20">
                      <Award size={52} className="text-primary/60" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-70" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                      <Award size={26} />
                    </span>
                  </div>
                </div>

                <h3 className="px-1 font-display text-base font-bold leading-snug text-light">
                  {cert.title}
                </h3>
                <p className="mt-1 px-1 text-xs text-muted">
                  {cert.issuer} <span className="text-primary">•</span> {cert.date}
                </p>

                {hasLink && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    View Certificate <ExternalLink size={11} />
                  </a>
                )}
              </motion.article>
            </RevealOnScroll>
          );
        })}

        <RevealOnScroll direction="up" delay={0.16}>
          <div className="gradient-border relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-line bg-surface/50 p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <GraduationCap size={26} />
            </div>
            <h3 className="font-display text-lg font-bold text-light">Always Learning</h3>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
              Continuously expanding my toolkit across analytics, cloud, and AI. More certifications
              are on the way.
            </p>
            <a
              href={content.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105"
            >
              <Sparkles size={12} />
              Follow the journey
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Certificates;
