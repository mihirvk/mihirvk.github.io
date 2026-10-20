import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({ title: z.string(), description: z.string(),
    group: z.enum(['Princeton Course Projects', 'IITB Dual Degree Project', 'IITB Course Projects', 'Miscellaneous']),
    order: z.number(), course: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
  }),
});
const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({ title: z.string(), description: z.string().optional(), date: z.string(), category: z.string(), draft: z.boolean().default(false) }),
});
const coursework = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/coursework' }),
  schema: z.object({ title: z.string() }),
});
export const collections = { projects, writing, coursework };
