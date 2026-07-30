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

- [2026-07-30] [PM]: **The re-gate is live — one thing is asked, and it is the three phone checks.**
  All six Gate B findings are fixed, reviewed and resolved; the packet is at the bottom of
  `wave-review.md`. The §2 playback watch closes a hard launch blocker no harness on this machine can
  reach. Two answers are also flagged for argument rather than approval: §4's track keeps its own
  horizontal snap, and §4 on the phone got *longer*, not shorter. See DEC-058 and the Next Step halt
  block below.

<!-- Resolved 2026-07-30 — Gate B items 1 and 2 (footer copy, "8 agents") are consumed: the footer ships real copy naming five roles, no email; §1's caption stays as the roster label. DEC-056 answered them, HO-034/HO-036 built them, and PM re-derived the participation from `git log` at the review. Item 3, the phone checks, carries forward to the re-gate above. -->

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

### 2026-07-30 Content: Re-gate round — the true word, the model-proof line, one footer sentence, the repetition audit

```
Role: content
Model: claude-fable-5

**Task:** Four copy jobs from the re-gate verdict (`knowledge-base/wave-review.md` → "Re-gate
verdict", findings F-R4, F-R6, F-R8, F-R9 — F-R4 and F-R6 are already RESOLVED there with the
exact material). Routed at the gate (DEC-059); apply, do not re-derive.

**Inputs:**
- `knowledge-base/wave-review.md` — the re-gate verdict, findings and resolutions
- `knowledge-base/design-specs/web/footer-copy.md` · `section-05-copy.md` · `section-06-copy.md`
- `knowledge-base/agent-skills/content/copy-rules.md` · `index.html` (the shipped strings, for the
  repetition audit)

**Deliverable:** amended copy files; a repetition-audit memo appended to your handoff; HO-038.

**Acceptance criteria:**
- **F-R4 (blocking):** the provenance line ships exactly as the founder resolved it — "production"
  becomes "real", every other word identical, verbatim thereafter.
- **F-R6:** §6's lead line redrawn from the resolved material ONLY — the safe claim is the
  deterministic-bash/model-proof fact; present tense; no "(yet)", no roadmap, no "coming soon";
  Claude Code stays stated as the prerequisite. State the word budget.
- **F-R9:** the footer's two sentences become ONE — team truth (5 of 8 agents, 1 operator, three
  never invoked) and authorship (designed and built by the founder, solo, shipping his own
  products) in a single sentence, highest-priority fact first. Draft 2–3 candidates with a
  recommendation; UI/UX lays it out next step.
- **F-R8:** the repetition audit — every string that appears more than once on the page, whether
  each instance earns its seat, what space returns. A MEMO with recommendations, not applied
  changes; ruled at PM review.
- `VERIFY.md`'s participation qualifier stays consistent with the new single footer sentence —
  the merge reopens the consistency check the previous fix round closed.
- Copy-rules matrix on every touched file; no new numeral anywhere.

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-038 in `agent-requests.md` — under this exact ID. Run the Pre-Handoff
Self-Review Checklist.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

### 2026-07-30 UI/UX: Re-gate round — the brand-size mark, the indicator, hierarchy, and the §2 consult

```
Role: ui-ux
Model: claude-fable-5

**Task:** Five design findings from the re-gate verdict (`knowledge-base/wave-review.md` →
"Re-gate verdict": F-R1, F-R2, F-R3, F-R5, F-R7, F-R9). **The founder's explicit instruction:
read your skill files before ruling anything.** F-R1 is a CONSULT — options and pros/cons for the
founder, build nothing.

**Inputs:**
- `knowledge-base/wave-review.md` — the re-gate verdict, findings F-R1–R10 with the founder's own
  words
- Your skill files (`muster/team/ui-ux/skills/`) — read before ruling; founder's instruction
- `knowledge-base/design-specs/web/page-shell.md` · `section-01-hero.md` · `section-02-replay.md`
  · `section-04-decisions.md` · `section-05-copy.md` · `knowledge-base/brand-guidelines.md`
- `index.html` + `styles/` — render the shipped page at 375 and 1280 before ruling
- HO-038 — the footer sentence candidates and §6 line this round lays out

**Deliverable:** amended specs; the F-R1 options memo in your handoff; HO-039.

**Acceptance criteria:**
- **F-R1 (memo only):** options for making the overnight wave visible — including the founder's
  one-card-holding-two idea — each with pros, cons, and its scope-safety (A-005: §2 is BODH-wave
  scope; THIS SITE stays dashes, DEC-005; R2 bans wall-clock). Recommend one. The founder decides
  at the next pass; nothing builds this round.
