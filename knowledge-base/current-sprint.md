# Current Sprint
<!-- Full task board. PM populates at sprint planning. -->
<!-- This is the sprint summary board. Detailed task briefs live in each agent's context file (`knowledge-base/agent-context/<agent>.md`). -->
<!-- Orchestration queue tells agents WHICH task to do now; agent-context files have the full task specs. -->

## Sprint 1: Foundation + §2 replay prototype

**Goal**: Implement the locked design foundation in both themes, then build a §2 replay prototype that
stands on pacing and plain-English narration alone — independent of the visual frame.

**Duration**: 2026-07-24 — 2026-07-31 (1 week)

**Scope rationale**: `product-spec-seed.md` → Sequencing names §2 the highest-leverage, highest-risk
asset and orders it first. Founder elected to build the page shell alongside it, because the design
direction is locked to exact values in the seed (palettes, type pairing, motifs) and is therefore not
a speculative bet the replay's outcome could invalidate. The shell gives §2 its real visual context;
the founder's added acceptance criterion (below) protects against the frame flattering a mediocre
replay.

**Founder-added acceptance criterion (applies to the §2 replay step, non-negotiable)**: the replay
must stand on pacing and plain-English narration alone, independent of the visual frame. At review the
founder judges run-log timing and narration with the styling mentally subtracted; both must be
excellent on their own.

**Out of scope this sprint**: §1 hero, §3 insight, §4 decisions spec-sheets, §5 shipped-with, §6 get
started, Legal, Marketing, deploy. §4's spec-sheet rendering is the second design centerpiece
(seed → Sequencing item 2) and lands in Sprint 2. `VERIFY.md` lands with §1, which carries the
`VERIFY ⎘` chip that links to it — tracked in `pre-launch-checklist.md`.

### Founder direction carried into Sprint 2 planning

Raised at the Wave 3 gate, neither in Sprint 1 scope. Both go to UI/UX as spec work at Sprint 2
planning, not as amendments to a signed-off spec.

1. **One section at a time on desktop** — land on §1 alone with a scroll signal, each subsequent
   section arriving whole with its header visible. This is the seed's own *"one idea per screen"*
   (Design direction → Layout) asking for a mechanism the shell has not yet implemented; the shell
   currently expresses it as composition only (96–168px section padding). UI/UX to specify, with the
   §2 conflict named explicitly: §2's mobile core already measures 499.89px of a 553px viewport, so a
   full-viewport snap cannot apply to it uniformly. Founder also asked for the attention research
   behind it — Research is unstaffed, so this is the narrow incremental request DEC-001 anticipated.
2. **More of §2's two-layer pattern** — the founder values the terminal/plain-English split as the
   engagement mechanism. PM position: §5's readout cards and §4's spec-sheets are the planned second
   and third doses of the same "show the real artifact" DNA in different forms; a second *replay* is
   not recommended (see the gate response). To be settled at planning, not assumed.

### Execution mode

| | Waves 0–1 | Waves 2–3 |
|---|---|---|
| Mode | Interactive, warm tabs | Autonomous driver |
| Launch | now | after the Wave 1 founder gate |
| Notes | Founder runs the UI/UX design step personally; review cycles expected, so the Wave 1 PM review may iterate | Driver's first step is the page shell build |

### Standing practices for this build

- **Agents never measure this build.** No session runs `muster/scripts/muster-meter.py`. Build
  telemetry snapshots are founder-supplied and committed at milestones; steps needing a metric read a
  committed snapshot. THIS SITE metrics stay dashed in all page copy until launch (seed rule 4).
- **`.gitignore` is correct as written.** `.muster-sprint-logs/*.jsonl` excludes only the bulky
  transcripts; `.metrics` files and run logs in that directory commit normally, which is what the
  seed's "per-run metrics land interleaved with each sprint's commits" requires. No change needed.
- **Founder-supplied source material is read-only.** `product-spec-seed.md`,
  `bodh-sprint4-corpus.md`, and `design-specs/direction-reference.html` are authored by the founder.
  Agents quote, verify, and build from them; agents never edit, reformat, extend, or regenerate them.
- **The direction reference never ships.** `design-specs/direction-reference.html` is a feel
  reference — mood, density, rhythm. Its markup, class names, and measurements are not a build target,
  and the production build should exceed it (seed → Design direction).

