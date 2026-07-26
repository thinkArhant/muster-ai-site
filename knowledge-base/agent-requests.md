# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

*None open.*

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

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

- 2026-07-25 — HO-002 (UI/UX): Design foundation + §2 replay spec. Closed — F1 resolved by HO-010 and
  the PM box ticked on the delivered budget, not on the wave moving on. Sixteen contrast ratios and the
  full timing model were re-derived independently at first review; the design direction, token system,
  and pacing model carried through the amendment unchanged. Full detail in git history.

- 2026-07-25 — HO-001 (Developer): Bodh corpus verified, §2 beat inventory derived. All six seed
  beats supported, no gaps, no HALT; all twelve terminal lines assigned. Accepted by UI/UX (as pacing
  input) and PM (with one figure superseded by corpus v1.1 — derived chain end `21:43:09`/3852 s is
  now measured `21:43:15`/3858 s, moving B6 480→486 s). Trued up by HO-009. Full detail in git history.
