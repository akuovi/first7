import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/* =========================
   📖 DEVOTIONALS
========================= */
const devotionals = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/devotionals' }),
  schema: z.object({
    title: z.string(),
    day: z.number(),
    date: z.coerce.date().optional(),
    series: z.string(),
    verse: z.string(),
    excerpt: z.string()
  })
});

/* =========================
   📰 BLOG
========================= */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    featured: z.boolean().optional()
  })
});

/* =========================
   📜 BIBLE
========================= */
const bible = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bible' }),
  schema: z.object({
    book: z.string(),
    chapter: z.number()
  })
});

/* =========================
   📥 DOWNLOADS
========================= */
const downloads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/downloads' }),
  schema: z.object({
    title: z.string(),
    file: z.string(),
    description: z.string()
  })
});

/* =========================
   🚀 PLANS (START)
========================= */
const start = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/plans' }),
  schema: z.object({
    title: z.string(),
    plan: z.string(),
    day: z.number(),
    description: z.string(),
    verse: z.string()
  })
});

/* =========================
   🧭 GUIDES (FIXED)
========================= */
const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),

    // 🏷️ Badge system
    featured: z.boolean().optional(),
    new: z.boolean().optional(),
    updated: z.boolean().optional(),

    // ✨ Optional
    description: z.string().optional(),
  })
});

/* =========================
   📦 EXPORT
========================= */
export const collections = {
  devotionals,
  blog,
  bible,
  downloads,
  start,
  guides
};