# Design adaptation: approved ticket breakdown

The user approved this seven-ticket breakdown. Tickets are published as one local
file each with status `ready-for-agent`, based on the approved design adaptation
specification, glossary, and content-composition and progressive-enhancement ADRs.
Only ticket 01 can start immediately; other tickets retain their blocking edges.
Application implementation has not started.

## Published tickets

- [01: Browse the real front page and expertise introductions](../.scratch/design-adaptation/issues/01-front-page-and-expertise-introductions.md)
- [02: Use an accessible expandable mobile menu](../.scratch/design-adaptation/issues/02-accessible-mobile-menu.md)
- [03: Read the complete Brand guidelines expertise page](../.scratch/design-adaptation/issues/03-brand-guidelines.md)
- [04: Read the complete Merch & brand experience expertise page](../.scratch/design-adaptation/issues/04-merch-and-brand-experience.md)
- [05: Read the complete Paid & organic content expertise page](../.scratch/design-adaptation/issues/05-paid-and-organic-content.md)
- [06: Read the complete AI-assisted imagery expertise page](../.scratch/design-adaptation/issues/06-ai-assisted-imagery.md)
- [07: Complete navigation, recovery and static-hosting verification](../.scratch/design-adaptation/issues/07-navigation-recovery-and-hosting.md)

## Shared acceptance requirements

Every ticket preserves existing displayed copy word for word and uses the
original design as its visual reference. Layout belongs to Astro compositions
and reusable components; editable copy and media belong to validated Markdown
content and structured fields suitable for future Pages CMS editing. No CMS
connection is required for the first version.

Each delivered surface must work at its desktop and mobile Figma reference
widths and at intermediate widths, preserve keyboard access, load local media,
respect the configured base path, and keep the existing validation checks green.
Verification should cover meaningful behavior and content risks rather than
mirror implementation details. Core content and navigation work without browser
JavaScript. Images remain inline. No ticket authorizes public deployment.

## 01: Browse the real front page and expertise introductions

**What to build:** Visitors can read Mona's complete front page, navigate to its
sections, and open an introduction to each of the four expertise areas at its
permanent destination. This first slice replaces the fictional portfolio with
real content and provides valid destinations for later detail-page work.

**Blocked by:** None (can start immediately).

- [ ] The full front page includes the unchanged introduction, all four expertise
      previews, AFK artwork and copy, contact details, and existing labels.
- [ ] Each preview links to a real expertise page with its unchanged introduction
      and metadata. These pages are explicitly the first slice of the final pages;
      their complete body sections are delivered by tickets 03–06.
- [ ] Expertise preview and introduction fields come from one canonical record
      per area. An editor can change a preview field without editing a template
      or maintaining duplicate copies of that field.
- [ ] Shared identity and navigation copy are editable content. Header links
      reach the correct front-page sections from every route. Name, email, top,
      overview, and fixed-sequence previous/next links have valid destinations.
- [ ] Original local fonts, images, palette, type and spacing rules reproduce the
      front-page reference layouts, with fluid behavior between them. Preserve
      the AFK collage as a single image and retain applicable asset licenses.
- [ ] Replace fictional project content and routes without leaving broken local
      links. The static 404 page retains usable recovery navigation.
- [ ] The navigation is visible and usable on narrow screens without scripts.
      Expandable mobile behavior is added by ticket 02.
- [ ] Copy and media are checked against the references. Source-resolution
      limitations or missing assets are documented instead of replaced with
      invented content. The production build and existing checks pass.

## 02: Use an accessible expandable mobile menu

**What to build:** On narrow screens, visitors can expand the existing navigation,
choose a destination, and return to the page content using touch or keyboard.

**Blocked by:** 01 — Browse the real front page and expertise introductions.

- [ ] The mobile menu uses a locally stored Phosphor List SVG and retains its
      license notice. Desktop navigation preserves the reference presentation.
- [ ] The menu expands in document flow, reports its expanded state, supports
      keyboard use and Escape, and closes after a destination is selected.
- [ ] Focus remains visible and is managed sensibly when the menu closes. The
      persistent header does not obscure targeted sections.
- [ ] All core links remain available with JavaScript disabled or failing.
- [ ] The build checks accept the agreed small menu script while retaining
      metadata, accessibility, link, asset, and other existing checks. Remove the
      obsolete blanket ban without disabling unrelated validation.
- [ ] Verify touch, keyboard, reduced-motion behavior, resizing between desktop
      and mobile, and menu use from both front-page and expertise-page routes.

## 03: Read the complete Brand guidelines expertise page

**What to build:** Visitors can explore Mona's sevdesk and Shine guideline work,
jump to either brand section, and continue through the expertise sequence.

**Blocked by:** 01 — Browse the real front page and expertise introductions.

- [ ] Migrate every existing body section, role statement, list, caption, callout,
      cross-link, and image with unchanged displayed copy.
- [ ] The sevdesk and Shine jump links target their respective sections using
      native anchors, including with JavaScript disabled.
- [ ] Preserve the distinct desktop and mobile compositions, image treatment,
      content hierarchy, and spacing with flexible intermediate layouts.
- [ ] Text, structured groups, and media references are editable in validated
      Markdown content; editing does not require Astro, MDX, HTML, or layout
      controls. Reuse existing visual patterns and extract actual repetitions.
- [ ] Recover and verify the original media, keep assets local with dimensions
      and appropriate alt text, and retain available source quality.
- [ ] The previous link returns to the front-page work section, the next link
      opens Merch & brand experience, and body/header/top links work on direct
      visits. Copy, layout, link, and build checks pass.

