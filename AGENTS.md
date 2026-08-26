# Notes for working on this repo

Served at the apex of **gig-gehacktistgeil.com** from Cloudflare Workers. Everything sits at
the domain root, so paths are absolute (`/writeups/`, `/bubensahne.png`). There is no `base`
in `astro.config.mjs`; don't add one back.

## Ground rules

- Hand-written CSS in `src/styles/global.css`. No Tailwind, no component library.
- The design is riso/screenprint: warm paper, 2px ink borders, hard offset shadows, Anton for
  display type, IBM Plex Mono for labels. No dark-mode hacker-terminal look.
- Content is German. Repo docs are English.
- Results and roster are facts — check CTFtime before changing numbers, and don't invent
  rankings. (The CTFtime team API reports a `country_place` that does not match the public
  country table; ignore it.)

## Content

- Team data: `src/data/site.ts`. Contributions/tools for `/mario`: `src/data/oss.ts`.
- Writeups: markdown in `src/content/writeups/`, schema in `src/content.config.ts`.
  `draft: true` hides an entry everywhere, including the sitemap. `vorlage.md` is the
  template and stays a draft — it also keeps the collection non-empty, which is what
  silences Astro's "collection is empty" warning during the build.

## Astro

Astro 7, content layer API (`glob` loader, `getCollection`, `render`). Dev server:

```
astro dev --background     # stop/status/logs via astro dev <cmd>
```

Docs: <https://docs.astro.build> — routing, content collections, styling.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` runs `npm ci && npm run build` on Node 22
(older Node breaks Astro 7) and `wrangler deploy`. Config is `wrangler.jsonc`: an assets-only
Worker (no `main`), `dist/` uploaded as static assets, `not_found_handling: "404-page"` so
`src/pages/404.astro` is served on a miss. Needs the `CLOUDFLARE_API_TOKEN` and
`CLOUDFLARE_ACCOUNT_ID` repo secrets.

Check routing before pushing — `npm run cf-preview` runs the built site through the real
Workers asset router, which `astro preview` does not:

```
npm run cf-preview        # build + wrangler dev on :8787
npm run deploy            # build + deploy by hand
```

The old `mmadersbacher.github.io` host still runs on GitHub Pages, serving only the stub in
`tools/gh-pages-redirect/` that forwards each path to the new domain. It is a client-side
redirect — a `*.github.io` host can't do a real 301 — so leave the inline script in the
`<head>` alone. Its workflow (`.github/workflows/gh-pages-redirect.yml`) is
`workflow_dispatch` only on purpose; run it by hand after edits.

`www` → apex is a Cloudflare Redirect Rule in the dashboard, not something in this repo.
