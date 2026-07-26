# Orchestration Queue
<!-- This file tells the founder which agent to invoke next. PM populates at sprint planning. Agents update on session completion. -->
<!-- Protocol: See muster/system-guide.md → Invocation Patterns and Agent Communication Protocol. -->

## Prompt Standard

<!-- Authoring or editing a step? The format templates + Role:-marker rules live in `muster/team/pm/skills/generic/sprint-planning.md` → "Queue Step Format". The live steps below already demonstrate the format, and `muster-queue-lint.sh` enforces the structure. -->

## Execution Mode (Sprint 1)

**Waves 0–1 complete and the Wave 1 founder gate is APPROVED with amendments (2026-07-25).** The
autonomous run is cleared to launch; the driver starts from the current `## Next Step`.

**Wave 2 is closed and Wave 3 is running.** The inventory true-up, both spec amendments, the PM review,
the shell build, and QA validation are all done and accepted; `page-shell.md` and `section-02-replay.md`
are final and carry nothing open. The ordering that put the amendments ahead of the build did its job:
the shell was built against a spec with no dropped theme control in it. Wave 2 shipped one founder
question and no blockers — see `## Founder Decisions` (the reading column) and DEC-021 for the four
dispositions.

**Two DEC-021 rulings are attached inline to the Wave 3 steps that carry them**, rather than living as
separate steps: the `.instrument` phone-inset fix rides the §2 build step, and the audit's re-based
readability check rides the §2 QA step. Both are dispositions of HO-004's findings, not new scope.

**The build ships its own cross-engine harness** (DEC-020): `bash scripts/test.sh` runs
`tests/verify-shell.mjs` (Blink) then `tests/verify-webkit.mjs` (WebKit), both dependency-free and
non-zero on failure. Every later step that touches the page re-runs it and extends it rather than
adding a second runner.

**Telemetry practice — agents do not measure this build.** Do not run `muster/scripts/muster-meter.py`
in any session. Build telemetry snapshots are founder-supplied and committed at milestones. Any step
needing a metric reads a committed snapshot; no step generates one. THIS SITE metrics remain dashes in
all page copy until measured at launch (seed rule 4).

## Founder Decisions
<!-- Agents add questions requiring founder input here. -->
<!-- PM monitoring: scan this section at every session start. Entries older than 24h without founder response are flagged to the founder immediately. -->
<!-- Format: - [DATE] [Agent]: [Question] -->
<!-- Autonomous runs: this section is non-halting on its own — observation and scope escalations park here while the loop keeps running. PM is the sole party that summons the founder: only PM (after assessing a block per the Decision Autonomy Matrix) writes the question here AND sets the Next Step block's `Role:` to `halt` (see below). A specialist that hits a block routes it to a `Role: pm` assessment step instead of halting. There is no checkbox convention. -->

### The reading column renders ~90 characters. Did "~64ch" mean the CSS unit or the measure?

**Context**: `--read-max: 64ch` resolves to 685.31px and renders **~90 prose characters per line** at
every width from 959px up. `ch` is the advance of `0` (10.281px in `--font-sans`); prose averages
7.615px. The build matches `page-shell.md` and `page-shell.md` matches seed line 228 — *"reading column
~64ch"* — exactly. The gap is between `64ch` and what `64ch` renders, so it is your word that decides it,
not a spec defect anyone can fix on their own authority. For reference, the common typographic band is
45–75 characters and WCAG 2.1 SC 1.4.8 (AAA, not a level this project claims) caps a reading block at 80.

**PM Recommendation**: honour the measure, not the unit — set the reading column so a rendered prose line
lands around 60–70 characters, which at 17px `--font-sans` is roughly 460–535px, and express it in `rem`
rather than `ch` so the value means what it says. Everything the seed puts around that line — *one idea
per screen*, *spacious* as the overriding constraint — reads as an argument about the reading experience
rather than about a CSS unit, and 90 characters is the least spacious line on the page. PM is confident
on the diagnosis and deliberately not on the resolution: the other reading (you meant `max-width: 64ch`,
and the build is already right) is honest, and the two produce materially different pages. It is one
token either way.

