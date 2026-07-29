# Orchestration Queue
<!-- This file tells the founder which agent to invoke next. PM populates at sprint planning. Agents update on session completion. -->
<!-- Protocol: See muster/system-guide.md → Invocation Patterns and Agent Communication Protocol. -->

## Prompt Standard

<!-- Authoring or editing a step? The format templates + Role:-marker rules live in `muster/team/pm/skills/generic/sprint-planning.md` → "Queue Step Format". The live steps below already demonstrate the format, and `muster-queue-lint.sh` enforces the structure. -->

## Execution Mode (Sprint 2)

**Autonomous throughout, two founder gates only** (DEC-033, DEC-034). Nothing else reaches the founder:
spec conformance, contrast, cross-engine parity, zero network requests, reduced-motion completeness and
corpus fidelity are all machine-verifiable (DEC-009).

**Sequence facts that are dependencies, not preferences:**
- **Copy before design.** §1's copy runs first because the hero spec must specify a headline treatment —
  and its accessible name — against real candidate strings, not a hypothesis.
- **The shell lands before the Gate A sample.** The sample renders in the page's real tokens, so the
  tokens must be final first. It also retires the §2 defect class before the founder spends a gate.
- **The Gate A fix round precedes every build, Content before UI/UX.** §4's one-screen layout is decided
  against the rewritten copy's measured lengths, and the §1 build needs the recomposed hero spec — the
  same copy-before-design dependency, applied to the fix round (DEC-049).
- **Scroll-snap builds last.** It cannot be validated before sections exist to snap between, and it is
  the likeliest thing to be rejected at Gate B.

**Assert relationships, not values** (DEC-032). Any step changing spacing, insets or rhythm adds a
harness assertion for the relationship it preserves. Three Sprint-1 rounds each satisfied a named value,
disturbed an adjacent relationship, and passed every harness.

**Verify against the state under test.** A render used as evidence must show the condition being
claimed. PM confirmed a Sprint-1 fix against a frame that could not display the defect.

**Blocked-path rule, restated inside every step below**: a specialist that cannot complete its step
re-points `## Next Step` to a `Role: pm` assessment step and files the blocker. **Never set
`Role: halt`** — only PM does that, and only for a founder question.

**Telemetry practice — agents do not measure this build.** Never run `muster/scripts/muster-meter.py`.
THIS SITE metrics remain dashes until the founder supplies a snapshot (seed rule 4, DEC-005).

**Founder-authored source is read-only**: `product-spec-seed.md`, `bodh-sprint4-corpus.md`,
`design-specs/direction-reference.html`, `design-specs/brand/*`.

## Founder Decisions
<!-- Agents add questions requiring founder input here. -->
<!-- PM monitoring: scan this section at every session start. Entries older than 24h without founder response are flagged to the founder immediately. -->
<!-- Format: - [DATE] [Agent]: [Question] -->
<!-- Autonomous runs: this section is non-halting on its own — observation and scope escalations park here while the loop keeps running. PM is the sole party that summons the founder: only PM (after assessing a block per the Decision Autonomy Matrix) writes the question here AND sets the Next Step block's `Role:` to `halt`. A specialist that hits a block routes it to a `Role: pm` assessment step instead of halting. There is no checkbox convention. -->

**The eight role names** are settled and need no ruling — PM · Developer · UI/UX · QA · Content ·
Marketing · Legal · Research. They live in `copy-rules.md` → scope table.

<!-- Resolved 2026-07-27 — Formation: hub is PM, bus-bar carries the seven specialists. Founder ruling, Gate A item 4. -->
<!-- Resolved 2026-07-28 — Gate A COMPLETE, all four items. Headline: B amended (struck `a human`, rust `an AI`, plain `team.`). §4: four re-selected decisions, plain language (DEC-043, DEC-044). §1: sparse hero, all Bodh out (DEC-045, DEC-046). §3: bare-Claude contrast, closed at 90/90 (DEC-047). §5: cost row in (DEC-048). Fix round routed at the gate by the interactive PM (DEC-049) — the steps below ARE the verdict's consumption. -->

