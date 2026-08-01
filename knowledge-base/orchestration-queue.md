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

<!-- Resolved 2026-08-01 — The final gate and the render look are both consumed. F-R1 closed as
     option 4 (DEC-062); all three phone checks passed, closing the last hard launch blocker
     (DEC-063). §1's strip ruled option B (DEC-064); §5's two-cell cards, the footer's re-ruled
     sentence and the two phone bugs all shipped and were re-verified cold by PM. DEC-061's ruled
     items shipped in 42470b3. The terminal sweep is accepted (DEC-068) and the build is cleared. -->


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

### 2026-08-01 THE LAUNCH MERGE — history preserved, then the founder's click-check

```
Role: halt

The build is cleared. QA's terminal sweep is accepted with no revision (DEC-068), and with it every
handoff in the closing round. All four runners are green cold on the shipped tree, re-derived by PM
after QA's harness fix landed. The ledger is reconciled to 4 active lines and all three lints are
green. Nothing is open to build, and no agent has work left.

TWO THINGS REMAIN, AND NEITHER IS AN AGENT'S TO DO.

1 — THE MERGE, WITH HISTORY PRESERVED. Merge this branch to `main` with a real merge commit, NOT a
squash. Three of the footer's four receipts are pinned to commit SHAs on this branch; a squash
collapses that history and 404s all three silently, for every reader, with no harness able to see
it. `blob/main/VERIFY.md` survives either strategy — that is the second reason VERIFY is not
pinned — but the other three do not. If a squash is preferred for any reason, the three pinned
receipts must be re-pinned to post-merge SHAs BEFORE deploy, and the sweep's pinned-receipt check
re-run to confirm each path still exists at its new commit.

2 — THE FOUNDER'S VERIFY CLICK-CHECK, AFTER THE PUSH. `blob/main/VERIFY.md` 404s today, by
construction: `main` is ~110 commits behind and the link resolves only once the merge lands. Click
all four footer receipts plus the §1 chip on the live page. Only a real fetch proves reachability,
which is why no runner stands in for this and why it is the last step rather than an earlier one.

ALSO FOUNDER-ONLY, AND STILL OPEN: the THIS SITE telemetry snapshot. No agent measures this build
(seed rule 4, A-002), so §5's THIS SITE card carries an em-dash under `OPERATOR ATTENTION` with
`measured at launch` beneath it until the founder supplies a number. The page is honest as it
stands — a dash is a claim about what will be measured, never a placeholder — so this gates the
telemetry claim, not the merge.

TWO ACCEPTED RESIDUALS, recorded so nobody re-discovers them as defects (DEC-068):

- No contrast check can see the texture. Both probes resolve a background by walking ancestors and
  `.texture` is a fixed sibling. PROVEN by planting `--grain-alpha: 0.90` — the sweep returned
  45/45 with both contrast checks green. The bound: the alpha TOKEN is guarded (verify-shell caps
  8% dark / 4% light), so what is exposed is a change that passes the cap while degrading real
  contrast. Today's ratios clear the floor on two independent measurements.
- `section-01-copy.md` is the one copy spec no harness parses, and the one that drifted. Accepted
  on its small surface; every §1 string is asserted against the page elsewhere.

**Deliverable:** the merge pushed with history intact, the four receipts and the §1 chip click-checked
green on the live page by the founder, and any 404 filed as a blocker before deploy.

IF BLOCKED: this step is already `Role: halt` because the remaining work is the founder's. An agent
resuming here for any other reason must not set `Role: halt` itself — file the blocker addressed to
PM and re-point `## Next Step` to a `Role: pm` assessment step.
```

## Upcoming` below) — history preserved,
not squashed, so the three pinned receipts in the footer don't 404. The founder's VERIFY
click-check is the step after that, and it is the one thing no runner can stand in for.

