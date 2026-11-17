import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().trim().min(1),
    summary: z.string().trim().min(1).max(240),
    category: z.string().trim().min(1),
    year: z.number().int().min(2000).max(2100),
    role: z.string().trim().min(1),
    cover: z.string().startsWith('/images/'),
    coverAlt: z.string().trim().min(1),
    order: z.number().int().nonnegative(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
