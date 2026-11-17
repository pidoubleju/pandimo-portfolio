import { defineConfig } from 'astro/config';

// CI supplies the actual Pages origin and repository path after configure-pages.
export default defineConfig({
  site: process.env['SITE_URL'] ?? 'https://example.com',
  base: process.env['BASE_PATH'] ?? '/',
  output: 'static',
  outDir: './dist',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  // Keep the shared menu module cacheable and compatible with the script policy.
  vite: { build: { assetsInlineLimit: 0 } },
});
