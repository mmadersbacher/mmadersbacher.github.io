import type { ReactNode } from "react";
import { Fragment } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import CPUFlowAnimation from "./CPUFlowAnimation";

import imgIoTShade from "../assets/iotshade_card.svg";
import imgNetRecon from "../assets/netreconultra_card.svg";
import imgHashCracker from "../assets/hashcracker_card.svg";

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
  badges: string[];
  features: string[];
  status?: string;
};

const projects: Project[] = [
  {
    title: "IoTShade",
    description:
      "Rust-Tool zur IoT-Geräteerkennung: aktive + passive Scans, OUI-Vendor-Lookup, Service-Scan und Fingerprinting mit Heuristiken.",
    image: imgIoTShade,
    link: "https://github.com/mmadersbacher/IoTShade",
    badges: ["Rust", "Networking", "Fingerprinting", "CLI", "JSON"],
    status: "Portfolio · MVP",
    features: [
      "Multi-Scan: ARP, Ping, mDNS, SSDP, NetBIOS",
      "Service-Scan + Banner (SNMP, Telnet, HTTP)",
      "OUI-Datenbank für Vendor-Lookup",
      "IoT-Fingerprinting mit Scoring & Confidence",
      "Geplant: RTSP/MQTT/Chromecast/SMB + ONVIF-Probes",
      "Geplant: JSON-/HTML-Reports mit Diagrammen",
    ],
  },
  {
    title: "NetReconUltra",
    description:
      "Lernprojekt: Netzwerk-Scanner mit parallelisiertem Scan, einfacher Topologie-Vorschau und JSON-Ausgabe.",
    image: imgNetRecon,
    link: "https://github.com/mmadersbacher/NetReconUltra",
    badges: ["Go", "React", "Networking", "JSON", "D3.js"],
    status: "Lernprojekt · v0.3",
    features: [
      "ARP/Ping/Port-Discovery (Basis)",
      "Port-Scan parallelisiert (erste Version)",
      "Banner-Erkennung (einfach)",
      "OS-Hinweise via TTL (Heuristik)",
      "Topologie-Vorschau (D3.js, PoC)",
      "Export als JSON-Report",
    ],
  },
  {
    title: "Python Hash Cracker 1.0",
    description:
      "Kleines CLI-Tool zum Ausprobieren von Hash-Basics (Brute-Force & Dictionary) – für Lernzwecke.",
    image: imgHashCracker,
    link: "https://github.com/mmadersbacher/python-hashcracker-1.0",
    badges: ["Python", "CLI", "Security", "SHA/MD5"],
    status: "Training",
    features: [
      "MD5, SHA1, SHA256, SHA512 (Implementierung getestet)",
      "Brute-Force & Dictionary-Modus",
      "Fortschrittsausgabe in der CLI",
      "Wortlisten/Charset konfigurierbar",
      "Kein Ersatz für Hashcat – Demo/Training",
    ],
  },
];

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const KEYWORDS = [
  "ARP", "Ping", "Port", "OS-Hinweise", "TTL", "D3.js",
  "MD5", "SHA1", "SHA256", "SHA512", "CLI", "Brute-Force",
  "Dictionary", "JSON", "React", "Go", "Rust", "Security",
  "Topologie", "mDNS", "SSDP", "SNMP", "Telnet", "NetBIOS",
  "RTSP", "MQTT", "SMB", "ONVIF", "Vendor", "OUI",
  "Fingerprinting", "Confidence",
];

const KEYWORD_REGEX = new RegExp(
  `\\b(${KEYWORDS.map(escapeRegExp).join("|")})\\b`,
  "gi"
);

function highlightKeywords(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = KEYWORD_REGEX.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <span key={k++} className="font-semibold text-cyan-300">
        {m[0]}
      </span>
    );
    last = KEYWORD_REGEX.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}

const ExternalArrow = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#38bdf8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="inline-block opacity-70"
  >
    <path d="M16 8l6 6m0 0l-6 6m6-6H2" />
  </svg>
);

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// === Animation Settings ===
const EASE = [0.16, 1, 0.3, 1] as const;
const STAGGER = 0.22;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: STAGGER },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function Projects() {
  return (
    <section className="relative max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 mt-12 md:mt-16">
      <LazyMotion features={domAnimation}>
        {/* Heading merkbar einfaden */}
        <m.h2
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-3xl md:text-4xl font-extrabold mb-10 tracking-tight
                     bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400
                     bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]"
        >
          Projekte
        </m.h2>

        {/* Grid mit Stagger beim Scroll */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {projects.map((p) => {
            const headingId = `${slug(p.title)}-heading`;
            const descId = `${slug(p.title)}-desc`;

            return (
              <m.article
                key={p.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                aria-labelledby={headingId}
                aria-describedby={descId}
                className="relative group rounded-2xl border border-[#283249] bg-[#181d29]/90 overflow-hidden
                           shadow-lg transition-transform
                           hover:-translate-y-1 hover:scale-[1.02]"
                style={{ minHeight: 420 }}
              >
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} auf GitHub öffnen`}
                  className="absolute inset-0 z-10"
                  tabIndex={-1}
                />

                {/* Projektbild */}
                <div className="flex items-center justify-center w-full h-56 bg-[#0b1220] border-b border-[#232b41]/60 rounded-t-2xl overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.title} – Vorschaubild`}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.06]"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>

                <div className="p-6">
                  <h3
                    id={headingId}
                    className="text-xl font-extrabold text-white mb-2 flex items-center gap-2 tracking-tight"
                  >
                    <span>{p.title}</span>
                    <span
                      className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full
                                 bg-amber-400/10 text-amber-300 text-[10px] font-semibold
                                 border border-amber-300/20 select-none"
                    >
                      {p.status ?? "WIP"}
                    </span>
                    <ExternalArrow />
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3 mt-1">
                    {p.badges.map((b) => (
                      <span
                        key={b}
                        className="bg-cyan-400/12 text-cyan-200 px-2 py-0.5 rounded-full text-[11px]
                                   font-semibold tracking-wide border border-cyan-300/25
                                   transition hover:scale-105 hover:bg-cyan-400/15"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <p id={descId} className="text-blue-100 text-[15px] mb-3 opacity-90 leading-snug">
                    {p.description}
                  </p>

                  <ul className="text-xs text-blue-400 pl-4 list-disc leading-snug mb-5">
                    {p.features.map((f, i) => (
                      <li key={i}>{highlightKeywords(f)}</li>
                    ))}
                  </ul>

                  <div className="pt-1">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 inline-block px-5 py-2 rounded-lg
                                 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm
                                 shadow-lg transition-transform duration-300
                                 hover:scale-105 hover:shadow-[0_0_16px_rgba(56,189,248,0.5)]
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                    >
                      Zum GitHub-Projekt
                    </a>
                  </div>
                </div>
              </m.article>
            );
          })}
        </m.div>
      </LazyMotion>

      <CPUFlowAnimation />
    </section>
  );
}
