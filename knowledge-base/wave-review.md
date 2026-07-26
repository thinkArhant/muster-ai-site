# Wave Review
<!-- File-mediated I/O contract between the autonomous sprint loop and the founder at a wave gate. PM-owned. Tier-2: read on demand only (at a wave gate / on resume), never a startup read. -->
<!-- The loop does NOT parse this file. PM writes the Output block at the gate; the founder writes the Verdict block; PM reads the verdict on resume (muster/scripts/muster-sprint-resume.sh). Keeping human feedback here — not in the orchestration queue — is the seam a future remote/mobile bridge plugs into. -->

> **This is the Wave 3 packet — the §2 replay gate.** The Wave 1 packet it replaces was approved with
> amendments on 2026-07-25 and its amendments were delivered and accepted (HO-010); that record lives in
> git history rather than here, so nothing describing a 60 s chain or a 7.5 s hold can be mistaken for
> the current state. The live numbers are a **48.00 s** chain and a **4.80 s** gate hold (DEC-016,
> DEC-018).

## Current Wave

**Wave:** 3 — the §2 replay: narration written, built, validated
**Build at:** the autonomous worktree on `sprint/auto-20260725-163930`. The live page is `index.html`
in that worktree; `bash scripts/test.sh` re-runs both engines' harnesses from there.
**Under review:** the live §2 section · `design-specs/web/section-02-narration.md` · HO-006
(Developer) · HO-007 (QA)

**Your criterion, restated because it is the whole gate**: the replay must be excellent on run-log
pacing and plain-English narration **with the styling mentally subtracted**. If it only works dressed,
that is the signal the seed's Sequencing section wanted in week one, and it is cheaper to hear now
than after §1 and §3 are built on top of it.

### Notices since last gate

Six, all from `founder-notices.md`, all FYI — none needs an answer:

- The gate hold landed at **4.80 s**, not the ~4.14 s DEC-016 projected, which bought SP7 a 16-word
  budget instead of 14.
- **SP7 is the one budget worth revisiting once you see it running** — ≤16 words with zero slack.
  Content landed it at 15 and explicitly did not spend the relief. SP6's 12 words are still available
  and need no reschedule.
- Two pacing-rationale claims written for the Wave 2 amendment were wrong and were corrected in place
  rather than costing a revision round; no design value moved (DEC-019 C1/C2).
- Wave 2 closed with no blockers; **one question is waiting for you** in the queue's Founder Decisions
  (the reading column renders ~90 characters, not ~64). It gates nothing before §3, in Sprint 2.
- **`100dvh` in mobile Safari is the one §2 behaviour no harness here can prove**, and §7.1's entire
  424.4px budget rests on it — worth 30 seconds on your iPhone at this gate. Everything else on mobile
  is Blink-verified and labelled as such.
- QA's finding that `.instrument`'s phone padding could not be fixed without breaking §2's signed-off
  budget was wrong on the arithmetic; the fix rode the build step (DEC-021.1).

### Already green — machine-verified, do not re-litigate

Evidence is in the HO-005 review block and, once they land, HO-006 and HO-007. Listed so your
attention goes to the judgment calls below rather than to arithmetic:

- **The narration fits its contract, measured not eyeballed.** All ten strings re-measured by script
  at PM review: 139 timed words of a 163 ceiling, every slot inside budget *and* inside its read
  window at 3.5 w/s. The tightest string (SP4b, 11/11 words) reads in 3.14 s of a 3.20 s window.
- **Every factual claim is sourced.** Each slot cites its corpus line in place; PM looked each one up
  in the corpus rather than checking it against the citation. The corpus is unmodified.
- **The two named traps are closed.** The Safari-only SVG catch is absent entirely. The whole-product
  aggregates (9.3 h, $147) appear in no slot. Every §2 number is a website-wave number.
- **Timing tiles exactly.** Dwells sum to 48.00 s, the six design shares to 100.00%, and each beat's
  cumulative dwell lands on its opening line's offset.

**Build and QA evidence, re-run by PM at the gate rather than read off the handoffs:**

- **Both harnesses reproduce.** `bash scripts/test.sh` is green end to end (129 Blink, 13 WebKit).
  The independent audit — written against the specs, not against the build — is **99 of 100**, with
  7 further measurements reported rather than asserted.
- **The one red is deliberate and is not a §2 defect.** It is the `64ch` reading-measure question
  below, left red because the threshold is satisfiable and the build simply does not satisfy it;
  turning it green before you answer would be laundering. `node tests/qa-independent-audit.mjs`
  therefore exits non-zero **on purpose** until you rule. `scripts/test.sh` is unaffected and green.
- **Fidelity holds at the byte.** All 12 terminal lines diff byte-clean against the corpus, read off
  disk at test time; 679 characters with equal codepoint counts, so nothing is truncated, padded or
  re-wrapped. All 10 narration slots render verbatim, 1069 characters. The corpus is proven
  unmodified from git, not asserted — all three founder-authored files carry only `founder:` commits.
