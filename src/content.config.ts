import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Writeups liegen als Markdown in src/content/writeups/.
// draft: true heißt: wird nirgends verlinkt und bekommt keine Seite (siehe vorlage.md).
const writeups = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writeups" }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    category: z.enum(["Web", "Rev", "Pwn", "Crypto", "Forensics", "OSINT", "Misc"]),
    author: z.string(),
    points: z.number().optional(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Blog: allgemeine Posts als Markdown in src/content/blog/ (kein CTF-Schema).
// draft: true wird nirgends verlinkt und bekommt keine Seite.
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    /** Sprache des Posts — steuert html-lang und JSON-LD des Artikels. */
    lang: z.enum(["de", "en"]).default("de"),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writeups, blog };
