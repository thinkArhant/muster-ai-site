# Wave Review
<!-- File-mediated I/O contract between the autonomous sprint loop and the founder at a wave gate. PM-owned. Tier-2: read on demand only (at a wave gate / on resume), never a startup read. -->
<!-- The loop does NOT parse this file. PM writes the Output block at the gate; the founder writes the Verdict block; PM reads the verdict on resume (muster/scripts/muster-sprint-resume.sh). Keeping human feedback here — not in the orchestration queue — is the seam a future remote/mobile bridge plugs into. -->

> **This is the Wave 3 GATE 3 packet — the phone, third look.** The first §2 gate approved the replay
> on pacing and narration (passes 1–3); the re-gate approved SP7 and sent the phone back with two
> findings. Both prior verdicts are preserved below, because this is a third judgement of the same
> section rather than a new one. **This gate is narrower than the last: one thing, looked at two ways.**
> The live numbers remain a **48.00 s** chain and a **4.80 s** gate hold.

## Current Wave

**Wave:** 3, gate 3 — the §2 replay after the second fix round: the phone log grouped into entries and
the rust mark given one inset in both layers
**Build at:** the autonomous worktree on `sprint/auto-20260725-163930`. The live page is `index.html`
in that worktree; `bash scripts/test.sh` re-runs both engines' harnesses from there.
**Under review:** the live §2 section · HO-015 (UI/UX) · HO-016 (Developer) · HO-017 (QA)

**Your criterion, restated because it is the whole gate**: the replay must be excellent on run-log
pacing and plain-English narration **with the styling mentally subtracted**. If it only works dressed,
that is the signal the seed's Sequencing section wanted in week one, and it is cheaper to hear now
than after §1 and §3 are built on top of it.

### Notices since the re-gate

One, and it needs no answer: **both findings you raised were fixed without being paid for.** The log's
single leading value was doing two jobs — separating rows inside an entry and separating one entry from
the next with the same number — so it was split into the two values it was standing in for. Entries are
now separated by roughly **2.85×** the gap between rows inside one, and because the rows themselves
tighten, the section got **7.2px shorter** rather than taller. The accent mark takes one 12px inset in
both cards at every viewport.

**Two things in your own re-gate findings turned out to be wrong, and they are corrected here rather
than left to be discovered.** Both were found by re-deriving rather than re-reading, and both made the
fix better:

- **F-R2 was not mobile-only.** A `border-inline-start` sits *outside* padding, so the wide-viewport
  rule that insets the log's text never moved the tick. The tick was flush at **every** viewport, and
  desktop's mismatch was the wider of the two — a flush tick against a rail bar sitting 24px in. A
  phone-only fix would have left the larger version of the same collision on the screen most readers
  arrive on.
- **The horizontal room was not already spent.** Simulated against the corpus at every column width,
  all eleven chain lines hold at two rows down to 37 first-row columns; the section had shipped at 41.
  The floor had simply never been written down, which is why the room read as unavailable. It is
  written down now.

**Still true and still unproven:** `100dvh` in mobile Safari is the one §2 behaviour no harness here
can prove, and §7.1's entire **379.4px** budget rests on it. The fix widened the margin again —
**32.6px** of slack at 375 × 553, up from 25.4px and from 5.1px before that — but margin is not proof,
which is why the live-playback look below is worth your 30 seconds.

### Already green — machine-verified, do not re-litigate

Carried forward from the earlier gates, where each was re-derived by PM rather than read off a handoff.
This round touched vertical rhythm and one horizontal gutter — no string, no dwell, no offset — so
everything below still holds; HO-016 and HO-017 re-measure it on the rebuilt page and QA appends its
measured entry-separation and accent-pair figures here before this gate fires.

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
- **The phone budget is met with more room than before.** The fixed core is **379.4px** and does not
  move, so at 375 × 553 the terminal shows **3 whole entries** with **32.6px** of slack. Before the wrap
  fix it measured 499.89px with five *clipped* lines and 5.1px of slack; the entry split then returned
  another 7.2px on top. No viewport lost an entry to either change.
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
hold reads as stillness rather than as a stall. **SP7 is settled too** — you approved it at the re-gate
at 15 of 16 words, and Content is done with §2. No dwell, no offset and no slot's words moved in this
round; it touched vertical rhythm and one horizontal gutter, nothing else.

Two checks, plus the look no gate has managed to get yet.

- [ ] **Can you tell where one log entry ends and the next begins, at a glance?** That is the whole of
      the first check — at a glance, not on inspection. An entry is two rows on your phone; the gap
      between two entries is now about **2.85×** the gap between the two rows inside one, which is the
      ratio the eye actually reads. The alternative that was rejected is worth knowing so you can judge
      against it: banding the entries would have grouped them too, with a new surface colour the palette
      does not have, and would have made a terminal read as a data table.

- [ ] **Does the rust mark sit the same way in both cards?** It should be inset the same 12px from the
      inner edge of the terminal and of the narration card — the same distance, not merely both
      present. Check it on the phone and, if you are at a desk, on the wide layout too: the desktop
      mismatch was the larger of the two and it was invisible until it was measured.

**Not up for judgement this round unless something looks broken**: the three whole entries at
375 × 553. That trade was settled at the re-gate — at 39 columns a phone that does not wrap shows five
*first halves*, and eleven of the twelve corpus lines are longer than the column.

### Carried: the live-playback look, now mostly settled

**Your last screenshot did the job.** It caught live playback at `BEAT 03 / 06`, which is the state the
guarantee is actually about — it confirmed the visibility gate fires and that both layers hold on screen
during the chain. That is the evidence two gates asked for.

What remains is narrower: the same look once more on the rebuilt log, because the entry split changes
what the window is quantised on. `100dvh` under mobile Safari's dynamic toolbars is still the one
mechanism no harness here can prove, and a real phone is still the only instrument that settles it.
Reload, let §2 scroll into view fresh, and watch *during* the chain.

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
- **Landscape now shows 3 entries by design, not 8 by accident** (supersedes OBS-005). The column split
  inverted — the terminal takes the wider column, sized by the wrap rule rather than by a share, because
  width is the only thing that decides whether a line reads without a gesture. *Three is the number the
  design derives from Safari's ~331px landscape viewport; an emulator handed the full 375px measures
  four. Both are right — the derivation is the floor, the measurement is its upper bound — so a
  screenshot showing four entries is not a miss.*

**Spec gaps keep being found by re-deriving the deliverables rather than reading them**, and they are
the kind that silently re-break a fixed defect later. Earlier rounds: the totals strip's fit constraint
stated without the tracking value that achieves it, and §7.1's line-height constant exact at 375px but a
ceiling below it. This round: "line region" meant two different widths in one file, the accent rule
stated a number where the invariant is the equality of two numbers, and one checklist item bound at a
derived figure with under a tenth of a column of headroom — a check that would have gone red on rounding
against a correct build. All are closed in the spec and on the steps that carry them. **This is the
third time a check has been caught measuring something adjacent to the claim it was written for**; it is
recorded as a pattern rather than as three incidents.

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
