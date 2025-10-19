import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";

function App() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-light">
      <Navbar />
      <Hero />
      <About></About>
    </div>
  );
}

export default App;