**Blocked**: nothing this sprint. No body copy renders in that column yet — the shell's paragraphs are
`data-shell-placeholder` scaffolding — and §2's narration never enters it (`section-02-replay.md` §7 puts
the rail at ~36ch on desktop, viewport-width on mobile). The first real consumer is **§3, in Sprint 2**.
Carried as a hard item in `pre-launch-checklist.md` so it cannot ship unanswered. See DEC-021.3.

**Your call**:

<!-- Resolved 2026-07-25 — Wave 1 gate APPROVED with amendments. All three UI/UX questions settled per PM recommendation: (1) the §2 replay is content playback, not a fourth motion element — the budget stays closed at three plus the cursor; (2) the theme control is DROPPED — the page respects prefers-color-scheme and adds no controls the reader didn't ask for; (3) the chain-totals strip stays static. See DEC-015. -->
<!-- Resolved 2026-07-25 — F1 direction: mobile is NARRATION-FIRST. Terminal is texture on mobile, narration is the payload. Per-viewport visible-line counts; long lines scroll inside the terminal's own container with the page body never scrolling horizontally; the narration card stays in view for the full playback. Plus: replay rescales to 48 s uniform ×0.8, and B5 (QA validation) is restored to ~14.5% funded from the gate hold rather than from QA. See DEC-016. -->

<!-- Resolved 2026-07-24 — Domain: UNDECIDED. `muster.build` is fictional until the founder says otherwise. §6 ships the GitHub raw URL and it is swapped at launch. R12's ban on `muster.build` stands unconditionally for now. See DEC-010; `pre-launch-checklist.md` carries the curl-verification blocker. -->
<!-- Resolved 2026-07-24 — Measurement posture: partially overruled. Cloudflare Pages server-side request analytics measure visits and VERIFY.md fetches with zero client instrumentation, so the zero-external-requests claim is untouched. Scroll depth and curl-copy remain unmeasured by design. See DEC-011 and `product-spec.md` §7. -->
<!-- Resolved 2026-07-24 — R2 wall-clock reasoning accepted as reasoned by the founder. `copy-rules.md` → R2 stands as written. -->

<!-- Resolved 2026-07-24 — Bodh corpus: LANDED at `knowledge-base/bodh-sprint4-corpus.md`. Founder-authored, read-only (DEC-006). Verified internally consistent by PM at Wave 0: 8 session durations sum to 64 min, span 20:38:57→21:43:09 is 64m12s, terminal-inventory timestamps match the session table, 8 sessions map onto the seed's 6 beats with sessions 4–6 forming step 4. Developer verifies + inventories; never reconstructs. -->
<!-- Resolved 2026-07-24 — Direction reference: LANDED at `knowledge-base/design-specs/direction-reference.html`. Feel only, never ships (DEC-008). Three divergences fenced off in agent-context: `#abae90` is not a locked palette value, `https://muster.build/setup.sh` is not a real host, and the `amber` class aliases the rust accent. -->
<!-- Resolved 2026-07-24 — Model plan: `claude-opus-5` is the default for every step (founder verified it serves; list price identical to opus-4-8 at $5/$25). Premium `claude-fable-5` approved for exactly two foundation-critical steps: UI/UX design foundation and Content §2 narration. See DEC-004. -->
<!-- Resolved 2026-07-25 — Sessions vs steps (HO-001 F1): answered at source by corpus v1.1. Both are true and different: 8 traced sessions = 7 agent work-steps + the PM review/retro session (session 8, which wrote DEC-023 and does not count itself). Copy says "8 sessions" or "7 agent steps plus PM review", never a bare "7" against "8". Also settled there: L1's "8 roles standing by" is roster size, but seven roles ran the wave — research did not. See DEC-013. -->

