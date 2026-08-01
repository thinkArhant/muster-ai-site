# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### HO-047 — UI/UX: ruggedness is a feature-size property, measured — a coarse grain is rendered beside the current one for the founder's last texture pick

**From**: UI/UX · **Reviewers**: Founder (`pending` — the pick: CURRENT or COARSE 0.18),
Developer (`pending` — builds the picked form; exact delta in §4 below),
PM (`pending` — review)
**Status**: open · **Filed**: 2026-08-01

**Contact sheet**: `samples/ground-texture-coarse/CONTACT-SHEET.png`
**No shipped file was touched.** Proposals are generated from `index.html`
(`samples/ground-texture-coarse/build-proposals.mjs` → `samples/groundc-*.html`); the runners were
run against a temporarily-applied delta and the tree was reverted before this was filed.

#### 1. The round, and the one lever it varies

`baseFrequency` — held at `0.9` in every prior candidate — is the only thing that moves. Alphas stay
at the shipped 0.08 dark / 0.04 light, the pigment stays the shipped pale grey, the alpha curve stays
gamma 2.6, both vignettes untouched. Three variants against CURRENT, plus the optional two-layer:

| | bf / octaves | tile / box | feat. dark (2×) | spread dark | `--muted` worst d / l | ground lum. dark |
|---|---|---|---|---|---|---|
| CURRENT | 0.9 / 4 | 140u / 196px | **1px** | 1.12 (span 7.5) | 5.29 / 4.83 | 20.57 |
| COARSE 0.35 | 0.35 / 4 | 140u / 196px | **3px** | 1.35 (10.75) | 5.18 / 4.83 | 20.56 |
| **COARSE 0.18** | 0.18 / 5 | 280u / 392px | **5px** | 1.42 (10.75) | 5.14 / 4.82 | 20.58 |
| COARSE 0.09 | 0.09 / 5 | 560u / 784px | **8px** | 1.53 (10) | 5.17 / 4.83 | 20.67 |
| TWO-LAYER | 0.9+0.18 | both | 2px | 1.18 (8) | 5.28 / 4.83 | 20.70 |

Floor 4.5:1, worst single composited pixel, vignette at its darkest, both themes — **every variant
clears it with ≥ 0.6 dark / ≥ 0.32 light of margin.** The coarse lever is nearly free where the
intensity levers were expensive: worst-case `--muted` moves at most 0.15, and the dark ground's
luminance does not move (20.57 → 20.58, where the rejected route cost +3.7). Tile sizes follow from
the frequency by one rule: ≥ ~50 base-frequency periods per side so a coarse grain cannot tile
visibly (verified at full viewport — no visible repeat), with the shipped ~1.4× paint upscale
unchanged.

#### 2. MEASURED versus JUDGED — the question actually asked

**Measured**: everything in the table; feature size as autocorrelation length (the number the
hypothesis stands on: 1px → 3 / 5 / 8px); WebKit applying every variant's filter in-engine (feature
size 2 → 3 / 6 / 12px, spread ×1.16 / ×1.21 / ×1.36, same direction as Blink); light-theme span
≤ 2.5 of 255 in every variant, both engines.

**Judged, looking at 1:1 renders**: **0.18 is the first form that is perceptibly a material rather
than a veil** — visible clumpy tooth on the dark ground at arm's length, in both engines, and it
still reads calm behind content. 0.35 is real but quieter: fine tooth a reader notices only when
looking at the ground. **0.09 is disqualified**: its 8px features read as staining and uneven
backlight, not tooth — the point where texture becomes a defect a reader would report. **TWO-LAYER
is disqualified on measurement**: as constructed (grit at gamma 4 × amplitude 0.6) the grit lands
below perception and the composite is CURRENT again — no alpha was raised to save it, per the
round's rule; that it needs alpha to work is reported here instead.

**The recommendation is COARSE 0.18**, with 0.35 the named fallback if it reads too coarse in
person. And the honest ceiling, stated plainly: even 0.18 is a quiet texture. Within the 4.5:1
floor, no overt grit exists on this page in any form — if that is what the direction reference's
feel calls for, it is not reachable (§5 below), and **"ship CURRENT" remains a sound outcome**; the
page does not stand on this layer.

#### 3. The light theme's honest result

No frequency makes this grain perceptible on the light ground: the pigment sits ~28 levels from the
ground, and the locked 0.04 alpha leaves a span of at most ~2.5 levels of 255 at any feature size.
Feature size fixes the dark theme; light's limit is pigment distance, and the pigment and alpha axes
lost their round already. Ruled into `page-shell.md` §5.1 as a property, not a defect: the light
ground ships as near-invisible tooth in every form, including the recommended one.

#### 4. THE EXACT DELTA TO BUILD — one declaration, one file

**`styles/base.css`**, `.texture__grain` only. **Tokens untouched — no alpha moves in any form.**

If **COARSE 0.18** is picked, three substring changes inside the one `background-image` declaration,
plus the size line:

- `width='140' height='140'` → `width='280' height='280'` (both occurrences: the `svg` element and
  the `rect`)
- `baseFrequency='0.9' numOctaves='4'` → `baseFrequency='0.18' numOctaves='5'`
- `background-size: 196px 196px; /* 140px tile at ~1.4x */` →
  `background-size: 392px 392px; /* 280px tile at ~1.4x */`

If **COARSE 0.35**: one substring change only — `baseFrequency='0.9'` → `baseFrequency='0.35'`
(octaves, tile and box stay as shipped; 140u × 0.35 = 49 periods still clears the repeat rule).

If **CURRENT**: nothing in the styles. Either way the losing column is deleted from
`page-shell.md` §5.1 in the same commit, and the section's numbers already match this table.

#### 5. Runners, cross-engine, and what contradicts the brief

**All four runners green on the proposed 0.18 state, run serially: 308/308 · 27/27 · 108/108 ·
45/45 — zero red.** Unlike the alpha round there is no token to re-base: no harness literal names
the frequency, and `grain peak alpha capped at 8%` reads a token no variant touches. The standing
caveat stands: no shipped runner can see any of this (both contrast probes walk ancestors for a
`background-color`; `.texture` is a fixed sibling) — every number here is from
`samples/ground-texture-coarse/measure-coarse.mjs`, per-pixel.

WebKit: pinned-height `qlmanage` renders per variant, statistics read as in-engine ratios only, and
**no WebKit evidence exists at any phone width** — the sheet's phone band is Blink's and is
labelled so. On light, WebKit needed a vignette-off pass to see the grain at all (the vignette's own
wash dominates the patch otherwise); it confirms Blink — quantisation-level in every variant.

Three things measured that the brief did not predict:

- **Measured spread barely moves (×1.27 dark for 0.18) while perceptibility moves decisively** —
  the round's premise (spread and ruggedness are different quantities) is confirmed from the other
  side: the win shows up in autocorrelation length, not sd.
