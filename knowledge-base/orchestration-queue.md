# Orchestration Queue
<!-- This file tells the founder which agent to invoke next. PM populates at sprint planning. Agents update on session completion. -->
<!-- Protocol: See muster/system-guide.md → Invocation Patterns and Agent Communication Protocol. -->

## Prompt Standard

<!-- Authoring or editing a step? The format templates + Role:-marker rules live in `muster/team/pm/skills/generic/sprint-planning.md` → "Queue Step Format". The live steps below already demonstrate the format, and `muster-queue-lint.sh` enforces the structure. -->

## Execution Mode (Sprint 1)

**Waves 0–1 complete and the Wave 1 founder gate is APPROVED with amendments (2026-07-25).** The
autonomous run is cleared to launch; the driver starts from the current `## Next Step`.

**Wave 2 order matters and is deliberate.** The gate's amendments change `page-shell.md` (the theme
control is dropped) and `section-02-replay.md` (48 s rescale, B5 rebalance, narration-first mobile), so
the UI/UX amendment and its PM review run **before** the shell build. Building the shell first would
build a control that has been dropped, and would leave the spec — not the build — as the thing out of
date. Order: inventory true-up → spec amendments → PM review → shell build → shell QA.

**Telemetry practice — agents do not measure this build.** Do not run `muster/scripts/muster-meter.py`
in any session. Build telemetry snapshots are founder-supplied and committed at milestones. Any step
needing a metric reads a committed snapshot; no step generates one. THIS SITE metrics remain dashes in
all page copy until measured at launch (seed rule 4).

## Founder Decisions
<!-- Agents add questions requiring founder input here. -->
<!-- PM monitoring: scan this section at every session start. Entries older than 24h without founder response are flagged to the founder immediately. -->
<!-- Format: - [DATE] [Agent]: [Question] -->
<!-- Autonomous runs: this section is non-halting on its own — observation and scope escalations park here while the loop keeps running. PM is the sole party that summons the founder: only PM (after assessing a block per the Decision Autonomy Matrix) writes the question here AND sets the Next Step block's `Role:` to `halt` (see below). A specialist that hits a block routes it to a `Role: pm` assessment step instead of halting. There is no checkbox convention. -->

*None open.*

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

### 2026-07-25 PM: Review HO-010 and clear HO-002

```
Role: pm
Model: claude-opus-5

**Task:** Review the amended specs, then close out HO-002.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-010, and HO-002 with its unticked PM box
- `knowledge-base/design-specs/web/page-shell.md`, `knowledge-base/design-specs/web/section-02-replay.md`
- `knowledge-base/decision-log.md` — DEC-015, DEC-016
- `muster/team/pm/skills/generic/deliverable-review.md`
- `muster/team/qa/skills/generic/verification-discipline.md`

**Deliverable:** review verdict on HO-010; HO-002's PM reviewer box ticked and Status flipped to `done`
once F1 is genuinely resolved; both moved to Resolved if complete.

**Acceptance criteria:**
- **Re-derive, don't re-read**: confirm the dwells tile to exactly 48.00 s and that every word budget equals its window × 3.5 w/s. Arithmetic that was verified once at 60 s is not verified at 48 s
- Confirm B5 landed in the 14–15% band and that B6 — not B3 or QA — funded it
- Confirm the mobile height budget is a number against a stated viewport, not a claim that it fits
- Confirm §5.1's line-persistence rule was amended, not just §7 and §10 — that was the easy one to miss
- Confirm no stale open-question text survives in either spec
- If UI/UX pushed back on the gate hold, evaluate it on the merits and route to Founder Decisions if it needs a ruling — do not overrule a design objection silently
- Do not tick HO-002 unless F1 is actually resolved. An unticked box pending a fix is correct process (founder-confirmed); ticking it early is the rot `muster-requests-lint.sh` exists to catch

**On completion:** Run the Pre-Handoff Self-Review Checklist (`muster/system-guide.md`). Promote the
shell build step.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-24 Developer (web): Page shell implementation

```
Role: developer
Model: claude-opus-5

**Task:** Build the page shell — design foundation, both themes, section chrome. No section content.

**Inputs:**
- `knowledge-base/design-specs/web/page-shell.md` — the approved spec; implement everything in it, the criteria below are non-exhaustive examples and never override the handoff
- `knowledge-base/product-spec-seed.md` → "Tech, deploy, telemetry practice" and "Design direction"
- `knowledge-base/agent-context/developer.md` — your Current Tasks
- `muster/team/developer/skills/web/web-best-practices.md`
- `muster/team/developer/skills/web/web-accessibility.md`
- `muster/team/developer/skills/web/web-performance-engineering.md`

**Deliverable:** `index.html`, `styles/`, `scripts/` — shell only.

**Acceptance criteria:** See `knowledge-base/current-sprint.md` for full criteria. Summary:
- Static HTML/CSS + minimal vanilla JS. No framework, no build system beyond simple assembly, no webfonts
- **Zero external network requests at runtime** — self-contained assets, inline SVG, CSS-generated texture. QA asserts this; it is a product claim, not a preference
- Both palettes at the seed's exact hex values, both themes first-class; matte surfaces, sharp corners, opaque cards; reading column ~64ch
- Semantic landmarks, real focus states, and every motion path `prefers-reduced-motion`-gated with complete content in the reduced path
- Verify WebKit **and** Blink at every visual milestone (`qlmanage`/Safari + headless Chrome) — inline-SVG/WebKit divergence is a known failure class here
- Do not run `muster-meter.py` and do not write any THIS SITE metric — telemetry is founder-supplied (see Execution Mode)
- `knowledge-base/design-specs/direction-reference.html` is not a build input. Build from `page-shell.md`

