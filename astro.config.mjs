// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
// Deployed to Cloudflare Workers static assets, served at the apex domain.
export default defineConfig({
  site: "https://gig-gehacktistgeil.com",
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: false,
    },
  },
});
