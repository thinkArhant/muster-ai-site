# Orchestration Queue
<!-- This file tells the founder which agent to invoke next. PM populates at sprint planning. Agents update on session completion. -->
<!-- Protocol: See muster/system-guide.md → Invocation Patterns and Agent Communication Protocol. -->

## Prompt Standard

<!-- Authoring or editing a step? The format templates + Role:-marker rules live in `muster/team/pm/skills/generic/sprint-planning.md` → "Queue Step Format". The live steps below already demonstrate the format, and `muster-queue-lint.sh` enforces the structure. -->

## Execution Mode (Sprint 2)

**Autonomous throughout, two founder gates only** (DEC-033). Gate A after Wave 1, Gate B after Wave 2.
Nothing else reaches the founder: spec conformance, contrast, cross-engine parity, zero network
requests, reduced-motion completeness and corpus fidelity are all machine-verifiable (DEC-009).

**Gate A is a rendered gate.** Wave 1 ends with a Developer step that builds the §1 headline candidates
and one real §4 spec-sheet as a static sample, because a typographic headline and a spec-sheet layout
cannot be judged as text in a file.

**Wave 2's order is a dependency, not a preference.** The shell step's relationship assertions must land
before any section builds, so every later step's own `scripts/test.sh` run inherits them. Scroll-snap
builds last — it cannot be validated before sections exist to snap between.

**Assert relationships, not values** (DEC-032). Any step changing spacing, insets or rhythm adds a
harness assertion for the relationship it preserves, not for the number it sets. Three Sprint-1 rounds
each satisfied a named value, disturbed an adjacent relationship, and passed every harness.

**Verify against the state under test.** A render used as evidence must show the condition being
claimed. PM confirmed a Sprint-1 fix against a frame that could not display the defect.

**Telemetry practice — agents do not measure this build.** Never run `muster/scripts/muster-meter.py`.
THIS SITE metrics remain dashes until the founder supplies a snapshot (seed rule 4, DEC-005).

**Founder-authored source is read-only**, now including `knowledge-base/design-specs/brand/*`.

## Founder Decisions
<!-- Agents add questions requiring founder input here. -->
<!-- PM monitoring: scan this section at every session start. Entries older than 24h without founder response are flagged to the founder immediately. -->
<!-- Format: - [DATE] [Agent]: [Question] -->
<!-- Autonomous runs: this section is non-halting on its own — observation and scope escalations park here while the loop keeps running. PM is the sole party that summons the founder: only PM (after assessing a block per the Decision Autonomy Matrix) writes the question here AND sets the Next Step block's `Role:` to `halt` (see below). A specialist that hits a block routes it to a `Role: pm` assessment step instead of halting. There is no checkbox convention. -->

*None open.*

<!-- Resolved 2026-07-26 — Reading column: option A, `64ch` ships as the CSS value. The audit's 45–75-character band check retired to a reported measurement. See DEC-023. -->
<!-- Resolved 2026-07-26 — Brand mark: header lockup is pennant + `MUSTER_` with a static underscore; five section separators take the pennant; icon seats as supplied; never on a pole. See DEC-031. -->
<!-- Resolved 2026-07-26 — Gate model: two founder gates for Sprint 2, Gate A rendered. See DEC-033. -->

## Next Step
<!-- The single next agent invocation. Copy the ENTIRE code block (including `Role: <agent>` at the top) and paste as one message in Claude Code. -->
<!-- Autonomous hard-block signal: PM sets `Role: halt` here (and records the question in `## Founder Decisions`) when it has assessed a block as needing a founder answer. Specialists never set `Role: halt` themselves — a blocked specialist re-points Next Step to a `Role: pm` assessment step and PM decides handle-vs-escalate. The autonomous loop stops on `Role: halt`. Sprint completion is detected by the ABSENCE of a fenced code block under Next Step. A block that has a fence but no `Role:` line defaults to `pm`. -->

### 2026-07-26 UI/UX (web): §1 hero design