- **The 48-second schedule tiles exactly.** PM re-derived it from the spec's own twelve offsets:
  the eleven intervals sum to **48.00 s** to the hundredth. Worst measured reveal drift is **16.8 ms**
  against a 100 ms tolerance, so the build matches the schedule it was specified to.
- **The phone budget is met with room.** At 375 × 553 the core measures **499.89px** against a
  553px budget, five whole line boxes visible, and both layers stay on screen for **100.0%** of the
  chain across 192 samples — measured under the 48px sticky bar rather than against the raw viewport.
- **The degraded paths are complete, not reduced.** Reduced-motion and no-JS both render the full
  transcript, string-identical to the motion path's end state. Zero non-`file:`/`data:` requests
  across a full 48-second playback, and the page renders complete with the network off.

**One caveat you should carry into your own testing.** Every mobile measurement above is **Blink
only** — 375 × 553, 320px, landscape, 200% zoom, the visibility gate, the windowed terminal and all
playback timing. WebKit's evidence is the no-JS complete transcript at a fixed render, both themes.
That gap is why the iPhone look below is worth your 30 seconds.

### Verify — human-only checks

Four things the machine cannot judge. All four are about pacing and words; none is about styling,
which is the point.

- [ ] **Watch it once without reading the terminal.** Cover the log column. Does the narration alone
      carry someone who has never used Muster from "a real run" to `bodh.day`, live? That is the
      acceptance bar in its literal form, and it is the only test that answers it.
- [ ] **The 48-second dwell table (§5).** B3 — the PM re-verifying another agent's work with its own
      screenshots — is the shortest beat in the real chain (11.4%) and gets the longest single dwell
      (20.0%). B5, QA's validation, is the longest real beat (22.5%) and is compressed to 14.5%. Both
      deviations are deliberate and both are stated. Judge whether the wow beat earns its expansion
      and whether QA's proof still lands compressed.
- [ ] **The gate hold at 4.80 s.** Deliberate stillness after `Role: halt · awaiting operator`, with
      nothing happening in it. It is not the longest interval in the replay and never was — what marks
      it is deceleration: B6 opens on the chain's fastest interval (0.35 s) and closes on this hold, a
      13.7× spread inside one beat. Judge whether it reads as meaning or as a stall.
- [ ] **SP7, the thesis line, at 15 words**: *"The run stops itself at the gate. No human touched this
      until the deploy button."* It reads in 4.29 s of the 4.80 s hold. This is the sentence the page
      exists to earn. If it needs a run-up, the relief is SP6's 12 words in the same beat and costs no
      reschedule — say so here and it is a one-line change.

### Worth 30 seconds of device time

Not a checklist item — a look only you can take. Open the page on your iPhone and confirm the §2 core
fits with both layers visible for the whole playback. `100dvh` behaviour in mobile Safari is the
mechanism §7.1's budget rests on, and the only instrument that settles it is a real phone.

### Decisions needed from you

