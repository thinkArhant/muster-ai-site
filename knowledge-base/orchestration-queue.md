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

### §1's formation: eight roles, nine seats. Which is it?

**Non-halting — answer at Gate A.** Two read-only founder sources disagree and neither can be edited.
`product-spec-seed.md` line 58 says *"the **eight named roles as labels** on the concept visual (PM
command hub + bus-bar formation)"* — PM is one of the eight. Line 224 and `brand-guidelines.md` say
*"the roster as a formation (**PM hub + eight plates** on a bus-bar)"* — one hub plus eight plates is
nine seats for eight roles.

**PM recommendation**: the hub is PM and the bus-bar carries the **seven specialists**. That reads
truest to what Muster actually is — PM coordinates, specialists execute — and it is the only reading
where no role appears twice. The alternative worth considering is hub = the human operator, eight
plates = the eight AI roles, which matches the page's "one person plus a governed AI team" thesis but
contradicts the seed's literal words "PM command hub."

**Not blocking**: UI/UX specifies the formation against the recommendation and states which reading it
built; if the founder picks the other at Gate A it is a label change, not a redesign.

**The eight role names** are settled and need no ruling — PM · Developer · UI/UX · QA · Content ·
Marketing · Legal · Research. They were enumerated nowhere in the knowledge-base; they now live in
`copy-rules.md` → scope table.

<!-- Resolved 2026-07-26 — Reading column: option A, `64ch` ships as the CSS value. See DEC-023. -->
<!-- Resolved 2026-07-26 — Brand mark: header lockup is pennant + `MUSTER_` with a static underscore; five section separators take the pennant; icon seats as supplied; never on a pole. See DEC-031. -->
<!-- Resolved 2026-07-26 — Gate model: two founder gates for Sprint 2, Gate A rendered. See DEC-033. -->
<!-- Resolved 2026-07-26 — The harness's `no http(s) URL in any shipped file` check is AMENDED, never deleted: an inert href/text URL is permitted, a fetching reference (src, @import, url(), link, script) stays banned. See DEC-034. -->

## Next Step
<!-- The single next agent invocation. Copy the ENTIRE code block (including `Role: <agent>` at the top) and paste as one message in Claude Code. -->
<!-- Autonomous hard-block signal: PM sets `Role: halt` here (and records the question in `## Founder Decisions`) when it has assessed a block as needing a founder answer. Specialists never set `Role: halt` themselves. The autonomous loop stops on `Role: halt`. Sprint completion is detected by the ABSENCE of a fenced code block under Next Step. A block that has a fence but no `Role:` line defaults to `pm`. -->

### 2026-07-26 PM: Review Wave 1 and build the Gate A packet

