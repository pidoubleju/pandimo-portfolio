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

## Ticket 03: complete Brand guidelines

The Brand desktop and mobile Figma frames were inspected on the signed-in canvas,
including the desktop introduction, scope media, access rows and Shine template
callout, and the mobile scope/access composition at 50% zoom. The desktop keeps
an 880px column, two exploration columns, numbered work rows, three scope columns
and three 272 × 340 media tiles. Mobile stacks the exploration, numbered rows,
scope groups, access rows, learning columns and template groups. Its brand panels
are square, and the palette and typography tiles stack; the decorative purple
shape tile is deliberately absent from the original mobile composition. Flexible
gutters and media proportions bridge the reference widths.

All copy, roles, labels, captions, lists, callouts, and media references live in
validated named `brandGuidelines` fields in the canonical Markdown record. The
Astro page owns this page's composition. `ContentRows`, `ContentGroups`, `BrandIntroduction`, and
`BrandFigure` share the actual repeated row, grouped-detail and logo-panel
patterns; they do not expose layout controls to content editors. The rendered
main text matches the captured reference word for word after whitespace
normalization, including the two-line Shine heading and the original role text.
No hidden responsive copy is repeated.

Six original artwork assets are local. The colour palette is 2059 × 1652, the
headline artwork 1029 × 546, its specification line 830 × 93, the Shine logo
708 × 158, and the two SVGs retain their original vectors (467.168 × 129.017 and
272 × 340 view boxes). Original files, the source's additional mobile sevdesk SVG,
source URLs and SHA-256 hashes remain in
`.scratch/design-adaptation/source-assets/brand/`. The three palette/typography
PNGs use lossless WebP delivery; SVGs and the Shine PNG are delivered unchanged.
All six rendered images have explicit dimensions and descriptive alt text and
load lazily. The desktop sevdesk vector scales to the mobile logo treatment.
No separate artwork license notice was exposed by the supplied portfolio source;
its artwork is retained as supplied, with no invented replacement or claim of an
open license. Existing font and icon license notices remain retained.

Existing source checks, `yarn validate`, and the `/portfolio-check/` production
build and `check:build` pass. Browser inspection covered 1280px, 768px, 390px and
320px without horizontal overflow, using both the source runtime and production
output. The prefixed direct route loaded its local menu module, both original
font families, and all six artwork URLs returned HTTP 200. Native exploration
links reach `#sevdesk` and `#shine`, with the headings approximately 116px below
the viewport top and the enhanced header 92px high. The body cross-link opens the
prefixed Paid & organic content route. Header, previous, next and top targets
also pass the existing local URL/fragment production check; the root agent
checked direct-entry header navigation and the Shine anchor in the source runtime.

A same-origin sandbox iframe without `allow-scripts` provided an actual
script-disabled check at 320px under the repository prefix: all body content and
native links remained, the menu toggle stayed hidden, and both exploration links
reached their sections approximately 156px below the top, clearing the 132px
fallback header. There was no horizontal overflow. Browser tools briefly lost
their host, recovered, then disconnected again after the required anchor, media,
responsive, cross-link and no-script checks. Additional repeated manual clicks
of the already-verified shared previous/next/top navigation were not claimed.

Only existing checks and browser verification were used, as requested; no tests
or verifier coverage were added. The canvas reference is visually inspected, not
an exported pixel-diff baseline, so exact pixel equivalence is not asserted.
Production output is restored to domain-root hosting before handoff. No CMS
connection or deployment was made.

## Ticket 03 code review

The implement skill's fresh-context, parallel two-axis review compared
`78bfee6751e755f768aba3e4e1a16a84065c7313` to candidate `137aa07`.

### Standards

One low-priority finding: the sevdesk and Shine introduction markup repeats the
same label, heading lines, description and role pattern. Resolved by extracting
`BrandIntroduction`, keeping each surrounding page section and its native anchor
in the Brand composition. The component also owns its recurring typography.

### Spec

