# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

_None._

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-29 HO-030 — the content-complete page swept end to end: every criterion measured, and every load-bearing check watched to fail

**Type:** handoff
**Producer:** QA
**Deliverable:** `tests/qa-fullpage-sweep.mjs` (new), `knowledge-base/pre-launch-checklist.md`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] Developer — FYI: OBS-015 is a defect in `verify-shell.mjs`'s reported evidence, not in its verdicts.
  No shipped file was touched by this step.

**The result, stated first: every acceptance criterion passes.** Three harnesses on the reverted tree —
`scripts/test.sh` **GREEN both engines (273/273 Blink + 27/27 WebKit)**, `qa-independent-audit.mjs`
**exit 0, 108/108**, and the new sweep **42/42 with 2 measurements reported**. Two things are open and
neither is a failing check: OBS-015 below, and the footer placeholder that no sprint step owns.

**What the new file is for.** The section harnesses assert §2, the palette and the accessibility floors.
Six criteria had no instrument at all: the copy matrix across the whole page *and* `VERIFY.md`, §4's
stamps, the motion budget as a count, the counting cells' announced value during playback, scroll-snap
as behaviour, and complete content with motion off / JS off section by section rather than for §2 alone.
`tests/qa-fullpage-sweep.mjs` is those, written from the specs rather than from the build harness.

**Per criterion**

- **Cross-engine parity — PASS, with the Blink-only half named.** WebKit (27/27, QuickLook) carries real
  geometry, not just ink: the header pennant sits **0px off the wordmark's baseline** in both themes,
  §4's mechanism marks measure **17/35 = 0.486 of the card's padding** in both themes against the
  12-in-24 midpoint the token seats them at, §5 renders **14 rust clusters of measured digits and 4 ink
  dash clusters (26×3–26×4 px), zero rust dashes**, both themes — and QuickLook ran no JavaScript, so
  that is the no-JS path rendering the authored values. Ground and grain agree across engines (Blink
  mean 20.12/σ2.847 · WebKit 19.834/σ2.563). **Blink-only, stated plainly**: everything behavioural or
  computed — the AX tree, network instrumentation, playback timing, the count-up, scroll-snap, keyboard
  paging, 200% zoom, and every mobile-width measurement (`qlmanage` renders at a fixed ~1024² and runs
  no JS). §1's formation and §6 have WebKit renders looked at by eye (HO-026) but no WebKit assertion.
  The scroll-snap WebKit half is a **labelled manual check** at Gate B by ruling (DEC-042), not reported
  as a mechanical result.
- **Zero runtime network requests — PASS, and the guard was proven able to fail.** Clean tree: 10 loads,
  all `file:`/`data:`, none external, dark and light and through a full playback. **A fetching reference
  was planted and the run went red naming both sites exactly** — `index.html:441 img[src]` and
  `styles/sections.css:162 css url()/@import` — with the DOM guard also red
  (`IMG[src]=https://raw.githubusercontent.com/…`) and three zero-request checks red alongside. Plant
  removed, tree reverted clean, re-run green. **The §6 anchor stayed permitted throughout**, which is
  what makes this a narrowing and not a deletion.
- **Contrast, landmarks, focus — PASS.** Eight text pairs recomputed from resolved colours in both
  themes, every one over 4.5:1: dark 14.37 / 13.23 / 5.61 / 5.16, light 12.15 / 13.64 / 5.76 / 5.13
  (body prose · §4 row values · §1 caption · micro labels). Header/main/footer are siblings, all six
  sections labelled by a heading they contain, one `h1`, `lang=en`. **Seven keyboard stops driven by
  real Tab presses, every one painting a 2px ring** — skip link, VERIFY chip, log, narration list,
  playback control, §4 track, GitHub link.
- **The §1 headline's accessible name — PASS, read from the AX tree.** `Accessibility.getPartialAXTree`
  computes `SHIP A PRODUCT WITH AN AI TEAM.` while the rendered text is
  `Ship a product with a human an AI team.` — the struck phrase absent from the name, present in the
  render. Planted red: with `aria-hidden` off the strike, the name carries the struck phrase.
- **Reduced motion and no-JS — PASS, all six sections.** Character-identical to the motion path in every
  section under `prefers-reduced-motion: reduce` (0 animations running) and with script execution
  disabled (`window.MusterCountUp` confirmed `undefined` first, so the condition is real). **Two strings
  legitimately differ and are measured rather than diffed away**: the playback control, which the spec
  says is absent because there is nothing to control (motion path offers `⏭ SHOW FULL LOG`, static paths
  offer nothing), and the beat indicator's live position — motion at load reads `BEAT 01 / 06 · QUEUE
  ADVANCES`, static reads `BEAT 06 / 06 · THE HUMAN GATE`, the end state, `aria-hidden` either way.
- **§2 fidelity and corpus integrity — PASS, proven from git.** The audit diffs all twelve rendered log
  lines and all ten narration slots byte-clean. Independently: `git diff HEAD` on
  `bodh-sprint4-corpus.md`, `product-spec-seed.md` and `direction-reference.html` is **empty**; the
  corpus's entire history is **two founder commits** (`5d3b33c`, `025842c` — Kanwar Sandhu) and its
  working-tree blob hash `3cdf654e…` equals `HEAD:`'s. No agent has touched founder source.
- **Relationship assertions — PASS, each family planted and watched go red.** Eight violations across
  three runs, tree reverted clean each time. `--scroll-pad` hardcoded to `48px` → *"scroll padding is
  the measured bar plus one rhythm, never a hardcoded 72"* red, and three further relationships red with
  it (bar-rule clearance dropped to 8.3px against the 12px floor; reduced-motion padding; the
  start-aligned pull). `--text-display` floor raised → §1's fold guarantee red at **both** 375 and 320.
  `--mark-clear: 0ch` → R2 red at three playback states. §4's mark inset written as a literal `8px` →
  red at desktop **and all four phone widths, naming 8 against a token of 12**. §5's reserved sub-line
  track removed → cross-card alignment red (`COMMIT-DAYS 112px vs 83.5px`). §2's exemption class removed
  → the snap-set check red. A stamp transposed to `2026-06-31` → red in both harnesses. One character
  changed in §6's curl → *"the curl is one string in three places"* red. **13 checks red on the first
  batch, 5 on the second, 6 on the guard batch.**
- **Scroll-snap — PASS on all three.** Keyboard paging: real `PageDown` events walk 4083px of scroll to
  the end in **7 presses, strictly advancing, no repeated rest** (`mandatory` was the failure mode this
  guards, and it took 60 presses at 375×553 when the Developer planted it). Find-in-page: **0 of 165
  text leaves land off screen under centre-if-needed**, which is what the engine's own find does. 200%
  zoom (720×450 @2): every section's last content lands whole and clear of the bar, `scrollWidth 720 ≤
  clientWidth 720`. Every section start comes to rest clear of the bar (+48 to +227.91px).
- **`VERIFY.md` — PASS.** Present at repo root, 77 lines; §1's chip `href` reads `VERIFY.md` and the
  target exists, asserted rather than eyeballed. **Hard launch blocker ticked.**
- **The curl, actually run — PASS.** `HTTP 200`, **16377 bytes**, no redirect (effective URL is the one
  the page prints). What comes back is a real bash script — `#!/usr/bin/env bash`, `set -euo pipefail` —
  and it **parses clean under `bash -n`**. Deliberately **not executed**: proving the URL serves the
  setup script does not require running a project generator. §6's GitHub link answers 200. **Hard
  launch blocker ticked.** This was the one network request the step permits.
- **The copy matrix — PASS, across all sections, the header, the footer and `VERIFY.md`.** No
  `muster.build`; **20 competitor names swept, zero hits** (DEC-047); no banned adjective, no exclamation
  mark; "proven"/"guaranteed" absent (R6); **"context engineering" exactly once, in §3**. Gate A
  negatives hold: **§1 carries none of the eight Bodh tokens** — no measured line, no BODH row, no hero
  terminal (DEC-046). `9.3 h`, `$147` and `4.8 h` each appear **exactly once on the whole page, all
  three in §5** (DEC-048); no wave-scope figure (`~64`, `289`, `$24.73`) in §1 or §5. All three scope
  labels ride with their values; THIS SITE is four em-dashes with `measured at launch` beside it and no
  numeral in the card. `VERIFY.md` states the three scopes separately, its THIS SITE row is
  `— · measured at launch` with no numeral past the scope column, it carries no cross-scope aggregate,
  its curl is byte-equal to R12's verified form, and its `8 AI agents · 1 operator` line is qualified as
  roster size rather than this build's participation.
- **§4's four stamps — PASS, byte-exact and in DEC-044's order.** `framework — 2026-04-24` ·
  `framework — 2026-06-13` · `framework — 2026-04-12, first commit` · `framework — 2026-06-07`.
- **The motion budget as a count — PASS.** Enumerated off the built page, not impressed: **three looping
  seats, all pulse or cursor** — `#header pulse`, `#watch-it-ship pulse`, `#get-started cursor` (the
  lamp is one motif at two seats, drawn by `pulse-ring ×4` + `pulse-core ×2`; `cursor-blink ×1`). The
  count-up is ambient element two: JS, gated, one-shot per load, 8 cells. **The 44 running transitions
  are all inside `#watch-it-ship`** — §2's opacity reveal, which ends, and which DEC-015 already rules is
  not a fourth ambient element. Nothing over budget.
