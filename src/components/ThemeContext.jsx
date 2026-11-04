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

const STORAGE_KEY = "portfolio-accent-v2";
const DEFAULT_ACCENT = "sunset";
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  // Restore the visitor's last palette choice.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ACCENTS.some((item) => item.id === saved)) {
      setAccentState(saved);
    }
  }, []);

  // Keep the document + storage in sync.
  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    localStorage.setItem(STORAGE_KEY, accent);
  }, [accent]);

  const setAccent = (id) => {
    if (ACCENTS.some((item) => item.id === id)) {
      setAccentState(id);
    }
  };

  return (
    <ThemeContext.Provider value={{ accent, setAccent, accents: ACCENTS }}>
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