## 04: Read the complete Merch & brand experience expertise page

**What to build:** Visitors can explore the sevdesk and Shine merchandise and
offline brand work, including paired imagery and the event outcome.

**Blocked by:** 01 — Browse the real front page and expertise introductions.

- [ ] Migrate all existing sections, metadata, production credits, captions,
      callout content, and page labels word for word.
- [ ] Reproduce the two brand sections, paired images and text, and the event
      outcome callout with their intended desktop and mobile arrangements.
- [ ] Content and media use validated Markdown records and suitable structured
      groups. Reuse shared figures, metadata and navigation where applicable;
      preserve the page's own composition.
- [ ] Original images are local, correctly sized and cropped, and have appropriate
      alt text. Delivery preserves appearance and available source quality.
- [ ] Previous navigation opens Brand guidelines and next navigation opens Paid
      & organic content. Header, overview and top links work without JavaScript.
- [ ] Verify exact copy, responsive layouts, direct-route access, base-path media
      and links, and passing repository checks.

## 05: Read the complete Paid & organic content expertise page

**What to build:** Visitors can inspect the campaign examples, understand Mona's
contribution, and read the existing outcome statistics.

**Blocked by:** 01 — Browse the real front page and expertise introductions.

- [ ] Migrate all existing prose, headings, metadata, captions, contribution rows,
      statistics, notes and navigation labels word for word.
- [ ] Preserve the campaign presentation panels, portrait creative arrangement,
      divided contribution rows and three-stat callout across reference layouts.
- [ ] Content and associated media are editable through validated Markdown
      records and structured fields; layout remains in the page composition and
      recurring patterns use shared components.
- [ ] Recover the distinct original creative images rather than flattening page
      text into artwork. Keep assets local with dimensions, appropriate alt text,
      and the original visual quality and crop.
- [ ] Previous navigation opens Merch & brand experience and next navigation opens
      AI-assisted imagery. Other links work from a direct page visit without
      JavaScript.
- [ ] Verify exact copy, responsive layouts, root and prefixed links/media, and
      passing repository checks.

## 06: Read the complete AI-assisted imagery expertise page

**What to build:** Visitors can view the illustration and read Mona's perspective,
working approach, and guiding principle, then explore more work or contact her.

**Blocked by:** 01 — Browse the real front page and expertise introductions.

- [ ] Migrate the complete existing body, including the illustration and caption,
      point of view, four approach rows, principle callout and footer copy without
      rewriting any displayed text.
- [ ] Preserve the page's full-width illustration, divided rows, callout and
      desktop/mobile hierarchy with flexible intermediate layouts.
- [ ] Copy, groups and media references live in validated Markdown content. Reuse
      existing row, figure and callout patterns where applicable while keeping
      the distinct page composition.
- [ ] The original illustration is local with explicit dimensions and appropriate
      alt text; it retains its designed crop and source quality.
- [ ] Previous navigation opens Paid & organic content. The overview link reaches
      the front-page work section, the contact link opens the existing email
      destination, and header/top links work without JavaScript.
- [ ] Verify exact copy, responsive layouts, direct-route access, root and
      prefixed links/media, and passing repository checks.

## 07: Complete navigation, recovery and static-hosting verification

**What to build:** Visitors can enter any finished portfolio page directly,
navigate the complete site, and recover from an unknown address when hosted at
either a domain root or a GitHub Pages repository prefix.

**Blocked by:**

- 02 — Use an accessible expandable mobile menu.
- 03 — Read the complete Brand guidelines expertise page.
- 04 — Read the complete Merch & brand experience expertise page.
- 05 — Read the complete Paid & organic content expertise page.
- 06 — Read the complete AI-assisted imagery expertise page.

- [ ] The static 404 page uses the portfolio's visual system and offers functional
      recovery navigation at both hosting path shapes.
- [ ] Verify all header, in-page, fixed previous/next, overview, email and top
      destinations across all five completed pages, including direct detail-page
      entry and browser back/forward navigation.
- [ ] Root and repository-prefixed production builds resolve every local asset,
      Markdown-body URL, structured media path and content link. Page titles,
      descriptions, language, canonicals, indexing and 404 metadata are correct.
- [ ] Compare all five pages to the intended desktop/mobile Figma layouts and
      check intermediate widths and 320px-wide screens for overflow, legibility,
      image crops and persistent-header overlap. Fix integration defects found.
- [ ] Verify keyboard and touch operation, visible focus, headings, alt text,
      reduced motion, and core navigation with JavaScript disabled.
- [ ] Verify displayed copy against the approved references and confirm every
      image/font/icon is local. No image viewer or password protection is added.
- [ ] Complete the existing validation pipeline and document any material limits
      in visual or source-quality verification. Do not deploy as part of this ticket.
- [ ] Document the actual Markdown editing workflow and how the content structure
      supports later Pages CMS text/media editing without requiring CMS access or
      exposing layout controls. No CMS integration is installed in this version.

## Dependency notes

Ticket 01 is the starting frontier. Tickets 02–06 depend only on its delivered
content, routes and shell; they do not block each other merely because shared
components may be touched. Reuse whichever components already exist when a
ticket is implemented. Ticket 07 integrates and verifies every finished surface.

No separate speculative prefactor is needed: the first real slice replaces the
placeholder model and exercises the new content/presentation boundaries in a
working user journey. Each subsequent slice must remain buildable and verified;
ticket 07 does not defer basic correctness or responsive work from those slices.