## Next Step
<!-- The single next agent invocation. Copy the ENTIRE code block (including `Role: <agent>` at the top) and paste as one message in Claude Code. -->
<!-- The `Role:` marker tells you which tab to open. Multi-tab: open a tab in that role (picker → matching role) and paste; bound role executes the task body directly. Single-tab from PM: paste in PM tab; PM reads the `Role:` marker and explicitly invokes Agent tool with `subagent_type=<role>`. -->
<!-- Autonomous hard-block signal: PM sets `Role: halt` here (and records the question in `## Founder Decisions`) when it has assessed a block as needing a founder answer. Specialists never set `Role: halt` themselves — a blocked specialist re-points Next Step to a `Role: pm` assessment step and PM decides handle-vs-escalate. The autonomous loop (`muster/scripts/muster-sprint-run.sh`) stops on `Role: halt`. Sprint completion is detected by the ABSENCE of a fenced code block under Next Step (matching the `MUSTER_ROLE=auto` contract in `muster/CLAUDE.md`) — a whitespace block or a human-readable "sprint complete" placeholder both read as complete. A block that has a fence but no `Role:` line defaults to `pm`. -->

### 2026-07-24 PM: Wave 3 narration review

```
Role: pm
Model: claude-opus-5

**Task:** Review HO-005 line by line against the copy rules before any of it gets built.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-005
- `knowledge-base/design-specs/web/section-02-narration.md`
- `knowledge-base/agent-skills/content/copy-rules.md`
- `knowledge-base/product-spec-seed.md` §2
- `knowledge-base/bodh-sprint4-corpus.md` — spot-check every claim against source
- `muster/team/pm/skills/generic/deliverable-review.md`

**Deliverable:** Review verdict on HO-005 in `agent-requests.md`.

**Acceptance criteria:** See `knowledge-base/current-sprint.md` for full criteria. Summary:
- Rules 1, 2, 5, 6, 7 and 8 verified line by line, not sampled
- Every factual claim spot-checked against the corpus — an unverifiable claim is a blocking finding
- The Safari catch handled per the seed's explicit instruction, or absent
- Copy is on-voice without being inflated; Content may tighten founder-supplied passages, never inflate them

**On completion:** Run the Pre-Handoff Self-Review Checklist (`muster/system-guide.md`). Promote the
§2 implementation step.

**Also re-base `wave-review.md` for the Wave 3 gate before promoting.** It currently holds the closed
Wave 1 packet, and the gate step tells the founder to read that file for the checklist — Wave 1's
60 s chain and 7.5 s hold must not be what they read at the §2 gate. Write the Current Wave block, the
"already green — machine-verified" list, and the human-only checks now (the founder's criterion is
pacing and narration with styling subtracted, so the checks are about the 48 s dwell table, the gate
hold at 4.80 s, SP7's ≤16 words, and whether the narration alone carries a non-technical reader). Leave
the build/QA evidence as a stub the founder reads alongside HO-006 and HO-007; this is the last PM step
before the gate, so no later step can do it.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-24 Developer (web): §2 replay implementation

```
Role: developer
Model: claude-opus-5

**Task:** Build §2 — the two-layer annotated replay of Bodh's Sprint 4 — inside the shell, wiring the
founder-supplied corpus into the terminal layer.

**Inputs:**
- `knowledge-base/design-specs/web/section-02-replay.md` (HO-002) — implement everything in it; the criteria below are non-exhaustive examples and never override the handoff
- `knowledge-base/design-specs/web/section-02-narration.md` (HO-005, PM-approved) — the narration copy verbatim
- `knowledge-base/bodh-sprint4-corpus.md` — the real lines the terminal layer renders. Read-only: wire it in, never edit or regenerate it
- `knowledge-base/design-specs/web/section-02-beat-inventory.md` (HO-001) — line-to-beat mapping and real intervals
- `knowledge-base/product-spec-seed.md` §2
- `knowledge-base/agent-context/developer.md` — your Current Tasks
- `muster/team/developer/skills/web/web-best-practices.md`

