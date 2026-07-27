# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

### 2026-07-26 REQ-006 — `brand-guidelines.md` §4 names a footer lockup that DEC-031 does not
**Type:** request
**From:** ui-ux
**To:** PM
**Status:** open

§4's seat table reads *"Header **and footer** lockup | Pennant + `MUSTER_`"*. DEC-031 enumerates four
seats and the footer is not among them. I have ruled it out — `brand-seats.md` §8, DEC-037.4 — on
DEC-031's precedence plus a frequency argument: the header plus five separators already put the mark on
the page six times, and a seventh a few rhythm units below the fifth does no work the provenance line has
not already done.

**The ask**: amend `brand-guidelines.md` §4's seat table so the row reads "Header lockup" and the footer
is either absent or explicitly excluded. `brand-guidelines.md` is PM-owned (Rule 1), which is why this is
a request rather than an edit. It is not blocking — the spec and the build both proceed from DEC-037 —
but until it lands, a future reader has two files disagreeing about a brand seat, and that is exactly the
gap DEC-034's audit was created to find.

Worth PM's judgment rather than a rubber stamp: if the founder's second pennant ruling *did* intend a
footer lockup and DEC-031 simply under-recorded it, then the right fix is the reverse — amend DEC-037 and
add the seat. I do not think so, but the seat table predates DEC-031 and I cannot tell from the files
which way the omission went.

### 2026-07-26 REQ-007 — the scroll-snap build step's "cross-engine" criterion has no WebKit method
**Type:** request
**From:** ui-ux
**To:** PM
**Status:** open

The Developer's scroll-snap step and QA's sweep both require cross-engine verification, and for this one
feature the project cannot produce it. `tests/verify-webkit.mjs` renders through `qlmanage`, which
produces a static thumbnail — **there is no scroll, so there is nothing to measure.** Every other visual
milestone was verifiable in WebKit because it was a render; this one is a behaviour.

Two ways to close it, and the choice is above my authority because one is tooling scope and the other
spends a founder gate:

1. **Drive Safari.** `/usr/bin/safaridriver` exists on this machine. It needs a one-time
   `safaridriver --enable`, which prompts for admin authorisation — a founder action, not an agent one —
   and then a WebDriver client, which is new harness surface in a sprint that has none budgeted.
2. **Name it a manual check.** Safari on desktop plus one pass on a real iPhone, recorded in the QA
   handoff as a manual result and never reported as a mechanical pass. Zero new tooling.

