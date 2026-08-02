# Technical Architecture — Muster website

<!-- Technical architecture document. Developer produces; PM reviews. -->

## 1. System Overview

One static HTML page, served as files. No framework, no build step, no backend, no storage, no auth,
no data layer. The browser fetches `index.html`, four stylesheets and one script from the same origin
and nothing else — **zero external network requests at runtime is a published product claim, and it is
what makes the page's own funnel unmeasurable client-side**. That collision resolves in favour of the
claim: no analytics, no beacons, no third-party anything.

Two consequences shape everything below. Assets must be self-contained (inline SVG, CSS-generated
texture, data-URI icon), and every visual claim must be verifiable by machine, because the page is an
exhibit of what the framework produces and "it looked right" is not evidence.

```
index.html ──┬── styles/tokens.css    palette primitives + semantic tokens (the only hex in the repo)
             ├── styles/base.css      reset, type scale, layout, texture, focus, links
             ├── styles/chrome.css    skip link, status bar, section rules, footer
             ├── styles/motifs.css    pulse, instrument surfaces, readouts, chips, cursor
             └── scripts/count-up.js  scroll-triggered metric roll (progressive enhancement)
```

## 2. Directory Structure

| Path | Contents |
|---|---|
| `index.html` | The page. Landmarks, six section slots, status bar, footer |
| `styles/` | Four stylesheets, loaded in cascade order: tokens → base → chrome → motifs |
| `scripts/` | Vanilla scripts, no modules, no bundler |
| `tests/` | Verification harnesses and fixtures. Never shipped |
| `knowledge-base/design-specs/web/` | The specs the build implements |

Stylesheets are split by role rather than concatenated: the cascade order is meaningful (tokens must
resolve before anything references them), and four same-origin files cost nothing a build step would
recover.

## 3. Data Layer

None. The page holds no state, reads no storage, and sets no cookies.

## 4. API Layer

None.

## 5. Third-Party Dependencies

None at runtime — no webfonts, no CDN, no SDK, no package manager. Type is the system stack
(`ui-monospace` / `system-ui`), texture is generated in CSS, and the icon is a data URI.

Verification uses only what the machine already has: a headless Chrome for Blink and QuickLook for
WebKit, driven from Node over the DevTools Protocol with no installed packages. The repo has no
`package.json` by design — a dependency manifest would be the first crack in "no build system."

## 6. Environment Configuration

No environment variables, no build configuration. Deploy is Cloudflare Pages serving the repo root as
static files. The only environment-dependent value on the page is the `curl` URL, which points at the
GitHub raw URL until a domain is settled.

## 7. Security

No user input, no forms, no network calls, no execution of remote code. The script is same-origin and
touches only elements that opt in via `data-countup`.

## 8. Observability

Deliberately none client-side — see §1. Cloudflare Pages' server-side request analytics measure visits
and verification-file fetches without any instrumentation on the page. Scroll depth and CTA copies are
unmeasured by design.

## 9. Performance

Five same-origin files, no fonts to fetch, no images to decode, no layout-shifting content. Budgets and
their mechanisms:

| Budget | Mechanism |
|---|---|
| Zero external requests | Self-contained assets; asserted mechanically |
| Zero cumulative layout shift | Metric cells are sized by their final value before any animation starts; no late-loading assets |
| No render-blocking third parties | There are none to block on |
| Animation stays off the main thread | Every animated property is `opacity` or `transform` |
| Reduced motion is complete, not degraded | Content renders in full with every animation suppressed |

## 10. Theming

Both themes are first-class. Dark is the default; light activates from `prefers-color-scheme`.
`:root[data-theme]` forces either theme and exists so verification does not depend on the machine's
appearance setting — no UI control sets it, because the page asks the reader to make exactly one
decision and it is not this one.

## 11. Verification

Cross-engine verification is mandatory at every visual milestone, because inline-SVG/WebKit divergence
is a known failure class here. A Blink-only pass is not a pass.

| Harness | Engine | Covers |
|---|---|---|
| `node tests/verify-shell.mjs` | Blink (headless Chrome over CDP) | Network isolation, contrast per token pair in both themes, landmarks, heading tree, focus, surface rules, motifs, reduced motion, narrow viewports and 200% zoom, forced colors, the count-up engine, shipped-output hygiene |
| `node tests/verify-webkit.mjs` | WebKit (QuickLook) | Both themes render, the generated grain actually rasterises, and its measured pixel spread agrees with Blink's |

Both write a JSON report and screenshots to `tests/artifacts/`. The grain check is pixel-level on
purpose: the failure class it guards against is a filter that silently renders in one engine and not
the other, which no computed-style assertion would catch.
