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

- [2026-07-31] [PM]: **The final gate is live — two things are asked, and one of them is a number.**
  All ten re-gate findings are closed, reviewed and ruled; the packet is at the bottom of
  `wave-review.md`. What is left: **pick 1–4 for F-R1** (§2's overnight wave — option 3 recommended,
  and the reasoning says plainly why the founder's own shape is right but early), and **the three
  phone checks**, of which §2's full 48-second playback is the last hard launch blocker. Also stated
  rather than asked: VERIFY's receipt and the §1 chip are RULED to re-point to the live file and §5
  to lose one `with Muster` — both build after the verdict, neither is on the page yet, and a PM stress test found that a fabricated receipt SHA passes
  every runner if the copy file agrees with it. See DEC-061 and the Next Step halt block below.

<!-- Resolved 2026-07-31 — the re-gate's ten findings are consumed: F-R4's false word, F-R6's forward
     promise, F-R2/F-R5's hierarchies, F-R3's indicator, F-R7's masthead, F-R9's footer sentence and
     F-R10's pinned receipts all shipped and were re-verified by PM at the review; F-R8's audit is
     ruled in DEC-061; F-R1 is the one item carried forward, as a founder pick. The three phone
     checks carry forward to the final gate above. -->


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

### 2026-07-31 FINAL GATE — the founder picks one number and checks three things on his phone

```
Role: halt
```

**The packet is at the bottom of `knowledge-base/wave-review.md`.** Open `index.html` at 1280 or
wider in the dark theme, scroll it once, then write the verdict in that file's **Final gate
verdict** section and run `muster/scripts/muster-sprint-resume.sh`.

**Two asks:**

1. **F-R1 — reply with a number: 1 · 2 · 3 · 4.** Where and when §2's overnight wave earns a seat.
   Option 3 is recommended and the packet says plainly why the founder's own shape is right but
   early — R2 reduces options 1 and 2 to the mechanism sentence §4 decision 4 already ships, and
   option 1 re-spends the phone playback check below.
2. **The three phone checks** (iPhone, Safari, toolbars showing): §2's **full 48-second playback**
   with both layers on screen throughout — **the last hard launch blocker**, and a measurement no
   harness on this machine can take; find-in-page for `scarcest` or `commit-days`; scroll feel,
   including §4's sideways track.

**Everything else is stated, not asked.** All ten re-gate findings shipped and were re-verified by
PM at this review — all three runners re-run cold (295/295 + 27/27 · 108/108 · 43/43), every
changed surface rendered and looked at in both engines, the load-bearing numbers re-measured, the
four pinned receipts read at their SHAs, and three violations planted. Three carried items are in
the packet's last section, and DEC-061 carries the rulings.

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

_None — the sprint is at its final gate. The founder's verdict routes what follows._

**Pre-loaded for the step after the verdict** (recorded so a resume-spawned PM does not rediscover
them; they are NOT queue steps and add no scope):
- §5's attribution line drops `with Muster` (DEC-061, F-R8 item 12) — Content amends
  `section-05-copy.md`, Developer swaps the string.
- VERIFY's footer receipt and the §1 chip re-point to `blob/main/VERIFY.md` (DEC-061) — one edit,
  two seats, and the harness fails if only one moves.
- The sweep's `refExists` SHA check widens from the §1 chip to all four pinned receipts
  (`pre-launch-checklist.md`, hard, gated at launch).

## Done (Last 10)
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->

- 2026-07-31 — Step: PM re-gate review and the final gate packet (DEC-061). **All four handoffs
  accepted with no revision**, and the acceptance is re-derived rather than read: all three runners
  re-run cold by PM on the shipped tree (`scripts/test.sh` GREEN both engines 295/295 + 27/27, audit
  exit 0 at 108/108, sweep exit 0 at 43/43), every changed surface rendered and looked at in **both**
  engines, and the load-bearing numbers re-measured on the build rather than read off a handoff —
  masthead 18px word · 9 × 13.5 mark (0.5em × 0.75em) with `--bar-h` unmoved at 48px, the indicator's
  four segments at x 128 → 1152 with transition 0s and animation none on all four, §5's three lines
  on one column edge at 685.31px each, footer `border-top: 0` with one 35-word sentence at lead
  scale. All four pinned receipts **read at their SHAs**, not resolved as strings: queue at 16 queued
  steps, handoffs at 11 entries in both types, decision log at current depth. **Three violations
  planted by PM; two went red and the third is the finding** — a fabricated SHA written into the page
  *and* its copy file together passes 295/295 and 43/43, because the `git cat-file` existence check
  covers the §1 chip only. No shipped link is wrong today, and that coordinated edit is exactly what
  the launch re-pin makes; it is now a hard `pre-launch-checklist.md` item with the fix named.
  **DEC-061 rules three things**: F-R8's audit (eleven verdicts accepted; item 12 declined as
  untested and re-ruled — §5 drops one `with Muster`, ruled not hand-applied), VERIFY's provisional
  pin retired in favour of the live `blob/main` target (the founder's own criterion for that one file
  is the launch state, and the pinned copy predated its own explanation), and F-R1 sent to the
  founder as a pick with option 3 recommended. DEC-060's open PM cascade closed in
  `brand-guidelines.md`. Ledger reconciled — HO-038's heading, clobbered when HO-039 was filed above
  it, restored; four handoffs swept to Resolved; lint 519 active lines to 6.
  **The final gate is live: one number and three phone checks, and one of the three closes the last
  hard launch blocker.**

