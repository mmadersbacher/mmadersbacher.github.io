// Opt-in, needs network:  node site/check-links.mjs
// Fetches every URL in data.json and reports anything that is not a 2xx/3xx.
// Known bot-wall hosts (LinkedIn 999, VulDB 403) are reported but do not fail the run.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "data.json"), "utf8"));
const urls = new Set();
const walk = (v) => {
  if (typeof v === "string") { if (/^https:\/\//.test(v)) urls.add(v); return; }
  if (Array.isArray(v)) return v.forEach(walk);
  if (v && typeof v === "object") return Object.values(v).forEach(walk);
};
walk(data);

const softFail = /linkedin\.com|vuldb\.com/;
const UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
let hard = 0;
for (const u of [...urls].sort()) {
  let status = "ERR";
  try {
    const res = await fetch(u, { method: "GET", redirect: "follow", headers: { "user-agent": UA, accept: "text/html,*/*" }, signal: AbortSignal.timeout(20000) });
    status = res.status;
  } catch (e) { status = `ERR ${e.name}`; }
  const ok = typeof status === "number" && status < 400;
  const soft = !ok && softFail.test(u);
  if (!ok && !soft) hard++;
  console.log(`${ok ? "ok  " : soft ? "soft" : "FAIL"} ${status} ${u}`);
}
console.log(`\n${urls.size} urls, ${hard} hard failures`);
process.exit(hard ? 1 : 0);
