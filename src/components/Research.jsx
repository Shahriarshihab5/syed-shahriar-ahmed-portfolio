import { motion } from "framer-motion";
import { BookOpen, FileText, Database, Award, CheckCircle } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import { useContent } from "./ContentContext";

const iconMap = {
  check: CheckCircle,
  file: FileText,
  database: Database,
};

const toneStyles = {
  emerald: {
    card: "border-emerald-500/30 hover:border-emerald-400/50",
    accentText: "text-emerald-400",
    iconBox: "bg-emerald-500/15 text-emerald-400",
    rule: "border-emerald-500",
    pill: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    status: "bg-emerald-500",
  },
  primary: {
    card: "border-line hover:border-primary/40",
    accentText: "text-primary",
    iconBox: "bg-primary/15 text-primary",
    rule: "border-primary",
    pill: "border-primary/25 bg-primary/10 text-primary",
    status: "bg-primary",
  },
  amber: {
    card: "border-amber-500/30 hover:border-amber-400/50",
    accentText: "text-amber-400",
    iconBox: "bg-amber-500/15 text-amber-400",
    rule: "border-amber-500",
    pill: "border-amber-500/20 bg-amber-500/10 text-amber-300",
    status: "bg-amber-500",
  },
};

const Research = () => {
  const { content } = useContent();
  const researchWorks = (content.research || []).filter((item) => item.visible !== false);

  return (
    <section id="research" className="section-shell relative overflow-hidden">

      <SectionHeading
        eyebrow="Research"
        number="03"
        icon={BookOpen}
        title="Research &"
        highlight="Publications"
        description="Contributing to global intelligence through published research in healthcare and agricultural technology."
      />

      {researchWorks.length === 0 ? (
        <p className="text-center text-sm text-muted">
          No publications are listed right now. Please check back soon.
        </p>
      ) : (
        <div className="relative z-10 mx-auto max-w-6xl space-y-6">
          {researchWorks.map((research, index) => {
            const tone = toneStyles[research.tone] || toneStyles.primary;
            const Icon = iconMap[research.icon] || FileText;

            return (
              <RevealOnScroll key={research.id} direction="up" delay={index * 0.08}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className={`card-lift gradient-border relative overflow-hidden rounded-3xl border bg-surface/90 p-6 transition-colors duration-300 md:p-8 ${tone.card}`}
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

                  <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tone.iconBox}`}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-display text-xl font-bold leading-snug text-light md:text-2xl">
                          {research.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                          <span className={`font-semibold ${tone.accentText}`}>
                            {research.type}
                          </span>
                          <span className="text-muted">•</span>
                          <span className="text-muted">{research.year}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 self-start rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg ${tone.status}`}
                    >
                      {research.status}
                    </span>
                  </div>

                  {(research.conference || research.journal) && (
                    <div
                      className={`relative z-10 mt-5 rounded-xl border-l-2 bg-dark/50 p-4 ${tone.rule}`}
                    >
                      <p className="text-sm text-muted">
                        <span className={`font-semibold ${tone.accentText}`}>
                          {research.conference ? "Venue: " : "Journal: "}
                        </span>
                        <span className="text-light/85">
                          {research.conference || research.journal}
                        </span>
                        {research.publication && (
                          <span className="mt-1 block text-xs text-muted">
                            Indexed:{" "}
                            <span className="font-medium text-light/80">{research.publication}</span>
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  <p className="relative z-10 mt-5 text-sm leading-relaxed text-muted">
                    {research.description}
                  </p>

                  <div className="relative z-10 mt-6 grid gap-6 md:grid-cols-2">
                    {(research.highlights || []).length > 0 && (
                      <div>
                        <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-light">
                          <Award size={13} className="text-primary" />
                          Key Highlights
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {research.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold ${tone.pill}`}
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(research.technologies || []).length > 0 && (
                      <div>
                        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-light">
                          Technologies &amp; Methods
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {research.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-line bg-dark/50 px-3 py-1.5 text-[10px] font-medium text-muted"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.article>
              </RevealOnScroll>
            );
          })}
        </div>
      )}

      <RevealOnScroll direction="up" delay={0.2}>
        <p className="mt-12 text-center text-xs font-medium tracking-wide text-muted">
          Open to research collaboration and innovative AI/ML projects.
        </p>
      </RevealOnScroll>
    </section>
  );
};

export default Research;