**My recommendation is (2), with one addition PM already has a slot for.** The Gate B packet carries an
iPhone ask (§2's two layers on a real device). Adding *"and tell us whether section snapping fights your
scroll"* to that same ask costs the founder nothing extra, and iOS momentum scrolling is precisely where
a proximity pull is most likely to feel wrong — it is the one condition no harness on this machine can
reach. `page-shell.md` §7.1 → Cross-engine is written to (2) and states the limitation in the spec so a
later reader cannot mistake a Blink-only result for parity.

**Not blocking**: the spec ships either way, and the Blink half is measured. What is blocking is the
*wording* of the two downstream steps' acceptance criteria, which as written cannot be satisfied.

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### 2026-07-26 HO-024 — the terminal's left edge built as a system; the pennant seated, and the tick no longer collides
**Type:** handoff
**Producer:** developer
**Deliverable:** `index.html` (header lockup, favicon, key-beat marks), `styles/chrome.css`,
`styles/replay.css`, `tests/verify-shell.mjs`, `tests/qa-independent-audit.mjs`, `tests/verify-webkit.mjs`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**The Gate 3 defect is closed, and it is closed by removing a value rather than by choosing a better
one.** `border-inline-start` is off `.log__line`. The key-beat mark is now a real, empty, `aria-hidden`
element positioned against its own line, and the log's inline-start padding opens the room it occupies:
`--mark-inset` 12px + `--mark-width` 2px + `--mark-clear` 0.5ch = **17.91px**. Because the line's padding
box is fixed by the log, the hanging indent can be set to anything without moving the mark a pixel — the
collision existed because the mark and the indent *were the same CSS value*, and they no longer are.

**The five relationships, measured on the built page** (HO-019 §9.2 specified them; these are what the
build delivers):

| | Relationship | Measured | Where it is asserted |
|---|---|---|---|
| **R1** | mark ↔ card | **12.00px in the terminal, 12.00px in the narration**, at desktop mid-playback, desktop static and phone | `pairOK` — asserts the *equality*, reads the expected figure from `--mark-inset`, and adds an `inset ≥ 4 × mark width` floor |
| **R2** | mark ↔ text | **3.91px on L4 and 3.91px on L9** (0.5ch at a measured 7.83px advance) | new `clearOK`, at all three states. This measured **0** in the build the founder gated |
| **R3** | row ↔ row | pitch 19.50px, whitespace 6.50px | unchanged — already a ratio, not a value |
| **R4** | entry ↔ entry | 18.50px against R3's 6.50px = **2.85×** | unchanged — already `ratio ≥ 2 && separator > 0.5` |
| **R5** | text ↔ wrap edge | **37 columns at 360px**, 39 at 375, 41 at 390/393, 76 at `--bp-wide` (L3 is 74 characters) | the column-count checks, with the `border-inline-start-width` subtraction removed from all five sites |

**The 12px equality holds at 12px and the 37-column floor holds at 360px** — both are measurements above,
not derivations. Neither constraint was traded: §7.1 rule 1's fallback did not fire.

**No hardcoded `12` survives.** The four accent-pair sites the step named collapsed into one predicate
that resolves `--mark-inset` by laying a length out in the log's own font. If the token ever moves, the
check follows it and still fails on inequality — which is DEC-032's whole point, and the reason
`verify-shell.mjs:617/783/811/1021` could not be fixed one at a time.

**Every re-based assertion still fails when its relationship is violated — demonstrated, not claimed.**
Three deliberate breaks, each reverted immediately:

- `--mark-clear: 0ch` — the Gate 3 defect state exactly. **R2 goes red at all three states**, reporting
  `L4 0px · L9 0px`. Note *why* it catches this: the expected figure follows the token to 0, so the
  equality clause alone would have passed. The `clear > 0` clause is what fails.
- `--mark-inset: 8px` — **R1 goes red at all three states**, reporting `terminal 8px / narration 12px …
  expected 8px read from --mark-inset`. The expected figure followed the token, and the check failed on
  the terminal↔narration *inequality*. That is DEC-032's property demonstrated directly: the check cannot
  be satisfied by moving the value it was written against.
- `align-self: flex-start` on the pennant — both WebKit lockup checks go red at −4px (below).

`qa-independent-audit.mjs`'s `accentRgb` fossil at `:824` was deleted rather than re-based, per HO-019.

**The pennant is seated in all six places** — header lockup, five section separators, favicon — at
**6 × 9px**, drawn with `clip-path: polygon()` on a `background-color` box. No SVG, no new file, **zero new
network requests**: the seats it replaces were background-color boxes and it keeps that property, which
sidesteps the inline-SVG/WebKit divergence class rather than testing for it. The mark's height is asserted
**equal to `.rule__tick`'s** rather than to the literal 9, so the shared measure that makes a separator read
as one machined assembly moves together or goes red. `.tag` still renders **16.8px against a 16.8px
`--text-label` line box** — baseline alignment did not grow the flex line, which was the load-bearing risk
across five vertically-centred tags.

**The underscore is net-new and is drawn, not typed** — a 1ch × 2px bar, measured **7.22 × 2px**, sitting
1px to 3px below the baseline, inside the wordmark's own text run at **0px past its trailing 2.16px
letter-space** against a 12px lockup gap. As a third flex item it takes that 12px and reads as a floating
dash. It carries no animation and no transition in either motion path — asserted twice, including under
`prefers-reduced-motion`, because a mark that looks like a terminal caret is the element most likely to
become a fourth motion element. **The header's accessible name is exactly `MUSTER`**, read from the DOM.

Both brand marks are painted with `background-color` and never `color`, with an assertion that says so —
the trap HO-019 handed over, since the audit's small-rust-text sweep collects elements whose `color`
resolves to the accent.

**§2 is untouched, proven rather than asserted**: twelve corpus lines byte-clean at 320 / 360 / 375 / 390 /
393px and in the reduced-motion transcript, the gate hold silent from 43.55 s to **48.00 s**, the phone core
**472.39px against 472.40px budgeted**, three whole entries on a 51px pitch, every chain line still exactly
two rows.

**Cross-engine — and this is where the step was not yet finished.** `brand-seats.md` §11 names
`align-self: baseline` on an **empty** flex item as the one construction here with real WebKit divergence
risk, and nothing in the suite covered it in WebKit: `verify-webkit.mjs` measured only ground and grain,
and QuickLook runs no JavaScript, so the DOM probe the Blink harness uses is unavailable. It is now
measured off the pixels, which is better evidence anyway — the claim is about where the mark visibly
sits. The pennant's lowest inked row and the wordmark's baseline row are found by colour and compared:
**0px apart in dark and 0px apart in light.** `MUSTER` is all-caps mono with no descender, so its lowest
inked row *is* its baseline row and the two figures need no font metric.

I proved that check can fail before trusting it: `align-self: flex-start` moves it to **−4px** and both
themes go red. One honest limit, because it changes what the check means — `align-self: center` renders
**identically** here (the 9px mark centred in a 16.8px line box lands within 0.1px of the baseline), so
what is protected is the mark's rendered position, not the CSS keyword that produces it. That is the right
thing to protect, but a reader should not infer the keyword is guarded.

The **second** WebKit risk §11 names — the log mark's `inset-block: 0` against a line box the reveal also
transforms — is covered where it already lived, in the audit's §2 WebKit pass: accent ink inside §2 measures
**1987 pixels dark and 1888 light with the log lines shown, against 343 with them hidden**, so the mark
paints rather than silently dropping. QuickLook runs no JavaScript, so that render is the untransformed case, and
the transformed one is Blink evidence. Both are labelled as such in the file.

**Results, both harnesses, foreground, this session, on the final state of every file above**:
`bash scripts/test.sh` **GREEN across both engines — 183 checks, 0 failing** (Blink 168, WebKit 15), and
`node tests/qa-independent-audit.mjs` **106/106, exit 0**. Run separately, because the audit is not in
`scripts/test.sh`.

One operational note for whoever runs these next: the two harnesses **do not survive being run
concurrently**. An audit sharing the machine with a `verify-shell` run hung indefinitely in its WebKit
phase — no output for twelve minutes, no `qlmanage` child, killed and re-run clean. Run them one at a
time. Nothing in the build causes it; QuickLook is the shared resource.

**Would Apple ship this? — Yes, and the reason is that nothing moved that was not meant to.** The
mechanism is subtractive, so the adjacent geometry had nothing to absorb; the numbers above are the same
numbers HO-019 predicted, which is the check that the spec was buildable rather than aspirational. Two
places I would not claim excellence. R5's margin at 360px is **2.4px** — thin, and thin because the budget
has no more room, which §9.2 states rather than smooths over. And the WebKit lockup check finds its
subject by colour-clustering the status bar; that is more fragile than a DOM query and it is the check
most likely to need attention if the bar's contents change. It is shape-filtered rather than
coordinate-looked-up for exactly that reason, and it reports what it found so a failure is diagnosable.

**Revision log:**
- 2026-07-26: Self-review found the step's cross-engine criterion satisfied only in the weak sense — the
  suite ran in both engines, but no WebKit assertion touched the new construction, and `brand-seats.md`
  §11 asks for that one by name. Added it, then broke it deliberately to confirm it fails.
- 2026-07-26: First cut of the WebKit check read the wordmark as "any pixel that is not ground," which
  swept in the underscore's antialiasing. That sits *below* the baseline by construction, so it dragged
  the measurement to −5px and failed a correct build. Re-scoped to match the `--ink` token.
- 2026-07-26: Self-review grepped the deliverable for the terminology this step retires and found four
  live uses of "tick" for the key-beat mark in the audit — one check name and two reported detail
  strings. The construction no longer exists under that name, and a reviewer grepping for it would have
  found them. Renamed; `.rule__tick` and the corpus's own ✓ keep the word, correctly.
- 2026-07-26: A duplicated word in a re-based audit comment, fixed.

**Observations:**
- OBS-005 — The WebKit harness can measure geometry, not just ink   Severity: low
  Evidence: this step's baseline check reads a rendered relationship out of a QuickLook PNG by
  colour-clustering. `verify-webkit.mjs` had been treated as a render-and-grain gate because QuickLook
  runs no JavaScript, and several specs state cross-engine limits in those terms.
  Suggested action: PM may want this noted where REQ-007 is settled — it does not rescue scroll-snap
  (a behaviour still cannot be driven), but any *static* geometry a spec calls cross-engine-critical is
  measurable this way, which is a wider door than the specs currently assume.

- OBS-006 — `agent-requests.md` is over its active-section budget, and the sprint shape is why
  Severity: low
  Evidence: `muster-requests-lint.sh` fails at **698 active lines against a 300 budget**. It was already
  over before this handoff (568) and no entry can be swept: every Wave 1 handoff is `in-review` by
  design, because this sprint batches six deliverables into one PM review rather than closing them one
  at a time.
  Suggested action: none from here — the Wave 1 review step closes HO-018 through HO-025 and the sweep
  falls out of it. Flagged only so a red lint at the next session start reads as expected rather than as
  a new defect.

### 2026-07-26 HO-023 — §4, §5 and §6 copy: the founder's draft tightened by five words, and two inventory rulings

**Type:** handoff
**Producer:** content
**Deliverable:** `knowledge-base/design-specs/web/section-04-copy.md`,
`knowledge-base/design-specs/web/section-05-copy.md`,
`knowledge-base/design-specs/web/section-06-copy.md`
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Summary:**

- **§4 is tightened by five words out of 420, and the small number is the finding.** Four edits, each
  named in the file with its before/after: `the thing that actually breaks` → `what actually breaks`
  (−2), one `and` → comma in a three-clause series (−1), `has to own` → `must own` (−1, modal
  preserved because the sentence's claim is an obligation the trade-off buys), `prose is reserved for
  judgment` → `prose is for judgment` (−1, which is also Muster's own coinage). Everything else is
  word-identical to the seed. The draft carries almost no fat; manufacturing a bigger delta would mean
  cutting clauses the founder wrote on purpose.
- **"Tightened, not rewritten" is verified mechanically, not asserted.** A script extracts all 16 row
  values from the seed and all 16 from the copy file, aligns them, and prints a word-level diff: the
  three diffs above and nothing else. Sentence count is **30 → 30** — no sentence deleted, split,
  merged, or moved. Per-decision row totals: 123→119, 105→104, 89→89, 103→103. All four titles and all
  four stamps are untouched, so `section-04-decisions.md`'s measured line counts hold exactly rather
  than as ceilings.
- **Two findings on the §4 draft, neither fixed by me.** (1) The draft runs **7–8 sentences per
  decision against the seed's own "~4–6"** guidance; closing that gap means deleting two sentences per
  decision, which is a cut, and cutting founder copy needs the founder's word. (2) Decision 4's stamp
  carries no date and must never gain one — Bodh's launch date exists in the corpus and inserting it
  would fabricate a provenance stamp for a decision, not a deploy.
- **§5 ships two readout cards, not three: the provenance line is prose.** It has no key and no value,
  and a readout cell is an instrument surface — this is the same distinction `section-04-decisions.md`
  makes when it keeps registration marks off the spec-sheets. Founder testimony must not dress as
  telemetry.
- **§5's cards carry the two measured figures the page otherwise never shows** — `OPERATOR ATTENTION
  4.8 h` and `COMMIT-DAYS 4` (`Jul 11–18`) — beside `ACTIVE BUILD 9.3 h` as their denominator. The
  9.3 h repeat of §1 is deliberate and must render byte-identically to §1's string; a second rendering
  of one measurement is the drift this page cannot afford. **PM has a real call here**: if the repeat
  is judged wrong, the fallback is pre-authored in the file — drop `ACTIVE BUILD` from both cards, no
  other string changes.
- **"The list is growing" is carried by the card format, not by a sentence.** The seed says the list
  grows and in the same breath bans the hype; a sentence asserting future growth is an unmeasured
  claim on a page whose proposition is checkability. No third placeholder card, no "next", no ghost
  slot.
- **§6 is the lead line, the `curl`, `cd my-product && claude`, and one GitHub link — nothing else.**
  The seed's "Nothing else" is stated as an inventory: no `VERIFY ⎘` chip (§6 makes no measured claim
  for one to verify), no copy-to-clipboard control, no license line, no requirements list. Two build
  notes the strings depend on: a rendered `$` prompt glyph must be `aria-hidden` and outside the
  selectable command text, and the `cd my-product` argument tracks the `curl`'s `bash -s my-product`.
- **The `curl` was verified by string equality, not by fetching** — byte-equal across
  `copy-rules.md` R12, `product-spec-seed.md` §6, `section-01-copy.md` §8 and `section-06-copy.md`.

**Mechanical checks run before filing** (script over the shipping strings only — fenced blocks and
backticked table values, so the files' own commentary can't launder a pass):

| Check | Result |
|---|---|
| `curl` byte-equality across four files | equal |
| §4 seed-vs-shipped word diff, all 16 rows | 3 diffs, all documented; 420 → 415 |
| §4 sentence count | 30 → 30 |
| §4 titles + stamps verbatim; `product` stamp digit-free | pass |
| §5 provenance line byte-identical to the seed | pass |
| Wave-scope tokens (`$24.73`, `289`, `~64`) in §4/§5/§6 shipping strings | none |
| §5 scope labels + dashes + `measured at launch` present | pass |
| Stated word counts recomputed (§5 ×3, §6 ×1) | all match |
| Banned adjectives, `proven`, `coming soon`, `muster.build`, `!` | none |

**Self-review notes:** no code or shipped file changed, so no harness run applies to this step; the
three deliverables are copy files. Durability (Rule 15): no handoff, sprint, or gate reference appears
in any of the three files. Open questions are the two §4 findings and the §5 `ACTIVE BUILD` call
above — all three are review items, none blocks the next step. No cascade edit was mine to make:
`agent-context/content.md` still carries this step as upcoming, and it is PM-owned.

### 2026-07-26 HO-022 — scroll-snap specified: one section at a time, with §2's exemption proven rather than declared
**Type:** handoff
**Producer:** ui-ux
**Deliverable:** amended `knowledge-base/design-specs/web/page-shell.md` — new §7.1 (the snap system),
plus §7, §9, §10 (budget note + reduced-motion row), §11 and §13 amended to match
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Summary:**

- **The whole feature is four lines of CSS on the document scroller, and it is measured, not proposed.**
  `scroll-snap-type: y proximity` on `:root`, `scroll-snap-align: start` on `.section`, a
  `.section--no-snap` modifier on §2, and a reduced-motion query. No JavaScript reads, writes, or
  intercepts the scroll position — the spec says so in its first paragraph, because that is the line
  between this and scroll-jacking.
- **`scroll-padding-block-start` is 72px, not 48.** The bar is 48px, but each section opens with a
  hairline rule whose line sits **7.89px** below the section's top edge — padding of exactly the bar
  height parks that rule 7.89px under the bar's own rule and the page's separator motif reads as an
  accidental double line. Bar + one `--rhythm` measures **32.2px of clear ground at 1280×900 and
  31.67px at 375×553**. The binding property is the clearance; 72 is its value.
- **§2's exemption is verified as a property, not asserted as an intention.** Sweeping every rest
  position across the §1→§2→§3 transition at a 40px step: of every sampled position where the playback
  core is ≥90% visible — **15 at 1280×900, 5 at 375×553 — the engine moved not one.** The ≥95% start
  gate is therefore reachable and the pause threshold is never triggered by a snap.
- **The proximity range is a measured user-agent constant, ≈0.3 of the snapport**: 275px at 1280×900
  (0.306), 159px at 375×553 (0.288), 189px at 360×640 (0.295), 123px at 720×450 under 200% zoom
  (0.273). Nothing in the design depends on its exact size, and the spec says so — but the §2 boundary
  argument needed a number rather than a hope, and the contingency if a future engine widens it is
  named in the spec (§3 takes the modifier too and the set begins at §4).
- **Keyboard survives, driven with real key events rather than `scrollBy`.** Ten `ArrowDown` presses
  give ten strictly increasing positions at both viewports — byte-identical to the snap-off sequence at
  1280×900, and differing at 375×553 by **one 16px adjustment on a single press** before resuming its
  40px step. `PageDown` reaches the document end with no backward step and no section skipped; on the
  phone the later presses land exactly on section starts. **This distinction is load-bearing and is
  written into the assertion**: the programmatic (`window.scrollBy`) version of the same check reports a
  trap at the top of the page that a real reader never experiences, so a harness written that way would
  fail a correct build.
- **Reduced motion: snapping is OFF, and the reasoning is stated rather than assumed.** What reduced
  motion would suppress is not the snap position but the glide to it — every engine animates that
  adjustment and **no author declaration bounds it** (`scroll-behavior` governs author-initiated scrolls,
  not the UA's snap correction). Every other motion on this page is capped by a token; this one cannot
  be. It is post-gesture, viewport-scale, and unrequested. Turning it off costs zero content, which is
  the same standard every other reduced path on this page meets. The counter-argument (snap is position
  selection, and some readers use it to orient) is stated in the spec and rejected on the record.
  `--scroll-pad` stays on under reduce — it serves anchors and find-in-page, not motion.
- **Both phone and desktop.** Gating on `--bp-wide` would key an interaction decision to a
  page-*chrome* breakpoint; the honest reasons to exclude phones — fling momentum, dynamic toolbars —
  are pointer and platform properties, not width, and the pull is a fraction of the snapport so it
  already scales with the screen.
- **Eleven relationship assertions** (§7.1), each with its failure mode. Three are traps a harness
  author would otherwise walk into: **A1** — `y proximity` *serialises as the string `"y"`* because
  `proximity` is the initial strictness, so an assertion on the literal `"y proximity"` fails a correct
  build while `"y"` alone also excludes `mandatory`; **A2** — the padding is asserted as *bar height +
  `--rhythm` read from the page*, never as 72; **A8** — real key events, per above. **A4** additionally
  asserts that *no other element in the document* carries a non-`none` `scroll-snap-align`, which is what
  catches a snap-align added inside §4 or a card later.
- **No harness re-base is forced.** Nothing in `verify-shell.mjs` or `qa-independent-audit.mjs` asserts
  scroll behaviour; `scroll-snap-align` and `scroll-padding` have no layout effect, so §2's 48.00 s
  schedule, its three-entry window, the 37-column floor and the 12px equality are untouched by
  construction. Confirmed: `bash scripts/test.sh` is **GREEN** with the tree as filed.
- **One markup change, named so it does not collide with the build step's charter**: `.section--no-snap`
  on §2's `<section>`. A modifier rather than an id selector because the stylesheets carry no id
  selectors and a developer restructuring §2 should meet the exemption in the markup they are editing.

**Verification run this session.** Four measurement probes in `/tmp` (deliberately — `verify-shell.mjs`
globs `styles/` and `scripts/` into the shipped set), driving headless Blink over `index.html` with the
spec's CSS injected: geometry and snap-set audit at 1280×900 / 375×553 / 360×640 / 720×450@200%; a
binary search for the proximity range at each; a 40px sweep of every rest position across §2 with core
visibility sampled at each; real `Input.dispatchKeyEvent` arrow and page-down sequences with snap on and
off; and a final pass applying the spec's CSS block *verbatim* with the modifier class, which reproduced
every figure in the spec. **No shipped file was modified this session** — the deliverable is
knowledge-base only, and `scripts/test.sh` was run to confirm the baseline is green under that claim.

**Cross-engine — read this before accepting the build step as written.** Measurements are Blink-only,
and for this feature that is not a spec-stage convenience but a project limit: `qlmanage` renders a
static thumbnail and cannot scroll, so the existing WebKit harness has nothing to measure here. REQ-007
above asks PM to rule on the method. The spec's Cross-engine subsection states the limitation in the
durable file so a later reader cannot mistake a Blink result for parity.

**Would Apple ship this? — Yes, because it is removable in four lines and it never takes the scroll away
from the reader.** The reader's gesture always wins; the page only chooses where to settle, the choice is
bounded by a UA constant nothing depends on, and the one section whose correctness depends on not being
moved is exempt by declaration and proven unmoved by measurement. The honest reservations: (1) the
phone's §1→§2 boundary has an attracting position roughly 160px wide, so a reader arrow-stepping out of
the hero meets one 16px correction — small, measured, and stated, but real; (2) every measurement here is
taken against a shell whose sections are still placeholders, so the *behaviour* generalises but the
*heights* do not, which is why every figure is re-derived by the harness rather than hardcoded; (3) the
WebKit half is a manual check until REQ-007 is ruled, and a manual check is weaker evidence than this
project normally accepts.

**Open questions carried:**
- REQ-007 — the WebKit method for a scroll behaviour.
- A11 is the mechanical stand-in for find-in-page, not the thing itself: the browser's find UI is not
  scriptable. The spec says so plainly and names real Cmd+F in both engines as a manual step. The build
  step's "find-in-page asserted in the harness" criterion should be read as A11 plus that manual check.

**Observation for PM, not a request.** `muster-requests-lint.sh` fails this file on its 300-line Active
budget — 360 lines before this step, 487 after. It is not drift: every entry is a Wave 1 handoff
deliberately held `in-review` until the single batched PM review step, which is this sprint's design.
The lint assumes handoffs resolve as they are produced; a batched-gate sprint holds six open at once by
construction. Reconciling is PM's (Rule 1), and it resolves itself at the Wave 1 review step — flagged
only so the failing lint is not read later as a filing defect.

### 2026-07-26 HO-021 — §4 specified: four spec-sheets buildable from the file, with zero rust text
**Type:** handoff
**Producer:** ui-ux
**Deliverable:** `knowledge-base/design-specs/web/section-04-decisions.md` (new); amended
`knowledge-base/design-specs/web/page-shell.md` (§8 spec-sheet motif row — the two-option mechanism
clause settled to the surviving branch); DEC-039
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Summary:**

- **Buildable from itself, and the numbers are rendered, not derived.** A probe page in the real
  tokens (all four sheets, seed-draft strings) was measured in headless Blink at
  320/360/375/390/960/1280, both themes screenshotted, and the announced structure read from the AX
  tree. The spec carries the measurements: card **903.31px** with prose at **685.31px = 64ch** at
  1280, single-column prose 21.6–28.4ch across phones, per-sheet title line counts as ceilings, zero
  horizontal scroll everywhere.
- **The 64ch ruling** (DEC-039.1): the reading column governs the prose being read, not the artifact
  containing it — the `<dd>` column takes `--read-max` and the card exceeds it by exactly the fixed
  6rem label column + gap + padding. Squeezing the card into 64ch would cut real prose to ~50ch.
- **The emphasis system under the failed pair** (DEC-039.2): **zero rust text in §4** — the banned
  filled-rust move is replaced by a 2px `--accent` bar inset `--gap-hairline` from the card's inner
  edge on each Mechanism row (the accent-mark idiom's third seat, measured 12.00px on all four
  sheets) plus the label in ink bold. Painted `background-color`, never `color`, so the audit's
  rust-text sweep (verified keyed on computed `color`) never sees it. Deliberately NOT a member of
  §2's two-layer inset equality.
- **The stamp is one text slot, not a date field** (DEC-039.3): all four seed shapes — including
  `product — Bodh` with no date — render as one text run; the no-date case ships exactly as
  supplied, no invented date, no dash (dashes are for unmeasured metrics; a stamp is provenance).
  Parens don't render; the stamp construction is the enclosure.
- **First person typographically** (DEC-039.4): founder voice in sans sentence case full-ink (titles
  bold at kicker scale — the only bold sans-at-kicker text on the page), machine chrome in mono
  tracked uppercase; no quotes, no pull-quote styling, no per-sheet attribution.
- **Announced structure measured**: 4-item list (`role="list"` restores WebKit semantics), each item
  h3 (full title sentence, `<em>` included in the computed name) → stamp → a description list of
  exactly 4 term/definition pairs. Strongest-first is the seed's order and the spec forbids
  reordering.
- **12 relationship assertions** (§12), each with a stated failure mode — including "the `product`
  stamp contains no digit" (the no-date case must never gain a date) and a whole-section static
  assertion (no animation, zero focusable elements). **No existing harness site re-bases** — nothing
  asserts `#the-decisions` beyond the shell placeholder, whose counts drop symmetrically; two build
  pointers filed in §13 (the audit's 64ch probe gains its ideal permanent target; the marks join the
  decorative sweep).

**Interface note for review**: `section-04-copy.md` does not exist yet — it lands with the §4/§5/§6
copy step. The spec's §3 copy contract names the exact six strings per decision it consumes (title,
stamp content, four row values), and all measurements were taken against the seed's locked draft, so
they are ceilings under "tighten, never inflate."

**Cross-engine.** Measurements are Blink-only — this ships a spec, not a build. Three constructions
carry named WebKit risk, each stated where it lives: `<dl>`-with-`<div>`-wrappers AX exposure and
the weak VoiceOver description-list announcement (§3 — verify the term/definition pairs announce),
the label/stamp casing divergence (Blink announces rendered uppercase, WebKit source case — all
string assertions case-insensitive, §11), and `inset-inline-start` with a token calc on the mark's
`::before` (§7). Verify all three in WebKit and Blink before filing the build.

**Verification run this session.** Probe page and scripts in `/tmp` (deliberately — `styles/` and
`scripts/` are globbed into the shipped set): rendered measurement at six viewports, dark + light
full-page screenshots at 375 and 1280, `Accessibility.getFullAXTree` for headings, list, and dl
structure, and corrected-geometry re-measurement. No shipped file was touched this session (spec and
knowledge-base only), so the harnesses' state is unchanged from the green baseline confirmed at
HO-019.

**Would Apple ship this? — Yes, because the system has no special cases.** One construction absorbs
all four stamp shapes; the odd one (no date) costs nothing because the stamp was never a date field;
the emphasis system needs zero rust text; a fifth decision is one more `<li>`. The honest
reservations: the longest title runs 6 lines at 320px (5 at 375) — a lot of bold display on the
smallest phones, accepted because the titles are the section's skim layer and the rendered sample
will show it either reads or shouts; and the longest stamp wraps to two lines on phones, accepted
rather than forking the micro token's tracking for one string.

**Revision log:**
- 2026-07-26: Probe caught the mechanism mark sitting at 11px from the card's inner edge — the inset
  calc carried a spurious `- 1px` border term (the row's coordinate space is already inside the
  border). Corrected to the token-only calc; re-measured 12.00px on all four sheets.
- 2026-07-26: Self-review caught two durability violations in the spec (a founder-gate reference and
  a "today" framing in the harness section) — reworded to current-truth before filing.

### 2026-07-26 HO-020 — §1 specified: the verdict fits the fold, measured, and the headline announces clean
**Type:** handoff
**Producer:** ui-ux
**Deliverable:** `knowledge-base/design-specs/web/section-01-hero.md` (new); amended
`knowledge-base/design-specs/web/page-shell.md` (§3 `--text-display`, §10.1); DEC-038
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Summary:**

- **The fold is now falsifiable.** At the 375 × 553 budget case the measured line's bottom edge is
  **461.8px — 91.2px above the fold** — a rendered measurement against the real tokens, not a
  derivation, with the item-by-item table in the spec §3. The **primary** measured-line form ships at
  every viewport; the compact form stays unspent as the named fallback. Named honestly: landscape
  phone (667 × 331 visual) cannot hold the full verdict stack and the spec says what *is* above the
  fold there instead of claiming "every viewport."
- **The display floor was wrong against real strings, and is amended** (`page-shell.md` §3,
  DEC-038.1): 2.4rem gives a 14-character line at 360px — candidate B sets 4–5 broken lines and
  **overflows 320px inside the unbreakable struck phrase** (measured, `overflow=true`). At 1.75rem
  every candidate sets 2–3 whole-phrase lines with zero overflow, via a nowrap break-unit system (§4.2)
  rather than `<br>`. This is exactly the defect the copy-before-design resequencing existed to
  surface; the copy file's own "two lines at 360px" rationale was also off by measurement, which
  changes no string — noted as OBS-004.
- **The headline's announced strings are measured, not asserted.** From the Blink AX tree: candidate B
  computes `Ship a product with AI agents.` with the struck phrase absent (mechanism: `aria-hidden`
  on the `<s>`, markup per candidate in §4.3). One cross-engine fact the build must encode: **Blink
  computes the name from rendered (uppercased) text, WebKit from source text** — the equality
  assertion is case-insensitive word-exact. Select-and-copy still yields the full visible sentence;
  stated as accepted, since only the announced string excludes the edit.
- **The hero terminal is §2's component, third instance of the one gutter system** — it inherits
  `--mark-inset`/`--mark-width`/`--mark-clear` and never re-derives a left edge. Playback ruled
  (DEC-038.2): all twelve corpus lines, 1.40s cadence, §2's 0.35s same-stamp pair rule, a 2× gap
  before L12, **once per load, no loop**, resting on `deploy · bodh.day · LIVE`; visibility-triggered,
  pauses unwatched; 3-entry window below `--bp-wide`; two-column engages at 1200px with a fixed 623px
  terminal column (74 columns), the same mechanism as §2's desktop rail. Reduced motion / no JS:
  complete log immediately.
- **Scope adjacency (A-005) is structural** (§10): whole-product proof is one contiguous block, the
  wave terminal follows it behind a `--gap-major` seam, every surface carries scope in its own chrome,
  the wave's aggregate figures (`$24.73` · `289` · `~64`) exist nowhere in §1 — asserted, not trusted —
  and the two scopes never share a component grammar (cells vs log).
- **Formation built to hub-is-PM** (DEC-038.3): `<ul>` of eight locked names, PM first with the accent
  border and hub position, bus/stems decorative and absent from the AX tree, `8 AI AGENTS · 1 OPERATOR`
  caption. The pending founder ruling swaps label sets, not geometry.
- **Chip ruled**: `href="VERIFY.md"`, accessible name `Verify these numbers — VERIFY.md` (visible
  label contained — WCAG 2.5.3). Readout: THIS SITE above BODH, dashes ink and inert, count-up only on
  the two numeric BODH values with final-frame byte-exactness; phone readout is stacked key/value rows
  because `bodh.day` at the 24px rust floor measurably does not fit a third of a phone column.
- **13 relationship assertions** (§13), each with a stated failure mode, and a **re-base table**
  (§14): the audit's 64ch probe reads the shell placeholder (`qa-independent-audit.mjs:346`) and dies
  when §1 lands — re-target to `.slot .t-body`; `#hero-title` must survive on the real h1 for
  `verify-shell.mjs:264`; placeholder-count checks survive symmetrically; no harness asserts the old
  display clamp (verified by grep).

**Cross-engine.** Measurements are Blink-only — this ships a spec, not a build. Three constructions
carry named WebKit risk, each stated where it lives: the AX-name casing divergence (§4.3), the
eyebrow separators' `content: "·" / ""` alt-text syntax (older WebKit falls back to the plain
declaration — separator renders, may be announced; the double declaration is specified), and the
`text-decoration-thickness` on the display-size strike. Verify all three in WebKit **and** Blink
before filing the build.