### Model plan

`claude-opus-5` is the default for every step. Premium `claude-fable-5` is founder-approved for
exactly two foundation-critical steps: the UI/UX design foundation (authors the token system the whole
page inherits) and the Content §2 narration (centerpiece voice, judged by the founder's added
criterion). No other step uses a premium model.

### Wave structure

| Wave | Contents | Gate | Status |
|---|---|---|---|
| 0 | PM: Stage 4 drafts + Sprint 1 context cascade | — (interactive) | ✓ done |
| 1 | Corpus verification + beat inventory → design foundation spec → PM review | **Founder gate** | ✓ **approved with amendments**, 2026-07-25 |
| 2 | Inventory true-up → spec amendments → PM review → shell build → QA validation | none — output is machine-verifiable against the approved spec | ✓ done, 2026-07-25 — one founder question raised, no blockers |
| 3 | §2 narration → PM review → replay build → QA validation | **Founder gate** — judge pacing + narration, styling subtracted | ✓ **approved with one copy fix**, 2026-07-26 |
| 3b | Mobile no-horizontal-scroll spec → SP7 rewrite → PM review → rebuild → QA re-validate | **Founder re-gate** — narrow: the new thesis line, and the phone | running |

**Wave 2 order is deliberate.** The gate's amendments change `page-shell.md` (theme control dropped) and
`section-02-replay.md` (48 s rescale, B5 rebalance, narration-first mobile), so the UI/UX amendment and
its PM review run **before** the shell build. Building first would build a dropped control and leave the
spec, rather than the build, as the thing out of date.

**Wave 1 gate outcome** (DEC-015, DEC-016): replay confirmed as content playback; theme control dropped;
totals strip static; mobile narration-first; chain rescaled to 48 s; B5 restored to ~14.5% funded from
the gate hold rather than from QA.

Wave 2 carries no founder gate deliberately: every claim it makes is mechanically checkable (contrast
ratios, cross-engine parity, zero network requests, reduced-motion completeness), and the aesthetic
judgment was already spent at the Wave 1 spec gate. Wave 3's output is taste, so it gates.

### Dependency note — the corpus

§2 is built from `knowledge-base/bodh-sprint4-corpus.md`: a founder-supplied curated excerpt of real
queue, handoff, and decision lines with timestamps, condensed from the real build log. It arrives like
the seed does. Wave 0 begins once it lands.

Both steps that touch it carry inline halt-to-PM conditions rather than relying on the standing rule,
because the failure mode is specific: rule 4 and §2's "never staged, never embellished" make
synthesizing a missing line a violation of the page's central claim, not a scheduling shortcut. An
agent that finds a gap reports it and stops.

---

### PM

- [x] **Stage 4 drafts + Sprint 1 context cascade** — Priority: HIGH, Effort: S, Platform: n-a
  - **Deliverable**: `knowledge-base/product-spec.md`, `knowledge-base/brand-guidelines.md`,
    `knowledge-base/foundational-assumptions.md`, populated `agent-context/{developer,ui-ux,qa,content}.md`,
    `agent-skills/content/copy-rules.md`, project root `CLAUDE.md` Product Information section
  - **Dependencies**: corpus file lands (founder gate on starting the sprint)
  - **Acceptance criteria**:
    - All three knowledge-base drafts synthesized from `product-spec-seed.md` with zero invented facts; every measured number matches the seed's table exactly
    - Each of the four agent-context files has real tasks inlined in Current Tasks (not a pointer to current-sprint.md) — the queue-promotion validation gate in `sprint-planning.md` step 8
    - `agent-skills/content/copy-rules.md` encodes the seed's 12 non-negotiable rules as enforceable copy constraints (project-specific, not a Muster generic skill)
    - `foundational-assumptions.md` records the four Standing practices above as current truth
    - `.populated` timestamps set for developer, ui-ux, qa, content; JSON valid
  - **Key refs**: `product-spec-seed.md`, `team/pm/skills/generic/{product-spec-writing,brand-guidelines,context-cascading,skill-gap-classification}.md`