- **The counting cells' live-region posture — PASS, verified during playback.** Across one roll the
  visible string takes **76 distinct states and the announced string takes one** — `ACTIVE BUILD 9.3 h`
  — settling on the authored `9.3 h`. Read independently mid-roll from `Accessibility.getFullAXTree`
  while the cell visibly showed `5.9 h`: the tree carries `9.3 h` and `4.8 h`, **no intermediate, and
  zero nodes with a live property**. A page-wide sweep of `aria-live`, `aria-atomic` and the five live
  roles returns nothing. Matches HO-028's stated posture and DEC-052 exactly.

**The one finding: a failure detail that cannot report a failure** (OBS-015)

Planting §2's snap exemption away turned *"§2's exemption holds as a property"* **red** — correctly —
while printing `1280x900: 0 of 13 gated rests moved · 375x553: 0 of 3 gated rests moved`. The `0` is a
**literal in the template string**, not the measured count. The run's own report says
`moved: 12` at 1280×900. The verdict is sound and the assertion is falsifiable — this step proved that —
but **the figure is a constant, and HO-029 quotes that exact string as its evidence** that the exemption
holds. PM should read that line as "the check was green," not as a measurement. Same class, milder: the
zero-request checks print `none external` inside their own red output while listing the two planted
resources. Both are in `verify-shell.mjs`; **nothing was edited** — it is the Developer's file and HO-029
is in front of PM right now.

**Two measurements reported, not asserted**

- **OBS-013 re-derived independently**: **20 of 165 text leaves** land off screen start-aligned with
  snapping on. The Developer measured 20 of 128 — same twenty, different denominator (a different leaf
  predicate), so the two agree rather than conflict.
- **The footer placeholder still ships**: `PROVENANCE LINE AND LINKS SHIP WITH THEIR OWN SPEC.` renders
  as the last string a reader meets after the curl. That is OBS-012, corroborated. It is reported rather
  than asserted **on purpose** — a red check would misreport a known open item as a sweep failure.

**Verification**

- `bash scripts/test.sh` — **GREEN both engines, 273/273 + 27/27**, on the reverted tree.
- `node tests/qa-independent-audit.mjs` — **exit 0, 108/108**, twice this session.
- `node tests/qa-fullpage-sweep.mjs` — **42/42, exit 0**, 2 measurements reported.
- `git status --porcelain index.html styles/` empty after every plant batch.

**Revision log:**
- 2026-07-29: Filed. Self-review caught and fixed four defects in this sweep's own checks before any of
  them were relied on: three regexes written with double-escaped `\\d` in plain Node source (so the §4
  stamp check matched a literal backslash and could never have failed on a transposed date); a
  reduced-motion content diff that counted the playback control and the beat indicator as missing
  content, which would have reported a spec-mandated absence as a defect; a `measured at launch` check
  written case-sensitive against text the page sets in uppercase; and a motion inventory that counted
  §2's 44 one-shot transitions as ambient elements. **The copy matrix originally swept `main` only** —
  the footer, which is where the one placeholder lives, was outside it. Now swept.

**Observations** (non-blocking, for PM):
- OBS-015 — `verify-shell.mjs`'s §2-exemption check prints a hardcoded `0` where its measured `moved`
  count belongs, so its evidence line reads identically on a red run and a green one.   Severity: low
  Evidence: with the exemption planted away the check went red while printing "0 of 13 gated rests
  moved"; `tests/artifacts/blink-report.json` → `evidence.snapS2Sweep` recorded `moved: 12` at 1280×900
  and `moved: 0` at 375×553 in that same run. The zero-request checks print `none external` on red the
  same way.
  Suggested action: PM routes a one-line fix to Developer, and discounts the quoted figure in HO-029's
  §2-exemption bullet when reviewing it. The assertion itself is sound and falsifiable — proven here.
- OBS-003 corroborated with a measurement, not just a read. `foundational-assumptions.md` A-007's notes
  still say "Exactly three live motion elements plus the curl cursor — a fourth is a deviation." The
  built page runs **three looping seats — the pulse motif at two seats and one cursor — plus the JS
  count-up**, which is the amended two-elements-plus-cursor budget, not three. The page is right and
  A-007's notes are stale; a future agent measuring against A-007 as written would either report a false
  deviation or accept a real one.   Severity: med (unchanged)
  Evidence: `tests/artifacts/qa-sweep-report.json` → `evidence.motion`.
  Suggested action: as OBS-003 already says — PM amends A-007's notes. Noted here because this step is
  the first time the count was measured off the built page rather than read off a spec.

### 2026-07-29 HO-033 — the audit can no longer hang: its last unbounded wait is bounded and named

**Type:** handoff
**Producer:** QA
**Deliverable:** `tests/qa-independent-audit.mjs`, `tests/verify-webkit.mjs`, `tests/lib/cdp.mjs`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] Developer — FYI only; no shipped file was touched

**The headline, stated plainly first**

The audit **already exited zero when this step opened** — 108/108, twice, before a line was changed.
So the step's literal deliverable was satisfied on arrival, and OBS-006 was right to ask whether it
still had a subject. It did, but a different one than the brief assumed: the audit could still
**hang**, and a harness that can hang without saying so is not repaired just because today's run
happened to finish. That is what this step closed.

**The cause, named with evidence**

`quickLook()` invoked `execFileSync("qlmanage", …)` with **no timeout**. That is the run's only
unbounded external wait, and its failure mode is exactly the reported symptom: this file collects
every result and prints the whole report at the end, so a stalled render produces **zero output**,
forever, indistinguishable from "still working." `cdp.mjs`'s `send()` deadline (HO-026) does not
reach it — a synchronous child process is not a CDP reply.

Proven, not argued, by planting the stall and watching both behaviours:

- **Pre-fix**: a `qlmanage` shim that sleeps was put first on `PATH`. The audit reached it ~6 min in
  and then sat **blocked inside it for 120 s straight** (sampled every 5 s), with **0 lines of
  output**, and had to be killed. It was never going to exit.
- **Post-fix**: the identical plant now **fails named in 60 s, exit 1** —
  `QuickLook timeout: qlmanage did not return for dark-s02 within 60000 ms (waited 60002 ms, source …)`.
  Same plant, same machine, opposite outcome.

**The brief's leading hypothesis was tested and is not supported.** The step named the injected 250 ms
`SAMPLER` interval competing with the replay under the 375 × 553 chain, and said to bisect it rather
than assume it. Bisected: a worktree at `bded0dd` — the exact commit at which the hang was reported
(HO-025 / REQ-008), carrying that same `SAMPLER` and that same mobile chain — **runs green, 106/106,
exit 0**. The mobile chain also holds its timing in every run here (worst drift 16.4 ms). Nothing
supports the sampler as the cause, and it was not changed.

**What that leaves honest, and what it does not**

The original hang is **not reproducible from the committed tree**. So this is not a claim that the
unbounded `qlmanage` wait is provably the thing that hung that session — nobody can claim that now,
and inventing a culprit would be worse than saying so. What is proven: it was the one wait in the run
with no ceiling, it fails exactly the way the report described, and it is the kind of stall a machine
under load produces (`qlmanage` is a client of a system daemon, not a self-contained renderer). It can
no longer hang silently, and if it stalls again the run says which render and for how long.

**Scope**

- `tests/qa-independent-audit.mjs` — bounded render, named error. No check added, removed, or altered;
  the count is 108/108 either side of the change, so **no criterion needs re-justification**.
- `tests/verify-webkit.mjs` — the identical unbounded `qlmanage` call, given the identical guard. A
  deliberate companion fix, disclosed rather than folded in quietly: it is the same defect in the
  suite that gates every step, and leaving the twin unbounded would have been a half-fix.
- `tests/lib/cdp.mjs` — the WebSocket handshake awaited `open` with no deadline (the reply path has
  had one since HO-026; the handshake did not). Same class, 30 s ceiling.

**No shipped file was touched** — the repair is entirely in the audit's own machinery, and the page's
behaviour is byte-identical.

**Verification**

- `node tests/qa-independent-audit.mjs` — **exit 0, 108/108, twice consecutively**, post-fix.
- `bash scripts/test.sh` — **GREEN both engines, 273/273 + 27/27**, post-fix.
- Planted stall goes red, named, in 60 s (above). Scratch worktree and `PATH` shim removed; tree
  carries only the three harness files.

**Revision log:**
- 2026-07-29: Filed. Self-review caught: the first draft was going to report "the audit exits zero,
  cause was fixed upstream in HO-026" — which is true and useless, because it names no mechanism and
  leaves the hang able to recur unnamed. Re-scoped to the wait itself. Open question: OBS-014 below.

**Observations** (non-blocking, for PM):
- OBS-014 — the reported hang (REQ-008) does not reproduce from the committed tree: the audit at
  `bded0dd`, the commit it was reported against, exits zero 106/106 today. Two sessions saw it hang,
  so the report was not wrong; it was environment-dependent.   Severity: low
  Evidence: worktree run at `bded0dd`, 106/106 exit 0; the pre/post plant results above.
  Suggested action: none beyond noting it at the build review — the structural fix stands on its own
  evidence and does not depend on that diagnosis being settled. This also closes OBS-006's question
  ("does the queued audit-repair step still have a subject?"): it did, and this is what it was.