No actionable findings. The complete original copy/media, named validated content,
native anchors, responsive arrangements and local/prefixed hosting match ticket 03. The review used source, production HTML, inventory and recorded visual
verification; it did not independently repeat Figma inspection.

Review totals: Standards 1 low finding resolved; Spec 0 findings. The root agent's
final production gate passed at 320px with the complete body and template tail,
all six media, correct brand anchors and previous/next URLs, and no horizontal
overflow. All six routes returned HTTP 200.

## Ticket 04: complete Merch & brand experience

The Merch desktop and mobile Figma frames were inspected on the signed-in canvas,
including the overall paired desktop figures, stacked mobile figures and the
event outcome. A 50% view confirmed the beige outcome panel, its statistic,
heading and prose, and the lower desktop/mobile hierarchy. The composition keeps
the 880px desktop column with two square 424px media tiles separated by 32px;
mobile stacks the audience groups and figures, retaining their captions beside
their associated artwork in document order. Flexible gutters bridge the designs.

The complete original live copy, audience descriptions, figure captions,
production credits and event callout live in named, validated
`merchBrandExperience` fields in the canonical Markdown record. The introduction
and metadata remain shared. `BrandIntroduction` now permits the absent role line
in these brand sections, while `MerchandisePair` owns the repeated paired-figure
and production-credit pattern. The page's audience and event arrangements remain
in its own Astro composition. The rendered production main text exactly matches
the captured reference after whitespace normalization, without hidden duplicates.

Five source files are retained in
`.scratch/design-adaptation/source-assets/merch/`, with source URLs, SHA-256 hashes,
formats, dimensions and delivery sizes in `provenance.json`. They show four
subjects: the cap is 2867 × 4096; the two separate desktop/mobile backpack images
are 1086 × 1448; embroidery is 896 × 1200; the moodboard is 2428 × 1404. The cap's
source URL ends in `.png` but contains JPEG data; its bytes remain unchanged.
Local WebP variants use quality 95, a maximum width of 1760px and no upscaling.
The original crops remain square, with the backpack set against white. The
mobile picture source preserves the original transparent backpack variant.
All four figures have explicit dimensions, descriptive alt text and lazy loading.
No separate artwork license notice was exposed by the supplied portfolio source;
no artwork or copy was invented or substituted, and existing font/icon notices
remain retained.

`yarn validate` passes, as do the `/portfolio-check/` production build and existing
`check:build`. Browser DOM inspection covered 1280px, 768px, 390px and 320px
without horizontal overflow: desktop/tablet pairs retain two equal columns and
mobile stacks them. All four source-runtime images loaded, including selection
of the mobile backpack; all five production media URLs and the local menu module
returned HTTP 200 under the prefix. The prefixed direct route loads both original
font families and all expected native destinations. Native previous navigation
reached Brand guidelines, next reached Paid & organic content, the top link
returned to scroll position zero, and the header Contact link reached the
front-page contact fragment.

A same-origin sandbox iframe without `allow-scripts` verified the actual
script-disabled prefixed page at 320px: the complete body and outcome remained,
all four header links were visible, the menu toggle stayed hidden, no horizontal
overflow occurred, and native previous navigation opened Brand guidelines.
Shared global focus styling and the native link semantics are retained.

The browser host intermittently disconnected. Source screenshots were obtained,
but subsequent screenshot capture failed even while DOM inspection, resizing,
native navigation and the iframe check worked. Visual verification therefore
uses those source canvas views and measured runtime composition, without a final
runtime screenshot comparison or an assertion of exact pixel equivalence. Only
existing checks and browser/read-only shell verification were used; no tests or
verifier coverage were added. Domain-root production output is restored before
handoff. No deployment or CMS connection was made.

## Ticket 04 code review

The implement skill's fresh-context, parallel two-axis review compared
`e4a1d403240111df75fbb773c953215b7a2ecbdd` to candidate `cbe08c0`.

### Standards

