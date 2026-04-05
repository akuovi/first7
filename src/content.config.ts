import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

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

const bible = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/bible' }),
  schema: z.object({
    book: z.string(),
    chapter: z.number()
  })
});

const downloads = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/downloads' }),
  schema: z.object({
    title: z.string(),
    file: z.string(),
    description: z.string()
  })
});

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

export const collections = {
  devotionals,
  blog,
  bible,
  downloads,
  start
};
