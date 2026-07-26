# Wave Review
<!-- File-mediated I/O contract between the autonomous sprint loop and the founder at a wave gate. PM-owned. Tier-2: read on demand only (at a wave gate / on resume), never a startup read. -->
<!-- The loop does NOT parse this file. PM writes the Output block at the gate; the founder writes the Verdict block; PM reads the verdict on resume (muster/scripts/muster-sprint-resume.sh). Keeping human feedback here — not in the orchestration queue — is the seam a future remote/mobile bridge plugs into. -->

> **This packet is CLOSED** — Wave 1, approved with amendments 2026-07-25, and the amendments are
> delivered and accepted (HO-010). It is kept as the record of that gate. **It is not the Wave 3 packet**
> and must not be what the founder reads at the §2 gate; the PM narration-review step re-bases this file
> before the build runs. Anything below describing a 60 s chain or a 7.5 s hold is the state at the Wave 1
> gate, superseded by DEC-016 and DEC-018.

## Current Wave

**Wave:** 1 — Design foundation + §2 replay spec
**Build at:** no worktree — Waves 0–1 ran interactive in this repo. **Approving this gate launches the
autonomous driver at Wave 2** (Developer: page shell).
**Under review:** `design-specs/web/page-shell.md` (267 lines) · `design-specs/web/section-02-replay.md`
(233 lines) · HO-002 in `agent-requests.md`

### Notices since last gate

None. `founder-notices.md` is empty.

### Already green — machine-verified, do not re-litigate

Evidence is in HO-002's PM review block. Listed so your attention goes to the judgment calls below, not
to arithmetic:

- **All sixteen contrast ratios** recomputed independently from the locked hex under WCAG 2.1 — every
  one matches to two decimals. The rust-usage rules are derived from real measurements.
- **Timing reconciles end to end**: beats tile 3858 s (v1.1-corrected, B6 = 486 s); every beat's
  cumulative dwell lands exactly on its opening line's offset; the chain closes at 60.00 s; all seven
  word budgets equal window × 3.5 w/s.
- **Traceability**: every hex matches the seed verbatim; motion inventory closed at three plus the
  cursor; full-ink rule enforced structurally.
- **The direction reference did not leak in.** All four divergences PM fenced off are listed as
  non-inherited, plus three more UI/UX found itself (`JetBrains Mono`, muted feed text, the blurred
  status bar).

### Verify — human-only checks

- [ ] **The 60-second replay.** This is the sprint's biggest taste call. On a page built for a
      five-second skim, the centerpiece asks for a full minute. UI/UX kept 60 s because comprehension
      carries your acceptance criterion, and flagged it as an open question itself. Read §5's dwell
      table and judge whether a minute is earned. Rescaling to 48 s is one uniform ×0.8 multiplier —
      structure, ratios and hazard handling all survive it, so this is cheap to change now and cheap to
      change after you see it running.
- [ ] **B5 pays for both expansions — is that the right trade?** The wow beat (PM re-verify) goes
      11.4% → 20% and the gate hold goes 12.6% → 21.1%. The beat funding both is QA's full validation:
      22.5% real → 10.6% designed, a −11.9 point cut, the largest deviation in the spec. That is the
      beat carrying "PASS, zero bugs, 11/11, and QA re-derived the date math with its own formula across
      24 dates and 3 timezones" — arguably the most technically impressive fact in the corpus, and the
      one that makes "zero bugs" credible rather than merely asserted. It gets 6.35 s and two narration
      slots capped at 21 and 18 words. Defensible (the drama there is a wait, and waits read long at
      64:1) but worth your eyes, because the compression is deliberate and large.
- [ ] **The gate hold.** 7.5 s of deliberate stillness after `Role: halt · awaiting operator` — the
      longest silence in the replay, on the beat where the run stops itself for a human. It is the
      product's thesis rendered as pacing. Judge whether it reads as meaning or as a stall.
- [ ] **Read the narration briefs in §6 as if they were the finished copy.** Your criterion is that the
      replay stands on pacing and narration alone with the styling subtracted. The slot briefs and word
      budgets are the closest thing to that test available before Content writes. If a slot's brief
      cannot carry its beat in its budget, the budget is wrong now — not after Wave 3.

