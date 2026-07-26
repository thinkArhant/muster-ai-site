# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### HO-013 — §2 rebuilt to the amended spec and copy
**From**: Developer · **To**: QA (validate), PM (review) · **Date**: 2026-07-26 · **Status**: open
**QA sub-status**: validated 2026-07-26 — every criterion green, no build defect found. See HO-014.
Every figure in the table above was re-measured independently rather than accepted; all reproduce.
**Deliverable**: `index.html`, `styles/replay.css`, `scripts/replay.js`, `tests/verify-shell.mjs`

**What changed.** Two things, and only two. Timing is untouched — measured worst drift against §5.1 is
**4 ms** across all twelve reveals, the 0.35 s pairs land at 350/346 ms, the gate hold is silent, and the
chain runs 48.16 s wall.

1. **SP7 now renders the operator's arc**, verbatim from `section-02-narration.md`. Not retyped and not
   trusted: the harness now reads all ten slot strings out of the narration file's §3 fences and diffs
   them against the DOM — **10/10 identical**. A stale or re-keyed slot cannot pass again.
2. **The phone terminal wraps and the totals strip moved out of the core.** `white-space: pre-wrap` with
   a 2ch hanging indent at every viewport, `overflow-wrap: break-word` as an unreachable backstop, and
   `.totals` lifted out of `.replay__core` in the DOM.

**Measured against the numbers the step named.** Every figure below is a render measurement, not an
assertion re-stated:

| Item | Budgeted | Measured |
|---|---|---|
| Fixed core (less the 48px sticky bar) | 331.4 | **331.4** (core 479.52px against 479.54 budgeted) |
| One wrapped corpus line at 375px | 49.4 | **49.38** |
| Whole lines at 375 × 553 | 3 | **3**, all eleven chain lines at exactly two rows |
| Line region at 375px | 325px / 41 cols | **323px / 41 cols** at a 7.83px advance |
| Chrome bar · card · indicator | 41.5 · 199.4 · 16.5 | **41.5 · 199.39 · 16.5** |
| Totals strip | 33.0, below the core | **33.0**, outside `.replay__core` and below it |

**The trap was real, and the constant would have sprung it.** §7.1's `floor((VH − 379.4) / 49.4)` at
320 × 568 returns 3. Measured, the region is narrower, the two longest lines cost **three** rows, and one
line is **74.06px** — three lines would not fit and the third would have been clipped mid-rows. The
window is now quantised on the tallest measured *chain* line (L12 is excluded: it is the one line not set
at `--text-terminal` and it is revealed outside the chain), so 320px falls to **2 whole lines** on its
own. The clamp floor moved from 3 to 2 to match §7.1.

**The scroll rule had to change with it, and that is the non-obvious part.** The old window parked the
newest line's bottom on the fold. That is the same rule as "whole lines only" exactly while every line is
one row — once a line is two or three rows, bottom-alignment leaves the *topmost* line sliced through its
rows, which §7.1 rule 2 forbids. The window now walks back from the newest line while whole lines still
fit and aligns its **top** to that boundary. Proven, not argued: a full 48 s chain at 375 × 553 sampled
**319 times**, never a partial line, and exactly `min(revealed, 3)` whole lines in frame at every sample.

**The two landscape figures, confirmed as asked.** Both were derivations; both are now measurements at
667 × 375.
- **Chrome bar: 41.5px, not the budgeted 58px.** The label sets one row at a 330px column, so the
  conservative two-line budget does fall to 41.5px exactly as flagged — 16.5px under budget.
- **Worst narration slot: SP3 at 8 lines / 231.13px, against 7 lines / 228.3px budgeted.** It exceeds the
  budget by **2.83px** and therefore sits *inside* the 14.2px slack §10 states. **The priority order was
  not invoked and the beat indicator stays.** The overrun's cause is that the column sets ~27 characters,
  not the ~29 §10 derived — the derivation omitted the card's own 24px padding and the entry's 14px
  inset. The card holds it with 29.4px to spare.

**Three deviations, each stated against the file.**

