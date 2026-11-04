/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

export const ACCENTS = [
  {
    id: "sunset",
    name: "Sunset",
    description: "Orange · Amber · Rose",
    swatch: ["#ff4c29", "#f59e0b", "#fb7185"],
  },
  {
    id: "violet",
    name: "Aurora",
    description: "Violet · Cyan · Pink",
    swatch: ["#8b5cf6", "#22d3ee", "#f472b6"],
  },
  {
    id: "emerald",
    name: "Emerald",
    description: "Emerald · Teal · Lime",
    swatch: ["#10b981", "#2dd4bf", "#a3e635"],
  },
  {
    id: "azure",
    name: "Azure",
    description: "Blue · Cyan · Purple",
    swatch: ["#3b82f6", "#06b6d4", "#a855f7"],
  },
];

const ACCENT_KEYS = {
  dark: "portfolio-accent-dark-v2",
  light: "portfolio-accent-light-v2",
};
const MODE_KEY = "portfolio-mode-v1";
// Both modes now start on Emerald.
const DEFAULT_ACCENT = { dark: "emerald", light: "emerald" };
const DEFAULT_MODE = "dark";
const ThemeContext = createContext(null);

const readStoredMode = () => {
  try {
    return localStorage.getItem(MODE_KEY) === "light" ? "light" : "dark";
  } catch {
    return DEFAULT_MODE;
  }
};

const readStoredAccent = (mode) => {
  try {
    const saved = localStorage.getItem(ACCENT_KEYS[mode]);
    return ACCENTS.some((item) => item.id === saved) ? saved : DEFAULT_ACCENT[mode];
  } catch {
    return DEFAULT_ACCENT[mode];
  }
};

export const ThemeProvider = ({ children }) => {
  const [mode, setModeState] = useState(readStoredMode);
  const [accent, setAccentState] = useState(() => readStoredAccent(mode));

  // Keep the document + storage in sync. Each mode remembers its own palette.
  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    localStorage.setItem(ACCENT_KEYS[mode], accent);
  }, [accent, mode]);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    localStorage.setItem(MODE_KEY, mode);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", mode === "light" ? "#f6f2e9" : "#08090f");
    }
  }, [mode]);

  const setAccent = (id) => {
    if (ACCENTS.some((item) => item.id === id)) {
      setAccentState(id);
    }
  };

  const setMode = (nextMode) => {
    const normalized = nextMode === "light" ? "light" : "dark";
    setModeState(normalized);
    // Apply that mode's saved palette (light defaults to Emerald).
    setAccentState(readStoredAccent(normalized));
  };

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{ accent, setAccent, accents: ACCENTS, mode, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
};