- **F-R2:** rule §3's "context engineering" emphasis — rust is dead by measurement (4.19/4.35 vs
  the 4.5 floor); choose ink-bold, the accent-mark idiom, or plain, and say why.
- **F-R3:** the §4 page indicator — always visible, aligned with the track, premium; rust
  permitted if restrained. Spec it with measurements and its harness assertion.
- **F-R5:** §5's three prose lines get a deliberate hierarchy — spec the treatment.
- **F-R7:** the header lockup becomes a legible brand logo (founder ruling supersedes the badging
  restraint for this one seat); separators keep size; the missing footer-boundary separator is
  added. Sized optically, clip-path route, never on a pole, no new colour (DEC-031/037 otherwise
  stand). State the chosen sizes. **Cascade clause: say explicitly whether the sticky bar's 48px
  height changes.** That number is load-bearing — the hero fold arithmetic (144 = 48 + 96), §2's
  phone visibility budget, and `--scroll-pad` all derive from it. If it moves, name every
  dependent budget and re-state each with measured figures; if it does not, say so in one line.
- **F-R9:** footer layout for the single sentence + receipt links + final link, Apple-level.
- Every ruling measured on the rendered page; renders show the state under test.

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-039 in `agent-requests.md` — under this exact ID. Run the Pre-Handoff
Self-Review Checklist.
```

### 2026-07-30 Developer (web): Re-gate round — build the ruled items and pin the receipts

```
Role: developer
Model: claude-opus-5

**Task:** Implement HO-038's copy and HO-039's rulings (everything except F-R1, which is
consult-only this round), plus the receipt-link permalinks.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-038, HO-039
- `knowledge-base/wave-review.md` — the re-gate verdict, including F-R10's RESOLVED
  snapshot-selection criterion
- Every spec HO-039 amended; `knowledge-base/design-specs/web/footer-copy.md`

**Deliverable:** `index.html`, `styles/` as needed; amended tests; HO-040.

**Acceptance criteria:**
- Provenance word swap exact (F-R4); §6 line per HO-038 (F-R6); the single footer sentence and
  layout (F-R9); §3 emphasis as ruled (F-R2); §4 indicator per spec with its assertion (F-R3);
  §5 hierarchy (F-R5); header logo at the ruled size + the footer-boundary separator (F-R7)
- **F-R10:** the four receipt links become commit-SHA blob permalinks chosen by the founder's
  demo-in-itself criterion — inspect `git log` per file, pick the most demonstrative frozen state
  (queue: a fully-planned backlog moment; handoffs: the ledger at its fullest; decision log:
  current depth; VERIFY: the launch state), and record each chosen SHA and why in the handoff.
  The framework and profile links stay as they are. VERIFY.md gains the live-file links for
  current state. **Reachability caveat, stated in your handoff**: these SHAs exist on the sprint
  branch — they reach the public repo only if the final merge preserves history. A squash merge
  404s all four links. Flag this beside each chosen SHA; PM carries the post-push verification to
  `pre-launch-checklist.md`
- Also land DEC-058's two one-line spec amendments if not already applied upstream
- All three runners green, both engines; changed-subject assertions re-based; new assertions
  planted and watched red; cross-engine on every touched surface

**If blocked:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment step.

**On completion:** File HO-040 in `agent-requests.md` — under this exact ID. Run the Pre-Handoff
Self-Review Checklist.
```

### 2026-07-30 QA (web): Scoped re-run on the re-gate round

```
Role: qa
Model: claude-opus-5

**Task:** The scoped verification every fix round owes — prove the round broke nothing adjacent.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-038 through HO-040
- `knowledge-base/wave-review.md` — the re-gate findings these answer

**Deliverable:** HO-041 in `agent-requests.md` — per-finding pass/fail with evidence.

**Acceptance criteria:**
- All three runners green on the shipped tree, run by you, both engines
- The provenance line byte-equal to the resolved string; "production" appears nowhere near it
- §6 carries no forward promise: grep for "yet", "soon", "will", "roadmap" in the shipped set and
  judge each hit
- The four permalinks resolve by STRING to `blob/<sha>` URLs and each SHA exists in this repo's
  history (`git cat-file -e <sha>` — a local check, no fetch); the pinned queue snapshot actually
  shows a planned backlog (read the file at that SHA)
- The footer renders the single sentence; the old two-sentence form is gone; no email anywhere
- New assertions (indicator, logo size relationships) each proven to fail when violated
- **Enumerate the live motion elements on the built page** against the stated budget (two + the
  cursor) — a count, not an impression; an animated indicator would breach silently
- §2 playback untouched: fidelity byte-clean, chain timing asserted green
- Cross-engine per touched surface, labelled per engine

