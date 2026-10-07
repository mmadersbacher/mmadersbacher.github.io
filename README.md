# gig-gehacktistgeil.com

Site of the CTF team **«Gehackt ist Geil»** (CTFtime [/438200](https://ctftime.org/team/438200)),
plus a personal page at `/mario`. Live at <https://gig-gehacktistgeil.com/>.

Astro, hand-written CSS, no UI framework. The look is riso/screenprint zine — newsprint paper,
Anton + IBM Plex, off-register stamps, and a live canvas halftone of the team mascot.

## Run it

```sh
npm install
npm run dev         # localhost:4321
npm run build       # -> dist/
npm run cf-preview  # build + serve through the real Workers asset router
```

Node 22+. Pushing to `main` builds and deploys to Cloudflare Workers via GitHub Actions
(`.github/workflows/deploy.yml`, config in `wrangler.jsonc`).

`mmadersbacher.github.io` is a separate site in the same repo: the personal page in `site/`
(plain HTML/CSS/JS, facts in `site/data.json`, rendered by `site/build.mjs`), deployed to
GitHub Pages by `.github/workflows/pages.yml`. `node --test site/test.mjs` checks it.

## Structure

```
src/
  content/writeups/   writeups as markdown (vorlage.md is the template)
  data/site.ts        CTFtime links, contact address, results table
  data/oss.ts         open-source contributions and tools shown on /mario
  layouts/Base.astro  head/SEO, masthead, footer
  pages/              index, mario, writeups, 404, sitemap.xml
tools/og.html         source of public/og.png (link preview image)
tools/personal-og.html     source of site/og.png
site/                 personal site for mmadersbacher.github.io (data.json → build.mjs → index.html)
wrangler.jsonc        Cloudflare Workers static-asset config
```

## Add a result

One line in `results` in `src/data/site.ts`, German number format (`13.764`, `36,639`).

## Add a writeup

Copy `src/content/writeups/vorlage.md`, fill in the frontmatter, set `draft: false`.
The filename becomes the URL. The "Writeups" nav entry appears by itself once the first
non-draft writeup exists.

## Re-render the preview image

```sh
chrome --headless=new --allow-file-access-from-files --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=6000 \
  --screenshot=public/og.png tools/og.html
```
