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

### 2026-07-26 Developer (web): §3 and §4

```
Role: developer
Model: claude-opus-5

**Task:** Build §3 and §4. §4's spec-sheet **treatment** (structure, rows, the no-rust-text emphasis
system) was approved at Gate A; its **copy** was re-selected (DEC-044) and its **layout** re-ruled
(DEC-043: four sheets, one screen) — build the approved treatment with the new copy in the layout
HO-032 ruled.

**Inputs:**
- `knowledge-base/design-specs/web/section-04-decisions.md` **as amended by HO-032**,
  `section-03-copy.md` and `section-04-copy.md` **as revised by HO-031**
- `knowledge-base/design-specs/web/page-shell.md` — carries the §3 kicker wrap rule after HO-032
- `samples/gate-a.html` — reference for the approved sheet *treatment* only; its decision-1 copy is
  superseded by DEC-044

**Deliverable:** `index.html` (§3 and §4), `styles/` as needed; HO-027.

**Acceptance criteria:**
- §4's four sheets carry DEC-044's decisions in DEC-044's order, in the treatment approved at
  Gate A — divergence from the treatment or from HO-032's one-screen layout is a defect
- Decision / Problem / Trade-off / Mechanism rows all present; all four stamps carry dates (the
  no-date case no longer exists — DEC-044)
- §3: the kicker wraps only at the sentence boundary per the page-shell rule, **asserted**; the
  paragraph byte-identical to the closed 90/90 string; prose at `64ch` (DEC-023)
- Both themes; contrast verified; cross-engine; `scripts/test.sh` green and the audit **completes**
  (zero, or named-red within its timeout — never a hang; DEC-042)

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-027 in `agent-requests.md` — under this exact ID; higher IDs in the
ledger are not an error. Run the Pre-Handoff Self-Review Checklist.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-26 Developer (web): §5

```
Role: developer
Model: claude-opus-5

**Task:** Build §5 — shipped with Muster. After Gate A, §5 carries the page's entire whole-product
number set: it is the primary site for `9.3 h` and `$147` (DEC-048), and it owns the page's only
counting cells.

**Inputs:**
- `knowledge-base/design-specs/web/section-05-copy.md` **as revised by HO-031** (four keys per card,
  including `COST · API LIST`)
- `knowledge-base/design-specs/web/page-shell.md` §8 — the readout-cell motif

**Deliverable:** `index.html` (§5), `styles/` as needed; HO-028.

**Acceptance criteria:**
- Three prose lines and two four-key cards per the revised copy file; THIS SITE dashed with
  `measured at launch`; scope labels beside their values; dashes never animate
- **Decide the count-up cells' `aria-live` posture here** and verify the engine against real page
  cells, not the fixture — this moved from the §1 step when the hero lost its readout
  (`pre-launch-checklist.md` names this sprint as when it becomes decidable)
- The `9.3 h` / `$147` byte-equality assertions re-base onto §5 as the primary site (they formerly
  anchored on §1)
- Both themes; cross-engine; `scripts/test.sh` green and the audit **completes** (zero, or named-red
  within its timeout — never a hang; DEC-042)

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-028 in `agent-requests.md` — under this exact ID; higher IDs in the
ledger are not an error. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Developer (web): Scroll-snap

```
Role: developer
Model: claude-opus-5

**Task:** Apply scroll-snap across the page. Last build step deliberately — it needs sections to snap
between, and it is the likeliest thing to be rejected at Gate B.

**Inputs:**
- `knowledge-base/design-specs/web/page-shell.md` — the scroll-snap spec (HO-022) with its PM review

**Deliverable:** `styles/` (and `index.html` only if the spec requires a container change); HO-029.

**Acceptance criteria:**
- **Proximity snapping, never JavaScript scroll-jacking**
- `scroll-padding-block-start` set against the 48px sticky bar so section headings are not clipped
- Keyboard paging, find-in-page and 200% zoom each **asserted in the harness**, not claimed
- **§2 exempt** per spec — verify its playback, visibility gate and phone budget are untouched by the
  snap container
- Reduced-motion behaviour exactly as the spec rules it
- `scripts/test.sh` green and the audit **completes** (DEC-042). **Cross-engine here is Blink-measured
  plus a MANUAL Safari pass, recorded as manual** — `qlmanage` cannot scroll, so there is no mechanical
  WebKit result for a scroll behaviour and none may be reported as one (REQ-007, DEC-042)

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-029 in `agent-requests.md` — under this exact ID; higher IDs in the
ledger are not an error. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-28 QA (web): The independent audit exits zero

```
Role: qa
Model: claude-opus-5