1. **The log line's 12px inset is dropped below `--bp-wide` and kept above it.** §7.1 derives the line
   region as the terminal's full inner width — 325px / 41 columns at 375px, 78 columns at `--bp-wide` —
   with no horizontal inset in it, and the whole two-rows-per-line constant rests on that width. Keeping
   the 12px would leave the longest line one character of margin on its continuation row. Above
   `--bp-wide` there are ~78 columns against a 74-character longest line, so the gutter is affordable and
   is kept: **desktop is visually unchanged.** The visible cost is on a phone, where a log line now starts
   flush against the terminal's border. That is a look judgment, not a measurement, and it is UI/UX's to
   overrule.
2. **The 2ch hanging indent is expressed as `padding-inline-start: 2ch; text-indent: -2ch` on the line,
   which puts the first row at the region's left edge** — matching §7.1's literal CSS. Above `--bp-wide`
   it becomes `calc(--gap-hairline + 2ch)`, preserving today's gutter. Measured: continuation rows start
   15.66px right of their first row.
3. **Landscape is rebuilt rather than adjusted.** §10 now puts the terminal in the wider column, so the
   split is 55fr/41fr — the terminal's floor is the wrap rule (measured **41 columns**, §10's exact
   floor), not a share. The core takes a *definite* height there rather than a ceiling: with an auto
   height the grid row sizes to the terminal's content and hands the narration whatever the terminal
   happens to leave, which is backwards for a narration-first section. The card now fills its column and
   scrolls its own overflow where the column is shorter than the longest slot, instead of holding a fixed
   line count that cannot be right at two viewport heights at once. Terminal shows **4 whole lines**
   (§7.1 budgets 3 — this is above budget, not below).

**Two items reproduce at 320px and are deferred, not open** (DEC-027.1–2), reported as instructed and not
touched: SP3 overflows the six-line narration card, and the totals value line wraps to a third strip row
(49.5px). The value line keeps `0.02em`, not `--track-micro` — measured **294.23px against 327px** of
content width at 375px, 32.77px clear of a wrap.

**Build state.** `bash scripts/test.sh` **GREEN on both engines: 146/146 Blink, 13/13 WebKit** — extended,
never forked (DEC-020). Twelve lines byte-clean against the corpus at 320 / 360 / 375 / 390 / 393px, no
line needing a sideways gesture at any of them, reduced-motion and no-JS carrying the complete transcript,
zero external requests through playback. Founder-authored files unmodified.

**One thing QA must re-base, and it is not a build defect.** `qa-independent-audit.mjs` is at 95/100. One
red is the deliberate `64ch` one. **The other four are assertions of the superseded spec, and every one of
them is now asserted in its corrected direction by `verify-shell.mjs`**: line 1042 wants five whole lines
(now three), line 1058 wants lines never to wrap (they now must), line 1153 requires the log to scroll
horizontally (nothing may), line 1166 wants the narration in the wider landscape column (the terminal
takes it). The RPRT at §10's landscape line count also cites a superseded 7. These are QA's file to
correct; flagged here so the next session does not spend the time diagnosing a green build.

### HO-014 — §2 re-validated after the fix wave; the audit is a signal again
**From**: QA · **To**: PM (review) · **Date**: 2026-07-26 · **Status**: open
**Deliverable**: `tests/qa-independent-audit.mjs` — **106/106, exit 0**, 9 measurements reported

**The headline is the exit code.** `qa-independent-audit.mjs` exits zero on a clean build for the first
time since the band check was written. That was the acceptance criterion, not a nicety: the audit had
been red on a correct build for two waves, and a check that is always red is a check nobody reads.

**Per criterion.**

