# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-25 HO-006 — §2 replay built: the annotated transcript, playing to schedule
**Type:** handoff
**Producer:** Developer
**Deliverable:** `index.html` (§2 section), `styles/replay.css`, `scripts/replay.js`,
`styles/motifs.css` (the `.instrument` inset), `tests/verify-shell.mjs` + `tests/verify-webkit.mjs`
(harness extension). Renders land in `tests/artifacts/` and are git-ignored by design — regenerate
them with `bash scripts/test.sh` rather than reading a stale copy
**Status:** open
**Reviewers:**
- [ ] QA — pending
- [ ] PM — pending

**What shipped.** The complete annotated transcript is in the DOM at load: twelve corpus lines, ten
narration entries, the totals strip. Playback is an opacity reveal over it, driven by elapsed chain
time rather than a chain of timers, which is why pause, resume and skip are one code path. With no
JavaScript, or with reduced motion, the section is that complete transcript and the controls are not
built at all — there is nothing to control.

**Measured, not asserted:**
- **Fidelity.** All twelve lines diff byte-clean against `bodh-sprint4-corpus.md`, read off disk at
  test time rather than from a copy in the harness. Character counts match too, so nothing is
  truncated, padded, or re-wrapped. The reduced-motion transcript is diffed separately and also
  matches. The markup was generated from the corpus and the narration file by script, not retyped.
- **Pacing.** A real 48-second chain runs in the harness and its reveal offsets are recorded as they
  happen: **worst drift 0 ms** against §5.1 (tolerance 100 ms). Both same-stamp pairs land at exactly
  350 ms — one `--reveal` cadence. No event fires between 43.55 s and 48.00 s: the gate hold is silent.
- **The phone budget.** At 375 × 553 the §7.1 rows measure chrome 41.5 / card 199.39 / totals 33.0 /
  indicator 16.5 against 41.5 / 199.4 / 33.0 / 16.5 budgeted; the core is **499.89px** and five whole
  line boxes are visible. `.instrument`'s inset is 48px of a 327px card (14.7%, was 35.3% at 320px).
- **Cross-engine.** Blink 129/129, WebKit 13/13 — `bash scripts/test.sh` is green end to end.

**Engine scoping, stated plainly (DEC-021.4).** WebKit's evidence is the no-JS complete transcript:
`tests/artifacts/webkit-{dark,light}-s02.png` render all twelve lines verbatim in both themes, with
L12's large-rust treatment, the §9 emphasis system, terminal chrome, grain and ground parity measured
against the Blink report. The harness renders that view by hiding `#hero` in a copy of the page —
`qlmanage` ignores the requested size, so a section below the hero never enters its frame; nothing
else is altered, and the no-JS path is precisely what this engine is here to verify. It is a
differential test: ink coverage with §2 present is 17.5 points higher than with it hidden, so a blank
or unstyled §2 fails rather than passing quietly. **Everything else in this handoff is Blink
evidence** — playback timing, the visibility gate, the windowed terminal, media queries, horizontal
scroll containment, and every mobile measurement. None of it is cross-engine verified.

**Two bugs the harness caught in me, both of which would have shipped:**
1. The window scrolled to the end of the DOM on each reveal. Every line occupies its space from load,
   so that parked the five-line window over unrevealed lines and the phone showed an **empty
   terminal** for the whole playback. It now follows the newest revealed line. The check that proves
   it compares revealed lines against lines inside the window box.
2. The visibility gate measured the core against the raw viewport, so a core tucked under the sticky
   status bar read as fully on screen. The observer's root is now inset by the bar's 48px. The gate
   correctly refuses to play at 90.6% and runs at 100%, and both directions are asserted.

**Three deviations from the specs, each with its reasoning:**
1. **The narration rail is 22rem with a 38.5rem floor under the terminal, not a literal 36ch**
   (`styles/replay.css`). `36ch` of the sans resolves to ~385px here, which leaves the terminal under
   the ~599px that L3 needs — so the spec's own guarantee that all twelve lines fit a desktop without
   horizontal scroll fails at *every* width, including the 1280px case §7 works through. The rail
   yields to the terminal instead: 352px (~33ch) at 1280px and up, narrower between there and
   `--bp-wide`. This was found by the WebKit render, which clipped four lines before the fix.
2. **The controls sit on their own row below the core, not inline with the totals strip.** On a phone
   the controls must be outside the height-budgeted core and the totals must be inside it, so the two
   cannot share a parent. At 960px an inline arrangement wraps anyway.
3. **The chrome label's tracking tightens below `--bp-wide`** (0.02em, from `--track-micro`). §7.1
   prices the chrome bar at one micro line; at 0.14em the label wraps to two at 375px and costs the
   budget 16.5px it does not have. Same lever the totals value line uses, same reason.

**Rulings implemented as directed:** DEC-021.1 (`.instrument` fluid inset, no second breakpoint — a
`clamp()` that resolves to 24px at 375px and exactly 48px at 960px), DEC-022.3 (per-viewport totals
scale: `--text-readout` rust at `≥ --bp-wide`, `--text-micro` ink below it, because rust at 11px sits
below AA), DEC-022.4 (tracking, not copy — the accepted 43-character string is untouched and measures
inside the content width), DEC-020 (the harness was extended, not replaced; still zero dependencies).

**Revision log:**
- 2026-07-25: Filed. Self-review caught nothing further; the two bugs above were caught by checks
  written before the behaviour was trusted, which is the reason they are in the harness rather than in
  this paragraph as "verified by inspection".

**Observations:**
- OBS-001 — The narration rail scrolls its own overflow on desktop   Severity: low
  Evidence: `section-02-replay.md` §10 expects the rail not to exceed the terminal's height "at spec'd
  budgets — verify". It does: ~170 words in a 352px column is roughly twice the terminal's 377px. The
  rail therefore scrolls and follows the active entry, which §7's wireframe annotation anticipates
  ("rail follows active entry"). Nothing is unreachable and no line is lost.
  Suggested action: PM decides whether the spec's expectation should be corrected to match.
- OBS-002 — The totals value line wraps to a third line at 320px   Severity: low
  Evidence: 43 characters at `--text-micro` need ~284px bare against 272px of content width at 320px.
  It holds at the budget case (375px, measured 1 line) and the §7.1 budget is stated for 375 × 553.
  Suggested action: none this sprint — the fix would be shortening accepted copy or shrinking type
  below the budgeted size, and neither is the Developer's call.
- OBS-003 — `bodh.day` is not a link   Severity: low
  Evidence: §11 says it "may link out". A real `https://` href would be the only external URL in a
  shipped file, and the harness asserts there are none.
  Suggested action: PM decides; it pairs naturally with the §6 domain question.


## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

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
