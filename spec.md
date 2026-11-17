# Portfolio project: initial scaffolding

Date: 2026-11-17

## Outcome

Create a standalone portfolio repository using Astro, plain CSS, Markdown project
content, and automatic GitHub Pages deployment. A developer can clone the
repository, run it locally, add a project by editing Markdown, and publish by
pushing to `main`. The public site works without browser JavaScript.

Carry over the applicable strict linting, formatting, unused-code, and dependency
analysis policies from the xrealm website. Adapt framework integrations to Astro;
keep their effective coverage explicit.

This document specifies future implementation in a separate repository. It does
not authorize replacing or restructuring the existing xrealm application.

## Scope

Initial delivery includes:

- A reproducible Astro/TypeScript development environment.
- A simple responsive portfolio shell with placeholder identity and content.
- A homepage with an introduction, project grid, and contact/social links.
- A shared project-detail template populated from Markdown.
- A static 404 page.
- Strict code-quality configuration and checks required before deployment.
- GitHub Actions for pull-request validation and deployment from `main`.
- Documentation for development, content editing, checks, and Pages setup.

Defer final branding, finished portfolio copy, advanced galleries, animations,
filtering, multilingual content, analytics, contact-form processing, and CMS
installation. Pages CMS remains an optional later editing layer over these files.

## Runtime and repository setup

- Use Astro's supported stable release at implementation time with static output
  to `dist/`. Do not add an SSR adapter, server API, React integration, Tailwind,
  CSS-in-JS, or Sass to the initial scaffold.
- Use ESM and TypeScript for authored application logic, configuration, and helper
  scripts where the tool supports it. CJS tool configuration is permitted.
- Use Yarn 4 with `nodeLinker: node-modules`, a committed `yarn.lock`, and an exact
  `packageManager` version. CI installs with `yarn install --immutable`.
- Pin a supported Node LTS release in `.nvmrc`; align `engines`, local
  documentation, and CI. The source repository's Node 25 requirement is specific