**Verification run this session.** A probe page and script in `/tmp` (deliberately — `styles/` and
`scripts/` are globbed into the shipped set) rendered the four candidates and the verdict stack in
the real tokens, foreground in headless Blink, at 320 / 360 / 375 / 390 / 667×331 / 1280×700, under
both floor values, plus `Accessibility.getFullAXTree` for all four computed names. No shipped file
was touched this session (spec and knowledge-base only), so the harnesses' state is unchanged from
HO-019's green baseline.

**Would Apple ship this? — Yes, on the strength of what was removed.** The verdict stack is four
text blocks and nothing else above the fold; the proof is one contiguous instrument block; the
stream ends on the shipped artifact and never loops. The honest reservations: candidate B at three
lines on a phone is a lot of display type — if it reads as shouting when rendered, candidate A is
the fallback and needs no spec change; and the 1200px two-column condition is a second layout
engage point beyond `--bp-wide`, accepted because the alternative (a share-based terminal column)
is the exact proportional-column risk §2 warns against.

**Revision log:**
- 2026-07-26: Self-review caught the first fold budget omitting `.section--hero`'s `--gap-section`
  top padding (the probe section lacked the class — 96px). Re-measured; every figure above includes
  it.
- 2026-07-26: Self-review caught assertion "rust floor" failing the emphasis system's own permitted
  glyph marks (the log's `✓`, the chip's `⎘`) — re-scoped to fail rust *words* below AA-large while
  passing duplicated-in-ink glyphs, matching shell §2.3.2.

