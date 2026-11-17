# 02: Use an accessible expandable mobile menu

**What to build:** On narrow screens, visitors can expand the existing navigation,
choose a destination, and return to the page content using touch or keyboard.

Use the approved Astro, TypeScript, plain CSS, Markdown, and static GitHub
Pages approach. Preserve all displayed copy word for word, including labels and
captions. The [original desktop and mobile Figma designs](https://www.figma.com/site/V4coeQ71FQamNLs5xwgJCS/Portfolio-Mona-%E2%80%93-Sites?node-id=0-1)
are the layout authority; the [published reference](https://guitar-fence-23515820.figma.site/)
has known navigation, layout, and responsive defects. Keep page composition in
code and copy/media in validated content suitable for later Pages CMS editing.
Reuse coherent visual patterns without introducing a universal page builder.

**Blocked by:** 01 — Browse the real front page and expertise introductions.

**Status:** implemented; review and final runtime gate pending

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
