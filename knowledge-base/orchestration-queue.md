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

**The build inputs are closed again after the second fix round.** HO-015 is accepted (DEC-030), so
`section-02-replay.md`, `page-shell.md` and `section-02-narration.md` are final and carry nothing open.
SP7 was rewritten once, at the founder's gate — the narration file holds the current string and is
rendered verbatim. Where any other file spells a §2 string differently, that file is stale and the
narration file wins.

**The stylesheet and both harnesses encode the retired geometry, and that is expected, not a defect.**
`verify-shell.mjs` asserts 41 phone columns and a ~323px region, `qa-independent-audit.mjs` carries the
49.4px line constant, and `replay.css` comments cite a 41-character landscape floor. The entry model and
39/40 columns replace all of it. The build re-bases them; QA should expect the diff rather than diagnose
it. Four implementation rulings from the review ride the build step and two ride the QA step — all six
are dispositions of the same round, none is new scope.

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

### 2026-07-26 Developer (web): Build the phone log legibility fix

```
Role: developer
Model: claude-opus-5

**Task:** Implement the approved F-R1 and F-R2 resolutions.

**Inputs:**
- `knowledge-base/design-specs/web/section-02-replay.md` — authoritative (§5.1, §7, §7.1, §9.1, §12)
- `knowledge-base/decision-log.md` — DEC-029 for the resolution, DEC-030 for the review and its rulings
- `knowledge-base/design-specs/web/page-shell.md` — the type-scale note on component-scoped leading
- `styles/replay.css` — `.log`, `.log__line`, `.narration`, `.narration__list`, `.narration__entry`

**Acceptance criteria:**
- Entry boundaries visible at a glance at 375 × 553, per the amended spec
- One accent relationship across both cards, per the amended spec
- Fidelity unchanged: all twelve lines still diff byte-clean; no line needs horizontal scroll at 375px
- Reduced-motion and no-JS paths still render the complete transcript
- Timing, SP7 and every narration string are untouched — not in scope
- `bash scripts/test.sh` green on both engines; extend the harness rather than adding a second runner
- **Add a check that would have caught F-R1.** A harness that passes a log nobody can parse is the gap
  this round exposed; assert the entry-separation property directly

**Four rulings from the review (DEC-030) ride this step. None is new scope — each is a way this fix
can pass its own criterion and still be wrong, which is the pattern that produced the round.**

1. **The desktop rail's inset is set in two places and the live one wins.** `.narration` carries
   `padding: --gap-flow`, but while a playback state is present `.narration__list` is absolutely
   positioned at `inset: var(--gap-flow)`. Change only the card's padding and the accent inset is right
   in the no-JS transcript and stays at 24px for the entire live chain. Fix both, and measure the
   desktop pair **during playback**, not only in the static state (§12).
2. **51.0px is a ceiling, not a constant** — the same trap as the 49.4px line constant routed one round
   ago, wearing a new number. L12 sets a different box (1.25rem, outside the chain) and below 375px a
   chain line is three rows. §7.1 rule 4's "quantised down to whole entries" is a measurement
   instruction and it governs; the window must still come to rest on an entry's box edge and never
   inside a separator (§5.1).
3. **`--line-box` in `.replay` is `--text-terminal × --lead-terminal`** and is wrong below `--bp-wide`
   the moment the leading splits. Whatever reads it needs the entry box and the pitch, measured.
4. **The continuation cue is halved as the entry cue is strengthened** — 2ch → 1ch, ~15.7px → ~7.8px.
   That trade is approved, and it means the indent no longer stands alone: assert the indent and the
   separator as two properties (§12), so a build that silently loses the separator fails rather than
   leaning on a cue too small to carry it.

**On completion:** File HO-016 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->


### 2026-07-26 QA (web): Re-validate the phone log

```
Role: qa
Model: claude-opus-5

**Task:** Validate the rebuilt mobile log against the amended spec.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-016
- `knowledge-base/decision-log.md` — DEC-028, DEC-030
- `knowledge-base/design-specs/web/section-02-replay.md`

**Acceptance criteria:**
- Entry separation measured against the spec's stated budget, not eyeballed; report the number
- Accent inset measured on both cards and reported as a pair — **at 1280px take the pair while playback
  is running as well as statically.** The rail's inset has two sources and only one of them applies
  during the chain, so a mark that is right with no JS can be wrong for the whole live section
  (DEC-030). If §7.1 rule 1's fallback fired at 360px, the pair must still be equal