**Observations:**
- OBS-004 — Copy file's headline-budget rationale is off by measurement   Severity: low
  Evidence: `section-01-copy.md` §2 justifies the ≤9-word budget with "display-size mono must set on
  at most two lines at 360px"; measured, no candidate over 6 words sets two lines at any phone width
  (B/D set three whole-phrase lines at the amended floor). The budget itself is right; no string
  changes.
  Suggested action: PM notes it at review; wording is Content's to tidy if the file is ever reopened.

### 2026-07-26 HO-019 — the terminal's left edge closed as a system; pennant seats specified
**Type:** handoff
**Producer:** ui-ux
**Deliverable:** `knowledge-base/design-specs/web/brand-seats.md` (new); amended
`knowledge-base/design-specs/web/section-02-replay.md` (§7, §7.1 rule 1, §9, §9.1, **new §9.2**,
annotation 4, §12, §13) and `knowledge-base/design-specs/web/page-shell.md` (§8, §9, §10, §12, §13);
DEC-036, DEC-037; REQ-006
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Summary — A, the left edge.**

- **The mark leaves the text flow.** `border-inline-start` comes off `.log__line`; the key-beat mark
  becomes a real, empty, `aria-hidden` element positioned against its own line, and the log's
  inline-start padding opens the room it sits in (`--mark-inset` + `--mark-width` + `--mark-clear` =
  17.91px). That is the fix rather than a value change: the collision existed because the mark and the
  hanging indent *were the same CSS value*, and the indent can now be set to anything without the mark
  moving.