- `muster-requests-lint.sh` reads 764/300 on the Active budget with this entry filed. That is OBS-010
  unchanged, not a new finding: six handoffs are in review against a single queued PM review step,
  which is the plan's shape. No entry here is closed-but-unswept.

### 2026-07-29 HO-029 — the page comes to rest on section starts

**Type:** handoff
**Producer:** Developer
**Deliverable:** `styles/{base,tokens,chrome,replay}.css`, `index.html` (§2's exemption class),
`tests/verify-shell.mjs`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] UI/UX — one clause of `page-shell.md` §7.1 disagrees with the engine; see OBS-013
- [ ] QA — consumes the built behaviour at the full-page sweep (not a review gate)

**What shipped**

- **Four declarations, entirely in the user agent.** `scroll-snap-type: y proximity` on `:root`,
  `scroll-snap-align: start` on `.section`, `.section--no-snap` on §2, and the reduced-motion query
  that turns snapping off. No script reads, writes or intercepts the page's scroll position — and
  that is now asserted against the shipped source, not stated: the check reads `scripts/*.js` and
  fails on `scrollTo`, `scrollBy`, `scrollIntoView`, `scrollY`, `pageYOffset`,
  `documentElement.scrollTop` or `scroll-behavior`. §2's log moving its own scrollback is a
  different thing and stays.
- **`--bar-h` and `--scroll-pad` are tokens, and the bar's height now comes out of the token it is
  derived from.** The status bar's `block-size`, the playback core's ceiling
  (`calc(100dvh - var(--bar-h))`, two sites in `replay.css` that carried a literal `3rem`) and the
  scroll padding are the same measurement three times over; they can no longer drift apart. The
  padding is asserted as the **rendered** bar plus `--rhythm` — 72px = 48 + 24 — never as 72.
- **§2's exemption is declared in the markup it belongs to**, as a modifier class matching
  `.section--hero`, and it is proven as a property rather than inferred from §2's height: sweeping
  every rest position across §2 at a 40px step, **0 of 13 gated rests moved at 1280×900 and 0 of 3
  at 375×553**.
- **The snap set is exactly five sections**, §4's four sheets snap to their own track and never to
  the document (nine snap areas, all `scroll-snap-stop: normal`), and §2's terminal log does not
  quantise its own scrollback.
- **Nothing in the motion budget changed.** Snapping is the user agent settling a scroll the reader
  started; it runs on no timer and is off entirely under reduced motion, where `--scroll-pad` stays
  on so anchors, the skip link and find-in-page still clear the bar.

**Two harness defects found on the way, both of which would have passed a wrong build**

- **The §2 sweep compared a number against itself.** Blink applies the snap *inside* the scroll
  call, so reading `scrollY` back after `scrollTo` reports where the engine put you, not where you
  asked to be. Written that way the sweep could not fail — proven by planting `mandatory` **and
  removing §2's exemption**, which it passed. The aim is now the offset requested and the core's
  visibility is computed from its own document rectangle; the same plant now turns it red at **12 of
  13** gated rests. Worth noting for the spec's own reasoning: the phone half stays at 0 of 3 even
  with the exemption removed, because §2 is far taller than the snapport there and the oversized-area
  rule gives its interior back as a free range. §7.1 says a height is not a promise; the sweep is
  the evidence that the *declaration* is what holds this at desktop.
- **§2's gate check no longer created the condition it asserted.** It relied on
  `scrollIntoView({block: "center"})` leaving the core under the bar — true only while nothing
  declared where a scroll-into-view lands. `--scroll-pad` shifts a centred landing by half the
  padding, and centring now leaves the core 96% visible, which is the gate correctly running. The
  contract is unchanged and the setup now parks a measured 15% of the core behind the bar and asserts
  the chain refuses to start, reporting the share it measured.

**Find-in-page: what was asserted, and the cost that came with it**

§7.1's A11 names one paragraph and the default `scrollIntoView()`. It is run instead over **every
text leaf on the page** — a match is not a nominated element — under both alignments, because they
do not behave the same:

- **Centre-if-needed, which is what Chrome's find actually does**: leave a visible match alone,
  otherwise centre it. **0 of 128 leaves at 1280×900 and 0 of 118 at 375×553 land off screen.** A
  centred match sits half a viewport from either edge, which is more than the proximity pull can
  spend.
- **Start-aligned, the default `scrollIntoView()` A11 was written against**: **20 of 128 at
  1280×900 and 3 of 118 at 375×553 land off screen entirely.** With snapping off it is 0 of 127 and
  0 of 126, which is what identifies the pull as the cause rather than the alignment. §7.1's
  paragraph — §4's last value at desktop — is one of the twenty: the call aims at 2851 and the
  engine settles it at 3031, §5's own snap start, 180px past, leaving the target above the fold.

The page ships one start-aligned mechanism, fragment links, and every fragment target it has is a
section start — which *is* a snap position, so the pull has nowhere to take it: `#main` lands at
+0px at both viewports, asserted. Focus scrolling is asserted too. **The residual is a target deep
inside a section, reached start-aligned, which nothing on this page currently does.** That is
OBS-013, and nothing was invented to paper over it.

**Verification**

- `bash scripts/test.sh` **GREEN both engines** — **273/273 Blink** (was 256/256) and **27/27
  WebKit**; 17 checks added.
- `node tests/qa-independent-audit.mjs` **exit 0, 108/108, twice consecutively.**
- **Eight violations planted and twelve assertions watched go red**, tree reverted clean each
  time: the declaration
  moved to `body` (the scroller reports `scroll-snap-type: none` — the silent-inert trap §7.1
  names), `y mandatory` (caught on the serialisation, and it also took PageDown to 60 presses
  without reaching the end at 375×553 and left four sections' last content unreachable at 200%
  zoom — the spec's two stated reasons for refusing it, measured), a hardcoded `48px` padding (red
  on the derivation, and it dropped the bar-rule clearance to 8.3px against the 12px floor),
  `scroll-snap-stop: always`, a `scroll-snap-align` on `.log__line` (12 strays named, each with
  `ol.log` as its container), §2's exemption removed, the reduced-motion query deleted, and a
  `global.scrollTo` planted in `count-up.js` (named at `count-up.js:40`).
- **Cross-engine**: the static page is unchanged in WebKit — 27/27, and `webkit-dark-s02.png` read
  by eye. **Scroll behaviour has no mechanical WebKit result and none is reported as one**:
  `qlmanage` cannot scroll (REQ-007, DEC-042). Safari desktop and one iPhone pass are the Gate B
  ask, recorded as manual.

**Would Apple ship this?** Yes. The feature is four lines that make the composition's own rule —
one idea per screen — true of where the page stops, and it is removable with zero layout
consequence. The reservation is OBS-013: on a page that argues by craft, "the find took you past
it" is not a sentence you want a skeptic to be able to write, even if no link on the page does it
today.

**Revision log:**
- 2026-07-29: Filed. Self-review caught and fixed: the §2 sweep's read-it-back aim (a check that
  could not fail), a focus assertion that demanded "whole and clear of the bar" from a control
  2748px tall in a 505px band — the engine centres those, measured identical with snapping off —
  and a `.log` scroll-container assertion written on content overflow, which is true on a phone and
  false at 1280×900 where the log fits. Open question: OBS-013 below — §7.1's A11 as written cannot
  be satisfied, and whether that cost buys a mechanism is UI/UX's call.

**Observations** (non-blocking, for PM):
- OBS-013 — `page-shell.md` §7.1's A11 cannot be satisfied as written: a start-aligned
  `scrollIntoView()` on §4's last value is pulled 180px past it, off screen. §7.1 §"Proximity,
  never mandatory" argues proximity's bounded pull "is what keeps a match on screen"; that holds
  for the alignment find-in-page uses and not for the one A11 names.   Severity: med
  Evidence: `tests/artifacts/blink-report.json` → `evidence.snapFindLike` — 20 of 128 leaves off
  screen start-aligned with snapping on, 0 of 127 with it off, 0 of 128 centre-if-needed. The spec
  was not edited; UI/UX owns that file.
  Suggested action: PM rules at the build-review step — amend A11 to the two checks that shipped,
  or spend a mechanism on it. Note this is the second instance of the same trade (OBS-009 is the
  x-axis half inside §4's track), so the two are one ruling, not two.
- `muster-requests-lint.sh` reads 676/300 on the Active budget with this entry filed. That is
  OBS-010 unchanged, not a new finding: five handoffs are in review against a single queued PM
  review step, which is the plan's shape. No entry here is closed-but-unswept.

### 2026-07-29 HO-028 — §5 built: the whole-product numbers come home, one scope per card

**Type:** handoff
**Producer:** Developer
**Deliverable:** `index.html` (§5), `styles/{sections,motifs,base}.css`, `scripts/count-up.js`,
`tests/verify-shell.mjs`, `tests/verify-webkit.mjs`, `tests/qa-independent-audit.mjs`,
`knowledge-base/{pre-launch-checklist,decision-log}.md`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] QA — consumes the built section at the full-page sweep (not a review gate); one change lands
  inside `qa-independent-audit.mjs` and is called out below

