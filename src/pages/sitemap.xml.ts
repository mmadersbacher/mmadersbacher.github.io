import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { defaultLang, langCodes, locales, localePath } from "../i18n/ui";

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://gig-gehacktistgeil.com")).href.replace(/\/$/, "");
  const writeups = (await getCollection("writeups", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const wuLastmod = writeups.length ? writeups[0].data.date.toISOString().slice(0, 10) : undefined;

  // Seiten, die es in beiden Sprachen gibt — jede Sprache bekommt eine eigene
  // <url> plus die xhtml:link-Paare, damit Google sie als Übersetzungen liest.
  const translated: { path: string; lastmod?: string }[] = [
    { path: "/" },
    { path: "/mario/" },
    { path: "/lunaric/" },
    ...(writeups.length ? [{ path: "/writeups/", lastmod: wuLastmod }] : []),
  ];

  // Writeup-Artikel sind deutsch und existieren nur einmal.
  const singles = writeups.map((e) => ({
    path: `/writeups/${e.id}/`,
    lastmod: e.data.date.toISOString().slice(0, 10),
  }));

  const alternates = (path: string) =>
    [
      ...langCodes.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${locales[l].html}" href="${base}${localePath(l, path)}"/>`
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${localePath(defaultLang, path)}"/>`,
    ].join("\n");

  const urls = [
    ...translated.flatMap((p) =>
      langCodes.map(
        (l) =>
          `  <url>\n    <loc>${base}${localePath(l, p.path)}</loc>\n${alternates(p.path)}${
            p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ""
          }\n  </url>`
      )
    ),
    ...singles.map(
      (p) => `  <url>\n    <loc>${base}${p.path}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`
    ),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