IF BLOCKED on a founder question: this is the one case where `Role: halt` is correct — record
the question in `## Founder Decisions` above.
```

## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

1. **The launch merge, history preserved** (DEC-063 §5). A squash merge collapses this branch and
   404s the three pinned receipts in the footer; `blob/main` survives either strategy, which is the
   second reason VERIFY is not pinned.
2. **The founder's VERIFY click-check on the live page** — the one thing no runner can stand in
   for, because only a real fetch proves reachability.

3. **The founder's THIS SITE telemetry snapshot** — founder-only work, no agent involvement
   (A-002, seed rule 4). §5's `OPERATOR ATTENTION` dash on the THIS SITE card is what it fills.
   Hard, gated at launch, and the one remaining blocker no agent can close.

## Done (Last 10)
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->

- 2026-08-01 — The terminal QA sweep (HO-049). All four counts re-derived cold, twice, serial:
  **308/308 · 27/27 · 108/108 · 45/45**, before and after one fix. **`cdp.mjs`'s unref'd send
  deadline is FIXED and proven** — an isolated repro shows the exact mechanism (unref'd timer +
  stalled call → silent exit 13, vs. a proper "CDP timeout" rejection once ref'd), then the full
  suite re-run green post-fix. **Six independent plants**, each different from the round's own:
  the contrast probe's blind-selector fix confirmed live; a texture-composited-contrast plant
  (SVG gamma, not `--grain-alpha`, which is guarded) passed every contrast check AND the ground
  patch check by relocating — proving three separate contrast-shaped checks (two DOM walks, one
  algebraic) are all blind to `.texture`; a sharper version of the same plant correctly failed,
  bounding the blind range; the narration-rail bottom-pin plant reproduced HO-045's own count
  exactly (4/40 vs 24/40); the §4 indicator plant reproduced DEC-065's regime exactly (fails only
  at 1600, not 1280). **Ruling on copy specs corrects the brief**: 5 of 6 copy specs ARE parsed
  (only `section-01-copy.md` is not) — judged an accepted risk, not a blocker. **Texture contrast
  independently re-measured per-pixel**: 5.61–5.75 dark / 5.13 light, both clear 4.5, numbers
  don't fully reconcile with HO-048's table but both clear with margin. One stale ledger note
  found (`refExists` widening already shipped in `42470b3`, "Upcoming" bullet never removed).
  **Recommendation: SHIP**, with two named non-blocking residuals (§1's copy spec, the
  texture-blind contrast checks). Closes HO-044, HO-045, HO-048 for PM's review.

- 2026-08-01 — Founder pick built: Developer ships the coarse ground grain (HO-048, DEC-067) —
  `baseFrequency 0.18` / 5 octaves, 280u tile at 392px, one declaration in `styles/base.css`, built
  from HO-047 §4's stated delta and **verified byte-identical to the f018 variant UI/UX measured**,
  with the decoded data-URI checked attribute by attribute (no `feFuncR/G/B`, gamma 2.6, saturate 0
  — nothing but frequency, octaves and tile moved). `page-shell.md` §5.1 rewritten to the shipped
  form only; the rejected-candidate record stays in the decision log. **All four runners green on
  the built tree, serial: 308/308 · 27/27 · 108/108 · 45/45 — nothing re-based, confirmed by grep
  (no harness literal names the frequency) rather than assumed.** Composited contrast re-measured
  per-pixel on the build, both themes: worst `--muted`-on-ground **5.14 dark / 4.82 light** against
  the 4.5 floor, reproducing HO-047's table exactly; WebKit confirmed applying the coarse filter
  in-engine (grain-off sd 0 → sd 1.41 at 6px feature size, pinned-height renders). Light stays
  quantisation-level as ruled. No WebKit at any phone width, stated. **Awaiting QA's terminal sweep
  and PM review.**

- 2026-08-01 — Founder-directed round, the grain's last: UI/UX varies `baseFrequency` — the lever no
  prior candidate moved — and renders three coarse forms plus the optional two-layer against CURRENT
  (HO-047). **The ruled diagnosis is confirmed on measurement**: feature size (autocorrelation
  length) goes 1px → 3 / 5 / 8px while worst-case contrast moves at most 0.15 and the dark ground's
  luminance does not move at all — the coarse lever is nearly free where every intensity lever was
  expensive. **Judged on 1:1 renders in both engines: 0.18 is the first form that reads as material
  rather than veil**, and is recommended; 0.09 is disqualified (staining, not tooth), the two-layer
  is disqualified on measurement (grit below perception as constructed — reported, not rescued with
  alpha). Tile rule derived and verified: ≥ ~50 base periods per side, no visible repeat at full
  viewport. WebKit applies every variant (2 → 3 / 6 / 12px in-engine); no WebKit at any phone width,
  stated. **The light theme is the round's honest negative** — no frequency is perceptible at the
  locked 0.04 alpha (span ≤ 2.5 of 255), ruled into `page-shell.md` §5.1 as a property. All four
  runners green on the proposed state (308/308 · 27/27 · 108/108 · 45/45), nothing to re-base.
  §5.1 rewritten to carry only the two live forms. **Awaiting the founder's pick — "ship CURRENT"
  remains a sound outcome, stated on the sheet itself.**

- 2026-07-31 — Founder-directed round: UI/UX measures the ground texture and renders the pick
  (HO-046). **The founder's premise is confirmed and understated** — on the light ground the shipped
  grain spans **2.0 levels of 255**, one step of 8-bit quantisation, so it is absent rather than
  faint; dark spans 7.5. STRONGER takes them to **5.0 and 16.3** by turning the pigment two-sided
  (`feFuncR/G/B linear`), lifting the alpha curve, and raising dark opacity 0.08 → 0.11 — the light
  theme's opacity does **not** move, measured: doubling it buys +23% where the pigment buys +150%.
  **Both vignettes verified untouched, light at its 5% cap.** Every composited pair holds above
  4.5:1 at the worst pixel with the vignette at its darkest (dark 4.92, light 4.71 against 4.5).
  Runners on the proposed state, serial: sweep **45/45**, audit **108/108**, verify-shell
  **306/307** with exactly one red — a hard-coded `--grain-alpha === 0.08`, to be re-based with the
  pick. **Two harness findings from running rather than reading**: no contrast probe on this page can
  see the texture at all (both walk ancestors for a `background-color`; `.texture` is a fixed
  sibling), and `bare ground renders at the locked value` survived only by *relocating* its patch —
  2.16 clear of a 2.5 tolerance. WebKit isolated as the gate and it applies the new primitives
  (pigment alone: spread 5.70 → 10.00); the first WebKit answer was an instrument artefact from
  `qlmanage` downscaling a 3000px document into its fixed square. Four levers rejected on
  measurement, including the most efficient one. No shipped file touched.
  **Awaiting the founder's pick, then Developer builds one form and deletes the other.**

- 2026-07-31 — Developer closes the founder's §2 rail defect (HO-045, `7c574b9`). The rail put each
  new entry's **bottom** on its own bottom edge, so every explanation arrived flush on the fold —
  **8 of 10 slots**, reproduced under live playback at 1280 and 1600 before anything was touched. It
  now **pages forward and lands the entry's top**, holds still while the entry already fits, clamps
  at the end of the list, and never travels backwards under a reader who has scrolled ahead.
  **All four runners green — 308/308 · 27/27 · 108/108 · 45/45.** The brief's diagnosis is corrected
  on measurement: the +3–5px overflow in its table is the `--reveal` transform, not a resting clip,
  so a containment check alone catches **4 rows of 40** and would have passed while the defect
  survived — the assertion that names the founder's complaint is **resting clearance**, red at
  **24 of 40**. Four checks added, none deleted; `restart()`'s rewind assertion untouched and still
  green. Three findings the brief did not carry: `section-02-replay.md` §10 claimed the rail should
  not need to scroll (it scrolls at every wide width, corrected); **`--bp-wide` is the true worst
  case** at 9.2px of margin and no runner was looking at it; and a **pre-existing harness hang
  reproduced on `HEAD` in a clean worktree** — `cdp.mjs` unrefs its own deadline, so a stalled call
  exits 13 instead of reporting the timeout its comment promises. **No WebKit evidence exists for
  this behaviour in any condition** — `qlmanage` runs no JavaScript. **Awaiting QA's terminal sweep
  and PM review.**

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