- [x] **Wave 1 design review** — Priority: HIGH, Effort: S, Platform: n-a
  - **Deliverable**: review verdict on HO-002 in `agent-requests.md`; Wave 1 gate packet in `wave-review.md`; decision-log entries for any design calls settled
  - **Dependencies**: UI/UX HO-002
  - **Acceptance criteria**:
    - Every palette hex, type assignment, and motif in the spec traced back to the seed's Design direction section — deviations either justified in writing or corrected
    - Both themes specified as first-class; no light-theme-as-afterthought
    - Nothing from `direction-reference.html` promoted into the spec as a requirement
    - Replay timing checked against the real intervals in the beat inventory, not against invented pacing
    - Gate packet is human-judgment residue only, machine-verified results attached as already-green evidence, with a `Notices since last gate` heading (or `none`)
    - Gate packet states that approving it launches the autonomous run at Wave 2
  - **Key refs**: `team/pm/skills/generic/deliverable-review.md`, `team/qa/skills/generic/verification-discipline.md`

- [x] **Wave 3 narration review** — Priority: HIGH, Effort: S, Platform: n-a
  - **Done** 2026-07-25 — HO-005 accepted, no revision, no word rewritten. All ten strings re-measured
    by script (139/163 timed words, every slot inside its read window). Two build-level items on the
    chain-totals strip ruled in DEC-022 and carried inline on the §2 build and QA steps; gate packet
    re-based for Wave 3
  - **Deliverable**: review verdict on HO-005 in `agent-requests.md`
  - **Dependencies**: Content HO-005
  - **Acceptance criteria**:
    - Rules 1, 2, 5, 6, 7, 8 verified line by line, not sampled
    - Every factual claim spot-checked against `bodh-sprint4-corpus.md`; unverifiable claims are blocking findings
    - The Safari-only SVG catch is either absent or narrated explicitly as a founder-directed polish pass — never as part of the untouched run
    - No aggregate Bodh number (9.3 h, $147) attributed to the website wave alone
  - **Key refs**: `agent-skills/content/copy-rules.md`, `product-spec-seed.md` §2

### Developer

- [x] **Bodh corpus verification + beat inventory** — Priority: HIGH, Effort: S, Platform: web
  - **Done** 2026-07-25 — HO-001 accepted; trued up to corpus v1.1 as HO-009 and accepted 2026-07-25
  - **Deliverable**: `knowledge-base/design-specs/web/section-02-beat-inventory.md` — corpus lines mapped
    to the seed's six beats in order, timestamps verbatim, inter-beat intervals shown as derived; HO-001
  - **Dependencies**: `knowledge-base/bodh-sprint4-corpus.md` (founder-supplied)
  - **Acceptance criteria**:
    - Read-only on the corpus — no edits, no reformatting, no cleanup, no extension
    - Every corpus line either assigned to a beat or explicitly listed as unused; nothing silently dropped
    - Coverage report per beat: supported by which lines, or reported as a gap. Gaps are reported, never filled
    - Timestamps preserved verbatim; derived intervals shown with the arithmetic visible
    - Zero conversation content surfaced — queue lines, handoffs, decisions, timestamps only
  - **Key refs**: `bodh-sprint4-corpus.md`, `product-spec-seed.md` §2 + Verification, `team/developer/skills/generic/plan-first-discipline.md`

- [x] **Page shell implementation** — Priority: HIGH, Effort: L, Platform: web
  - **Done** 2026-07-25 — HO-003 accepted. 79/79 Blink + 7/7 WebKit, harness ships with the build
    (DEC-020). One shell-level fix carried into the §2 build step: `.instrument`'s phone inset
    (DEC-021.1)
  - **Deliverable**: `index.html`, `styles/` (tokens + shell), `scripts/` — the shell only, no section content
  - **Dependencies**: UI/UX HO-002 approved at the Wave 1 founder gate
  - **Acceptance criteria**:
    - Both palettes at the seed's exact hex values, both themes first-class; mono display / humanist-sans reading split per spec
    - Grain texture + top vignette CSS/SVG-generated; stencil section tags, hairline rules with machined end-ticks, registration marks, OPERATIONAL status bar all present
    - Zero external network requests at runtime — no webfonts, no CDN, self-contained assets (product claim, not preference)
    - Matte surfaces, sharp corners, opaque cards; reading column ~64ch; semantic landmarks and real focus states
    - All motion `prefers-reduced-motion`-gated, and the reduced-motion path renders complete content
    - Cross-engine verified on WebKit and Blink at every visual milestone
    - Build from `page-shell.md`; `direction-reference.html` is not a build input
  - **Key refs**: `product-spec-seed.md` → Design direction + Tech, `knowledge-base/design-specs/web/page-shell.md`, `team/developer/skills/web/{web-best-practices,web-accessibility,web-performance-engineering}.md`

