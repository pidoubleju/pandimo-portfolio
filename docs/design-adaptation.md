# Mona portfolio: design adaptation

Approved design interview decisions and implementation outline. The user
confirmed shared understanding and approved seven local implementation tickets.
All seven are implemented and locally verified. This document preserves the
approved requirements; [verification](design-verification.md) records the delivered
behavior and limits, and [README](../README.md) describes the working edit/build
workflow. No CMS connection or public deployment was performed.

## Agreed direction

- Adapt Mona's Figma Sites design into the portfolio repository.
- Preserve the design's colors, typography, and spacing character.
- Copy all existing content word for word. Do not rewrite or adapt copy for an
  assumed audience.
- Keep one front page for orientation, introduction, and navigation, plus four
  dedicated detail pages, each focused on an area of expertise.
- Maintain content in Markdown files with a structure suitable for eventual
  editing through Pages CMS. Repository editing is sufficient for the first version.
- Retain Astro, TypeScript, plain CSS, and static GitHub Pages hosting.
- Correct layout, navigation, and responsive behavior. The published Figma site
  contains known defects and is not the authority for intended layout or behavior.
- Aim for clean, structured code with reusable components.
- Preserve each page's composition while sharing recurring visual components.
  Centralize colors, typography, and spacing rules. Keep editable copy and media
  references in Markdown bodies and structured fields rather than Astro or HTML.
- Header destinations are front-page sections: About → introduction, Work →
  expertise previews, AFK → Away from keyboard, Contact → contact. The name links
  to the top of the front page. Use ordinary links and fragment identifiers.
- Use the desktop and mobile Figma layouts as visual targets, with flexible
  wrapping, columns, and gutters between their reference widths. Verify tablet
  and narrow desktop widths as well.
- Core content and navigation must work without JavaScript. Small scripts are
  permitted for agreed enhancements. This replaces the scaffold's blanket ban
  as a design requirement. The implementation and existing build checker now
  permit the local menu enhancement while retaining native navigation.
- Use an expandable mobile navigation menu with the existing navigation labels.
  Use Phosphor's List icon as a local raw SVG, with Regular weight as the initial
  implementation choice. Preserve its license notice.
- Keep images inline, using their designed arrangements and crops. An image
  viewer is outside the first version.
- Follow the fixed expertise sequence: Brand guidelines → Merch & brand
  experience → Paid & organic content → AI-assisted imagery. The existing
  previous-page labels refer to that sequence, not browser history. On the first
  expertise page, the previous link returns to the front-page work section.
  The final overview link returns to that section too.
- Future Pages CMS editing covers text, images, captions, and existing content
  entries. Layout remains controlled by the code.
- The new portfolio is public and has no password protection.
- Discuss the design and implementation approach together before implementation.

## References

