# Current Sprint
<!-- Full task board. PM populates at sprint planning. -->
<!-- This is the sprint summary board. Detailed task briefs live in each agent's context file (`knowledge-base/agent-context/<agent>.md`). -->
<!-- Orchestration queue tells agents WHICH task to do now; agent-context files have the full task specs. -->

## Sprint 2: the rest of the page

**Goal**: build §1, §3, §4, §5 and §6 to a content-complete page, on a terminal whose spacing is
specified as a system rather than patched, wearing the brand mark.

**Duration**: 2026-07-26 — 2026-08-02

**Sprint 1 is closed** and archived in `sprint-archive.md`. The shell and §2 ship as built; §2 carries
one defect into this sprint's first build step (DEC-032).

### Execution mode

Autonomous throughout. **Two founder gates, and only two** (DEC-033).

| Gate | When | What the founder judges |
|---|---|---|
| **A — copy + render** | after Wave 1, before anything is built | all five sections' copy in one sitting, plus **rendered** §1 headline candidates and one real §4 spec-sheet |
| **B — assembled page** | after Wave 2 | the whole page, desktop and phone, one pass |

**Gate A is rendered, and that is the point.** §1's preferred headline is a typographic device — struck
"human", accented "AI agents" — so "does it land in five seconds" cannot be answered by reading a
markdown file. §4's spec-sheet copy is likewise inseparable from its rendering. Wave 1 therefore ends
with a Developer step that builds the candidates as a static sample. Gate A becomes looking, not
imagining, and §4's rendering gets founder judgment without spending a third gate.

**Everything else never reaches the founder.** Spec conformance, contrast, cross-engine parity, zero
network requests, reduced-motion completeness and corpus fidelity are all machine-verifiable (DEC-009).

### Standing practices — unchanged from Sprint 1

- **Agents never measure this build.** No session runs `muster/scripts/muster-meter.py`. THIS SITE
  metrics stay dashed until the founder supplies a snapshot at launch (seed rule 4).
- **Founder-supplied source material is read-only**: `product-spec-seed.md`, `bodh-sprint4-corpus.md`,
  `design-specs/direction-reference.html`, and now `design-specs/brand/*`. Quote, verify, build from —
  never edit, reformat, extend or regenerate.
- **The direction reference never ships.**
- **`.gitignore` is correct as written.**

### New standing practice this sprint

- **Assert relationships, not values.** Three Sprint-1 fix rounds each satisfied a named value and
  disturbed an adjacent relationship, passing every harness on the way (DEC-032). Any step that changes
  spacing, insets or rhythm adds a harness assertion for the *relationship* it is preserving, not for
  the number it is setting.
- **Verify against the state under test.** PM confirmed a fix against a render that could not show the
  defect. A render used as evidence must show the condition being claimed.

### Model plan