**What shipped**

- **Three prose lines and two four-key cards, every string read off the deliverable at test time.**
  The three prose lines come out of `section-05-copy.md`'s fences and the eight keys, eight values,
  two scope labels and two sub-lines out of its §4.1 table — parsed, never retyped, so a smart quote
  or a transposed scope label shows as a diff. The provenance line renders as prose: founder
  testimony does not dress as telemetry, which is why §5 has two cards and not three.
- **The four BODH figures are additionally diffed against the founder-authored seed's Measured data
  table** — `9.3 h`, `4.8 h`, `4`, `$147`, and `Jul 11–18` under the count it qualifies. The page is
  checked against the measurement, not only against the transcription of it, so a figure that
  drifted in the copy file is caught rather than blessed.
- **§5 is the primary site, asserted as a count.** `9.3 h`, `$147` and `4.8 h` each appear **exactly
  once on the whole page**, and the section that carries each is named — `shipped-with-muster`.
  §1 gave up its readout at Gate A, so a second rendering anywhere now fails this check whatever it
  says. No wave-scope figure (`~64`, `289`, `$24.73`) appears anywhere in §5.
- **Measured is rust, unmeasured is ink.** Card 1's four values are flat accent at 30px, tabular;
  card 2's four are `--ink` em-dashes under one card-level `measured at launch`, and they carry
  `data-countup` **on purpose** — the engine's refusal to animate a value with no digits is now a
  property of the shipped page rather than of a fixture. State `static`, `animation-name: none`,
  transition 0.
- **The two cards align key for key.** Every cell is the same three tracks — key, value, sub-line —
  and the sub-line's track is reserved whether or not that cell has one. Only one of eight cells
  carries a sub-line today; without the reserve the pair went ragged from the third row down, which
  is what the first run measured (112px against 83.5px) before the fix. Asserted as the
  relationship, not the figure: equal cell heights at 320/360/375/390/1280 and equal tops side by
  side at desktop, with "every key sets on one line" asserted alongside as the precondition the
  shared track depends on.
- **§5 declares no motion of its own.** Zero animations and zero transitions in the section; the
  count-up is JS and gates itself. §5 holds the motion budget's second seat without a declaration in
  `sections.css`.
- **R9 holds**: the section exposes no focusable element at all — `bodh.day` is text, not a link.
  One `<h2>` and nothing deeper.

**The live-region posture — decided, and neither of the obvious options (DEC-052)**

No element on the page carries `aria-live`, `aria-atomic` or a live-region role. A polite region over
a 1.2s roll re-announces every frame — **measured at 100 distinct rendered values in a single roll**
— so a screen reader would hear dozens of numbers that were never true and the measured one last.
Assertive interrupts. Silence alone is not enough either: a reader landing mid-roll is read whatever
is on screen. So the digits leave the accessibility tree for exactly as long as they are wrong — the
rolling span is `aria-hidden` and a visually hidden stand-in carries the exact final string, both
gone when it settles.

**Verified during playback, against real page cells, three ways.** Across one roll the visible string
takes **100 distinct states and the announced string takes one**. The accessibility tree read
mid-roll via `Accessibility.getFullAXTree` carries `9.3 h` and `4.8 h` and **no intermediate**, with
zero nodes carrying a `live` property. And a page-wide sweep finds no live region in the markup. The
first two are independent: with the shroud removed, "the count-up fires and lands exactly" still
passes while both accessibility checks go red.

**One change inside QA's audit, and why it is not a hole** (QA review item)

`qa-independent-audit.mjs`'s full-ink rule collects every `p, li, dd` whose colour is not `--ink`. A
readout **value** is the one thing on this page deliberately neither ink nor muted — `page-shell.md`
§8 sets it in accent at `--text-readout` — and no such element existed on the page until this step.
It is excluded from that rule and held to a **stricter** one instead: every readout value is asserted
accent (or an ink dash) at or above §2.3's 24px accent floor, tabular, in both themes.

Self-review caught that the first version of that rule keyed "unmeasured" on the CSS modifier class,
which meant **a dash painted rust passed the audit** while both engines' harnesses caught it. It now
derives unmeasured from the content — no digit means not measured, the same test the count-up engine
applies — and asserts content and modifier agree. Re-planted; the audit goes red in both themes.

**Verification**

- `bash scripts/test.sh` **GREEN both engines** — **256/256 Blink** (was 230/230) and **27/27
  WebKit** (was 21/21); 32 checks added.
- `node tests/qa-independent-audit.mjs` **exit 0, 108/108, twice consecutively**.
- **Every load-bearing new assertion was planted and watched go red**, tree reverted clean: the
  shroud removed (announced-value check red with 100 announced states listed; AX-tree check red
  naming `0.0 h`), `aria-live="polite"` on a cell (live-region sweep red), the unmeasured modifier
  dropped from one dash (Blink ink-dash check red, light-theme rust/ink split red, **both WebKit §5
  colour checks red in both themes**, audit red after the fix above). The cross-card alignment check
  was observed red on its own before the reserved track landed.
- **Cross-engine, looked at rather than inferred**: `tests/artifacts/webkit-{dark,light}-s05.png`,
  `s05-desktop-{dark,light}.png`, `s05-phone-dark.png`, `blink-dark-s05-{1280,375}.png`. The WebKit
  §5 render hides the prose and the status bar as well as the other sections, because the claim it
  makes is about **every** ink cluster in the frame: four, all dash-shaped (26×3–26×4 px), none rust,
  against 14 rust clusters of measured digits — which QuickLook rasterised **with no JavaScript run
  at all**, so what it proves is the no-JS path rendering the exact measured values.

**Would Apple ship this?** Yes. Two scopes, four keys each, read straight across — the reader does
the arithmetic and the page states no ratio. The one thing I would put in front of the founder is the
reserved sub-line slot: seven of eight cells carry an empty 28.5px band so the eighth's `Jul 11–18`
does not push the pair out of alignment. It reads as instrument spacing in the render rather than as
emptiness, and the alternative — letting the cards go ragged from row three — is worse. It is a
judgement, not a measurement, and it is visible in `s05-desktop-dark.png`.

**Revision log:**
- 2026-07-29: Filed. Self-review caught and fixed: the audit's readout rule keyed on the class rather
  than the content (above); the cross-card alignment failed on the one cell with a sub-line and was
  fixed with a reserved track rather than by moving the sub-line; the WebKit ink-cluster claim
  counted the header wordmark's six letters until the status bar joined the hide list. Also removed
  two now-dead CSS blocks (`.readout`'s duplicate surface, `.slot`) and de-duplicated the readout
  key/sub type, which is what let the muted sub-lines satisfy the audit's existing rule honestly
  instead of needing an exemption.

**Observations** (non-blocking, for PM):
- OBS-011 — `section-05-copy.md` §6's R4 line reads "THIS SITE is three em-dashes"; §4.1's table
  carries **four** values, the fourth being the `COST · API LIST` row DEC-048 added.   Severity: low
  Evidence: the table is what shipped and what the harness parses — four dashes render and are
  asserted. The R4 prose was not updated when the cost row landed. Content owns that file and it was
  not edited.
  Suggested action: PM has Content correct the count, or rules the prose non-normative against the
  table.
- OBS-012 — the page footer still carries a shell placeholder (`Provenance line and links ship with
  their own spec`) and **no step in the sprint owns footer copy**.   Severity: med
  Evidence: `page-shell.md` §12 shows `FOOTER provenance · links`; the seed names an authorship
  line, an email and a GitHub profile. The remaining queue steps are scroll-snap, the audit repair,
  the QA sweep and the Gate B packet — none of them. Gate B is "the assembled page", and a
  placeholder in the footer is the first thing a cold reader's eye lands on after the curl.
  Suggested action: PM's call — no queue step was added here.

### 2026-07-29 HO-027 — §3 and §4 built: the insight reads, and four decisions share one screen
**Type:** handoff
**Producer:** Developer
**Deliverable:** `index.html` (§3, §4), `styles/sections.css`, `tests/verify-shell.mjs`,
`tests/verify-webkit.mjs`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] QA — consumes the built sections at the full-page sweep (not a review gate)

**What shipped**

- **Every string is read off the Content deliverables at test time and compared byte for byte** —
  §3's kicker and paragraph, and all 24 of §4's (four titles, four stamps, sixteen row values), in
  the copy files' own order. A retyped em dash or a smart quote shows as a diff against the
  deliverable instead of passing as prose. The four stamp dates are additionally held against
  DEC-044's own values, so a drift in the copy file is caught rather than blessed.
- **§3 is the kicker and one paragraph, nothing else.** Section body carries **zero numerals**,
  asserted; prose capped and rendered at 685.31px against the 64ch token.
- **The kicker's wrap rule is asserted as a rule, not a line count**: each sentence is an
  `inline-block` span, and a sentence may break internally only where its natural width exceeds
  the column. One line at desktop, a sentence-boundary break at 320/360/375/390, one client rect
  per sentence at all five widths, no document overflow.
