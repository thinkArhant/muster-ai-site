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

**Four rulings are attached inline to the Wave 3 steps that carry them**, rather than living as separate
steps. From DEC-021: the `.instrument` phone-inset fix rides the §2 build step, and the audit's re-based
readability check rides the §2 QA step. From DEC-022: the totals strip's per-viewport value scale rides
the build step, and its two-line assertion rides the QA step. All four are dispositions of findings in
HO-004 and HO-005 — none is new scope.

**The narration is closed.** HO-005 is accepted with no revision and no word rewritten; the strings in
`section-02-narration.md` are final and are rendered verbatim. Where any other file spells a §2 string
differently, that file is stale and the narration file wins.

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

### 2026-07-26 Content (web): Reframe SP7 to the operator's arc

```
Role: content
Model: claude-fable-5

**Task:** Rewrite SP7, §2's thesis line, per gate finding F-G1 and DEC-024.

**Inputs:**
- `knowledge-base/decision-log.md` — DEC-024, including the budget and the named risk
- `knowledge-base/wave-review.md` — F-G1, the founder's framing verbatim
- `knowledge-base/design-specs/web/section-02-narration.md` — your own deliverable
- `knowledge-base/agent-skills/content/copy-rules.md` — binding
- `knowledge-base/bodh-sprint4-corpus.md` — every claim traces here. Read-only

**The change.** SP7 currently states the thesis by negation: *"The run stops itself at the gate. No
human touched this until the deploy button."* The founder wants the active arc a first-time reader
pictures — the operator plans the sprint, leaves while the agents run, and comes back to work that is
ready to deploy. The corpus supports it: the chain ran unattended with a single human gate at deploy.

**The risk, stated plainly because it was in the ask.** The founder framed this as "something a VC
would want to hear that would amaze them." Taken literally that is an instruction to write
adjectives-as-argument, which `copy-rules.md` forbids and which this page cannot survive — a site whose
argument is *every number here is checkable* cannot carry a sentence reaching for awe. Land the arc;
do not reach. This line earns its effect the way SP3 does, from a fact that is specific and true.

**Budget:** SP7's window is the 4.80 s gate hold — `floor(4.80 × 3.5)` = **16 words**. The current line
spends 15. SP6's 12 words in the same beat are the only relief and cost no reschedule; use them if the
arc needs a run-up, and say so.

**Deliverable:** revised `section-02-narration.md` (SP7, and SP6 if used); HO-012.

**Acceptance criteria:**
- The arc lands: plan → leave → agents run → return → ready to deploy
- Word count stated and inside budget; if SP6 is spent, both counts stated
- Product voice — §2 is not one of the two first-person places (rule 7)
- Zero adjectives-as-argument, zero rounded numbers, correct scope labels, "measured" never "proven"
- Every factual claim cites its corpus line

**On completion:** File HO-012 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist
(`muster/system-guide.md`) before filing — item 10 enforces queue + decision-log update.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-26 PM: Review HO-011 and HO-012 before the rebuild

```
Role: pm
Model: claude-opus-5

**Task:** Review the mobile-layout amendment and the SP7 rewrite together, before either is built.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-011, HO-012
- `knowledge-base/design-specs/web/section-02-replay.md`, `section-02-narration.md`
- `knowledge-base/decision-log.md` — DEC-024, DEC-025
- `knowledge-base/agent-skills/content/copy-rules.md`
- `muster/team/pm/skills/generic/deliverable-review.md`

**Acceptance criteria:**
- **Re-derive, don't re-read.** Recount SP7's words yourself and confirm it is inside 16; if SP6 was
  spent, recount that too. Re-derive the mobile height budget against the stated viewport
- **DEC-024's guardrail is the one to enforce.** If the new SP7 reaches for awe rather than stating a
  fact, that is a blocking finding no matter how well it reads. Judge it as a skeptical reader would
- Confirm the arc is actually supported by the cited corpus lines, not merely plausible
- Confirm §5.1's persistence wording moved if the visible-line count changed
- If UI/UX pushed back on the 2–3 line outcome, evaluate on the merits and route to Founder Decisions
  rather than overruling a design objection silently