**On completion:** File HO-003 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist
(`muster/system-guide.md`) before filing — item 10 enforces queue + decision-log update.
```

### 2026-07-24 QA (web): Shell validation

```
Role: qa
Model: claude-opus-5

**Task:** Validate the page shell against its acceptance criteria.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-003
- `knowledge-base/design-specs/web/page-shell.md` — derive validation scope from this spec directly, so a dev-charter omission does not also blind QA
- `knowledge-base/product-spec-seed.md` → Tech + Accessibility
- `knowledge-base/agent-context/qa.md` — your Current Tasks
- `muster/team/qa/skills/web/web-testing.md`
- `muster/team/qa/skills/generic/bug-reporting.md`

**Deliverable:** HO-004 in `agent-requests.md` — per-criterion pass/fail with evidence.

**Acceptance criteria:** See `knowledge-base/current-sprint.md` for full criteria. Summary:
- Cross-engine parity on WebKit **and** Blink, with evidence per engine
- Zero runtime network requests asserted with evidence — this is a published product claim
- Contrast measured ≥4.5:1 body text in both themes; landmarks and focus states verified; reduced-motion path renders complete content
- No webfonts, no CDN references, no build-system artifacts in the shipped output

**On completion:** File HO-004 in `agent-requests.md`. If the build is red or any check fails, do NOT
advance the queue — re-point `## Next Step` to a `Role: pm` assessment step. Run the Pre-Handoff
Self-Review Checklist (`muster/system-guide.md`) before filing.
```


### 2026-07-24 Content (web): §2 narration script

```
Role: content
Model: claude-fable-5

**Task:** Write the §2 narration layer — the plain-English track that runs synchronized to the real
terminal log lines.

**Inputs:**
- `knowledge-base/product-spec-seed.md` §2 — the six-step sequence, the honest headline beat, and the explicit do-not-overclaim instruction on the Safari-only SVG catch
- `knowledge-base/agent-skills/content/copy-rules.md` — the 12 non-negotiable rules as enforceable constraints
- `knowledge-base/bodh-sprint4-corpus.md` — founder-supplied source material. Every factual claim must trace to a line here; cite it. Read-only: never edit this file
- `knowledge-base/design-specs/web/section-02-beat-inventory.md` — which corpus lines belong to which beat
- `knowledge-base/design-specs/web/section-02-replay.md` — beat timing and sync points to write against
- `knowledge-base/agent-context/content.md` — your Current Tasks
- `muster/team/content/skills/generic/brand-voice.md`

**Deliverable:** `knowledge-base/design-specs/web/section-02-narration.md` — narration line by line,
each keyed to its terminal beat; HO-005 in `agent-requests.md`.

**Acceptance criteria:** See `knowledge-base/current-sprint.md` for full criteria. Summary:
- **Product voice throughout.** §2 is not one of the two permitted first-person places (rule 7: the provenance line in §5 and the decisions in §4 only)
- A non-technical reader follows the narration alone; a technical reader reads the terminal lines; both reach `bodh.day · LIVE`
- Lands the honest beat: the PM re-checked the developer's work with its own screenshots, QA passed 11/11, no human touched this until the deploy button
- Exact numbers never rounded; "active build" never wall-clock; scope-labelled BODH vs THIS SITE; "measured — method and data published" never "proven"; the team named as AI
- The Safari-only SVG catch is either omitted or narrated explicitly as a founder-directed polish pass — never as part of the untouched run
- Never imply the website wave alone cost 9.3 h / $147 — those are whole-product aggregates
- Every claim cites a corpus line. A claim the corpus does not support is cut, not softened

**On completion:** File HO-005 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist
(`muster/system-guide.md`) before filing — item 10 enforces queue + decision-log update.
```

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
```

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
- Verify WebKit and Blink before filing

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
- Cross-engine parity on WebKit and Blink; zero runtime network requests; reduced-motion path complete
- Narration/terminal sync holds across both engines and at reduced motion
- Report measured beat intervals factually, so the founder's pacing judgment has data alongside it

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
- 2026-07-25 — Wave 1 Step 3: PM Wave 1 design review. HO-002 reviewed — 16 contrast ratios and the full
  timing model re-derived independently, all clean; finding F1 (mobile two-layer simultaneity) raised and
  carried. HO-002 left `needs-revision` with the PM box unticked pending HO-010.
- 2026-07-25 — Wave 1 Step 2: UI/UX design foundation + §2 replay spec (HO-002). Both themes tokenized
  with measured contrast, §2 paced to the tenth of a second.
- 2026-07-25 — Wave 1 Step 1: Developer Bodh corpus verification + beat inventory (HO-001). All six seed
  beats supported, no gaps, no HALT. Closed to Resolved.
- 2026-07-24 — Wave 0: PM Stage 4 drafts + Sprint 1 context cascade. Product spec, brand guidelines, and
  9 foundational assumptions written from the founder's seed; `copy-rules.md` project skill created;
  developer/ui-ux/qa/content contexts populated with inlined tasks; root CLAUDE.md filled; DEC-001→009
  logged. No handoff — PM step, reviewed by the founder directly.
