#!/usr/bin/env node
// Renders data.json into index.html. No dependencies.
//
//   node site/build.mjs
//
// Facts live in data.json; layout lives here; look lives in style.css.
// Every string from data.json is HTML-escaped. The only inline markup allowed
// in data is the tiny subset handled by rich(): **emphasis**, `code`, [text](url).

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const data = JSON.parse(readFileSync(join(here, "data.json"), "utf8"));

// ---------- helpers ----------

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Escape, then allow **bold**, `code` and [text](https://url). */
const rich = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<span class="k">$1</span>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/~~(.+?)~~/g, '<span class="rd">$1</span>')
    .replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g, '<a class="lnk" href="$2">$1</a>');

const ordinal = (n) => {
  const t = n % 10, h = n % 100;
  const suf = h >= 11 && h <= 13 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
  return `${n}<sup>${suf}</sup>`;
};

const fmtDate = (iso) => {
  if (!iso) return "";
  if (/^\d{4}$/.test(iso)) return iso;
  if (/^\d{4}-\d{2}$/.test(iso)) {
    return new Date(`${iso}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
  }
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
};

const num = (n) => new Intl.NumberFormat("en-GB").format(n);

const ext = (url, label, cls = "") =>
  `<a${cls ? ` class="${cls}"` : ""} href="${esc(url)}">${label}</a>`;

// ---------- derived facts ----------

const { site, person, copy, cves, contributions, bounty, experience, projects, ctf, certs, education, skills } = data;
const merged = contributions.filter((c) => c.state === "merged");
const open = contributions.filter((c) => c.state === "open");
const repos = [...new Set(contributions.map((c) => c.project))];
const summary = `${cves.length} CVEs and ${merged.length} merged upstream pull requests`;
const mail = `mailto:${person.email}`;
const byDateDesc = (a, b) => (b.date || "").localeCompare(a.date || "");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: "Security Researcher",
  description: site.description,
  url: site.url,
  address: { "@type": "PostalAddress", addressRegion: person.region, addressCountry: person.country },
  sameAs: person.handles.map((h) => h.url),
  knowsAbout: ["Web application security", "Vulnerability research", "Coordinated disclosure", "Network security", "Active Directory", "Detection engineering"],
  hasCredential: certs
    .filter((c) => c.url)
    .map((c) => ({ "@type": "EducationalOccupationalCredential", name: c.name, credentialCategory: "certification", recognizedBy: { "@type": "Organization", name: c.issuer }, url: c.url })),
};

// ---------- sections ----------

const head = () => `<!doctype html>
<!--
   nothing here is hidden from someone who looks. that's kind of the point.
   facts: /data.json · layout: /build.mjs · the console has a thread to pull.
-->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(site.title)}</title>
<meta name="description" content="${esc(site.description)}">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#101011">
<link rel="canonical" href="${esc(site.url)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23111'/%3E%3Crect x='6' y='14' width='20' height='5' fill='%23e9e6df'/%3E%3C/svg%3E">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(person.name)}">
<meta property="og:description" content="${esc(person.headline)}. ${esc(summary)}.">
<meta property="og:url" content="${esc(site.url)}">
<meta property="og:image" content="${esc(site.url)}og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(person.name)}, ${esc(person.headline)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(person.name)}">
<meta name="twitter:description" content="${esc(summary)}.">
<meta name="twitter:image" content="${esc(site.url)}og.png">
<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>
<script>try{if(localStorage.getItem("theme")==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}</script>
<link rel="preload" href="/fonts/MartianMono-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/SplineSansMono-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
`;

const topbar = () => `
<div class="top"><div class="wrap">
  <span class="who">${esc(person.name)}</span>
  <nav class="r" aria-label="Sections">
    <a class="hide" href="#research">Research</a>
    <a class="hide" href="#oss">Open source</a>
    <a class="hide" href="#ctf">CTF</a>
    <a class="hide" href="#contact">Contact</a>
    <a href="/writeups/">Writeups</a>
    <button class="tog" type="button" data-theme-toggle aria-pressed="false">Light mode</button>
  </nav>
</div></div>
`;

const hero = () => `
<header class="hero" id="top"><div class="wrap">
  <p class="kicker">${esc(person.headline)}</p>
  <h1>${esc(person.name).replace(" ", "<br>")}</h1>
  <p class="stmt">${esc(summary)}. ${rich(copy.heroTail)}</p>
  <p class="links" aria-label="Profiles">
    ${person.handles.map((h) => ext(h.url, esc(h.platform))).join("\n    ")}
    ${ext(mail, "Email")}
  </p>
</div></header>
`;

const about = () => `
<section aria-labelledby="about-h"><div class="wrap">
  <h2 id="about-h" class="vh">About</h2>
  <p class="body">${rich(person.intro)}</p>
  <p class="body"><span class="k">${esc(person.principle)}</span></p>
</div></section>
`;

const cveRow = (c) => `
  <article class="row cve">
    <div class="rank">${esc(c.cvss31)}<sup>${esc(c.severity)}</sup></div>
    <div class="ev">
      <div class="name"><code class="id">${esc(c.id)}</code> <span class="prod">${esc(c.product)} ${esc(c.range)}</span></div>
      <p class="sub">${rich(c.mechanism)}</p>
      <p class="sub">${rich(c.status)} ${esc(c.credit)}</p>
      <p class="proof">${c.links.map((l) => ext(l.url, esc(l.label), "lnk")).join("\n")}</p>
    </div>
    <div class="field">
      <span class="nw"><b>CVSS ${esc(c.cvss31)}</b> v3.1 · <b>${esc(c.cvss40)}</b> v4.0</span><br>
      ${esc(c.cwe)} · ${esc(c.cweName)}<br>
      <span class="nw">${esc(c.assigner)} · ${fmtDate(c.published)}</span>
    </div>
  </article>`;

const research = () => `
<section id="research" aria-labelledby="research-h"><div class="wrap">
  <h2 id="research-h">Research &amp; disclosures</h2>
  <p class="body" style="margin-bottom:26px">${rich(copy.researchLead)}</p>
  <div class="log">${cves.map(cveRow).join("")}
  </div>
</div></section>
`;

const prRow = (c) => `
      <a href="${esc(c.url)}">
        <span class="p">${esc(c.project)} <span class="rp">#${c.number}</span></span>
        <span class="st ${c.state === "merged" ? "m" : "o"}"><span class="b"></span>${c.state}${c.state === "merged" ? ` · ${fmtDate(c.date)}` : ""}</span>
        <span class="d">${rich(c.what)}</span>
      </a>`;

const oss = () => `
<section id="oss" aria-labelledby="oss-h"><div class="wrap">
  <h2 id="oss-h">Open source</h2>
  <p class="body" style="margin-bottom:24px">${rich(copy.ossLead)} <span class="k">${merged.length} merged</span>, ${open.length} open, ${repos.length} projects. ${rich(copy.ossTail)}</p>
  <div class="up">${[...contributions].sort(byDateDesc).map(prRow).join("")}
  </div>
</div></section>
`;

const bountyRow = (b) => `
      <div class="brow">
        <span class="bl">${esc(b.severity)}${b.cvss ? ` <b>${esc(b.cvss)}</b>` : ""}${b.vector ? ` <span class="rp">${esc(b.vector)}</span>` : ""}<br><span class="bo">${esc(b.outcome)}</span></span>
        <span class="bw">${rich(b.what)}</span>
      </div>`;

const bountySec = () => `
<section id="bounty" aria-labelledby="bounty-h"><div class="wrap">
  <h2 id="bounty-h">Bug bounty</h2>
  <p class="body" style="margin-bottom:22px">${rich(copy.bountyLead)} ${ext(person.handles.find((h) => h.platform === "HackerOne").url, "HackerOne", "lnk")} and ${ext(person.handles.find((h) => h.platform === "YesWeHack").url, "YesWeHack", "lnk")}.</p>
  <div class="blist">${bounty.items.map(bountyRow).join("")}
  </div>
</div></section>
`;

const expItem = (e) => `
      <article class="xp">
        <div class="xh">
          <span class="xr">${esc(e.role)} <span class="xo">· ${esc(e.org)}, ${esc(e.where)}</span></span>
          <span class="xd">${esc(e.span || `${fmtDate(e.from)} to ${fmtDate(e.to)}`)}</span>
        </div>
        <ul>${e.bullets.map((b) => `<li>${rich(b)}</li>`).join("")}</ul>
      </article>`;

const projItem = (p) => `
      <article class="xp">
        <div class="xh">
          <span class="xr">${p.url ? ext(p.url, esc(p.name), "lnk") : esc(p.name)}</span>
          <span class="xd">${esc(p.meta)}</span>
        </div>
        <p class="body">${rich(p.what)}</p>
      </article>`;

const experienceSec = () => `
<section id="experience" aria-labelledby="exp-h"><div class="wrap">
  <h2 id="exp-h">Experience</h2>
  <div class="xlist">${experience.map(expItem).join("")}
  </div>
${projects.length ? `  <h2 id="projects-h" style="margin-top:48px">Projects</h2>
  <div class="xlist">${projects.map(projItem).join("")}
  </div>` : ""}
</div></section>
`;

const ctfRow = (r) => {
  const rank = `<div class="rank">${ordinal(r.place)}</div>`;
  const ev = `<div class="ev"><div class="name">${esc(r.event)}</div><div class="sub">${esc(r.kind)} · ${fmtDate(r.date)}${r.note ? ` · ${esc(r.note)}` : ""}</div></div>`;
  const field = r.field ? `<div class="field">of <b>${num(r.field)}</b> teams</div>` : `<div class="field">${esc(r.fieldNote || "")}</div>`;
  return r.url
    ? `\n      <a class="row" href="${esc(r.url)}">${rank}${ev}${field}</a>`
    : `\n      <div class="row">${rank}${ev}${field}</div>`;
};

const ctfSec = () => `
<section id="ctf" aria-labelledby="ctf-h"><div class="wrap">
  <h2 id="ctf-h">Capture the flag</h2>
  <p class="body" style="margin-bottom:26px">${rich(copy.ctfIntro)}</p>
  <div class="log">${[...ctf].sort(byDateDesc).map(ctfRow).join("")}
  </div>
</div></section>
`;

const certRow = (c) => `
      <div class="frow">
        <span class="fk">${esc(c.issuer)} · ${fmtDate(c.date)}</span>
        <span class="fv">${c.url ? ext(c.url, esc(c.name), "lnk") : esc(c.name)}${c.detail ? `. ${esc(c.detail)}` : ""}${c.id ? ` <code class="id">${esc(c.id)}</code>` : ""}</span>
      </div>`;

const eduRow = (e) => `
      <div class="frow">
        <span class="fk">${esc(e.span)}</span>
        <span class="fv"><span class="k">${esc(e.school)}</span>, ${esc(e.what)}</span>
      </div>`;

const credentialsSec = () => `
<section id="credentials" aria-labelledby="cred-h"><div class="wrap">
  <h2 id="cred-h">Certifications</h2>
  <div class="facts">${certs.map(certRow).join("")}
  </div>
${education.length ? `  <h2 id="edu-h" style="margin-top:44px">Education</h2>
  <div class="facts">${education.map(eduRow).join("")}
  </div>` : ""}
</div></section>
`;

const skillsSec = () => `
<section id="skills" aria-labelledby="skills-h"><div class="wrap">
  <h2 id="skills-h">Skills</h2>
  <div class="facts">${Object.entries(skills)
    .map(([g, items]) => `
      <div class="frow">
        <span class="fk">${esc(g)}</span>
        <span class="fv tags">${items.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span>
      </div>`)
    .join("")}
  </div>
</div></section>
`;

const contactSec = () => `
<section id="contact" aria-labelledby="contact-h"><div class="wrap">
  <h2 id="contact-h">Contact</h2>
  <p class="body">${rich(copy.contactLead)} ${ext(mail, esc(person.email), "lnk")}. ${rich(copy.contactAlso)} ${person.handles
    .filter((h) => ["GitHub", "HackerOne", "YesWeHack", "LinkedIn"].includes(h.platform))
    .map((h) => ext(h.url, esc(h.platform), "lnk"))
    .join(", ")}.</p>
  <p class="body">${esc(person.location)}. ${rich(copy.contactTail)} <a class="lnk" href="/.well-known/security.txt">security.txt</a>.</p>
</div></section>
`;

const foot = () => `
<footer class="foot"><div class="wrap">
  <span>${esc(person.name)}, ${esc(person.location)}</span>
  <span class="flinks"><span>Updated ${esc(site.updated)}</span>${ext(site.repo, "source")}<a href="/data.json">data.json</a></span>
</div></footer>
<script src="/main.js" defer></script>
</body>
</html>
`;

export function render() {
  return [head(), topbar(), hero(), '<main id="main">', about(), research(), oss(), bountySec(), experienceSec(), ctfSec(), credentialsSec(), skillsSec(), contactSec(), "</main>", foot()].join("");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const out = join(here, "index.html");
  writeFileSync(out, render());
  console.log(`wrote ${out} (${Buffer.byteLength(render())} bytes) · ${summary}`);
}