```
Role: ui-ux
Model: claude-fable-5

**Task:** Design §1 — the page's five-second verdict. This is the section a skeptical cold reader
decides on, and it carries more distinct elements than any other.

**Inputs:**
- `knowledge-base/product-spec-seed.md` §1 — the complete element inventory. Implement all of it
- `knowledge-base/design-specs/web/page-shell.md` — the token system you authored; inherit, do not re-derive
- `knowledge-base/brand-guidelines.md` §4 — the pennant and the header lockup
- `knowledge-base/agent-context/ui-ux.md` — your Current Tasks

**Deliverable:** `knowledge-base/design-specs/web/section-01-hero.md`; HO-018.

**Acceptance criteria:**
- Every §1 element specified: the measured line **visible without scrolling**; the eight named roles as
  labels on the PM-hub + bus-bar formation (this IS the roster — no separate section); one `curl`; the
  terminal streaming the real Sprint-4 log (previews §2); the dual build readout with THIS SITE dashed
  above BODH, scope-labelled; the `VERIFY ⎘` chip; the eyebrow facts
- **The headline's struck/accented treatment is yours to specify, including its accessible name.**
  Content supplies candidates; you specify how a struck word sets and how the whole headline is
  announced. Struck text is read aloud as ordinary text, so an unspecified treatment ships a headline
  that reads as gibberish to a screen reader. This is the single highest-risk detail in the section
- Rust is permitted on the headline at display size (DEC-017 ≥24px); no thirteenth palette value (A-006)
- The motion budget stays closed at three live elements plus the cursor — the §1 terminal stream and the
  count-up are two of the three that already exist, not new ones
- Reading measure per DEC-023: `64ch` is the CSS value and ships as-is

**On completion:** File HO-018 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist
(`muster/system-guide.md`) before filing — item 10 enforces queue + decision-log update.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-26 UI/UX (web): §4 spec-sheet rendering

```
Role: ui-ux
Model: claude-opus-5

**Task:** Design §4 — four founder decisions rendered as spec-sheets. The seed calls this the second
design centerpiece, and the founder judges a rendered sample of it at Gate A.

**Inputs:**
- `knowledge-base/product-spec-seed.md` §4 — the four decisions as locked draft, and the row structure
- `knowledge-base/design-specs/web/page-shell.md`
- `knowledge-base/agent-context/ui-ux.md`

**Deliverable:** `knowledge-base/design-specs/web/section-04-decisions.md`; HO-019.

**Acceptance criteria:**
- Decision / Problem / Trade-off / Mechanism as rows; strongest first; dates as small stamps
- **Buildable from itself.** A Developer builds one real spec-sheet from this spec for Gate A without
  asking you a question — that is the test of whether it is specified or merely described
- Reading measure per DEC-023; both themes first-class; contrast stated per token pair
- Insider terms (cascade lag, cold-start sufficiency) earn their meaning here, per the seed — say how
  that is rendered typographically if it needs a treatment

**On completion:** File HO-019 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 UI/UX (web): Terminal spacing system, brand seats, scroll-snap

```
Role: ui-ux
Model: claude-opus-5

**Task:** Three shell-level specs. The first closes a defect class; the other two are new surface.

**Inputs:**
- `knowledge-base/wave-review.md` — gate 3, finding F-G3 with its cause in the CSS
- `knowledge-base/decision-log.md` — DEC-031 (the pennant), DEC-032 (why this is a system, not a patch)
- `knowledge-base/design-specs/web/section-02-replay.md`, `page-shell.md` — your own deliverables
- `knowledge-base/brand-guidelines.md` §4, `knowledge-base/design-specs/brand/` — read-only artwork
- `styles/replay.css` — `.log` (~112), `.log__line` (~164), `.narration__entry` (~206)

**A — the terminal's left edge, as a system.** Three consecutive fix rounds each satisfied their stated
criterion and disturbed an adjacent relationship, because five relationships derive from two or three
shared CSS values. Name and measure all five: tick↔card, tick↔text, row↔row, entry↔entry, text↔wrap
edge.
- **The tick leaves the text flow.** Today it is `border-inline-start` on `.log__line`, and the hanging
  indent (`padding-inline-start: 1ch` with `text-indent: -1ch`) puts the first row at 0 from that
  border — so on a key beat the timestamp butts against the tick. Specify it as a positioned mark in
  the log's gutter so indentation and tick placement stop sharing a lever
- **One assertion per relationship**, specified for the harness. This is the deliverable that stops a
  fourth round

**B — the pennant seats** (DEC-031). Header lockup `pennant + MUSTER_` with a **static** rust underscore
(never blinks — the curl owns the only cursor). Five section separators take the pennant in place of
their squares. Sized **optically**: the pennant is ~1:1.5 portrait where the square is 1:1, so equal
width sets half again as tall. Drawn as `clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 81.79%, 0 100%)`
on the existing box — no inline SVG, no new request. Never on a pole.

**C — scroll-snap** (`page-shell.md`). The seed's *one idea per screen* as a mechanism.
- Proximity snapping, **never JavaScript scroll-jacking**. Keyboard paging, find-in-page and 200% zoom
  must all survive — QA asserts accessibility mechanically here
- **§2 is exempt**: its core already fills most of a phone viewport
- Reduced-motion path defined

**Deliverable:** amended `section-02-replay.md` and `page-shell.md`; `design-specs/web/brand-seats.md`;
HO-020.

**Acceptance criteria:**
- All five relationships named with measured values and one assertion each
- Tick decoupled from text indentation
- Pennant seats specified with optical sizing stated, not derived
- Scroll-snap constraints all addressed; say explicitly what happens at reduced motion
- The §2 phone budget still holds; restate it

**On completion:** File HO-020 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Content (web): §1 and §3 copy

```
Role: content
Model: claude-fable-5

