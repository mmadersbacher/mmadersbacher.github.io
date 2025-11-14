import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

type Props = {
  theme?: "light" | "dark";
  toggleTheme?: () => void;
};

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M12 4a1 1 0 0 1 1 1v1.25a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm7-5.5a1 1 0 0 1 1 1v.01a1 1 0 1 1-2 0V12a1 1 0 0 1 1-1ZM12 18.75a1 1 0 0 1 1 1V21a1 1 0 1 1-2 0v-1.25a1 1 0 0 1 1-1Zm6.01-9.51.88-.88a1 1 0 1 1 1.41 1.41l-.88.88a1 1 0 1 1-1.41-1.41Zm-13.3 9.3.88-.88a1 1 0 1 1 1.41 1.41l-.88.88a1 1 0 0 1-1.41-1.41Zm0-11.01A1 1 0 0 1 6.12 6.2l-.88.88A1 1 0 1 1 3.83 5.66l.88-.88ZM17.9 17.8a1 1 0 1 1 1.41 1.41l-.88.88a1 1 0 1 1-1.41-1.41l.88-.88ZM4 12a1 1 0 0 1 1-1h1.25a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"/>
  </svg>
);

export default function Header({ theme = "dark", toggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  // Shadow/Backdrop bei Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktiven Abschnitt highlighten
  useEffect(() => {
    const ids = ["projekte", "techstack", "skills"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const linkBase =
    "relative px-2 py-1 text-sm md:text-base text-gray-300 hover:text-white transition-colors";

  const linkActive =
    "text-white after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-8 after:rounded-full after:bg-gradient-to-r after:from-cyan-400 after:to-sky-400";

  return (
    <header
      className={[
        "sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#0b1220]/60",
        "transition-all",
        scrolled ? "shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" : "shadow-none",
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2 select-none"
          aria-label="Zur Startseite"
        >
          <img src={logo} alt="MM Logo" className="h-7 w-7 rounded-sm" />
          <span className="text-xl font-bold tracking-tight text-white">MM</span>
        </a>

        {/* Nav */}
        <nav aria-label="Hauptnavigation" className="hidden md:flex items-center gap-6">
          <a
            href="#projekte"
            className={`${linkBase} ${active === "projekte" ? linkActive : ""}`}
            aria-current={active === "projekte" ? "page" : undefined}
          >
            Projekte
          </a>
          <a
            href="#techstack"
            className={`${linkBase} ${active === "techstack" ? linkActive : ""}`}
            aria-current={active === "techstack" ? "page" : undefined}
          >
            Techstack
          </a>
          <a
            href="#skills"
            className={`${linkBase} ${active === "skills" ? linkActive : ""}`}
            aria-current={active === "skills" ? "page" : undefined}
          >
            Skills
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {typeof toggleTheme === "function" && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Theme umschalten, aktuell ${theme}`}
              className="rounded-lg p-2 text-gray-300 hover:text-white hover:bg-white/10
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
