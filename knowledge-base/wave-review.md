# Wave Review
<!-- File-mediated I/O contract between the autonomous sprint loop and the founder at a wave gate. PM-owned. Tier-2: read on demand only (at a wave gate / on resume), never a startup read. -->
<!-- The loop does NOT parse this file. PM writes the Output block at the gate; the founder writes the Verdict block; PM reads the verdict on resume (muster/scripts/muster-sprint-resume.sh). Keeping human feedback here — not in the orchestration queue — is the seam a future remote/mobile bridge plugs into. -->

> **This is the Wave 3 RE-GATE packet.** The first §2 gate approved the replay on pacing and narration
> (passes 1–3) on 2026-07-26 and returned four findings; all four are ruled and three are built or
> being built (DEC-023 through DEC-026). That verdict is preserved at the bottom of this file, because
> this gate is a re-judgement of the same section rather than a new one. **This gate is narrow: two
> things.** The live numbers remain a **48.00 s** chain and a **4.80 s** gate hold.

## Current Wave

**Wave:** 3 re-gate — the §2 replay after the fix wave: SP7 reframed, the phone terminal wrapped
**Build at:** the autonomous worktree on `sprint/auto-20260725-163930`. The live page is `index.html`
in that worktree; `bash scripts/test.sh` re-runs both engines' harnesses from there.
**Under review:** the live §2 section · `design-specs/web/section-02-narration.md` · HO-011 (UI/UX) ·
HO-012 (Content) · HO-013 (Developer) · HO-014 (QA)

**Your criterion, restated because it is the whole gate**: the replay must be excellent on run-log
pacing and plain-English narration **with the styling mentally subtracted**. If it only works dressed,
that is the signal the seed's Sequencing section wanted in week one, and it is cheaper to hear now
than after §1 and §3 are built on top of it.

### Notices since the first gate

Two, from `founder-notices.md`, both FYI — neither needs an answer:

- **The phone terminal now wraps instead of scrolling sideways, and the price is visible on your
  iPhone**: 3 log lines instead of 5 at 375 × 553, each readable to its last character where none was
  before. Paid by moving the totals strip just below the playback core — not from fidelity, not from
  type size (DEC-026). The totals read the same; they sit a thumb-flick down. Desktop is measurably
  unchanged, verified at five widths.
- **The audit no longer exits red.** With `64ch` ruled, the 45–75-character band check is retired to a
  reported measurement on the QA step, so `qa-independent-audit.mjs` goes back to being a signal.

**Still true and still unproven:** `100dvh` in mobile Safari is the one §2 behaviour no harness here
can prove, and §7.1's entire **379.4px** budget rests on it. The wrap change bought real margin —
25.4px of slack at 375 × 553 where it had 5.1px — but margin is not proof, which is why the
live-playback look below is worth your 30 seconds.

### Already green — machine-verified, do not re-litigate

Carried forward from the first gate, where each was re-derived by PM rather than read off a handoff.
The fix wave touched two things — one narration string and the mobile layout — so everything below
still holds; HO-013 and HO-014 re-measure it on the rebuilt page.

- **The narration fits its contract, measured not eyeballed.** All ten strings re-measured by script,
  twice now: 139 timed words of a 163 ceiling, every slot inside budget *and* inside its read window at
  3.5 w/s. SP7's rewrite moved no number — 15 words before, 15 after. The tightest string (SP4b,
  11/11 words) reads in 3.14 s of a 3.20 s window.
- **Every factual claim is sourced.** Each slot cites its corpus line in place; PM looked each one up
  in the corpus rather than checking it against the citation, including all five beats of the new SP7.
  The corpus is unmodified and proven so from git — all three founder-authored files carry only
  `founder:` commits.
- **The two named traps are closed.** The Safari-only SVG catch is absent entirely. The whole-product
  aggregates (9.3 h, $147) appear in no slot. Every §2 number is a website-wave number.
- **Timing tiles exactly and is untouched by the fix.** Dwells sum to 48.00 s, the six design shares to
  100.00%, each beat's cumulative dwell lands on its opening line's offset, and the worst measured
  reveal drift was 16.8 ms against a 100 ms tolerance.
- **Fidelity holds at the byte, and structurally.** All 12 lines diff byte-clean against the corpus —
  679 characters, equal codepoint counts. A soft wrap inserts and removes no character, which is
  precisely why wrapping could pay for the fix and truncation could not.
