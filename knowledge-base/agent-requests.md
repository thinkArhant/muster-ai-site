# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-25 HO-004 — Shell validated: every acceptance criterion passes, two readability findings for PM
**Type:** handoff
**Producer:** QA
**Deliverable:** per-criterion pass/fail with evidence (below); `tests/qa-independent-audit.mjs`,
`tests/fixtures/webkit-css-support.html`, `tests/fixtures/webkit-viewport-probe.html`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Verdict: the shell passes every acceptance criterion in the step, on both engines.** Two findings
below are readability decisions, not build defects — the build implements `page-shell.md` exactly and
`page-shell.md` implements the seed exactly. Both need a design call QA does not have, so the queue is
re-pointed to a PM assessment rather than promoted. Nothing here asks the Developer for a fix yet.

**Evidence, and what is mine.** `bash scripts/test.sh` → **86/86 green** (79 Blink + 7 WebKit),
re-run at session start and again at close. That is the producer's harness and it is a starting point,
not the finding. My own scope came from `page-shell.md` §§1–13 and the seed's Tech + Accessibility
lines: `node tests/qa-independent-audit.mjs` → **37/39**, 39 checks that re-derive rather than cite.
Where the two harnesses measure the same contract they were written independently and agree.

**Per-criterion.**

| Criterion | Verdict | Evidence (mine, re-runnable) |
|---|---|---|
| Cross-engine parity, evidence per engine | **PASS**, with a stated ceiling | Blink 1024×1024 vs WebKit 1024×1024, both themes, visually diffed. Structure, palette, spacing, rules, ticks, registration marks, status bar, grain and vignette all correspond; the only divergence is line-break position from system-font metrics, which is shaping, not layout |
| Zero runtime network requests | **PASS** | 7 loads at 1440, all `file:` or `data:` — the four stylesheets, the script, the document, the inline icon. Re-asserted in light and with the network stack switched off via CDP `Network.emulateNetworkConditions {offline:true}`: identical text, 0 console errors, full render |
| Body contrast ≥4.5:1 both themes | **PASS**, exceeded | Not sampled: **every** text-bearing element measured against its composited backdrop. 29 runs per theme, worst **5.16:1** dark / **5.13:1** light — both are `--muted` labels, and no body run falls under 12:1. The spec's own 16-ratio table re-derives to the digit |
| Landmarks and focus states | **PASS** | header/main/footer singular; 6 sections each `aria-labelledby` a heading they contain; `h1 h2 h2 h2 h2 h2`, no skips; 39/39 decorative constructions `aria-hidden`. Focus verified with a real dispatched Tab, not `.focus()`: first stop is the skip link, it matches `:focus-visible`, reveals to `top: 0`, rings at 2px solid accent / 3px offset, and activating it lands focus on `<main>` |
| Reduced motion renders complete content | **PASS** | 0 running animations, and every rendered string is compared character-for-character against the motion path — 17/17 identical. Count-based parity would have missed a truncation; this would not |
| No webfonts, no CDN, no build artifacts | **PASS** | 0 `@font-face`, 0 loaded webfonts, no `http(s)` in any shipped file, raw hex only in `tokens.css`, no `package.json` / `node_modules` / `dist`. Independent grep for `gtag|fbq|hotjar|sentry|plausible|analytics|beacon|sendBeacon|XMLHttpRequest|fetch(|WebSocket|EventSource`: **no hits** — the zero-requests claim holds at code level, not just at network level |
| Page renders with no network | **PASS** | see above — offline render is byte-complete |
| Scope derived from `page-shell.md` | **Done** | §§1–13 walked; §10's motion inventory, §2.3's rust rules, §4's one-sided spacing and §6's surface rules were each turned into a check the harness did not have |

**Things the producer's harness does not assert, which I added and which pass.** The full-ink rule
(A-007) — no `p`/`li` renders in `--muted`. The §2.3 rust floor — no element sets its own text in
`--accent` below 24px, in either theme. One-sided spacing measured as *rendered* margin rather than
grepped as source text: no element has a computed `margin-bottom > 0`. `::selection` composited by
hand — `--ink` over accent-at-30% is 10.2:1 dark / 8.14:1 light. Element-by-element overflow at 13
widths including ±1px around the 60rem breakpoint. Motion tokens compared to §10 literally.

**Two claims I tried to break and could not.** I expected `body { overflow-x: hidden }` to make the
harness's four no-horizontal-scroll assertions unfalsifiable, since that declaration propagates to the
viewport. It does not: I injected a 900px box at a 375px viewport and `documentElement.scrollWidth`
reported 901 against `clientWidth` 375 — the assertion fails when it should. I also re-ran every
viewport with the declaration lifted to `visible`; 13/13 still clean. The check is sound and the
`overflow-x` is belt-and-braces, not a mask. Recording the attempt because a future reader will have
the same suspicion.

