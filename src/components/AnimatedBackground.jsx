const AnimatedBackground = () => {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base mesh — wide, edge-faded washes rather than hard circles */}
      <div className="absolute inset-0 mesh-bg" />

      {/* Slow moving light sweep (transform-only, composited) */}
      <div className="beam" />

      {/* Technical dot grid, faded toward the bottom */}
      <div className="dot-grid absolute inset-0 opacity-50" />

      {/* Film grain for depth */}
      <div className="noise-texture absolute inset-0" />

      {/* Editorial side rails */}
      <div className="absolute inset-y-0 left-[5%] hidden w-px bg-gradient-to-b from-transparent via-line to-transparent xl:block" />
      <div className="absolute inset-y-0 right-[5%] hidden w-px bg-gradient-to-b from-transparent via-line to-transparent xl:block" />

      {/* Top edge light */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
};

export default AnimatedBackground;
