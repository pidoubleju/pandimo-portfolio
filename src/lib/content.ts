import { getCollection, getEntry } from 'astro:content';

const expertiseSequence = [
  'brand-guidelines',
  'merch-and-brand-experience',
  'paid-and-organic-content',
  'ai-assisted-imagery',
] as const;

export async function getSite() {
  const entry = await getEntry('pages', 'site');
  if (entry?.data.kind !== 'site') throw new Error('Site content is missing');
  return entry.data;
}

export async function getHome() {
  const entry = await getEntry('pages', 'home');
  if (entry?.data.kind !== 'home')
    throw new Error('Front-page content is missing');
  return { ...entry, data: entry.data };
}

export async function getExpertiseAreas() {
  const entries = await getCollection('expertise');
  return expertiseSequence.map((id) => {
    const entry = entries.find((area) => area.id === id);
    if (!entry) throw new Error(`Expertise content is missing: ${id}`);
    return entry;
  });
}

export async function getExpertise(id: (typeof expertiseSequence)[number]) {
  const entries = await getExpertiseAreas();
  const entry = entries.find((area) => area.id === id);
  if (!entry) throw new Error(`Expertise content is missing: ${id}`);
  return entry;
}