**The WebKit ceiling — stated, not papered over.** `qlmanage` is the only WebKit available here, and it
has two limits the handoff must carry rather than absorb into a PASS:
1. **It does not execute JavaScript.** Verified with a probe whose body reads `JS DID NOT RUN` unless a
   script overwrites it; the render says `JS DID NOT RUN`. So the count-up engine, the
   `IntersectionObserver` gate and the skip-link focus move are **Blink-only evidence**.
2. **It ignores the requested size for layout** — it renders at a fixed viewport and scales the raster.
   Measured with `tests/fixtures/webkit-viewport-probe.html`: at `-s 375` the page still reports
   `≥1000px` wide and `≥1000px` tall (≈1024²). So **no WebKit evidence exists at mobile widths**, and
   media-query behaviour cannot be exercised there at all.

What I could still prove in WebKit, and did: `tests/fixtures/webkit-css-support.html` renders a
PASS/FAIL row per CSS feature the shell depends on. All ten pass — `color-mix()`, `:focus-visible`,
logical properties, `clamp()`, `position: sticky`, `tabular-nums`, space-separated rgb with alpha,
`color-scheme: dark light`, `text-decoration-thickness`/`text-underline-offset`, and SVG data-URI
backgrounds. Two live swatches paint the exact `color-mix()` values `--accent-selection` and
`--accent-wash` resolve to, over a magenta fallback: both render rust, so those tokens are real in
WebKit and not silently falling back. Re-run either with
`qlmanage -t -s 760 -o <dir> tests/fixtures/webkit-css-support.html`.

**This matters for §2, not for the shell.** §2's acceptance requires mobile-at-375 verification on
both engines. On this tooling that is not possible for WebKit. Better surfaced now, with a wave of
runway, than discovered at §2's gate.

**Findings.**

- F1 — the reading column renders ~90 characters, not ~64   Severity: med
  Evidence: `--read-max: 64ch` resolves to **685.31px**, and the seed says "reading column ~64ch"
  (line 228). But `ch` is the advance of `0`, which in `--font-sans` is 10.281px while the average
  prose character is ~7.6px. Measured by breaking the real placeholder paragraph at the rendered
  width: **~90 characters per line at every width from 959px up**, 74 at 768px, 67 at 200% zoom.
  WCAG 2.1 SC 1.4.8 caps a reading block at 80 characters, so 90 is outside a published ceiling, not
  just outside taste. The build is exactly to spec and the spec is exactly to seed — the gap is
  between `64ch` and what `64ch` renders.
  Suggested action: PM decides. A-007 puts layout in the locked set and says the direction is executed,
  not re-derived, and this value comes from the seed — so it is not UI/UX's to change alone and it is
  certainly not QA's. It wants deciding before body copy lands: §3 is a kicker plus one paragraph into
  this exact column.
  Confirms the *class* of problem in OBS-003 while disputing its size: the producer's "~66.7
  characters" counts how many `0` glyphs fit, which is a digit measure, not a reading measure.

- F2 — the prose column collapses on small phones   Severity: med
  Evidence: `.instrument` holds `padding: var(--gap-block)` = 48px a side at every width. Measured
  card and column: 375px → 327px card, **229px column, ~27 chars/line, 8 lines**; 360px → 214px,
  ~24; **320px → 272px card, 174px column, ~18 chars/line, 11 lines for a 199-character paragraph.**
  At 320px, 96px of a 272px card is padding. Confirms OBS-001 — the producer's ~28 characters at
  375px is right — and extends it: the 320px case was not reported and is materially worse.
  Suggested action: UI/UX decides whether the shell default steps down on narrow viewports. I share
  the producer's reasoning for leaving it untouched: `section-02-replay.md` §7.1 budgets its mobile
  core to the tenth of a pixel off shell tokens, so a silent responsive change here would invalidate
  a signed-off budget. That is an argument for deciding it deliberately, not for leaving it.

- F3 — `page-shell.md` §11's heading count is wrong   Severity: low
  Evidence: §11 says "one `<h1>` → six `<h2>` (section tags)"; §12 draws five tags (§02–§06) with the
  hero carrying the `<h1>`. Built as five `<h2>` + one `<h1>`, matching §12. §11 also contradicts
  itself — "Sections are `<section aria-labelledby>` their stencil-tag `<h2>`" cannot hold for a hero
  that has no tag. Confirms OBS-002. The build is right; the spec sentence is wrong.
  Suggested action: UI/UX corrects §11's count. No build change.

