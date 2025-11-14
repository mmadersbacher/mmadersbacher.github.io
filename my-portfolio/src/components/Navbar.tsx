import { useEffect, useState } from "react";
import logo from "../assets/logo_trans.png";

export default function Navbar({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] =
    useState<"home" | "projekte" | "techstack" | "skills">("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "projekte", "techstack", "skills"] as const;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as typeof sections[number]);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.01 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const LinkItem = ({
    label,
  }: {
    label: "Home" | "Projekte" | "Techstack" | "Skills";
  }) => {
    const id = label.toLowerCase() as "home" | "projekte" | "techstack" | "skills";
    const is = active === id;
    return (
      <a
        href={`#${id}`}
        aria-current={is ? "page" : undefined}
        className={`relative font-semibold transition group ${
          is ? "text-cyan-400" : "text-gray-300 hover:text-cyan-300"
        }`}
      >
        {label}
        <span
          className={`absolute left-0 -bottom-1 h-0.5 transition-all ${
            is ? "w-full bg-cyan-400" : "w-0 group-hover:w-full bg-cyan-300/60"
          }`}
        />
      </a>
    );
  };

  // Größeres Logo im Idle, kleiner beim Scrollen
  const logoSizeClass = scrolled ? "h-10 w-10" : "h-14 w-14"; // 40px → 56px

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur border-b border-[#223]/60 transition-all duration-300
        ${theme === "dark" ? "bg-[#161b26]/80" : "bg-white/80"} 
        ${scrolled ? "shadow-lg py-3" : "py-6"}`}
      role="navigation"
      aria-label="Hauptnavigation"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
        <a
          href="#home"
          aria-label="Zur Startseite springen"
          className="group flex items-center font-extrabold tracking-tight"
        >
          <img
            src={logo}
            alt="MM Logo"
            className={`${logoSizeClass} mr-3 select-none transition-all duration-300 ease-out
                        drop-shadow-[0_2px_10px_rgba(56,189,248,0.25)]`}
            width={56}
            height={56}
            loading="eager"
            decoding="async"
            draggable={false}
          />
          <span className="sr-only">Mario Madersbacher</span>
        </a>

        <div className="flex items-center gap-8">
          <LinkItem label="Home" />
          <LinkItem label="Projekte" />
          <LinkItem label="Techstack" />
          <LinkItem label="Skills" />

          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full text-amber-400 hover:bg-amber-400/10 transition
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70"
            aria-label="Theme wechseln"
            title="Theme wechseln"
            type="button"
          >
            {theme === "dark" ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                </g>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