- **§3's kicker is deliberately not §4's voice.** The shell's type table sets `--text-kicker` in
  sans and `section-04-decisions.md` §4 makes the sheet titles "the only bold sans-at-kicker-scale
  text on the page" — asserted: a sweep of `main` for bold sans at the title's size returns exactly
  the four `.sheet__title`s, and §3's kicker computes weight 400. `samples/s03-insight.html`
  renders its kicker in a locally-redefined mono bold; that record settled copy, and its class
  definitions are not the shell's.
- **§4's emphasis system: rust as a mark, zero rust text.** No element in `#the-decisions` resolves
  `color` to the accent; the accent appears in the section body only as the four marks'
  `background-color`. Each is 2px wide, seated 12.00px from its own card's inner edge — read from
  the resolved `--gap-hairline`, never a literal — spanning the row's content block with 10px of
  clearance. Same figures at all four phone widths.
- **The one-screen ruling holds, measured off the live elements.** At 1280 × 700, scrolled to §4's
  rest under the 48px bar, the track's bottom sits at 636.36px of 700. All four sheets equalise at
  473.33px, the sheet page is 640px, the prose column 470px under its 64ch cap, the label column a
  shared 96px with every label on one line box, and **the peek is 360.0px of sheet 2, on screen and
  cut by the track's inline end** — the spec's figures reproduced exactly.
- **The track snaps to itself, never to the document**: `scroll-snap-type` computes `x`, every
  sheet computes `scroll-snap-align: start` with the track as nearest scroll container, and under
  `prefers-reduced-motion: reduce` it computes `none` with content byte-identical. Below
  `--bp-wide` the track un-tracks — `scrollWidth === clientWidth`, sheets stack, no label shares a
  band with its value, nothing scrolls sideways.
- **Keyboard**: real `ArrowRight` events walk `scrollLeft` 0 → 1608 until sheet 4's inline end is
  inside the track. `#the-decisions` exposes exactly one focusable element, and the AX tree reports
  a four-item list named `The four decisions` whose h3 names equal the copy titles — including the
  `<em>` on *reads*, present in sheet 1's computed name and absent from the other three.

**One measured cost of the paged track, stated rather than absorbed** (PM review item, OBS-009)

`section-04-decisions.md` §12.16 asks that `scrollIntoView()` on sheet 3's last value "land it
fully visible", as the stand-in for find-in-page reaching off-canvas content. **With proximity snap
on it does not, and no declaration in the section's ruling overrides that.** From the track's start
the call settles at scrollLeft 664 — a sheet start, not the position that reveals the match —
leaving 46% of the value and 56% of its sheet on screen. With the track's snap off, which is
exactly the reduced-motion path, the same call settles at 919 and lands the value whole. Two checks
ship rather than one: *a match in an off-canvas sheet is scrolled toward, never left behind*
(asserted, with the share that lands in its detail) and *with the track's snap off, an off-canvas
match lands whole* (asserted). The arrow-key half of §12.16 is asserted in full. Whether that cost
buys a mechanism is UI/UX's call, so nothing was invented to paper over it.

**Two probes re-targeted, one of them a latent crash**

- The Blink body-contrast probe read `.slot .t-body` — a shell placeholder. Two of the three left
  with this step and the last leaves with §5, at which point `contrast.find(...)` returns
  `undefined` and the harness throws rather than fails. It now reads `#the-insight p.read`, the
  page's permanent body-prose exemplar; §4's row value and stamp joined the measured set. Ink on
  surface **13.23 / 13.64**, muted on surface **5.16 / 5.76** — the spec's §9 table, reproduced.
- The WebKit mark measurement had to be scale-free. QuickLook lays out at its own width and rasters
  to the requested size, so the 12px seat measured 17px in both themes (the raster is ~1.37×). The
  relationship is scale-free as a proportion — `--sheet-pad` is 24px and the mark is seated at
  `--gap-hairline`, so it sits at the **midpoint of the card's padding**: both themes measure
  17/35 = **0.486**, and painting the mark with `color` makes the rust bars vanish from the render
  entirely, which the check names.

**Verification**

- `bash scripts/test.sh` **GREEN both engines** — **230/230 Blink** (was 197/197) and **21/21
  WebKit** (was 15/15); 39 checks added.
- `node tests/qa-independent-audit.mjs` **exit 0, 107/107, twice consecutively**, with no audit
  check needing a change.
- **Every load-bearing assertion was planted and watched go red**, tree reverted clean each time:
  `display: inline` on the kicker sentences (red at four widths), an `8px` literal in the mark's
  inset (red at five, naming 8 against a token of 12), the mark painted with `color` (accent-
  background inventory empty in Blink; no rust bar found in WebKit, both themes), a transposed
  stamp date, a dropped `<em>`, and a renamed row label.
- **Cross-engine, looked at rather than inferred**: `tests/artifacts/webkit-{dark,light}-s04.png`,
  `webkit-{dark,light}-s03.png`, `blink-dark-s0304-{1280,375}.png`. WebKit renders sheet 1 whole
  with sheet 2 cut at the container edge, the rust bar on the mechanism row, the ink-bold
  `MECHANISM` label against three muted ones, and the stamps in tracked micro — identical
  composition to Blink in both themes. Each WebKit section render hides every other section and is
  compared against a control with **that** section hidden too: hiding a section pulls the next one
  up into a fixed frame, so a with/without pair that leaves the rest of the page standing measures
  the section that moved, not the one under test.

**Would Apple ship this?** Yes, with one reservation. §3 says the thing and stops; §4 turns four
paragraphs of founder prose into documents a stranger can skim in eight seconds, and the cropped
second sheet is the only thing on the page that asks the reader to act — it earns that by showing
them what they would get. The reservation is the one above: a ⌘F match in an off-canvas sheet lands
half on screen, and "you found it, now nudge it" is not the standard the rest of this page holds.

**Revision log:**
- 2026-07-29: Filed. Self-review caught and fixed: the title-voice check counted the `<em>` inside
  sheet 1's title as a fifth bold voice (runs are now credited to their heading); three
  section-scoped sweeps — numerals, stamp digits, accent backgrounds — were reading the shell's own
  stencil tag, which carries a §-number and a rust pennant, and now scope to the section body; and
  the label-column line count divided a grid item's stretched border box by its line height,
  reporting 3.44 lines for a one-line label. Open question: the snap/find-in-page cost above.

**Observations** (non-blocking, for PM):
- OBS-009 — `section-04-decisions.md` §12.16's `scrollIntoView()` clause cannot be satisfied while
  the track's proximity snap is on; spec and build now disagree on that one clause.   Severity: med
  Evidence: `tests/artifacts/blink-report.json` → `evidence.s04RevealSnapped` (settles 664, 46% of
  the value visible) and `s04RevealPlain` (settles 919, whole). The spec was not edited — UI/UX
  owns that file.
  Suggested action: PM rules at the build-review step — amend §12.16 to the two checks that
  shipped, or spend a mechanism on it.
- OBS-010 — `muster-requests-lint.sh` is red on the Active-section budget (426/300) and will stay
  red until the build-review step sweeps.   Severity: low
  Evidence: it measured exactly 300/300 before this handoff was filed, so no handoff this step
  could file would have kept it green. Four handoffs (HO-026, HO-031, HO-032, HO-027) are
  in-review against a single queued PM review step — the plan's own shape, not an accumulation of
  closed entries. Trading the review evidence PM needs for a line count is the wrong trade.
  Suggested action: PM sweeps to Resolved at the build-review step; no earlier action is available
  to a specialist.

### 2026-07-28 HO-026 — §1 and §6 built: the sparse hero, the command, and the proof link
**Type:** handoff
**Producer:** Developer
**Deliverable:** `index.html` (§1, §6), `styles/sections.css` (new), `styles/tokens.css`,
`VERIFY.md` (new, repo root), `tests/verify-shell.mjs`, `tests/lib/cdp.mjs`,
`tests/qa-independent-audit.mjs`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] QA — consumes the built page and the amended guards at the full-page sweep (not a review gate)

**What shipped**

- **§1, the sparse hero.** Eyebrow · headline · formation above the fold; the THIS SITE remnant
  strip and the curl below it. Nothing else — no measured line, no BODH row, no terminal. The
  section's whole element inventory is asserted, negatively as well as positively: within `#hero`
  none of `9.3`, `4.8`, `$147`, `$24.73`, `289`, `~64`, `bodh` occurs, there is no `<ol>` and no
  terminal/log element, and the only digits in the section's text are the eyebrow's `4` and the
  caption's `8` and `1`.
- **The headline announces what it should.** Rendered text is
  `Ship a product with a human an AI team.`; the computed accessible name, read from
  `Accessibility.getFullAXTree` rather than asserted, is `SHIP A PRODUCT WITH AN AI TEAM.` — the
  struck phrase absent from the name and present in the render. The comparison is
  case-insensitive and word-exact: Blink computes the name from rendered (uppercased) text and
  WebKit from source text.
- **The formation announces the architecture it draws** — group → `PM` → a list of exactly seven
  specialists in the locked order, verified out of the AX tree; the hub's distinction is border
  colour **and** weight 700 **and** position; bus, spine, stems and registration marks reach the
  AX tree nowhere. At ≥`--bp-wide` the seven plates share one row and the bus's rendered width
  equals the plate row's, measured — 676.38px against 676.38px. Below it the ladder stacks.