```
Role: pm
Model: claude-opus-5

**Task:** Review all six Wave 1 handoffs, run the mechanical copy checks, then assemble the Gate A
packet.

**Read REQ-008 before you plan your run.** `qa-independent-audit.mjs` **hangs** — two clean-tree runs
stalled at the same point (the 375 × 553 mobile chain, right after `qa-s02-mobile-375.png`) and never
returned. It is blocked, not slow: the Node process idles at 0% while its Chrome child spins at ~105%,
and `tests/lib/cdp.mjs`'s `send()` has no timeout, so a CDP reply that never arrives hangs forever.
`bash scripts/test.sh` is green on the same tree. Your criterion below — *"confirm the audit exits
zero"* — cannot be met until this is repaired, and running it cold costs 20 minutes of silence. Rule how
it gets fixed and by whom; REQ-008 states the two candidate directions and a recommendation.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-018, HO-019, HO-020, HO-021, HO-022, HO-023, HO-024, HO-025;
  REQ-006, REQ-007, REQ-008
- Every Wave 1 spec and copy file
- `samples/gate-a.html` — the rendered sample, with its measured report already in it
- `knowledge-base/agent-skills/content/copy-rules.md`
- `muster/team/pm/skills/generic/deliverable-review.md`
- `muster/team/qa/skills/generic/verification-discipline.md`

**Deliverable:** review verdicts on HO-018 through HO-025 in `knowledge-base/agent-requests.md`, and the
Gate A packet written into `knowledge-base/wave-review.md`.

**Run the machine checks BEFORE the packet exists, so the founder never spends attention on them.**
R4, R5, R6, R10 and R12 are grep-able across all five copy files: no `muster.build`, no cross-scope
aggregate, scope labels present beside their values, THIS SITE dashed, no rounded numbers, no banned
adjective. Attach the results as already-green evidence.

**Acceptance criteria:**
- **Re-derive, don't re-read.** Recount every word count against Content's own stated budgets; recompute
  every contrast pair; check §1's element inventory against the seed line by line
- **The headline's accessible name is the likeliest defect.** Read the computed names the sample
  reports; do not accept "verified" as evidence
- **Rule on the two open items HO-025 raises**: (a) candidate B sets **four** lines at 320px with a lone
  `WITH` on line 2, against `section-01-hero.md` §4.1's stated three — the spec's figure is wrong and the
  orphan is a real composition wart the founder should judge at the gate; (b) `styles/tokens.css` still
  carries the pre-amendment `--text-display` floor while the sample renders the amended one, so decide
  whether the token lands now or with §1
- Confirm the spacing system preserves the 12px equality and the 37-column floor, and that its
  assertions would actually **fail** if violated — an assertion that cannot fail is the
  blind-by-construction failure in a new place
- Confirm `qa-independent-audit.mjs` exits zero, not just `scripts/test.sh` — **see REQ-008 first**
- Verify §4's copy was tightened, not rewritten, against Content's stated before/after counts
- **Gate A packet**: one batch judged in a single sitting — rendered headlines with your recommendation,
  the §4 spec-sheet, all five sections' copy, and the formation question from Founder Decisions. Human
  judgment only; machine results attached as already-green
- Settle everything the Decision Autonomy Matrix lets you settle. Only genuine taste reaches the packet

**On completion:** Write the packet into `wave-review.md`, re-based for Gate A with prior verdicts
preserved. **Sweep the reviewed handoffs to Resolved** — `muster-requests-lint.sh` has been red since
before HO-025 (714 lines against a 300 budget, now 860) because Wave 1 batches six handoffs against one
review, and this is the review. Run the Pre-Handoff Self-Review Checklist. Promote the gate by writing
the Gate A block into `## Next Step`.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-26 Gate A — founder review: copy and rendered samples

```
Role: halt

**Gate:** All five sections' copy, plus rendered §1 headline candidates and one real §4 spec-sheet.

Batched by design — judge everything needing taste in one sitting and return one list. It sits before
any section is built, because copy is a build input and reviewing it afterwards is how rework happens.

**What needs your word:**
1. **Pick the §1 headline** from the rendered candidates.
2. **Judge the §4 spec-sheet rendering** — the second design centerpiece, as a real artifact.
3. **Read all five sections' copy** and return findings as one list.
4. **Rule on §1's formation** — see `## Founder Decisions`: eight roles, nine seats.

**Read:** `knowledge-base/wave-review.md` and write your verdict in its `## Verdict` section.

**Resume:** write your verdict, then run `muster/scripts/muster-sprint-resume.sh` from inside the sprint
worktree. Resume spawns a PM that turns your findings into fix steps — that is how the list gets
consumed, so use `resume` rather than re-running the driver.
```

### 2026-07-26 Developer (web): §1 and §6

```
Role: developer
Model: claude-opus-5

**Task:** Build §1 and §6. They pair because both carry the `curl` and the `VERIFY ⎘` chip.

**Inputs:**
- `knowledge-base/wave-review.md` — **the Gate A verdict, which carries the founder's headline choice**
- `knowledge-base/design-specs/web/section-01-hero.md`, `section-01-copy.md`, `section-06-copy.md`
- `knowledge-base/agent-context/developer.md`
- `tests/verify-shell.mjs`

