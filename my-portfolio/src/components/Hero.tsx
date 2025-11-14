// src/components/Hero.tsx
import { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Hero() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const EASE = [0.16, 1, 0.3, 1] as const;

  const leftCol = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const rightCard = {
    hidden: { opacity: 0, y: 22, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
  };

  const tilesContainer = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const tile = {
    hidden: { opacity: 0, y: 10, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE } },
  };

  const chip = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
  };

  return (
    <section
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      style={
        {
          "--spot-x": `${pos.x}px`,
          "--spot-y": `${pos.y}px`,
        } as React.CSSProperties
      }
      className="relative overflow-hidden bg-[#0A0F1A] text-white"
      aria-label="Intro"
    >
      {/* Spotlight-Hintergrund */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(520px 340px at var(--spot-x) var(--spot-y),
              rgba(34,211,238,0.12), transparent 60%),
            radial-gradient(900px 600px at 15% -10%,
              rgba(59,130,246,0.08), transparent 60%),
            radial-gradient(900px 600px at 85% -10%,
              rgba(34,211,238,0.07), transparent 60%)
          `,
          maskImage:
            "linear-gradient(to bottom, black 0%, black 78%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-16 md:py-24">
        <LazyMotion features={domAnimation}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start [&>*]:min-w-0">
            {/* Left: Text + CTAs */}
            <m.div
              variants={leftCol}
              initial="hidden"
              animate="show"
              className="text-left"
            >
              <m.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.05 }}
                className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-cyan-300/80"
              >
                Security Engineering
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping-slow" />
                Network Recon
              </m.span>

              <m.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                style={{ textWrap: "balance" } as React.CSSProperties}
                className="mt-2 text-5xl md:text-[56px] font-extrabold leading-[1.04] tracking-tight"
              >
                Mario Madersbacher
              </m.h1>

              <m.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
                className="mt-4 text-[1.05rem] leading-relaxed text-gray-300 break-words hyphens-auto"
              >
                Fokussierte Tools rund um Netzwerke &amp; Security – Scanner, Parser
                und kleine Dashboards (Go, Rust, Python, React). Ziel: klare,
                reproduzierbare Ergebnisse mit sauberer Doku. Open-Source.
              </m.p>

              {/* CTAs */}
              <m.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.26 }}
                className="mt-7 flex flex-wrap gap-3"
              >
                <a
                  href="https://github.com/mmadersbacher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold
                             bg-white text-[#0A0F1A] hover:bg-zinc-100 transition-colors
                             shadow-[0_10px_30px_-12px_rgba(255,255,255,0.35)]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5a11.5 11.5 0 00-3.64 22.42c.58.11.8-.25.8-.56v-2.1c-3.26.71-3.95-1.4-3.95-1.4-.53-1.33-1.3-1.69-1.3-1.69-1.06-.74.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.04 1.78 2.74 1.27 3.41.97.11-.76.4-1.27.72-1.56-2.6-.29-5.33-1.3-5.33-5.8 0-1.28.46-2.32 1.21-3.14-.12-.29-.53-1.46.12-3.05 0 0 1-.32 3.27 1.2a11.3 11.3 0 015.96 0c2.26-1.53 3.26-1.2 3.26-1.2.66 1.59.25 2.76.13 3.05.76.82 1.2 1.86 1.2 3.14 0 4.52-2.73 5.5-5.34 5.79.41.35.77 1.04.77 2.11v3.12c0 .31.21.68.81.56A11.5 11.5 0 0012 .5z"/>
                  </svg>
                  Mein GitHub
                </a>

                <a
                  href="#projekte"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold
                             border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40
                             transition-colors"
                >
                  Projekte ansehen
                </a>
              </m.div>

              {/* Tech-Chips mit Stagger */}
              <m.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                initial="hidden"
                animate="show"
                className="mt-5 flex flex-wrap gap-2"
              >
                {["Go", "Rust", "Python", "React", "Linux/Netzwerke"].map((t) => (
                  <m.span
                    key={t}
                    variants={chip}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/80 leading-[1.2]"
                  >
                    {t}
                  </m.span>
                ))}
              </m.div>
            </m.div>

            {/* Right: Value-Card */}
            <m.div
              variants={rightCard}
              initial="hidden"
              animate="show"
              className="relative"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-xl min-w-0">
                <p className="text-sm font-semibold text-cyan-300">Wertversprechen</p>

                <h2
                  style={{ textWrap: "balance" } as React.CSSProperties}
                  className="mt-1 text-[22px] font-bold leading-snug break-words hyphens-auto"
                >
                  Saubere Tools. Messbare Ergebnisse.
                </h2>

                <p className="mt-2 text-sm text-white/80 break-words hyphens-auto">
                  Reproduzierbare Scans, klare Reports, nachvollziehbare Doku.
                </p>

                {/* Kacheln mit Pop-In Stagger */}
                <m.div
                  variants={tilesContainer}
                  initial="hidden"
                  animate="show"
                  className="mt-5 grid grid-cols-3 gap-3"
                >
                  {[
                    { k: "Code-Qualität", v: "Clean & Docs" },
                    { k: "Netzwerk", v: "Recon/Scanner" },
                    { k: "Frontend", v: "Dashboards" },
                  ].map((it) => (
                    <m.div
                      key={it.v}
                      variants={tile}
                      className="rounded-xl border border-white/10 bg-[#0D1421] p-4 min-w-0"
                    >
                      <p className="text-[11px] text-white/70 break-words hyphens-auto">{it.k}</p>
                      <p className="mt-1 text-lg font-bold leading-tight break-words hyphens-auto">
                        {it.v}
                      </p>
                    </m.div>
                  ))}
                </m.div>

                <ul className="mt-5 space-y-1 text-sm text-white/80">
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Verfügbar für Praktikum / Werkstudent.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    Fokus: Ergebnis zuerst, Features später.
                  </li>
                </ul>
              </div>

              {/* Accent-Ring */}
              <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 blur-2xl opacity-25" />
            </m.div>
          </div>
        </LazyMotion>
      </div>

      <div className="h-px w-full bg-white/10" />
    </section>
  );
}
