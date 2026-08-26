import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const base = (site ?? new URL("https://gig-gehacktistgeil.com")).href.replace(/\/$/, "");
  const writeups = (await getCollection("writeups", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const pages: { path: string; lastmod?: string }[] = [
    { path: "/" },
    { path: "/mario/" },
    ...(writeups.length ? [{ path: "/writeups/", lastmod: writeups[0].data.date.toISOString().slice(0, 10) }] : []),
    ...writeups.map((e) => ({
      path: `/writeups/${e.id}/`,
      lastmod: e.data.date.toISOString().slice(0, 10),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${base}${p.path}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ""}</url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