- [ ] **§2 replay implementation** — Priority: HIGH, Effort: L, Platform: web
  - **Deliverable**: the §2 section — two-layer annotated replay, built into the shell, corpus wired into the terminal layer
  - **Dependencies**: beat inventory HO-001, replay spec HO-002, narration HO-005 (PM-approved)
  - **Acceptance criteria**:
    - **Founder criterion**: replay stands on pacing and narration alone, independent of the visual frame
    - Terminal layer renders corpus lines verbatim; labelled "condensed from the real build log"; nothing staged, embellished, or invented
    - Narration layer synchronized to the terminal beats; ends on `bodh.day`, live
    - Scripted HTML/CSS/JS — no asciinema, no tooling dependency; zero external requests
    - Reduced-motion path renders the complete content, not a degraded subset
    - Implement everything in HO-002 and HO-005; the criteria here are non-exhaustive examples, not a closed list that overrides the handoffs
  - **Key refs**: `product-spec-seed.md` §2, `bodh-sprint4-corpus.md`, `section-02-beat-inventory.md`, `team/developer/skills/web/web-best-practices.md`

### UI/UX

- [x] **Design foundation + §2 replay spec** — Priority: HIGH, Effort: L, Platform: web
  - **Done** 2026-07-25 — HO-002 accepted at the Wave 1 gate with amendments; the amendments delivered
    as HO-010 and accepted 2026-07-25, closing finding F1. Both specs are the Wave 2/3 build inputs
  - **Deliverable**: `knowledge-base/design-specs/web/page-shell.md` (tokens, type scale, motifs,
    section chrome, both themes) and `knowledge-base/design-specs/web/section-02-replay.md` (replay
    layout, two-layer structure, annotation placement, beat timing, reduced-motion fallback); HO-002
  - **Dependencies**: PM Wave 0 cascade; beat inventory HO-001 for real timing
  - **Acceptance criteria**:
    - Every token traced to the seed's locked values — the design direction is executed with craft, never re-derived. Both themes first-class
    - Reading passages full-ink and legible; muted tone reserved for labels and captions only
    - Exactly three live motion elements specified (hero terminal stream, OPERATIONAL rust pulse, scroll-triggered metric count-up with decimal support) plus the curl's blinking cursor — nothing else
    - Replay spec defines beat timing and narration sync precisely enough that pacing is a design decision, not a developer guess — this is what the founder's added criterion will be judged against
    - Timing paced against the real intervals in the beat inventory
    - Contrast ≥4.5:1 for body text in both themes, stated per token pair
    - States which choices came from `direction-reference.html` as feel cues versus the seed's locked values, so the reference never leaks in as a de facto spec
  - **Key refs**: `product-spec-seed.md` → Design direction + §2, `design-specs/direction-reference.html` (feel only), `section-02-beat-inventory.md`, `team/ui-ux/skills/web/{web-design-system,web-marketing-and-conversion-pages,web-accessibility,web-screen-specification}.md`
  - **Note**: founder executes this step personally in a warm tab; review cycles expected

### Content

