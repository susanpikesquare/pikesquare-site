import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.coerce.date(),
    functions: z.array(z.string()).default([]),
    linkedinUrl: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['template', 'guide']).default('template'),
    functions: z.array(z.string()).default([]),
    link: z.string().optional(),
    internalLink: z.string().optional(),
    linkLabel: z.string().optional(),
  }),
});

export const collections = { articles, resources };
