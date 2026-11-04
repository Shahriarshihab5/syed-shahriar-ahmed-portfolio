import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    let frame = null;

    const onPointerMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const el = glowRef.current;
        if (!el) return;
        el.style.setProperty("--mx", `${event.clientX}px`);
        el.style.setProperty("--my", `${event.clientY}px`);
        el.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Deep base */}
      <div className="absolute inset-0 bg-dark" />

      {/* Aurora field */}
      <div
        className="animate-aurora-a absolute -left-[18%] -top-[28%] h-[62vw] w-[62vw] rounded-full bg-primary/25 blur-[130px]"
        style={{ willChange: "transform" }}
      />
      <div
        className="animate-aurora-b absolute -right-[16%] top-[4%] h-[52vw] w-[52vw] rounded-full bg-secondary/20 blur-[120px]"
        style={{ willChange: "transform" }}
      />
      <div
        className="animate-aurora-c absolute bottom-[-24%] left-[22%] h-[56vw] w-[56vw] rounded-full bg-accent/15 blur-[140px]"
        style={{ willChange: "transform" }}
      />

      {/* Subtle grid + noise texture */}
      <div className="absolute inset-0 grid-bg opacity-70" />
      <div className="noise-overlay absolute inset-0" />

      {/* Cursor-follow glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent-2) 12%, transparent), transparent 68%)",
        }}
      />

      {/* Top edge light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
    </div>
  );
};

export default AnimatedBackground;