<!-- Resolved 2026-07-26 — Reading column: option A, `64ch` ships as the CSS value. See DEC-023. -->
<!-- Resolved 2026-07-26 — Brand mark: header lockup is pennant + `MUSTER_` with a static underscore; five section separators take the pennant; icon seats as supplied; never on a pole. See DEC-031. -->
<!-- Resolved 2026-07-26 — Gate model: two founder gates for Sprint 2, Gate A rendered. See DEC-033. -->
<!-- Resolved 2026-07-26 — The harness's `no http(s) URL in any shipped file` check is AMENDED, never deleted: an inert href/text URL is permitted, a fetching reference (src, @import, url(), link, script) stays banned. See DEC-034. -->
<!-- Resolved 2026-07-27 — REQ-006: `brand-guidelines.md` §4 amended; header lockup only, footer excluded in prose, pennant figure corrected to 6 × 9. See DEC-042. -->
<!-- Resolved 2026-07-27 — REQ-007: scroll-snap's WebKit half is a MANUAL check, labelled as manual, with one sentence added to the Gate B iPhone ask. Not a mechanical pass. See DEC-042. -->
<!-- Resolved 2026-07-27 — REQ-008: `cdp.mjs`'s `send()` timeout lands in the §1-and-§6 step; the renderer diagnosis lands with the QA sweep. See DEC-042. -->

## Next Step
<!-- The single next agent invocation. Copy the ENTIRE code block (including `Role: <agent>` at the top) and paste as one message in Claude Code. -->
<!-- Autonomous hard-block signal: PM sets `Role: halt` here (and records the question in `## Founder Decisions`) when it has assessed a block as needing a founder answer. Specialists never set `Role: halt` themselves. The autonomous loop stops on `Role: halt`. Sprint completion is detected by the ABSENCE of a fenced code block under Next Step. A block that has a fence but no `Role:` line defaults to `pm`. -->

### 2026-07-26 QA (web): Full-page sweep

```
Role: qa
Model: claude-opus-5

**Task:** Validate the content-complete page end to end. One sweep, not one per section.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-024 through HO-033 (HO-031/032 are the Gate A fix round;
  the specs and copy they revised are the baseline this sweep verifies against; HO-033 repaired
  the audit)
- Every section spec and copy file — derive scope from the specs directly, so a dev-charter omission does
  not also blind QA
- `knowledge-base/bodh-sprint4-corpus.md` — read-only fidelity baseline

**The audit repair is NOT this step's** — HO-033 (the preceding step) already made
`qa-independent-audit.mjs` exit zero. This sweep *runs* it as the independent cross-check; if it is
red or hangs here, that is a finding against HO-033, re-pointed to PM, not something to debug
inside the sweep.

**Deliverable:** HO-030 in `agent-requests.md` — per-criterion pass/fail with evidence.

**Acceptance criteria:**
- Cross-engine parity on WebKit **and** Blink, with evidence per engine; state plainly what remains
  Blink-only. **The WebKit harness can measure rendered geometry**, not just ink — colour-clustering a
  QuickLook PNG reads a static relationship off the pixels (OBS-005). Use that for any static geometry a
  spec calls cross-engine-critical. It does **not** reach scroll-snap, which is a behaviour: that half is
  a manual Safari pass, labelled manual (DEC-042)
- **Zero runtime network requests** with evidence. Confirm the amended `http(s)` check still catches a
  fetching reference — **plant one and prove it goes red**, then remove it. A guard that cannot fail is
  not a guard
- Contrast ≥4.5:1 body text in both themes; landmarks and focus states verified
- **The §1 headline's computed accessible name**, read from the AX tree, not asserted
- Reduced-motion and no-JS render complete content across every section
- §2 fidelity byte-clean; corpus unmodified, proven from git
- **All relationship assertions green, and each verified to fail when violated**
- Scroll-snap: keyboard paging, find-in-page, 200% zoom each verified working
- `VERIFY.md` exists at repo root and the §1 chip resolves to it
- **Run the `curl` against the live repo and record the result** — `pre-launch-checklist.md` requires it
  confirmed working, not assumed. This is the only step where the agent may make a network request
- Copy rules as a text matrix across all sections **and across `VERIFY.md`** — the verification
  index is the page's honesty mechanism and is exactly where a scope slip would be read by the
  skeptic it exists for (DEC-050): no `muster.build`, no cross-scope aggregates, scope labels
  present, THIS SITE dashed — and the Gate A negatives: **no Bodh material in §1** (no measured
  line, no BODH row, no hero terminal — DEC-046), **no named competitor anywhere** (DEC-047),
  `9.3 h`/`$147` byte-equal with §5 as primary (DEC-048), "context engineering" exactly once, in §3
- **The four §4 stamps byte-exact** — `2026-04-24` · `2026-06-13` · `2026-04-12` · `2026-06-07`
  (DEC-044): the stamps are the independent-arrival argument, and a transposed date on the one
  section whose premise is checkable dates is a launch-grade defect
- **Enumerate the live motion elements on the built page** against the budget HO-032 re-stated —
  a count, not an impression; an over-budget page reads at Gate B as "feels busy," which is
  checkable, not taste (DEC-050)
- **The counting cells' live-region behaviour matches HO-028's stated posture**, verified during
  playback, not read off the markup — a polite region re-announcing every frame is screen-reader
  spam that every other check passes (DEC-050)

**If a check fails:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step
naming the failing check, and file HO-030 with what you found.

**On completion:** File HO-030 in `agent-requests.md` — under this exact ID; higher IDs in the
ledger are not an error. Run the Pre-Handoff Self-Review Checklist.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-26 PM: Review the build and assemble the Gate B packet

```
Role: pm
Model: claude-opus-5

