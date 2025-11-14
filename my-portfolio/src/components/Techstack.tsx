import pyIcon from "../assets/python.svg";
import goIcon from "../assets/go.svg";
import reactIcon from "../assets/react.svg";
import tailwindIcon from "../assets/tailwindcss.svg";
import kaliIcon from "../assets/kalilinux.svg";
import wiresharkIcon from "../assets/wireshark.svg";
import gitIcon from "../assets/git.svg";
import mdIcon from "../assets/markdown.svg";

import { LazyMotion, domAnimation, m } from "framer-motion";

type TechItem = {
  name: string;
  icon: string;
  projects: string[];
  experience: string;
  highlight: string;
};
type TechCategory = { area: string; items: TechItem[] };

const techStack: TechCategory[] = [
  {
    area: "Languages",
    items: [
      {
        name: "Python",
        icon: pyIcon,
        projects: ["NetReconUltra", "Hash Cracker", "kleine CLI-Tools"],
        experience:
          "Übungsprojekte für Security/Netzwerk (Parser, CLI, Reporting).",
        highlight:
          "Backend-Logik für kleine Scanner/Cracker in Lernumgebungen.",
      },
      {
        name: "Go",
        icon: goIcon,
        projects: ["NetReconUltra (Backend)"],
        experience:
          "Paralleles Scanning-Backend als Lernprojekt; einfache REST-Endpoints.",
        highlight: "Netzwerk-Discovery, eigene Parser, wenig Framework-Ballast.",
      },
    ],
  },
  {
    area: "Frameworks & Tools",
    items: [
      {
        name: "React",
        icon: reactIcon,
        projects: ["Portfolio", "NetReconUltra Web-Frontend"],
        experience:
          "Eigenes Dashboard/Visualisierungen; State-Handling, Komponenten.",
        highlight: "Darstellung von Scan-Daten/Reports.",
      },
      {
        name: "Tailwind CSS",
        icon: tailwindIcon,
        projects: ["Portfolio", "NetReconUltra"],
        experience: "Utility-First, responsive, konsistentes Design.",
        highlight:
          "Eigene CI für Portfolio/Tools, kleine dynamische Anpassungen.",
      },
    ],
  },
  {
    area: "Security & Networking",
    items: [
      {
        name: "Kali Linux",
        icon: kaliIcon,
        projects: ["Pentest-Übungen", "eigene Netzwerk-Tools", "Hash Cracker"],
        experience: "Tests in Labornetzen, eigenes Scripting, Standard-Werkzeuge.",
        highlight: "SQL-Tests, Brute-Force, ARP/DNS-Sniffer (Testumgebungen).",
      },
      {
        name: "Wireshark",
        icon: wiresharkIcon,
        projects: ["Traffic-Analyse", "Debugging von Tools"],
        experience:
          "Protokoll-Checks, Validierung eigener Tools, Fehlersuche.",
        highlight: "Live-Sniffing, Mitschnitte, kleine Exploit-Tests.",
      },
    ],
  },
  {
    area: "Workflow & Documentation",
    items: [
      {
        name: "Git",
        icon: gitIcon,
        projects: ["Alle Projekte"],
        experience: "Saubere Commits, Branches, Issues/PRs nach Bedarf.",
        highlight: "Nachvollziehbarkeit und Wartung.",
      },
      {
        name: "Markdown",
        icon: mdIcon,
        projects: ["Dokumentation", "GitHub-READMEs"],
        experience: "Kurz, strukturiert, projektbezogen.",
        highlight: "README/Doku pragmatisch pro Projekt.",
      },
    ],
  },
];

// === Animations (andere Art als bei Projects) ===
const EASE = [0.16, 1, 0.3, 1] as const;

// Kategorie-Container: alternierendes Slide-In (links/rechts)
const categoryVariants = (fromLeft: boolean) => ({
  hidden: { opacity: 0, x: fromLeft ? -48 : 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
});

// Items in einer Kategorie: kurzer Pop-In + Stagger
const itemsContainer = {
  hidden: { opacity: 1 }, // sichtbarer Container, aber Kinder versteckt
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

export default function Techstack() {
  return (
    <section className="max-w-6xl mx-auto pb-16 px-4 sm:px-8 lg:px-12 mt-12 md:mt-16">
      <LazyMotion features={domAnimation}>
        <m.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight
                     bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400
                     bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]"
        >
          Techstack
        </m.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {techStack.map((cat, i) => {
            const fromLeft = i % 2 === 0;

            return (
              <m.section
                key={cat.area}
                aria-labelledby={`tech-${i}-heading`}
                variants={categoryVariants(fromLeft)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                className="bg-[#1a2031]/95 rounded-2xl p-6 border border-[#263151] shadow-xl"
              >
                <m.h3
                  id={`tech-${i}-heading`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="text-lg text-cyan-300 font-bold mb-4 tracking-tight flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                  {cat.area}
                </m.h3>

                <m.ul
                  variants={itemsContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  {cat.items.map((item) => (
                    <m.li
                      key={item.name}
                      variants={itemVariant}
                      whileHover={{ y: -3, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="flex flex-col items-center px-5 py-4 rounded-xl bg-[#232b41]
                                 shadow border border-[#273044]
                                 transition-transform hover:shadow-cyan-700/30"
                      style={{ minWidth: "160px", maxWidth: "220px" }}
                    >
                      <img
                        src={item.icon}
                        alt={`${item.name} Icon`}
                        className="w-10 h-10 mb-2 drop-shadow-lg"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                      <span className="text-white font-bold text-base mt-1 mb-1 tracking-tight text-center">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-blue-300 mb-1 text-center font-mono">
                        {item.projects.join(", ")}
                      </span>
                      <span className="text-[10px] text-gray-300 mb-1 text-center leading-tight">
                        {item.experience}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-semibold text-center leading-tight italic">
                        {item.highlight}
                      </span>
                    </m.li>
                  ))}
                </m.ul>
              </m.section>
            );
          })}
        </div>
      </LazyMotion>
    </section>
  );
}