- [Design file](https://www.figma.com/site/V4coeQ71FQamNLs5xwgJCS/Portfolio-Mona-%E2%80%93-Sites?node-id=0-1)
- [Published reference](https://guitar-fence-23515820.figma.site/)

## Reference and implementation facts

- The repository uses Astro, TypeScript, plain CSS and validated Markdown. The
  placeholder content/artwork has been replaced with the supplied portfolio.
- Static output supports GitHub Pages at a domain root or repository prefix.
  The existing build check allows local bundled enhancement modules and rejects
  inline scripts, event handlers and client hydration.
- The published homepage presents an introduction, four areas of selected work,
  an Away from keyboard section, and email contact.
- The four work links lead to brand guidelines, merch and brand experience, paid
  and organic content, and AI-assisted imagery pages. The user confirmed that
  these are expertise areas, not individual project case studies.
- Observed reference fonts are Space Grotesk Medium and Inter Regular. Observed
  text colors include coral #ff6668, near-black #111111, and gray #4b4b4b.
  Desktop/mobile Figma inspection confirmed the palette and typography; the
  original local font files and license notices are retained.
- Both the published site and the Figma design file are now accessible in the
  shared browser. The design file visibly includes desktop and narrow layouts
  for the front page and all four expertise pages.
- On the published Brand guidelines page, the About, Work, AFK, and Contact
  header links all point to `/` without fragment identifiers. This loses the
  intended section destination when returning to the front page.
- Pages CMS supports Markdown bodies, frontmatter fields, nested objects, and
  lists. Media URLs will need to respect the GitHub Pages base path both in
  structured fields and Markdown bodies.
- Published source images and Inter/Space Grotesk font files are exposed by the
  reference site. Homepage image URLs were verified to load at useful source
  resolutions. The AFK collage is one PNG; individual photos are not exposed.
  Separate images and live page text exist on the expertise pages. Their source
  dimensions and provenance are recorded with the retained original assets and
  in the per-ticket verification. The AFK source remains limited to 1155px wide.
- The Phosphor List Regular raw SVG and MIT license were read successfully from
  the official repository. No icon package or remote runtime is needed.

Pages CMS compatibility references:
[content entries](https://pagescms.org/docs/configuration/content/),
[fields](https://pagescms.org/docs/configuration/content/fields/), and
[media](https://pagescms.org/docs/configuration/media/).

Phosphor references:
[List Regular SVG](https://github.com/phosphor-icons/core/blob/main/assets/regular/list.svg)
and [license](https://github.com/phosphor-icons/core/blob/main/LICENSE).

## Implementation outline

### Pages and content

Preserve the existing reference routes, adapted to the configured GitHub Pages
base path and trailing-slash policy:

- `/`
- `/brand-guidelines/`
- `/merch-and-brand-experience/`
- `/paid-and-organic-content/`
- `/ai-assisted-imagery/`

Keep the existing static 404 page and adapt its appearance to the portfolio.
Replace the fictional project content and its routes with the real expertise
content. Each expertise area has one canonical content record; the front page
reads its preview fields rather than maintaining a second copy.

Implemented content organization:

```text
src/content/
  pages/
    home.md
    site.md
  expertise/
    brand-guidelines.md
    merch-and-brand-experience.md
    paid-and-organic-content.md
    ai-assisted-imagery.md
```

`home.md` contains the introduction, AFK, and contact content. `site.md` contains
shared identity, navigation labels, and contact details. Expertise records contain
their preview content, page introduction, metadata, sections, and media references.
Use Markdown for prose and frontmatter for named fields and structured groups.
No editable Astro, MDX, or HTML is required. Field schemas should follow the real
content patterns, with titles, captions, image paths, and alt text stored together.
Do not expose layout switches to editors.

Prepare this content structure for Pages CMS; connecting the CMS and enabling its
editing workflow remain later work. Local media paths must render correctly at
both a domain root and a GitHub Pages repository prefix, including paths in
Markdown bodies.

### Components and styling

Use one shared site shell for document metadata, header, main content, and shared
styling. Keep distinct Astro compositions for the front page and the four
expertise bodies. Extract components for actual repeated patterns, including:

- Site header and mobile navigation.
- Page introductions and expertise previews.
- Metadata groups.
- Figures with captions and paired-media layouts.
- Divided title-and-prose rows.
- Callouts for prose or statistics.
- Previous, next, overview, and back-to-top navigation.

Avoid a universal page-builder abstraction. A shared component should own a
coherent visual pattern; unique page sections may stay in their composition.
Keep content validation and URL helpers separate from presentation.

Centralize the original palette, font families and weights, type sizes and line
heights, spacing scale, content widths, and recurring radii in CSS custom
properties. Use global CSS for tokens and base styles, with component styles
alongside their Astro components. Preserve the Figma desktop and mobile
compositions, using fluid layouts between those references.

### Interaction and assets

Use ordinary page links, section anchors, email links, and a same-page top anchor.
Keep the reference header's persistent availability, accounting for its height
when scrolling to a section. Mobile navigation should expand in document flow,
support keyboard use and Escape, report its expanded state, and close after
selection. Keep its links available when JavaScript is disabled or fails.

Limit browser JavaScript to the agreed menu behavior and any necessary accessible
enhancement. Respect reduced-motion preferences for scrolling and transitions.
Revise the existing no-JavaScript build check while retaining its other checks.

Store recovered images, fonts, and the Phosphor icon locally, retaining applicable
licenses. Preserve artwork and image crops; optimize delivery without visible
changes. Keep image dimensions explicit, avoid loading below-fold images eagerly,
and preserve full-resolution sources where available. The AFK collage remains a
single image. Add descriptive alt text where necessary without changing displayed
copy. Verify all reference media during import; surface any missing source rather
than substituting invented artwork.

### Implementation order and completion criteria

1. Capture the approved reference copy and asset inventory for all five pages.
2. Establish local assets, design tokens, site shell, and working navigation.
3. Migrate the front-page content and composition.
4. Migrate the four expertise pages using the shared patterns above.
5. Verify responsive layouts and interaction behavior, then run repository checks.

Completion means:

- All existing displayed copy, captions, and labels match the reference word for
  word. Exclude text baked into artwork from live-text comparisons.
- All five pages match the intended Figma layouts at the desktop and mobile
  reference widths. Intermediate widths and 320px-wide screens have usable
  navigation and readable content without accidental horizontal scrolling.
- Header, in-page, previous/next, overview, email, and back-to-top links work from
  every relevant page, including direct detail-page visits.
- The menu works with keyboard and touch. Core content and navigation work with
  JavaScript disabled; focus remains visible and headings/images are accessible.
- All assets are local and load successfully. Root and repository-prefixed builds
  both resolve content links and media correctly.
- The existing validation pipeline passes after its JavaScript policy is revised.
  Visual comparison and manual navigation verification supplement automated
  checks; tests target meaningful interaction and content risks.
- Pages CMS is not required to run or publish the first version. The content files
  remain compatible with the planned editing workflow.

Implementation approval does not itself request publication or deployment.

## Design tree

First round resolved:

1. Copy is fixed; audience-based content changes are outside this adaptation.
2. Front page plus four thematic expertise detail pages.
3. Repository-managed Markdown now; Pages CMS compatibility for later.
4. Existing Astro/static-hosting foundation retained.

Second round resolved:

5. Shared components with distinct page compositions and editable content fields.
6. Header links target the appropriate front-page sections from every page.
7. Desktop/mobile design references with flexible behavior between them.
8. Core content/navigation without JavaScript; agreed enhancements may use scripts.

Third round resolved:

9. Expandable mobile menu using the Phosphor List SVG.
10. Inline imagery; no image viewer in the first version.
11. Fixed expertise sequence for previous/next navigation.
12. CMS content editing with layouts controlled by code.
13. Public access without password protection.

No interview decisions remain open. The user confirmed the implementation
outline and requested a ticket breakdown.

Resolved domain terms are captured in GLOSSARY.md. The two ADRs record editable
content/page composition and core navigation without JavaScript. All five pages
and the recovery page are complete; later CMS setup and deployment remain separate
work. The completed ticket checklist and verification record preserve any limits.