| Criterion | Verdict | Evidence |
|---|---|---|
| DEC-023: band check retired, audit exits zero | **PASS** | 106/106, exit 0. The number survives as a report: 90 prose characters in 685.3px at 1440px |
| Twelve lines byte-clean; SP7 diffed against the narration file | **PASS** | 12/12 identical, 679 characters, codepoint counts equal · 10/10 slots verbatim from `section-02-narration.md` §3, 1082 characters |
| 3 whole lines at 375 × 553, none clipped | **PASS** | 3 whole and **0 sliced** in a 148.13px window; 192 samples across a full chain, none partial, never more than 3 in frame |
| 320px: no line clipped part-way through its rows | **PASS** | 192 samples across a second full chain at 320 × 568, 0 sliced; window 148.13px over a 34-column region |
| No horizontal gesture at 320 / 360 / 375 / 390 / 393px | **PASS** | Measured per character. Tightest line 1.42px clear (390px); rows per line `223223232222` at 320px, `222222222222` at 375px |
| Nothing scrolls horizontally at 375 / 320 / 200% | **PASS** | Body contained and unmasked at +0px at all three; the log no longer scrolls in either axis horizontally |
| Reduced motion and no-JS complete; zero runtime requests | **PASS** | 27 strings identical to the motion end state; 9 loads across a full chain, all `file:`/`data:`; page renders complete with the network off |
| Cross-engine on WebKit and Blink | **PASS**, scoped | WebKit carries the no-JS transcript in both themes — 12 row bands, L12's 27px against a 19px median, +1604/+1534 accent pixels, chrome bar and vignette. **Every mobile figure above is Blink-only** |
| Founder source material unmodified | **PASS** | All three files carry only `founder:` commits with a clean working tree; corpus blob unchanged since `025842c` |
| Two 320px items deferred, not open | **REPRODUCE** | SP3 sets **7 lines** into the 199.39px six-line card, measured mid-playback; the totals value line sets **2 lines**, strip 49.5px. Reported, not fixed |

**Four findings for PM.**

1. **The four superseded assertions were spec-superseded, not build defects — confirmed by re-deriving
   each against the spec, not by reading HO-013.** Five whole lines → three is §7.1's own
   `floor((553 − 379.4) / 49.4)`; never-wrap → must-wrap is DEC-026; the log's horizontal scroll →
   nothing scrolls is §10's retirement of the WCAG 1.4.10 exception; narration-in-the-wider-column →
   terminal-in-the-wider-column is DEC-026 consequence 2. Each is now asserted in its corrected
   direction **by an independent measurement**, not by pointing at `verify-shell.mjs`.

2. **A new check went red at all five phone widths against a correct build, and the check was wrong.**
   The first version measured line overflow from the range's own client rects. Under `pre-wrap` the
   space a line breaks at is preserved and **hangs up to 5.97px past the content edge** — an overflow
   containing no ink, which no reader can be asked to scroll for. Re-based to measure the last
   non-space character. **This is the same failure class as the 45-character floor and the band check**:
   a check measuring something adjacent to the claim rather than the claim. Recording it because the
   pattern has now cost this project three checks, and the tell each time was a red that no build
   change could clear.

3. **The gate packet's landscape line count will read as a miss and is not one.** `wave-review.md`
   says landscape "now shows 3 lines by design"; the emulated measurement is **4**. Both are right —
   §10 derives 3 from Safari's ~331px landscape viewport, and headless Chrome gives the full 375px, so
   4 is the upper bound of that derivation rather than a re-measure of it. The audit says so in the
   report line. PM's call whether the packet wants the qualifier before the founder reads it.

4. **The audit grew from 100 checks to 106 and from 7 reports to 9.** Six of §12's rows had no
   independent assertion behind them and were carried only by the producer's harness: the per-width
   gesture check, the byte-clean-at-five-widths check, the hanging indent, the sampled window rule, the
   320px chain, and desktop's ≥74-column region. A criterion verified only by the harness that ships
   with the build is not independently verified.

**Harnesses re-run at review, not cited.** `bash scripts/test.sh` **GREEN — 146/146 Blink, 13/13
WebKit** on the same build. Nothing outside `tests/qa-independent-audit.mjs` was touched this session.

### HO-015 — The phone log groups into entries, and the rust mark gets one inset

**From**: UI/UX · **To**: PM (review), Developer (build) · **Date**: 2026-07-26 · **Status**: open
**Deliverable**: `knowledge-base/design-specs/web/section-02-replay.md` — §5.1, §7, §7.1 (rules 1–4,
budget, tables, wireframe), annotations 4 and 6, new §9.1, §10, §12, §13

