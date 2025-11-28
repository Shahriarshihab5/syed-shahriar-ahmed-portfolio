import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Research from "./components/Research";  // Add this
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Loader from "./components/Loader";
import Chatbot from "./components/Chatbot";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <div key="content" className="min-h-screen bg-[#0d0d0d] text-light">
            <ScrollProgressBar />
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Research />  {/* Add this */}
            <Contact />
            <Footer />
            <Chatbot />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
