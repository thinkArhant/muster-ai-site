# Verification harnesses

Nothing here ships. These scripts exist because the page makes claims — zero external requests,
measured contrast, complete reduced-motion content, cross-engine parity — and a claim the build cannot
demonstrate is a claim the page should not make.

## Running

```
node tests/verify-shell.mjs     # Blink, via headless Chrome over the DevTools Protocol
node tests/verify-webkit.mjs    # WebKit, via QuickLook
```

Run the Blink harness first: the WebKit one compares its own grain measurement against the Blink
report. Both exit non-zero on any failure, print a per-check table, and accept `--json`.

Reports and screenshots land in `tests/artifacts/` (git-ignored — regenerate rather than read a stale
copy).

## No dependencies

There is no `package.json`, and adding one would be the first crack in "no build system." The harness
uses Node's global `WebSocket` to speak CDP directly, Node's `zlib` to decode PNGs, and the Chrome and
QuickLook already on the machine.

## What each harness covers

**`verify-shell.mjs`** — five emulated conditions plus a fixture:

| Condition | Asserts |
|---|---|
| Dark, motion on | Network isolation, palette against the seed's locked hex, contrast per token pair, landmarks, heading tree, skip link, focus ring, sharp corners, no glass, no shadows, motif geometry, reading column, grain rasterisation |
| Light | Palette, contrast, texture alpha caps, network isolation |
| Reduced motion | No animation runs, and the content that remains is complete |
| 375px, 320px, 200% zoom | No horizontal scroll |
| Forced colors | Texture drops out, borders survive |
| `fixtures/count-up.html` | Parsing, decimal preservation, the 55%-visibility trigger, exact landing value, zero layout shift during the roll, dashes never animating, reduced motion rendering immediately |

Plus two checks that read the shipped files rather than the rendered page: no `http(s)` URL anywhere,
raw hex only in the token block, no build-system artifacts, no bottom margins.

**`verify-webkit.mjs`** — renders the page in both themes through QuickLook and measures the pixel
spread of a patch of bare page ground. A generated texture that fails to rasterise in one engine is
this project's known failure class, and it is invisible to any computed-style assertion: the pixels are
the only place it shows up. The patch is located by luminance rather than coordinates, so the two
engines can be compared without their layouts lining up.

## Adding a section

A new section should extend `verify-shell.mjs` rather than get its own runner — the conditions are
already set up, and a check that only runs when someone remembers to run it is not a check.