- **The phone budget is met with more room than before.** The fixed core drops to **379.4px** once the
  totals strip moves below it, so at 375 × 553 the terminal shows **3 whole wrapped lines** with 25.4px
  of slack. Before the fix it measured 499.89px with five *clipped* lines and 5.1px of slack.
- **The degraded paths are complete, not reduced.** Reduced-motion and no-JS both render the full
  transcript, string-identical to the motion path's end state. Zero non-`file:`/`data:` requests across
  a full 48-second playback, and the page renders complete with the network off.

**One caveat to carry into your own testing.** Every mobile measurement is **Blink only** — 375 × 553,
320px, landscape, 200% zoom, the visibility gate, the windowed terminal and all playback timing.
WebKit's evidence is the no-JS complete transcript at a fixed render, both themes. That gap is exactly
why the live-playback look is worth your 30 seconds.

### Verify — human-only checks

**Passes 1, 2 and 3 are settled and are not re-opened**: the narration alone carried a first-time
reader, the expanded re-verify beat and the compressed QA beat both read correctly, and the 4.80 s gate
hold reads as stillness rather than as a stall. You judged all three at the first gate with the styling
subtracted; nothing in the fix wave touched them — no dwell, no offset, no other slot's words moved.

Two checks, plus the look that the first gate could not get.

- [ ] **SP7, rewritten to your arc, at 15 words**: *"The operator planned the sprint, left the agents
      running, and returns to a deploy-ready site."* Still 15 words, still 4.29 s of the 4.80 s hold —
      the reframe cost nothing and SP6's 12 words of relief are still unspent if you want a run-up.
      **The judgement you asked for**: does it land the arc without reaching? PM's line-by-line found no
      adjective-as-argument — "deploy-ready" is the packet's recorded state, not praise — and the effect
      comes from the tense turn landing on a terminal that reads `awaiting operator` at that instant.
      That is the guardrail satisfied on paper. Whether it *lands* is yours.

- [ ] **The phone, on the thing you complained about.** Every log line should now read to its last
      character with no sideways gesture, anywhere. **The price is visible and you should look at it
      with the benefit in view**: the terminal shows **3 whole lines** at 375 × 553 instead of 5, and
      each sets two rows. The trade was not five-lines-versus-three — at 41 columns a phone that does
      not wrap shows five *first halves*, and eleven of the twelve corpus lines are longer than the
      column. Judge whether three lines still reads as a live log rather than as a caption. UI/UX said
      plainly it would not sign off at two; three is the top of the range and was paid for by moving
      the totals strip one thumb-flick below the playback, where it reads identically.

### Carried from the first gate: the live-playback look

Still open, and it is the one thing no harness here can produce. Your screenshot last time showed the
complete-transcript end state — all twelve lines, the beat indicator at `BEAT 06 / 06`, narration
stacked — which means playback had finished or Reduce Motion was on. Both render correctly, so the
screenshot is real evidence for the degraded path; it just is not evidence for the guarantee under test.

**What to do**: reload, let §2 scroll into view fresh, and watch *during* the chain. The terminal should
show a short window of lines that advances, with the narration card in view the whole time. `100dvh` in
mobile Safari is the mechanism the entire height budget rests on, and a real phone is the only
instrument that settles it.

### Decisions needed from you

**None.** The reading-column question you carried into the last gate is answered — `64ch` ships as
written (DEC-023), and its one consequence, the audit's band check, is retired to a reported measurement
on the QA step so the audit stops exiting red on a standard the product has deliberately declined.

### Known findings — carried, not blocking this gate

**No blocking defect was found in §2.** What changed since the last gate:

- **The narration card's zero-margin worst case became a real overflow at 320px** — SP3 sets 7 lines
  into a 6-line card there. Pre-existing and width-driven, not caused by the wrap change: the card meets
  its budget exactly at 375px, so the seventh line is bought by narrowing below the width the budget is
  derived at. Deferred to Sprint 2 because fixing it now means either re-opening SP3's copy (not open
  this wave) or a taller card that costs the terminal a line at the budget case — trading a guaranteed
  viewport for an unbudgeted one. The fix is already costed: §7.1's priority order drops the beat
  indicator, which returns 28.5px against a 28.9px line. Held in `pre-launch-checklist.md`.
- **The totals value line still wraps at 320px**, and it stopped mattering to the guarantee once the
  strip left the playback core. A copy-fit question for Sprint 2.
