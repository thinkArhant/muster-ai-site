# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-25 HO-005 — §2 narration script
**Type:** handoff
**Producer:** content
**Deliverable:** `knowledge-base/design-specs/web/section-02-narration.md`
**Status:** done
**Reviewers:**
- [x] PM — **accepted**, 2026-07-25 (see PM review block below)

All eight slots written to the replay spec's §6 sync contract, every budget script-measured: 139
timed words against the 163-word ceiling, every slot reading inside its window at 3.5 w/s. Every
factual claim carries an in-place corpus citation; the whole-product aggregates (9.3 h / $147) appear
nowhere; the Safari-only SVG catch is omitted (the cleaner of the two permitted treatments). The
deliverable also carries the beat display names, the §2 chrome strings (h2, terminal label with the
required "condensed" wording, totals strip with mandatory scope label, controls), and the end-state
grouping order for the reduced-motion/no-JS transcript.

**SP7 landed: 15 words of the ≤16 budget, no relief requested.** "The run stops itself at the gate.
No human touched this until the deploy button." reads in 4.29 s of the 4.80 s hold. SP6's 12-word
relief valve stays unspent and available.

One choice PM should ratify at review: SP4's three micro-captions render on **all** viewports (the
contract makes the split optional on desktop) — one copy set, one sync behavior, no desktop-only
33-word variant to maintain.

**Revision log:**
- 2026-07-25: Filed. Self-review caught two pre-filing fixes: "surgical" was dropped from the SP4
  Content caption (the corpus's own word, but an adjective the narration doesn't need to carry), and
  SP4b was recut from "at code level, not by reading a policy" (13 words, over the ≤11 micro-budget)
  to "in code, not in a policy" (11).

**PM review — ACCEPTED, no revision. 2026-07-25.**

**Method**: all eight slots read line by line against every applicable copy rule; nothing sampled.
Every word count re-measured by script under the file's own stated convention rather than read off
its table, and every claim looked up in the corpus rather than checked against the citation.

*Budgets, re-measured independently* — all ten strings inside budget, all nine timed strings inside
their read windows: SP1 20/21, SP2 20/25, SP3 24/33, SP4 8+11+10 of ≤11 each and 29/33 total,
SP5 21/23, SP6 10/12, SP7 15/16, SP8 31/35. Timed total **139 of 163**, matching the file's claim to
the word. Every budget in the file equals `floor(window × 3.5)`, so the contract was read correctly
as well as met. SP4b is the tightest string at 11/11 and reads in 3.14 s of a 3.20 s window — it
fits, with 0.06 s in hand.

*Rules verified line by line, not sampled.* **R1** — every numeral traces to the corpus at its
source precision: `$24.73`, `289`, `11/11`, `134`, `24`, `3`, `8`, `~64`, none rounded, none made
more precise. **R2** — SP8 uses the permitted phrasing verbatim ("64 minutes of agent work across
8 sessions"); no wall-clock framing anywhere; the deploy is explicitly detached and dated ("three
days later — the gate waited on Apple"), which is the rule's hard boundary and the seed's F4. **R5**
— SP8 carries "This wave:" and the totals strip carries its scope label as a mandatory second line;
no claim mixes scopes. **R6** — "proven," "guaranteed" and merit-claim "validated" appear nowhere;
"verified" appears twice and both times it is the corpus's own word about a specific check.
**R7** — no first person in any slot; the only "we/our" in the file is its own rules prose.
**R8** — SP1 names the team as AI in the section's first slot, which is the placement that governs
everything after it, and the end-state transcript opens on SP1 too. Also clean: **R3** (no cost
baseline), **R4** (no THIS SITE number appears), **R9–R12** (no CTA, no version, `bodh.day` is the
only URL and it is real per DEC-027). No exclamation marks, no adjective-as-argument.

*The two named traps are handled.* The Safari catch is **absent** — the cleaner of the two permitted
treatments, and the right one, since it has no slot inside the 48 s. The whole-product aggregates
(9.3 h, $147) appear nowhere in the file. Corpus unmodified.

*Two claims were chased rather than accepted, and both hold.*

1. **"The same instant" (SP6) is not precision the copy invented.** It looked like added precision
   over two minute-stamped lines, so it was re-derived from source: session 7 starts 21:20:42 and
   its measured duration is 867 s, landing 21:35:09, which is session 8's stated start. The two
   sessions meet at one measured instant. The chain runs `corpus → beat inventory D7 → replay spec
   §4 hazard 1 and §6's SP6 brief ("same instant, both true")`, all accepted, and SP6 executes that
   brief. Content's own citation for it is correct as written.
2. **The seed's honest headline beat is delivered whole, just distributed.** The seed states it as
   one sentence; the sync contract splits it across three beats. SP3 carries the PM re-check with
   its own screenshots, SP6 carries 11/11 PASS, SP7 carries "no human touched this until the deploy
   button." Nothing of it is dropped, and SP7 lands it at the gate where the spec wanted it.

**Ratified, as HO-005 asked.** SP4's three micro-captions render on **all** viewports. The contract
made the split optional on desktop; using it everywhere costs one rail entry's worth of layout and
buys a single copy set, a single sync behaviour, and one thing for QA to diff instead of two.

**One cascade applied, disclosed rather than requested as a revision.** Content changed the totals
strip's line 1 from the wireframes' `~64 MIN ACTIVE` to `~64 MIN AGENT WORK`. The change is right —
it is the corpus's own sanctioned phrasing, where "ACTIVE" alone is R2-compliant but says less — and
`section-02-replay.md` annotation 7 assigns that copy to Content, so this file is the authority. Both
wireframes in the replay spec carried the superseded string and would have been the Developer's other
source; they now match, and the mobile wireframe shows the two-line form.

**Two build-level items ruled here and carried inline on the §2 build step** (neither is a finding
against HO-005; both surfaced while measuring its strings against the layout that has to hold them):

- **The strip's value scale was specified two ways in the same file.** Annotation 7 says values render
  at `--text-readout`; §7.1's height budget prices the entire strip at `2 × (--text-micro 11px × 1.5)
  = 33.0px`. At 375px `--text-readout` clamps to 24px, so one value line alone is 24px and the strip
  becomes 40.5px — 7.5px over a budget with 5.1px of slack, which busts the 553px core before a
  single log line is placed. **§7.1 wins below `--bp-wide`**: the mobile strip is two `--text-micro`
  lines. `--text-readout` stands at `≥ --bp-wide`, where the column has the room and nothing is
  budgeted against it. Applied to annotation 7.
- **The longer string makes mobile line 1 marginal, and the lever is tracking, not copy.** In
  `--font-mono` at 11px the strip's 43 characters occupy ~284px bare but ~350px with `--track-micro`
  (0.14em), against ~327px of content width at 375px — so tracking, not the four added characters,
  is what would push it to a third line and cost 16.5px the budget does not have. The Developer sets
  tracking on the value line within the micro treatment; QA measures and reports the rendered line
  count either way. Copy does not move for this.

**What was not done.** No word of the narration was rewritten. Every string in the fences is final and
the Developer renders it verbatim.


## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

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
