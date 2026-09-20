// Upstream-Beiträge und eigene Tools für /mario bzw. /en/mario.
// Status nach dem Merge hier umstellen — sonst stimmt die Seite nicht mehr.

// Zugewiesene CVEs für /mario. Nur echte, veröffentlichte Einträge — Advisory verlinkt.
export type CVE = {
  id: string;
  /** Betroffenes Produkt bzw. Paket. */
  product: string;
  /** Optional: Schweregrad und CVSS, falls die Advisory einen nennt. */
  severity?: "critical" | "high" | "medium" | "low";
  cvss?: string;
  de: string;
  en: string;
  /** Advisory bzw. Datenbank-Eintrag. */
  url: string;
  /** Kurzreferenz für die Zeile, z. B. GHSA-ID oder VulDB-Nummer. */
  ref: string;
};

export const cves: CVE[] = [
  {
    id: "CVE-2026-90776",
    product: "nodemailer",
    severity: "high",
    cvss: "7.5",
    de: "Quadratischer Aufwand im addressparser (9.1.0–10.0.4): manipulierte Adress-Kommentare legen den Node.js-Event-Loop lahm. Behoben in 10.0.5.",
    en: "Quadratic blow-up in nodemailer's addressparser (9.1.0–10.0.4): crafted address comments stall the Node.js event loop. Fixed in 10.0.5.",
    url: "https://github.com/nodemailer/nodemailer/security/advisories/GHSA-prgh-xp8r-p3m5",
    ref: "GHSA-prgh-xp8r-p3m5",
  },
  {
    id: "CVE-2026-90492",
    product: "webgjc/web_robot 2.8.0",
    de: "OS-Command-Injection in webgjc/web_robot 2.8.0.",
    en: "OS command injection in webgjc/web_robot 2.8.0.",
    url: "https://vuldb.com/?id.403080",
    ref: "VulDB-403080",
  },
];

export type Contribution = {
  project: string;
  repo: string;
  /** Beschreibung je Sprache. */
  de: string;
  en: string;
  url: string;
  state: "merged" | "open";
};

export const contributions: Contribution[] = [
  {
    project: "Scapy",
    repo: "secdev/scapy",
    de: "NBNS-Name-Query-Antworten gaben nur die erste Adresse zurück — jetzt werden alle Einträge geparst.",
    en: "NBNS name query responses only returned the first address — all records are parsed now.",
    url: "https://github.com/secdev/scapy/pull/5090",
    state: "merged",
  },
  {
    project: "Volatility 3",
    repo: "volatilityfoundation/volatility3",
    de: "Das capabilities-Plugin war auf Linux-Kerneln vor 6.3 kaputt — Ursache gefunden und behoben.",
    en: "The capabilities plugin was broken on Linux kernels before 6.3 — root-caused and fixed.",
    url: "https://github.com/volatilityfoundation/volatility3/pull/2017",
    state: "merged",
  },
  {
    project: "Volatility 3",
    repo: "volatilityfoundation/volatility3",
    de: "Ein Architektur-Tippfehler blockierte das scheduled_tasks-Plugin auf 32-Bit-Images — korrigiert.",
    en: "An architecture typo blocked the scheduled_tasks plugin on 32-bit images — fixed.",
    url: "https://github.com/volatilityfoundation/volatility3/pull/2016",
    state: "merged",
  },
  {
    project: "Impacket",
    repo: "fortra/impacket",
    de: "BootpDecoder ist bei reinen BOOTP-Paketen ohne DHCP-Optionen abgestürzt (Issue #1900).",
    en: "BootpDecoder crashed on plain BOOTP packets that carry no DHCP options (issue #1900).",
    url: "https://github.com/fortra/impacket/pull/2263",
    state: "merged",
  },
  {
    project: "Sigma",
    repo: "SigmaHQ/sigma",
    de: "Detection-Rule: Kerberos-Pre-Authentication auf einem Konto deaktiviert — die Voraussetzung für AS-REP-Roasting.",
    en: "Detection rule: Kerberos pre-authentication disabled on an account — the prerequisite for AS-REP roasting.",
    url: "https://github.com/SigmaHQ/sigma/pull/6238",
    state: "open",
  },
  {
    project: "Nuclei Templates",
    repo: "projectdiscovery/nuclei-templates",
    de: "Template für CVE-2020-10204 (Nexus Repository Manager 3, RCE), gegen eine verwundbare Instanz verifiziert.",
    en: "Template for CVE-2020-10204 (Nexus Repository Manager 3, RCE), verified against a vulnerable instance.",
    url: "https://github.com/projectdiscovery/nuclei-templates/pull/16902",
    state: "merged",
  },
  {
    project: "LOLBAS",
    repo: "LOLBAS-Project/LOLBAS",
    de: "Eintrag für Vssadmin.exe — Schattenkopien löschen (T1490), stand im Backlog des Projekts.",
    en: "Entry for Vssadmin.exe — deleting shadow copies (T1490), which had been sitting in the project's backlog.",
    url: "https://github.com/LOLBAS-Project/LOLBAS/pull/520",
    state: "merged",
  },
];

export type Project = {
  name: string;
  lang: string;
  de: string;
  en: string;
  url: string;
};

export const projects: Project[] = [
  {
    name: "AegisNet",
    lang: "Rust · React",
    de: "Scanner fürs lokale Netz mit leichter Deep-Packet-Inspection. Axum-Backend, Frontend in TypeScript.",
    en: "Local network scanner with light deep packet inspection. Axum backend, TypeScript front end.",
    url: "https://github.com/mmadersbacher/AegisNet",
  },
  {
    name: "IoTShade",
    lang: "Rust",
    de: "Netz- und IoT-Discovery: passives Sniffing plus aktive ARP-, mDNS-, SSDP-, DHCP- und SNMP-Scans, OUI-Lookup, Geräte-Fingerprinting.",
    en: "Network and IoT discovery: passive sniffing plus active ARP, mDNS, SSDP, DHCP and SNMP scans, OUI lookup, device fingerprinting.",
    url: "https://github.com/mmadersbacher/IoTShade",
  },
  {
    name: "API_Hunter",
    lang: "Rust",
    de: "API-Recon für Bug-Bounty-Arbeit: Endpoint-Discovery, JS-Analyse, Checks auf Auth, GraphQL und Mass Assignment.",
    en: "API recon for bug bounty work: endpoint discovery, JS analysis, checks for auth, GraphQL and mass assignment.",
    url: "https://github.com/mmadersbacher/API_Hunter",
  },
  {
    name: "NetReconUltra",
    lang: "Go · React",
    de: "Schneller Netzwerkscanner mit Dashboard: Discovery, Portscan, Service-Erkennung.",
    en: "Fast network scanner with a dashboard: discovery, port scan, service detection.",
    url: "https://github.com/mmadersbacher/NetReconUltra",
  },
];