**RULING YOU NEED BEFORE YOU START (DEC-034).** `verify-shell.mjs:533` fails any shipped file containing
an `http(s)` URL. §6 must ship the GitHub `curl` URL and one GitHub link, so this check **will** go red.
**Amend it, never delete it.** The distinction that matters is A-004's actual claim — what the page
*requests at runtime*:
- **Permitted**: a URL as inert text, or as an `href` the reader clicks. Neither fetches anything.
- **Still banned, and the check must still catch these**: `src`, `@import`, `url()`, `<link>`,
  `<script src>`, or any attribute the browser resolves without user action.
Narrow the check to fetching references. Weakening it to a blanket allow removes the mechanical guard on
the page's most load-bearing published claim.

**The line number above is stale** — the `no http(s) URL in any shipped file` check is at
**`verify-shell.mjs:660`**, and the shipped-set glob it keys on is at **`:650`** (both moved when the
shell step re-based the harness). The ruling is unaffected; only the coordinate is.

**Deliverable:** `index.html` (§1 and §6), `styles/`, `scripts/` as needed, amended
`tests/verify-shell.mjs`; HO-026.

**Acceptance criteria:**
- The founder's chosen headline, with the accessible name the spec defines — **verify the computed name
  via `Accessibility.getFullAXTree`** (`tests/lib/cdp.mjs` exposes a raw CDP `call`), not by assertion
- The measured line visible without scrolling, against the spec's stated pixel budget
- Dual readout with THIS SITE dashed and scope-labelled; the eight named roles on the formation, built
  to whichever reading the founder ruled at Gate A; the §1 terminal stream per spec
- **Decide the count-up cells' `aria-live` posture** and re-verify the engine against real page cells
  rather than the fixture — `pre-launch-checklist.md` says this sprint is when that becomes decidable
- §6: the exact `curl` string, `cd my-product && claude`, one GitHub link
- The `VERIFY ⎘` chip wired to `VERIFY.md` at repo root — **and write that file** (a short, honest
  index of what a reader can check and where). It is a hard launch blocker and the chip 404s without it
- Motion budget closed at three plus the cursor; reduced-motion complete
- `bash scripts/test.sh` green with the amended check, and `qa-independent-audit.mjs` exits zero
- Cross-engine WebKit and Blink before filing

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-026 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Developer (web): §3 and §4

```
Role: developer
Model: claude-opus-5

**Task:** Build §3 and §4. §4 is the spec-sheet rendering the founder approved at Gate A.

**Inputs:**
- `knowledge-base/wave-review.md` — the Gate A verdict on the §4 sample
- `knowledge-base/design-specs/web/section-04-decisions.md`, `section-03-copy.md`, `section-04-copy.md`
- `samples/gate-a.html` — the approved spec-sheet, as the reference for what was signed off

**Deliverable:** `index.html` (§3 and §4), `styles/` as needed; HO-027.

**Acceptance criteria:**
- §4's four spec-sheets render as approved at Gate A — divergence from the judged sample is a defect
- Title sentence, category, and the four rows all present; the no-date stamp case handled per spec
- "Strongest first" is the seed's order and does not change
- §3's prose in the reading column at `64ch` (DEC-023)
- Both themes; contrast verified; cross-engine; `scripts/test.sh` green and the audit exits zero

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-027 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Developer (web): §5

```
Role: developer
Model: claude-opus-5

**Task:** Build §5 — shipped with Muster.

**Inputs:**
- `knowledge-base/design-specs/web/section-05-copy.md` with its PM review
- `knowledge-base/design-specs/web/page-shell.md` §8 — the readout-cell motif

**Deliverable:** `index.html` (§5), `styles/` as needed; HO-028.

**Acceptance criteria:**
- Bodh, the provenance line, and this site as readout cards using the shell motif
- THIS SITE dashed; scope labels present beside their values
- Count-up is motion element 3, already in budget — same `aria-live` posture decided for §1
- Both themes; cross-engine; `scripts/test.sh` green and the audit exits zero

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-028 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
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
- `scripts/test.sh` green and the audit exits zero; cross-engine before filing

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-029 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 QA (web): Full-page sweep