- **The direction reference's own grain is fine-featured, not coarse** — canvas-painted ~1.4px
  speckle, bipolar 228/14 pigment, at roughly an order of magnitude more effective alpha than the
  4.5:1 floor allows on this palette. Its ruggedness is an intensity property. Calibrating against
  it: the reference's overt grain is unreachable inside the contrast budget at ANY frequency, which
  is why "perceptible tooth" (0.18) and not "the reference's grain" is the honest best available.
- **The 1× rows of the instrument are polluted and are not quoted**: the flat-patch scan strides
  2 device px and steps over the status bar's 1-device-px hairline at 1×, so the 1× "patch" spans
  the bar. The 2× rows — the unit that matters — find their patch below it. Instrument limitation,
  noted so nobody reads the 1× rows as evidence.

#### 6. Apple-quality bar

*Would Apple ship this?* — Yes, for the recommended form: it is one changed declaration, no new
asset, no request, no motion, no token, no markup; it makes an intended texture actually perceptible
at a measured cost of almost nothing; and it was chosen by looking at 1:1 renders in both engines,
not by the biggest number. The reservation is on the sheet in plain words: it is tooth, not grit,
and the light theme keeps its near-invisible veil — both are the contrast budget's price, and the
budget outranks the texture.

### HO-046 — UI/UX: the ground texture is measured, and a stronger grain is rendered beside the current one for the founder's pick

**From**: UI/UX · **Reviewers**: Founder (`done` — STRONGER **rejected**: it spends contrast on a
change below the perceptual threshold; the feature-size round it directed is HO-047),
Developer (`superseded` — no STRONGER build; HO-047 §4 carries the live delta),
PM (`pending` — one spec-level finding to rule, §7)
**Status**: open · **Filed**: 2026-07-31

**Contact sheet**: `samples/ground-texture-renders/CONTACT-SHEET.png`
**No shipped file was touched.** The proposals are generated from `index.html`; the runners were run
against a temporarily-applied delta and the tree was reverted before this handoff was filed.

#### 1. The ask, in one line each

- **CURRENT** — the grain exactly as it ships. One pale grey at mostly very low alpha.
- **STRONGER** — the pigment goes two-sided, more of the tile carries real alpha, and the dark
  theme's opacity rises 0.08 → 0.11. The light theme's opacity does not move.

**UI/UX recommends STRONGER.** It is a recommendation, not a ruling.

#### 2. The founder's premise is confirmed on measurement, and is worse on the light theme

Spread of a bare-ground patch, per CSS pixel, Blink at a 2× raster, vignette off so the number is the
grain alone:

| | dark | light |
|---|---|---|
| grain off | 0.00 | 0.00 |
| **current** | **1.12** (span 7.5 levels of 255) | **0.26** (span 2.0) |
| **stronger** | **2.49** (span 16.3) | **0.65** (span 5.0) |

A span of 2.0 levels is one step of 8-bit quantisation. On the light ground the current grain is not
faint, it is absent. "Almost not visible" understates it.

#### 3. The light vignette is at its cap, and nothing in this round goes near it

Verified before anything was changed: `--vignette-alpha` resolves to **0.05** in the light theme and
**0.16** in the dark, `verify-shell.mjs` asserts both, and the audit independently re-derives that 5%
is load-bearing (16% over the light ground puts `--muted` at ≈3.6:1). **Neither proposal touches
either vignette value, and the vignette's markup and CSS are untouched in both.**

#### 4. Contrast, before and after, both themes

Worst single composited pixel of a bare-ground patch, vignette at its darkest, per-pixel WCAG:

| Pair | dark current | dark stronger | light current | light stronger |
|---|---|---|---|---|
| `--ink` on ground | 13.55 | 12.61 | 11.42 | 11.14 |
| `--muted` on ground | 5.29 | **4.92** | 4.83 | **4.71** |
| ground luminance (of 255) | 21.9 | 25.6 | 214.9 | 214.8 |

Floor 4.5:1. Margin after the change: **0.42 dark, 0.21 light**. Only ground-level text is exposed at
all — every card is an opaque `--surface` with the texture behind it at `z-index: -1`, so no card
text moves by any amount in either form.

#### 5. THE EXACT DELTA TO BUILD — three lines, two files

**`styles/base.css`**, `.texture__grain`'s `background-image`. Inside the existing
`feComponentTransfer`, before the existing `feFuncA`, insert three primitives, and change the
`feFuncA` exponent from `2.6` to `1.5`. As URL-encoded text, the substring

```
%3CfeComponentTransfer%3E%3CfeFuncA type='gamma' exponent='2.6' amplitude='1' offset='0'/%3E%3C/feComponentTransfer%3E
```

becomes

```
%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='3' intercept='-1'/%3E%3CfeFuncG type='linear' slope='3' intercept='-1'/%3E%3CfeFuncB type='linear' slope='3' intercept='-1'/%3E%3CfeFuncA type='gamma' exponent='1.5' amplitude='1' offset='0'/%3E%3C/feComponentTransfer%3E
```

Nothing else in the data URI changes — same `baseFrequency`, same `numOctaves`, same
`stitchTiles`, same `saturate 0`, same 140-unit tile, same `background-size: 196px 196px`.

**`styles/tokens.css`**, both dark declarations of `--grain-alpha` — the one in `:root` and the one
in `:root[data-theme="dark"]`:

```
--grain-alpha: 0.08;   →   --grain-alpha: 0.11;
```

**The two light declarations stay at `0.04`, and all four `--vignette-alpha` declarations are
untouched.** If CURRENT is picked, the delta is: nothing in the styles, and delete the STRONGER
column from `page-shell.md` §5.1. Either way the losing form leaves the spec in the same commit.

The layer stays generated and inert — no image file, no `url()` that fetches, no raster. The
`verify-shell` network check still enumerates exactly `data:uri(grain)` and no external load.

#### 6. Runners against the proposed state, run serially

| Runner | Baseline | Proposed |
|---|---|---|
| `qa-fullpage-sweep.mjs` | 45/45 | **45/45** |
| `qa-independent-audit.mjs` | 108/108 | **108/108** |
| `verify-shell.mjs` | 307/307 | **306/307** |

**Exactly one red, and it must be re-based with the pick**: `grain peak alpha capped at 8% (dark)`,
which asserts the literal `0.08` — the value-not-relationship shape this project has ruled against.
Re-base it to the picked value, or better, to the relationship it exists to protect: the dark alpha
is the larger of the two, both stay below the point where `--muted` on ground composites under
4.5:1, and the light one never exceeds the dark one.

**Two couplings found by running, not by reading, and both are worth a check each:**

- `bare ground renders at the locked value` **passed, and its margin is the finding**. It asserts a
  ground patch within ±2.5 of `hexLuminance('#13140D')` = 19.28. Baseline: patch at `0,0`, mean
  20.12 — 0.84 clear. Proposed: patch at `320,0`, mean 21.445 — **2.16 clear of a 2.5 tolerance**.
  It did not go red because `findGroundPatch` *relocated*: it scans until some patch fits, and the
  vignette's own darkening cancels part of the grain's lift somewhere. A stronger grain than this
  one either turns it red or, worse, keeps it green by finding an ever-more-vignetted patch. It is a
  check that can pass by moving.