**Task:** Repair `tests/qa-independent-audit.mjs` so it exits zero. This is deliberately its own
step (DEC-050): it is an unbounded renderer bisect — mechanical debugging, no taste — and folding
it into the full-page sweep risks a context-starved sweep doing rushed reads, the exact failure
"verify against the state under test" exists to prevent.

**Inputs:**
- `tests/qa-independent-audit.mjs` · `tests/lib/cdp.mjs` (its `send()` timeout landed with the
  §1+§6 step, HO-026 — so the stall now fails named instead of hanging)
- `scripts/replay.js` — the leading, unproven hypothesis is the audit's injected 250 ms `SAMPLER`
  interval competing with the replay under the 375 × 553 mobile chain. **Bisect it, do not assume
  it.**
- `knowledge-base/agent-requests.md` — HO-026's report of what the named failure now says

**Deliverable:** the audit exits zero on the built page, with the cause named and the fix scoped to
the audit's own machinery (an audit repair must never change page behaviour to pass); HO-033.

**Acceptance criteria:**
- `node tests/qa-independent-audit.mjs` exits zero, run twice consecutively (a flaky pass is not a
  pass)
- The cause is stated with evidence, not inferred; if the fix touched any criterion, each touched
  criterion is re-justified
- `bash scripts/test.sh` still green — the repair changed no shipped file's behaviour

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-033 in `agent-requests.md` (file under this exact ID — the fix round
already took HO-031/032, so higher IDs existing in the ledger is not an error). Run the Pre-Handoff
Self-Review Checklist.
```

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

- 2026-07-26 — Step: Developer shell spacing system and brand mark (HO-024). The Gate 3 tick collision is
  closed by taking the mark out of the text flow — R1 holds at 12.00px in both layers, R2 measures 3.91px
  on L4 and L9 where it measured 0, the 37-column floor holds at 360px, and the hardcoded `12` is gone
  from all four accent-pair sites. Pennant seated at 6×9 in the header, all five separators and the
  favicon via `clip-path`, adding no request; the underscore is drawn and static and the header still
  announces exactly `MUSTER`. §2 byte-clean and unchanged. Both harnesses green, both engines.
  **Awaiting PM review at the Wave 1 review step; OBS-005 bears on how REQ-007 is settled.**

- 2026-07-26 — Step: Content §4, §5 and §6 copy (HO-023). §4 tightened by **five words of 420** with a
  word-level seed-vs-shipped diff as the evidence and sentence count unchanged at 30 — titles and stamps
  untouched, so §4's measured line counts hold exactly; §5 ships two readout cards plus three prose lines
  (the provenance line is prose, never a cell) and carries operator attention and commit-days, the two
  measured figures the page otherwise never shows; §6's "Nothing else" stated as an inventory, `curl`
  byte-equal across four files by string equality (DEC-041). **Awaiting PM review at the Wave 1 review
  step; three review items — §4's draft runs 7–8 sentences against the seed's own "~4–6", decision 4's
  stamp must never gain a date, and §5's `ACTIVE BUILD 9.3 h` repeat of §1 has a pre-authored fallback.**

- 2026-07-26 — Step: UI/UX scroll-snap spec (HO-022). One idea per screen as a scrolling behaviour:
  proximity snap on the document scroller, `--scroll-pad` at bar + one rhythm so a section's rule never
  abuts the bar's (32.2px / 31.67px measured clear), §2 exempt by modifier and **proven unmoved** across
  20 sampled rest positions where its playback core is ≥90% visible, snapping OFF under reduced motion
  (DEC-040). Keyboard verified with real key events — the programmatic form lies. 11 assertions, no
  harness re-base forced, `scripts/test.sh` green. **Awaiting PM review at the Wave 1 review step;
  REQ-007 asks PM to rule the WebKit method — `qlmanage` cannot scroll, so two downstream steps'
  cross-engine criteria are unsatisfiable as written.**

- 2026-07-26 — Step: UI/UX §4 spec-sheet rendering (HO-021). Buildable from itself with rendered
  measurements: value column is the reading column (64ch prose, 903.31px card), zero rust text with
  the 12px-inset mechanism mark as the accent idiom's third seat, the stamp a single text slot that
  absorbs the no-date case with nothing invented, founder voice in sans against mono chrome (DEC-039).
  12 assertions, no harness re-base forced. **Awaiting PM review at the Wave 1 review step.**

