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

const proseItem = z.object({ heading: text, description: text });
const brandIntroduction = z.object({
  label: text,
  heading: z.array(text).min(1),
  description: text,
  role: text,
  image,
});
const contentGroup = z.object({ heading: text, lines: z.array(text).min(1) });
const merchIntroduction = z.object({
  label: text,
  heading: z.array(text).min(1),
  description: text,
});
const merchFigure = proseItem.extend({ image, mobileImage: image.optional() });
const merchBrandExperience = z.object({
  sevdesk: merchIntroduction.extend({
    audiences: z.array(proseItem).length(2),
    figures: z.array(merchFigure).length(2),
    credit: text,
  }),
  shine: merchIntroduction.extend({
    figures: z.array(merchFigure).length(2),
    credit: text,
  }),
  event: z.object({
    label: text,
    statistic: text,
    heading: text,
    description: text,
  }),
});
const paidOrganicContent = z.object({
  campaign: z.object({ image, caption: text }),
  challenge: proseItem.extend({ label: text }),
  examples: z.object({
    illustration: image,
    advertisement: image,
    caption: text,
  }),
  contribution: z.object({ label: text, items: z.array(proseItem).length(3) }),
  scope: z.object({
    label: text,
    statistics: z.array(z.object({ value: text, description: text })).length(3),
    note: text,
  }),
});
const aiAssistedImagery = z.object({
  illustration: z.object({ image, caption: text }),
  pointOfView: proseItem.extend({ label: text, context: text }),
  approach: z.object({ label: text, items: z.array(proseItem).length(4) }),
  principle: z.object({
    label: text,
    heading: z.array(text).length(2),
    description: text,
  }),
});
const brandGuidelines = z.object({
  exploration: z.object({
    sevdesk: z.object({ heading: text, description: text, linkLabel: text }),
    shine: z.object({ heading: text, description: text, linkLabel: text }),
  }),
  sevdesk: brandIntroduction.extend({ caption: text }),
  work: z.object({
    label: text,
    items: z.array(proseItem.extend({ number: text })).length(4),
  }),
  scope: z.object({
    label: text,
    groups: z.array(contentGroup).length(3),
    palette: image,
    typography: image,
    typographyDetail: image,
    shapes: image,
  }),
  access: z.object({
    label: text,
    heading: text,
    items: z.array(proseItem).length(2),
    linkLabel: text,
    linkHeading: text,
  }),
  shine: brandIntroduction,
  learning: z.object({ label: text, items: z.array(proseItem).length(2) }),
  process: proseItem,
  templates: z.object({
    label: text,
    heading: text,
    description: text,
    groups: z.array(contentGroup).length(2),
  }),
  slides: proseItem,
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
    brandGuidelines: brandGuidelines.optional(),
    merchBrandExperience: merchBrandExperience.optional(),
    paidOrganicContent: paidOrganicContent.optional(),
    aiAssistedImagery: aiAssistedImagery.optional(),
    nextLabel: text.optional(),
    nextLinkLabel: text.optional(),
  }),
});

export const collections = { pages, expertise };