Both findings are resolved as specified, neither by a compromise. **Neither needed to be paid for.**
F-R1 returns 7.2px of height and F-R2 costs the desktop exactly nothing; the phone's share of F-R2 comes
out of horizontal margin that was there all along and had never been written down.

---

**F-R1 — wrapped rows now group into entries. The mechanism is a split, not an addition.**

The log had one leading value doing two jobs. On desktop that works, because an entry is one row there
and the leading *is* the entry separation. On a phone an entry is two rows, so the same value separates
rows and entries identically — a ratio of 1.0×, which is the finding stated as a number. Below
`--bp-wide` the one value becomes the two it was standing in for:

| | Row-to-row inside an entry | Entry to entry |
|---|---|---|
| Pitch | 19.5px (`--text-terminal` × `--lead-micro`) | 31.5px |
| Whitespace between glyph boxes | 6.5px | 18.5px (`--gap-hairline` separator) |

**The ratio is 2.85×**, and the ratio is what the eye reads — not the absolute gap. A 6px margin bolted
onto the existing 1.9 leading would have bought 1.5×, spent 12px of the slack, and still needed parsing.

**Measured budget.** Entry box 39.0px, separator 12.0px, entry pitch 51.0px. A window of *N* entries
costs *N* boxes and *N* − 1 separators, so `visible = floor((visual VH − 379.4 + 12.0) / 51.0)`, clamped
[2, 12]. At 375 × 553 that is **3 entries in 141.0px of line region against 148.2px before**, so the
fix funds itself and returns **7.2px**: slack rises 25.4 → **32.6px**, and the guarantee floor falls
478.2 → **469.4px**. Not one viewport in §7.1's table loses an entry — 3 / 5 / 5 / 5 / 5, unchanged —
and the fixed core stays 379.4px, because nothing in it moves.

`--lead-terminal` and `--gap-hairline` are both shell tokens; no new size is introduced. **The one thing
PM should rule on**: `page-shell.md` states `--text-terminal` as `13px / 1.9`, a size/leading pair. §2
takes `--lead-micro` for its mobile row pitch, which departs from that pairing. My position is that the
pairing describes the one-row case and `--text-terminal` is explicitly component-scoped, so §2 stating
its own row pitch is inside the component's remit — but if you would rather the shell record the
per-viewport pairing, that is a one-line `page-shell.md` amendment and the shell is not my file to edit.

**Desktop is unchanged and deliberately so.** `--lead-terminal` (1.9) stays above `--bp-wide` and no
separator is added, because every desktop entry is one row and the leading already does the job. The
split exists only where an entry is more than one row.

---

**F-R2 — one inset, 12px, in both layers. And the finding was bigger than it was reported.**

**The diagnosis needs one correction, and it changes the scope of the fix.** `border-inline-start` sits
*outside* `padding-inline-start`, so the wide-viewport rule that insets the log's *text*
(`calc(var(--gap-hairline) + 2ch)`) never moved the tick. **The tick is flush at every viewport,
desktop included** — and desktop's mismatch is the wider of the two, because the rail's bar sits
`--gap-flow` (24px) in against the tick's 0. F-R2 reads as mobile-only; it is not, and a phone-only fix
would have left the larger version of the same collision on the screen most readers arrive on.

**The rule (§9.1)**: the accent mark is inset `--gap-hairline` (12px) from the inner edge of its own
card, in both layers, at every viewport. Reading text does not move in either.

- **Desktop: exactly zero cost.** The line's inset was already `--gap-hairline` + the hanging indent.
  Moving the `--gap-hairline` share from the line to the log leaves every character at the same x —
  600.0px of first row before and after, arithmetically identical — while the tick steps off the frame.
  The narration card does the same trick: its inline-start padding drops to `--gap-hairline`, the entry
  takes the difference, prose and rail measure unchanged, only the bar moves.
- **Phone: paid out of measured margin.** The gutter costs 12px of line region → **39 first-row columns
  / 38 continuation** at 375px, and the hanging indent goes 2ch → 1ch to release the continuation width
  that keeps 360px whole. Every one of L1–L11 still sets **exactly two rows** at 360 / 375 / 390 / 393
  and in landscape.

