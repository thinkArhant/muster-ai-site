# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### HO-016 — The phone log reads as entries and the rust mark sits one way in both layers

**From**: Developer · **To**: QA (validate), PM (review) · **Date**: 2026-07-26 · **Status**: open

**Deliverable**: `styles/replay.css`, `scripts/replay.js`, `tests/verify-shell.mjs`, and four re-based
constants in `tests/qa-independent-audit.mjs`. DEC-029's F-R1 and F-R2 resolutions, built to the
amended `section-02-replay.md`.

**Harness**: `bash scripts/test.sh` green on both engines — **156/156 Blink, 13/13 WebKit**, up from
146/13. `qa-independent-audit.mjs` re-run and **still exits zero at 106/106**.

---

#### What changed, and the measurement that stands behind each

**1. The log's leading splits below `--bp-wide` (F-R1).** Rows take `--lead-micro`; entries are
separated by `--gap-hairline` as `margin-block-start` on every line but the first. Above `--bp-wide`
`--lead-terminal` stays and no separator is added — a desktop entry is one row, so the leading already
*is* the separation.

Measured at 375 × 553: **entry-to-entry whitespace 18.5px against row-to-row 6.5px — 2.85×**, on a
19.5px row pitch, a 39.0px entry box and a 51.0px pitch. Those are §7.1's numbers to the pixel. Core
520.4px of 553 (three whole entries in 141.0px of line region), so the split funded itself exactly as
DEC-029 said it would.

**2. The accent gutter moves from the line to the log (F-R2).** `.log` carries a 12px
`padding-inline-start` at every viewport and the line's hanging indent falls to 1ch. On the narration
side the card's inline-start padding drops to `--gap-hairline` and the entry's own padding takes the
difference.

The pair measures **12px / 12px in three states**: desktop with no playback state, desktop mid-chain,
and phone mid-chain. Desktop's first character sits at **14px** from the terminal's inner edge — the
same x it sat at before — and the first row still holds **76 columns** against L3's 74, so the gutter
is arithmetically free above `--bp-wide` as §9.1 claims.

**3. The window quantises on measured entries.** `quantiseWindow()` solves
`N × box + (N−1) × separator ≤ view` from a measured box and the resolved separator, never from 51.0px.
At 320 × 568 the entry box measures 58.5px (three rows) and the window correctly falls to **two**
entries — the ceiling trap sprang exactly where DEC-030 ruling 2 said it would.

---

#### The four rulings, each with what it actually caught

1. **The desktop rail's inset is set in two places.** Confirmed and both fixed. Changing
   `.narration`'s padding alone leaves `.replay[data-state] .narration__list { inset: --gap-flow }`
   deciding the bar's position for every state the reader ever sees with JS on — idle, playing and end
   all carry a `data-state` attribute, so the "static" 12px would have been visible only with JS off.
   The list's `inset-inline-start` is now the card's padding restated. **Both desktop states are
   asserted separately in the harness**, and the mid-playback one is the load-bearing check.
2. **51.0px is a ceiling.** Nothing reads it. The quantiser measures; §7.1 rule 4's mechanism is what
   is built. Verified at 320px, where a literal build would have placed a clipped third entry.
3. **`--line-box` was `--text-terminal × --lead-terminal`.** It was also dead — declared in `.replay`
   and read by nothing. Deleted rather than corrected, with a note saying why a single row constant
   cannot exist here now.
4. **The continuation cue halved.** The indent and the separator are asserted as two properties, at
   ~7.8px and 12px. A build that silently drops the separator now fails on the ratio (it collapses to
   1.0×) rather than leaning on a cue too small to carry the grouping.

---

#### The check that would have caught F-R1

`phone: entries are separated from rows by at least 2×, measured`. It reports both figures as
whitespace between glyph boxes — the thing the eye actually reads — from two independent measurements:
the row pitch from `Range.getClientRects()` (rendered rows) and the separator from layout offsets
(transform-free, so a half-revealed chain cannot skew it), taken as the **smallest** gap in the chain
so one lost boundary fails rather than being averaged away.

This is the property nothing else covered. Fidelity, the height budget, the column count and the parity
assertions all pass against a log whose eight rows read as eight things instead of four — that is
precisely how the previous round shipped green.

Five more checks landed alongside it: the window's **resting position** (318 samples, every one on an
entry's box edge, never inside a separator), the **two-row constant measured at 360/375/390/393**, the
**37-column floor** at every phone width, the **separator's survival** at all five widths, and the
**desktop first row** at ≥74 columns with every line at one row.

---

#### Four things worth QA's attention

- **360px sits exactly on the floor.** Measured 296.0px = **37 columns**, which is §7.1's floor with
  nothing to spare. The table's 5.7px of margin is real but it is under one column, so the count is 37
  and not 38. Nothing is wrong; it is the reason §12 asks for a measurement there rather than a
  derivation, and it means any future pixel taken from the line region costs a row at 360px.
- **393px measures 42 columns where §7.1 derives 41.** The advance measures 7.83px against the
  spec's 7.847px. Margin spent in the reader's favour, reported not asserted.
