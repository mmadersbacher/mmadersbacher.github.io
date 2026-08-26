// Daten für /lunaric bzw. /en/lunaric.
//
// Bewusst nur Links, keine Plattform-Kennzahlen: Reports, Punkte, Ränge und
// Impact-Werte ändern sich laufend und wären hier immer veraltet. Wer sie sehen
// will, klickt auf das Profil. Nicht wieder einbauen.

export const LUNARIC = {
  github: "https://github.com/11lunaric11",
  githubHandle: "11lunaric11",
  hackerone: "https://hackerone.com/lunaric11",
  hackeroneHandle: "lunaric11",
  yeswehack: "https://yeswehack.com/hunters/lunaric",
  yeswehackHandle: "lunaric",
  site: "https://lunaric.dev",
  tryhackme: "https://tryhackme.com/p/lunaricdev11",
};

export type Repo = {
  name: string;
  lang: string;
  url: string;
  /** Beschreibung je Sprache. */
  de: string;
  en: string;
};

/** Eigene Repos, Beschreibungen sinngemäß aus dem jeweiligen README. */
export const repos: Repo[] = [
  {
    name: "idor-hunter",
    lang: "Python",
    url: "https://github.com/11lunaric11/idor-hunter",
    de: "Automatisierte IDOR-Suche: schickt dieselbe Anfrage mit zwei Identitäten und vergleicht die Antworten. Findet horizontale Rechteausweitung, ungeschützte Endpunkte und Stellen, an denen man schreiben darf, was man nicht lesen darf.",
    en: "Automated IDOR enumeration: replays the same request as two identities and diffs the responses. Catches horizontal privilege escalation, unauthenticated access leaks and write-without-read seams.",
  },
  {
    name: "securitychecker",
    lang: "Go",
    url: "https://github.com/11lunaric11/securitychecker",
    de: "Recon über viele Ziele auf einmal: robots.txt, security.txt nach RFC 9116 und /.well-known/. CLI und Web-UI in einer einzigen statischen Go-Binary.",
    en: "Recon across many targets at once: robots.txt, RFC 9116 security.txt and /.well-known/. CLI plus web UI in a single static Go binary.",
  },
  {
    name: "lunaric.dev",
    lang: "Rust · WASM",
    url: "https://github.com/11lunaric11/lunaric.dev",
    de: "Die eigene Seite — von Hand in Rust geschrieben, nach WebAssembly kompiliert und von Cloudflares Edge ausgeliefert. Kein Framework, kein Generator.",
    en: "My own site — hand-written in Rust, compiled to WebAssembly and served from Cloudflare's edge. No framework, no generator.",
  },
];
