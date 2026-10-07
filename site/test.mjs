// Checks that keep the page honest and small. Run:  node --test site/test.mjs
// Everything here is offline. Link liveness is a separate, opt-in script: node site/check-links.mjs
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { data, render } from "./build.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const html = render();
const css = readFileSync(join(here, "style.css"), "utf8");
const js = readFileSync(join(here, "main.js"), "utf8");

// ---------- data shape ----------

const isHttps = (u) => /^https:\/\/[^\s"<>]+$/.test(u);

test("every CVE has the fields the layout needs and https proof links", () => {
  for (const c of data.cves) {
    for (const k of ["id", "product", "range", "cwe", "severity", "cvss31", "cvss40", "assigner", "published", "mechanism", "status", "links"]) {
      assert.ok(c[k] !== undefined && c[k] !== "", `${c.id || "?"} missing ${k}`);
    }
    assert.match(c.id, /^CVE-\d{4}-\d{4,}$/);
    assert.match(c.published, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(["Critical", "High", "Medium", "Low"].includes(c.severity), `${c.id}: severity ${c.severity}`);
    assert.ok(c.links.length >= 1, `${c.id}: no proof link`);
    for (const l of c.links) assert.ok(isHttps(l.url), `${c.id}: ${l.url}`);
    assert.ok(c.links.some((l) => /cve\.org|github\.com\/advisories|vuldb\.com/.test(l.url)), `${c.id}: no authoritative record linked`);
  }
});

test("every contribution is a real PR URL matching repo and number, with a known state", () => {
  for (const c of data.contributions) {
    assert.ok(["merged", "open"].includes(c.state), `${c.repo}#${c.number}: state ${c.state}`);
    assert.equal(c.url, `https://github.com/${c.repo}/pull/${c.number}`);
    assert.match(c.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(c.what.length > 20, `${c.repo}#${c.number}: description too short`);
    assert.ok(!c.repo.startsWith("mmadersbacher/"), `${c.repo}: own repos are not upstream contributions`);
  }
});

test("CTF rows that link somewhere link to CTFtime, and ranks are sane", () => {
  for (const r of data.ctf) {
    assert.ok(Number.isInteger(r.place) && r.place >= 1, `${r.event}: place ${r.place}`);
    if (r.field) assert.ok(r.place <= r.field, `${r.event}: place ${r.place} > field ${r.field}`);
    if (r.url) assert.match(r.url, /^https:\/\/ctftime\.org\/event\/\d+$/, `${r.event}: ${r.url}`);
    assert.match(r.date, /^\d{4}(-\d{2}(-\d{2})?)?$/);
    if (!r.url) assert.ok(r.note && /scoreboard/.test(r.note), `${r.event}: unlinked ranks must say where the scoreboard is`);
  }
});

test("all handle and profile URLs are https", () => {
  for (const h of data.person.handles) assert.ok(isHttps(h.url), h.url);
  for (const c of data.certs) if (c.url) assert.ok(isHttps(c.url), c.url);
  for (const p of data.projects) if (p.url) assert.ok(isHttps(p.url), p.url);
});

// ---------- things that must never appear ----------

test("no bug-bounty program names, street address, phone number or birth date leak into the page", () => {
  const forbidden = [
    /mediamarkt/i, /saturn/i, /foxway/i, /ceconomy/i,          // retailer
    /flanders|vlaanderen|digitaal vlaanderen|magda/i,          // Belgian VDP
    /geizhals|idealo/i,                                        // price comparison
    /\+43|\b0\d{3}[ /-]?\d{3,}\b/,                             // phone numbers
    /\b(straße|strasse|gasse|weg|platz)\s*\d/i, /\b6134\b/,    // street / Vomp postcode
    /\bvomp\b/i,                                               // town (location stays at region level)
    /\b(19|20)\d{2}-\d{2}-\d{2}\b(?![^<]*<\/(time|span)>)[^<]*\bborn/i, /\bborn\b/i, /\bgeboren\b/i, /\bage\s+\d/i, /\b18\s*(y\/o|years?\s+old)/i,
  ];
  const text = html.replace(/mailto:[^"]+/g, "");
  for (const re of forbidden) assert.doesNotMatch(text, re, `forbidden pattern ${re} found`);
});

test("no em or en dashes anywhere on the page (ranges say 'to', clauses get a full stop)", () => {
  assert.doesNotMatch(html, /[\u2014\u2013]/, "dash found in rendered page");
});

test("no middle-dot separators in prose (hero, kicker, body paragraphs); dots belong in data lines only", () => {
  const prose = [...html.matchAll(/<p class="(?:stmt|kicker|body)"[^>]*>([\s\S]*?)<\/p>/g)].map((m) => m[1]);
  assert.ok(prose.length >= 8, `found ${prose.length} prose paragraphs`);
  for (const p of prose) assert.ok(!p.includes("\u00b7"), `middle dot in prose: ${p.slice(0, 80)}`);
});

test("no missing data leaks into the page as undefined / null / NaN", () => {
  assert.doesNotMatch(html, /\b(undefined|NaN|\[object Object\])\b/);
  assert.doesNotMatch(html, />null</);
});

test("the Nodemailer entry does not claim authorship of the fix (public record: maintainer's fix, reporter credit)", () => {
  const nm = data.cves.find((c) => c.id === "CVE-2026-90776");
  assert.ok(nm);
  const joined = `${nm.mechanism} ${nm.status} ${nm.credit}`;
  assert.doesNotMatch(joined, /fix (and|&) regression test contributed|my fix was|adopted by the maintainer|contributed the fix/i);
});

// ---------- rendered output ----------

test("rendered page contains every CVE id, every PR link and every profile link", () => {
  for (const c of data.cves) assert.ok(html.includes(c.id), c.id);
  for (const c of data.contributions) assert.ok(html.includes(`href="${c.url}"`), c.url);
  for (const h of data.person.handles) assert.ok(html.includes(`href="${h.url}"`), h.url);
  assert.ok(html.includes(`Updated ${data.site.updated}`));
});

test("rendered page escapes data (no raw < or & from data survives)", () => {
  // A '<script' can only come from the two the template writes itself.
  assert.equal((html.match(/<script/g) || []).length, 3, "unexpected <script> count");
  assert.doesNotMatch(html, /&(?!amp;|lt;|gt;|quot;|#39;|#\d+;|[a-z]+;)/, "unescaped ampersand");
});

test("external links on the page are all https and there are no third-party scripts, fonts or trackers", () => {
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  for (const h of hrefs) assert.ok(h.startsWith("https://") || h.startsWith("/") || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("data:"), h);
  const srcs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
  for (const s of srcs) assert.ok(s.startsWith("/"), `third-party resource: ${s}`);
  assert.doesNotMatch(html, /googleapis|gstatic|googletagmanager|analytics|plausible|hotjar|cloudflareinsights/i);
  assert.doesNotMatch(css, /https?:\/\//, "stylesheet loads something remote");
});

test("semantic structure: one h1, landmark elements, labelled sections, skip link, lang", () => {
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.match(html, /<html lang="en">/);
  for (const tag of ["<header", "<main", "<nav", "<footer"]) assert.ok(html.includes(tag), tag);
  const sections = [...html.matchAll(/<section[^>]*>/g)].map((m) => m[0]);
  assert.ok(sections.length >= 7);
  for (const s of sections) assert.match(s, /aria-labelledby="[^"]+"/, s);
  assert.match(html, /class="skip" href="#main"/);
});

test("size budget: html + css + js under 100 KB (fonts excluded)", () => {
  const bytes = Buffer.byteLength(html) + Buffer.byteLength(css) + Buffer.byteLength(js);
  assert.ok(bytes < 100 * 1024, `${bytes} bytes`);
});

test("self-hosted fonts exist and are the only font source", () => {
  for (const f of ["MartianMono-latin.woff2", "SplineSansMono-latin.woff2"]) {
    const size = statSync(join(here, "fonts", f)).size;
    assert.ok(size > 10_000 && size < 60_000, `${f}: ${size} bytes`);
  }
  assert.equal((css.match(/@font-face/g) || []).length, 2);
});

// ---------- colour contrast (WCAG 2.x, AA = 4.5:1 for body text) ----------

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };
const tokens = (block) => Object.fromEntries([...block.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2].toLowerCase()]));

test("both themes meet AA for every text token on the background", () => {
  const dark = tokens(css.slice(css.indexOf(":root{"), css.indexOf(':root[data-theme="light"]')));
  const light = tokens(css.slice(css.indexOf(':root[data-theme="light"]')));
  for (const [name, t] of [["dark", dark], ["light", light]]) {
    for (const k of ["ink", "ink-2", "ink-3"]) {
      const c = contrast(t[k], t.bg);
      assert.ok(c >= 4.5, `${name}: --${k} ${t[k]} on --bg ${t.bg} = ${c.toFixed(2)}:1`);
    }
    // text set on the hover background too
    assert.ok(contrast(t["ink-3"], t["bg-2"]) >= 4.5, `${name}: --ink-3 on --bg-2`);
  }
});