**Observations:**
- OBS-004 — count-up is fixture-verified, not page-verified   Severity: low
  Evidence: the shell instantiates no `[data-countup]` element, so `refresh()` returns early and every
  count-up verdict — in the producer's harness and in mine — rests on `tests/fixtures/count-up.html`.
  The engine reads correctly (authored text is the exact final value, dashes never animate, the final
  frame restores the source string rather than a recomputation) and the fixture evidence is real.
  Suggested action: none now. Re-verify against real readout cells when §1 or §5 lands, and note that
  a mid-roll value has no `aria-live` guard — assistive tech reaching the cell during the 1.2s roll
  would read an intermediate number. Worth a decision when a cell actually ships.

**Open questions (self-review item 6):**
- F1 and F2 both need a design decision; neither is QA's. Routed to the PM assessment step, not to
  Founder Decisions — PM is the sole party that calls the founder, and PM may well settle both.
- The WebKit ceiling needs a ruling on what §2's cross-engine criterion is allowed to claim. Left out
  of `founder-notices.md` for the same reason: PM decides whether the founder needs it.
- No decision was resolved this session, so `decision-log.md` is unchanged by design.

**Self-review caught.** Two of my own errors, both of which would have shipped false evidence. The
`.instrument` padding figure in the reading-measure evidence was read off the paragraph rather than the
card, so it reported `0px` where the real value is 48px — the number that makes F2 legible. And my
first pass labelled the three running CSS animations "exactly three ambient animations … no fourth
element", which reads as the three-element budget being filled; all three belong to the pulse alone,
and elements 1 and 3 are not instantiated in the shell. Relabelled. Separately, I did not tick the
Shell-validation box in `current-sprint.md`: it is a PM-owned protocol file (Rule 1).

**Revision log:**
- 2026-07-25: Filed. Build suite 86/86; independent audit 37/39, the two failures being F1 and F2.

### 2026-07-25 HO-003 — Page shell built, both themes, verified on both engines
**Type:** handoff
**Producer:** Developer
**Deliverable:** `index.html`, `styles/{tokens,base,chrome,motifs}.css`, `scripts/count-up.js`,
`tests/` (harnesses + fixture), `knowledge-base/architecture.md`
**Status:** in-review
**Reviewers:**
- [x] QA — reviewed, no build defects. Every acceptance criterion passes on both engines; see HO-004.
      OBS-001 and OBS-002 confirmed and carried as F2 and F3; OBS-003's class confirmed, its figure
      disputed and restated as F1.
- [ ] PM — pending

**What was built.** The shell of `page-shell.md`: the token system in both palettes, the type scale, the
one-sided spacing rhythm, both texture layers, the sticky OPERATIONAL status bar, five stencil section
tags on ruled ends, the six section slots, the footer, and the motif CSS the sections compose from
(instrument surface, registration marks, readout cell, chip, curl cursor). Motion element 2 (the pulse)
and motion element 3 (the count-up engine) are live; element 1 (hero stream) is the hero spec's, and the
replay is §2's. No theme control ships — the system honours `prefers-color-scheme`, and
`:root[data-theme]` remains as the escape hatch that lets verification force either theme.

**Evidence — both engines, re-runnable.** `node tests/verify-shell.mjs` → **79/79** (Blink);
`node tests/verify-webkit.mjs` → **7/7** (WebKit). Neither harness installs anything; see DEC-020.
Highlights:

| Claim | Measured |
|---|---|
| Zero external network requests | 7 loads, all `file:` or `data:` — dark and light |
| Body text, dark / light | 13.23:1 / 13.64:1 (ink on surface); headline 14.37 / 12.15 on ground |
| Labels and captions | 5.61 / 5.13 (muted on ground), 5.16 / 5.76 (muted on surface) |
| Worst-case composited vignette | muted holds 5.75:1 dark, **4.61:1 light** — §5's derived 5% light cap is confirmed, not assumed |
| Palette | Every one of the twelve values matches the seed exactly |
| Grain rasterises in both engines | Blink stdDev 2.847 on ground mean 20.12 · WebKit 2.563 on 19.834 |
| Reduced motion | `getAnimations()` empty; heading count and content unchanged from the motion path |
| Horizontal scroll | None at 1440, 375, 320, or 200% zoom |
| Count-up | Fires at 55% visibility, 9.3 rolls as 9.3, lands on the authored string, **0px width spread**, dash never animates, reduced motion renders immediately |
| Output hygiene | No `http(s)` in any shipped file · hex only in the token block · no `package.json`/`node_modules` · no bottom margins |