**Task:** Write §1 and §3 — the headline that sets every expectation, and the argument that explains why
the thing works.

**Inputs:**
- `knowledge-base/product-spec-seed.md` §1 and §3
- `knowledge-base/agent-skills/content/copy-rules.md` — binding, all twelve rules
- `knowledge-base/bodh-sprint4-corpus.md` — read-only; every claim traces here
- `knowledge-base/agent-context/content.md`

**The §1 headline — options, a recommendation, and the reasoning.** The seed calls the anchor text
*"Ship a product. Without a team."* **available, not locked**, and says explicitly *"Content arranges
headline vs. subline."* So this is your call to make and defend.

**The founder's own direction is the incumbent to beat**, not one option among equals:
> *Ship a product with a ~~human~~ **AI agents** team* — "human" struck through, "AI agents" accented.

It is strong: it resolves the ambiguity visually rather than by spending words, and a strikethrough is
an **edit mark** — on a page about process and revision that is on-thesis rather than decorative. Four
things decide whether it lands:
1. **The article breaks as written** — "a human team" → "a AI agents team" does not parse. Strike the
   article with the adjective, or find better. Do not ship the founder's phrasing verbatim
2. **Screen readers** announce struck text as ordinary text. UI/UX specifies the treatment and the
   accessible name; write copy that survives being read aloud correctly
3. **The accent cannot be a new colour** (A-006). Rust on display-size text is available (DEC-017)
4. **Does it cost a beat of confusion?** The seed's §1 job is a message landing in five seconds. Say
   what you think and why

**§3** folds a CrewAI/AutoGen contrast into a clause: competitors optimize message-passing, Muster
optimizes what each agent reads. That is grounded in the founder's own survey, not a documented review.
If it needs external grounding, open a `needs-research` entry scoped to competitor positioning only —
do not assert it harder to cover the gap.

**Deliverable:** `knowledge-base/design-specs/web/section-01-copy.md` (headline candidates with your
recommendation, plus all §1 strings) and `section-03-copy.md`; HO-022.

**Acceptance criteria:**
- Headline: 3–4 candidates, one recommendation, the reasoning for each — the founder chooses at Gate A
- **R8**: the team is AI and says so; no unqualified "the Muster team"
- The measured line reads correctly and is scope-labelled: BODH's 9.3 h / $147 is whole-product, THIS
  SITE is dashes (rule 4, rule 5)
- Product voice — §1 and §3 are not the two first-person places (rule 7)
- Zero rounded numbers, zero adjectives-as-argument, "measured" never "proven"

**On completion:** File HO-022 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Content (web): §4, §5 and §6 copy

