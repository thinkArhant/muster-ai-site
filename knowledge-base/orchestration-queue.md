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

- [2026-07-31] [UI/UX]: **The batched render look is ready — one pick, on one image.** Open
  `samples/closing-round-renders/CONTACT-SHEET.png`. **Asked, one thing**: §1's THIS SITE strip,
  **A** (re-keyed to §5's two questions) or **B** (slimmed to the VERIFY chip). Both are shown in
  situ under the headline and the formation, at 1280 and at 375, and both were re-rendered in
  WebKit. **UI/UX recommends B**, and the sheet says so as a recommendation, not a ruling: A prints
  the same two keys and the same two values as §5's THIS SITE card one scroll above it, and puts a
  second rust readout under the headline's rust `AN AI`. B is also 87px shorter at desktop, which
  brings the whole hero — the `curl` included — inside a 774px window. **Shown, not asked** on the
  same sheet: §5's rebuilt two-cell cards, and the footer's final sentence as it sets. Developer
  builds only the picked form; the losing form is deleted from `section-01-hero.md` §7.1 in the
  same commit.

- [2026-07-31] [Content]: **VERIFY.md now publishes the site's economics — do the figures get a
  fresh read before launch?** The section quotes the committed record ($594 · 51 step-sessions ·
  ~27.3 driver-hours · $21.8/hr) and labels the whole thing a floor. But the tree already carries
  more `.metrics` lines than that snapshot covers, so a reader who sums the committed files gets a
  larger number. VERIFY.md states that plainly in the section's own preamble, so nothing published
  is wrong. The question is whether the founder wants these re-read at launch — one number, taken
  once, no agent involvement (A-002) — or whether the floor framing is the intended permanent form.

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

### 2026-07-31 THE TERMINAL QA SWEEP — the last gate before the launch merge

```
Role: qa
```

Round 3 of 3 is built and committed (HO-044, `f166dfb`). Everything DEC-062 through DEC-064 ruled
is on the page: §5's four prose lines and two-cell cards, §1 slimmed to the scope label and the
chip with one top-left mark, the footer's re-ruled sentence with its two nowrap units, and the two
phone bugs closed with an assertion each. Nothing is open to build.

**Read first**: `knowledge-base/agent-requests.md` **HO-044** — it lists every file changed, every
assertion added or re-based, and eighteen plants with what each turned red.

**The step.** Run the terminal sweep DEC-062 decision 5 traded the per-wave re-runs for. Developer
reports all four runners green on the shipped tree with `git status` clean —
**`verify-shell` 304/304 · `verify-webkit` 27/27 · `qa-independent-audit` 108/108 ·
`qa-fullpage-sweep` 45/45** — so reproducing those counts cold is the floor, not the deliverable.

**What is worth your attention, stated so it is not rediscovered:**

- **Three couplings this round found by running rather than by reading**, and one of them was a
  check going *blind* rather than red: the sweep's contrast probe skipped selectors it could not
  find, so retiring §1's cells silently dropped a surface from a check that still claimed to
  measure it. Look for the same shape elsewhere.
- **Two behaviours have no WebKit evidence in any condition** — §4's track end and §2's replay are
  JavaScript, and `qlmanage` runs none. Every phone figure in HO-044 is Blink's and is labelled so.
- **Two documentation findings are open and deliberately not fixed by Developer** (both in
  Content's files, neither shipping): a stray `</content></invoke>` artifact ending
  `section-05-copy.md`, and `section-01-copy.md` §5 still specifying §1 strings that no longer
  ship. Judge whether either blocks the launch merge.
- **One accuracy note on HO-043/DEC-064**, disclosed rather than smoothed: the mark/chip overlap is
  real on the single-row strip (3.13px², measured) but did **not** exist on the strip as it shipped
  before this round — the mark sat 147.67px below the chip. The ruling is unaffected.

**One operational note, disclosed rather than left to be rediscovered**: running two runners
concurrently against the same machine produced a
`CDP timeout: Runtime.evaluate did not reply within 180000 ms` once during this round. Re-run serially
and it is green. It is contention, not a page defect — but a timeout is a failure, so it is named
here rather than treated as noise.

**Deliverable:** a handoff in `agent-requests.md` naming PM as reviewer, carrying the four runner
counts re-derived cold on the shipped tree, the result of every violation planted against this
round's new and re-based assertions, and an explicit launch recommendation — ship, or ship with
named residuals, or hold with the blocker named.

**Two documentation findings above are already closed** — the stray artifact is stripped and
`section-01-copy.md` now states the strip that ships (`400a520`). Confirm rather than re-open.

**If blocked**: re-point `## Next Step` to a `Role: pm` assessment step and file the blocker in
`agent-requests.md`. Never set `Role: halt` — only PM does that, and only for a founder question.

**If blocked**: never set `Role: halt`. File the blocker addressed to PM and re-point `## Next Step`
to a `Role: pm` assessment step.

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

1. **The launch merge, history preserved** (DEC-063 §5). A squash merge collapses this branch and
   404s the three pinned receipts in the footer; `blob/main` survives either strategy, which is the
   second reason VERIFY is not pinned.
2. **The founder's VERIFY click-check on the live page** — the one thing no runner can stand in
   for, because only a real fetch proves reachability.

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

- 2026-07-31 — Closing round 3 of 3: Developer builds every ruling and closes both phone bugs
  (HO-044, `f166dfb`). All four runners green on the shipped tree with the tree clean —
  **304/304 · 27/27 · 108/108 · 45/45** — starting from a `verify-shell` that **aborted before
  check one**, whose parser now discovers §5's cell inventory instead of re-hard-coding it. §4's
  indicator bug was neither of the two causes proposed: at the track's end the last **two** sheets
  are both wholly visible from **1600px up**, visibility ties, and the tie broke by document order
  — so the last segment could never light on any screen that wide, and an observer alone cannot see
  it because no intersection ratio changes across that whole run. Fixed from geometry with the end
  of the track as its own case; verified 1→2→3→4 at every snap point across six widths. Replay's
  narration rail was the pane that never rewound (**990 of 991 at 1280**); the terminal already
  did, and the handoff corrects the brief rather than claiming both. **Eighteen plants, every one
  watched to go red on the check that owns it** — including the four-runner plant on the dash's
  modifier, the `white-space: normal` plant that reproduced the founder's `Kanwar / Sandhu` split,
  and the re-key plant that proves the parser now goes red instead of crashing. **Five couplings
  the brief did not list** were found by running, one of them a contrast probe that had gone
  *blind* rather than red. Two documentation findings in Content's files are filed rather than
  silently fixed, and HO-043's mark/chip overlap is corrected on measurement.

- 2026-07-31 — Closing round 2 of 3: UI/UX rules §5's card and renders the founder's pick (HO-043).
  **A two-cell card still reads as an instrument**, chosen and measured on a rendered proposed
  state in both engines — card heights equal at 361.8px desktop / 301.8px phone, corresponding keys
  and values on identical block-starts across the pair, each sub-line 42.0px below its own value,
  so the sub-line asymmetry reads as a matrix answered on a diagonal rather than as an omission.
  The alternative composition (cells side by side, cards stacked) is disqualified on measurement at
  **475.6px against 361.8px** for a worse read. **`bodh.day` and `THIS PAGE` are RULED rust**: the
  value slot's colour is the answered/unanswered channel, not a numeral/word distinction — ink for
  both would make card 2 read as measuring nothing, and rust holds AA-large at the readout size's
  24px floor (3.86 dark / 4.89 light). Reduced motion and scripts-stripped render the same end
  frame; the dash never animates. **§1's two forms are rendered in situ, both engines**, and A's
  cost is visible: it duplicates §5's card one scroll above it and puts a second rust readout under
  the headline's rust `AN AI` — B is recommended and is 87px shorter. Two defects found by
  rendering rather than by reading: the strip's bottom-right registration mark **overlaps the
  VERIFY chip's border box** at 1280/375/320, and the footer's final sentence **splits
  `Kanwar / Sandhu`** across lines at 375 and 320 — fixed with two nowrap units that cost zero
  lines at every measured width. Sweep 45/45, audit 108/108, no shipped file touched.
  **Awaiting the founder's batched render look, then Developer (round 3).**

- 2026-07-31 — Closing round 1 of 3: Content writes the cost posture into strings (HO-042). §5 runs
  four prose lines — Bodh's price lands as `Bodh, idea to live: 9.3 hours of active build, $147 in
  AI tokens at API list price.` (17 of ≤ 20 words), the scope sentence survives, and the API-list
  framing travels with the figure rather than dying with the key that carried it. Both §5 cards
  re-key to `OPERATOR ATTENTION` + `SHIPPED`, symmetrical, no cost cell on either side;
  `measured at launch` moves onto the dash it qualifies, since `SHIPPED · THIS PAGE` is measured.
  `THIS PAGE` ruled uppercase in every seat, `bodh.day` ruled lowercase, asymmetry stated. The
  footer's final sentence ships byte-exact at 35 of ≤ 40 words and the candidate structure retires.
  `VERIFY.md` publishes the site's economics as a measurement report — driver-log scope, labelled a
  floor twice, with the rate and its inputs — and the THIS SITE dashes are untouched. Sweep 45/45,
  audit 108/108; **`verify-shell.mjs` aborts at its §5 copy parser, which is designed and is
  round 3's first fix** — eleven couplings enumerated in HO-042. **Awaiting UI/UX (round 2).**

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

