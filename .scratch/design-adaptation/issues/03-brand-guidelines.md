# 03: Read the complete Brand guidelines expertise page

**What to build:** Visitors can explore Mona's sevdesk and Shine guideline work,
jump to either brand section, and continue through the expertise sequence.

Use the approved Astro, TypeScript, plain CSS, Markdown, and static GitHub
Pages approach. Preserve all displayed copy word for word, including labels and
captions. The [original desktop and mobile Figma designs](https://www.figma.com/site/V4coeQ71FQamNLs5xwgJCS/Portfolio-Mona-%E2%80%93-Sites?node-id=0-1)
are the layout authority; the [published reference](https://guitar-fence-23515820.figma.site/)
has known navigation, layout, and responsive defects. Keep page composition in
code and copy/media in validated content suitable for later Pages CMS editing.
Reuse coherent visual patterns without introducing a universal page builder.

**Blocked by:** 01 — Browse the real front page and expertise introductions.

**Status:** complete

- [x] Migrate every existing body section, role statement, list, caption, callout,
      cross-link, and image with unchanged displayed copy.
- [x] The sevdesk and Shine jump links target their respective sections using
      native anchors, including with JavaScript disabled.
- [x] Preserve the distinct desktop and mobile compositions, image treatment,
      content hierarchy, and spacing with flexible intermediate layouts.
- [x] Text, structured groups, and media references are editable in validated
      Markdown content; editing does not require Astro, MDX, HTML, or layout
      controls. Reuse existing visual patterns and extract actual repetitions.
- [x] Recover and verify the original media, keep assets local with dimensions
      and appropriate alt text, and retain available source quality.
- [x] The previous link returns to the front-page work section, the next link
      opens Merch & brand experience, and body/header/top links work on direct
      visits. Copy, layout, link, and build checks pass.

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
