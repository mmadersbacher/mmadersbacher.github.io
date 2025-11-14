// src/components/Skills.tsx
import type { ReactNode } from "react";
import {
  Shield,
  Network,
  Bug,
  FileSearch,
  Braces,
  Code2,
  Terminal,
  Dock,
  FileText,
  Server,
  Laptop2,
  BookOpenText,
  ArrowRightCircle,
} from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

type Skill = {
  name: string;
  detail: string;
  impact: string;
  icon: ReactNode;
};
type SkillCategory = {
  area: string;
  icon: ReactNode;
  headline: string;
  skills: Skill[];
};

const skills: SkillCategory[] = [
  {
    area: "Offensive Security & Netzwerke",
    icon: <Shield className="text-cyan-400" size={24} />,
    headline:
      "Lern- und Übungsprojekte rund um Netzwerke/Security. Schwerpunkt: Recon, Analyse, kleine Tools.",
    skills: [
      {
        name: "Netzwerkscan & Recon",
        detail:
          "Discovery, Portscan, Banner, OS-Hinweise via TTL; eigener Scanner (NetReconUltra).",
        impact: "Parallele Scans, einfache Topologie, eigene Heuristiken (Lernprojekt).",
        icon: <Network size={22} />,
      },
      {
        name: "Penetration Testing",
        detail:
          "SQL-Injection-Tests, Brute-Force, Hash-Cracking, grundlegende Schwachstellen-Analysen.",
        impact: "Durchgeführt und dokumentiert in Testumgebungen/Labornetzen.",
        icon: <Bug size={22} />,
      },
      {
        name: "Traffic-/Protokoll-Analyse",
        detail:
          "Wireshark, eigene DNS-/ARP-Sniffer, Protokoll-Debugging für eigene Tools.",
        impact: "Sniffer und Analysen zur Fehlersuche und Optimierung.",
        icon: <FileSearch size={22} />,
      },
    ],
  },
  {
    area: "Software Engineering",
    icon: <Braces className="text-cyan-400" size={24} />,
    headline:
      "Kleine Backends, Frontends und CLI-Tools – eigenständig aufgebaut, laufend verbessert.",
    skills: [
      {
        name: "Python",
        detail: "CLI-Tools, einfache Automation, Parser, Reporting.",
        impact: "Eingesetzt in kleinen Tools und Übungsprojekten.",
        icon: <Braces size={22} />,
      },
      {
        name: "Go (Golang)",
        detail: "Basis-Backend für Scans, einfache REST-Endpunkte, Fehlerhandling.",
        impact: "Paralleles Scanning im Lernprojekt umgesetzt.",
        icon: <Code2 size={22} />,
      },
      {
        name: "React & TypeScript",
        detail: "Kleine Dashboards und Visualisierungen, Portfolio-Frontend.",
        impact: "Eigene Komponenten zur Darstellung von Netzwerkdaten.",
        icon: <Code2 size={22} />,
      },
      {
        name: "Bash",
        detail: "Skripte für Setup, Checks und Reporting.",
        impact: "Einfaches Automatisieren in Linux-Umgebungen.",
        icon: <Terminal size={22} />,
      },
      {
        name: "Docker",
        detail: "Container für Test- und Dev-Umgebungen.",
        impact: "Kleine Services/Tools als Container bereitgestellt.",
        icon: <Dock size={22} />,
      },
    ],
  },
  {
    area: "System- & Netzwerk-Administration",
    icon: <Server className="text-cyan-400" size={24} />,
    headline: "Basis-Setup und Wartung in Testumgebungen, primär Linux.",
    skills: [
      {
        name: "Linux (Kali, Ubuntu)",
        detail: "Netzwerk-Setups, Security-Tests, CLI-Arbeit, Troubleshooting.",
        impact: "Eigene Testumgebung aufgesetzt und betreut.",
        icon: <Laptop2 size={22} />,
      },
      {
        name: "Windows",
        detail: "Client/Server-Basics, alltägliche Admin-Aufgaben.",
        impact: "Einsatz in kleinen Testumgebungen.",
        icon: <Laptop2 size={22} />,
      },
    ],
  },
  {
    area: "Dokumentation & Reporting",
    icon: <BookOpenText className="text-cyan-400" size={24} />,
    headline: "README-basierte Doku und kurze Reports für die eigenen Projekte.",
    skills: [
      {
        name: "Projekt-Dokumentation",
        detail: "Strukturierte READMEs, kurze technische Notizen, Issues.",
        impact: "Jedes größere Projekt mit Basis-Doku/Nachvollziehbarkeit.",
        icon: <FileText size={22} />,
      },
      {
        name: "Code-Kommentierung",
        detail: "Knapp, zweckmäßig, direkt im Code.",
        impact: "Kommentare für spätere Wartung – ohne Ausschmückung.",
        icon: <FileText size={22} />,
      },
    ],
  },
];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// — Animations (robust, merkbar) —
const EASE = [0.16, 1, 0.3, 1] as const;