No substantive, actionable standards violations or baseline code smells. The
validated content, distinct Astro composition, shared visual components and
native navigation follow the documented repository decisions.

### Spec

No actionable findings. Both brand sections, audience groups, paired figures,
captions, production credits and the outcome callout are present. The reviewer
independently confirmed exact production main-text equality after whitespace
normalization. The review did not independently compare Figma and retains the
documented limit on runtime screenshot verification.

Review totals: Standards 0 findings; Spec 0 findings. The root agent's final
production gate returned HTTP 200 for the Merch route, stylesheet, menu module
and all five media variants. Browser DOM inspection at 320px confirmed four
rendered images, the correct previous/next URLs and no horizontal overflow.

## Ticket 05: complete Paid & organic content

The Paid desktop and mobile Figma frames were visually inspected on the signed-in
canvas at 50% zoom. Desktop uses the 880px content column, a white 880 × 640
campaign panel with the original 412px portrait, and a second white panel with
two approximately 291 × 518px creatives. Mobile uses 4:5 campaign and illustration
crops; the paid advertisement is deliberately absent from the original mobile
composition. Divided contribution rows stack their heading and prose at both
sizes. The beige outcome panel retains three statistics in one row, with compact
mobile typography. At widths below 381px its padding and gaps reduce so labels
such as “templates” remain whole while preserving the three-column arrangement.

All original headings, prose, campaign/example captions, contribution rows,
statistics and the market note are in named, validated `paidOrganicContent`
fields in the canonical Markdown record. The distinct Astro composition owns
media arrangement and responsive behavior. `ContentRows` now also handles the
observed stacked-row pattern through a composition-only property; editors receive
no layout switches. The rendered production main text exactly matches the source
inventory after whitespace normalization (1,497 characters on both sides).

All three original images are retained unchanged in
`.scratch/design-adaptation/source-assets/paid/`, with source URLs, dimensions,
formats and SHA-256 hashes in `provenance.json`: the alles klar campaign is
824 × 1029, and the native illustration and paid ad are each 1080 × 1920. Local
WebP delivery keeps those full dimensions at quality 95 without upscaling. Every
rendered image has explicit dimensions and descriptive alt text and loads lazily.
No separate artwork license notice was exposed by the supplied portfolio source;
no copy or artwork was invented, and existing font/icon notices remain retained.

Existing source checks and `yarn validate` pass, as do the `/portfolio-check/`
production build and existing `check:build`. Source and production browser
inspection covered 1280px, 768px, 390px and 320px without horizontal overflow.
Runtime screenshots were compared with the inspected canvas arrangements,
including the desktop creative panel, mobile illustration crop, contribution
rows and compact statistics. All three prefixed media URLs returned HTTP 200;
the local menu module and both original font families loaded. Native previous
navigation reached Merch & brand experience, next reached AI-assisted imagery,
back-to-top returned to scroll position zero, and header Contact reached the
prefixed front-page contact fragment from direct entry.

An actual same-origin sandbox iframe without `allow-scripts` verified the
prefixed page at 320px: the complete contribution and statistics content remained,
all four header links were visible, the menu toggle stayed hidden, no horizontal
overflow occurred, and native previous navigation opened Merch & brand experience.
Shared visible-focus styling and native anchor semantics are retained. Browser
click automation briefly failed, so native anchor activation was also inspected
through DOM `click()` followed by destination verification; the header Contact
link was checked with the browser's pointer click tool.

Only existing checks and browser/read-only shell verification were used, as
requested; no tests or verifier coverage were added. Canvas and runtime views
were visually inspected without an exported pixel-diff baseline, so exact pixel
equivalence is not asserted. Domain-root production output is restored before
handoff. No deployment or CMS connection was made.

## Ticket 05 code review

The implement skill's fresh-context, parallel two-axis review compared
`dbde6df6ddde2d124f9b41c5bf35d54164e89302` to candidate `c0abf82`.

### Standards