- 2026-07-31 — Step: QA scoped re-run on the re-gate round (HO-041). **Every acceptance criterion
  passes and nothing adjacent broke** — all three runners re-run cold on the shipped tree (295/295
  + 27/27, 108/108, 43/43), no shipped file touched, thirteen violations planted by QA and each new
  assertion watched to fail. The motion budget is counted, not judged: 7 looping instances across
  3 seats, the indicator contributing zero. **Awaiting PM at the re-gate review step; PM must rule
  VERIFY's provisional pin and reconcile `agent-requests.md` (lint red, 365 active lines vs 300).**

- 2026-07-30 — Step: Developer re-gate build round (HO-040). Every ruling ships and all three
  runners are green here on the shipped tree — suite GREEN both engines 295/295 + 27/27, audit
  108/108, sweep **43/42→43/43**. The four receipts stop pointing at a moving target: `queue`
  pins the plan at 16 queued steps, `handoffs` the ledger at 11 open entries carrying both entry
  types, `decision log` current depth, `VERIFY` the last frozen state — **provisional, and
  flagged**, since its criterion names a launch state that does not exist yet. Six violations
  planted and reverted; five went red on the right check and **the sixth found a real gap** —
  stripping `is-active` from the markup broke nothing, because the observer restores it before
  any harness looks, so a page shipping four dead segments passed every rendered check. The sweep
  now asserts that guarantee in the source. §5's ruling also surfaced a live defect: weighting the
  paragraph resolved its `64ch` 8.7% wider than its neighbours' and broke the column, so the
  emphasis rides a run instead. **Awaiting QA (HO-041) and PM review; PM must rule VERIFY's
  provisional pin and carry the squash-merge reachability caveat to `pre-launch-checklist.md`.**

- 2026-07-30 — Step: UI/UX re-gate design round (HO-039, DEC-060). All five rulings chosen from
  renders in both engines: the header lockup ships at brand scale — 18px word, 9 × 13.5 mark, the
  founder's artwork-as-`<img>` weighed and rejected at ~1.08:1 on the light ground, and `--bar-h`
  stays 48px so nothing derived from the bar moves; §4 gains a four-segment, rail-aligned,
  zero-motion indicator and retires the misaligned scrollbar-gauge; §3's hook and §5's provenance
  line take ink bold at 700 (the lead-scale §5 candidate rendered and rejected); the footer
  composes as four blocks at lead scale with the boundary separator added (candidate A confirmed
  from renders). The F-R1 §2-overnight consult recommends showing the wave at launch with its
  receipt — the build-now options are priced in the memo, the largest costing §2's whole
  machinery plus a re-spent phone check. Suite re-run: 280/282 with exactly HO-038's two designed
  reds — no shipped file touched. **Awaiting Developer (HO-040 builds the rulings) and PM review.**

- 2026-07-30 — Step: Content re-gate copy round (HO-038). F-R4's false word is fixed in copy
  ("real", byte-equal to the founder's resolved string), §6's lead carries the model-proof claim
  drawn verbatim from the founder's safe-today material (30 of ≤ 32 words), the footer's two
  sentences become three one-sentence candidates with A recommended (33 words, team truth first,
  the role names released to VERIFY.md and the receipts), and the F-R8 repetition audit is a filed
  memo — one true content repetition on the page (§2's totals, twice), reclaimable only if F-R1
  needs the room. Suite 280/282 with both reds designed (copy leading the build; HO-040 swaps the
  strings); audit 108/108; sweep 42/42. **Awaiting UI/UX (HO-039 consumes the candidates and the
  §6 line) and PM (rules the memo) at their steps.**

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
