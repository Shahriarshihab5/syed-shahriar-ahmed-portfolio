import RevealOnScroll from "./RevealOnScroll";

const SectionHeading = ({ eyebrow, title, highlight, description, icon: Icon, className = "" }) => {
  return (
    <RevealOnScroll direction="up">
      <div className={`mx-auto mb-12 max-w-3xl text-center md:mb-16 ${className}`}>
        {eyebrow && (
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-muted backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {Icon && <Icon size={12} className="text-primary" />}
            {eyebrow}
          </div>
        )}

        <h2 className="font-display text-4xl font-bold leading-[1.1] text-light md:text-5xl">
          {title}{" "}
          {highlight && (
            <span className="text-gradient animate-gradient-x">{highlight}</span>
          )}
        </h2>

        <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />

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