**Deliverable:** the §2 section built into `index.html` + supporting `styles/` and `scripts/`.

**Acceptance criteria:** See `knowledge-base/current-sprint.md` for full criteria. Summary:
- **Founder criterion:** the replay must stand on pacing and plain-English narration alone, independent of the visual frame. At review the founder judges run-log timing and narration with styling mentally subtracted; both must be excellent on their own
- Terminal layer renders lines from the corpus verbatim, labelled "condensed from the real build log" — nothing staged, embellished, or invented
- Narration synchronized to the terminal beats per the replay spec's timing; ends on `bodh.day`, live
- Scripted HTML/CSS/JS only — no asciinema, no tooling dependency, zero external requests
- Reduced-motion path renders the complete content, not a degraded subset
- Verify WebKit and Blink before filing, **within the stated ceiling** (next bullet)

**Two shell-level items ruled in DEC-021 that land with this step. Neither is new scope — both are the
disposition of HO-004's findings, and this is the session already in these files.**

1. **Fix `.instrument`'s phone inset.** Below `--bp-wide` its total inset must not exceed `--gap-flow`
   (24px a side); desktop keeps `--gap-block` (48px). Today it is a flat 48px at every width, so a 320px
   phone spends 96px of a 272px card on padding and the prose column is 174px. **Do not add a second
   named breakpoint** — `page-shell.md` §7 keeps `--bp-wide` as the only page-chrome breakpoint; a fluid
   `clamp()` between the two rhythm multiples is the preferred expression and also avoids a cliff at
   960px. Extend the existing harness with the assertion rather than adding a runner (DEC-020).
   *You left this alone in OBS-001 because §7.1's budget is derived off shell tokens to the tenth of a
   pixel. That reasoning does not apply: §7.1 budgets its own insets — its rows read* Terminal body
   padding 12 + 12 *and* Narration card … + 24 pad *— and at 48px its core would compute to 568.4px
   against a 553px viewport. §2 is unaffected by this change.*

2. **The WebKit ceiling is real; do not spend the session fighting it.** `qlmanage` executes no
   JavaScript and ignores the requested size, rendering at a fixed ~1024² (QA proved both with committed
   probes). So WebKit evidence for §2 is the **no-JS/reduced-motion complete transcript** — all twelve
   corpus lines verbatim, L12's large-rust treatment, the §9 emphasis system, terminal chrome, grain and
   vignette parity, both themes — and that is genuinely load-bearing, because DEC-017 item 4 makes
   playback an opacity reveal over a complete DOM, so what `qlmanage` renders *is* the no-JS fallback.
   Everything else — playback timing, the visibility gate, the windowed terminal, media queries,
   horizontal-scroll containment, all mobile widths — is Blink evidence and is labelled as Blink evidence
   in HO-006. **Do not resolve this by installing a browser**: zero dependencies is DEC-020 and a
   published property of the repo.

**HALT CONDITION (inline, mandatory):** if the corpus lacks a line the replay spec calls for, do NOT
invent, paraphrase, or reconstruct it to fill the gap. Re-point `## Next Step` to a `Role: pm`
assessment step naming the missing line and stop.

**On completion:** File HO-006 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist
(`muster/system-guide.md`) before filing — item 10 enforces queue + decision-log update.
```

### 2026-07-24 QA (web): §2 replay validation

```
Role: qa
Model: claude-opus-5

**Task:** Validate the §2 replay, including corpus fidelity.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-006
- `knowledge-base/design-specs/web/section-02-replay.md` and `section-02-narration.md` — derive validation scope from these handoffs directly, so a dev-charter omission does not also blind QA
- `knowledge-base/bodh-sprint4-corpus.md` — the fidelity baseline. Read-only
- `knowledge-base/design-specs/web/section-02-beat-inventory.md`
- `knowledge-base/agent-context/qa.md` — your Current Tasks
- `muster/team/qa/skills/web/web-testing.md`

