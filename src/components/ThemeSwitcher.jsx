import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

const ThemeSwitcher = () => {
  const { accent, setAccent, accents, mode, setMode, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const modeOptions = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
  ];

  return (
    <div className="fixed right-4 top-20 z-40 flex flex-col items-end gap-2 md:right-6 md:top-24">
      <motion.button
        type="button"
        onClick={toggleMode}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/90 text-light shadow-lg shadow-black/20 transition-colors hover:border-primary/50 hover:text-primary"
      >
        {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      <div ref={containerRef} className="relative">
        <motion.button
          type="button"
          onClick={() => setOpen((value) => !value)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Change color theme"
          aria-expanded={open}
          className="group relative block h-11 w-11 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-[1.5px] shadow-lg shadow-primary/30"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-surface/90">
            <Palette
              size={18}
              className="text-light transition-colors duration-300 group-hover:text-primary"
            />
          </span>
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary to-secondary opacity-50 blur-md transition-opacity duration-300 group-hover:opacity-80" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 mt-3 w-64 origin-top-right overflow-hidden rounded-2xl border border-line bg-surface/95 p-2 shadow-2xl shadow-black/60"
            >
              <p className="px-3 pb-2 pt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                Appearance
              </p>

              <div className="mb-2 grid grid-cols-2 gap-1 rounded-xl border border-line bg-surface-2 p-1">
                {modeOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = mode === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      onClick={() => setMode(option.id)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-bold transition-colors ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-muted hover:text-light"
                      }`}
                    >
                      <Icon size={13} />
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                Color theme
              </p>

              <div className="space-y-1">
                {accents.map((item) => {
                  const isActive = item.id === accent;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitemradio"
                      aria-checked={isActive}
                      onClick={() => setAccent(item.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-primary/12 text-light"
                          : "text-muted hover:bg-white/5 hover:text-light"
                      }`}
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ring-1 ring-white/15"
                        style={{
                          background: `linear-gradient(135deg, ${item.swatch[0]}, ${item.swatch[1]} 55%, ${item.swatch[2]})`,
                        }}
                      >
                        {isActive && <Check size={13} className="text-white drop-shadow" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold">{item.name}</span>
                        <span className="block truncate text-[10px] text-muted">
                          {item.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