```
Role: content
Model: claude-opus-5

**Task:** Write §4, §5 and §6. Lighter than §1/§3 — §4 is founder-authored and §6 is one command.

**Inputs:**
- `knowledge-base/product-spec-seed.md` §4, §5, §6
- `knowledge-base/agent-skills/content/copy-rules.md`
- `knowledge-base/agent-context/content.md`

**§4 — the four decisions are locked draft.** Tighten only. Never inflate, never reorder the argument,
never add a fifth. Rule 7 permits first person here.

**§5 — Bodh, the provenance line, this site.** The provenance line is founder-supplied first person and
is one of only two places first person is allowed. The source app stays unnamed — no status, no
"coming soon". This site's readout is dashes until launch. No growing-list hype.

**§6 — one `curl`.** Ships the GitHub raw URL:
`curl -fsSL https://raw.githubusercontent.com/thinkArhant/muster-ai/main/scripts/setup-project.sh | bash -s my-product`
`muster.build` is fictional and must never appear (DEC-010, R12).

**Deliverable:** `section-04-copy.md`, `section-05-copy.md`, `section-06-copy.md`; HO-023.

**Acceptance criteria:**
- §4 tightened, not rewritten; every decision still ends in the mechanism it produced
- §5's provenance line preserved as founder-supplied; scope labels correct
- §6 carries the real URL, copy-paste-verifiable
- Every factual claim traces to the corpus or the seed; a claim neither supports is cut, not softened

**On completion:** File HO-023 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Developer (web): Gate A sample render

```
Role: developer
Model: claude-opus-5

**Task:** Build the static sample the founder judges at Gate A. Small step, high leverage: it converts
Gate A from imagining to looking.

**Inputs:**
- `knowledge-base/design-specs/web/section-01-copy.md` — the headline candidates (HO-022)
- `knowledge-base/design-specs/web/section-01-hero.md` — how the struck/accented treatment sets (HO-018)
- `knowledge-base/design-specs/web/section-04-decisions.md` — the spec-sheet spec (HO-019)
- `knowledge-base/design-specs/web/section-04-copy.md` — one real decision's copy (HO-023)
- `styles/` — the page's actual tokens

**Deliverable:** `samples/gate-a.html` plus whatever it needs; HO-024.

**Acceptance criteria:**
- Every headline candidate rendered **as it would actually set** — real tokens, real fonts, real sizes,
  both themes. Not an approximation and not a mockup
- One **real** §4 spec-sheet built from the spec and the real copy, so the founder judges the rendering
  and not a description of it
- Candidates labelled so the founder can name one in a verdict
- **This never ships.** It is a decision aid, like the reading-measure comparison. Keep it out of the
  page's build and out of the zero-request surface
- Include the accessible name for each struck headline, and state how each was tested

**On completion:** File HO-024 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 PM: Review Wave 1 and build the Gate A packet

```
Role: pm
Model: claude-opus-5

**Task:** Review all five Wave 1 deliverables, then assemble the Gate A packet.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-018 through HO-024
- All Wave 1 specs and copy files
- `muster/team/pm/skills/generic/deliverable-review.md`
- `muster/team/qa/skills/generic/verification-discipline.md`

**Acceptance criteria:**
- **Re-derive, don't re-read.** Recount every word budget; recompute every contrast pair; check the §1
  element inventory against the seed line by line rather than against the handoff's summary
- **The headline's accessible name is the thing most likely to be wrong.** Verify each candidate reads
  correctly aloud, not that the spec says it does
- Confirm the spacing system names all five relationships and that each has an assertion. A relationship
  without an assertion is the defect class reopening
- Confirm the sample render uses real tokens, and **look at the state under test** — a render that
  cannot display what it claims is not evidence (the Sprint-1 miss)
- Verify §4's copy was tightened, not rewritten, against the seed's locked draft
- **Gate A packet**: one batch the founder judges in a single sitting. Rendered headlines with your
  recommendation, the §4 spec-sheet, and all five sections' copy. Human-judgment residue only —
  machine-verified results attached as already-green evidence
- Anything you can settle under the Decision Autonomy Matrix, settle. The founder's time is the scarce
  resource — only genuine taste calls reach the packet

**On completion:** Write the packet into `wave-review.md`, re-based for Gate A with prior verdicts
preserved. Run the Pre-Handoff Self-Review Checklist. Promote the gate.
```

### 2026-07-26 Gate A — founder review: copy and rendered samples

```
Role: halt