`claude-opus-5` is the default for every step. Premium `claude-fable-5` on exactly two: the §1 hero
design (the page's five-second verdict) and the §1/§3 copy step (the headline and the argument). No
other step uses a premium model.

### Wave structure

| Wave | Contents | Gate |
|---|---|---|
| 1 | §1 hero design · §4 spec-sheet design · spacing system + brand mark · §1/§3 copy · §4/§5/§6 copy · sample render · PM review | **Gate A** |
| 2 | Shell work (spacing + brand) → §1/§6 → §3/§4 → §5 → scroll-snap → QA sweep | **Gate B** |
| 3 | `VERIFY.md` · Legal review · curl verification | launch decision |

**Wave 2's order is a dependency, not a preference.** The shell step's relationship assertions must
land before any section builds, so that every later step's own `scripts/test.sh` run inherits them.
Scroll-snap builds **last**: it cannot be validated before there are sections to snap between, and it
is the likeliest thing to be rejected at Gate B, so building it last minimises sunk cost.

### Settled at planning — not escalated

- **No second §2-style replay.** The two-layer instinct is served by §4's spec-sheets and §5's readout
  cards: same show-the-real-artifact DNA, different form. A second replay would need a corpus DEC-005
  forbids agents to generate, and would make the first one ordinary.
- **Three sections get no design spec.** §3 (prose in the reading column), §5 (readout cards) and §6
  (the `curl`) are shell patterns already built and validated.

### Launch dependencies outside this sprint

`pre-launch-checklist.md` holds three hard blockers. Two are agent work (`VERIFY.md`, curl
verification) and land in Wave 3. **The third is founder-only**: THIS SITE's measured numbers replacing
dashes needs a telemetry snapshot no agent may generate (DEC-005). Domain remains undecided; §6 ships
the GitHub raw URL (DEC-010).

---

### UI/UX

- [ ] **§1 hero design** — Priority: HIGH, Effort: L, Platform: web
  - **Deliverable**: `knowledge-base/design-specs/web/section-01-hero.md`; HO-018
  - **Acceptance criteria**:
    - The seed's §1 inventory, all of it: measured line visible without scrolling, eight named roles as labels on the PM-hub/bus-bar formation, one `curl`, the streaming Sprint-4 terminal, the dual build readout (THIS SITE dashed above BODH), the `VERIFY ⎘` chip, eyebrow facts
    - Specifies how the headline's struck/accented treatment sets — including its accessible name, because struck text is announced as ordinary text and the headline must not read as gibberish
    - Rust on the headline is permitted at display size (DEC-017); no thirteenth palette value (A-006)
    - Motion budget stays closed at three elements plus the cursor
  - **Key refs**: `product-spec-seed.md` §1, `page-shell.md`, `brand-guidelines.md`

- [ ] **§4 spec-sheet rendering** — Priority: HIGH, Effort: M, Platform: web
  - **Deliverable**: `knowledge-base/design-specs/web/section-04-decisions.md`; HO-019
  - **Acceptance criteria**:
    - Decision / Problem / Trade-off / Mechanism as rows; strongest first; dates as small stamps
    - This is the seed's second design centerpiece — it is judged at Gate A as a rendered sample, so the spec must be buildable from itself
    - Reading measure per DEC-023 (`64ch` ships as the CSS value)
  - **Key refs**: `product-spec-seed.md` §4, `page-shell.md`

- [ ] **Terminal spacing system + brand mark seats** — Priority: HIGH, Effort: M, Platform: web
  - **Deliverable**: amended `section-02-replay.md`; `design-specs/web/brand-seats.md`; HO-020
  - **Acceptance criteria**:
    - All five left-edge relationships named and measured: tick↔card, tick↔text, row↔row, entry↔entry, text↔wrap edge
    - The tick leaves the text flow — a positioned mark in the log's gutter, so indentation and tick placement stop sharing a lever (DEC-032)
    - Pennant seats specified per DEC-031: header lockup `pennant + MUSTER_` with a static underscore, five section separators, favicon; sized optically, `clip-path` route, never on a pole
    - One assertion per relationship specified for the harness
  - **Key refs**: `wave-review.md` gate 3, DEC-031, DEC-032, `brand-guidelines.md` §4

- [ ] **Scroll-snap spec** — Priority: MED, Effort: S, Platform: web
  - **Deliverable**: amended `page-shell.md`; HO-021
  - **Acceptance criteria**:
    - Proximity snapping, never JavaScript scroll-jacking; keyboard paging, find-in-page and 200% zoom all survive
    - §2 exempted — its core already fills most of a phone viewport
    - Reduced-motion path defined
  - **Key refs**: `product-spec-seed.md` → Design direction (Layout: one idea per screen)

### Content

- [ ] **§1 and §3 copy** — Priority: HIGH, Effort: L, Platform: web
  - **Deliverable**: `design-specs/web/section-01-copy.md`, `section-03-copy.md`; HO-022
  - **Acceptance criteria**:
    - §1 headline: the founder's direction is the incumbent to beat — *"Ship a product with ~~a human~~ an AI agent team"* — plus alternatives, each with a recommendation and reasoning. Fix the article agreement; the founder's phrasing does not parse as written
    - Every copy rule, R8 especially (the team is AI and says so)
    - §3's CrewAI/AutoGen contrast is grounded in the founder's survey only; if it needs external grounding, open a narrow `needs-research` entry rather than asserting
    - Measured line visible without scrolling; scope labels correct
  - **Key refs**: `copy-rules.md`, `product-spec-seed.md` §1 + §3

- [ ] **§4, §5 and §6 copy** — Priority: HIGH, Effort: M, Platform: web
  - **Deliverable**: `section-04-copy.md`, `section-05-copy.md`, `section-06-copy.md`; HO-023
  - **Acceptance criteria**:
    - §4's four decisions are founder-authored locked draft — tighten only, never inflate, never reorder the argument
    - §5 carries Bodh, the provenance line (first person, founder-supplied), and this site with dashes
    - §6 ships the GitHub raw URL, not `muster.build` (DEC-010)
    - Rule 7: first person only in §5's provenance line and §4's decisions
  - **Key refs**: `copy-rules.md`, `product-spec-seed.md` §4–§6

### Developer

- [ ] **Gate A sample render** — Priority: HIGH, Effort: S, Platform: web
  - **Deliverable**: a static sample page — §1 headline candidates as they set, plus one real §4 spec-sheet; HO-024
  - **Acceptance criteria**: page tokens and fonts, not an approximation; candidates labelled; does not ship

- [ ] **Shell: spacing system + brand mark** — Priority: HIGH, Effort: M, Platform: web
  - **Acceptance criteria**: all five relationships implemented with their assertions in `scripts/test.sh`; the gate-3 tick collision resolved; pennant in the header and five separators; favicon data-URI swapped; zero new network requests
  - **Blocks every section build.**

- [ ] **§1 + §6** — Priority: HIGH, Effort: L, Platform: web
- [ ] **§3 + §4** — Priority: HIGH, Effort: L, Platform: web
- [ ] **§5** — Priority: MED, Effort: M, Platform: web
- [ ] **Scroll-snap** — Priority: MED, Effort: S, Platform: web — builds last

### QA

- [ ] **Full-page sweep** — Priority: HIGH, Effort: L, Platform: web
  - **Acceptance criteria**: cross-engine WebKit **and** Blink; zero runtime network requests; contrast in both themes; reduced-motion and no-JS render complete content; §2 fidelity still byte-clean; all relationship assertions green; audit exits zero
  - Red build: halt to PM, do not advance

### Research

Not staffed unless §3's competitor clause needs grounding — a narrow `needs-research` entry, not full
validation (DEC-001).

### Legal

Wave 3, once the page is content-complete.

### Marketing

Not staffed this sprint.