### Decisions needed from you

**1. Is the §2 replay content playback, or a fourth live motion element?** (UI/UX open question)
*PM recommends: content playback — confirm.* The seed's "exactly three live elements" governs ambient
page motion; the replay is mandated by §2 itself and is scroll-triggered, runs once, and holds a complete
end state. Reading it as a fourth ambient element would mean §2 needs a fundamentally different
static-first design. UI/UX stated the interpretation in `page-shell.md` §10 rather than assuming it
silently, which was the right call.

**2. Theme control in the status bar?** (UI/UX open question)
*PM recommends: drop it.* UI/UX recommends including it, non-persistent. My disagreement is on scope, not
execution: the seed never asks for a theme control, and "both themes first-class" is already satisfied by
`prefers-color-scheme`. On a page whose argument is restraint — one CTA, no community furniture, no
badges — a control that adds a decision the reader did not ask to make cuts against the thesis. Being
non-persistent also means the choice silently resets every visit, which is slightly worse than not
offering it. It is one row in §9 either way; nothing else depends on it.

**3. Chain-totals strip static, or extended count-up?** (UI/UX open question)
*PM recommends: keep it static — confirm.* Agreeing with UI/UX. The strip reads as log evidence rather
than showpiece, and it is visible mid-playback, where a count-up would compete with the replay for the
same attention. One attribute to change later if you disagree.

### Known finding — carried, not blocking this gate

**F1 — on mobile the two layers cannot be seen together during playback.** §7's fixed twelve-line
terminal, §10's no-truncation rule, and a 375px viewport are jointly unsatisfiable: measured against the
real corpus lines, the section core reaches ~646px at the spec'd 12px minimum, consuming the whole 667px
viewport before the narration card, the section tag, or section padding. The narration is therefore
off-screen while the terminal plays — which breaks your acceptance criterion specifically, since
narration is what carries the non-technical reader.

Not blocking this gate or the shell build: it is contained entirely in §2's mobile layout, and Wave 2
builds shell chrome only. It must be resolved before the Developer's §2 step in Wave 3. Resolution is a
UI/UX design call — a viewport-anchored caption card, a windowed terminal that follows the active line,
or an explicitly sequential mobile reading model are all defensible — and whichever is chosen needs a
stated mobile height budget the Developer can build to and QA can measure. Full detail in HO-002's review
block. **If you have a preference on which direction, say so in the verdict and it goes straight into the
revision.**

## Verdict

<!-- Founder writes the verdict here, then runs muster/scripts/muster-sprint-resume.sh. Two forms: -->
<!-- APPROVE  — no bugs; PM removes the gate halt step and promotes the next wave's first step. -->
<!-- Bug list — PM inserts a fix step per bug, then continues. -->

**Status:** approve (with amendments)
**Findings:**
- **Packet decisions — all three per PM recommendation.** Replay confirmed as content playback, not a
  motion element. Theme control **dropped**: the page respects `prefers-color-scheme` and adds no
  controls the reader didn't ask for. Chain-totals strip stays static.
- **F1 direction — mobile is narration-first.** The small-viewport reader is exactly the non-technical
  reader narration exists for. Amend §7 to per-viewport visible-line counts; long terminal lines scroll
  inside the terminal's own container (the page body never scrolls horizontally); the narration card
  stays in view for the full playback. **Terminal is texture on mobile; narration is the payload.**
- **Replay rescales to 48 s**, uniform ×0.8.
- **B5 rebalance.** The wow beat stays at 20%, but fund it from the gate hold, not from QA. Restore the
  QA validation beat to ~14–15%. QA is where "zero bugs" is earned rather than asserted; it needs room
  for "re-derived with its own formula, 24 dates × 3 timezones" plus "11/11 PASS."
- **Process**: the unticked reviewer box on HO-002 pending F1 is correct. Proceed.

<!-- PM processed 2026-07-25. Gate cleared; autonomous run launches at Wave 2. Amendments routed to
     HO-010 (UI/UX) with a PM review step behind it; see DEC-015 and DEC-016. Worked rebalance target
     and the gate-hold consequence are in DEC-016. -->

