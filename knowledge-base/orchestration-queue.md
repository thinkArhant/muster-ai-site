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

- [2026-07-29] [PM]: **Gate B, item 1 — does the footer ship the seed's copy as written?** The footer
  currently renders a shell placeholder and cannot ship (DEC-054, hard launch blocker). The seed
  specifies the content in full, so no design question is open — but its "8 agents, 1 operator" line
  collides with item 2.
- [2026-07-29] [PM]: **Gate B, item 2 — may the page say eight agents built it?** Measured: five roles
  ran (pm 43 · developer 13 · ui-ux 9 · qa 7 · content 5 commits; marketing, legal and research never
  invoked). §1's `8 AI agents · 1 operator` captions a diagram of eight role names and is defensible as
  roster size; the seed's footer line states participation outright and is not true of this build.
  Roster framing, true-participation framing, or both stated separately? PM recommends keeping §1's
  caption and rewriting the footer line. See DEC-054.
- [2026-07-29] [PM]: **Gate B, item 3 — the three phone checks**, in the Next Step block below. Two are
  taste; the §2 playback one closes a hard launch blocker no harness on this machine can reach.

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

### 2026-07-26 Gate B — founder review: the assembled page

```
Role: halt

**Gate:** The whole page, desktop and phone, in one pass. §1 through §6, the brand mark, the spacing
system, and scroll-snap. **Three things need your word** — the packet opens with them: the footer
placeholder that ships today, the page's "8 agents" claim against the five roles that actually ran,
and the phone asks below.

**Also asked here, and it closes a hard launch blocker:** open §2 on your iPhone in Safari with the
toolbars showing and confirm both layers stay on screen for the whole playback. No harness on this
machine can prove it. **While you are there — does section snapping fight your scroll?** That is the
WebKit half of scroll-snap, and it is a manual check by ruling: `qlmanage` cannot scroll, and iOS
momentum is exactly where a proximity pull is most likely to feel wrong (REQ-007, DEC-042).
**And one more, ten seconds:** Find on Page for a phrase in the middle of §4 or §5 (`scarcest`,
`commit-days`) and see whether the match lands on screen. Chrome always does — measured, 0 of 165.
Safari's find alignment is the one thing DEC-053's ruling leaves unverified.

**Read:** `knowledge-base/wave-review.md` and write your verdict in its `## Verdict` section.

**Resume:** write your verdict, then run `muster/scripts/muster-sprint-resume.sh` — **not** the driver
directly. Resume spawns a PM that turns your findings into fix steps. **Any fix round it creates must
end with a scoped QA re-run** of the relationship assertions plus cross-engine on whatever was touched:
three Sprint-1 fix rounds each satisfied their criterion and broke something adjacent, and a fix chain
with no verification behind it is how that happened.
```


## Upcoming
<!-- Ordered sequence of remaining steps for this sprint. -->

_Empty — Gate B is the sprint's last step. Resume turns the founder's verdict
into the fix round._


## Done (Last 10)
<!-- Completed steps, newest at the top. Growth rules: Done keeps max 10 entries (trim oldest on overflow). PM clears Done entirely at each new sprint. -->
<!-- Format: - [DATE] [Agent]: [One-line summary] -->

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

- 2026-07-29 — Step: Developer §3 and §4 (HO-027). §3 reads as one passage — kicker and paragraph
  byte-equal to the copy file, zero numerals, the 64ch column measured — and its sentence-boundary
  wrap is asserted as a rule rather than a line count. §4 ships DEC-044's four decisions verbatim
  in order on the Gate A treatment, in HO-032's paged track: all four sheets equalised at 473.33px,
  the 360.0px peek reproduced, the mechanism mark 2px at a token-read 12.00px seat with zero rust
  text, and the track's bottom edge inside a 700px screen under the sticky bar. Contrast measured
  in both themes at the spec's own figures (13.23/13.64 ink, 5.16/5.76 muted). `scripts/test.sh`
  GREEN both engines (**230/230 + 21/21**); the audit exits zero, 107/107, twice. Six assertions
  planted and watched go red. **Awaiting PM review at the build-review step; OBS-009 asks PM to
  rule one clause of `section-04-decisions.md` §12.16 — with the track's proximity snap on, a
  `scrollIntoView()` on off-canvas content lands the match part-visible, and no declaration in the
  section's ruling overrides that.**

- 2026-07-28 — Step: Developer §1 and §6 (HO-026). The sparse hero, the command and the proof link
  ship: the headline's computed name read from the AX tree (`SHIP A PRODUCT WITH AN AI TEAM.`, the
  struck phrase absent), the formation announcing hub `PM` → seven specialists with the bus width
  equal to the plate row, the fold contract measured (hub + four whole plates above 553 at 375, hub
  + three at 320), the remnant's dashes inert, and `VERIFY.md` written at repo root — a hard launch
  blocker closed. The `http(s)` guard was **narrowed, not deleted** (fetching references fail, an
  inert URL and an `<a href>` pass, prefetch hints fail) and **proven to go red** with planted
  references. `cdp.mjs`'s `send()` now has a named deadline and the `--text-display` floor landed
  with its own assertion. `scripts/test.sh` GREEN both engines (197/197 + 15/15); **the independent
  audit exits zero, 107/107, twice consecutively** — two real defects and six changed-subject
  assertions fixed on the way. Awaiting PM review at the build-review step; OBS-006 asks PM to rule
  whether the queued audit-repair step still has a subject.

- 2026-07-28 — Step: UI/UX Gate A fix round (HO-032). §1 recomposed to the sparse hero with the
  formation's real design pass and a rendered fold budget (four whole plates above the 375 fold,
  every figure re-rendered and reproduced); the remnant ruled a one-row instrument strip; §1 fully
  static with the motion budget re-stated at two live elements + cursor; §4 ruled a horizontal
  paged track at desktop (612.1px content bottom — the only candidate that fits one screen) and
  stacked on phone with its cost stated (DEC-051); kicker wrap rule homed in `page-shell.md` §3;
  `scripts/test.sh` re-run GREEN. Awaiting PM review at the build-review step; two DEC-046 cascade
  gaps in PM-owned files flagged as OBS-002/003.

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