**On completion:** Run the Pre-Handoff Self-Review Checklist. Promote the rebuild step.
```

### 2026-07-26 Developer (web): Rebuild §2 to the amended spec and copy

```
Role: developer
Model: claude-opus-5

**Task:** Apply the approved mobile-layout change and the revised narration string to the built §2.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-011, HO-012 with their PM reviews
- `knowledge-base/design-specs/web/section-02-replay.md`, `section-02-narration.md` — authoritative
- `knowledge-base/bodh-sprint4-corpus.md` — read-only

**Acceptance criteria:**
- The narration string renders verbatim from the narration file; no retyping
- No horizontal scroll needed to read a corpus line at 375px, per the amended spec
- Fidelity unchanged: all twelve lines still diff byte-clean against the corpus
- Reduced-motion and no-JS paths still render the complete transcript
- `bash scripts/test.sh` green on both engines; extend it rather than adding a second runner
- Timing untouched — the 48.00 s schedule is not in scope for this fix

**On completion:** File HO-013 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 QA (web): Re-validate §2 and retire the reading-band check

```
Role: qa
Model: claude-opus-5

**Task:** Re-validate the rebuilt §2, and apply DEC-023 to the audit.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-013
- `knowledge-base/decision-log.md` — DEC-023, DEC-025
- `knowledge-base/design-specs/web/section-02-replay.md`, `section-02-narration.md`

**Acceptance criteria:**
- **DEC-023:** the 45–75-character band check is retired as an assertion and re-scoped to a reported
  measurement. The number stays visible; the false red goes. `qa-independent-audit.mjs` must exit zero
  on a clean build afterwards — an audit that is always red is an audit nobody reads
- Twelve lines still diff byte-clean; the revised narration string diffs against the narration file
- No horizontal scroll required at 375px; body still never scrolls horizontally at 375 / 320 / 200%
- Reduced-motion and no-JS paths complete; zero runtime network requests
- Cross-engine on WebKit and Blink; state plainly what remains Blink-only
- Red build: do NOT advance — re-point Next Step to a `Role: pm` assessment step

**On completion:** File HO-014 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Wave 3 Re-gate — founder review

```
Role: halt

**Gate:** The §2 replay re-judged after the fix wave — SP7's new framing, and the phone without
horizontal scroll.

The first gate approved the replay on pacing and narration (passes 1–3) and returned two changes. This
gate is narrow: does the new thesis line land the operator's arc without reaching, and does the phone
now read without sideways scrolling.

**Carried from the first gate and still open:** `100dvh` in mobile Safari is unverified on real WebKit.
The earlier screenshot showed the complete-transcript end state, not live playback. Reload the page,
let §2 scroll into view fresh, and watch *during* the chain — the terminal should show a short window of
lines that advances, with the narration card in view the whole time.

**Read:** `knowledge-base/wave-review.md` and write your verdict in its `## Verdict` section.
**Under review:** the live §2 section, `section-02-narration.md`, HO-011 through HO-014.