const categoryVariants = (fromLeft: boolean) => ({
  hidden: { opacity: 0, x: fromLeft ? -48 : 48, y: 8, scale: 0.995 },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE },
  },
});

const listVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
};

const iconVariants = {
  hidden: { rotate: -6, scale: 0.9, opacity: 0.85 },
  show: { rotate: 0, scale: 1, opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

function SkillCard({ s }: { s: Skill }) {
  return (
    <m.li
      variants={cardVariants}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex items-start gap-4 bg-[#232b41] px-4 py-3 rounded-xl
                 border border-[#273044] shadow
                 transition hover:shadow-cyan-700/20 hover:border-cyan-500"
    >
      <m.span variants={iconVariants} className="mt-1 shrink-0 text-cyan-300" aria-hidden="true">
        {s.icon}
      </m.span>
      <div className="flex flex-col flex-1">
        <h4 className="text-white font-semibold text-base leading-tight mb-0.5">{s.name}</h4>
        <p className="text-[11px] text-blue-200/80 leading-snug">{s.detail}</p>
        <p className="text-[11px] text-cyan-400 font-semibold leading-snug">{s.impact}</p>
      </div>
    </m.li>
  );
}

function SkillCategorySection({ cat, index }: { cat: SkillCategory; index: number }) {
  const id = slug(cat.area);
  const fromLeft = index % 2 === 0;
  return (
    <m.section
      aria-labelledby={`${id}-heading`}
      variants={categoryVariants(fromLeft)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="rounded-2xl p-6 border border-[#263151] bg-[#1a2031]/95 shadow-xl
                 focus-within:ring-2 focus-within:ring-cyan-400/30"
    >
      <header className="flex items-center gap-2 mb-2">
        <m.span variants={iconVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {cat.icon}
        </m.span>
        <h3 id={`${id}-heading`} className="text-lg text-cyan-300 font-bold tracking-tight">
          {cat.area}
        </h3>
      </header>
      <p className="text-xs text-gray-300 mb-4">{cat.headline}</p>

      <m.ul
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-3"
      >
        {cat.skills.map((s) => (
          <SkillCard key={s.name} s={s} />
        ))}
      </m.ul>
    </m.section>
  );
}

export default function Skills() {
  return (
    <section className="max-w-6xl mx-auto pb-16 px-4 sm:px-8 lg:px-12 mt-12 md:mt-16">
      <LazyMotion features={domAnimation}>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight
                     bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400
                     bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]"
        >
          Skills
        </m.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {skills.map((cat, i) => (
            <SkillCategorySection key={cat.area} cat={cat} index={i} />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-8 text-gray-400 text-xs flex items-center gap-2"
        >
          <ArrowRightCircle size={18} className="text-cyan-400" />
          <span>
            Git, Markdown, CI/CD und GitHub-Workflows sind Standard je nach Bedarf und werden
            nicht extra aufgeführt.
          </span>
        </m.div>
      </LazyMotion>
    </section>
  );
}
