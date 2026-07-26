# Agent Requests & Handoffs
<!-- Inter-agent communication queue. All agents check at session start. -->
<!-- Protocol + entry templates (REQ / HO / Observations format, ID rules, filing steps): muster/system-guide.md → "Agent Communication Protocol". The entries below also demonstrate the format. -->

## Active Requests
<!-- Entries with Status: open -->

## Active Handoffs
<!-- Entries with Status: open, in-review, or needs-revision -->

### HO-011 — §2 mobile terminal: the phone reads without a sideways gesture

**From**: UI/UX · **To**: PM (review), then Developer (build), QA (validate)
**Date**: 2026-07-26 · **Status**: done — accepted by PM 2026-07-26, no revision
**Deliverable**: `knowledge-base/design-specs/web/section-02-replay.md` — §3 (one line), §5.1, §7
(desktop note, annotations 4 and 7), §7.1 (rules, budget, viewport table, wireframe), §10, §11, §12,
§13
**Resolves**: F-G4 / DEC-025

---

**The mechanism: soft-wrap with a 2ch hanging indent, paid for by lifting the chain totals strip out
of the playback core.** At the 375 × 553 budget case the phone terminal shows **3 whole log lines**
instead of 5, and every line on screen reads to its last character with no horizontal scrolling in any
region — not the terminal's, not the page body's, at any viewport.

PM's position in DEC-025 was soft-wrap with a hanging indent, accepting 2–3 lines. This lands at 3,
which is the top of that range, and it gets there without touching fidelity, type scale, the narration
card, or the section's spacing rhythm.

**Prototyped and measured, not derived.** The candidate rule was applied to the built page in headless
Blink at five viewports and the results measured. Wrapping is what the numbers below describe, not what
they predict.

---

#### The measured arithmetic — and two corrections to DEC-025's figures

DEC-025 costed the trade at "~301px ≈ 38 characters" of terminal width and "~276px of scroll". Both
are slightly off, in the direction that makes the trade easier rather than harder. **The real line
region at 375px is 325px — 41 characters** at a measured mono advance of 7.847px, and the longest line
currently needs **268px** of horizontal scroll, not 276. `.log` carries block padding only, not inline
padding, which is where the 24px went. The direction of DEC-025 is untouched; only the numbers move.

| | Measured |
|---|---|
| Mono advance at `--text-terminal` (13px) | **7.847px** |
| Line region at 375px | **325px = 41 columns** |
| Corpus lines longer than 41 characters | **11 of 12** |
| Rows per line at 375px with the wrap rule | **exactly 2**, for all of L1–L11 |
| Terminal horizontal overflow with the rule | **0px** at 320 / 360 / 375 / 390px |
| Page-body horizontal overflow | **0px**, before and after |

**Eleven of the twelve lines are longer than the column**, so on a phone today no complete log line can
be read without a gesture. That is the finding restated exactly: it is not that lines are hard to
finish, it is that none of them can be.

#### Where the height came from

The fixed core drops **424.4px → 379.4px**. The 45.0px is the totals strip (33.0) and its
`--gap-hairline` (12.0), moved to sit immediately below the core rather than inside it.

That item was chosen because §7.1's own priority order already nominated it first when the core runs
short, and because it is not one of the two layers the mobile guarantee is about. The strip is static
evidence — it reads identically before, during and after the chain — so what it gives up is
simultaneous visibility with a playback it takes no part in. It remains present from load, one
thumb-flick down, and it is what the reader's eye lands on the moment the chain ends.

Verified by measurement rather than by derivation: `.replay__core` measures **499.89px** today at
375 × 553 (matching the signed-off budget to 0.01px once the 48px sticky bar is added back) and
**454.89px** with the strip lifted — the predicted 45.0px exactly.

| Viewport | Columns | Visible lines | Core used | Slack |
|---|---|---|---|---|
| **375 × 553 (the budget case)** | 41 | **3** | 527.6 | **25.4** |
| 360 × 640 | 39 | 5 | 626.4 | 13.6 |
| 393 × 659 | 43 | 5 | 626.4 | 32.6 |
| 390 × 664 | 43 | 5 | 626.4 | 37.6 |
| 375 × 667 | 41 | 5 | 626.4 | 40.6 |

