# 01: Browse the real front page and expertise introductions

**What to build:** Visitors can read Mona's complete front page, navigate to its
sections, and open an introduction to each of the four expertise areas at its
permanent destination. This first slice replaces the fictional portfolio with
real content and provides valid destinations for later detail-page work.

Use the approved Astro, TypeScript, plain CSS, Markdown, and static GitHub
Pages approach. Preserve all displayed copy word for word, including labels and
captions. The [original desktop and mobile Figma designs](https://www.figma.com/site/V4coeQ71FQamNLs5xwgJCS/Portfolio-Mona-%E2%80%93-Sites?node-id=0-1)
are the layout authority; the [published reference](https://guitar-fence-23515820.figma.site/)
has known navigation, layout, and responsive defects. Keep page composition in
code and copy/media in validated content suitable for later Pages CMS editing.
Reuse coherent visual patterns without introducing a universal page builder.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

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

- [ ] The delivered surface matches the original palette, typography, spacing,
      artwork, and intended desktop/mobile composition, and remains usable at
      intermediate widths and 320px without accidental horizontal overflow.
- [ ] Core content and navigation work without JavaScript. Any agreed enhancement
      preserves keyboard access and visible focus; images remain inline.
- [ ] Content and local assets resolve under both domain-root and repository-prefix
      hosting. Existing source and production-build checks pass, with meaningful
      verification of the behavior delivered by this ticket.
- [ ] No CMS connection or public deployment is required by this ticket. Retain
      applicable asset licenses and do not substitute invented copy or artwork.