```
Role: qa
Model: claude-opus-5

**Task:** Validate the content-complete page end to end. One sweep, not one per section.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-024 through HO-029
- Every section spec and copy file — derive scope from the specs directly, so a dev-charter omission does
  not also blind QA
- `knowledge-base/bodh-sprint4-corpus.md` — read-only fidelity baseline

**Deliverable:** HO-030 in `agent-requests.md` — per-criterion pass/fail with evidence.

**Acceptance criteria:**
- Cross-engine parity on WebKit **and** Blink, with evidence per engine; state plainly what remains
  Blink-only
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
- Copy rules as a text matrix across all sections: no `muster.build`, no cross-scope aggregates, scope
  labels present, THIS SITE dashed

**If a check fails:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step
naming the failing check, and file HO-030 with what you found.

**On completion:** File HO-030 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 PM: Review the build and assemble the Gate B packet

```
Role: pm
Model: claude-opus-5

**Task:** Review Wave 2, then build the Gate B packet.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-024 through HO-030
- Every section spec, and the Gate A verdict in `knowledge-base/wave-review.md`

**Deliverable:** review verdicts on HO-024 through HO-030 in `knowledge-base/agent-requests.md`, and the
Gate B packet written into `knowledge-base/wave-review.md`.

**Acceptance criteria:**
- **Re-run both harnesses yourself.** A summary is not evidence
- Confirm §4 as built matches the sample approved at Gate A
- Confirm every relationship assertion exists **and would fail if violated**; confirm QA actually planted
  a fetching reference and saw it go red
- **Look at renders of the states under test** — including a key-beat frame for the tick, which is the
  exact miss that cost Sprint 1 a round
- Confirm `VERIFY.md` exists and the curl was really run
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
machine can prove it.

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

- 2026-07-26 — Step: UI/UX §1 hero design (HO-020). The verdict fits the fold measured (measured-line
  bottom 461.8px at 375×553, 91.2px clear), all four headline candidates' announced strings read from
  the AX tree with B's struck phrase absent, the display floor amended to 1.75rem after the shipped
  floor measurably overflowed 320px (DEC-038), the hero terminal ruled as §2's component streaming all
  twelve lines once with no loop, formation built hub-is-PM. 13 assertions, 4 harness re-base sites.
  **Awaiting PM review at the Wave 1 review step.**

- 2026-07-26 — Step: UI/UX terminal spacing system and brand seats (HO-019). The terminal's left edge is
  five named relationships with one assertion each and the key-beat mark out of the text flow, so the
  indent can no longer move it — 12px equality held at 12px, 37-column floor held at 360px with 2.4px
  spare, no column lost at 360/375/390/`--bp-wide`, measured before and after at eight viewports.
  Pennant seats at 6×9, the underscore drawn rather than typed, header accessible name ruled `MUSTER`,
  footer lockup ruled out (DEC-036, DEC-037). Ten harness sites listed for re-base by file and line.
  **Awaiting PM review at the Wave 1 review step; REQ-006 asks PM to reconcile `brand-guidelines.md` §4.**

- 2026-07-26 — Step: Content §1 and §3 copy (HO-018). Four headline candidates with announced strings
  (B, the repaired founder edit-mark, recommended), §3 with the CrewAI/AutoGen clause ruled named and
  its cut pre-authored, and the SP3 lever pulled — 19 words, measured 5 lines at 320px, both harnesses
  green (DEC-035). Awaiting PM review at the Wave 1 review step.

- 2026-07-26 — **Sprint 1 closed.** Shell + §2 delivered and accepted at gate 3 with one carried defect
  (the key-beat tick collides with the timestamp; folded into Sprint 2's spacing system per DEC-032).
  ~$97 across three founder gates. Archived in `sprint-archive.md`.
- 2026-07-26 — **Sprint 2 planned, then stress-tested and resequenced** (DEC-033, DEC-034). Three
  blocking sequence defects found by adversarial audit and fixed before the run: copy now precedes the
  hero design, the shell precedes the Gate A sample, and the `http(s)` harness collision is ruled rather
  than discovered. `develop` merged; pennant artwork cascaded (DEC-031).