**Task:** Review Wave 2, then build the Gate B packet.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-024 through HO-033, HO-030 being QA's sweep
- Every section spec, and the Gate A verdict in `knowledge-base/wave-review.md`

**Deliverable:** review verdicts on HO-024 through HO-030 in `knowledge-base/agent-requests.md`, and the
Gate B packet written into `knowledge-base/wave-review.md`.

**Acceptance criteria:**
- **Re-run both harnesses yourself.** A summary is not evidence
- Confirm §4 as built carries DEC-044's four decisions in the Gate A treatment and HO-032's layout —
  and that no trade-off was inflated away (DEC-043's guardrail: an impressive-but-costless decision
  is a blocking defect)
- Confirm §1 is the sparse hero and nothing more — its whole above-fold inventory is eyebrow,
  headline, formation (DEC-045/046)
- Confirm every relationship assertion exists **and would fail if violated**; confirm QA actually planted
  a fetching reference and saw it go red
- **Look at renders of the states under test** — including a key-beat frame for the tick, which is the
  exact miss that cost Sprint 1 a round
- Confirm `VERIFY.md` exists, the curl was really run, **and read VERIFY.md's own contents against
  the copy rules** — scope labels, no cross-scope aggregate, no unmeasured claim (DEC-050). It is
  developer-authored and no Content session ever touches it; this review is the only judgment pass
  it gets
- Confirm nothing reaches the founder that a machine could have settled
- **Gate B packet**: the assembled page, desktop and phone, as one batch. Say what to look at and in what
  order. **Include the iPhone ask** — `pre-launch-checklist.md` carries a hard blocker only the founder's
  device can close: §2 on a real iPhone in Safari with toolbars shown, both layers on screen for the
  whole playback. He is already on his phone at this gate; asking costs nothing and closes it

**On completion:** Write the packet into `wave-review.md`. Run the Pre-Handoff Self-Review Checklist.
Promote the gate by writing the Gate B block into `## Next Step`.
```

### 2026-07-26 Gate B — founder review: the assembled page

```
Role: halt

**Gate:** The whole page, desktop and phone, in one pass. §1 through §6, the brand mark, the spacing
system, and scroll-snap.

**Also asked here, and it closes a hard launch blocker:** open §2 on your iPhone in Safari with the
toolbars showing and confirm both layers stay on screen for the whole playback. No harness on this
machine can prove it. **While you are there — does section snapping fight your scroll?** That is the
WebKit half of scroll-snap, and it is a manual check by ruling: `qlmanage` cannot scroll, and iOS
momentum is exactly where a proximity pull is most likely to feel wrong (REQ-007, DEC-042).

**Read:** `knowledge-base/wave-review.md` and write your verdict in its `## Verdict` section.

