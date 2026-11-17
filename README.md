# Mona portfolio

A static portfolio built with Astro, TypeScript, plain CSS, and Markdown. The
published site ships no browser JavaScript. Identity, links, illustrations, and
case studies are placeholders ready to replace.

## Run locally

Use Node **24.22.3 LTS** (pinned in `.nvmrc` and `engines`) and Yarn **4.18.1**.
With [nvm](https://github.com/nvm-sh/nvm) installed:

```sh
nvm install
nvm use
corepack enable
yarn install --immutable
yarn dev
```

Open <http://localhost:4321>. `yarn build` writes static files to `dist/`;
`yarn preview` serves that build. No database, CMS, or application secrets are
required. If your Node installation lacks Corepack, install
[Corepack](https://yarnpkg.com/corepack) first.

## Make it yours

- Edit `src/data/site.ts` for the name, role, description, email, and social links.
  The current email and social destinations are deliberately placeholders.
- Edit `src/pages/index.astro` for the introduction and about copy.
- Edit `src/styles/global.css` for colours, typography, and layout.
- Replace `public/favicon.svg` and the sample illustrations in `public/images/`.

System fonts and local SVG artwork keep the starter self-contained. There are no
external fonts, analytics, hydration directives, or client-side navigation.

## Add a project

Create a lowercase, hyphenated Markdown filename directly inside
`src/content/projects/`, for example `your-project.md`. Copy an existing project
and replace its frontmatter and body:

```markdown
---
title: Your project
summary: A short description for the grid and page metadata.
category: Visual identity
year: 2026
role: Design & art direction
cover: /images/your-project.svg
coverAlt: Describe what the project cover shows.
order: 4
draft: false
---

## The brief

Describe the problem and your contribution.

## The approach

Explain the choices behind the work.

## The outcome

Share the result and what you learned.
```

Put the cover file in `public/images/`. All shown frontmatter fields are required
except `draft`, which defaults to `false`; `summary` has a 240-character limit.
Projects appear by ascending `order`, then filename. The filename becomes the URL:
`your-project.md` → `/projects/your-project/`. Rename it only if you intend to
change that URL. Nested project directories and custom frontmatter slugs are not
part of this starter.

`draft: true` removes a project from both the grid and generated routes, including
in local development. All published projects share `ProjectLayout.astro`.
`src/content.config.ts` validates the content schema during builds.

For links between projects in Markdown, use relative URLs such as
`[another project](../still/)`. For inline images use relative URLs such as
`![Description](../../images/your-image.svg)`. These resolve correctly both at the
domain root and under a repository path. Avoid `/images/...` or `/projects/...`
in Markdown body links: those bypass a GitHub Pages repository prefix. The
frontmatter `cover` field is automatically prefixed by the template.

## Checks

```sh
yarn validate  # all checks, production build, and generated-site verification
yarn format    # apply formatting
yarn lint:fix  # fix eligible lint issues
```

| Command                   | Effective coverage                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn typecheck`          | Astro diagnostics for templates and frontmatter, plus `tsc --noEmit` for all authored TypeScript, config, and scripts. Uses Astro's `strictest` preset, including strict null checks and unchecked index access.                                                                                                                                                        |
| `yarn lint`               | Zero warnings. Type-aware `strictTypeChecked` rules for `.ts`; Astro recommended and accessibility rules for `.astro`. Unused imports/variables, sorted imports/exports, and the two xrealm regexp rules apply to both. Exhaustive switches and invalid-void checks apply to `.ts`.                                                                                     |
| `yarn format:check`       | xrealm's formatting settings across TS, Astro, CSS, Markdown, JSON, and YAML. SVG assets have no Prettier parser. The supplied `spec.md`, generated files, and lockfile are excluded.                                                                                                                                                                                   |
| `yarn check:unused`       | Knip's Astro, ESLint, and Prettier integrations follow framework entry points and component imports, and check unused files, exports, and dependencies. Runtime-loaded tooling is detected through the integrations; no dependency ignores are needed. Markdown content and public assets are not unused-code candidates.                                               |
| `yarn check:dependencies` | Dependency Cruiser rejects cycles and imports from data/helpers into UI modules. It follows TypeScript/config/script imports; it does **not** parse `.astro`, Markdown, or CSS. Astro template resolution is checked by Astro and Knip, not by this command.                                                                                                            |
| `yarn check:build`        | Requires a preceding build with the same environment. Parses every HTML page; checks home/404 output, local links/assets/fragments, nonempty page titles, canonical URLs on indexable pages, descriptions, language, image alt text, 404 indexing, and absence of JavaScript output, script tags, hydration, or inline handlers. External destinations are not fetched. |

`yarn check` runs all source checks without a production build. CSS is formatted;
there is no Stylelint policy in the source xrealm configuration to carry over.
Astro templates receive syntax, accessibility, and unused-import checks plus
Astro's TypeScript diagnostics; **type-aware ESLint rules apply only to `.ts`**.
Next.js, React, Payload, generated-registry exceptions, and theme-specific
dependency rules do not apply to this repository. No blanket file exclusions are
used to disguise missing framework coverage.

CI validates both `/` and `/portfolio-check/` builds. To reproduce the latter:

```sh
SITE_URL=https://example.com BASE_PATH=/portfolio-check/ yarn build
SITE_URL=https://example.com BASE_PATH=/portfolio-check/ yarn check:build
BASE_PATH=/portfolio-check/ yarn preview
```

The default build uses `https://example.com` for canonical URLs. For a manual
production build, set `SITE_URL` to the origin (no repository path) and `BASE_PATH`
to `/` or `/repository-name/`, including both slashes. These are build-time shell
environment variables, not browser secrets or automatically loaded `.env` values.

## GitHub Pages

1. Push this repository to GitHub with a `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as
   the source. Ensure Actions are enabled for the repository.
3. Push to `main` or run **Validate and deploy** manually from the Actions tab.

Pull requests run checks and both build variants without deploying. Pushes to
`main` must pass those jobs before a Pages artifact is built and deployed. The
workflow reads the actual origin and base path with `actions/configure-pages`,
so project sites (`/repository/`), account sites (`/`), and Pages-configured custom
domains use the correct links and canonical URLs. For a custom domain, configure
and verify it in Pages settings before rebuilding; this starter has no CNAME.

Only the deployment job receives `pages: write` and `id-token: write`. Deployment
uses the `github-pages` environment and serializes publishing. Configure required
status checks and environment protection rules in GitHub as desired. Builds cannot
configure those repository settings themselves. GitHub serves `dist/404.html` for
missing paths; its home links remain rooted at the configured base.

## Scope and sources

The initial scaffold follows the available `spec.md`, which ends mid-sentence in
the runtime section. Applicable linting, formatting, Knip, and Dependency Cruiser
policies were read from the adjacent `xrealm-website` repository and adapted here;
that repository was not modified. Astro 7.4.12 is pinned to the stable release
available when this scaffold was created. Node 24 is a supported LTS line.
Yarn's lockfile pins transitive dependencies as well as direct versions.

- [Astro installation](https://docs.astro.build/en/install-and-setup/)
- [Astro content collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro on GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [Astro ESLint integration](https://ota-meshi.github.io/eslint-plugin-astro/user-guide/)
- [Knip Astro support](https://knip.dev/reference/plugins/astro)
- [Node release schedule](https://github.com/nodejs/Release)

Final branding and copy, advanced galleries, animations, filtering, translation,
analytics, contact processing, and CMS installation are deferred. Pages CMS could
be added later on top of the same Markdown files.
