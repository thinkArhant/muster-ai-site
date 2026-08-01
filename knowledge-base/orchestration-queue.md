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

<!-- Resolved 2026-08-01 — The grain pick is consumed: the founder ruled COARSE 0.18 (DEC-067),
     Developer built HO-047 §4's delta and deleted the losing form from `page-shell.md` §5.1 in the
     same commit (HO-048). All four runners green on the built tree, nothing re-based; composited
     contrast re-measured on the build (5.14 dark / 4.82 light against the 4.5 floor). -->


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

Round 3 of 3 is built and committed (HO-044). Everything DEC-062 through DEC-064 ruled is on the
page: §5's four prose lines and two-cell cards, §1 slimmed to the scope label and the chip with one
top-left mark, the footer's re-ruled sentence with its two nowrap units, and the two phone bugs
closed with an assertion each. Nothing is open to build.

Read first: `knowledge-base/agent-requests.md` HO-044 — every file changed, every assertion added
or re-based, and eighteen plants with what each turned red.

THE STEP. Run the terminal sweep DEC-062 decision 5 traded the per-wave re-runs for. Developer
reports all four runners green on the shipped tree with `git status` clean — verify-shell 304/304 ·
verify-webkit 27/27 · qa-independent-audit 108/108 · qa-fullpage-sweep 45/45 — so reproducing those
counts cold is the FLOOR, not the deliverable. The deliverable is judgment about what the counts do
not cover.

WORTH YOUR ATTENTION, stated so it is not rediscovered:

- Three couplings this round found by running rather than by reading, and one of them was a check
  going BLIND rather than red: the sweep's contrast probe skipped selectors it could not find, so
  retiring §1's cells silently dropped a surface from a check that still claimed to measure it.
  Hunt the same shape elsewhere — a check that cannot fail is worse than no check.
- Two behaviours have no WebKit evidence in any condition: §4's track end and §2's replay are
  JavaScript, and `qlmanage` runs none. Every phone figure in HO-044 is Blink's and labelled so.
- §4's indicator bug was neither hypothesis DEC-063 recorded — the cause was a visibility TIE from
  1600px up, broken by document order, so the last segment could never light on a wide screen at
  any scroll position. DEC-065 corrects the record. Verify the fix at 1600 and above, not only at
  1280, or the regression is invisible to you exactly as it was to every prior harness.
- One accuracy note on HO-043/DEC-064, disclosed rather than smoothed: the mark/chip overlap is
  real on the single-row strip (3.13px², measured) but did NOT exist on the strip as it shipped
  before this round — the mark sat 147.67px below the chip. The ruling is unaffected.
- The two documentation findings HO-044 left open are already CLOSED (commit `400a520`): the stray
  artifact is stripped and `section-01-copy.md` now states the strip that ships. Confirm, do not
  re-open. Note that neither file is parsed by any harness, which is why the drift was silent —
  that class of gap is worth a look.

OPERATIONAL NOTE, disclosed rather than left to be rediscovered: running two runners concurrently
against the same machine produced a `CDP timeout: Runtime.evaluate did not reply within 180000 ms`
once during this round. Re-run serially and it is green. It is contention, not a page defect — but
a timeout is a failure, so it is named rather than treated as noise. Run the runners SERIALLY.

**Deliverable:** a handoff in `agent-requests.md` naming PM as reviewer, carrying the four runner counts
re-derived cold on the shipped tree, the result of every violation you plant against this round's
new and re-based assertions, and an explicit launch recommendation — ship, ship with named
residuals, or hold with the blocker named. State what you MEASURED versus what you judged.

AMENDED 2026-07-31 — THE TREE MOVED UNDER THIS STEP. A founder-reported §2 defect was fixed after
this brief was written (HO-045, `7c574b9`): the narration rail pinned each new entry's bottom to
its own bottom edge, so explanations arrived flush on the fold. Read HO-045 before the sweep. Three
things change for you:

- **The floor counts are now 308/308 · 27/27 · 108/108 · 45/45.** verify-shell gained four checks
  and lost none.