- **The fold contract holds, read off the elements rather than off the spec's figures.** At
  375 × 553 the hub (331.17) and four whole plates (plate 4 at 518.36) are above the fold, with
  plate 5 cut at 565.16 — the designed scroll cue. At 320 × 553 the hub (360.56) and three plates
  (500.95). No horizontal scroll at 320/360/375/390.
- **§6.** The lead line, the exact `curl` with the page's only cursor, `cd my-product && claude`
  adjacent and unannotated, and one GitHub link whose visible text is its destination. §6's
  interactive inventory is exactly one element.
- **The curl is one string in three places** — `copy-rules.md` R12, §1, §6 — asserted by reading
  R12 off disk at test time and comparing bytes, never by fetching.
- **`VERIFY.md` at repo root**, which the §1 chip resolves to: the method in five lines, the three
  scopes stated separately with THIS SITE dashed, an index of what is committed in this repo and
  what each artifact holds, and the two commands a reader can run. This closes a hard launch
  blocker (`pre-launch-checklist.md`); it is developer-authored and has had no content pass.
- **The `--text-display` floor landed with its assertion, not alone.** `clamp(1.75rem, 6.5vw,
  4.25rem)` in `styles/tokens.css`, guarded by the relationship it exists for rather than by its
  literal value: the headline sets without overflow at 320/360/375/390 — 3L, 3L, 2L, 2L at 28px,
  h1 overflow 0 at every width — and both treated phrases report exactly one client rect at each,
  so no strike or accent can break mid-phrase.

**The `http(s)` ruling, implemented as a narrowing (DEC-034)**

The check was **amended, never deleted**, and it is now default-deny. Every `http(s)` occurrence in
a shipped file is classified from what precedes it; exactly two classes pass — a URL as inert text
(a comment included), and the value of an `href` on an anchor. `url()`, `@import`, `src`, `srcset`,
`poster`, `data`, `<link href>`, `<script src>` and a `fetch()` argument are fetching references and
fail. The DOM-side guard needed the same narrowing and got it, plus a new one: a cross-origin `href`
passes only on an `<a>`, and **any prefetch/preload/preconnect hint fails**, because it would fetch
without a click and would otherwise walk straight through the anchor allowance.

**The guard was proven to fail.** A planted `<img src="https://…">` and `url("https://…")` turned
the run red naming both sites exactly (`index.html:313 img[src]`, `styles/sections.css:22 css
url()/@import`) alongside three zero-external-request failures. Tree reverted clean, re-run green;
the permitted §6 anchor stayed permitted throughout.

**The two Wave 1 rulings that landed here (DEC-042)**

1. **`cdp.mjs`'s `send()` has a deadline.** Every reply is awaited under a 180 s ceiling and
   rejects naming the method, the elapsed time and the message id. The ceiling is deliberately far
   above any legitimate call — this harness awaits a real 48-second replay chain inside one
   `Runtime.evaluate` — so it catches a transport that has stopped answering rather than bounding
   how long a page may take.
2. **The display floor** — above, with its assertion.

**The independent audit — reported as a result, not a pending item**

`node tests/qa-independent-audit.mjs` **completes and exits zero**, run twice consecutively
(107/107, ~2m55s each). It did not hang, and no CDP timeout fired — the stall did not reproduce on
this build once the transport deadline was in place. On its first run after §1/§6 landed it exited 1
with eight named failures; two were real defects in this build and six were assertions whose subject
had changed. All eight are resolved:

- **Real defect** — the `VERIFY` chip and §6's link measured 79×26 and 300×14 on a coarse pointer.
  §6's link now carries the shell's `.link-block` idiom; both measure ≥44 × 44.
- **The coarse-pointer probe was blind.** A mobile viewport is not a coarse pointer:
  `matchMedia("(pointer: coarse)")` reported **false**, so the hit-area rule never matched and the
  check measured the fine-pointer visual — it would have passed a page with no such rule at all.
  Measured three ways: mobile viewport false, `setEmulatedMedia` with a `pointer` feature false,
  `setTouchEmulationEnabled` true. It now uses touch emulation and **asserts it is on** first.
- **The full-ink rule** read `classList`, so §1's eyebrow — four `<li>` facts inside a `.t-label`
  list, inheriting muted from it — read as four muted paragraphs. Now `closest`: a muted *reading*
  paragraph still fails, which is the rule.
- **The small-rust rule** had one named graphical exemption (the corpus ✓). The chip's `⎘` is the
  second, named by `page-shell.md` §8's chip motif. Both are asserted with what makes them safe —
  aria-hidden or redundant with ink text beside them, each against the 3:1 non-text floor in both
  themes. Three contrast checks partition the same way.
- **The animation inventory** reads pulse ×6 **plus exactly one `cursor-blink`** and fails on
  anything else.
- **The tab-order check** asserted a fixed three-stop list. Two things defeat a list: the stop set
  grows as sections ship, and §2's narration list is a scroll container, which Chrome makes
  keyboard-focusable **with no `tabindex` attribute at all** — unenumerable by any attribute
  selector, and only a scroll container in some states. It now drives real Tab keys and compares
  each stop with the last by `compareDocumentPosition`: focus advances in document order and never
  revisits. A trap or a reorder still fails.
- **The replay control's focus ring** depended on the input modality an unrelated earlier block
  happened to leave the engine in — `:focus-visible` on a programmatically focused element is
  modality-dependent, so a real focus regression could have hidden behind a reordering. One real
  key press now sets keyboard modality first.
- **The reading-measure probe** read `#hero .instrument p`, which left with the section. It follows
  a rendered body paragraph now, and the `.instrument` inset probe was decoupled from it. That
  inset check also gained a length guard: with no `.instrument` present its `every()` would have
  reported a pass on nothing measured.

**Verification**

- `bash scripts/test.sh` **GREEN, both engines** — 197/197 Blink, 15/15 WebKit (was 168/168 + 15/15;
  29 checks added).
- `node tests/qa-independent-audit.mjs` **exit 0, 107/107, twice consecutively.**
- **Cross-engine, looked at rather than inferred**: `tests/artifacts/blink-dark-hero-1280.png`,
  `blink-dark-hero-375.png`, `webkit-dark.png` and `webkit-dark-s06-check.png` (§6 rendered alone
  through QuickLook, since the WebKit thumbnail only reaches the top of the page). Both engines
  render the strike, the rust substitution, the hub/bus/regmark construction, the ladder cut at the
  fold, the remnant's dashes and chip, and §6's cursor identically.
- Registration-mark sparseness is now grouped by the surface each mark hangs on rather than by the
  `.instrument` class, so §1's remnant is covered the moment it ships instead of sitting outside
  the rule: `remnant 2 · terminal 2 · slot 2 · slot 2 · slot 2`.

**Would Apple ship this?** Yes. The first screen is one claim, one diagram, and nothing that needs
explaining — and the claim edits itself in front of the reader, which is the whole argument in one
gesture. The page asks to be checked and then hands over the file that lets you do it. What is
deliberately unpolished: `VERIFY.md` is a developer's index and reads like one.

**Revision log:**
- 2026-07-28: Filed. Self-review caught and fixed: one overclaim in `VERIFY.md` (that every scope's
  figures come from the meter — the wave's per-step figures come from the sprint driver); a
  first-draft "who built this" line that read `8 agents, 1 operator` as a description of *this*
  build, which is roster size stated as wave participation — the exact scope slip the file exists to
  catch; and five archaeology phrasings in code comments (Rule 15) re-cut to current truth. Two
  AX-name comparisons were written case-sensitive and failed on Blink's uppercasing; both now match
  the cross-engine rule the hero spec states.

**Observations** (non-blocking, for PM):
- OBS-006 — the queued QA step (audit repair, HO-033) is premised on an unbounded renderer bisect,
  and the audit now exits zero twice with no timeout fired.   Severity: med
  Evidence: `.test-logs/audit-post-s01e.log`, `audit-post-s01f.log` — exit 0, 107/107 both runs,
  ~2m55s each; the first post-§1 run (`audit-post-s01.log`) also completed, at 175 s, with eight
  named failures and no CDP timeout.
  Suggested action: PM rules at the build-review step whether that step still has a subject. The
  queue was not touched — scope changes are not this step's to make.
- OBS-007 — `section-06-copy.md` §4.2 states "§1's interactive inventory is exactly two elements and
  §6's is one"; `section-01-hero.md` §12 rules §1's inventory at exactly one, the `VERIFY ⎘` chip.
  Severity: low
  Evidence: the two spec files; the build follows the hero spec and asserts the chip is `#hero`'s
  only focusable element.
  Suggested action: PM reconciles the copy file's aside at review.
- OBS-008 — the audit's `.instrument` inset check loses its subject when the last shell placeholder
  leaves (after §5 lands).   Severity: low
  Evidence: the check now fails loudly with "no .instrument surface on the page — re-target this
  probe" rather than passing vacuously on an empty set.
  Suggested action: PM routes the re-target to whichever step retires the final placeholder.

### 2026-07-28 HO-031 — Gate A fix round: four copy files re-cut to the verdict
**Type:** handoff
**Producer:** Content
**Deliverable:** `knowledge-base/design-specs/web/section-01-copy.md`, `section-03-copy.md`,
`section-04-copy.md`, `section-05-copy.md`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending
- [ ] UI/UX — consumes §4's measured lengths and §1's settled strings at HO-032 (layout input, not a review gate)

**What shipped, per file:**
- **§1** — the settled headline is the only candidate: visible `Ship a product with ~~a human~~ an AI
  team.` (struck `a human` in ink, `aria-hidden`; rust on `an AI` only; plain ink `team.`), announced
  `Ship a product with an AI team.`, with the gate's measured line counts recorded (3/3/2/2/2 at
  320/360/375/390/1280 — no orphan word at any width). Deleted: the subline, the measured line, the
  readout's BODH row, the terminal chrome labels. Kept byte-exact (verified by script): eyebrow,
  formation labels + caption, all THIS SITE row strings with `measured at launch` and `VERIFY ⎘`,
  the curl. §1 now contains zero Bodh material (DEC-045/046).
