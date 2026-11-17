# 07: Complete navigation, recovery and static-hosting verification

**What to build:** Visitors can enter any finished portfolio page directly,
navigate the complete site, and recover from an unknown address when hosted at
either a domain root or a GitHub Pages repository prefix.

Use the approved Astro, TypeScript, plain CSS, Markdown, and static GitHub
Pages approach. Preserve all displayed copy word for word, including labels and
captions. The [original desktop and mobile Figma designs](https://www.figma.com/site/V4coeQ71FQamNLs5xwgJCS/Portfolio-Mona-%E2%80%93-Sites?node-id=0-1)
are the layout authority; the [published reference](https://guitar-fence-23515820.figma.site/)
has known navigation, layout, and responsive defects. Keep page composition in
code and copy/media in validated content suitable for later Pages CMS editing.
Reuse coherent visual patterns without introducing a universal page builder.

**Blocked by:**

- 02 — Use an accessible expandable mobile menu.
- 03 — Read the complete Brand guidelines expertise page.
- 04 — Read the complete Merch & brand experience expertise page.
- 05 — Read the complete Paid & organic content expertise page.
- 06 — Read the complete AI-assisted imagery expertise page.

**Status:** complete

- [x] The static 404 page uses the portfolio's visual system and offers functional
      recovery navigation at both hosting path shapes.
- [x] Verify all header, in-page, fixed previous/next, overview, email and top
      destinations across all five completed pages, including direct detail-page
      entry and browser back/forward navigation.
- [x] Root and repository-prefixed production builds resolve every local asset,
      Markdown-body URL, structured media path and content link. Page titles,
      descriptions, language, canonicals, indexing and 404 metadata are correct.
- [x] Compare all five pages to the intended desktop/mobile Figma layouts and
      check intermediate widths and 320px-wide screens for overflow, legibility,
      image crops and persistent-header overlap. Fix integration defects found.
- [x] Verify keyboard and touch operation, visible focus, headings, alt text,
      reduced motion, and core navigation with JavaScript disabled.
- [x] Verify displayed copy against the approved references and confirm every
      image/font/icon is local. No image viewer or password protection is added.
- [x] Complete the existing validation pipeline and document any material limits
      in visual or source-quality verification. Do not deploy as part of this ticket.
- [x] Document the actual Markdown editing workflow and how the content structure
      supports later Pages CMS text/media editing without requiring CMS access or
      exposing layout controls. No CMS integration is installed in this version.

- [x] The delivered surface matches the original palette, typography, spacing,
      artwork, and intended desktop/mobile composition, and remains usable at
      intermediate widths and 320px without accidental horizontal overflow.
- [x] Core content and navigation work without JavaScript. Any agreed enhancement
      preserves keyboard access and visible focus; images remain inline.
- [x] Content and local assets resolve under both domain-root and repository-prefix
      hosting. Existing source and production-build checks pass, with meaningful
      verification of the behavior delivered by this ticket.
- [x] No CMS connection or public deployment is required by this ticket. Retain
      applicable asset licenses and do not substitute invented copy or artwork.

Verification and limits: [final integration record](../../../docs/design-verification.md#ticket-07-navigation-recovery-and-static-hosting).
