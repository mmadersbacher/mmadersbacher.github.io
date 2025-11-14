import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Techstack from "./components/Techstack";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark" ? "bg-[#151925] text-white" : "bg-white text-[#151925]"
      }`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main id="home" className="scroll-mt-28 pt-24">
        <Hero />
        <section id="projekte" className="scroll-mt-28">
          <Projects />
        </section>
        <section id="techstack" className="scroll-mt-28">
          <Techstack />
        </section>
        <section id="skills" className="scroll-mt-28">
          <Skills />
        </section>
      </main>

      <Footer />
    </div>
  );
}