**None on §2.** One unrelated question is parked in the queue's Founder Decisions — the reading column
renders ~90 characters where the seed says "~64ch". It gates nothing this sprint (no body copy occupies
that column yet and §2's narration never enters it); its first consumer is §3 in Sprint 2, and
`pre-launch-checklist.md` holds it hard so it cannot ship unanswered. Answer it here if you would
rather not carry it.

### Known findings — carried, not blocking this gate

**No blocking defect was found in §2 by either the build step or QA.** Six items are carried. None
needs an answer at this gate; PM disposes them into Sprint 2 unless you say otherwise.

- **The narration card meets its worst case with zero margin** (F2). SP3 sets 6 lines in a 6-line
  budget — 199.39px against 199.4px. Nothing is wrong today, but any future growth in SP3, or a wider
  glyph in a replacement string, costs a seventh line and 16.5px the phone does not have. Worth
  knowing because the lever is copy length, not layout.
- **At 320px the totals value line wraps to a third line** (F3, confirming OBS-002). Measured: strip
  49.5px, value line 246.34px in 272px. §7.1's budget is stated for 375 × 553, and 320px sits below
  the width any row of it was derived at, so this is outside the signed-off budget rather than a
  breach of it.
- **`bodh.day · LIVE` is not a link** (OBS-003). Making it one would put the only external URL in a
  shipped file, and the harness asserts there are none. This pairs naturally with the §6 domain
  question and is best answered with it, in Sprint 2.
- **The narration rail scrolls its own overflow on desktop** (OBS-001, low).
- **The section's label id differs from the spec's literal string** (OBS-004) — spec says
  `s2-heading`, build uses `s02-title`. Both satisfy the requirement and the audit passes on the
  built id; only the literal differs. PM will move the spec, not the build.
- **Landscape phone shows 8 whole terminal lines against §10's derived 7** (OBS-005). Headless
  Chrome gives the full 375px of height where Safari's landscape toolbars leave ~331px, so the
  spec's figure is the conservative one and stands. No action.

**Three deviations from the specs shipped deliberately, each with its reasoning in HO-006.** The
narration rail is 22rem rather than a literal `36ch` (at `36ch` the terminal falls under the width
L3 needs and the spec's own twelve-lines-fit guarantee fails at every desktop width); the controls
sit below the core rather than inline with the totals; and the chrome label's tracking tightens on
small viewports. PM accepts all three — each resolves a spec-internal contradiction rather than
trading away a design value.

## Verdict

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

**Status:** APPROVED WITH ONE COPY FIX — 2026-07-26

The replay stands on pacing and narration with the styling subtracted. Passes 1, 2 and 3 all judged
good by the founder: the narration alone carries a reader who has never used Muster; the expanded
re-verify beat and the compressed QA beat both read correctly; and the 4.80 s gate hold reads as
deliberate stillness rather than as a stall. The hold is upheld at its reduced length — the concern
recorded in DEC-016 that funding B3 from B6 might cost the beat its meaning did not materialise.

**Findings:**

- **F-G1 — SP7 is rewritten to the founder's arc.** The current line frames the thesis negatively
  ("no human touched this"). The founder wants the active human story a first-time reader actually
  pictures: *the operator plans the sprint, leaves while the agents run, and comes back to work that is
  ready to deploy.* The arc is factually supported by the corpus — the chain ran unattended with a
  single human gate at deploy — so this is a framing change, not a new claim. Routed to Content as a
  revision of SP7, with SP6's 12 unspent words in the same beat available as the relief.
  **Guardrail, and it is the whole risk here**: the founder's framing of the ask was "something a VC
  would want to hear that would amaze them." That is the exact instruction that produces
  adjectives-as-argument, and `copy-rules.md` forbids it. The arc is approved; amazement is not a copy
  technique. The line earns its effect from the fact being true and specific, the way SP3's
  "re-checked with its own screenshots" does. Content revises; PM reviews line by line before it builds.

- **F-G2 — The reading measure is ruled: option A, `64ch` ships as written.** The founder compared
  all three widths and chose the current build. The seed's "reading column ~64ch" therefore means the
  CSS value, and no change is made to `--read-max`. **Consequence that must ride this fix wave**: the
  independent audit's 45–75-character band check now asserts a standard the product has deliberately
  declined, so it must be retired or re-scoped to a reported measurement. Left as-is it keeps
  `qa-independent-audit.mjs` exiting non-zero forever, which trains everyone to ignore a red audit.
  This closes the last hard item that was holding in `pre-launch-checklist.md`.

- **F-G3 — The phone check is NOT yet satisfied, and the screenshot does not settle it.** The founder's
  iPhone screenshot shows all twelve terminal lines, the beat indicator at its authored end state
  ("BEAT 06 / 06 · THE HUMAN GATE"), and the narration entries stacked rather than one at a time. Per
  §7 line 120 that is the **complete-transcript end state** — either playback had already finished, or
  Reduce Motion is on in iOS. Both render correctly and the screenshot is evidence the degraded path
  looks right on a real phone, which is worth having. But the guarantee under test — a five-line
  windowed terminal with both layers visible *during* the 48 s — applies only to live playback, and
  live playback is what the screenshot does not show. `100dvh` in mobile Safari therefore remains
  unverified on real WebKit, exactly as flagged going in. Carried to the re-gate: reload the page, let
  §2 scroll into view fresh, and watch during the chain. Not blocking, because every other mobile
  measurement is Blink-verified and the failure mode it guards against would be visible immediately.

- **F-G4 — The phone reader should not scroll horizontally to read a log line.** Raised by the founder
  from the real device. This reopens F1's approved resolution, which is legitimate — F1 was settled on
  measurement, and the founder is now reading it on the instrument the gate exists to apply. Routed to
  UI/UX with the trade costed rather than left to be discovered: at 375px the terminal's inner width is
  ~301px ≈ 38 characters and the longest corpus line is 74 characters ≈ 577px, so removing ~276px of
  horizontal scroll is paid for in visible line count (soft-wrap supports about **2–3 log lines instead
  of 5** against the 553px core budget) or in type scale (~5px, not viable). It is never paid for in
  fidelity — truncation and ellipsis stay forbidden, because they convert §2's central claim from true
  to false. PM's position is soft-wrap with a hanging indent, which is consistent with the spec's own
  ruling that on mobile the terminal is texture and the narration is the payload. See DEC-025.

**Founder observation, recorded with its correction.** The founder read the opening as `muster` and
`ui-ux` landing together and then a long wait for the developer line, and judged that rhythm right —
setup is quick, the design step visibly takes work, and the reader has time to absorb the screen. The
rhythm is real and the judgment stands; the interval is **6.05 s**, not the ~48 s estimated (48 s is
the whole chain). Recording the measured figure so the pacing rationale is not carried forward on a
mis-estimate.
