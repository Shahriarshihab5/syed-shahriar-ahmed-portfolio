import RevealOnScroll from "./RevealOnScroll";

const SectionHeading = ({
  eyebrow,
  number,
  title,
  highlight,
  description,
  icon: Icon,
  className = "",
}) => {
  return (
    <RevealOnScroll direction="up">
      <div className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${className}`}>
        {(eyebrow || number) && (
          <div className="mb-5 flex items-center justify-center gap-3">
            {number && (
              <span className="font-mono text-[11px] font-semibold tracking-tight text-primary">
                {number}
              </span>
            )}
            <span className="h-px w-8 bg-gradient-to-r from-primary/70 to-transparent" />
            {eyebrow && (
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted">
                {eyebrow}
              </span>
            )}
            {Icon && <Icon size={12} className="text-primary/80" />}
          </div>
        )}

        <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-light md:text-5xl">
          {title}{" "}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>

        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>
        )}
      </div>
    </RevealOnScroll>
  );
};

export default SectionHeading;