- **Five relationships, one assertion each**, in §9.2 with measured values: R1 mark↔card **12.00px**
  (both layers, every viewport), R2 mark↔text **3.91px** (was 0 — this is F-G3), R3 row↔row **19.50px /
  6.50px**, R4 entry↔entry **31.50px / 18.50px = 2.85× R3**, R5 text↔wrap-edge **37 columns at 360px**.
  R3 and R4 already had relationship-shaped assertions and are **not** re-based; R1's needs its
  hardcoded `12` replaced by a read of `--mark-inset` plus an equality clause; R2 and R5 need the checks
  named below.
- **The indent is deliberately not a sixth relationship.** It kept moving the other five. It stays at
  1ch with its existing assertion and is now independent of all of them.
- **Both constraints hold — measured, not derived.** The 12px equality survives at 12px in both layers;
  the 37-column floor holds at 360px with 2.4px to spare; all of L1–L11 still set exactly two rows at
  360/375/390/393; 320px is unchanged at two whole entries; entry grouping, row pitch and the core height
  are untouched. §7.1 rule 1's fallback **did not fire**, so nothing was traded.
- **No column is lost** at 360, 375, 390 or `--bp-wide` (76 there, against L3's 74). Two counts fall by
  one: 393px → 41, which is the figure §7.1's own table already carried, and the landscape terminal
  column → 39, which §12 had already pre-authorised in writing as "margin spent, not a defect."
- **The narration mark does not move**, in either layout. The equality holds at its accepted value, so
  there is nothing for that layer to follow. §9.1 now also states that mark↔*text* is deliberately
  per-layer and why — an unstated difference between these two layers is what produced the flush-tick
  finding originally.
- **The shaped advance measures 7.83px**, not the 7.847 the §7.1 tables derived on. Every figure in that
  table is now a measurement and the floor's pixel equivalent is 289.7. This is also why the assertions
  bind on **column counts** and report pixels — a hundredth of a pixel must not fail a correct build.

**Summary — B, the pennant seats.** `brand-seats.md`. **6 × 9px at every page seat**, chosen because 9px
is the section rule's own end-tick height (so the separator reads as one machined assembly) and because at
that size the mark puts 23% *less* ink on the page than the square while reading stronger. 8 × 12 was
rendered and rejected as badging. Bottom edge on the baseline, `--gap-hairline` to the words unchanged.
**The underscore is a drawn 1ch × 2px bar three pixels under the baseline, inside the wordmark's own text
run** — as a flex item it takes the lockup's 12px gap and reads as a floating dash, which I rendered
before ruling. **The header's accessible name stays exactly `MUSTER`**; both marks are `aria-hidden`, and
because the underscore is a drawn box rather than a character there is no text node to announce, so the
ruling and the mechanism agree. Favicon is the founder's house tile restated at a 16-unit viewBox (the
exact `data:` URI is in §6). **Footer lockup ruled out** — DEC-037.4, REQ-006.