**If a check fails:** do NOT set `Role: halt`. Re-point `## Next Step` to a `Role: pm` assessment
step naming it, and file HO-041 with what you found.

**On completion:** File HO-041 in `agent-requests.md` — under this exact ID. Run the Pre-Handoff
Self-Review Checklist.
```

### 2026-07-30 PM: Review the re-gate round and promote the final gate

```
Role: pm
Model: claude-opus-5

**Task:** Review HO-038 through HO-041, rule the repetition-audit memo, then write the final gate
packet and promote its halt.

**Inputs:**
- `knowledge-base/agent-requests.md` — HO-038 through HO-041
- `knowledge-base/wave-review.md` — the re-gate verdict

**Deliverable:** review verdicts; the final gate packet in `wave-review.md`; the `Role: halt`
block in `## Next Step`.

**Acceptance criteria:**
- Re-run all three runners yourself; render and look at every changed state, both engines
- Rule each repetition-audit recommendation (F-R8): apply, decline with reason, or send to the
  founder only if it is genuinely taste
- Verify the four pinned snapshots against the founder's demo criterion by READING each at its
  SHA — a queue link that lands on a template is a blocking miss
- The final gate packet carries: one line per F-R finding on what shipped, the F-R1 §2-overnight
  options memo for the founder's pick, and the three PHONE checks still outstanding (§2's full
  48 s playback — hard launch blocker — find-in-page, scroll feel)
- The halt block tells the founder to write the verdict in `wave-review.md` and run
  `muster/scripts/muster-sprint-resume.sh`