No documented-standard violations or baseline smells. The page-specific media
arrangement stays in its composition, while `ContentRows` reuses the existing
divided-row pattern. Copy, media metadata and validation remain separate from
presentation.

### Spec

No missing or partial ticket requirements, scope creep or incorrect implementation
identified. The reviewer independently confirmed normalized production main-text
equality, distinct original assets with matching recorded checksums/dimensions,
validated editable fields, native previous/next sequence and base-path handling.
The review relied on recorded canvas/browser evidence for visual fidelity,
responsive behavior, no-JavaScript operation and prefixed runtime checks; it did
not independently repeat browser inspection or existing checks.

Review totals: Standards 0 findings; Spec 0 findings. The root agent's final
production gate returned HTTP 200 for the Paid route and all three assets. Its
320px browser inspection confirmed the original three statistics, correct
previous/next URLs and no horizontal overflow; the 61.27px columns keep the word
“templates” whole. Domain-root output remains restored and the worktree is clean
at handoff.

## Ticket 06: complete AI-assisted imagery

The AI desktop and mobile Figma frames were visually inspected on the signed-in
canvas at 50% zoom, including the introduction, illustration, point of view,
four divided approach rows, principle callout and final overview/contact links.
Desktop keeps an 880 × 640 illustration crop in the 880px content column. The
375px mobile design uses a 287 × 387 portrait crop of the same artwork; the crop
scales proportionally at nearby widths. Both sizes stack each approach heading
above its prose. The beige principle panel retains its two-line heading and
compact Space Grotesk description. Runtime screenshots of the desktop artwork
and point of view/rows, and mobile artwork/principle/footer, were compared with
the inspected canvas composition.

All original figure copy, point of view, approach rows and principle copy live
in named, validated `aiAssistedImagery` fields in the canonical Markdown record.
The page's distinct Astro composition uses the existing stacked `ContentRows`,
shared introduction and fixed-sequence footer. Existing site Markdown already
holds the original overview/contact/footer labels. The production main text
exactly matches the source inventory after whitespace normalization (1,797
characters on each side), with no hidden responsive duplicates.

The original 2048 × 2048 PNG remains unchanged in
`.scratch/design-adaptation/source-assets/ai/`, with source URL, format,
dimensions and SHA-256 hash recorded in `provenance.json`. Its local WebP delivery
variant is 1760 × 1760 at quality 95 without upscaling. The inline image has
explicit dimensions, descriptive alt text and lazy loading. No separate artwork
license notice was exposed by the supplied portfolio source; no artwork or copy
was generated or substituted. Existing font and icon license notices remain.

Existing source checks and `yarn validate` pass, as do the `/portfolio-check/`
production build and existing `check:build`. Source and production browser
inspection covered 1280px, 768px, 390px and 320px without horizontal overflow.
The prefixed direct route loaded the illustration, local menu module and both
original font families with HTTP 200 responses. Native previous navigation
reached Paid & organic content, overview reached the front-page `#work`, top
returned to scroll position zero, and the header Contact link reached the
front-page `#contact`. The contact anchor retains the original email destination.
Keyboard Tab reached the footer contact anchor with its visible 2px focus outline.
The restored root production direct route also loaded its local image/fonts and
retained the correct root overview, previous, contact and top destinations.

An actual same-origin sandbox iframe without `allow-scripts` verified the
prefixed page at 320px: all four approach rows and the complete principle remained,
all four header links were visible, the menu toggle stayed hidden, and there was
no horizontal overflow. Its native previous link opened Paid & organic content.
Browser evaluation sometimes reported failure during native page navigation;
the subsequent destination reads confirmed those navigations completed.

Only existing checks and browser/read-only shell verification were used, as
requested; no tests or verifier coverage were added. Canvas/runtime visual
inspection is not an exported pixel-diff baseline, so exact pixel equivalence
is not asserted. The source dev server was restarted after content-schema HMR
left a stale content store. Domain-root production output is restored before
handoff; no deployment or CMS connection was made.