**Assertions the build must re-base — by file and line.** These pass today and will not survive the
change; every one is re-based to keep failing when its relationship is violated, never deleted.

| Site | Today | Re-base to |
|---|---|---|
| `verify-shell.mjs:372` | `tagMark.w === 8 && tagMark.h === 8` | 6 × 9, height **equal to `.rule__tick`'s** (the shared measure), `clip-path` not `none`. Plus a new check that `.tag`'s rendered block size is unchanged |
| `verify-shell.mjs:607–617` (`ACCENT_PAIR`) | reads the *line's* rect as the mark | read `.log__mark`'s own box; narration's is still its entry's border-box edge. Mechanism-agnostic by design |
| `verify-shell.mjs:615` (`pairOK`) | `Math.abs(p.terminal - 12) < 0.5` — the hardcoded value | equality of the two insets **plus** `terminal >= 4 × markWidth`, with the expected figure read from `--mark-inset`. Fixes all three call sites (`:783`, `:811`, `:1021`) at once |
| `verify-shell.mjs:676`, consumed at `:709` | `tick: css(lines[i], "border-inline-start-color")` | the mark element's `background-color`, and that it exists on exactly L4 and L9 |
| `verify-shell.mjs:880`, `1126`, `1186`, `1268` | `rect.width - border-inline-start-width` | drop the subtraction — the term is now always 0, and leaving it in implies the mark is still in the flow. Derive the first row from the log's content box and assert `firstRow === logContentWidth` |
| `verify-shell.mjs:1126` (the `ink` clause) | "the first character sits at the same x as before" | it deliberately moved. Assert it sits at `--mark-inset + --mark-width + --mark-clear` from the card and the first row still clears 74 columns |
| `verify-shell.mjs:1298` | reports "split sized to deliver 40" | still `>= 37`; the reported figure is now 39 |
| `qa-independent-audit.mjs:735` | `s.borderInlineStartWidth + " " + s.borderInlineStartColor` | the mark element's `inlineSize` + `backgroundColor` |
| `qa-independent-audit.mjs:825–828` | `/^2px/.test(k.tick)` | the mark's measured width and colour. **`accentRgb` at `:824` is assigned and never read** — delete it rather than re-base it; it is a fossil of the value-assertion pattern |
| `qa-independent-audit.mjs:264` | decorative sweep omits the new marks | add `.log__mark` and `.brand__rule` |