- Fidelity: twelve lines byte-clean; no horizontal scroll at 375 / 320; body never scrolls horizontally
- **The two-row constant is measured at 360 / 375 / 390 / 393, not inherited.** 360px is the tightest
  case with 5.7px of margin over §7.1's 37/36 floor, and L3's second row carries two of the four glyphs
  that can come from a fallback face. Report the row counts
- Reduced-motion and no-JS complete; zero runtime network requests; audit still exits zero
- Cross-engine on WebKit and Blink; state plainly what remains Blink-only
- **Report the landscape column count; do not fail it at 40.** §12 now binds at the 37-column floor —
  40 is a derived target with under a tenth of a column of headroom, and a red there would be the
  measuring-something-adjacent failure this project has already paid for three times
- Red build: do NOT advance — re-point Next Step to a `Role: pm` assessment step

**On completion:** File HO-017 in `agent-requests.md`. **Then append two measured figures to
`wave-review.md` → `### Already green` — the entry-separation pair and the accent-inset pair.** That
section is the packet the founder reads at the gate, it is re-based for gate 3 already, and those two
lines are the only thing in it that needs your numbers. This is a narrow, PM-granted write to one
section of a PM-owned file — add the two figures, change nothing else in that file. Run the
Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Wave 3 Gate 3 — founder review

```
Role: halt

**Gate:** The phone, third look. Narrow: can you tell at a glance where one log entry ends and the
next begins, and does the rust mark sit consistently across the two cards.

**Settled and not reopened**: passes 1–3, SP7 (final), the 48.00 s schedule, fidelity, and the
no-horizontal-scroll guarantee. Do not re-judge them.

**Still carried:** `100dvh` under mobile Safari's dynamic toolbars is the one behaviour no harness here
can prove. Your last screenshot was live playback at BEAT 03/06, which confirmed the visibility gate
fires and both layers hold — this gate just needs the same look once more on the rebuilt log.

**Read:** `knowledge-base/wave-review.md` and write your verdict in its `## Verdict` section.
**Under review:** the live §2 section on a phone, HO-015 through HO-017.

