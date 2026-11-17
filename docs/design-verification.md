# Design adaptation verification

## Ticket 01: front page and expertise introductions

The original Figma Sites file was accessible in the signed-in shared browser.
The Home primary desktop frame is labelled `1280 +`, with an 880px content column,
200px gutters at 1280px, 72px header gutters, and a 475.42 × 420.57px portrait
crop. Its mobile frame is labelled `1 - 1279`: a single column, 44px gutters,
28px headings, stacked introduction links and the same artwork/copy hierarchy.
The implementation keeps the single column, uses fluid gutters at intermediate
widths, and switches type/navigation arrangements when the available width needs
it. It deliberately repairs the published mobile header’s severe text wrapping.
Ticket 02 adds the agreed expandable menu.

The desktop and mobile designs were visually inspected on the Figma canvas at
50% zoom. Primary desktop hero, expertise preview crops, coral labels, typography,
work divider, AFK collage, contact hierarchy and fixed-sequence navigation were
compared to the source. Published reference DOM measurements supplemented the
canvas; its broken mobile navigation and section links were not copied.
The recovered palette is paper `#f7f5f2`, ink `#111111`, coral `#ff6668`, muted
`#4b4b4b`. Fonts are the original Space Grotesk and Inter files.

`docs/reference-inventory.json` preserves the text and original media URLs for
all five source pages. Some pages contain hidden desktop/mobile duplicates;
`text` is the source’s visible copy and `paragraphs` preserves both responsive
variants where present. Do not migrate duplicate hidden copies. Live text remains
live text, including the home preview bullets; text baked into artwork is artwork.

Home sources were fetched at full available resolution: portrait 1080 × 1620,
sevdesk SVG 880 × 563.444, merchandise 4096 × 2867, social grid 2250 × 1922,
laptop illustration 2688 × 1792, grain overlay 3000 × 4000, and AFK collage
1155 × 576. Original bitmaps remain in
`.scratch/design-adaptation/source-assets/home/`; local WebP delivery variants
use a maximum width of 1760px and quality 95. The portrait retains its original
JPEG, which is smaller than its WebP variant. The AFK collage is one image, not
reconstructed individual photos; its available 1155px source cannot provide more
detail than the original. Retain the original grain overlay, rather than replacing
it with generated noise. Artwork has no separate downloadable license notice in
the reference; it is the supplied portfolio work, not claimed as open-license art.
The two local font families retain their upstream OFL notices in `public/licenses`.

This ticket delivers each expertise introduction and its original metadata as a
first slice. Brand guidelines has no generic metadata group; its sevdesk/Shine
exploration cards and complete body belong to ticket 03. Other expertise bodies
belong to tickets 04–06. All four destinations and the fixed previous/next/overview
sequence work already. There are no fictional `/projects/` routes or assets left.

Verification uses the existing repository checks and browser inspection only,
as requested by the user. No test suite or extra verifier coverage was added.
The existing production checker remains unchanged in this ticket. The source
runtime was checked at 1280px, 768px, 390px and 320px: no horizontal overflow,
readable content, visible navigation, local images and original fonts. Core links
are native anchors; this ticket emits no browser JavaScript.

The Figma canvas provides visual reference access, but no exported design-token
bundle or automated pixel-diff baseline. Exact desktop/mobile pixel equivalence
has not been asserted. No missing home asset was replaced with invented material.

## Ticket 01 code review

The implement skill’s two-axis review compared baseline
`b131a4d5a2729ceae18beb6e4457938ddacca966` to implementation `01d4ee3`.

### Standards

One low-priority documented finding: recurring typography, spacing and line-height
values in components should use centralized tokens. Resolved by adding the
missing scale tokens and applying them to recurring component rules. The reviewer
also noted the two-line heading renderer shared by home and expertise introductions
as optional duplication; it stays local because a new component would add an
interface for two trivial lines without clarifying either composition.

### Spec

No actionable findings within ticket 01 scope. Exact copy, canonical preview
records, native destinations, local assets and licensed fonts match the captured
reference. Full bodies and the expandable menu remain correctly deferred.

Review totals: Standards 1 low finding resolved, 1 optional heuristic retained;
Spec 0 findings. Existing source/production checks pass after the token change.

## Ticket 02: expandable mobile navigation

The shared header progressively enhances its ordinary navigation links with a
Phosphor List Regular toggle below 701px. The original desktop header layout and
copy are retained. The SVG is stored in `src/assets/icons/list.svg`, imported as
an Astro SVG component, and carries its upstream MIT notice in
`public/licenses/Phosphor-MIT.txt`. Source:
[Phosphor List Regular](https://github.com/phosphor-icons/core/blob/main/assets/regular/list.svg).

The toggle remains hidden and navigation visible in the server output. Only
successful script initialization enables collapsing. At 320px the enhanced
closed header is 92px high and expands to 152px in document flow; the icon button
is 44 × 44px and navigation links have 44px height. A ResizeObserver maintains
the real sticky-header scroll offset independently of its minimum height.

Browser verification covered 320px, 390px, 768px and 1280px widths without
horizontal overflow; pointer activation; Enter/Space, Tab and Escape; visible
focus; focus returning to the toggle on Escape; section focus after same-page
selection; and focus recovery when resizing across the breakpoint. Selecting
Work closes the menu and positions the section below the header. Direct Brand
guidelines entry followed by Contact reaches the front-page contact section.
The desktop navigation remains visible and the toggle hidden.

An actual script-disabled, same-origin sandbox iframe (`allow-same-origin`
without `allow-scripts`) retained all four visible navigation links and hid the
toggle. Its AFK link navigated with a native fragment and its 320px layout did
not overflow. This checks the fallback without pretending that removing an
already-executed script disables its effects.

The menu has no animation or transition. The existing smooth-scroll rule remains
inside `prefers-reduced-motion: no-preference`. Its CSS guard was inspected;
the preview tools do not expose operating-system reduced-motion emulation or a
physical touchscreen, so those hardware/settings combinations were not tested.
Pointer interaction and target dimensions were checked in the browser.

The production verifier's blanket JavaScript prohibition was replaced only with
permission for local bundled enhancement modules. Inline scripts, inline event
handlers and client hydration remain rejected; metadata, language, local URL,
image-description, fragment, canonical and 404 checks remain intact. Astro's
asset inlining is disabled so the small shared module stays external and
cacheable across pages. No test or extra verifier coverage was added.

`yarn validate` passes. A `/portfolio-check/` production build and existing
`check:build` pass; a separately mounted preview also loaded the prefixed menu
module and navigated from `/portfolio-check/brand-guidelines/` to
`/portfolio-check/#work` with the menu closed. Production output is restored to
domain-root hosting before handoff. No deployment or CMS connection was made.

## Ticket 02 code review

The implement skill's fresh-context, parallel two-axis review compared
`2e48f5de152409925d7e80e58ed1d9ce942522f9` to candidate `5b5acb6`.

### Standards

No documented-standard violations or actionable baseline smells. The shared
header owns the menu behavior and styles; native navigation and server-visible
fallback links satisfy the progressive-enhancement ADR. Local assets, retained
license, centralized tokens and the focused script-policy revision follow the
repository requirements.

### Spec

No actionable findings. The expandable menu, keyboard and focus behavior,
breakpoint changes, local icon/license, script policy and hosting verification
match ticket 02. The limits of pointer and reduced-motion verification are
recorded accurately rather than presented as physical-device testing.

Review totals: Standards 0 findings; Spec 0 findings. The root agent's final
production runtime gate also passed at 320px: local module loaded, no overflow,
toggle expansion, Escape collapse, and focus returned to the menu button.