**Gate:** All five sections' copy, plus rendered §1 headline candidates and one real §4 spec-sheet.

This is a batched gate by design — you judge everything needing taste in one sitting and return one
list. It sits before any section is built, because copy is a build input and reviewing it afterwards is
how rework happens.

**What needs your word:**
1. **Pick the §1 headline** from the rendered candidates.
2. **Judge the §4 spec-sheet rendering** — the seed's second design centerpiece, shown as a real
   artifact rather than a description.
3. **Read all five sections' copy** and return findings as one list.

**Read:** `knowledge-base/wave-review.md` and write your verdict in its `## Verdict` section.

**Resume:** write your verdict, then run `muster/scripts/muster-sprint-resume.sh` from inside the
sprint worktree.
```

### 2026-07-26 Developer (web): Shell — spacing system and brand mark

```
Role: developer
Model: claude-opus-5

**Task:** Implement the terminal spacing system and the pennant seats. **This step blocks every section
build** — its assertions are what later steps inherit.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-020 with its PM review
- `knowledge-base/design-specs/web/section-02-replay.md`, `page-shell.md`, `brand-seats.md`
- `knowledge-base/design-specs/brand/` — read-only artwork
- `knowledge-base/decision-log.md` — DEC-031, DEC-032

**Acceptance criteria:**
- All five left-edge relationships implemented, with **one `scripts/test.sh` assertion each**. Without
  the assertions this step is not done — they are the deliverable that stops a fourth patch round
- The gate-3 defect resolved: the key-beat tick no longer collides with the timestamp, at every viewport
- The tick is a positioned mark, not `border-inline-start` on the line — indentation and tick placement
  must stop sharing a lever
- Pennant in the header (`pennant + MUSTER_`, static underscore) and at all five section separators,
  via `clip-path`, sized per spec. Favicon data-URI swapped to the pennant
- **Zero new network requests.** No inline SVG in these seats — that is the point of the clip-path route
- §2's fidelity, 48.00 s schedule and phone budget all unchanged; prove it, do not assume it
- Cross-engine WebKit and Blink before filing

**On completion:** File HO-025 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Developer (web): §1 and §6

```
Role: developer
Model: claude-opus-5

**Task:** Build §1 and §6. They pair because both carry the `curl` and the `VERIFY ⎘` chip.

**Inputs:**
- `section-01-hero.md`, `section-01-copy.md`, `section-06-copy.md`, all with PM reviews and the
  founder's headline choice from Gate A
- `knowledge-base/agent-context/developer.md`

**Acceptance criteria:**
- The founder's chosen headline, with the accessible name the spec defines — verify it reads correctly
  aloud, do not assume the markup is enough
- The measured line visible without scrolling; dual readout with THIS SITE dashed, scope-labelled
- Eight named roles on the formation; the §1 terminal stream; the `VERIFY ⎘` chip (the file lands in
  Wave 3 — wire the link, do not invent the file)
- §6's `curl` is the real GitHub raw URL and is copy-paste-correct. Never `muster.build`
- Motion budget closed at three plus the cursor; all motion reduced-motion gated with complete content
- Zero external requests; cross-engine before filing; `scripts/test.sh` green including the new
  relationship assertions

**On completion:** File HO-026 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Developer (web): §3 and §4

```
Role: developer
Model: claude-opus-5

**Task:** Build §3 and §4. §4 is the spec-sheet rendering the founder approved at Gate A.

**Inputs:**
- `section-04-decisions.md`, `section-03-copy.md`, `section-04-copy.md`, with PM reviews and the Gate A
  verdict on the rendered sample
- `samples/gate-a.html` — the approved spec-sheet, as reference for what was signed off

**Acceptance criteria:**
- §4's four spec-sheets render as approved at Gate A — if the built version diverges from the sample the
  founder judged, that is a defect
- Decision / Problem / Trade-off / Mechanism rows; strongest first; dates as small stamps
- §3's prose in the reading column at `64ch` (DEC-023)
- Both themes; contrast verified; cross-engine; `scripts/test.sh` green with all assertions

**On completion:** File HO-027 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 Developer (web): §5, then scroll-snap