**The claim in DEC-028 that the horizontal room was already spent is wrong, and I checked rather than
argued.** Simulated greedy wrap against the corpus at every column width: **all of L1–L11 hold at two
rows down to a first row of 37 columns and a continuation of 36.** L3 (74 chars) is the line that breaks
first. The section shipped at 41/39 — four columns above its own floor — so the gutter was affordable
and nobody had written the floor down. §7.1 now states it: **37/36 is the constraint; anything above it
is margin.**

| Viewport | First row / continuation | Margin over the 37/36 floor |
|---|---|---|
| 375 | 311.0px = 39 / 303.2px = 38 | 20.7px |
| **360 (tightest)** | 296.0px = 37 / 288.2px = 36 | **5.7px** |
| 390 / 393 | 326.0–329.0px = 41 / 40 | 35.7–38.7px |
| landscape terminal column | 314.2px = 40 / 306.4px = 39 | 23.9px |
| ≥ `--bp-wide` | 600.0px = 76 / 592.2px = 75 | unchanged, 2 columns over L3 |

**What I could not verify and how it is handled.** These are derived on a uniform monospace advance.
Four corpus glyphs (`·` `✓` `×` `→`) can come from a fallback face, and **360px has only 5.7px of
margin** — under one column. So §12 requires the row count to be *measured* at 360 / 375 / 390 / 393
rather than trusted, and §7.1 states the fallback: the gutter yields, reduced in both layers together
so the single inset survives, never fidelity and never the entry count. Reducing it costs the narration
card nothing — a smaller inline inset widens the card's measure, which only relieves its six-line budget.

---

**What this could break that F-R1 and F-R2 do not mention** — the same question that produced this
round, asked forward:

1. **The window's scroll arithmetic.** It advances by entry *pitch* (51.0px), not by a row, and must
   come to rest on an entry's box edge — never inside a separator, which would show a fragment of gap at
   the window's top and read as a clipped entry. Stated in §5.1 and §12.
2. **The harness encodes the retired geometry.** `verify-shell.mjs` asserts `phone.columns === 41` and
   `region ≈ 323`, and landscape `columns >= 41`; `qa-independent-audit.mjs` carries the 49.4px line
   constant in three places. These are stale spec, not build defects — 39 / 40 and the entry model
   replace them. The build step re-bases them; QA should expect the diff.
3. **320px.** Already deferred and still deferred: 32 first-row columns / 31 continuation, the longest
   lines at three rows, and the clamp's two-entry floor holding. Two lines there before and after, so
   the gutter changes nothing that was not already outside the derived range.
4. **The `break-word` backstop stays unreachable** — longest corpus token 18 characters against a
   narrowest column of 31 at 320px.

**Would Apple ship this? — Yes.** Because the fix removes a value that was doing two jobs badly rather
than adding chrome to compensate for it, and because it costs nothing: no line lost, no character
hidden, no type smaller, 7.2px of height returned, and the horizontal floor that governs all of it
finally written down. The alternative I
rejected — banding the entries — buys the same grouping with a new surface value the palette does not
have and makes a terminal read as a data table. The alternative I nearly shipped, a 6px margin on top of
the existing leading, buys a 1.5× ratio for 12px of the `100dvh` safety slack, which is a compromise
shipped silently and the step told me not to do that.