- [x] **§2 narration script** — Priority: HIGH, Effort: M, Platform: web
  - **Done** 2026-07-25 — HO-005 accepted with no revision. All eight slots inside budget, SP7 landed
    at 15 of 16 words with SP6's relief unspent, the Safari catch omitted, every claim cited in place.
    The strings are final and are rendered verbatim; `section-02-narration.md` §5 is the authority on
    §2's chrome copy
  - **Deliverable**: `knowledge-base/design-specs/web/section-02-narration.md` — the narration layer
    line by line, each line keyed to its terminal beat; HO-005
  - **Dependencies**: beat inventory HO-001, replay spec HO-002
  - **Acceptance criteria**:
    - Product voice throughout — §2 is not one of the two first-person places (rule 7: provenance line and §4 only)
    - A non-technical reader can follow the narration alone; a technical reader can read the terminal lines; both reach `bodh.day · LIVE` (the seed's own acceptance bar)
    - Lands the honest headline beat: the PM re-checked the developer's work with its own screenshots, QA passed 11/11, no human touched this until the deploy button
    - Zero rounded numbers, zero adjectives-as-argument, "measured" never "proven", scope labels correct, AI team named as AI
    - Every factual claim traceable to a line in `bodh-sprint4-corpus.md` — cite it. A claim the corpus does not support is cut, not softened
    - Word budgets in `section-02-replay.md` §6 are hard limits, measured not eyeballed. **SP7 — the
      page's thesis, at the gate — is ≤16 words with zero slack.** Write to it; if it genuinely cannot
      land in 16, say so in the handoff rather than overrunning. The relief comes from SP6's 12 words in
      the same beat (DEC-019), and that is a PM call, not a Content one
  - **Key refs**: `agent-skills/content/copy-rules.md`, `product-spec-seed.md` §2, `bodh-sprint4-corpus.md`, `team/content/skills/generic/brand-voice.md`

### QA

- [x] **Shell validation** — Priority: HIGH, Effort: M, Platform: web
  - **Done** 2026-07-25 — HO-004 accepted. Every acceptance criterion passes on both engines, no build
    defect found; audit 37/39, the two failures disposed in DEC-021. The `qlmanage` ceiling it
    established (no JS, fixed ~1024² viewport) now scopes §2's cross-engine criterion
  - **Deliverable**: HO-004 in `agent-requests.md` with per-criterion pass/fail and evidence
  - **Dependencies**: Developer shell (HO-003)
  - **Acceptance criteria**:
    - Cross-engine parity verified on WebKit **and** Blink (`qlmanage`/Safari + headless Chrome) — inline-SVG/WebKit divergence is a known failure class on this project, not a hypothetical
    - Zero network requests asserted at runtime, with evidence — this is a product claim
    - Contrast measured ≥4.5:1 for body text in both themes; semantic landmarks and focus states verified
    - Reduced-motion path renders complete content
    - No webfonts, CDN references, or build-system artifacts in shipped output
    - Red build or failing checks: halt to PM, do not advance the queue
  - **Key refs**: `team/qa/skills/web/web-testing.md`, `team/qa/skills/generic/{test-strategy,bug-reporting}.md`

- [ ] **§2 replay validation** — Priority: HIGH, Effort: M, Platform: web
  - **Deliverable**: HO-007 in `agent-requests.md` with per-criterion pass/fail and evidence
  - **Dependencies**: Developer §2 replay (HO-006)
  - **Acceptance criteria**:
    - Every rendered terminal line diffed against `bodh-sprint4-corpus.md` and cited — any altered, paraphrased, or invented line is a blocking bug
    - Corpus file confirmed unmodified since HO-001 — an agent editing founder source material is a blocking finding
    - **Cross-engine parity scoped to the tooling (DEC-021.4)**: WebKit proves the no-JS/reduced-motion
      complete transcript at ~1024²; Blink proves playback, media queries, and every mobile width.
      Mobile evidence is Blink-only and is labelled as such. `qlmanage` runs no JS and ignores the
      requested size — that ceiling is measured, not assumed, and is not closed by installing anything
    - Zero network requests; reduced-motion path complete
    - Narration/terminal synchronization holds at reduced motion and, where JS is involved, on Blink
    - Measured beat intervals reported factually, so the founder's pacing judgment has data alongside it
    - **Measure the rendered narration card at 375 × 553 against SP3's actual copy.** The §7.1 height
      budget assumes a 6-line worst case; at 7 lines the terminal drops to 4 visible lines, which the
      design absorbs but the budget table does not. A wrong row gets corrected, not tolerated
    - Derive validation scope from HO-002 and HO-005 directly, so a dev-charter omission does not also blind QA
  - **Key refs**: `team/qa/skills/web/web-testing.md`, `bodh-sprint4-corpus.md`, `section-02-beat-inventory.md`

### Marketing

Not staffed this sprint — nothing to market until the page has sections.

### Legal

Not staffed this sprint. Privacy/tracker posture is asserted mechanically by QA (zero network
requests); Legal review lands when the page is content-complete.

### Research

Not staffed. Stages 2–3 of Discovery were deliberately skipped — the spec is settled and the product
being marketed already shipped. See DEC-001 in `decision-log.md`, and `research/change-log.md` → Resolved
for the one question that could reopen research (§3's competitor-positioning clause).