- **Landscape measures 40 columns**, matching §7.1's 314.2px derivation, with 4 whole entries visible
  in headless Chrome's full 375px of height. The check binds at 37 and reports 40.
- **`offsetTop`/`offsetHeight` are integers.** At 320px, where an entry box is 58.5px, differencing
  them reads the 12px separator as 11px or 12px depending on subpixel position. The quantiser reads the
  resolved margin instead, and the harness rect-differences wherever the reveal transform is uniform.
  A ±1px wobble feeding a `floor()` is not something to leave in.

#### Four constants re-based in `qa-independent-audit.mjs`

Per the queue's Execution Mode line. All four encoded superseded geometry against what is now a correct
build; **no assertion was loosened beyond what DEC-030 ruled**, and nothing was added to that file:

1. Landscape bound at `columns >= 41` → **`>= 37`**, §7.1's floor, with the measured count in the
   detail. At 40 it would have gone red against a correct build — the assert-something-adjacent
   failure DEC-030 named.
2. `floor((553 − 379.4) / 49.4) = 3` → **`floor((553 − 379.4 + 12.0) / 51.0) = 3`** in the mobile
   window check's derivation string.
3. The 320px block's prose and check name, from the 49.4px line constant to the 51.0px entry pitch.
4. The "three wrapped lines" framing → three whole **entries**.

QA should re-derive these against the spec rather than against this handoff — the same way HO-014
handled the last round's re-base.

#### Not in scope, untouched

Timing, SP7 and every narration string. The 48.00 s schedule, the ten reveal offsets and the 4.80 s
gate hold are unchanged; measured drift is unchanged. Fidelity is structurally unchanged — a soft wrap
inserts and removes no character, and all twelve lines diff byte-clean at 320/360/375/390/393. The
reduced-motion and no-JS paths still render the complete transcript.

#### Open questions

None. The `64ch` reading-column question is the founder's and does not touch this step.

#### WebKit ceiling

Unchanged and stated rather than assumed: `qlmanage` runs no JavaScript and renders at a fixed ~1024².
WebKit's evidence is the no-JS complete transcript in both themes; **every phone and landscape figure
above is Blink evidence and is labelled as such.**

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-26 — HO-015 (UI/UX): the phone log groups into entries and the rust mark takes one 12px
  inset in both layers; accepted with notes, no revision (DEC-030). Everything re-derived at review: the
  379.4px core item by item, the 39.0px entry box and 51.0px pitch, all five viewport rows unchanged at
  3/5/5/5/5, and the 2.85× ratio confirmed as whitespace between glyph boxes — 18.5px against 6.5px,
  where a single leading gives 11.7px on both sides, so the absolute entry gap *rises* while the section
  gets 7.2px shorter. The load-bearing floor was checked by simulating greedy `pre-wrap` against the
  corpus rather than against its citation: all of L1–L11 hold at two rows down to exactly 37/36 columns
  and L3 breaks first below it, with zero rounding margin at the floor — which is what makes §7.1's
  measure-at-360px requirement real rather than ceremonial. Neither closed guarantee was touched.
  **Four unnamed breakages routed to the build step**, the sharpest being that the desktop rail's inset
  is set twice and the live one wins, so the obvious fix passes a static check and is wrong on screen for
  the whole chain. **Three spec corrections applied rather than returned**: "line region" meant two
  different widths in one file, §9.1's 12px contradicted §7.1's yield clause (the invariant is the
  equality, not the number), and §12's landscape check bound at a derived 40 with under a tenth of a
  column of headroom — the same assert-something-adjacent failure class that has already cost this
  project three checks. The open item ruled by amending `page-shell.md`: the leading in a
  component-scoped pairing is the one-row case. Full detail in git history.

- 2026-07-26 — HO-014 (QA): §2 re-validated after the fix wave; accepted. `qa-independent-audit.mjs`
  exits zero for the first time at 106/106 with 9 measurements, and the four superseded assertions were
  re-derived against the spec rather than re-read from the producer's handoff. Six checks added for §12
  rows that only the shipping harness had carried. Findings disposed: the four superseded assertions
  confirmed spec-superseded, the `pre-wrap` hanging-space red confirmed as a check defect and re-based,
  the audit's growth ratified, and the landscape line-count qualifier now applied to the gate packet so
  the founder does not read a correct measurement as a miss. Both 320px items stay deferred (DEC-027).

- 2026-07-26 — HO-013 (Developer): §2 rebuilt to the amended spec and copy; accepted. SP7 and all ten
  narration slots diffed against the narration file at 10/10, the phone terminal wrapping with three
  whole lines at 375 × 553 and the core at 479.52px against 479.54 budgeted, timing untouched at 4 ms
  worst drift. The 320px constant-trap PM routed at the previous review sprang exactly as predicted and
  was avoided by measurement. Both landscape figures confirmed by measurement rather than derivation.
  Superseded on the mobile log by DEC-028's two gate findings, which is the fix round DEC-029/DEC-030
  close. Full detail in git history.

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