- **§3** — rewritten to the closed block: K1 kicker (6 words) + the 90/90 paragraph
  **byte-identical to the verdict's final string** (confirmed by exact-substring check; 90 words by
  the stated counting convention). The named-competitor ruling and its fallback are gone (DEC-047);
  the kicker's sentence-boundary wrap rule is stated for the build with `page-shell.md` named as its
  spec home; the hook rides the curated-slice sentence, once, nowhere else on the page.
- **§4** — re-authored from DEC-044's four decisions in DEC-044's order (tiered reading 2026-04-24 ·
  determinism + economics 2026-06-13 · growth caps 2026-04-12 · attention architecture 2026-06-07),
  plain language per DEC-043, first person as the founder's. **Measured counts, script-verified:
  row bodies 44 / 42 / 44 / 44 against the ≤45 ceiling; titles 10 / 9 / 11 / 9 against ≤12.** Every
  core trade-off survives (no shared conversation · floors can't flex · history lost from view · no
  mid-run steering); two secondary maintenance corollaries were trimmed by the ceiling and are named
  in the file's §6 so the cut is visible. No decision was unfittable — nothing is flagged. The
  six-line-title-at-320px watch item retires: longest title is now 11 words. Stamps are the four
  verified dates exactly; §4's only numerals.
- **§5** — both cards gain key 4 `COST · API LIST` → `$147` (BODH) / `—` under `measured at launch`
  (THIS SITE), per DEC-048. The three stale rationales named at the verdict's §5 close are cleaned
  (subline reference → formation caption; "repeats §1" → §5 as the primary byte-equality site for
  `9.3 h`/`$147`; the "no cost figure in §5" note → R3 framing carried by the key label). No other
  shipping string changed.
- **Copy-rules matrix run on all four files by script**: no banned word, no exclamation mark, no
  "proven" outside negations, no `muster.build`, no rounded number, no wave-scope numeral in §1/§5,
  curl byte-equal to R12's verified form, "context engineering" exactly once on the page (§3),
  first person confined to §4 (and §5's provenance line, untouched).

**Revision log:**
- 2026-07-28: Filed. Self-review caught and fixed one durability violation (a "prior draft"
  comparison in §4's count table — archaeology moved out of the durable file; the retirement of the
  six-line title is reported here instead). No open questions; no founder dependency.

**Observations** (non-blocking):
- OBS-001 — §1's remnant readout keeps three cell labels (`ACTIVE BUILD` · `COST · API LIST` ·
  `SHIPPED`) over dashes with no measured row beside them.   Severity: low
  Evidence: `section-01-copy.md` §5; the verdict records the honest cost that the dash idiom lost
  its self-evident contrast when the BODH row left §1.
  Suggested action: UI/UX's HO-032 remnant-form ruling may fold labels into something smaller; the
  strings are supplied either way. PM decides nothing here — noted so the label-over-dash reading
  is a design choice, not an oversight.

### 2026-07-28 HO-032 — Gate A fix round: the sparse hero recomposed, §4's one-screen layout ruled
**Type:** handoff
**Producer:** UI/UX
**Deliverable:** `knowledge-base/design-specs/web/section-01-hero.md` (rewritten),
`section-04-decisions.md` (amended), `page-shell.md` (kicker wrap rule homed; motion §10 re-cut;
§7.1 A4 re-scoped), plus cross-reference sync in `section-02-replay.md` and `brand-seats.md`.
Decision records (never ship): `samples/s01-hero-recomposed.html`, `samples/s04-one-screen.html`.
**Status:** in-review
**Reviewers:**
- [ ] PM — pending (review scheduled at the build-review step)
- [ ] Developer — consumes both specs at the §1+§6 and §3+§4 build steps (input, not a review gate)

**What shipped:**
- **§1 recomposed to the sparse hero** (DEC-045/046): above the fold eyebrow · headline ·
  formation + caption, nothing else; no Bodh material anywhere in the section; below the fold the
  THIS SITE remnant and the curl. The scope-adjacency system is deleted, not rewritten — no
  wave/whole-product adjacency exists in §1 to manage. **§1 is ruled fully static**: the page's
  motion budget re-states at two live ambient elements (pulse, §5 count-up) + the §6 cursor; the
  count-up/`aria-live` decision moves to §5 with the page's only counting cells.
- **The formation got its design pass** — hub `PM` on a 1px accent border at weight 700 (position,
  order, weight, border: never colour alone), seated over a bus-bar that spans exactly the plate
  row's width with regmark terminals; seven full-name specialist plates; announced as group → `PM`
  → a 7-item list (the hub/bus hierarchy told structurally). Below `--bp-wide`: a 12px spine
  ladder, 24px stems, 50.4px plate pitch, spine terminating at the last stem — at the 375 fold it
  runs through the cut, which is the scroll cue.
- **New fold budget, rendered not derived** — at 375 × 553: eyebrow, headline (2L), hub + four
  whole plates (plate 4 bottom 536.3); the fold cuts plate 5 and the first measured figure arrives
  on scroll, as the founder accepted. At 320: three plates (515.3), headline 3 whole-phrase lines,
  no overflow. At 1280 × 700: the entire first screen with 194.1px clear. Landscape phone named as
  the case that cannot hold the formation. **Every figure re-rendered this session and reproduced
  exactly** (`/tmp` drivers against both samples, headless Blink, real tokens).
