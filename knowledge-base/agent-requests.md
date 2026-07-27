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

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

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