**On completion:** Write the packet, promote the halt. Run the Pre-Handoff Self-Review Checklist.
```

## Done (Last 10)
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->

- 2026-07-30 — Step: PM fix-round review and the Gate B re-gate (DEC-058). **All four handoffs
  accepted with no revision**, and the acceptance is re-derived rather than read: all three runners
  re-run cold by PM on the shipped tree (`scripts/test.sh` GREEN both engines 282/282 + 27/27, audit
  exit 0 at 108/108, sweep exit 0 at 42/42), every changed state rendered and looked at — the
  formation at 1280/1440/375, §4's cut in Blink *and* WebKit, the footer in both engines, the phone
  stack — and the alignment re-measured on the shipped build rather than on the proposal (hub centre
  − axis **0.0px**, one rail number per width). **Two violations planted by PM and watched go red**,
  tree reverted clean: a one-word drift in the footer's team line turned exactly one check red
  printing `team line equal: false`, and zeroing `--track-bleed` turned two red printing *"ground
  between the track's end and the screen: 128px"* — the founder's judged dead strip, reproduced by
  the harness as a measurement rather than a claim. Participation re-derived from `git log` (pm 49 ·
  developer 14 · ui-ux 10 · qa 8 · content 6 · marketing/legal/research 0), the overnight fact
  confirmed as mechanism with no wall-clock anywhere in the shipped set, and no email in any shipped
  file. **DEC-058 rules OBS-016 and OBS-017 together**: both are specs describing a build that moved
  — the page is right, the files are amended, neither is a launch blocker. `muster-requests-lint.sh`
  back to green (360 active lines to 6). **The re-gate is live: the founder's phone is the only
  instrument left, and one of its three checks closes a hard launch blocker.**

- 2026-07-30 — Step: QA scoped re-run on the fix round (HO-037). **Every acceptance criterion
  passes and nothing adjacent broke** — all three runners re-run here (suite GREEN both engines
  282/282 + 27/27, audit 108/108, sweep 42/42), no shipped file touched. Both alignment assertions
  watched to fail on their own plant (the formation reproduces the founder's finding at −173.81px;
  the footer check prints `(center)` where `(start)` belongs), the network guard re-proven red on a
  planted fetching reference with all nine `<a href>` navigations still permitted, the footer's 13
  string checks parsed out of `footer-copy.md` rather than retyped, the five-role participation
  re-derived from `git log`, and cross-engine measured per engine on all three touched surfaces —
  WebKit puts the hub 0.5px off the render axis and shows §4's cut on the frame edge with the dead
  strip gone. **Awaiting PM review at the fix-round review step; OBS-017 asks PM to rule
  `footer-copy.md` §3's lowercase-labels sentence against the shipped uppercase transform.**

- 2026-07-30 — Step: Developer Gate B fix round (HO-036). The footer ships true — five roles named, no
  email, the GitHub profile as the contact path — and the placeholder that was a hard launch blocker is
  gone; the VERIFY chip carries its production blob URL in both seats; page-level scroll-snap retired
  with its assertions while §4's track keeps its own x-axis snap as the paging mechanism; the alignment
  system applied page-wide. **The session hit MAX_TURNS=150 during its self-review, after the work and
  HO-036 were complete** — PM re-verified on the tree rather than trusting the log (all three runners
  green: suite GREEN both engines, audit 108/108, sweep 42/42; in-flight-edited test files parse;
  placeholder/email greps zero) and committed the closeout. Queue advanced by PM.

- 2026-07-29 — Step: UI/UX Gate B fix round (HO-035, DEC-057). All three rulings measured on the
  real page before being written, and re-measured on a rendered proposed state
  (`samples/gate-b-proposed.html`, renders + JSONs in `samples/gate-b-renders/`). **F-B1**: two
  edges and one axis (`page-shell.md` §7.2) — the formation spans the container so the hub's
  center IS the page axis (delta 0.0px at 1280/1440/1600, against 173.8px off on the judged
  build). **F-B2**: snap removed — paging loses on measurement (four of six sections exceed the
  553 phone fold; §5 exceeds 700 at desktop), every assertion dispositioned by name in §7.1's
  retirement inventory; §4's track keeps its x snap as part of F-B3, fallback named. **F-B3**:
  the cut moves to the physical screen edge via a token-derived `--track-bleed` (the dead strip
  — 128/208px on the judged build — gone by construction), `SHEET n OF 4` ordinals in real
  spec-sheet grammar, the scrollbar styled as a gauge; phone stays stacked with orientation
  (3071px at 375, measured; accordion and phone-track alternatives measured and disqualified in
  §8.1 — the accordion hides 12/16 rows from Safari find-in-page). DEC-053's §7.1-A11/§12.16
  amendments landed with the round. `scripts/test.sh` re-run: 272/273 with HO-034's one designed
  red, no shipped file touched. **Awaiting PM review at the fix-round review step.**

- 2026-07-29 — Step: Content Gate B fix round (HO-034). The footer's strings exist and are true:
  `5 of 8 agents, 1 operator`, the five named and the three never-invoked named, no email, six
  exact founder-supplied URLs. §4's trade-off row states the file-based mechanism instead of
  denying it (sheet 44/45), and the overnight fact ships as mechanism in decision 4's row (44/45) —
  the founder's claimable form, no wall-clock. Sweep re-run 42/42; `scripts/test.sh` 272/273 with
  the one red designed (§4 page fidelity awaits HO-036's string swap). **Awaiting PM review at the
  fix-round review step.**

- 2026-07-29 — Step: PM Wave 2 review and the Gate B packet (DEC-053, DEC-054, DEC-055). **All eight
  handoffs accepted with no revision**, and the acceptance is re-derived rather than read: all three
  runners re-run by PM on the shipped tree (`scripts/test.sh` GREEN both engines 273/273 + 27/27, the
  independent audit exit 0 at 108/108, the full-page sweep exit 0 at 42/42), §4's word counts
  independently recounted and reproduced exactly (44/42/44/44 and 10/9/11/9), §1's above-fold inventory
  checked element by element against DEC-045/046, and the key-beat tick looked at in a frame that can
  actually display it — L4 and L9 carry the rust tick clear of the timestamp. **Two violations planted
  by PM and watched go red**, tree reverted clean: a fetching `<img src="https://…">` turned four checks
  red naming `index.html:131 img[src]` with the §6 anchor still permitted, and §2's exemption removed
  turned its check red — **which reproduced OBS-015 firsthand**, the check printing "0 of 13 gated rests
  moved" on the red run. HO-029's §2 bullet was therefore read as "the check was green," never as a
  measurement. **Three rulings closed**: the snap/reveal trade ruled once for both axes (amend the two
  spec clauses, spend no mechanism — DEC-053), A-007's and `brand-guidelines.md`'s stale motion count
  fixed directly in the PM-owned files (DEC-055), and the footer placeholder accepted as a hard launch
  blocker (DEC-054). `muster-requests-lint.sh` back to green — 764 active lines to 6.
  **Gate B is live: three things need the founder's word, and one of them is a number on the page that
  the page's own public artifacts contradict** — five roles built this site, not eight.

- 2026-07-29 — Step: QA full-page sweep (HO-030). **Every acceptance criterion passes**, with every
  load-bearing check watched to fail when violated: `scripts/test.sh` GREEN both engines (273/273 +
  27/27), the independent audit exit 0 at 108/108, and a new `tests/qa-fullpage-sweep.mjs` 42/42.
  The `http(s)` guard was proven able to go red, the curl was really run (HTTP 200, script parses),
  and two hard launch blockers are ticked. **Awaiting PM review at the build-review step; OBS-015 —
  the §2-exemption check's failure detail prints a hardcoded `0` where its measured count belongs,
  which is the exact figure HO-029 quotes as evidence.**

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