- **No contrast probe on this page can see the texture at all.** Both the sweep's and the audit's
  resolve a background by walking ancestors for a `background-color`; `.texture` is a fixed
  *sibling* of the content. The sweep prints `#hero .formation__caption 5.13:1` for the pair this
  round measures at **4.83** composited today and 4.71 proposed. Nothing is wrong on the page and
  no floor is breached — but a texture change can move real contrast while every runner stays green,
  and today nothing asserts the composited floor. `page-shell.md` §5 now names the instrument.

#### 7. Cross-engine: WebKit renders the pigment, and the first WebKit answer was wrong

The pigment is three added SVG filter primitives, so WebKit was the gate. Isolated rather than
assumed — same tile, same alpha curve, same opacity, pigment change alone, over mid-grey:
spread **5.70 → 10.00**, range **127–180 → 55–203**. WebKit applies `feFuncR/G/B linear`.

On the page, bare ground: dark **×2.16** (Blink ×2.22), light **×1.42**, §5's surface **×2.19**.

**The first WebKit pass reported the light change as ×1.01 and was an instrument artefact.**
`qlmanage` scales a whole document into a fixed 1280² frame; the page is ~3000px tall, so it was
downscaled ~0.43 and the downscale box-averaged the noise back toward flat. Pinning the document's
height near the frame's fixed it. Any future texture evidence from `qlmanage` has to do the same.
`qlmanage` also cannot be given a viewport, so **no WebKit evidence exists at any phone width in
this round** — the sheet's phone pair is Blink's and is labelled so.

#### 8. What was rejected, and on what number

- **Opacity alone** (0.08 → 0.16): reaches spread 2.22 dark but costs `--muted` 0.41 against the
  0.16 the pigment route costs for comparable spread, and does almost nothing on light (+23% for a
  doubling — the light ground sits only ~28 levels from the pigment's grey, so there is little to
  scale).
- **The alpha curve alone** (gamma 2.6 → 1.5): +13% of spread for **+2.2 of ground luminance** —
  the worst trade of anything tested. It is in the recommendation only because it is what lifts the
  light theme, where the pigment change alone leaves too little.
- **A coarser tile** (196px → 294px): +13% of spread at zero per-pixel cost, which is the most
  efficient lever measured — and rejected anyway, because its features then grow past a glyph stem.
  A grain a whole stem can sit inside stops averaging under text.
- **Raising the light theme's opacity** to 0.05: +23% of spread for a third of the light theme's
  entire remaining contrast margin (4.71 → 4.66). The light margin is the scarcest number on the
  page.
- **`mix-blend-mode: overlay`** for a free bipolar pigment: on a backdrop at luminance 0.007,
  overlay resolves to `2·b·s` ≈ 0.014 — it does essentially nothing on this ground. Not rendered;
  rejected on the blend formula.
- **Two tiles, one per theme**, which would buy the light gain without the dark theme's luminance
  lift: rejected on simplicity. It doubles the surface area of this project's known cross-engine
  failure class to buy one number.

#### 9. Two findings for PM to rule, neither a launch blocker

- **§5's old contrast rule was unmeetable as written.** "Texture never lifts a stated contrast pair
  below its table value" cannot be satisfied by any texture: the table values are the untextured
  pairs, and the shipped grain and vignette both move them today. Rewritten in `page-shell.md` §5 as
  a floor — 4.5:1 at the worst single pixel, vignette at its darkest, both themes — which is
  checkable and which the shipped page passes.
- **`--grain-alpha`'s name overstates what it is.** It is the layer's opacity; the tile's own
  per-pixel alpha peaks at 0.78, so the effective peak is 0.78 × the token. `verify-shell`'s check
  is titled `grain peak alpha capped at 8%` and reads the token, so it names a quantity it does not
  measure. Stated in §5.1; no rename proposed, since a rename costs more than it buys.

#### 10. Apple-quality bar

*Would Apple ship this?* — Yes, for the recommended form. The change is three filter primitives and
one token; it adds no asset, no request, no motion, no markup and no complexity to reason about; it
is measured in both engines and both themes; and it is the smallest change that makes the ground
read as a ground. The honest reservation is on the sheet rather than hidden: on the light theme even
the stronger grain is a 5-level span, and it is capped there on purpose because the light ground has
a third of the dark theme's headroom. A texture that reads equally on both themes is not available
inside the contrast budget, and the budget outranks the texture.

### HO-045 — Developer: §2's narration arrives readable — the rail pages forward instead of pinning to the fold

**From**: Developer · **Reviewers**: PM (`pending` — one founder-reported defect, closed),
QA (`pending` — the terminal sweep re-runs on this tree; four new checks to plant against)
**Status**: open · **Filed**: 2026-07-31

**Commit**: `7c574b9 developer: §2's narration arrives readable, not pinned to the fold`

#### 1. Runner counts, on the shipped tree

| Runner | Result |
|---|---|
| `node tests/verify-shell.mjs` (Blink) | **308/308** (304 + 4 new) |
| `node tests/verify-webkit.mjs` (WebKit) | **27/27** |
| `node tests/qa-independent-audit.mjs` | **108/108**, 9 measurements reported |
| `node tests/qa-fullpage-sweep.mjs` | **45/45**, 3 measurements reported |

Run serially, per the standing note. Two runs aborted on transport rather than on a check and were
re-run — see §6, which also names a harness gap those aborts exposed.

#### 2. The defect, reproduced before it was touched

The rail put the active entry's **bottom** on its own bottom edge
(`railTop = offsetTop + offsetHeight − clientHeight`). Every new explanation therefore arrived
flush on the fold of the scroll window. Reproduced under live playback at 1280 × 900 and
1600 × 900, sampling at each slot's arrival: **8 of 10 active entries not fully visible**, entry
tops resting 187–257px down a 327px rail. The numbers match the brief's table.

**One correction to the brief's diagnosis, from measurement.** The +3 to +5px of bottom overflow in
that table is almost entirely the `--reveal` transform — a new entry is translated 4px down for
350ms — and not a resting clip. Settled, the old rule left the entry flush to within a pixel: a
containment check measured after the reveal settles catches only **4 rows of 40**, all sub-pixel.
This matters, because "assert containment" alone would have been the second assertion in a row to
pass while the founder's defect survived. The defect is the **pinning**, and the reader meets it as
a clip only while the entry is fading in — which is exactly when they are looking at it.

#### 3. The behaviour ruled

**The rail pages forward and lands the entry's top.** It holds still while the newest entry is
already whole inside it; when the newest entry would fall outside, it moves once, putting that
entry's **top** on the rail's top, where the entry has the rail's full height below it.

- **Why top, not bottom** — bottom-alignment also contains the entry, arithmetically, and is what
  produced this defect. Top-alignment additionally gives the reader the room the entry is about to
  need, which is the reason a reader scrolls at all.