**Two new checks, because nothing existing covers them**: R2 (the mark clears the timestamp on L4 *and*
L9 — the property that measured 0 in the build the founder gated), and that `.brand__rule` carries no
animation or transition in either motion path.

**One trap to hand over explicitly**: the mark must be painted with `background-color`, never `color`.
`qa-independent-audit.mjs` builds its small-rust-text audit from elements whose `color` resolves to the
accent, so a mark painted with `color` joins that set and fails as sub-AA text.

**Cross-engine.** My measurements are Blink-only — I am shipping a spec, not a build. Two constructions
carry real WebKit risk and are named where they live: **`align-self: baseline` on an empty flex item**
(no text to synthesise a baseline from — `brand-seats.md` §11) and the absolutely-positioned mark's
`inset-block: 0` against a line box that the reveal also transforms. Verify both in WebKit **and** Blink
before filing; a Blink-only pass is not a pass.

**Would Apple ship this? — Yes, and the honest reason is that the mechanism is subtractive.** The fix
removes a CSS value rather than adding one, which is why nothing adjacent moved. On the mark itself: at
3.91px a 2px rule sits about half a character clear of the text, which is the marginal-change-bar idiom a
diff gutter uses — I rendered a key-beat frame in both layouts before writing it down, and it reads as a
mark in its own gutter rather than as a thin compromise. On the pennant: 6 × 9 is the size that reads as
punctuation instead of badging, and I rejected the arithmetically-obvious 8 × 12 for that reason. The one
place I would not claim excellence is R5's margin — 2.4px at 360px is thin, and it is thin because the
budget genuinely has no more room, not because it was spent carelessly. That is stated in §9.2 rather
than smoothed over.

**Verification run this session.** Both probes ran foreground against the real page in headless Blink,
before/after, at 320 / 360 / 375 / 390 / 393 / 667×375 landscape / 960 / 1440, plus rendered key-beat
frames at 375px and desktop and six rendered underscore treatments in both themes. Probes lived in
`/tmp`, deliberately: `verify-shell.mjs:527` globs `styles/` and `scripts/` entirely, so a probe file
placed there would have joined the shipped set and the zero-request surface.

**The baseline is confirmed green, this session, foreground**: `bash scripts/test.sh` ✅ GREEN
(both engines) and `node tests/qa-independent-audit.mjs` **106/106, exit 0**. This step ships no code, so
that is a baseline rather than a result — the ten re-bases above are the Developer's to land, and they are
what will turn parts of it red until they do.

**Revision log:**
- 2026-07-26: Self-review caught that the acceptance criterion asks for the five relationships' values to
  be *shown* to hold, not derived. §7.1's table was carrying figures derived on a 7.847px advance; every
  figure is now measured and the advance is recorded as 7.83px, which moved the floor's pixel equivalent
  and is why the assertions bind on column counts instead.
- 2026-07-26: Self-review caught that the first underscore treatment I specified — a third flex item of
  `.brand` — would inherit the lockup's 12px gap. Rendered, confirmed, and restructured into
  `.brand__word` before filing rather than after.

### 2026-07-26 HO-018 — §1 and §3 copy; SP3 shortened and measured clear at 320px
**Type:** handoff
**Producer:** content
**Deliverable:** `knowledge-base/design-specs/web/section-01-copy.md`,
`knowledge-base/design-specs/web/section-03-copy.md`, amended
`knowledge-base/design-specs/web/section-02-narration.md` + `index.html` (SP3, applied together
because the harness asserts the strings identical)
**Status:** in-review
**Reviewers:**
- [ ] PM — pending

**Summary:**
- **§1**: four headline candidates with per-candidate announced strings — A the anchor, B the
  founder's edit mark with the article break repaired (★ recommended; announced string
  `Ship a product with AI agents.`), C the ambiguity resolved in words, D the name as collective
  noun. One shared subline (11 of 12), the measured line reframed off "this build" to
  `Bodh … idea → live` in primary (18 of 20) and compact (12 of 14) forms, eyebrow verbatim,
  formation label sets for both hub readings pending the founder's formation ruling, readout strings
  with dashes + `measured at launch`, the curl verified identical by string equality, terminal
  chrome labels shared with §2 so the wave scope is carried by the label.
- **§3**: kicker (10 of 12) + one paragraph (85 of 90). CrewAI/AutoGen clause ships **named** —
  ruling and grounds in the file §5, with the 63-word cut pre-authored so "cut, not softened" is
  executable without reopening copy (DEC-035).
- **SP3 lever pulled** (DEC-027.1 → DEC-035): 24 → 19 words, beat preserved. Measured resolved:
  audit reports 5 lines at 320px against the 6-line card; timed total now 134 of 163.
  `scripts/test.sh` GREEN and `qa-independent-audit.mjs` 106/106, exit 0 — both run foreground this
  session. Pre-launch 320px item closed on that evidence.

**Revision log:**
- 2026-07-26: Self-review caught the acceptance criterion "every string carries a word count and
  budget" colliding with locked strings that may not vary (role names, curl, readout values) —
  resolved by stating equality-verification for locked strings in §1's rules rather than inventing
  unfalsifiable budgets.

**Observations:**
- OBS-001 — Stale SP3 counts in PM-owned context   Severity: low
  Evidence: `agent-context/content.md` (SP3 at 24 words, timed total 139 of 163); historical
  mentions in `wave-review.md:60` and Resolved handoff one-liners are records of their moment and
  need no edit.
  Suggested action: PM refreshes `agent-context/content.md` at next cascade.
- OBS-002 — Audit report prose now stale on two rows   Severity: low
  Evidence: `qa-independent-audit.mjs:1151` prints "SP3 is N characters, the longest slot" (computed
  live, still true at 134 chars) and the 320px SP3 row still says "DEC-027.1 — deferred"; both are
  report labels, not assertions.
  Suggested action: tidy wording in the spacing-system step, which already re-bases audit checks.