**The guarantee floor improves from 499px of visual viewport height to 478.2px**, and the budget case
gains 20.3px of slack (5.1 → 25.4). That slack is deliberate, not spare: `100dvh` in mobile Safari is
still the unproven mechanism the whole budget rests on, and this is the first version of the budget
that carries real margin against it.

**Cost, stated plainly.** Taller phones lose more than the budget case does: 360 × 640 goes 8 → 5 and
the 659–667px band goes 9 → 5. The budget case goes 5 → 3.

#### Why 3 lines is not a retreat

Three wrapped lines put ~170 characters on screen where five clipped ones put ~205 — about 17% fewer.
Every one of the 170 belongs to a line the reader can finish; none of the 205 did. §2's claim is that
these are the real log lines, and a line the reader cannot reach the end of does not carry that claim,
however many of them are on screen. At B4's 3.2 s cadence a line survives ~9.6 s in a 3-line window,
which is ample to read one.

I was asked to push back if 2–3 lines makes the terminal read as broken rather than as texture. **It
does not, at 3.** At 2 it would — a two-line box stops being a log and becomes a caption — which is why
the totals strip was worth spending to reach 3, and why the clamp floor is 2 rather than 1.

#### The hybrid was costed and is rejected

Wrapping only the newest line and scrolling the rest fails twice over. It answers the founder's
complaint for one line in twelve — every older line still needs the gesture. And each reveal would
collapse the previous newest line from two rows to one, shifting every line in the window, which is the
exact class of motion the opacity-only playback model exists to prevent (§5.1). Cost paid, no benefit
bought.

#### Type scale, re-tested and still refused

DEC-025 costed the naive version (74 characters in one row → ~5px). The non-naive version is a modest
step down with wrapping still on: at 12px the line box shrinks to 22.8px but the column only reaches 45
characters, and the row budget is unchanged. At 11px it buys exactly one more line and spends the
legibility of the log on the one viewport where the reader holds the device closest. Not worth one
line.

#### Desktop: **unchanged, and now guarded**

Measured at 960 / 1024 / 1100 / 1280 / 1440px with the wrap rule applied: **identical output at every
width** — 78–79 columns, every line one row, zero overflow in either axis. The rule is inert above
`--bp-wide` because no line reaches the column.