**Resume:** write your verdict, then run `muster/scripts/muster-sprint-resume.sh` from inside the
sprint worktree.
```


## Done (Last 10)
<!-- newest first -->

- 2026-07-26 — Wave 3 fix round 2, step 2: PM — HO-015 accepted with notes, no revision; the build step
  is cleared (DEC-030). The budget re-derived item by item and the load-bearing 37/36 floor checked by
  simulating the corpus rather than reading its citation — it holds, with no rounding margin at the
  floor. **Four unnamed breakages routed to the build step and two to QA**, the sharpest being a desktop
  inset set in two places where the live one wins. **Three spec corrections applied rather than
  returned**, and the open item ruled by amending `page-shell.md`. Harness green at review, 146 Blink /
  13 WebKit. HO-013 and HO-014 closed alongside it; the gate packet is re-based for gate 3.

- 2026-07-26 — Wave 3 fix round 2, step 1: UI/UX — the phone log groups into entries and the rust mark
  gets one 12px inset in both layers (HO-015, DEC-029). Neither finding was paid for: the leading split
  returns 7.2px of height, and the accent gutter is arithmetically free on desktop and funded on mobile
  by horizontal margin the spec had never written down. Two corrections found by re-deriving — F-R2 is
  not mobile-only (a border sits outside padding, so the tick was flush at every viewport), and
  DEC-028's "the room was already spent" is wrong: the two-row floor is 37/36 columns and the section
  shipped at 41/39. **Awaiting PM review, then the build.**

- 2026-07-26 — Wave 3 Re-gate: **SP7 approved, phone sent back.** The thesis line is final at 15 of 16
  words. Two blocking mobile findings routed as a second fix round (DEC-028): wrapped log lines do not
  group into entries, and the rust accent sits flush in the terminal but inset in the narration card.
  Both were confirmed in the built CSS rather than by eye; both trace to the horizontal and vertical
  room the wrap fix spent.

- 2026-07-26 — Wave 3 re-validation: QA — §2 re-validated after the fix wave (HO-014). Every criterion
  green and no build defect found; `qa-independent-audit.mjs` **exits zero for the first time** at
  106/106 with 9 reported measurements, and `scripts/test.sh` re-run green at 146 Blink / 13 WebKit.
  The four superseded assertions were re-derived against the spec and re-based to assert the corrected
  direction independently; the audit gained six checks that §12 required and only the producer's
  harness carried. Both 320px items reproduce and are left deferred. Four findings for PM, one of them
  a wording qualifier the founder will otherwise read as a miss. **Awaiting PM review, then the gate.**

- 2026-07-26 — Wave 3 rebuild: Developer — §2 rebuilt to the amended spec and copy (HO-013). SP7 renders
  the operator's arc verbatim (all ten slots now diffed against the narration file, 10/10); the phone
  terminal wraps with a 2ch hanging indent and shows 3 whole lines at 375 × 553 with the core at 479.52px
  against 479.54 budgeted; timing untouched at 4 ms worst drift. The 320px trap sprang as predicted and
  was avoided by measurement. Both landscape figures confirmed: the chrome bar falls to 41.5px, and the
  worst narration slot lands 2.83px over budget — inside its 14.2px slack, so the beat indicator stays.
  `scripts/test.sh` green: 146/146 Blink, 13/13 WebKit. **Awaiting review — QA, then PM.** QA also needs
  to re-base four `qa-independent-audit.mjs` assertions that encode the superseded spec (not build
  defects; all four are re-asserted correctly in `verify-shell.mjs`).

- 2026-07-26 — Fix wave step 3: PM — both fix-wave deliverables accepted, no revision; the rebuild's
  inputs are closed (DEC-027). Everything re-derived rather than re-read: SP7 recounts to 15 of 16 words
  reading in 4.29 s of the 4.80 s hold with SP6's relief unspent at 10 of 12, and the mobile core sums
  to 379.4px item by item, giving 3 lines at 375 × 553 with 25.4px of slack — all five viewport rows,
  both landscape columns and the 478.2px floor reproduce, and the two build measurements land on the
  arithmetic to 0.01px. **The claim the whole trade rests on was checked at the corpus, not in the
  handoff**: eleven of twelve lines exceed 41 columns and every one of L1–L11 costs exactly two rows
  there, with the longest token 18 characters against 34, so the wrap backstop is genuinely unreachable.
  DEC-024's guardrail met on the merits — no adjective-as-argument, the effect carried by tense landing
  on `awaiting operator`, deploy boundary intact. **Two gaps found by re-deriving rather than reading**:
  annotation 7 stated the totals strip's fit constraint but not the tracking that achieves it (a rebuild
  from the spec alone could have re-broken a fixed defect), and §7.1's 49.4px line constant is a ceiling
  below 375px that would clip a line at 320px if built literally — both now stated where the build will
  see them. SP3's 320px card overflow deferred to Sprint 2 with its fix already costed. Harness re-run
  at review: `scripts/test.sh` green.

- 2026-07-26 — Fix wave step 2: Content — SP7 now tells the operator's arc (HO-012). *"The operator
  planned the sprint, left the agents running, and returns to a deploy-ready site."* 15 of 16 words,
  script-measured, reading in 4.29 s of the 4.80 s hold; SP6's relief unspent; every verb cited to
  the corpus and zero adjectives-as-argument. **Accepted by PM, no revision** (DEC-027).

- 2026-07-26 — Fix wave step 1: UI/UX — the phone terminal reads without a sideways gesture (HO-011).
  Soft-wrap plus a 2ch hanging indent, paid for by lifting the totals strip out of the playback core;
  3 whole lines at 375 × 553, zero horizontal overflow anywhere, fidelity and type scale untouched
  (DEC-026). Prototyped and measured in Blink at nine viewports rather than derived. Desktop verified
  unchanged at five widths. **Accepted by PM, no revision** (DEC-027).

- 2026-07-26 — Wave 3 Gate: **APPROVED with one copy fix** by the founder. Pacing and narration judged
  good with styling subtracted; the 4.80 s gate hold upheld at its reduced length. Four findings routed
  as a fix wave: SP7 reframed to the operator's arc (DEC-024), mobile terminal to read without
  horizontal scroll (DEC-025), reading column ruled `64ch` as-shipped with the band check retired
  (DEC-023), and the real-iPhone playback check carried to the re-gate.

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