**Deliverable:** HO-007 in `agent-requests.md` — per-criterion pass/fail with evidence.

**Acceptance criteria:** See `knowledge-base/current-sprint.md` for full criteria. Summary:
- Every rendered terminal line diffed against the corpus and cited; any altered, paraphrased, or invented line is a blocking bug, not a nit
- Confirm the corpus file itself is unmodified since HO-001 — an agent editing source material is a blocking finding
- **Cross-engine parity, scoped to what the tooling can prove (DEC-021.4 — this supersedes a flat
  "both engines" reading).** WebKit's job is the **no-JS/reduced-motion complete transcript** at ~1024²:
  twelve corpus lines verbatim, L12's large-rust treatment, the §9 emphasis system, terminal chrome,
  grain and vignette parity, both themes. That is load-bearing, not a fallback prize — DEC-017 item 4
  makes the no-JS DOM identical to the complete transcript, on the engine whose inline-SVG divergence is
  this project's known failure class. Blink carries everything else. **Mobile evidence is Blink-only and
  HO-007 must say so in those words** — never "verified cross-engine". Your own probes established the
  ceiling; do not re-litigate it, and do not close it by installing anything (DEC-020)
- Zero runtime network requests; reduced-motion path complete
- Narration/terminal sync holds at reduced motion and, where JS is involved, on Blink
- Report measured beat intervals factually, so the founder's pacing judgment has data alongside it
- **Mobile at 375 × 553**: 5 terminal lines visible, both layers on screen for the whole playback, core height measured ≤553px, page body never scrolls horizontally (also at 320px and 200% zoom), terminal scroll container focusable and arrow-key operable
- **Measure the rendered narration card against SP3's real copy.** §7.1 budgets a 6-line worst case and UI/UX flagged it as the budget's weakest number. At 7 lines the terminal drops to 4 visible lines — the design absorbs that, the budget table does not. Report the measured count either way
- **Re-base your own audit's 45-character floor, and verify the `.instrument` fix (DEC-021.1–2).** The
  check `prose column does not collapse below 45 characters at the narrowest supported width` cannot pass
  at 320px under any padding: 45 × 7.615px = 342.7px, wider than the viewport itself. With a zero-inset
  card the ceiling is ~36 characters at 320px and ~43 at 375px, so the floor is unreachable on every
  phone. Replace it with (a) a deterministic assertion that at ≤375px `.instrument`'s total horizontal
  inset is **≤20% of the card width** (48/272 = 17.6% passes; today's 96/272 = 35.3% fails), and (b) the
  measured character count **reported, not asserted** — the same treatment the narration card's line
  count gets, and for the same reason: geometry is deterministic while a character count folds in font
  metrics and line-break raggedness, which is why your 320px figure of 18 sits under that width's ~23
  capacity. This is a threshold correction, not a tolerance loosening: the build is being fixed in the
  same wave, so red does not go green on the threshold alone. If you disagree with the arithmetic, say so
  in HO-007 rather than deleting the check

**On completion:** File HO-007 in `agent-requests.md`. If red, do NOT advance — re-point `## Next Step`
to a `Role: pm` assessment step. Run the Pre-Handoff Self-Review Checklist (`muster/system-guide.md`).
```

### 2026-07-24 Wave 3 Gate — founder review

```
Role: halt

**Gate:** The §2 replay judged on pacing and narration, styling mentally subtracted.

This is the sprint's decision point. Per the founder's added acceptance criterion, the replay must be
excellent on run-log timing and plain-English narration alone — the visual frame is not allowed to
carry it. If it only works dressed, that is the signal the seed's Sequencing section wanted in week one.

**Read:** `knowledge-base/wave-review.md` for the verification checklist and write your verdict there.
**Under review:** the live §2 section, `section-02-narration.md`, HO-006, HO-007.

**Resume:** write your verdict in `knowledge-base/wave-review.md`, then run
`muster/scripts/muster-sprint-resume.sh` from inside the sprint worktree.
```

## Done (Last 10)
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->
<!-- A specialist Done entry is a POINTER to the handoff, not a substitute for it: `- DATE — Step N: <title> (HO-NNN). <one-line outcome>.` If it grows past ~5 lines, the detail belongs in the HO body. The autonomous loop lints the most-recent Done entry's HO reference against agent-requests.md and stops if it's missing. -->

- 2026-07-25 — Wave 3: Content — §2 narration written to the sync contract (HO-005). All eight slots
  inside budget, script-measured: 139 timed words of a 163 ceiling; SP7 landed at 15/16 with no SP6
  relief needed; Safari catch omitted; every claim cited to the corpus in place. Awaiting PM review.

- 2026-07-25 — Wave 2: PM — Shell accepted and Wave 2 closed; §2 narration released (DEC-021). HO-003
  and HO-004 both accepted with the harnesses re-run at review rather than cited — `scripts/test.sh`
  86/86, `qa-independent-audit.mjs` 37/39 with exactly the two reported failures. Four items disposed,
  none of them a gate. **F2's blocker was disproved, not weighed**: both the Developer and QA left
  `.instrument`'s 48px phone padding alone because §7.1's mobile budget is derived off shell tokens, but
  §7.1 budgets its own insets (12+12 terminal, 24 card) — at 48px its core would compute to 568.4px
  against a 553px viewport, so the budget DEC-019 re-derived clean would already be busted. The claim
  travelled through two handoffs and into a queue step before anyone checked it against the table it
  cited. The step-down is ruled and rides the §2 build step. **The audit's 45-character floor is
  unsatisfiable** — 45 × 7.615px = 342.7px, wider than a 320px viewport — so it is replaced by a
  deterministic inset-share check plus a reported measure, with the build fixed alongside it so red does
  not go green on a threshold. **F1 goes to the founder**: the diagnosis is settled (~90 rendered
  characters) but "~64ch" has two honest readings and it is a founder-authored word; parked non-halting,
  backstopped hard in `pre-launch-checklist.md`, and it gates nothing because §2's narration never enters
  `--read-max` and §3 is Sprint 2 — the assessment step's premise that it wanted settling this wave was
  wrong. **The WebKit ceiling is ruled**: `qlmanage` proves the no-JS complete transcript, which
  DEC-017.4 makes load-bearing rather than a consolation; mobile evidence is Blink-only and must be
  labelled as such; the one residual — `100dvh` in mobile Safari, the mechanism §7.1's whole budget rests
  on — is named, carried to pre-launch, and flagged to the founder for the Wave 3 gate. F3 applied
  directly to `page-shell.md` §11.

- 2026-07-25 — Wave 2: QA — Shell validated against `page-shell.md`, both engines (HO-004). Every
  acceptance criterion passes and no build defect was found; HO-003's QA box is ticked. Build suite
  86/86, independent audit 37/39 — the two failures are readability decisions QA lacks authority for,
  so the queue goes to PM rather than to Content. F1: `64ch` renders ~90 prose characters, past WCAG
  1.4.8's 80-character ceiling, and it traces to a seed value. F2: `.instrument`'s flat 48px padding
  leaves a 174px column at ~18 chars/line on a 320px phone — confirms OBS-001 and extends it past the
  375px case the producer reported. F3 confirms OBS-002 (spec §11's heading count, not the build).
  OBS-003's class confirmed but its figure disputed: ~66.7 counts `0` glyphs, not reading characters.
  Two suspicions chased and cleared rather than reported — the `overflow-x: hidden` assertion does
  falsify (injected 900px box at 375px viewport reports scrollWidth 901), and the contrast audit was
  redone across all 29 text runs rather than the 6 sampled selectors. The material new constraint is
  the WebKit ceiling: `qlmanage` runs no JavaScript and ignores the requested size, rendering at a
  fixed ~1024², both proven with committed probes — so §2's mobile cross-engine criterion cannot be
  met on this tooling and now needs a decision with a wave of runway rather than at the gate.

- 2026-07-25 — Wave 2: Developer — Page shell built, both themes, verified on both engines (HO-003).
  79/79 Blink checks and 7/7 WebKit; the harness ships with the build (DEC-020). Awaiting review — QA,
  then PM.

- 2026-07-25 — Wave 2: PM — Both specs reviewed and accepted; the §2 build inputs are now final
  (HO-010 accepted with notes, HO-009 accepted clean, HO-002 closed on F1's resolution; all three swept
  to Resolved, Active back to 3/300 lines). Every number re-derived rather than re-read: dwells tile to
  48.000 s, all seven budgets equal `floor(window × 3.5)`, B5's 14.48% is funded entirely by B6 with B3
  and QA paying nothing, and every row of the 424.4px mobile core recomputes from a shell token. The
  gate-hold push-back is upheld on the merits — at 4.80 s it gives SP7 16 words rather than the 14 the
  projected alternative would have. Two claims written for the amendment were wrong and were corrected
  in place rather than spending a revision round: the hold does not arrive 0.35 s after the fastest
  interval (L11's 3.45 s sits between), and the 6.60 s ellipsis is third-longest, not second. No design
  value moved. SP7's zero-slack budget routed to Content; the narration card's 6-line assumption routed
  to QA as a measurement, not an assumption. DEC-019.

- 2026-07-25 — Wave 2: UI/UX — Gate amendments applied (HO-010). Theme control dropped and the motion
  budget closed in the shell; §2 rescaled to a 48.00 s chain with B5 restored to 14.48% funded by B6, not
  QA; F1 resolved with a 424.4px mobile height budget against a stated 375×553 visual viewport and a
  ≥95%-visibility playback gate. Landscape re-verified and corrected — it takes two columns, not stacking.
  Gate hold preserved at 4.80 s rather than the projected 4.14 s; the "longest silence" claim was wrong
  before the rescale too and is replaced with the deceleration argument. SP7 flagged at ≤16 words for
  Content. Awaiting PM review.

- 2026-07-25 — Wave 2: Developer — Beat inventory trued up to corpus v1.1 (HO-009). Chain end and B6
  now measured (3858 s / 486 s), calls and cost corroborated by arithmetic, F1/F2 closed. Self-review
  caught a margin error of mine: B1, not B6, is the second-shortest beat — B3 leads by 13 s, so its
  "shortest beat" hazard is a near-tie. Downstream replay spec already matched; no drift. Awaiting PM
  review.

- 2026-07-25 — Wave 1: UI/UX — Design foundation + §2 replay spec (HO-002). Both themes tokenized from
  the seed with contrast measured per pair; §2 paced as a 60 s comprehension-weighted chain against the
  v1.1-corrected intervals, with an eight-slot narration sync contract. Three design questions parked in
  Founder Decisions. Awaiting review — PM, then founder gate.

- 2026-07-25 — Wave 1: Developer — Bodh corpus verification + beat inventory (HO-001). All six §2 beats
  supported, all twelve terminal lines assigned, corpus unmodified; arithmetic re-derived independently
  with two precision caveats and four pacing hazards recorded. One non-blocking founder question parked
  above (8 sessions vs DEC-023's "7 agent steps"). Awaiting review — UI/UX, PM.

- 2026-07-25 — Wave 1 Gate: **APPROVED with amendments** by the founder. Three design questions settled
  (DEC-015); four §2/shell amendments routed to HO-010 (DEC-016). Autonomous run cleared to launch.
