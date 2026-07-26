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

*Build and QA evidence lands here when HO-006 and HO-007 file — read those two alongside this packet.*

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

*Populated from HO-006 and HO-007 when they file. If this heading still reads "none," nothing was
found.*

## Verdict

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

**Status:**
**Findings:**
-