**Open for PM:** the `--text-terminal` size/leading pairing above. Nothing else.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-26 — HO-012 (Content): SP7 reframed to the operator's arc; accepted, no revision. Recounted at
  review rather than read: 15 of 16 words, 4.29 s of the 4.80 s hold, SP6's relief unspent at 10 of 12,
  timed total unmoved at 139 of 163, every budget re-derived as `floor(window × 3.5)`. DEC-024's
  guardrail satisfied — zero adjectives-as-argument, the effect carried by tense landing on
  `awaiting operator`, deploy boundary intact ("deploy-ready," never "deployed"). All five arc beats
  verified in the corpus rather than against the citation table, and the one inferential step (the
  corpus's planning statement is agentless) chased and cleared on record. Full detail in git history.

- 2026-07-26 — HO-011 (UI/UX): §2's phone terminal wraps instead of scrolling sideways; accepted, no
  revision. Every figure re-derived from tokens at review — 379.4px core, 3 lines at 375 × 553 with
  25.4px slack, all five viewport rows, both landscape columns, the 478.2px floor — and the two build
  measurements land on the arithmetic to 0.01px. The load-bearing constant re-checked against the corpus
  itself: eleven of twelve lines exceed 41 columns and all of L1–L11 cost exactly two rows, longest
  token 18 characters against 34, so the wrap backstop is genuinely unreachable. Trade accepted on
  merits — the alternative to three whole lines is five first-halves. Four findings disposed, one spec
  gap closed (annotation 7 stated the fit constraint but not the tracking that achieves it), one
  implementation trap routed to the build step (§7.1's 49.4px constant is a ceiling below 375px and the
  window must be quantised by measurement). Full detail in git history.

- 2026-07-26 — HO-007 (QA): §2 replay validated; accepted. 20/20 criteria green, 7 measurements
  reported rather than asserted; `scripts/test.sh` 129 Blink + 13 WebKit, independent audit 99/100 with
  the single red left deliberately failing until the founder rules on `64ch`. Seven defects found and
  fixed in the audit itself — five had turned eight checks red against a correct build, and the WebKit
  row profile was blind by construction (bit-identical at 815375 inked pixels with all twelve lines
  hidden). Both harnesses re-run independently at review and both reproduce. Full detail in git history.

- 2026-07-26 — HO-006 (Developer): §2 replay built; accepted. Twelve corpus lines byte-clean, ten
  narration slots verbatim, schedule re-derived to exactly 48.00 s with worst drift 16.8 ms; phone core
  499.89px with both layers visible for 100% of the chain. Two bugs the producer's own harness caught
  before they shipped: an empty phone terminal for the whole playback, and a visibility gate that
  ignored the sticky bar. Three spec deviations accepted, each resolving a spec-internal contradiction.
  Full detail in git history.

- 2026-07-25 — HO-005 (Content): §2 narration written and accepted, no revision. All ten strings
  re-measured by script — 139 of 163 timed words, every slot inside budget and inside its read
  window, every budget correctly read as `floor(window × 3.5)`. Every rule verified line by line;
  the Safari catch absent, the whole-product aggregates absent, the corpus unmodified. Two claims
  chased rather than accepted and both held: SP6's "same instant" is measured at source, and the
  seed's honest headline beat is delivered whole across SP3/SP6/SP7. SP4's all-viewport split
  ratified; the totals-strip string ratified and cascaded into both replay wireframes. Two
  build-level items ruled alongside it and carried on the build step (DEC-022). Full detail in git
  history.

- 2026-07-25 — HO-004 (QA): Shell validated on both engines; accepted. Every acceptance criterion passes
  and no build defect was found. Both harnesses re-run at review — `scripts/test.sh` 86/86,
  `qa-independent-audit.mjs` 37/39 with exactly the two reported failures. All four items disposed in
  DEC-021 and none gated §2: F1 to the founder (diagnosis accepted, resolution parked non-halting), F2
  ruled with its cited blocker disproved, F3 applied to the spec, the `qlmanage` ceiling ruled and its
  residual named. The audit's 45-character floor was replaced rather than loosened — unsatisfiable at
  320px by arithmetic, and the build is fixed alongside it.

- 2026-07-25 — HO-003 (Developer): Page shell built in both themes, verified on both engines; accepted.
  79/79 Blink + 7/7 WebKit, harness shipping with the build (DEC-020). `<main tabindex="-1">` and the
  authored-text-is-final-value count-up both credited as correct-by-construction choices. One reasoning
  correction carried into DEC-021.1: OBS-001's claim that a responsive `.instrument` change would
  invalidate §7.1's budget does not hold — §7.1 budgets its own insets. OBS-002 applied to the spec,
  OBS-003 superseded by F1, OBS-004 deferred to §1/§5.

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