```
Role: developer
Model: claude-opus-5

**Task:** Build §5, then apply scroll-snap across the page. Scroll-snap is last deliberately — it needs
sections to snap between, and it is the likeliest thing to be rejected at Gate B.

**Inputs:**
- `section-05-copy.md` with its PM review
- `page-shell.md` — the scroll-snap spec (HO-020)

**Acceptance criteria:**
- §5: Bodh, the provenance line, this site — readout cards using the shell motif; THIS SITE dashed;
  scope labels correct; count-up on the readouts is motion element 3, already in budget
- Scroll-snap: **proximity, never JavaScript scroll-jacking**. Keyboard paging, find-in-page and 200%
  zoom all still work — assert each, do not claim it
- **§2 exempt** per spec; verify §2's playback and phone budget are untouched by the snap container
- Reduced-motion path defined and complete
- Cross-engine; `scripts/test.sh` green with all assertions

**On completion:** File HO-028 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 QA (web): Full-page sweep

```
Role: qa
Model: claude-opus-5

**Task:** Validate the content-complete page end to end. One sweep, not one per section.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-025 through HO-028
- Every section spec and copy file — derive scope from the specs directly, so a dev-charter omission
  does not also blind QA
- `knowledge-base/bodh-sprint4-corpus.md` — read-only fidelity baseline

**Acceptance criteria:**
- Cross-engine parity on WebKit **and** Blink, with evidence per engine; state plainly what remains
  Blink-only
- **Zero runtime network requests** with evidence — a published product claim
- Contrast ≥4.5:1 body text in both themes; landmarks, focus states, and the headline's accessible name
  verified by what a screen reader would announce
- Reduced-motion and no-JS paths render complete content across every section
- §2 fidelity still byte-clean against the corpus; the corpus unmodified, proven from git
- **All relationship assertions green**, and the audit exits zero
- Scroll-snap: keyboard paging, find-in-page, 200% zoom each verified working
- Copy rules checked as a text matrix across all sections: no `muster.build`, no cross-scope
  aggregates, scope labels present, THIS SITE still dashed
- Red build or failing check: halt to PM, do not advance the queue

**On completion:** File HO-029 in `agent-requests.md`. Run the Pre-Handoff Self-Review Checklist.
```

### 2026-07-26 PM: Review the build and assemble the Gate B packet

```
Role: pm
Model: claude-opus-5

**Task:** Review Wave 2, then build the Gate B packet.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-025 through HO-029
- Every section spec, and the Gate A verdict

**Acceptance criteria:**
- **Re-run both harnesses yourself.** A summary is not evidence
- Confirm §4 as built matches the sample the founder approved at Gate A
- Confirm the relationship assertions exist and would actually fail if violated — an assertion that
  cannot fail is the Sprint-1 blind-by-construction failure in a new place
- **Look at renders of the states under test**, including a key-beat frame for the tick
- Confirm nothing reaches the founder that a machine could have settled
- **Gate B packet**: the assembled page, desktop and phone, as one batch. Say what to look at and in
  what order; attach machine-verified results as already-green evidence

**On completion:** Write the packet into `wave-review.md`. Run the Pre-Handoff Self-Review Checklist.
Promote the gate.
```

### 2026-07-26 Gate B — founder review: the assembled page

```
Role: halt

**Gate:** The whole page, desktop and phone, in one pass.

Everything content-complete: §1 through §6, the brand mark, the spacing system, and scroll-snap. This
is the second and last founder gate of Sprint 2.

**Read:** `knowledge-base/wave-review.md` and write your verdict in its `## Verdict` section.

**Resume:** write your verdict, then run `muster/scripts/muster-sprint-resume.sh` from inside the
sprint worktree.
```

## Done (Last 10)
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->

- 2026-07-26 — **Sprint 1 closed.** Shell + §2 delivered and accepted at gate 3 with one carried defect
  (the key-beat tick collides with the timestamp; folded into Sprint 2's spacing system per DEC-032).
  ~$97 across three founder gates. Archived in `sprint-archive.md`.
- 2026-07-26 — **Sprint 2 planned** (DEC-033): 13 autonomous steps, two founder gates, Gate A rendered.
  `develop` merged — the pennant artwork is in the worktree and cascaded (DEC-031).