- **`bodh.day · LIVE` is not a link** (OBS-003) — pairs with the §6 domain question, best answered
  together in Sprint 2.
- **The narration rail scrolls its own overflow on desktop** (OBS-001, low).
- **The section's label id differs from the spec's literal string** (OBS-004). PM moves the spec.
- **Landscape now shows 3 lines by design, not 8 by accident** (supersedes OBS-005). The column split
  inverted — the terminal takes the wider column, sized by the 41-character requirement rather than by
  a share, because width is the only thing that decides whether a line reads without a gesture.

**Two spec gaps were found by re-deriving the deliverables rather than reading them**, and both were
the kind that silently re-break a fixed defect later: the totals strip's fit constraint was stated
without the tracking value that achieves it, and §7.1's line-height constant is exact at 375px but a
ceiling below it, where a literal implementation would clip a line at 320px. Both now say so in the
spec and on the build step.

**Three deviations from the specs shipped deliberately at the first gate and stand.** The narration
rail is 22rem rather than a literal `36ch`; the controls sit below the core; the chrome label's tracking
tightens on small viewports. Each resolves a spec-internal contradiction rather than trading away a
design value.

## Verdict

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

**Status:** SP7 APPROVED · PHONE SENT BACK — 2026-07-26

**SP7 lands.** *"The operator planned the sprint, left the agents running, and returns to a
deploy-ready site."* Approved as written, at 15 of 16 words, with SP6's relief still unspent. The
reframe is settled and is not reopened in the next round. Content's work on §2 is complete.

**The phone check fails.** The sideways gesture is gone, which was the stated criterion, but
readability was traded for it in a way the fix did not measure. Both findings were raised by the
founder from the real device and confirmed by PM against the built CSS, not by eye.

**Findings:**

- **F-R1 — Wrapped log lines do not group into entries. Blocking; this is a regression the fix
  introduced.** At 375px four entries occupy eight rows, and the vertical gap between an entry's own
  continuation row and the *next* entry's first row is identical — `.log__line` carries no
  `margin-block-start`, so nothing separates one entry from the next. Eight rows read as eight things
  rather than four. The hanging indent (`padding-inline-start: 2ch; text-indent: -2ch`) and the absent
  timestamp on continuations are the only cues, and parsing them takes deliberate effort instead of
  happening at a glance.
  **The requirement is the outcome, not a mechanism**: entry boundaries must be visible at a glance at
  375 × 553. Vertical separation is the obvious lever and height is the scarce resource — there was
  25.4px of slack, and a per-entry gap costs roughly 6px each, so it will likely need funding from
  `--lead-terminal` rather than being added on top. Banding or a continuation glyph are alternatives;
  UI/UX chooses and states the measured budget. Fidelity and the no-horizontal-scroll guarantee both
  hold — neither is available to pay for this.

- **F-R2 — The rust accent has two different relationships to its container. Blocking on mobile.**
  Both the key-beat tick and the active narration bar are built identically (a 2px transparent
  `border-inline-start` that turns `--accent`), but the narration entry sits inside a card with
  `padding: var(--gap-hairline)` = **12px**, so its bar is inset and reads as a mark inside the card,
  while `.log` is explicitly `padding-inline: 0`, so the terminal tick sits at **0px** — flush against
  the card border, reading as part of the frame.
  The wide-viewport rule restores a gutter (`calc(var(--gap-hairline) + 2ch)`) and its own comment says
  the phone "cannot afford" it, which is exactly why desktop reads clean and the phone does not: the
  horizontal room that inset the tick was spent on the wrap fix. One consistent inset for the same
  semantic mark across both cards, or a stated reason why the terminal gutter is deliberately different.
  If the room genuinely is not there, say so and propose the alternative rather than shipping the
  collision.

**Not reopened**: passes 1–3, SP7, the 48.00 s schedule, fidelity, and the no-horizontal-scroll
guarantee. The next round is these two visual findings only.

**Still carried**: the live-playback look on real mobile Safari. The founder's latest screenshot *is*
live playback at BEAT 03/06, which is progress over the end-state shot — it confirms the visibility
gate fires and both layers hold their place. `100dvh` under Safari's dynamic toolbars remains the
unproven mechanism and rides to the next gate.

---

### Previous verdict — the first §2 gate, 2026-07-26

Kept because this gate re-judges the same section. All four findings below are ruled and three are
already built or building; F-G3 is the live-playback look still carried above.

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
