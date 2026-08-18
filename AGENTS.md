# Notes for working on this repo

GitHub Pages **user site** — everything here is served from the domain root, so paths are
absolute (`/writeups/`, `/bubensahne.png`). There is no `base` in `astro.config.mjs`; don't
add one back.

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

Push to `main` → `.github/workflows/deploy.yml` builds with `withastro/action@v3`
(`node-version: 22`, older Node breaks Astro 7) and publishes to Pages.