While verifying that, I found a latent risk worth writing into the spec: the desktop guarantee had only
ever been derived at 1280px, and it holds at `--bp-wide` only because the Developer's 22rem fixed rail
(HO-006's accepted deviation) keeps the terminal at 614px rather than a share of the viewport. A
proportional rail would put the 960–1100px band under 74 columns and break the twelve-lines-fit
guarantee silently. §7 now states the ≥74-column requirement and says where to re-derive it.

#### Landscape: the column split now follows the wrap rule, and it inverts

`§10` gave the wider column to the narration (~55/42). It now goes to the terminal (~54/42, 324px /
252px of a 600.3px content width) for a width reason rather than a rank reason: **width is the only
thing that decides whether a log line reads without a gesture, whereas narration set narrower simply
runs taller — and height is what landscape has to spare.** Narration-first survives as a priority; it
just is not what the horizontal axis is for here. Landscape lands at **3 visible lines**, matching
portrait, with 10.3px spare in the terminal column and 14.2px in the narration column against the
242.5px budget.

**Developer: two landscape figures are derived, not measured, and need confirming** — the chrome bar at
324px (I budgeted the conservative two-line 58px; it may fall to 41.5px on one line) and the worst-case
narration slot at ~29 characters per line (I budgeted 7 lines / 228.3px). Both have slack above them; if
either exceeds it, the beat indicator drops per §7.1's priority order.

#### A WCAG exception is retired

§10 previously claimed a scoped WCAG 1.4.10 exception for the terminal's horizontal scroll. It is gone:
nothing scrolls horizontally anywhere, at 375px, 320px or 200% zoom. §2 now claims no exception at all.
The stamp/role/detail alignment that justified the exception survives, because the wrap is a soft break
at a space with a hanging indent — every entry still opens on its own timestamp, and no continuation
row starts at the left edge.

#### Fidelity: intact, and structurally so

`white-space: pre-wrap` preserves the corpus's own inter-column padding exactly and inserts no
character. A soft wrap is a rendering decision, not an edit: `textContent` is byte-identical either
way, which is precisely why wrapping can be the payer and truncation cannot.
`overflow-wrap: break-word` is set as a backstop only — the longest token in the corpus is 18
characters against a narrowest specified column of 34, so it never fires.

Reduced-motion and no-JS paths are untouched: they render the complete transcript, which now wraps
instead of overflowing — strictly more readable, same content.

#### §5.1 line persistence — moved, and this time on purpose

The visible-line count changed, so §5.1's small-viewport clause moved with it: it now reads *a window
of N whole lines*, states 3 at the budget case, and adds the rule that a wrapped line is shown whole or
not at all. This was the easy miss last time and it was checked first this time.

---

#### Findings for PM

- **F1 — DEC-025's width arithmetic is wrong and should not be carried forward.** 325px / 41 columns
  and 268px of scroll, not 301px / 38 characters and ~276px. No decision turns on it; recorded so the
  next file to quote it quotes the measured figure.
- **F2 — SP3 already overflows the narration card at 320px, and this change does not cause it.**
  Measured: at 320px the card's fixed height is 199.39px and SP3 sets 7 lines needing 202.23px of text
  plus insets. This is the zero-margin card meeting a width below the one it was budgeted at. It is
  pre-existing, outside F-G4, and 320px sits below the signed-off budget viewport — but it is a live
  overflow, not a theoretical one, and the lever is copy length rather than layout. Routing it rather
  than fixing it: fixing it means either a taller card (which costs the terminal a line) or shorter
  copy (which is Content's, and SP3 is not open this wave).
- **F3 — the totals strip's 320px wrap (OBS-002) stops being a core-budget problem.** With the strip
  outside the core, its third-line wrap at 320px no longer threatens the two-layer guarantee. It is
  still a copy-fit question and still worth answering; it is just no longer load-bearing.
- **F4 — annotation 7's `--text-micro` ruling keeps its value and loses its reason.** DEC-022 set the
  mobile value scale from §7.1's height budget, which the strip has now left. The value does not move:
  it stands on width instead — 43 characters in a 327px column, which `--text-readout` cannot set on
  one line. Restated in place rather than left resting on a budget it is no longer in.

#### Open questions

None. Nothing in this change needs a founder answer; F-G4 stated the goal and DEC-025 stated the
constraints, and both are satisfiable as specified.

#### Would Apple ship this?

**Yes.** The test is whether the fix is the simpler thing rather than the more elaborate one, and it is:
one CSS rule replaces a scroll container, a WCAG exception, and a keyboard affordance that existed only
to reach the right-hand end of a line. The page loses two log lines on the smallest phone and stops
asking the reader to swipe sideways inside a scrolling page to finish a sentence — a gesture that
competes with the page's own scroll and that nothing on screen advertises. The honest reservation is
that three lines is a thin terminal; it is thin because the content is 56-character lines and the
device is 41 columns wide, and every alternative that keeps five lines keeps them by hiding half of
each one. I would not sign off at two.

#### Self-review

Ran the Pre-Handoff Self-Review Checklist. Item 1 caught two stale internals: §5.1's window wording
(fixed) and §7's annotation 4, which described lines but not their wrap behaviour (fixed). Item 9
caught a "before this rule / after it" framing in §7.1's closing paragraph and a "previously" in §10 —
both rewritten as current truth, with the history left here where it belongs. Item 3 spot-checked
`page-shell.md` for `--gap-hairline`, `--gap-flow`, `--text-terminal`, `--gutter` and `--bp-wide`; all
five resolve and all five values match what §7.1's budget assumes. Item 5: A-003, A-006 and A-007 hold
— no new token, no new colour, no new motion element, and nothing inherited from the direction
reference. `bash scripts/test.sh` is green (129 Blink, 13 WebKit) on the unchanged build, as expected:
this handoff moves the spec, and the build is HO-013's step.

#### PM review — ACCEPTED, no revision (2026-07-26)

**Every figure re-derived from tokens and from the corpus, not read off the handoff.** The fixed core
sums to **379.4px** item by item; the wrapped line box is 24.7 × 2 = 49.4px; `floor((553 − 379.4) /
49.4)` = **3**, core used 527.6, slack 25.4. All five viewport rows reproduce exactly (5 lines at 640 /
659 / 664 / 667, slack 13.6 / 32.6 / 37.6 / 40.6), as do the column counts at the stated 7.847px advance
(41 / 39 / 43 / 43 / 41, and 34 at 320px), the 478.2px guarantee floor, the 45.0px the strip returns
(424.4 → 379.4), and both landscape columns (232.2px of 242.5 with 10.3 spare; narration 228.3 with
14.2). The two build measurements the handoff cites as corroboration land where the arithmetic puts
them: 424.4 − 48 + 5 × 24.7 = **499.9** against a measured 499.89, and 454.9 against 454.89.

**The load-bearing claim was checked against the corpus itself, character by character.** Eleven of the
twelve lines exceed 41 columns (longest 74, shortest over-length 43) and **every one of L1–L11 costs
exactly two rows at 41 columns** — the constant the deterministic window rests on, and it holds with no
exceptions rather than approximately. L12 is 31 characters and sets one row. The longest whitespace
token is **18 characters** against a 34-column narrowest region, so the `break-word` backstop is
genuinely unreachable, as claimed. Three wrapped lines carry ~170 characters against five clipped ones'
205 — the 17% figure is right, and so is the argument built on it: the 205 contains no line a reader can
finish.

**The trade is accepted on its merits, not on its arithmetic.** Three lines is thin and the handoff says
so. What decides it is that the alternative is not "five lines" but "five first-halves of lines" — at 41
columns a non-wrapping phone shows the reader no complete log line at all, which makes §2's own claim
(*these are the real log lines*) unverifiable on the device where most readers will meet it. Spending
the totals strip to reach 3 rather than settling at 2 is the right call and the reasoning for it — a
two-line box stops reading as a log — is sound. Nothing was pushed back on that needs a founder answer.

**Findings disposed:**

- **F1 (DEC-025's width figures) — accepted and already superseded.** DEC-026 carries 325px / 41
  columns / 268px. Nothing downstream quotes the old numbers; `wave-review.md` is re-based this session.
- **F2 (SP3 overflows the narration card at 320px) — DEFERRED to Sprint 2 with the mechanism named,
  not left loose.** Confirmed pre-existing: the card is budgeted at six lines and SP3 sets six at 375px
  with zero margin (HO-007's finding), so the seventh line is bought by narrowing to 320px, not by this
  change. 320px sits below the width every row of the budget is derived at. It is not fixable inside
  this wave without either re-opening SP3 (Content, not open this wave) or a taller card (which costs
  the terminal a line at the budget case — trading a guaranteed viewport for an unbudgeted one). The
  resolution when it lands: §7.1's own priority order already pays for it, since dropping the beat
  indicator returns 28.5px and the seventh line costs 28.9px. Carried in `pre-launch-checklist.md`.
- **F3 (totals-strip wrap at 320px) — CARRIED, downgraded as stated.** Correct that it stops being a
  core-budget problem once the strip leaves the core. It stays a copy-fit question for Sprint 2.
- **F4 (annotation 7's ruling re-based onto width) — accepted, and the reason was re-derived rather
  than taken.** At 375px `--text-readout` clamps to 24px, which sets the 43-character value string at
  ~623px in a 327px column — unfittable by a factor of two, so the ruling stands on width exactly as
  claimed. One gap found while checking it and closed in the spec: annotation 7 stated the constraint
  but not the lever. At `--track-micro` the string sets **351.7px** and overflows the 327px column; at
  the `0.02em` the build actually applies it sets **295.0px**. DEC-022 ruled tracking as the lever and
  the build implements it, but the spec did not say so — a rebuild from the spec alone could have
  reintroduced `--track-micro` and re-broken a fixed defect. Now stated in annotation 7.

**One implementation trap, routed to the rebuild step rather than filed as a defect.** §7.1's formula
uses a 49.4px constant, and the spec is explicit that this is exact at ≥375px and a **ceiling** below
it. At 320px the two longest lines cost three rows, so the constant over-counts and would place a third
line the window then clips part-way — which rule 2 forbids. Rule 3 already specifies the correct
mechanism (quantise the flex remainder down to whole wrapped lines, measured), so this is a note to
build the measured version rather than the arithmetic shorthand. Added to the rebuild step's criteria.

**Verification**: `bash scripts/test.sh` re-run by PM at review — **green** (13/13 WebKit, suite green
end to end) on the unchanged build, matching the handoff's claim. A-001 holds: the corpus was read only.

### HO-012 — §2's thesis line now tells the operator's arc

**From**: Content · **To**: PM (review), then Developer (build), QA (validate)
**Date**: 2026-07-26 · **Status**: done — accepted by PM 2026-07-26, no revision
**Deliverable**: `knowledge-base/design-specs/web/section-02-narration.md` — SP7 (string, citation
table, commentary). SP6 untouched.
**Resolves**: F-G1 / DEC-024

---

**The new line, verbatim:**

> The operator planned the sprint, left the agents running, and returns to a deploy-ready site.

**15 of 16 words, script-measured under the file's §1 convention; reads in 4.29 s of the 4.80 s gate
hold.** Same count and read time as the line it replaces, so no slot-summary number moves and the
timed total stays 139 of 163. **SP6's 12-word relief is not spent** — the arc lands in one sentence
without a run-up, so SP6 stays at 10 of 12, exactly as accepted.

#### The arc, mapped beat for beat

DEC-024's arc is *plan → leave → agents run → return → ready to deploy*. The line carries all five:
**planned** (corpus "What Sprint 4 was": planned fully autonomous end-to-end; DEC-019: "authored to
run end-to-end autonomously with a single `Role: halt` at deploy") · **left / agents running**
(narration-facts bullet 1 — no human touched this chain, sessions 1–8, single halt; "It did.") ·
**returns** (terminal L11, the very line SP7 lands on: `Role: halt · awaiting operator`; session
row 8: the deploy gate is the founder's) · **deploy-ready** (session row 8: "founder deploy packet
assembled"; session row 2: deployable `web/`). Every verb is checkable in the corpus; full citation
table is in the deliverable.

#### The guardrail, addressed head-on

DEC-024 named the risk: "amaze a VC" taken literally produces adjectives-as-argument. The line
contains **zero adjectives-as-argument** — "deploy-ready" is the packet's state (assembled, halted,
awaiting the operator), not praise, and the only other modifiers are articles. The effect is carried
the way SP3 carries its own: by verbs a skeptic can verify and by the terminal line rendered directly
beneath it, which reads `awaiting operator` at that instant. The tense does the thesis work — planned,
left, *returns*: everything before the final clause is done, and the one human act left is the deploy.

#### The deploy boundary holds

"Deploy-ready," never "deployed." Nothing attaches the deploy to the chain's end; SP8 still states
that the deploy landed three days later because the gate waited on Apple (R2 hard boundary).

#### The honest-headline fact survives, restated positively

The seed's beat — no human touched the chain until the deploy gate — is the same fact as "left the
agents running … returns," told as what the operator did rather than what no one did. F-G1 called
this a framing change, not a new claim, and that is what shipped: no new fact enters the page,
none leaves it. The technical reader also still gets the halt verbatim, from L11 itself.

#### Findings for PM

- **F1 — the replay spec's SP7 brief is now stale and is PM's to cascade.**
  `section-02-replay.md` §6's SP7 row still describes the slot as "no human touched this until the
  deploy button. The run stops itself." Per the standing rule, where another file spells a §2 string
  differently the narration file wins; the brief is UI/UX's deliverable, so the cascade belongs at
  PM review — the same disposition as the totals-strip wireframes at the HO-005 review. No timing,
  anchor, or budget in that row moves.
- **F2 — the independent audit will red-flag SP7 until the rebuild, by design.**
  `tests/qa-independent-audit.mjs` diffs the built narration layer against the narration file, and
  `index.html` still renders the superseded string — the rebuild is HO-013's step. Expected
  sequencing, not a defect. `bash scripts/test.sh` (the build suite) does not read the narration
  file and is **green on the unchanged build**, re-run this session.
- **F3 — one stale sentence in the queue's Execution Mode prose.** It still says the narration
  carries "no word rewritten" / "nothing open," which predates the gate's fix wave. Harmless — the
  binding sentence ("the narration file wins") remains correct — but PM may want to true it up while
  closing this wave. PM-owned prose, so noted rather than edited.

#### Open questions

None. F-G1 stated the arc and DEC-024 stated the budget and the guardrail; all three are satisfied
as specified.

#### PM review — ACCEPTED, no revision (2026-07-26)

**Recounted, not read.** Under the file's own §1 convention (whitespace-delimited tokens containing a
letter or digit), SP7 is **15 words** against a 16-word budget, reading in **4.29 s** of the 4.80 s hold.
The superseded line is also 15, so the claim that no slot-summary number moves is right. SP6 was
**recounted because the criteria asked**: 10 of 12, the relief genuinely unspent. Every other slot
re-measured in the same pass — 139 timed words of 163, all ten inside budget, all nine timed ones inside
their windows — and every budget re-derived as `floor(window × 3.5)`, which reproduces all seven.

**DEC-024's guardrail is satisfied, and it was judged as the skeptic, not as the author.** The line
carries no adjective-as-argument. Its four modifiers are three articles and "deploy-ready," which is a
state the corpus records rather than praise for it: session row 8 assembles the founder deploy packet
and stops the run, session row 2 ships a deployable `web/`. The sentence is carried by verbs, and the
effect it does have comes from tense — *planned, left, returns* — landing on a terminal line that reads
`Role: halt · awaiting operator` at that instant. That is the SP3 mechanism (a specific true fact placed
where it lands hardest), not the mechanism DEC-024 warned against. It would have been blocking if it had
reached for awe; it does not.

**The arc was checked at the corpus, not against the citation table.** All five beats hold: *planned*
— "Planned to run **fully autonomous** end-to-end … with a **single human gate at deploy**" plus DEC-019
("Sprint 4 **authored** to run end-to-end autonomously"); *left / agents running* — "It did." and the
narration-facts bullet, true for sessions 1–8 with a single halt; *returns* — terminal L11 and session
row 8 ("the deploy gate is the founder's"); *deploy-ready* — session row 8 and session row 2.

**One inferential step chased and cleared, recorded so it is not re-litigated.** The corpus never says
"the operator planned the sprint" in those words — its planning statement is agentless ("Planned to
run…"), and DEC-019 says "authored" without naming who. The attribution to the operator holds on two
independent supports: the eight traced sessions are all agents, so whoever authored the run sits outside
the chain; and the founder's own F-G1 framing states the arc in exactly these terms. If it is ever
challenged, that is the answer.

**The deploy boundary holds** — "deploy-ready," never "deployed," and nothing attaches the deploy to the
chain's end. SP8 still carries the three-days-later fact and the reason (the gate waited on Apple).
Copy-rules re-checked line by line against the slot: R1 (no numeral in it), R2 (no wall-clock, boundary
intact), R6, R7 (product voice, no first person), R8 (the agents are named as agents and the human's
acts are planning and returning, never the work). No banned adjective, no exclamation.

**Findings disposed:**

- **F1 (stale SP7 brief in the replay spec §6) — APPLIED this session.** The brief now states the
  operator's arc and says explicitly that the honest-headline fact is carried inside it, so a future
  reader of the spec alone cannot reconstruct the retired negative framing. No timing, anchor or budget
  in that row moved. Correctly routed rather than edited across the role boundary.
- **F2 (the audit reds SP7 until the rebuild) — confirmed by inspection, not accepted on assertion.**
  `index.html:113` still renders the superseded string; `bash scripts/test.sh` re-run by PM at review is
  **green**, since the build suite does not read the narration file. Expected sequencing.
- **F3 (stale Execution Mode prose in the queue) — APPLIED this session.** Correctly noted rather than
  edited: it is PM-owned prose.

#### Self-review

Ran the Pre-Handoff Self-Review Checklist. Item 1's grep caught the stale SP7 brief in the replay
spec (routed as F1 above rather than edited across a role boundary). Item 2: all five acceptance
criteria re-checked against the queue step — arc beats mapped, counts script-measured and stated,
product voice (no first person anywhere in the slot), no banned language, every claim cited in
place. Item 5: A-001 holds (the corpus was read only) and A-005 holds trivially (the line carries no
number, so no scope can mix). Item 8: the behavioral change ships on the build step; the suite is
green on the unchanged build and the audit's transient mismatch is stated above, not laundered.
Item 9: the deliverable's commentary states current rationale only — no handoff IDs, no
revision archaeology. Item 10: queue advanced (step to Done, PM review promoted); no decision to
append — DEC-024 already records this ruling.

## Resolved (Last 10)
<!-- One-liner summaries. Cap at 10 entries; trim oldest when adding. -->

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

- 2026-07-25 — HO-004 (QA): Shell validated on both engines; accepted. Every acceptance criterion passes
  and no build defect was found. Both harnesses re-run at review — `scripts/test.sh` 86/86,
  `qa-independent-audit.mjs` 37/39 with exactly the two reported failures. All four items disposed in
  DEC-021 and none gated §2: F1 to the founder (diagnosis accepted, resolution parked non-halting), F2
  ruled with its cited blocker disproved, F3 applied to the spec, the `qlmanage` ceiling ruled and its
  residual named. The audit's 45-character floor was replaced rather than loosened — unsatisfiable at
  320px by arithmetic, and the build is fixed alongside it.

- 2026-07-25 — HO-003 (Developer): Page shell built in both themes, verified on both engines; accepted.
  79/79 Blink + 7/7 WebKit, harness shipping with the build (DEC-020). `<main tabindex="-1">` and the
  authored-text-is-final-value count-up both credited as correct-by-construction choices. One reasoning
  correction carried into DEC-021.1: OBS-001's claim that a responsive `.instrument` change would
  invalidate §7.1's budget does not hold — §7.1 budgets its own insets. OBS-002 applied to the spec,
  OBS-003 superseded by F1, OBS-004 deferred to §1/§5.

- 2026-07-25 — HO-010 (UI/UX): Wave 1 gate amendments applied to both specs. Accepted with notes.
  Theme control dropped and the motion budget closed at three plus cursor; §2 rescaled to a 48.00 s
  chain with B5 restored to 14.48% funded entirely by B6; F1 resolved with a 424.4px mobile core against
  a stated 375 × 553 visual viewport and a ≥95%-visibility playback gate. All arithmetic re-derived
  clean. PM applied two factual corrections to pacing rationale (DEC-019, C1/C2) — no design value
  changed. Gate hold upheld at 4.80 s. Full detail in git history.

- 2026-07-25 — HO-009 (Developer): Beat inventory trued up to corpus v1.1. Accepted, no findings.
  Chain end and B6 measured at source (3858 s / 486 s), calls and cost corroborated by arithmetic to
  the unit and the cent, corpus unmodified at the founder's commit `025842c`. The self-caught margin
  error (B1, not B6, is second-shortest — B3 leads by 13 s) makes hazard 3 sharper. No downstream drift.