- **The remnant ruled: a one-row instrument strip** — labels kept over the dashes (a dash without
  its key asserts nothing; this answers HO-031's OBS-001 as a design choice), `measured at launch`
  once, `VERIFY ⎘` chip as §1's only focusable element; the lost-contrast cost of DEC-046 carried
  openly with §5 restoring the side-by-side one scroll later.
- **§4's one-screen layout ruled: a horizontal paged track at desktop** — judged from three
  candidates rendered with the shipping strings: track content bottom 612.1px (fits 1280 × 700
  snapped, 684.1 of 700); stacked 2060.6px and 2×2 1256.9px both fail DEC-043. Discoverability
  cost paid: 360px of sheet 2 visible as the affordance, x-proximity snap scoped to the track
  (page-shell A4 amended accordingly; no harness snap check exists yet — verified by grep), track
  as the section's single named tab stop, snap off under reduced motion. **Phone ruled stacked**
  with the cost measured and stated: sheets 631.8–660.7px at 375, section ≈ five phone screens;
  paging rejected because a sheet exceeds the 553 fold (two-axis navigation of clipped cards).
  `--sheet-pad` 24px everywhere is load-bearing for the budget. The no-date stamp special case is
  removed — all four stamps carry DEC-044's verified dates, byte-asserted.
- **The §3 kicker wrap rule homed in `page-shell.md` §3**: sentence-as-`inline-block` (the
  headline's mechanism family), wrap-preferred not unbreakable — one line at desktop,
  sentence-boundary break at 375, internal wrap without overflow at 320.
- **Assertions, DEC-032 practice**: hero — 12, one per relationship (announced name, phrase units,
  fold guarantee read from elements, stack integrity, the sparse negative, formation integrity and
  modes, remnant honesty, chip, static section, curl equality, eyebrow silence). §4 — 17, adding
  one-screen-at-snap-rest, track mechanics + reduced-motion, the peek, every-sheet-reachable via
  real key events, and phone un-track. Re-base tables updated in both files (the audit's 64ch
  probe re-targets §3's paragraph — §4's track prose renders ~46 rendered ch by design).
- `bash scripts/test.sh` re-run after all edits: **GREEN** — the step changed no shipped file.

**Would Apple ship this?** Yes. The hero is one claim, one diagram, one command — the restraint is
the design, and every remaining element earns its seat with a measured figure behind it. The §4
track is the honest answer to "one screen" that adds zero chrome: the affordance is the content
itself, cropped. The phone costs are stated as costs, not smoothed.

**Revision log:**
- 2026-07-28: Filed. Self-review caught and fixed: two wave-archaeology item references in the
  hero spec's provenance (re-pointed to the copy file's recorded rulings); stale `--sheet-pad`
  split and mark-clearance figures in §4's §6.4/§7.4 after the 24px-everywhere ruling. All baked
  sample figures independently re-rendered and reproduced exactly before being relied on. No open
  questions; no founder dependency.

**Observations** (non-blocking, for PM — both are DEC-046 cascade gaps in PM-owned files):
- OBS-002 — `brand-guidelines.md` §4 still records "Motion — three live elements" including the
  hero terminal, and its motifs row still says "PM hub + eight plates".   Severity: med
  Evidence: brand-guidelines.md lines ~138–144 vs DEC-046 and the amended `page-shell.md` §10.
  Suggested action: PM amends the motion row to two live elements + cursor and the formation row
  to hub + seven specialist plates, at the build-review step.
- OBS-003 — `foundational-assumptions.md` A-007's notes still say "Exactly three live motion
  elements plus the curl cursor — a fourth is a deviation."   Severity: med
  Evidence: A-007 Notes vs DEC-046. The specs cite A-007 by its principle (a new ambient element
  is a deviation), which survives the count change.
  Suggested action: PM updates A-007's notes to the two-element count with the same touchpoints.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-27 — REQ-008 (Developer → PM): **ruled — the audit is repaired in two moves, in the order the
  Developer recommended.** (1) `tests/lib/cdp.mjs`'s `send()` gains a timeout, and it lands in the
  §1-and-§6 build step, which is already amending the harness: a harness that can hang forever cannot
  report, and this converts a silent 20-minute stall into a named red check with a method on it. That is
  worth doing on its own merits regardless of what is causing the spin. (2) The renderer diagnosis — why
  Chrome saturates at 375 × 553 under the injected 250 ms sampler — lands with the QA sweep, which owns
  the audit. Splitting it this way answers the Developer's own objection: the party whose work the audit
  checks fixes the transport, not the assertions. The three downstream steps' criteria are amended to
  match. **PM did not run the audit cold**; the diagnosis is specific and measured (Node at 0% CPU,
  Chrome at ~105%, `send()` with no timeout at `:115–123` — confirmed by reading the file), and
  `scripts/test.sh` is green on the same tree, so no shipped check is unverified — what is missing is the
  cross-check, and that is stated as not-green in the Gate A packet rather than papered over.
  Test-infrastructure quality is PM-alone under the Decision Autonomy Matrix. See DEC-042.

- 2026-07-27 — HO-025 (Developer): **accepted, no revision.** The sample was re-run by PM rather than
  read — `node tools/gate-a-report.mjs` 51/51, exit 0, and all four announced strings match their ruling
  word-exact out of the AX tree. Both of its open items are ruled: (a) candidate B's four lines at 320px
  with a lone `WITH` is a real composition wart and a wrong figure in `section-01-hero.md` §4.1, and it
  goes to the founder at Gate A with the actual line breaks printed rather than a line count — the
  handoff's judgment that it cannot be fixed by widening the break unit is correct and was the reason to
  gate it rather than patch it; (b) `styles/tokens.css`'s pre-amendment `--text-display` floor **lands
  with §1, not now** — no harness asserts the clamp (verified by grep), and landing an unguarded token
  change ahead of the assertion that guards it is the drift this project exists to prevent. The
  self-caught blind check — a per-pane overflow probe that could not fail because `.pane` carried
  `overflow: hidden`, found by planting a 220-character element — is the standard this sprint is trying
  to hold, and it was met without being asked for. The stale `verify-shell.mjs` coordinates it reports
  (`:650` shipped-set glob, `:660` the http(s) check) are confirmed correct and were already carried into
  the §1-and-§6 step. One figure does not reproduce exactly: WebKit ink measured 5.59% against the
  handoff's 5.69% — run-to-run antialiasing, not a defect, noted so a later reader does not chase it.

- 2026-07-27 — HO-024 (Developer): **accepted, no revision.** The Gate 3 defect is closed by removing a
  CSS value rather than choosing a better one, which is why nothing adjacent moved. PM did not take the
  fail-when-violated claim on trust and re-planted both breaks independently: `--mark-clear: 0ch` turns
  R2 red at all three states (`L4 0px · L9 0px`), and `--mark-inset: 8px` turns R1 red reporting
  `terminal 8px / narration 12px … expected 8px read from --mark-inset` — the expected figure followed
  the token and the check still failed, on the inequality. That is DEC-032's property demonstrated
  directly rather than asserted, and it is the answer to the acceptance criterion's real question: these
  assertions cannot be satisfied by moving the value they were written against. Tree reverted clean;
  `bash scripts/test.sh` re-run by PM, GREEN both engines. The WebKit lockup check's stated limit — it
  protects the mark's rendered position, not the `align-self` keyword, because `center` renders
  identically — is the right thing to protect and the right thing to have disclosed.

- 2026-07-27 — HO-023 (Content): **accepted, no revision.** "Tightened, not rewritten" was re-derived
  from the seed by PM with an independent word-level diff rather than read off the report: 420 → 415,
  −5 words, 30 → 30 sentences, exactly three rows differing and exactly the four edits named. Per-decision
  totals confirmed (−4 / −1 / 0 / 0), so `section-04-decisions.md`'s measured line counts hold as
  measurements rather than ceilings. Every stated word budget across all five copy files was recounted
  and every one matches, none over budget. Three rulings: **the `ACTIVE BUILD 9.3 h` repeat in §5 stays**
  — a figure for what the operator spent needs the build figure beside it as a denominator, and the
  pre-authored fallback would leave operator attention without one; **§4's 7–8 sentences against the
  seed's own "~4–6" goes to the founder**, because closing it means cutting founder copy and only he can
  authorise that, with PM's recommendation to ship as-is since each sentence carries a distinct claim;
  **decision 4's stamp must never gain a date** — agreed, and the one-text-slot construction already
  makes that structural rather than a rule someone has to remember. The `curl`'s byte-equality was
  re-verified across all four files independently. See DEC-041, DEC-042.

- 2026-07-27 — HO-022 (UI/UX): **accepted, no revision.** Four lines of CSS, no JavaScript touching the
  scroll position, and §2's exemption proven as a property — the engine moved not one of the 20 sampled
  rest positions where the playback core is ≥90% visible. The three named harness traps are the value of
  this handoff: `y proximity` serialising as `"y"` would have failed a correct build, the padding asserted
  as bar-height + `--rhythm` rather than as 72, and real key events rather than `scrollBy` (the
  programmatic form reports a top-of-page trap a reader never experiences). REQ-007 answered below.

- 2026-07-27 — REQ-006 + REQ-007 (UI/UX → PM): **both ruled, both PM-alone.** REQ-006 — the omission ran
  the way UI/UX suspected: DEC-031 enumerates four seats and the footer is not among them, so
  `brand-guidelines.md` §4's "Header **and footer** lockup" row is the stale one. Amended to "Header
  lockup" with the exclusion stated in prose; its `~8px` pennant figure was stale against DEC-037's 6 × 9
  in the same row and is corrected too — leaving it would have been the same defect a line lower.
  REQ-007 — **manual check, recommendation (2) accepted.** `qlmanage` renders a static thumbnail and
  cannot scroll, so WebKit parity for a *behaviour* is unreachable here; driving Safari needs a founder
  admin authorisation plus new harness surface in a sprint with none budgeted, which is scope this run
  has no authority to add. It becomes a manual pass, recorded as manual and never reported as a
  mechanical result, and the one sentence UI/UX proposed is added to the Gate B iPhone ask. The two
  downstream steps' cross-engine criteria are amended so they are satisfiable as written. See DEC-042.

- 2026-07-27 — HO-021 (UI/UX): **accepted, no revision.** The spec is buildable from itself and HO-025
  proved it — an independent build measured 685.31px prose in a 903.31px card and a 12.00px mark inset,
  matching §6.2's own rendered figures exactly, which is the spec confirming itself against a second
  party rather than against its author. Zero rust text is the right answer to a failed contrast pair
  (ink-on-rust measures 3.43 / 2.79 — PM recomputed all eight stated pairs from the locked hex and every
  one is exact), and the stamp-as-one-text-slot makes the no-date case structural instead of a rule.

- 2026-07-27 — HO-020 (UI/UX): **accepted, no revision.** The fold is falsifiable — 461.8px measured
  bottom against 553px, 91.2px clear — and landscape phone is named as the case that cannot hold the
  full stack rather than smoothed into "every viewport." The display floor being wrong against real
  strings is exactly what the copy-before-design resequencing was for, and it was caught by measurement
  at spec stage rather than at build. §1's element inventory was checked against seed §1 item by item by
  PM: all nine present, including the eyebrow verbatim and the `VERIFY ⎘` chip. OBS-004 triaged.

- 2026-07-27 — HO-019 (UI/UX): **accepted, no revision.** Five named relationships with one assertion
  each, and the deliberate refusal to make the hanging indent a sixth — it kept moving the other five —
  is the ruling that made the build subtractive. Every figure HO-024 later measured is the figure this
  spec predicted, which is the test of whether a spec was buildable or aspirational. The ten re-base
  sites were listed by file and line and all ten landed. OBS-005 triaged.

- 2026-07-27 — HO-018 (Content): **accepted, no revision.** Four headline candidates with their announced
  strings supplied at copy stage is what made the hero spec measurable against real text rather than a
  hypothesis. §3's competitor clause ships named on the seed's own instruction, with the 63-word cut
  pre-authored so "cut, not softened" is executable without reopening copy. SP3's 24 → 19 words closed
  the deferred 320px pre-launch item on measured evidence. OBS-001 through OBS-003 triaged.

