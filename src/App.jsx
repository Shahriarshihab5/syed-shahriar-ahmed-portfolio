import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";

// Components needed immediately for the first paint
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Loader from "./components/Loader";
import AnimatedBackground from "./components/AnimatedBackground";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { ThemeProvider } from "./components/ThemeContext";
import { ContentProvider } from "./components/ContentContext";

// Lazy load sections that appear lower on the page
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Research = lazy(() => import("./components/Research"));
const Activities = lazy(() => import("./components/Activities"));
const Certificates = lazy(() => import("./components/Certificates"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Chatbot = lazy(() => import("./components/Chatbot"));
const Admin = lazy(() => import("./pages/Admin"));

function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatedBackground />

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <div
            key="content"
            className="relative z-10 min-h-screen text-light selection:bg-primary selection:text-white"
          >
            <ScrollProgressBar />
            <Navbar />
            <ThemeSwitcher />

            <main className="relative">
              {/* Hero is rendered immediately */}
              <Hero />

              {/* All other sections load only when needed */}
              <Suspense fallback={<div className="h-24" />}>
                <About />
                <Projects />
                <Research />
                <Activities />
                <Certificates />
                <Contact />
              </Suspense>
            </main>

            <Suspense fallback={null}>
              <Footer />
              <Chatbot />
            </Suspense>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <Suspense fallback={<div className="min-h-screen bg-dark" />}>
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </Suspense>
      </ContentProvider>
    </ThemeProvider>
  );
}

export default App;
