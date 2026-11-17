/** Prefix site-local paths with Astro's configured base, including on 404 pages. */
export function withBase(path = ''): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
