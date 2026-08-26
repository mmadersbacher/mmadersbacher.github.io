# Notes for working on this repo

Served at the apex of **gig-gehacktistgeil.com** from Cloudflare Workers. Everything sits at
the domain root, so paths are absolute (`/writeups/`, `/bubensahne.png`). There is no `base`
in `astro.config.mjs`; don't add one back.

## Ground rules

- Hand-written CSS in `src/styles/global.css`. No Tailwind, no component library.
- The design is riso/screenprint: warm paper, 2px ink borders, hard offset shadows, Anton for
  display type, IBM Plex Mono for labels. No dark-mode hacker-terminal look.
- German is the default language, English lives under `/en/`. Repo docs are English.
- Results and roster are facts — check CTFtime before changing numbers, and don't invent
  rankings. (The CTFtime team API reports a `country_place` that does not match the public
  country table; ignore it.)

## Content

- Team data and results: `src/data/site.ts`. Per-person data: `src/data/oss.ts` (`/mario`)
  and `src/data/lunaric.ts` (`/lunaric`).
- Numbers in `results` are stored raw and formatted per language at render time. Don't
  hand-write `13.764` into the data again.
- Bio pages link to bounty platforms but never reproduce their counters (reports, points,
  rank, impact). Those drift, so any copy of them here is wrong within a week — link and let
  the platform be the source. Don't add a stat row back.
- `/lunaric` uses the handle only; the person's legal name does not appear on the site,
  including in JSON-LD. Keep it that way.
- Writeups: markdown in `src/content/writeups/`, schema in `src/content.config.ts`.
  `draft: true` hides an entry everywhere, including the sitemap. `vorlage.md` is the
  template and stays a draft — it also keeps the collection non-empty, which is what
  silences Astro's "collection is empty" warning during the build.

## Two languages

All copy lives in `src/i18n/ui.ts`; `en` is typed as `typeof de`, so a missing English key is
a type error rather than a silent German fallback. Pages are thin: `src/pages/foo.astro` and
`src/pages/en/foo.astro` both render one component out of `src/components/` with a `lang`
prop. `Base.astro` derives the other language's URL by stripping the `/en` prefix from the
current path — pass `altPath` when that guess is wrong (writeup articles, 404) and
`hasAlternate={false}` when the page genuinely exists in one language only.

Two traps:

- **Number formatting.** `de-AT` groups thousands with a no-break space (`13 764`), not the
  period this site uses. `locales[lang].num` is therefore `de-DE` while `locales[lang].date`
  stays `de-AT` (it wants "Jänner"). Use the right one.
- **Proper names don't translate.** «Gehackt ist Geil», «Absolute Bubensahne» and event names
  stay German in both versions. The English hero explains the name via `home.gloss` instead.

## Two details that look like bugs

- **Anton leading.** Anton's capitals occupy 0.875em (0.865 above the baseline, 0.010 below).
  Any `line-height` below that makes stacked display lines physically overlap — which is
  exactly what used to happen to GEHACKT/IST/GEIL. Use `--lh-display` (0.92) or
  `--lh-display-airy`, and give nested lines inside a display block their own `line-height`
  (see `.stamp .s1`).
- **The halftone canvas** (`src/components/HomePage.astro`) must size its bitmap to
  `clientWidth × devicePixelRatio` and keep the dot pitch in CSS pixels. A fixed-size buffer
  gets downscaled by the browser, and a hard dot grid turns to moiré when that happens — it
  only looked fine on phones because their pixel density happened to land near 1:1. The
  source photo is dark (median luminance ≈ 0.18), so the renderer also stretches the tonal
  range and solves for a gamma that hits a target mean coverage; without that, most dots sit
  at maximum radius and merge into a black slab.

## Astro

Astro 7, content layer API (`glob` loader, `getCollection`, `render`). Dev server:

```
astro dev --background     # stop/status/logs via astro dev <cmd>
```

Docs: <https://docs.astro.build> — routing, content collections, styling.

## Deploy

**Releases are manual right now.** `npm run deploy` from a machine that is logged in
(`wrangler login`) is what actually publishes the site.

Push to `main` → `.github/workflows/deploy.yml` runs `npm ci && npm run build` on Node 22
(older Node breaks Astro 7). It *would* also run `wrangler deploy`, but that step is skipped
unless the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets exist — they
don't, so CI only verifies the build and stays green. Add both secrets and it turns back into
deploy-on-push with no further edits. Don't "fix" the workflow by deleting the guard; a run
that fails on every commit is a run nobody reads.

Config is `wrangler.jsonc`: an assets-only Worker (no `main`), `dist/` uploaded as static
assets, `not_found_handling: "404-page"` so `src/pages/404.astro` is served on a miss.

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
