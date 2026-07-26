# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-26 HO-018 — §1 and §3 copy; SP3 shortened and measured clear at 320px
**Type:** handoff
**Producer:** content
**Deliverable:** `knowledge-base/design-specs/web/section-01-copy.md`,
`knowledge-base/design-specs/web/section-03-copy.md`, amended
`knowledge-base/design-specs/web/section-02-narration.md` + `index.html` (SP3, applied together
because the harness asserts the strings identical)
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Summary:**
- **§1**: four headline candidates with per-candidate announced strings — A the anchor, B the
  founder's edit mark with the article break repaired (★ recommended; announced string
  `Ship a product with AI agents.`), C the ambiguity resolved in words, D the name as collective
  noun. One shared subline (11 of 12), the measured line reframed off "this build" to
  `Bodh … idea → live` in primary (18 of 20) and compact (12 of 14) forms, eyebrow verbatim,
  formation label sets for both hub readings pending the founder's formation ruling, readout strings
  with dashes + `measured at launch`, the curl verified identical by string equality, terminal
  chrome labels shared with §2 so the wave scope is carried by the label.
- **§3**: kicker (10 of 12) + one paragraph (85 of 90). CrewAI/AutoGen clause ships **named** —
  ruling and grounds in the file §5, with the 63-word cut pre-authored so "cut, not softened" is
  executable without reopening copy (DEC-035).
- **SP3 lever pulled** (DEC-027.1 → DEC-035): 24 → 19 words, beat preserved. Measured resolved:
  audit reports 5 lines at 320px against the 6-line card; timed total now 134 of 163.
  `scripts/test.sh` GREEN and `qa-independent-audit.mjs` 106/106, exit 0 — both run foreground this
  session. Pre-launch 320px item closed on that evidence.

**Revision log:**
- 2026-07-26: Self-review caught the acceptance criterion "every string carries a word count and
  budget" colliding with locked strings that may not vary (role names, curl, readout values) —
  resolved by stating equality-verification for locked strings in §1's rules rather than inventing
  unfalsifiable budgets.

**Observations:**
- OBS-001 — Stale SP3 counts in PM-owned context   Severity: low
  Evidence: `agent-context/content.md` (SP3 at 24 words, timed total 139 of 163); historical
  mentions in `wave-review.md:60` and Resolved handoff one-liners are records of their moment and
  need no edit.
  Suggested action: PM refreshes `agent-context/content.md` at next cascade.
- OBS-002 — Audit report prose now stale on two rows   Severity: low
  Evidence: `qa-independent-audit.mjs:1151` prints "SP3 is N characters, the longest slot" (computed
  live, still true at 134 chars) and the 320px SP3 row still says "DEC-027.1 — deferred"; both are
  report labels, not assertions.
  Suggested action: tidy wording in the spacing-system step, which already re-bases audit checks.
- OBS-003 — Totals-strip third line at 320px no longer reproduces   Severity: low
  Evidence: audit reports the value line at 2 lines, 246.34px of 272px content width at 320px
  (DEC-027.2 expected a third line).
  Suggested action: none — recorded so the next §2 measurement doesn't treat the old figure as
  baseline.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-26 — HO-017 (QA): rebuilt phone log validated green on every criterion; entry split and the
  single 12px accent inset both hold, cross-engine. Accepted at gate 3 with one carried defect — the
  key-beat tick collides with the timestamp, folded into Sprint 2's spacing system (DEC-032).

- 2026-07-26 — HO-016 (Developer): phone log reads as entries and the rust mark takes one inset in both
  layers. The log's single leading split into a row pitch and an entry separator, so entries sit ~2.85×
  further apart than the rows inside them and the section got 7.2px *shorter*. Two re-gate findings were
  corrected in the doing: the tick was flush at every viewport, not only mobile, and the horizontal room
  was never spent — the corpus holds at two rows down to 37 columns against 41 shipped. Full detail in
  git history.

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
