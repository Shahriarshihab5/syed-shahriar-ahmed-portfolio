import { useState, useEffect, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";

// Components needed immediately for the first paint
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Loader from "./components/Loader";

// Lazy load sections that appear lower on the page
const About = lazy(() => import("./components/About"));
const Projects = lazy(() => import("./components/Projects"));
const Research = lazy(() => import("./components/Research"));
const Activities = lazy(() => import("./components/Activities"));
const Certificates = lazy(() => import("./components/Certificates"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const Chatbot = lazy(() => import("./components/Chatbot"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Reduced loader time slightly for better UX

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <div key="content" className="min-h-screen bg-[#0d0d0d] text-light selection:bg-primary selection:text-white">
            <ScrollProgressBar />
            <Navbar />
            
            <main>
              {/* Hero is rendered immediately */}
              <Hero />

              {/* All other sections load only when needed */}
              <Suspense fallback={<div className="h-20 bg-[#0d0d0d]" />}>
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

export default App;