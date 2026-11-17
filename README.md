# Mona portfolio

Mona Schmidt’s portfolio, built with Astro, TypeScript, plain CSS, and validated
Markdown. Static output supports GitHub Pages at a domain root or repository
prefix. No database, CMS account, or application secrets are required.

## Run locally

Use Node **24.22.3** (`.nvmrc`) and Yarn **4.18.1**:

```sh
nvm use
corepack enable
yarn install --immutable
yarn dev
```

Open <http://localhost:4321>. `yarn build` writes to `dist/`; `yarn preview`
serves the production build. The default canonical origin is `https://example.com`.

## Edit content

- `src/content/pages/site.md`: shared identity, navigation labels, contact and 404 recovery copy.
- `src/content/pages/home.md`: introduction, selected-work heading, AFK artwork
  and prose, contact section. The Markdown body holds the AFK prose.
- `src/content/expertise/*.md`: one canonical record per expertise area. Its
  preview fields feed the front page; introduction and metadata fields feed the
  corresponding expertise page. The four complete bodies live in named
  `brandGuidelines`, `merchBrandExperience`, `paidOrganicContent` and
  `aiAssistedImagery` fields.

Edit text and media paths in these Markdown files. Keep YAML frontmatter between
`---` delimiters. Lists and nested records are validated by `src/content.config.ts`;
`yarn typecheck` and `yarn build` report invalid records. Media records keep local
`src`, source `width`/`height`, and descriptive `alt` text together. Put delivery
assets in `public/images/` and use `/images/...` content paths; templates apply the
configured hosting prefix automatically.

Layout stays in Astro and CSS. The front page and each expertise page have their
own composition; shared components own repeated previews, introductions,
metadata, and fixed-sequence navigation. The fields are compatible with future
Pages CMS nested objects/lists and Markdown editing. No CMS is connected or needed.

Markdown-body URLs resolve from the rendered page URL, not the content file's
location. On the front page use `./images/your-image.webp`; on an expertise page
use `../images/your-image.webp`. For an expertise-to-expertise link use
`../paid-and-organic-content/`. Same-page links use
`#section-id`. Avoid root-absolute body URLs such as `/images/...`, which bypass
the repository prefix; `withBase` applies to structured fields, not Markdown.
Run both root and prefix checks after editing body links or media paths.

Do not change expertise filenames or routes without updating the fixed sequence
in `src/lib/content.ts` and the corresponding Astro page. Identity/navigation and
404 copy should be changed in `site.md`. Keep source artwork and provenance in
`.scratch/design-adaptation/source-assets/`; create a delivery variant without
upscaling, preserve its crop in the composition, and update dimensions and alt text
alongside its path. Preserve the applicable notices in `public/licenses/`.

A typical edit is: change the existing field or Markdown prose, run
`yarn typecheck`, inspect `yarn dev` at desktop and mobile widths, then run
`yarn validate` and the prefix checks below. If a schema edit leaves the running
dev server with old content fields, stop it, remove the generated
`.astro/data-store.json` cache and restart it before inspection. Restarting alone
may reuse the stale validated record. Commit the Markdown and any delivery media together after the checks pass.

Future Pages CMS setup can map these existing files, nested objects, lists and
media fields in a `.pages.yml` configuration. It must retain the existing field
names, required groups, fixed routes and image metadata, and use the URL rules
above for Markdown bodies. Structured image fields retain `/images/...` values
for the templates to prefix. Text/media editing needs no layout selector or
editable Astro/HTML. That future configuration, account connection and editor
workflow are not installed in this version; repository editing is the working
workflow today.

## Checks

```sh
yarn validate  # source checks, production build, and generated-site verification
yarn format    # apply formatting
yarn lint:fix  # fix eligible lint issues
```

The existing pipeline includes Astro/TypeScript diagnostics, type-aware ESLint,
accessibility linting, Prettier, Knip, and Dependency Cruiser. The production
checker validates local links, assets and fragments; language, image descriptions,
page titles, descriptions, canonicals and 404 indexing. It permits local bundled
enhancement modules for the mobile menu, while rejecting client hydration,
inline scripts and inline event handlers. Navigation remains available if the
menu script fails or JavaScript is disabled.

The user requested existing checks and browser verification only. Responsive,
copy and navigation verification supplement these checks without introducing a
new test framework or added verifier coverage.

Verify repository-prefix hosting with:

```sh
SITE_URL=https://example.com BASE_PATH=/portfolio-check/ yarn build
SITE_URL=https://example.com BASE_PATH=/portfolio-check/ yarn check:build
BASE_PATH=/portfolio-check/ yarn preview
```

Rebuild without those variables to return to domain-root output. The origin
excludes the repository path; `BASE_PATH` includes both leading and trailing `/`.

## Source assets

The original design is the visual authority. See `docs/design-adaptation.md`,
`docs/reference-inventory.json`, and `docs/design-verification.md` for references,
source copy, media URLs, verification, and any limits. Original home, Brand guidelines,
Merch & brand experience, Paid & organic content and AI-assisted imagery assets are retained in `.scratch/design-adaptation/source-assets/`;
delivery variants and original SVGs live in the corresponding `public/images/`
directories. Merch, Paid and AI raster variants use WebP quality 95 without upscaling. Brand
guideline raster variants use lossless WebP; its Shine logo retains the PNG. Inter and Space
Grotesk font files are local, with OFL notices in `public/licenses/`.
The local Phosphor List icon retains its MIT notice in the same directory.

No copy or artwork has been generated to replace the source. The AFK collage
remains a single image. The site remains public, without a password or image viewer.

## GitHub Pages

The supplied `.github/workflows/pages.yml` validates root and repository-prefix
builds. After repository setup, select GitHub Actions in **Settings → Pages →
Build and deployment**. The deployment job derives the origin/base path with
`actions/configure-pages` and publishes `dist/` on pushes to `main` or a manual run.
Pull requests validate without deploying. A static unknown URL uses the shared
`404.html`, whose absolute base-aware links recover from nested paths; it is
`noindex` and has no canonical or Open Graph URL. The local preview verifies this
behavior; hosted GitHub Pages behavior remains to be checked when deployment is
separately authorized. Configure any repository/environment
protections in GitHub. Custom domains are configured in Pages settings; this
repository has no CNAME.

Implementation and local verification do not publish or deploy the site.
