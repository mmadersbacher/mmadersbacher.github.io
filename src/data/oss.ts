// Upstream-Beiträge und eigene Tools für /mario.
// Status nach dem Merge hier umstellen — sonst stimmt die Seite nicht mehr.

export type Contribution = {
  project: string;
  repo: string;
  what: string;
  url: string;
  state: "merged" | "open";
};

export const contributions: Contribution[] = [
  {
    project: "Scapy",
    repo: "secdev/scapy",
    what: "NBNS-Name-Query-Antworten gaben nur die erste Adresse zurück — jetzt werden alle Einträge geparst.",
    url: "https://github.com/secdev/scapy/pull/5090",
    state: "merged",
  },
  {
    project: "Impacket",
    repo: "fortra/impacket",
    what: "BootpDecoder ist bei reinen BOOTP-Paketen ohne DHCP-Optionen abgestürzt (Issue #1900).",
    url: "https://github.com/fortra/impacket/pull/2263",
    state: "open",
  },
  {
    project: "Sigma",
    repo: "SigmaHQ/sigma",
    what: "Detection-Rule: Kerberos-Pre-Authentication auf einem Konto deaktiviert — die Voraussetzung für AS-REP-Roasting.",
    url: "https://github.com/SigmaHQ/sigma/pull/6238",
    state: "open",
  },
  {
    project: "Nuclei Templates",
    repo: "projectdiscovery/nuclei-templates",
    what: "Template für CVE-2020-10204 (Nexus Repository Manager 3, RCE), gegen eine verwundbare Instanz verifiziert.",
    url: "https://github.com/projectdiscovery/nuclei-templates/pull/16902",
    state: "open",
  },
  {
    project: "LOLBAS",
    repo: "LOLBAS-Project/LOLBAS",
    what: "Eintrag für Vssadmin.exe — Schattenkopien löschen (T1490), stand im Backlog des Projekts.",
    url: "https://github.com/LOLBAS-Project/LOLBAS/pull/520",
    state: "open",
  },
];

export type Project = {
  name: string;
  lang: string;
  what: string;
  url: string;
};

export const projects: Project[] = [
  {
    name: "AegisNet",
    lang: "Rust · React",
    what: "Scanner fürs lokale Netz mit leichter Deep-Packet-Inspection. Axum-Backend, Frontend in TypeScript.",
    url: "https://github.com/mmadersbacher/AegisNet",
  },
  {
    name: "IoTShade",
    lang: "Rust",
    what: "Netz- und IoT-Discovery: passives Sniffing plus aktive ARP-, mDNS-, SSDP-, DHCP- und SNMP-Scans, OUI-Lookup, Geräte-Fingerprinting.",
    url: "https://github.com/mmadersbacher/IoTShade",
  },
  {
    name: "API_Hunter",
    lang: "Rust",
    what: "API-Recon für Bug-Bounty-Arbeit: Endpoint-Discovery, JS-Analyse, Checks auf Auth, GraphQL und Mass Assignment.",
    url: "https://github.com/mmadersbacher/API_Hunter",
  },
  {
    name: "NetReconUltra",
    lang: "Go · React",
    what: "Schneller Netzwerkscanner mit Dashboard: Discovery, Portscan, Service-Erkennung.",
    url: "https://github.com/mmadersbacher/NetReconUltra",
  },
];
