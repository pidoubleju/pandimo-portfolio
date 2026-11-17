# Keep core content and navigation independent of JavaScript

The initial scaffold prohibits all browser JavaScript. Replace that absolute
constraint with a requirement that core content and navigation work without it,
while permitting small scripts for explicitly agreed enhancements. Use native
page links and section anchors for the main navigation. This retains static
hosting and reliable navigation while allowing interaction choices to follow the
portfolio's needs; the build checker must be revised during implementation.

Implemented: the build checker permits local bundled menu modules while rejecting
inline scripts, inline event handlers and client hydration. The native links and
visible fallback navigation remain available without JavaScript.