- **The blind-check hunt has a fresh specimen.** A containment-only assertion on the rail passes on
  4 rows of 40 while the founder's defect survives — the assertion that catches it is resting
  CLEARANCE, and the difference is the 350ms reveal transform. Same shape as the contrast probe
  that went blind: a check measuring the wrong moment is a check that cannot fail.
- **A pre-existing harness hang is now reproduced on `HEAD`**, in a clean worktree: verify-shell
  exits 13 with "unsettled top-level await" at the find-in-page probe, intermittently, because
  `cdp.mjs` unrefs its own send deadline. A run that exits 13 is a stalled transport, not a green
  suite and not a page defect — re-run it, and count the re-run, not the abort.

AMENDED 2026-08-01 — THE TREE MOVED AGAIN. The founder ruled the ground grain coarse (DEC-067) and
Developer built it (HO-048): `baseFrequency 0.18`, 280u tile at 392px — one declaration in
`styles/base.css`, the losing form deleted from `page-shell.md` §5.1. Read HO-048 before the sweep.
The floor counts are UNCHANGED — 308/308 · 27/27 · 108/108 · 45/45, nothing re-based, because no
harness literal names the frequency. Which is the point for your blind-check hunt: **no shipped
runner can see the texture at all** (both contrast probes walk ancestors for a `background-color`;
`.texture` is a fixed sibling) — that gap is ruled yours in DEC-066/067. The composited floor was
re-measured per-pixel on the built tree (worst `--muted`-on-ground 5.14 dark / 4.82 light, floor
4.5), and no WebKit evidence exists for the texture at any phone width.

PM AMENDMENT 2026-08-01 — THE PATTERN IS THE ASSIGNMENT, NOT THE THREE FIXES.

Four separate checks in this closing round were found unable to fail. That is no longer a run of bad
luck; it is a class, and naming it is the highest-value thing this step can do:

1. The sweep's contrast probe skipped selectors it could not resolve (`if (!el) continue`), so
   retiring a surface silently dropped it from a check still claiming to measure it. **Blind.**
2. Both contrast probes resolve a background by walking ancestors, and `.texture` is a fixed
   sibling — so **no runner has ever measured the texture**, and the sweep prints 5.13:1 for a pair
   compositing at 4.83. Ruled yours in DEC-066/067.
3. `findGroundPatch` scans until a patch fits, so `bare ground renders at the locked value` can pass
   by **relocating** rather than by being true.
4. A containment-only assertion on §2's rail measured the wrong moment — settled rather than during
   the 350ms reveal — and would have passed on 36 of 40 rows while the founder's defect survived.

Common shape: **a check whose failure mode is silence.** Not a wrong threshold — an absent
measurement wearing a green label. Hunt that shape across the whole harness; it is worth more than
re-confirming counts four specialists have already confirmed. For each one you find, say whether it
ever protected anything.

Two calls that are yours to make, both stated so they are not assumed:

- **`cdp.mjs` unrefs its own send deadline** (`tests/lib/cdp.mjs`, in `send()`), so a stalled call can
  exit the process instead of rejecting with the method named — defeating the promise in that
  function's own comment, in exactly the case the deadline exists for. `clearTimeout` already fires
  on both settle paths, so the unref buys nothing. It is test infrastructure and therefore yours:
  fix it and say so, or rule it out of scope for launch and say why. **The gate's own
  failure-reporting path should not be the broken thing.**
- **Neither copy spec is parsed by any harness**, which is why `section-01-copy.md` drifted from the
  shipped page silently until a human read it. Judge whether that class needs a check before launch
  or is accepted as a documentation risk.

LEDGER STATE, so you do not read it as rot: `muster-requests-lint.sh` is red at ~405 active lines
against a 300 budget. HO-044, HO-045 and HO-048 are **legitimately open pending this sweep** —
PM reviewed and swept everything closable (HO-042, HO-043, HO-046, HO-047) and declined to fake
green by deleting live content. Your sweep is what closes the remaining three; PM reconciles at the
review immediately after.

IF BLOCKED: never set `Role: halt` — only PM does that, and only for a founder question. File the
blocker addressed to PM in `agent-requests.md` and re-point `## Next Step` to a `Role: pm`
assessment step.
```

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
