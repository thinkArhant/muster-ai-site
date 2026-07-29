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

### 2026-07-28 UI/UX: Gate A fix round — the sparse hero and §4's one-screen layout

```
Role: ui-ux
Model: claude-fable-5

**Task:** Recompose §1 to the sparse-hero ruling and rule §4's layout against the rewritten copy.
The founder chose the composition from a rendered comparison and **explicitly deferred the
formation's visual refinement to this step** — the design pass is the point, not a formality.

**Inputs:**
- `knowledge-base/wave-review.md` — Gate A verdict: item 3's §1 block and the fix-round inventory
- `knowledge-base/decision-log.md` — DEC-043 through DEC-049
- `samples/s01-sparse-hero.html` — Option A as the founder judged it. Composition is settled; its
  formation render is a **placeholder to improve on**, never a build target
- `knowledge-base/design-specs/web/section-01-hero.md` (to revise) · `section-04-decisions.md`
  (to amend) · `page-shell.md` · `knowledge-base/brand-guidelines.md`
- The four copy files as revised by HO-031 — §4's measured lengths are this step's layout input

**Deliverable:** revised `section-01-hero.md`; amended `section-04-decisions.md`; a `page-shell.md`
amendment homing the §3 kicker wrap rule; HO-032.

**Acceptance criteria:**
- **§1 above the fold**: eyebrow · headline · formation + caption, nothing else (DEC-045). No Bodh
  anywhere in the section (DEC-046): no measured line, no BODH readout row, no hero terminal. Below
  the fold: the THIS SITE remnant (dashes · `measured at launch` · `VERIFY ⎘`) and the curl — rule
  the remnant's form (a one-row readout, or something smaller) and state why.
- **The formation is the section's centerpiece and receives the real design pass** — hub `PM`
  (accent border), bus-bar with registration marks, seven specialist plates, caption
  `8 AI AGENTS · 1 OPERATOR`; vertical ladder below `--bp-wide`. Make it worth the promotion.
- **New fold budget, measured** — the sparse stack at 375 × 553 and the 320 floor as rendered
  figures, not derivations. Name the phone reality honestly: the ladder cuts at the fold and the
  first number arrives on scroll — accepted by the founder at the gate (DEC-045).
- **§10 scope adjacency is deleted, not rewritten** — no wave/whole-product adjacency exists in §1
  any more (DEC-046). The motion budget is re-stated: the hero terminal's seat is gone, and the
  count-up + `aria-live` posture moves to §5's cards.
- **§4 layout**: four sheets, one screen at desktop (DEC-043 amendment B), decided against
  HO-031's measured lengths. Horizontal scroll between cards is permitted (DEC-025 barred in-line
  text dragging, not card paging) but costs discoverability — judge it and state the measured
  height either way. **Rule §4's phone behaviour explicitly** — stacked, paged, or otherwise —
  with its measured cost; Gate B judges desktop AND phone, and an unruled phone layout is a
  Gate B bounce waiting to happen. Remove the no-date stamp special case: all four stamps carry
  dates (DEC-044).
- **The §3 kicker wrap rule homed in `page-shell.md`**: each kicker sentence an
  unbreakable-preferred unit (inline-block span, the headline's mechanism family), behaviour as
  measured in the verdict — sentence-boundary break at 375px, internal wrap without overflow at 320.
- One harness assertion named per relationship the new fold budget depends on (DEC-032 practice).

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-032 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-26 Developer (web): §1 and §6

```
Role: developer
Model: claude-opus-5

**Task:** Build §1 and §6. They pair because both carry the `curl` and the `VERIFY ⎘` chip. §1 is
the **sparse hero** ruled at Gate A (DEC-045/046): eyebrow · headline · formation above the fold,
THIS SITE remnant + curl below it — no measured line, no readout BODH row, no hero terminal.

**Inputs:**
- `knowledge-base/design-specs/web/section-01-hero.md` **as revised by HO-032** and
  `section-01-copy.md` **as revised by HO-031**, plus `section-06-copy.md`
- `knowledge-base/wave-review.md` — the Gate A verdict, for rulings the specs cite
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
shell step re-based the harness). Both coordinates were re-confirmed at the Wave 1 review. The ruling is
unaffected; only the coordinate was.

**TWO THINGS RULED AT WAVE 1 REVIEW THAT LAND IN THIS STEP (DEC-042).**

1. **Give `tests/lib/cdp.mjs`'s `send()` a timeout.** It has none (`:115–123`), so a CDP reply that never
   arrives blocks the process forever — which is why `qa-independent-audit.mjs` currently *hangs* rather
   than fails, costing anyone who runs it twenty minutes of silence. Reject the pending promise with a
   message naming the method and the elapsed time. You are fixing the transport, not the audit's
   assertions; the renderer diagnosis is QA's and is scheduled at the sweep. **After it lands, run the
   audit**: if it still stalls it now goes red with a method on it, and you report that as a result
   rather than losing the step to it.
2. **Land the amended `--text-display` floor in `styles/tokens.css`** — `clamp(1.75rem, 6.5vw, 4.25rem)`,
   per `page-shell.md` §3 and `section-01-hero.md` §14. It was deliberately held back from the Gate A
   sample step because **no harness asserts the clamp at all** (verified by grep). So it lands **with an
   assertion**, not alone: an unguarded token in the shipped set is the drift this project exists to
   prevent. Assert the relationship the floor exists for — the headline sets without overflow at 320px —
   not the literal string `1.75rem`.

**Deliverable:** `index.html` (§1 and §6), `styles/`, `scripts/` as needed, amended
`tests/verify-shell.mjs`; HO-026.

**Acceptance criteria:**
- The settled headline — struck `a human` (`aria-hidden`), rust `an AI`, plain `team.` — with the
  announced string `Ship a product with an AI team.`: **verify the computed name via
  `Accessibility.getFullAXTree`** (`tests/lib/cdp.mjs` exposes a raw CDP `call`), not by assertion
- The sparse stack per the revised hero spec, against its stated fold budget — and **nothing beyond
  its inventory**: no measured line, no BODH value, no terminal in §1 (DEC-046). The formation built
  hub = `PM`, seven specialist plates, to the revised spec's design
- The THIS SITE remnant in the form HO-032 ruled, dashes inert and scope-labelled
- §6: the exact `curl` string, `cd my-product && claude`, one GitHub link
- The `VERIFY ⎘` chip wired to `VERIFY.md` at repo root — **and write that file** (a short, honest
  index of what a reader can check and where). It is a hard launch blocker and the chip 404s without it
- Motion budget as the revised hero spec re-states it (the hero terminal's seat is gone);
  reduced-motion complete. The count-up `aria-live` decision is **not** this step's — it moved to §5
  with the page's only counting cells
- `bash scripts/test.sh` green with the amended check, fold assertions re-based to the sparse stack.
  The audit must **complete** — exit zero, or fail named within its new timeout. A hang is a
  failure, not a pending result
- Cross-engine WebKit and Blink before filing

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-026 in `agent-requests.md` — under this exact ID; the Gate A fix round
already took HO-031/032, so higher IDs in the ledger are not an error. Run the Pre-Handoff
Self-Review Checklist.
```

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