**Resume:** write your verdict, then run `muster/scripts/muster-sprint-resume.sh` from inside the
sprint worktree.
```

## Done (Last 10)
<!-- newest first -->

- 2026-07-26 — Fix wave step 1: UI/UX — the phone terminal reads without a sideways gesture (HO-011).
  Soft-wrap plus a 2ch hanging indent, paid for by lifting the totals strip out of the playback core;
  3 whole lines at 375 × 553, zero horizontal overflow anywhere, fidelity and type scale untouched
  (DEC-026). Prototyped and measured in Blink at nine viewports rather than derived. Desktop verified
  unchanged at five widths. **Awaiting PM review.**

- 2026-07-26 — Wave 3 Gate: **APPROVED with one copy fix** by the founder. Pacing and narration judged
  good with styling subtracted; the 4.80 s gate hold upheld at its reduced length. Four findings routed
  as a fix wave: SP7 reframed to the operator's arc (DEC-024), mobile terminal to read without
  horizontal scroll (DEC-025), reading column ruled `64ch` as-shipped with the band check retired
  (DEC-023), and the real-iPhone playback check carried to the re-gate.

- 2026-07-26 — Wave 3 Step 4: QA §2 replay validation (HO-007). 20/20 criteria green, 7 measurements
  reported; seven defects found and fixed in the audit itself. Accepted by PM.
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->
<!-- A specialist Done entry is a POINTER to the handoff, not a substitute for it: `- DATE — Step N: <title> (HO-NNN). <one-line outcome>.` If it grows past ~5 lines, the detail belongs in the HO body. The autonomous loop lints the most-recent Done entry's HO reference against agent-requests.md and stops if it's missing. -->

- 2026-07-26 — Wave 3: QA — §2 replay validated; every criterion green (HO-007). Twelve lines byte-clean
  against the corpus and the corpus proven unmodified from git; worst reveal drift 16.8 ms across all
  twelve lines and all ten slots; phone core 499.89px with both layers at 100% coverage for the whole
  chain; WebKit carries the no-JS transcript in both themes and every mobile figure is labelled
  Blink-only. Build suite green (129 Blink, 13 WebKit); the independent audit is 99/100 with 7 reported
  measurements. **Seven defects were in the audit, not the build** — five of them holding eight checks
  red against a correct build, including a WebKit row profile that was blind by construction, and two
  closing criteria nothing had measured. The one standing red is F1, the founder's `64ch` question,
  left red deliberately. Three findings for PM: the narration card meets its 6-line worst case with zero
  margin, OBS-002 confirmed by measurement at 320px, and a spec/build id mismatch in §11. Awaiting PM
  review, then the founder gate.

- 2026-07-25 — Wave 3: Developer — §2 replay built and playing to schedule (HO-006). Twelve corpus
  lines byte-clean on both engines, measured reveal offsets at 0 ms drift against §5.1, and the phone
  core at 499.89px with five whole lines. Two bugs the harness caught before they shipped: the window
  scrolled to the end of the DOM and showed an empty terminal on a phone, and the visibility gate
  counted the band behind the sticky status bar as visible. Three deviations stated in the handoff, the
  material one being the rail width — a literal 36ch starves the terminal below the width L3 needs, so
  the rail yields and the fidelity guarantee holds. `bash scripts/test.sh` green: 129 Blink, 13 WebKit.
  Awaiting review — QA, then PM.

- 2026-07-25 — Wave 3: PM — §2 narration accepted; the build inputs are now closed (DEC-022). HO-005
  accepted with no revision and not a word rewritten. Every string re-measured by script rather than
  read off the deliverable's table — 139 of 163 timed words, all ten strings inside budget and all nine
  timed ones inside their read windows, every budget correctly derived as `floor(window × 3.5)` — and
  every claim looked up in the corpus rather than checked against its citation. **Two suspicions chased
  and cleared rather than reported**: SP6's "the same instant" is measured at source (session 7's start
  plus its measured 867 s lands exactly on session 8's stated start) and descends from beat-inventory
  D7 through the spec's own SP6 brief, so it is not precision the copy invented; and the seed's honest
  headline beat, stated there as one sentence, is delivered whole across SP3/SP6/SP7 rather than
  dropped. SP4's all-viewport split ratified — one copy set beats a desktop-only variant. **The totals
  strip produced the two real findings, and neither is against the narration.** Content's
  `~64 MIN AGENT WORK` is right and is now cascaded into both replay wireframes, which still carried
  the superseded `~64 MIN ACTIVE` and were the Developer's other source. And the strip's value scale
  was specified two ways in one file: annotation 7 says `--text-readout`, which at 375px clamps to 24px
  and makes the strip 40.5px against a 33.0px budget with 5.1px of slack — so §7.1 wins below
  `--bp-wide`. The related wrap risk is routed, not ruled: at 43 characters the string fits ~327px bare
  and overflows it with `--track-micro`, so tracking is the lever and the copy does not move. Gate
  packet re-based for Wave 3 — the founder's four checks are pacing and words only, with styling
  subtracted.

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