**Two things the spec left to the builder, and how they were resolved.** The grain is an
`feTurbulence` data URI with an alpha gamma curve biasing it faint, tiled at 1.4× — peak per-pixel alpha
is provably capped because the layer's own opacity (8% dark / 4% light) multiplies the source. And the
count-up is progressive enhancement in the strict sense: the element's authored text *is* the exact
final value, so with JS off, motion reduced, or no `IntersectionObserver`, the right number is simply
what stays on screen. The animation only ever replaces a value it can restore character for character.

**One accessibility fix beyond the spec.** `<main>` carries `tabindex="-1"`: WebKit does not move focus
to a non-focusable skip-link target, so without it the skip link would be silently inert in exactly the
engine this project already treats as a hazard.

**Scaffolding, and how to find it.** Every section slot holds a placeholder card marked
`data-shell-placeholder` (8 elements: `grep -c data-shell-placeholder index.html`). They are build
scaffolding, not page copy, and each is removed as its section lands. Two carry text Content owns and
should replace rather than inherit: the `<h1>`, which currently holds the seed's anchor headline
("Ship a product. Without a team.") so the heading tree is real and measurable, and the `<title>` /
`<meta description>`, which paraphrase the seed's own product description.

**Self-review caught.** Two harness bugs, both of which would have shipped a false green: the network
assertion counted the grain's `data:` URI as an external request (it never leaves the document), and the
reading-column check compared CSS `ch` against a measured 64-character string — see OBS-003, they are
different quantities. Also caught: the first version had no reduced-motion path for the curl cursor,
only for the pulse.

**Revision log:**
- 2026-07-25: Filed. 79/79 Blink, 7/7 WebKit, no known failures.

**Observations:**
- OBS-001 — `.instrument` padding is cramped on phones   Severity: med
  Evidence: `styles/motifs.css` `.instrument { padding: var(--gap-block) }`. At 375px that leaves a
  ~231px text column inside the 24px gutter — text wraps at roughly 28 characters.
  Suggested action: UI/UX decides whether the shell default steps down on narrow viewports. Left
  untouched deliberately — `section-02-replay.md` §7.1 budgets its mobile core to the tenth of a pixel
  off shell tokens, and a silent responsive change to a shared surface is exactly what would invalidate
  it. §2 sets its own padding either way.
- OBS-002 — `page-shell.md` §11 and §12 disagree on the heading count   Severity: low
  Evidence: §11 says "one `<h1>` → six `<h2>` (section tags)"; §12 draws five tags (§02–§06), the hero
  carrying the `<h1>` instead. Built as five `<h2>` + one `<h1>`, matching §12 and the tag strings there.
  Suggested action: UI/UX corrects §11's count, or PM decides.
- OBS-003 — a `64ch` column does not measure 64 rendered characters   Severity: low
  Evidence: Chrome resolves `ch` from font metrics (10.703px) while the shaped advance of "0" is
  10.281px, so `max-width: 64ch` renders ~66.7 characters at 685.31px.
  Suggested action: none — inside the spec's "~64ch". Recorded so it does not read as drift when QA
  measures the column.


## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-25 — HO-010 (UI/UX): Wave 1 gate amendments applied to both specs. Accepted with notes.
  Theme control dropped and the motion budget closed at three plus cursor; §2 rescaled to a 48.00 s
  chain with B5 restored to 14.48% funded entirely by B6; F1 resolved with a 424.4px mobile core against
  a stated 375 × 553 visual viewport and a ≥95%-visibility playback gate. All arithmetic re-derived
  clean. PM applied two factual corrections to pacing rationale (DEC-019, C1/C2) — no design value
  changed. Gate hold upheld at 4.80 s. Full detail in git history.

- 2026-07-25 — HO-009 (Developer): Beat inventory trued up to corpus v1.1. Accepted, no findings.
  Chain end and B6 measured at source (3858 s / 486 s), calls and cost corroborated by arithmetic to
  the unit and the cent, corpus unmodified at the founder's commit `025842c`. The self-caught margin
  error (B1, not B6, is second-shortest — B3 leads by 13 s) makes hazard 3 sharper. No downstream drift.

- 2026-07-25 — HO-002 (UI/UX): Design foundation + §2 replay spec. Closed — F1 resolved by HO-010 and
  the PM box ticked on the delivered budget, not on the wave moving on. Sixteen contrast ratios and the
  full timing model were re-derived independently at first review; the design direction, token system,
  and pacing model carried through the amendment unchanged. Full detail in git history.

- 2026-07-25 — HO-001 (Developer): Bodh corpus verified, §2 beat inventory derived. All six seed
  beats supported, no gaps, no HALT; all twelve terminal lines assigned. Accepted by UI/UX (as pacing
  input) and PM (with one figure superseded by corpus v1.1 — derived chain end `21:43:09`/3852 s is
  now measured `21:43:15`/3858 s, moving B6 480→486 s). Trued up by HO-009. Full detail in git history.
