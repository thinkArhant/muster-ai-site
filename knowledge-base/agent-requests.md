# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-25 HO-003 — Page shell built, both themes, verified on both engines
**Type:** handoff
**Producer:** Developer
**Deliverable:** `index.html`, `styles/{tokens,base,chrome,motifs}.css`, `scripts/count-up.js`,
`tests/` (harnesses + fixture), `knowledge-base/architecture.md`
**Status:** in-review
**Reviewers:**
- [ ] QA — pending
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