- **Why paging and not always-top-align** — always top-aligning would scroll every slot to the top
  and destroy the accumulation the rail exists for (`replay.css`: *"revealed entries accumulate in
  the rail"*), turning the desktop rail into the phone's one-slot caption. Paging preserves the
  transcript and cuts rail movement from 8 moves to 4 at 1280.
- **Positions from layout offsets, not rendered rects** — a decision taken from
  `getBoundingClientRect()` would page forward early on the reveal's 4px transform and stay one
  entry ahead for the rest of the chain.
- **Forward-only, deliberately** — `Math.max` against the current `scrollTop`. A reader who has
  scrolled the rail ahead of the chain keeps their position. The cost is stated rather than hidden:
  the guarantee is about playback, not about a rail the reader is driving.
- **The end of the list is its own case and needs no branch** — clamping the target to the rail's
  own maximum lands the last entries whole against the end.
- Instant position change; no smooth scrolling introduced. Reduced motion and no-JS are untouched
  (the file still returns before anything under `prefers-reduced-motion`, and with no playback state
  the rail is not a scroll region at all).

#### 4. The assertions — four, and what they printed when watched to fail

Driven, not sampled: `MusterReplay.seek(ms)` is added to the test surface, and the harness walks
**every slot in `SLOT_AT` in order** at 960 × 900, 1280 × 900, 1600 × 900 and 667 × 375. Order
matters — the rail's rest position is a function of where it already was, so a single seek would not
reproduce a run. Geometry is printed per slot, so a failure names the slot and the pixels.

| Check | Relationship | Against the old rule |
|---|---|---|
| the rail keeps the ACTIVE entry whole, at every slot | active entry's rect inside the rail's client rect | **RED**, 4 rows: `1280×900 sp4b: top 253.47px, bottom overflow 0.75px at scrollTop 313`, and the same at sp8 and at 1600 |
| the active entry arrives with rail beneath it, never flush on the fold | resting clearance ≥ the reveal's own displacement | **RED**, **24 of 40 slots** — `1280×900 sp3: -0.19px of rail below it, needs 4px` … through sp8 at all three wide widths |
| the rail never scrolls backwards under a reader | reader scrolls the rail ahead, next slot lands, position held | **RED** on a planted `Math.min` without the `Math.max`: reader at 995, next slot hauled them back to **566** (−429px); at 960, **−1080px** |
| no narration entry sets taller than the rail that must hold it | the precondition containment rests on | green throughout; at `--bp-wide` the margin is **9.2px** (317.8px entry in a 327px rail) |

Two details worth carrying:

- **The reveal displacement is measured, not restated.** It is read off an unrevealed entry rather
  than typed as `4`. The first version of that measurement sampled mid-transition and read
  **1.83px**, which would have quietly softened the floor by more than half — it now settles first
  and reads **4px** at every viewport.
- **The probe's own determinism was a bug before it was a check.** `pause()` issued in the same task
  as the `scrollIntoView` is undone by the autoplay gate's observer callback, which has not run yet;
  the probe was measuring a chain that was still running. It now lets the gate deliver first, and
  asserts the active slot **is** the slot asked for, so a stray frame reports itself.

After the fix, live playback (not driven) at 1280 and 1600: **10 of 10 slots fully visible**, worst
resting clearance 0.11px at sp8 where the list has run out, and mid-reveal the last entry still
measures inside the client box at −0.32px.

#### 5. Files changed

| File | What changed |
|---|---|
| `scripts/replay.js` | `followRail()` replaces the inline bottom-pin; `seek(ms)` added to the test surface |
| `tests/verify-shell.mjs` | four checks added, 304 → 308. No check deleted or weakened; the `restart()` rewind assertion is untouched and still passes (`1280px: narration 991→0 of 991`) |
| `design-specs/web/section-02-replay.md` | §6 gains the rail's follow rule and why top-alignment is the rule; §10's *"Rail scrolls its own overflow only if narration exceeds terminal height (it should not at spec'd budgets — verify)"* is corrected — it **does**, at every width from `--bp-wide` up |

#### 6. Things found that the brief did not say

1. **The spec was wrong about the rail.** §10 said the rail should not need to scroll at spec'd
   budgets. It scrolls at every wide width — 993px of overflow against a 327px rail at 1280.
   Corrected in the file.
2. **`--bp-wide` is the real worst case and no runner was looking at it.** At 960 the rail is
   narrowest and the prose sets tallest: a 317.8px entry in a 327px rail, **9.2px of margin**. If
   narration grows, containment becomes unreachable by any follow rule. That is now its own check
   with the margin printed, so the cause is named rather than left to surface as a mystery.
3. **A pre-existing harness hang, reproduced on `HEAD` in a clean worktree.** `verify-shell` exits
   **13** with *"Detected unsettled top-level await"* at the find-in-page probe, intermittently. The
   cause is in `tests/lib/cdp.mjs`: the per-call deadline calls `timer.unref?.()`, so when the
   stalled CDP call is the only thing holding the event loop open, Node exits instead of rejecting.
   The file's own comment says *"A hang is a failure, and it should say so with the method on it"* —
   it does not, in exactly the case that matters. `qa-independent-audit` separately died once on
   `{"code":-32602,"message":"No target with given id found"}`. Both re-ran green. **Not fixed here**
   — it is transport, not §2, and re-basing a shared harness deadline inside a one-defect fix is the
   wrong place for it. Flagged for PM to route.
4. **Monotonicity was not observable from playback alone.** The chain's own targets already climb,
   so no slot walk can see the forward-only guard — removing `Math.max` passes every containment
   check. That is why the third check drives a reader's own scroll. Worth generalising: a guard
   whose protected case never occurs during normal playback is invisible to a test that only plays.
5. **A concurrent working-tree change crossed this session.** Mid-run, `styles/tokens.css` carried an
   uncommitted `--grain-alpha: 0.08 → 0.11` with untracked `samples/ground-*.html` beside it, which
   turned `grain peak alpha capped at 8% (dark)` red. It was reverted by whoever made it before I
   finished. **Untouched by me, and not in my commit** — but the tree is not clean right now
   (`samples/ground-current.html`, `samples/ground-stronger.html`,
   `samples/ground-texture-renders/` are untracked), and a sweep taken on it will say so.

6. **`muster-requests-lint.sh` is red again** — 347 active lines against a 300 budget with this entry
   filed. HO-044 is still `open` with both reviewers `pending`, so it is not mine to sweep; PM
   reconciles at review, as last time.

#### 7. What has no evidence

**There is no WebKit evidence for this behaviour in any condition.** `qlmanage` executes no
JavaScript, so the rail's follow rule — like §4's track end and the rest of §2's playback — is
verified in Blink only. `verify-webkit` at 27/27 covers the static render, where the rail is not a
scroll region at all. Every figure above is Blink's.

---

### HO-044 — Developer: §5 priced in prose, §1 slimmed to its posture, two phone bugs closed, and the harness re-based around all of it

**From**: Developer · **Reviewers**: QA (`pending` — the terminal sweep runs on this tree),
PM (`pending` — review against HO-042, HO-043 and DEC-061…064)
**Status**: open · **Filed**: 2026-07-31

**Commit**: `f166dfb developer: the page prices Bodh in prose and asks one question twice`

#### 1. Runner counts, on the shipped tree, tree clean

| Runner | Result |
|---|---|
| `node tests/verify-shell.mjs` (Blink) | **304/304** |
| `node tests/verify-webkit.mjs` (WebKit, via `scripts/test.sh`) | **27/27** |
| `node tests/qa-independent-audit.mjs` | **108/108** |
| `node tests/qa-fullpage-sweep.mjs` | **45/45**, 3 measurements reported |

`verify-shell.mjs` was aborting before check one when this round opened; the first fix was its §5
copy parser, and the parser now **discovers** the cell inventory instead of re-hard-coding it — it
walks `Key N` until the row is absent and matches the prose heading on its shape rather than on the
number it spells. Planted against: a copy file re-keyed to three cells makes the runner go **red on
the cell-count check with `2/2 cells against the deliverable's 3`**, which is what it should have
done in the first place, instead of crashing.

#### 2. Files changed

| File | What changed |
|---|---|
| `index.html` | §5's four prose lines and two-cell cards; §1's strip slimmed to the head row with one top-left mark; the footer's re-ruled sentence with two nowrap spans |
| `styles/sections.css` | The remnant's dead cell rules and `.shipped__caption` retired; §5's comment block re-stated for four lines and two keys |
| `styles/chrome.css` | `.pagefoot__unit` — the style-only nowrap run |
| `scripts/replay.js` | Both panes rewind on replay (`rewindPanes`), and the rail is addressed by name rather than through `parentElement` |
| `scripts/sheet-indicator.js` | Rest resolved from geometry, with the end of the track as its own case, and a passive scroll listener beside the observer |
| `tests/verify-shell.mjs` | The parser, plus every §5 / §1 / footer coupling below |
| `tests/qa-independent-audit.mjs` | The readout rule's unanswered test |
| `tests/qa-fullpage-sweep.mjs` | The dash-cell finding, `WHOLE_PRODUCT`, the count-up cell, the blind contrast probe |
| `tests/verify-webkit.mjs` | §5's ink-dash count compared against Blink's rather than restated |
| `design-specs/web/section-01-hero.md` | Form A deleted; §7 re-written as the ruled single-row strip with its why; assertion 8 re-based; the stale re-base table retired (rule 15) |

#### 3. The two bugs, with the assertion each one lands with

**Bug 1 — §2's replay did not reset both panes.** `restart()` now calls `rewindPanes()` after the
state attribute lands, so the rewind is written against the idle layout rather than the end-state
one. Assertion: *"§2 replay returns BOTH panes to the top — terminal and narration"*, driven through
the **rendered control** (`.replay__controls button`), at 1280 × 900 and 375 × 553, printing each
pane's before → after against its own scrollable extent so a pane that never moved cannot be read as
a pass. Measured before the fix: **narration 990 of 991 at 1280, unchanged by the press**.

**One correction to the brief's premise, measured rather than assumed.** The brief says neither pane
returned to top. In Blink, the terminal already did — `restart()` was setting `log.scrollTop = 0`,
and at 375 the log went **480 → 0** before any change of mine. What did not reset was the
**narration rail**, and only at desktop, where it is the pane that scrolls. The fix covers both
because which pane scrolls depends on the viewport; the assertion exercises both and the evidence
line says which one was actually parked at each width.

**Bug 2 — §4's indicator stopped at slot 3.** Root cause found by measurement, and it is neither a
rounding error nor a short `max-scrollLeft`: at the track's end the last **two** sheets are both
wholly visible from **1600px up**, visibility ties, and the tie was broken by document order — so
the last segment could never light, at any scroll position, on any screen that wide. Below 1600 the
last sheet wins the ratio outright and the bug is invisible. Measured at the track's end before the
fix: `1600px [0,0,100,100]% → slot 3` · `1728px → slot 3` · `1920px → slot 3` · `1280px → slot 4`.

Two things had to change. Rest is now resolved from geometry — most visible, earliest on a tie,
because with `scroll-snap-align: start` the earlier of two equally visible sheets is the one on the
snap line — **with the end of the track as its own case**, recognised from the boxes (the last
sheet's end edge plus the scrollport's end padding sitting on the scrollport's end edge, while the
first sheet is no longer whole). The last sheet's own snap point lies past the maximum scroll, so
nothing aligns there and what the reader has arrived at is simply the end. And an observer alone
cannot see it: across the entire run between "the last sheet became whole" and the end of the track,
**no intersection ratio changes**, so there is nothing to fire on — a passive, rAF-coalesced scroll
listener drives the same resolution. Neither path reads or writes a scroll position, so the shell's
"no script touches the scroll" assertion holds as written.

Assertion: *"§4 (d2) at the track's end the LAST segment is the lit one — including where the last
two sheets are both whole"* — programmatic scroll to the end, at **1280 and 1600**, expecting the
last segment for the last sheet (both counts read from the DOM, never from a share heuristic of the
harness's own). It prints each sheet's visible share and how many are whole, so the evidence shows
the tie regime being exercised. Verified after the fix at every snap point at 960 / 1280 / 1440 /
1600 / 1728 / 1920: **1 → 2 → 3 → 4** at every width.

#### 4. Couplings re-based

HO-042's eleven, all landed: the parser; prose 3 → 4 (asserted as *the deliverable's count*, not as
`4`); `cells.length` → the deliverable's slot count; `SEED_KEYS` down to two, with `SHIPPED`
reconstituted as `value + " — " + sub` and diffed byte-exact against the seed's
`bodh.day — App Store + web`; the commit-day check retired into a stronger property — **each card
carries exactly one cell-level sub-line, on the cell the copy file attaches it to**, which is the
diagonal the composition rests on; card-level captions **0 on both**, with `measured at launch`
asserted as the sub-line of card 2's dash; `siteOf` re-based to the prose figures; §5's count-up
block down to one counting cell (derived from the copy file's values, not listed here); the footer's
string equality (no change needed); §5's markup.

HO-043's six, all landed: `SHIPPED` values are accent — the split is now asserted as the
**answered/unanswered channel** (every answered value rust, exactly one ink em-dash) in both themes
and in WebKit; card comparability as four relationships, never a literal height, including each
sub-line's **hang below its own value**; one column edge across all four prose lines; the strip's
marks; the footer's units; the sweep's dash count.

**Content's finding is closed as Content described it.** `dashCells >= 4` would have passed after
the rebuild for the wrong reason — §5 does hold exactly four em-dashes, three of them prose
punctuation. It now counts `.readout__value--unmeasured` **elements** inside the card found by its
scope label and asserts **1**, and the evidence line prints both numbers side by side so the
distinction stays visible.

`WHOLE_PRODUCT` is re-based from strings to patterns (`/9\.3\s*(?:h\b|hours?\b|hrs?\b)/gi` and
friends), because `9.3 h` no longer renders as that string and an exact-string check would have gone
**blind, not red**. Planted: a second rendering in a *different* format elsewhere on the page —
`9.3 hours` in §6 — is caught (`shipped-with-muster ×1 · get-started ×1`). The old check could not
have seen it.

#### 5. Five couplings the brief did not list, found by running

1. **`verify-shell.mjs`: "registration marks: two per instrument surface"** — a hard
   `every(s => s.marks === 2)`. Form B gives the remnant one mark, so this went red. Re-based to the
   ruled relationship: two per surface, **one where the end corner is let to an interactive
   element**, which is `page-shell.md` §8's own wording.
2. **`qa-independent-audit.mjs`: the readout rule derived "unmeasured" from "has no digit."**
   `bodh.day` and `THIS PAGE` have no digits, so the check demanded ink for both and failed the
   ruled treatment. Re-based to the em-dash as the unanswered glyph — and strengthened: the page
   carries **exactly one** unanswered value, which is the relationship the dash's meaning rests on.
3. **`qa-fullpage-sweep.mjs`: "§1's remnant says `measured at launch`"** — true before this round,
   false by ruling now. Replaced with its inverse plus the page-wide count: §1 makes no unmeasured
   claim, and `measured at launch` occurs **exactly once page-wide**.
4. **`qa-fullpage-sweep.mjs`'s contrast probe went BLIND, not red.** It read `#hero .remnant__key`
   and skipped missing selectors with `if (!el) continue`, so retiring the strip's cells silently
   dropped a surface from a check that still claimed to measure it. Every selector must now resolve;
   an absent one is reported as `ABSENT — probe found nothing` and fails. Re-targeted to
   `.remnant__scope` and extended to §5's key and sub-line. Planted by renaming the class: red, both
   themes.
5. **`verify-webkit.mjs` asserted `inkDashes.length === 4`.** Re-based to compare against the count
   **Blink measured in the same run**, read out of `blink-report.json` — the claim this file uniquely
   owns is that WebKit paints the dash in ink, not how many there are.

#### 6. Every plant, and what went red

Each was applied to the committed tree, run, and reverted; `git status` was clean between plants and
is clean now.

| # | Plant | Runner | What went red |
|---|---|---|---|
| 1 | `measured at launch` moved from the dash's cell to a card-level caption | shell | sub-line-attachment (`card 2: [null,null] against ["measured at launch",null]`), the one-dash check (`captions 0+1`), pair comparability (`sub-line hangs 12 vs px`) |
| 2 | `readout__value--unmeasured` dropped from the dash | shell · audit · sweep · WebKit | shell: dash computes `rgb(192,90,50)`, and the light-theme split · audit: `"—" #C05A32 ← content and modifier disagree`, both themes · sweep: R4 · **WebKit: `0 ink cluster(s) … rust dashes 1 · Blink counted 1`** |
| 3 | `data-countup` added to `bodh.day` | shell | counting-cells (`SHIPPED/bodh.day: static`) and the roll check |
| 4 | `App Store + web` → `App Store + Web` | shell | seed byte-equality, on the reconstituted cell |
| 5 | §5's new prose line deleted | shell | prose verbatim (`3 rendered against 4 authored`), the primary line, the card/line count, and `siteOf` (`activeBuild "9.3" ×0 · cost "$147" ×0`) |
| 6 | The bottom-right mark restored to the strip | shell | mark count (`{"on":"remnant","marks":2}`), **and the collision clause: `regmark--br overlap 3.13px²`, 1 element on the chip's border box, at 1280 and at 320/360/375/390** |
| 7 | A readout put back into §1 | shell | `strip reads "THIS SITE · SPEC → LIVE VERIFY OPERATOR ATTENTION — measured at launch"` |
| 8 | `.pagefoot__unit` set to `white-space: normal` | shell | `"never invoked" ×2 rect` at 1280, `"Kanwar Sandhu" ×2 rect` at 375 and 320 — the founder-visible defect, reproduced |
| 9 | `footer-copy.md`'s published count 35 → 36 | shell | `35 words rendered against 36 published` — the check reads the file |
| 10 | The narration rail's rewind removed | shell | `1280px: narration 990→990 of 991` |
| 11 | The indicator's end-of-track case removed | shell | `1600px: … (2 whole), segment 3 of 4 lit` while 1280 still passed — the exact regime |
| 12 | A `Key 3` row added to `section-05-copy.md` | shell | cell count (`2/2 cells against the deliverable's 3`) — **and no crash**, which was the point |
| 13 | The cell's reserved sub-line row removed | shell | key-for-key alignment and pair comparability, with the ragged heights printed |
| 14 | `font-weight: 700` on the primary `<p>` | shell | one column edge — `widths [685.31, 685.31, 744.81, 685.31]`, the 64ch defect reproduced |
| 15 | A transition on the dash under reduced motion | shell | the dash-inert check (`static none/1s`) |
| 16 | A second `9.3 hours` added to §6 | sweep | `shipped-with-muster ×1 · get-started ×1` |
| 17 | `$147` removed from §5's prose | sweep | the figure's site check, and the mid-roll AX check (`the prose 9.3 hours` — only one of two) |
| 18 | `.remnant__scope` renamed | sweep | contrast, both themes: `ABSENT — probe found nothing` |

#### 7. Cross-engine

Rendered and looked at, not merely asserted. **Blink**: §1, §5, the footer and §2-after-replay at
1280 and 375 in **both themes**; §4's track end at 1600. **WebKit** (`qlmanage`): §1 whole, and §5
and the footer isolated, in both themes — same composition, same values, same ink/rust split, the
`APP STORE + WEB` sub-line under `bodh.day` and `MEASURED AT LAUNCH` under the dash, and the footer
setting three lines with both units whole.

**No WebKit evidence exists at any phone width, and none for §4's track end or §2's replay in any
condition.** `qlmanage` is the only WebKit on this machine: it executes no JavaScript and renders at
a fixed ~1024² whatever size is requested. Every phone number in this handoff is Blink's and is
labelled as such; the two JS-driven behaviours are Blink-only by construction, and that is a gap in
the evidence rather than something the runners cover.

#### 8. Measured versus judged

**Measured**: every runner count; the indicator's slot at each snap point across six widths; both
panes' scroll offsets before and after the press at two viewports; the mark/chip overlap in px² and
per axis; the footer's client rects and line counts at 1280/375/320; §5's card heights, row tops,
sub-line hangs, column widths and computed colours in both themes; the WebKit ink/rust clusters.

**Judged, not measured**: that removing the dead `.remnant__*` and `.shipped__caption` rules is
right rather than out of scope (HO-043 said the strip needs no CSS change, which is true of the
render; leaving ~60 lines of unreachable CSS on a page that argues from build quality is not); that
retiring `section-01-hero.md`'s stale re-base table is durability discipline rather than deletion of
someone's work; that the end-of-track clause is a principle rather than a special case.

#### 9. Two findings, neither a launch blocker

1. **`section-05-copy.md` ends with a stray `</content>\n</invoke>` (2 lines).** A tool-call artifact
   in a Content deliverable, present before this round. It is outside every parsed section so no
   check reads it and nothing ships from it, but it is in a public repo that the page's footer links
   to as a receipt. Swept the rest of `design-specs/`, `VERIFY.md` and `knowledge-base/*.md` — this
   is the only file affected. **Not fixed here**: it is Content's file, and this round writes its own.
2. **`section-01-copy.md` §5 still specifies §1 strings that no longer ship** — `ACTIVE BUILD`,
   `COST · API LIST`, the two dashes and the `measured at launch` caption. The `THIS SITE · SPEC →
   LIVE` label and the chip are correct. Nothing is coupled to it (no runner reads the file) and
   nothing ships from it, so this is documentation drift, not a page defect. Left for Content for
   the same reason.

**One accuracy note on HO-043 and DEC-064**, offered because I built on it and checked it. The
bottom-right mark's overlap with the chip is real and I reproduced it — `0.63px × 5px = 3.13px²` at
1280, 375, 320 — but **only on the single-row strip**. On the strip as it actually shipped before
this round, the mark sat **147.67px below** the chip and the boxes never intersected. So the
overlap was a property of the proposed form, not of the page "today"; HO-043's own gloss (*"it only
became visible as the strip shrank"*) is the accurate half. The ruling is unaffected — the mark is
gone either way, and the harness now fails if it returns.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-31 — HO-043 (UI/UX): **accepted, no revision.** Every ruling was chosen from a rendered
  proposed state and each names its engine and viewport, which is the standard this project asks for
  and does not always get. Three things earn the acceptance beyond the rulings themselves: the
  two-cell card was *measured* rather than assumed safe (card heights equal at 361.8px, sub-lines on a
  shared reserved track at 42.0px, so the diagonal asymmetry reads as a matrix answered rather than as
  an omission — contradicting this brief's premise that it would need fixing); the alternative
  composition was disqualified on measurement, not taste (475.6px against 361.8px); and the `THIS PAGE`
  colour ruling checked its own consistency argument and reported that it did not survive — §1 rendered
  that string in ink because a spec once flattened all three strip values, never as a ruling about the
  string. Two defects were found that nobody asked it to look for: the registration mark overlapping
  the chip's border box, and the footer breaking the founder's name across lines at 375 and 320. The
  contact sheet earned the founder's verdict in one sitting, which was its whole job.

- 2026-07-31 — HO-042 (Content): **accepted, no revision.** The two prose defects PM ruled were built
  as ruled, and the form Content chose over PM's draft is better than the draft: naming Bodh in the
  measured line rather than opening bare — because the nearest antecedent above it is *its website
  wave*, the one scope those figures are not — removes the page's most dangerous ambiguity for one
  repeated word, and `Bodh, idea to live:` matches the card label verbatim so prose and card bind
  without a sentence saying so. VERIFY.md's economics landed with the scope trap handled: the driver
  figures are labelled a floor, twice, and cannot be read as filling the page's dashes. The handoff's
  eleven-item coupling list was accurate and saved Developer a rediscovery pass, and the one item it
  flagged as a *finding* rather than a re-base — the four-em-dash check that would have passed for the
  wrong reason after the rebuild — is exactly the class of blindness this round was hunting.

- 2026-07-31 — HO-041 (QA): **accepted, no revision.** The re-run's worth is not its three green counts —
  PM reproduced all of them cold anyway (**295/295 + 27/27**, **108/108**, **43/43**) — it is **plant 11**,
  the plant that did *not* go red and was reported as such. Lighting a second segment in the markup turns
  nothing red in `verify-shell.mjs`, because the observer repairs the state before any rendered check
  looks; rather than quietly dropping the plant, the handoff names the division that makes it safe
  (**source truth in the sweep, rendered truth in the shell**) and proves the rendered half genuinely
  falsifiable from CSS. A round that reports a negative result and then shows why it is not a hole is the
  standard this sprint has been trying to reach. Two disclosures earn the same credit: a
  `\b`-escaping bug that made the forward-promise matcher return zero hits for **every** word — the
  blind-by-construction class, caught by self-testing against a known-present word — and two plants first
  aimed at the runner that does not own the assertion, re-run against the one that does. The cross-engine
  claim is scoped honestly: masthead **scale** is asserted in Blink only, and the handoff says so instead
  of letting 27/27 imply otherwise.

- 2026-07-30 — HO-040 (Developer): **accepted, no revision.** Every ruling ships and PM re-measured the
  load-bearing ones on the shipped tree rather than reading them: masthead **18px word · 9 × 13.5 mark =
  0.5em × 0.75em**, separator pennant 6 × 9, `--bar-h` **48px unmoved**; the indicator's four segments at
  **x 128 → 1152**, the page's own rail, segment 1 in `--accent` and three at hair, **transition 0s and
  animation none on all four**; §5's three lines on **one column edge** (685.31px each) with the 700 run
  covering the whole claim; the footer's plain border gone (`border-top: 0`), one sentence, 35 words at
  lead scale. **The most valuable thing in the handoff is the sixth plant**, which found that stripping
  `is-active` broke nothing because the observer restores it — a page shipping four dead segments for the
  no-JS reader passed every rendered check. The fix asserts the guarantee in the source and only there.
  §5's `64ch` defect is the same discipline pointed at the author's own first draft: weighting the `<p>`
  resolved its column **8.7% wider** than its neighbours', and the harness caught it, not a reading.
  Both caveats — squash-merge reachability and VERIFY's provisional pin — were flagged rather than buried;
  **the pin is ruled in DEC-061**, and PM's own stress test found the gap beside it (below).

- 2026-07-30 — HO-039 (UI/UX): **accepted, no revision.** Five candidates rendered for one lockup, and the
  founder's own artwork **rejected on measurement** — the cream glyph composites at ~1.08:1 on the light
  ground, invisible — is the round declining a founder-floated shape with a number instead of a
  preference. The cascade clause is the discipline: `--bar-h` is asserted unmoved, so the hero fold
  arithmetic, §2's phone visibility budget and `--scroll-pad` all stand, and PM confirmed 48px on the
  shipped build. The indicator is chosen against a rendered alternative (the continuous thumb reads as a
  loading bar) and is aligned **by construction** — rail → rail-end are the same edges the resting sheet
  composes to, which is why the founder's misalignment cannot return by drift. F-R2 is settled by the
  contrast number rather than by taste, and the accent-mark idiom is recorded as **declined without a
  render**, which the revision log corrected before filing. The F-R1 memo prices its own options
  honestly, including that option 1 re-spends the founder's phone check — **PM's ruling and
  recommendation ride to the founder in the final packet.**

- 2026-07-30 — HO-038 (Content): **accepted, no revision.** The false word is gone from the copy that owns
  it, and the fix is stated as an application of the founder's resolved string rather than a rewrite — one
  word, 21 words unchanged, and QA later proved it **byte-identical (125 bytes) across all three seats**.
  §6's line does the harder thing: it draws a model-proof claim from the founder's safe-today material with
  **no forward promise anywhere in rendered text**, and strengthens §3's thread instead of repeating it.
  The two deliberate drops ("over markdown", "zero model tokens") show the repetition audit being applied
  to the author's own new sentence while it is being written, which is the right place for it. **F-R8 is
  filed as a memo with nothing applied**, exactly as asked — the discipline that made it rulable at this
  review. PM's ruling: eleven verdicts accepted, item 12 declined and re-ruled (DEC-061). One accuracy
  note, not a revision: the memo's `Muster` row counts "×7 prose" where **five** render — two of the
  seven are `<title>`/meta, which the memo's own scope excludes. The verdict is unaffected.

- 2026-07-30 — HO-037 (QA): **accepted, no revision.** The value of this re-run is not its three green
  counts — it is that **both alignment assertions were watched to fail on their own plant**, and the
  formation one reproduces the founder's F-B1 finding to the hundredth of a pixel (−173.81px), so the
  check measures what he saw rather than a proxy for it. The footer was verified by a script that parses
  `footer-copy.md` instead of retyping its strings, participation was re-derived from `git log` rather
  than read off the copy file it is meant to check, and the cross-engine result is labelled per engine
  with WebKit's 0.5px antialiasing delta stated rather than rounded away. The discarded method in the
  revision log — a widest-inked-row bus-bar scan defeated by the dark theme's grain — is disclosed with
  the note that no number from it survives into the handoff; that is the standard. The active-line budget
  it flagged is cleared by this review. OBS-017 ruled — see DEC-058.


- 2026-07-30 — HO-036 (Developer): **accepted, no revision.** PM re-ran all three runners cold on the
  shipped tree (suite GREEN both engines **282/282 + 27/27**, audit exit 0 at **108/108**, sweep exit 0 at
  **42/42**) and then **planted two violations of its own** rather than reading the handoff's plant list.
  A one-word drift into the footer's team line turned exactly one check red, naming the team line and
  printing `team line equal: false` — the measurement, not a constant. Zeroing `--track-bleed` turned two
  red and printed *"ground between the track's end and the screen: 128px"* — the founder's judged dead
  strip, reproduced by the harness as a number. Both reverted, tree clean. The three harness defects the
  step found by planting are each the OBS-015 shape (a constant where a measurement belongs), and it found
  them in its own new code. The 44px coarse-pointer miss the audit caught rather than the author is
  disclosed instead of folded in quietly. Two build decisions are stated rather than buried; the uppercase
  receipts transform is ruled in DEC-058. OBS-016 ruled there too.


- 2026-07-30 — HO-035 (UI/UX): **accepted, no revision.** Every ruling was measured before it was written,
  and PM re-measured each on the **shipped** build rather than on the proposal: hub centre − axis **0.0px**
  at 1280 *and* 1440, and the rail is one number for every block on the page (eyebrow, h1, formation and
  curl all at 128 at 1280; all at 24 at 375, footer included). F-B2 is ruled on measurement, not taste —
  paging fails because four of six sections exceed the 553px phone fold. **F-B3's phone half is the one
  place this round does not do what the finding asked**: the founder said §4 stacked is far too long, and
  the section got *longer* — PM measures **3042.1px at 375** against the 2957 he judged, the ordinal's
  cost. (The 3071px in DEC-057 is the *proposed* state's figure, measured on
  `samples/gate-b-proposed.html`; 3042.1 is the shipped build. Both stand — different artifacts —
  noted so a later reader does not chase the 29px.) The handoff says so instead of smoothing it, and disqualifies every shrinking alternative on
  measurement (the accordion hides 12 of 16 rows from the find-in-page the founder is about to test). That
  is a defensible answer to a taste finding, and it goes to the re-gate labelled as one. The
  scroll-padding-percentage trap found by prototyping is the class of thing that ships silently broken.


- 2026-07-30 — HO-034 (Content): **accepted, no revision.** The footer line is the one string on this page
  a skeptic can audit role by role, and it names the three roles that did **not** run rather than only the
  five that did. PM re-derived the counts from `git log` on this branch — pm 49 · developer 14 · ui-ux 10 ·
  qa 8 · content 6 · **marketing 0 · legal 0 · research 0** — and "5 of 8 agents, 1 operator" is true as
  written. The email is gone from **every shipped file**, not only from the footer: swept file-wide for
  addresses and `mailto:`, zero hits. F-B5 ships as mechanism with no wall-clock anywhere in the shipped
  set (grepped for hour spans, "overnight", "through the night" — none), which is the founder's own
  claimable form and R2's line. F-B4's rewritten trade-off states the file-based mechanism instead of
  denying it, and PM read it on the rendered page rather than in the copy file. The first person in
  decision 4's mechanism row is inside R7's two permitted places (§4's decisions are founder-supplied), so
  it is not a violation. The self-caught VERIFY.md rewording that would have broken the sweep's asserted
  roster qualifier is the standard. **One departure from the seed was checked rather than assumed**:
  the receipts row carries six links where the seed's footer names five, and the sixth — the framework
  repo — is founder-supplied in DEC-056's answer 1, so it is authorized source, not an addition. The
  drift this review *did* find is in PM's own file, not Content's: `copy-rules.md` R8 still blessed the
  superseded "8 agents, 1 operator" and R9 still said "one GitHub link" — both fixed in place, DEC-058.


- 2026-07-29 — HO-030 (QA): **accepted, no revision.** The sweep is the instrument six criteria had no
  instrument for, and PM re-ran it cold — 42/42, exit 0 — rather than reading its summary. Its most
  valuable act is the one it was not asked for: it found that its own §2-exemption evidence prints a
  constant (OBS-015), disclosed that the figure HO-029 quotes as evidence is that constant, and declined
  to edit another role's file to hide it. That is the standard. **PM reproduced the finding firsthand**
  by planting §2's exemption away: the check went red while printing "0 of 13 gated rests moved," and the
  zero-request checks printed "none external" while listing a planted `x.png`. Verdict recorded before
  accepting HO-029, so that handoff's §2 bullet was read as "the check was green," never as a
  measurement. The decision to report the footer placeholder rather than assert it is also right — a red
  check would have misreported a known open item as a sweep failure.


- 2026-07-29 — HO-033 (QA): **accepted, no revision.** The step's literal deliverable was satisfied on
  arrival and the handoff says so in its first paragraph instead of claiming a repair it did not make.
  It then found the real subject — a harness that can hang silently is not fixed by a run that happened
  to finish — and closed it with the one unbounded external wait bounded and named, proven by planting a
  stalling `qlmanage` (pre-fix: 120 s blocked, zero output, killed; post-fix: red in 60 s naming the
  render). **The brief's own leading hypothesis was bisected and refuted rather than confirmed**, and the
  handoff states plainly that the original hang does not reproduce from the committed tree instead of
  inventing a culprit. Companion fix to `verify-webkit.mjs` disclosed rather than folded in quietly.
  OBS-014 accepted as closing OBS-006's question: the step did have a subject, and this was it.