**Resume:** write your verdict, then run `muster/scripts/muster-sprint-resume.sh` — **not** the driver
directly. Resume spawns a PM that turns your findings into fix steps. **Any fix round it creates must
end with a scoped QA re-run** of the relationship assertions plus cross-engine on whatever was touched:
three Sprint-1 fix rounds each satisfied their criterion and broke something adjacent, and a fix chain
with no verification behind it is how that happened.
```

## Done (Last 10)
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->

- 2026-07-29 — Step: QA independent audit (HO-033). The audit can no longer hang: its one unbounded
  external wait — `execFileSync("qlmanage")` with no timeout — is bounded and named, proven by
  planting a stalling `qlmanage` (pre-fix: blocked 120 s straight, zero output, killed; post-fix:
  red in 60 s with the render named). **The brief's `SAMPLER` hypothesis was bisected and is not
  supported** — the audit at `bded0dd`, the commit it was reported hanging at, runs 106/106 exit 0.
  Exit 0 twice at 108/108; `scripts/test.sh` GREEN both engines (273/273 + 27/27). No shipped file
  touched. **Awaiting PM review at the build-review step; OBS-014 records that the original hang does
  not reproduce from the committed tree, and closes OBS-006's question.**

- 2026-07-29 — Step: Developer scroll-snap (HO-029). The page now comes to rest on section starts —
  four declarations in the user agent, no script touching the page's scroll position (asserted
  against the shipped source). §2's exemption proven as a property (0 of 13 gated rests moved at
  1280×900, 0 of 3 at 375×553), keyboard paging, 200% zoom and find-in-page each asserted, reduced
  motion off with `--scroll-pad` kept. `scripts/test.sh` GREEN both engines (**273/273 + 27/27**);
  the audit exits zero, 108/108, twice. Eight violations planted, twelve assertions watched go red —
  including two blind checks found and repaired. **Awaiting PM review at the build-review step;
  OBS-013 asks PM (with UI/UX) to rule §7.1's A11: a start-aligned `scrollIntoView()` on §4's last
  value is pulled 180px past it, off screen, while the alignment find-in-page actually uses is
  unaffected — the same trade as OBS-009, so one ruling covers both.**

- 2026-07-29 — Step: Developer §5 (HO-028). The page's whole-product number set has one home: `9.3 h`,
  `4.8 h`, `4` commit-days and `$147` beside BODH, four ink dashes beside THIS SITE, every string
  parsed out of the copy file and the four figures additionally diffed against the seed's Measured
  data table. Each figure appears **exactly once on the page**, asserted as a count with the carrying
  section named. **The count-up's live-region posture is decided (DEC-052): none** — the rolling
  digits leave the accessibility tree and the exact value stands in, verified during playback against
  real page cells (100 visible states, one announced) and from the AX tree mid-roll. `scripts/test.sh`
  GREEN both engines (**256/256 + 27/27**); the audit exits zero, 108/108, twice. Every new
  load-bearing assertion planted and watched go red. **Awaiting PM review at the build-review step;
  OBS-011 (a stale dash count in `section-05-copy.md`'s R4 prose) and OBS-012 (the footer still
  carries a shell placeholder and no sprint step owns footer copy) are PM's to rule.**

- 2026-07-29 — Step: Developer §3 and §4 (HO-027). §3 reads as one passage — kicker and paragraph
  byte-equal to the copy file, zero numerals, the 64ch column measured — and its sentence-boundary
  wrap is asserted as a rule rather than a line count. §4 ships DEC-044's four decisions verbatim
  in order on the Gate A treatment, in HO-032's paged track: all four sheets equalised at 473.33px,
  the 360.0px peek reproduced, the mechanism mark 2px at a token-read 12.00px seat with zero rust
  text, and the track's bottom edge inside a 700px screen under the sticky bar. Contrast measured
  in both themes at the spec's own figures (13.23/13.64 ink, 5.16/5.76 muted). `scripts/test.sh`
  GREEN both engines (**230/230 + 21/21**); the audit exits zero, 107/107, twice. Six assertions
  planted and watched go red. **Awaiting PM review at the build-review step; OBS-009 asks PM to
  rule one clause of `section-04-decisions.md` §12.16 — with the track's proximity snap on, a
  `scrollIntoView()` on off-canvas content lands the match part-visible, and no declaration in the
  section's ruling overrides that.**

- 2026-07-28 — Step: Developer §1 and §6 (HO-026). The sparse hero, the command and the proof link
  ship: the headline's computed name read from the AX tree (`SHIP A PRODUCT WITH AN AI TEAM.`, the
  struck phrase absent), the formation announcing hub `PM` → seven specialists with the bus width
  equal to the plate row, the fold contract measured (hub + four whole plates above 553 at 375, hub
  + three at 320), the remnant's dashes inert, and `VERIFY.md` written at repo root — a hard launch
  blocker closed. The `http(s)` guard was **narrowed, not deleted** (fetching references fail, an
  inert URL and an `<a href>` pass, prefetch hints fail) and **proven to go red** with planted
  references. `cdp.mjs`'s `send()` now has a named deadline and the `--text-display` floor landed
  with its own assertion. `scripts/test.sh` GREEN both engines (197/197 + 15/15); **the independent
  audit exits zero, 107/107, twice consecutively** — two real defects and six changed-subject
  assertions fixed on the way. Awaiting PM review at the build-review step; OBS-006 asks PM to rule
  whether the queued audit-repair step still has a subject.

- 2026-07-28 — Step: UI/UX Gate A fix round (HO-032). §1 recomposed to the sparse hero with the
  formation's real design pass and a rendered fold budget (four whole plates above the 375 fold,
  every figure re-rendered and reproduced); the remnant ruled a one-row instrument strip; §1 fully
  static with the motion budget re-stated at two live elements + cursor; §4 ruled a horizontal
  paged track at desktop (612.1px content bottom — the only candidate that fits one screen) and
  stacked on phone with its cost stated (DEC-051); kicker wrap rule homed in `page-shell.md` §3;
  `scripts/test.sh` re-run GREEN. Awaiting PM review at the build-review step; two DEC-046 cascade
  gaps in PM-owned files flagged as OBS-002/003.

- 2026-07-28 — Step: Content Gate A fix round (HO-031). All four copy files carry the verdict: §1 is
  the settled headline with zero Bodh material, §3 is the closed 90/90 block byte-exact, §4 is
  re-authored plain from DEC-044's four at 44/42/44/44 words per sheet (ceiling 45 — nothing
  unfittable, every trade-off intact), §5 takes the `$147` cost row. Awaiting PM review at the
  build-review step; HO-032 consumes the measured lengths next.

- 2026-07-28 — Step: Gate A, processed at the gate (DEC-043–049). All four items ruled interactively
  with the founder against rendered evidence: headline B amended (`~~a human~~` struck, rust `an AI`,
  plain `team.`, 3/3/2/2/2 lines measured); §4's four decisions re-selected from ten candidates with
  every stamp verified by `git log` against the framework repo; §1 ruled the sparse hero with **all**
  Bodh material out (measured line, readout row, hero terminal — §2 becomes the page's only
  terminal); §3 rebuilt on the bare-Claude contrast and closed at 90/90 with the recognition hook in;
  §5 closed with the cost row restoring the page's only `$147`; §6 approved as written. **The fix
  round was routed here by the interactive PM rather than by resume's headless PM** — two fix steps
  (Content HO-031, UI/UX HO-032) inserted, four build briefs re-cut to the rulings, the halt step
  retired. Run `muster/scripts/muster-sprint-run.sh` directly; the verdict is already consumed.

- 2026-07-27 — Step: PM Wave 1 review and the Gate A packet (DEC-042). **All eight handoffs accepted with
  no revision**, and the acceptance is re-derived rather than read: the §4 seed-vs-shipped diff
  independently reproduced at 420 → 415 / 30 → 30 sentences / exactly three rows, every stated word
  budget across five copy files recounted with no mismatch, all eight contrast pairs recomputed from the
  locked hex exactly, §1's element inventory checked against seed §1 item by item (all nine present),
  `scripts/test.sh` re-run GREEN both engines and `tools/gate-a-report.mjs` re-run 51/51 exit 0.
  **The two load-bearing assertions were re-planted and watched to go red** — `--mark-clear: 0ch` turns
  R2 red at all three states, `--mark-inset: 8px` turns R1 red *with the expected figure following the
  token*, failing on the inequality; tree reverted clean. **Four rulings keep the gate to taste**: the
  audit's repair split across two owners (transport timeout to the §1 step, renderer diagnosis to QA),
  scroll-snap's WebKit half ruled a labelled manual check, the `--text-display` token held to land with
  §1 *and its assertion*, and §5's `9.3 h` repeat kept as the denominator. REQ-006/007/008 all closed;
  `brand-guidelines.md` amended; six observations triaged; `agent-context/content.md` refreshed where it
  still carried SP3 as an open defect. `muster-requests-lint.sh` back to green — 872 active lines to 6.
  **Gate A is live: four things need the founder's word, and one thing is honestly not green** — the
  independent audit hangs, which is stated in the packet rather than omitted.

- 2026-07-27 — Step: Developer Gate A sample render (HO-025). Gate A is now something to look at:
  `samples/gate-a.html` sets all four headline candidates and one real §4 spec-sheet in both themes
  against the page's real tokens, with the machine's readings printed beside them. **All four announced
  strings read out of the Blink AX tree match their ruling — candidate B announces
  `SHIP A PRODUCT WITH AI AGENTS.` with the struck phrase absent from the name and present in the
  render.** §4 measured 685.31px prose column in a 903.31px card, 2px accent mark at 12.00px from the
  card's inner edge, zero rust text in both themes — matching the spec's own figures exactly. 51/51
  checks, `scripts/test.sh` green both engines, WebKit render verified. One blind check was found and
  fixed: the per-pane overflow probe was proven to fail by planting a 220-char nowrap element and seeing
  it go red on the offending pane only. **Awaiting PM review at the Wave 1 review step; three items —
  candidate B sets FOUR lines at 320px with a lone `WITH` orphan against §4.1's stated three,
  `styles/tokens.css` still carries the pre-amendment `--text-display` floor, and REQ-008: the
  independent audit HANGS and cannot exit zero.**



