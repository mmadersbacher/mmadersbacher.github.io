// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
// Deployed as the GitHub Pages user site: mmadersbacher.github.io
export default defineConfig({
  site: "https://mmadersbacher.github.io",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: false,
    },
  },
});
