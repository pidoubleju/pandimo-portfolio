import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const text = z.string().min(1);
const image = z.object({
  src: z.string().startsWith('/images/'),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: text,
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.discriminatedUnion('kind', [
    z.object({
      kind: z.literal('site'),
      name: text,
      role: text,
      description: text,
      email: z.email(),
      navigation: z
        .array(
          z.object({
            label: text,
            section: z.enum(['about', 'work', 'afk', 'contact']),
          })
        )
        .length(4),
      skipLabel: text,
      allWorkLabel: text,
      previousLabel: text,
      topLabel: text,
      footerIdentity: text,
      overviewLabel: text,
      overviewLinkLabel: text,
      contactLinkLabel: text,
    }),
    z.object({
      kind: z.literal('home'),
      introduction: z.object({
        label: text,
        heading: z.array(text).min(1),
        description: text,
        experience: text,
        image,
        workLabel: text,
        contactLabel: text,
      }),
      work: z.object({ label: text, heading: text, description: text }),
      afk: z.object({ label: text, heading: text, image }),
      contact: z.object({ label: text, heading: text, emailLabel: text }),
    }),
  ]),
});

const expertise = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/expertise' }),
  schema: z.object({
    title: text,
    preview: z.object({
      label: text,
      heading: text,
      descriptions: z.array(text).min(1),
      linkLabel: text,
      image,
      texture: image.optional(),
    }),
    introduction: z.object({
      label: text,
      heading: z.array(text).min(1),
      description: text,
    }),
    metadata: z.array(
      z.object({
        label: text,
        headings: z.array(text).min(1),
        description: text.optional(),
      })
    ),
    nextLabel: text.optional(),
    nextLinkLabel: text.optional(),
  }),
});

export const collections = { pages, expertise };