- OBS-003 — Totals-strip third line at 320px no longer reproduces   Severity: low
  Evidence: audit reports the value line at 2 lines, 246.34px of 272px content width at 320px
  (DEC-027.2 expected a third line).
  Suggested action: none — recorded so the next §2 measurement doesn't treat the old figure as
  baseline.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

- 2026-07-26 — HO-017 (QA): rebuilt phone log validated green on every criterion; entry split and the
  single 12px accent inset both hold, cross-engine. Accepted at gate 3 with one carried defect — the
  key-beat tick collides with the timestamp, folded into Sprint 2's spacing system (DEC-032).

- 2026-07-26 — HO-016 (Developer): phone log reads as entries and the rust mark takes one inset in both
  layers. The log's single leading split into a row pitch and an entry separator, so entries sit ~2.85×
  further apart than the rows inside them and the section got 7.2px *shorter*. Two re-gate findings were
  corrected in the doing: the tick was flush at every viewport, not only mobile, and the horizontal room
  was never spent — the corpus holds at two rows down to 37 columns against 41 shipped. Full detail in
  git history.

- 2026-07-26 — HO-015 (UI/UX): the phone log groups into entries and the rust mark takes one 12px
  inset in both layers; accepted with notes, no revision (DEC-030). Everything re-derived at review: the
  379.4px core item by item, the 39.0px entry box and 51.0px pitch, all five viewport rows unchanged at
  3/5/5/5/5, and the 2.85× ratio confirmed as whitespace between glyph boxes — 18.5px against 6.5px,
  where a single leading gives 11.7px on both sides, so the absolute entry gap *rises* while the section
  gets 7.2px shorter. The load-bearing floor was checked by simulating greedy `pre-wrap` against the
  corpus rather than against its citation: all of L1–L11 hold at two rows down to exactly 37/36 columns
  and L3 breaks first below it, with zero rounding margin at the floor — which is what makes §7.1's
  measure-at-360px requirement real rather than ceremonial. Neither closed guarantee was touched.
  **Four unnamed breakages routed to the build step**, the sharpest being that the desktop rail's inset
  is set twice and the live one wins, so the obvious fix passes a static check and is wrong on screen for
  the whole chain. **Three spec corrections applied rather than returned**: "line region" meant two
  different widths in one file, §9.1's 12px contradicted §7.1's yield clause (the invariant is the
  equality, not the number), and §12's landscape check bound at a derived 40 with under a tenth of a
  column of headroom — the same assert-something-adjacent failure class that has already cost this
  project three checks. The open item ruled by amending `page-shell.md`: the leading in a
  component-scoped pairing is the one-row case. Full detail in git history.

- 2026-07-26 — HO-014 (QA): §2 re-validated after the fix wave; accepted. `qa-independent-audit.mjs`
  exits zero for the first time at 106/106 with 9 measurements, and the four superseded assertions were
  re-derived against the spec rather than re-read from the producer's handoff. Six checks added for §12
  rows that only the shipping harness had carried. Findings disposed: the four superseded assertions
  confirmed spec-superseded, the `pre-wrap` hanging-space red confirmed as a check defect and re-based,
  the audit's growth ratified, and the landscape line-count qualifier now applied to the gate packet so
  the founder does not read a correct measurement as a miss. Both 320px items stay deferred (DEC-027).

- 2026-07-26 — HO-013 (Developer): §2 rebuilt to the amended spec and copy; accepted. SP7 and all ten
  narration slots diffed against the narration file at 10/10, the phone terminal wrapping with three
  whole lines at 375 × 553 and the core at 479.52px against 479.54 budgeted, timing untouched at 4 ms
  worst drift. The 320px constant-trap PM routed at the previous review sprang exactly as predicted and
  was avoided by measurement. Both landscape figures confirmed by measurement rather than derivation.
  Superseded on the mobile log by DEC-028's two gate findings, which is the fix round DEC-029/DEC-030
  close. Full detail in git history.

- 2026-07-26 — HO-012 (Content): SP7 reframed to the operator's arc; accepted, no revision. Recounted at
  review rather than read: 15 of 16 words, 4.29 s of the 4.80 s hold, SP6's relief unspent at 10 of 12,
  timed total unmoved at 139 of 163, every budget re-derived as `floor(window × 3.5)`. DEC-024's
  guardrail satisfied — zero adjectives-as-argument, the effect carried by tense landing on
  `awaiting operator`, deploy boundary intact ("deploy-ready," never "deployed"). All five arc beats
  verified in the corpus rather than against the citation table, and the one inferential step (the
  corpus's planning statement is agentless) chased and cleared on record. Full detail in git history.

- 2026-07-26 — HO-011 (UI/UX): §2's phone terminal wraps instead of scrolling sideways; accepted, no
  revision. Every figure re-derived from tokens at review — 379.4px core, 3 lines at 375 × 553 with
  25.4px slack, all five viewport rows, both landscape columns, the 478.2px floor — and the two build
  measurements land on the arithmetic to 0.01px. The load-bearing constant re-checked against the corpus
  itself: eleven of twelve lines exceed 41 columns and all of L1–L11 cost exactly two rows, longest
  token 18 characters against 34, so the wrap backstop is genuinely unreachable. Trade accepted on
  merits — the alternative to three whole lines is five first-halves. Four findings disposed, one spec
  gap closed (annotation 7 stated the fit constraint but not the tracking that achieves it), one
  implementation trap routed to the build step (§7.1's 49.4px constant is a ceiling below 375px and the
  window must be quantised by measurement). Full detail in git history.

- 2026-07-26 — HO-007 (QA): §2 replay validated; accepted. 20/20 criteria green, 7 measurements
  reported rather than asserted; `scripts/test.sh` 129 Blink + 13 WebKit, independent audit 99/100 with
  the single red left deliberately failing until the founder rules on `64ch`. Seven defects found and
  fixed in the audit itself — five had turned eight checks red against a correct build, and the WebKit
  row profile was blind by construction (bit-identical at 815375 inked pixels with all twelve lines
  hidden). Both harnesses re-run independently at review and both reproduce. Full detail in git history.

- 2026-07-26 — HO-006 (Developer): §2 replay built; accepted. Twelve corpus lines byte-clean, ten
  narration slots verbatim, schedule re-derived to exactly 48.00 s with worst drift 16.8 ms; phone core
  499.89px with both layers visible for 100% of the chain. Two bugs the producer's own harness caught
  before they shipped: an empty phone terminal for the whole playback, and a visibility gate that
  ignored the sticky bar. Three spec deviations accepted, each resolving a spec-internal contradiction.
  Full detail in git history.

- 2026-07-25 — HO-005 (Content): §2 narration written and accepted, no revision. All ten strings
  re-measured by script — 139 of 163 timed words, every slot inside budget and inside its read
  window, every budget correctly read as `floor(window × 3.5)`. Every rule verified line by line;
  the Safari catch absent, the whole-product aggregates absent, the corpus unmodified. Two claims
  chased rather than accepted and both held: SP6's "same instant" is measured at source, and the
  seed's honest headline beat is delivered whole across SP3/SP6/SP7. SP4's all-viewport split
  ratified; the totals-strip string ratified and cascaded into both replay wireframes. Two
  build-level items ruled alongside it and carried on the build step (DEC-022). Full detail in git
  history.
